'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

type ScrollSmootherProviderProps = {
  children: ReactNode
  enabled?: boolean
}

export function ScrollSmootherProvider({
  children,
  enabled = true,
}: ScrollSmootherProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useGSAP(
    () => {
      if (!enabled || !wrapperRef.current || !contentRef.current) return

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      // Kill any existing instance (route remounts / HMR)
      ScrollSmoother.get()?.kill()

      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.15,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        ignoreMobileResize: true,
      })

      ScrollTrigger.refresh()

      return () => {
        smootherRef.current?.kill()
        smootherRef.current = null
      }
    },
    { dependencies: [enabled], revertOnUpdate: true }
  )

  useEffect(() => {
    if (!enabled) return

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    const timers = [
      window.setTimeout(() => ScrollTrigger.refresh(), 200),
      window.setTimeout(() => ScrollTrigger.refresh(), 800),
    ]

    return () => {
      window.removeEventListener('resize', onResize)
      timers.forEach(clearTimeout)
    }
  }, [enabled])

  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div id="smooth-wrapper" ref={wrapperRef} className="relative z-0">
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export function scrollToWithSmoother(target: string | Element, offsetY = 0) {
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return false

  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(el, true, `top ${offsetY}px`)
    return true
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}
