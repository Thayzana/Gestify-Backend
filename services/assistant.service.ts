import { getAiClient, isGeminiConfigured } from "../gemini.ts";
import { buildAssistantContext } from "./insights.service.ts";

export async function chatWithAssistant(
  message: string,
  history: { role: "user" | "model"; text: string }[] = []
): Promise<{ reply: string; fromAi: boolean }> {
  const context = await buildAssistantContext();
  const contextJson = JSON.stringify(context, null, 0).slice(0, 28000);

  if (!isGeminiConfigured()) {
    return {
      fromAi: false,
      reply:
        "A chave Gemini não está configurada. Vá em Configurações → Chave Gemini. " +
        `Enquanto isso, resumo rápido: ${(context.insights as { message: string }[])?.[0]?.message || "Sistema operacional."}`,
    };
  }

  const historyBlock = history
    .slice(-6)
    .map((h) => `${h.role === "user" ? "Usuário" : "Assistente"}: ${h.text}`)
    .join("\n");

  const prompt = `Você é o Assistente Inteligente do Gestify (gestão de confeitaria/varejo).
Responda em português do Brasil, de forma clara e acionável.
Use APENAS os dados JSON abaixo — não invente números que não existam no contexto.
Se não souber algo, diga o que falta cadastrar.

DADOS DO SISTEMA:
${contextJson}

HISTÓRICO RECENTE:
${historyBlock || "(sem histórico)"}

PERGUNTA DO USUÁRIO:
${message}`;

  try {
    const ai = getAiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "Especialista em operações de confeitaria e varejo. Respostas curtas (máx. 3 parágrafos) com bullets quando útil.",
      },
    });
    return { reply: result.text || "Não consegui gerar uma resposta.", fromAi: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro na IA";
    return {
      fromAi: false,
      reply: `Falha ao consultar a IA: ${msg}. Verifique sua chave Gemini.`,
    };
  }
}
