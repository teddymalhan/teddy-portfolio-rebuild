import Link from "next/link"
import { Mail, Github, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      {/* Ambient glow (match About section) */}
      <div className="pointer-events-none absolute -inset-x-12 -top-8 -bottom-8 opacity-60">
        <div className="mx-auto h-full max-w-6xl rounded-[28px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-2xl" />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Teddy Malhan</h3>
          <Link
            href="mailto:teddymalhan@gmail.com"
            className="mt-2 block text-base md:text-lg text-foreground/90 hover:text-foreground underline decoration-border/50 hover:decoration-primary/50 underline-offset-4"
          >
            teddymalhan@gmail.com
          </Link>

          <div className="mt-5 flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:teddymalhan@gmail.com"
                aria-label="Email"
              >
                <Mail className="text-foreground/90" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/teddymalhan"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <Github className="text-foreground/90" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/teddymalhan/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-foreground/90" />
              </a>
            </Button>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-foreground">Site</p>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
            <Link href="#experience" className="text-muted-foreground hover:text-foreground">Experience</Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-foreground">Social</p>
            <a href="https://github.com/teddymalhan" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://www.linkedin.com/in/teddymalhan/" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            <a href="mailto:teddymalhan@gmail.com" className="text-muted-foreground hover:text-foreground">Email</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-foreground">More</p>
            <a href="/Teddy_Malhan_Resume.pdf" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">Resume</a>
            <Link href="#about" className="text-muted-foreground hover:text-foreground">About</Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}


