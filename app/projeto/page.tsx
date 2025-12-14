import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { Camera, Users, Code, TrendingUp, Check } from "lucide-react"
import Image from "next/image"
import { SplittingText } from "@/components/text/splitting-text"

export default function ProjetoPage() {
  return (
    <main className="relative min-h-screen">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/50" />
      <FloatingNavbar />

      {/* Projects Section */}
      <section className="relative z-10 px-4 py-20 md:py-32 pt-32">
        <div className="mx-auto w-full max-w-6xl">
          {/* Heading */}
          <div className="mx-auto mb-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom mb-8 text-center">
              <SplittingText text="Projeto de Pesquisa" type="words" />
            </h1>
          </div>
          
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
    </main>
  )
}
