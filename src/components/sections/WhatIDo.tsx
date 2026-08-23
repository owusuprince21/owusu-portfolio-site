'use client'

import { motion } from 'framer-motion'
import { Code2, Smartphone, Globe, Database, Palette, Rocket } from 'lucide-react'
import FadeContent from '@/components/FadeContent'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function WhatIDo() {
  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description:
        'End-to-end web applications using modern frameworks like React, Next.js, and Django.',
    },
    {
      icon: Globe,
      title: 'Frontend Development',
      description:
        'Responsive, interactive user interfaces with seamless user experiences and modern design.',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Scalable APIs, databases, and server-side logic for robust web applications.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps using React Native and modern mobile technologies.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design approach creating intuitive and visually appealing interfaces.',
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description:
        'Speed optimization, SEO improvements, and deployment strategies for better performance.',
    },
  ]

  return (
    <section id="about" className="scroll-section py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="What I"
          highlight="Do"
          subtitle="I specialize in creating digital solutions that combine beautiful design with powerful functionality."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <FadeContent key={service.title} blur delay={index * 80} duration={800}>
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className="group h-full"
                >
                  <div className="glass p-8 rounded-2xl h-full transition-all duration-300 group-hover:border-primary-500/30">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25"
                    >
                      <Icon size={24} className="text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-3 text-dark-text group-hover:text-primary-400 transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-dark-muted leading-relaxed">{service.description}</p>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full mt-6 group-hover:w-20 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              </FadeContent>
            )
          })}
        </div>
      </div>
    </section>
  )
}
