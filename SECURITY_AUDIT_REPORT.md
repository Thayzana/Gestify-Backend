# Relatório de Auditoria de Segurança

**Escopo:** Projeto `Gestify-Backend2` completo, incluindo integração com frontend `PI3/Frontend`
**Nível de profundidade:** Profunda
**Data:** 2026-06-25

---

## Resumo executivo

- Achados críticos: 0
- Achados altos: 2
- Achados médios: 5
- Achados baixos: 3

### 5 ações mais urgentes

1. Reforçar o controle de acesso em rotas autenticadas, especialmente `POST /promotions/:id/apply`, `PUT /orders/:id/status`, `DELETE /customers/:id` e `POST /orders`.
2. Corrigir a configuração de SSL do banco em `database/data-source.ts` para garantir validação de certificado (`rejectUnauthorized: true`) em produção.
3. Corrigir a rota `POST /orders` para exigir autenticação e revisar `DELETE /customers/:id` para exigência de papel de administrador.
4. Implementar validação de esquema robusta para todos os payloads de API (orders, products, customers, promotions, marketing, etc.).
5. Adicionar cabeçalhos HTTP de segurança com `helmet` ou configuração equivalente e limitar acesso público a `/api-docs` em produção.

---

## Achados detalhados

### 1. Alto — Configuração de banco de dados SSL insegura

- Localização: `database/data-source.ts`, função `getSslConfig()`
- Linhas: 36-37, 63

#### Descrição
A configuração de SSL pode desabilitar a validação de certificado com `rejectUnauthorized: false`, especialmente em ambientes de produção ou Supabase.

#### Evidência
```ts
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";
const sslOptions: any = { rejectUnauthorized };
```

#### Impacto potencial
- Tráfego para o banco de dados pode ser interceptado por um atacante em um ataque man-in-the-middle.
- Dados sensíveis e credenciais podem ser expostos.

#### Severidade
Alta

#### Recomendação
- Forçar `rejectUnauthorized: true` em produção.
- Aceitar certificados válidos e confiáveis do banco de dados.
- Remover configurações que desabilitem efetivamente a validação TLS.

#### Referências
- CWE-295: Improper Certificate Validation
- OWASP A06 Cryptographic Failures
- OWASP A02 Security Misconfiguration

---

### 2. Alto — Autorização insuficiente em endpoints autenticados

- Localização: `routes.ts`
- Linhas: 149, 159, 178, 208, 423, 437, 548, 573

#### Descrição
A aplicação exige autenticação para muitos endpoints, mas nem todas as operações sensíveis possuem a autorização por papel adequada. Usuários autenticados podem alterar recursos de negócio potencialmente restritos.

#### Evidência
```ts
router.post("/customers", async (req: Request, res: Response) => { ... });
router.post("/promotions", async (req: Request, res: Response) => { ... });
router.post("/marketing/generate", async (req: Request, res: Response) => { ... });
router.put("/orders/:id", requireRole("admin"), async (req: Request, res: Response) => { ... });
```

#### Impacto potencial
- Usuários com permissões reduzidas podem executar ações não autorizadas.
- Pode levar a manipulação indevida de promoções, marketing e dados de pedidos.

#### Severidade
Alta

#### Recomendação
- Revisar e aplicar autorização por função sempre que a operação impactar negócios ou dados sensíveis.
- Usar `requireRole("admin")` ou regras baseadas em contexto para endpoints de marketing, promoções e alteração de pedidos.

#### Referências
- CWE-285: Improper Authorization
- OWASP A01 Broken Access Control

---

### 3. Médio — Validação de entrada fraca e sanitização limitada

- Localização: `routes.ts`, `middleware/sanitize.middleware.ts`
- Linhas: 65, 149-208, 248-380, 423-689

#### Descrição
A validação de entrada é parcial em várias rotas e o middleware de sanitização trata apenas os caracteres `<` e `>` em strings.

#### Evidência
```ts
app.use(sanitizeMiddleware);
```
```ts
const newProduct = await repo.createProduct({ sku, name, stock: Number(stock), ... });
```
```ts
const updated = await repo.updateOrder(Number(id), updateData);
```

#### Impacto potencial
- Dados inválidos podem ser armazenados e corromper o banco.
- Pode permitir XSS armazenado se o frontend exibir esses valores sem escape suficiente.
- A superfície de ataque é ampliada para injeções e dados maliciosos.

#### Severidade
Média

#### Recomendação
- Aplicar validação de esquema consistente usando `Zod`, `Joi` ou similar.
- Rejeitar campos extras e verificar tipos, formatos, comprimentos e valores permitidos.
- Ampliar sanitização para cobrir contextos HTML, JavaScript e atributos quando aplicável.

#### Referências
- CWE-20: Improper Input Validation
- OWASP A05 Injection

---

### 4. Médio — Endpoints de pedidos e clientes sem autorização de privilégio

- Localização: `routes.ts`
- Linhas: 62, 186, 379, 518

#### Descrição
A rota `POST /orders` é pública e pode criar pedidos sem autenticação. Além disso, `DELETE /customers/:id`, `POST /promotions/:id/apply` e `PUT /orders/:id/status` aceitam requisições apenas com autenticação, sem exigir papel de administrador quando a alteração de recursos sensíveis está em questão.

#### Evidência
```ts
router.post("/orders", async (req: Request, res: Response) => { ... });
router.delete("/customers/:id", async (req: Request, res: Response) => { ... });
router.post("/promotions/:id/apply", async (req: Request, res: Response) => { ... });
router.put("/orders/:id/status", async (req: Request, res: Response) => { ... });
```

