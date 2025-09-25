'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import Image from 'next/image'
import type { Project } from '@/lib/api'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.15 } },
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const firstInteractableRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
  const lastInteractableRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)
  const titleId = 'project-modal-title'

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent background scroll
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = prev
      }
    }
  }, [isOpen, onClose])

  // Initial focus: close button (or first interactive)
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      (firstInteractableRef.current ?? closeBtnRef.current)?.focus()
    }, 0)
    return () => clearTimeout(t)
  }, [isOpen])

  // Trap focus within the dialog
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable || focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === first) {
        e.preventDefault()
        ;(last as HTMLElement).focus()
      }
    } else {
      // Tab
      if (document.activeElement === last) {
        e.preventDefault()
        ;(first as HTMLElement).focus()
      }
    }
  }, [])

  // Prevent clicks inside from bubbling to backdrop
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-2xl outline-none"
            onClick={stopPropagation}
            onKeyDown={handleKeyDown}
            ref={dialogRef}
          >
            {/* Close Button */}
            <motion.button
              ref={closeBtnRef}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-bg/80 hover:bg-dark-bg rounded-full flex items-center justify-center transition-colors focus-outline"
              aria-label="Close modal"
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Project Image */}
            {project.image_url ? (
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
            ) : (
              <div className="relative h-48 md:h-56 rounded-t-2xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-5xl opacity-30">💻</span>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 id={titleId} className="text-2xl md:text-3xl font-bold text-dark-text mb-2">
                  {project.title}
                </h2>

                <div className="flex items-center gap-4 text-dark-muted mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="text-sm">
                      {new Date(project.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.demo_url && (
                    <motion.a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 focus-outline flex items-center gap-2"
                      ref={firstInteractableRef as any}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}

                  {project.repo_url && (
                    <motion.a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 glass-light hover:bg-white/10 text-dark-text rounded-lg font-medium transition-colors duration-200 focus-outline flex items-center gap-2"
                      ref={!project.demo_url ? (firstInteractableRef as any) : (lastInteractableRef as any)}
                    >
                      <Github size={16} />
                      Source Code
                    </motion.a>
                  )}

                  {/* If neither link exists, still provide a focusable element for accessibility */}
                  {!project.demo_url && !project.repo_url && (
                    <button
                      className="px-4 py-2 glass-light text-dark-text rounded-lg font-medium focus-outline"
                      ref={firstInteractableRef as any}
                      onClick={() => {}}
                      aria-disabled
                    >
                      No external links
                    </button>
                  )}
                </div>
              </div>

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-dark-muted" />
                    <span className="text-sm font-medium text-dark-muted">Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark-text mb-3">About This Project</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-dark-muted leading-relaxed">
                    {project.description || project.excerpt}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              {(project.demo_url || project.repo_url) && (
                <div className="border-t border-dark-border pt-6">
                  <h3 className="text-lg font-semibold text-dark-text mb-3">Links</h3>
                  <div className="space-y-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors focus-outline"
                      >
                        <ExternalLink size={16} />
                        View Live Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors focus-outline"
                      >
                        <Github size={16} />
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
