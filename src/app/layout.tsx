import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/providers/ThemeProvider'
import { CursorFX } from '../components/effects/CursorFX'
import Loader from '@/components/ui/Loader'
// import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prince Owusu - Software Developer Portfolio',
  description: 'Full-stack developer specializing in React, Next.js, and Django. Explore my projects and get in touch.',
  keywords: ['software developer', 'full stack', 'react', 'nextjs', 'django', 'portfolio'],
  authors: [{ name: 'Prince Owusu' }],
  openGraph: {
    title: 'Prince Owusu - Software Developer Portfolio',
    description: 'Full-stack developer specializing in React, Next.js, and Django.',
    url: 'https://owusu.vercel.app',
    siteName: 'Prince Owusu Portfolio',
    images: [
      {
        url: '/hero-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Prince Owusu - Software Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Owusu - Software Developer Portfolio',
    description: 'Full-stack developer specializing in React, Next.js, and Django.',
    images: ['/hero-img.jpg'],
    creator: '@princeowusu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {/* <header className="p-4 flex justify-end">
          <ThemeToggle />
        </header> */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorFX />
          <Loader />
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}