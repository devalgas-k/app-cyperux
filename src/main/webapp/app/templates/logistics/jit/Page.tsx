"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import {
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  MapPin,
  QrCode,
  Scan,
  Calendar,
  ChevronRight,
  RefreshCw,
  Bot,
  X,
  Send,
  Navigation,
  Package,
  Timer,
  AlertCircle,
  Check,
  Loader2,
  Maximize2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import { Progress } from "@/shared/components/ui/progress"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/utils"

// Types
interface Delivery {
  id: string
  vehicle: string
  type: "toupie" | "grue" | "camion" | "semi"
  driver: string
  phone: string
  eta: string
  status: "en_route" | "proche" | "arrivé" | "en_attente"
  position: { lat: number; lng: number }
  cargo: string
  volume: string
  blNumber: string
}

interface DeliverySlot {
  id: string
  time: string
  endTime: string
  vehicle: string
  type: "toupie" | "grue" | "livraison"
  zone: string
  status: "confirmé" | "en_cours" | "conflit" | "terminé"
  conflictWith?: string
}

interface DeliveryNote {
  id: string
  blNumber: string
  supplier: string
  cargo: string
  expectedVolume: string
  receivedVolume?: string
  status: "en_attente" | "scanné" | "validé" | "lidar_vérifié"
  arrivalTime?: string
}

// Mock Data
const deliveries: Delivery[] = [
  {
    id: "DEL-001",
    vehicle: "Toupie #42",
    type: "toupie",
    driver: "Marc Dupont",
    phone: "+33 6 12 34 56 78",
    eta: "12 min",
    status: "en_route",
    position: { lat: 48.8566, lng: 2.3522 },
    cargo: "Béton C25/30",
    volume: "8 m³",
    blNumber: "BL-2026-00142",
  },
  {
    id: "DEL-002",
    vehicle: "Camion #18",
    type: "camion",
    driver: "Pierre Martin",
    phone: "+33 6 98 76 54 32",
    eta: "3 min",
    status: "proche",
    position: { lat: 48.8606, lng: 2.3376 },
    cargo: "Armatures HA",
    volume: "2.5 T",
    blNumber: "BL-2026-00143",
  },
  {
    id: "DEL-003",
    vehicle: "Toupie #15",
    type: "toupie",
    driver: "Jean Lefebvre",
    phone: "+33 6 11 22 33 44",
    eta: "Sur site",
    status: "arrivé",
    position: { lat: 48.8584, lng: 2.2945 },
    cargo: "Béton C30/37",
    volume: "7 m³",
    blNumber: "BL-2026-00144",
  },
  {
    id: "DEL-004",
    vehicle: "Semi #07",
    type: "semi",
    driver: "François Moreau",
    phone: "+33 6 55 66 77 88",
    eta: "Bloqué",
    status: "en_attente",
    position: { lat: 48.8700, lng: 2.3200 },
    cargo: "Éléments préfabriqués",
    volume: "12 T",
    blNumber: "BL-2026-00145",
  },
]

const deliverySlots: DeliverySlot[] = [
  { id: "SLOT-1", time: "07:00", endTime: "07:45", vehicle: "Toupie #12", type: "toupie", zone: "Accès A", status: "terminé" },
  { id: "SLOT-2", time: "07:30", endTime: "08:15", vehicle: "Camion #05", type: "livraison", zone: "Accès B", status: "terminé" },
  { id: "SLOT-3", time: "08:00", endTime: "09:30", vehicle: "Grue mobile", type: "grue", zone: "Zone centrale", status: "en_cours" },
  { id: "SLOT-4", time: "08:30", endTime: "09:15", vehicle: "Toupie #42", type: "toupie", zone: "Accès A", status: "confirmé" },
  { id: "SLOT-5", time: "08:45", endTime: "09:30", vehicle: "Camion #18", type: "livraison", zone: "Accès A", status: "conflit", conflictWith: "Toupie #42" },
  { id: "SLOT-6", time: "09:00", endTime: "09:45", vehicle: "Toupie #15", type: "toupie", zone: "Accès B", status: "confirmé" },
  { id: "SLOT-7", time: "10:00", endTime: "11:30", vehicle: "Semi #07", type: "livraison", zone: "Accès C", status: "confirmé" },
  { id: "SLOT-8", time: "11:00", endTime: "12:00", vehicle: "Toupie #22", type: "toupie", zone: "Accès A", status: "confirmé" },
]

