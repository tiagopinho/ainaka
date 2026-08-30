# AINAKA

Site institucional multilíngue da AINAKA, com painel administrativo e CMS próprio.

## Desenvolvimento

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173` e o painel em `/admin`. As APIs serverless podem ser executadas localmente com `vercel dev` após configurar as variáveis de ambiente.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e configure:

- `DATABASE_URL`: conexão do Neon PostgreSQL
- `ADMIN_EMAIL`: e-mail do administrador
- `ADMIN_PASSWORD_HASH`: senha convertida em hash bcrypt
- `SESSION_SECRET`: segredo aleatório com pelo menos 32 caracteres
- `BLOB_READ_WRITE_TOKEN`: token criado ao conectar o Vercel Blob

Nunca envie arquivos `.env` ao Git.

## Banco de dados

O esquema está em `src/db/schema.ts` e a migração inicial em `drizzle/0000_initial_cms.sql`.

```bash
npm run db:migrate
```

## Validação

```bash
npm run lint
npm run build
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
