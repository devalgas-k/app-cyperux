"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { 
  Cog,
  Wrench,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  X,
  Sparkles,
  Send,
  MessageSquare,
  CalendarCheck,
  Users,
  HardHat,
  Zap,
  Droplets,
  Paintbrush,
  Building2,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Euro,
  User
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Progress } from "@/shared/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
// import { useLanguage } from "@/lib/i18n"

// Equipment data
const equipment = [
  { id: 1, name: "Grue à tour #01", type: "Grue", status: "service", location: "Zone A - Tour Hekla", nextControl: "15/06/2026", image: "crane" },
  { id: 2, name: "Grue à tour #02", type: "Grue", status: "service", location: "Zone B - Eco-Quartier", nextControl: "20/06/2026", image: "crane" },
  { id: 3, name: "Pelleteuse #04", type: "Pelleteuse", status: "maintenance", location: "Atelier Central", nextControl: "08/05/2026", image: "excavator", urgent: true },
  { id: 4, name: "Pelleteuse #07", type: "Pelleteuse", status: "disponible", location: "Dépôt Nord", nextControl: "25/06/2026", image: "excavator" },
  { id: 5, name: "Bungalow Direction", type: "Bungalow", status: "service", location: "Zone A - Entrée", nextControl: "N/A", image: "cabin" },
  { id: 6, name: "Bungalow Ouvriers", type: "Bungalow", status: "service", location: "Zone A - Parking", nextControl: "N/A", image: "cabin" },
  { id: 7, name: "Bungalow Stock", type: "Bungalow", status: "disponible", location: "Dépôt Central", nextControl: "N/A", image: "cabin" },
  { id: 8, name: "Compacteur #02", type: "Compacteur", status: "service", location: "Zone C - Terrassement", nextControl: "10/06/2026", image: "compactor" },
  { id: 9, name: "Chariot élévateur #03", type: "Manutention", status: "service", location: "Zone B - Stockage", nextControl: "18/06/2026", image: "forklift" },
]

// Teams data
const teams = [
  { id: 1, name: "Équipe Maçons A", type: "Équipe", members: 8, status: "service", speciality: "Maçonnerie" },
  { id: 2, name: "Équipe Électriciens", type: "Équipe", members: 6, status: "service", speciality: "Électricité" },
  { id: 3, name: "Équipe Plombiers", type: "Équipe", members: 4, status: "disponible", speciality: "Plomberie" },
]

// Projects for scheduler
const projects = [
  { id: "hekla", name: "Tour Hekla", color: "#593196" },
  { id: "eco", name: "Eco-Quartier", color: "#10b981" },
  { id: "gare", name: "Gare du Nord", color: "#3b82f6" },
  { id: "marina", name: "Marina Bay", color: "#f59e0b" },
  { id: "campus", name: "Campus Tech", color: "#ef4444" },
]

// Initial scheduler assignments
const initialAssignments = [
  { id: 1, resourceId: 1, projectId: "hekla", startWeek: 0, duration: 4, conductor: "Jean Dupont", hourlyRate: 85, zone: "Zone A" },
  { id: 2, resourceId: 1, projectId: "eco", startWeek: 2, duration: 3, conductor: "Marie Martin", hourlyRate: 85, zone: "Zone B", conflict: true },
  { id: 3, resourceId: 2, projectId: "eco", startWeek: 0, duration: 6, conductor: "Pierre Durand", hourlyRate: 85, zone: "Zone B" },
  { id: 4, resourceId: 8, projectId: "hekla", startWeek: 1, duration: 3, conductor: "Luc Bernard", hourlyRate: 65, zone: "Zone C" },
  { id: 5, resourceId: 9, projectId: "gare", startWeek: 0, duration: 5, conductor: "Sophie Petit", hourlyRate: 45, zone: "Zone A" },
  { id: 6, resourceId: "team-1", projectId: "hekla", startWeek: 0, duration: 6, conductor: "Chef Maçon", hourlyRate: 55, zone: "Zone A" },
  { id: 7, resourceId: "team-2", projectId: "eco", startWeek: 1, duration: 4, conductor: "Chef Élec", hourlyRate: 60, zone: "Zone B" },
]

