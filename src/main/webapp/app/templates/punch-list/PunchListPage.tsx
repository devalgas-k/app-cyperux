"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Filter,
  Camera,
  Building2,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  MessageSquare,
  X,
  Sparkles,
  Send,
  ChevronRight,
  Calendar,
  FileText,
  Download,
  Image,
  ArrowRight,
  Award,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
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
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
// import { useLanguage } from "@/lib/i18n"

const punchItems = [
  {
    id: "RES-001",
    description: "Peinture écaillée sur mur nord",
    location: "Chambre 102",
    floor: "R+1",
    trade: "Peinture",
    company: "Déco-Pro",
    responsible: "Jean Dupont",
    status: "pending",
    priority: "low",
    reportedDate: "2026-05-03",
    dueDate: "2026-05-10",
    photoBefore: true,
    photoAfter: false,
    x: 35,
    y: 45,
  },
  {
    id: "RES-002",
    description: "Prise électrique hors service",
    location: "Salon",
    floor: "RDC",
    trade: "Électricité",
    company: "Elec-Plus",
    responsible: "Marc Leroy",
    status: "quitus",
    priority: "medium",
    reportedDate: "2026-05-01",
    dueDate: "2026-05-05",
    resolvedDate: "2026-05-04",
    quitusDate: "2026-05-05",
    photoBefore: true,
    photoAfter: true,
    x: 65,
    y: 30,
  },
  {
    id: "RES-003",
    description: "Fuite robinet salle de bain principale",
    location: "SDB 201",
    floor: "R+2",
    trade: "Plomberie",
    company: "Sarl Plomberie",
    responsible: "Pierre Martin",
    status: "resolved",
    priority: "high",
    reportedDate: "2026-05-04",
    dueDate: "2026-05-06",
    resolvedDate: "2026-05-05",
    photoBefore: true,
    photoAfter: true,
    x: 78,
    y: 62,
  },
  {
    id: "RES-004",
    description: "Carreau fissuré angle cuisine",
    location: "Cuisine",
    floor: "RDC",
    trade: "Carrelage",
    company: "Carrelages Martin",
    responsible: "Sophie Blanc",
    status: "pending",
    priority: "low",
    reportedDate: "2026-05-05",
    dueDate: "2026-05-12",
    photoBefore: true,
    photoAfter: false,
    x: 45,
    y: 55,
  },
  {
    id: "RES-005",
    description: "Porte d'entrée qui grince",
    location: "Chambre 103",
    floor: "R+1",
    trade: "Menuiserie",
    company: "Bois & Co",
    responsible: "Luc Bernard",
    status: "pending",
    priority: "low",
    reportedDate: "2026-05-05",
    dueDate: "2026-05-15",
    photoBefore: false,
    photoAfter: false,
    x: 22,
    y: 38,
  },
  {
    id: "RES-006",
    description: "VMC extraction bruyante",
    location: "SDB 101",
    floor: "R+1",
    trade: "CVC",
    company: "Sarl Plomberie",
    responsible: "Pierre Martin",
    status: "resolved",
    priority: "medium",
    reportedDate: "2026-05-02",
    dueDate: "2026-05-08",
    resolvedDate: "2026-05-07",
    photoBefore: true,
    photoAfter: true,
    x: 88,
    y: 42,
  },
  {
    id: "RES-007",
    description: "Peinture traces de rouleau visibles",
    location: "Palier R+2",
    floor: "R+2",
    trade: "Peinture",
    company: "Déco-Pro",
    responsible: "Jean Dupont",
    status: "pending",
    priority: "low",
    reportedDate: "2026-05-05",
    dueDate: "2026-05-12",
    photoBefore: true,
    photoAfter: false,
    x: 50,
    y: 20,
  },
  {
    id: "RES-008",
    description: "Peinture coulure sous fenêtre",
    location: "Chambre 201",
    floor: "R+2",
    trade: "Peinture",
    company: "Déco-Pro",
    responsible: "Jean Dupont",
    status: "pending",
    priority: "low",
    reportedDate: "2026-05-05",
    dueDate: "2026-05-12",
    photoBefore: true,
    photoAfter: false,
    x: 30,
    y: 35,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "quitus":
      return <Badge className="gap-1 bg-purple-500/20 text-purple-400 border-purple-500/30"><Award className="h-3 w-3" />Quitus</Badge>
    case "resolved":
      return <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><CheckCircle className="h-3 w-3" />Levée</Badge>
    case "pending":
      return <Badge variant="outline" className="gap-1 border-red-500/50 text-red-400"><AlertTriangle className="h-3 w-3" />À lever</Badge>
    default:
      return null
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive" className="text-xs">Urgent</Badge>
    case "medium":
      return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">Moyen</Badge>
    case "low":
      return <Badge variant="secondary" className="text-xs">Faible</Badge>
    default:
      return null
  }
}

