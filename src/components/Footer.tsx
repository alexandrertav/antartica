'use client'

import { Map, Github, Mail, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Map className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">WebMapa Antártica</h3>
                <p className="text-sm text-gray-400">Ilha Rei George</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Plataforma interativa para visualização de dados geomorfológicos coletados 
              na Antártica Marítima como parte da pesquisa do IFRS.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/alexandrertav/antartica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="mailto:contato@ifrs.edu.br"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="text-gray-300 hover:text-white transition-colors">
                  Mapa Interativo
                </Link>
              </li>
              <li>
                <a href="#sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a href="#dados" className="text-gray-300 hover:text-white transition-colors">
                  Dados
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/fotos.csv" 
                  download
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Baixar CSV</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alexandrertav/antartica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Código Fonte</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ifrs.edu.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>IFRS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>© 2024 Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS)</p>
              <p className="mt-1">Projeto de pesquisa: Avaliação e gestão de dados geomorfológicos da Ilha Rei George, Antártica Marítima</p>
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Desenvolvido com</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>para a ciência</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="text-center text-gray-500 text-xs">
            <p>
              Este projeto é parte de uma iniciativa de pesquisa científica para democratizar 
              o acesso a dados geomorfológicos da Antártica Marítima.
            </p>
            <p className="mt-2">
              Dados coletados em 2023 na Ilha Rei George, Arquipélago das Ilhas Shetland do Sul, Antártica.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
