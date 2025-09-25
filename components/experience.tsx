"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faHeart } from '@fortawesome/free-solid-svg-icons'
import { TextHighlighter } from "./fancy/text/text-highlighter"

export function Experience() {
  return (
    <div id="experience" className="min-h-screen text-foreground px-4 sm:px-8 lg:px-16 py-8 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
            i'm teddy 🧸. i live in <TextHighlighter highlightColor="var(--highlight-color)" className="[--highlight-color:hsl(30,90%,70%)] dark:[--highlight-color:hsl(30,90%,30%)]">vancouver 🏖️</TextHighlighter>, where i create software for the web 🌐 and beyond.
          </h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              as a third-year computer science student at simon fraser university, i've been passionate about 
              technology and programming since high school. what started as curiosity about how software works 
              has evolved into a love for building scalable, high-performance systems.
            </p>

            <p>
              during my internships at electronic arts and dialpad, i've worked on systems handling millions 
              of records and hundreds of thousands of requests per second. i really enjoy the challenge of 
              optimizing performance while maintaining reliability and creating great user experiences.
            </p>

            <p>
              in my free time, i build web-based projects and contribute to open source. i love the intersection 
              of problem-solving and creativity that comes with software development. if you want to build 
              something together or just want to connect, feel free to{" "}
              <a href="#contact" className="text-primary hover:text-primary/80 transition-colors">
                reach out
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          {/* Profile Image Placeholder */}
          {/* Work & Education Section */}
          <div className="bg-card/50 rounded-2xl p-4 sm:p-6 border border-border">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faBriefcase} className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">work & education</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Electronic Arts */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5EbAYJ4fnvZp8PBJa0gDeO7uEvmlAJjurig&s" 
                      alt="EA logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">electronic arts</div>
                    <div className="text-sm text-muted-foreground truncate">software engineer intern</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">may 2025 — aug 2025</div>
              </div>

              {/* Dialpad */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzji6wOPSF5w3pA8ATOaizQN2w-wFIs8FhKA&s" 
                      alt="Dialpad logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">dialpad</div>
                    <div className="text-sm text-muted-foreground truncate">software engineer intern</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">jan 2025 — apr 2025</div>
              </div>

              {/* SFU */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://praxis.encommun.io/media/notes/note_12478/sfu.jpg" 
                      alt="SFU logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">simon fraser university</div>
                    <div className="text-sm text-muted-foreground truncate">studying computer science</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">expected 2027</div>
              </div>
            </div>
          </div>

          {/* Volunteering Section */}
          <div className="bg-card/50 rounded-2xl p-4 sm:p-6 border border-border">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">volunteering</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* SFU Blueprint */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D560BAQGUjTCDhAjcFA/company-logo_200_200/company-logo_200_200/0/1690849546053/sfu_blueprint_logo?e=2147483647&v=beta&t=JFlsmyor7g50Tsl22WLuHPB8UODRlSMUKJ91Ek3vOxU"
                      alt="SFU Blueprint logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">sfu blueprint - reel youth</div>
                    <div className="text-sm text-muted-foreground truncate">software developer</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">sept 2024 — april 2025</div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                     <img 
                      src="https://media.licdn.com/dms/image/v2/C560BAQHKP2Tu00J6Cw/company-logo_200_200/company-logo_200_200/0/1678590187185/develop_for_good_logo?e=2147483647&v=beta&t=acs0ifffs2qrncn6j1ldjNP5QeNalM6WGXf69IpGVUg" 
                      alt="Develop for Good logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">develop for good</div>
                    <div className="text-sm text-muted-foreground truncate">software developer</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">sept 2024 — feb 2025</div>
              </div>

              {/* CS Peer Tutor */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img 
                      src="https://praxis.encommun.io/media/notes/note_12478/sfu.jpg" 
                      alt="SFU logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">cs peer tutor</div>
                    <div className="text-sm text-muted-foreground truncate">tutor at sfu</div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground/70 flex-shrink-0">2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
