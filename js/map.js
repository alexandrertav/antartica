// Global variables
let map
let markers
let currentBaseLayer = "osm"
let showPhotoMarkers = true
let activePanel = null
let photoCount = 0
const baseLayers = {}
const lucide = window.lucide
const L = window.L
const Papa = window.Papa

// Base layer configurations
const baseLayerOptions = {
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

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Initialize map
  initializeMap()

  // Setup event listeners
  setupEventListeners()

  // Load photo data
  loadPhotoData()
})

function initializeMap() {
  // Initialize map
  map = L.map("map", {
    zoomControl: false,
  }).setView([-62.1, -58.4], 10)

  // Add initial base layer
  const initialLayer = L.tileLayer(baseLayerOptions.osm.url, {
    attribution: baseLayerOptions.osm.attribution,
  }).addTo(map)

  baseLayers.osm = initialLayer

  // Add fullscreen control if available
  if (L.Control.Fullscreen) {
    map.addControl(new L.Control.Fullscreen())
  }

  // Initialize marker cluster
  markers = L.markerClusterGroup()
}

function setupEventListeners() {
  // Menu button listeners
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("click", handleMenuClick)
  })

  // Layer button listeners
  document.querySelectorAll(".layer-btn").forEach((btn) => {
    btn.addEventListener("click", handleLayerChange)
  })

  // Remove the photo markers toggle listener from here
  // It will be added after markers are loaded in loadPhotoData()

  // Search functionality
  document.querySelector(".search-btn").addEventListener("click", handleSearch)
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  })

  // Close panels when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".panel") && !e.target.closest(".menu-btn")) {
      closeAllPanels()
    }
  })
}

function handleMenuClick(e) {
  const btn = e.currentTarget
  const action = btn.dataset.action
  const panel = btn.dataset.panel

  if (action) {
    executeAction(action)
  } else if (panel) {
    togglePanel(panel, btn)
  }
}

function executeAction(action) {
  switch (action) {
    case "home":
      resetMapView()
      break
    case "zoom-in":
      map.zoomIn()
      break
    case "zoom-out":
      map.zoomOut()
      break
    case "fullscreen":
      toggleFullscreen()
      break
  }
}

function togglePanel(panelId, btn) {
  const panel = document.getElementById(panelId + "-panel")
  const isCurrentlyActive = activePanel === panelId

  // Close all panels first
  closeAllPanels()

  if (!isCurrentlyActive) {
    // Open the clicked panel
    panel.style.display = "block"
    btn.classList.add("active")
    activePanel = panelId
  }
}

function closeAllPanels() {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.style.display = "none"
  })
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  activePanel = null
}

function handleLayerChange(e) {
  const layerId = e.currentTarget.dataset.layer
  changeBaseLayer(layerId)
}

function changeBaseLayer(layerId) {
  if (!baseLayerOptions[layerId]) return

  // Remove current base layer
  if (baseLayers[currentBaseLayer]) {
    map.removeLayer(baseLayers[currentBaseLayer])
  }

  // Add new base layer
  if (!baseLayers[layerId]) {
    baseLayers[layerId] = L.tileLayer(baseLayerOptions[layerId].url, {
      attribution: baseLayerOptions[layerId].attribution,
    })
  }

  baseLayers[layerId].addTo(map)
  currentBaseLayer = layerId

  // Update UI
  document.querySelectorAll(".layer-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-layer="${layerId}"]`).classList.add("active")
}

function togglePhotoMarkers(show) {
  console.log("Toggle photo markers:", show)

  if (!markers) return

  if (show) {
    map.addLayer(markers)
  } else {
    map.removeLayer(markers)
  }
  showPhotoMarkers = show
}

function resetMapView() {
  map.setView([-62.1, -58.4], 10)
}

function toggleFullscreen() {
  if (map.toggleFullscreen) {
    map.toggleFullscreen()
  }
}

function handleSearch() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  if (!searchTerm) return

  // Simple search implementation
  // In a real application, you would implement more sophisticated search
  console.log("Searching for:", searchTerm)
  alert("Funcionalidade de busca será implementada em breve!")
}

function loadPhotoData() {
  console.log("Carregando dados...")

  Papa.parse("data/fotos.csv", {
    download: true,
    header: true,
    complete: (results) => {
      console.log("Dados carregados:", results.data)
      let validPhotos = 0

      results.data.forEach((row) => {
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

            const marker = L.marker([lat, lng], {
              icon: L.AwesomeMarkers.icon({
                icon: "camera",
                markerColor: "blue",
                prefix: "fa",
              }),
            }).bindPopup(popup)

            markers.addLayer(marker)
            validPhotos++
          }
        }
      })

      photoCount = validPhotos
      map.addLayer(markers)
      updatePhotoCount()

      // Reinitialize the toggle switch after markers are loaded
      const photoMarkersToggle = document.getElementById("photo-markers")
      photoMarkersToggle.checked = true
      photoMarkersToggle.addEventListener(
        "change",
        function () {
          togglePhotoMarkers(this.checked)
        },
        { once: false },
      )

      hideLoading()
    },
    error: (error) => {
      console.error("Error loading CSV:", error)
      hideLoading()
    },
  })
}

function updatePhotoCount() {
  document.getElementById("photo-count").textContent = `${photoCount} fotos`
  document.getElementById("marker-count").textContent = photoCount
  document.getElementById("info-photo-count").textContent = photoCount
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    loadingOverlay.style.display = "none"
  }

  // Update status
  const statusIndicator = document.getElementById("status-indicator")
  const statusText = document.getElementById("status-text")

  statusIndicator.classList.add("connected")
  statusText.textContent = "Conectado"
}

// Utility functions for future features
function exportMap(format) {
  console.log(`Exporting map as ${format}`)
  alert(`Funcionalidade de exportação ${format} será implementada em breve!`)
}

function shareMap(type) {
  console.log(`Sharing map via ${type}`)
  if (type === "link") {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado para a área de transferência!")
    })
  } else {
    alert(`Funcionalidade de compartilhamento ${type} será implementada em breve!`)
  }
}

function measureDistance() {
  console.log("Starting distance measurement")
  alert("Funcionalidade de medição de distância será implementada em breve!")
}

function measureArea() {
  console.log("Starting area measurement")
  alert("Funcionalidade de medição de área será implementada em breve!")
}

// Add event listeners for export and share buttons
document.addEventListener("DOMContentLoaded", () => {
  // Export buttons
  document.querySelectorAll(".export-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const text = this.textContent.toLowerCase()
      if (text.includes("png")) exportMap("PNG")
      else if (text.includes("pdf")) exportMap("PDF")
      else if (text.includes("csv")) exportMap("CSV")
    })
  })

  // Share buttons
  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const text = this.textContent.toLowerCase()
      if (text.includes("link")) shareMap("link")
      else if (text.includes("incorporar")) shareMap("embed")
    })
  })

  // Measure buttons
  document.querySelectorAll(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const text = this.textContent.toLowerCase()
      if (text.includes("distância")) measureDistance()
      else if (text.includes("área")) measureArea()
    })
  })
})
