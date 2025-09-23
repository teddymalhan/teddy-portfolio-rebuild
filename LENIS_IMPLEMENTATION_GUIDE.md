/*
 * Lenis Implementation Guide for v0-portfolio-rebuild
 * 
 * This file demonstrates how to use Lenis in your portfolio project.
 * All the setup has been completed automatically.
 */

// ========================================
// 1. INSTALLATION & SETUP (ALREADY DONE)
// ========================================

/*
✅ Installed lenis via pnpm
✅ Created LenisProvider component with GSAP integration
✅ Added LenisProvider to root layout
✅ Created custom hooks for easy usage
✅ Added CSS imports
*/

// ========================================
// 2. BASIC USAGE IN COMPONENTS
// ========================================

// Import the custom hook in any component:
import { useLenisScroll } from '@/lib/use-lenis'

function ExampleComponent() {
  const { scrollToSection, scrollToTop, lenis, isScrolling, velocity } = useLenisScroll()

  // Smooth scroll to a section
  const handleScrollToContact = () => {
    scrollToSection('contact', 100) // section id, offset
  }

  // Scroll to top
  const handleScrollToTop = () => {
    scrollToTop()
  }

  // Access scroll properties
  console.log('Is scrolling:', isScrolling)
  console.log('Scroll velocity:', velocity)

  return (
    <div>
      <button onClick={handleScrollToContact}>Go to Contact</button>
      <button onClick={handleScrollToTop}>Back to Top</button>
    </div>
  )
}

// ========================================
// 3. PREVENTING SCROLL ON ELEMENTS
// ========================================

// Use the ScrollPrevent component for modals, dropdowns, etc.:
import { ScrollPrevent } from '@/components/scroll-prevent'

function Modal() {
  return (
    <ScrollPrevent preventAll>
      <div className="modal">
        {/* This content won't trigger Lenis scrolling */}
        <div className="scrollable-content">
          {/* Long content here */}
        </div>
      </div>
    </ScrollPrevent>
  )
}

// Or use data attributes directly:
function Dropdown() {
  return (
    <div data-lenis-prevent-wheel>
      {/* Only wheel events are prevented here */}
    </div>
  )
}

// ========================================
// 4. SCROLL-BASED ANIMATIONS
// ========================================

// Use the scroll animation hook:
import { useScrollAnimation } from '@/lib/use-lenis'

function AnimatedComponent() {
  useScrollAnimation((lenis) => {
    // This callback runs on every scroll frame
    const progress = lenis.progress // 0 to 1
    const velocity = lenis.velocity
    
    // Trigger animations based on scroll
    if (velocity > 0.1) {
      // Fast scrolling - maybe hide header
    }
  })

  return <div>Animated content</div>
}

// ========================================
// 5. INTEGRATION WITH GSAP (ALREADY DONE)
// ========================================

/*
✅ Lenis is automatically integrated with GSAP ticker for optimal performance
✅ GSAP ScrollTrigger will work seamlessly with Lenis
✅ No additional setup required
*/

// Example GSAP animation with ScrollTrigger:
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

function GSAPAnimatedComponent() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    gsap.to('.animated-element', {
      x: 100,
      scrollTrigger: {
        trigger: '.animated-element',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, [])

  return <div className="animated-element">I animate on scroll!</div>
}

// ========================================
// 6. NAVIGATION UPDATES (ALREADY DONE)
// ========================================

/*
✅ Updated Navigation component to use Lenis instead of native scrolling
✅ Better performance and consistency
✅ Maintains all existing functionality
*/

// ========================================
// 7. CONFIGURATION OPTIONS
// ========================================

/*
Current Lenis configuration in LenisProvider:
- lerp: 0.1 (smoothing factor)
- duration: 1.2 (scroll animation duration)
- smoothWheel: true (smooth mouse wheel)
- syncTouch: false (better mobile performance)
- autoResize: true (automatic resize handling)
- GSAP integration enabled
*/

// ========================================
// 8. TROUBLESHOOTING
// ========================================

/*
Common issues and solutions:

1. "Scroll not smooth on mobile"
   - This is intentional (syncTouch: false for better performance)
   - Mobile devices have native smooth scrolling

2. "GSAP ScrollTrigger not working"
   - Make sure to call ScrollTrigger.refresh() after DOM changes
   - Lenis automatically updates ScrollTrigger on scroll

3. "Modal/dropdown scrolls the page"
   - Use ScrollPrevent component or data-lenis-prevent attributes

4. "Need to disable Lenis temporarily"
   - Access lenis instance: const { lenis } = useLenisScroll()
   - Call lenis.stop() and lenis.start()
*/

export {}