"use client"

import { useState, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  OrbitControls, 
  Grid, 
  Html, 
  Environment,
  PerspectiveCamera,
  Line
} from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Slider } from "@/shared/components/ui/slider"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { 
  Box, 
  Layers, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Eye,
  EyeOff,
  Scan,
  AlertTriangle,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  ScanLine,
  Building2,
  Ruler,
  TrendingUp
} from "lucide-react"

// Building element data with construction phases
const buildingElements = [
  { id: "Foundation_001", type: "Fondation", material: "Béton Armé C30/37", volume: 45.2, phase: 0, position: [0, 0.25, 0], size: [8, 0.5, 6], color: "#4a5568" },
  { id: "Wall_Ref_001", type: "Mur Porteur", material: "Béton Armé C25/30", volume: 18.6, phase: 1, position: [-3.75, 2, 0], size: [0.5, 3.5, 6], color: "#718096" },
  { id: "Wall_Ref_002", type: "Mur Porteur", material: "Béton Armé C25/30", volume: 18.6, phase: 1, position: [3.75, 2, 0], size: [0.5, 3.5, 6], color: "#718096" },
  { id: "Wall_Ref_003", type: "Mur Porteur", material: "Béton Armé C25/30", volume: 14.0, phase: 1, position: [0, 2, -2.75], size: [7, 3.5, 0.5], color: "#718096" },
  { id: "Wall_Ref_004", type: "Mur Porteur", material: "Béton Armé C25/30", volume: 12.4, phase: 1, position: [0, 2, 2.75], size: [7, 3.5, 0.5], color: "#718096", hasDeviation: true },
  { id: "Slab_001", type: "Dalle", material: "Béton Armé C30/37", volume: 24.0, phase: 2, position: [0, 3.75, 0], size: [8, 0.25, 6], color: "#a0aec0" },
  { id: "Column_001", type: "Poteau", material: "Béton Armé C35/45", volume: 0.98, phase: 1, position: [-2, 2, 0], size: [0.35, 3.5, 0.35], color: "#e53e3e" },
  { id: "Column_002", type: "Poteau", material: "Béton Armé C35/45", volume: 0.98, phase: 1, position: [2, 2, 0], size: [0.35, 3.5, 0.35], color: "#e53e3e" },
  { id: "Beam_001", type: "Poutre", material: "Acier S355", volume: 0.42, phase: 2, position: [0, 3.5, 0], size: [7, 0.4, 0.3], color: "#d69e2e" },
  { id: "Wall_Ext_001", type: "Façade", material: "Bardage Aluminium", volume: 8.4, phase: 3, position: [-4, 5.5, 0], size: [0.15, 3, 6], color: "#4299e1" },
  { id: "Wall_Ext_002", type: "Façade", material: "Bardage Aluminium", volume: 8.4, phase: 3, position: [4, 5.5, 0], size: [0.15, 3, 6], color: "#4299e1" },
  { id: "Roof_001", type: "Toiture", material: "Bac Acier", volume: 4.8, phase: 4, position: [0, 7.1, 0], size: [8.5, 0.2, 6.5], color: "#2d3748" },
]

// Timeline data
const timelineData = [
  { date: "Mai 2026", phase: 0, cost: 120000, carbon: 45 },
  { date: "Juil 2026", phase: 1, cost: 380000, carbon: 180 },
  { date: "Oct 2026", phase: 2, cost: 520000, carbon: 245 },
  { date: "Jan 2027", phase: 3, cost: 720000, carbon: 310 },
  { date: "Avr 2027", phase: 4, cost: 890000, carbon: 385 },
  { date: "Déc 2027", phase: 5, cost: 1200000, carbon: 420 },
]

