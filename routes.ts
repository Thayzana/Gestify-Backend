import "./load-env.ts";
import { Router, Request, Response } from "express";
import * as repo from "./repositories/gestify.repository.ts";
import {
  getAiClient,
  isGeminiConfigured,
  saveGeminiApiKey,
} from "./gemini.ts";
import {
  isVarejoTheme,
  VAREJO_PRODUCTS,
  getVarejoDashboard,
  getVarejoPromotions,
  isVarejoPromotionId,
  setVarejoPromotionActive,
  VAREJO_SUPPLIERS,
  getVarejoOrders,
  isVarejoOrderId,
  createVarejoOrder,
  updateVarejoOrderStatus,
  deleteVarejoOrder,
} from "./sector-data.ts";
import { buildInsights, buildActionCards } from "./services/insights.service.ts";
import { chatWithAssistant } from "./services/assistant.service.ts";
import { runAutomationCycle } from "./services/automation.service.ts";
import {
  estimateDeliveryTime,
  isGoogleMapsConfigured,
} from "./services/maps.service.ts";
import { AppDataSource } from "./database/data-source.ts";
import { Recipe } from "./entities/Recipe.ts";
import authRouter from "./routes/auth.routes.ts";
import { requireAuth, requireRole } from "./middleware/auth.middleware.ts";

const router = Router();

function getThemeParam(req: Request): string {
  const theme = req.query.theme;
  return typeof theme === "string" ? theme : "";
}

router.use("/auth", authRouter);

router.get("/products", async (req: Request, res: Response) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json([...VAREJO_PRODUCTS].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    }
    res.json(await repo.findAllProducts());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/orders", async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      customer_phone,
      type,
      status,
      items,
      total_value,
      delivery_fee,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      numero,
      complemento,
      estimated_time,
      driver_name,
      driver_type,
      driver_phone,
      transport_obs,
    } = req.body ?? {};

    if (!customer_name || typeof customer_name !== "string" || !customer_name.trim()) {
      return res.status(400).json({ error: "Nome do cliente é obrigatório e deve ser uma string válida." });
    }
    if (!type || typeof type !== "string" || !type.trim()) {
      return res.status(400).json({ error: "Tipo de pedido é obrigatório e deve ser uma string válida." });
    }

    const orderData = {
      customer_name: customer_name.trim(),
      customer_phone: typeof customer_phone === "string" ? customer_phone.trim() : "",
      type: type.trim(),
      status: typeof status === "string" ? status.trim() : "Em preparo",
      items: Array.isArray(items)
        ? items.map((i: any) => ({
            id: Number(i.id || 0),
            name: String(i.name || "").trim(),
            quantity: Number(i.quantity || 0),
            price: Number(i.price || 0),
          }))
        : [],
      total_value: Number(total_value || 0),
      delivery_fee: Number(delivery_fee || 0),
      cep: typeof cep === "string" ? cep.trim() : "",
      rua: typeof rua === "string" ? rua.trim() : "",
      bairro: typeof bairro === "string" ? bairro.trim() : "",
      cidade: typeof cidade === "string" ? cidade.trim() : "",
      estado: typeof estado === "string" ? estado.trim() : "",
      numero: typeof numero === "string" ? numero.trim() : "",
      complemento: typeof complemento === "string" ? complemento.trim() : "",
      estimated_time: typeof estimated_time === "string" ? estimated_time.trim() : "",
      driver_name: typeof driver_name === "string" ? driver_name.trim() : "",
      driver_type: typeof driver_type === "string" ? driver_type.trim() : "Próprio",
      driver_phone: typeof driver_phone === "string" ? driver_phone.trim() : "",
      transport_obs: typeof transport_obs === "string" ? transport_obs.trim() : "",
    };

    if (isVarejoTheme(getThemeParam(req))) {
      return res.status(201).json(createVarejoOrder(orderData));
    }
    const newOrder = await repo.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logistics/maps-status", (_req: Request, res: Response) => {
  res.json({
    googleConfigured: isGoogleMapsConfigured(),
    storeOriginConfigured: Boolean(process.env.STORE_ORIGIN_ADDRESS?.trim()),
  });
});