const trades = [
  { id: 1, name: "Maçons", icon: HardHat, total: 24, available: 18, weeks: [85, 90, 95, 88, 75, 82] },
  { id: 2, name: "Électriciens", icon: Zap, total: 12, available: 8, weeks: [70, 85, 90, 100, 95, 80] },
  { id: 3, name: "Plombiers", icon: Droplets, total: 8, available: 6, weeks: [60, 65, 70, 75, 80, 70] },
  { id: 4, name: "Peintres", icon: Paintbrush, total: 10, available: 10, weeks: [30, 40, 45, 50, 60, 55] },
  { id: 5, name: "Charpentiers", icon: Building2, total: 6, available: 4, weeks: [80, 85, 90, 85, 75, 70] },
]

const weekLabels = ["S22", "S23", "S24", "S25", "S26", "S27"]

export default function EquipmentPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [showAIChat, setShowAIChat] = useState(true)
  const [showReservationDialog, setShowReservationDialog] = useState(false)
  const [selectedResource, setSelectedResource] = useState<string>("")
  const [reservationConflict, setReservationConflict] = useState(false)
  const [assignments, setAssignments] = useState(initialAssignments)
  const [draggedResource, setDraggedResource] = useState<any>(null)
  const [showUnassignedPanel, setShowUnassignedPanel] = useState(true)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("scheduler")
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "La pelleteuse #04 est en surcharge. Voulez-vous que je rééquilibre la charge sur la #07 disponible au dépôt ?" }
  ])
  const [aiInput, setAiInput] = useState("")

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || eq.status === statusFilter
    const matchesType = typeFilter === "all" || eq.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // Unassigned resources (not in any assignment or marked as available)
  const unassignedEquipment = equipment.filter(eq => 
    eq.status === "disponible" || 
    !assignments.some(a => a.resourceId === eq.id)
  )
  const unassignedTeams = teams.filter(team => 
    team.status === "disponible" ||
    !assignments.some(a => a.resourceId === `team-${team.id}`)
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "service":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><CheckCircle className="h-3 w-3 mr-1" />En service</Badge>
      case "maintenance":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30"><Wrench className="h-3 w-3 mr-1" />En maintenance</Badge>
      case "disponible":
        return <Badge variant="secondary"><Package className="h-3 w-3 mr-1" />Disponible</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getHeatmapColor = (value: number) => {
    if (value >= 90) return "bg-red-500"
    if (value >= 75) return "bg-amber-500"
    if (value >= 50) return "bg-emerald-500"
    return "bg-emerald-500/50"
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "Parfait ! J'ai rééquilibré la charge : la Pelleteuse #07 prendra en charge les tâches de terrassement sur Tour Hekla à partir de demain. La #04 sera libérée pour la maintenance préventive. Planning mis à jour." }
    ])
    setAiInput("")
  }

  const handleReservation = () => {
    if (selectedResource === "Grue à tour #01") {
      setReservationConflict(true)
      toast.warning("Conflit de reservation", {
        description: "Cet equipement est deja reserve sur cette periode."
      })
    } else {
      setReservationConflict(false)
      setShowReservationDialog(false)
      toast.success("Reservation confirmee", {
        description: `${selectedResource} a ete reserve avec succes.`
      })
    }
  }

  // Drag handlers for scheduler
  const handleDragStart = (resource: any, isTeam: boolean = false) => {
    setDraggedResource({ ...resource, isTeam })
  }

  const handleDrop = (resourceId: number | string, weekIndex: number) => {
    if (!draggedResource) return
    
    const newAssignment = {
      id: Date.now(),
      resourceId: draggedResource.isTeam ? `team-${draggedResource.id}` : draggedResource.id,
      projectId: "hekla",
      startWeek: weekIndex,
      duration: 2,
      conductor: "À assigner",
      hourlyRate: 50,
      zone: "Zone A"
    }
    setAssignments(prev => [...prev, newAssignment])
    setDraggedResource(null)
  }

  const handleAssignmentClick = (assignment: any) => {
    setSelectedAssignment(assignment)
    setShowDetailDialog(true)
  }

  const handleUpdateAssignment = () => {
    setAssignments(prev => prev.map(a => 
      a.id === selectedAssignment.id ? selectedAssignment : a
    ))
    setShowDetailDialog(false)
    toast.success("Affectation mise a jour", {
      description: "Les modifications ont ete enregistrees."
    })
  }

  const serviceCount = equipment.filter(e => e.status === "service").length
  const maintenanceCount = equipment.filter(e => e.status === "maintenance").length
  const availableCount = equipment.filter(e => e.status === "disponible").length

  // Get all resources for scheduler (equipment + teams)
  const schedulerResources = [
    ...equipment.filter(e => e.status !== "maintenance").map(e => ({ ...e, isTeam: false })),
    ...teams.map(t => ({ ...t, isTeam: true, id: `team-${t.id}` }))
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Planning des Ressources & Parc Matériel</h1>
          <p className="text-muted-foreground">Gestion dynamique des actifs et affectations</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowUnassignedPanel(!showUnassignedPanel)}
          >
            <GripVertical className="h-4 w-4" />
            {showUnassignedPanel ? "Masquer" : "Afficher"} non assignés
          </Button>
          <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                <CalendarCheck className="h-4 w-4" />
                Réserver une ressource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Réserver une ressource</DialogTitle>
                <DialogDescription>Vérification automatique des conflits de planning</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Ressource</Label>
                  <Select value={selectedResource} onValueChange={setSelectedResource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une ressource" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.filter(e => e.status !== "maintenance").map(eq => (
                        <SelectItem key={eq.id} value={eq.name}>{eq.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date début</Label>
                    <Input type="date" defaultValue="2026-05-10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date fin</Label>
                    <Input type="date" defaultValue="2026-05-15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Projet / Zone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Précisions sur l'utilisation..." />
                </div>

                {reservationConflict && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Conflit détecté</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          La Grue à tour #01 est déjà réservée par le projet Eco-Quartier du 10 au 14 mai.
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">Demander arbitrage</Button>
                          <Button size="sm" variant="outline" onClick={() => setReservationConflict(false)}>Autre ressource</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowReservationDialog(false)}>Annuler</Button>
                <Button onClick={handleReservation} className="bg-[#593196] hover:bg-[#593196]/90">
                  Vérifier & Réserver
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Équipements</p>
                <p className="text-3xl font-bold">{equipment.length}</p>
              </div>
              <Cog className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Service</p>
                <p className="text-3xl font-bold text-emerald-400">{serviceCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Maintenance</p>
                <p className="text-3xl font-bold text-amber-400">{maintenanceCount}</p>
              </div>
              <Wrench className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Disponible</p>
                <p className="text-3xl font-bold text-muted-foreground">{availableCount}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="scheduler">Calendrier de Charge</TabsTrigger>
          <TabsTrigger value="inventory">Inventaire</TabsTrigger>
          <TabsTrigger value="heatmap">Charge RH</TabsTrigger>
        </TabsList>

        {/* Scheduler Tab */}
        <TabsContent value="scheduler" className="mt-4">
          <div className="flex gap-4">
            {/* Main Scheduler */}
            <Card className="flex-1 border-border/50 bg-card/50 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Calendrier de Charge
                    </CardTitle>
                    <CardDescription>Glisser-déposer pour affecter les ressources</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded bg-muted-foreground/30" />
                      <span className="text-muted-foreground">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded bg-[#593196]" />
                      <span className="text-muted-foreground">Affecté</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded bg-red-500 animate-pulse" />
                      <span className="text-muted-foreground">Conflit</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Header row with weeks */}
                    <div className="grid grid-cols-[200px_repeat(6,1fr)] border-b border-border/50 bg-muted/30">
                      <div className="p-3 font-medium text-sm border-r border-border/50">Ressource</div>
                      {weekLabels.map((week, i) => (
                        <div key={week} className="p-3 text-center font-medium text-sm border-r border-border/50 last:border-r-0">
                          {week}
                          <div className="text-xs text-muted-foreground font-normal">Mai 2026</div>
                        </div>
                      ))}
                    </div>

                    {/* Resource rows */}
                    {schedulerResources.slice(0, 8).map((resource) => {
                      const resourceAssignments = assignments.filter(a => 
                        resource.isTeam 
                          ? a.resourceId === resource.id 
                          : a.resourceId === (resource as any).id
                      )
                      
                      return (
                        <div 
                          key={resource.id} 
                          className="grid grid-cols-[200px_repeat(6,1fr)] border-b border-border/50 hover:bg-muted/20"
                        >
                          {/* Resource name */}
                          <div className="p-3 border-r border-border/50 flex items-center gap-2">
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              resource.isTeam ? "bg-blue-500/20" : "bg-muted"
                            }`}>
                              {resource.isTeam ? (
                                <Users className="h-4 w-4 text-blue-400" />
                              ) : (
                                <Cog className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{resource.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {resource.isTeam ? `${(resource as any).members} membres` : (resource as any).type}
                              </p>
                            </div>
                          </div>

                          {/* Week cells */}
                          {weekLabels.map((_, weekIndex) => {
                            const cellAssignment = resourceAssignments.find(a => 
                              weekIndex >= a.startWeek && weekIndex < a.startWeek + a.duration
                            )
                            const isStart = cellAssignment?.startWeek === weekIndex
                            const project = cellAssignment ? projects.find(p => p.id === cellAssignment.projectId) : null
                            const hasConflict = cellAssignment?.conflict

                            return (
                              <div 
                                key={weekIndex}
                                className={`p-1 border-r border-border/50 last:border-r-0 min-h-[60px] relative ${
                                  !cellAssignment ? "bg-muted-foreground/5 hover:bg-muted-foreground/10 cursor-pointer" : ""
                                }`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(resource.isTeam ? resource.id : (resource as any).id, weekIndex)}
                              >
                                {cellAssignment && isStart && (
                                  <div 
                                    className={`absolute inset-y-1 left-1 rounded-md cursor-pointer transition-all hover:scale-[1.02] ${
                                      hasConflict ? "animate-pulse" : ""
                                    }`}
                                    style={{ 
                                      backgroundColor: hasConflict ? "#ef4444" : project?.color || "#593196",
                                      width: `calc(${cellAssignment.duration * 100}% - 8px)`,
                                      zIndex: 10
                                    }}
                                    onClick={() => handleAssignmentClick(cellAssignment)}
                                  >
                                    <div className="p-2 h-full flex flex-col justify-center">
                                      <p className="text-xs font-medium text-white truncate">
                                        {project?.name}
                                      </p>
                                      <p className="text-[10px] text-white/80 truncate">
                                        {cellAssignment.zone}
                                      </p>
                                      {hasConflict && (
                                        <div className="absolute top-1 right-1">
                                          <AlertTriangle className="h-3 w-3 text-white" />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Unassigned Resources Panel */}
            {showUnassignedPanel && (
              <Card className="w-72 shrink-0 border-border/50 bg-card/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    Ressources non assignées
                  </CardTitle>
                  <CardDescription className="text-xs">Glisser vers le planning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                  {/* Equipment */}
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2">Engins</p>
                  {unassignedEquipment.length > 0 ? unassignedEquipment.map(eq => (
                    <div
                      key={eq.id}
                      draggable
                      onDragStart={() => handleDragStart(eq, false)}
                      className="p-2 rounded-lg border border-border/50 bg-muted/30 cursor-grab hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{eq.name}</p>
                          <p className="text-xs text-muted-foreground">{eq.location}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-muted-foreground italic py-2">Tous les engins sont assignés</p>
                  )}

                  {/* Teams */}
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-4">Équipes</p>
                  {unassignedTeams.length > 0 ? unassignedTeams.map(team => (
                    <div
                      key={team.id}
                      draggable
                      onDragStart={() => handleDragStart(team, true)}
                      className="p-2 rounded-lg border border-border/50 bg-blue-500/10 cursor-grab hover:border-blue-500/50 hover:bg-blue-500/20 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{team.name}</p>
                          <p className="text-xs text-muted-foreground">{team.members} membres</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-muted-foreground italic py-2">Toutes les équipes sont assignées</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="mt-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un équipement..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="service">En service</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="Grue">Grues</SelectItem>
                <SelectItem value="Pelleteuse">Pelleteuses</SelectItem>
                <SelectItem value="Bungalow">Bungalows</SelectItem>
                <SelectItem value="Compacteur">Compacteurs</SelectItem>
                <SelectItem value="Manutention">Manutention</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEquipment.map((eq) => (
              <Card 
                key={eq.id} 
                className={`border-border/50 bg-card/50 hover:border-primary/30 transition-colors ${
                  eq.urgent ? "border-amber-500/50" : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        eq.status === "service" ? "bg-emerald-500/20" :
                        eq.status === "maintenance" ? "bg-amber-500/20" :
                        "bg-muted"
                      }`}>
                        {eq.type === "Grue" && <Cog className={`h-6 w-6 ${eq.status === "service" ? "text-emerald-400" : eq.status === "maintenance" ? "text-amber-400" : "text-muted-foreground"}`} />}
                        {eq.type === "Pelleteuse" && <Wrench className={`h-6 w-6 ${eq.status === "service" ? "text-emerald-400" : eq.status === "maintenance" ? "text-amber-400" : "text-muted-foreground"}`} />}
                        {eq.type === "Bungalow" && <Package className={`h-6 w-6 ${eq.status === "service" ? "text-emerald-400" : eq.status === "maintenance" ? "text-amber-400" : "text-muted-foreground"}`} />}
                        {eq.type === "Compacteur" && <Cog className={`h-6 w-6 ${eq.status === "service" ? "text-emerald-400" : eq.status === "maintenance" ? "text-amber-400" : "text-muted-foreground"}`} />}
                        {eq.type === "Manutention" && <Package className={`h-6 w-6 ${eq.status === "service" ? "text-emerald-400" : eq.status === "maintenance" ? "text-amber-400" : "text-muted-foreground"}`} />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{eq.name}</h3>
                        <p className="text-sm text-muted-foreground">{eq.type}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir détails</DropdownMenuItem>
                        <DropdownMenuItem>Planifier maintenance</DropdownMenuItem>
                        <DropdownMenuItem>Historique</DropdownMenuItem>
                        <DropdownMenuItem>Réaffecter</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(eq.status)}
                      {eq.urgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Révision 48h
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{eq.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Prochain contrôle</span>
                      </div>
                      <span className={`font-medium ${eq.urgent ? "text-amber-400" : ""}`}>
                        {eq.nextControl}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Heatmap Tab */}
        <TabsContent value="heatmap" className="mt-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Planning de Charge RH
              </CardTitle>
              <CardDescription>Disponibilité des équipes par corps d&apos;état</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 overflow-x-auto">
                {/* Header */}
                <div className="grid grid-cols-8 gap-2 min-w-[600px]">
                  <div className="col-span-2"></div>
                  {weekLabels.map((week) => (
                    <div key={week} className="text-center text-xs font-medium text-muted-foreground">
                      {week}
                    </div>
                  ))}
                </div>

                {/* Heatmap Grid */}
                {trades.map((trade) => (
                  <div key={trade.id} className="grid grid-cols-8 gap-2 items-center min-w-[600px]">
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <trade.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{trade.name}</p>
                        <p className="text-xs text-muted-foreground">{trade.available}/{trade.total} dispo</p>
                      </div>
                    </div>
                    {trade.weeks.map((value, i) => (
                      <div
                        key={i}
                        className={`h-10 rounded-md flex items-center justify-center text-xs font-medium text-white ${getHeatmapColor(value)}`}
                        title={`${value}% de charge`}
                      >
                        {value}%
                      </div>
                    ))}
                  </div>
                ))}

                {/* Legend */}
                <div className="pt-4 border-t border-border/50 flex flex-wrap items-center gap-4 md:gap-6">
                  <span className="text-sm text-muted-foreground">Charge :</span>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-emerald-500/50" />
                    <span className="text-xs text-muted-foreground">&lt; 50%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-emerald-500" />
                    <span className="text-xs text-muted-foreground">50-75%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-amber-500" />
                    <span className="text-xs text-muted-foreground">75-90%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-red-500" />
                    <span className="text-xs text-muted-foreground">&gt; 90%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assignment Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détail de l&apos;affectation</DialogTitle>
            <DialogDescription>Modifier les paramètres de cette affectation</DialogDescription>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Conducteur / Responsable
                </Label>
                <Input 
                  value={selectedAssignment.conductor}
                  onChange={(e) => setSelectedAssignment({...selectedAssignment, conductor: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  Coût horaire (€/h)
                </Label>
                <Input 
                  type="number"
                  value={selectedAssignment.hourlyRate}
                  onChange={(e) => setSelectedAssignment({...selectedAssignment, hourlyRate: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Zone d&apos;intervention
                </Label>
                <Select 
                  value={selectedAssignment.zone}
                  onValueChange={(v) => setSelectedAssignment({...selectedAssignment, zone: v})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zone A">Zone A - Fondations</SelectItem>
                    <SelectItem value="Zone B">Zone B - Gros Oeuvre</SelectItem>
                    <SelectItem value="Zone C">Zone C - Terrassement</SelectItem>
                    <SelectItem value="Zone D">Zone D - Stockage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Semaine début</Label>
                  <Select 
                    value={selectedAssignment.startWeek.toString()}
                    onValueChange={(v) => setSelectedAssignment({...selectedAssignment, startWeek: parseInt(v)})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weekLabels.map((w, i) => (
                        <SelectItem key={i} value={i.toString()}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Durée (semaines)</Label>
                  <Input 
                    type="number"
                    min={1}
                    max={6}
                    value={selectedAssignment.duration}
                    onChange={(e) => setSelectedAssignment({...selectedAssignment, duration: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>Annuler</Button>
            <Button onClick={handleUpdateAssignment} className="bg-[#593196] hover:bg-[#593196]/90">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Assistant */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 z-50">
          <Card className="border-primary/30 bg-card shadow-2xl shadow-primary/10">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Matériel</CardTitle>
                  <CardDescription className="text-xs">Gestion prédictive du parc</CardDescription>
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
            <div className="p-4 pt-0">
              <div className="flex gap-2 mb-2 flex-wrap">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => {
                    setAiMessages(prev => [...prev, 
                      { role: "user", content: "Oui, rééquilibrer la charge" },
                      { role: "assistant", content: "Parfait ! J'ai rééquilibré la charge : la Pelleteuse #07 prendra en charge les tâches de terrassement sur Tour Hekla. La #04 sera libérée pour la maintenance. Planning mis à jour et notification envoyée au chef de chantier." }
                    ])
                  }}
                >
                  Oui, rééquilibrer
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={() => {
                    setAiMessages(prev => [...prev, 
                      { role: "user", content: "Voir les alternatives" },
                      { role: "assistant", content: "Voici les alternatives :\n• Pelleteuse #07 (Dépôt Nord) - Disponible\n• Location Loxam - Délai 24h, 450€/jour\n• Reporter le terrassement de 48h" }
                    ])
                  }}
                >
                  Alternatives
                </Button>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Question sur le matériel..." 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendAI()}
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSendAI}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
