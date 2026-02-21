'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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
    {
      icon: Github,
      href: 'https://github.com/owusuprince21',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/prince-owusu-2b23631b5/',
      label: 'LinkedIn'
    },
    {
      icon: FaXTwitter,
      href: 'https://x.com/_Owusu_Prince',
      label: 'Twitter'
    },
        {
          icon: FaWhatsapp,
          href: 'https://wa.me/+233547273952',
          label: 'WhatsApp'
        },
    {
      icon: Mail,
      href: 'mailto:powusu050@gmail.com',
      label: 'Email'
    }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-1 lg:order-2"
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-full blur-2xl transform -rotate-6"></div>

                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                  <Image
                    src="/hero-img.jpeg"
                    alt="Prince Owusu - Software Developer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 384px"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/20 to-transparent"></div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full shadow-lg"
                ></motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full shadow-lg"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              Hi, I&apos;m <span className="gradient-text">Prince Owusu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300  mb-6"
            >
              I&apos;m a Software Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-dark-muted mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Passionate about creating exceptional digital experiences with modern web technologies. 
              I specialize in full-stack development using React, Next.js, and Django.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex gap-4 justify-center lg:justify-start mb-8"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 glass-light rounded-full flex items-center justify-center hover:bg-primary-500/20 transition-colors duration-200 focus-outline"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-dark-text hover:text-primary-400" />
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={handleResumeDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors duration-200 focus-outline flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 glass-light hover:bg-white/10 text-dark-text rounded-full font-medium transition-colors duration-200 focus-outline"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
