'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Snap from 'lenis/snap'

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null)
  const snapRef = useRef<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Add Lenis to GSAP ticker for better performance
    gsap.ticker.add(update)

    // Disable GSAP lag smoothing for immediate responsiveness
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current?.lenis && !isInitialized) {
      // Initialize snap functionality after Lenis is ready
      const initializeSnap = () => {
        const lenis = lenisRef.current.lenis

        // Create snap instance with mandatory snapping
        snapRef.current = new Snap(lenis, {
          type: 'mandatory', // Force snapping to nearest point
          lerp: 0.08, // Slightly slower for more controlled snapping
          duration: 1.5, // Longer duration for smooth transitions
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })

        // Add snap points for each section
        const sections = [
          { id: 'home', offset: 0 },
          { id: 'experience', offset: -80 }, // Account for navigation height
          { id: 'contact', offset: -80 }
        ]
        
        sections.forEach(({ id, offset }) => {
          const element = document.getElementById(id)
          if (element) {
            const snapPosition = element.offsetTop + offset
            snapRef.current.add(snapPosition)
            console.log(`Added snap point for ${id} at position:`, snapPosition)
          } else {
            console.warn(`Element with id "${id}" not found`)
          }
        })

        setIsInitialized(true)
      }

      // Wait a bit for components to mount and render
      const timeoutId = setTimeout(initializeSnap, 500)
      
      return () => clearTimeout(timeoutId)
    }
  }, [lenisRef.current?.lenis, isInitialized])

  // Cleanup snap instance
  useEffect(() => {
    return () => {
      if (snapRef.current) {
        snapRef.current.destroy?.()
      }
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // Disable autoRaf since we're using GSAP ticker
        autoRaf: false,
        // Smooth scrolling configuration optimized for snapping
        lerp: 0.08, // Slightly slower for better snap control
        duration: 1.5, // Longer duration for snap transitions
        smoothWheel: true,
        // Orientation
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        // Performance settings
        syncTouch: false,
        touchInertiaExponent: 1.2, // Reduced for better snap control
        wheelMultiplier: 0.8, // Reduced sensitivity for better snapping
        touchMultiplier: 1,
        // Other options
        infinite: false,
        autoResize: true,
        overscroll: false, // Disable overscroll for better snapping
      }}
    >
      {children}
    </ReactLenis>
  )
}