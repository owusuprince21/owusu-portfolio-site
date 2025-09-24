'use client'

import { motion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiReactquery,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiGit,
  SiFirebase,
  SiThreedotjs,
  SiReactivex,
} from 'react-icons/si'

export function Skills() {
  const skills = [
    { name: 'React', icon: <SiReact size={36} />, category: 'Frontend' },
    { name: 'Next.js', icon: <SiNextdotjs size={36} />, category: 'Frontend' },
    { name: 'JavaScript', icon: <SiJavascript size={36} />, category: 'Language' },
    { name: 'TypeScript', icon: <SiTypescript size={36} />, category: 'Language' },
    { name: 'HTML5', icon: <SiHtml5 size={36} />, category: 'Frontend' },
    { name: 'CSS3', icon: <SiCss3 size={36} />, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={36} />, category: 'Frontend' },
    { name: 'React Native', icon: <SiReactivex size={36} />, category: 'Mobile' },
    { name: 'Node.js', icon: <SiNodedotjs size={36} />, category: 'Backend' },
    { name: 'Python', icon: <SiPython size={36} />, category: 'Language' },
    { name: 'Django', icon: <SiDjango size={36} />, category: 'Backend' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={36} />, category: 'Database' },
    { name: 'Git', icon: <SiGit size={36} />, category: 'Tools' },
    { name: 'Firebase', icon: <SiFirebase size={36} />, category: 'Backend' },
    { name: 'Three.js', icon: <SiThreedotjs size={36} />, category: 'Frontend' },
  ]

  return (
    <section id="skills" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold mb-4"
        >
          Skills & <span className="gradient-text">Technologies</span>
        </motion.h2>
        <p className="text-lg text-dark-muted max-w-2xl mx-auto mb-16">
          Here are the technologies and tools I work with to bring ideas to life.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="group"
            >
              <div className="glass p-4 rounded-xl h-full flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-primary-500/30 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Skill Icon */}
                <div className="relative w-12 h-12 mb-3 flex items-center justify-center text-2xl">
                  {skill.icon}
                </div>

                {/* Skill Name */}
                <h3 className="text-sm font-medium text-dark-text group-hover:text-primary-400 transition-colors duration-200 relative z-10">
                  {skill.name}
                </h3>

                {/* Category */}
                <span className="text-xs text-dark-muted mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
                  {skill.category}
                </span>

                {/* Shine effect */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-dark-muted max-w-3xl mx-auto"
        >
          I&apos;m always learning and staying up-to-date with the latest technologies. My goal is to use the right tool for each project to deliver the best possible results.
        </motion.p>
      </div>
    </section>
  )
}
