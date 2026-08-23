'use client'

import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFloatProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  containerClassName?: string
  textClassName?: string
  highlightFrom?: number
  animationDuration?: number
  ease?: string
  scrollStart?: string
  scrollEnd?: string
  stagger?: number
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  highlightFrom,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom',
  scrollEnd = 'top 40%',
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split('').map((char, index) => (
      <span
        className={`scroll-float-char inline-block ${highlightFrom !== undefined && index >= highlightFrom ? 'split-char' : ''}`.trim()}
        key={index}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }, [children, highlightFrom])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof children !== 'string' || !children.length) return

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

    const charElements = el.querySelectorAll('.scroll-float-char')

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%',
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      }
    )

    const refresh = () => ScrollTrigger.refresh()
    refresh()

    const refreshTimers = [
      window.setTimeout(refresh, 150),
      window.setTimeout(refresh, 600),
    ]

    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh).catch(() => undefined)

    return () => {
      refreshTimers.forEach(clearTimeout)
      window.removeEventListener('load', refresh)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [children, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger])

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${highlightFrom !== undefined ? 'gradient-text-chars split-parent' : ''} ${containerClassName}`}
    >
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>
        {splitText}
      </span>
    </h2>
  )
}

export default ScrollFloat
