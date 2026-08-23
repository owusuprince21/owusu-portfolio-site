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

export const PROJECTS_PAGE_SIZE = 9

export async function sendContactMessage(payload: ContactMessage) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => ({}))) as { error?: string }

  if (!response.ok) {
    throw new Error(data.error || 'Failed to send message')
  }

  return data
}
