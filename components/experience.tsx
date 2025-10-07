"use client"

import Image from "next/image"
import { Badge } from "./ui/badge"
import { ShinyButton } from "./ui/shiny-button"
import { TextHighlighter } from "./fancy/text/text-highlighter"

interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  logo: string
  logoStyle?: "circular" | "square" | "padded"
  tags?: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: "Electronic Arts",
    role: "Software Engineer Intern",
    period: "May 2025 - Aug 2025",
    location: "Vancouver, BC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5EbAYJ4fnvZp8PBJa0gDeO7uEvmlAJjurig&s",
    logoStyle: "padded",
    tags: ["🕹️ EADP Arrival"]
  },
  {
    company: "Dialpad",
    role: "Software Engineer Intern",
    period: "Jan 2025 - Apr 2025",
    location: "Vancouver, BC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzji6wOPSF5w3pA8ATOaizQN2w-wFIs8FhKA&s",
    logoStyle: "square",
    tags: ["💼 Supervisor Team"]
  },
  {
    company: "SFU Blueprint",
    role: "Software Developer",
    period: "Sept 2024 - April 2025",
    location: "Vancouver, BC",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQGUjTCDhAjcFA/company-logo_200_200/company-logo_200_200/0/1690849546053/sfu_blueprint_logo?e=2147483647&v=beta&t=JFlsmyor7g50Tsl22WLuHPB8UODRlSMUKJ91Ek3vOxU",
    logoStyle: "padded",
    tags: ["💻 Reel Youth"]
  },
  {
    company: "Develop for Good",
    role: "Software Developer",
    period: "Sept 2024 - Feb 2025",
    location: "Remote",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQHKP2Tu00J6Cw/company-logo_200_200/company-logo_200_200/0/1678590187185/develop_for_good_logo?e=2147483647&v=beta&t=acs0ifffs2qrncn6j1ldjNP5QeNalM6WGXf69IpGVUg",
    logoStyle: "padded",
    tags: ["🐈 Forgotten Felines of Sonoma County"]
  },
  {
    company: "Simon Fraser University",
    role: "Computer Science",
    period: "Expected May 2027",
    location: "Burnaby, BC",
    logo: "https://praxis.encommun.io/media/notes/note_12478/sfu.jpg",
    logoStyle: "circular",
    tags: ["📚 Education"]
  }
]

export function Experience() {
  return (
    <div id="experience" className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-center mb-12 lg:mb-20">
            Experience 🎉
        </h1>

        {/* Experience List */}
        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 border-b border-border/30 pb-16 last:border-0 last:pb-0"
            >
              {/* Left side - Date & Location */}
              <div className="space-y-0.5">
                <div className="text-foreground/90 font-medium text-[15px] tracking-tight">
                  {experience.period}
                </div>
                <div className="text-muted-foreground/80 text-[14px]">
                  {experience.location}
                </div>
              </div>

              {/* Right side - Company Details */}
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <h2 className="text-[28px] font-bold text-foreground tracking-tight leading-tight">
                      {experience.company}
                    </h2>
                    <p className="text-muted-foreground/90 text-[17px] font-normal">
                      {experience.role}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  {experience.tags && experience.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {experience.tags.map((tag: string) => (
                        <div
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-background border border-border/50 text-foreground/80 text-[13px] font-medium tracking-tight shadow-sm hover:bg-accent/50 hover:border-border transition-colors"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logo */}
                <div 
                  className={`relative w-16 h-16 flex items-center justify-center flex-shrink-0 overflow-hidden
                    ${experience.logoStyle === 'circular' 
                      ? 'rounded-full bg-white dark:bg-white border-2 border-border/20' 
                      : experience.logoStyle === 'padded'
                      ? 'rounded-2xl border-2 p-2.5'
                      : 'rounded-xl bg-background border border-border/30'
                    } shadow-sm`}
                  style={experience.logoStyle === 'padded' && experience.company === 'Electronic Arts'
                    ? { backgroundColor: 'rgb(54, 89, 241)', borderColor: 'rgb(54, 89, 241)' }
                    : experience.logoStyle === 'padded' && experience.company === 'SFU Blueprint' 
                    ? { backgroundColor: 'rgb(32, 119, 227)', borderColor: 'rgb(32, 119, 227)' } 
                    : experience.logoStyle === 'padded' && experience.company === 'Develop for Good'
                    ? { backgroundColor: 'rgb(13, 12, 68)', borderColor: 'rgb(235, 62, 105)' }
                    : experience.logoStyle === 'padded'
                    ? { backgroundColor: 'white', borderColor: 'rgba(0,0,0,0.1)' }
                    : undefined}
                >
                  <div className={`relative ${experience.logoStyle === 'padded' ? 'w-full h-full' : 'w-full h-full'}`}>
                    <Image 
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      fill
                      className={
                        experience.company === 'Electronic Arts'
                          ? 'object-cover scale-185'
                          : experience.company === 'Develop for Good'
                          ? 'object-cover scale-180'
                          : experience.logoStyle === 'circular' 
                          ? 'object-cover' 
                          : 'object-contain'
                      }
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
