'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import BlurText from '@/components/BlurText'
import TextType from '@/components/TextType'
import FadeContent from '@/components/FadeContent'
import CardSwap, { Card } from '@/components/CardSwap'
import ElectricBorder from '@/components/ElectricBorder'
import { scrollToWithSmoother } from '@/components/ScrollSmootherProvider'

const Particles = dynamic(() => import('@/components/Particles'), { ssr: false })

const projectCards = [
  {
    title: 'BloomBag GH',
    subtitle: 'E-commerce',
    image: '/images/projects/p7.png',
    gradient: 'from-pink-500/50 via-fuchsia-600/30 to-purple-700/40',
  },
  {
    title: 'W3N Conference',
    subtitle: 'Event platform',
    image: '/images/projects/p1.png',
    gradient: 'from-rose-500/50 via-pink-600/30 to-violet-700/40',
  },
  {
    title: 'Marafiq Real Estate',
    subtitle: 'Property listings',
    image: '/images/projects/p4.png',
    gradient: 'from-fuchsia-500/50 via-pink-500/30 to-indigo-700/40',
  },
  {
    title: 'CheapRides Ghana',
    subtitle: 'Mobility app',
    image: '/images/projects/p3.png',
    gradient: 'from-pink-400/50 via-purple-600/30 to-blue-700/40',
  },
]

function ProjectCardContent({
  title,
  subtitle,
  image,
  gradient,
}: (typeof projectCards)[number]) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
      {image && !failed ? (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 280px, 420px"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-sm font-medium text-pink-200/90">{subtitle}</p>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </div>
  )
}

export function Hero7() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const scrollToContact = () => {
    scrollToWithSmoother('#contact', 72)
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Prince_Owusu_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/owusuprince21', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/prince-owusu-2b23631b5/', label: 'LinkedIn' },
    { icon: FaXTwitter, href: 'https://x.com/_Owusu_Prince', label: 'Twitter' },
    { icon: FaWhatsapp, href: 'https://wa.me/+233547273952', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:powusu050@gmail.com', label: 'Email' },
  ]

  const roles = [
    'Software Developer',
    'Full-Stack Engineer',
    'React & Next.js Specialist',
  ]

  return (
    <section
      id="home"
      className="relative isolate min-h-screen overflow-hidden section-padding pt-24 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dark-bg">
        <Particles
          className="absolute inset-0"
          particleCount={180}
          particleSpread={11}
          speed={0.08}
          particleColors={['#f472b6', '#ec4899', '#e879f9', '#ffffff']}
          moveParticlesOnHover
          particleHoverFactor={0.35}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={0.8}
          cameraDistance={22}
          disableRotation={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 via-dark-bg/60 to-dark-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div className="text-center lg:pt-6 lg:text-left">
            <BlurText
              text="Hi, I'm"
              delay={120}
              animateBy="words"
              className="mb-2 justify-center text-4xl font-bold text-dark-text sm:text-5xl lg:justify-start lg:text-6xl"
            />

            <h1 className="mb-4">
              <span className="text-4xl font-bold gradient-text sm:hidden">Prince Owusu</span>
              <span className="hidden sm:block">
                <BlurText
                  text="Prince Owusu"
                  delay={90}
                  animateBy="words"
                  direction="bottom"
                  className="justify-center text-4xl font-bold gradient-text sm:text-5xl lg:justify-start lg:text-6xl"
                />
              </span>
            </h1>

            <div className="hero7-glow-bar mb-6" aria-hidden />

            <p className="mb-6 flex min-h-[2.5rem] justify-center text-xl text-gray-300 lg:justify-start lg:text-2xl">
              <span className="mr-2 text-dark-muted">I&apos;m a</span>
              <TextType
                text={roles}
                as="span"
                loop
                typingSpeed={65}
                deletingSpeed={35}
                pauseDuration={2200}
                initialDelay={400}
                showCursor
                cursorCharacter="|"
                cursorClassName="ml-0.5 font-light text-primary-400"
                className="font-medium text-primary-300"
              />
            </p>

            <FadeContent duration={800} delay={200}>
              <p className="mx-auto mb-8 max-w-xl text-lg text-dark-muted lg:mx-0">
                Passionate about creating exceptional digital experiences with modern web technologies.
                I specialize in full-stack development using React, Next.js, and Django.
              </p>
            </FadeContent>

            <FadeContent duration={700} delay={350}>
              <div className="mb-8 flex justify-center gap-4 lg:justify-start">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  const iconColors = ['#60a5fa', '#e879f9', '#a78bfa', '#34d399', '#f472b6']
                  return (
                    <ElectricBorder
                      key={social.label}
                      color={iconColors[index % iconColors.length]}
                      speed={0.85}
                      chaos={0.05}
                      borderRadius={999}
                      compact={isMobile}
                    >
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.12, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="focus-outline flex h-12 w-12 items-center justify-center rounded-full glass-light transition-colors duration-200 hover:bg-pink-500/20"
                        aria-label={social.label}
                      >
                        <Icon size={20} className="text-dark-text hover:text-pink-300" />
                      </motion.a>
                    </ElectricBorder>
                  )
                })}
              </div>
            </FadeContent>

            <FadeContent duration={700} delay={450}>
              <div className="mx-auto flex w-full max-w-sm flex-col gap-5 sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start">
                <ElectricBorder
                  color="#60a5fa"
                  speed={0.9}
                  chaos={0.06}
                  borderRadius={999}
                  compact={isMobile}
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    onClick={handleResumeDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus-outline flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-primary-700 sm:w-auto"
                  >
                    <Download size={18} />
                    Download Resume
                  </motion.button>
                </ElectricBorder>

                <ElectricBorder
                  color="#e879f9"
                  speed={0.85}
                  chaos={0.05}
                  borderRadius={999}
                  compact={isMobile}
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    onClick={scrollToContact}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus-outline w-full rounded-full glass-light px-8 py-3 font-medium text-dark-text transition-colors duration-200 hover:bg-white/10 sm:w-auto"
                  >
                    Contact Me
                  </motion.button>
                </ElectricBorder>
              </div>
            </FadeContent>
          </div>

          <div className="relative mx-auto mt-8 h-[360px] w-full max-w-[340px] overflow-visible sm:mt-10 sm:h-[400px] sm:max-w-[400px] lg:mt-10 lg:h-[520px] lg:max-w-[520px]">
            <CardSwap
              width={380}
              height={280}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
              skewAmount={6}
              easing="elastic"
            >
              {projectCards.map((project) => (
                <Card
                  key={project.title}
                  customClass="overflow-hidden border-white/20 bg-dark-card shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
                >
                  <ProjectCardContent {...project} />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  )
}
