'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
          <div className="flex gap-6 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-dark-muted hover:text-primary-400 transition-colors duration-200 focus-outline"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
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