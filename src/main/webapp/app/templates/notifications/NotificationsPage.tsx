"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Filter,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  X,
  Trash2,
  Settings,
  Smartphone,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  CalendarDays,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Send,
  Shield,
  FileText,
  Truck,
  DollarSign,
  Users,
  Building,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Archive,
  Eye,
  EyeOff,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
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
import { Textarea } from "@/shared/components/ui/textarea"

type Priority = "critical" | "important" | "info"
type NotificationStatus = "unread" | "read" | "archived"

interface Notification {
  id: string
  title: string
  description: string
  priority: Priority
  status: NotificationStatus
  timestamp: Date
  project?: string
  category: string
  icon: React.ReactNode
  actions?: { label: string; action: string }[]
}

const priorityConfig: Record<Priority, { label: string; color: string; bgColor: string; borderColor: string }> = {
  critical: {
    label: "Critique",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/50",
  },
  important: {
    label: "Important",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/50",
  },
  info: {
    label: "Info",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
  },
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "ARRÊT DE CHANTIER IMMÉDIAT",
    description: "Fissure structurelle détectée sur le poteau P-12 au niveau R+3. Évacuation de la zone requise.",
    priority: "critical",
    status: "unread",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    project: "Tour Hekla",
    category: "HSE",
    icon: <Shield className="h-4 w-4" />,
    actions: [
      { label: "Voir rapport", action: "view_report" },
      { label: "Contacter ingénieur structure", action: "contact" },
    ],
  },
  {
    id: "2",
    title: "Alerte HSE - EPI non conforme",
    description: "3 ouvriers détectés sans casque dans la zone de levage. Intervention immédiate requise.",
    priority: "critical",
    status: "unread",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    project: "Tour Hekla",
    category: "HSE",
    icon: <AlertTriangle className="h-4 w-4" />,
    actions: [
      { label: "Voir caméra", action: "view_camera" },
      { label: "Alerter chef d'équipe", action: "alert_supervisor" },
    ],
  },
  {
    id: "3",
    title: "Retard livraison béton",
    description: "Toupie #42 bloquée dans embouteillage A86. Retard estimé : 45 min. Impact sur coulage dalle N3.",
    priority: "important",
    status: "unread",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    project: "Eco-Quartier Ivry",
    category: "Logistique",
    icon: <Truck className="h-4 w-4" />,
    actions: [
      { label: "Voir itinéraire", action: "view_route" },
      { label: "Reprogrammer", action: "reschedule" },
    ],
  },
  {
    id: "4",
    title: "Question technique - Réservation CVC",
    description: "Conflit détecté entre réservation CVC et ferraillage poutre P-08. Validation bureau d'études requise.",
    priority: "important",
    status: "unread",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    project: "Gare du Nord Extension",
    category: "Technique",
    icon: <Building className="h-4 w-4" />,
    actions: [
      { label: "Voir BIM", action: "view_bim" },
      { label: "Créer RFI", action: "create_rfi" },
    ],
  },
  {
    id: "5",
    title: "Dépassement budget prévisionnel",
    description: "Le lot électricité dépasse de 8% le budget initial. Analyse des écarts disponible.",
    priority: "important",
    status: "read",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    project: "Tour Hekla",
    category: "Finance",
    icon: <DollarSign className="h-4 w-4" />,
    actions: [
      { label: "Voir analyse", action: "view_analysis" },
    ],
  },
  {
    id: "6",
    title: "Nouveau document disponible",
    description: "Plan de coffrage niveau R+4 - Indice C validé BPE par le bureau de contrôle.",
    priority: "info",
    status: "unread",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    project: "Tour Hekla",
    category: "Documents",
    icon: <FileText className="h-4 w-4" />,
    actions: [
      { label: "Télécharger", action: "download" },
    ],
  },
  {
    id: "7",
    title: "Rapport hebdomadaire prêt",
    description: "Le rapport de suivi semaine 19 est disponible pour validation avant envoi au client.",
    priority: "info",
    status: "read",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    project: "Eco-Quartier Ivry",
    category: "Reporting",
    icon: <FileText className="h-4 w-4" />,
    actions: [
      { label: "Consulter", action: "view" },
      { label: "Valider & Envoyer", action: "validate_send" },
    ],
  },
  {
    id: "8",
    title: "Nouvelle affectation équipe",
    description: "L'équipe Électricité B a été affectée au projet Gare du Nord à partir du 12/05.",
    priority: "info",
    status: "read",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    project: "Gare du Nord Extension",
    category: "Ressources",
    icon: <Users className="h-4 w-4" />,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAIMessage] = useState("")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  // Channel settings
  const [channels, setChannels] = useState({
    pushApp: true,
    email: true,
    sms: false,
    whatsapp: false,
  })

  // Frequency settings per priority
  const [frequencies, setFrequencies] = useState({
    critical: "realtime",
    important: "realtime",
    info: "daily",
  })

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.project?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || n.priority === priorityFilter
    return matchesSearch && matchesPriority && n.status !== "archived"
  })

  const unreadCount = notifications.filter((n) => n.status === "unread").length
  const criticalCount = notifications.filter((n) => n.priority === "critical" && n.status === "unread").length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" as NotificationStatus } : n))
    )
  }

  const archiveNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "archived" as NotificationStatus } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" as NotificationStatus })))
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `Il y a ${minutes} min`
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${days}j`
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6">
      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-6 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-8 w-8 text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Centre de Notifications</h1>
              <p className="text-muted-foreground">
                {unreadCount} non lue{unreadCount > 1 ? "s" : ""} dont {criticalCount} critique{criticalCount > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans l'historique des alertes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as Priority | "all")}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les priorités</SelectItem>
              <SelectItem value="critical">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Critique
                </span>
              </SelectItem>
              <SelectItem value="important">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Important
                </span>
              </SelectItem>
              <SelectItem value="info">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  Info
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <Card className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="divide-y divide-border">
              {filteredNotifications.map((notification) => {
                const config = priorityConfig[notification.priority]
                return (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 transition-colors hover:bg-muted/50 ${
                      notification.status === "unread" ? "bg-muted/30" : ""
                    }`}
                  >
                    {/* Priority Indicator */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bgColor} ${config.color}`}
                    >
                      {notification.priority === "critical" && <AlertTriangle className="h-5 w-5" />}
                      {notification.priority === "important" && <AlertCircle className="h-5 w-5" />}
                      {notification.priority === "info" && <Info className="h-5 w-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-medium ${
                              notification.status === "unread" ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {notification.status === "unread" && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{notification.description}</p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
                          {config.label}
                        </Badge>
                        {notification.project && (
                          <Badge variant="secondary" className="font-normal">
                            {notification.project}
                          </Badge>
                        )}
                        <Badge variant="outline" className="font-normal">
                          {notification.icon}
                          <span className="ml-1">{notification.category}</span>
                        </Badge>
                      </div>

                      {/* Actions */}
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="flex gap-2 pt-2">
                          {notification.actions.map((action, idx) => (
                            <Button key={idx} variant="outline" size="sm" className="h-7 text-xs">
                              {action.label}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {notification.status === "unread" ? (
                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Marquer comme lu
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => setNotifications(prev => 
                            prev.map(n => n.id === notification.id ? {...n, status: "unread" as NotificationStatus} : n)
                          )}>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Marquer comme non lu
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => archiveNotification(notification.id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archiver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}

              {filteredNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Aucune notification trouvée</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Configuration Panel */}
      <Card className="w-80 shrink-0 overflow-hidden">
        <Tabs defaultValue="channels" className="flex h-full flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings className="h-4 w-4" />
              Configuration
            </CardTitle>
          </CardHeader>
          <TabsList className="mx-4 grid w-auto grid-cols-2">
            <TabsTrigger value="channels">Canaux</TabsTrigger>
            <TabsTrigger value="frequency">Fréquence</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="channels" className="m-0 p-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choisissez comment recevoir vos notifications
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Smartphone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Push App</p>
                        <p className="text-xs text-muted-foreground">Notifications mobiles</p>
                      </div>
                    </div>
                    <Switch
                      checked={channels.pushApp}
                      onCheckedChange={(v) => setChannels((prev) => ({ ...prev, pushApp: v }))}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                        <Mail className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-xs text-muted-foreground">admin@eiffage.fr</p>
                      </div>
                    </div>
                    <Switch
                      checked={channels.email}
                      onCheckedChange={(v) => setChannels((prev) => ({ ...prev, email: v }))}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10">
                        <MessageSquare className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">SMS</p>
                        <p className="text-xs text-muted-foreground">+33 6 ** ** ** 42</p>
                      </div>
                    </div>
                    <Switch
                      checked={channels.sms}
                      onCheckedChange={(v) => setChannels((prev) => ({ ...prev, sms: v }))}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                        <MessageCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Non configuré</p>
                      </div>
                    </div>
                    <Switch
                      checked={channels.whatsapp}
                      onCheckedChange={(v) => setChannels((prev) => ({ ...prev, whatsapp: v }))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="frequency" className="m-0 p-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Définissez la fréquence par niveau de priorité
                </p>

                <div className="space-y-4">
                  {/* Critical */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <Label className="text-sm font-medium">Alertes Critiques</Label>
                    </div>
                    <Select
                      value={frequencies.critical}
                      onValueChange={(v) => setFrequencies((prev) => ({ ...prev, critical: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Temps réel
                          </span>
                        </SelectItem>
                        <SelectItem value="daily">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Résumé quotidien
                          </span>
                        </SelectItem>
                        <SelectItem value="weekly">
                          <span className="flex items-center gap-2">
                            <CalendarDays className="h-3 w-3" />
                            Hebdomadaire
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Recommandé : Temps réel pour les urgences
                    </p>
                  </div>

                  <Separator />

                  {/* Important */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      <Label className="text-sm font-medium">Alertes Importantes</Label>
                    </div>
                    <Select
                      value={frequencies.important}
                      onValueChange={(v) => setFrequencies((prev) => ({ ...prev, important: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Temps réel
                          </span>
                        </SelectItem>
                        <SelectItem value="daily">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Résumé quotidien
                          </span>
                        </SelectItem>
                        <SelectItem value="weekly">
                          <span className="flex items-center gap-2">
                            <CalendarDays className="h-3 w-3" />
                            Hebdomadaire
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      <Label className="text-sm font-medium">Notifications Info</Label>
                    </div>
                    <Select
                      value={frequencies.info}
                      onValueChange={(v) => setFrequencies((prev) => ({ ...prev, info: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">
                          <span className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Temps réel
                          </span>
                        </SelectItem>
                        <SelectItem value="daily">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Résumé quotidien
                          </span>
                        </SelectItem>
                        <SelectItem value="weekly">
                          <span className="flex items-center gap-2">
                            <CalendarDays className="h-3 w-3" />
                            Hebdomadaire
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </Card>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 flex w-96 flex-col rounded-xl border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Assistant IA Cyperux</p>
                <p className="text-xs text-muted-foreground">Analyse des alertes</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* AI Alert Message */}
          <div className="p-4">
            <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">Analyse des alertes</span>
              </div>
              <p className="text-sm text-foreground">
                Vous avez <strong>5 alertes de sécurité non traitées</strong> sur le projet <strong>Tour Hekla</strong>. 
                Souhaitez-vous que je crée une réunion d&apos;urgence avec les chefs d&apos;équipe demain à 8h ?
              </p>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  Créer la réunion
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Voir les alertes
                </Button>
              </div>
            </div>

            {/* Additional suggestions */}
            <div className="mt-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Suggestions :</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Résumer les alertes critiques
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Générer rapport HSE
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Contacter les responsables
                </Badge>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex gap-2">
              <Textarea
                placeholder="Demandez à l'IA..."
                className="min-h-[40px] resize-none"
                rows={1}
                value={aiMessage}
                onChange={(e) => setAIMessage(e.target.value)}
              />
              <Button size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Toggle Button (when chat is closed) */}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowAIChat(true)}
        >
          <Sparkles className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
            5
          </span>
        </Button>
      )}
    </div>
  )
}
