'use client'

import { useState } from 'react'
import { Map, Menu, X, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { IceButton } from './ice-glass-button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Enhanced Logo with Glass Effect */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/50 to-blue-600/50 rounded-xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-cyan-400/90 to-blue-600/100 p-2 rounded-xl shadow-lg">
                  <Map className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">WebMapa Antártica</h1>
                <p className="text-sm text-slate-600 font-medium">Ilha Rei George</p>
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/30 to-blue-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <IceButton 
                  variant="crystal" 
                  size="default"
                  className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold transition-all duration-300"
                >
                  Início
                </IceButton>
              </div>
            </Link>
            <Link href="/mapa">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/30 to-blue-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <IceButton 
                  variant="crystal" 
                  size="default"
                  className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold transition-all duration-300"
                >
                  Mapa Interativo
                </IceButton>
              </div>
            </Link>
            <Link href="/#sobre">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/30 to-blue-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <IceButton 
                  variant="crystal" 
                  size="default"
                  className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold transition-all duration-300"
                >
                  Sobre o Projeto
                </IceButton>
              </div>
            </Link>
            <Link href="/#dados">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/30 to-blue-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <IceButton 
                  variant="crystal" 
                  size="default"
                  className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold transition-all duration-300"
                >
                  Dados
                </IceButton>
              </div>
            </Link>
            <Link href="/#contato">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/30 to-blue-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <IceButton 
                  variant="crystal" 
                  size="default"
                  className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold transition-all duration-300"
                >
                  Contato
                </IceButton>
              </div>
            </Link>
          </nav>

          {/* Enhanced Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/alexandrertav/antartica"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-300/30 to-slate-400/40 rounded-lg blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                <IceButton 
                  variant="frost" 
                  size="default"
                  className="relative bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white/30 text-slate-700 hover:text-slate-900 font-medium transition-all duration-300 gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </IceButton>
              </div>
            </a>
            <Link href="/mapa">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <IceButton 
                  variant="ice" 
                  size="lg"
                  shineVariant="crystal"
                  className="relative bg-gradient-to-br from-cyan-400/90 via-blue-500/95 to-blue-600/100 backdrop-blur-xl border-2 border-cyan-200/60 shadow-xl hover:shadow-cyan-400/50 text-white font-bold gap-2"
                >
                  <span>Acessar Mapa</span>
                  <ExternalLink className="w-4 h-4" />
                </IceButton>
              </div>
            </Link>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-cyan-200/40 rounded-lg blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              <IceButton
                variant="crystal"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white/30 text-slate-700 hover:text-slate-900 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </IceButton>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-white/5 backdrop-blur-sm mt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <IceButton variant="crystal" size="sm" className="w-full justify-start bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold">
                  Início
                </IceButton>
              </Link>
              <Link href="/mapa" onClick={() => setIsMenuOpen(false)}>
                <IceButton variant="crystal" size="sm" className="w-full justify-start bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold">
                  Mapa Interativo
                </IceButton>
              </Link>
              <Link href="/#sobre" onClick={() => setIsMenuOpen(false)}>
                <IceButton variant="crystal" size="sm" className="w-full justify-start bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold">
                  Sobre o Projeto
                </IceButton>
              </Link>
              <Link href="/#dados" onClick={() => setIsMenuOpen(false)}>
                <IceButton variant="crystal" size="sm" className="w-full justify-start bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold">
                  Dados
                </IceButton>
              </Link>
              <Link href="/#contato" onClick={() => setIsMenuOpen(false)}>
                <IceButton variant="crystal" size="sm" className="w-full justify-start bg-gradient-to-br from-cyan-400/20 to-blue-500/30 backdrop-blur-md border border-cyan-200/40 hover:from-cyan-400/30 hover:to-blue-500/40 text-slate-800 hover:text-slate-900 font-semibold">
                  Contato
                </IceButton>
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <a
                  href="https://github.com/alexandrertav/antartica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IceButton variant="frost" size="sm" className="w-full justify-start bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white/30 text-slate-700 hover:text-slate-900 font-medium gap-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </IceButton>
                </a>
                <Link href="/mapa" onClick={() => setIsMenuOpen(false)}>
                  <IceButton variant="ice" size="lg" className="w-full justify-center bg-gradient-to-br from-cyan-400/90 via-blue-500/95 to-blue-600/100 backdrop-blur-xl border-2 border-cyan-200/60 shadow-xl text-white font-bold gap-2">
                    <span>Acessar Mapa</span>
                    <ExternalLink className="w-4 h-4" />
                  </IceButton>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
