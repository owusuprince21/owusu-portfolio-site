'use client'

import Galaxy from '@/components/Galaxy'

export function HeroBackground() {
  return (
    <div className="hero-bg absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={1.2}
        glowIntensity={0.45}
        saturation={0.15}
        hueShift={140}
        twinkleIntensity={0.35}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        transparent
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/15 to-dark-bg/70" />
    </div>
  )
}
