"use client"

import { motion } from "framer-motion"

const footerLinks = [
  { label: "Diskografija", href: "/music" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Usluge", href: "/#services" },
  { label: "O meni", href: "/#about" },
]


export function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="block hover:opacity-80 transition-opacity" // Smanjili smo stilove teksta i dodali blagi efekat na hover
          >
            <img
              src="https://i.ibb.co/RkWkW2Yp/fejza-logo-PNGGG.png"
              alt="Fejza Logo"
              className="h-26 w-auto object-contain" // Prilagodi visinu (h-8 je 32px) po želji
            />
          </motion.a>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            {new Date().getFullYear()} fejza | All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
