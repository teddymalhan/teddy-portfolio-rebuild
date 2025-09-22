"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight } from "lucide-react"

const experiences = [
  {
    company: "Electronic Arts",
    role: "Software Engineer Intern",
    period: "May 2025 – Aug 2025",
    location: "Vancouver, BC",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5EbAYJ4fnvZp8PBJa0gDeO7uEvmlAJjurig&s",
    achievements: [
      "Engineered a ReAct AI agent leveraging Python FastAPI (LangGraph), React, and Go to streamline game configuration workflows, efficiently handling over 1.2 million linked records for FC 26 and saving more than 100 hours monthly",
      "Achieved a 100× improvement in query speed (18.2s to 157 ms for 120k records) by implementing database sharding and TTL based caching with Redis (AWS ElastiCache) for a Golang MCP Server querying GraphQL endpoints",
      "Scaled the microservice to handle 250k RPS on AWS EKS (Kubernetes), using Docker, Helm and Terraform, automating deployment using Gitlab CI/CD pipelines, scaling 3 → 17 pods with HPA under stress tests",
    ],
    technologies: ["Python", "Go", "React", "FastAPI", "LangGraph", "Redis", "AWS", "Kubernetes", "Docker"],
  },
  {
    company: "Dialpad",
    role: "Software Engineer Intern",
    period: "Jan 2025 – Apr 2025",
    location: "Vancouver, BC",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzji6wOPSF5w3pA8ATOaizQN2w-wFIs8FhKA&s",
    achievements: [
      "Delivered the Digital Scorecards for 70k+ end users and 200K RPS peak, by building WCAG compliant components using Vue.js (TypeScript), collaborating with senior engineers and QA using Jira and Git",
      "Shipped 7+ compliance-driven feature flags in Django (Python) to customize Dialpad AI for Randstad, contributing to a drop of operational overhead by 10% for 600K+ clients",
      "Collaborated in a cross-team initiative to reduce observability expenditure by 30% by migrating 20+ dashboards from Datadog to Observe, maintaining reliability of observability (o11y) pipelines on Google Cloud Platform",
    ],
    technologies: ["Vue.js", "TypeScript", "Django", "Python", "GCP", "Datadog"],
  },
  {
    company: "Develop For Good",
    role: "Software Engineer (Remote)",
    period: "Sept 2024 – Dec 2024",
    location: "California, United States",
    logoUrl: "https://media.licdn.com/dms/image/v2/C560BAQHKP2Tu00J6Cw/company-logo_200_200/company-logo_200_200/0/1678590187185/develop_for_good_logo?e=1761177600&v=beta&t=oVj3GaeMG_ito89M7-emXgyYYovqISWmhsvyNYp5QBk",
    achievements: [
      "Contributed to redesigning a full-stack website for Forgotten Felines of Sonoma County using TypeScript, React, Next.js, Tailwind CSS, and Figma, reducing load times from 3 seconds to 1 second to improve SEO",
      "Integrated with Supabase (PostgreSQL) SQL database for real-time updates and deployed on Vercel, with secure JWT based authentication, and shipped 10+ production ready features in Agile sprints",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
  },
]

export function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">Experience</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-primary/30"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const isExpanded = expandedItems.has(index)

              return (
                <div key={index} className="relative pl-12 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300">
                    <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(index)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-card/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="rounded-lg w-12 h-12 border-2 border-border">
                                <AvatarImage
                                  src={exp.logoUrl || "/placeholder.svg"}
                                  alt={`${exp.company} logo`}
                                  className="object-contain p-1"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                  {exp.company.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                                <p className="text-primary font-semibold text-lg">{exp.company}</p>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                                  <p className="text-muted-foreground font-medium">{exp.period}</p>
                                  <span className="hidden md:block text-muted-foreground">•</span>
                                  <p className="text-muted-foreground">{exp.location}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="hidden md:flex flex-wrap gap-1 max-w-xs">
                                {exp.technologies.slice(0, 4).map((tech) => (
                                  <Badge
                                    key={tech}
                                    variant="outline"
                                    className="text-xs border-primary/30 text-primary hover:bg-primary/10"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                                {exp.technologies.length > 4 && (
                                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                                    +{exp.technologies.length - 4}
                                  </Badge>
                                )}
                              </div>
                              <Button variant="ghost" size="sm">
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform" />
                                )}
                              </Button>
                            </div>
                          </div>

                          <div className="md:hidden mt-4 flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs border-primary/30 text-primary hover:bg-primary/10"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="border-t border-border/20 pt-6">
                            <ul className="space-y-3">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-muted-foreground leading-relaxed flex items-start gap-3">
                                  <span className="text-primary mt-2 text-xs">▶</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/10">
                              {exp.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
