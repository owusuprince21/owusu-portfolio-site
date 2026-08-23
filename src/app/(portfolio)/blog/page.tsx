import type { Metadata } from 'next'
import { getWorldNews } from '@/lib/news'
import { WorldNewsGrid } from '@/components/sections/WorldNewsGrid'
import { WorldNewsEmpty } from '@/components/sections/WorldNewsEmpty'

export const metadata: Metadata = {
  title: 'World News | Prince Owusu',
  description: 'Latest world news headlines from The Guardian.',
}

type BlogPageProps = {
  searchParams?: Promise<{ page?: string | string[] }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = (await searchParams) ?? {}
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page
  const page = Math.max(1, Number(pageParam ?? '1') || 1)

  const { results, pages, error } = await getWorldNews(page)

  if (results.length === 0) {
    return <WorldNewsEmpty error={error} />
  }

  return <WorldNewsGrid articles={results} page={page} pages={pages} />
}
