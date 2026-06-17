"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// vercel/handler.ts
var import_reflect_metadata3 = require("reflect-metadata");
var import_serverless_http = __toESM(require("serverless-http"));

// server.ts
var import_reflect_metadata2 = require("reflect-metadata");

// load-env.ts
var import_dotenv = __toESM(require("dotenv"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var projectRoot = import_path.default.resolve(
  process.env.GESTIFY_ROOT ?? process.cwd()
);
var envFiles = [
  import_path.default.join(projectRoot, ".env"),
  import_path.default.join(projectRoot, ".env.local")
];
for (const envPath of envFiles) {
  if (import_fs.default.existsSync(envPath)) {
    import_dotenv.default.config({ path: envPath, override: true });
  }
}
var geminiKeyFile = import_path.default.join(projectRoot, ".gemini-key");
if (import_fs.default.existsSync(geminiKeyFile)) {
  const fileKey = import_fs.default.readFileSync(geminiKeyFile, "utf8").trim();
  if (fileKey && !process.env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = fileKey;
  }
}

// server.ts
var import_cors = __toESM(require("cors"));
var import_express3 = __toESM(require("express"));
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));

// routes.ts
var import_express2 = require("express");

// database/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm11 = require("typeorm");

// entities/Product.ts
var import_typeorm = require("typeorm");
var Product = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)()
], Product.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 64 })
], Product.prototype, "sku", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 255 })
], Product.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], Product.prototype, "stock", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "int", default: 0 })
], Product.prototype, "minimum", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 32 })
], Product.prototype, "expiration", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 24, default: "OK" })
], Product.prototype, "status", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true })
], Product.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "text", nullable: true })
], Product.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "text", nullable: true })
], Product.prototype, "image_url", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 64, nullable: true })
], Product.prototype, "category", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "boolean", default: false })
], Product.prototype, "is_promo", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true })
], Product.prototype, "promo_price", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 32, nullable: true })
], Product.prototype, "barcode", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 24, nullable: true, default: "Unidade" })
], Product.prototype, "unit_type", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true })
], Product.prototype, "wholesale_price", 2);
Product = __decorateClass([
  (0, import_typeorm.Entity)("products")
], Product);

// entities/Recipe.ts
var import_typeorm3 = require("typeorm");

// entities/RecipeIngredient.ts
var import_typeorm2 = require("typeorm");
var RecipeIngredient = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)()
], RecipeIngredient.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "int" })
], RecipeIngredient.prototype, "recipe_id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar", length: 255 })
], RecipeIngredient.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "decimal", precision: 12, scale: 3 })
], RecipeIngredient.prototype, "amount", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar", length: 16 })
], RecipeIngredient.prototype, "unit", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "decimal", precision: 10, scale: 2 })
], RecipeIngredient.prototype, "price", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => Recipe, (recipe) => recipe.ingredients, { onDelete: "CASCADE" }),
  (0, import_typeorm2.JoinColumn)({ name: "recipe_id" })
], RecipeIngredient.prototype, "recipe", 2);
RecipeIngredient = __decorateClass([
  (0, import_typeorm2.Entity)("recipe_ingredients")
], RecipeIngredient);

// entities/Recipe.ts
var Recipe = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)()
], Recipe.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "varchar", length: 255 })
], Recipe.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ name: "yield_count", type: "int" })
], Recipe.prototype, "yield", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "decimal", precision: 10, scale: 2 })
], Recipe.prototype, "margin_ratio", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "decimal", precision: 10, scale: 2 })
], Recipe.prototype, "final_price", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "decimal", precision: 10, scale: 2 })
], Recipe.prototype, "unit_cost", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "decimal", precision: 10, scale: 2 })
], Recipe.prototype, "invisible_costs", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ type: "decimal", precision: 10, scale: 2 })
], Recipe.prototype, "subtotal", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => RecipeIngredient, (ing) => ing.recipe)
], Recipe.prototype, "ingredients", 2);
Recipe = __decorateClass([
  (0, import_typeorm3.Entity)("recipes")
], Recipe);

// entities/InvisibleCost.ts
var import_typeorm4 = require("typeorm");
var InvisibleCost = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)()
], InvisibleCost.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ type: "varchar", length: 64, unique: true })
], InvisibleCost.prototype, "key", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ type: "decimal", precision: 10, scale: 2 })
], InvisibleCost.prototype, "value", 2);
InvisibleCost = __decorateClass([
  (0, import_typeorm4.Entity)("invisible_costs")
], InvisibleCost);

// entities/SalesHistory.ts
var import_typeorm5 = require("typeorm");
var SalesHistory = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)()
], SalesHistory.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "varchar", length: 16 })
], SalesHistory.prototype, "day", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "decimal", precision: 12, scale: 2 })
], SalesHistory.prototype, "revenue", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "decimal", precision: 12, scale: 2 })
], SalesHistory.prototype, "profit", 2);
SalesHistory = __decorateClass([
  (0, import_typeorm5.Entity)("sales_history")
], SalesHistory);

// entities/Promotion.ts
var import_typeorm6 = require("typeorm");
var Promotion = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)()
], Promotion.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "varchar", length: 255 })
], Promotion.prototype, "title", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "varchar", length: 255 })
], Promotion.prototype, "subtitle", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "varchar", length: 64 })
], Promotion.prototype, "type", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "varchar", length: 32 })
], Promotion.prototype, "discount", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 })
], Promotion.prototype, "recovery", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "varchar", length: 32, default: "Normal" })
], Promotion.prototype, "status", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "int", default: 0 })
], Promotion.prototype, "active", 2);
Promotion = __decorateClass([
  (0, import_typeorm6.Entity)("promotions")
], Promotion);

// entities/Supplier.ts
var import_typeorm7 = require("typeorm");
var Supplier = class {
};
__decorateClass([
  (0, import_typeorm7.PrimaryGeneratedColumn)()
], Supplier.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ type: "varchar", length: 255 })
], Supplier.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ type: "varchar", length: 512 })
], Supplier.prototype, "contact", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ type: "varchar", length: 128 })
], Supplier.prototype, "category", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ type: "int", default: 1 })
], Supplier.prototype, "active", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ type: "jsonb", default: [] })
], Supplier.prototype, "items", 2);
Supplier = __decorateClass([
  (0, import_typeorm7.Entity)("suppliers")
], Supplier);

// entities/Order.ts
var import_typeorm8 = require("typeorm");
var Order = class {
};
__decorateClass([
  (0, import_typeorm8.PrimaryGeneratedColumn)()
], Order.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 255 })
], Order.prototype, "customer_name", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 64, default: "" })
], Order.prototype, "customer_phone", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 64 })
], Order.prototype, "type", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 64 })
], Order.prototype, "status", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "jsonb", default: [] })
], Order.prototype, "items", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 })
], Order.prototype, "total_value", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 })
], Order.prototype, "delivery_fee", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 16, default: "" })
], Order.prototype, "cep", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 255, default: "" })
], Order.prototype, "rua", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 128, default: "" })
], Order.prototype, "bairro", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 128, default: "" })
], Order.prototype, "cidade", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 8, default: "" })
], Order.prototype, "estado", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 32, default: "" })
], Order.prototype, "numero", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 255, default: "" })
], Order.prototype, "complemento", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 64, default: "" })
], Order.prototype, "estimated_time", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 128, default: "" })
], Order.prototype, "driver_name", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 32, default: "Pr\xF3prio" })
], Order.prototype, "driver_type", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "varchar", length: 64, default: "" })
], Order.prototype, "driver_phone", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "text", default: "" })
], Order.prototype, "transport_obs", 2);
__decorateClass([
  (0, import_typeorm8.Column)({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
], Order.prototype, "created_at", 2);
Order = __decorateClass([
  (0, import_typeorm8.Entity)("orders")
], Order);

// entities/User.ts
var import_typeorm9 = require("typeorm");
var User = class {
};
__decorateClass([
  (0, import_typeorm9.PrimaryGeneratedColumn)()
], User.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "varchar", length: 32, unique: true })
], User.prototype, "username", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "varchar", length: 255 })
], User.prototype, "password_hash", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "varchar", length: 255 })
], User.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "varchar", length: 255 })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "varchar", length: 16, default: "operator" })
], User.prototype, "role", 2);
__decorateClass([
  (0, import_typeorm9.Column)({ type: "boolean", default: true })
], User.prototype, "active", 2);
__decorateClass([
  (0, import_typeorm9.CreateDateColumn)({ type: "timestamptz" })
], User.prototype, "created_at", 2);
User = __decorateClass([
  (0, import_typeorm9.Entity)("users")
], User);

// entities/Customer.ts
var import_typeorm10 = require("typeorm");
var Customer = class {
};
__decorateClass([
  (0, import_typeorm10.PrimaryGeneratedColumn)()
], Customer.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm10.Column)({ type: "varchar", length: 255 })
], Customer.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm10.Column)({ type: "varchar", length: 32 })
], Customer.prototype, "phone", 2);
__decorateClass([
  (0, import_typeorm10.Column)({ type: "varchar", length: 255, nullable: true })
], Customer.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm10.Column)({ type: "varchar", length: 512, nullable: true })
], Customer.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm10.Column)({ type: "text", nullable: true })
], Customer.prototype, "notes", 2);
__decorateClass([
  (0, import_typeorm10.CreateDateColumn)({ type: "timestamptz" })
], Customer.prototype, "created_at", 2);
Customer = __decorateClass([
  (0, import_typeorm10.Entity)("customers")
], Customer);

// database/data-source.ts
function getDatabaseUrl() {
  return process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/gestify";
}
function getSslConfig() {
  const url = getDatabaseUrl();
  if (process.env.VERCEL || process.env.NODE_ENV === "production" || url.includes("supabase.com") || url.includes("supabase.co")) {
    return { rejectUnauthorized: false };
  }
  return void 0;
}
var sslConfig = getSslConfig();
var poolExtra = {
  connectionTimeoutMillis: 1e4,
  idleTimeoutMillis: 1e4
};
if (sslConfig) {
  poolExtra.ssl = { rejectUnauthorized: false };
}
var AppDataSource = new import_typeorm11.DataSource({
  type: "postgres",
  url: getDatabaseUrl(),
  synchronize: !process.env.VERCEL,
  logging: process.env.DB_LOGGING === "true",
  ssl: sslConfig ? true : false,
  extra: poolExtra,
  entities: [
    Product,
    Recipe,
    RecipeIngredient,
    InvisibleCost,
    SalesHistory,
    Promotion,
    Supplier,
    Order,
    User,
    Customer
  ]
});

// database/serializers.ts
function toNumber(value) {
  if (value === null || value === void 0) return void 0;
  const n = Number(value);
  return Number.isNaN(n) ? void 0 : n;
}
function productToPlain(p) {
  return {
    ...p,
    price: toNumber(p.price),
    promo_price: toNumber(p.promo_price),
    wholesale_price: toNumber(p.wholesale_price),
    is_promo: !!p.is_promo
  };
}
function recipeToPlain(r) {
  return {
    ...r,
    yield: r.yield != null ? Number(r.yield) : r.yield,
    margin_ratio: toNumber(r.margin_ratio),
    final_price: toNumber(r.final_price),
    unit_cost: toNumber(r.unit_cost),
    invisible_costs: toNumber(r.invisible_costs),
    subtotal: toNumber(r.subtotal)
  };
}
function ingredientToPlain(i) {
  return {
    ...i,
    amount: toNumber(i.amount),
    price: toNumber(i.price)
  };
}
function promotionToPlain(p) {
  return {
    ...p,
    recovery: toNumber(p.recovery),
    active: Number(p.active ?? 0)
  };
}
function orderToPlain(o) {
  let items = o.items;
  if (typeof items === "string") {
    try {
      items = JSON.parse(items);
    } catch {
      items = [];
    }
  }
  const created = o.created_at;
  return {
    ...o,
    items: items ?? [],
    total_value: toNumber(o.total_value) ?? 0,
    delivery_fee: toNumber(o.delivery_fee) ?? 0,
    created_at: created instanceof Date ? created.toISOString() : typeof created === "string" ? created : (/* @__PURE__ */ new Date()).toISOString()
  };
}
function salesToPlain(s) {
  return {
    ...s,
    revenue: toNumber(s.revenue),
    profit: toNumber(s.profit)
  };
}
function invisibleCostsToDict(rows) {
  const dict = {};
  for (const r of rows) {
    dict[r.key] = toNumber(r.value) ?? 0;
  }
  return dict;
}