// LiDAR point cloud for deviation visualization
function LiDARPointCloud({ visible, deviationElement }: { visible: boolean; deviationElement: typeof buildingElements[0] | null }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const { positions, colors } = useMemo(() => {
    if (!deviationElement) return { positions: new Float32Array(0), colors: new Float32Array(0) }
    
    const count = 2000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    
    const [x, y, z] = deviationElement.position as [number, number, number]
    const [sx, sy, sz] = deviationElement.size as [number, number, number]
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Add slight deviation (2cm = 0.02m)
      const deviation = (Math.random() - 0.5) * 0.04
      pos[i3] = x + (Math.random() - 0.5) * sx + deviation
      pos[i3 + 1] = y + (Math.random() - 0.5) * sy
      pos[i3 + 2] = z + (Math.random() - 0.5) * sz + deviation
      
      // Purple color for point cloud
      col[i3] = 0.6 + Math.random() * 0.2
      col[i3 + 1] = 0.2 + Math.random() * 0.1
      col[i3 + 2] = 0.8 + Math.random() * 0.2
    }
    
    return { positions: pos, colors: col }
  }, [deviationElement])

  useFrame((state) => {
    if (pointsRef.current && visible) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.01
    }
  })

  if (!visible || !deviationElement) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Building element component
function BuildingElement({ 
  element, 
  isSelected, 
  onClick, 
  currentPhase,
  showLidar 
}: { 
  element: typeof buildingElements[0]
  isSelected: boolean
  onClick: () => void
  currentPhase: number
  showLidar: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const isVisible = element.phase <= currentPhase
  const hasDeviation = element.hasDeviation && showLidar
  
  useFrame((state) => {
    if (meshRef.current && isVisible) {
      if (isSelected || hovered) {
        meshRef.current.scale.setScalar(1.02 + Math.sin(state.clock.elapsedTime * 3) * 0.01)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  if (!isVisible) return null

  return (
    <mesh
      ref={meshRef}
      position={element.position as [number, number, number]}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
    >
      <boxGeometry args={element.size as [number, number, number]} />
      <meshStandardMaterial 
        color={hasDeviation ? "#ef4444" : isSelected ? "#8b5cf6" : hovered ? "#a78bfa" : element.color}
        transparent
        opacity={isSelected || hovered ? 1 : 0.85}
        wireframe={hasDeviation}
      />
      {(isSelected || hovered) && (
        <Html
          position={[0, (element.size as [number, number, number])[1] / 2 + 0.5, 0]}
          center
          distanceFactor={10}
        >
          <div className="rounded-lg border border-border bg-background/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm">
            <p className="font-semibold text-foreground">{element.id}</p>
            <p className="text-muted-foreground">{element.type}</p>
            {hasDeviation && (
              <p className="mt-1 flex items-center gap-1 text-red-400">
                <AlertTriangle className="h-3 w-3" />
                Écart: 2cm
              </p>
            )}
          </div>
        </Html>
      )}
    </mesh>
  )
}

// Blueprint grid floor
function BlueprintGrid() {
  return (
    <>
      <Grid
        position={[0, 0, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1e3a5f"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#2563eb"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
      />
      {/* Blueprint measurement lines */}
      <Line
        points={[[-15, 0.01, 0], [15, 0.01, 0]]}
        color="#3b82f6"
        lineWidth={1}
        opacity={0.3}
        transparent
      />
      <Line
        points={[[0, 0.01, -15], [0, 0.01, 15]]}
        color="#3b82f6"
        lineWidth={1}
        opacity={0.3}
        transparent
      />
    </>
  )
}

// Camera controls component
function CameraController({ resetTrigger }: { resetTrigger: number }) {
  const { camera } = useThree()
  
  useMemo(() => {
    if (resetTrigger > 0) {
      camera.position.set(12, 10, 12)
      camera.lookAt(0, 2, 0)
    }
  }, [resetTrigger, camera])
  
  return null
}

// Main scene component
function Scene({ 
  selectedElement, 
  setSelectedElement, 
  currentPhase, 
  showLidar,
  resetCamera 
}: {
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  currentPhase: number
  showLidar: boolean
  resetCamera: number
}) {
  const deviationElement = buildingElements.find(e => e.hasDeviation) || null

  return (
    <>
      <CameraController resetTrigger={resetCamera} />
      <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={50} />
      <OrbitControls 
        makeDefault 
        minDistance={5} 
        maxDistance={50}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <directionalLight position={[-10, 10, -10]} intensity={0.3} />
      
      {/* Blueprint grid */}
      <BlueprintGrid />
      
      {/* Building elements */}
      {buildingElements.map((element) => (
        <BuildingElement
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
          currentPhase={currentPhase}
          showLidar={showLidar}
        />
      ))}
      
      {/* LiDAR point cloud overlay */}
      <LiDARPointCloud visible={showLidar} deviationElement={deviationElement} />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#0a1929", 20, 60]} />
    </>
  )
}

export default function DigitalTwinPage() {
  const [selectedElement, setSelectedElement] = useState<string | null>("Wall_Ref_004")
  const [currentPhase, setCurrentPhase] = useState(4)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLidar, setShowLidar] = useState(true)
  const [resetCamera, setResetCamera] = useState(0)
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const selectedData = buildingElements.find(e => e.id === selectedElement)
  const currentTimelineData = timelineData[Math.min(currentPhase, timelineData.length - 1)]

  // Animation control
  const togglePlay = () => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      playIntervalRef.current = setInterval(() => {
        setCurrentPhase(prev => {
          if (prev >= 5) {
            if (playIntervalRef.current) clearInterval(playIntervalRef.current)
            setIsPlaying(false)
            return 5
          }
          return prev + 1
        })
      }, 1500)
    }
  }

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat("fr-FR", { 
      style: "currency", 
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(cost)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Explorateur Jumeau Numérique</h1>
          <p className="text-sm text-muted-foreground">
            Tour Hekla - La Défense | Modèle BIM synchronisé en temps réel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-400">
            <ScanLine className="mr-1 h-3 w-3" />
            IFC 4.3
          </Badge>
          <Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
            <Building2 className="mr-1 h-3 w-3" />
            LOD 400
          </Badge>
        </div>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_320px]">
        {/* 3D Viewer */}
        <Card className="relative overflow-hidden border-blue-900/50 bg-[#0a1929]">
          {/* Blueprint grid background pattern */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
          />
          
          {/* Viewer controls */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-blue-800/50 bg-background/80 backdrop-blur-sm"
              onClick={() => setResetCamera(prev => prev + 1)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* LiDAR toggle */}
          <div className="absolute left-3 top-3 z-10">
            <Card className="border-purple-800/50 bg-background/90 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <Scan className="h-4 w-4 text-purple-400" />
                <Label htmlFor="lidar-toggle" className="text-sm">
                  LiDAR As-Built
                </Label>
                <Switch
                  id="lidar-toggle"
                  checked={showLidar}
                  onCheckedChange={setShowLidar}
                  className="data-[state=checked]:bg-purple-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* Deviation alert */}
          {showLidar && (
            <div className="absolute bottom-24 left-3 z-10">
              <Card className="border-2 border-red-500/60 bg-red-950/95 backdrop-blur-sm shadow-lg shadow-red-500/20 animate-pulse-slow">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/30">
                      <AlertTriangle className="h-4 w-4 text-red-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-200">Ecart Detecte</p>
                      <p className="text-xs text-red-300/90">Wall_Ref_004</p>
                    </div>
                    <Badge variant="destructive" className="ml-2 text-xs font-bold">
                      2cm
                    </Badge>
                  </div>
                  <p className="text-xs text-red-200/80">
                    Comparaison As-Built vs As-Designed
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 3D Canvas */}
          <div className="h-full min-h-[500px]">
            <Canvas shadows>
              <Suspense fallback={null}>
                <Scene
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                  currentPhase={currentPhase}
                  showLidar={showLidar}
                  resetCamera={resetCamera}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* 5D Timeline */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-blue-900/50 bg-background/95 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentPhase(0)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button 
                  variant={isPlaying ? "default" : "outline"}
                  size="icon" 
                  className="h-8 w-8"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setCurrentPhase(5)}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                <span className="ml-2 text-sm font-medium">{currentTimelineData.date}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Coût Cumulé</p>
                  <p className="text-sm font-semibold text-blue-400">
                    {formatCost(currentTimelineData.cost)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Carbone Cumulé</p>
                  <p className="text-sm font-semibold text-emerald-400">
                    {currentTimelineData.carbon} tCO2e
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline scrubber */}
            <div className="relative">
              <Slider
                value={[currentPhase]}
                onValueChange={([value]) => setCurrentPhase(value)}
                max={5}
                step={1}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                {timelineData.map((data, idx) => (
                  <span 
                    key={data.date} 
                    className={currentPhase >= idx ? "text-blue-400" : ""}
                  >
                    {data.date}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          {/* Element Properties */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Box className="h-4 w-4 text-blue-400" />
                Propriétés de l&apos;Élément
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedData ? (
                <>
                  <div className="rounded-lg border border-blue-900/50 bg-blue-950/30 p-3">
                    <p className="text-lg font-semibold">{selectedData.id}</p>
                    <p className="text-sm text-muted-foreground">{selectedData.type}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Matériau</p>
                      <p className="text-sm font-medium">{selectedData.material}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Volume</p>
                      <p className="text-sm font-medium">{selectedData.volume} m³</p>
                    </div>
                  </div>
                  {selectedData.hasDeviation && showLidar && (
                    <div className="rounded-lg border-2 border-red-500/60 bg-red-950/50 p-3 animate-pulse-slow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-sm font-semibold text-red-200">Ecart Geometrique</p>
                        <Badge variant="destructive" className="ml-auto text-xs font-bold">
                          CRITIQUE
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-red-300">2cm</span>
                        <span className="text-sm text-red-300/90">de deviation</span>
                      </div>
                      <p className="text-xs text-red-200/80">
                        Detectee par scan LiDAR du 15/04/2026
                      </p>
                      <p className="mt-2 text-xs text-red-300/70 flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        Tolerance: +/- 1cm | Depassement: +1cm
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Info className="mb-2 h-8 w-8 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur un élément dans la vue 3D pour voir ses propriétés
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Model Layers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-blue-400" />
                Couches du Modèle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  <TabsTrigger value="phases">Phases</TabsTrigger>
                </TabsList>
                <TabsContent value="structure" className="mt-3 space-y-2">
                  {[
                    { name: "Fondations", count: 1, color: "#4a5568" },
                    { name: "Murs Porteurs", count: 4, color: "#718096" },
                    { name: "Poteaux", count: 2, color: "#e53e3e" },
                    { name: "Poutres", count: 1, color: "#d69e2e" },
                    { name: "Dalles", count: 1, color: "#a0aec0" },
                    { name: "Façades", count: 2, color: "#4299e1" },
                    { name: "Toiture", count: 1, color: "#2d3748" },
                  ].map((layer) => (
                    <div 
                      key={layer.name}
                      className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded"
                          style={{ backgroundColor: layer.color }}
                        />
                        <span className="text-sm">{layer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="h-5 text-xs">
                          {layer.count}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="phases" className="mt-3 space-y-2">
                  {[
                    { name: "Phase 0: Fondations", status: "Terminé", color: "emerald" },
                    { name: "Phase 1: Gros Œuvre", status: "Terminé", color: "emerald" },
                    { name: "Phase 2: Planchers", status: "Terminé", color: "emerald" },
                    { name: "Phase 3: Façades", status: "En cours", color: "blue" },
                    { name: "Phase 4: Toiture", status: "Planifié", color: "gray" },
                  ].map((phase, idx) => (
                    <div 
                      key={phase.name}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        currentPhase >= idx ? "bg-blue-950/30" : "bg-muted/30"
                      }`}
                    >
                      <span className="text-sm">{phase.name}</span>
                      <Badge 
                        variant="outline"
                        className={
                          phase.color === "emerald" 
                            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                            : phase.color === "blue"
                            ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                            : "border-gray-500/50 bg-gray-500/10 text-gray-400"
                        }
                      >
                        {phase.status}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                Métriques 5D
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-blue-950/30 p-3 text-center">
                <Ruler className="mx-auto mb-1 h-5 w-5 text-blue-400" />
                <p className="text-lg font-bold">143.4</p>
                <p className="text-xs text-muted-foreground">Volume Total (m³)</p>
              </div>
              <div className="rounded-lg bg-emerald-950/30 p-3 text-center">
                <TrendingUp className="mx-auto mb-1 h-5 w-5 text-emerald-400" />
                <p className="text-lg font-bold">{currentTimelineData.carbon}</p>
                <p className="text-xs text-muted-foreground">tCO2e Cumulé</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
