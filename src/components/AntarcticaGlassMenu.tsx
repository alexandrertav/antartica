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

function MenuButton({ icon: Icon, title, onClick, isActive = false, variant = 'primary' }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 overflow-hidden",
        "backdrop-blur-md border shadow-lg hover:shadow-xl",
        isActive 
          ? "bg-gradient-to-br from-cyan-400/90 via-blue-500/95 to-blue-600/100 text-white border-cyan-200/60 shadow-cyan-400/40" 
          : "bg-white/15 hover:bg-white/25 text-slate-700 hover:text-slate-900 border-white/30 hover:border-white/40",
        "hover:scale-105 active:scale-95"
      )}
    >
      {/* Glass distortion effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 pointer-events-none" />
      
      <Icon className="w-5 h-5 relative z-10" />
    </button>
  )
}

function StatusIndicator({ icon: Icon, value, variant = 'info' }: StatusIndicatorProps) {
  const variantClasses = {
    info: "bg-gradient-to-br from-blue-400/80 to-cyan-500/90 text-white border-blue-200/60",
    success: "bg-gradient-to-br from-emerald-400/80 to-green-500/90 text-white border-emerald-200/60",
    warning: "bg-gradient-to-br from-amber-400/80 to-orange-500/90 text-white border-amber-200/60"
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
    <div className="absolute top-6 left-6 z-40">
      {/* Main Menu Container */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center pb-4 border-b border-white/20 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/50 to-blue-600/50 rounded-full blur-sm" />
            <div className="relative bg-gradient-to-br from-cyan-400/90 to-blue-600/100 p-2 rounded-full">
              <Map className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-3 mb-4">
          <MenuButton
            icon={Home}
            title="Início - King George Island"
            onClick={() => onMenuClick('home')}
          />
          
          <div className="flex space-x-2">
            <MenuButton
              icon={ZoomIn}
              title="Aproximar"
              onClick={() => onMenuClick('zoom-in')}
              variant="secondary"
            />
            <MenuButton
              icon={ZoomOut}
              title="Afastar"
              onClick={() => onMenuClick('zoom-out')}
              variant="secondary"
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

        {/* Status Section */}
        <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
          <StatusIndicator
            icon={Camera}
            value={photoCount}
            variant="info"
          />
          
          <div className={cn(
            "flex items-center justify-center p-2 rounded-lg backdrop-blur-md border shadow-lg",
            "transition-all duration-300 hover:scale-105",
            isLoading 
              ? "bg-gradient-to-br from-amber-400/80 to-orange-500/90 text-white border-amber-200/60"
              : "bg-gradient-to-br from-emerald-400/80 to-green-500/90 text-white border-emerald-200/60"
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
