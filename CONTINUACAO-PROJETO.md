# Prompt de continuação — Site institucional AINAKA

> Cole este documento inteiro como primeira mensagem para a próxima IA. Ele contém todo o
> contexto de negócio, as decisões de design já tomadas e o estado exato do código até agora.
> A pasta do projeto já existe em `c:\Users\tigop\Downloads\site-ainaka` com os arquivos
> descritos abaixo — a IA deve ler os arquivos reais no disco antes de continuar, este
> documento é um resumo/guia, não a fonte da verdade do código.

## 1. Contexto do negócio

- Eu e meu primo estamos virando sócios e abrindo uma agência de tecnologia chamada
  **AINAKA**.
- A agência vai desenvolver soluções de tecnologia em geral: sites institucionais completos,
  landing pages, aplicativos e sistemas sob demanda.
- Preciso de um **site institucional** para apresentar a agência ao público.
- Diretriz de estilo pedida por mim: o site precisa ser **totalmente tecnológico e
  psicodélico**, para transmitir profissionalismo e ao mesmo tempo prender a atenção/o
  interesse do público (não é um site "corporativo sóbrio" tradicional — é uma identidade
  visual ousada, com gradientes neon, glow, animações, grid futurista).
- Enviei o logo da empresa (imagens em anexo na conversa original, não são arquivos no disco):
  um ícone abstrato estilo "infinito/A" com gradiente neon **azul → roxo/violeta → rosa/magenta**
  sobre fundo preto, com uma forma que lembra a letra "i" minúscula (barra vertical + bolinha
  no topo) integrada ao desenho. Ao lado, o wordmark **"AINAKA"** em caixa alta, estilo
  geométrico/sans-serif bold, onde as letras **"AI"** ficam no mesmo gradiente neon
  (azul→roxo→rosa) e o restante **"NAKA"** fica em preto/branco (dependendo do fundo).
  - Como não consegui salvar os arquivos de imagem originais no disco (anexos de chat não
    viram arquivo automaticamente), recriei a logo em SVG inline (componente `Logo.tsx`,
    descrito abaixo) reproduzindo essas formas e cores. **Se o usuário tiver os arquivos PNG
    originais da logo, o ideal é substituir o SVG por eles** (ex: salvar em
    `src/assets/logo.png` / `logo-icon.png` e trocar o `<svg>` do `Logo.tsx` por `<img>`).

## 2. Decisões já tomadas (respondidas via perguntas de esclarecimento)

| Pergunta | Resposta |
|---|---|
| Stack técnica | **React + Vite** (não Next.js, não HTML puro) |
| Estrutura do site | **Página única (single page)** com seções: Home, Serviços, Sobre, Portfólio, Contato (não é multi-página) |
| Conteúdo do portfólio | **Placeholder/genérico por enquanto** (ainda não têm projetos reais para mostrar) |
| Dados de contato | **WhatsApp, e-mail e Instagram** (o usuário ainda não passou os valores reais — estão como placeholder no código, precisam ser substituídos antes de publicar) |
| Nome/slogan | Nome confirmado: **AINAKA**. Ainda **não têm slogan/tagline definido** — pode sugerir um ou deixar um texto de hero genérico até eles decidirem |
| Idioma | **Português do Brasil** (PT-BR) em todo o conteúdo |

## 3. Stack técnica e decisões de implementação

- **Vite + React 19 + TypeScript** (`npm create vite@latest . -- --template react-ts`, linter
  escolhido no scaffold: **Oxlint**, não ESLint).
- **Tailwind CSS v4** via plugin oficial do Vite (`@tailwindcss/vite`), configurado com
  `@theme` diretamente no CSS (não há `tailwind.config.js` — Tailwind v4 usa tokens CSS).
- **framer-motion** para animações de entrada/scroll.
- **lucide-react** para ícones (ainda não usado em nenhum componente, apenas instalado).
- Sem backend, sem formulário com servidor — contato deve ser via links diretos
  (`wa.me/...`, `mailto:`, link do Instagram), sem necessidade de API.

### Paleta de cores (definida em `src/index.css` via `@theme`)

```
--color-void:        #05040d   (fundo principal, quase preto)
--color-abyss:       #0a0714
--color-ink:         #0e0a1f
--color-neon-blue:   #3b82ff
--color-neon-cyan:   #35e6ff
--color-neon-violet: #8b3bff
--color-neon-purple: #b23bff
--color-neon-pink:   #ff3bd6
```

