import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    passWithNoTests: true,
    env: {
      PORT: "0",
      JWT_SECRET: "test-jwt-secret-very-long-and-secure-123456",
    },
  },
});
