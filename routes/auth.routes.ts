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
import { validateBody } from "../middleware/validate.middleware.ts";
import { LoginSchema, RegisterSchema } from "../schemas.ts";
import { AppDataSource } from "../database/data-source.ts";
import { User, type UserRole } from "../entities/User.ts";

const router = Router();

router.post("/login", validateBody(LoginSchema), async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
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

router.post("/register", validateBody(RegisterSchema), async (req: Request, res: Response) => {
  try {
    const { username, password, name, email } = req.body;

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
      username,
      password,
      name,
      email,
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

router.post("/users", requireAuth, requireRole("admin"), validateBody(RegisterSchema), async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;
    const userRole: UserRole = role === "admin" ? "admin" : "operator";
    const user = await createUser({
      username,
      password,
      name,
      email,
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
