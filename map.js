// Global variables
let map
let markers
let currentBaseLayer = "osm"
let showPhotoMarkers = true
let activePanel = null
let photoCount = 0
const baseLayers = {}

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
  console.log("DOM loaded, initializing application...")

  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Initialize map
  initializeMap()

  // Setup event listeners
  setupEventListeners()

  // Load photo data
  loadPhotoData()
})

function initializeMap() {
  console.log("Initializing map...")

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
  if (L.Control && L.Control.Fullscreen) {
    map.addControl(new L.Control.Fullscreen())
  }

  // Initialize marker cluster
  markers = L.markerClusterGroup()

  console.log("Map initialized successfully")
}

function setupEventListeners() {
  console.log("Setting up event listeners...")

  // Menu button listeners
  document.querySelectorAll(".menu-btn").forEach((btn) => {
    btn.addEventListener("click", handleMenuClick)
  })

  // Layer button listeners
  document.querySelectorAll(".layer-btn").forEach((btn) => {
    btn.addEventListener("click", handleLayerChange)
  })

  // Search functionality
  const searchBtn = document.querySelector(".search-btn")
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch)
  }

  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    })
  }

  // Close panels when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".panel") && !e.target.closest(".menu-btn")) {
      closeAllPanels()
    }
  })

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

  console.log("Event listeners set up successfully")
}

function setupPhotoMarkersToggle() {
  console.log("Setting up photo markers toggle...")

  const toggle = document.getElementById("photo-markers-toggle")
  if (toggle) {
    // Remove any existing event listeners
    toggle.removeEventListener("change", handleToggleChange)

    // Add new event listener
    toggle.addEventListener("change", handleToggleChange)

    // Set initial state
    toggle.checked = showPhotoMarkers

    console.log("Photo markers toggle set up successfully")
  } else {
    console.error("Photo markers toggle element not found!")
  }
}

function handleToggleChange(e) {
  const isChecked = e.target.checked
  console.log("Toggle changed to:", isChecked)
  togglePhotoMarkers(isChecked)
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
      if (map) map.zoomIn()
      break
    case "zoom-out":
      if (map) map.zoomOut()
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
  if (!baseLayerOptions[layerId] || !map) return

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
  const activeBtn = document.querySelector('[data-layer="' + layerId + '"]')
  if (activeBtn) {
    activeBtn.classList.add("active")
  }
}

function togglePhotoMarkers(show) {
  console.log("Toggling photo markers:", show)

  if (!markers || !map) {
    console.error("Markers or map not available")
    return
  }

  if (show) {
    if (!map.hasLayer(markers)) {
      map.addLayer(markers)
      console.log("Photo markers shown")
    }
  } else {
    if (map.hasLayer(markers)) {
      map.removeLayer(markers)
      console.log("Photo markers hidden")
    }
  }

  showPhotoMarkers = show
}

function resetMapView() {
  if (map) {
    map.setView([-62.1, -58.4], 10)
  }
}

function toggleFullscreen() {
  if (map && map.toggleFullscreen) {
    map.toggleFullscreen()
  }
}

function handleSearch() {
  const searchInput = document.getElementById("search-input")
  if (!searchInput) return

  const searchTerm = searchInput.value.toLowerCase()
  if (!searchTerm) return

  console.log("Searching for:", searchTerm)
  alert("Funcionalidade de busca será implementada em breve!")
}

function loadPhotoData() {
  console.log("Loading photo data...")

  if (typeof Papa === "undefined") {
    console.error("Papa Parse library not loaded")
    hideLoading()
    return
  }

  Papa.parse("fotos.csv", {
    download: true,
    header: true,
    complete: (results) => {
      console.log("CSV data loaded:", results.data.length, "rows")
      let validPhotos = 0

      results.data.forEach((row) => {
        if (row.LATITUDE && row.LONGITUDE) {
          const lat = Number.parseFloat(row.LATITUDE.replace(",", "."))
          const lng = Number.parseFloat(row.LONGITUDE.replace(",", "."))

          if (!isNaN(lat) && !isNaN(lng)) {
            const url = row.URL.split("/d/")[1] ? row.URL.split("/d/")[1].split("/")[0] : ""
            const embedUrl = url ? "https://drive.google.com/file/d/" + url + "/preview" : ""

            const popup =
              '<div style="text-align:center; max-width: 320px;">' +
              '<iframe src="' +
              embedUrl +
              '" width="300" height="200" allowfullscreen style="border: none; border-radius: 8px;"></iframe><br>' +
              '<div style="margin-top: 10px; text-align: left;">' +
              "<strong>Ano:</strong> " +
              row.ANO +
              "<br>" +
              "<strong>Observador:</strong> " +
              row.OBSERVADOR +
              "<br>" +
              "<strong>Tipo:</strong> " +
              row.TIPO +
              "<br>" +
              "<strong>Data:</strong> " +
              row.DATA +
              "<br>" +
              "<strong>Coordenadas:</strong> " +
              lat.toFixed(6) +
              ", " +
              lng.toFixed(6) +
              "</div>" +
              "</div>"

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
      console.log("Valid photos loaded:", photoCount)

      // Add markers to map
      if (map && markers) {
        map.addLayer(markers)
      }

      updatePhotoCount()
      setupPhotoMarkersToggle()
      hideLoading()
    },
    error: (error) => {
      console.error("Error loading CSV:", error)
      hideLoading()
    },
  })
}

function updatePhotoCount() {
  const elements = [
    document.getElementById("photo-count"),
    document.getElementById("marker-count"),
    document.getElementById("info-photo-count"),
  ]

  elements.forEach((element) => {
    if (element) {
      if (element.id === "photo-count") {
        element.textContent = photoCount + " fotos"
      } else {
        element.textContent = photoCount
      }
    }
  })
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loading-overlay")
  if (loadingOverlay) {
    loadingOverlay.style.display = "none"
  }

  // Update status
  const statusIndicator = document.getElementById("status-indicator")
  const statusText = document.getElementById("status-text")

  if (statusIndicator) {
    statusIndicator.classList.add("connected")
  }
  if (statusText) {
    statusText.textContent = "Conectado"
  }
}

// Utility functions for future features
function exportMap(format) {
  console.log("Exporting map as " + format)
  alert("Funcionalidade de exportação " + format + " será implementada em breve!")
}

function shareMap(type) {
  console.log("Sharing map via " + type)
  if (type === "link") {
    const url = window.location.href
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert("Link copiado para a área de transferência!")
      })
    } else {
      alert("Link: " + url)
    }
  } else {
    alert("Funcionalidade de compartilhamento " + type + " será implementada em breve!")
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
