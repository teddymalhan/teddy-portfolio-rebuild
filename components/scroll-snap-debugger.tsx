'use client'

import { useEffect } from 'react'
import { useLenisScroll } from '@/lib/use-lenis'

interface ScrollSnapDebuggerProps {
  enabled?: boolean
}

export function ScrollSnapDebugger({ enabled = false }: ScrollSnapDebuggerProps) {
  const { 
    goToNextSection, 
    goToPrevSection, 
    getCurrentSection, 
    isScrolling, 
    velocity, 
    progress 
  } = useLenisScroll()

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          goToNextSection()
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          goToPrevSection()
          break
        case '1':
          e.preventDefault()
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
          break
        case '2':
          e.preventDefault()
          document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
          break
        case '3':
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, goToNextSection, goToPrevSection])

  if (!enabled) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50 font-mono">
      <div className="space-y-1">
        <div>Current: {getCurrentSection()}</div>
        <div>Scrolling: {isScrolling ? 'Yes' : 'No'}</div>
        <div>Velocity: {velocity.toFixed(2)}</div>
        <div>Progress: {(progress * 100).toFixed(1)}%</div>
        <div className="border-t pt-2 mt-2 text-xs">
          <div>↑/↓: Navigate sections</div>
          <div>1/2/3: Jump to section</div>
        </div>
      </div>
    </div>
  )
}

// Export hook for easy testing in components
export function useScrollSnapControls() {
  const { goToNextSection, goToPrevSection, scrollToSection } = useLenisScroll()
  
  return {
    nextSection: goToNextSection,
    prevSection: goToPrevSection,
    goToHome: () => scrollToSection('home', 0),
    goToExperience: () => scrollToSection('experience', 80),
    goToContact: () => scrollToSection('contact', 80),
  }
}