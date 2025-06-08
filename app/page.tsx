"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  ZoomIn,
  ZoomOut,
  Layers,
  Camera,
  MapIcon,
  Satellite,
  Mountain,
  Globe,
  Search,
  Home,
  Ruler,
  Download,
  Share2,
  Info,
  Maximize,
  MapPin,
} from "lucide-react"

declare global {
  interface Window {
    L: any
    Papa: any
  }
}

export default function AntarcticWebMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any>(null)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [currentBaseLayer, setCurrentBaseLayer] = useState("osm")
  const [showPhotoMarkers, setShowPhotoMarkers] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [photoCount, setPhotoCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const baseLayerOptions = [
    {
      id: "osm",
      name: "OpenStreetMap",
      icon: MapIcon,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "© OpenStreetMap contributors",
    },
    {
      id: "satellite",
      name: "Satellite",
      icon: Satellite,
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "© Esri",
    },
    {
      id: "terrain",
      name: "Terrain",
      icon: Mountain,
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: "© OpenTopoMap contributors",
    },
    {
      id: "cartodb",
      name: "Light Theme",
      icon: Globe,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "© CartoDB",
    },
  ]

  const menuItems = [
    { id: "home", icon: Home, label: "Início", action: () => resetMapView() },
    { id: "zoom-in", icon: ZoomIn, label: "Aproximar", action: () => handleZoomIn() },
    { id: "zoom-out", icon: ZoomOut, label: "Afastar", action: () => handleZoomOut() },
    { id: "layers", icon: Layers, label: "Camadas", panel: "layers" },
    { id: "search", icon: Search, label: "Buscar", panel: "search" },
    { id: "measure", icon: Ruler, label: "Medir", panel: "measure" },
    { id: "fullscreen", icon: Maximize, label: "Tela Cheia", action: () => toggleFullscreen() },
    { id: "export", icon: Download, label: "Exportar", panel: "export" },
    { id: "share", icon: Share2, label: "Compartilhar", panel: "share" },
    { id: "info", icon: Info, label: "Informações", panel: "info" },
  ]

  useEffect(() => {
    // Load external scripts
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true)
          return
        }
        const script = document.createElement("script")
        script.src = src
        script.onload = () => resolve(true)
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
      })
    }

    const loadCSS = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = href
      document.head.appendChild(link)
    }

    const initializeMap = async () => {
      try {
        // Load CSS files
        loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css")
        loadCSS("https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css")
        loadCSS("https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css")
        loadCSS("https://cdn.jsdelivr.net/npm/leaflet.awesome-markers@2.0.5/dist/leaflet.awesome-markers.css")

        // Load JavaScript files
        await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js")
        await loadScript("https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js")
        await loadScript(
          "https://cdn.jsdelivr.net/npm/leaflet.awesome-markers@2.0.5/dist/leaflet.awesome-markers.min.js",
        )
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js")
        await loadScript("https://unpkg.com/leaflet-fullscreen/dist/Leaflet.fullscreen.min.js")

        if (mapRef.current && window.L) {
          // Initialize map
          const map = window.L.map(mapRef.current, {
            zoomControl: false,
          }).setView([-62.1, -58.4], 10)

          mapInstanceRef.current = map

          // Add initial base layer
          const initialLayer = window.L.tileLayer(baseLayerOptions[0].url, {
            attribution: baseLayerOptions[0].attribution,
          }).addTo(map)

          // Initialize marker cluster
          markersRef.current = window.L.markerClusterGroup()

          // Load CSV data
          loadPhotoData(map)
        }
      } catch (error) {
        console.error("Error initializing map:", error)
        setIsLoading(false)
      }
    }

    initializeMap()
  }, [])

  const loadPhotoData = (map: any) => {
    if (!window.Papa) return

    window.Papa.parse("/data/fotos.csv", {
      download: true,
      header: true,
      complete: (results: any) => {
        console.log("Dados carregados:", results.data)
        let validPhotos = 0

        results.data.forEach((row: any) => {
          if (row.LATITUDE && row.LONGITUDE) {
            const lat = Number.parseFloat(row.LATITUDE.replace(",", "."))
            const lng = Number.parseFloat(row.LONGITUDE.replace(",", "."))

            if (!isNaN(lat) && !isNaN(lng)) {
              const url = row.URL.split("/d/")[1]?.split("/")[0]
              const embedUrl = url ? `https://drive.google.com/file/d/${url}/preview` : ""

              const popup = `
                <div style='text-align:center; max-width: 320px;'>
                  <iframe src="${embedUrl}" width="300" height="200" allowfullscreen style="border: none; border-radius: 8px;"></iframe><br>
                  <div style="margin-top: 10px; text-align: left;">
                    <strong>Ano:</strong> ${row.ANO}<br>
                    <strong>Observador:</strong> ${row.OBSERVADOR}<br>
                    <strong>Tipo:</strong> ${row.TIPO}<br>
                    <strong>Data:</strong> ${row.DATA}<br>
                    <strong>Coordenadas:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}
                  </div>
                </div>
              `

              const marker = window.L.marker([lat, lng], {
                icon: window.L.AwesomeMarkers.icon({
                  icon: "camera",
                  markerColor: "blue",
                  prefix: "fa",
                }),
              }).bindPopup(popup)

              markersRef.current.addLayer(marker)
              validPhotos++
            }
          }
        })

        setPhotoCount(validPhotos)
        map.addLayer(markersRef.current)
        setIsLoading(false)
      },
      error: (error: any) => {
        console.error("Error loading CSV:", error)
        setIsLoading(false)
      },
    })
  }

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const resetMapView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([-62.1, -58.4], 10)
    }
  }

  const toggleFullscreen = () => {
    if (mapInstanceRef.current && mapInstanceRef.current.toggleFullscreen) {
      mapInstanceRef.current.toggleFullscreen()
    }
  }

  const changeBaseLayer = (layerId: string) => {
    if (!mapInstanceRef.current) return

    const layer = baseLayerOptions.find((l) => l.id === layerId)
    if (!layer) return

    // Remove current layers
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.TileLayer) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    // Add new base layer
    window.L.tileLayer(layer.url, {
      attribution: layer.attribution,
    }).addTo(mapInstanceRef.current)

    setCurrentBaseLayer(layerId)
  }

  const togglePhotoMarkers = (show: boolean) => {
    if (!mapInstanceRef.current || !markersRef.current) return

    if (show) {
      mapInstanceRef.current.addLayer(markersRef.current)
    } else {
      mapInstanceRef.current.removeLayer(markersRef.current)
    }
    setShowPhotoMarkers(show)
  }

  const handleMenuClick = (item: any) => {
    if (item.action) {
      item.action()
    } else if (item.panel) {
      setActivePanel(activePanel === item.panel ? null : item.panel)
    }
  }

  const renderPanel = () => {
    switch (activePanel) {
      case "layers":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Gerenciar Camadas</h3>

                <div>
                  <h4 className="text-sm font-medium mb-3">Camadas Base</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {baseLayerOptions.map((layer) => {
                      const IconComponent = layer.icon
                      return (
                        <Button
                          key={layer.id}
                          onClick={() => changeBaseLayer(layer.id)}
                          variant={currentBaseLayer === layer.id ? "default" : "outline"}
                          size="sm"
                          className="h-auto p-3 flex flex-col items-center gap-1"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="text-xs">{layer.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">Camadas de Dados</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="photo-markers" className="text-sm">
                      Marcadores de Fotos ({photoCount})
                    </Label>
                    <Switch id="photo-markers" checked={showPhotoMarkers} onCheckedChange={togglePhotoMarkers} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "search":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Buscar no Mapa</h3>
                <div className="space-y-2">
                  <Input
                    placeholder="Buscar por observador, ano, tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Busque por:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Nome do observador</li>
                    <li>Ano da coleta</li>
                    <li>Tipo de amostra</li>
                    <li>Coordenadas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "measure":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ferramentas de Medição</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Ruler className="h-4 w-4 mr-2" />
                    Distância
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Área
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Clique no mapa para começar a medir distâncias ou áreas.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "export":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Exportar Dados</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar como PNG
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar como PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar dados CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "share":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Compartilhar Mapa</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Copiar Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Incorporar Mapa
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Compartilhe este mapa com outros pesquisadores ou incorpore em seu site.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "info":
        return (
          <Card className="absolute top-16 left-4 z-[1000] w-80 shadow-xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações do Projeto</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Localização</h4>
                    <p className="text-sm text-muted-foreground">Ilha Rei George, Antártica</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Dados</h4>
                    <p className="text-sm text-muted-foreground">{photoCount} fotos georreferenciadas</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Coordenadas</h4>
                    <p className="text-sm text-muted-foreground">62°S, 58°W</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Sobre</h4>
                    <p className="text-sm text-muted-foreground">
                      Mapa interativo com dados de pesquisa científica coletados na Ilha Rei George, parte do
                      arquipélago das Ilhas Shetland do Sul na Antártica.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative w-full h-screen">
      {/* Top Menu Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">WebMapa</h1>
                <p className="text-xs text-gray-500">Ilha Rei George</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex items-center space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = activePanel === item.panel
              return (
                <Button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2 px-3"
                  title={item.label}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Status Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Camera className="h-4 w-4" />
              <span>{photoCount} fotos</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500" : "bg-green-500"}`} />
              <span>{isLoading ? "Carregando..." : "Conectado"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full pt-16" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <Card className="p-6">
            <CardContent className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div>
                <p className="font-semibold">Carregando WebMapa</p>
                <p className="text-sm text-muted-foreground">Ilha Rei George, Antártica</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Active Panel */}
      {renderPanel()}
    </div>
  )
}
