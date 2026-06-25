import { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";

/**
 * Middleware para validar o req.body com um esquema Zod.
 * Substitui o req.body pelos dados sanitizados/validados e retorna 400 se houver erros.
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues;
        res.status(400).json({
          error: "Dados de entrada inválidos.",
          details: issues.map((e) => `${e.path.join(".")}: ${e.message}`),
        });
        return;
      }
      res.status(400).json({ error: "Erro na validação dos dados." });
    }
  };
}
