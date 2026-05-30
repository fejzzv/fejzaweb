"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const particleCount = 50
    const newParticles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      })
    }
    
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ambient purple glow orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, oklch(0.4 0.2 280 / 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, oklch(0.35 0.18 280 / 0.12) 0%, transparent 70%)',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, oklch(0.45 0.15 300 / 0.1) 0%, transparent 70%)',
          animationDelay: '4s',
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'oklch(0.7 0.15 280 / 0.6)',
            boxShadow: '0 0 10px oklch(0.6 0.2 280 / 0.5)',
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
