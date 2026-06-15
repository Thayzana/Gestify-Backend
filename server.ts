import "reflect-metadata";
import "./load-env.ts";

import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import router from "./routes.ts";
import { swaggerSpec } from "./swagger.ts";
import { isGeminiConfigured } from "./gemini.ts";
import { initializeDatabase } from "./database/init.ts";

const PORT = Number(process.env.PORT) || 3000;
const isVercel = Boolean(process.env.VERCEL);

if (isGeminiConfigured()) {
  console.log("[env] GEMINI_API_KEY OK — marketing IA disponível.");
} else {
  console.warn(
    "[env] GEMINI_API_KEY ausente. Configure em: Configurações → Chave Gemini,\n" +
      'ou crie Backend/.env.local com GEMINI_API_KEY="sua-chave"'
  );
}

const app = express();

// A Vercel (routes legado) pode entregar req.url como "/" — restaura o path original
app.use((req, _res, next) => {
  if (req.url === "/" || req.url.startsWith("/?")) {
    const original =
      req.headers["x-vercel-original-path"] ??
      req.headers["x-invoke-path"] ??
      req.headers["x-forwarded-uri"];
    if (typeof original === "string" && original.length > 0) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      req.url = original.split("?")[0] + query;
    }
  }
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean) as string[],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api-docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

if (isVercel) {
  app.get("/api-docs", (_req, res) => {
    res.type("html").send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Gestify API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({ url: "/api-docs.json", dom_id: "#swagger-ui", presets: [SwaggerUIBundle.presets.apis] });
  </script>
</body>
</html>`);
  });
} else {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Gestify API Docs",
    })
  );
}

app.use("/api", async (req, res, next) => {
  try {
    await initializeDatabase();
    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Falha ao inicializar o banco de dados:", message);
    res.status(500).json({ error: "Erro interno ao conectar ao banco de dados" });
  }
});

app.use("/api", router);

if (!isVercel) {
  initializeDatabase()
    .then(() => {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`API Gestify rodando em http://localhost:${PORT}`);
        console.log(`Swagger: http://localhost:${PORT}/api-docs`);
      });
    })
    .catch((error: NodeJS.ErrnoException & { code?: string }) => {
      console.error("Falha ao iniciar o servidor local:", error?.message || error);
      if (error?.code === "28P01") {
        console.error(
          "\n[db] Autenticação PostgreSQL falhou. Ajuste DATABASE_URL em Backend/.env.local " +
            '(ex: postgresql://postgres:SUA_SENHA@localhost:5432/gestify) e confira se o serviço está ativo.'
        );
      } else if (error?.code === "ECONNREFUSED") {
        console.error(
          "\n[db] PostgreSQL não está acessível. Inicie o serviço na porta 5432 ou use: docker compose up -d postgres"
        );
      }
      process.exit(1);
    });
}

export default app;
