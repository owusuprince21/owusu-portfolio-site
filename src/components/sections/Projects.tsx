'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Project } from '@/lib/api'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import DriftWall, { type DriftWallItem } from '@/components/DriftWall'

type ProjectsProps = {
  projects: Project[]
}

const FALLBACK_IMAGE = '/images/projects/p1.png'

function useResponsiveColumns() {
  const [columns, setColumns] = useState(5)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setColumns(3)
      else if (window.innerWidth < 1024) setColumns(4)
      else setColumns(5)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return columns
}

export function Projects({ projects: allProjects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const columns = useResponsiveColumns()

  const driftItems = useMemo<DriftWallItem[]>(
    () =>
      allProjects.map((project) => ({
        id: String(project.id),
        image: project.image_url || FALLBACK_IMAGE,
        title: project.title,
        href: project.demo_url || undefined,
      })),
    [allProjects]
  )

  const handleItemClick = (item: DriftWallItem) => {
    const project = allProjects.find((entry) => String(entry.id) === item.id)
    if (project) setSelectedProject(project)
  }

  return (
    <section id="projects" className="scroll-section py-20 section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="My"
          highlight="Projects"
          subtitle="Hover and explore — click any tile to open project details."
        />

        {driftItems.length === 0 ? (
          <div className="mb-12 text-center text-dark-muted">No projects to show yet.</div>
        ) : (
          <div className="relative mx-auto mb-8 h-[520px] w-full max-w-6xl sm:h-[580px] lg:h-[620px]">
            <DriftWall
              items={driftItems}
              columns={columns}
              tileWidth={columns <= 3 ? 160 : 200}
              tileHeight={columns <= 3 ? 108 : 132}
              gap={18}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={42}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.6}
              dim={0.55}
              overlayColor="#060010"
              radius={14}
              roll={0}
              pauseOnHover={false}
              grayscale={false}
              onItemClick={handleItemClick}
            />
          </div>
        )}
      </div>

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
