"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
  { value: 5, suffix: "+", label: "Godina Iskustva" },
  { value: 200, suffix: "+", label: "Završenih Projekata" },
  { value: 500, suffix: "K+", label: "Slušanja" },
  { value: 40, suffix: "+", label: "Muzičkih Izdanja" },
]

const skills = [
  { 
    name: 'FL Studio 2025', 
    url: 'https://www.image-line.com/fl-studio/',
    imgSrc: "https://i.ibb.co/9mRQD4wZ/fl-icon.png" 
  },
  { 
    name: 'Logic Pro', 
    url: 'https://www.apple.com/logic-pro/',
    imgSrc: "https://i.ibb.co/xtcSvcbm/logic-icon.png"
  },
  { 
    name: 'Photoshop', 
    url: 'https://www.adobe.com/products/photoshop.html',
    imgSrc: "https://i.ibb.co/z99329c/ps-icon.png"
  },
  { 
    name: 'Premiere Pro', 
    url: 'https://www.adobe.com/products/premiere.html',
    imgSrc: "https://i.ibb.co/G68tz8W/pr-icon.png"
  }
];

function AnimatedNumber({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart)

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" })

  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left column - Text content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4"></p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              <span className="block text-primary">O meni</span>
            </h1>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Faris Ribić, poznatiji kao fejza. Rođen u Jajcu u Bosni i Hercegovini.
              </p>
              <p>
                Kao artist, producent, tekstopisac, mix & master inžinjer i grafički dizajner je posvećen svakom detalju procesa stvaranja. Najviše radi u trap žanru, gdje kroz moderan pristup gradi autentičan i prepoznatljiv izraz.
              </p>
              <p>
                Tokom dosadašnjeg rada ostvario je saradnje sa brojnim umjetnicima i učestvovao na različitim muzičkim i kreativnim projektima. Fokus mu nije samo na kvaliteti izvedbe, već i na stvaranju iskustava koja ostavljaju snažan utisak.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {/* Ovdje je promijenjeno na isInView radi stabilnosti animacije */}
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </p>
                  <p className="text-xs tracking-wider uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative glow */}
              <div 
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle, oklch(0.5 0.2 280 / 0.3) 0%, transparent 70%)',
                }}
              />
              
              <div className="relative z-10">
                <h3 
                  className="text-2xl md:text-3xl font-light leading-relaxed text-foreground mb-8"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Programi koje koristim:
                </h3>
                
                {/* Rešetka sa programima */}
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <a 
                      key={index}
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-5 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 hover:bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300 group cursor-pointer backdrop-blur-sm"
                    >
                      {/* Prikazivanje unesenih PNG slika */}
                      <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                        <img 
                          src={skill.imgSrc} 
                          alt={skill.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
                        {skill.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 glass rounded-2xl p-6 hidden lg:block"
            >
              <p className="font-semibold text-foreground">Pronađi se</p>
              <p className="text-sm text-muted-foreground mb-1">ili se izgubi.</p>
            </motion.div>*/}

          </motion.div>
        </div>
      </div>
    </section>
  );
}