"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Progress } from "@/shared/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import {
  Leaf,
  Recycle,
  MapPin,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Box,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts"

// Emerald color palette
const emerald = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
}

// RE2020 Data
const carbonData = {
  score: 420,
  target: 380,
  unit: "kgCO2e/m²",
  breakdown: [
    { name: "Béton", value: 60, color: "#ef4444" },
    { name: "Acier", value: 25, color: "#f97316" },
    { name: "Bois", value: 10, color: emerald[500] },
    { name: "Autres", value: 5, color: "#6b7280" },
  ],
}

// Waste Management Data (Loi AGEC)
const wasteData = [
  {
    id: 1,
    type: "Béton de démolition",
    codeCER: "17 01 01",
    weight: 120,
    unit: "t",
    status: "valorise",
    valorisation: 85,
  },
  {
    id: 2,
    type: "Déchets dangereux",
    codeCER: "17 09 03*",
    weight: 2,
    unit: "t",
    status: "attente",
    valorisation: 0,
  },
]

// Recycling Centers
const recyclingCenters = [
  { id: 1, name: "Centre Paprec Gennevilliers", type: "Béton", distance: "8 km", lat: 48.93, lng: 2.31 },
  { id: 2, name: "Veolia Croissy", type: "Déchets dangereux", distance: "15 km", lat: 48.88, lng: 2.13 },
  { id: 3, name: "Suez Ivry", type: "Métaux", distance: "6 km", lat: 48.82, lng: 2.39 },
]

// 3D Digital Twin materials
const digitalTwinMaterials = [
  { id: 1, name: "Fondations", volume: 450, intensity: "high", co2: 180 },
  { id: 2, name: "Structure porteuse", volume: 320, intensity: "high", co2: 145 },
  { id: 3, name: "Façades", volume: 180, intensity: "medium", co2: 65 },
  { id: 4, name: "Menuiseries bois", volume: 85, intensity: "low", co2: 12 },
  { id: 5, name: "Isolation biosourcée", volume: 120, intensity: "low", co2: 8 },
  { id: 6, name: "Toiture végétalisée", volume: 95, intensity: "low", co2: 5 },
]