Essas cores viram utilitários Tailwind automaticamente (ex: `bg-void`, `text-neon-pink`,
`bg-neon-purple/40`, etc.) porque Tailwind v4 gera classes a partir de `--color-*`.

### Tipografia

- Título/display: **Space Grotesk** (import via Google Fonts no topo do `index.css`)
- Corpo: **Sora**
- Classe utilitária `.font-display` aplica a fonte de título.

### Classes utilitárias custom já criadas em `src/index.css`

- `.text-gradient` — texto com gradiente neon (cyan→blue→purple→pink), usado em títulos/logo.
- `.glass-panel` — efeito glassmorphism (fundo translúcido + blur) para cards.
- `.glow-border` — borda com gradiente neon que aparece/intensifica no hover (usa
  `::before` com mask).
- `.grid-overlay` — grid de linhas roxas translúcidas, mascarado radialmente (efeito
  "holograma tech"), usado no fundo.
- `.noise-overlay` — textura de ruído SVG sutil sobre o fundo, para não ficar "gradiente liso
  demais".
- Animações custom via `@theme`: `animate-float`, `animate-spin-slow`, `animate-spin-slower`,
  `animate-pulse-glow`, `animate-marquee`, `animate-drift` (keyframes definidos no próprio
  `@theme`).

## 4. O que já foi feito (passo a passo)

1. ✅ Projeto Vite + React + TS criado na pasta `c:\Users\tigop\Downloads\site-ainaka`
   (scaffold via `create-vite`, dependências instaladas, `npm install` já rodou sem erros).
2. ✅ Instalado `tailwindcss`, `@tailwindcss/vite`, `framer-motion`, `lucide-react`.
3. ✅ `vite.config.ts` atualizado para incluir o plugin do Tailwind:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   import react from '@vitejs/plugin-react'
   import { defineConfig } from 'vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```
4. ✅ Removidos os arquivos boilerplate do template padrão: `src/App.tsx`, `src/App.css`,
   `src/index.css` (o `index.css` original era o CSS de exemplo do Vite, não tinha nada
   nosso).
5. ✅ Recriado `src/index.css` do zero com o design system descrito acima (paleta, fontes,
   animações, classes utilitárias). Arquivo já salvo e completo.
6. ✅ Criado `src/components/Logo.tsx`: componente da logo em SVG inline (ícone abstrato
   infinito/"A" com gradiente linear `ainakaGradient` cyan→blue→purple→pink + barra vertical
   e círculo simulando a letra "i"), mais o wordmark "AINAKA" (span "AI" com classe
   `text-gradient`, span "NAKA" em branco). Aceita props `className` e `iconOnly` (para usar
   só o ícone, ex: favicon/mobile).
7. ✅ Criado `src/components/BackgroundFX.tsx`: fundo animado fixo (`position: fixed`,
   `-z-10`) usado atrás de todo o conteúdo do site. Contém:
   - `.grid-overlay` cobrindo a tela toda
   - 3 blobs de gradiente com blur pesado e animações (`animate-pulse-glow`,
     `animate-drift`) nas cores `neon-purple`, `neon-blue`, `neon-pink`, posicionados nos
     cantos/diagonal da tela
   - `.noise-overlay` por cima
   - gradiente final de escurecimento na parte inferior (`bg-gradient-to-b from-transparent
     via-void/40 to-void`)

## 5. ⚠️ Estado atual — o build está quebrado (próximo passo obrigatório)

`src/main.tsx` **ainda importa `./App.tsx`**, mas esse arquivo **foi deletado no passo 4 e
ainda não foi recriado**. Ou seja, se rodar `npm run dev` agora, vai dar erro de módulo não
encontrado. **A primeiríssima coisa a fazer na continuação é recriar `src/App.tsx`**
compondo todas as seções da página (ver lista de pendências abaixo), importando
`BackgroundFX` uma vez no topo e depois `Navbar`, `Hero`, `Services`, `About`, `Portfolio`,
`Contact`, `Footer` em sequência dentro de um wrapper (`<main>` ou `<div className="relative">`).

`src/main.tsx` (não foi alterado, continua assim):
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 6. Pendências (todo list ainda não concluída)

Ordem sugerida para continuar:

1. **Recriar `src/App.tsx`** — compor `BackgroundFX` + `Navbar` + `Hero` + `Services` +
   `About` + `Portfolio` + `Contact` + `Footer`. (Bloqueante — sem isso nada builda.)
2. **Navbar** (`src/components/Navbar.tsx`) — fixo/sticky no topo, fundo `glass-panel` ao
   rolar, usa `<Logo />`, links âncora para as seções (`#servicos`, `#sobre`, `#portfolio`,
   `#contato`), menu mobile (hamburguer) responsivo, botão CTA destacado ("Fale conosco" /
   WhatsApp).
