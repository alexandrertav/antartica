'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { 
  Map, 
  Home, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Search, 
  Maximize, 
  Download, 
  Info,
  Camera,
  LucideIcon
} from 'lucide-react'

interface MenuButtonProps {
  icon: LucideIcon
  title: string
  onClick: () => void
  isActive?: boolean
  variant?: 'primary' | 'secondary'
}

interface StatusIndicatorProps {
  icon: LucideIcon
  value: string | number
  variant?: 'info' | 'success' | 'warning'
}

function MenuButton({ icon: Icon, title, onClick, isActive = false }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "group relative flex items-center justify-center p-2 md:p-3 rounded-xl transition-all duration-300 overflow-hidden",
        "backdrop-blur-md border shadow-lg hover:shadow-xl",
        isActive 
          ? "bg-white text-slate-900 border-white/60 shadow-white/40" 
          : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30",
        "hover:scale-105 active:scale-95"
      )}
    >
      {/* Glass distortion effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 pointer-events-none" />
      
      <Icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
    </button>
  )
}

function StatusIndicator({ icon: Icon, value, variant = 'info' }: StatusIndicatorProps) {
  const variantClasses = {
    info: "bg-white/15 text-white border-white/30",
    success: "bg-white/15 text-white border-white/30",
    warning: "bg-white/15 text-white border-white/30"
  }

  return (
    <div className={cn(
      "flex items-center justify-center p-2 rounded-lg backdrop-blur-md border shadow-lg",
      "transition-all duration-300 hover:scale-105",
      variantClasses[variant]
    )}>
      <Icon className="w-4 h-4 mr-1" />
      <span className="text-xs font-bold">{value}</span>
    </div>
  )
}

interface AntarcticaGlassMenuProps {
  onMenuClick: (action?: string, panel?: string) => void
  activePanel: string | null
  photoCount: number
  isLoading: boolean
}

export function AntarcticaGlassMenu({ onMenuClick, activePanel, photoCount, isLoading }: AntarcticaGlassMenuProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:top-24 md:bottom-auto md:left-6 md:right-auto z-40 md:max-w-none">
      {/* Main Menu Container */}
      <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 shadow-2xl rounded-2xl p-3 md:p-4">
        {/* Logo Section - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-center pb-4 border-b border-white/20 mb-4">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20">
              <Map className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex md:flex-col flex-wrap justify-center gap-2 md:space-y-0 md:gap-0 md:space-y-3 mb-0 md:mb-4">
          <MenuButton
            icon={Home}
            title="Início - King George Island"
            onClick={() => onMenuClick('home')}
          />
          
          {/* Zoom buttons - Desktop only */}
          <div className="hidden md:flex space-x-2">
            <MenuButton
              icon={ZoomIn}
              title="Aproximar"
              onClick={() => onMenuClick('zoom-in')}
            />
            <MenuButton
              icon={ZoomOut}
              title="Afastar"
              onClick={() => onMenuClick('zoom-out')}
            />
          </div>

          <MenuButton
            icon={Layers}
            title="Gerenciar Camadas"
            onClick={() => onMenuClick(undefined, 'layers')}
            isActive={activePanel === 'layers'}
          />
          
          <MenuButton
            icon={Search}
            title="Buscar Dados"
            onClick={() => onMenuClick(undefined, 'search')}
            isActive={activePanel === 'search'}
          />
          
          <MenuButton
            icon={Maximize}
            title="Tela Cheia"
            onClick={() => onMenuClick('fullscreen')}
          />
          
          <MenuButton
            icon={Download}
            title="Exportar Dados"
            onClick={() => onMenuClick(undefined, 'export')}
            isActive={activePanel === 'export'}
          />
          
          <MenuButton
            icon={Info}
            title="Informações do Projeto"
            onClick={() => onMenuClick(undefined, 'info')}
            isActive={activePanel === 'info'}
          />
        </div>

        {/* Status Section - Hidden on mobile */}
        <div className="hidden md:flex md:flex-col flex-row gap-2 md:space-y-0 pt-3 md:pt-4 border-t border-white/20">
          <StatusIndicator
            icon={Camera}
            value={photoCount}
            variant="info"
          />
          
          <div className={cn(
            "flex items-center justify-center p-2 rounded-lg backdrop-blur-md border shadow-lg",
            "transition-all duration-300 hover:scale-105",
            "bg-white/15 text-white border-white/30"
          )}>
            <div className={cn(
              "w-3 h-3 rounded-full mr-1 transition-colors duration-300",
              isLoading ? "bg-white animate-pulse" : "bg-white"
            )} />
            <span className="text-xs font-bold">{isLoading ? "..." : "OK"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
