import type { Request, Response, NextFunction } from "express";
import { verifyToken, type AuthUser } from "../services/auth.service.ts";
import type { UserRole } from "../entities/User.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }
  return null;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Autenticação necessária." });
    return;
  }
  const user = verifyToken(token);
  if (!user) {
    res.status(401).json({ error: "Sessão inválida ou expirada." });
    return;
  }
  req.user = user;
  next();
}

export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Autenticação necessária." });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Permissão insuficiente." });
      return;
    }
    next();
  };
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = extractToken(req);
  if (token) {
    const user = verifyToken(token);
    if (user) req.user = user;
  }
  next();
}
