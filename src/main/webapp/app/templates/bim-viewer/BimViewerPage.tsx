"use client"

import { useState, useRef, Suspense, useMemo } from "react"
import { toast } from "sonner"
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
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  ChevronRight,
  ChevronDown,
  CircleDot,
  Square,
  Hexagon,
  PipetteIcon,
  Building,
  Workflow,
  Euro,
  Leaf,
  MessageSquare,
  X,
  Sparkles,
  Send,
  FileWarning
} from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"

// IFC Element types with hierarchy
const ifcCategories = [
  {
    id: "structural",
    name: "Structure",
    icon: Building,
    expanded: true,
    elements: [
      { id: "Foundation_001", name: "Fondation_Radier", type: "IfcSlab", visible: true },
      { id: "Column_001", name: "Poteau_A1", type: "IfcColumn", visible: true },
      { id: "Column_002", name: "Poteau_A2", type: "IfcColumn", visible: true },
      { id: "Column_003", name: "Poteau_B1", type: "IfcColumn", visible: true },
      { id: "Column_004", name: "Poteau_B2", type: "IfcColumn", visible: true },
      { id: "Beam_001", name: "Poutre_Principale_R+2", type: "IfcBeam", visible: true, hasCollision: true },
    ]
  },
  {
    id: "walls",
    name: "Murs",
    icon: Square,
    expanded: true,
    elements: [
      { id: "Wall_Ref_001", name: "Mur_Porteur_Nord", type: "IfcWall", visible: true },
      { id: "Wall_Ref_002", name: "Mur_Porteur_Sud", type: "IfcWall", visible: true },
      { id: "Wall_Ref_003", name: "Mur_Porteur_Est", type: "IfcWall", visible: true },
      { id: "Wall_Ref_004", name: "Mur_Porteur_Ouest", type: "IfcWall", visible: true },
      { id: "Wall_Int_001", name: "Cloison_Int_01", type: "IfcWall", visible: true },
    ]
  },
  {
    id: "slabs",
    name: "Dalles",
    icon: Layers,
    expanded: false,
    elements: [
      { id: "Slab_RDC", name: "Dalle_RDC", type: "IfcSlab", visible: true },
      { id: "Slab_R1", name: "Dalle_R+1", type: "IfcSlab", visible: true },
      { id: "Slab_R2", name: "Dalle_R+2", type: "IfcSlab", visible: true },
    ]
  },
  {
    id: "mep",
    name: "Réseaux CVC",
    icon: Workflow,
    expanded: false,
    elements: [
      { id: "HVAC_Duct_001", name: "Gaine_CVC_Principal", type: "IfcDuctSegment", visible: true, hasCollision: true },
      { id: "HVAC_Duct_002", name: "Gaine_CVC_Secondaire", type: "IfcDuctSegment", visible: true },
      { id: "Pipe_001", name: "Canalisation_EU", type: "IfcPipeSegment", visible: true },
    ]
  },
]

