"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// Preimenovano u navItems da ne bi bilo konflikta sa imenom komponente
const navItems = [
  { label: "Diskografija", href: "/music" },
  { label: "Portfolio", href: "/#work" },
  { label: "Usluge", href: "/#services" },
  { label: "O meni", href: "/#about" },
]

export function MusicNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <footer className="relative py-12 md:py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="block hover:opacity-80 transition-opacity"
          >
            <img
              src="https://i.ibb.co/RkWkW2Yp/fejza-logo-PNGGG.png"
              alt="Fejza Logo"
              className="h-16 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/#contact"
            className="hidden md:block px-6 py-2.5 text-sm tracking-wider uppercase bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.5_0.2_280_/_0.5)]"
          >
            KONTAKT
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              className="w-6 h-0.5 bg-foreground block origin-center"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-foreground block"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="w-6 h-0.5 bg-foreground block origin-center"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-6 pt-6 border-t border-border"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="block mt-2 px-6 py-3 text-center text-sm tracking-wider uppercase bg-primary text-primary-foreground rounded-full"
                  >
                    KONTAKT
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}