router.post("/logistics/delivery-estimate", async (req: Request, res: Response) => {
  try {
    const { origin, destination, destinationParts } = req.body ?? {};
    const estimate = await estimateDeliveryTime({
      origin: typeof origin === "string" ? origin : undefined,
      destination: typeof destination === "string" ? destination : undefined,
      destinationParts:
        destinationParts && typeof destinationParts === "object"
          ? destinationParts
          : undefined,
    });
    res.json(estimate);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.use(requireAuth);

router.get("/customers", async (_req: Request, res: Response) => {
  try {
    res.json(await repo.findAllCustomers());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/customers", async (req: Request, res: Response) => {
  try {
    const { name, phone, email, address, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Nome e telefone são obrigatórios." });
    }
    const customer = await repo.createCustomer({
      name: String(name),
      phone: String(phone),
      email: email ? String(email) : null,
      address: address ? String(address) : null,
      notes: notes ? String(notes) : null,
    });
    res.status(201).json(customer);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/customers/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, phone, email, address, notes } = req.body ?? {};

    const updateData: any = {};
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "Nome do cliente deve ser uma string válida." });
      }
      updateData.name = name.trim();
    }
    if (phone !== undefined) {
      if (typeof phone !== "string" || !phone.trim()) {
        return res.status(400).json({ error: "Telefone do cliente deve ser uma string válida." });
      }
      updateData.phone = phone.trim();
    }
    if (email !== undefined) updateData.email = email ? String(email).trim() : null;
    if (address !== undefined) updateData.address = address ? String(address).trim() : null;
    if (notes !== undefined) updateData.notes = notes ? String(notes).trim() : null;

    const updated = await repo.updateCustomer(id, updateData);
    if (!updated) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/customers/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const ok = await repo.deleteCustomer(id);
    if (!ok) return res.status(404).json({ error: "Cliente não encontrado." });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/settings/gemini-status", (_req: Request, res: Response) => {
  res.json({ configured: isGeminiConfigured() });
});

