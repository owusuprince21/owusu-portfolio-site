import { groq } from 'next-sanity'
import {client} from "../lib/sanity/client";
import { urlFor } from '../lib/sanity/image'

export interface Tag { id: number | string; name: string; }
export interface Project {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  image_url?: string | null;
  tags: Tag[];
  demo_url?: string | null;
  repo_url?: string | null;
  featured: boolean;
  created_at: string;
  updated_at?: string;
}
export interface ProjectsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

/* ---------- GROQ ---------- */

const PAGE_SIZE = 9

const projectSelection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  mainImage,
  demo_url,
  repo_url,
  featured,
  _createdAt,
  _updatedAt,
  "tags": tags[]->{
    _id, name
  }
`

const listQuery = groq`{
  "results": *[_type == "project"]
    | order(featured desc, _createdAt desc)
    [$offset...$end]{
      ${projectSelection}
    },
  "total": count(*[_type == "project"])
}`

const listFeaturedQuery = groq`*[_type == "project" && featured == true]
  | order(_createdAt desc){
    ${projectSelection}
  }`

const bySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ${projectSelection}
}`

const tagsQuery = groq`*[_type == "tag"]{ _id, name } | order(name asc)`

/* ---------- Mappers ---------- */

function mapProject(p: any): Project {
  return {
    id: p._id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    description: p.description || '',
    image_url: p.mainImage ? urlFor(p.mainImage).width(1200).height(675).fit('crop').url() : null,
    tags: (p.tags || []).map((t: any) => ({ id: t._id, name: t.name })),
    demo_url: p.demo_url || null,
    repo_url: p.repo_url || null,
    featured: !!p.featured,
    created_at: p._createdAt,
    updated_at: p._updatedAt,
  }
}

/* ---------- Public API (same signatures) ---------- */

export async function getProjects(featured?: boolean, page = 1): Promise<ProjectsResponse> {
  if (featured) {
    const docs = await client.fetch(listFeaturedQuery)
    const results: Project[] = (docs || []).map(mapProject)
    return {
      count: results.length,
      next: null,
      previous: null,
      results,
    }
  }

  const offset = Math.max(0, (page - 1) * PAGE_SIZE)
  const end = offset + PAGE_SIZE
  const data = await client.fetch(listQuery, { offset, end })

  const total: number = data?.total ?? 0
  const results: Project[] = (data?.results || []).map(mapProject)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return {
    count: total,
    next: page < totalPages ? String(page + 1) : null,
    previous: page > 1 ? String(page - 1) : null,
    results,
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  const doc = await client.fetch(bySlugQuery, { slug })
  return doc ? mapProject(doc) : null
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const docs = await client.fetch(listFeaturedQuery)
  return (docs || []).map(mapProject)
}

export async function getTags(): Promise<Tag[]> {
  const docs = await client.fetch(tagsQuery)
  return (docs || []).map((t: any) => ({ id: t._id, name: t.name }))
}

/* ---------- Contact (keep noop or route elsewhere) ---------- */
// You can remove sendContactMessage or wire it to a Route Handler instead.
export interface ContactMessage { name: string; email: string; message: string; }
export async function sendContactMessage(_: ContactMessage) {
  throw new Error('Contact endpoint not implemented for Sanity. Use a Next.js Route Handler or 3rd-party form.')
}
