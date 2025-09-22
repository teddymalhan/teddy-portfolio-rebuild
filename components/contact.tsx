import { Github, Linkedin, Mail, Sparkles, MapPin, Clock, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-3xl p-6 border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl", className)}>
      {children}
    </div>
  );
}

function EmailCard() {
  return (
    <BentoCard className="sm:row-span-2 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="flex justify-center mb-6">
        <div className="p-6 bg-primary/20 rounded-2xl">
          <Mail className="w-12 h-12 text-primary" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">📧 Let's Talk</h3>
      <p className="text-foreground/70 mb-6 text-lg">Ready to discuss your next project?</p>
      <a
        href="mailto:ama367@sfu.ca"
        className="text-primary hover:text-primary/80 transition-colors font-semibold text-xl bg-primary/10 px-6 py-3 rounded-xl hover:bg-primary/20"
      >
        ama367@sfu.ca
      </a>
    </BentoCard>
  );
}

function SocialLinksCard() {
  return (
    <BentoCard className="flex flex-col gap-4">
      <span className="text-sm font-semibold uppercase text-muted-foreground">Connect with me</span>
      <div className="flex flex-col gap-3">
        <a
          href="https://linkedin.com/in/teddymalhan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
        >
          <Linkedin size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-foreground font-medium">LinkedIn</span>
          <span className="ml-auto text-sm text-muted-foreground">/teddymalhan</span>
        </a>
        <a
          href="https://github.com/teddymalhan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
        >
          <Github size={20} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="text-foreground font-medium">GitHub</span>
          <span className="ml-auto text-sm text-muted-foreground">/teddymalhan</span>
        </a>
      </div>
    </BentoCard>
  );
}

function LocationCard() {
  return (
    <BentoCard className="flex flex-col gap-4">
      <span className="text-sm font-semibold uppercase text-muted-foreground">Based in</span>
      <div className="flex items-center gap-3">
        <MapPin size={24} className="text-primary" />
        <div>
          <div className="text-xl font-bold text-foreground">Vancouver, BC</div>
          <div className="text-sm text-muted-foreground">Canada 🇨🇦</div>
        </div>
      </div>
    </BentoCard>
  );
}

function AvailabilityCard() {
  return (
    <BentoCard className="flex flex-col gap-4 bg-gradient-to-br from-green-500/10 to-green-600/5">
      <span className="text-sm font-semibold uppercase text-muted-foreground">Status</span>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <div>
          <div className="text-lg font-bold text-foreground">Available for work</div>
          <div className="text-sm text-muted-foreground">Open to new opportunities</div>
        </div>
      </div>
    </BentoCard>
  );
}

function ResponseTimeCard() {
  return (
    <BentoCard className="flex flex-col gap-4">
      <span className="text-sm font-semibold uppercase text-muted-foreground">Response time</span>
      <div className="flex items-center gap-3">
        <Clock size={20} className="text-primary" />
        <div>
          <div className="text-lg font-bold text-foreground">Within 24 hours</div>
          <div className="text-sm text-muted-foreground">Usually much faster ⚡</div>
        </div>
      </div>
    </BentoCard>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-primary/5"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-ping"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Let's Work Together
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            🤝 Ready to <span className="text-primary">Connect?</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            💬 Let's discuss your next project or just chat about tech over coffee ☕
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-3 sm:grid-rows-3 h-[600px]">
            <EmailCard />
            <SocialLinksCard />
            <LocationCard />
            <AvailabilityCard />
            <ResponseTimeCard />
          </div>
        </div>
      </div>
    </section>
  )
}
