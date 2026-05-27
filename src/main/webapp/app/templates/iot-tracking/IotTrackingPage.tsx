"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { 
  Radio,
  Wifi,
  Package,
  Factory,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  AlertTriangle,
  Signal,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  Thermometer,
  X,
  Sparkles,
  Send,
  MessageSquare,
  RefreshCw,
  Eye,
  ScanLine,
  QrCode,
  Check,
  Warehouse,
  ArrowRight,
  Bluetooth,
  Nfc
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"

// Kit data with 4-stage pipeline
const kits = [
  { id: "KIT-001", name: "Kit Menuiseries Ext. Lot A", stage: "production", location: "Usine Lapeyre", progress: 65, eta: "08/05/2026", tags: 12, components: ["Fenêtres PVC x8", "Portes x4"], project: "Tour Hekla" },
  { id: "KIT-002", name: "Kit Électricité R+3", stage: "transit", location: "A1 - Km 142", progress: 100, eta: "06/05/2026 14h30", tags: 8, components: ["Tableaux x3", "Câbles 500m"], project: "Tour Hekla" },
  { id: "KIT-003", name: "Kit Plomberie Sanitaires", stage: "delivered", location: "Tour Hekla - R+2", progress: 100, eta: "Livré", tags: 15, components: ["Éviers x12", "Robinetterie"], project: "Tour Hekla" },
  { id: "KIT-004", name: "Kit CVC Lot B", stage: "production", location: "Usine Daikin", progress: 35, eta: "12/05/2026", tags: 6, components: ["Climatiseurs x6", "Gaines"], project: "Eco-Quartier" },
  { id: "KIT-005", name: "Kit Façade Module 7", stage: "ready", location: "Dépôt Croissy", progress: 100, eta: "Prêt", tags: 4, components: ["Panneaux x24", "Fixations"], project: "Gare du Nord" },
  { id: "KIT-006", name: "Kit Ferraillage Poteau P22", stage: "delivered", location: "Tour Hekla - Zone A", progress: 100, eta: "Arrivé 10:42", tags: 10, components: ["Armatures HA x48", "Cadres"], project: "Tour Hekla" },
  { id: "KIT-007", name: "Kit Cloisons Sèches Étage 4", stage: "transit", location: "A86 - Nanterre", progress: 100, eta: "06/05/2026 16h00", tags: 8, components: ["Plaques BA13 x120", "Rails"], project: "Eco-Quartier" },
  { id: "KIT-008", name: "Kit Ascenseur Cab.2", stage: "ready", location: "Dépôt Gennevilliers", progress: 100, eta: "Prêt", tags: 5, components: ["Cabine", "Moteur", "Câbles"], project: "Tour Hekla" },
]

// IoT sensors/tags data
const iotTags = [
  { id: "RFID-001", type: "RFID", kitId: "KIT-002", battery: 95, temp: 22, signal: 100, lastPing: "Il y a 32 sec", status: "active" },
  { id: "RFID-002", type: "RFID", kitId: "KIT-002", battery: 88, temp: 21, signal: 98, lastPing: "Il y a 1 min", status: "active" },
  { id: "BLE-001", type: "BLE", kitId: "KIT-003", battery: 72, temp: 19, signal: 95, lastPing: "Il y a 2 min", status: "active" },
  { id: "RFID-003", type: "RFID", kitId: "KIT-006", battery: 91, temp: 20, signal: 100, lastPing: "Il y a 45 sec", status: "active" },
  { id: "GPS-001", type: "GPS", kitId: "KIT-002", battery: 65, temp: 24, signal: 100, lastPing: "Il y a 30 sec", status: "active" },
  { id: "BLE-002", type: "BLE", kitId: "KIT-001", battery: 85, temp: 18, signal: 97, lastPing: "Il y a 3 min", status: "active" },
  { id: "RFID-004", type: "RFID", kitId: "KIT-005", battery: 45, temp: 16, signal: 88, lastPing: "Il y a 5 min", status: "warning" },
  { id: "GPS-002", type: "GPS", kitId: "KIT-007", battery: 78, temp: 23, signal: 100, lastPing: "Il y a 1 min", status: "active" },
  { id: "BLE-003", type: "BLE", kitId: "KIT-004", battery: 92, temp: 21, signal: 99, lastPing: "Il y a 2 min", status: "active" },
  { id: "RFID-005", type: "RFID", kitId: "KIT-008", battery: 18, temp: 15, signal: 75, lastPing: "Il y a 12 min", status: "critical" },
]

// Stages definition
const stages = [
  { key: "production", label: "En Production", icon: Factory, color: "blue" },
  { key: "ready", label: "Prêt en Usine", icon: Warehouse, color: "purple" },
  { key: "transit", label: "En Transit", icon: Truck, color: "amber" },
  { key: "delivered", label: "Livré sur Zone", icon: MapPin, color: "emerald" },
]

