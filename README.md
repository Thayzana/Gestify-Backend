# Gestify - Backend API

Esta é a API REST do **Gestify**, um sistema moderno de gestão para confeitarias, docerias, cafeterias e varejo. O backend fornece controle de estoque, precificação inteligente de receitas/produtos, gestão de fornecedores, controle de pedidos e geração de campanhas de marketing com Inteligência Artificial (Gemini).

---

## 🚀 Tecnologias Utilizadas

- **Core**: Node.js & Express (com TypeScript via `tsx` no desenvolvimento)
- **Banco de Dados**: PostgreSQL & TypeORM (Object-Relational Mapping)
- **Autenticação**: JWT padrão da indústria via biblioteca `jsonwebtoken`
- **Validação de Dados**: Esquemas robustos com a biblioteca `zod`
- **Integração de IA**: SDK oficial `@google/genai` (Gemini 3.5 Flash)
- **Testes**: Vitest & Supertest (testes rápidos com banco mockado)
- **Documentação**: Swagger (OpenAPI 3.0)
- **Build**: Esbuild (compilação rápida para CJS de produção)

---

## 📂 Estrutura de Diretórios

A estrutura do projeto está organizada da seguinte forma:

```
Gestify-Backend2/
├── api/                    # Handler compilado para deploy serverless (Vercel)
├── database/               # Configuração do TypeORM, DataSource e funções de inicialização
│   └── init.ts             # Inicializador do banco (conexão + migrações + seeds)
├── entities/               # Modelos de entidades de banco de dados (TypeORM)
│   ├── User.ts             # Entidade de Usuário (admin/operator)
│   ├── Customer.ts         # Entidade de Cliente (cadastro final)
│   └── ...                 # Demais entidades (Order, Product, Supplier, etc.)
├── middleware/             # Middlewares globais e de rotas
│   ├── auth.middleware.ts  # Autenticação (requireAuth) e controle de acesso (requireRole)
│   ├── validate.middleware.ts # Validador automático de requisições com Zod
│   └── sanitize.middleware.ts # Sanitizador de tags HTML contra injeções
├── repositories/           # Camada de persistência/acesso ao banco (TypeORM queries)
│   └── gestify.repository.ts # Repositório central de dados
├── routes/                 # Roteamento modularizado da aplicação
│   └── auth.routes.ts      # Rotas de autenticação (/auth/login, /auth/register, etc.)
├── scripts/                # Scripts utilitários de manutenção do sistema
├── seeds/                  # Carga de dados inicial para novos ambientes
├── services/               # Regras de negócio e integrações externas
│   ├── auth.service.ts     # Criptografia de senhas e geração/verificação de JWT
│   └── insights.service.ts # Geração de relatórios com inteligência de dados
├── server.ts               # Inicializador do Express e configuração de middlewares
├── routes.ts               # Arquivo centralizador de rotas da API
├── schemas.ts              # Central de esquemas de validação do Zod
├── swagger.ts              # Definições OpenAPI / Swagger para documentação
├── vitest.config.ts        # Configurações do Vitest (variáveis de teste mockadas)
└── README.md               # Este arquivo
```

---

## 🛠️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** v18 ou superior (recomendado v20+)
- **PostgreSQL** ativo localmente (via Docker ou serviço direto) ou uma URL remota válida (ex. Supabase).
- **npm** v9 ou superior.

---

## ⚙️ Configuração Inicial e Variáveis de Ambiente

1. **Clonar e instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis**:
   Crie um arquivo chamado `.env.local` na raiz do projeto backend (este arquivo é ignorado pelo Git) e configure as variáveis principais da seguinte forma:

   ```env
   # URL de conexão com o PostgreSQL
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/gestify"

   # Chave secreta de alta entropia para criptografia e assinatura de tokens JWT
   JWT_SECRET="sua-chave-secreta-longa-para-jwt-mude-em-producao"

   # Chave da API do Google AI Studio para geração de marketing
   GEMINI_API_KEY="sua-chave-gemini-aqui"

   # Porta em que a API Express local irá escutar
   PORT=3000

   # URL do Frontend React (para liberação de CORS)
   FRONTEND_URL="http://localhost:5173"

   # Permitir criação do primeiro admin publicamente (/register). Deve ser 'false' em produção.
   ALLOW_PUBLIC_SIGNUP="false"
   ```

