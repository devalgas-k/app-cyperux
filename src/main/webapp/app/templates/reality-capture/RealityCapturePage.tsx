"use client"

import { useState } from "react"
import { 
  Scan,
  Ruler,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Eye,
  EyeOff,
  Download,
  Upload,
  Camera,
  Box,
  CheckCircle,
  AlertTriangle,
  X,
  Sparkles,
  Send,
  MessageSquare,
  Move,
  Target,
  Crosshair,
  Image,
  Compass,
  ChevronLeft,
  ChevronRight,
  MapPin,
  GitCompare,
  Cuboid,
  Play,
  Pause
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Slider } from "@/shared/components/ui/slider"
import { Separator } from "@/shared/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group"

// 360 Photo locations with hotspots
const photoLocations = [
  { 
    id: "LOC-001", 
    name: "Hall Entrée RDC", 
    date: "05/05/2026",
    hotspots: [
      { id: 1, x: 25, y: 40, label: "Escalier Principal", target: "LOC-002" },
      { id: 2, x: 70, y: 50, label: "Accueil", target: "LOC-003" },
      { id: 3, x: 45, y: 30, label: "Ascenseurs", target: "LOC-004" },
    ]
  },
  { 
    id: "LOC-002", 
    name: "Escalier R+1", 
    date: "05/05/2026",
    hotspots: [
      { id: 1, x: 20, y: 60, label: "Retour Hall", target: "LOC-001" },
      { id: 2, x: 80, y: 45, label: "Palier R+1", target: "LOC-005" },
    ]
  },
  { 
    id: "LOC-003", 
    name: "Zone Accueil", 
    date: "04/05/2026",
    hotspots: [
      { id: 1, x: 15, y: 50, label: "Hall Entrée", target: "LOC-001" },
    ]
  },
  { 
    id: "LOC-004", 
    name: "Palier Ascenseurs", 
    date: "04/05/2026",
    hotspots: [
      { id: 1, x: 30, y: 55, label: "Hall Entrée", target: "LOC-001" },
      { id: 2, x: 75, y: 40, label: "Couloir Est", target: "LOC-005" },
    ]
  },
  { 
    id: "LOC-005", 
    name: "Couloir Est R+1", 
    date: "03/05/2026",
    hotspots: [
      { id: 1, x: 10, y: 50, label: "Ascenseurs", target: "LOC-004" },
    ]
  },
]

const measurements = [
  { id: 1, type: "distance", value: "4.52m", label: "Largeur couloir", date: "05/05/2026" },
  { id: 2, type: "volume", value: "14.5m³", label: "Béton coulé Zone A", date: "05/05/2026" },
  { id: 3, type: "distance", value: "2.80m", label: "Hauteur sous plafond", date: "04/05/2026" },
  { id: 4, type: "volume", value: "8.2m³", label: "Excavation Fosse", date: "03/05/2026" },
]

const scans = [
  { id: "SCAN-001", name: "R+2 Complet", date: "05/05/2026", points: "12.4M", size: "2.1 GB", status: "processed" },
  { id: "SCAN-002", name: "Façade Nord", date: "04/05/2026", points: "8.7M", size: "1.4 GB", status: "processed" },
  { id: "SCAN-003", name: "Parking -1", date: "03/05/2026", points: "15.2M", size: "2.8 GB", status: "processing" },
]

