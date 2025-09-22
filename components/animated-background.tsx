"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "#64FFDA" : "#8892B0",
      })
    }

    // Grid lines
    const gridLines: Array<{
      x1: number
      y1: number
      x2: number
      y2: number
      opacity: number
      fadeDirection: number
    }> = []

    // Create grid lines
    for (let i = 0; i < 20; i++) {
      gridLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.1 + 0.02,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      gridLines.forEach((line) => {
        ctx.strokeStyle = `rgba(100, 255, 218, ${line.opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(line.x1, line.y1)
        ctx.lineTo(line.x2, line.y2)
        ctx.stroke()

        // Animate opacity
        line.opacity += line.fadeDirection * 0.001
        if (line.opacity <= 0.01 || line.opacity >= 0.08) {
          line.fadeDirection *= -1
        }
      })

      // Draw and update particles
      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(${particle.color === "#64FFDA" ? "100, 255, 218" : "136, 146, 176"}, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Animate opacity
        particle.opacity += (Math.random() - 0.5) * 0.01
        particle.opacity = Math.max(0.05, Math.min(0.4, particle.opacity))
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * 0.1
            ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
