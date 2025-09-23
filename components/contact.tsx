import { Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-3xl p-6 border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", className)}>
      {children}
    </div>
  );
}

function ContactCard() {
  return (
    <BentoCard className="flex flex-col gap-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/20 rounded-2xl">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">let's connect!</h3>
        <p className="text-foreground/70 text-base">ready to discuss your next project?</p>
      </div>
      
      <div className="flex flex-col gap-3">
        <a
          href="mailto:ama367@sfu.ca"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
        >
          <Mail size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-foreground font-medium">email</span>
          <span className="ml-auto text-sm text-muted-foreground">ama367@sfu.ca</span>
        </a>
        <a
          href="https://linkedin.com/in/teddymalhan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
        >
          <Linkedin size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-foreground font-medium">linkedin</span>
          <span className="ml-auto text-sm text-muted-foreground">/teddymalhan</span>
        </a>
        <a
          href="https://github.com/teddymalhan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
        >
          <Github size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-foreground font-medium">github</span>
          <span className="ml-auto text-sm text-muted-foreground">/teddymalhan</span>
        </a>
      </div>
    </BentoCard>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4 bg-card/50">
            <Sparkles className="w-4 h-4" />
            Let's Work Together
          </div> */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            🤝 ready to <span className="text-primary">connect?</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            💬 let's discuss your next project or just chat about tech over coffee ☕
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="h-auto bg-card/50 backdrop-blur-sm hover:bg-card/80">
            <ContactCard />
          </div>
        </div>
      </div>
    </section>
  )
}
