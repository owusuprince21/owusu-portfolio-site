'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BuyCoffeeButton } from '@/components/ui/BuyCoffeeButton'
import { Toaster } from 'react-hot-toast'
import { ScrollSmootherProvider } from '@/components/ScrollSmootherProvider'

const SplashCursorLayer = dynamic(
  () => import('@/components/effects/SplashCursorLayer').then((m) => m.SplashCursorLayer),
  { ssr: false }
)

export function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <SplashCursorLayer />
      {/* Fixed UI stays outside #smooth-content */}
      <Navbar />
      {isHome ? <BuyCoffeeButton /> : null}

      <ScrollSmootherProvider enabled={isHome}>
        {children}
        <Footer />
      </ScrollSmootherProvider>

      <Toaster position="top-right" />
    </>
  )
}
