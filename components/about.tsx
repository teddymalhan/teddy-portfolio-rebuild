import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full ring-2 ring-border shadow-md">
          <Image
            src="/ted-aboutme.jpeg"
            alt="Portrait of Ted"
            width={112}
            height={112}
            className="h-28 w-28 object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-left text-muted-foreground leading-relaxed">
          <p className="text-foreground">
            Hi! I'm Ted, a Computer Science student and software engineer. I've worked across design systems, developer tooling, and data apps.
          </p>
          <p>
            For me, programming is about building and fixing. I love creating products that solve real problems and feel great to use.
          </p>
          <p>
            Outside of work, I enjoy playing tennis, lifting, and dabbling in UI/UX design. If you're building something interesting or want to chat, feel free to reach out!
          </p>
        </div>

        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
