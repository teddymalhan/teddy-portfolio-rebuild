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
          {/* <About /> */}
          <ProjectsBento />
          <Experience />
          <Contact />
        </main>
      </div>
    </div>
  )
}
