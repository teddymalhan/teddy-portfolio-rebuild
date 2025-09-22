"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "💪 HelpGetMeFit!",
    period: "📅 Sept 2025",
    description:
      "🏗️ Built microservices with Saga, Outbox, CQRS, BFF, and Strategy design patterns, enabling cross-service consistency. ⚡ Sustained 8.5k RPS / 55k msgs/min using RabbitMQ quorum queues, idempotency keys, and Reactive WebClient with backpressure (p99 260 ms).",
    achievements: [
      "🚀 Achieved 12 min MTTR by establishing a robust test pyramid (JUnit5, Mockito, Spring Cloud Contract, Testcontainers, k6) and automated CI/CD with blue/green rollouts.",
    ],
    technologies: ["Spring Boot", "Java", "React", "RabbitMQ", "MongoDB", "Maven", "JUnit5", "Mockito"],
    github: "#",
    demo: "#",
  },
  {
    title: "♻️ WasteWise",
    period: "📅 Oct 2024",
    description:
      "🧠 Architected a FAISS & NLP based waste sorting system powered by RAG, OpenAI Embeddings and pgvector, parsing 20k+ mappings of food items to bins.",
    achievements: [
      "✅ Achieved 100% test coverage through pytest, applying Test-Driven Development (TDD) for a robust design.",
    ],
    technologies: ["React", "Python", "FAISS", "pytest", "k6", "OpenAI", "pgvector"],
    github: "#",
    demo: "#",
  },
  {
    title: "💰 GradGains",
    period: "📅 2024",
    description:
      "🏆 Google DSC Hackathon Winner: Awarded best project for GradGains, a financial social media platform designed to help students manage their finances and connect with peers.",
    achievements: [
      "🥇 Won first place at Google Developer Student Club Hackathon",
      "💻 Built comprehensive financial tracking and social features",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    github: "#",
    demo: "#",
  },
  {
    title: "🧠 ChaosLearn",
    period: "📅 2025",
    description:
      "🏔️ Mountain Madness 2025 Winner: Awarded runner-up for ChaosLearn, an AI powered learning assistant that adapts to individual learning styles and provides personalized educational content.",
    achievements: ["🥈 Runner-up at Mountain Madness 2025 hackathon", "🤖 Implemented adaptive learning algorithms"],
    technologies: ["Python", "FastAPI", "React", "OpenAI", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">🚀 Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="border-border bg-card/50 hover:bg-card/70 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{project.period}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => window.open(project.github, "_blank")}>
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => window.open(project.demo, "_blank")}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                {project.achievements.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground text-sm leading-relaxed">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
