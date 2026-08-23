'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, User } from 'lucide-react'
import type { GuardianArticle } from '@/lib/news'
import { getRelativeTime, stripHtml } from '@/lib/news'
import FadeContent from '@/components/FadeContent'
import { SectionHeading } from '@/components/ui/SectionHeading'

type WorldNewsGridProps = {
  articles: GuardianArticle[]
  page: number
  pages: number
}

function ArticleCard({
  article,
  featured = false,
  index,
}: {
  article: GuardianArticle
  featured?: boolean
  index: number
}) {
  const summary = stripHtml(article.fields?.trailText)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.36) }}
      whileHover={{ y: featured ? -4 : -6 }}
      className={`group h-full ${featured ? 'lg:col-span-2' : ''}`}
    >
      <div
        className={`glass rounded-2xl overflow-hidden h-full border border-white/10 transition-all duration-300 group-hover:border-primary-500/30 ${
          featured ? 'lg:grid lg:grid-cols-2 lg:min-h-[320px]' : ''
        }`}
      >
        <div
          className={`relative bg-dark-card ${
            featured ? 'min-h-[220px] lg:min-h-full' : 'aspect-[16/10]'
          }`}
        >
          {article.fields?.thumbnail ? (
            <Image
              src={article.fields.thumbnail}
              alt={article.webTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={
                featured
                  ? '(max-width: 1024px) 100vw, 50vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-dark-card to-purple-500/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/10 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-primary-600/90 text-white">
            {article.sectionName}
          </span>
        </div>

        <div className={`p-5 flex flex-col ${featured ? 'lg:p-7' : ''}`}>
          <h2
            className={`font-semibold text-dark-text group-hover:text-primary-400 transition-colors ${
              featured ? 'text-2xl lg:text-3xl mb-3' : 'text-lg mb-2 line-clamp-3'
            }`}
          >
            {article.webTitle}
          </h2>

          {summary ? (
            <p className={`text-dark-muted ${featured ? 'text-base line-clamp-4 mb-5' : 'text-sm line-clamp-3 mb-4'}`}>
              {summary}
            </p>
          ) : null}

          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-dark-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-primary-400" />
                {getRelativeTime(article.webPublicationDate)}
              </span>
              {article.fields?.byline ? (
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} className="text-primary-400" />
                  {stripHtml(article.fields.byline)}
                </span>
              ) : null}
            </div>

            <Link
              href={article.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors focus-outline"
            >
              Read on The Guardian
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function WorldNewsGrid({ articles, page, pages }: WorldNewsGridProps) {
  const featured = page === 1 ? articles[0] : null
  const gridArticles = page === 1 ? articles.slice(1) : articles

  return (
    <section className="scroll-section py-20 section-padding bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="World"
          highlight="News"
          subtitle="Latest headlines from The Guardian — refreshed every 10 minutes."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {page === 1 && featured ? (
            <ArticleCard article={featured} featured index={0} />
          ) : null}

          {gridArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={page === 1 ? index + 1 : index}
            />
          ))}
        </div>

        <FadeContent duration={500} delay={100}>
          <nav
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            aria-label="News pagination"
          >
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}`}
              aria-disabled={page <= 1}
              className={`px-5 py-2.5 rounded-full border border-white/10 text-sm transition-colors ${
                page <= 1
                  ? 'opacity-40 pointer-events-none'
                  : 'hover:bg-white/10 hover:border-primary-500/30'
              }`}
            >
              ← Newer
            </Link>

            <span className="text-sm text-dark-muted px-2">
              Page {page} of {pages}
            </span>

            <Link
              href={`/blog?page=${Math.min(pages, page + 1)}`}
              aria-disabled={page >= pages}
              className={`px-5 py-2.5 rounded-full border border-white/10 text-sm transition-colors ${
                page >= pages
                  ? 'opacity-40 pointer-events-none'
                  : 'hover:bg-white/10 hover:border-primary-500/30'
              }`}
            >
              Older →
            </Link>
          </nav>

          <p className="text-center text-xs text-dark-muted mt-8">
            News content © The Guardian. Powered by the Guardian Open Platform API.
          </p>
        </FadeContent>
      </div>
    </section>
  )
}
