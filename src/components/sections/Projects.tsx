'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Github, Eye } from 'lucide-react'
import Image from 'next/image'
// Only importing the type for consistency; we're NOT calling the API.
import type { Project, Tag } from '../../lib/api'
import { ProjectModal } from '../../components/ui/ProjectModal'

/* -----------------------------------------------------------
 * Mock data (local-only; no Sanity calls)
 * You can edit freely or move this to a separate file if you prefer.
 * --------------------------------------------------------- */
const MOCK_TAGS: Tag[] = [
  { id: 't1', name: 'Next.js' },
  { id: 't2', name: 'TypeScript' },
  { id: 't3', name: 'TailwindCSS' },
  { id: 't4', name: 'Framer Motion' },
  { id: 't5', name: 'Sanity' },
]

const pickTags = (...names: string[]): Tag[] =>
  names
    .map(n => MOCK_TAGS.find(t => t.name === n))
    .filter((x): x is Tag => Boolean(x))

const monthsAgo = (n: number) =>
  new Date(new Date().getFullYear(), new Date().getMonth() - n, 12).toISOString()

const MOCK_PROJECTS_ALL: Project[] = [
  {
    id: 'p1',
    title: 'Nigeria W3N Conference',
    slug: 'nigeria-w3n-conference',
    excerpt: 'Official event site for the W3N Conference in Nigeria with agenda, speakers, and ticketing.',
    description:
      'A responsive conference website built with Next.js and TailwindCSS. Features include agenda scheduling, speaker bios, sponsor sections, and online ticket booking integration.',
    image_url: '/images/projects/p1.png',
    tags: pickTags('Next.js', 'TypeScript', 'TailwindCSS'),
    demo_url: 'https://w3ncon.vercel.app/',
    repo_url: 'https://github.com/owusuprince21',
    featured: true,
    created_at: monthsAgo(1),
    updated_at: monthsAgo(0),
  },
  {
    id: 'p2',
    title: 'Nigeria Blockchain Hub',
    slug: 'nigeria-blockchain-site',
    excerpt: 'Educational and community hub for Nigeria’s blockchain ecosystem.',
    description:
      'Built as an informational portal for blockchain enthusiasts in Nigeria. Includes resources, community events, blog posts, and integration with learning modules.',
    image_url: '/images/projects/p2.png',
    tags: pickTags('Next.js', 'TailwindCSS', 'Framer Motion'),
    demo_url: 'https://blockchain-week-v2.vercel.app/',
    repo_url: 'https://github.com/owusuprince21',
    featured: false,
    created_at: monthsAgo(2),
    updated_at: monthsAgo(1),
  },
  {
    id: 'p3',
    title: 'CheapRides Ghana',
    slug: 'cheaprides-ghana',
    excerpt: 'Discover premium vehicles with transparent pricing',
    description:
      'A car auction platform offering a wide range of vehicles with real-time availability and booking. Features include user reviews, pricing transparency, and a seamless reservation process.',
    image_url: '/images/projects/p3.png',
    tags: pickTags('Next.js', 'Django', 'TailwindCSS'),
    demo_url: 'https://cheaprides.com/',
    repo_url: 'https://github.com/owusuprince21',
    featured: true,
    created_at: monthsAgo(3),
    updated_at: monthsAgo(2),
  },
  {
    id: 'p4',
    title: 'Marafiq Real Estate',
    slug: 'marafiq-real-estate',
    excerpt: 'Real estate showcase platform for modern property listings in Nigeria.',
    description:
      'Dynamic property listing site with search, filters, and image galleries. Built with Next.js and Sanity CMS for easy content updates by real estate agents.',
    image_url: '/images/projects/p4.png',
    tags: pickTags('Next.js', 'Sanity', 'TailwindCSS'),
    demo_url: 'https://marafiq-www.vercel.app/',
    repo_url: 'https://github.com/owusuprince21',
    featured: false,
    created_at: monthsAgo(4),
    updated_at: monthsAgo(3),
  },
  {
    id: 'p5',
    title: 'NewMax Real Estate',
    slug: 'newmax-real-estate',
    excerpt: 'Modern apartments with skyline views and high-end amenities.',
    description:
      'Landing page for NewMax Real Estate featuring property highlights, pricing, FAQs, and strong call-to-action blocks. Designed with performance and modern animations in mind.',
    image_url: '/images/projects/p5.png',
    tags: pickTags('Next.js', 'TailwindCSS', 'Framer Motion'),
    demo_url: '#',
    repo_url: 'https://github.com/owusuprince21',
    featured: false,
    created_at: monthsAgo(6),
    updated_at: monthsAgo(6),
  },
    {
    id: 'p6',
    title: 'Trailer Fie',
    slug: 'trailer-fie',
    excerpt: 'A modern movie trailer discovery platform',
    description:
      'Trailer Fie is a modern web platform for discovering and watching movie trailers. The project focuses on a clean UI, smooth animations, and fast performance. It features a responsive landing page, trailer previews, movie highlights, and engaging call-to-action sections, all built with a strong emphasis on user experience and visual appeal.',
    image_url: '/images/projects/p6.png',
    tags: pickTags('Next.js', 'TailwindCSS', 'Framer Motion'),
    demo_url: 'https://trailer-fie.vercel.app',
    repo_url: 'https://github.com/owusuprince21',
    featured: false,
    created_at: monthsAgo(6),
    updated_at: monthsAgo(6),
  },
]


