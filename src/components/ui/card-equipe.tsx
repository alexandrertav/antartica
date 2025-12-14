"use client"

import Image from "next/image"

export function CardEquipe() {
  return (
    <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
      <div className="relative flex flex-col items-center">
        <div className="relative z-20 mx-auto max-w-5xl rounded-[40px] py-6 md:p-10 xl:py-10 justify-left">
          
          {/* Coordenador do Projeto */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image 
                  src="/assets/luiz.png" 
                  alt="Luiz Felipe Velho" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                Luiz Felipe Velho
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-3 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                Coordenador do Projeto de Pesquisa
              </p>
              <div className="space-y-1 text-sm md:text-base text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                <p>Engenheiro Cartógrafo (UFRGS, 2006)</p>
                <p>Mestre em Sensoriamento Remoto (UFRGS, 2009)</p>
                <p>Doutor em Sensoriamento Remoto (UFRGS, 2014)</p>
                <p className="font-semibold text-white/90 mt-2">Instituto Federal do Rio Grande do Sul - Campus Porto Alegre</p>
              </div>
            </div>
          </div>
          {/* Proponente do Projeto */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image 
                  src="/assets/foto.jpg" 
                  alt="Alexandre R. Tavares" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                Alexandre R. Tavares
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-3 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                Bolsista de Iniciação Científica
              </p>
              <div className="space-y-1 text-sm md:text-base text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom">
                <p>Técnico em Meio Ambiente (IFRS - 2025)</p>
                <p>Graduando em Sistemas para Internet (IFRS - 2024 - 2027)</p>
                <p className="font-semibold text-white/90 mt-2">Instituto Federal do Rio Grande do Sul - Campus Porto Alegre</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
