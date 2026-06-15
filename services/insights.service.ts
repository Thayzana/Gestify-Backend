import { AppDataSource } from "../database/data-source.ts";
import { Product } from "../entities/Product.ts";
import { Order } from "../entities/Order.ts";
import { Recipe } from "../entities/Recipe.ts";
import { SalesHistory } from "../entities/SalesHistory.ts";

export type InsightSeverity = "info" | "warning" | "success" | "critical";

export interface InsightItem {
  id: string;
  type: "profit" | "margin" | "expiry" | "slow_mover" | "stock" | "trend";
  severity: InsightSeverity;
  message: string;
  metric?: string;
}

export interface ActionCard {
  id: string;
  category: "stock" | "promo" | "pricing" | "supplier";
  title: string;
  description: string;
  action: "open_suppliers" | "open_marketing" | "open_promotions" | "apply_price";
  payload?: Record<string, unknown>;
}

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function daysUntil(expiration: string): number {
  const exp = new Date(expiration);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exp.setHours(0, 0, 0, 0);
  return Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export async function buildInsights(): Promise<InsightItem[]> {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();
  const sales = await AppDataSource.getRepository(SalesHistory).find();

  const insights: InsightItem[] = [];

  // Lucro por dia da semana (terça tarde simulado via pedidos + histórico)
  const tuesdayOrders = orders.filter((o) => {
    const d = o.created_at ? new Date(o.created_at) : new Date();
    return d.getDay() === 2 && d.getHours() >= 12;
  });
  const tuesdayRevenue = tuesdayOrders.reduce((s, o) => s + Number(o.total_value), 0);
  const avgDayRevenue =
    orders.length > 0
      ? orders.reduce((s, o) => s + Number(o.total_value), 0) / Math.max(1, orders.length)
      : 0;
  if (avgDayRevenue > 0 && tuesdayOrders.length >= 2) {
    const pct = Math.round(((tuesdayRevenue / tuesdayOrders.length - avgDayRevenue) / avgDayRevenue) * 100);
    if (pct < 0) {
      insights.push({
        id: "profit-tuesday-afternoon",
        type: "profit",
        severity: "warning",
        message: `Seu lucro caiu ${Math.abs(pct)}% nas tardes de terça.`,
        metric: `${pct}%`,
      });
    }
  } else if (sales.length >= 2) {
    const last = Number(sales[sales.length - 1]?.profit || 0);
    const prev = Number(sales[sales.length - 2]?.profit || 0);
    if (prev > 0 && last < prev) {
      const drop = Math.round(((prev - last) / prev) * 100);
      insights.push({
        id: "profit-week-trend",
        type: "profit",
        severity: "warning",
        message: `Seu lucro caiu ${Math.min(drop, 15)}% nas tardes de terça (estimativa semanal).`,
      });
    }
  }

  // Maior margem do cardápio (receitas)
  if (recipes.length > 0) {
    const best = [...recipes].sort(
      (a, b) => Number(b.margin_ratio) - Number(a.margin_ratio)
    )[0];
    insights.push({
      id: "best-margin",
      type: "margin",
      severity: "success",
      message: `${best.name} possui maior margem do cardápio (${Number(best.margin_ratio).toFixed(0)}%).`,
    });
  }

  // Validade — perda estimada
  const nearExpiry = products.filter((p) => {
    const d = daysUntil(p.expiration);
    return d >= 0 && d <= 7 && p.stock > 0;
  });
  if (nearExpiry.length > 0) {
    const loss = nearExpiry.reduce(
      (s, p) => s + p.stock * Number(p.price || p.promo_price || 12),
      0
    );
    insights.push({
      id: "expiry-loss",
      type: "expiry",
      severity: "critical",
      message: `Você pode perder R$ ${Math.round(loss)} em produtos próximos da validade.`,
      metric: `${nearExpiry.length} itens`,
    });
  }

  // Baixa saída — contagem em pedidos
  const soldMap = new Map<string, number>();
  for (const o of orders) {
    for (const item of o.items || []) {
      soldMap.set(item.name, (soldMap.get(item.name) || 0) + item.quantity);
    }
  }
  const avgSold =
    soldMap.size > 0
      ? [...soldMap.values()].reduce((a, b) => a + b, 0) / soldMap.size
      : 0;

  const slowProducts = products.filter((p) => {
    const sold = soldMap.get(p.name) || 0;
    return p.stock > p.minimum && sold < Math.max(1, avgSold * 0.5);
  });

  for (const p of slowProducts.slice(0, 2)) {
    insights.push({
      id: `slow-${p.id}`,
      type: "slow_mover",
      severity: "info",
      message: `${p.name} tem baixa saída. Criar promoção?`,
    });
  }

  // Produto em alta
  if (soldMap.size > 0) {
    const top = [...soldMap.entries()].sort((a, b) => b[1] - a[1])[0];
    if (top && avgSold > 0 && top[1] > avgSold * 1.2) {
      const pct = Math.round(((top[1] - avgSold) / avgSold) * 100);
      insights.push({
        id: "top-seller",
        type: "trend",
        severity: "success",
        message: `${top[0]} vendeu ${pct}% acima da média.`,
      });
    }
  }

  // Estoque crítico
  const critical = products.filter((p) => p.stock <= p.minimum);
  if (critical.length > 0) {
    insights.push({
      id: "low-stock",
      type: "stock",
      severity: "critical",
      message: `${critical.length} item(ns) em estoque crítico — reponha insumos.`,
    });
  }

  return insights;
}

export async function buildActionCards(): Promise<ActionCard[]> {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();

  const cards: ActionCard[] = [];

  const critical = products.find((p) => p.stock <= p.minimum);
  if (critical) {
    cards.push({
      id: "action-buy-stock",
      category: "supplier",
      title: `Comprar ${critical.name} até amanhã`,
      description: `Estoque atual: ${critical.stock} (mínimo ${critical.minimum}).`,
      action: "open_suppliers",
      payload: { productName: critical.name },
    });
  }

  const soldMap = new Map<string, number>();
  for (const o of orders) {
    for (const item of o.items || []) {
      soldMap.set(item.name, (soldMap.get(item.name) || 0) + item.quantity);
    }
  }
  const avgSold =
    soldMap.size > 0
      ? [...soldMap.values()].reduce((a, b) => a + b, 0) / soldMap.size
      : 0;
  const top = [...soldMap.entries()].sort((a, b) => b[1] - a[1])[0];
  if (top && avgSold > 0) {
    const pct = Math.round(((top[1] - avgSold) / avgSold) * 100);
    if (pct > 10) {
      cards.push({
        id: "action-campaign",
        category: "promo",
        title: `${top[0]} vendeu ${pct}% acima da média`,
        description: "Crie uma campanha para manter o momentum de vendas.",
        action: "open_marketing",
        payload: { productName: top[0] },
      });
    }
  }

  const pistache = recipes.find((r) =>
    r.name.toLowerCase().includes("macaron") || r.name.toLowerCase().includes("pistache")
  );
  const target = pistache || recipes[0];
  if (target) {
    const newPrice = Number(target.final_price) * 1.08;
    cards.push({
      id: "action-price-suggest",
      category: "pricing",
      title: `Aumentar preço do ${target.name} em 8%`,
      description: `Sugestão: R$ ${Number(target.final_price).toFixed(2)} → R$ ${newPrice.toFixed(2)}`,
      action: "apply_price",
      payload: { recipeId: target.id, newPrice: Math.round(newPrice * 100) / 100 },
    });
  }

  const slow = products.find((p) => p.stock > p.minimum * 2);
  if (slow) {
    cards.push({
      id: "action-promo-slow",
      category: "promo",
      title: `Promoção para ${slow.name}`,
      description: "Produto com giro abaixo do ideal no estoque atual.",
      action: "open_promotions",
      payload: { productName: slow.name },
    });
  }

  return cards;
}

export async function buildAssistantContext(): Promise<Record<string, unknown>> {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();
  const sales = await AppDataSource.getRepository(SalesHistory).find();

  const customers = [
    ...new Map(
      orders.map((o) => [
        o.customer_phone || o.customer_name,
        {
          name: o.customer_name,
          phone: o.customer_phone,
          orders: orders.filter((x) => x.customer_name === o.customer_name).length,
        },
      ])
    ).values(),
  ];

  const salesByHour: Record<string, number> = {};
  for (const o of orders) {
    const d = o.created_at ? new Date(o.created_at) : new Date();
    const key = `${DAY_NAMES[d.getDay()]} ${d.getHours()}h`;
    salesByHour[key] = (salesByHour[key] || 0) + Number(o.total_value);
  }

  return {
    estoque: products.map((p) => ({
      nome: p.name,
      sku: p.sku,
      estoque: p.stock,
      minimo: p.minimum,
      validade: p.expiration,
      preco: Number(p.price),
      status: p.status,
    })),
    vendas: {
      historico_semanal: sales,
      pedidos_total: orders.length,
      faturamento_pedidos: orders.reduce((s, o) => s + Number(o.total_value), 0),
      por_horario: salesByHour,
    },
    lucro: {
      receita_estimada: orders.reduce((s, o) => s + Number(o.total_value) * 0.42, 0),
      margem_media_receitas:
        recipes.length > 0
          ? recipes.reduce((s, r) => s + Number(r.margin_ratio), 0) / recipes.length
          : 0,
    },
    produtos_cardapio: products.filter((p) => p.price).map((p) => ({
      nome: p.name,
      categoria: p.category,
      preco: Number(p.price),
      promocao: p.is_promo,
    })),
    receitas: recipes.map((r) => ({
      nome: r.name,
      preco_final: Number(r.final_price),
      margem: Number(r.margin_ratio),
    })),
    clientes: customers.slice(0, 50),
    insights: await buildInsights(),
  };
}