// Building elements with full properties
const buildingElements: Record<string, {
  id: string
  name: string
  type: string
  material: string
  volume: number
  surface?: number
  weight?: number
  unitCost: number
  carbonIntensity: number
  phase: number
  position: [number, number, number]
  size: [number, number, number]
  color: string
  hasCollision?: boolean
  collisionWith?: string
}> = {
  "Foundation_001": { id: "Foundation_001", name: "Fondation_Radier", type: "IfcSlab", material: "Béton Armé C30/37", volume: 120.5, surface: 240, weight: 289200, unitCost: 185, carbonIntensity: 280, phase: 0, position: [0, 0.3, 0], size: [16, 0.6, 12], color: "#4a5568" },
  "Column_001": { id: "Column_001", name: "Poteau_A1", type: "IfcColumn", material: "Béton Armé C40/50", volume: 1.8, weight: 4320, unitCost: 420, carbonIntensity: 310, phase: 1, position: [-6, 3, -4], size: [0.5, 5.4, 0.5], color: "#ef4444" },
  "Column_002": { id: "Column_002", name: "Poteau_A2", type: "IfcColumn", material: "Béton Armé C40/50", volume: 1.8, weight: 4320, unitCost: 420, carbonIntensity: 310, phase: 1, position: [6, 3, -4], size: [0.5, 5.4, 0.5], color: "#ef4444" },
  "Column_003": { id: "Column_003", name: "Poteau_B1", type: "IfcColumn", material: "Béton Armé C40/50", volume: 1.8, weight: 4320, unitCost: 420, carbonIntensity: 310, phase: 1, position: [-6, 3, 4], size: [0.5, 5.4, 0.5], color: "#ef4444" },
  "Column_004": { id: "Column_004", name: "Poteau_B2", type: "IfcColumn", material: "Béton Armé C40/50", volume: 1.8, weight: 4320, unitCost: 420, carbonIntensity: 310, phase: 1, position: [6, 3, 4], size: [0.5, 5.4, 0.5], color: "#ef4444" },
  "Beam_001": { id: "Beam_001", name: "Poutre_Principale_R+2", type: "IfcBeam", material: "Acier S355", volume: 0.84, weight: 6594, unitCost: 1850, carbonIntensity: 1950, phase: 2, position: [0, 5.5, 0], size: [12, 0.6, 0.4], color: "#eab308", hasCollision: true, collisionWith: "Gaine_CVC_Principal" },
  "Wall_Ref_001": { id: "Wall_Ref_001", name: "Mur_Porteur_Nord", type: "IfcWall", material: "Béton Armé C25/30", volume: 24.3, weight: 58320, unitCost: 165, carbonIntensity: 245, phase: 1, position: [0, 3, -5.75], size: [14, 5.4, 0.5], color: "#718096" },
  "Wall_Ref_002": { id: "Wall_Ref_002", name: "Mur_Porteur_Sud", type: "IfcWall", material: "Béton Armé C25/30", volume: 24.3, weight: 58320, unitCost: 165, carbonIntensity: 245, phase: 1, position: [0, 3, 5.75], size: [14, 5.4, 0.5], color: "#718096" },
  "Wall_Ref_003": { id: "Wall_Ref_003", name: "Mur_Porteur_Est", type: "IfcWall", material: "Béton Armé C25/30", volume: 18.9, weight: 45360, unitCost: 165, carbonIntensity: 245, phase: 1, position: [7.75, 3, 0], size: [0.5, 5.4, 11], color: "#718096" },
  "Wall_Ref_004": { id: "Wall_Ref_004", name: "Mur_Porteur_Ouest", type: "IfcWall", material: "Béton Armé C25/30", volume: 18.9, weight: 45360, unitCost: 165, carbonIntensity: 245, phase: 1, position: [-7.75, 3, 0], size: [0.5, 5.4, 11], color: "#718096" },
  "Wall_Int_001": { id: "Wall_Int_001", name: "Cloison_Int_01", type: "IfcWall", material: "Placo BA13", volume: 2.1, weight: 1680, unitCost: 45, carbonIntensity: 35, phase: 3, position: [0, 3, 0], size: [0.15, 5.4, 8], color: "#a0aec0" },
  "Slab_RDC": { id: "Slab_RDC", name: "Dalle_RDC", type: "IfcSlab", material: "Béton Armé C30/37", volume: 38.4, weight: 92160, unitCost: 145, carbonIntensity: 265, phase: 2, position: [0, 0.7, 0], size: [15, 0.2, 11], color: "#64748b" },
  "Slab_R1": { id: "Slab_R1", name: "Dalle_R+1", type: "IfcSlab", material: "Béton Armé C30/37", volume: 38.4, weight: 92160, unitCost: 145, carbonIntensity: 265, phase: 2, position: [0, 3.5, 0], size: [15, 0.22, 11], color: "#64748b" },
  "Slab_R2": { id: "Slab_R2", name: "Dalle_R+2", type: "IfcSlab", material: "Béton Armé C30/37", volume: 38.4, weight: 92160, unitCost: 145, carbonIntensity: 265, phase: 3, position: [0, 5.8, 0], size: [15, 0.22, 11], color: "#64748b" },
  "HVAC_Duct_001": { id: "HVAC_Duct_001", name: "Gaine_CVC_Principal", type: "IfcDuctSegment", material: "Acier Galvanisé", volume: 0.48, weight: 376, unitCost: 85, carbonIntensity: 1420, phase: 4, position: [0, 5.5, 2], size: [10, 0.5, 0.4], color: "#06b6d4", hasCollision: true, collisionWith: "Poutre_Principale_R+2" },
  "HVAC_Duct_002": { id: "HVAC_Duct_002", name: "Gaine_CVC_Secondaire", type: "IfcDuctSegment", material: "Acier Galvanisé", volume: 0.24, weight: 188, unitCost: 75, carbonIntensity: 1420, phase: 4, position: [4, 5.5, -2], size: [6, 0.35, 0.3], color: "#06b6d4" },
  "Pipe_001": { id: "Pipe_001", name: "Canalisation_EU", type: "IfcPipeSegment", material: "PVC", volume: 0.12, weight: 168, unitCost: 25, carbonIntensity: 890, phase: 4, position: [-5, 4, 3], size: [0.15, 4, 0.15], color: "#22c55e" },
}