---

## 🗄️ Banco de Dados: Tabelas e Carga Inicial (Seeds)

Se estiver inicializando o banco de dados local pela primeira vez, execute os comandos:

```bash
# 1. Cria a base de dados PostgreSQL especificada na URL
npm run db:create

# 2. Injeta tabelas, relacionamentos e insere a carga de dados iniciais (incluindo o admin padrão)
npm run db:seed
```

O script de carga inicial (seed) criará o primeiro usuário administrador com base nas credenciais informadas no seu arquivo `.env.local`.

---

## 🔐 Camada de Segurança e Validação (Arquitetura)

### 1. Autenticação e Controle de Acesso (RBAC)
- O backend utiliza autenticação baseada em tokens JWT padrão (biblioteca `jsonwebtoken`).
- **Níveis de Acesso**: O sistema suporta dois papéis (`UserRole`):
  - `"admin"`: Acesso irrestrito a configurações, finanças, criação de usuários, etc.
  - `"operator"`: Acesso apenas às operações de rotina (ex: visualizar pedidos, consultar cardápio).
- **Middlewares de Segurança** (`middleware/auth.middleware.ts`):
  - `requireAuth`: Garante que a requisição contenha um JWT Bearer válido.
  - `requireRole("admin")`: Restringe o acesso ao endpoint apenas para administradores. Endpoints sensíveis como `POST /promotions`, `POST /marketing/generate`, `PUT /orders/:id`, e manipulação de clientes exigem esse papel.

### 2. Validação e Sanitização de Payload (Zod)
- Os dados recebidos via `req.body` são validados de forma estrita contra esquemas Zod (`schemas.ts`).
- **Middleware de Validação** (`middleware/validate.middleware.ts`):
  - `validateBody(schema)`: Intercepta a requisição, valida os campos e formatos (como email, senhas de comprimento mínimo, strings não vazias e números coerentes), higieniza o payload e remove propriedades desconhecidas antes de repassar o controle para o controlador da rota. Em caso de falha, retorna um JSON estruturado com status `400 Bad Request` detalhando quais campos estão inválidos.

---

## 🏃 Como Rodar o Projeto

### Modo de Desenvolvimento (Watch Mode)
O servidor Express será inicializado via `tsx`, que monitora arquivos TypeScript e os reinicia instantaneamente caso haja modificações:
```bash
npm run dev
```
A API estará ativa em: **`http://localhost:3000`**

### Modo de Produção
Para compilar o código TypeScript em arquivos de Javascript prontos para execução em produção:
```bash
# 1. Compilar o projeto com o esbuild para a pasta dist/
npm run build

# 2. Iniciar a API compilada em modo produção
npm start
```

---

## 📑 Documentação da API (Swagger UI)

Com o servidor rodando localmente no modo de desenvolvimento, você pode visualizar e testar interativamente todos os endpoints da API através do navegador:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **JSON OpenAPI Especificação**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

---

## 🧪 Executando os Testes Automatizados

O backend conta com uma suíte de testes unitários e de integração utilizando o **Vitest** e **Supertest**. Os testes cobrem a geração/verificação segura de JWTs, bem como o comportamento de controle de acesso e validação de esquemas das rotas da API.

Os testes de rotas são completamente isolados (mocks nas conexões e repositórios de banco de dados e IA), permitindo que sejam executados sem um banco de dados real rodando.

```bash
# Executar a suíte de testes de forma síncrona (uma única execução)
npm test

# Executar os testes em modo interativo (Watch Mode / TDD)
npm run test:watch
```

---

## 💾 Outros Comandos Úteis

- **`npm run db:migrate`**: Executa scripts idempotentes de alteração de colunas no banco de dados (ex: migração para expandir capacidade sanitária ou ajustar campos de imagens).
- **`npm run lint`**: Executa a verificação estática do compilador TypeScript (`tsc --noEmit`) para assegurar que não há problemas de compilação ou de tipagem em nenhum arquivo da aplicação.