export default function RealityCapturePage() {
  const [viewMode, setViewMode] = useState<"360" | "lidar" | "plan">("360")
  const [currentLocation, setCurrentLocation] = useState(photoLocations[0])
  const [showPointCloud, setShowPointCloud] = useState(true)
  const [showDeviations, setShowDeviations] = useState(true)
  const [selectedTool, setSelectedTool] = useState("view")
  const [pointSize, setPointSize] = useState([2])
  const [rotation, setRotation] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [showBIMCompare, setShowBIMCompare] = useState(false)
  const [activeMeasurement, setActiveMeasurement] = useState<{type: string, value: string} | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "Le volume de béton coulé hier est de 14.5m³, soit une variation de 2% par rapport au plan. Conforme. Voulez-vous que j'ajoute cette mesure au rapport de suivi ?" }
  ])
  const [aiInput, setAiInput] = useState("")

  const handleHotspotClick = (targetId: string) => {
    const target = photoLocations.find(loc => loc.id === targetId)
    if (target) {
      setCurrentLocation(target)
    }
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "Mesure ajoutée au rapport hebdomadaire. Le cumul de béton coulé cette semaine est de 42.8m³, conforme aux prévisions du planning à 98%. La prochaine coulée est prévue vendredi Zone B (estimation: 18m³)." }
    ])
    setAiInput("")
  }

  const handleMeasure = (type: string) => {
    if (type === "distance") {
      setActiveMeasurement({ type: "distance", value: "2.54m" })
    } else {
      setActiveMeasurement({ type: "volume", value: "14.5m³" })
    }
  }

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reality Capture & Nuage de Points</h1>
          <p className="text-muted-foreground">Photos 360°, LiDAR et analyse dimensionnelle</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowBIMCompare(true)}>
            <GitCompare className="h-4 w-4" />
            Comparer avec BIM
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Importer Scan
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Exporter Rapport
          </Button>
        </div>
      </div>

      <div className="flex-1 grid gap-4 lg:grid-cols-4">
        {/* Left Panel - Navigation & Layers */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* View Mode Tabs */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="360" className="text-xs">
                  <Camera className="h-3 w-3 mr-1" />
                  360°
                </TabsTrigger>
                <TabsTrigger value="lidar" className="text-xs">
                  <Scan className="h-3 w-3 mr-1" />
                  LiDAR
                </TabsTrigger>
                <TabsTrigger value="plan" className="text-xs">
                  <img className="h-3 w-3 mr-1" />
                  Plan 2D
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Separator />

            {/* Photo Locations */}
            {viewMode === "360" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Points de Vue</Label>
                {photoLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setCurrentLocation(loc)}
                    className={`w-full p-2 rounded-lg text-left text-xs transition-colors ${
                      currentLocation.id === loc.id
                        ? "bg-primary/20 border border-primary/50"
                        : "bg-muted/30 border border-border/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{loc.name}</span>
                      <MapPin className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{loc.date}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Layer Controls */}
            {(viewMode === "lidar" || viewMode === "plan") && (
              <>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Calques</Label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-violet-500" />
                      <Label className="text-sm">Nuage de Points</Label>
                    </div>
                    <Switch checked={showPointCloud} onCheckedChange={setShowPointCloud} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-red-500" />
                      <Label className="text-sm">Écarts détectés</Label>
                    </div>
                    <Switch checked={showDeviations} onCheckedChange={setShowDeviations} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Taille des points</Label>
                  <Slider 
                    value={pointSize} 
                    onValueChange={setPointSize}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>
              </>
            )}

            <Separator />

            {/* Recent Scans */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Scans Récents</Label>
              {scans.map((scan) => (
                <div key={scan.id} className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{scan.name}</span>
                    {scan.status === "processed" ? (
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <span>{scan.points} pts</span>
                    <span>•</span>
                    <span>{scan.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Viewport */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 overflow-hidden">
          <div className="relative h-full min-h-[500px]">
            {/* Toolbar */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <ToggleGroup type="single" value={selectedTool} onValueChange={(v) => v && setSelectedTool(v)}>
                <ToggleGroupItem value="view" className="h-8 w-8 p-0" title="Navigation">
                  <Move className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="distance" className="h-8 w-8 p-0" title="Mesure Distance" onClick={() => handleMeasure("distance")}>
                  <Ruler className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="volume" className="h-8 w-8 p-0" title="Mesure Volume" onClick={() => handleMeasure("volume")}>
                  <Cuboid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="select" className="h-8 w-8 p-0" title="Sélection">
                  <Target className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="absolute top-4 right-4 z-10 flex gap-1">
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => setRotation(0)}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* 360 Photo Viewer */}
            {viewMode === "360" && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden">
                {/* Simulated 360 panorama with gradient background */}
                <div 
                  className="absolute inset-0 transition-transform duration-300"
                  style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  {/* Floor pattern */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#2d2d44] to-transparent opacity-60" />
                  
                  {/* Walls simulation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Construction elements */}
                      <div className="absolute left-1/4 top-1/4 w-32 h-48 bg-gradient-to-b from-gray-600/40 to-gray-700/40 border border-gray-500/30 rounded-sm" />
                      <div className="absolute right-1/4 top-1/3 w-24 h-40 bg-gradient-to-b from-gray-600/40 to-gray-700/40 border border-gray-500/30 rounded-sm" />
                      <div className="absolute left-1/3 bottom-1/4 w-40 h-20 bg-gradient-to-t from-gray-700/50 to-gray-600/30 border border-gray-500/30" />
                      
                      {/* Ceiling beams */}
                      <div className="absolute top-10 left-0 right-0 h-4 bg-gradient-to-b from-gray-800/60 to-transparent flex gap-20 px-10">
                        <div className="flex-1 bg-gray-600/30 rounded-b" />
                        <div className="flex-1 bg-gray-600/30 rounded-b" />
                        <div className="flex-1 bg-gray-600/30 rounded-b" />
                      </div>
                    </div>
                  </div>

                  {/* Hotspots */}
                  {currentLocation.hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      onClick={() => handleHotspotClick(hotspot.target)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    >
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-primary/80 border-2 border-white/80 flex items-center justify-center animate-pulse shadow-lg shadow-primary/50">
                          <ChevronRight className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                          <Badge className="bg-background/90 text-foreground border border-border shadow-lg">
                            {hotspot.label}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Rotation Controls */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => setRotation(r => r - 45)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon"
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                  >
                    {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="secondary" size="icon" onClick={() => setRotation(r => r + 45)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Location Info */}
                <div className="absolute top-16 left-4">
                  <Badge variant="secondary" className="text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {currentLocation.name}
                  </Badge>
                </div>
              </div>
            )}

            {/* LiDAR/Plan 2D with Point Cloud Overlay */}
            {(viewMode === "lidar" || viewMode === "plan") && (
              <div className="absolute inset-0 bg-[#0a0a0f]">
                {/* Grid floor */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="lidarGrid2" width="5" height="5" patternUnits="userSpaceOnUse">
                        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#593196" strokeWidth="0.1"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#lidarGrid2)" />
                  </svg>
                </div>

                {/* 2D Plan Background */}
                {viewMode === "plan" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-80 h-60 border-2 border-blue-500/40 bg-blue-500/5">
                      {/* Rooms */}
                      <div className="absolute top-0 left-0 w-1/2 h-1/2 border-r border-b border-blue-500/30">
                        <span className="absolute top-1 left-1 text-[10px] text-blue-400">Bureau 101</span>
                      </div>
                      <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-blue-500/30">
                        <span className="absolute top-1 left-1 text-[10px] text-blue-400">Bureau 102</span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-2/3 h-1/2 border-r border-blue-500/30">
                        <span className="absolute top-1 left-1 text-[10px] text-blue-400">Open Space</span>
                      </div>
                      <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
                        <span className="absolute top-1 left-1 text-[10px] text-blue-400">Sanitaires</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Point Cloud Overlay */}
                {showPointCloud && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-80 h-60">
                      {Array.from({ length: 300 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            width: `${pointSize[0]}px`,
                            height: `${pointSize[0]}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: `hsl(${270 + Math.random() * 30}, 70%, ${50 + Math.random() * 20}%)`,
                            opacity: 0.6 + Math.random() * 0.4,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Deviation Markers */}
                {showDeviations && (
                  <>
                    <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2">
                      <div className="relative">
                        <div className="h-12 w-2 bg-emerald-500/60 rounded" />
                        <Badge variant="outline" className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] border-emerald-500 text-emerald-400">
                          <CheckCircle className="h-2 w-2 mr-1" />
                          OK
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-1/3">
                      <div className="relative">
                        <div className="h-12 w-2 bg-red-500/60 rounded animate-pulse" />
                        <Badge variant="destructive" className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px]">
                          <AlertTriangle className="h-2 w-2 mr-1" />
                          +2.1cm
                        </Badge>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Measurement Display */}
            {activeMeasurement && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                <Card className="border-primary/50 bg-card/95 shadow-xl">
                  <CardContent className="py-3 px-4 flex items-center gap-4">
                    {activeMeasurement.type === "distance" ? (
                      <Ruler className="h-5 w-5 text-primary" />
                    ) : (
                      <Cuboid className="h-5 w-5 text-emerald-400" />
                    )}
                    <div>
                      <span className="text-3xl font-mono font-bold">{activeMeasurement.value}</span>
                    </div>
                    <Badge variant={activeMeasurement.type === "distance" ? "default" : "secondary"} className={activeMeasurement.type === "volume" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" : ""}>
                      {activeMeasurement.type === "distance" ? "Distance" : "Volume"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setActiveMeasurement(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Status Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Points: 12.4M</span>
                <span>Densité: 2.5 pts/cm²</span>
                <span>Précision: ±2mm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Scan synchronisé</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Panel - Measurements & Tools */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Mesures & Analyse
            </CardTitle>
            <CardDescription>Outils de mesure haute précision</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-1"
                onClick={() => handleMeasure("distance")}
              >
                <Ruler className="h-5 w-5" />
                <span className="text-xs">Distance</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col gap-1"
                onClick={() => handleMeasure("volume")}
              >
                <Cuboid className="h-5 w-5" />
                <span className="text-xs">Volume</span>
              </Button>
            </div>

            <Separator />

            {/* Recent Measurements */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mesures Récentes</Label>
              {measurements.map((m) => (
                <div 
                  key={m.id} 
                  className="p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{m.label}</span>
                    {m.type === "distance" ? (
                      <Ruler className="h-3 w-3 text-primary" />
                    ) : (
                      <Cuboid className="h-3 w-3 text-emerald-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold">{m.value}</span>
                    <span className="text-xs text-muted-foreground">{m.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Conformity Summary */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="font-medium text-emerald-400">Conforme au Plan</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Volume béton coulé: 14.5m³
                <br />
                Écart: +2% (dans tolérance ±5%)
              </p>
            </div>

            <Button className="w-full">
              <Download className="mr-2 h-4 w-4 shrink-0" />
              <span className="truncate">Exporter Mesures</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* BIM Comparison Dialog */}
      <Dialog open={showBIMCompare} onOpenChange={setShowBIMCompare}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Comparaison As-Built vs As-Designed
            </DialogTitle>
            <DialogDescription>
              Visual Diff 3D entre le scan LiDAR et la maquette BIM
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 min-h-[400px]">
            {/* As-Built */}
            <div className="rounded-lg border border-border/50 bg-[#0a0a0f] p-4">
              <Badge className="mb-4">As-Built (LiDAR)</Badge>
              <div className="relative h-72 flex items-center justify-center">
                <div className="relative w-48 h-36 border-2 border-violet-500/60">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-violet-400"
                      style={{
                        width: "2px",
                        height: "2px",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                  {/* Deviation highlight */}
                  <div className="absolute top-1/4 right-0 w-2 h-12 bg-red-500/50 rounded" />
                </div>
              </div>
            </div>

            {/* As-Designed */}
            <div className="rounded-lg border border-border/50 bg-[#0a0a0f] p-4">
              <Badge variant="secondary" className="mb-4">As-Designed (BIM)</Badge>
              <div className="relative h-72 flex items-center justify-center">
                <div className="relative w-48 h-36 border-2 border-blue-500/60 bg-blue-500/10">
                  <div className="absolute top-0 left-1/3 w-px h-full bg-blue-500/40" />
                  <div className="absolute top-0 left-2/3 w-px h-full bg-blue-500/40" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-blue-500/40" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-blue-500/40" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="text-sm">Conforme: 94%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="text-sm">Alerte: 4%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <span className="text-sm">Écart: 2%</span>
              </div>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Rapport Écarts
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBIMCompare(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Assistant */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-primary/30 bg-card shadow-2xl shadow-primary/10">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Reality Capture</CardTitle>
                  <CardDescription className="text-xs">Analyse volumétrique IA</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 text-sm max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 pt-0 flex gap-2">
              <Input 
                placeholder="Question sur les mesures..." 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAI()}
                className="text-sm"
              />
              <Button size="icon" onClick={handleSendAI}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={() => setShowAIChat(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