#### Impacto potencial
- Usuários não autenticados podem criar pedidos sem controle.
- Usuários autenticados sem privilégios administrativos podem excluir clientes, alternar promoções ou alterar status de pedidos.
- As políticas de negócio e o princípio do menor privilégio são violados.

#### Severidade
Média

#### Recomendação
- Exigir autenticação para `POST /orders` e avaliar se o endpoint deve ser restrito a usuários específicos.
- Aplicar `requireRole("admin")` em `DELETE /customers/:id`, `POST /promotions/:id/apply` e `PUT /orders/:id/status` caso essas ações sejam sensíveis.
- Documentar claramente as regras de acesso para cada endpoint.

#### Referências
- CWE-285: Improper Authorization
- OWASP A01 Broken Access Control

---

### 5. Médio — Dependência externa de CDN em Swagger UI

- Localização: `server.ts`
- Linhas: 101-107

#### Descrição
Em ambiente Vercel, `/api-docs` injeta scripts e estilos de `https://unpkg.com`. Isso expõe o sistema a riscos de CDN comprometido ou man-in-the-middle.

#### Evidência
```ts
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
```

#### Impacto potencial
- Um CDN comprometido pode injetar código malicioso na UI de documentação.
- Revelação de endpoints para usuários não autorizados aumenta a superfície de reconhecimento.

#### Severidade
Média

#### Recomendação
- Servir todos os assets do Swagger UI localmente ou a partir de dependências internas.
- Restringir ou proteger o acesso a `/api-docs` em produção.

#### Referências
- OWASP A03 Software Supply Chain Failures
- OWASP A02 Security Misconfiguration

---

### 6. Baixo — Token JWT armazenado em `localStorage` no frontend

- Localização: `PI3/Frontend/src/lib/auth.ts`
- Linhas: 16-17, 21, 118, 129-130

#### Descrição
O JWT e os dados do usuário são salvos em `localStorage`, expondo-os a scripts maliciosos em casos de XSS.

#### Evidência
```ts
localStorage.setItem(TOKEN_KEY, token);
localStorage.setItem(USER_KEY, JSON.stringify(user));
```

#### Impacto potencial
- Scripts maliciosos podem roubar tokens e assumir sessões.
- Dados de sessão ficam disponíveis no browser até remoção manual.

#### Severidade
Baixa

#### Recomendação
- Usar cookies `HttpOnly`/`Secure` para armazenamento de sessão, se possível.
- Fortalecer a defesa contra XSS no frontend com CSP e validação rigorosa.

#### Referências
- OWASP A07 Authentication Failures

---

### 7. Baixo — Armazenamento local de chaves de API em arquivos de configuração

- Localização: `gemini.ts`
- Linhas: 49-76, 91

#### Descrição
A chave Gemini é escrita em `.gemini-key` e `.env.local` em desenvolvimento. Isso pode expor segredos em arquivos locais.

#### Evidência
```ts
fs.writeFileSync(geminiKeyFile, trimmed, "utf8");
fs.appendFileSync(envLocalPath, envLine, "utf8");
```

#### Impacto potencial
- Chaves podem vazar se o repositório for versionado ou o diretório for exposto.
- Segredos em repouso ficam menos protegidos.

#### Severidade
Baixa

#### Recomendação
- Armazenar chaves apenas em variáveis de ambiente ou ferramentas de segredo.
- Garantir `.env.local` e `.gemini-key` em `.gitignore`.
- Evitar gravação automática de segredos em produção.

#### Referências
- CWE-522: Insufficiently Protected Credentials
- OWASP A03 Software Supply Chain Failures

---

### 8. Baixo — Falta de cabeçalhos HTTP de segurança

- Localização: `server.ts`
- Linhas: 52-65

#### Descrição
O servidor Express não configura cabeçalhos de segurança como HSTS, CSP, X-Frame-Options, X-Content-Type-Options e Referrer-Policy.

#### Evidência
```ts
app.use(
  cors({
    origin: [...],
    credentials: true,
  })
);
app.use(express.json());
```

#### Impacto potencial
- Exposição maior a clickjacking, MIME sniffing e outras falhas de configuração de navegador.
- Menor proteção em profundidade.

#### Severidade
Baixa

#### Recomendação
- Adicionar `helmet()` e políticas de cabeçalho apropriadas.
- Definir CSP restrita e CORS apenas para origens conhecidas.

#### Referências
- OWASP A02 Security Misconfiguration

---

## Observações adicionais

- O servidor valida `JWT_SECRET` na inicialização e falha explicitamente se a variável estiver ausente ou usar um valor de desenvolvimento padrão.
- O projeto usa `package-lock.json` no backend e frontend, o que é positivo para gerenciamento de dependências. Ainda assim, recomenda-se escanear vulnerabilidades regularmente e revisar bibliotecas críticas.
- `routes.ts` centraliza a autenticação com `requireAuth`, mas a autorização granular está incompleta para algumas operações de negócios.
- O middleware de sanitização atual trata apenas `<` e `>`, o que não é suficiente para todos os contextos de entrada.

---

## Conclusão

A auditoria identificou riscos principalmente em segurança de configuração e controles de acesso. A correção imediata da autorização de operações autenticadas, do manejo de TLS/SSL e da validação de entrada reduzirá a maioria das exposições maiores. Ajustes adicionais em cabeçalhos HTTP e segredos locais fortalecerão o ambiente como um todo.
