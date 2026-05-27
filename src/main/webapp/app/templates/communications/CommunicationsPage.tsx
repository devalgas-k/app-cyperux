"use client"

import { useState } from "react"
import {
  Mail,
  MessageSquare,
  Bell,
  Send,
  Users,
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  X,
  Sparkles,
  GripVertical,
  Image,
  Type,
  Link2,
  Columns,
  MousePointerClick,
  Share2,
  Copy,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
// import { useLanguage } from "@/lib/i18n"

const campaigns = [
  {
    id: "1",
    name: "Newsletter Chantier Hekla",
    type: "email",
    status: "sent",
    recipients: 245,
    openRate: 85,
    clickRate: 42,
    sentAt: "06/05/2026 09:00",
    subject: "Avancement Phase 2 - Gros Oeuvre termine",
  },
  {
    id: "2",
    name: "Alerte Securite SMS",
    type: "sms",
    status: "sent",
    recipients: 89,
    openRate: 98,
    clickRate: null,
    sentAt: "05/05/2026 14:30",
    subject: "URGENT: Zone B fermee - Intervention grue",
  },
  {
    id: "3",
    name: "Flash WhatsApp Partenaires",
    type: "whatsapp",
    status: "sent",
    recipients: 34,
    openRate: 94,
    clickRate: 67,
    sentAt: "06/05/2026 16:00",
    subject: "Livraison ferraillage confirmee pour demain",
  },
  {
    id: "4",
    name: "Rapport Hebdo Eco-Quartier",
    type: "email",
    status: "scheduled",
    recipients: 156,
    openRate: null,
    clickRate: null,
    sentAt: "07/05/2026 08:00",
    subject: "Synthese semaine 19 - Indicateurs carbone",
  },
  {
    id: "5",
    name: "Notification Push - Livraison",
    type: "push",
    status: "sent",
    recipients: 12,
    openRate: 100,
    clickRate: 75,
    sentAt: "06/05/2026 11:45",
    subject: "Toupie beton arrivee Zone A",
  },
]

const mailingLists = [
  { id: "clients", name: "Clients & Maitres d'Ouvrage", count: 48, color: "bg-blue-500" },
  { id: "employees", name: "Employes & Equipes Terrain", count: 156, color: "bg-emerald-500" },
  { id: "partners", name: "Partenaires & Sous-Traitants", count: 89, color: "bg-purple-500" },
  { id: "investors", name: "Investisseurs", count: 12, color: "bg-amber-500" },
]

const editorBlocks = [
  { id: "header", icon: Type, label: "En-tete", type: "header" },
  { id: "text", icon: Type, label: "Texte", type: "text" },
  { id: "image", icon: Image, label: "Image", type: "image" },
  { id: "button", icon: MousePointerClick, label: "Bouton", type: "button" },
  { id: "columns", icon: Columns, label: "Colonnes", type: "columns" },
  { id: "link", icon: Link2, label: "Lien", type: "link" },
]

const newsletterContent = [
  { id: "1", type: "header", content: "Tour Hekla - Avancement Phase 2" },
  { id: "2", type: "image", content: "photo-chantier-hekla.jpg" },
  { id: "3", type: "text", content: "Nous avons le plaisir de vous annoncer l'achevement du gros oeuvre..." },
  { id: "4", type: "button", content: "Voir le rapport complet" },
]

export default function CommunicationsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState(newsletterContent)
  const [selectedLists, setSelectedLists] = useState<string[]>(["employees"])

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || campaign.type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Envoye</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Programme</Badge>
      case "draft":
        return <Badge variant="outline">Brouillon</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "email":
        return <Badge variant="outline" className="gap-1"><Mail className="h-3 w-3" />Email</Badge>
      case "sms":
        return <Badge variant="outline" className="gap-1"><Smartphone className="h-3 w-3" />SMS</Badge>
      case "whatsapp":
        return <Badge variant="outline" className="gap-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/30"><MessageSquare className="h-3 w-3" />WhatsApp</Badge>
      case "push":
        return <Badge variant="outline" className="gap-1"><Bell className="h-3 w-3" />Push</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const handleDragStart = (blockType: string) => {
    setDraggedBlock(blockType)
  }

  const handleDrop = () => {
    if (draggedBlock) {
      const newBlock = {
        id: `block-${Date.now()}`,
        type: draggedBlock,
        content: draggedBlock === "header" ? "Nouveau titre" : 
                 draggedBlock === "text" ? "Nouveau paragraphe..." :
                 draggedBlock === "button" ? "Cliquez ici" : "Nouveau contenu"
      }
      setEditorContent([...editorContent, newBlock])
      setDraggedBlock(null)
    }
  }

  const avgOpenRate = Math.round(
    campaigns.filter(c => c.openRate).reduce((sum, c) => sum + (c.openRate || 0), 0) / 
    campaigns.filter(c => c.openRate).length
  )

  const avgClickRate = Math.round(
    campaigns.filter(c => c.clickRate).reduce((sum, c) => sum + (c.clickRate || 0), 0) / 
    campaigns.filter(c => c.clickRate).length
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Centre de Communication & Campagnes</h1>
          <p className="text-muted-foreground">Gerez vos communications internes et externes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setShowEditor(true)}>
            <Edit className="h-4 w-4" />
            Editeur Newsletter
          </Button>
          <Dialog open={showNewCampaign} onOpenChange={setShowNewCampaign}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle Campagne
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Creer une nouvelle campagne</DialogTitle>
                <DialogDescription>
                  Configurez votre communication et selectionnez les destinataires
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nom de la campagne</Label>
                  <Input placeholder="Ex: Newsletter Projet Hekla" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Canal</Label>
                    <Select defaultValue="email">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="push">Notification Push</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priorite</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Objet</Label>
                  <Input placeholder="Objet du message" />
                </div>
                <div className="grid gap-2">
                  <Label>Contenu</Label>
                  <Textarea placeholder="Redigez votre message..." className="min-h-[100px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Listes de diffusion</Label>
                  <div className="space-y-2 rounded-lg border p-3">
                    {mailingLists.map((list) => (
                      <div key={list.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            id={list.id}
                            checked={selectedLists.includes(list.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLists([...selectedLists, list.id])
                              } else {
                                setSelectedLists(selectedLists.filter(id => id !== list.id))
                              }
                            }}
                          />
                          <div className={`h-2 w-2 rounded-full ${list.color}`} />
                          <label htmlFor={list.id} className="text-sm font-medium cursor-pointer">
                            {list.name}
                          </label>
                        </div>
                        <Badge variant="secondary">{list.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                  Annuler
                </Button>
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Programmer
                </Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Envoyer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards - Dashboard */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux d&apos;Ouverture</p>
                <p className="text-2xl font-bold">{avgOpenRate}%</p>
                <p className="text-xs text-emerald-400">+3% vs mois dernier</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Eye className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Clics</p>
                <p className="text-2xl font-bold">{avgClickRate}%</p>
                <p className="text-xs text-emerald-400">+5% vs mois dernier</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <MousePointerClick className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portee (Reach)</p>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-xs text-muted-foreground">utilisateurs atteints</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emails</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground">ce mois</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SMS/WhatsApp</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">ce mois</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="lists">Listes de Diffusion</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une campagne..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les canaux</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="push">Push</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaigns Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campagne</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Destinataires</TableHead>
                  <TableHead className="text-right">Ouverture</TableHead>
                  <TableHead className="text-right">Clics</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {campaign.subject}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(campaign.type)}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-right">{campaign.recipients}</TableCell>
                    <TableCell className="text-right">
                      {campaign.openRate ? (
                        <span className={campaign.openRate >= 80 ? "text-emerald-400" : ""}>
                          {campaign.openRate}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.clickRate ? (
                        <span className={campaign.clickRate >= 50 ? "text-emerald-400" : ""}>
                          {campaign.clickRate}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {campaign.sentAt || "Non programme"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Dupliquer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="lists" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mailingLists.map((list) => (
              <Card key={list.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full ${list.color}`} />
                      <CardTitle className="text-base">{list.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-lg">{list.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(5, list.count))].map((_, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {list.count > 5 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                        +{list.count - 5}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Gerer
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance par canal</CardTitle>
                <CardDescription>Taux d&apos;ouverture et clics sur 30 jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { channel: "Email", open: 85, click: 42, color: "bg-blue-500" },
                    { channel: "SMS", open: 98, click: 0, color: "bg-purple-500" },
                    { channel: "WhatsApp", open: 94, click: 67, color: "bg-emerald-500" },
                    { channel: "Push", open: 100, click: 75, color: "bg-amber-500" },
                  ].map((item) => (
                    <div key={item.channel} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.channel}</span>
                        <span className="text-muted-foreground">
                          {item.open}% ouverture | {item.click}% clics
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Progress value={item.open} className="h-2 flex-1" />
                        <Progress value={item.click} className="h-2 flex-1 [&>div]:bg-primary/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Meilleur moment</CardTitle>
                <CardDescription>Pour envoyer vos campagnes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">Mardi</p>
                  <p className="text-lg text-muted-foreground">9h00 - 10h00</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm text-center">
                  <p>+23% de taux d&apos;ouverture</p>
                  <p className="text-muted-foreground">par rapport aux autres creneaux</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Newsletter Editor Dialog */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Editeur de Newsletter</DialogTitle>
            <DialogDescription>
              Glissez-deposez les blocs pour construire votre newsletter
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
            {/* Sidebar - Blocks */}
            <div className="col-span-1 space-y-2 overflow-y-auto">
              <p className="text-sm font-medium text-muted-foreground mb-2">Blocs disponibles</p>
              {editorBlocks.map((block) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={() => handleDragStart(block.type)}
                  className="flex items-center gap-2 p-2 rounded-lg border cursor-move hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <block.icon className="h-4 w-4" />
                  <span className="text-sm">{block.label}</span>
                </div>
              ))}
            </div>
            
            {/* Editor Canvas */}
            <div 
              className="col-span-3 rounded-lg border-2 border-dashed p-4 overflow-y-auto bg-white dark:bg-zinc-900"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="space-y-3">
                {editorContent.map((block, index) => (
                  <div 
                    key={block.id}
                    className="group relative rounded-lg border p-3 hover:border-primary/50 transition-colors"
                  >
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </div>
                    {block.type === "header" && (
                      <h2 className="text-xl font-bold text-foreground">{block.content}</h2>
                    )}
                    {block.type === "text" && (
                      <p className="text-muted-foreground">{block.content}</p>
                    )}
                    {block.type === "image" && (
                      <div className="h-32 rounded-lg bg-muted flex items-center justify-center">
                        <img className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    {block.type === "button" && (
                      <Button className="w-full">{block.content}</Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute -right-2 -top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setEditorContent(editorContent.filter(b => b.id !== block.id))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {editorContent.length === 0 && (
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    Glissez des blocs ici pour commencer
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditor(false)}>
              Annuler
            </Button>
            <Button variant="outline">
              Apercu
            </Button>
            <Button className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Chat - Tour Hekla Flash */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <Card className="border-primary/30 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 animate-pulse">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm">Assistant Communication</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 text-sm border border-primary/20">
                <div className="flex items-start gap-2">
                  <Share2 className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Flash Info Reseaux Sociaux</p>
                    <p className="mt-1 text-muted-foreground">
                      Base sur l&apos;avancement du projet Tour Hekla (Phase 2 terminee a 100%), 
                      j&apos;ai redige un flash info de succes pour vos reseaux sociaux.
                    </p>
                  </div>
                </div>
                <div className="mt-3 rounded-lg bg-background/50 p-3 text-xs">
                  <p className="font-medium">Apercu du post:</p>
                  <p className="mt-1 italic text-muted-foreground">
                    &quot;Fiers d&apos;annoncer l&apos;achevement du gros oeuvre de la Tour Hekla! 
                    Une etape majeure franchie dans les delais. Bravo a toutes les equipes! 
                    #Construction #BTP #TourHekla&quot;
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Publier
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    IN
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    TW
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    FB
                  </Button>
                  <Button size="sm" variant="ghost">
                    Modifier
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Demander une modification..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="text-sm"
                />
                <Button size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
