import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { ProjectsBento } from "@/components/projects-bento"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"
import { TechMascots } from "@/components/tech-mascots"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"

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
          <div className="relative bg-background">
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <Experience />
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <ProjectsBento />
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <About />
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}