router.post("/settings/gemini-key", requireRole("admin"), (req: Request, res: Response) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== "string") {
      return res.status(400).json({ error: "Informe a chave da API Gemini." });
    }
    saveGeminiApiKey(apiKey);
    res.json({ success: true, configured: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dashboard", async (req: Request, res: Response) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(getVarejoDashboard());
    }
    const stats = await repo.getDashboardData();
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/products", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const {
      sku, name, stock, minimum, expiration, status,
      price, description, image_url, category, is_promo, promo_price,
      barcode, unit_type, wholesale_price,
    } = req.body;
    if (!sku || !name || stock === undefined || minimum === undefined || !expiration) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }
    const newProduct = await repo.createProduct({
      sku, name,
      stock: Number(stock),
      minimum: Number(minimum),
      expiration,
      status,
      price: price !== undefined ? Number(price) : undefined,
      description,
      image_url,
      category,
      is_promo,
      promo_price: promo_price !== undefined ? Number(promo_price) : undefined,
      barcode,
      unit_type,
      wholesale_price:
        wholesale_price !== undefined && wholesale_price !== null
          ? Number(wholesale_price)
          : undefined,
    });
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/products/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      sku, name, stock, minimum, expiration, status,
      price, description, image_url, category, is_promo, promo_price,
      barcode, unit_type, wholesale_price,
    } = req.body;
    const updated = await repo.updateProduct(Number(id), {
      sku, name,
      stock: Number(stock),
      minimum: Number(minimum),
      expiration,
      status,
      price: price !== undefined ? Number(price) : undefined,
      description: description || "",
      image_url: image_url || "",
      category: category || "Docinhos",
      is_promo: !!is_promo,
      promo_price: promo_price !== undefined ? Number(promo_price) : undefined,
      barcode: barcode || "",
      unit_type: unit_type || "Unidade",
      wholesale_price:
        wholesale_price !== undefined && wholesale_price !== null
          ? Number(wholesale_price)
          : undefined,
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/products/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await repo.deleteProduct(Number(id));
    res.json({ success: true, message: `Produto id ${id} removido com sucesso` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/recipes", async (_req: Request, res: Response) => {
  try {
    res.json(await repo.findAllRecipesHydrated());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/recipes", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const {
      id, name, yield: yieldCount, margin_ratio, final_price,
      unit_cost, invisible_costs, subtotal, ingredients,
    } = req.body;

    if (!name || !yieldCount || margin_ratio === undefined || !ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Configuração de receita inválida ou campos incompletos." });
    }

    const saved = await repo.saveRecipe({
      id,
      name,
      yield: Number(yieldCount),
      margin_ratio: Number(margin_ratio),
      final_price: Number(final_price),
      unit_cost: Number(unit_cost),
      invisible_costs: Number(invisible_costs),
      subtotal: Number(subtotal),
      ingredients,
    });
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/recipes/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await repo.deleteRecipe(Number(id));
    res.json({ success: true, message: `Receita id ${id} removida com sucesso` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/invisible-costs", async (_req: Request, res: Response) => {
  try {
    res.json(await repo.getInvisibleCostsDict());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/invisible-costs", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const costs = req.body;
    await repo.upsertInvisibleCosts(costs);
    res.json({ success: true, updated: costs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/promotions", async (req: Request, res: Response) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(getVarejoPromotions());
    }
    res.json(await repo.findAllPromotions());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/promotions/:id/apply", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    const promoId = Number(id);
    if (isVarejoPromotionId(promoId)) {
      const updated = setVarejoPromotionActive(promoId, !!active);
      if (!updated) {
        return res.status(404).json({ error: "Promoção não encontrada." });
      }
      return res.json(updated);
    }
    const updated = await repo.setPromotionActive(promoId, !!active);
    if (!updated) {
      return res.status(404).json({ error: "Promoção não encontrada." });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/promotions", async (req: Request, res: Response) => {
  try {
    const { title, subtitle, type, discount, recovery, status } = req.body;
    const newPromo = await repo.createPromotion({
      title, subtitle, type, discount,
      recovery: Number(recovery || 0),
      status: status || "Normal",
    });
    res.json(newPromo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/marketing/generate", async (req: Request, res: Response) => {
  try {
    const { context, type } = req.body;
    if (!context) {
      return res.status(400).json({ error: "Descreva o produto ou ocasião do marketing." });
    }

    let prompt = "";
    if (type === "caption") {
      prompt = `Você é um especialista em marketing gastronômico para confeitarias premium. Escreva uma legenda irresistível de Instagram para o seguinte produto ou ocasião culinária: "${context}". Use quebras de linha amigáveis, emojis de doces/confeitaria, e gatilhos mentais que deem água na boca no público brasileiro.`;
    } else if (type === "hashtags") {
      prompt = `Crie uma lista com as 15 hashtags mais relevantes e de alta conversão no Instagram para impulsionar e atrair clientes de confeitaria fina com foco em: "${context}".`;
    } else if (type === "seasonal") {
      prompt = `Como um consultor de marketing criativo de confeitarias, crie um roteiro de ideias criativas de posts de Instagram para o produto ou ocasião: "${context}". Dê ideias focadas em datas comemorativas nacionais ou sazonais para divulgar essa novidade. Retorne como tópicos scannables enriquecidos em português.`;
    } else if (type === "flyer") {
      prompt = `Crie textos de divulgação irresistíveis para um flyer/post quadrado de redes sociais sobre o produto ou situação: "${context}". Dê a sua resposta exclusivamente no formato JSON abaixo, sem blocos de código markdown adicionais (NÃO use \`\`\`json ou semelhantes, responda puramente com um objeto JSON válido). Se não souber o preço do produto, invente uma sugestão realista de preço em Reais.
Formato do JSON de retorno:
{
  "headline": "Uma frase de impacto curta em maiúsculas (Ex: SÓ HOJE, NOVIDADE IRRESISTÍVEL, PROMOÇÃO IMPEDÍVEL, QUENTINHO DO FORNO)",
  "productName": "Nome premium do produto culinário",
  "description": "Uma frase descritiva curta (máximo de 65 caracteres) que chame atenção e dê muita água na boca",
  "priceTag": "Preço formatado em Reais (Ex: R$ 18,50)",
  "cta": "Excelente chamada para ação (Ex: Peça já pelo WhatsApp!, Garanta o seu!)"
}`;
    } else {
      prompt = `Cria uma estratégia promocional de marketing completa para o produto ou situação de confeitaria: "${context}". Escreva uma copy de vendas irresistível com hashtags inclusas.`;
    }

    const ai = getAiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Você é um assistente especialista em marketing digital especializado em confeitarias, padarias e culinária doce brasileira. Seu tom é amigável, entusiasmado, persuasivo e focado em dar fome ou inspirar desejos irresistíveis.",
      },
    });

    let generatedText = result.text || "Não foi possível gerar sugestões neste momento.";
    if (type === "flyer") {
      generatedText = generatedText.replace(/```json/gi, "").replace(/```/g, "").trim();
    }
    res.json({ generatedText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/suppliers", async (req: Request, res: Response) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(VAREJO_SUPPLIERS);
    }
    res.json(await repo.findAllSuppliers());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/suppliers", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { name, contact, category, active, items } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    const newSupplier = await repo.createSupplier({
      name, contact, category, active, items,
    });
    res.status(201).json(newSupplier);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/suppliers/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact, category, active, items } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    const updated = await repo.updateSupplier(Number(id), {
      name, contact, category, active, items,
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/suppliers/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await repo.deleteSupplier(Number(id));
    res.json({ success: true, message: `Fornecedor id ${id} removido com sucesso` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/orders", async (req: Request, res: Response) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(getVarejoOrders());
    }
    res.json(await repo.findAllOrders());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/orders/:id/status", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status é obrigatório" });
    }
    const orderId = Number(id);
    if (isVarejoOrderId(orderId)) {
      const updated = updateVarejoOrderStatus(orderId, status);
      if (!updated) {
        return res.status(404).json({ error: "Pedido não encontrado." });
      }
      return res.json(updated);
    }
    const updated = await repo.updateOrderStatus(orderId, status);
    if (!updated) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/orders/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      customer_name,
      customer_phone,
      type,
      status,
      items,
      total_value,
      delivery_fee,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      numero,
      complemento,
      estimated_time,
      driver_name,
      driver_type,
      driver_phone,
      transport_obs,
    } = req.body ?? {};

    const updateData: any = {};
    if (customer_name !== undefined) updateData.customer_name = String(customer_name).trim();
    if (customer_phone !== undefined) updateData.customer_phone = String(customer_phone).trim();
    if (type !== undefined) updateData.type = String(type).trim();
    if (status !== undefined) updateData.status = String(status).trim();
    if (items !== undefined) {
      updateData.items = Array.isArray(items)
        ? items.map((i: any) => ({
            id: Number(i.id || 0),
            name: String(i.name || "").trim(),
            quantity: Number(i.quantity || 0),
            price: Number(i.price || 0),
          }))
        : [];
    }
    if (total_value !== undefined) updateData.total_value = Number(total_value || 0);
    if (delivery_fee !== undefined) updateData.delivery_fee = Number(delivery_fee || 0);
    if (cep !== undefined) updateData.cep = String(cep).trim();
    if (rua !== undefined) updateData.rua = String(rua).trim();
    if (bairro !== undefined) updateData.bairro = String(bairro).trim();
    if (cidade !== undefined) updateData.cidade = String(cidade).trim();
    if (estado !== undefined) updateData.estado = String(estado).trim();
    if (numero !== undefined) updateData.numero = String(numero).trim();
    if (complemento !== undefined) updateData.complemento = String(complemento).trim();
    if (estimated_time !== undefined) updateData.estimated_time = String(estimated_time).trim();
    if (driver_name !== undefined) updateData.driver_name = String(driver_name).trim();
    if (driver_type !== undefined) updateData.driver_type = String(driver_type).trim();
    if (driver_phone !== undefined) updateData.driver_phone = String(driver_phone).trim();
    if (transport_obs !== undefined) updateData.transport_obs = String(transport_obs).trim();

    const updated = await repo.updateOrder(Number(id), updateData);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/orders/:id", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderId = Number(id);
    if (isVarejoOrderId(orderId)) {
      if (!deleteVarejoOrder(orderId)) {
        return res.status(404).json({ error: "Pedido não encontrado." });
      }
      return res.json({ success: true, message: `Pedido ${id} removido com sucesso` });
    }
    await repo.deleteOrder(orderId);
    res.json({ success: true, message: `Pedido ${id} removido com sucesso` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/assistant/insights", async (_req: Request, res: Response) => {
  try {
    const [insights, action_cards] = await Promise.all([
      buildInsights(),
      buildActionCards(),
    ]);
    res.json({ insights, action_cards });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/assistant/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Informe sua pergunta." });
    }
    const result = await chatWithAssistant(
      message.trim(),
      Array.isArray(history) ? history : []
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/automation/run", requireRole("admin"), async (_req: Request, res: Response) => {
  try {
    const logs = await runAutomationCycle();
    res.json({ success: true, logs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/recipes/:id/price", requireRole("admin"), async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { final_price } = req.body;
    if (final_price === undefined || Number(final_price) <= 0) {
      return res.status(400).json({ error: "Preço inválido." });
    }
    const recipes = await repo.findAllRecipesHydrated();
    if (!recipes.some((r) => (r as { id?: number }).id === id)) {
      return res.status(404).json({ error: "Receita não encontrada." });
    }
    await AppDataSource.getRepository(Recipe).update(id, {
      final_price: Number(final_price),
    });
    const updated = (await repo.findAllRecipesHydrated()).find(
      (r) => (r as { id?: number }).id === id
    );
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
