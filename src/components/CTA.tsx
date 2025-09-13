'use client'

import { ArrowRight, Github, ExternalLink, Mail, FileText } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section id="dados" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Explorar a Antártica?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Acesse o mapa interativo e descubra os dados científicos coletados na Ilha Rei George. 
            Contribua para a pesquisa antártica brasileira.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main CTA */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Comece Sua Exploração</h3>
              <p className="text-blue-100 leading-relaxed">
                O WebMapa oferece uma experiência única para visualizar dados geomorfológicos 
                da Antártica. Explore fotografias georreferenciadas, analise elevações e 
                descubra insights sobre a Ilha Rei George.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mapa"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Acessar Mapa</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://github.com/alexandrertav/antartica"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <Github className="w-5 h-5" />
                <span>Ver Código</span>
              </a>
            </div>
          </div>

          {/* Right Side - Quick Stats & Links */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold mb-4">Dados Disponíveis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">2000+</div>
                  <div className="text-sm text-blue-100">Fotografias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">Coleta</div>
                  <div className="text-sm text-blue-100">de Dados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">GPS</div>
                  <div className="text-sm text-blue-100">Precisão</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">IFRS</div>
                  <div className="text-sm text-blue-100">Pesquisa</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Recursos Adicionais</h4>
              <div className="space-y-3">
                <a
                  href="/fotos.csv"
                  download
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <FileText className="w-5 h-5 text-blue-200" />
                  <div>
                    <div className="font-medium">Baixar Dados CSV</div>
                    <div className="text-sm text-blue-100">Dataset completo das fotografias</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-200 ml-auto" />
                </a>
                <a
                  href="mailto:contato@ifrs.edu.br"
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-200" />
                  <div>
                    <div className="font-medium">Contato IFRS</div>
                    <div className="text-sm text-blue-100">Dúvidas sobre a pesquisa</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-200 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-blue-100 mb-4">
              Projeto desenvolvido pelo Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Dados Atualizados</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Acesso Gratuito</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Código Aberto</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
