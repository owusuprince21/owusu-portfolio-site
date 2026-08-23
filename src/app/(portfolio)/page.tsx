import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'
import { getAllProjects } from '@/lib/projects'

const WhatIDo = dynamic(() => import('@/components/sections/WhatIDo').then((m) => m.WhatIDo))
const Projects = dynamic(() => import('@/components/sections/Projects').then((m) => m.Projects))
const Skills = dynamic(() => import('@/components/sections/Skills').then((m) => m.Skills))
const Contact = dynamic(() => import('@/components/sections/Contact').then((m) => m.Contact))

export default async function Home() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="bg-dark-bg">
        <WhatIDo />
        <Projects projects={projects} />
        <Skills />
        <Contact />
      </div>
    </main>
  )
}
