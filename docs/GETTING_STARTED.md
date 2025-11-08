# 🚀 Guia de Início - Projeto Antártica WebMapa

## Próximas Ações Imediatas

Este documento detalha as tarefas priorizadas para começar o desenvolvimento **hoje**.

---

## 📋 Sprint 1: Sistema de Busca & Filtros (Semanas 1-2)

### Objetivo
Implementar sistema de busca funcional que permita aos usuários encontrar fotos específicas usando múltiplos critérios.

---

## ✅ Checklist de Implementação

### 1. Setup & Preparação (1 dia)

#### 1.1 Instalar dependências necessárias
```bash
npm install fuse.js date-fns react-datepicker @headlessui/react
npm install --save-dev @types/react-datepicker
```

**Bibliotecas:**
- `fuse.js` - Busca fuzzy performática
- `date-fns` - Manipulação de datas
- `react-datepicker` - Seletor de datas
- `@headlessui/react` - Componentes acessíveis (já pode estar instalado)

---

### 2. Estrutura de Dados (2-3 horas)

#### 2.1 Criar types para filtros

Criar arquivo: `src/types/filters.ts`

```typescript
export interface PhotoFilters {
  searchTerm: string
  observadores: string[]
  tipos: string[]
  dateRange: {
    start: Date | null
    end: Date | null
  }
  elevationRange: {
    min: number
    max: number
  }
  anos: number[]
}

export interface FilterOptions {
  observadores: string[]
  tipos: string[]
  anos: number[]
  elevationRange: {
    min: number
    max: number
  }
}
```

#### 2.2 Hook customizado para filtros

Criar arquivo: `src/hooks/usePhotoFilters.ts`

```typescript
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { PhotoData, PhotoFilters, FilterOptions } from '@/types'

export function usePhotoFilters(photos: PhotoData[]) {
  const [filters, setFilters] = useState<PhotoFilters>({
    searchTerm: '',
    observadores: [],
    tipos: [],
    dateRange: { start: null, end: null },
    elevationRange: { min: 0, max: 200 },
    anos: []
  })

  // Extrair opções únicas dos dados
  const filterOptions = useMemo<FilterOptions>(() => {
    const observadores = [...new Set(photos.map(p => p.OBSERVADOR).filter(Boolean))]
    const tipos = [...new Set(photos.map(p => p.TIPO).filter(Boolean))]
    const anos = [...new Set(photos.map(p => parseInt(p.ANO)).filter(Boolean))].sort()
    
    const elevations = photos
      .map(p => parseFloat(p.ELEVATION))
      .filter(e => !isNaN(e))
    
    return {
      observadores,
      tipos,
      anos,
      elevationRange: {
        min: Math.floor(Math.min(...elevations)),
        max: Math.ceil(Math.max(...elevations))
      }
    }
  }, [photos])

  // Setup Fuse.js para busca fuzzy
  const fuse = useMemo(() => {
    return new Fuse(photos, {
      keys: ['OBSERVADOR', 'TIPO', 'NÚMERO', 'DATA'],
      threshold: 0.3,
      includeScore: true
    })
  }, [photos])

  // Aplicar filtros
  const filteredPhotos = useMemo(() => {
    let result = photos

    // Busca por texto
    if (filters.searchTerm.trim()) {
      result = fuse.search(filters.searchTerm).map(r => r.item)
    }

    // Filtro por observador
    if (filters.observadores.length > 0) {
      result = result.filter(p => 
        filters.observadores.includes(p.OBSERVADOR)
      )
    }

    // Filtro por tipo
    if (filters.tipos.length > 0) {
      result = result.filter(p => 
        filters.tipos.includes(p.TIPO)
      )
    }

    // Filtro por ano
    if (filters.anos.length > 0) {
      result = result.filter(p => 
        filters.anos.includes(parseInt(p.ANO))
      )
    }

    // Filtro por data
    if (filters.dateRange.start) {
      result = result.filter(p => {
        const photoDate = new Date(p.DATA)
        return photoDate >= filters.dateRange.start!
      })
    }
    if (filters.dateRange.end) {
      result = result.filter(p => {
        const photoDate = new Date(p.DATA)
        return photoDate <= filters.dateRange.end!
      })
    }

    // Filtro por elevação
    result = result.filter(p => {
      const elevation = parseFloat(p.ELEVATION)
      if (isNaN(elevation)) return true
      return elevation >= filters.elevationRange.min && 
             elevation <= filters.elevationRange.max
    })

    return result
  }, [photos, filters, fuse])

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      observadores: [],
      tipos: [],
      dateRange: { start: null, end: null },
      elevationRange: filterOptions.elevationRange,
      anos: []
    })
  }

  return {
    filters,
    setFilters,
    filteredPhotos,
    filterOptions,
    resetFilters,
    totalPhotos: photos.length,
    filteredCount: filteredPhotos.length
  }
}
```

