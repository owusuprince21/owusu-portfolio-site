'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useEffect } from 'react'

let registered = false

function registerGsapPlugins() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)
  registered = true
}

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsapPlugins()
  }, [])

  return <>{children}</>
}

export { gsap, ScrollTrigger, ScrollSmoother, useGSAP }
