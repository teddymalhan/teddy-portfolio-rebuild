import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react"

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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            💬 Let's discuss your next project or just chat about tech over coffee ☕
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Card */}
              <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">📧 Email Me</h3>
                  <p className="text-sm text-muted-foreground mb-3">Drop me a line anytime</p>
                  <a
                    href="mailto:ama367@sfu.ca"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    ama367@sfu.ca
                  </a>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">📱 Call Me</h3>
                  <p className="text-sm text-muted-foreground mb-3">Let's have a conversation</p>
                  <a
                    href="tel:672-339-2503"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    672-339-2503
                  </a>
                </CardContent>
              </Card>

              {/* LinkedIn Card */}
              <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">💼 LinkedIn</h3>
                  <p className="text-sm text-muted-foreground mb-3">Connect professionally</p>
                  <a
                    href="https://linkedin.com/in/teddymalhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    /in/teddymalhan
                  </a>
                </CardContent>
              </Card>

              {/* GitHub Card */}
              <Card className="group border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Github className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">💻 GitHub</h3>
                  <p className="text-sm text-muted-foreground mb-3">Check out my code</p>
                  <a
                    href="https://github.com/teddymalhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    /teddymalhan
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">💌 Quick Message</h3>
                </div>
                <p className="text-sm text-muted-foreground">Send me a message and I'll get back to you ASAP! 🚀</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">👤 Name</label>
                  <Input
                    placeholder="Your awesome name"
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">📧 Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-background/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">💭 Message</label>
                  <Textarea
                    placeholder="Tell me about your project or just say hi! 👋"
                    rows={4}
                    className="bg-background/50 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 group">
                  <span>📤 Send Message</span>
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
