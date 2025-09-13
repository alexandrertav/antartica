'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'

// Dynamically import the map component to avoid SSR issues
const AntarcticaMap = dynamic(() => import('@/components/AntarcticaMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Carregando WebMapa</p>
        <p className="text-sm text-gray-500">Ilha Rei George, Antártica</p>
      </div>
    </div>
  )
})

export default function MapPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <AntarcticaMap />
      </div>
    </div>
  )
}