// repositories/gestify.repository.ts
async function findAllProducts() {
  const rows = await AppDataSource.getRepository(Product).find({
    order: { name: "ASC" }
  });
  return rows.map((r) => productToPlain(r));
}
async function findAllProductsRaw() {
  return AppDataSource.getRepository(Product).find();
}
async function findProductById(id) {
  const row = await AppDataSource.getRepository(Product).findOneBy({ id });
  return row ? productToPlain(row) : void 0;
}
async function createProduct(data) {
  const repo = AppDataSource.getRepository(Product);
  const entity = repo.create({
    sku: data.sku,
    name: data.name,
    stock: data.stock,
    minimum: data.minimum,
    expiration: data.expiration,
    status: data.status || "OK",
    price: data.price,
    description: data.description || "",
    image_url: data.image_url || "",
    category: data.category || "Docinhos",
    is_promo: !!data.is_promo,
    promo_price: data.promo_price,
    barcode: data.barcode || "",
    unit_type: data.unit_type || "Unidade",
    wholesale_price: data.wholesale_price
  });
  const saved = await repo.save(entity);
  return productToPlain(saved);
}
async function updateProduct(id, data) {
  const repo = AppDataSource.getRepository(Product);
  await repo.update(id, {
    sku: data.sku,
    name: data.name,
    stock: data.stock,
    minimum: data.minimum,
    expiration: data.expiration,
    status: data.status,
    price: data.price,
    description: data.description,
    image_url: data.image_url,
    category: data.category,
    is_promo: data.is_promo,
    promo_price: data.promo_price,
    barcode: data.barcode,
    unit_type: data.unit_type,
    wholesale_price: data.wholesale_price
  });
  return findProductById(id);
}
async function deleteProduct(id) {
  await AppDataSource.getRepository(Product).delete(id);
}
async function findAllRecipesHydrated() {
  const recipes = await AppDataSource.getRepository(Recipe).find({
    order: { id: "DESC" },
    relations: ["ingredients"]
  });
  return recipes.map((r) => {
    const plain = recipeToPlain(r);
    const ings = (r.ingredients || []).map(
      (i) => ingredientToPlain(i)
    );
    return { ...plain, ingredients: ings };
  });
}
async function saveRecipe(data) {
  const recipeRepo = AppDataSource.getRepository(Recipe);
  const ingRepo = AppDataSource.getRepository(RecipeIngredient);
  let recipeId = data.id;
  if (recipeId) {
    await recipeRepo.update(recipeId, {
      name: data.name,
      yield: data.yield,
      margin_ratio: data.margin_ratio,
      final_price: data.final_price,
      unit_cost: data.unit_cost,
      invisible_costs: data.invisible_costs,
      subtotal: data.subtotal
    });
    await ingRepo.delete({ recipe_id: recipeId });
  } else {
    const created = await recipeRepo.save(
      recipeRepo.create({
        name: data.name,
        yield: data.yield,
        margin_ratio: data.margin_ratio,
        final_price: data.final_price,
        unit_cost: data.unit_cost,
        invisible_costs: data.invisible_costs,
        subtotal: data.subtotal
      })
    );
    recipeId = created.id;
  }
  for (const ing of data.ingredients) {
    await ingRepo.save(
      ingRepo.create({
        recipe_id: recipeId,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        price: ing.price
      })
    );
  }
  const saved = await recipeRepo.findOne({
    where: { id: recipeId },
    relations: ["ingredients"]
  });
  if (!saved) throw new Error("Receita n\xE3o encontrada ap\xF3s salvar");
  const plain = recipeToPlain(saved);
  const ings = (saved.ingredients || []).map(
    (i) => ingredientToPlain(i)
  );
  return { ...plain, ingredients: ings };
}
async function deleteRecipe(id) {
  await AppDataSource.getRepository(RecipeIngredient).delete({ recipe_id: id });
  await AppDataSource.getRepository(Recipe).delete(id);
}
async function getInvisibleCostsDict() {
  const rows = await AppDataSource.getRepository(InvisibleCost).find();
  return invisibleCostsToDict(rows);
}
async function upsertInvisibleCosts(costs) {
  const repo = AppDataSource.getRepository(InvisibleCost);
  for (const key of Object.keys(costs)) {
    const existing = await repo.findOneBy({ key });
    if (existing) {
      existing.value = Number(costs[key]);
      await repo.save(existing);
    } else {
      await repo.save(repo.create({ key, value: Number(costs[key]) }));
    }
  }
}
async function getDashboardData() {
  const products = await findAllProductsRaw();
  const salesChart = await AppDataSource.getRepository(SalesHistory).find();
  const today = /* @__PURE__ */ new Date();
  const lowStockCount = products.filter((p) => p.stock <= p.minimum).length;
  const nearExpiryCount = products.filter((p) => {
    const expDate = new Date(p.expiration);
    const diffDays = Math.ceil(
      (expDate.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24)
    );
    return diffDays <= 7;
  }).length;
  return {
    weekly_revenue: 12490,
    weekly_profit: 5220,
    low_stock_count: lowStockCount,
    near_expiry_count: nearExpiryCount,
    revenue_vs_last_week: 18.2,
    profit_vs_last_week: 12.6,
    low_stock_vs_last_week: 2,
    near_expiry_vs_last_week: -3,
    sales_chart: salesChart.map(
      (s) => salesToPlain(s)
    ),
    top_sold: [
      { id: 1, name: "Brigadeiro Gourmet", sales: 312 },
      { id: 2, name: "Bolo de Pote \u2014 Ninho", sales: 184 },
      { id: 3, name: "Trufa Belga 70%", sales: 158 },
      { id: 4, name: "Cheesecake Frutas Vermelhas", sales: 92 }
    ],
    inactive_products: [
      { name: "Cupcake Lim\xE3o Siciliano", days_inactive: 21, stock: 4 },
      { name: "Macaron Pistache", days_inactive: 18, stock: 7 },
      { name: "Bolo Red Velvet (fatia)", days_inactive: 14, stock: 3 }
    ],
    monthly_totals: {
      gross_revenue: 48320,
      production_costs: 19110,
      invisible_costs: 4220,
      ifood_tax: 5798,
      net_profit: 19192,
      margin_ratio: 39.7
    }
  };
}
async function findAllPromotions() {
  const rows = await AppDataSource.getRepository(Promotion).find();
  return rows.map(
    (r) => promotionToPlain(r)
  );
}
async function findPromotionById(id) {
  const row = await AppDataSource.getRepository(Promotion).findOneBy({ id });
  return row ? promotionToPlain(row) : void 0;
}
async function setPromotionActive(id, active) {
  await AppDataSource.getRepository(Promotion).update(id, {
    active: active ? 1 : 0
  });
  return findPromotionById(id);
}
async function createPromotion(data) {
  const repo = AppDataSource.getRepository(Promotion);
  const saved = await repo.save(
    repo.create({
      title: data.title,
      subtitle: data.subtitle,
      type: data.type,
      discount: data.discount,
      recovery: Number(data.recovery || 0),
      status: data.status || "Normal",
      active: 0
    })
  );
  return promotionToPlain(saved);
}
async function findAllSuppliers() {
  const rows = await AppDataSource.getRepository(Supplier).find({
    order: { id: "DESC" }
  });
  return rows;
}
async function findSupplierById(id) {
  return AppDataSource.getRepository(Supplier).findOneBy({ id });
}
async function createSupplier(data) {
  const repo = AppDataSource.getRepository(Supplier);
  const saved = await repo.save(
    repo.create({
      name: data.name,
      contact: data.contact || "",
      category: data.category || "",
      active: data.active !== void 0 ? data.active : 1,
      items: Array.isArray(data.items) ? data.items : []
    })
  );
  return saved;
}
async function updateSupplier(id, data) {
  const repo = AppDataSource.getRepository(Supplier);
  await repo.update(id, {
    name: data.name,
    contact: data.contact || "",
    category: data.category || "",
    active: data.active !== void 0 ? data.active : 1,
    items: Array.isArray(data.items) ? data.items : []
  });
  return findSupplierById(id);
}
async function deleteSupplier(id) {
  await AppDataSource.getRepository(Supplier).delete(id);
}
async function findAllOrders() {
  const rows = await AppDataSource.getRepository(Order).find({
    order: { id: "DESC" }
  });
  return rows.map(
    (r) => orderToPlain(r)
  );
}
async function findOrderById(id) {
  const row = await AppDataSource.getRepository(Order).findOneBy({ id });
  return row ? orderToPlain(row) : void 0;
}
async function createOrder(data) {
  const repo = AppDataSource.getRepository(Order);
  const createdAt = data.created_at ? new Date(data.created_at) : /* @__PURE__ */ new Date();
  const saved = await repo.save(
    repo.create({
      customer_name: data.customer_name,
      customer_phone: data.customer_phone || "",
      type: data.type,
      status: data.status || "Em preparo",
      items: Array.isArray(data.items) ? data.items : [],
      total_value: Number(data.total_value) || 0,
      delivery_fee: Number(data.delivery_fee) || 0,
      cep: data.cep || "",
      rua: data.rua || "",
      bairro: data.bairro || "",
      cidade: data.cidade || "",
      estado: data.estado || "",
      numero: data.numero || "",
      complemento: data.complemento || "",
      estimated_time: data.estimated_time || "40-50 min",
      driver_name: data.driver_name || "",
      driver_type: data.driver_type || "Pr\xF3prio",
      driver_phone: data.driver_phone || "",
      transport_obs: data.transport_obs || "",
      created_at: createdAt
    })
  );
  return orderToPlain(saved);
}
async function updateOrderStatus(id, status) {
  await AppDataSource.getRepository(Order).update(id, { status });
  return findOrderById(id);
}
async function updateOrder(id, data) {
  const repo = AppDataSource.getRepository(Order);
  await repo.update(id, {
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    type: data.type,
    status: data.status,
    items: Array.isArray(data.items) ? data.items : [],
    total_value: Number(data.total_value) || 0,
    delivery_fee: Number(data.delivery_fee) || 0,
    cep: data.cep,
    rua: data.rua,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
    numero: data.numero,
    complemento: data.complemento,
    estimated_time: data.estimated_time,
    driver_name: data.driver_name,
    driver_type: data.driver_type,
    driver_phone: data.driver_phone,
    transport_obs: data.transport_obs
  });
  return findOrderById(id);
}
async function deleteOrder(id) {
  await AppDataSource.getRepository(Order).delete(id);
}
function customerToPlain(c) {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    address: c.address,
    notes: c.notes,
    created_at: c.created_at
  };
}
async function findAllCustomers() {
  const rows = await AppDataSource.getRepository(Customer).find({
    order: { name: "ASC" }
  });
  return rows.map(customerToPlain);
}
async function createCustomer(data) {
  const repo = AppDataSource.getRepository(Customer);
  const saved = await repo.save(
    repo.create({
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      notes: data.notes?.trim() || null
    })
  );
  return customerToPlain(saved);
}
async function updateCustomer(id, data) {
  const repo = AppDataSource.getRepository(Customer);
  const row = await repo.findOneBy({ id });
  if (!row) return null;
  if (data.name !== void 0) row.name = data.name.trim();
  if (data.phone !== void 0) row.phone = data.phone.trim();
  if (data.email !== void 0) row.email = data.email?.trim() || null;
  if (data.address !== void 0) row.address = data.address?.trim() || null;
  if (data.notes !== void 0) row.notes = data.notes?.trim() || null;
  const saved = await repo.save(row);
  return customerToPlain(saved);
}
async function deleteCustomer(id) {
  const result = await AppDataSource.getRepository(Customer).delete(id);
  return (result.affected ?? 0) > 0;
}