// Timeline data for 5D
const timelineData = [
  { date: "Jan 2026", phase: 0, cost: 180000, carbon: 85 },
  { date: "Avr 2026", phase: 1, cost: 520000, carbon: 245 },
  { date: "Juil 2026", phase: 2, cost: 890000, carbon: 420 },
  { date: "Oct 2026", phase: 3, cost: 1150000, carbon: 535 },
  { date: "Jan 2027", phase: 4, cost: 1480000, carbon: 680 },
  { date: "Avr 2027", phase: 5, cost: 1850000, carbon: 820 },
]

// LiDAR point cloud visualization
function LiDARPointCloud({ visible }: { visible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const { positions, colors } = useMemo(() => {
    const count = 8000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Create point cloud around the building
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 14
      const height = Math.random() * 7
      
      pos[i3] = Math.cos(angle) * radius * 0.8 + (Math.random() - 0.5) * 1
      pos[i3 + 1] = height + (Math.random() - 0.5) * 0.3
      pos[i3 + 2] = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 1
      
      // Green-purple gradient based on height
      const t = height / 7
      col[i3] = 0.1 + t * 0.5
      col[i3 + 1] = 0.8 - t * 0.3
      col[i3 + 2] = 0.3 + t * 0.5
    }
    
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (pointsRef.current && visible) {
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02
    }
  })

  if (!visible) return null

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
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Building element 3D component
function BuildingElement3D({ 
  element, 
  isSelected, 
  onClick, 
  currentPhase,
  isVisible,
  showCollision
}: { 
  element: typeof buildingElements[string]
  isSelected: boolean
  onClick: () => void
  currentPhase: number
  isVisible: boolean
  showCollision: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const phaseVisible = element.phase <= currentPhase
  const hasCollision = element.hasCollision && showCollision
  
  useFrame((state) => {
    if (meshRef.current && phaseVisible && isVisible) {
      if (isSelected || hovered) {
        meshRef.current.scale.setScalar(1.02 + Math.sin(state.clock.elapsedTime * 3) * 0.01)
      } else {
        meshRef.current.scale.setScalar(1)
      }
      
      // Pulse effect for collision
      if (hasCollision) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.5 + 0.5
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
          meshRef.current.material.emissiveIntensity = pulse * 0.5
        }
      }
    }
  })

  if (!phaseVisible || !isVisible) return null

  const color = hasCollision ? "#ef4444" : isSelected ? "#8b5cf6" : hovered ? "#a78bfa" : element.color

  return (
    <mesh
      ref={meshRef}
      position={element.position}
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
      <boxGeometry args={element.size} />
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={isSelected || hovered ? 1 : hasCollision ? 0.9 : 0.8}
        emissive={hasCollision ? "#ef4444" : "#000000"}
        emissiveIntensity={hasCollision ? 0.3 : 0}
      />
      {(isSelected || hovered) && (
        <Html
          position={[0, element.size[1] / 2 + 0.8, 0]}
          center
          distanceFactor={12}
        >
          <div className="rounded-lg border border-border bg-background/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm">
            <p className="font-semibold text-foreground">{element.name}</p>
            <p className="text-muted-foreground">{element.type}</p>
            {hasCollision && (
              <p className="mt-1 flex items-center gap-1 text-red-400">
                <AlertTriangle className="h-3 w-3" />
                Collision détectée
              </p>
            )}
          </div>
        </Html>
      )}
    </mesh>
  )
}

