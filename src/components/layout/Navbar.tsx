'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import GooeyNav from '@/components/GooeyNav'
import ElectricBorder from '@/components/ElectricBorder'
import { scrollToWithSmoother } from '@/components/ScrollSmootherProvider'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '/blog', label: 'News' },
]

function getActiveIndexFromPath(pathname: string) {
  if (pathname.startsWith('/blog')) return 4
  return 0
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  const gooeyItems = useMemo(
    () => navLinks.map((link) => ({ label: link.label, href: link.href })),
    []
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setActiveIndex(getActiveIndexFromPath(pathname))
  }, [pathname])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)

    if (href.startsWith('/#')) {
      router.push(href)
      return
    }

    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push(`/${href}`)
      } else {
        scrollToWithSmoother(href, 72)
      }
    } else {
      router.push(href)
    }
  }

  const isActive = (href: string) => {
    if (href.startsWith('#')) return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link
              href="/"
              onClick={() => {
                setActiveIndex(0)
                scrollToSection('#home')
              }}
            >
              <span className="text-xl font-bold gradient-text">OWUSU</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:px-4">
            <GooeyNav
              items={gooeyItems}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              onItemClick={(item) => scrollToSection(item.href)}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          <div className="hidden md:block">
            <ElectricBorder color="#60a5fa" speed={0.9} chaos={0.05} borderRadius={999}>
              <motion.button
                onClick={() => scrollToSection(pathname === '/' ? '#contact' : '/#contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-colors duration-200 focus-outline text-sm lg:text-base"
              >
                Contact Me
              </motion.button>
            </ElectricBorder>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-text hover:text-primary-500 focus-outline"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        className="md:hidden overflow-hidden glass border-t border-white/10"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`block px-3 py-2 transition-colors duration-200 w-full text-left focus-outline ${
                isActive(link.href)
                  ? 'text-primary-400 font-medium'
                  : 'text-dark-text hover:text-primary-500'
              }`}
            >
              {link.label}
            </button>
          ))}
          <ElectricBorder color="#60a5fa" speed={0.9} chaos={0.05} borderRadius={12} className="w-full">
            <button
              onClick={() => scrollToSection(pathname === '/' ? '#contact' : '/#contact')}
              className="block w-full rounded-lg bg-primary-600 px-3 py-2 text-left text-white transition-colors duration-200 hover:bg-primary-700 focus-outline"
            >
              Contact Me
            </button>
          </ElectricBorder>
        </div>
      </motion.div>
    </motion.nav>
  )
}
