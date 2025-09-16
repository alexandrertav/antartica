'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
// Icons are used in AntarcticaGlassPanel and AntarcticaGlassMenu components
import { AntarcticaGlassMenu } from './AntarcticaGlassMenu'
import { LayersPanel, SearchPanel, ExportPanel, InfoPanel } from './AntarcticaGlassPanel'

interface PhotoData {
  PATH: string
  NÚMERO: string
  URL: string
  ANO: string
  TIPO: string
  REC_TIME: string
  DATA: string
  LATITUDE: string
  LONGITUDE: string
  ELEVATION: string
  OBSERVADOR: string
}

interface BaseLayer {
  name: string
  url: string
  attribution: string
}

const baseLayerOptions: Record<string, BaseLayer> = {
  osm: {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "© Esri",
  },
  terrain: {
    name: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "© OpenTopoMap contributors",
  },
  cartodb: {
    name: "Light Theme",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "© CartoDB",
  },
}

export default function AntarcticaMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [markers, setMarkers] = useState<L.LayerGroup | null>(null)
  const [currentBaseLayer, setCurrentBaseLayer] = useState('osm')
  const [showPhotoMarkers, setShowPhotoMarkers] = useState(true)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [photoCount, setPhotoCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isMapInitialized, setIsMapInitialized] = useState(false)

  const initializeMap = useCallback(async () => {
    if (isMapInitialized || !mapRef.current) return

    try {
      // Dynamically import Leaflet to avoid SSR issues
      const L = (await import('leaflet')).default
      
      // Fix for default markers
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      // Check if container already has a map
      if ((mapRef.current as HTMLElement & { _leaflet_id?: number })._leaflet_id) {
        return
      }

      // Initialize map
      const mapInstance = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([-62.1, -58.4], 10)

      // Add initial base layer
      L.tileLayer(baseLayerOptions.osm.url, {
        attribution: baseLayerOptions.osm.attribution,
      }).addTo(mapInstance)

      setMap(mapInstance)
      setIsMapInitialized(true)

      // Initialize marker cluster group
      let clusterGroup: L.LayerGroup
      try {
        // Load MarkerCluster script if not already loaded
        if (!(window as typeof window & { L?: { MarkerClusterGroup?: unknown } }).L?.MarkerClusterGroup) {
          console.log('Loading MarkerCluster script...')
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'
            script.onload = () => {
              console.log('MarkerCluster script loaded')
              resolve()
            }
            script.onerror = (error: Event | string) => {
              console.error('Failed to load MarkerCluster script:', error)
              reject(error)
            }
            document.head.appendChild(script)
          })
        }

        // Create cluster group
        const windowWithLeaflet = window as typeof window & { L?: { MarkerClusterGroup?: new (options: unknown) => L.LayerGroup } }
        if (windowWithLeaflet.L?.MarkerClusterGroup) {
          clusterGroup = new windowWithLeaflet.L.MarkerClusterGroup({
            chunkedLoading: true,
            chunkInterval: 200,
            chunkDelay: 50,
            maxClusterRadius: 80,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            disableClusteringAtZoom: 16,
            iconCreateFunction: function(cluster: { getChildCount: () => number }) {
              const count = cluster.getChildCount()
              let className = 'marker-cluster-small'
              
              if (count < 10) {
                className = 'marker-cluster-small'
              } else if (count < 100) {
                className = 'marker-cluster-medium'
              } else {
                className = 'marker-cluster-large'
              }
              
              return L.divIcon({
                html: `<div><span>${count}</span></div>`,
                className: `marker-cluster ${className}`,
                iconSize: L.point(40, 40)
              })
            }
          })
        } else {
          throw new Error('MarkerCluster still not available after loading script')
        }
      } catch (error) {
        console.error('Error initializing MarkerCluster:', error)
        clusterGroup = L.layerGroup()
        console.log('Fallback to regular layer group due to error')
      }
      
      setMarkers(clusterGroup)
      mapInstance.addLayer(clusterGroup)

      // Load photo data
      loadPhotoData(mapInstance, clusterGroup)
    } catch (error) {
      console.error('Error initializing map:', error)
      setIsLoading(false)
    }
  }, [isMapInitialized])

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !isMapInitialized) {
      initializeMap()
    }
  }, [initializeMap, isMapInitialized])

  useEffect(() => {
    return () => {
      // Cleanup map instance on component unmount
      if (map) {
        map.remove()
        setMap(null)
        setIsMapInitialized(false)
      }
    }
  }, [map])

  const loadPhotoData = async (mapInstance: L.Map, layerGroup: L.LayerGroup) => {
    try {
      console.log('Starting to load photo data...')
      console.log('Fetching from:', window.location.origin + '/fotos.csv')
      
      const response = await fetch('/fotos.csv')
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const csvText = await response.text()
      console.log('CSV loaded, length:', csvText.length)
      console.log('First 200 chars:', csvText.substring(0, 200))
      
      if (!csvText || csvText.length < 100) {
        throw new Error('CSV file appears to be empty or too small')
      }
      
      // Improved CSV parser to handle quoted values with commas
      const lines = csvText.split('\n').filter(line => line.trim())
      console.log('Total lines:', lines.length)
      
      if (lines.length < 2) {
        throw new Error('CSV file has no data rows')
      }
      
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      console.log('Headers:', headers)
      
      const data: PhotoData[] = []

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          // Parse CSV line respecting quoted values
          const values: string[] = []
          let current = ''
          let inQuotes = false
          
          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j]
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          values.push(current.trim()) // Add the last value
          
          const row: Record<string, string> = {}
          headers.forEach((header, index) => {
            row[header] = values[index]?.replace(/"/g, '') || ''
          })
          data.push(row as unknown as PhotoData)
        }
      }

      let validPhotos = 0
      const L = (await import('leaflet')).default

      console.log('Parsed CSV data:', data.length, 'rows')
      console.log('Sample row:', data[0])
      console.log('LayerGroup available:', !!layerGroup)
      console.log('Map instance available:', !!mapInstance)

      // Add a test marker first to verify the system works
      const testMarker = L.marker([-62.1, -58.4]).bindPopup('Test marker - King George Island center')
      layerGroup.addLayer(testMarker)
      console.log('Test marker added to layerGroup:', !!layerGroup)
      console.log('LayerGroup has layers:', layerGroup.getLayers().length)

      // Process all rows now that we confirmed it works
      console.log('Processing all rows...')
      
      data.forEach((row, index) => {
        if (index < 10) { // Only log first 10 for performance
          console.log(`Processing row ${index}:`, row)
        }
        
        if (row.LATITUDE && row.LONGITUDE) {
          // Handle Brazilian decimal format (comma instead of dot)
          const latStr = row.LATITUDE.toString().replace(/"/g, '').replace(',', '.')
          const lngStr = row.LONGITUDE.toString().replace(/"/g, '').replace(',', '.')
          
          const lat = parseFloat(latStr)
          const lng = parseFloat(lngStr)

          if (index < 10) { // Only log first 10 for performance
            console.log(`Row ${index}: lat=${latStr} (${lat}), lng=${lngStr} (${lng})`)
          }

          if (!isNaN(lat) && !isNaN(lng)) {
            const url = row.URL && row.URL.includes('/d/') ? row.URL.split('/d/')[1].split('/')[0] : ''
            const embedUrl = url ? `https://drive.google.com/file/d/${url}/preview` : ''

            const popupContent = `
              <div style="text-align:center; max-width: 320px;">
                ${embedUrl ? `<iframe src="${embedUrl}" width="300" height="200" allowfullscreen style="border: none; border-radius: 8px;"></iframe><br>` : ''}
                <strong>Foto #${row.NÚMERO || 'N/A'}</strong><br>
                <strong>Tipo:</strong> ${row.TIPO || 'N/A'}<br>
                <strong>Data:</strong> ${row.DATA || 'N/A'}<br>
                <strong>Observador:</strong> ${row.OBSERVADOR || 'N/A'}<br>
                <strong>Elevação:</strong> ${row.ELEVATION || 'N/A'}m<br>
                <strong>Coordenadas:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}<br>
                ${row.URL ? `<a href="${row.URL}" target="_blank" style="color: #007cba; text-decoration: none;">📷 Ver foto original</a>` : ''}
              </div>
            `
            // Create custom camera icon for photo markers
            const cameraIcon = L.divIcon({
              html: `
                <div style="
                  width: 32px; 
                  height: 32px; 
                  background: linear-gradient(135deg, #0ea5e9, #0284c7);
                  border: 3px solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  transition: all 0.2s ease;
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                    <circle cx="12" cy="12" r="3" fill="#0284c7"/>
                  </svg>
                </div>
              `,
              className: 'custom-camera-marker',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            })

            const marker = L.marker([lat, lng], { icon: cameraIcon }).bindPopup(popupContent)
            
            // Add to the layer group passed as parameter
            layerGroup.addLayer(marker)
            
            validPhotos++
            
            if (validPhotos <= 10) { // Log first 10 markers
              console.log(`Added marker ${validPhotos} at [${lat}, ${lng}]`)
            }
          } else {
            if (index < 5) { // Log first 5 invalid coordinates
              console.log(`Invalid coordinates for row ${index}: lat=${latStr}, lng=${lngStr}`)
            }
          }
        }
      })

      console.log(`Total valid photos: ${validPhotos}`)
      console.log(`LayerGroup now has ${layerGroup.getLayers().length} layers`)
      
      setPhotoCount(validPhotos)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading photo data:', error)
      setIsLoading(false)
    }
  }

  const handleMenuClick = (action?: string, panel?: string) => {
    if (action) {
      executeAction(action)
    } else if (panel) {
      togglePanel(panel)
    }
  }

  const executeAction = (action: string) => {
    if (!map) return

    switch (action) {
      case 'home':
        map.setView([-62.1, -58.4], 10)
        break
      case 'zoom-in':
        map.zoomIn()
        break
      case 'zoom-out':
        map.zoomOut()
        break
      case 'fullscreen':
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
        break
    }
  }

  const togglePanel = (panelId: string) => {
    setActivePanel(activePanel === panelId ? null : panelId)
  }

  const changeBaseLayer = async (layerId: string) => {
    if (!map || !baseLayerOptions[layerId]) return

    const L = (await import('leaflet')).default
    
    // Remove all existing tile layers
    map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })

    // Add new base layer
    L.tileLayer(baseLayerOptions[layerId].url, {
      attribution: baseLayerOptions[layerId].attribution,
    }).addTo(map)

    setCurrentBaseLayer(layerId)
  }

  const togglePhotoMarkers = () => {
    if (!map || !markers) return

    if (showPhotoMarkers) {
      map.removeLayer(markers)
    } else {
      map.addLayer(markers)
    }
    
    setShowPhotoMarkers(!showPhotoMarkers)
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    alert('Funcionalidade de busca será implementada em breve!')
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Carregando WebMapa</p>
            <p className="text-sm text-gray-500">Ilha Rei George, Antártica</p>
          </div>
        </div>
      )}

      {/* Map Container - positioned first so it's behind everything */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 w-full h-full bg-gray-200" 
        style={{ zIndex: 1 }}
      />

      {/* Enhanced Glass Menu */}
      <AntarcticaGlassMenu
        onMenuClick={handleMenuClick}
        activePanel={activePanel}
        photoCount={photoCount}
        isLoading={isLoading}
      />


      {/* Enhanced Glass Panels */}
      {activePanel === 'layers' && (
        <LayersPanel
          title="Gerenciar Camadas"
          onClose={() => setActivePanel(null)}
          currentBaseLayer={currentBaseLayer}
          onChangeBaseLayer={changeBaseLayer}
          showPhotoMarkers={showPhotoMarkers}
          onTogglePhotoMarkers={togglePhotoMarkers}
          photoCount={photoCount}
        />
      )}

      {activePanel === 'search' && (
        <SearchPanel
          title="Buscar no Mapa"
          onClose={() => setActivePanel(null)}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
      )}

      {activePanel === 'export' && (
        <ExportPanel
          title="Exportar Dados"
          onClose={() => setActivePanel(null)}
          onExport={(type) => alert(`Exportando como ${type.toUpperCase()}...`)}
        />
      )}

      {activePanel === 'info' && (
        <InfoPanel
          title="Informações do Projeto"
          onClose={() => setActivePanel(null)}
          photoCount={photoCount}
        />
      )}

      {/* Click outside to close panels */}
      {activePanel && (
        <div
          className="absolute inset-0 z-20"
          onClick={() => setActivePanel(null)}
        />
      )}

      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
      />
      
      {/* Custom cluster and marker styles */}
      <style jsx>{`
        .custom-camera-marker:hover div {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
        }
        
        .custom-camera-marker div {
          cursor: pointer;
        }
        .marker-cluster-small {
          background: linear-gradient(135deg, rgba(165, 243, 252, 0.9), rgba(67, 56, 202, 0.8));
          border: 3px solid rgba(165, 243, 252, 1);
          box-shadow: 0 0 15px rgba(165, 243, 252, 0.4);
        }
        .marker-cluster-small div {
          background: linear-gradient(135deg, rgba(165, 243, 252, 1), rgba(67, 56, 202, 0.9));
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .marker-cluster-small span {
          color: #1e293b;
          font-weight: 800;
          font-size: 13px;
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .marker-cluster-medium {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(21, 128, 61, 0.8));
          border: 3px solid rgba(34, 197, 94, 1);
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
        }
        .marker-cluster-medium div {
          background: linear-gradient(135deg, rgba(34, 197, 94, 1), rgba(21, 128, 61, 0.9));
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .marker-cluster-medium span {
          color: white;
          font-weight: 800;
          font-size: 13px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .marker-cluster-large {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(194, 65, 12, 0.8));
          border: 3px solid rgba(249, 115, 22, 1);
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
        }
        .marker-cluster-large div {
          background: linear-gradient(135deg, rgba(249, 115, 22, 1), rgba(194, 65, 12, 0.9));
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }
        .marker-cluster-large span {
          color: white;
          font-weight: 800;
          font-size: 13px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .marker-cluster {
          border-radius: 50%;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .marker-cluster:hover {
          transform: scale(1.15);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}
