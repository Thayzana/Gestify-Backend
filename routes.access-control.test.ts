import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";

// Mock the database init and close completely to avoid DB connections
vi.mock("./database/init.ts", () => ({
  initializeDatabase: vi.fn().mockResolvedValue(undefined),
  closeDatabase: vi.fn().mockResolvedValue(undefined),
}));

// Mock repositories to prevent typeorm repository calls from erroring
vi.mock("./repositories/gestify.repository.ts", () => ({
  createPromotion: vi.fn().mockResolvedValue({ id: 123, title: "Promo Teste" }),
  createCustomer: vi.fn().mockResolvedValue({ id: 456, name: "Customer Teste" }),
  updateCustomer: vi.fn().mockResolvedValue({ id: 456, name: "Customer Teste Atualizado" }),
  updateOrder: vi.fn().mockResolvedValue({ id: 789, customer_name: "Order Teste Atualizado" }),
}));

// Mock gemini to prevent client initialization or API key errors
vi.mock("./gemini.ts", () => ({
  isGeminiConfigured: vi.fn().mockReturnValue(true),
  getAiClient: vi.fn().mockReturnValue({
    models: {
      generateContent: vi.fn().mockResolvedValue({ text: "Texto de marketing gerado com sucesso." }),
    },
  }),
}));

// Mock auth.service.ts token verification for express middleware
const mockVerifyToken = vi.fn();
vi.mock("./services/auth.service.ts", async (importOriginal) => {
  const original = await importOriginal<typeof import("./services/auth.service.ts")>();
  return {
    ...original,
    verifyToken: (token: string) => mockVerifyToken(token),
  };
});

// Import the app AFTER mocking and env setup
import app from "./server.ts";

describe("Controle de Acesso - Rotas Autenticadas", () => {
  beforeAll(() => {
    mockVerifyToken.mockImplementation((token: string) => {
      if (token === "valid-admin-token") {
        return {
          id: 1,
          username: "admin",
          name: "Admin User",
          email: "admin@gestify.local",
          role: "admin" as const,
        };
      }
      if (token === "valid-operator-token") {
        return {
          id: 2,
          username: "operator",
          name: "Operator User",
          email: "operator@gestify.local",
          role: "operator" as const,
        };
      }
      return null;
    });
  });

  const routes = [
    {
      method: "post",
      path: "/api/promotions",
      body: { title: "Promo", type: "Normal" },
      invalidBody: { title: "" }, // invalid: empty title
    },
    {
      method: "post",
      path: "/api/marketing/generate",
      body: { context: "Brigadeiro", type: "caption" },
      invalidBody: { context: "" }, // invalid: empty context
    },
    {
      method: "post",
      path: "/api/customers",
      body: { name: "Cliente", phone: "1234" },
      invalidBody: { name: "", phone: "" },
    },
    {
      method: "put",
      path: "/api/customers/456",
      body: { name: "Cliente Novo" },
      invalidBody: { email: "invalid-email-format" },
    },
  ];

  routes.forEach(({ method, path, body, invalidBody }) => {
    describe(`${method.toUpperCase()} ${path}`, () => {
      it("deve retornar 401 se nenhum token for fornecido", async () => {
        const req = request(app)[method as "post" | "put"](path);
        const res = await req.send(body);
        expect(res.status).toBe(401);
        expect(res.body.error).toContain("Autenticação necessária");
      });

      it("deve retornar 403 se o usuário for operador", async () => {
        const req = request(app)[method as "post" | "put"](path)
          .set("Authorization", "Bearer valid-operator-token");
        const res = await req.send(body);
        expect(res.status).toBe(403);
        expect(res.body.error).toContain("Permissão insuficiente");
      });

      it("deve permitir acesso (200 ou 201) se o usuário for admin e os dados forem válidos", async () => {
        const req = request(app)[method as "post" | "put"](path)
          .set("Authorization", "Bearer valid-admin-token");
        const res = await req.send(body);
        expect([200, 201]).toContain(res.status);
      });

      it("deve retornar 400 Bad Request se os dados enviados violarem o esquema Zod", async () => {
        const req = request(app)[method as "post" | "put"](path)
          .set("Authorization", "Bearer valid-admin-token");
        const res = await req.send(invalidBody);
        expect(res.status).toBe(400);
        expect(res.body.error).toContain("Dados de entrada inválidos");
        expect(res.body.details).toBeDefined();
      });
    });
  });
});


