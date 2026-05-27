"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Truck,
  AlertTriangle,
  CheckCircle,
  MapPin,
  ChevronRight,
  Navigation,
  Zap,
  Clock,
  Route,
  Sparkles,
  X,
  Send,
  Bot,
  Warehouse,
  Circle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"

// Fleet data with more details
const fleet = [
  {
    id: "CAM-A",
    vehicle: "Camion Benne Alpha",
    plate: "AB-123-CD",
    critAir: 2,
    status: "authorized",
    destination: "Chantier Tour Hekla",
    driver: "Martin Dubois",
    eta: "14:30",
    cargo: "Gravats - 8t",
    position: { x: 35, y: 25 },
    speed: 45,
  },
  {
    id: "CAM-B",
    vehicle: "Camion Grue Beta",
    plate: "EF-456-GH",
    critAir: 4,
    status: "blocked",
    destination: "Chantier Gare du Nord",
    driver: "Pierre Lambert",
    eta: "-",
    cargo: "Éléments préfabriqués - 12t",
    position: { x: 70, y: 55 },
    speed: 0,
    blockedSince: "10:45",
    penalty: 450,
  },
  {
    id: "CAM-C",
    vehicle: "Toupie Béton Gamma",
    plate: "IJ-789-KL",
    critAir: 1,
    status: "authorized",
    destination: "Chantier Eco-Quartier",
    driver: "Sophie Martin",
    eta: "15:15",
    cargo: "Béton C25/30 - 6m³",
    position: { x: 20, y: 70 },
    speed: 38,
  },
  {
    id: "CAM-D",
    vehicle: "Fourgon Delta",
    plate: "MN-012-OP",
    critAir: 0,
    status: "authorized",
    destination: "Hub Logistique Nord",
    driver: "Lucas Renard",
    eta: "13:45",
    cargo: "Outillage & EPI",
    position: { x: 55, y: 30 },
    speed: 52,
    isElectric: true,
  },
]

// Logistics hubs
const hubs = [
  { id: "hub-nord", name: "Hub Logistique Nord", position: { x: 30, y: 15 }, vehicles: 4 },
  { id: "hub-sud", name: "Hub Logistique Sud", position: { x: 60, y: 85 }, vehicles: 2 },
  { id: "hub-ouest", name: "Hub Logistique Ouest", position: { x: 10, y: 50 }, vehicles: 3 },
]

// Construction sites
const sites = [
  { id: "site-1", name: "Tour Hekla", position: { x: 45, y: 35 } },
  { id: "site-2", name: "Gare du Nord", position: { x: 55, y: 45 } },
  { id: "site-3", name: "Eco-Quartier Fluvial", position: { x: 25, y: 65 } },
]

