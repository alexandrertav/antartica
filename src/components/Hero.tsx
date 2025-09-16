'use client'

import { ArrowRight, MapPin, Camera, Database, Users } from 'lucide-react'
import Link from 'next/link'
import { IceButton } from './ice-glass-button'
import { IceGlassContainer } from '@/components/ice-glass-container'

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32" style={{ background: 'linear-gradient(120deg,rgba(0, 191, 255, 1) 0%, rgba(211, 236, 240, 1) 35%, rgba(0, 191, 255, 1) 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Enhanced Badge with Glass Effect */}
          <div className="inline-flex items-center px-6 py-3 rounded-full mb-12 relative group">
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/30 via-blue-100/20 to-cyan-100/30 rounded-full"></div>
            
            {/* Content */}
            <div className="relative flex items-center text-slate-800 font-semibold text-sm">
              <div className="p-1.5 bg-gradient-to-br from-cyan-400/80 to-blue-500/90 rounded-full mr-3 shadow-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              Projeto de Pesquisa IFRS - Antártica Marítima
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-16">
            Mapa Interativo da
            <span className="block text-blue-600">Ilha Rei George</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-20 max-w-3xl mx-auto">
            Explore dados geomorfológicos coletados na Antártica através de um mapa interativo 
            com fotografias georreferenciadas e metadados científicos.
          </p>

          {/* Enhanced CTA Buttons with Glass Effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <Link href="/mapa">
              <div className="group relative">
                {/* Glow effect background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <IceButton 
                  variant="ice" 
                  size="xl" 
                  shineVariant="crystal"
                  className="relative bg-gradient-to-br from-cyan-400/90 via-blue-500/95 to-blue-600/100 backdrop-blur-xl border-2 border-cyan-200/60 shadow-2xl hover:shadow-cyan-400/50 text-white font-bold px-8 py-4 text-lg"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  <span>Explorar Mapa Interativo</span>
                </IceButton>
              </div>
            </Link>
            <a href="#sobre">
              <div className="group relative">
                {/* Subtle glow for secondary button */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/40 via-cyan-200/50 to-blue-300/40 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <IceButton 
                  variant="frost" 
                  size="xl"
                  shineVariant="frost"
                  className="relative bg-white/20 backdrop-blur-xl border-2 border-white/40 shadow-xl hover:shadow-blue-200/40 text-slate-800 hover:text-slate-900 font-semibold px-8 py-4 text-lg hover:bg-white/30"
                >
                  <span>Saiba Mais</span>
                </IceButton>
              </div>
            </a>
          </div>

          {/* Enhanced Stats with Glass Effects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/30 to-cyan-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <IceGlassContainer variant="crystal" className="relative p-6 rounded-xl text-center bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-xl hover:shadow-blue-200/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400/80 to-cyan-500/90 rounded-xl mx-auto mb-4 shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">Interativo</div>
                <div className="text-sm text-slate-700 font-medium">Mapa Web Geoespacial</div>
              </IceGlassContainer>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/30 to-green-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <IceGlassContainer variant="crystal" className="relative p-6 rounded-xl text-center bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-xl hover:shadow-emerald-200/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400/80 to-green-500/90 rounded-xl mx-auto mb-4 shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">2000+</div>
                <div className="text-sm text-slate-700 font-medium">Fotos Georreferenciadas</div>
              </IceGlassContainer>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-400/30 to-violet-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <IceGlassContainer variant="crystal" className="relative p-6 rounded-xl text-center bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-xl hover:shadow-purple-200/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400/80 to-violet-500/90 rounded-xl mx-auto mb-4 shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">Dados</div>
                <div className="text-sm text-slate-700 font-medium">Múltiplas Camadas de Dados</div>
              </IceGlassContainer>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-400/30 to-amber-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <IceGlassContainer variant="crystal" className="relative p-6 rounded-xl text-center bg-white/15 backdrop-blur-xl border-2 border-white/30 shadow-xl hover:shadow-orange-200/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400/80 to-amber-500/90 rounded-xl mx-auto mb-4 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">OpenSource</div>
                <div className="text-sm text-slate-700 font-medium">Ciencia e Codigo Aberto</div>
              </IceGlassContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Antarctic Ice Decorative Elements */}
      
      {/* Floating Ice Crystals - More Visible */}
      <div className="absolute top-20 left-16 w-16 h-16 opacity-40 animate-spin" style={{ animationDuration: '25s' }}>
        <div className="w-full h-full bg-gradient-to-br from-white/60 to-cyan-300/70 transform rotate-45 rounded-xl shadow-2xl backdrop-blur-sm border border-white/30"></div>
      </div>
      
      <div className="absolute top-40 right-24 w-12 h-12 opacity-50 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }}>
        <div className="w-full h-full bg-gradient-to-br from-cyan-200/80 to-blue-400/60 transform rotate-45 rounded-lg shadow-xl backdrop-blur-sm border border-cyan-200/40"></div>
      </div>
      
      {/* Elegant Ice Particles */}
      <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-white/70 rounded-full opacity-60 animate-pulse shadow-lg" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-200/80 rounded-full opacity-70 animate-pulse shadow-md" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-200/70 rounded-full opacity-60 animate-pulse shadow-lg" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      
      {/* Refined Icebergs */}
      <div className="absolute bottom-32 right-20 opacity-30 animate-pulse" style={{ animationDuration: '10s' }}>
        <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent" style={{ borderBottomColor: 'rgba(165, 243, 252, 0.6)' }}></div>
        <div className="w-10 h-5 bg-gradient-to-t from-cyan-200/60 to-white/50 -mt-1 mx-auto rounded-b-xl shadow-lg"></div>
      </div>
      
      <div className="absolute top-1/2 left-12 opacity-25 animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}>
        <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[30px] border-l-transparent border-r-transparent" style={{ borderBottomColor: 'rgba(186, 230, 253, 0.5)' }}></div>
        <div className="w-8 h-4 bg-gradient-to-t from-blue-200/50 to-white/40 -mt-1 mx-auto rounded-b-lg shadow-md"></div>
      </div>
      
      {/* Sophisticated Snow Flakes */}
      <div className="absolute top-24 right-1/3 opacity-50 animate-bounce" style={{ animationDuration: '8s' }}>
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 bg-white/80 rounded-full shadow-lg"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/90 transform -translate-y-1/2 shadow-sm"></div>
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/90 transform -translate-x-1/2 shadow-sm"></div>
          <div className="absolute inset-0 bg-white/70 transform rotate-45 rounded-full scale-75 shadow-md"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/4 opacity-40 animate-bounce" style={{ animationDuration: '9s', animationDelay: '1s' }}>
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-cyan-100/90 rounded-full shadow-md"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-200/90 transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-cyan-200/90 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      {/* Elegant Ice Shards */}
      <div className="absolute top-3/4 right-1/5 w-8 h-1.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 animate-pulse shadow-sm" style={{ animationDuration: '14s' }}></div>
      <div className="absolute top-1/5 left-2/3 w-6 h-1 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-50 animate-pulse shadow-sm" style={{ animationDuration: '11s', animationDelay: '2s' }}></div>
      
      {/* Additional Floating Elements */}
      <div className="absolute bottom-1/2 right-1/6 w-10 h-10 opacity-35 animate-spin" style={{ animationDuration: '30s' }}>
        <div className="w-full h-full bg-gradient-to-br from-white/50 to-blue-300/60 rounded-full shadow-xl backdrop-blur-sm border border-white/25"></div>
      </div>
    </section>
  )
}