3. **Hero** — seção de abertura, título grande com `.text-gradient` + `.font-display`,
   subtítulo explicando a proposta (sites, landing pages, apps, soluções sob medida), CTA
   principal (ex: "Vamos criar algo incrível" → WhatsApp) e CTA secundário (ver portfólio).
   Aproveitar `framer-motion` para entrada animada (fade + slide up) e talvez elementos
   flutuantes com `animate-float`/`animate-spin-slow` ao redor do logo/ícone.
4. **Services** (`#servicos`) — grid de cards com `.glass-panel` + `.glow-border` no hover,
   cada card representando um serviço: Sites institucionais, Landing pages de alta conversão,
   Aplicativos web/mobile, Sistemas sob medida/automação, (opcional: Manutenção/Suporte,
   Consultoria em tecnologia). Usar ícones do `lucide-react`.
5. **About** (`#sobre`) — texto sobre a AINAKA (agência nova, fundada por dois sócios,
   proposta de unir tecnologia + design arrojado), pode incluir um bloco com os 2 sócios
   (nomes ainda não informados pelo usuário — perguntar ou deixar placeholder "Sócio-fundador").
6. **Portfolio** (`#portfolio`) — grid de cases **placeholder** (usar nomes fictícios tipo
   "Projeto Nova", "App Fictício X", com badges de categoria: Site / Landing Page / App).
   Deixar comentário no código indicando que são placeholders a substituir por projetos reais.
7. **Contact** (`#contato`) — bloco de contato com:
   - Botão/link WhatsApp: `https://wa.me/55XXXXXXXXXXX` (placeholder — falta número real)
   - E-mail: `contato@ainaka.com.br` (placeholder — falta e-mail real e confirmar domínio)
   - Instagram: `https://instagram.com/ainaka` (placeholder — falta usuário real)
   - Deixar bem visível/fácil de trocar essas constantes (ideal: um arquivo
     `src/data/contact.ts` exportando `{ whatsapp, email, instagram }` para centralizar).
8. **Footer** — logo pequena (`<Logo iconOnly />` ou completa), copyright "© 2026 AINAKA",
   links rápidos, redes sociais.
9. **Ajustar `index.html`**: trocar `<title>` de "site-ainaka" para algo como
   "AINAKA — Tecnologia, sites e soluções digitais", adicionar `<meta name="description">`,
   e trocar o favicon padrão do Vite pelo ícone da logo (`Logo iconOnly`) exportado como SVG/PNG
   em `public/favicon.svg`.
10. **Rodar `npm run dev`** e validar visualmente (usar ferramenta de preview/browser se
    disponível), depois `npm run build` para garantir que compila sem erros de TypeScript/lint.

## 7. Observações técnicas importantes para não repetir erros

- **Tailwind v4 não usa `tailwind.config.js`** neste projeto — tudo é feito via `@theme` no
  `src/index.css`. Não criar um `tailwind.config.js` do zero esperando que funcione sozinho;
  os tokens de cor/fonte/animação já estão centralizados no CSS.
- O comando de scaffold já rodou e escolheu **Oxlint** como linter (não ESLint). O script
  `npm run lint` roda `oxlint`.
- Dependências já instaladas e presentes no `package.json` (não reinstalar do zero):
  `react@19`, `react-dom@19`, `tailwindcss@4`, `@tailwindcss/vite@4`, `framer-motion@13`,
  `lucide-react`, mais devDependencies padrão do Vite (`typescript`, `vite`, `@vitejs/plugin-react`,
  `oxlint`, `@types/*`).
- Pasta do workspace: `c:\Users\tigop\Downloads\site-ainaka` (Windows, terminal usado foi
  PowerShell).
- Não recriar o projeto do zero — todo o setup de dependências e design system já está
  pronto, falta só construir os componentes de seção e o `App.tsx`.

## 8. Perguntas em aberto para o usuário (se a próxima IA quiser confirmar antes de finalizar)

- Número de WhatsApp real (com DDI/DDD) para os links de contato.
- E-mail real e domínio (ex: `contato@ainaka.com.br` ou outro).
- Usuário real do Instagram.
- Nomes dos dois sócios (para seção "Sobre", se quiserem aparecer nominalmente).
- Slogan/tagline definitivo (ainda não têm um).
- Se possível, os arquivos PNG originais da logo (para substituir o SVG recriado por IA por
  um recorte fiel da arte original), e um favicon dedicado.
