"use client"

import { WebGLShaderBackground } from "@/components/webgl-shader-background"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <WebGLShaderBackground className="fixed inset-0 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8">
          Page not found
        </p>
        <Link href="/">
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  )
}

