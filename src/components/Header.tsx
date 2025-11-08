'use client'

import Link from 'next/link'
import { Map, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* Mobile: Back Button Only */}
      <Link href="/" className="md:hidden fixed top-4 left-4">
        <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors bg-white/5 backdrop-blur-sm border border-white/10">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </Link>

      {/* Desktop: Full Header */}
      <div className="hidden md:block px-4 py-4">
        <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="cursor-pointer">
              <div className="flex items-center gap-3 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                  <Map className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">WebMapa Antártica</div>
                  <div className="text-xs text-white/70">Ilha Rei George</div>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-open-sans-custom text-gray-300 hover:text-white hover:bg-white/10 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Início
                </Button>
              </Link>
              <Link href="/mapa">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Mapa Interativo
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
