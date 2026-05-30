"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* Music Production - Piano/Keyboard icon */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: "Produkcija i aranžman",
    description: "Kreiranje autentičnih i tehnički besprijekornih instrumentalnih podloga prilagođenih specifičnoj viziji izvođača. Fokus je na inovativnom pristupu modernim muzičkim pravcima, preciznom strukturiranju aranžmana i definisanju jedinstvenog zvučnog identiteta.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* Mix & Mastering - Equalizer icon */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-8M3 9V3M8 21v-5M8 12V3M13 21v-10M13 7V3M18 21v-3M18 14V3M23 21v-7M23 10V3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1 13h4M6 16h4M11 11h4M16 18h4M21 14h2" />
      </svg>
    ),
    title: "Mix & Mastering zvuka",
    description: "Finalizacija sirovih audio snimaka kroz napredne procese frekvencijskog balansiranja, dinamike i prostornog pozicioniranja. Cilj je postizanje maksimalne čistoće, širine i konkurentnosti zvuka na svim reprodukcionim sistemima.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* Songwriting - Pen/Paper icon */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Songwriting",
    description: "Songwriting i razvoj muzičkih ideja sa fokusom na emociju, flow i prepoznatljiv stil, uz prilagođavanje artističkoj viziji.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {/* Graphic Design - Palette/Brush icon */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Grafički dizajn",
    description: "Razvoj cjelokupnog vizuelnog identiteta i grafičkih rješenja za brendove, kompanije i pojedince. Spajanjem estetike i funkcionalnosti kreiram unikatne vizuelne koncepte koji prenose jasnu poruku, bilo da se radi o digitalnim platformama ili štampanim medijima.",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:shadow-[0_0_50px_oklch(0.4_0.2_280_/_0.25)] hover:border-primary/20">
        <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
            Usluge
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Čime se bavim?
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
