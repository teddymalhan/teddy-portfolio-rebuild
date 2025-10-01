"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleElementHover = () => {
      setIsHovering(true)
    }

    const handleElementLeave = () => {
      setIsHovering(false)
    }

    // Hide default cursor globally
    const style = document.createElement('style')
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
      /* Ensure cursor is hidden in portals, dialogs, and modals */
      [data-radix-portal], [data-radix-dialog-overlay], [data-radix-dialog-content],
      .dialog, .modal, .popover, .dropdown, .search-modal, 
      [role="dialog"], [role="modal"], [aria-modal="true"] {
        cursor: none !important;
      }
      /* Hide cursor in command palette/search */
      [cmdk-root], [cmdk-dialog], [data-cmdk-root], [data-cmdk-dialog],
      [data-slot="command"], [data-radix-collection-item] {
        cursor: none !important;
      }
      /* Specifically target command dialog and its children */
      .command-dialog *, .search-dialog *, [role="combobox"] *, 
      [data-cmdk-input], [data-cmdk-list], [data-cmdk-group] {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const elements = document.querySelectorAll(`
        a, button, input, textarea, select, 
        [role="button"], [tabindex], .cursor-pointer, 
        [data-state], [cmdk-item], [data-cmdk-item],
        [data-radix-dialog-trigger], [data-radix-dialog-close],
        .dialog button, .modal button, .search-modal button,
        [role="option"], [role="menuitem"], [role="tab"]
      `)
      elements.forEach(element => {
        element.addEventListener('mouseenter', handleElementHover)
        element.addEventListener('mouseleave', handleElementLeave)
      })
    }

    addHoverListeners()

    // Re-add listeners when DOM changes (for dynamic content like modals)
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true
        }
      })
      if (shouldUpdate) {
        setTimeout(addHoverListeners, 10) // Small delay to ensure DOM is ready
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Also observe portals which might be created outside of body
    const observePortals = () => {
      const portals = document.querySelectorAll('[data-radix-portal], [data-portal]')
      portals.forEach(portal => {
        observer.observe(portal, { childList: true, subtree: true })
      })
    }
    
    // Check for portals periodically
    const portalInterval = setInterval(observePortals, 500)

    return () => {
      // Remove the style
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      
      // Remove hover listeners
      const elements = document.querySelectorAll(`
        a, button, input, textarea, select, 
        [role="button"], [tabindex], .cursor-pointer, 
        [data-state], [cmdk-item], [data-cmdk-item],
        [data-radix-dialog-trigger], [data-radix-dialog-close],
        .dialog button, .modal button, .search-modal button,
        [role="option"], [role="menuitem"], [role="tab"]
      `)
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover)
        element.removeEventListener('mouseleave', handleElementLeave)
      })
      
      observer.disconnect()
      clearInterval(portalInterval)
    }
  }, [])

  return (
    <div className="hidden md:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none fixed z-[9999] transform-[translate(-50%,-50%)]"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: isHovering ? 1.2 : 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28
            }}
          >
            <div className="relative">
              <motion.div 
                className={`rounded-full border-2 shadow-lg transition-colors duration-200 ${
                  isHovering 
                    ? 'w-8 h-8 bg-blue-500 border-blue-600' 
                    : 'w-6 h-6 bg-white border-black'
                }`}
                animate={{
                  scale: isHovering ? 1 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  isHovering 
                    ? 'w-3 h-3 bg-white' 
                    : 'w-2 h-2 bg-black'
                }`}
                animate={{
                  scale: isHovering ? 1 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomCursor