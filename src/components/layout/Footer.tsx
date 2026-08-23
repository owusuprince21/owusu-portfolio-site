'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ElectricBorder from '@/components/ElectricBorder'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export function Footer() {
  const currentYear = new Date().getFullYear()

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
      icon:FaXTwitter,
      href: 'https://x.com/_Owusu_Prince',
      label: 'Twitter'
    },
    {
      icon: Mail,
      href: 'mailto:powusu050@gmail.com',
      label: 'Email'
    },
    {
      icon: FaWhatsapp,
      href: 'https://wa.me/+233547273952',
      label: 'WhatsApp'
    }
  ]

  const scrollToTop = () => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(0, true)
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="max-w-7xl mx-auto section-padding py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-dark-muted text-center md:text-left">
              © {currentYear} Prince Owusu. All rights reserved.
            </p>
          </div>

          {/* Center - Social Links */}
          <div className="mb-4 flex gap-4 md:mb-0">
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
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus-outline flex h-10 w-10 items-center justify-center rounded-full glass-light text-dark-muted transition-colors duration-200 hover:bg-pink-500/20 hover:text-primary-400"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                </ElectricBorder>
              )
            })}
          </div>

          {/* Right side - Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-dark-muted hover:text-primary-400 transition-colors duration-200 focus-outline"
            aria-label="Back to top"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}