const PAGE_SIZE = 9

/* ============================================================
 * Component
 * ============================================================ */
export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  // Pre-compute the pages from mock data
  const pages = useMemo(() => {
    const total = MOCK_PROJECTS_ALL.length
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
    return { total, totalPages }
  }, [])

  useEffect(() => {
    // simulate a short loading for skeleton (optional)
    const t = setTimeout(() => {
      const slice = MOCK_PROJECTS_ALL.slice(0, PAGE_SIZE)
      setProjects(slice)
      setHasMore(MOCK_PROJECTS_ALL.length > slice.length)
      setLoading(false)
    }, 150) // small delay for UX polish

    return () => clearTimeout(t)
  }, [])

  const loadMore = () => {
    const nextPage = page + 1
    const start = (nextPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    const nextSlice = MOCK_PROJECTS_ALL.slice(start, end)

    setProjects(prev => [...prev, ...nextSlice])
    setPage(nextPage)
    setHasMore(nextPage < pages.totalPages && end < MOCK_PROJECTS_ALL.length)
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-dark-border"></div>
                <div className="p-6">
                  <div className="h-4 bg-dark-border rounded mb-2"></div>
                  <div className="h-3 bg-dark-border rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-dark-muted max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center text-dark-muted mb-12">No projects to show yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:border-primary-500/30">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-4xl opacity-30">💻</div>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-dark-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors focus-outline"
                        aria-label="View project details"
                      >
                        <Eye size={16} className="text-white" />
                      </motion.button>

                      {project.demo_url && (
                        <motion.a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 glass-light rounded-full flex items-center justify-center hover:bg-white/20 transition-colors focus-outline"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={16} className="text-white" />
                        </motion.a>
                      )}

                      {project.repo_url && (
                        <motion.a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 glass-light rounded-full flex items-center justify-center hover:bg-white/20 transition-colors focus-outline"
                          aria-label="View source code"
                        >
                          <Github size={16} className="text-white" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-dark-text group-hover:text-primary-400 transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-dark-muted mb-4 line-clamp-3">
                      {project.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 bg-dark-border text-dark-muted rounded-full text-sm">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200 focus-outline"
                    >
                      Read more →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass-light hover:bg-white/10 text-dark-text rounded-full font-medium transition-colors duration-200 focus-outline"
            >
              Load More Projects
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