export default function PunchListPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedFloor, setSelectedFloor] = useState("R+1")
  const [selectedItem, setSelectedItem] = useState<typeof punchItems[0] | null>(null)
  const [showAI, setShowAI] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCompany, setFilterCompany] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [showPVDialog, setShowPVDialog] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "J'ai identifié 12 réserves de peinture similaires. Souhaitez-vous créer une action groupée pour l'entreprise 'Déco-Pro' ?",
    },
  ])
  const [aiInput, setAiInput] = useState("")

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages([
      ...aiMessages,
      { role: "user", content: aiInput },
      {
        role: "assistant",
        content: "Action groupée créée pour Déco-Pro. J'ai regroupé les 12 réserves de peinture avec une date limite commune au 12/05/2026. Un email de notification a été préparé. Souhaitez-vous l'envoyer maintenant ?",
      },
    ])
    setAiInput("")
  }

  const pendingCount = punchItems.filter(i => i.status === "pending").length
  const resolvedCount = punchItems.filter(i => i.status === "resolved").length
  const quitusCount = punchItems.filter(i => i.status === "quitus").length
  const totalCount = punchItems.length

  const floorItems = punchItems.filter(i => i.floor === selectedFloor)

  const companies = [...new Set(punchItems.map(i => i.company))]
  const locations = [...new Set(punchItems.map(i => i.location))]

  const filteredItems = punchItems.filter(i => {
    const matchesSearch = i.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || i.status === filterStatus
    const matchesCompany = filterCompany === "all" || i.company === filterCompany
    const matchesLocation = filterLocation === "all" || i.location === filterLocation
    return matchesSearch && matchesStatus && matchesCompany && matchesLocation
  })

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gestion des Réserves & OPR</h1>
            <p className="text-muted-foreground">
              Suivi et levée des réserves de réception
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showPVDialog} onOpenChange={setShowPVDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Générer PV de réception
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Générer le Procès-Verbal de Réception</DialogTitle>
                  <DialogDescription>
                    Ce document compile toutes les réserves et leur statut actuel
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Card className="border-[#593196]/30 bg-[#593196]/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#593196]" />
                        <div>
                          <p className="font-medium">PV de Réception - Tour Hekla</p>
                          <p className="text-sm text-muted-foreground">
                            {totalCount} réserves • {quitusCount} quitus • {pendingCount} à lever
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Réserves avec quitus</span>
                      <span className="font-medium text-emerald-400">{quitusCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Réserves levées</span>
                      <span className="font-medium text-blue-400">{resolvedCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Réserves en attente</span>
                      <span className="font-medium text-red-400">{pendingCount}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Taux de clôture</span>
                      <span className="font-bold text-[#593196]">{Math.round(((quitusCount + resolvedCount) / totalCount) * 100)}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Inclure dans le PV</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Photos avant/après
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Historique des actions
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Signatures électroniques
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowPVDialog(false)}>
                    Annuler
                  </Button>
                  <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                    <Download className="h-4 w-4" />
                    Générer le PV
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                  <Plus className="h-4 w-4" />
                  Nouvelle réserve
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une réserve</DialogTitle>
                  <DialogDescription>
                    Documentez le défaut constaté
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Ex: Peinture écaillée sur mur nord" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Localisation</label>
                      <Input placeholder="Ex: Chambre 102" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Étage</label>
                      <Select defaultValue="R+1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RDC">RDC</SelectItem>
                          <SelectItem value="R+1">R+1</SelectItem>
                          <SelectItem value="R+2">R+2</SelectItem>
                          <SelectItem value="R+3">R+3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Entreprise</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deco-pro">Déco-Pro</SelectItem>
                          <SelectItem value="elec-plus">Elec-Plus</SelectItem>
                          <SelectItem value="plomberie">Sarl Plomberie</SelectItem>
                          <SelectItem value="carrelages">Carrelages Martin</SelectItem>
                          <SelectItem value="bois">Bois & Co</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date limite</label>
                      <Input type="date" defaultValue="2026-05-15" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photo avant (constat)</label>
                    <div className="flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
                      <div className="text-center">
                        <Camera className="mx-auto h-6 w-6 text-muted-foreground" />
                        <p className="mt-1 text-xs text-muted-foreground">
                          Ajouter des photos
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-[#593196] hover:bg-[#593196]/90">
                    Créer la réserve
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-red-500/20 bg-red-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">À lever</p>
                  <p className="text-3xl font-bold text-red-400">{pendingCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Levées</p>
                  <p className="text-3xl font-bold text-emerald-400">{resolvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quitus</p>
                  <p className="text-3xl font-bold text-purple-400">{quitusCount}</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-muted-foreground">Progression</p>
                <p className="text-3xl font-bold">{Math.round(((quitusCount + resolvedCount) / totalCount) * 100)}%</p>
              </div>
              <Progress value={((quitusCount + resolvedCount) / totalCount) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Floor Plan View */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Plan d&apos;étage - {selectedFloor}
                </CardTitle>
                <CardDescription>Cliquez sur une épingle pour voir les détails</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={selectedFloor} onValueChange={setSelectedFloor}>
                  <TabsList>
                    <TabsTrigger value="RDC">RDC</TabsTrigger>
                    <TabsTrigger value="R+1">R+1</TabsTrigger>
                    <TabsTrigger value="R+2">R+2</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[16/9] rounded-lg border bg-muted/50 overflow-hidden">
              {/* Floor plan grid */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
              
              {/* Room outlines */}
              <svg className="absolute inset-0 h-full w-full">
                {selectedFloor === "RDC" && (
                  <>
                    <rect x="5%" y="10%" width="45%" height="80%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="55%" y="10%" width="40%" height="80%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <text x="27%" y="50%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="14" textAnchor="middle">SALON</text>
                    <text x="75%" y="50%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="14" textAnchor="middle">CUISINE</text>
                  </>
                )}
                {selectedFloor === "R+1" && (
                  <>
                    <rect x="5%" y="10%" width="30%" height="35%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="38%" y="10%" width="25%" height="35%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="66%" y="10%" width="29%" height="35%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="5%" y="50%" width="40%" height="40%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="48%" y="50%" width="47%" height="40%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <text x="20%" y="28%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Chambre 102</text>
                    <text x="50%" y="28%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Chambre 103</text>
                    <text x="80%" y="28%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">SDB 101</text>
                    <text x="25%" y="70%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Palier</text>
                    <text x="72%" y="70%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Dégagement</text>
                  </>
                )}
                {selectedFloor === "R+2" && (
                  <>
                    <rect x="5%" y="10%" width="40%" height="40%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="50%" y="10%" width="45%" height="40%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <rect x="5%" y="55%" width="90%" height="35%" fill="none" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="2" />
                    <text x="25%" y="30%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Chambre 201</text>
                    <text x="72%" y="30%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">SDB 201</text>
                    <text x="50%" y="72%" fill="hsl(var(--muted-foreground) / 0.5)" fontSize="12" textAnchor="middle">Palier R+2</text>
                  </>
                )}
              </svg>

              {/* Punch item pins with numbers */}
              {floorItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${
                    item.status === "quitus"
                      ? "bg-purple-500"
                      : item.status === "resolved"
                      ? "bg-emerald-500"
                      : "bg-red-500 animate-pulse"
                  } ${selectedItem?.id === item.id ? "ring-4 ring-white/50 scale-125" : ""}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => {
                    setSelectedItem(item)
                    setShowDetailSheet(true)
                  }}
                >
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-4 rounded-lg bg-background/90 p-2 text-xs backdrop-blur">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span>À lever</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span>Levée</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span>Quitus</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Liste des Réserves</CardTitle>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="w-48 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="pending">À lever</SelectItem>
                    <SelectItem value="resolved">Levées</SelectItem>
                    <SelectItem value="quitus">Quitus</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCompany} onValueChange={setFilterCompany}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Entreprise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {companies.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    {locations.map(l => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref.</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedItem?.id === item.id ? "bg-[#593196]/10" : ""
                    }`}
                    onClick={() => {
                      setSelectedItem(item)
                      setShowDetailSheet(true)
                    }}
                  >
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="max-w-48 truncate">{item.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {item.location}
                        <span className="text-xs text-muted-foreground">({item.floor})</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {item.responsible.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{item.responsible}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {item.photoBefore && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <img className="h-3 w-3" />
                            Avant
                          </Badge>
                        )}
                        {item.photoAfter && (
                          <Badge variant="outline" className="gap-1 text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                            <img className="h-3 w-3" />
                            Après
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {item.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Panel */}
      {showAI && (
        <Card className="w-80 flex flex-col border-[#593196]/30 bg-[#593196]/5">
          <CardHeader className="border-b border-[#593196]/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#593196]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant OPR</CardTitle>
                  <CardDescription className="text-xs">Analyse des réserves</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowAI(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-3">
            <div className="space-y-3">
              {aiMessages.map((message, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-sm ${
                    message.role === "assistant"
                      ? "bg-[#593196]/20 border border-[#593196]/30"
                      : "bg-muted ml-4"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              
              {/* AI Suggestion Action */}
              <div className="rounded-lg border border-[#593196]/30 bg-[#593196]/10 p-3">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-[#593196] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">Action groupée suggérée</p>
                    <p className="text-sm mb-3">
                      Regrouper les 12 réserves de peinture pour Déco-Pro avec une seule notification.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs bg-[#593196] hover:bg-[#593196]/90">
                        Créer l&apos;action
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="border-t border-[#593196]/20 p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Posez une question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="text-sm"
              />
              <Button
                size="icon"
                onClick={handleAISend}
                className="bg-[#593196] hover:bg-[#593196]/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Detail Sheet */}
      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{selectedItem.id}</span>
                  {getStatusBadge(selectedItem.status)}
                </SheetTitle>
                <SheetDescription>
                  {selectedItem.description}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Location Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Localisation</p>
                    <p className="font-medium">{selectedItem.location}</p>
                    <p className="text-sm text-muted-foreground">{selectedItem.floor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Entreprise</p>
                    <p className="font-medium">{selectedItem.company}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Responsable</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {selectedItem.responsible.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedItem.responsible}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date limite</p>
                    <p className="font-medium">{selectedItem.dueDate}</p>
                  </div>
                </div>

                {/* Photos Before/After */}
                <div>
                  <p className="text-sm font-medium mb-3">Photos avant / après</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Constat initial</p>
                      {selectedItem.photoBefore ? (
                        <div className="aspect-square rounded-lg bg-muted flex items-center justify-center border-2 border-red-500/30">
                          <div className="text-center">
                            <img className="h-8 w-8 mx-auto text-red-400 mb-2" />
                            <p className="text-xs text-muted-foreground">Photo avant</p>
                            <Badge variant="outline" className="mt-2 text-xs border-red-500/30 text-red-400">
                              {selectedItem.reportedDate}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                            <p className="text-xs text-muted-foreground">Pas de photo</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Après levée</p>
                      {selectedItem.photoAfter ? (
                        <div className="aspect-square rounded-lg bg-muted flex items-center justify-center border-2 border-emerald-500/30">
                          <div className="text-center">
                            <img className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
                            <p className="text-xs text-muted-foreground">Photo après</p>
                            <Badge variant="outline" className="mt-2 text-xs border-emerald-500/30 text-emerald-400">
                              {selectedItem.resolvedDate}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                          <div className="text-center">
                            <Camera className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                            <p className="text-xs text-muted-foreground">Ajouter photo</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {selectedItem.status === "pending" && (
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marquer comme levée
                    </Button>
                  )}
                  {selectedItem.status === "resolved" && (
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Award className="h-4 w-4 mr-2" />
                      Donner quitus
                    </Button>
                  )}
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Commenter
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Floating AI Button when panel is closed */}
      {!showAI && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-[#593196] hover:bg-[#593196]/90"
          onClick={() => setShowAI(true)}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
