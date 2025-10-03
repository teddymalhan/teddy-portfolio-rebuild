import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { ProjectsBento } from "@/components/projects-bento"
import { Contact } from "@/components/contact"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"
import { TechMascots } from "@/components/tech-mascots"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />
      <TechMascots />

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          
          {/* Frosted Glass Wrapper for all sections below hero */}
          <div className="relative">
            {/* Frosted Glass Backdrop */}
            <div className="absolute inset-0 h-[200%] pointer-events-none">
              <div 
                className="absolute inset-0 h-full backdrop-blur-xl bg-gradient-to-br from-background/60 via-background/40 to-card/60"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0% 50%, transparent 50% 100%)',
                }}
              />
            </div>
            
            {/* Glassy Edge */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-full pointer-events-none"
              style={{
                backdropFilter: 'blur(12px) brightness(1.1)',
                WebkitBackdropFilter: 'blur(12px) brightness(1.1)',
                background: 'hsl(0deg 0% 100% / 0.05)',
                transform: 'translateY(100%)',
                maskImage: 'linear-gradient(to bottom, black 0, black 6px, transparent 6px)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0, black 6px, transparent 6px)',
              }}
            />

            {/* Content */}
            <div className="relative">
              {/* <About /> */}
              <Experience />
              <ProjectsBento />
              <Contact />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
