import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "./services/auth.service.ts";


describe("Autenticação JWT - Biblioteca jsonwebtoken", () => {
  it("deve assinar e verificar um token JWT padrão com sucesso usando a implementação real", () => {
    const userPayload = {
      id: 99,
      username: "jwtuser",
      name: "JWT User",
      email: "jwt@user.com",
      role: "operator" as const,
    };
    
    // Gerar token real
    const token = signToken(userPayload);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // JWT padrão de jsonwebtoken tem header.payload.signature

    // Decodificar token real
    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.username).toBe("jwtuser");
    expect(decoded?.role).toBe("operator");
  });
});
