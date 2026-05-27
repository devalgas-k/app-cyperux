"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Sparkles,
  Zap,
  Leaf,
  Scale,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Cloud,
  AlertTriangle,
  Check,
  Loader2,
  Bot,
  X,
  Send,
  Target,
  Cpu,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Slider } from "@/shared/components/ui/slider"
import { Switch } from "@/shared/components/ui/switch"
import { Badge } from "@/shared/components/ui/badge"
import { Label } from "@/shared/components/ui/label"
import { Progress } from "@/shared/components/ui/progress"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
import { toast } from "sonner"
import { cn } from "@/shared/utils"

// Scenario data
const scenarios = [
  {
    id: "A",
    name: "Scénario Rapide",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/20",
    duration: -10,
    cost: +5,
    carbon: +2,
    description: "Maximise la vitesse d'exécution avec des ressources supplémentaires",
    details: [
      "Équipes en 2x8 sur phases critiques",
      "Préfabrication béton hors-site",
      "Livraisons express matériaux",
    ],
    risks: ["Surcoût main d'oeuvre", "Pression équipes"],
  },
  {
    id: "B",
    name: "Scénario Éco-responsable",
    icon: Leaf,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/20",
    duration: +5,
    cost: -2,
    carbon: -15,
    recommended: true,
    description: "Optimise l'empreinte carbone tout en respectant les délais",
    details: [
      "Béton bas-carbone CEM III",
      "Réemploi 40% acier de structure",
      "Logistique mutualisée ZFE",
    ],
    risks: ["Délai légèrement allongé"],
  },
  {
    id: "C",
    name: "Scénario Équilibré",
    icon: Scale,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    glowColor: "shadow-primary/20",
    duration: 0,
    cost: 0,
    carbon: -5,
    description: "Compromis optimal entre délais, coûts et impact environnemental",
    details: [
      "Planning standard optimisé",
      "Mix matériaux conventionnel/bas-carbone",
      "Logistique optimisée",
    ],
    risks: ["Aucun risque majeur identifié"],
  },
]

// AI Chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "Bienvenue dans le Moteur d'Optimisation IA. Je suis prêt à analyser votre planning et proposer des scénarios optimisés.",
    timestamp: new Date(Date.now() - 60000),
  },
]

