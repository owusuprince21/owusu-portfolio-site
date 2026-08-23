'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

type ScrollSmootherProviderProps = {
  children: ReactNode
  enabled?: boolean
}

/** Desktop-only: ScrollSmoother + normalizeScroll feels laggy/stop-start on mobile. */
function canUseScrollSmoother() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // Touch / phone / tablet → native scrolling
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return false
  if (window.matchMedia('(max-width: 1023px)').matches) return false
  return true
}

export function ScrollSmootherProvider({
  children,
  enabled = true,
}: ScrollSmootherProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<ScrollSmoother | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setActive(false)
      return
    }

    const update = () => setActive(canUseScrollSmoother())
    update()

    const media = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(hover: none), (pointer: coarse)'),
      window.matchMedia('(max-width: 1023px)'),
    ]

    media.forEach((mq) => mq.addEventListener('change', update))
    window.addEventListener('orientationchange', update)

    return () => {
      media.forEach((mq) => mq.removeEventListener('change', update))
      window.removeEventListener('orientationchange', update)
    }
  }, [enabled])

  useGSAP(
    () => {
      // Always kill previous instance first
      ScrollSmoother.get()?.kill()
      smootherRef.current = null

      if (!active || !wrapperRef.current || !contentRef.current) {
        ScrollTrigger.refresh()
        return
      }

      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1,
        effects: true,
        // Never smooth touch — native mobile scroll is better UX
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
      })

      ScrollTrigger.refresh()

      return () => {
        smootherRef.current?.kill()
        smootherRef.current = null
      }
    },
    { dependencies: [active], revertOnUpdate: true }
  )

  useEffect(() => {
    if (!active) return

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
  }, [active])

  // Keep wrapper DOM stable on home so fixed nav / layout don't jump;
  // only create ScrollSmoother when `active` (desktop).
  if (!enabled) {
    return <>{children}</>
  }

  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      data-smooth={active ? 'true' : 'false'}
      className="relative z-0 w-full"
    >
      <div id="smooth-content" ref={contentRef} className="w-full">
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
