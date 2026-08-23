# Prince Owusu — Portfolio

A modern Next.js portfolio with Keystatic CMS, GSAP animations, and React Bits UI effects.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **pnpm** for package management
- **Keystatic** — git-based CMS for projects (`content/projects/*.yaml`)
- **GSAP + React Bits** — scroll and text animations
- **Framer Motion** — micro-interactions
- **Tailwind CSS**

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Install & run

```bash
pnpm install
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- **Keystatic CMS admin:** [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

> Keystatic only runs in dev mode. Make sure `pnpm dev` is running, then open `/keystatic` in your browser to add or edit projects.

### Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_COFFEE_URL` | Buy Me a Coffee link |
| `GUARDIAN_API_KEY` | Optional — powers the `/blog` news feed |

## Managing Projects

Projects live in `content/projects/` as YAML files. Edit them directly or use the Keystatic admin UI during development.

Each project supports: title, excerpt, description, image, tags, demo/repo URLs, featured flag, and date.

## Adding React Bits Components

This project uses the [React Bits](https://reactbits.dev) shadcn registry:

```bash
pnpm dlx shadcn@latest add @react-bits/BlurText-TS-TW
```

Installed components: `BlurText`, `SplitText`, `FadeContent`, `Aurora`.

## Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm type-check   # TypeScript check
```

## Deployment

Deploy to Vercel. Keystatic admin routes are disabled in production (`NODE_ENV=production`). Content is read from committed YAML files at build time — no external CMS API required.

To edit content in production later, connect Keystatic to GitHub ([docs](https://keystatic.com/docs/installation-next-js)).

---

Built with Next.js, Keystatic, GSAP, and React Bits.