export default function OptimizationPage() {
  const [priorityValue, setPriorityValue] = useState([50])
  const [weatherEnabled, setWeatherEnabled] = useState(true)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(true)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  // Simulate optimization process
  const runOptimization = () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    setShowResults(false)

    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsOptimizing(false)
          setShowResults(true)
          
          // Add AI message about results
          setTimeout(() => {
            setIsTyping(true)
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: "J'ai trouvé un conflit logistique dans le Scénario A : les livraisons de béton chevauchent une restriction ZFE le 15 juin. Je vous recommande le Scénario B pour respecter vos quotas RE2020 tout en évitant ce conflit.",
                  timestamp: new Date(),
                },
              ])
              setIsTyping(false)
            }, 1500)
          }, 500)
          
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const applyScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    const scenario = scenarios.find((s) => s.id === scenarioId)
    toast.success(`${scenario?.name} appliqué`, {
      description: "Le planning a été mis à jour avec le nouveau scénario.",
    })
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: chatInput, timestamp: new Date() },
    ])
    setChatInput("")
    
    setIsTyping(true)
    setTimeout(() => {
      const responses = [
        "Le Scénario B permet d'économiser 45 tonnes de CO2 grâce au béton bas-carbone CEM III. C'est compatible avec vos objectifs RE2020.",
        "L'analyse des aléas météo indique 3 jours de pluie prévus en semaine 24. J'ai intégré cette contrainte dans les scénarios.",
        "La mutualisation logistique ZFE réduit de 30% les trajets camion sur le chantier Tour Hekla.",
      ]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1200)
  }

  const getPriorityLabel = () => {
    if (priorityValue[0] < 30) return "Priorité Délais"
    if (priorityValue[0] > 70) return "Priorité Carbone"
    return "Équilibré"
  }

  return (
    <div className="relative min-h-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/templates/" className="hover:text-foreground transition-colors">
          Tableau de bord
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Moteur d&apos;Optimisation IA</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            Moteur d&apos;Optimisation IA
          </h1>
          <p className="text-muted-foreground mt-1">
            Solveur de Recherche Opérationnelle - Projet Tour Hekla
          </p>
        </div>
        <Badge variant="outline" className="gap-2 px-3 py-1.5">
          <Activity className="h-3.5 w-3.5 text-emerald-500" />
          <span>Algorithme v2.4.1</span>
        </Badge>
      </div>

      {/* Command Center Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Parameters Card */}
        <Card className="lg:col-span-1 border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Paramètres de l&apos;Algorithme
            </CardTitle>
            <CardDescription>
              Configurez les priorités et contraintes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Priority Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Priorité d&apos;optimisation</Label>
                <Badge variant="secondary" className="text-xs">
                  {getPriorityLabel()}
                </Badge>
              </div>
              <div className="space-y-3">
                <Slider
                  value={priorityValue}
                  onValueChange={setPriorityValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Minimiser Délais</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    <span>Minimiser Carbone</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Weather Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-sky-400" />
                  Aléas Météo
                </Label>
                <p className="text-xs text-muted-foreground">
                  Intégrer les prévisions à 14 jours
                </p>
              </div>
              <Switch
                checked={weatherEnabled}
                onCheckedChange={setWeatherEnabled}
              />
            </div>

            {weatherEnabled && (
              <div className="rounded-lg bg-sky-500/10 border border-sky-500/20 p-3 text-xs">
                <div className="flex items-center gap-2 text-sky-400 font-medium mb-2">
                  <Cloud className="h-3.5 w-3.5" />
                  Prévisions intégrées
                </div>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 3 jours de pluie (S24)</li>
                  <li>• Vents forts &gt;60km/h (15-16 juin)</li>
                  <li>• Canicule prévue (S26)</li>
                </ul>
              </div>
            )}

            <Separator />

            {/* Additional Constraints */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Contraintes actives</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">RE2020</Badge>
                <Badge variant="outline" className="text-xs">ZFE Paris</Badge>
                <Badge variant="outline" className="text-xs">Loi AGEC</Badge>
                <Badge variant="outline" className="text-xs">ISO 14001</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Launch Button & Results Area */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Lancement de l&apos;Optimisation
            </CardTitle>
            <CardDescription>
              Générez et comparez des scénarios optimisés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Launch Button */}
            {!showResults && (
              <div className="flex flex-col items-center justify-center py-8">
                <Button
                  size="lg"
                  onClick={runOptimization}
                  disabled={isOptimizing}
                  className={cn(
                    "h-24 w-64 text-lg font-semibold gap-3 transition-all duration-300",
                    "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl",
                    "hover:shadow-primary/25 hover:scale-105",
                    isOptimizing && "animate-pulse"
                  )}
                >
                  {isOptimizing ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Calcul en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6" />
                      Lancer l&apos;optimisation
                    </>
                  )}
                </Button>
                
                {isOptimizing && (
                  <div className="w-64 mt-6 space-y-2">
                    <Progress value={optimizationProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Analyse des contraintes...</span>
                      <span>{optimizationProgress}%</span>
                    </div>
                  </div>
                )}

                {!isOptimizing && (
                  <p className="text-sm text-muted-foreground mt-4 text-center max-w-md">
                    L&apos;algorithme analysera 1,247 combinaisons possibles pour générer 3 scénarios optimisés.
                  </p>
                )}
              </div>
            )}

            {/* Scenario Results */}
            {showResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    3 scénarios générés en 2.4s - 1,247 combinaisons analysées
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowResults(false)
                      setSelectedScenario(null)
                    }}
                  >
                    Relancer
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {scenarios.map((scenario) => {
                    const Icon = scenario.icon
                    const isSelected = selectedScenario === scenario.id
                    
                    return (
                      <Card
                        key={scenario.id}
                        className={cn(
                          "relative transition-all duration-300 cursor-pointer",
                          scenario.borderColor,
                          isSelected && `ring-2 ring-offset-2 ring-offset-background ${scenario.glowColor}`,
                          scenario.recommended && "ring-1 ring-emerald-500/50"
                        )}
                        onClick={() => setSelectedScenario(scenario.id)}
                      >
                        {scenario.recommended && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                            <Badge className="bg-emerald-500 text-white text-[10px] px-2 py-0.5">
                              Recommandé
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className={cn("p-2 rounded-lg", scenario.bgColor)}>
                              <Icon className={cn("h-4 w-4", scenario.color)} />
                            </div>
                            <div>
                              <CardTitle className="text-sm font-semibold">
                                {scenario.name}
                              </CardTitle>
                              <CardDescription className="text-[11px]">
                                {scenario.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-3">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="space-y-1">
                              <div className={cn(
                                "text-sm font-bold",
                                scenario.duration < 0 ? "text-emerald-500" : scenario.duration > 0 ? "text-amber-500" : "text-muted-foreground"
                              )}>
                                {scenario.duration > 0 ? "+" : ""}{scenario.duration}%
                              </div>
                              <div className="text-[10px] text-muted-foreground">Durée</div>
                            </div>
                            <div className="space-y-1">
                              <div className={cn(
                                "text-sm font-bold",
                                scenario.cost < 0 ? "text-emerald-500" : scenario.cost > 0 ? "text-amber-500" : "text-muted-foreground"
                              )}>
                                {scenario.cost > 0 ? "+" : ""}{scenario.cost}%
                              </div>
                              <div className="text-[10px] text-muted-foreground">Coût</div>
                            </div>
                            <div className="space-y-1">
                              <div className={cn(
                                "text-sm font-bold",
                                scenario.carbon < 0 ? "text-emerald-500" : scenario.carbon > 0 ? "text-red-500" : "text-muted-foreground"
                              )}>
                                {scenario.carbon > 0 ? "+" : ""}{scenario.carbon}%
                              </div>
                              <div className="text-[10px] text-muted-foreground">CO₂</div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                              <div className="text-[11px] text-muted-foreground">
                                <span className="font-medium text-foreground">Actions :</span>
                                <ul className="mt-1 space-y-0.5">
                                  {scenario.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-1">
                                      <Check className="h-3 w-3 text-emerald-500" />
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="pt-0">
                          <Button
                            size="sm"
                            className={cn(
                              "w-full text-xs",
                              isSelected ? "bg-primary" : "bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              applyScenario(scenario.id)
                            }}
                          >
                            {isSelected && selectedScenario === scenario.id ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                Appliqué
                              </>
                            ) : (
                              "Appliquer ce planning"
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating AI Chat */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-300",
          chatOpen ? "w-96" : "w-auto"
        )}
      >
        {chatOpen ? (
          <Card className="border-primary/30 shadow-xl shadow-primary/10 bg-background/95 backdrop-blur">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant IA Optimisation</CardTitle>
                  <CardDescription className="text-[11px]">
                    Analyse et recommandations
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-64 px-4">
                <div className="space-y-3 py-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-3 w-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 text-xs max-w-[80%]",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {showResults && (
                <div className="mx-4 mb-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-amber-500">Conflit détecté</p>
                      <p className="text-muted-foreground">
                        Scénario A : conflit logistique ZFE le 15/06
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Posez une question..."
                    className="flex-1 text-xs bg-muted rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    size="icon"
                    className="h-8 w-8"
                    onClick={sendMessage}
                    disabled={!chatInput.trim()}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setChatOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
