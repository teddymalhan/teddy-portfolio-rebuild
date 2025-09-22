"use client"

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/5 animate-pulse" />
      <div
        className="absolute top-40 right-20 w-24 h-24 rounded-full bg-accent/3 animate-bounce"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-accent/4 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-accent/6 animate-bounce"
        style={{ animationDuration: "4s", animationDelay: "2s" }}
      />

      {/* Geometric shapes */}
      <div
        className="absolute top-1/3 left-1/2 w-16 h-16 bg-accent/8 rotate-45 animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div className="absolute top-2/3 right-10 w-12 h-12 bg-accent/5 rotate-12 animate-pulse" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/3 to-transparent rounded-full blur-3xl" />
    </div>
  )
}