// gemini.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_genai = require("@google/genai");
var PLACEHOLDER_KEYS = /* @__PURE__ */ new Set([
  "",
  "MY_GEMINI_API_KEY",
  "sua-chave-gemini-aqui",
  "GEMINI_API_KEY"
]);
var geminiKeyFile2 = import_path2.default.join(projectRoot, ".gemini-key");
var aiClient = null;
function isValidKey(key) {
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 10 && !PLACEHOLDER_KEYS.has(trimmed);
}
function getGeminiApiKey() {
  const candidates = [
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_API_KEY,
    process.env.GOOGLE_GENAI_API_KEY
  ];
  for (const candidate of candidates) {
    if (isValidKey(candidate)) {
      return candidate.trim();
    }
  }
  if (import_fs2.default.existsSync(geminiKeyFile2)) {
    const fileKey = import_fs2.default.readFileSync(geminiKeyFile2, "utf8").trim();
    if (isValidKey(fileKey)) {
      process.env.GEMINI_API_KEY = fileKey;
      return fileKey;
    }
  }
  throw new Error(
    "GEMINI_API_KEY n\xE3o configurada. Adicione em Configura\xE7\xF5es \u2192 Chave Gemini, ou crie .env.local na raiz do projeto com GEMINI_API_KEY=sua_chave"
  );
}
function saveGeminiApiKey(apiKey) {
  const trimmed = apiKey.trim();
  if (!isValidKey(trimmed)) {
    throw new Error("Chave da API inv\xE1lida. Cole a chave completa obtida em https://aistudio.google.com/apikey");
  }
  try {
    import_fs2.default.mkdirSync(import_path2.default.dirname(geminiKeyFile2), { recursive: true });
    import_fs2.default.writeFileSync(geminiKeyFile2, trimmed, "utf8");
    const envLocalPath = import_path2.default.join(projectRoot, ".env.local");
    const envLine = `GEMINI_API_KEY="${trimmed}"
`;
    if (import_fs2.default.existsSync(envLocalPath)) {
      const content = import_fs2.default.readFileSync(envLocalPath, "utf8");
      if (/^\s*GEMINI_API_KEY\s*=/m.test(content)) {
        import_fs2.default.writeFileSync(
          envLocalPath,
          content.replace(/^\s*GEMINI_API_KEY\s*=.*$/m, `GEMINI_API_KEY="${trimmed}"`),
          "utf8"
        );
      } else {
        import_fs2.default.appendFileSync(envLocalPath, envLine, "utf8");
      }
    } else {
      import_fs2.default.writeFileSync(envLocalPath, envLine, "utf8");
    }
  } catch (err) {
    console.warn(
      "[gemini] N\xE3o foi poss\xEDvel salvar a chave no arquivo local (ambiente somente leitura/serverless):",
      err.message
    );
  }
  process.env.GEMINI_API_KEY = trimmed;
  aiClient = null;
}
function isGeminiConfigured() {
  try {
    getGeminiApiKey();
    return true;
  } catch {
    return false;
  }
}
function getAiClient() {
  if (!aiClient) {
    const apiKey = getGeminiApiKey();
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}

// sector-data.ts
function isVarejoTheme(theme) {
  return theme === "varejo";
}
var VAREJO_PRODUCTS = [
  {
    id: 101,
    sku: "CAM-001",
    name: "Camiseta Classic Algod\xE3o",
    stock: 52,
    minimum: 24,
    expiration: "LOTE-2026-A",
    status: "OK",
    price: 79.9,
    description: "Malha 100% algod\xE3o penteado, corte regular confort\xE1vel.",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "Moda Masculina",
    is_promo: false,
    promo_price: 69.9,
    barcode: "7891001001001",
    unit_type: "Unidade",
    wholesale_price: 48.5
  },
  {
    id: 102,
    sku: "TEN-002",
    name: "T\xEAnis Casual Slip-on",
    stock: 18,
    minimum: 20,
    expiration: "LOTE-2026-B",
    status: "Baixo",
    price: 219.9,
    description: "Slip-on leve, solado antiderrapante, ideal para o dia a dia.",
    image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    category: "Cal\xE7ados",
    is_promo: true,
    promo_price: 179.9,
    barcode: "7892002002002",
    unit_type: "Unidade",
    wholesale_price: 128
  },
  {
    id: 103,
    sku: "BOL-003",
    name: "Bolsa Couro Sint\xE9tico",
    stock: 14,
    minimum: 10,
    expiration: "LOTE-2026-C",
    status: "OK",
    price: 149.9,
    description: "Al\xE7a ajust\xE1vel, compartimento interno com z\xEDper e acabamento premium.",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89d76a96c8?w=500&q=80",
    category: "Acess\xF3rios",
    is_promo: false,
    barcode: "7893003003003",
    unit_type: "Unidade",
    wholesale_price: 86
  },
  {
    id: 104,
    sku: "CAL-004",
    name: "Cal\xE7a Jeans Slim-Fit",
    stock: 9,
    minimum: 15,
    expiration: "LOTE-2026-D",
    status: "Baixo",
    price: 169.9,
    description: "Jeans com elastano, modelagem slim, lavagem m\xE9dia.",
    image_url: "https://images.unsplash.com/photo-1473966962644-7e3e24439b0a?w=500&q=80",
    category: "Moda Unissex",
    is_promo: false,
    barcode: "7894004004004",
    unit_type: "Unidade",
    wholesale_price: 94.5
  },
  {
    id: 105,
    sku: "OCU-005",
    name: "\xD3culos de Sol Noir",
    stock: 28,
    minimum: 12,
    expiration: "LOTE-2026-E",
    status: "OK",
    price: 129.9,
    description: "Lentes UV400, arma\xE7\xE3o acetato preta, estilo atemporal.",
    image_url: "https://images.unsplash.com/photo-1572635196233-2244a6320d8?w=500&q=80",
    category: "Acess\xF3rios",
    is_promo: true,
    promo_price: 99.9,
    barcode: "7895005005005",
    unit_type: "Unidade",
    wholesale_price: 62
  },
  {
    id: 106,
    sku: "VES-006",
    name: "Vestido Midi Floral",
    stock: 22,
    minimum: 10,
    expiration: "LOTE-2026-F",
    status: "OK",
    price: 189.9,
    description: "Estampa floral exclusiva, forro leve, caimento fluido.",
    image_url: "https://images.unsplash.com/photo-1595777457583-95e059a8aead?w=500&q=80",
    category: "Moda Feminina",
    is_promo: false,
    barcode: "7896006006006",
    unit_type: "Unidade",
    wholesale_price: 112
  }
];
function getVarejoDashboard(products = VAREJO_PRODUCTS) {
  const lowStockCount = products.filter((p) => p.stock <= p.minimum).length;
  const nearExpiryCount = products.filter((p) => p.stock <= p.minimum).length;
  return {
    weekly_revenue: 28750,
    weekly_profit: 11240,
    low_stock_count: lowStockCount,
    near_expiry_count: nearExpiryCount,
    revenue_vs_last_week: 14.8,
    profit_vs_last_week: 9.2,
    low_stock_vs_last_week: 3,
    near_expiry_vs_last_week: -1,
    sales_chart: [
      { day: "Seg", revenue: 3200, profit: 1280 },
      { day: "Ter", revenue: 4100, profit: 1650 },
      { day: "Qua", revenue: 3800, profit: 1520 },
      { day: "Qui", revenue: 5200, profit: 2100 },
      { day: "Sex", revenue: 6100, profit: 2480 },
      { day: "S\xE1b", revenue: 4850, profit: 1940 },
      { day: "Dom", revenue: 1500, profit: 270 }
    ],
    top_sold: [
      { id: 1, name: "Camiseta Classic Algod\xE3o", sales: 428 },
      { id: 2, name: "T\xEAnis Casual Slip-on", sales: 186 },
      { id: 3, name: "Cal\xE7a Jeans Slim-Fit", sales: 152 },
      { id: 4, name: "\xD3culos de Sol Noir", sales: 94 }
    ],
    inactive_products: [
      { name: "Bolsa Couro Sint\xE9tico", days_inactive: 24, stock: 14 },
      { name: "Cal\xE7a Jeans Slim-Fit", days_inactive: 16, stock: 9 },
      { name: "T\xEAnis Casual Slip-on", days_inactive: 12, stock: 18 }
    ],
    monthly_totals: {
      gross_revenue: 112400,
      production_costs: 48200,
      invisible_costs: 8900,
      ifood_tax: 0,
      net_profit: 55300,
      margin_ratio: 49.2
    }
  };
}
var VAREJO_PROMOTIONS = [
  {
    id: 201,
    title: "Liquida\xE7\xE3o de Inverno",
    subtitle: "Jaquetas e moletons \u2014 \xFAltimas pe\xE7as da cole\xE7\xE3o",
    type: "Desconto",
    discount: "-40%",
    recovery: 4200,
    status: "Sucesso",
    active: 1
  },
  {
    id: 202,
    title: "Leve 3 Camisetas, Pague 2",
    subtitle: "Camiseta Classic Algod\xE3o \u2014 giro acelerado",
    type: "BOGO",
    discount: "L3P2",
    recovery: 2800,
    status: "Normal",
    active: 0
  },
  {
    id: 203,
    title: "Combo T\xEAnis + Meia Esportiva",
    subtitle: "T\xEAnis Casual Slip-on + kit meias",
    type: "Combo",
    discount: "-25%",
    recovery: 1950,
    status: "Aviso",
    active: 0
  }
];
var VAREJO_SUPPLIERS = [
  {
    id: 301,
    name: "T\xEAxtil Fios da Uni\xE3o",
    contact: "(11) 3344-5566 / vendas@fiosdauniao.com.br",
    category: "Malhas e Tecidos",
    active: 1,
    items: ["Malha algod\xE3o 30.1", "Jeans \xEDndigo 12oz", "Linha poli\xE9ster industrial", "Etiqueta composi\xE7\xE3o"]
  },
  {
    id: 302,
    name: "Central de Cal\xE7ados Sul",
    contact: "(51) 99887-1122 / pedidos@calcadossul.com.br",
    category: "Cal\xE7ados e Solados",
    active: 1,
    items: ["Solado EVA slip-on", "Palmilha anat\xF4mica", "Cadar\xE7o el\xE1stico", "Caixa display cal\xE7ado"]
  },
  {
    id: 303,
    name: "Cabides & Tags Embalagens",
    contact: "comercial@cabidestags.com.br",
    category: "Embalagens e PDV",
    active: 1,
    items: ["Cabide acr\xEDlico", "Tag RFID", "Sacola kraft branding", "Etiqueta tamanho P/M/G/GG"]
  }
];
var VAREJO_ORDERS = [
  {
    id: 401,
    customer_name: "Mariana Souza",
    customer_phone: "(11) 99876-5432",
    type: "Delivery",
    status: "Rota de Envio",
    items: [{ id: 102, name: "T\xEAnis Casual Slip-on", quantity: 1, price: 219.9 }],
    total_value: 229.9,
    delivery_fee: 10,
    cep: "01310-100",
    rua: "Avenida Paulista",
    bairro: "Bela Vista",
    cidade: "S\xE3o Paulo",
    estado: "SP",
    numero: "1200",
    complemento: "Apto 82",
    estimated_time: "2-3 dias \xFAteis",
    driver_name: "Carlos Costa",
    driver_type: "Terceirizado",
    driver_phone: "(11) 98888-1111",
    transport_obs: "Conferir numera\xE7\xE3o 38",
    created_at: new Date(Date.now() - 45 * 60 * 1e3).toISOString()
  },
  {
    id: 402,
    customer_name: "Guilherme Santos",
    customer_phone: "(11) 98765-4321",
    type: "Balc\xE3o",
    status: "Pronto para Entrega",
    items: [
      { id: 101, name: "Camiseta Classic Algod\xE3o", quantity: 2, price: 79.9 },
      { id: 104, name: "Cal\xE7a Jeans Slim-Fit", quantity: 1, price: 169.9 }
    ],
    total_value: 329.7,
    delivery_fee: 0,
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
    estimated_time: "Retirada em loja",
    driver_name: "",
    driver_type: "Pr\xF3prio",
    driver_phone: "",
    transport_obs: "Separar P e M \u2014 provador 2",
    created_at: new Date(Date.now() - 90 * 60 * 1e3).toISOString()
  },
  {
    id: 403,
    customer_name: "Ana Beatriz Lima",
    customer_phone: "(21) 97777-6666",
    type: "Delivery",
    status: "Em preparo",
    items: [
      { id: 103, name: "Bolsa Couro Sint\xE9tico", quantity: 1, price: 149.9 },
      { id: 105, name: "\xD3culos de Sol Noir", quantity: 1, price: 129.9 }
    ],
    total_value: 289.8,
    delivery_fee: 10,
    cep: "22041-080",
    rua: "Rua Barata Ribeiro",
    bairro: "Copacabana",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    numero: "502",
    complemento: "",
    estimated_time: "3-5 dias \xFAteis",
    driver_name: "",
    driver_type: "Terceirizado",
    driver_phone: "",
    transport_obs: "Embalar em cabide \u2014 n\xE3o dobrar",
    created_at: new Date(Date.now() - 20 * 60 * 1e3).toISOString()
  }
];

// services/insights.service.ts
var DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"];
function daysUntil(expiration) {
  const exp = new Date(expiration);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  exp.setHours(0, 0, 0, 0);
  return Math.ceil((exp.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24));
}
async function buildInsights() {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();
  const sales = await AppDataSource.getRepository(SalesHistory).find();
  const insights = [];
  const tuesdayOrders = orders.filter((o) => {
    const d = o.created_at ? new Date(o.created_at) : /* @__PURE__ */ new Date();
    return d.getDay() === 2 && d.getHours() >= 12;
  });
  const tuesdayRevenue = tuesdayOrders.reduce((s, o) => s + Number(o.total_value), 0);
  const avgDayRevenue = orders.length > 0 ? orders.reduce((s, o) => s + Number(o.total_value), 0) / Math.max(1, orders.length) : 0;
  if (avgDayRevenue > 0 && tuesdayOrders.length >= 2) {
    const pct = Math.round((tuesdayRevenue / tuesdayOrders.length - avgDayRevenue) / avgDayRevenue * 100);
    if (pct < 0) {
      insights.push({
        id: "profit-tuesday-afternoon",
        type: "profit",
        severity: "warning",
        message: `Seu lucro caiu ${Math.abs(pct)}% nas tardes de ter\xE7a.`,
        metric: `${pct}%`
      });
    }
  } else if (sales.length >= 2) {
    const last = Number(sales[sales.length - 1]?.profit || 0);
    const prev = Number(sales[sales.length - 2]?.profit || 0);
    if (prev > 0 && last < prev) {
      const drop = Math.round((prev - last) / prev * 100);
      insights.push({
        id: "profit-week-trend",
        type: "profit",
        severity: "warning",
        message: `Seu lucro caiu ${Math.min(drop, 15)}% nas tardes de ter\xE7a (estimativa semanal).`
      });
    }
  }
  if (recipes.length > 0) {
    const best = [...recipes].sort(
      (a, b) => Number(b.margin_ratio) - Number(a.margin_ratio)
    )[0];
    insights.push({
      id: "best-margin",
      type: "margin",
      severity: "success",
      message: `${best.name} possui maior margem do card\xE1pio (${Number(best.margin_ratio).toFixed(0)}%).`
    });
  }
  const nearExpiry = products.filter((p) => {
    const d = daysUntil(p.expiration);
    return d >= 0 && d <= 7 && p.stock > 0;
  });
  if (nearExpiry.length > 0) {
    const loss = nearExpiry.reduce(
      (s, p) => s + p.stock * Number(p.price || p.promo_price || 12),
      0
    );
    insights.push({
      id: "expiry-loss",
      type: "expiry",
      severity: "critical",
      message: `Voc\xEA pode perder R$ ${Math.round(loss)} em produtos pr\xF3ximos da validade.`,
      metric: `${nearExpiry.length} itens`
    });
  }
  const soldMap = /* @__PURE__ */ new Map();
  for (const o of orders) {
    for (const item of o.items || []) {
      soldMap.set(item.name, (soldMap.get(item.name) || 0) + item.quantity);
    }
  }
  const avgSold = soldMap.size > 0 ? [...soldMap.values()].reduce((a, b) => a + b, 0) / soldMap.size : 0;
  const slowProducts = products.filter((p) => {
    const sold = soldMap.get(p.name) || 0;
    return p.stock > p.minimum && sold < Math.max(1, avgSold * 0.5);
  });
  for (const p of slowProducts.slice(0, 2)) {
    insights.push({
      id: `slow-${p.id}`,
      type: "slow_mover",
      severity: "info",
      message: `${p.name} tem baixa sa\xEDda. Criar promo\xE7\xE3o?`
    });
  }
  if (soldMap.size > 0) {
    const top = [...soldMap.entries()].sort((a, b) => b[1] - a[1])[0];
    if (top && avgSold > 0 && top[1] > avgSold * 1.2) {
      const pct = Math.round((top[1] - avgSold) / avgSold * 100);
      insights.push({
        id: "top-seller",
        type: "trend",
        severity: "success",
        message: `${top[0]} vendeu ${pct}% acima da m\xE9dia.`
      });
    }
  }
  const critical = products.filter((p) => p.stock <= p.minimum);
  if (critical.length > 0) {
    insights.push({
      id: "low-stock",
      type: "stock",
      severity: "critical",
      message: `${critical.length} item(ns) em estoque cr\xEDtico \u2014 reponha insumos.`
    });
  }
  return insights;
}
async function buildActionCards() {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();
  const cards = [];
  const critical = products.find((p) => p.stock <= p.minimum);
  if (critical) {
    cards.push({
      id: "action-buy-stock",
      category: "supplier",
      title: `Comprar ${critical.name} at\xE9 amanh\xE3`,
      description: `Estoque atual: ${critical.stock} (m\xEDnimo ${critical.minimum}).`,
      action: "open_suppliers",
      payload: { productName: critical.name }
    });
  }
  const soldMap = /* @__PURE__ */ new Map();
  for (const o of orders) {
    for (const item of o.items || []) {
      soldMap.set(item.name, (soldMap.get(item.name) || 0) + item.quantity);
    }
  }
  const avgSold = soldMap.size > 0 ? [...soldMap.values()].reduce((a, b) => a + b, 0) / soldMap.size : 0;
  const top = [...soldMap.entries()].sort((a, b) => b[1] - a[1])[0];
  if (top && avgSold > 0) {
    const pct = Math.round((top[1] - avgSold) / avgSold * 100);
    if (pct > 10) {
      cards.push({
        id: "action-campaign",
        category: "promo",
        title: `${top[0]} vendeu ${pct}% acima da m\xE9dia`,
        description: "Crie uma campanha para manter o momentum de vendas.",
        action: "open_marketing",
        payload: { productName: top[0] }
      });
    }
  }
  const pistache = recipes.find(
    (r) => r.name.toLowerCase().includes("macaron") || r.name.toLowerCase().includes("pistache")
  );
  const target = pistache || recipes[0];
  if (target) {
    const newPrice = Number(target.final_price) * 1.08;
    cards.push({
      id: "action-price-suggest",
      category: "pricing",
      title: `Aumentar pre\xE7o do ${target.name} em 8%`,
      description: `Sugest\xE3o: R$ ${Number(target.final_price).toFixed(2)} \u2192 R$ ${newPrice.toFixed(2)}`,
      action: "apply_price",
      payload: { recipeId: target.id, newPrice: Math.round(newPrice * 100) / 100 }
    });
  }
  const slow = products.find((p) => p.stock > p.minimum * 2);
  if (slow) {
    cards.push({
      id: "action-promo-slow",
      category: "promo",
      title: `Promo\xE7\xE3o para ${slow.name}`,
      description: "Produto com giro abaixo do ideal no estoque atual.",
      action: "open_promotions",
      payload: { productName: slow.name }
    });
  }
  return cards;
}
async function buildAssistantContext() {
  const products = await AppDataSource.getRepository(Product).find();
  const orders = await AppDataSource.getRepository(Order).find();
  const recipes = await AppDataSource.getRepository(Recipe).find();
  const sales = await AppDataSource.getRepository(SalesHistory).find();
  const customers = [
    ...new Map(
      orders.map((o) => [
        o.customer_phone || o.customer_name,
        {
          name: o.customer_name,
          phone: o.customer_phone,
          orders: orders.filter((x) => x.customer_name === o.customer_name).length
        }
      ])
    ).values()
  ];
  const salesByHour = {};
  for (const o of orders) {
    const d = o.created_at ? new Date(o.created_at) : /* @__PURE__ */ new Date();
    const key = `${DAY_NAMES[d.getDay()]} ${d.getHours()}h`;
    salesByHour[key] = (salesByHour[key] || 0) + Number(o.total_value);
  }
  return {
    estoque: products.map((p) => ({
      nome: p.name,
      sku: p.sku,
      estoque: p.stock,
      minimo: p.minimum,
      validade: p.expiration,
      preco: Number(p.price),
      status: p.status
    })),
    vendas: {
      historico_semanal: sales,
      pedidos_total: orders.length,
      faturamento_pedidos: orders.reduce((s, o) => s + Number(o.total_value), 0),
      por_horario: salesByHour
    },
    lucro: {
      receita_estimada: orders.reduce((s, o) => s + Number(o.total_value) * 0.42, 0),
      margem_media_receitas: recipes.length > 0 ? recipes.reduce((s, r) => s + Number(r.margin_ratio), 0) / recipes.length : 0
    },
    produtos_cardapio: products.filter((p) => p.price).map((p) => ({
      nome: p.name,
      categoria: p.category,
      preco: Number(p.price),
      promocao: p.is_promo
    })),
    receitas: recipes.map((r) => ({
      nome: r.name,
      preco_final: Number(r.final_price),
      margem: Number(r.margin_ratio)
    })),
    clientes: customers.slice(0, 50),
    insights: await buildInsights()
  };
}

// services/assistant.service.ts
async function chatWithAssistant(message, history = []) {
  const context = await buildAssistantContext();
  const contextJson = JSON.stringify(context, null, 0).slice(0, 28e3);
  if (!isGeminiConfigured()) {
    return {
      fromAi: false,
      reply: `A chave Gemini n\xE3o est\xE1 configurada. V\xE1 em Configura\xE7\xF5es \u2192 Chave Gemini. Enquanto isso, resumo r\xE1pido: ${context.insights?.[0]?.message || "Sistema operacional."}`
    };
  }
  const historyBlock = history.slice(-6).map((h) => `${h.role === "user" ? "Usu\xE1rio" : "Assistente"}: ${h.text}`).join("\n");
  const prompt = `Voc\xEA \xE9 o Assistente Inteligente do Gestify (gest\xE3o de confeitaria/varejo).
Responda em portugu\xEAs do Brasil, de forma clara e acion\xE1vel.
Use APENAS os dados JSON abaixo \u2014 n\xE3o invente n\xFAmeros que n\xE3o existam no contexto.
Se n\xE3o souber algo, diga o que falta cadastrar.

DADOS DO SISTEMA:
${contextJson}

HIST\xD3RICO RECENTE:
${historyBlock || "(sem hist\xF3rico)"}

PERGUNTA DO USU\xC1RIO:
${message}`;
  try {
    const ai = getAiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Especialista em opera\xE7\xF5es de confeitaria e varejo. Respostas curtas (m\xE1x. 3 par\xE1grafos) com bullets quando \xFAtil."
      }
    });
    return { reply: result.text || "N\xE3o consegui gerar uma resposta.", fromAi: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro na IA";
    return {
      fromAi: false,
      reply: `Falha ao consultar a IA: ${msg}. Verifique sua chave Gemini.`
    };
  }
}

