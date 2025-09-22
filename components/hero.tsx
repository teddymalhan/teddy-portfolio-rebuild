"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <p className="text-primary text-sm md:text-base font-medium mb-4 tracking-wider uppercase">
            💻 Software Engineer & 🎓 CS Student
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">👋 Teddy Malhan</h1>
          <h2 className="text-xl md:text-2xl text-primary mb-6 font-medium">
            🏗️ Building scalable systems at EA & Dialpad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            🎓 Computer Science student at Simon Fraser University with experience building scalable systems at
            Electronic Arts and Dialpad. 🚀 Passionate about creating efficient, high-performance software solutions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />📥 Download Resume
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.open("mailto:ama367@sfu.ca")}>
            <Mail className="w-4 h-4 mr-2" />💬 Get in Touch
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => window.open("mailto:ama367@sfu.ca")}>
            <Mail className="w-4 h-4 mr-2" />📧 ama367@sfu.ca
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open("tel:672-339-2503")}>
            <Phone className="w-4 h-4 mr-2" />📱 672-339-2503
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open("https://linkedin.com/in/teddymalhan", "_blank")}
            className="hover:text-primary"
          >
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open("https://github.com/teddymalhan", "_blank")}
            className="hover:text-primary"
          >
            <Github className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
