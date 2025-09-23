"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"

const navItems = [
  { name: "🏠 home", href: "#home", emoji: "" },
  { name: "💼 my experience", href: "#experience", emoji: "" },
  { name: "📬 get in touch!", href: "#contact", emoji: "" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isAtHero, setIsAtHero] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 })
  const conductorRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
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
    handleScroll() // Check initial position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      const navHeight = 80 // Account for fixed navigation height
      const elementPosition = element.offsetTop - navHeight
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

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
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

            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50">
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
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-foreground hover:text-primary hover:bg-accent/20 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

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
