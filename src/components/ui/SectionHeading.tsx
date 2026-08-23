'use client'

import ScrollFloat from '@/components/ScrollFloat'

type SectionHeadingProps = {
  title: string
  highlight: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, highlight, subtitle, className = '' }: SectionHeadingProps) {
  const fullTitle = `${title} ${highlight}`
  const highlightFrom = title.length + 1

  return (
    <div className={`mb-16 text-center ${className}`}>
      <ScrollFloat
        containerClassName="my-0 mb-4 text-3xl font-bold lg:text-4xl"
        textClassName="text-dark-text"
        highlightFrom={highlightFrom}
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="top bottom"
        scrollEnd="top 40%"
        stagger={0.03}
      >
        {fullTitle}
      </ScrollFloat>
      {subtitle ? <p className="mx-auto max-w-2xl text-lg text-dark-muted">{subtitle}</p> : null}
    </div>
  )
}
