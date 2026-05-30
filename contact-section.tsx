"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/1fejza" },
  { name: "TikTok", href: "https://tiktok.com/@fejzaouttahere" },
  { name: "YouTube", href: "https://youtube.com/@fejzaje" },
  { name: "Spotify", href: "https://open.spotify.com/artist/3U85DQeC9tXwekf0H8XpIp?si=QTKq_0yFQVWjsw6kkkv2xQ" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Contact info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
             Kontakt
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              Postavi pitanje
              </h2>
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4">
             ili
            </p>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              <span className="block text-primary">Pošalji poruku</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Dozvolite Vašoj mašti da upozna realnost!
            </p>

            {/* Contact details */}
            <div className="space-y-6 mb-12">
              <div>
                <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">E-Mail</p>
                <a 
                  href="mailto:contact@fejza.xyz" 
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  kontakt@fejza.xyz
                </a>
              </div>
              <div>
                <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">Lokacija</p>
                <p className="text-lg text-foreground">Jajce, Bosnia and Herzegovina</p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs tracking-wider uppercase text-muted-foreground mb-4">Zaprati</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 glass rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-wider uppercase text-muted-foreground mb-3">
                    Ime i Prezime
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="Vaše Ime"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-wider uppercase text-muted-foreground mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="vaš@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs tracking-wider uppercase text-muted-foreground mb-3">
                    Poruka
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Opišite Vaš projekat ili postavite pitanje..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground rounded-xl hover:shadow-[0_0_40px_oklch(0.5_0.2_280_/_0.5)] transition-all duration-500"
                >
                  Pošalji E-Mail
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
