import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextHighlighter } from "@/components/fancy/text/text-highlighter"

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Ambient glow (no card) */}
        <div className="pointer-events-none absolute -inset-x-12 -top-8 -bottom-8 opacity-60">
          <div className="mx-auto h-full max-w-3xl rounded-[28px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-2xl" />
        </div>

        <div className="relative z-10 text-center">
          {/* Avatar with gradient ring */}
          <div className="mx-auto mb-8 size-36 rounded-full p-[2px] md:mb-10 md:size-44" style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--muted-foreground)) 100%)" }}>
            <div className="size-full overflow-hidden rounded-full bg-background ring-1 ring-border">
              <Image
                src="/ted-aboutme.jpeg"
                alt="Portrait of Ted"
                width={176}
                height={176}
                className="size-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Highlighted heading */}
          <div className="mx-auto mb-6 max-w-prose md:mb-8">
            <h2 className="font-semibold tracking-tight text-2xl text-foreground md:text-3xl">
              <TextHighlighter className="px-1 py-0.5 rounded-md" highlightColor="hsl(var(--primary)/0.25)">
                Hi, I'm Teddy — I build thoughtful software.
              </TextHighlighter>
            </h2>
          </div>

          {/* Copy */}
          <div className="mx-auto max-w-prose space-y-5 text-left text-muted-foreground leading-relaxed md:space-y-6">
            <p className="text-foreground">
              I'm a Computer Science student and software engineer focused on design systems, developer tooling, and data-driven applications.
            </p>
            <p>
              I care about shipping fast without sacrificing polish. From product thinking to implementation, I enjoy crafting experiences that feel intuitive, performant, and visually cohesive.
            </p>
            <p>
              When I'm not coding, you'll find me on a tennis court, at the gym, or exploring UI/UX patterns. If you're building something interesting, I'd love to chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