// Blueprint grid
function BlueprintGrid() {
  return (
    <>
      <Grid
        position={[0, 0, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1e3a5f"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#2563eb"
        fadeDistance={60}
        fadeStrength={1}
        followCamera={false}
      />
      <Line
        points={[[-20, 0.01, 0], [20, 0.01, 0]]}
        color="#3b82f6"
        lineWidth={1}
        opacity={0.3}
        transparent
      />
      <Line
        points={[[0, 0.01, -20], [0, 0.01, 20]]}
        color="#3b82f6"
        lineWidth={1}
        opacity={0.3}
        transparent
      />
    </>
  )
}

// Camera controller
function CameraController({ resetTrigger }: { resetTrigger: number }) {
  const { camera } = useThree()
  
  useMemo(() => {
    if (resetTrigger > 0) {
      camera.position.set(18, 14, 18)
      camera.lookAt(0, 3, 0)
    }
  }, [resetTrigger, camera])
  
  return null
}

// Main 3D scene
function Scene({ 
  selectedElement, 
  setSelectedElement, 
  currentPhase, 
  showLidar,
  visibleElements,
  resetCamera 
}: {
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  currentPhase: number
  showLidar: boolean
  visibleElements: Set<string>
  resetCamera: number
}) {
  return (
    <>
      <CameraController resetTrigger={resetCamera} />
      <PerspectiveCamera makeDefault position={[18, 14, 18]} fov={50} />
      <OrbitControls 
        makeDefault 
        minDistance={8} 
        maxDistance={60}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.05}
        target={[0, 3, 0]}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[15, 25, 15]} intensity={1} castShadow />
      <directionalLight position={[-15, 15, -15]} intensity={0.3} />
      
      <BlueprintGrid />
      
      {Object.values(buildingElements).map((element) => (
        <BuildingElement3D
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
          currentPhase={currentPhase}
          isVisible={visibleElements.has(element.id)}
          showCollision={true}
        />
      ))}
      
      <LiDARPointCloud visible={showLidar} />
      
      <Environment preset="night" />
      <fog attach="fog" args={["#0a1929", 25, 70]} />
    </>
  )
}

