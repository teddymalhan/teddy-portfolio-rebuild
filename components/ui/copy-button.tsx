'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "copy-button p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 hover:scale-110",
        className
      )}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <FontAwesomeIcon 
        icon={copied ? faCheck : faCopy} 
        className={cn(
          "w-4 h-4 transition-colors",
          copied ? "text-green-500" : "text-primary"
        )}
      />
    </button>
  )
}