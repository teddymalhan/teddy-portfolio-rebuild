"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Github, ExternalLink, Trophy, Award } from "lucide-react"
import { cn } from "@/lib/utils"

// Function to get pill styling for technologies with catchy gradients
const getTechPillStyle = (tech: string, index: number) => {
  const styles = [
    {
      className: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-blue-600 hover:to-blue-800 transform transition-all duration-300",
    },
    {
      className: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-emerald-600 hover:to-green-800 transform transition-all duration-300",
    },
    {
      className: "bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-purple-600 hover:to-indigo-800 transform transition-all duration-300",
    },
    {
      className: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-orange-600 hover:to-pink-700 transform transition-all duration-300",
    },
    {
      className: "bg-gradient-to-r from-pink-500 via-rose-500 to-red-600 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-pink-600 hover:to-red-700 transform transition-all duration-300",
    },
    {
      className: "bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 text-white font-bold border-0 shadow-lg",
      hoverClass: "hover:scale-110 hover:shadow-2xl hover:from-cyan-600 hover:to-blue-700 transform transition-all duration-300",
    },
  ];
  
  return styles[index % styles.length];
};

const projects = [
  {
    title: "HelpGetMeFit!",
    period: "Sept 2025",
    description: (
      <>
        Built <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold">microservices</span> with{" "}
        <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">CQRS</span>, Saga, Outbox, BFF, and Strategy design patterns, enabling cross-service consistency. Sustained{" "}
        <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">8.5k RPS / 55k msgs/min</span> using{" "}
        <span className="bg-orange-600 text-white px-2 py-1 rounded font-bold">RabbitMQ</span> quorum queues, idempotency keys, and Reactive WebClient with backpressure{" "}
        <span className="bg-emerald-600 text-white px-2 py-1 rounded font-bold">(p99 260 ms)</span>.
      </>
    ),
    achievements: [
      "Achieved 12 min MTTR by establishing a robust test pyramid (JUnit5, Mockito, Spring Cloud Contract, Testcontainers, k6) and automated CI/CD with blue/green rollouts.",
    ],
    technologies: ["Spring Boot", "Java", "React", "RabbitMQ", "MongoDB", "Maven", "JUnit5", "Mockito"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "WasteWise",
    period: "Oct 2024",
    description: (
      <>
        Architected a <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">FAISS</span> &{" "}
        <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold">NLP</span> based waste sorting system powered by{" "}
        <span className="bg-emerald-600 text-white px-2 py-1 rounded font-bold">RAG</span>,{" "}
        <span className="bg-orange-600 text-white px-2 py-1 rounded font-bold">OpenAI Embeddings</span> and pgvector, parsing{" "}
        <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">20k+ mappings</span> of food items to bins.
      </>
    ),
    achievements: [
      "Achieved 100% test coverage through pytest, applying Test-Driven Development (TDD) for a robust design.",
    ],
    technologies: ["React", "Python", "FAISS", "pytest", "k6", "OpenAI", "pgvector"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "GradGains",
    period: "2024",
    description: (
      <>
        <span className="bg-red-600 text-white px-2 py-1 rounded font-bold">Google DSC Hackathon Winner</span>: Awarded{" "}
        <span className="bg-yellow-600 text-white px-2 py-1 rounded font-bold">best project</span> for GradGains, a financial social media platform designed to help students manage their finances and connect with peers.
      </>
    ),
    achievements: [
      "Won first place at Google Developer Student Club Hackathon",
      "Built comprehensive financial tracking and social features",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    github: "#",
    demo: "#",
    award: "1st Place",
    featured: true,
  },
  {
    title: "CommitWise",
    period: "2024",
    description: (
      <>
        A smart <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold">Git commit assistant</span> that analyzes code changes and generates meaningful,{" "}
        <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">conventional commit messages</span> using{" "}
        <span className="bg-emerald-600 text-white px-2 py-1 rounded font-bold">AI</span>. Helps developers maintain consistent and descriptive commit histories.
      </>
    ),
    achievements: [
      "Automated commit message generation with AI analysis",
      "Follows conventional commit standards for better project organization",
    ],
    technologies: ["TypeScript", "Node.js", "OpenAI", "Git"],
    github: "#",
    demo: "#",
    featured: true,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent mb-6 animate-pulse">
            ✨ Featured Projects ✨
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            A collection of <span className="text-emerald-600 font-bold">award-winning</span> projects showcasing my 
            <span className="text-purple-600 font-bold"> technical excellence</span> and 
            <span className="text-blue-600 font-bold">problem-solving mastery</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 border-gray-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-blue-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {project.title}
                      </CardTitle>
                      {project.award && (
                        <Badge className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-bold shadow-lg animate-pulse border-0">
                          <Trophy className="w-3 h-3 mr-1 animate-bounce" />
                          {project.award}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="font-semibold text-blue-600">
                      📅 {project.period}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="bg-gradient-to-r from-gray-800 to-black text-white hover:from-gray-700 hover:to-gray-900 transform hover:scale-110 transition-all duration-300 shadow-lg" 
                      size="sm" 
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300 shadow-lg" 
                      size="sm" 
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-gray-700 leading-relaxed font-medium text-base">
                  {project.description}
                </div>

                {project.achievements.length > 0 && (
                  <>
                    <Separator className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 h-1" />
                    <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-emerald-500 shadow-md">
                      <h4 className="text-base font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-500 animate-pulse" />
                        🏆 Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-700 text-sm leading-relaxed flex items-start gap-3 font-medium">
                            <span className="text-emerald-500 font-bold mt-1 text-lg">✦</span>
                            <span className="text-gray-700">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter>
                {/* Technology Pills Container */}
                <div className="flex w-full flex-wrap justify-start rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-4 shadow-lg">
                  <div className="w-full mb-2">
                    <span className="text-xs font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent uppercase tracking-wide">
                      🛠️ Tech Stack
                    </span>
                  </div>
                  {project.technologies.map((tech, techIndex) => {
                    const pillStyle = getTechPillStyle(tech, techIndex);
                    return (
                      <div
                        key={tech}
                        className={cn(
                          "m-1 cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ease-in-out",
                          pillStyle.className,
                          pillStyle.hoverClass,
                        )}
                      >
                        {tech}
                      </div>
                    );
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
