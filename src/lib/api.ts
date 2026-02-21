// src/lib/api.ts
// No Sanity. No GROQ.
// This file provides the same function signatures your app already uses,
// but it reads from a local in-code dataset (you can move it to JSON later).

export interface Tag {
  id: number | string
  name: string
}

export interface Project {
  id: number | string
  title: string
  slug: string
  excerpt: string
  description?: string
  image_url?: string | null
  tags: Tag[]
  demo_url?: string | null
  repo_url?: string | null
  featured: boolean
  created_at: string
  updated_at?: string
}

export interface ProjectsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Project[]
}

export interface ContactMessage {
  name: string
  email: string
  message: string
}

const PAGE_SIZE = 9

// ✅ Replace these sample projects with your real projects.
// Tip: keep `slug` unique.
// const PROJECTS: Project[] = [
//   {
//     id: "1",
//     title: "My Portfolio Website",
//     slug: "my-portfolio-website",
//     excerpt: "A modern portfolio built with Next.js, Tailwind CSS, and animations.",
//     description:
//       "A personal portfolio website showcasing projects, skills, and contact details. Includes responsive UI, animations, and performance optimizations.",
//     image_url: "/projects/portfolio.jpg",
//     tags: [{ id: "t1", name: "Next.js" }, { id: "t2", name: "Tailwind" }],
//     demo_url: "https://example.com",
//     repo_url: "https://github.com/example/repo",
//     featured: true,
//     created_at: "2025-01-10T00:00:00.000Z",
//     updated_at: "2025-02-01T00:00:00.000Z"
//   }
// ]

// ---------- Helpers ----------

function normalize(str: string) {
  return str.trim().toLowerCase()
}

function uniqueTagsFromProjects(projects: Project[]): Tag[] {
  const map = new Map<string, Tag>()

  for (const p of projects) {
    for (const t of p.tags || []) {
      const key = `${t.id}`
      if (!map.has(key)) map.set(key, { id: t.id, name: t.name })
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}

function sortProjects(projects: Project[]): Project[] {
  // Featured first, then newest created_at
  return [...projects].sort((a, b) => {
    const fa = a.featured ? 1 : 0
    const fb = b.featured ? 1 : 0
    if (fb !== fa) return fb - fa
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

function paginate<T>(items: T[], page: number, pageSize: number) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const start = (safePage - 1) * pageSize
  const end = start + pageSize
  const results = items.slice(start, end)

  return {
    total,
    totalPages,
    safePage,
    results
  }
}

// ---------- Public API (same signatures) ----------


/**
 * Contact handler:
 * - If you want emails, wire this to a Next.js Route Handler (e.g. /api/contact)
 *   and send via Resend, Nodemailer, etc.
 */
export async function sendContactMessage(_: ContactMessage) {
  throw new Error(
    "Contact endpoint not implemented. Create a Next.js Route Handler at /api/contact."
  )
}