export default function ZFEDashboardPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>("CAM-B")
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)
  const [isReassigning, setIsReassigning] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)

  const blockedVehicles = fleet.filter(v => v.status === "blocked")
  const totalPenalty = blockedVehicles.reduce((sum, v) => sum + (v.penalty || 0), 0)

  const getCritAirColor = (critAir: number) => {
    if (critAir === 0) return "bg-emerald-500 text-white"
    if (critAir <= 1) return "bg-green-500 text-white"
    if (critAir === 2) return "bg-yellow-500 text-black"
    if (critAir === 3) return "bg-orange-500 text-white"
    return "bg-red-500 text-white"
  }

  const getCritAirLabel = (critAir: number) => {
    if (critAir === 0) return "Électrique"
    return `Crit'Air ${critAir}`
  }

  const handleCalculateRoute = () => {
    setIsCalculatingRoute(true)
    setTimeout(() => {
      setIsCalculatingRoute(false)
      setAiSuggestion("route")
      toast.success("Itinéraire de contournement calculé", {
        description: "Via A86 Sud → D7 → Accès chantier par zone non-ZFE. +12 min de trajet.",
      })
    }, 2000)
  }

  const handleReassignVehicle = () => {
    setIsReassigning(true)
    setTimeout(() => {
      setIsReassigning(false)
      setAiSuggestion("reassign")
      toast.success("Réassignation effectuée", {
        description: "Livraison transférée au Fourgon Delta (électrique) depuis Hub Nord.",
      })
    }, 2500)
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/templates/logistics" className="hover:text-foreground transition-colors">
          Logistique
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Conformité ZFE</span>
      </div>

      {/* Critical Alert */}
      {blockedVehicles.length > 0 && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Alerte Critique ZFE</AlertTitle>
          <AlertDescription className="mt-1">
            <span className="font-medium">{blockedVehicles.length} livraison{blockedVehicles.length > 1 ? "s" : ""} bloquée{blockedVehicles.length > 1 ? "s" : ""}</span> par restriction ZFE.
            Pénalité estimée : <span className="font-bold text-destructive">{totalPenalty}€</span>
            <span className="ml-2 text-muted-foreground">
              (Amende journalière + retard livraison)
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* Main content */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Map Section */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <Card className="flex-1 bg-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Carte ZFE Île-de-France
                  </CardTitle>
                  <CardDescription>Périmètres de restriction et flotte en temps réel</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
                  Mise à jour en direct
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 h-[calc(100%-80px)]">
              {/* Interactive Map */}
              <div className="relative h-full w-full rounded-xl bg-[#0a0a0f] border border-border overflow-hidden">
                {/* Grid background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(89, 49, 150, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(89, 49, 150, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* ZFE Zones - Red transparent overlays */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grande Couronne - Outer */}
                  <ellipse 
                    cx="50" cy="50" rx="45" ry="40" 
                    fill="rgba(252, 57, 57, 0.08)" 
                    stroke="rgba(252, 57, 57, 0.3)" 
                    strokeWidth="0.3"
                    strokeDasharray="2 1"
                  />
                  {/* Petite Couronne - Middle */}
                  <ellipse 
                    cx="50" cy="50" rx="30" ry="27" 
                    fill="rgba(252, 57, 57, 0.15)" 
                    stroke="rgba(252, 57, 57, 0.5)" 
                    strokeWidth="0.4"
                  />
                  {/* Paris Intra-muros - Inner */}
                  <ellipse 
                    cx="50" cy="50" rx="15" ry="13" 
                    fill="rgba(252, 57, 57, 0.25)" 
                    stroke="rgba(252, 57, 57, 0.8)" 
                    strokeWidth="0.5"
                  />
                  
                  {/* Zone labels */}
                  <text x="50" y="50" textAnchor="middle" className="fill-red-400 text-[3px] font-medium">
                    PARIS CENTRE
                  </text>
                  <text x="50" y="53" textAnchor="middle" className="fill-red-300 text-[2px]">
                    Crit&apos;Air 3+ interdit
                  </text>
                  <text x="75" y="35" textAnchor="middle" className="fill-red-300/70 text-[2.5px]">
                    PETITE COURONNE
                  </text>
                  <text x="85" y="20" textAnchor="middle" className="fill-red-200/50 text-[2px]">
                    GRANDE COURONNE
                  </text>
                </svg>

                {/* Hubs */}
                {hubs.map((hub) => (
                  <div
                    key={hub.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${hub.position.x}%`, top: `${hub.position.y}%` }}
                  >
                    <div className="relative">
                      <div className="h-8 w-8 rounded-lg bg-primary/80 border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <Warehouse className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-bold flex items-center justify-center text-white">
                        {hub.vehicles}
                      </div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-[10px] whitespace-nowrap z-10">
                        {hub.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Construction Sites */}
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${site.position.x}%`, top: `${site.position.y}%` }}
                  >
                    <div className="relative">
                      <div className="h-5 w-5 rotate-45 bg-amber-500 border border-amber-400 shadow-lg shadow-amber-500/30" />
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-[10px] whitespace-nowrap z-10">
                        {site.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Vehicles */}
                {fleet.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                      selectedVehicle === vehicle.id ? "scale-125 z-20" : "z-10 hover:scale-110"
                    }`}
                    style={{ left: `${vehicle.position.x}%`, top: `${vehicle.position.y}%` }}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="relative">
                      <div 
                        className={`h-7 w-7 rounded-full flex items-center justify-center shadow-lg ${
                          vehicle.status === "blocked" 
                            ? "bg-destructive animate-pulse shadow-destructive/50" 
                            : vehicle.isElectric 
                              ? "bg-emerald-500 shadow-emerald-500/50" 
                              : "bg-blue-500 shadow-blue-500/50"
                        } ${selectedVehicle === vehicle.id ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}`}
                      >
                        {vehicle.isElectric ? (
                          <Zap className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Truck className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-medium whitespace-nowrap ${
                        vehicle.status === "blocked" ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        {vehicle.id}
                        {vehicle.status === "blocked" && " BLOQUÉ"}
                      </span>
                      {vehicle.speed > 0 && (
                        <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-background border border-border text-[8px] flex items-center justify-center text-muted-foreground">
                          {vehicle.speed}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 bg-background/80 backdrop-blur-sm rounded-lg border border-border p-2.5">
                  <span className="text-[10px] font-medium text-muted-foreground mb-1">Légende</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="text-[10px] text-muted-foreground">Zone ZFE Interdite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-lg bg-primary" />
                    <span className="text-[10px] text-muted-foreground">Hub Logistique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rotate-45 bg-amber-500" />
                    <span className="text-[10px] text-muted-foreground">Chantier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-[10px] text-muted-foreground">Véhicule Autorisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-muted-foreground">Véhicule Électrique</span>
                  </div>
                </div>

                {/* Compass */}
                <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center">
                  <div className="text-[10px] font-bold text-primary">N</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel - Vehicles */}
        <Card className="w-80 flex-shrink-0 bg-card flex flex-col overflow-hidden max-h-[calc(100vh-8rem)]">
          <CardHeader className="pb-2 shrink-0">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Véhicules en Approche
            </CardTitle>
            <CardDescription className="text-xs">
              {fleet.length} véhicules actifs • {blockedVehicles.length} bloqué{blockedVehicles.length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <Separator className="shrink-0" />
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-3 space-y-2">
              {fleet.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedVehicle === vehicle.id 
                      ? "border-primary bg-primary/10" 
                      : vehicle.status === "blocked"
                        ? "border-destructive/50 bg-destructive/5 hover:bg-destructive/10"
                        : "border-border bg-secondary/30 hover:bg-secondary/50"
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{vehicle.vehicle}</span>
                        {vehicle.isElectric && (
                          <Zap className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{vehicle.plate}</p>
                    </div>
                    <Badge className={`${getCritAirColor(vehicle.critAir)} text-[10px] flex-shrink-0`}>
                      {getCritAirLabel(vehicle.critAir)}
                    </Badge>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    {vehicle.status === "authorized" ? (
                      <Badge variant="outline" className="border-green-500/50 text-green-500 text-[10px]">
                        <CheckCircle className="mr-1 h-2.5 w-2.5" />
                        Autorisé
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-[10px] animate-pulse">
                        <AlertTriangle className="mr-1 h-2.5 w-2.5" />
                        Bloqué ZFE
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{vehicle.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>ETA: {vehicle.eta}</span>
                      {vehicle.blockedSince && (
                        <span className="text-destructive ml-1">
                          (bloqué depuis {vehicle.blockedSince})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Truck className="h-3 w-3" />
                      <span className="truncate">{vehicle.cargo}</span>
                    </div>
                  </div>

                  {vehicle.penalty && (
                    <div className="mt-2 p-2 rounded bg-destructive/10 border border-destructive/30">
                      <p className="text-xs text-destructive font-medium">
                        Pénalité estimée: {vehicle.penalty}€
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* AI Panel */}
        {showAIPanel && (
          <Card className="w-72 shrink-0 overflow-hidden border-primary/30 bg-card flex flex-col max-h-[calc(100vh-8rem)]">
            <CardHeader className="p-3 border-b border-border shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-xs font-semibold truncate">Assistant IA</CardTitle>
                    <p className="text-[10px] text-muted-foreground truncate">Logistique ZFE</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setShowAIPanel(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 min-h-0">
              <div className="p-3 space-y-3">
                {/* AI Analysis */}
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <div className="min-w-0 space-y-1.5">
                      <p className="text-xs font-medium">Alerte ZFE</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">CAM-B</span> bloque ZFE Paris depuis 10h45.
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Vehicule <span className="text-destructive font-medium">Crit&apos;Air 4</span> - chantier Gare du Nord.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start h-auto py-2 px-2.5 text-left border-primary/30 hover:bg-primary/10"
                    onClick={handleCalculateRoute}
                    disabled={isCalculatingRoute}
                  >
                    <Route className="h-3.5 w-3.5 shrink-0 text-primary mr-2" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        {isCalculatingRoute ? "Calcul..." : "Contournement"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        Via A86 Sud
                      </p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full justify-start h-auto py-2 px-2.5 text-left border-emerald-500/30 hover:bg-emerald-500/10"
                    onClick={handleReassignVehicle}
                    disabled={isReassigning}
                  >
                    <Zap className="h-3.5 w-3.5 shrink-0 text-emerald-500 mr-2" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        {isReassigning ? "Reassignation..." : "Vehicule electrique"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        Fourgon Delta dispo
                      </p>
                    </div>
                  </Button>
                </div>

                {/* AI Response after action */}
                {aiSuggestion && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                      <div className="min-w-0 space-y-1">
                        {aiSuggestion === "route" ? (
                          <>
                            <p className="text-xs font-medium text-emerald-500">Itineraire OK</p>
                            <p className="text-[11px] text-muted-foreground">
                              Via A86 Sud (+12 min)
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs font-medium text-emerald-500">Reassigne</p>
                            <p className="text-[11px] text-muted-foreground">
                              Fourgon Delta - 15 min
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Context Info */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Contexte
                  </p>
                  <div className="rounded-lg border border-border p-2 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ZFE</span>
                      <span className="font-medium">3 vehicules</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alertes</span>
                      <span className="font-medium text-destructive">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraisons</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            {/* Chat Input */}
            <div className="border-t border-border p-2 shrink-0">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Question..."
                  className="flex-1 min-w-0 h-8 rounded-md bg-muted/50 border border-border px-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <Button size="icon" className="h-8 w-8 shrink-0 bg-primary">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Floating AI Button when panel is closed */}
        {!showAIPanel && (
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/50 hover:scale-105 transition-transform"
            onClick={() => setShowAIPanel(true)}
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
