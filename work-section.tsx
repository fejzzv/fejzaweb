"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const projects = [
  {
    title: "1.5M+ jedinstvenih korisnika",
    category: "YouTube & YouTube Music",
    description: "Približan broj jedinstvenih korisnika koji su vidjeli sadržaj s kanala.",
    year: "since 2022",
    youtubeId: "", // Replace with actual YouTube video ID
  },
  {
    title: "500K+ pregleda",
    category: "YouTube & YouTube Music",
    description: "Približan broj ostvarenih pregleda unutar platforme.",
    year: "since 2022",
    youtubeId: "", // Replace with actual YouTube video ID
  },
  {
    title: "150K+ streamova",
    category: "Spotify, Apple Music & Deezer",
    description: "Približan ukupan broj slušanja na vodećim platformama u svijetu.",
    year: "since 2023",
    youtubeId: "", // Replace with actual YouTube video ID
  },
  {
    title: "u 50K+ playlisti",
    category: "YouTube, YT Music & Spotify",
    description: "Približan broj uvrštavanja pjesama u korisničke i uredničke playliste.",
    year: "since 2022",
    youtubeId: "", // Replace with actual YouTube video ID
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-2xl p-6 md:p-8 h-full transition-all duration-500 hover:shadow-[0_0_60px_oklch(0.4_0.2_280_/_0.3)] hover:border-primary/30">
        {/* Project number */}
        <span className="text-7xl md:text-8xl font-bold text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors duration-500">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
            {project.category}
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground group-hover:text-glow transition-all duration-300">
            {project.title}
          </h3>

          {/* YouTube Embed 
          <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>*/}

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{project.year}</span>
            <motion.div
              className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 5 }}
            >
              <span className="tracking-wider uppercase">Pogledaj diskografiju</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WorkSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="work" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
            fejza
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Analitički podaci
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Pregled ključnih pokazatelja rasta, digitalne prisutnosti i angažmana publike na vodećim svjetskim platformama.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span>Pogledaj diskografiju</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
