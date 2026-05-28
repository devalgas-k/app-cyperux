"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  FolderKanban,
  FileText,
  ListTodo,
  Sparkles,
  Plus,
  ArrowRight,
  Calendar,
  Truck,
  DollarSign,
  Building,
  ClipboardList,
  Zap,
  CornerDownLeft,
  Command,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { cn } from "@/shared/utils"

// Mock data for search results
const projects = [
  { id: "hekla", name: "Tour Hekla", status: "En cours", budget: "45M€", href: "/templates/projects" },
  { id: "ecoquartier", name: "Eco-Quartier Confluence", status: "Planification", budget: "28M€", href: "/templates/projects" },
  { id: "gare", name: "Gare du Nord Extension", status: "En cours", budget: "120M€", href: "/templates/projects" },
]

const documents = [
  { id: "plan-r1", name: "Plan_Structure_R+1.pdf", type: "Plan", status: "BPE", href: "/templates/documents" },
  { id: "cctp-03", name: "CCTP Lot 03 - Gros Œuvre", type: "CCTP", status: "En revue", href: "/templates/documents" },
  { id: "dtu-21", name: "DTU 21 - Béton armé", type: "Norme", status: "Validé", href: "/templates/documents" },
  { id: "re2020", name: "Rapport RE2020 - Phase 1", type: "Rapport", status: "BPE", href: "/templates/documents/bpe" },
]

const tasks = [
  { id: "fondations", name: "Fondations - Zone A", phase: "Gros Œuvre", status: "En cours", href: "/templates/planning" },
  { id: "coffrage", name: "Coffrage R+2", phase: "Structure", status: "Planifié", href: "/templates/planning" },
  { id: "ferraillage", name: "Ferraillage Dalles", phase: "Gros Œuvre", status: "En attente", href: "/templates/planning" },
  { id: "reseaux", name: "Réseaux CVC R+1", phase: "Second Œuvre", status: "À venir", href: "/templates/planning" },
]

const quickActions = [
  { id: "new-project", name: "Créer un projet", icon: Plus, href: "/templates/projects/new", shortcut: "N" },
  { id: "new-task", name: "Ajouter une tâche", icon: ListTodo, href: "/templates/planning", shortcut: "T" },
  { id: "new-reserve", name: "Ajouter une réserve", icon: ClipboardList, href: "/templates/punch-list", shortcut: "R" },
  { id: "new-incident", name: "Signaler un incident", icon: Zap, href: "/templates/site-issues", shortcut: "I" },
  { id: "view-calendar", name: "Voir le planning", icon: Calendar, href: "/templates/planning", shortcut: "P" },
  { id: "view-logistics", name: "Logistique JIT", icon: Truck, href: "/templates/logistics/jit", shortcut: "L" },
  { id: "view-finance", name: "Tableau financier", icon: DollarSign, href: "/templates/finance", shortcut: "F" },
]

