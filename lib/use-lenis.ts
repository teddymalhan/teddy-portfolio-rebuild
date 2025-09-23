'use client'

import { useLenis } from 'lenis/react'

// Custom hook to access Lenis instance with type safety
export function useLenisScroll() {
  const lenis = useLenis((lenis) => {
    // This callback is called every scroll frame
    // You can add any scroll-based logic here
  })

  // Utility functions for smooth scrolling
  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  const scrollToSection = (id: string, offset = 0) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -offset,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  // Navigate between sections (works with snap points)
  const goToNextSection = () => {
    const sections = ['home', 'experience', 'contact']
    const currentSection = getCurrentSection()
    const currentIndex = sections.indexOf(currentSection)
    
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1], 80)
    }
  }

  const goToPrevSection = () => {
    const sections = ['home', 'experience', 'contact']
    const currentSection = getCurrentSection()
    const currentIndex = sections.indexOf(currentSection)
    
    if (currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1], 80)
    }
  }

  const getCurrentSection = () => {
    const sections = ['home', 'experience', 'contact']
    let currentSection = 'home'
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = sectionId
        }
      }
    })
    
    return currentSection
  }

  return {
    lenis,
    scrollTo,
    scrollToTop,
    scrollToSection,
    goToNextSection,
    goToPrevSection,
    getCurrentSection,
    // Expose common Lenis properties
    isScrolling: lenis?.isScrolling || false,
    direction: lenis?.direction || 0,
    velocity: lenis?.velocity || 0,
    progress: lenis?.progress || 0,
  }
}

// Hook for scroll-triggered animations
export function useScrollAnimation(callback: (lenis: any) => void, deps: any[] = []) {
  useLenis(callback, deps)
}