'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiGit,
  SiFirebase,
  SiThreedotjs,
  SiReactivex,
  SiDotnet,
} from 'react-icons/si'
import FadeContent from '@/components/FadeContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CSharpIcon } from '@/components/icons/CSharpIcon'

const LogoLoop = dynamic(() => import('@/components/LogoLoop'), {
  ssr: false,
  loading: () => <div className="h-[120px] animate-pulse rounded-xl bg-white/5" />,
})

const ICON_SIZE = 48

export function Skills() {
  const techLogos = useMemo(
    () => [
      { node: <SiReact className="text-[#61DAFB]" size={ICON_SIZE} />, title: 'React', href: 'https://react.dev' },
      { node: <SiNextdotjs className="text-white" size={ICON_SIZE} />, title: 'Next.js', href: 'https://nextjs.org' },
      { node: <SiTypescript className="text-[#3178C6]" size={ICON_SIZE} />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
      { node: <SiJavascript className="text-[#F7DF1E]" size={ICON_SIZE} />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { node: <SiTailwindcss className="text-[#06B6D4]" size={ICON_SIZE} />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
      { node: <SiHtml5 className="text-[#E34F26]" size={ICON_SIZE} />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { node: <SiCss className="text-[#1572B6]" size={ICON_SIZE} />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { node: <SiNodedotjs className="text-[#339933]" size={ICON_SIZE} />, title: 'Node.js', href: 'https://nodejs.org' },
      { node: <SiDotnet className="text-[#512BD4]" size={ICON_SIZE} />, title: '.NET', href: 'https://dotnet.microsoft.com' },
      { node: <CSharpIcon size={ICON_SIZE} className="text-[#512BD4]" />, title: 'C#', href: 'https://learn.microsoft.com/dotnet/csharp/' },
      { node: <SiPython className="text-[#3776AB]" size={ICON_SIZE} />, title: 'Python', href: 'https://www.python.org' },
      { node: <SiDjango className="text-[#092E20]" size={ICON_SIZE} />, title: 'Django', href: 'https://www.djangoproject.com' },
      { node: <SiPostgresql className="text-[#4169E1]" size={ICON_SIZE} />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
      { node: <SiGit className="text-[#F05032]" size={ICON_SIZE} />, title: 'Git', href: 'https://git-scm.com' },
      { node: <SiFirebase className="text-[#FFCA28]" size={ICON_SIZE} />, title: 'Firebase', href: 'https://firebase.google.com' },
      { node: <SiThreedotjs className="text-white" size={ICON_SIZE} />, title: 'Three.js', href: 'https://threejs.org' },
      { node: <SiReactivex className="text-[#61DAFB]" size={ICON_SIZE} />, title: 'React Native', href: 'https://reactnative.dev' },
    ],
    []
  )

  return (
    <section id="skills" className="scroll-section py-20 section-padding">
      <div className="max-w-7xl mx-auto text-center">
        <SectionHeading
          title="Skills &"
          highlight="Technologies"
          subtitle="Here are the technologies and tools I work with to bring ideas to life."
        />

        <FadeContent duration={700} className="mt-4">
          <div className="relative h-[100px] overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={44}
              gap={52}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#0a0a0a"
              ariaLabel="Technologies and tools"
              className="py-3"
            />
          </div>
        </FadeContent>

        <FadeContent duration={700} delay={300} className="mt-16">
          <p className="text-dark-muted max-w-3xl mx-auto">
            I&apos;m always learning and staying up-to-date with the latest technologies. My goal is to
            use the right tool for each project to deliver the best possible results.
          </p>
        </FadeContent>
      </div>
    </section>
  )
}
