"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Search,
  PlayCircle,
  BookOpen,
  HelpCircle,
  Code2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  X,
  Send,
  Sparkles,
  TicketPlus,
  ExternalLink,
  ChevronRight,
  Clock,
  Users,
  Zap,
  Shield,
  Headphones,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { cn } from "@/shared/utils"

const categories = [
  {
    id: "tutorials",
    title: "Tutoriels Vidéo",
    description: "Apprenez à maîtriser Cyperux en quelques minutes",
    icon: PlayCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    count: 24,
    items: [
      "Prise en main rapide (5 min)",
      "Créer votre premier projet",
      "Maîtriser le Gantt 5D",
      "Configuration des alertes ZFE",
    ],
  },
  {
    id: "guide",
    title: "Guide Utilisateur",
    description: "Documentation complète de toutes les fonctionnalités",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    count: 156,
    items: [
      "Architecture de l'application",
      "Gestion des projets BTP",
      "Workflow documentaire BPE",
      "Intégration BIM & Jumeau Numérique",
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Réponses aux questions les plus fréquentes",
    icon: HelpCircle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    count: 89,
    items: [
      "Comment importer un fichier IFC ?",
      "Gestion des droits utilisateurs",
      "Synchronisation avec le terrain",
      "Export des rapports RE2020",
    ],
  },
  {
    id: "api",
    title: "API Docs",
    description: "Documentation technique pour les développeurs",
    icon: Code2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    count: 42,
    items: [
      "Authentification OAuth2",
      "Endpoints REST API",
      "Webhooks & événements",
      "SDK JavaScript/Python",
    ],
  },
]

const services = [
  {
    name: "Dashboard",
    status: "operational",
    uptime: "99.98%",
    latency: "45ms",
  },
  {
    name: "API",
    status: "operational",
    uptime: "99.95%",
    latency: "120ms",
  },
  {
    name: "Mobile App",
    status: "operational",
    uptime: "99.90%",
    latency: "85ms",
  },
  {
    name: "Sync BIM",
    status: "operational",
    uptime: "99.85%",
    latency: "250ms",
  },
  {
    name: "Notifications",
    status: "operational",
    uptime: "99.99%",
    latency: "15ms",
  },
]

const popularArticles = [
  {
    title: "Comment configurer les alertes ZFE pour ma flotte ?",
    category: "Logistique",
    views: 1250,
  },
  {
    title: "Guide complet du workflow BPE (Bon Pour Exécution)",
    category: "Documents",
    views: 980,
  },
  {
    title: "Intégrer un modèle IFC dans le Jumeau Numérique",
    category: "BIM",
    views: 875,
  },
  {
    title: "Générer un rapport de conformité RE2020",
    category: "Carbone",
    views: 720,
  },
  {
    title: "Configurer les notifications multi-canaux",
    category: "Système",
    views: 650,
  },
]

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketOpen, setTicketOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant Cyperux. Comment puis-je vous aider aujourd'hui ? Je peux répondre à vos questions sur l'utilisation du logiciel, vous guider dans les fonctionnalités, ou vous orienter vers la documentation appropriée.",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [ticketPriority, setTicketPriority] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        gantt: "Le diagramme de Gantt 5D de Cyperux vous permet de visualiser votre planning avec les dimensions temps, coût et carbone. Pour y accéder, rendez-vous dans Planning > Gantt 5D. Vous pouvez glisser le curseur temporel pour voir la construction progressive et les métriques en temps réel.",
        bim: "Pour importer un modèle BIM, allez dans Visionneuse BIM 5D > Importer. Cyperux supporte les formats IFC 2x3 et IFC 4. Une fois importé, vous pourrez naviguer dans l'arborescence IFC et visualiser les propriétés de chaque élément.",
        zfe: "Les alertes ZFE se configurent dans Logistique > ZFE. Vous pouvez définir les périmètres de restriction, associer les véhicules de votre flotte avec leur vignette Crit'Air, et recevoir des notifications en temps réel lorsqu'un véhicule non autorisé approche d'une zone restreinte.",
        default: "Je comprends votre question. Pour vous aider au mieux, je vous suggère de consulter notre Guide Utilisateur ou de créer un ticket de support si vous avez besoin d'une assistance personnalisée. Puis-je vous orienter vers une section spécifique de la documentation ?",
      }

      let responseKey = "default"
      const lowerInput = chatInput.toLowerCase()
      if (lowerInput.includes("gantt") || lowerInput.includes("planning")) {
        responseKey = "gantt"
      } else if (lowerInput.includes("bim") || lowerInput.includes("ifc") || lowerInput.includes("3d")) {
        responseKey = "bim"
      } else if (lowerInput.includes("zfe") || lowerInput.includes("logistique") || lowerInput.includes("flotte")) {
        responseKey = "zfe"
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[responseKey],
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmitTicket = () => {
    // Simulate ticket submission
    setTicketOpen(false)
    setTicketPriority("")
    setTicketSubject("")
    setTicketDescription("")
    toast.success("Ticket cree avec succes", {
      description: "Notre equipe support vous repondra sous 24h."
    })
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Centre de Support</h1>
        <p className="mt-2 text-muted-foreground">
          Trouvez des réponses, explorez la documentation et contactez notre équipe
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto w-full max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Comment puis-je vous aider ?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 pr-4 text-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Importer IFC
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Alertes ZFE
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Rapport RE2020
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            Workflow BPE
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Headphones className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">Support disponible</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
              <Zap className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">&lt; 2h</p>
              <p className="text-sm text-muted-foreground">Temps de réponse</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction client</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
              <Shield className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">311</p>
              <p className="text-sm text-muted-foreground">Articles d&apos;aide</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className={cn(
              "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md",
              selectedCategory === category.id && "border-primary ring-1 ring-primary"
            )}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            <CardHeader className="pb-3">
              <div className={cn("mb-3 flex h-12 w-12 items-center justify-center rounded-lg", category.bgColor)}>
                <category.icon className={cn("h-6 w-6", category.color)} />
              </div>
              <CardTitle className="flex items-center justify-between text-lg">
                {category.title}
                <Badge variant="secondary">{category.count}</Badge>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            {selectedCategory === category.id && (
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="h-auto w-full justify-start p-2 text-left text-sm font-normal"
                      >
                        <ChevronRight className="mr-2 h-4 w-4 text-muted-foreground" />
                        {item}
                        <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Popular Articles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Articles populaires</CardTitle>
            <CardDescription>Les ressources les plus consultées par nos utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <p className="text-sm text-muted-foreground">{article.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {article.views.toLocaleString()} vues
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statut des services</CardTitle>
              <Badge className="gap-1 bg-emerald-500/20 text-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                Tous opérationnels
              </Badge>
            </div>
            <CardDescription>État en temps réel de nos services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-25" />
                    </div>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{service.uptime}</span>
                    <span>{service.latency}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Page de statut complète
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" onClick={() => setTicketOpen(true)} className="gap-2">
          <TicketPlus className="h-5 w-5" />
          Ouvrir un ticket
        </Button>
        <Button size="lg" variant="outline" onClick={() => setChatOpen(true)} className="gap-2">
          <MessageSquare className="h-5 w-5" />
          Chat avec l&apos;assistant
        </Button>
      </div>

      {/* Ticket Dialog */}
      <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ouvrir un ticket de support</DialogTitle>
            <DialogDescription>
              Décrivez votre problème et notre équipe vous répondra dans les plus brefs délais.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select value={ticketPriority} onValueChange={setTicketPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Basse - Question générale
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      Moyenne - Fonctionnalité dégradée
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500" />
                      Haute - Impact sur la production
                    </div>
                  </SelectItem>
                  <SelectItem value="critical">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Critique - Service indisponible
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                placeholder="Résumez votre problème en quelques mots"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre problème en détail. Incluez les étapes pour reproduire le problème si applicable."
                rows={5}
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              />
            </div>
            <div className="rounded-lg border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Glissez-déposez des captures d&apos;écran ou fichiers ici
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTicketOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmitTicket} className="gap-2">
              <TicketPlus className="h-4 w-4" />
              Créer le ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-xl border bg-background shadow-2xl">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b bg-primary/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
              </div>
              <div>
                <p className="font-semibold">Cyperux Assistant</p>
                <p className="text-xs text-muted-foreground">En ligne - Réponse instantanée</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={cn(
                        message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        "EF"
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Posez votre question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Propulsé par IA • Cyperux Assistant
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Button (when chat is closed) */}
      {!chatOpen && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setChatOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
