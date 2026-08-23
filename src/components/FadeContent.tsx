'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  duration?: number
  delay?: number
  /** @deprecated blur filters hurt scroll performance — kept for API compat, ignored */
  blur?: boolean
}

export default function FadeContent({
  children,
  duration = 700,
  delay = 0,
  blur: _blur,
  className = '',
  style,
  ...props
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-content ${visible ? 'fade-content-visible' : ''} ${className}`}
      style={{
        ...style,
        transitionDelay: visible ? `${delay}ms` : '0ms',
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
