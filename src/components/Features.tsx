'use client'

import { 
  Map, 
  Camera, 
  Layers, 
  Search, 
  Download, 
  Zap, 
  Globe, 
  BarChart3,
  Filter,
  Share2,
  Eye,
  Database
} from 'lucide-react'

const features = [
  {
    icon: Map,
    title: 'Mapa Interativo',
    description: 'Navegue pela Ilha Rei George com controles intuitivos de zoom, pan e múltiplas camadas de visualização.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Camera,
    title: 'Fotografias Georreferenciadas',
    description: 'Acesse mais de 20 fotografias científicas com coordenadas GPS precisas e metadados detalhados.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Layers,
    title: 'Múltiplas Camadas',
    description: 'Alterne entre OpenStreetMap, imagens de satélite, terreno e temas personalizados para diferentes análises.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Search,
    title: 'Busca Avançada',
    description: 'Encontre dados específicos por observador, ano de coleta, tipo de amostra ou coordenadas geográficas.',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Download,
    title: 'Exportação de Dados',
    description: 'Exporte mapas em PNG/PDF e dados em CSV para uso em pesquisas e apresentações científicas.',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Database,
    title: 'Dados Científicos',
    description: 'Acesse informações detalhadas incluindo elevação, data de coleta, tipo de amostra e observador responsável.',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
    icon: Eye,
    title: 'Visualização Intuitiva',
    description: 'Interface moderna e responsiva otimizada para pesquisadores e estudantes explorarem os dados facilmente.',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    icon: Share2,
    title: 'Compartilhamento',
    description: 'Compartilhe descobertas e localizações específicas com colegas através de links diretos e embeds.',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    icon: Globe,
    title: 'Acesso Global',
    description: 'Plataforma web acessível de qualquer lugar do mundo, facilitando colaboração internacional.',
    color: 'bg-teal-100 text-teal-600'
  }
]

export default function Features() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funcionalidades do WebMapa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma completa para visualização e análise de dados geomorfológicos 
            coletados na Ilha Rei George, Antártica Marítima.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Project Info Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Sobre o Projeto de Pesquisa
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Este projeto surgiu como parte de uma demanda dentro de um projeto de pesquisa do 
                <strong> Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS)</strong>, 
                que tem como foco a gestão de dados geoespaciais da Ilha Rei George, localizada na Antártica.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                O objetivo é organizar, visualizar e disponibilizar informações espaciais de maneira 
                acessível para pesquisadores e a comunidade acadêmica em geral, permitindo a exploração 
                dos dados de forma mais dinâmica e intuitiva.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Geomorfologia
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Antártica Marítima
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Dados Geoespaciais
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  IFRS
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Gestão de Dados</h4>
                  <p className="text-gray-600 text-sm">
                    Organização e estruturação de dados geomorfológicos coletados em campo.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Análise Espacial</h4>
                  <p className="text-gray-600 text-sm">
                    Ferramentas para análise e interpretação de dados geoespaciais da Antártica.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Acesso Facilitado</h4>
                  <p className="text-gray-600 text-sm">
                    Interface web moderna para facilitar o acesso aos dados científicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
