'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { IceButton } from './ice-glass-button'
import { 
  Map, 
  Satellite, 
  Mountain, 
  Globe, 
  Search, 
  Download, 
  Camera,
  X
} from 'lucide-react'

interface PanelProps {
  title: string
  children: React.ReactNode
  onClose: () => void
  className?: string
}

interface LayersPanelProps extends Omit<PanelProps, 'children'> {
  currentBaseLayer: string
  onChangeBaseLayer: (layerId: string) => void
  showPhotoMarkers: boolean
  onTogglePhotoMarkers: () => void
  photoCount: number
}

interface SearchPanelProps extends Omit<PanelProps, 'children'> {
  searchTerm: string
  onSearchTermChange: (term: string) => void
  onSearch: () => void
}

interface ExportPanelProps extends Omit<PanelProps, 'children'> {
  onExport: (type: string) => void
}

interface InfoPanelProps extends Omit<PanelProps, 'children'> {
  photoCount: number
}

function GlassPanel({ title, children, onClose, className }: PanelProps) {
  return (
    <div className={cn(
      "absolute top-6 left-48 z-30 w-80",
      "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl",
      "animate-in slide-in-from-left-2 duration-300",
      className
    )}>
      {/* Glass distortion effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-cyan-100/10 rounded-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/5 via-transparent to-white/5 rounded-2xl pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {children}
      </div>
    </div>
  )
}

export function LayersPanel({ 
  title, 
  onClose, 
  currentBaseLayer, 
  onChangeBaseLayer, 
  showPhotoMarkers, 
  onTogglePhotoMarkers, 
  photoCount 
}: LayersPanelProps) {
  return (
    <GlassPanel title={title} onClose={onClose}>
      <div className="space-y-6">
        {/* Base Layers */}
        <div>
          <h4 className="text-md font-medium mb-3 text-slate-700">Camadas Base</h4>
          <div className="grid grid-cols-2 gap-2">
            <IceButton
              variant={currentBaseLayer === 'osm' ? 'ice' : 'frost'}
              size="sm"
              onClick={() => onChangeBaseLayer('osm')}
              className="justify-start gap-2"
              shineVariant="frost"
            >
              <Map className="w-4 h-4" />
              <span className="text-xs">OpenStreetMap</span>
            </IceButton>
            
            <IceButton
              variant={currentBaseLayer === 'satellite' ? 'ice' : 'frost'}
              size="sm"
              onClick={() => onChangeBaseLayer('satellite')}
              className="justify-start gap-2"
              shineVariant="frost"
            >
              <Satellite className="w-4 h-4" />
              <span className="text-xs">Satellite</span>
            </IceButton>
            
            <IceButton
              variant={currentBaseLayer === 'terrain' ? 'ice' : 'frost'}
              size="sm"
              onClick={() => onChangeBaseLayer('terrain')}
              className="justify-start gap-2"
              shineVariant="frost"
            >
              <Mountain className="w-4 h-4" />
              <span className="text-xs">Terrain</span>
            </IceButton>
            
            <IceButton
              variant={currentBaseLayer === 'cartodb' ? 'ice' : 'frost'}
              size="sm"
              onClick={() => onChangeBaseLayer('cartodb')}
              className="justify-start gap-2"
              shineVariant="frost"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">Light Theme</span>
            </IceButton>
          </div>
        </div>

        {/* Data Layers */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="text-md font-medium mb-3 text-slate-700">Camadas de Dados</h4>
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">Marcadores de Fotos</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-700 px-2 py-1 rounded-full font-medium">
                  {photoCount}
                </span>
              </div>
              <IceButton
                variant={showPhotoMarkers ? 'ice' : 'frost'}
                size="sm"
                onClick={onTogglePhotoMarkers}
                className="px-3"
              >
                {showPhotoMarkers ? 'ON' : 'OFF'}
              </IceButton>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

export function SearchPanel({ title, onClose, searchTerm, onSearchTermChange, onSearch }: SearchPanelProps) {
  return (
    <GlassPanel title={title} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            placeholder="Buscar por observador, ano, tipo..."
            className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-slate-800 placeholder-slate-500 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          />
          <IceButton
            variant="ice"
            size="icon"
            onClick={onSearch}
            shineVariant="crystal"
          >
            <Search className="w-4 h-4" />
          </IceButton>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="mb-3 text-slate-800 font-medium">Busque por:</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              <span>Nome do observador</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              <span>Ano da coleta</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              <span>Tipo de amostra</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              <span>Coordenadas</span>
            </li>
          </ul>
        </div>
      </div>
    </GlassPanel>
  )
}

export function ExportPanel({ title, onClose, onExport }: ExportPanelProps) {
  const exportOptions = [
    { type: 'png', label: 'Exportar como PNG', icon: Download },
    { type: 'pdf', label: 'Exportar como PDF', icon: Download },
    { type: 'csv', label: 'Exportar dados CSV', icon: Download }
  ]

  return (
    <GlassPanel title={title} onClose={onClose}>
      <div className="space-y-2">
        {exportOptions.map((option) => (
          <IceButton
            key={option.type}
            variant="frost"
            size="md"
            onClick={() => onExport(option.type)}
            className="w-full justify-start gap-3"
            shineVariant="frost"
          >
            <option.icon className="w-5 h-5" />
            <span>{option.label}</span>
          </IceButton>
        ))}
      </div>
    </GlassPanel>
  )
}

export function InfoPanel({ title, onClose, photoCount }: InfoPanelProps) {
  return (
    <GlassPanel title={title} onClose={onClose}>
      <div className="space-y-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-slate-800">Projeto:</span>
              <p className="text-slate-600 mt-1">Avaliação e gestão de dados geomorfológicos da Ilha Rei George, Antártica Marítima</p>
            </div>
            
            <div>
              <span className="font-semibold text-slate-800">Instituição:</span>
              <p className="text-slate-600 mt-1">Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS)</p>
            </div>
            
            <div>
              <span className="font-semibold text-slate-800">Localização:</span>
              <p className="text-slate-600 mt-1">Ilha Rei George, Arquipélago das Ilhas Shetland do Sul, Antártica</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg p-3 border border-cyan-200/30">
            <div className="text-2xl font-bold text-slate-800">{photoCount}</div>
            <div className="text-xs text-slate-600">Total de Fotos</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-lg p-3 border border-emerald-200/30">
            <div className="text-lg font-bold text-slate-800">-62.1°S</div>
            <div className="text-xs text-slate-600">Latitude Central</div>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
