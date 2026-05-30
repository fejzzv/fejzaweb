"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const navItems = [
  { label: "Diskografija", href: "/music" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Usluge", href: "/#services" },
  { label: "O meni", href: "/#about" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="glass mx-4 mt-4 md:mx-8 md:mt-6 rounded-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-[0.3em] text-foreground hover:text-primary transition-colors"
          >
            <img
              src="https://i.ibb.co/RkWkW2Yp/fejza-logo-PNGGG.png"
              alt="Fejza Logo"
              className="h-26 w-auto object-contain" // Prilagodi visinu (h-8 je 32px) po želji
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:block px-6 py-2.5 text-sm tracking-wider uppercase bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.5_0.2_280_/_0.5)]"
          >
            KONTAKT
          </a>

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
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2"
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-2 px-6 py-3 text-center text-sm tracking-wider uppercase bg-primary text-primary-foreground rounded-full"
                >
                  KONTAKT
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
