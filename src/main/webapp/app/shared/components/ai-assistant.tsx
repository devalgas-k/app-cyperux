"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Badge } from "@/shared/components/ui/badge"

import { cn } from "@/shared/utils"
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageSquare,
  Lightbulb,
  FileText,
  Calculator,
  Leaf,
  HardHat,
  ChevronRight,
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ContextItem {
  icon: React.ReactNode
  label: string
  value: string
}

const quickActions = [
  {
    icon: <Calculator className="h-4 w-4" />,
    label: "Estimer le budget",
    prompt: "Estime le budget nécessaire pour ce projet en tenant compte des ressources actuelles.",
  },
  {
    icon: <Leaf className="h-4 w-4" />,
    label: "Analyse carbone",
    prompt: "Analyse l'empreinte carbone actuelle et suggère des optimisations RE2020.",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    label: "Générer un rapport",
    prompt: "Génère un rapport de synthèse du projet en cours.",
  },
  {
    icon: <HardHat className="h-4 w-4" />,
    label: "Vérifier HSE",
    prompt: "Vérifie la conformité HSE et identifie les points d'attention.",
  },
]

const pageContextMap: Record<string, ContextItem[]> = {
  "/": [
    { icon: <Sparkles className="h-3 w-3" />, label: "Page", value: "Tableau de bord" },
    { icon: <FileText className="h-3 w-3" />, label: "Projets actifs", value: "3" },
  ],
  "/projects": [
    { icon: <Sparkles className="h-3 w-3" />, label: "Page", value: "Liste des projets" },
    { icon: <FileText className="h-3 w-3" />, label: "Projets", value: "Tour Hekla, Eco-Quartier, Gare du Nord" },
  ],
  "/templates/projects/new": [
    { icon: <Sparkles className="h-3 w-3" />, label: "Page", value: "Nouveau Projet" },
    { icon: <FileText className="h-3 w-3" />, label: "Formulaire", value: "Création BTP" },
  ],
  "/planning": [
    { icon: <Sparkles className="h-3 w-3" />, label: "Page", value: "Planning Gantt" },
    { icon: <FileText className="h-3 w-3" />, label: "Tâches", value: "Fondations, Gros Oeuvre, Second Oeuvre" },
  ],
  "/green": [
    { icon: <Leaf className="h-3 w-3" />, label: "Page", value: "Tableau Vert RE2020" },
    { icon: <FileText className="h-3 w-3" />, label: "Score Carbone", value: "420 kgCO2e/m²" },
  ],
  "/finance": [
    { icon: <Calculator className="h-3 w-3" />, label: "Page", value: "Finance EVM" },
    { icon: <FileText className="h-3 w-3" />, label: "CPI", value: "1.08" },
  ],
  "/hse": [
    { icon: <HardHat className="h-3 w-3" />, label: "Page", value: "HSE & Sécurité" },
    { icon: <FileText className="h-3 w-3" />, label: "Jours sans accident", value: "142" },
  ],
  "/digital-twin": [
    { icon: <Sparkles className="h-3 w-3" />, label: "Page", value: "Jumeau Numérique" },
    { icon: <FileText className="h-3 w-3" />, label: "Modèle", value: "BIM LOD 400" },
  ],
  "/ai-console": [
    { icon: <Bot className="h-3 w-3" />, label: "Page", value: "Console IA" },
    { icon: <FileText className="h-3 w-3" />, label: "Modèle actif", value: "Llama3-8B" },
  ],
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant IA de Cyperux. Je peux vous aider à analyser vos projets, estimer des budgets, optimiser votre empreinte carbone RE2020, et bien plus. Comment puis-je vous aider ?",
      timestamp: new Date(),
      suggestions: ["Analyser le projet actuel", "Suggérer des optimisations", "Générer un rapport"],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const pathname = location.pathname

  const currentContext = pageContextMap[pathname] || pageContextMap["/"]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/copilotkit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: {
            page: pathname,
            pageContext: currentContext,
          },
        }),
      })

      const data = await response.json()
      
      const responses: Record<string, { content: string; suggestions?: string[] }> = {
        budget: {
          content: "Basé sur l'analyse des projets similaires et les données actuelles, voici mon estimation :\n\n**Tour Hekla** : 45.2M EUR (±5%)\n- Gros oeuvre : 18.5M EUR\n- Second oeuvre : 12.3M EUR\n- Lots techniques : 14.4M EUR\n\nLe CPI actuel de 1.08 indique une bonne maîtrise des coûts. Je recommande de surveiller les lots CVC qui montrent une tendance à la hausse.",
          suggestions: ["Détailler les lots techniques", "Comparer avec Eco-Quartier", "Voir l'historique EVM"],
        },
        carbone: {
          content: "**Analyse Carbone RE2020** :\n\nScore actuel : 420 kgCO2e/m² (Cible : 380)\n\n**Recommandations prioritaires** :\n1. Remplacer le béton standard par du béton bas-carbone (-45 tCO2)\n2. Optimiser l'isolation thermique (-12 tCO2)\n3. Intégrer des panneaux photovoltaïques (-8 tCO2)\n\nPotentiel de réduction : **65 tCO2e** soit -15% sur le bilan global.",
          suggestions: ["Voir les fournisseurs bas-carbone", "Simuler les scénarios", "Exporter le rapport"],
        },
        rapport: {
          content: "Je prépare le rapport de synthèse...\n\n**Rapport généré** :\n- Avancement global : 34%\n- Budget consommé : 12.4M / 45.2M EUR\n- Prochaine échéance : Coulage dalle P2 (15/06)\n- Alertes actives : 2 (retard Phase 2, stock acier)\n\nLe rapport complet est disponible au format PDF dans la section Documents > Rapports.",
          suggestions: ["Télécharger le PDF", "Partager par email", "Planifier un rapport hebdo"],
        },
        hse: {
          content: "**Vérification HSE** :\n\n142 jours sans accident LTI\nConformité formation : 98%\n\n**Points d'attention** :\n- 2 EPI à renouveler cette semaine\n- Inspection grue prévue le 20/06\n- Formation travail en hauteur : 3 ouvriers à former\n\nAucun point bloquant identifié. Le chantier est conforme aux normes en vigueur.",
          suggestions: ["Voir le planning formations", "Commander les EPI", "Préparer l'inspection"],
        },
        default: {
          content: data.choices?.[0]?.message?.content || "Je comprends votre demande. Basé sur le contexte actuel de la page et les données du projet, je peux vous aider avec l'analyse des indicateurs clés, l'estimation budgétaire, les recommandations RE2020, et la génération de rapports.",
          suggestions: ["Analyser le projet actuel", "Voir les alertes", "Optimiser le planning"],
        },
      }

      let responseKey = "default"
      const lowerText = messageText.toLowerCase()
      if (lowerText.includes("budget") || lowerText.includes("estim") || lowerText.includes("coût")) {
        responseKey = "budget"
      } else if (lowerText.includes("carbone") || lowerText.includes("re2020") || lowerText.includes("environn") || lowerText.includes("optimis")) {
        responseKey = "carbone"
      } else if (lowerText.includes("rapport") || lowerText.includes("synthèse") || lowerText.includes("générer")) {
        responseKey = "rapport"
      } else if (lowerText.includes("hse") || lowerText.includes("sécurité") || lowerText.includes("conform")) {
        responseKey = "hse"
      }

      const aiResponse = responses[responseKey]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion)
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#593196] shadow-lg shadow-[#593196]/30 hover:bg-[#6b3db0] hover:shadow-[#593196]/50 transition-all duration-300"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 shadow-2xl shadow-[#593196]/20 border-[#593196]/30 bg-card/95 backdrop-blur-xl transition-all duration-300 flex flex-col",
            isExpanded
              ? "bottom-0 right-0 w-[500px] h-screen rounded-none"
              : "bottom-6 right-6 w-[420px] h-[600px] rounded-xl"
          )}
        >
          {/* Header */}
          <CardHeader className="p-4 border-b border-border/50 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#593196] to-[#7c4dbd] flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Assistant IA Cyperux</CardTitle>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    En ligne - Llama3-8B
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Context Pills */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {currentContext.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-1.5 text-xs bg-[#593196]/10 text-[#a78bfa] border border-[#593196]/20"
                >
                  {item.icon}
                  {item.label}: {item.value}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            {/* Messages - Zone scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0" ref={scrollRef}>
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#593196] to-[#7c4dbd] flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[85%]",
                        message.role === "user"
                          ? "bg-[#593196] text-white"
                          : "bg-secondary/50 border border-border/50"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-3 py-1.5 rounded-full bg-[#593196]/10 hover:bg-[#593196]/20 text-[#a78bfa] border border-[#593196]/20 transition-colors flex items-center gap-1.5"
                            >
                              <ChevronRight className="h-3 w-3" />
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#593196] to-[#7c4dbd] flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl px-4 py-3 bg-secondary/50 border border-border/50">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-[#593196]" />
                        <span className="text-sm text-muted-foreground">Analyse en cours...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Zone Input - Sticky en bas */}
            <div className="shrink-0 border-t border-border/50 bg-card/95 backdrop-blur-sm">
              {/* Quick Actions */}
              <div className="px-4 pt-3 pb-2">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Lightbulb className="h-3 w-3" />
                  Actions rapides
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-secondary/50 hover:bg-secondary border border-border/50 transition-colors"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Field */}
              <div className="px-4 pb-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      placeholder="Posez votre question..."
                      className="pl-10 pr-4 h-10 bg-background border-border focus:border-[#593196] focus:ring-1 focus:ring-[#593196]/30 placeholder:text-muted-foreground/70"
                    />
                  </div>
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="h-10 w-10 bg-[#593196] hover:bg-[#6b3db0] shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  IA locale Ollama - Donnees confidentielles securisees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
