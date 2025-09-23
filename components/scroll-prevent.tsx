// Utility component for preventing Lenis on specific elements
import { forwardRef } from 'react'

interface ScrollPreventProps extends React.HTMLAttributes<HTMLDivElement> {
  preventWheel?: boolean
  preventTouch?: boolean
  preventAll?: boolean
}

export const ScrollPrevent = forwardRef<HTMLDivElement, ScrollPreventProps>(
  ({ preventWheel, preventTouch, preventAll, children, ...props }, ref) => {
    const getDataAttributes = () => {
      if (preventAll) return { 'data-lenis-prevent': true }
      
      const attrs: Record<string, boolean> = {}
      if (preventWheel) attrs['data-lenis-prevent-wheel'] = true
      if (preventTouch) attrs['data-lenis-prevent-touch'] = true
      
      return attrs
    }

    return (
      <div ref={ref} {...getDataAttributes()} {...props}>
        {children}
      </div>
    )
  }
)

ScrollPrevent.displayName = 'ScrollPrevent'

// Example usage:
// <ScrollPrevent preventWheel>
//   <div>This content will prevent wheel scrolling</div>
// </ScrollPrevent>
//
// <ScrollPrevent preventAll>
//   <div>This content will prevent all Lenis scrolling</div>
// </ScrollPrevent>