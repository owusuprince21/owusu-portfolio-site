'use client'

import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

type WorldNewsEmptyProps = {
  error?: string
}

export function WorldNewsEmpty({ error }: WorldNewsEmptyProps) {
  return (
    <section className="scroll-section py-20 section-padding bg-dark-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="World"
          highlight="News"
          subtitle="Latest headlines from The Guardian."
        />

        <div className="glass rounded-2xl border border-white/10 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/10 text-primary-400">
            <Newspaper size={28} />
          </div>
          <h2 className="text-xl font-semibold text-dark-text">News is temporarily unavailable</h2>
          <p className="text-sm text-dark-muted mt-3">
            {error ?? 'Please check back later.'}
          </p>

          {!error?.includes('GUARDIAN_API_KEY') ? null : (
            <div className="mt-6 text-sm text-dark-muted">
              <p className="mb-2">Add your API key to <code className="text-primary-300">.env.local</code>:</p>
              <code className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 inline-block text-left">
                GUARDIAN_API_KEY=your_key_here
              </code>
              <p className="mt-3">
                Get a free key at{' '}
                <a
                  href="https://open-platform.theguardian.com/access/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  The Guardian Open Platform
                </a>
              </p>
            </div>
          )}

          <Link
            href="/"
            className="inline-flex mt-8 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}
