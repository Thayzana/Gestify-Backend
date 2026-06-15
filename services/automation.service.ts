import * as repo from "../repositories/gestify.repository.ts";
import { buildInsights } from "./insights.service.ts";

export interface AutomationLogEntry {
  step: string;
  status: "ok" | "simulated" | "skipped";
  detail: string;
  at: string;
}

/**
 * Modo automático (MVP): detecta problemas, cria promoção corretiva e registra
 * envio WhatsApp/Instagram como simulado até integrações reais existirem.
 */
export async function runAutomationCycle(): Promise<AutomationLogEntry[]> {
  const logs: AutomationLogEntry[] = [];
  const now = () => new Date().toISOString();

  const insights = await buildInsights();
  const expiryInsight = insights.find((i) => i.type === "expiry");
  const slowInsight = insights.find((i) => i.type === "slow_mover");

  logs.push({
    step: "detect",
    status: "ok",
    detail: `${insights.length} insight(s) analisados.`,
    at: now(),
  });

  if (slowInsight || expiryInsight) {
    const title = expiryInsight
      ? "Combo Anti-Desperdício (IA Automático)"
      : "Promoção Corretiva (IA Automático)";
    try {
      await repo.createPromotion({
        title,
        subtitle: slowInsight?.message || expiryInsight?.message || "Ação automática",
        type: "Combo",
        discount: "15%",
        recovery: 120,
        status: "Alta",
      });
      logs.push({
        step: "promotion",
        status: "ok",
        detail: `Promoção "${title}" criada.`,
        at: now(),
      });
    } catch (e: unknown) {
      logs.push({
        step: "promotion",
        status: "skipped",
        detail: e instanceof Error ? e.message : "Falha ao criar promoção",
        at: now(),
      });
    }
  } else {
    logs.push({
      step: "promotion",
      status: "skipped",
      detail: "Nenhum gatilho de promoção neste ciclo.",
      at: now(),
    });
  }

  logs.push({
    step: "artwork",
    status: "simulated",
    detail: "Arte 1080×1080 gerada (simulação — use Marketing IA para exportar).",
    at: now(),
  });

  logs.push({
    step: "whatsapp",
    status: "simulated",
    detail: "Campanha enfileirada para WhatsApp Business API (não configurada).",
    at: now(),
  });

  logs.push({
    step: "instagram",
    status: "simulated",
    detail: "Publicação no Instagram Graph API (não configurada).",
    at: now(),
  });

  return logs;
}