// services/automation.service.ts
async function runAutomationCycle() {
  const logs = [];
  const now = () => (/* @__PURE__ */ new Date()).toISOString();
  const insights = await buildInsights();
  const expiryInsight = insights.find((i) => i.type === "expiry");
  const slowInsight = insights.find((i) => i.type === "slow_mover");
  logs.push({
    step: "detect",
    status: "ok",
    detail: `${insights.length} insight(s) analisados.`,
    at: now()
  });
  if (slowInsight || expiryInsight) {
    const title = expiryInsight ? "Combo Anti-Desperd\xEDcio (IA Autom\xE1tico)" : "Promo\xE7\xE3o Corretiva (IA Autom\xE1tico)";
    try {
      await createPromotion({
        title,
        subtitle: slowInsight?.message || expiryInsight?.message || "A\xE7\xE3o autom\xE1tica",
        type: "Combo",
        discount: "15%",
        recovery: 120,
        status: "Alta"
      });
      logs.push({
        step: "promotion",
        status: "ok",
        detail: `Promo\xE7\xE3o "${title}" criada.`,
        at: now()
      });
    } catch (e) {
      logs.push({
        step: "promotion",
        status: "skipped",
        detail: e instanceof Error ? e.message : "Falha ao criar promo\xE7\xE3o",
        at: now()
      });
    }
  } else {
    logs.push({
      step: "promotion",
      status: "skipped",
      detail: "Nenhum gatilho de promo\xE7\xE3o neste ciclo.",
      at: now()
    });
  }
  logs.push({
    step: "artwork",
    status: "simulated",
    detail: "Arte 1080\xD71080 gerada (simula\xE7\xE3o \u2014 use Marketing IA para exportar).",
    at: now()
  });
  logs.push({
    step: "whatsapp",
    status: "simulated",
    detail: "Campanha enfileirada para WhatsApp Business API (n\xE3o configurada).",
    at: now()
  });
  logs.push({
    step: "instagram",
    status: "simulated",
    detail: "Publica\xE7\xE3o no Instagram Graph API (n\xE3o configurada).",
    at: now()
  });
  return logs;
}