export default function BIMViewerPage() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [currentPhase, setCurrentPhase] = useState(4)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLidar, setShowLidar] = useState(false)
  const [resetCamera, setResetCamera] = useState(0)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set(Object.keys(buildingElements)))
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["structural", "walls"]))
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const selectedData = selectedElement ? buildingElements[selectedElement] : null
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const toggleElementVisibility = (elementId: string) => {
    setVisibleElements(prev => {
      const newSet = new Set(prev)
      if (newSet.has(elementId)) {
        newSet.delete(elementId)
      } else {
        newSet.add(elementId)
      }
      return newSet
    })
  }

  const formatCost = (cost: number) => {
    return new Intl.NumberFormat("fr-FR", { 
      style: "currency", 
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(cost)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num)
  }

  const handleCreateIncident = () => {
    setShowAIChat(false)
    // In a real app, this would create an incident ticket
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Visionneuse BIM 5D</h1>
          <p className="text-sm text-muted-foreground">
            Tour Hekla - La Défense | IFC 4.3 | LOD 400
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-400">
            Modèle synchronisé
          </Badge>
          <Badge variant="outline" className="border-orange-500/50 bg-orange-500/10 text-orange-400">
            <AlertTriangle className="mr-1 h-3 w-3" />
            1 Collision
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - IFC Tree */}
        <div className="w-72 shrink-0 border-r border-border bg-card">
          <div className="border-b border-border p-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Layers className="h-4 w-4 text-primary" />
              Arborescence IFC
            </h3>
          </div>
          <ScrollArea className="h-[calc(100%-48px)]">
            <div className="p-2">
              {ifcCategories.map((category) => (
                <Collapsible
                  key={category.id}
                  open={expandedCategories.has(category.id)}
                  onOpenChange={() => toggleCategory(category.id)}
                >
                  <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent">
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <category.icon className="h-4 w-4 text-primary" />
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {category.elements.length}
                    </Badge>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-6 space-y-0.5 py-1">
                      {category.elements.map((element) => (
                        <div
                          key={element.id}
                          className={`group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors ${
                            selectedElement === element.id
                              ? "bg-primary/20 text-primary"
                              : "hover:bg-accent"
                          }`}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleElementVisibility(element.id)
                            }}
                          >
                            {visibleElements.has(element.id) ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-muted-foreground" />
                            )}
                          </Button>
                          <Box className="h-3 w-3 text-muted-foreground" />
                          <span className={!visibleElements.has(element.id) ? "text-muted-foreground line-through" : ""}>
                            {element.name}
                          </span>
                          {element.hasCollision && (
                            <AlertTriangle className="ml-auto h-3 w-3 text-red-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center - 3D Viewport */}
        <div className="relative flex-1 bg-[#0a1929]">
          {/* Blueprint grid pattern overlay */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />
          
          {/* View controls */}
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-blue-800/50 bg-background/80 backdrop-blur-sm"
              onClick={() => setResetCamera(prev => prev + 1)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-blue-800/50 bg-background/80 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* LiDAR overlay toggle */}
          <div className="absolute left-4 top-4 z-10">
            <Card className="border-emerald-800/50 bg-background/90 backdrop-blur-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <Scan className="h-4 w-4 text-emerald-400" />
                <Label htmlFor="lidar-toggle" className="text-sm">
                  Overlay LiDAR
                </Label>
                <Switch
                  id="lidar-toggle"
                  checked={showLidar}
                  onCheckedChange={setShowLidar}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* 3D Canvas */}
          <Canvas shadows className="h-full w-full">
            <Suspense fallback={null}>
              <Scene
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                currentPhase={currentPhase}
                showLidar={showLidar}
                visibleElements={visibleElements}
                resetCamera={resetCamera}
              />
            </Suspense>
          </Canvas>

          {/* Cost and Carbon counters - Top right, not blocking controls */}
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-blue-800/50 bg-background/90 px-3 py-1.5 backdrop-blur-sm">
              <Euro className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-[10px] text-muted-foreground">Cout Cumule</p>
                <p className="text-sm font-bold text-blue-400">
                  {formatCost(currentTimelineData.cost)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-800/50 bg-background/90 px-3 py-1.5 backdrop-blur-sm">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <div>
                <p className="text-[10px] text-muted-foreground">Empreinte Carbone</p>
                <p className="text-sm font-bold text-emerald-400">
                  {currentTimelineData.carbon} tCO2e
                </p>
              </div>
            </div>
          </div>

          {/* 5D Timeline at bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-blue-900/50 bg-background/95 p-4 backdrop-blur-sm">

            {/* Playback controls */}
            <div className="mb-3 flex items-center justify-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setCurrentPhase(0)}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button 
                variant={isPlaying ? "default" : "outline"}
                size="icon" 
                className="h-10 w-10"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => setCurrentPhase(5)}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Timeline scrubber */}
            <div className="mx-auto max-w-3xl">
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
                    className={`transition-colors ${currentPhase >= idx ? "font-medium text-primary" : ""}`}
                  >
                    {data.date}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat floating - Collision Alert */}
          {showAIChat && (
            <div className="absolute bottom-32 right-4 z-20 w-96">
              <Card className="border-primary/50 bg-background/95 shadow-xl backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Assistant IA BIM</CardTitle>
                      <p className="text-xs text-muted-foreground">Analyse en temps réel</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg border border-red-800/50 bg-red-950/30 p-3">
                    <div className="flex items-start gap-2">
                      <FileWarning className="mt-0.5 h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-sm font-medium text-red-300">Collision Détectée</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Une collision a été détectée entre le <span className="text-foreground">réseau CVC (Gaine_CVC_Principal)</span> et la <span className="text-foreground">poutre structurelle (Poutre_Principale_R+2)</span> au niveau R+2.
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Voulez-vous que je crée une fiche d&apos;incident pour signaler cette interférence au bureau d&apos;études ?
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={handleCreateIncident}
                    >
                      <FileWarning className="h-4 w-4" />
                      Créer une fiche d&apos;incident
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAIChat(false)}
                    >
                      Ignorer
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Poser une question..." 
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      className="h-8 text-sm"
                    />
                    <Button size="icon" className="h-8 w-8">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 shrink-0 border-l border-border bg-card">
          <div className="border-b border-border p-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Box className="h-4 w-4 text-primary" />
              Propriétés
            </h3>
          </div>
          <ScrollArea className="h-[calc(100%-48px)]">
            {selectedData ? (
              <div className="p-4 space-y-4">
                {/* Element Header */}
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-lg font-semibold">{selectedData.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline">{selectedData.type}</Badge>
                    {selectedData.hasCollision && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Collision
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Collision warning */}
                {selectedData.hasCollision && (
                  <div className="rounded-lg border border-red-800/50 bg-red-950/30 p-3">
                    <p className="flex items-center gap-2 text-sm font-medium text-red-300">
                      <AlertTriangle className="h-4 w-4" />
                      Interférence détectée
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Collision avec: <span className="text-foreground">{selectedData.collisionWith}</span>
                    </p>
                  </div>
                )}

                {/* Geometry */}
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Géométrie
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{selectedData.volume} m³</span>
                    </div>
                    {selectedData.surface && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Surface</span>
                        <span className="font-medium">{selectedData.surface} m²</span>
                      </div>
                    )}
                    {selectedData.weight && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Poids</span>
                        <span className="font-medium">{formatNumber(selectedData.weight)} kg</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">
                        {selectedData.size[0]}×{selectedData.size[1]}×{selectedData.size[2]} m
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Material */}
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Matériau
                  </h4>
                  <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-2">
                    <PipetteIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{selectedData.material}</span>
                  </div>
                </div>

                <Separator />

                {/* Cost */}
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Coût
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coût unitaire</span>
                      <span className="font-medium text-blue-400">{selectedData.unitCost} €/m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coût total</span>
                      <span className="font-semibold text-blue-400">
                        {formatCost(selectedData.unitCost * selectedData.volume)}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Carbon */}
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Empreinte Carbone
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Intensité</span>
                      <span className="font-medium text-emerald-400">{selectedData.carbonIntensity} kgCO2e/m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impact total</span>
                      <span className="font-semibold text-emerald-400">
                        {formatNumber(Math.round(selectedData.carbonIntensity * selectedData.volume))} kgCO2e
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Phase */}
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Planning
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      Phase {selectedData.phase + 1}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {timelineData[selectedData.phase]?.date}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <CircleDot className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  Sélectionnez un élément dans la vue 3D ou l&apos;arborescence IFC pour afficher ses propriétés
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
