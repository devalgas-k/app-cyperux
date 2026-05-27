"use client"

import { useState } from "react"
import {
  Camera,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Upload,
  MessageSquare,
  X,
  Sparkles,
  Send,
  Eye,
  MapPin,
  Calendar,
  User,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
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
} from "@/shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { cn } from "@/shared/utils"

const sitePhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=400",
    title: "Fissure dalle R+1",
    location: "Bâtiment A - R+1",
    date: "2026-05-05",
    severity: "high",
    aiAnalysis: "Fissure structurelle détectée. Probabilité de non-conformité : 85%",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=400",
    title: "Livraison acier",
    location: "Zone de stockage",
    date: "2026-05-04",
    severity: "medium",
    aiAnalysis: "Livraison conforme. Quantité vérifiée : 12 tonnes",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=400",
    title: "Clôture sécurité",
    location: "Périmètre Sud",
    date: "2026-05-03",
    severity: "low",
    aiAnalysis: "Installation conforme aux normes HSE",
  },
]

const siteIssues = [
  {
    id: "AL-001",
    title: "Défaut de cure dalle R+1",
    description: "Cure insuffisante constatée sur la dalle du niveau R+1, risque de fissuration",
    severity: "high",
    status: "reported",
    location: "Bâtiment A - R+1",
    reportedBy: "Jean Dupont",
    reportedAt: "2026-05-05 09:34:12",
    assignedTo: "Marc Leblanc",
    photos: 3,
  },
  {
    id: "AL-002",
    title: "Retard livraison acier",
    description: "Livraison d'acier HA prévue le 02/05, reçue le 04/05",
    severity: "medium",
    status: "resolved",
    location: "Zone de stockage",
    reportedBy: "Sophie Martin",
    reportedAt: "2026-05-02 14:22:08",
    assignedTo: "Pierre Durand",
    photos: 1,
  },
  {
    id: "AL-003",
    title: "Infiltration eau sous-sol",
    description: "Infiltration détectée au niveau -1, près du local technique",
    severity: "high",
    status: "in_progress",
    location: "Sous-sol - Local Tech",
    reportedBy: "Marc Leblanc",
    reportedAt: "2026-05-04 16:45:33",
    assignedTo: "Jean Dupont",
    photos: 5,
  },
  {
    id: "AL-004",
    title: "Non-conformité ferraillage",
    description: "Espacement des armatures non conforme au plan EXE",
    severity: "high",
    status: "reported",
    location: "Bâtiment B - RDC",
    reportedBy: "Bureau de contrôle",
    reportedAt: "2026-05-05 11:12:45",
    assignedTo: null,
    photos: 2,
  },
  {
    id: "AL-005",
    title: "Manque EPI chantier",
    description: "Stock de casques et gilets insuffisant pour les nouveaux arrivants",
    severity: "medium",
    status: "resolved",
    location: "Base vie",
    reportedBy: "Responsable HSE",
    reportedAt: "2026-05-01 08:00:00",
    assignedTo: "Service Achats",
    photos: 0,
  },
]

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high":
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Haute</Badge>
    case "medium":
      return <Badge className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/30"><Clock className="h-3 w-3" />Moyenne</Badge>
    case "low":
      return <Badge variant="secondary" className="gap-1">Basse</Badge>
    default:
      return null
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "reported":
      return <Badge variant="outline" className="gap-1 border-red-500/50 text-red-400">Signalé</Badge>
    case "in_progress":
      return <Badge className="gap-1 bg-blue-500/20 text-blue-400 border-blue-500/30">En cours</Badge>
    case "resolved":
      return <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><CheckCircle className="h-3 w-3" />Résolu</Badge>
    default:
      return null
  }
}

