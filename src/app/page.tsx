import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { WhatIDo } from '@/components/sections/WhatIDo'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { BuyCoffeeButton } from '@/components/ui/BuyCoffeeButton'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Navbar />
      <Hero />
      <WhatIDo />
      <Projects />
      <Skills />
      <Contact />
      {/* <Footer /> */}
      <BuyCoffeeButton />
    </main>
  )
}