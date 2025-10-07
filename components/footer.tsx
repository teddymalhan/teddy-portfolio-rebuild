import Link from "next/link"
import { Mail, Github, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t px-6 py-10 md:py-14">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-sans text-2xl font-semibold tracking-tight">Teddy Malhan</h3>
          <Link
            href="mailto:teddymalhan@gmail.com"
            className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
          >
            teddymalhan@gmail.com
          </Link>

          <div className="mt-4 flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:teddymalhan@gmail.com"
                aria-label="Email"
              >
                <Mail />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/teddymalhan"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <Github />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/teddymalhan/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </Button>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Site</p>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground">Projects</Link>
            <Link href="#experience" className="text-muted-foreground hover:text-foreground">Experience</Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Social</p>
            <a href="https://github.com/teddymalhan" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://www.linkedin.com/in/teddymalhan/" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
            <a href="mailto:teddymalhan@gmail.com" className="text-muted-foreground hover:text-foreground">Email</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">More</p>
            <a href="/Teddy_Malhan_Resume.pdf" target="_blank" rel="noreferrer noopener" className="text-muted-foreground hover:text-foreground">Resume</a>
            <Link href="#about" className="text-muted-foreground hover:text-foreground">About</Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}