const deliveryNotes: DeliveryNote[] = [
  { id: "BL-001", blNumber: "BL-2026-00142", supplier: "Unibéton", cargo: "Béton C25/30", expectedVolume: "8 m³", status: "en_attente" },
  { id: "BL-002", blNumber: "BL-2026-00143", supplier: "ArcelorMittal", cargo: "Armatures HA", expectedVolume: "2.5 T", status: "scanné", arrivalTime: "08:32" },
  { id: "BL-003", blNumber: "BL-2026-00144", supplier: "Lafarge", cargo: "Béton C30/37", expectedVolume: "7 m³", receivedVolume: "6.8 m³", status: "lidar_vérifié", arrivalTime: "08:15" },
  { id: "BL-004", blNumber: "BL-2026-00140", supplier: "Point.P", cargo: "Agglos B40", expectedVolume: "1200 unités", receivedVolume: "1200 unités", status: "validé", arrivalTime: "07:45" },
]

export default function JITLogisticsPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "Le camion #18 est bloqué dans un bouchon sur le périphérique. J'ai automatiquement décalé le slot de la grue de 15 min et informé le chef d'équipe par SMS. Confirmer cette action ?",
      timestamp: new Date(),
      actions: [
        { label: "Confirmer le décalage", variant: "default" as const },
        { label: "Annuler et garder le planning", variant: "outline" as const },
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [scanDialogOpen, setScanDialogOpen] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [lidarVerifying, setLidarVerifying] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: Delivery["status"]) => {
    switch (status) {
      case "en_route": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "proche": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "arrivé": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "en_attente": return "bg-red-500/20 text-red-400 border-red-500/30"
    }
  }

  const getSlotStatusColor = (status: DeliverySlot["status"]) => {
    switch (status) {
      case "terminé": return "bg-zinc-700"
      case "en_cours": return "bg-primary"
      case "confirmé": return "bg-emerald-600"
      case "conflit": return "bg-red-600 animate-pulse"
    }
  }

  const getBLStatusBadge = (status: DeliveryNote["status"]) => {
    switch (status) {
      case "en_attente": return <Badge variant="outline" className="text-zinc-400">En attente</Badge>
      case "scanné": return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Scanné</Badge>
      case "validé": return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Validé</Badge>
      case "lidar_vérifié": return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">LiDAR Vérifié</Badge>
    }
  }

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanDialogOpen(false)
    }, 2000)
  }

  const handleLidarVerify = (blId: string) => {
    setLidarVerifying(true)
    setTimeout(() => {
      setLidarVerifying(false)
    }, 3000)
  }

  const handleAIAction = (action: string) => {
    setAiMessages(prev => [...prev, {
      role: "user",
      content: action,
      timestamp: new Date(),
    }, {
      role: "assistant",
      content: action.includes("Confirmer") 
        ? "Action confirmée. Le planning a été mis à jour et le chef d'équipe M. Dubois a reçu la notification. La grue sera disponible à 09:15 au lieu de 09:00."
        : "Compris. Le planning original est maintenu. Je continue à surveiller la situation du camion #18.",
      timestamp: new Date(),
    }])
  }

  const hours = Array.from({ length: 12 }, (_, i) => i + 7) // 7h to 18h

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link to="/templates/logistics" className="hover:text-foreground">Logistique</Link>
              <ChevronRight className="h-4 w-4" />
              <span>Tour de Contrôle JIT</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Logistique Just-In-Time</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-mono text-sm">
                {currentTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Conflict Alert */}
        <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Conflit de zone détecté</AlertTitle>
          <AlertDescription>
            2 véhicules (Toupie #42 et Camion #18) sont prévus sur l&apos;Accès A entre 08:30 et 09:15. 
            Risque de blocage et retard estimé : 25 min.
          </AlertDescription>
        </Alert>

        {/* Map Section */}
        <Card className="flex-shrink-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Carte temps réel des livraisons</CardTitle>
              <Button variant="ghost" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-[280px] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
              {/* Map Background Grid */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(89, 49, 150, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(89, 49, 150, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px"
                }}
              />
              
              {/* Construction Site */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-lg border-2 border-primary bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">CHANTIER</span>
                  </div>
                  {/* Access Points */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-medium">Accès A</div>
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-medium rotate-90">Accès B</div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-orange-600 text-[10px] font-medium">Accès C</div>
                </div>
              </div>

              {/* Vehicles */}
              {deliveries.map((delivery, index) => {
                const positions = [
                  { top: "20%", left: "25%" },
                  { top: "35%", left: "70%" },
                  { top: "60%", left: "45%" },
                  { top: "75%", left: "15%" },
                ]
                const pos = positions[index]
                
                return (
                  <div
                    key={delivery.id}
                    className={cn(
                      "absolute cursor-pointer transition-all hover:scale-110",
                      selectedDelivery?.id === delivery.id && "scale-125"
                    )}
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    <div className={cn(
                      "relative flex items-center justify-center w-10 h-10 rounded-full border-2",
                      delivery.status === "en_route" && "bg-blue-500/30 border-blue-500",
                      delivery.status === "proche" && "bg-yellow-500/30 border-yellow-500 animate-pulse",
                      delivery.status === "arrivé" && "bg-emerald-500/30 border-emerald-500",
                      delivery.status === "en_attente" && "bg-red-500/30 border-red-500",
                    )}>
                      <Truck className="h-5 w-5" />
                      {delivery.status === "en_route" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                      )}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                      <span className="text-[10px] font-medium bg-zinc-800 px-1.5 py-0.5 rounded">
                        {delivery.vehicle}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Selected Vehicle Info */}
              {selectedDelivery && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-zinc-800/90 backdrop-blur border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        getStatusColor(selectedDelivery.status)
                      )}>
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{selectedDelivery.vehicle}</div>
                        <div className="text-xs text-muted-foreground">{selectedDelivery.cargo} - {selectedDelivery.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-primary" />
                        <span className="font-mono font-medium">{selectedDelivery.eta}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{selectedDelivery.driver}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-zinc-800/80 backdrop-blur text-[10px] space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>En route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span>Proche</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Arrivé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Bloqué</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section - Gantt and Reception */}
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Delivery Slots Gantt */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Slots de Livraison</CardTitle>
                  <CardDescription>Planning journalier des créneaux</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date().toLocaleDateString("fr-FR")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {/* Time Header */}
              <div className="flex border-b border-border pb-2 mb-2 sticky top-0 bg-card z-10">
                <div className="w-28 flex-shrink-0 text-xs text-muted-foreground">Véhicule</div>
                <div className="flex-1 flex">
                  {hours.map(hour => (
                    <div key={hour} className="flex-1 text-center text-[10px] text-muted-foreground">
                      {hour}h
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt Rows */}
              <div className="space-y-1">
                {deliverySlots.map((slot) => {
                  const startHour = parseInt(slot.time.split(":")[0])
                  const startMin = parseInt(slot.time.split(":")[1])
                  const endHour = parseInt(slot.endTime.split(":")[0])
                  const endMin = parseInt(slot.endTime.split(":")[1])
                  
                  const startOffset = ((startHour - 7) + startMin / 60) / 12 * 100
                  const duration = ((endHour - startHour) + (endMin - startMin) / 60) / 12 * 100

                  return (
                    <div key={slot.id} className="flex items-center h-8">
                      <div className="w-28 flex-shrink-0 text-xs truncate pr-2">{slot.vehicle}</div>
                      <div className="flex-1 relative h-6 bg-zinc-800/50 rounded">
                        <div
                          className={cn(
                            "absolute top-0 bottom-0 rounded flex items-center justify-center text-[10px] font-medium",
                            getSlotStatusColor(slot.status)
                          )}
                          style={{
                            left: `${startOffset}%`,
                            width: `${duration}%`,
                          }}
                        >
                          <span className="truncate px-1">{slot.zone}</span>
                          {slot.status === "conflit" && (
                            <AlertCircle className="h-3 w-3 ml-1 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-zinc-700" />
                  <span>Terminé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span>En cours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-600" />
                  <span>Confirmé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-red-600" />
                  <span>Conflit</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Field Reception */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Réception Terrain</CardTitle>
                  <CardDescription>Bons de livraison numériques</CardDescription>
                </div>
                <Dialog open={scanDialogOpen} onOpenChange={setScanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-2">
                      <QrCode className="h-4 w-4" />
                      Scanner BL
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Scanner un Bon de Livraison</DialogTitle>
                      <DialogDescription>
                        Placez le QR Code du bon de livraison devant la caméra
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-6">
                      <div className="relative w-64 h-64 rounded-lg border-2 border-dashed border-primary bg-zinc-900 flex items-center justify-center overflow-hidden">
                        {scanning ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-full h-1 bg-primary animate-pulse absolute top-1/2" style={{
                              animation: "scan 2s ease-in-out infinite"
                            }} />
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="text-sm mt-2">Scan en cours...</span>
                          </div>
                        ) : (
                          <>
                            <Scan className="h-16 w-16 text-muted-foreground" />
                            <div className="absolute inset-4 border-2 border-primary/30 rounded" />
                          </>
                        )}
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        ou entrez le numéro manuellement
                      </div>
                      <Input placeholder="BL-2026-XXXXX" className="max-w-[200px] text-center" />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setScanDialogOpen(false)}>Annuler</Button>
                      <Button onClick={handleScan} disabled={scanning}>
                        {scanning ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <QrCode className="h-4 w-4 mr-2" />}
                        Scanner
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">N° BL</TableHead>
                    <TableHead className="text-xs">Fournisseur</TableHead>
                    <TableHead className="text-xs">Cargo</TableHead>
                    <TableHead className="text-xs">Statut</TableHead>
                    <TableHead className="text-xs text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-mono text-xs">{note.blNumber}</TableCell>
                      <TableCell className="text-xs">{note.supplier}</TableCell>
                      <TableCell className="text-xs">
                        <div>{note.cargo}</div>
                        <div className="text-muted-foreground">{note.expectedVolume}</div>
                      </TableCell>
                      <TableCell>{getBLStatusBadge(note.status)}</TableCell>
                      <TableCell className="text-right">
                        {note.status === "scanné" && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs gap-1"
                            onClick={() => handleLidarVerify(note.id)}
                            disabled={lidarVerifying}
                          >
                            {lidarVerifying ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Scan className="h-3 w-3" />
                            )}
                            LiDAR
                          </Button>
                        )}
                        {note.status === "lidar_vérifié" && (
                          <div className="flex items-center gap-1 text-xs text-emerald-400">
                            <Check className="h-3 w-3" />
                            <span>{note.receivedVolume}</span>
                          </div>
                        )}
                        {note.status === "validé" && (
                          <Badge variant="outline" className="text-[10px]">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            OK
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      {showAIChat && (
        <Card className="w-80 flex flex-col border-primary/30 bg-gradient-to-b from-primary/5 to-transparent">
          <CardHeader className="pb-2 flex-shrink-0 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Agent Logistique IA</CardTitle>
                  <CardDescription className="text-xs">Gestion autonome JIT</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex flex-col gap-2",
                  msg.role === "user" && "items-end"
                )}>
                  <div className={cn(
                    "rounded-lg p-3 text-sm max-w-[95%]",
                    msg.role === "assistant" 
                      ? "bg-zinc-800 border border-zinc-700" 
                      : "bg-primary text-primary-foreground"
                  )}>
                    {msg.content}
                  </div>
                  {msg.role === "assistant" && msg.actions && (
                    <div className="flex flex-col gap-2 w-full">
                      {msg.actions.map((action, actionIdx) => (
                        <Button
                          key={actionIdx}
                          variant={action.variant}
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => handleAIAction(action.label)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-3 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Demander à l'agent..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="text-sm"
              />
              <Button size="icon" className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating AI Button when chat is hidden */}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-primary/25"
          onClick={() => setShowAIChat(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100px); }
          50% { transform: translateY(100px); }
        }
      `}</style>
    </div>
  )
}
