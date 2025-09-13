'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface IceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ice' | 'frost' | 'crystal' | 'transparent'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'default' | 'icon'
  shineVariant?: 'crystal' | 'frost' | 'none'
  children: React.ReactNode
}

export function IceButton({
  variant = 'ice',
  size = 'md',
  shineVariant = 'none',
  className,
  children,
  ...props
}: IceButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden group"
  
  const variantClasses = {
    ice: "bg-gradient-to-br from-cyan-400/80 via-blue-500/90 to-blue-600/95 hover:from-cyan-300/90 hover:via-blue-400/95 hover:to-blue-500/100 text-white border border-cyan-200/60 shadow-xl hover:shadow-cyan-400/40 backdrop-blur-sm",
    frost: "bg-gradient-to-br from-white/25 via-blue-50/30 to-white/20 hover:from-white/35 hover:via-blue-50/40 hover:to-white/30 text-slate-800 hover:text-slate-900 border border-white/50 backdrop-blur-md shadow-xl hover:shadow-blue-200/30",
    crystal: "bg-gradient-to-br from-white/15 via-cyan-50/25 to-blue-100/20 hover:from-white/25 hover:via-cyan-50/35 hover:to-blue-100/30 text-slate-700 hover:text-slate-900 border border-cyan-200/40 backdrop-blur-lg shadow-2xl hover:shadow-cyan-300/40",
    transparent: "bg-transparent hover:bg-white/15 text-slate-600 hover:text-slate-800 border-none backdrop-blur-none hover:backdrop-blur-sm transition-all duration-300"
  }
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm rounded-lg",
    md: "px-4 py-2.5 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
    xl: "px-8 py-4 text-xl rounded-xl",
    default: "px-4 py-2 text-base rounded-lg",
    icon: "p-2 rounded-lg"
  }

  const shineClasses = {
    crystal: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:skew-x-12",
    frost: "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-200/40 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500 before:skew-x-12",
    none: ""
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        shineClasses[shineVariant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