// routes/auth.routes.ts
var import_express = require("express");

// services/auth.service.ts
var import_crypto = __toESM(require("crypto"));
var TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1e3;
function getJwtSecret() {
  return process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "gestify-dev-secret-change-in-production";
}
function hashPassword(password) {
  const salt = import_crypto.default.randomBytes(16).toString("hex");
  const hash = import_crypto.default.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const test = import_crypto.default.scryptSync(password, salt, 64).toString("hex");
  try {
    return import_crypto.default.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(test, "hex"));
  } catch {
    return false;
  }
}
function toAuthUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active
  };
}
function signToken(user) {
  const payload = {
    ...user,
    exp: Date.now() + TOKEN_TTL_MS
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = import_crypto.default.createHmac("sha256", getJwtSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}
function verifyToken(token) {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = import_crypto.default.createHmac("sha256", getJwtSecret()).update(body).digest("base64url");
  try {
    if (!import_crypto.default.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return null;
    }
  } catch {
    return null;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    );
    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!payload.id || !payload.username || !payload.role) return null;
    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
  } catch {
    return null;
  }
}
async function authenticateUser(username, password) {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { username: username.trim() } });
  if (!user || !user.active) return null;
  if (!verifyPassword(password, user.password_hash)) return null;
  return toAuthUser(user);
}
async function createUser(data) {
  const repo = AppDataSource.getRepository(User);
  const username = data.username.trim();
  const existing = await repo.findOne({ where: { username } });
  if (existing) {
    throw new Error("Usu\xE1rio j\xE1 cadastrado.");
  }
  const user = repo.create({
    username,
    password_hash: hashPassword(data.password),
    name: data.name.trim(),
    email: data.email.trim(),
    role: data.role,
    active: true
  });
  const saved = await repo.save(user);
  return toAuthUser(saved);
}
async function listUsers() {
  const users = await AppDataSource.getRepository(User).find({
    order: { created_at: "DESC" }
  });
  return users.map(toAuthUser);
}
async function updateUser(id, data) {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { id } });
  if (!user) return null;
  if (data.name !== void 0) user.name = data.name.trim();
  if (data.email !== void 0) user.email = data.email.trim();
  if (data.role !== void 0) user.role = data.role;
  if (data.active !== void 0) user.active = data.active;
  if (data.password) user.password_hash = hashPassword(data.password);
  const saved = await repo.save(user);
  return toAuthUser(saved);
}
async function deleteUser(id) {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { id } });
  if (!user) return false;
  const adminCount = await repo.count({ where: { role: "admin", active: true } });
  if (user.role === "admin" && adminCount <= 1) {
    throw new Error("N\xE3o \xE9 poss\xEDvel remover o \xFAltimo administrador ativo.");
  }
  await repo.remove(user);
  return true;
}
async function seedDefaultAdmin() {
  const repo = AppDataSource.getRepository(User);
  if (await repo.count() > 0) return;
  const username = process.env.ADMIN_USERNAME || "1164";
  const password = process.env.ADMIN_PASSWORD || "19735";
  await repo.save(
    repo.create({
      username,
      password_hash: hashPassword(password),
      name: "Administrador",
      email: "admin@gestify.local",
      role: "admin",
      active: true
    })
  );
  console.log("[seed] Administrador padr\xE3o criado (username:", username, ")");
}

// middleware/auth.middleware.ts
function extractToken(req) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }
  return null;
}
function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Autentica\xE7\xE3o necess\xE1ria." });
    return;
  }
  const user = verifyToken(token);
  if (!user) {
    res.status(401).json({ error: "Sess\xE3o inv\xE1lida ou expirada." });
    return;
  }
  req.user = user;
  next();
}
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: "Autentica\xE7\xE3o necess\xE1ria." });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Permiss\xE3o insuficiente." });
      return;
    }
    next();
  };
}

// routes/auth.routes.ts
var router = (0, import_express.Router)();
function validateUsername(username) {
  const u = username.trim();
  if (!/^\d{4,8}$/.test(u)) {
    return "Usu\xE1rio deve ter entre 4 e 8 d\xEDgitos num\xE9ricos.";
  }
  return null;
}
function validatePassword(password) {
  if (password.length < 5) {
    return "Senha deve ter no m\xEDnimo 5 caracteres.";
  }
  return null;
}
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Informe usu\xE1rio e senha." });
    }
    const user = await authenticateUser(String(username), String(password));
    if (!user) {
      return res.status(401).json({ error: "Usu\xE1rio ou senha incorretos." });
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
});
router.post("/register", async (req, res) => {
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
      return res.status(400).json({ error: "E-mail inv\xE1lido." });
    }
    const userRepo = AppDataSource.getRepository(User);
    const totalUsers = await userRepo.count();
    const allowPublic = process.env.ALLOW_PUBLIC_SIGNUP === "true" || totalUsers === 0;
    if (!allowPublic) {
      return res.status(403).json({
        error: "Cadastro p\xFAblico desativado. Solicite acesso ao administrador."
      });
    }
    const role = totalUsers === 0 ? "admin" : "operator";
    const user = await createUser({
      username: String(username),
      password: String(password),
      name: String(name),
      email: String(email),
      role
    });
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
router.get("/users", requireAuth, requireRole("admin"), async (_req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
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
      return res.status(400).json({ error: "E-mail inv\xE1lido." });
    }
    const userRole = role === "admin" ? "admin" : "operator";
    const user = await createUser({
      username: String(username),
      password: String(password),
      name: String(name),
      email: String(email),
      role: userRole
    });
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});
router.put("/users/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, role, active, password } = req.body;
    const updated = await updateUser(id, {
      name: name !== void 0 ? String(name) : void 0,
      email: email !== void 0 ? String(email) : void 0,
      role: role === "admin" || role === "operator" ? role : void 0,
      active: active !== void 0 ? !!active : void 0,
      password: password ? String(password) : void 0
    });
    if (!updated) return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    res.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});
router.delete("/users/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (req.user?.id === id) {
      return res.status(400).json({ error: "Voc\xEA n\xE3o pode remover sua pr\xF3pria conta." });
    }
    await deleteUser(id);
    res.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(400).json({ error: message });
  }
});
var auth_routes_default = router;

