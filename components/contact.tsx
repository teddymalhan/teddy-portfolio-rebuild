import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"

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
            <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">let's connect!</h3>
        <p className="text-foreground/70 text-base">ready to discuss your next project?</p>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="contact-item p-3 rounded-xl hover:bg-primary/10 transition-colors group">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <a
              href="mailto:ama367@sfu.ca"
              className="flex items-center gap-3 min-w-0 flex-1"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-foreground font-medium flex-shrink-0">email</span>
            </a>
            <CopyButton text="ama367@sfu.ca" className="flex-shrink-0" />
          </div>
          <div className="mt-2 ml-8 text-sm text-muted-foreground selectable-text break-all">
            ama367@sfu.ca
          </div>
        </div>
        
        <div className="contact-item p-3 rounded-xl hover:bg-primary/10 transition-colors group">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <a
              href="https://linkedin.com/in/teddymalhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 min-w-0 flex-1"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-foreground font-medium flex-shrink-0">linkedin</span>
            </a>
            <CopyButton text="https://linkedin.com/in/teddymalhan" className="flex-shrink-0" />
          </div>
          <div className="mt-2 ml-8 text-sm text-muted-foreground selectable-text break-all">
            linkedin.com/in/teddymalhan
          </div>
        </div>
        
        <div className="contact-item p-3 rounded-xl hover:bg-primary/10 transition-colors group">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <a
              href="https://github.com/teddymalhan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 min-w-0 flex-1"
            >
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="text-foreground font-medium flex-shrink-0">github</span>
            </a>
            <CopyButton text="https://github.com/teddymalhan" className="flex-shrink-0" />
          </div>
          <div className="mt-2 ml-8 text-sm text-muted-foreground selectable-text break-all">
            github.com/teddymalhan
          </div>
        </div>
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
          <ContactCard />
        </div>
      </div>
    </section>
  )
}
