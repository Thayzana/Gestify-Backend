import { z } from "zod";

/**
 * Esquema de validação para login
 */
export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^\d{4,8}$/, "Usuário deve ter entre 4 e 8 dígitos numéricos."),
  password: z
    .string()
    .min(5, "Senha deve ter no mínimo 5 caracteres."),
});

/**
 * Esquema de validação para registro de usuário
 */
export const RegisterSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(/^\d{4,8}$/, "Usuário deve ter entre 4 e 8 dígitos numéricos."),
  password: z
    .string()
    .min(5, "Senha deve ter no mínimo 5 caracteres."),
  name: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório."),
  email: z
    .string()
    .trim()
    .email("E-mail inválido."),
  role: z.enum(["admin", "operator"]).optional(),
});

/**
 * Esquema de validação para criação de cliente
 */
export const CustomerPostSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nome do cliente é obrigatório."),
  phone: z
    .string()
    .trim()
    .min(1, "Telefone do cliente é obrigatório."),
  email: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().email("E-mail inválido.").nullable().optional()
  ),
  address: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().nullable().optional()
  ),
  notes: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().nullable().optional()
  ),
});

/**
 * Esquema de validação para atualização de cliente
 */
export const CustomerPutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nome do cliente deve ser uma string válida.")
    .optional(),
  phone: z
    .string()
    .trim()
    .min(1, "Telefone do cliente deve ser uma string válida.")
    .optional(),
  email: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().email("E-mail inválido.").nullable().optional()
  ),
  address: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().nullable().optional()
  ),
  notes: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.string().trim().nullable().optional()
  ),
});

/**
 * Esquema de validação para criação de promoção
 */
export const PromotionPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título da promoção é obrigatório."),
  subtitle: z
    .string()
    .trim()
    .nullable()
    .optional(),
  type: z
    .string()
    .trim()
    .nullable()
    .optional(),
  discount: z.preprocess(
    (val) => (val === undefined || val === null || val === "" ? null : Number(val)),
    z.number().nullable().optional()
  ),
  recovery: z.preprocess(
    (val) => (val === undefined || val === null || val === "" ? 0 : Number(val)),
    z.number().optional()
  ),
  status: z
    .string()
    .trim()
    .default("Normal"),
});

/**
 * Esquema de validação para geração de marketing por IA
 */
export const MarketingGenerateSchema = z.object({
  context: z
    .string()
    .trim()
    .min(1, "Descreva o produto ou ocasião do marketing."),
  type: z
    .string()
    .trim()
    .optional(),
});
