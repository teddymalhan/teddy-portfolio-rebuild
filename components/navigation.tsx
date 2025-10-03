"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, Home, Hammer, Briefcase, Mail, FileText, Github, Linkedin } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"

const navItems = [
  { name: "🏠 home", href: "#home", emoji: "" },
  { name: "💼 my experience", href: "#experience", emoji: "" },
  { name: "🛠️ projects", href: "#projects", emoji: "" },
  { name: "📬 get in touch!", href: "#contact", emoji: "" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isAtHero, setIsAtHero] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 })
  const [commandOpen, setCommandOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const conductorRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Handle navigation visibility for mobile only
      const isMobile = window.innerWidth < 768 // md breakpoint
      if (isMobile) {
        if (scrollPosition < 100) {
          // Always show when at top
          setIsVisible(true)
        } else if (scrollPosition > lastScrollY) {
          // Scrolling down - hide navigation
          setIsVisible(false)
        } else if (lastScrollY - scrollPosition > 5) {
          // Scrolling up - show navigation (with small threshold to avoid jitter)
          setIsVisible(true)
        }
      } else {
        // Always visible on desktop
        setIsVisible(true)
      }
      
      setLastScrollY(scrollPosition)
      
      // Check if we're at the hero section (top of the page)
      if (scrollPosition < windowHeight / 2) {
        setIsAtHero(true)
        setActiveSection("home")
        return
      } else {
        setIsAtHero(false)
      }

      // Check which section we're currently in
      let currentSection = ""
      for (const item of navItems) {
        const sectionId = item.href.slice(1)
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollPosition
          const elementHeight = rect.height
          const navOffset = 100 // Offset for navigation bar
          
          // Check if the section is currently in the viewport
          if (scrollPosition + navOffset >= elementTop && 
              scrollPosition + navOffset < elementTop + elementHeight) {
            currentSection = sectionId
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll) // Re-check on resize
    handleScroll() // Check initial position
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [lastScrollY])

  useEffect(() => {
    const updateCanvasDimensions = () => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial dimensions
    updateCanvasDimensions()

    // Update on resize
    window.addEventListener('resize', updateCanvasDimensions)
    window.addEventListener('orientationchange', updateCanvasDimensions)
    
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions)
      window.removeEventListener('orientationchange', updateCanvasDimensions)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const sectionId = href.slice(1)
    const element = document.getElementById(sectionId)
    if (element) {
      // Show navigation temporarily for smooth UX
      setIsVisible(true)
      
      // Add offset for desktop to account for fixed navigation bar
      const isMobile = window.innerWidth < 768 // md breakpoint
      const navBarHeight = 80 // Approximate height of the navigation bar
      const additionalOffset = 20 // Extra pixels for breathing room
      const offset = isMobile ? 0 : navBarHeight + additionalOffset
      
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const triggerConfetti = () => {
    if (conductorRef.current) {
      conductorRef.current.run({ speed: 3, duration: 1000 })
    }
  }

  const handleConfettiInit = ({ conductor }: { conductor: any }) => {
    conductorRef.current = conductor
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setCommandOpen(false)
    command()
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden md:block fixed top-4 left-4 right-4 z-50"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-card/90 via-card/80 to-card/90 backdrop-blur-xl rounded-full border border-border/50 px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-6">
              <button 
                onClick={triggerConfetti}
                className="text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer"
                aria-label="Trigger confetti"
              >
                🧸
              </button>

              <div className="flex space-x-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      activeSection === item.href.slice(1) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right side - Search Bar and Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-3 px-4 py-2 text-sm bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-muted-foreground min-w-[240px]"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">Search website...</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                  <span className="text-xs">⌘</span>
                  <span className="text-xs">K</span>
                </div>
              </button>
              
              <AnimatedThemeToggler className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center" />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav 
        className="md:hidden fixed top-4 left-4 right-4 z-50"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-card/90 via-card/80 to-card/90 backdrop-blur-xl rounded-full border border-border/50 px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            <button 
              onClick={triggerConfetti}
              className="text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              aria-label="Trigger confetti"
            >
              🧸
            </button>
            
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-foreground hover:text-primary hover:bg-accent/20 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-gradient-to-br from-background/95 via-background/90 to-card/95 backdrop-blur-xl"
            style={{ paddingTop: '100px' }} // Account for pill nav bar height
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6 px-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-4 text-xl font-medium text-foreground hover:text-primary transition-colors py-4 px-6 rounded-2xl hover:bg-accent/10 w-full max-w-xs justify-center"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Command Dialog */}
      <CommandDialog 
        open={commandOpen} 
        onOpenChange={setCommandOpen}
        title="Search Portfolio"
        description="Quickly navigate to any section or find what you're looking for"
      >
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => scrollToSection("#home"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => scrollToSection("#projects"))}>
              <Hammer className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => scrollToSection("#experience"))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>My Experience</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => scrollToSection("#contact"))}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Get in Touch</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => {
              const link = document.createElement('a')
              link.href = '/Teddy_Malhan_Resume.pdf'
              link.download = 'Teddy_Malhan_Resume.pdf'
              link.click()
            })}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Download Resume</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              window.open("https://github.com/teddymalhan", "_blank")
            })}>
              <Github className="mr-2 h-4 w-4" />
              <span>View GitHub Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              window.open("https://linkedin.com/in/teddymalhan", "_blank")
            })}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Connect on LinkedIn</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects">
            <CommandItem onSelect={() => runCommand(() => scrollToSection("#projects"))}>
              <Hammer className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              window.open("https://github.com/teddymalhan", "_blank")
            })}>
              <Github className="mr-2 h-4 w-4" />
              <span>Explore More on GitHub</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Fun">
            <CommandItem onSelect={() => runCommand(() => triggerConfetti())}>
              <span className="mr-2">🎉</span>
              <span>Trigger Confetti</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Confetti Component */}
      <Fireworks 
        onInit={handleConfettiInit}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      />
    </>
  )
}