// AI-powered suggestions based on query
const getAISuggestions = (query: string) => {
  const suggestions = [
    {
      query: "béton",
      response: "Le coulage béton sur Tour Hekla est à 78% d'avancement. Prochaine phase prévue le 15 mai.",
      action: "Voir le détail du planning béton",
      href: "/templates/planning",
    },
    {
      query: "hekla",
      response: "Tour Hekla : Budget consommé 67%, Carbone 420 kgCO2e/m², 2 alertes HSE en cours.",
      action: "Ouvrir le tableau de bord projet",
      href: "/templates/projects",
    },
    {
      query: "retard",
      response: "3 tâches en retard identifiées. Impact estimé : +5 jours sur le chemin critique.",
      action: "Voir les tâches en retard",
      href: "/templates/planning",
    },
    {
      query: "budget",
      response: "Budget global : 45M€ engagés sur 52M€ prévus. CPI actuel : 1.08 (favorable).",
      action: "Ouvrir le dashboard financier",
      href: "/templates/finance",
    },
    {
      query: "carbone",
      response: "Empreinte carbone actuelle : 450 kgCO2e/m². Objectif RE2020 : 380 kgCO2e/m². Dépassement de 18%.",
      action: "Voir les recommandations IA",
      href: "/templates/analytics/re2020",
    },
    {
      query: "livraison",
      response: "2 livraisons prévues aujourd'hui. Camion #42 en approche (ETA 14h30). 1 conflit ZFE détecté.",
      action: "Ouvrir la tour de contrôle",
      href: "/templates/logistics/jit",
    },
    {
      query: "réserve",
      response: "12 réserves ouvertes sur Tour Hekla. 3 critiques à traiter avant le 20 mai.",
      action: "Voir les réserves OPR",
      href: "/templates/punch-list",
    },
  ]

  const lowerQuery = query.toLowerCase()
  return suggestions.filter(
    (s) =>
      lowerQuery.includes(s.query) ||
      s.query.includes(lowerQuery) ||
      s.response.toLowerCase().includes(lowerQuery)
  )
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Filter results based on query
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
  const filteredDocuments = documents.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  )
  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )
  const filteredActions = quickActions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  )
  const aiSuggestions = query.length > 2 ? getAISuggestions(query) : []

  // Calculate total results for keyboard navigation
  const allResults = [
    ...aiSuggestions.map((s) => ({ resultType: "ai", ...s })),
    ...filteredProjects.map((p) => ({ resultType: "project", ...p })),
    ...filteredDocuments.map((d) => ({ resultType: "document", ...d })),
    ...filteredTasks.map((t) => ({ resultType: "task", ...t })),
    ...filteredActions.map((a) => ({ resultType: "action", ...a })),
  ]

  React.useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && allResults[selectedIndex]) {
      e.preventDefault()
      const result = allResults[selectedIndex]
      navigate(result.href)
      onOpenChange(false)
    } else if (e.key === "Escape") {
      onOpenChange(false)
    }
  }

  const handleResultClick = (href: string) => {
    navigate(href)
    onOpenChange(false)
  }

  let currentIndex = -1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Recherche globale</DialogTitle>
        
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4">
          <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher projets, documents, tâches... ou posez une question"
            className="flex h-14 w-full border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Badge variant="outline" className="ml-2 shrink-0 gap-1 font-mono text-xs">
            <Command className="h-3 w-3" />K
          </Badge>
        </div>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-2">
            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <Sparkles className="h-4 w-4 text-[#593196]" />
                  <span className="text-sm font-medium text-[#593196]">Suggestions IA</span>
                </div>
                <div className="space-y-1">
                  {aiSuggestions.map((suggestion) => {
                    currentIndex++
                    const isSelected = selectedIndex === currentIndex
                    const idx = currentIndex
                    return (
                      <button
                        key={suggestion.query}
                        onClick={() => handleResultClick(suggestion.href)}
                        className={cn(
                          "flex w-full flex-col gap-1 rounded-lg border border-[#593196]/20 bg-[#593196]/5 p-3 text-left transition-colors",
                          isSelected && "border-[#593196] bg-[#593196]/10"
                        )}
                      >
                        <p className="text-sm">{suggestion.response}</p>
                        <div className="flex items-center gap-2 text-xs text-[#593196]">
                          <ArrowRight className="h-3 w-3" />
                          {suggestion.action}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <FolderKanban className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Projets</span>
                </div>
                <div className="space-y-1">
                  {filteredProjects.map((project) => {
                    currentIndex++
                    const isSelected = selectedIndex === currentIndex
                    return (
                      <button
                        key={project.id}
                        onClick={() => handleResultClick(project.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent",
                          isSelected && "bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {project.status} · {project.budget}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CornerDownLeft className="h-3 w-3" />
                          <span>Ouvrir</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Documents */}
            {filteredDocuments.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Documents</span>
                </div>
                <div className="space-y-1">
                  {filteredDocuments.map((doc) => {
                    currentIndex++
                    const isSelected = selectedIndex === currentIndex
                    return (
                      <button
                        key={doc.id}
                        onClick={() => handleResultClick(doc.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent",
                          isSelected && "bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{doc.type}</span>
                              <Badge
                                variant={doc.status === "BPE" ? "default" : "secondary"}
                                className={cn(
                                  "text-[10px]",
                                  doc.status === "BPE" && "bg-emerald-500/20 text-emerald-400"
                                )}
                              >
                                {doc.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CornerDownLeft className="h-3 w-3" />
                          <span>Ouvrir</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tasks */}
            {filteredTasks.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Tâches</span>
                </div>
                <div className="space-y-1">
                  {filteredTasks.map((task) => {
                    currentIndex++
                    const isSelected = selectedIndex === currentIndex
                    return (
                      <button
                        key={task.id}
                        onClick={() => handleResultClick(task.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent",
                          isSelected && "bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <ListTodo className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{task.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {task.phase} · {task.status}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CornerDownLeft className="h-3 w-3" />
                          <span>Voir</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {filteredActions.length > 0 && (
              <div className="mb-2">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Actions rapides</span>
                </div>
                <div className="space-y-1">
                  {filteredActions.map((action) => {
                    currentIndex++
                    const isSelected = selectedIndex === currentIndex
                    const Icon = action.icon
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleResultClick(action.href)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent",
                          isSelected && "bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#593196]" />
                          <span className="font-medium">{action.name}</span>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {action.shortcut}
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* No results */}
            {allResults.length === 0 && query.length > 0 && (
              <div className="py-12 text-center">
                <Search className="mx-auto mb-4 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Aucun résultat pour &quot;{query}&quot;
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Essayez de rechercher un projet, document ou une tâche
                </p>
              </div>
            )}

            {/* Default state */}
            {query.length === 0 && (
              <div className="py-4 text-center text-sm text-muted-foreground">
                <p>Commencez à taper pour rechercher...</p>
                <p className="mt-2 text-xs">
                  Ou posez une question comme &quot;Où en est le béton sur Hekla ?&quot;
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer with keyboard hints */}
        <div className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">↑↓</kbd>
              Naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">↵</kbd>
              Ouvrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">Esc</kbd>
              Fermer
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#593196]">
            <Sparkles className="h-3 w-3" />
            <span>IA activée</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