export default function IoTKittingPage() {
  const [selectedKit, setSelectedKit] = useState<string | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [showScanDialog, setShowScanDialog] = useState(false)
  const [scanResult, setScanResult] = useState<typeof kits[0] | null>(null)
  const [scanning, setScanning] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "Le Kit de ferraillage pour le poteau P22 est arrivé sur zone à 10:42. Voulez-vous notifier l'équipe de pose ?" }
  ])
  const [aiInput, setAiInput] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const totalTags = 42
  const activeTags = 42
  const avgSignal = 96

  const getKitsByStage = (stage: string) => kits.filter(k => k.stage === stage)

  const getBatteryIcon = (level: number) => {
    if (level < 25) return <BatteryLow className="h-3 w-3 text-red-400" />
    if (level < 60) return <BatteryMedium className="h-3 w-3 text-amber-400" />
    return <BatteryFull className="h-3 w-3 text-emerald-400" />
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "RFID": return <Nfc className="h-4 w-4" />
      case "BLE": return <Bluetooth className="h-4 w-4" />
      case "GPS": return <MapPin className="h-4 w-4" />
      default: return <Radio className="h-4 w-4" />
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const handleScan = () => {
    setScanning(true)
    setScanResult(null)
    // Simulate scan
    setTimeout(() => {
      setScanning(false)
      setScanResult(kits.find(k => k.id === "KIT-006") || null)
    }, 2500)
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "Notification envoyée à l'équipe de pose (Chef: M. Durand, 3 ferrailleurs). Ils confirment leur disponibilité pour débuter le coulage du poteau P22 dans 45 minutes." }
    ])
    setAiInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ordonnancement Kitting & Tracking IoT</h1>
          <p className="text-muted-foreground">Vision Industrie 4.0 - Suivi temps réel des kits préfabriqués</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowScanDialog(true)}>
            <ScanLine className="h-4 w-4" />
            Scanner un Colis
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tags RFID/BLE Actifs</p>
                <p className="text-3xl font-bold text-emerald-400">{activeTags}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Radio className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">100% connectés</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Force Signal Moy.</p>
                <p className="text-3xl font-bold">{avgSignal}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Signal className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={avgSignal} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Kits en Transit</p>
                <p className="text-3xl font-bold text-amber-400">{getKitsByStage("transit").length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 animate-pulse">
                <Truck className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">ETA: 14h30 & 16h00</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Livrés Aujourd&apos;hui</p>
                <p className="text-3xl font-bold text-emerald-400">{getKitsByStage("delivered").length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Pipeline */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Pipeline de Fabrication (Kanban)
          </CardTitle>
          <CardDescription>Flux des kits de la production à la pose sur chantier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon
              const stageKits = getKitsByStage(stage.key)
              return (
                <div key={stage.key} className="flex flex-col">
                  {/* Stage Header */}
                  <div className={`flex items-center gap-2 p-3 rounded-t-lg border-b-2 ${
                    stage.color === "blue" ? "bg-blue-500/10 border-blue-500" :
                    stage.color === "purple" ? "bg-purple-500/10 border-purple-500" :
                    stage.color === "amber" ? "bg-amber-500/10 border-amber-500" :
                    "bg-emerald-500/10 border-emerald-500"
                  }`}>
                    <StageIcon className={`h-5 w-5 ${
                      stage.color === "blue" ? "text-blue-400" :
                      stage.color === "purple" ? "text-purple-400" :
                      stage.color === "amber" ? "text-amber-400" :
                      "text-emerald-400"
                    }`} />
                    <span className="font-medium text-sm">{stage.label}</span>
                    <Badge variant="secondary" className="ml-auto">{stageKits.length}</Badge>
                  </div>
                  
                  {/* Stage Content */}
                  <div className="flex-1 p-2 bg-muted/20 rounded-b-lg border border-t-0 border-border/50 min-h-[200px] space-y-2">
                    {stageKits.map((kit) => (
                      <div
                        key={kit.id}
                        onClick={() => setSelectedKit(kit.id)}
                        className={`p-3 rounded-lg bg-card border cursor-pointer transition-all hover:border-primary/50 ${
                          selectedKit === kit.id ? "border-primary ring-1 ring-primary/20" : "border-border/50"
                        } ${stage.key === "transit" ? "animate-pulse" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs text-muted-foreground">{kit.id}</span>
                          <div className="flex items-center gap-1">
                            <Radio className="h-3 w-3 text-primary" />
                            <span className="text-xs">{kit.tags}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium truncate">{kit.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{kit.location}</p>
                        {kit.stage !== "delivered" && (
                          <p className="text-xs text-primary mt-1">ETA: {kit.eta}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Arrow between stages */}
                  {index < stages.length - 1 && (
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 hidden">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* IoT Tags Table */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              Composants IoT (Tags RFID/BLE)
            </CardTitle>
            <CardDescription>Niveau de batterie et signal en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Tag</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Kit Associé</TableHead>
                  <TableHead>Batterie</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Temp.</TableHead>
                  <TableHead>Dernier Ping</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {iotTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-mono text-sm">{tag.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tag.type)}
                        <span className="text-sm">{tag.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tag.kitId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getBatteryIcon(tag.battery)}
                        <span className={`text-sm ${
                          tag.battery < 25 ? "text-red-400" : 
                          tag.battery < 60 ? "text-amber-400" : ""
                        }`}>{tag.battery}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Signal className={`h-3 w-3 ${
                          tag.signal >= 95 ? "text-emerald-400" : 
                          tag.signal >= 80 ? "text-amber-400" : "text-red-400"
                        }`} />
                        <span className="text-sm">{tag.signal}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-blue-400" />
                        <span className="text-sm">{tag.temp}°C</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tag.lastPing}</TableCell>
                    <TableCell>
                      {tag.status === "active" && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Actif</Badge>
                      )}
                      {tag.status === "warning" && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Batterie faible</Badge>
                      )}
                      {tag.status === "critical" && (
                        <Badge variant="destructive">Critique</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Sensors Panel */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Résumé Capteurs</CardTitle>
            <CardDescription>Vue consolidée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Signal Strength */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Force Signal Globale</span>
                <Signal className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <Progress value={96} className="flex-1 h-2" />
                <span className="text-lg font-bold">96%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">42/42 tags connectés</p>
            </div>

            {/* Battery Status */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">État Batteries</span>
                <Battery className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Bon ({">"}60%)</span>
                  </div>
                  <span className="font-medium">38 tags</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Moyen (25-60%)</span>
                  </div>
                  <span className="font-medium">3 tags</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Critique ({"<"}25%)</span>
                  </div>
                  <span className="font-medium text-red-400">1 tag</span>
                </div>
              </div>
            </div>

            {/* Temperature Range */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Température Ambiante</span>
                <Thermometer className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">15°C - 24°C</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Normal</Badge>
              </div>
            </div>

            {/* Alert */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-400">Attention requise</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tag RFID-005 batterie critique (18%). Remplacement recommandé.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ScanLine className="h-5 w-5 text-primary" />
              Scan de Colis - Réception Chantier
            </DialogTitle>
            <DialogDescription>
              Simulez l&apos;arrivée d&apos;un kit sur le chantier
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Scan Area */}
            <div 
              className={`relative h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                scanning 
                  ? "border-primary bg-primary/5 animate-pulse" 
                  : scanResult 
                    ? "border-emerald-500 bg-emerald-500/5" 
                    : "border-border hover:border-primary/50"
              }`}
            >
              {scanning ? (
                <>
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                  </div>
                  <QrCode className="h-16 w-16 text-primary animate-pulse" />
                  <p className="text-sm text-muted-foreground mt-3">Scan en cours...</p>
                </>
              ) : scanResult ? (
                <>
                  <CheckCircle className="h-16 w-16 text-emerald-400" />
                  <p className="text-sm font-medium mt-3 text-emerald-400">Kit identifié !</p>
                </>
              ) : (
                <>
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-3">Placez le QR Code du colis</p>
                </>
              )}
            </div>

            {/* Scan Result */}
            {scanResult && (
              <div className="p-4 rounded-lg bg-muted/30 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-emerald-400" />
                  <span className="font-medium">{scanResult.id}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ml-auto">
                    Validé
                  </Badge>
                </div>
                <p className="font-medium">{scanResult.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Projet: {scanResult.project}</p>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">Composants:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scanResult.components.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Radio className="h-4 w-4 text-primary" />
                  <span className="text-sm">{scanResult.tags} tags RFID détectés</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {!scanResult ? (
                <Button className="flex-1 gap-2" onClick={handleScan} disabled={scanning}>
                  <ScanLine className="h-4 w-4" />
                  {scanning ? "Scan en cours..." : "Lancer le Scan"}
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" onClick={() => setScanResult(null)}>
                    Nouveau Scan
                  </Button>
                  <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700">
                    <Check className="h-4 w-4" />
                    Confirmer Réception
                  </Button>
                </>
              )}
            </div>
          </div>
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
                  <CardTitle className="text-sm">Assistant Logistique IoT</CardTitle>
                  <CardDescription className="text-xs">Suivi temps réel</CardDescription>
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
                placeholder="Question sur les kits..." 
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

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 4px); }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
