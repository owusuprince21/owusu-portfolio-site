import { cache } from 'react'

export const NEWS_PAGE_SIZE = 12
export const NEWS_REVALIDATE_SECONDS = 600

export type GuardianArticle = {
  id: string
  webTitle: string
  webUrl: string
  webPublicationDate: string
  sectionName: string
  fields?: {
    trailText?: string
    thumbnail?: string
    byline?: string
  }
}

type GuardianResponse = {
  response: {
    status: string
    currentPage: number
    pages: number
    total: number
    results: GuardianArticle[]
  }
}

export function stripHtml(value?: string) {
  return (value ?? '').replace(/<[^>]*>?/gm, '')
}

export function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

export function getRelativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`

  return formatNewsDate(iso)
}

export const getWorldNews = cache(async (page = 1): Promise<{
  results: GuardianArticle[]
  pages: number
  total: number
  error?: string
}> => {
  const apiKey = process.env.GUARDIAN_API_KEY

  if (!apiKey) {
    return {
      results: [],
      pages: 1,
      total: 0,
      error: 'Missing GUARDIAN_API_KEY environment variable.',
    }
  }

  try {
    const url = new URL('https://content.guardianapis.com/search')
    url.searchParams.set('section', 'world')
    url.searchParams.set('order-by', 'newest')
    url.searchParams.set('page-size', String(NEWS_PAGE_SIZE))
    url.searchParams.set('page', String(page))
    url.searchParams.set('show-fields', 'trailText,thumbnail,byline')
    url.searchParams.set('api-key', apiKey)

    const res = await fetch(url.toString(), {
      next: { revalidate: NEWS_REVALIDATE_SECONDS },
    })

    if (!res.ok) {
      return {
        results: [],
        pages: 1,
        total: 0,
        error: `Guardian API error: ${res.status} ${res.statusText}`,
      }
    }

    const data: GuardianResponse = await res.json()

    return {
      results: data?.response?.results ?? [],
      pages: data?.response?.pages ?? 1,
      total: data?.response?.total ?? 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch news.'
    return {
      results: [],
      pages: 1,
      total: 0,
      error: message,
    }
  }
})
