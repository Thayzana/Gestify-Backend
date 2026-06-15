import { Router, Request, Response } from "express";
import {
  authenticateUser,
  createUser,
  signToken,
  listUsers,
  updateUser,
  deleteUser,
} from "../services/auth.service.ts";
import { requireAuth, requireRole } from "../middleware/auth.middleware.ts";
import { AppDataSource } from "../database/data-source.ts";
import { User, type UserRole } from "../entities/User.ts";

const router = Router();

function validateUsername(username: string): string | null {
  const u = username.trim();
  if (!/^\d{4,8}$/.test(u)) {
    return "Usuário deve ter entre 4 e 8 dígitos numéricos.";
  }
  return null;
}

function validatePassword(password: string): string | null {
  if (password.length < 5) {
    return "Senha deve ter no mínimo 5 caracteres.";
  }
  return null;
}

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Informe usuário e senha." });
    }
    const user = await authenticateUser(String(username), String(password));
    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, name, email } = req.body;
    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    const userError = validateUsername(String(username));
    if (userError) return res.status(400).json({ error: userError });

    const passError = validatePassword(String(password));
    if (passError) return res.status(400).json({ error: passError });

    if (!String(email).includes("@")) {
      return res.status(400).json({ error: "E-mail inválido." });
    }

    const userRepo = AppDataSource.getRepository(User);
    const totalUsers = await userRepo.count();
    const allowPublic =
      process.env.ALLOW_PUBLIC_SIGNUP === "true" || totalUsers === 0;

    if (!allowPublic) {
      return res.status(403).json({
        error: "Cadastro público desativado. Solicite acesso ao administrador.",
      });
    }

    const role: UserRole = totalUsers === 0 ? "admin" : "operator";
    const user = await createUser({
      username: String(username),
      password: String(password),
      name: String(name),
      email: String(email),
      role,
    });
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});

router.get("/me", requireAuth, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

router.get("/users", requireAuth, requireRole("admin"), async (_req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});

router.post("/users", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;
    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
    const userError = validateUsername(String(username));
    if (userError) return res.status(400).json({ error: userError });
    const passError = validatePassword(String(password));
    if (passError) return res.status(400).json({ error: passError });
    if (!String(email).includes("@")) {
      return res.status(400).json({ error: "E-mail inválido." });
    }
    const userRole: UserRole = role === "admin" ? "admin" : "operator";
    const user = await createUser({
      username: String(username),
      password: String(password),
      name: String(name),
      email: String(email),
      role: userRole,
    });
    res.status(201).json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});

router.put("/users/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, role, active, password } = req.body;
    const updated = await updateUser(id, {
      name: name !== undefined ? String(name) : undefined,
      email: email !== undefined ? String(email) : undefined,
      role: role === "admin" || role === "operator" ? role : undefined,
      active: active !== undefined ? !!active : undefined,
      password: password ? String(password) : undefined,
    });
    if (!updated) return res.status(404).json({ error: "Usuário não encontrado." });
    res.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});

router.delete("/users/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (req.user?.id === id) {
      return res.status(400).json({ error: "Você não pode remover sua própria conta." });
    }
    await deleteUser(id);
    res.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});

export default router;
