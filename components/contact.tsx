import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Sparkles } from "lucide-react"

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

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email Card */}
            <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">📧 Email Me</h3>
                <p className="text-foreground/70 mb-4">Drop me a line anytime</p>
                <a
                  href="mailto:ama367@sfu.ca"
                  className="text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                >
                  ama367@sfu.ca
                </a>
              </CardContent>
            </Card>

            {/* LinkedIn Card */}
            <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">💼 LinkedIn</h3>
                <p className="text-foreground/70 mb-4">Connect professionally</p>
                <a
                  href="https://linkedin.com/in/teddymalhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                >
                  /in/teddymalhan
                </a>
              </CardContent>
            </Card>

            {/* GitHub Card */}
            <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <Github className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">💻 GitHub</h3>
                <p className="text-foreground/70 mb-4">Check out my code</p>
                <a
                  href="https://github.com/teddymalhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-medium text-lg"
                >
                  /teddymalhan
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
