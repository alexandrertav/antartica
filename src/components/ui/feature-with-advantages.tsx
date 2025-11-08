import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SplittingText } from "@/components/text/splitting-text"

function Feature() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Plataforma</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
              <SplittingText text="Funcionalidades da Plataforma" type="words" />
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
              Explore as ferramentas poderosas que tornam nossa plataforma ideal para pesquisa científica na Antártica.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Fotografias Georreferenciadas</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Mais de 2000 fotografias científicas com coordenadas GPS precisas e metadados detalhados.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Múltiplas Camadas</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Alterne entre OpenStreetMap, imagens de satélite, terreno e camadas personalizadas.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Busca Avançada</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Encontre dados específicos por observador, ano, tipo de amostra ou coordenadas geográficas.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Exportação de Dados</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Exporte mapas em PNG/PDF e dados em CSV para uso em pesquisas e apresentações.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Dados Científicos</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Acesse informações detalhadas incluindo elevação, data de coleta e observador responsável.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                <div className="flex flex-col gap-1">
                  <p className="text-white font-open-sans-custom">Compartilhamento</p>
                  <p className="text-gray-300 text-sm font-open-sans-custom">
                    Compartilhe visualizações e dados com outros pesquisadores e colaboradores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Feature }
