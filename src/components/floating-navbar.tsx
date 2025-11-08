"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function FloatingNavbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-3 hidden md:block">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="cursor-pointer group">
            <div className="flex items-center gap-3 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
              <div className="bg-white/1 p-2 rounded-full border-white/5 transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                <Image 
                  src="/assets/logo.png" 
                  alt="WebMapa Antártica" 
                  width={4080}
                  height={2295}
                  className="w-10 h-6 rounded-full transition-transform duration-300"
                />
              </div>
              <div className="text-left transition-all duration-300 group-hover:translate-x-1">
                <div className="text-sm font-bold group-hover:text-white">WebMapa Antártica</div>
                <div className="text-xs text-white/70 group-hover:text-white/90">Ilha Rei George</div>
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Funcionalidades
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Sobre o Projeto
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Equipe
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Contato
            </button>
          </div>

            {/* CTA Button */}
            <Link href="/mapa">
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
              >
                Acessar Mapa
              </Button>
            </Link>
          </div>
        </div>
      </nav>
  )
}
