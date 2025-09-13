'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface IceGlassContainerProps {
  variant?: 'light' | 'medium' | 'dark' | 'crystal' | 'frost'
  className?: string
  children: React.ReactNode
  glow?: boolean
  animated?: boolean
}

export function IceGlassContainer({
  variant = 'light',
  className,
  children,
  glow = false,
  animated = false
}: IceGlassContainerProps) {
  const variantClasses = {
    light: "bg-white/10 border-white/20 backdrop-blur-sm shadow-lg",
    medium: "bg-white/20 border-white/30 backdrop-blur-md shadow-xl",
    dark: "bg-white/30 border-white/40 backdrop-blur-lg shadow-2xl",
    crystal: "bg-gradient-to-br from-white/15 to-cyan-100/25 border-cyan-200/30 backdrop-blur-md shadow-xl",
    frost: "bg-gradient-to-br from-blue-50/20 to-white/30 border-blue-200/40 backdrop-blur-lg shadow-2xl"
  }

  const glowClasses = glow ? "shadow-cyan-500/20 hover:shadow-cyan-500/30" : ""
  const animatedClasses = animated ? "transition-all duration-300 hover:scale-105 hover:shadow-2xl" : "transition-all duration-200"

  return (
    <div
      className={cn(
        "border rounded-xl relative overflow-hidden",
        variantClasses[variant],
        glowClasses,
        animatedClasses,
        className
      )}
    >
      {/* Ice crystal effect overlay */}
      {variant === 'crystal' && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-cyan-100/10 pointer-events-none" />
      )}
      
      {/* Frost effect overlay */}
      {variant === 'frost' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 via-transparent to-white/10 pointer-events-none" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default IceGlassContainer
