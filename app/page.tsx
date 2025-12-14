"use client"

import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { MailIcon, Camera, Users, Code, TrendingUp, Check } from "lucide-react"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { SplittingText } from "@/components/text/splitting-text"
import { CardEquipe } from "@/components/ui/card-equipe"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      if (currentSection === 2 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop === 0
        const isAtBottom = pricingSection.scrollTop + pricingSection.clientHeight >= pricingSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 1 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 3 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 2 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 4 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 4 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 4)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }

        scrollContainer.scrollTo({
          left: targetSection * containerWidth,
          behavior: "smooth",
        })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      {/* Logo IFRS - Canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-50 opacity-40 hover:opacity-70 transition-opacity duration-300">
        <Image 
          src="/assets/logo-ifrs.png" 
          alt="IFRS" 
          width={80} 
          height={80}
          className="drop-shadow-lg"
        />
      </div>

      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center px-0 leading-5">
              <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl font-open-sans-custom">
                <SplittingText text="Mapa Interativo Da Ilha Rei George" type="words" />
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide leading-7 text-xl">
              Explore dados geomorfológicos coletados na Antártica através de um mapa interativo com  <span className="font-serif italic">fotografias</span> georreferenciadas e metadados científicos.{" "}
              </p>

              <div className="flex justify-center">
                <Link href="/mapa">
                  <ShinyButton className="px-8 py-3 text-base">Acesse o Mapa</ShinyButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-8 md:py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Card Principal - Open Source & Ciência Aberta */}
              <div className="md:col-span-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-white/20 to-white/10 p-4 rounded-xl shadow-lg">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                        Open Source & Ciência Aberta
                      </h3>
                      <p className="text-base text-white/80 font-open-sans-custom mb-4">
                        Democratizando o acesso aos dados científicos da Antártica
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    "Código-fonte aberto e disponível no GitHub",
                    "Dados científicos de acesso gratuito e irrestrito",
                    "Plataforma web sem necessidade de cadastro",
                    "Exportação livre de dados em múltiplos formatos",
                    "Colaboração transparente entre instituições",
                    "Contribuição para o avanço da ciência aberta",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-gray-200 font-open-sans-custom">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Dados */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 p-3 rounded-xl">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-open-sans-custom">Dados Coletados</h3>
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-white font-open-sans-custom mb-1">2000+</p>
                  <p className="text-sm text-white/70 font-open-sans-custom">fotografias georreferenciadas</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Coordenadas GPS de alta precisão",
                    "Metadados científicos detalhados",
                    "Base cartográfica vetorizada no QGIS",
                    "Acesso gratuito para pesquisadores",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200 font-open-sans-custom text-sm">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Colaboração */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-open-sans-custom">Colaboração</h3>
                </div>
                <p className="text-sm text-white/70 font-open-sans-custom mb-4">Multi-institucional</p>
                <ul className="space-y-3">
                  {[
                    "IFRS - Instituto Federal do RS",
                    "UFRGS - Centro Polar e Climático",
                    "Pesquisadores internacionais",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200 font-open-sans-custom text-sm">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Tecnologia */}
              <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-white/20 to-white/10 p-3 rounded-xl">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-open-sans-custom">Tecnologia</h3>
                </div>
                <p className="text-sm text-white/70 font-open-sans-custom mb-4">Open Source</p>
                <ul className="space-y-3">
                  {[
                    "Plataforma web gratuita",
                    "Código aberto no GitHub",
                    "Exportação em CSV/PNG/PDF",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200 font-open-sans-custom text-sm">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Impacto - Full Width */}
            <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 shadow-xl mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-white/20 to-white/10 p-4 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                    Impacto Científico
                  </h3>
                  <p className="text-sm text-white/70 font-open-sans-custom">Contribuição para a ciência antártica</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Democratização do acesso aos dados científicos",
                  "Suporte a pesquisas sobre mudanças climáticas",
                  "Contribuição para estudos paleoglaciológicos",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm text-gray-200 font-open-sans-custom">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo IFRS */}
            <div className="flex justify-center opacity-40">
              <Image 
                src="/assets/logo-ifrs.png" 
                alt="IFRS" 
                width={100} 
                height={100}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </section>


        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative z-10 mx-auto w-full max-w-7xl mt-[5vh]">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                <SplittingText text="Equipe" type="words" />
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Conheça os pesquisadores responsáveis por tornar este projeto uma realidade.
              </p>
            </div>
            <CardEquipe />
          </div>
        </section>

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
        >
          <div className="relative z-10 mx-auto w-full max-w-4xl mt-[5vh]">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-open-sans-custom [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                WebMapa Antártica
              </h2>
              <p className="text-xl text-white/80 mb-2 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Ilha Rei George
              </p>
              <p className="text-base text-gray-300 max-w-2xl mx-auto mb-4 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] leading-relaxed">
                Este projeto surgiu como parte de uma demanda dentro de um projeto de pesquisa do Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS), que tem como foco a gestão de dados geoespaciais da Ilha Rei George, localizada na Antártica.
              </p>
              <p className="text-base text-gray-300 max-w-2xl mx-auto font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] leading-relaxed">
                O objetivo é organizar, visualizar e disponibilizar informações espaciais de maneira acessível para pesquisadores e a comunidade acadêmica em geral, permitindo a exploração dos dados de forma mais dinâmica e intuitiva.
              </p>
            </div>

            {/* Links e Ações */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <a
                href="https://github.com/alexandrertav/antartica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-open-sans-custom">Código Fonte</span>
              </a>

              <a
                href="mailto:contato@ifrs.edu.br"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <MailIcon className="w-6 h-6 text-white" />
                <span className="text-white font-open-sans-custom">contato@ifrs.edu.br</span>
              </a>
            </div>

            {/* Botão Acessar Mapa */}
            <div className="flex justify-center mb-12">
              <Link href="/mapa">
                <ShinyButton className="px-8 py-3 text-base">Acessar Mapa Interativo</ShinyButton>
              </Link>
            </div>

            {/* Footer Info */}
            <div className="text-center space-y-4 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image 
                  src="/assets/logo-ifrs.png" 
                  alt="IFRS" 
                  width={60} 
                  height={60}
                  className="drop-shadow-lg opacity-80"
                />
              </div>
              <p className="text-sm text-white/70 font-open-sans-custom">
                © 2024 Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS)
              </p>
              <p className="text-sm text-white/60 font-open-sans-custom">
                Projeto de pesquisa: Avaliação e gestão de dados geomorfológicos da Ilha Rei George, Antártica Marítima
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
