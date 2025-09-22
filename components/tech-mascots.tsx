"use client"

import { useEffect, useState } from "react"

interface Mascot {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  scale: number
  scaleDirection: number
  emoji: string
  size: number
}

export function TechMascots() {
  const [mascots, setMascots] = useState<Mascot[]>([])

  useEffect(() => {
    const emojis = ["🤖", "👾", "🚀", "⚡", "💻", "🔧", "⚙️", "🎯"]

    const newMascots: Mascot[] = []

    for (let i = 0; i < 8; i++) {
      newMascots.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1,
        scale: Math.random() * 0.3 + 0.7,
        scaleDirection: Math.random() > 0.5 ? 1 : -1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 20 + 40,
      })
    }

    setMascots(newMascots)
  }, [])

  useEffect(() => {
    const animate = () => {
      setMascots((prev) =>
        prev.map((mascot) => {
          let newX = mascot.x + mascot.vx
          let newY = mascot.y + mascot.vy

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - mascot.size) {
            mascot.vx *= -1
            newX = Math.max(0, Math.min(window.innerWidth - mascot.size, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight - mascot.size) {
            mascot.vy *= -1
            newY = Math.max(0, Math.min(window.innerHeight - mascot.size, newY))
          }

          // Update scale with breathing effect
          const newScale = mascot.scale + mascot.scaleDirection * 0.001
          if (newScale <= 0.5 || newScale >= 1.3) {
            mascot.scaleDirection *= -1
          }

          return {
            ...mascot,
            x: newX,
            y: newY,
            rotation: mascot.rotation + mascot.rotationSpeed,
            scale: newScale,
          }
        }),
      )
    }

    const interval = setInterval(animate, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {mascots.map((mascot) => (
        <div
          key={mascot.id}
          style={{
            position: "absolute",
            left: mascot.x,
            top: mascot.y,
            width: mascot.size,
            height: mascot.size,
            transform: `rotate(${mascot.rotation}deg) scale(${mascot.scale})`,
            fontSize: mascot.size * 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 4px 12px rgba(100, 255, 218, 0.3))",
            transition: "none",
            zIndex: 1,
          }}
          className="opacity-80"
        >
          {mascot.emoji}
        </div>
      ))}
    </div>
  )
}
