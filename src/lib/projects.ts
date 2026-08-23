import fs from 'fs/promises'
import path from 'path'
import { parse as parseYaml } from 'yaml'
import { cache } from 'react'
import type { Project, Tag } from './api'
import { PROJECTS_PAGE_SIZE } from './api'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

type ProjectYaml = {
  title: string
  excerpt: string
  description?: string
  image_url?: string
  tags?: string[]
  demo_url?: string
  repo_url?: string
  featured?: boolean
  created_at?: string
}

function toTag(name: string, index: number): Tag {
  return { id: `t-${name.toLowerCase().replace(/\s+/g, '-')}-${index}`, name }
}

function normalizeImageUrl(path?: string | null): string | null {
  if (!path) return null
  if (path.startsWith('public/')) return `/${path.slice('public/'.length)}`
  return path
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const featuredDiff = Number(b.featured) - Number(a.featured)
    if (featuredDiff !== 0) return featuredDiff
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  let files: string[] = []

  try {
    files = await fs.readdir(PROJECTS_DIR)
  } catch {
    return []
  }

  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith('.yaml'))
      .map(async (file) => {
        const slug = file.replace(/\.yaml$/, '')
        const raw = await fs.readFile(path.join(PROJECTS_DIR, file), 'utf8')
        const entry = parseYaml(raw) as ProjectYaml

        return {
          id: slug,
          title: entry.title,
          slug,
          excerpt: entry.excerpt,
          description: entry.description,
          image_url: normalizeImageUrl(entry.image_url),
          tags: (entry.tags ?? []).map((name, index) => toTag(name, index)),
          demo_url: entry.demo_url || null,
          repo_url: entry.repo_url || null,
          featured: entry.featured ?? false,
          created_at: entry.created_at ?? new Date().toISOString(),
        } satisfies Project
      })
  )

  return sortProjects(projects)
})

export async function getProjectsPage(page = 1): Promise<{
  results: Project[]
  count: number
  hasMore: boolean
  totalPages: number
}> {
  const all = await getAllProjects()
  const totalPages = Math.max(1, Math.ceil(all.length / PROJECTS_PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * PROJECTS_PAGE_SIZE
  const results = all.slice(start, start + PROJECTS_PAGE_SIZE)

  return {
    results,
    count: all.length,
    hasMore: safePage < totalPages,
    totalPages,
  }
}