function CarbonGauge({ score, target }: { score: number; target: number }) {
  const percentage = Math.min((score / 500) * 100, 100)
  const targetPercentage = (target / 500) * 100
  const isOverTarget = score > target

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className="relative h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          {/* Target indicator */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={emerald[500]}
            strokeWidth="2"
            strokeDasharray={`${targetPercentage * 2.51} 251`}
            strokeLinecap="round"
            className="opacity-50"
          />
          {/* Score arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isOverTarget ? "#ef4444" : emerald[500]}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${isOverTarget ? "text-red-500" : "text-emerald-500"}`}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">kgCO2e/m²</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-muted-foreground">Cible RE2020: {target}</span>
        {isOverTarget && (
          <Badge variant="destructive" className="ml-2">
            +{score - target} au-dessus
          </Badge>
        )}
      </div>
    </div>
  )
}

function MaterialBreakdownChart() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={carbonData.breakdown}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {carbonData.breakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value}%`, "Part"]}
          />
          <Legend
            formatter={(value) => <span className="text-xs text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function AISuggestionCard() {
  return (
    <Card className="border-emerald-500/30 bg-emerald-500/5">
      <CardContent className="flex items-start gap-4 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <Sparkles className="h-5 w-5 text-emerald-500" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-emerald-500">Suggestion IA</span>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-500">
              Optimisation
            </Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Passer au beton bas carbone pour la Phase 3 permettrait d&apos;economiser{" "}
            <span className="font-semibold text-emerald-500">45 tonnes de CO2</span>.
            Fournisseur recommande: Holcim ECOPact.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <span className="truncate">Appliquer la suggestion</span>
            </Button>
            <Button size="sm" variant="outline">
              <span className="truncate">Voir details</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WasteManagementTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type de déchet</TableHead>
          <TableHead>Code CER</TableHead>
          <TableHead className="text-right">Poids</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Valorisation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {wasteData.map((waste) => (
          <TableRow key={waste.id}>
            <TableCell className="font-medium">{waste.type}</TableCell>
            <TableCell>
              <code className="rounded bg-muted px-2 py-1 text-xs">
                {waste.codeCER}
              </code>
            </TableCell>
            <TableCell className="text-right">
              {waste.weight} {waste.unit}
            </TableCell>
            <TableCell>
              {waste.status === "valorise" ? (
                <Badge className="bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Valorisé
                </Badge>
              ) : (
                <Badge variant="outline" className="border-amber-500/50 text-amber-500">
                  <Clock className="mr-1 h-3 w-3" />
                  En attente d&apos;enlèvement
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              {waste.valorisation > 0 ? (
                <div className="flex items-center justify-end gap-2">
                  <Progress value={waste.valorisation} className="w-20 [&>div]:bg-emerald-500" />
                  <span className="w-10 text-sm text-emerald-500">{waste.valorisation}%</span>
                </div>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RecyclingMap() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg border bg-muted/20">
      {/* Simplified Paris map representation */}
      <svg viewBox="0 0 400 300" className="h-full w-full">
        {/* Paris outline (simplified) */}
        <ellipse
          cx="200"
          cy="150"
          rx="150"
          ry="120"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        {/* Seine river */}
        <path
          d="M 50 160 Q 150 140 200 150 Q 250 160 350 140"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          opacity="0.3"
        />
        {/* Arrondissements grid */}
        <circle cx="200" cy="150" r="30" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="150" r="60" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="150" r="90" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.5" />
        
        {/* Construction site marker */}
        <g className="animate-pulse">
          <circle cx="200" cy="150" r="8" fill={emerald[500]} opacity="0.3" />
          <circle cx="200" cy="150" r="4" fill={emerald[500]} />
        </g>
        
        {/* Recycling centers */}
        <TooltipProvider>
          {recyclingCenters.map((center, index) => {
            const positions = [
              { x: 120, y: 80 },
              { x: 100, y: 180 },
              { x: 300, y: 200 },
            ]
            return (
              <g key={center.id}>
                <circle
                  cx={positions[index].x}
                  cy={positions[index].y}
                  r="12"
                  fill="hsl(var(--card))"
                  stroke={emerald[500]}
                  strokeWidth="2"
                />
                <foreignObject
                  x={positions[index].x - 6}
                  y={positions[index].y - 6}
                  width="12"
                  height="12"
                >
                  <Recycle className="h-3 w-3 text-emerald-500" />
                </foreignObject>
                {/* Connection line to site */}
                <line
                  x1="200"
                  y1="150"
                  x2={positions[index].x}
                  y2={positions[index].y}
                  stroke={emerald[500]}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </g>
            )
          })}
        </TooltipProvider>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-lg border bg-card/90 p-3 backdrop-blur">
        <div className="flex items-center gap-2 text-xs">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>Chantier</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Recycle className="h-3 w-3 text-emerald-500" />
          <span>Centre de recyclage</span>
        </div>
      </div>
      
      {/* Centers list */}
      <div className="absolute right-4 top-4 flex flex-col gap-2 rounded-lg border bg-card/90 p-3 backdrop-blur">
        <span className="text-xs font-semibold">Points de collecte</span>
        {recyclingCenters.map((center) => (
          <div key={center.id} className="flex items-center gap-2 text-xs">
            <MapPin className="h-3 w-3 text-emerald-500" />
            <div className="flex flex-col">
              <span className="font-medium">{center.name}</span>
              <span className="text-muted-foreground">
                {center.type} - {center.distance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DigitalTwin3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<typeof digitalTwinMaterials[0] | null>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw 3D-like building representation
    const drawBuilding = () => {
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate((rotation * Math.PI) / 180)

      // Building layers (from bottom to top)
      const layers = [
        { y: 80, height: 40, intensity: "high", name: "Fondations" },
        { y: 40, height: 40, intensity: "high", name: "Structure" },
        { y: 0, height: 40, intensity: "medium", name: "Façades" },
        { y: -40, height: 30, intensity: "low", name: "Menuiseries" },
        { y: -70, height: 20, intensity: "low", name: "Isolation" },
        { y: -90, height: 15, intensity: "low", name: "Toiture" },
      ]

      layers.forEach((layer, index) => {
        const getColor = (intensity: string) => {
          switch (intensity) {
            case "high":
              return "#ef4444"
            case "medium":
              return "#f97316"
            case "low":
              return emerald[500]
            default:
              return "#6b7280"
          }
        }

        const color = getColor(layer.intensity)
        const isSelected = selectedMaterial?.name === layer.name

        // 3D effect - draw sides
        ctx.fillStyle = color
        ctx.globalAlpha = isSelected ? 1 : 0.7

        // Front face
        const frontWidth = 120 - index * 5
        ctx.fillRect(-frontWidth / 2, layer.y, frontWidth, layer.height)

        // Add grid lines
        ctx.strokeStyle = "rgba(255,255,255,0.2)"
        ctx.lineWidth = 1
        for (let i = 0; i < frontWidth; i += 20) {
          ctx.beginPath()
          ctx.moveTo(-frontWidth / 2 + i, layer.y)
          ctx.lineTo(-frontWidth / 2 + i, layer.y + layer.height)
          ctx.stroke()
        }

        // Highlight selected
        if (isSelected) {
          ctx.strokeStyle = "#fff"
          ctx.lineWidth = 2
          ctx.strokeRect(-frontWidth / 2, layer.y, frontWidth, layer.height)
        }
      })

      ctx.restore()
    }

    drawBuilding()
  }, [rotation, selectedMaterial])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-emerald-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "-"
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* 3D View */}
      <div className="relative flex items-center justify-center rounded-lg border bg-muted/10 p-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="rounded-lg"
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border bg-card/90 p-2 backdrop-blur">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setRotation((prev) => prev - 45)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground">Rotation</span>
        </div>
        <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-lg border bg-card/90 p-2 backdrop-blur">
          <span className="text-xs font-semibold">Intensité carbone</span>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-4 rounded bg-red-500" />
            <span>Haute</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-4 rounded bg-orange-500" />
            <span>Moyenne</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-4 rounded bg-emerald-500" />
            <span>Basse</span>
          </div>
        </div>
      </div>

      {/* Materials list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Matériaux par volume</span>
          <Badge variant="outline" className="text-xs">
            Total: {digitalTwinMaterials.reduce((acc, m) => acc + m.volume, 0)} m³
          </Badge>
        </div>
        <div className="space-y-2">
          {digitalTwinMaterials.map((material) => (
            <div
              key={material.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
                selectedMaterial?.id === material.id ? "border-emerald-500 bg-emerald-500/10" : ""
              }`}
              onClick={() => setSelectedMaterial(material)}
            >
              <div className={`h-3 w-3 rounded-full ${getIntensityColor(material.intensity)}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{material.name}</span>
                  <span className="text-xs text-muted-foreground">{material.volume} m³</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Intensité: {getIntensityLabel(material.intensity)}</span>
                  <span className={material.intensity === "low" ? "text-emerald-500" : "text-red-400"}>
                    {material.co2} kgCO2e/m³
                  </span>
                </div>
              </div>
              <Box className={`h-4 w-4 ${selectedMaterial?.id === material.id ? "text-emerald-500" : "text-muted-foreground"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GreenDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
            <Leaf className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tableau de Bord Vert</h1>
            <p className="text-sm text-muted-foreground">
              Suivi environnemental RE2020 & Loi AGEC
            </p>
          </div>
        </div>
      </div>

      {/* RE2020 Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Carbon Score */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Score Carbone Global
            </CardTitle>
            <CardDescription>Suivi RE2020 - Projet Tour Hekla</CardDescription>
          </CardHeader>
          <CardContent>
            <CarbonGauge score={carbonData.score} target={carbonData.target} />
          </CardContent>
        </Card>

        {/* Material Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Répartition Matériaux</CardTitle>
            <CardDescription>Impact carbone par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <MaterialBreakdownChart />
          </CardContent>
        </Card>

        {/* AI Suggestion */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              Optimisation IA
            </CardTitle>
            <CardDescription>Recommandations automatiques</CardDescription>
          </CardHeader>
          <CardContent>
            <AISuggestionCard />
          </CardContent>
        </Card>
      </div>

      {/* Waste Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Recycle className="h-5 w-5 text-emerald-500" />
                Gestion des Déchets
              </CardTitle>
              <CardDescription>Conformité Loi AGEC - Traçabilité des déchets de chantier</CardDescription>
            </div>
            <Badge className="bg-emerald-600 hover:bg-emerald-700">
              Taux de valorisation: 82%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <WasteManagementTable />
        </CardContent>
      </Card>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-emerald-500" />
            Carte des Centres de Recyclage
          </CardTitle>
          <CardDescription>Points de collecte à proximité du chantier</CardDescription>
        </CardHeader>
        <CardContent>
          <RecyclingMap />
        </CardContent>
      </Card>

      {/* Digital Twin Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Box className="h-5 w-5 text-emerald-500" />
            Jumeau Numérique - Vue Carbone
          </CardTitle>
          <CardDescription>
            Visualisation 3D des volumes de matériaux colorés par intensité carbone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DigitalTwin3D />
        </CardContent>
      </Card>
    </div>
  )
}