// routes.ts
var router2 = (0, import_express2.Router)();
function getThemeParam(req) {
  const theme = req.query.theme;
  return typeof theme === "string" ? theme : "";
}
router2.use("/auth", auth_routes_default);
router2.get("/products", async (req, res) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json([...VAREJO_PRODUCTS].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    }
    res.json(await findAllProducts());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/orders", async (req, res) => {
  try {
    const body = req.body;
    if (!body.customer_name || !body.type) {
      return res.status(400).json({ error: "Nome do cliente e tipo de pedido s\xE3o obrigat\xF3rios" });
    }
    const newOrder = await createOrder(body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.use(requireAuth);
router2.get("/customers", async (_req, res) => {
  try {
    res.json(await findAllCustomers());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/customers", async (req, res) => {
  try {
    const { name, phone, email, address, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Nome e telefone s\xE3o obrigat\xF3rios." });
    }
    const customer = await createCustomer({
      name: String(name),
      phone: String(phone),
      email: email ? String(email) : null,
      address: address ? String(address) : null,
      notes: notes ? String(notes) : null
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router2.put("/customers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await updateCustomer(id, req.body);
    if (!updated) return res.status(404).json({ error: "Cliente n\xE3o encontrado." });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router2.delete("/customers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ok = await deleteCustomer(id);
    if (!ok) return res.status(404).json({ error: "Cliente n\xE3o encontrado." });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/settings/gemini-status", (_req, res) => {
  res.json({ configured: isGeminiConfigured() });
});
router2.post("/settings/gemini-key", requireRole("admin"), (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey || typeof apiKey !== "string") {
      return res.status(400).json({ error: "Informe a chave da API Gemini." });
    }
    saveGeminiApiKey(apiKey);
    res.json({ success: true, configured: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router2.get("/dashboard", async (req, res) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(getVarejoDashboard());
    }
    const stats = await getDashboardData();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/products", async (req, res) => {
  try {
    const {
      sku,
      name,
      stock,
      minimum,
      expiration,
      status,
      price,
      description,
      image_url,
      category,
      is_promo,
      promo_price,
      barcode,
      unit_type,
      wholesale_price
    } = req.body;
    if (!sku || !name || stock === void 0 || minimum === void 0 || !expiration) {
      return res.status(400).json({ error: "Campos obrigat\xF3rios ausentes" });
    }
    const newProduct = await createProduct({
      sku,
      name,
      stock: Number(stock),
      minimum: Number(minimum),
      expiration,
      status,
      price: price !== void 0 ? Number(price) : void 0,
      description,
      image_url,
      category,
      is_promo,
      promo_price: promo_price !== void 0 ? Number(promo_price) : void 0,
      barcode,
      unit_type,
      wholesale_price: wholesale_price !== void 0 && wholesale_price !== null ? Number(wholesale_price) : void 0
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sku,
      name,
      stock,
      minimum,
      expiration,
      status,
      price,
      description,
      image_url,
      category,
      is_promo,
      promo_price,
      barcode,
      unit_type,
      wholesale_price
    } = req.body;
    const updated = await updateProduct(Number(id), {
      sku,
      name,
      stock: Number(stock),
      minimum: Number(minimum),
      expiration,
      status,
      price: price !== void 0 ? Number(price) : void 0,
      description: description || "",
      image_url: image_url || "",
      category: category || "Docinhos",
      is_promo: !!is_promo,
      promo_price: promo_price !== void 0 ? Number(promo_price) : void 0,
      barcode: barcode || "",
      unit_type: unit_type || "Unidade",
      wholesale_price: wholesale_price !== void 0 && wholesale_price !== null ? Number(wholesale_price) : void 0
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.json({ success: true, message: `Produto id ${id} removido com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/recipes", async (_req, res) => {
  try {
    res.json(await findAllRecipesHydrated());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/recipes", async (req, res) => {
  try {
    const {
      id,
      name,
      yield: yieldCount,
      margin_ratio,
      final_price,
      unit_cost,
      invisible_costs,
      subtotal,
      ingredients
    } = req.body;
    if (!name || !yieldCount || margin_ratio === void 0 || !ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Configura\xE7\xE3o de receita inv\xE1lida ou campos incompletos." });
    }
    const saved = await saveRecipe({
      id,
      name,
      yield: Number(yieldCount),
      margin_ratio: Number(margin_ratio),
      final_price: Number(final_price),
      unit_cost: Number(unit_cost),
      invisible_costs: Number(invisible_costs),
      subtotal: Number(subtotal),
      ingredients
    });
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRecipe(Number(id));
    res.json({ success: true, message: `Receita id ${id} removida com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/invisible-costs", async (_req, res) => {
  try {
    res.json(await getInvisibleCostsDict());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/invisible-costs", requireRole("admin"), async (req, res) => {
  try {
    const costs = req.body;
    await upsertInvisibleCosts(costs);
    res.json({ success: true, updated: costs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/promotions", async (req, res) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(VAREJO_PROMOTIONS);
    }
    res.json(await findAllPromotions());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/promotions/:id/apply", async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    const updated = await setPromotionActive(Number(id), !!active);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/promotions", async (req, res) => {
  try {
    const { title, subtitle, type, discount, recovery, status } = req.body;
    const newPromo = await createPromotion({
      title,
      subtitle,
      type,
      discount,
      recovery: Number(recovery || 0),
      status: status || "Normal"
    });
    res.json(newPromo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/marketing/generate", async (req, res) => {
  try {
    const { context, type } = req.body;
    if (!context) {
      return res.status(400).json({ error: "Descreva o produto ou ocasi\xE3o do marketing." });
    }
    let prompt = "";
    if (type === "caption") {
      prompt = `Voc\xEA \xE9 um especialista em marketing gastron\xF4mico para confeitarias premium. Escreva uma legenda irresist\xEDvel de Instagram para o seguinte produto ou ocasi\xE3o culin\xE1ria: "${context}". Use quebras de linha amig\xE1veis, emojis de doces/confeitaria, e gatilhos mentais que deem \xE1gua na boca no p\xFAblico brasileiro.`;
    } else if (type === "hashtags") {
      prompt = `Crie uma lista com as 15 hashtags mais relevantes e de alta convers\xE3o no Instagram para impulsionar e atrair clientes de confeitaria fina com foco em: "${context}".`;
    } else if (type === "seasonal") {
      prompt = `Como um consultor de marketing criativo de confeitarias, crie um roteiro de ideias criativas de posts de Instagram para o produto ou ocasi\xE3o: "${context}". D\xEA ideias focadas em datas comemorativas nacionais ou sazonais para divulgar essa novidade. Retorne como t\xF3picos scannables enriquecidos em portugu\xEAs.`;
    } else if (type === "flyer") {
      prompt = `Crie textos de divulga\xE7\xE3o irresist\xEDveis para um flyer/post quadrado de redes sociais sobre o produto ou situa\xE7\xE3o: "${context}". D\xEA a sua resposta exclusivamente no formato JSON abaixo, sem blocos de c\xF3digo markdown adicionais (N\xC3O use \`\`\`json ou semelhantes, responda puramente com um objeto JSON v\xE1lido). Se n\xE3o souber o pre\xE7o do produto, invente uma sugest\xE3o realista de pre\xE7o em Reais.
Formato do JSON de retorno:
{
  "headline": "Uma frase de impacto curta em mai\xFAsculas (Ex: S\xD3 HOJE, NOVIDADE IRRESIST\xCDVEL, PROMO\xC7\xC3O IMPED\xCDVEL, QUENTINHO DO FORNO)",
  "productName": "Nome premium do produto culin\xE1rio",
  "description": "Uma frase descritiva curta (m\xE1ximo de 65 caracteres) que chame aten\xE7\xE3o e d\xEA muita \xE1gua na boca",
  "priceTag": "Pre\xE7o formatado em Reais (Ex: R$ 18,50)",
  "cta": "Excelente chamada para a\xE7\xE3o (Ex: Pe\xE7a j\xE1 pelo WhatsApp!, Garanta o seu!)"
}`;
    } else {
      prompt = `Cria uma estrat\xE9gia promocional de marketing completa para o produto ou situa\xE7\xE3o de confeitaria: "${context}". Escreva uma copy de vendas irresist\xEDvel com hashtags inclusas.`;
    }
    const ai = getAiClient();
    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Voc\xEA \xE9 um assistente especialista em marketing digital especializado em confeitarias, padarias e culin\xE1ria doce brasileira. Seu tom \xE9 amig\xE1vel, entusiasmado, persuasivo e focado em dar fome ou inspirar desejos irresist\xEDveis."
      }
    });
    let generatedText = result.text || "N\xE3o foi poss\xEDvel gerar sugest\xF5es neste momento.";
    if (type === "flyer") {
      generatedText = generatedText.replace(/```json/gi, "").replace(/```/g, "").trim();
    }
    res.json({ generatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/suppliers", async (req, res) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json(VAREJO_SUPPLIERS);
    }
    res.json(await findAllSuppliers());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/suppliers", async (req, res) => {
  try {
    const { name, contact, category, active, items } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome \xE9 obrigat\xF3rio" });
    }
    const newSupplier = await createSupplier({
      name,
      contact,
      category,
      active,
      items
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.put("/suppliers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, category, active, items } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome \xE9 obrigat\xF3rio" });
    }
    const updated = await updateSupplier(Number(id), {
      name,
      contact,
      category,
      active,
      items
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.delete("/suppliers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSupplier(Number(id));
    res.json({ success: true, message: `Fornecedor id ${id} removido com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/orders", async (req, res) => {
  try {
    if (isVarejoTheme(getThemeParam(req))) {
      return res.json([...VAREJO_ORDERS].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    }
    res.json(await findAllOrders());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status \xE9 obrigat\xF3rio" });
    }
    const updated = await updateOrderStatus(Number(id), status);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateOrder(Number(id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteOrder(Number(id));
    res.json({ success: true, message: `Pedido ${id} removido com sucesso` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.get("/assistant/insights", async (_req, res) => {
  try {
    const [insights, action_cards] = await Promise.all([
      buildInsights(),
      buildActionCards()
    ]);
    res.json({ insights, action_cards });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/assistant/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Informe sua pergunta." });
    }
    const result = await chatWithAssistant(
      message.trim(),
      Array.isArray(history) ? history : []
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.post("/automation/run", requireRole("admin"), async (_req, res) => {
  try {
    const logs = await runAutomationCycle();
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router2.patch("/recipes/:id/price", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { final_price } = req.body;
    if (final_price === void 0 || Number(final_price) <= 0) {
      return res.status(400).json({ error: "Pre\xE7o inv\xE1lido." });
    }
    const recipes = await findAllRecipesHydrated();
    if (!recipes.some((r) => r.id === id)) {
      return res.status(404).json({ error: "Receita n\xE3o encontrada." });
    }
    await AppDataSource.getRepository(Recipe).update(id, {
      final_price: Number(final_price)
    });
    const updated = (await findAllRecipesHydrated()).find(
      (r) => r.id === id
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
var routes_default = router2;

// swagger.ts
var import_swagger_jsdoc = __toESM(require("swagger-jsdoc"));
var themeQueryParam = {
  name: "theme",
  in: "query",
  description: "Setor da aplica\xE7\xE3o. Use `varejo` para dados de demonstra\xE7\xE3o do com\xE9rcio/varejo; omita ou use outro valor para confeitaria (PostgreSQL).",
  schema: { type: "string", enum: ["confeitaria", "varejo"], example: "confeitaria" }
};
var errorResponse = {
  description: "Erro interno ou valida\xE7\xE3o",
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Error" }
    }
  }
};
var options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Gestify API \u2014 Confeitaria Studio",
      version: "1.0.0",
      description: "API REST do Gestify para gest\xE3o de confeitaria e varejo: estoque, receitas, precifica\xE7\xE3o, promo\xE7\xF5es, fornecedores, pedidos e marketing com IA (Gemini).",
      contact: {
        name: "Gestify"
      }
    },
    servers: [
      { url: "/api", description: "Servidor local (prefixo /api)" }
    ],
    tags: [
      { name: "Configura\xE7\xF5es", description: "Chave Gemini e status da IA" },
      { name: "Dashboard", description: "Indicadores e an\xE1lises" },
      { name: "Produtos", description: "Estoque e cat\xE1logo" },
      { name: "Receitas", description: "Precifica\xE7\xE3o inteligente" },
      { name: "Custos invis\xEDveis", description: "Overhead de produ\xE7\xE3o" },
      { name: "Promo\xE7\xF5es", description: "Campanhas e descontos" },
      { name: "Marketing", description: "Gera\xE7\xE3o de copy com Gemini" },
      { name: "Fornecedores", description: "Cadastro de fornecedores" },
      { name: "Pedidos", description: "Pedidos e log\xEDstica de entrega" }
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: { error: { type: "string" } }
        },
        SuccessMessage: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" }
          }
        },
        GeminiStatus: {
          type: "object",
          properties: { configured: { type: "boolean" } }
        },
        GeminiKeyRequest: {
          type: "object",
          required: ["apiKey"],
          properties: { apiKey: { type: "string", description: "Chave da API Google Gemini" } }
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            sku: { type: "string" },
            name: { type: "string" },
            stock: { type: "number" },
            minimum: { type: "number" },
            expiration: { type: "string", format: "date" },
            status: { type: "string", enum: ["OK", "Baixo", "Vencendo"] },
            price: { type: "number" },
            description: { type: "string" },
            image_url: { type: "string" },
            category: { type: "string" },
            is_promo: { type: "boolean" },
            promo_price: { type: "number" },
            barcode: { type: "string" },
            unit_type: { type: "string" },
            wholesale_price: { type: "number" }
          }
        },
        ProductInput: {
          type: "object",
          required: ["sku", "name", "stock", "minimum", "expiration"],
          properties: {
            sku: { type: "string" },
            name: { type: "string" },
            stock: { type: "number" },
            minimum: { type: "number" },
            expiration: { type: "string" },
            status: { type: "string", default: "OK" },
            price: { type: "number" },
            description: { type: "string" },
            image_url: { type: "string" },
            category: { type: "string" },
            is_promo: { type: "boolean" },
            promo_price: { type: "number" },
            barcode: { type: "string" },
            unit_type: { type: "string" },
            wholesale_price: { type: "number" }
          }
        },
        RecipeIngredient: {
          type: "object",
          properties: {
            id: { type: "integer" },
            recipe_id: { type: "integer" },
            name: { type: "string" },
            amount: { type: "number" },
            unit: { type: "string" },
            price: { type: "number" }
          }
        },
        Recipe: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            yield: { type: "number" },
            margin_ratio: { type: "number" },
            final_price: { type: "number" },
            unit_cost: { type: "number" },
            invisible_costs: { type: "number" },
            subtotal: { type: "number" },
            ingredients: {
              type: "array",
              items: { $ref: "#/components/schemas/RecipeIngredient" }
            }
          }
        },
        RecipeInput: {
          type: "object",
          required: ["name", "yield", "margin_ratio", "ingredients"],
          properties: {
            id: { type: "integer", description: "Se informado, atualiza a receita existente" },
            name: { type: "string" },
            yield: { type: "number" },
            margin_ratio: { type: "number" },
            final_price: { type: "number" },
            unit_cost: { type: "number" },
            invisible_costs: { type: "number" },
            subtotal: { type: "number" },
            ingredients: {
              type: "array",
              items: { $ref: "#/components/schemas/RecipeIngredient" }
            }
          }
        },
        InvisibleCosts: {
          type: "object",
          additionalProperties: { type: "number" },
          example: {
            packaging: 120,
            delivery: 80,
            energy: 45,
            gas: 30,
            labor: 200,
            ifood_ratio: 0.27
          }
        },
        Promotion: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            subtitle: { type: "string" },
            type: { type: "string" },
            discount: { type: "string" },
            recovery: { type: "number" },
            status: { type: "string" },
            active: { type: "integer", enum: [0, 1] }
          }
        },
        PromotionInput: {
          type: "object",
          properties: {
            title: { type: "string" },
            subtitle: { type: "string" },
            type: { type: "string" },
            discount: { type: "string" },
            recovery: { type: "number" },
            status: { type: "string" }
          }
        },
        MarketingGenerateRequest: {
          type: "object",
          required: ["context"],
          properties: {
            context: { type: "string", description: "Produto ou ocasi\xE3o para o conte\xFAdo" },
            type: {
              type: "string",
              enum: ["caption", "hashtags", "seasonal", "flyer"],
              description: "Tipo de conte\xFAdo gerado pela IA"
            }
          }
        },
        MarketingGenerateResponse: {
          type: "object",
          properties: { generatedText: { type: "string" } }
        },
        Supplier: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            contact: { type: "string" },
            category: { type: "string" },
            active: { type: "integer" },
            items: { type: "array", items: { type: "string" } }
          }
        },
        SupplierInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string" },
            contact: { type: "string" },
            category: { type: "string" },
            active: { type: "integer" },
            items: { type: "array", items: { type: "string" } }
          }
        },
        OrderItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            quantity: { type: "number" },
            price: { type: "number" }
          }
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "integer" },
            customer_name: { type: "string" },
            customer_phone: { type: "string" },
            type: { type: "string", enum: ["Balc\xE3o", "Delivery", "Encomenda Sazonal"] },
            status: {
              type: "string",
              enum: ["Em preparo", "Pronto para Entrega", "Rota de Envio", "Entregue"]
            },
            items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
            total_value: { type: "number" },
            delivery_fee: { type: "number" },
            cep: { type: "string" },
            rua: { type: "string" },
            bairro: { type: "string" },
            cidade: { type: "string" },
            estado: { type: "string" },
            numero: { type: "string" },
            complemento: { type: "string" },
            estimated_time: { type: "string" },
            driver_name: { type: "string" },
            driver_type: { type: "string" },
            driver_phone: { type: "string" },
            transport_obs: { type: "string" },
            created_at: { type: "string", format: "date-time" }
          }
        },
        OrderInput: {
          type: "object",
          required: ["customer_name", "type"],
          properties: {
            customer_name: { type: "string" },
            customer_phone: { type: "string" },
            type: { type: "string" },
            status: { type: "string" },
            items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
            total_value: { type: "number" },
            delivery_fee: { type: "number" },
            cep: { type: "string" },
            rua: { type: "string" },
            bairro: { type: "string" },
            cidade: { type: "string" },
            estado: { type: "string" },
            numero: { type: "string" },
            complemento: { type: "string" },
            estimated_time: { type: "string" },
            driver_name: { type: "string" },
            driver_type: { type: "string" },
            driver_phone: { type: "string" },
            transport_obs: { type: "string" },
            created_at: { type: "string" }
          }
        },
        DashboardStats: {
          type: "object",
          properties: {
            weekly_revenue: { type: "number" },
            weekly_profit: { type: "number" },
            low_stock_count: { type: "number" },
            near_expiry_count: { type: "number" },
            revenue_vs_last_week: { type: "number" },
            profit_vs_last_week: { type: "number" },
            low_stock_vs_last_week: { type: "number" },
            near_expiry_vs_last_week: { type: "number" },
            sales_chart: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "string" },
                  revenue: { type: "number" },
                  profit: { type: "number" }
                }
              }
            },
            top_sold: { type: "array", items: { type: "object" } },
            inactive_products: { type: "array", items: { type: "object" } },
            monthly_totals: { type: "object" }
          }
        }
      }
    },
    paths: {
      "/settings/gemini-status": {
        get: {
          tags: ["Configura\xE7\xF5es"],
          summary: "Verifica se a chave Gemini est\xE1 configurada",
          responses: {
            "200": {
              description: "Status da configura\xE7\xE3o",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/GeminiStatus" }
                }
              }
            }
          }
        }
      },
      "/settings/gemini-key": {
        post: {
          tags: ["Configura\xE7\xF5es"],
          summary: "Salva a chave da API Gemini",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/GeminiKeyRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "Chave salva",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      configured: { type: "boolean" }
                    }
                  }
                }
              }
            },
            "400": errorResponse
          }
        }
      },
      "/dashboard": {
        get: {
          tags: ["Dashboard"],
          summary: "Estat\xEDsticas do dashboard",
          parameters: [themeQueryParam],
          responses: {
            "200": {
              description: "M\xE9tricas e gr\xE1ficos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DashboardStats" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/products": {
        get: {
          tags: ["Produtos"],
          summary: "Lista produtos do estoque",
          parameters: [themeQueryParam],
          responses: {
            "200": {
              description: "Lista de produtos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Product" }
                  }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Produtos"],
          summary: "Cadastra novo produto",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductInput" }
              }
            }
          },
          responses: {
            "201": {
              description: "Produto criado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      },
      "/products/{id}": {
        put: {
          tags: ["Produtos"],
          summary: "Atualiza produto",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductInput" }
              }
            }
          },
          responses: {
            "200": {
              description: "Produto atualizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" }
                }
              }
            },
            "500": errorResponse
          }
        },
        delete: {
          tags: ["Produtos"],
          summary: "Remove produto",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            "200": {
              description: "Produto removido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/recipes": {
        get: {
          tags: ["Receitas"],
          summary: "Lista receitas com ingredientes",
          responses: {
            "200": {
              description: "Receitas",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Recipe" }
                  }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Receitas"],
          summary: "Cria ou atualiza receita",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RecipeInput" }
              }
            }
          },
          responses: {
            "201": {
              description: "Receita salva",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Recipe" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      },
      "/recipes/{id}": {
        delete: {
          tags: ["Receitas"],
          summary: "Remove receita",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            "200": {
              description: "Receita removida",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/invisible-costs": {
        get: {
          tags: ["Custos invis\xEDveis"],
          summary: "Obt\xE9m custos invis\xEDveis (objeto chave-valor)",
          responses: {
            "200": {
              description: "Custos",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/InvisibleCosts" }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Custos invis\xEDveis"],
          summary: "Atualiza custos invis\xEDveis",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/InvisibleCosts" }
              }
            }
          },
          responses: {
            "200": {
              description: "Custos atualizados",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      updated: { $ref: "#/components/schemas/InvisibleCosts" }
                    }
                  }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/promotions": {
        get: {
          tags: ["Promo\xE7\xF5es"],
          summary: "Lista promo\xE7\xF5es",
          parameters: [themeQueryParam],
          responses: {
            "200": {
              description: "Promo\xE7\xF5es",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Promotion" }
                  }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Promo\xE7\xF5es"],
          summary: "Cria promo\xE7\xE3o",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PromotionInput" }
              }
            }
          },
          responses: {
            "200": {
              description: "Promo\xE7\xE3o criada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Promotion" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/promotions/{id}/apply": {
        post: {
          tags: ["Promo\xE7\xF5es"],
          summary: "Ativa ou desativa promo\xE7\xE3o",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { active: { type: "boolean" } }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Promo\xE7\xE3o atualizada",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Promotion" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/marketing/generate": {
        post: {
          tags: ["Marketing"],
          summary: "Gera conte\xFAdo de marketing com Gemini",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MarketingGenerateRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "Texto gerado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MarketingGenerateResponse" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      },
      "/suppliers": {
        get: {
          tags: ["Fornecedores"],
          summary: "Lista fornecedores",
          parameters: [themeQueryParam],
          responses: {
            "200": {
              description: "Fornecedores",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Supplier" }
                  }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Fornecedores"],
          summary: "Cadastra fornecedor",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SupplierInput" }
              }
            }
          },
          responses: {
            "201": {
              description: "Fornecedor criado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Supplier" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      },
      "/suppliers/{id}": {
        put: {
          tags: ["Fornecedores"],
          summary: "Atualiza fornecedor",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SupplierInput" }
              }
            }
          },
          responses: {
            "200": {
              description: "Fornecedor atualizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Supplier" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        },
        delete: {
          tags: ["Fornecedores"],
          summary: "Remove fornecedor",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            "200": {
              description: "Fornecedor removido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/orders": {
        get: {
          tags: ["Pedidos"],
          summary: "Lista pedidos",
          parameters: [themeQueryParam],
          responses: {
            "200": {
              description: "Pedidos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Order" }
                  }
                }
              }
            },
            "500": errorResponse
          }
        },
        post: {
          tags: ["Pedidos"],
          summary: "Cria pedido",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderInput" }
              }
            }
          },
          responses: {
            "201": {
              description: "Pedido criado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      },
      "/orders/{id}": {
        put: {
          tags: ["Pedidos"],
          summary: "Atualiza pedido completo",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderInput" }
              }
            }
          },
          responses: {
            "200": {
              description: "Pedido atualizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" }
                }
              }
            },
            "500": errorResponse
          }
        },
        delete: {
          tags: ["Pedidos"],
          summary: "Remove pedido",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          responses: {
            "200": {
              description: "Pedido removido",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessMessage" }
                }
              }
            },
            "500": errorResponse
          }
        }
      },
      "/orders/{id}/status": {
        put: {
          tags: ["Pedidos"],
          summary: "Atualiza apenas o status do pedido",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "integer" } }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: { status: { type: "string" } }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Status atualizado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" }
                }
              }
            },
            "400": errorResponse,
            "500": errorResponse
          }
        }
      }
    }
  },
  apis: []
};
var swaggerSpec = (0, import_swagger_jsdoc.default)(options);

// database/migrate-image-url.ts
async function migrateImageUrlColumn() {
  const rows = await AppDataSource.query(`
      SELECT data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'products'
        AND column_name = 'image_url'
    `);
  if (rows.length === 0) {
    return;
  }
  const col = rows[0];
  if (col.data_type === "text") {
    console.log("[db] products.image_url j\xE1 \xE9 TEXT");
    return;
  }
  await AppDataSource.query(`
    ALTER TABLE products
    ALTER COLUMN image_url TYPE TEXT
    USING image_url::TEXT
  `);
  console.log(
    `[db] products.image_url migrado para TEXT (era ${col.data_type}` + (col.character_maximum_length ? ` ${col.character_maximum_length}` : "") + ")"
  );
}

// database/migrate-auth-tables.ts
async function migrateAuthTables() {
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(16) NOT NULL DEFAULT 'operator',
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(32) NOT NULL,
      email VARCHAR(255),
      address VARCHAR(512),
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  console.log("[db] Tabelas users e customers verificadas");
}

// seeds/seed-data.ts
var SEED_INVISIBLE_COSTS = [
  { key: "packaging", value: 0.35 },
  { key: "delivery", value: 0.8 },
  { key: "energy", value: 0.25 },
  { key: "gas", value: 0.18 },
  { key: "labor", value: 1.2 },
  { key: "ifood_ratio", value: 12 }
];
var SEED_PRODUCTS = [
  {
    sku: "BRG-001",
    name: "Brigadeiro Gourmet",
    stock: 48,
    minimum: 30,
    expiration: "2026-05-27",
    status: "OK",
    price: 5.6,
    description: "Delicioso brigadeiro tradicional feito com cacau belga 50% e granulado split premium.",
    image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    category: "Docinhos",
    is_promo: false,
    promo_price: 4.5
  },
  {
    sku: "BLP-002",
    name: "Bolo de Pote Ninho",
    stock: 12,
    minimum: 15,
    expiration: "2026-05-23",
    status: "Baixo",
    price: 12,
    description: "Camadas alternadas de bolo de baunilha fofinho, recheio cremoso de Leite Ninho e calda de chocolate.",
    image_url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&q=80",
    category: "Bolos",
    is_promo: false,
    promo_price: 10
  },
  {
    sku: "TRF-003",
    name: "Trufa Belga 70%",
    stock: 6,
    minimum: 20,
    expiration: "2026-05-21",
    status: "Vencendo",
    price: 7.5,
    description: "Trufa artesanal cremosa por dentro com casquinha crocante de chocolate amargo 70%.",
    image_url: "https://images.unsplash.com/photo-1548907040-4d42b52145ca?w=500&q=80",
    category: "Docinhos",
    is_promo: true,
    promo_price: 5.9
  },
  {
    sku: "CHK-004",
    name: "Cheesecake Frutas Vermelhas",
    stock: 22,
    minimum: 10,
    expiration: "2026-06-01",
    status: "OK",
    price: 85,
    description: "Cheesecake assada cl\xE1ssica sobre base de biscoitos amanteigados, finalizada com calda espessa artesanal de frutas vermelhas.",
    image_url: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=500&q=80",
    category: "Tortas",
    is_promo: false,
    promo_price: 75
  },
  {
    sku: "MCR-005",
    name: "Macaron Pistache",
    stock: 4,
    minimum: 12,
    expiration: "2026-05-25",
    status: "Baixo",
    price: 9,
    description: "Cl\xE1ssico macaron de farinha de am\xEAndoas recheado com ganache cremosa de pistache iraniano.",
    image_url: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&q=80",
    category: "Docinhos",
    is_promo: false,
    promo_price: 8
  },
  {
    sku: "CPC-006",
    name: "Cupcake Lim\xE3o Siciliano",
    stock: 4,
    minimum: 10,
    expiration: "2026-05-30",
    status: "OK",
    price: 8.5,
    description: "Muffin c\xEDtrico aromatizado com raspas de lim\xE3o siciliano, recheio de lemon curd e cobertura de merengue su\xED\xE7o dourado.",
    image_url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&q=80",
    category: "Bolos",
    is_promo: false,
    promo_price: 7
  },
  {
    sku: "BVR-007",
    name: "Bolo Red Velvet (fatia)",
    stock: 3,
    minimum: 8,
    expiration: "2026-05-28",
    status: "OK",
    price: 15,
    description: "Fatia generosa de bolo aveludado vermelho recheado com creme cl\xE1ssico \xE0 base de cream cheese e chocolate branco.",
    image_url: "https://images.unsplash.com/photo-1616260841585-0457aa334645?w=500&q=80",
    category: "Bolos",
    is_promo: true,
    promo_price: 12.5
  }
];
var SEED_RECIPE = {
  name: "Brigadeiro Gourmet",
  yield: 40,
  margin_ratio: 80,
  final_price: 5.6,
  unit_cost: 0.3,
  invisible_costs: 2.78,
  subtotal: 4.92,
  ingredients: [
    { name: "Leite condensado", amount: 395, unit: "g", price: 12.9 },
    { name: "Chocolate em p\xF3", amount: 200, unit: "g", price: 24.5 },
    { name: "Manteiga", amount: 50, unit: "g", price: 38 }
  ]
};
var SEED_SALES_HISTORY = [
  { day: "Seg", revenue: 1e3, profit: 420 },
  { day: "Ter", revenue: 1300, profit: 550 },
  { day: "Qua", revenue: 1100, profit: 460 },
  { day: "Qui", revenue: 2e3, profit: 840 },
  { day: "Sex", revenue: 2500, profit: 1060 },
  { day: "S\xE1b", revenue: 3200, profit: 1340 },
  { day: "Dom", revenue: 1390, profit: 550 }
];
var SEED_PROMOTIONS = [
  {
    title: "Combo Trufa + Caf\xE9",
    subtitle: "Trufa Belga 70% vence em 3 dias",
    type: "Combo",
    discount: "-25%",
    recovery: 320,
    status: "Aviso",
    active: 0
  },
  {
    title: "Leve 3, pague 2 \u2014 Macaron Pistache",
    subtitle: "Pouca sa\xEDda h\xE1 18 dias",
    type: "BOGO",
    discount: "L3P2",
    recovery: 480,
    status: "Normal",
    active: 0
  },
  {
    title: "Brigadeiro Box 12un",
    subtitle: "Excesso em estoque (+48 un)",
    type: "Desconto",
    discount: "-15%",
    recovery: 680,
    status: "Sucesso",
    active: 0
  }
];
var SEED_SUPPLIERS = [
  {
    name: "Distribuidor Coca-Cola PMW",
    contact: "(63) 98765-4321 / pedidos@cocacola-pmw.com.br",
    category: "Bebidas & Refrigerantes",
    active: 1,
    items: [
      "Coca-Cola Lata 350ml",
      "Coca-Cola Zero 2L",
      "Suco Del Valle Uva",
      "Fanta Laranja 350ml",
      "\xC1gua Mineral Crystal"
    ]
  },
  {
    name: "Latic\xEDnios PMW",
    contact: "(63) 3456-7890 / comercial@laticinios-pmw.com.br",
    category: "Latic\xEDnios & Derivados",
    active: 1,
    items: [
      "Manteiga Sem Sal Extra",
      "Creme de Leite Fresco 35%",
      "Leite Condensado Itamb\xE9",
      "Queijo Minas Padr\xE3o",
      "Requeij\xE3o Cremoso Balde"
    ]
  },
  {
    name: "Embalagens MultiBox",
    contact: "vendas@multiboxembalagens.com.br",
    category: "Embalagens & descart\xE1veis",
    active: 1,
    items: [
      "Caixa para Brigadeiro 12un",
      "Sacola Kraft Delivery",
      "Forminha N\xB0 4 Marrom",
      "Fita de Cetim Vermelha 10mm"
    ]
  }
];
function buildSeedOrders() {
  const now = Date.now();
  return [
    {
      customer_name: "Mariana Souza",
      customer_phone: "(63) 99276-5432",
      type: "Delivery",
      status: "Rota de Envio",
      items: [
        { id: 1, name: "Brigadeiro Gourmet", quantity: 12, price: 5.6 },
        { id: 2, name: "Bolo de Pote Ninho", quantity: 2, price: 12 }
      ],
      total_value: 101.2,
      delivery_fee: 10,
      cep: "77001-310",
      rua: "NS 15",
      bairro: "Plano Diretor Sul",
      cidade: "Palmas",
      estado: "TO",
      numero: "1000",
      complemento: "Apto 42",
      estimated_time: "Imediato",
      driver_name: "Carlos Costa",
      driver_type: "Pr\xF3prio",
      driver_phone: "(63) 99276-5432",
      transport_obs: "Cuidado: Manter Resfriado",
      created_at: new Date(now - 30 * 60 * 1e3)
    },
    {
      customer_name: "Guilherme Santos",
      customer_phone: "(63) 99276-5432",
      type: "Balc\xE3o",
      status: "Pronto para Entrega",
      items: [{ id: 4, name: "Cheesecake Frutas Vermelhas", quantity: 1, price: 85 }],
      total_value: 85,
      delivery_fee: 0,
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
      estimated_time: "Imediato",
      driver_name: "",
      driver_type: "Pr\xF3prio",
      driver_phone: "",
      transport_obs: "Retirada agendada para 18h. Bolo de travessa de vidro.",
      created_at: new Date(now - 60 * 60 * 1e3)
    },
    {
      customer_name: "Ana Beatriz",
      customer_phone: "(63) 99276-5832",
      type: "Encomenda Sazonal",
      status: "Em preparo",
      items: [{ id: 7, name: "Bolo Red Velvet (fatia)", quantity: 5, price: 15 }],
      total_value: 75,
      delivery_fee: 0,
      cep: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      complemento: "",
      estimated_time: "Sob Consulta",
      driver_name: "",
      driver_type: "Terceirizado",
      driver_phone: "",
      transport_obs: "Cuidado: Bolo Festivo de Andar",
      created_at: new Date(now - 15 * 60 * 1e3)
    }
  ];
}

// seeds/run-seeds.ts
async function runSeeds() {
  const productRepo = AppDataSource.getRepository(Product);
  const recipeRepo = AppDataSource.getRepository(Recipe);
  const ingRepo = AppDataSource.getRepository(RecipeIngredient);
  const costRepo = AppDataSource.getRepository(InvisibleCost);
  const salesRepo = AppDataSource.getRepository(SalesHistory);
  const promoRepo = AppDataSource.getRepository(Promotion);
  const supplierRepo = AppDataSource.getRepository(Supplier);
  const orderRepo = AppDataSource.getRepository(Order);
  if (await costRepo.count() === 0) {
    await costRepo.save(SEED_INVISIBLE_COSTS.map((c) => costRepo.create(c)));
    console.log("[seed] Custos invis\xEDveis");
  }
  if (await productRepo.count() === 0) {
    await productRepo.save(SEED_PRODUCTS.map((p) => productRepo.create(p)));
    console.log("[seed] Produtos");
  }
  if (await recipeRepo.count() === 0) {
    const recipe = recipeRepo.create({
      name: SEED_RECIPE.name,
      yield: SEED_RECIPE.yield,
      margin_ratio: SEED_RECIPE.margin_ratio,
      final_price: SEED_RECIPE.final_price,
      unit_cost: SEED_RECIPE.unit_cost,
      invisible_costs: SEED_RECIPE.invisible_costs,
      subtotal: SEED_RECIPE.subtotal
    });
    const saved = await recipeRepo.save(recipe);
    await ingRepo.save(
      SEED_RECIPE.ingredients.map(
        (ing) => ingRepo.create({ ...ing, recipe_id: saved.id })
      )
    );
    console.log("[seed] Receitas");
  }
  if (await salesRepo.count() === 0) {
    await salesRepo.save(SEED_SALES_HISTORY.map((s) => salesRepo.create(s)));
    console.log("[seed] Hist\xF3rico de vendas");
  }
  if (await promoRepo.count() === 0) {
    await promoRepo.save(SEED_PROMOTIONS.map((p) => promoRepo.create(p)));
    console.log("[seed] Promo\xE7\xF5es");
  }
  if (await supplierRepo.count() === 0) {
    await supplierRepo.save(SEED_SUPPLIERS.map((s) => supplierRepo.create(s)));
    console.log("[seed] Fornecedores");
  }
  if (await orderRepo.count() === 0) {
    await orderRepo.save(buildSeedOrders().map((o) => orderRepo.create(o)));
    console.log("[seed] Pedidos");
  }
}

// database/init.ts
var initialized = false;
async function initializeDatabase() {
  if (initialized) return;
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    const url = process.env.DATABASE_URL || "postgresql://localhost:5432/gestify";
    const host = url.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
    console.log("[db] PostgreSQL conectado:", host);
  }
  await migrateImageUrlColumn();
  await migrateAuthTables();
  await seedDefaultAdmin();
  await runSeeds();
  initialized = true;
  console.log("[db] Seeds verificados \u2014 base pronta.");
}

// server.ts
var PORT = Number(process.env.PORT) || 3e3;
var isVercel = Boolean(process.env.VERCEL);
if (isGeminiConfigured()) {
  console.log("[env] GEMINI_API_KEY OK \u2014 marketing IA dispon\xEDvel.");
} else {
  console.warn(
    '[env] GEMINI_API_KEY ausente. Configure em: Configura\xE7\xF5es \u2192 Chave Gemini,\nou crie Backend/.env.local com GEMINI_API_KEY="sua-chave"'
  );
}
var app = (0, import_express3.default)();
app.use((req, _res, next) => {
  if (req.url === "/" || req.url.startsWith("/?")) {
    const original = req.headers["x-vercel-original-path"] ?? req.headers["x-invoke-path"] ?? req.headers["x-forwarded-uri"];
    if (typeof original === "string" && original.length > 0) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      req.url = original.split("?")[0] + query;
    }
  }
  next();
});
app.use(
  (0, import_cors.default)({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true
  })
);
app.use(import_express3.default.json());
app.use((req, _res, next) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
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
    import_swagger_ui_express.default.serve,
    import_swagger_ui_express.default.setup(swaggerSpec, {
      customSiteTitle: "Gestify API Docs"
    })
  );
}
app.use("/api", async (req, res, next) => {
  try {
    await initializeDatabase();
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Falha ao inicializar o banco de dados:", message);
    res.status(500).json({ error: "Erro interno ao conectar ao banco de dados" });
  }
});
app.use("/api", routes_default);
if (!isVercel) {
  initializeDatabase().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`API Gestify rodando em http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  }).catch((error) => {
    console.error("Falha ao iniciar o servidor local:", error?.message || error);
    if (error?.code === "28P01") {
      console.error(
        "\n[db] Autentica\xE7\xE3o PostgreSQL falhou. Ajuste DATABASE_URL em Backend/.env.local (ex: postgresql://postgres:SUA_SENHA@localhost:5432/gestify) e confira se o servi\xE7o est\xE1 ativo."
      );
    } else if (error?.code === "ECONNREFUSED") {
      console.error(
        "\n[db] PostgreSQL n\xE3o est\xE1 acess\xEDvel. Inicie o servi\xE7o na porta 5432 ou use: docker compose up -d postgres"
      );
    }
    process.exit(1);
  });
}
var server_default = app;

// vercel/handler.ts
module.exports = (0, import_serverless_http.default)(server_default);
