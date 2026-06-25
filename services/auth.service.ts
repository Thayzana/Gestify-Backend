import crypto from "crypto";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source.ts";
import { User, type UserRole } from "../entities/User.ts";

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  active?: boolean;
}

export interface AuthTokenPayload extends AuthUser {
  exp: number;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "gestify-dev-secret-change-in-production") {
    throw new Error(
      "A variável de ambiente JWT_SECRET não está configurada ou está utilizando um valor padrão inseguro."
    );
  }
  return secret;
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64).toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
  } catch {
    return false;
  }
}

function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
  };
}

export function signToken(user: AuthUser): string {
  return jwt.sign(user, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as any;
    if (!payload || !payload.id || !payload.username || !payload.role) {
      return null;
    }
    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function authenticateUser(
  username: string,
  password: string
): Promise<AuthUser | null> {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { username: username.trim() } });
  if (!user || !user.active) return null;
  if (!verifyPassword(password, user.password_hash)) return null;
  return toAuthUser(user);
}

export async function createUser(data: {
  username: string;
  password: string;
  name: string;
  email: string;
  role: UserRole;
}): Promise<AuthUser> {
  const repo = AppDataSource.getRepository(User);
  const username = data.username.trim();
  const existing = await repo.findOne({ where: { username } });
  if (existing) {
    throw new Error("Usuário já cadastrado.");
  }
  const user = repo.create({
    username,
    password_hash: hashPassword(data.password),
    name: data.name.trim(),
    email: data.email.trim(),
    role: data.role,
    active: true,
  });
  const saved = await repo.save(user);
  return toAuthUser(saved);
}

export async function findUserById(id: number): Promise<User | null> {
  return AppDataSource.getRepository(User).findOne({ where: { id } });
}

export async function listUsers(): Promise<AuthUser[]> {
  const users = await AppDataSource.getRepository(User).find({
    order: { created_at: "DESC" },
  });
  return users.map(toAuthUser);
}

export async function updateUser(
  id: number,
  data: Partial<{
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
    password: string;
  }>
): Promise<AuthUser | null> {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { id } });
  if (!user) return null;
  if (data.name !== undefined) user.name = data.name.trim();
  if (data.email !== undefined) user.email = data.email.trim();
  if (data.role !== undefined) user.role = data.role;
  if (data.active !== undefined) user.active = data.active;
  if (data.password) user.password_hash = hashPassword(data.password);
  const saved = await repo.save(user);
  return toAuthUser(saved);
}

export async function deleteUser(id: number): Promise<boolean> {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { id } });
  if (!user) return false;
  const adminCount = await repo.count({ where: { role: "admin", active: true } });
  if (user.role === "admin" && adminCount <= 1) {
    throw new Error("Não é possível remover o último administrador ativo.");
  }
  await repo.remove(user);
  return true;
}

export async function seedDefaultAdmin(): Promise<void> {
  const repo = AppDataSource.getRepository(User);
  if ((await repo.count()) > 0) return;

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "A base de dados de usuários está vazia, mas as variáveis de ambiente ADMIN_USERNAME ou ADMIN_PASSWORD para criação do administrador inicial não foram definidas."
    );
  }

  await repo.save(
    repo.create({
      username,
      password_hash: hashPassword(password),
      name: "Administrador",
      email: "admin@gestify.local",
      role: "admin",
      active: true,
    })
  );
  console.log("[seed] Administrador padrão criado com credenciais fornecidas por variáveis de ambiente.");
}
