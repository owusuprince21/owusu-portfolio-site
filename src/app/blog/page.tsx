import Image from "next/image"
import Link from "next/link"

export const revalidate = 600 // revalidate every 10 minutes

type GuardianResult = {
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
    results: GuardianResult[]
  }
}

function stripHtml(s?: string) {
  return (s ?? "").replace(/<[^>]*>?/gm, "")
}

function formatDate(iso: string) {
  // Stable formatting in Node/SSR (avoids locale/timezone differences)
  // Example: "Feb 21, 2026, 08:10"
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  })
}

async function getNews(page = 1): Promise<{ results: GuardianResult[]; pages: number; error?: string }> {
  const apiKey = process.env.GUARDIAN_API_KEY

  // If there's no key during build/deploy, don't crash the whole app
  if (!apiKey) {
    return {
      results: [],
      pages: 1,
      error: "Missing GUARDIAN_API_KEY environment variable."
    }
  }

  try {
    const url = new URL("https://content.guardianapis.com/search")
    url.searchParams.set("section", "world")
    url.searchParams.set("order-by", "newest")
    url.searchParams.set("page-size", "12")
    url.searchParams.set("page", String(page))
    url.searchParams.set("show-fields", "trailText,thumbnail,byline")
    url.searchParams.set("api-key", apiKey)

    const res = await fetch(url.toString(), { next: { revalidate } })

    if (!res.ok) {
      return {
        results: [],
        pages: 1,
        error: `Guardian API error: ${res.status} ${res.statusText}`
      }
    }

    const data: GuardianResponse = await res.json()

    return {
      results: data?.response?.results ?? [],
      pages: data?.response?.pages ?? 1
    }
  } catch (e: any) {
    return {
      results: [],
      pages: 1,
      error: e?.message || "Failed to fetch news."
    }
  }
}

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string | string[] } }) {
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page?.[0]
    : searchParams?.page

  const page = Math.max(1, Number(pageParam ?? "1") || 1)

  const { results, pages, error } = await getNews(page)

  return (
    <main className="section-padding py-16 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold gradient-text">World News</h1>
        <p className="text-gray-400 mt-2">Latest from The Guardian</p>
      </header>

      {/* Empty/Error state (prevents build from failing) */}
      {results.length === 0 ? (
        <div className="glass-light rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold">News is temporarily unavailable</h2>
          <p className="text-sm text-gray-400 mt-2">
            {error
              ? error
              : "Please check back later."}
          </p>

          <div className="mt-4 text-sm text-gray-400">
            <p className="mb-2">To enable this page in production, set:</p>
            <code className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 inline-block">
              GUARDIAN_API_KEY
            </code>
          </div>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((a) => (
              <article
                key={a.id}
                className="glass-light rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="relative aspect-[16/9] bg-black/20">
                  {a.fields?.thumbnail ? (
                    <Image
                      src={a.fields.thumbnail}
                      alt={a.webTitle}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold mb-2">{a.webTitle}</h2>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {stripHtml(a.fields?.trailText)}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(a.webPublicationDate)}</span>
                    <span>{a.sectionName}</span>
                  </div>

                  <div className="mt-4">
                    <Link
                      href={a.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white text-sm"
                    >
                      Read article
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}`}
              className={`px-4 py-2 rounded-full border ${
                page <= 1 ? "opacity-50 pointer-events-none" : "hover:bg-white/10"
              }`}
            >
              ← Newer
            </Link>
            <span className="text-sm text-gray-400">
              Page {page} of {pages}
            </span>
            <Link
              href={`/blog?page=${Math.min(pages, page + 1)}`}
              className={`px-4 py-2 rounded-full border ${
                page >= pages ? "opacity-50 pointer-events-none" : "hover:bg-white/10"
              }`}
            >
              Older →
            </Link>
          </div>
        </>
      )}
    </main>
  )
}