export default function SiteIssuesPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedPhoto, setSelectedPhoto] = useState<typeof sitePhotos[0] | null>(null)
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "Analyse d'image : Fissure structurelle détectée sur la dalle R+1. Probabilité de non-conformité : 85%. Je recommande une inspection par le bureau de contrôle sous 48h.",
    },
  ])
  const [aiInput, setAiInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const handleStatClick = (filter: string) => {
    if (statusFilter === filter) {
      setStatusFilter(null)
      toast.info("Filtre retire")
    } else {
      setStatusFilter(filter)
      const labels: Record<string, string> = {
        high: "aleas critiques",
        in_progress: "aleas en cours",
        resolved: "aleas resolus"
      }
      toast.success(`Filtre: ${labels[filter]}`)
    }
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages([
      ...aiMessages,
      { role: "user", content: aiInput },
      {
        role: "assistant",
        content: "J'ai analysé les 3 dernières photos du chantier. 2 anomalies détectées nécessitent une attention immédiate. Souhaitez-vous que je génère un rapport d'incident automatique ?",
      },
    ])
    setAiInput("")
  }

  const filteredIssues = siteIssues.filter((issue) => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || 
      (statusFilter === "high" && issue.severity === "high") ||
      (statusFilter === "in_progress" && issue.status === "in_progress") ||
      (statusFilter === "resolved" && issue.status === "resolved")
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Aléas Terrain</h1>
            <p className="text-muted-foreground">
              Suivi des incidents et anomalies de chantier
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                <Plus className="h-4 w-4" />
                Signaler un aléa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouveau signalement</DialogTitle>
                <DialogDescription>
                  Documentez l&apos;incident avec photos et description
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input placeholder="Description courte de l'aléa" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gravité</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Haute - Arrêt chantier</SelectItem>
                        <SelectItem value="medium">Moyenne - Impact planning</SelectItem>
                        <SelectItem value="low">Basse - À surveiller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Localisation</label>
                  <Input placeholder="Ex: Bâtiment A - R+1 - Zone Nord" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description détaillée</label>
                  <Textarea placeholder="Décrivez l'incident en détail..." rows={3} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Photos</label>
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Glissez vos photos ou cliquez pour télécharger
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="bg-[#593196] hover:bg-[#593196]/90">
                  Créer le signalement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Filter Badge */}
        {statusFilter && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Filter className="h-3 w-3" />
              Filtre: {statusFilter === "high" ? "Critiques" : statusFilter === "in_progress" ? "En cours" : "Resolus"}
              <button onClick={() => setStatusFilter(null)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
            <span className="text-sm text-muted-foreground">
              {filteredIssues.length} alea(s) affiche(s)
            </span>
          </div>
        )}

        {/* KPI Cards - Interactive */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card 
            className={cn(
              "border-red-500/20 bg-red-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "high" && "ring-2 ring-red-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => handleStatClick("high")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aleas critiques</p>
                  <p className="text-2xl font-bold text-red-400">{siteIssues.filter(i => i.severity === "high").length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card 
            className={cn(
              "border-amber-500/20 bg-amber-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "in_progress" && "ring-2 ring-amber-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => handleStatClick("in_progress")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-amber-400">{siteIssues.filter(i => i.status === "in_progress").length}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
          <Card 
            className={cn(
              "border-emerald-500/20 bg-emerald-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "resolved" && "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => handleStatClick("resolved")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolus ce mois</p>
                  <p className="text-2xl font-bold text-emerald-400">{siteIssues.filter(i => i.status === "resolved").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          <Card 
            className="border-[#593196]/20 bg-[#593196]/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
            onClick={() => toast.info("47 photos analysees par l'IA ce mois")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Photos analysees</p>
                  <p className="text-2xl font-bold text-[#593196]">47</p>
                </div>
                <Camera className="h-8 w-8 text-[#593196]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Photos Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photos Récentes du Chantier
            </CardTitle>
            <CardDescription>Cliquez sur une photo pour l&apos;analyse IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {sitePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                    selectedPhoto?.id === photo.id
                      ? "border-[#593196] ring-2 ring-[#593196]/50"
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="aspect-video bg-muted">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <div>
                      <p className="font-medium text-white">{photo.title}</p>
                      <p className="text-xs text-white/70">{photo.location}</p>
                    </div>
                  </div>
                  {photo.severity === "high" && (
                    <div className="absolute right-2 top-2">
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Alerte
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="sm" variant="secondary" className="h-7 gap-1 text-xs">
                      <Eye className="h-3 w-3" />
                      Analyser
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Registre des Aléas</CardTitle>
                <CardDescription>Historique et suivi des incidents</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="w-64 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ref.</TableHead>
                  <TableHead>Aléa</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Gravité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Assigné</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="group">
                    <TableCell className="font-mono text-xs">{issue.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-xs text-muted-foreground">{issue.reportedAt}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {issue.location}
                      </div>
                    </TableCell>
                    <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                    <TableCell>{getStatusBadge(issue.status)}</TableCell>
                    <TableCell>
                      {issue.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {issue.assignedTo.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{issue.assignedTo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Non assigné</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span>{issue.photos}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* AI Sidebar */}
      {showAIPanel && (
        <Card className="w-96 shrink-0 flex flex-col border-[#593196]/30 bg-[#593196]/5">
          <CardHeader className="border-b border-[#593196]/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Analyse IA</CardTitle>
                  <CardDescription className="text-xs">Vision par ordinateur</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAIPanel(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {selectedPhoto && (
            <div className="border-b border-[#593196]/20 p-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{selectedPhoto.title}</span>
                  {getSeverityBadge(selectedPhoto.severity)}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedPhoto.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedPhoto.date}
                  </span>
                </div>
              </div>
            </div>
          )}

          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#593196]">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="border-t border-[#593196]/20 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Poser une question sur l'image..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleAISend} className="bg-[#593196] hover:bg-[#593196]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Générer rapport
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Créer fiche incident
              </Button>
            </div>
          </div>
        </Card>
      )}

      {!showAIPanel && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] shadow-lg hover:bg-[#593196]/90"
          onClick={() => setShowAIPanel(true)}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