---

### 3. Componentes de UI (1-2 dias)

#### 3.1 SearchPanel aprimorado

Atualizar: `src/components/AntarcticaGlassPanel.tsx`

Adicionar componentes de filtro:

```typescript
// Componente de Multi-Select
function MultiSelect({ 
  label, 
  options, 
  selected, 
  onChange 
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (values: string[]) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-white/50 rounded-lg">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 p-1 rounded">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, option])
                } else {
                  onChange(selected.filter(v => v !== option))
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Componente de Range Slider
function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  unit = ''
}: {
  label: string
  min: number
  max: number
  value: { min: number; max: number }
  onChange: (value: { min: number; max: number }) => void
  unit?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-600">
          <span>{value.min}{unit}</span>
          <span>{value.max}{unit}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={(e) => onChange({ ...value, min: parseInt(e.target.value) })}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  )
}
```

#### 3.2 Lista de Resultados

Criar: `src/components/PhotoResultsList.tsx`

```typescript
'use client'

import { PhotoData } from '@/types'
import { useState } from 'react'

interface PhotoResultsListProps {
  photos: PhotoData[]
  onPhotoClick: (photo: PhotoData, index: number) => void
  totalCount: number
}

export function PhotoResultsList({ 
  photos, 
  onPhotoClick,
  totalCount 
}: PhotoResultsListProps) {
  const [page, setPage] = useState(0)
  const pageSize = 20
  const totalPages = Math.ceil(photos.length / pageSize)
  
  const displayedPhotos = photos.slice(
    page * pageSize, 
    (page + 1) * pageSize
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <h3 className="text-lg font-bold">
          Resultados: {photos.length} de {totalCount}
        </h3>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {displayedPhotos.map((photo, index) => {
          const url = photo.URL && photo.URL.includes('/d/') 
            ? photo.URL.split('/d/')[1].split('/')[0] 
            : ''
          const thumbnailUrl = url 
            ? `https://drive.google.com/thumbnail?id=${url}&sz=w200`
            : '/placeholder.jpg'

          return (
            <div
              key={`${photo.NÚMERO}-${index}`}
              onClick={() => onPhotoClick(photo, page * pageSize + index)}
              className="
                bg-white rounded-lg shadow-sm hover:shadow-md 
                transition-all cursor-pointer p-3 flex gap-3
                border border-slate-200 hover:border-blue-400
              "
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 bg-slate-100 rounded overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt={`Foto ${photo.NÚMERO}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.jpg'
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate">
                  Foto #{photo.NÚMERO}
                </h4>
                <p className="text-xs text-slate-600 truncate">
                  {photo.TIPO} • {photo.DATA}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {photo.OBSERVADOR}
                </p>
                <p className="text-xs text-slate-400">
                  {parseFloat(photo.LATITUDE).toFixed(4)}, {parseFloat(photo.LONGITUDE).toFixed(4)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="p-4 border-t bg-white flex justify-between items-center">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Anterior
          </button>
          
          <span className="text-sm text-slate-600">
            Página {page + 1} de {totalPages}
          </span>

          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
```

---

### 4. Integração com o Mapa (1 dia)

#### 4.1 Atualizar AntarcticaMap.tsx

Modificar o componente para:

1. **Carregar todos os dados do CSV uma vez**
2. **Aplicar filtros aos marcadores**
3. **Atualizar marcadores quando filtros mudarem**
4. **Destacar foto selecionada**

Exemplo de lógica:

```typescript
// No AntarcticaMap.tsx
const [allPhotos, setAllPhotos] = useState<PhotoData[]>([])
const {
  filters,
  setFilters,
  filteredPhotos,
  filterOptions,
  resetFilters
} = usePhotoFilters(allPhotos)

// Ao invés de adicionar todos os marcadores de uma vez,
// adicionar apenas os filtrados
useEffect(() => {
  if (!map || !markers) return
  
  // Limpar marcadores existentes
  markers.clearLayers()
  
  // Adicionar apenas fotos filtradas
  filteredPhotos.forEach(photo => {
    const marker = createMarker(photo) // função helper
    markers.addLayer(marker)
  })
}, [filteredPhotos, map, markers])
```

---

### 5. Testes & Refinamento (1-2 dias)

#### 5.1 Testes manuais
- [ ] Busca por texto funciona
- [ ] Filtros múltiplos funcionam juntos
- [ ] Reset de filtros limpa tudo
- [ ] Performance com 2000+ fotos é aceitável
- [ ] UI é responsiva em mobile
- [ ] Acessibilidade (navegação por teclado)

#### 5.2 Otimizações
- [ ] Debounce na busca por texto (300ms)
- [ ] Memoização de cálculos pesados
- [ ] Lazy loading de thumbnails
- [ ] Virtual scrolling se lista for muito longa

---

## 📦 Sprint 2: Exportação de Dados (Semanas 3-4)

### Objetivo
Implementar exportação de dados filtrados em múltiplos formatos.

---

### 1. Setup (1 dia)

#### 1.1 Instalar dependências
```bash
npm install xlsx jspdf jspdf-autotable file-saver
npm install --save-dev @types/file-saver
```

---

### 2. Serviços de Exportação (2-3 dias)

#### 2.1 Criar serviço de exportação

Criar: `src/lib/exportService.ts`

```typescript
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { PhotoData } from '@/types'

export class ExportService {
  
  static async exportToCSV(photos: PhotoData[], filename = 'antartica-photos.csv') {
    // Converter para formato CSV
    const headers = Object.keys(photos[0])
    const csvContent = [
      headers.join(','),
      ...photos.map(photo => 
        headers.map(h => `"${photo[h as keyof PhotoData] || ''}"`).join(',')
      )
    ].join('\n')

    // Adicionar BOM para Excel reconhecer UTF-8
    const blob = new Blob(['\uFEFF' + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    })
    
    saveAs(blob, filename)
  }

  static async exportToXLSX(photos: PhotoData[], filename = 'antartica-photos.xlsx') {
    // Criar workbook
    const wb = XLSX.utils.book_new()

    // Planilha 1: Dados principais
    const ws1 = XLSX.utils.json_to_sheet(photos)
    XLSX.utils.book_append_sheet(wb, ws1, 'Fotografias')

    // Planilha 2: Estatísticas
    const stats = this.calculateStats(photos)
    const ws2 = XLSX.utils.json_to_sheet(stats)
    XLSX.utils.book_append_sheet(wb, ws2, 'Estatísticas')

    // Planilha 3: Metadados do projeto
    const metadata = [
      { Campo: 'Total de Fotos', Valor: photos.length },
      { Campo: 'Data de Exportação', Valor: new Date().toLocaleDateString('pt-BR') },
      { Campo: 'Projeto', Valor: 'WebMapa Antártica - Baía do Almirantado' },
      { Campo: 'Instituição', Valor: 'IFRS' }
    ]
    const ws3 = XLSX.utils.json_to_sheet(metadata)
    XLSX.utils.book_append_sheet(wb, ws3, 'Metadados')

    // Salvar
    XLSX.writeFile(wb, filename)
  }

  static async exportToPDF(photos: PhotoData[], filename = 'antartica-photos.pdf') {
    const doc = new jsPDF('landscape')

    // Título
    doc.setFontSize(18)
    doc.text('Fotografias Georreferenciadas - Antártica', 14, 20)
    
    doc.setFontSize(11)
    doc.text('Baía do Almirantado, Ilha Rei George', 14, 28)
    doc.text(`Total de registros: ${photos.length}`, 14, 35)
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, 42)

    // Tabela
    autoTable(doc, {
      startY: 50,
      head: [['#', 'Tipo', 'Data', 'Observador', 'Latitude', 'Longitude', 'Elevação (m)']],
      body: photos.map(photo => [
        photo.NÚMERO,
        photo.TIPO,
        photo.DATA,
        photo.OBSERVADOR,
        parseFloat(photo.LATITUDE.replace(',', '.')).toFixed(6),
        parseFloat(photo.LONGITUDE.replace(',', '.')).toFixed(6),
        parseFloat(photo.ELEVATION.replace(',', '.')).toFixed(2)
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [14, 165, 233] }
    })

    // Rodapé
    const pageCount = (doc as any).internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      )
    }

    doc.save(filename)
  }

  static async exportToGeoJSON(photos: PhotoData[], filename = 'antartica-photos.geojson') {
    const geojson = {
      type: 'FeatureCollection',
      features: photos.map(photo => ({
        type: 'Feature',
        properties: {
          numero: photo.NÚMERO,
          tipo: photo.TIPO,
          data: photo.DATA,
          observador: photo.OBSERVADOR,
          elevacao: parseFloat(photo.ELEVATION.replace(',', '.')),
          ano: photo.ANO,
          url: photo.URL
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(photo.LONGITUDE.replace(',', '.')),
            parseFloat(photo.LATITUDE.replace(',', '.'))
          ]
        }
      }))
    }

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: 'application/geo+json'
    })
    
    saveAs(blob, filename)
  }

  private static calculateStats(photos: PhotoData[]) {
    const tipoCount: Record<string, number> = {}
    const observadorCount: Record<string, number> = {}
    const anoCount: Record<string, number> = {}

    photos.forEach(photo => {
      // Contar por tipo
      tipoCount[photo.TIPO] = (tipoCount[photo.TIPO] || 0) + 1
      
      // Contar por observador
      observadorCount[photo.OBSERVADOR] = (observadorCount[photo.OBSERVADOR] || 0) + 1
      
      // Contar por ano
      anoCount[photo.ANO] = (anoCount[photo.ANO] || 0) + 1
    })

    return [
      { Categoria: 'Total de Fotos', Valor: photos.length },
      { Categoria: '', Valor: '' },
      { Categoria: 'Por Tipo', Valor: '' },
      ...Object.entries(tipoCount).map(([tipo, count]) => ({
        Categoria: tipo,
        Valor: count
      })),
      { Categoria: '', Valor: '' },
      { Categoria: 'Por Observador', Valor: '' },
      ...Object.entries(observadorCount).map(([obs, count]) => ({
        Categoria: obs,
        Valor: count
      })),
      { Categoria: '', Valor: '' },
      { Categoria: 'Por Ano', Valor: '' },
      ...Object.entries(anoCount).map(([ano, count]) => ({
        Categoria: ano,
        Valor: count
      }))
    ]
  }
}
```

#### 2.2 Atualizar ExportPanel

Modificar `src/components/AntarcticaGlassPanel.tsx`:

```typescript
export function ExportPanel({
  title,
  onClose,
  photos, // receber fotos filtradas
  onExport
}: {
  title: string
  onClose: () => void
  photos: PhotoData[]
  onExport: (type: string) => void
}) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState<string | null>(null)

  const handleExport = async (type: string) => {
    setIsExporting(true)
    setExportType(type)
    
    try {
      switch (type) {
        case 'csv':
          await ExportService.exportToCSV(photos)
          break
        case 'xlsx':
          await ExportService.exportToXLSX(photos)
          break
        case 'pdf':
          await ExportService.exportToPDF(photos)
          break
        case 'geojson':
          await ExportService.exportToGeoJSON(photos)
          break
      }
      onExport(type)
    } catch (error) {
      console.error('Erro ao exportar:', error)
      alert('Erro ao exportar dados. Tente novamente.')
    } finally {
      setIsExporting(false)
      setExportType(null)
    }
  }

  return (
    <GlassCard title={title} onClose={onClose}>
      <div className="p-6 space-y-4">
        <p className="text-sm text-slate-600">
          Exportar {photos.length} fotografias selecionadas
        </p>

        {/* Botões de exportação */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { type: 'csv', label: 'CSV', icon: '📄', description: 'Para Excel' },
            { type: 'xlsx', label: 'XLSX', icon: '📊', description: 'Excel com gráficos' },
            { type: 'pdf', label: 'PDF', icon: '📕', description: 'Relatório formatado' },
            { type: 'geojson', label: 'GeoJSON', icon: '🗺️', description: 'Para GIS' }
          ].map(({ type, label, icon, description }) => (
            <button
              key={type}
              onClick={() => handleExport(type)}
              disabled={isExporting}
              className="
                p-4 rounded-lg border-2 border-slate-200 
                hover:border-blue-400 hover:bg-blue-50
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all text-left
              "
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-semibold text-slate-800">{label}</div>
              <div className="text-xs text-slate-500">{description}</div>
              
              {isExporting && exportType === type && (
                <div className="mt-2 text-xs text-blue-600">
                  Exportando...
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Opções adicionais */}
        <div className="pt-4 border-t space-y-2">
          <h4 className="font-semibold text-sm text-slate-700">
            Opções de Exportação
          </h4>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-slate-600">
              Incluir metadados completos
            </span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-slate-600">
              Incluir estatísticas
            </span>
          </label>
        </div>
      </div>
    </GlassCard>
  )
}
```

---

## 🧪 Testes Recomendados

### Testes Unitários
```bash
# Instalar
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Testar
- usePhotoFilters hook
- ExportService métodos
- Componentes de filtro
```

### Testes E2E
```bash
# Instalar
npm install --save-dev @playwright/test

# Testar
- Fluxo completo de busca
- Exportação de dados
- Navegação no mapa
```

---

## 📊 Métricas de Sucesso - Sprint 1 & 2

- [ ] Busca retorna resultados em < 500ms
- [ ] Filtros podem ser combinados sem travamentos
- [ ] Exportação CSV funciona para 2000+ fotos
- [ ] Exportação XLSX tem múltiplas planilhas
- [ ] Exportação PDF é legível e bem formatada
- [ ] GeoJSON é válido e pode ser importado no QGIS
- [ ] UI é intuitiva (teste com 3 usuários)

---

## 🐛 Troubleshooting Comum

### Problema: Busca muito lenta
**Solução:** 
- Adicionar debounce de 300ms
- Usar `useMemo` para resultados
- Considerar Web Workers para busca em background

### Problema: Exportação trava o navegador
**Solução:**
- Processar em chunks
- Mostrar loading state
- Usar Web Workers para processamento

### Problema: Coordenadas incorretas no GeoJSON
**Solução:**
- Verificar ordem (lng, lat) vs (lat, lng)
- Garantir conversão de vírgula para ponto
- Validar com GeoJSON validator online

---

## 📞 Suporte & Recursos

- **Leaflet Docs:** https://leafletjs.com/reference.html
- **Fuse.js Docs:** https://fusejs.io/
- **SheetJS Docs:** https://docs.sheetjs.com/
- **jsPDF Docs:** https://artskydj.github.io/jsPDF/docs/

---

## ✅ Definition of Done

Uma feature está completa quando:
- [ ] Código implementado e testado
- [ ] Sem erros de TypeScript
- [ ] Responsivo (mobile + desktop)
- [ ] Acessível (ARIA labels)
- [ ] Performance aceitável (< 3s loading)
- [ ] Documentação atualizada
- [ ] Code review aprovado

---

**Boa sorte! 🚀**

*Dúvidas? Consulte o ROADMAP.md para visão geral do projeto.*

