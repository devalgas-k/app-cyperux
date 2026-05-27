"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Play,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  DollarSign,
  Leaf,
  CloudRain,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  X,
  Send,
  Save,
  Download,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Slider } from "@/shared/components/ui/slider"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
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
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { cn } from "@/shared/utils"

// Simulation variables
const defaultVariables = {
  resourceIncrease: 0,
  weatherDelay: 0,
  steelShortage: false,
  concreteDelay: false,
  electricianStrike: false,
  budgetCut: 0,
}

// Base planning tasks
const baseTasks = [
  { id: 1, name: "Fondations", start: 0, duration: 6, phase: "Structure" },
  { id: 2, name: "Gros Oeuvre R+0", start: 6, duration: 8, phase: "Structure" },
  { id: 3, name: "Gros Oeuvre R+1", start: 10, duration: 8, phase: "Structure" },
  { id: 4, name: "Gros Oeuvre R+2", start: 14, duration: 8, phase: "Structure" },
  { id: 5, name: "Charpente", start: 22, duration: 4, phase: "Structure" },
  { id: 6, name: "Couverture", start: 26, duration: 3, phase: "Envelope" },
  { id: 7, name: "Menuiseries Ext.", start: 28, duration: 4, phase: "Envelope" },
  { id: 8, name: "Electricite", start: 30, duration: 6, phase: "Second Oeuvre" },
  { id: 9, name: "Plomberie", start: 30, duration: 5, phase: "Second Oeuvre" },
  { id: 10, name: "Finitions", start: 36, duration: 4, phase: "Second Oeuvre" },
]

// Calculate simulated tasks based on variables
function calculateSimulation(variables: typeof defaultVariables) {
  let tasks = baseTasks.map(t => ({ ...t }))
  let totalDelay = 0
  let budgetImpact = 0
  let carbonImpact = 0

  // Resource increase effect (reduces duration)
  if (variables.resourceIncrease > 0) {
    const factor = 1 - (variables.resourceIncrease / 100) * 0.3
    tasks = tasks.map(t => ({
      ...t,
      duration: Math.max(Math.round(t.duration * factor), 1)
    }))
    budgetImpact += variables.resourceIncrease * 0.8 // More resources = more cost
    carbonImpact += variables.resourceIncrease * 0.3 // More activity = more carbon
  }

  // Weather delay effect
  if (variables.weatherDelay > 0) {
    // Affects outdoor tasks (early phases)
    tasks = tasks.map(t => {
      if (t.phase === "Structure" || t.phase === "Envelope") {
        return { ...t, duration: t.duration + Math.round(variables.weatherDelay * 0.5) }
      }
      return t
    })
    totalDelay += variables.weatherDelay
  }

  // Steel shortage effect
  if (variables.steelShortage) {
    // Affects structure phase significantly
    tasks = tasks.map(t => {
      if (t.phase === "Structure") {
        return { ...t, duration: t.duration + 3 }
      }
      return t
    })
    totalDelay += 21 // 3 weeks
    budgetImpact += 12 // Emergency sourcing costs
    carbonImpact += 8 // Alternative transport
  }

  // Concrete delay
  if (variables.concreteDelay) {
    tasks = tasks.map(t => {
      if (t.name.includes("Gros Oeuvre") || t.name === "Fondations") {
        return { ...t, duration: t.duration + 2 }
      }
      return t
    })
    totalDelay += 10
    budgetImpact += 5
  }

  // Electrician strike
  if (variables.electricianStrike) {
    tasks = tasks.map(t => {
      if (t.name === "Electricite") {
        return { ...t, duration: t.duration + 4 }
      }
      return t
    })
    totalDelay += 8
    budgetImpact += 15
  }

  // Budget cut effect
  if (variables.budgetCut > 0) {
    const factor = 1 + (variables.budgetCut / 100) * 0.4
    tasks = tasks.map(t => ({
      ...t,
      duration: Math.round(t.duration * factor)
    }))
    budgetImpact -= variables.budgetCut
    carbonImpact -= variables.budgetCut * 0.2 // Less activity
  }

  // Recalculate start times based on new durations
  let currentStart = 0
  tasks = tasks.map((t, i) => {
    if (i === 0) return t
    const prevTask = tasks[i - 1]
    // Some tasks can overlap
    const overlap = t.phase === tasks[i - 1].phase ? 2 : 0
    const newStart = Math.max(prevTask.start + prevTask.duration - overlap, currentStart)
    return { ...t, start: newStart }
  })

  const baseEndWeek = 40
  const simEndWeek = Math.max(...tasks.map(t => t.start + t.duration))
  const deltaWeeks = simEndWeek - baseEndWeek

  return {
    tasks,
    deltaWeeks,
    deltaBudget: budgetImpact,
    deltaCarbon: carbonImpact,
    endWeek: simEndWeek,
  }
}

export default function SimulatorPage() {
  const [variables, setVariables] = useState(defaultVariables)
  const [simulation, setSimulation] = useState(calculateSimulation(defaultVariables))
  const [isRunning, setIsRunning] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; content: string }>>([])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [scenarioName, setScenarioName] = useState("")

  // Saved scenarios
  const [savedScenarios] = useState([
    { name: "Scenario Optimiste", deltaWeeks: -2, deltaBudget: 8, deltaCarbon: 3 },
    { name: "Scenario Pessimiste", deltaWeeks: 5, deltaBudget: 15, deltaCarbon: 10 },
    { name: "Scenario RE2020", deltaWeeks: 1, deltaBudget: 3, deltaCarbon: -12 },
  ])

  // Run simulation when variables change
  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setSimulation(calculateSimulation(variables))
        setIsRunning(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [variables, isRunning])

  // Show AI analysis when steel shortage is activated
  useEffect(() => {
    if (variables.steelShortage && !showAIChat) {
      setTimeout(() => {
        setShowAIChat(true)
        setAiMessages([{
          role: "assistant",
          content: "Le scenario 'Penurie d'acier' decale la livraison finale de 3 semaines. Je suggere d'activer le fournisseur de secours 'Arcelor-B' pour reduire ce delai a 4 jours. Voulez-vous que je prepare la commande de substitution ?"
        }])
      }, 1000)
    }
  }, [variables.steelShortage, showAIChat])

  const runSimulation = () => {
    setIsRunning(true)
    setSimulation(calculateSimulation(variables))
    toast.info("Simulation lancee", {
      description: "Calcul des scenarios en cours..."
    })
  }

  const resetSimulation = () => {
    setVariables(defaultVariables)
    setSimulation(calculateSimulation(defaultVariables))
    setShowAIChat(false)
    setAiMessages([])
  }

  const getWeekLabel = (week: number) => {
    const baseDate = new Date(2026, 4, 1) // May 2026
    baseDate.setDate(baseDate.getDate() + week * 7)
    return baseDate.toLocaleDateString("fr-FR", { month: "short", day: "numeric" })
  }

  const phaseColors: Record<string, string> = {
    "Structure": "bg-blue-500",
    "Envelope": "bg-amber-500",
    "Second Oeuvre": "bg-emerald-500",
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Simulateur What-If</h1>
          <p className="text-muted-foreground">Testez des hypotheses de planification et analysez les impacts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reinitialiser
          </Button>
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sauvegarder le scenario</DialogTitle>
                <DialogDescription>Donnez un nom a ce scenario pour le retrouver plus tard.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nom du scenario</Label>
                  <Input
                    placeholder="Ex: Scenario penurie Q3 2026"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Description optionnelle..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Annuler</Button>
                <Button onClick={() => {
                      setSaveDialogOpen(false)
                      toast.success("Scenario sauvegarde", {
                        description: "Votre scenario a ete enregistre avec succes."
                      })
                    }}>Sauvegarder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={runSimulation} disabled={isRunning}>
            {isRunning ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Calcul...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Lancer Simulation
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Impact Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className={cn(
          "border-2 transition-colors",
          simulation.deltaWeeks > 0 ? "border-red-500/50 bg-red-500/5" :
          simulation.deltaWeeks < 0 ? "border-emerald-500/50 bg-emerald-500/5" :
          "border-border"
        )}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Delta Fin de Chantier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {simulation.deltaWeeks > 0 ? (
                <TrendingUp className="h-6 w-6 text-red-500" />
              ) : simulation.deltaWeeks < 0 ? (
                <TrendingDown className="h-6 w-6 text-emerald-500" />
              ) : (
                <Minus className="h-6 w-6 text-muted-foreground" />
              )}
              <span className={cn(
                "text-3xl font-bold",
                simulation.deltaWeeks > 0 ? "text-red-500" :
                simulation.deltaWeeks < 0 ? "text-emerald-500" :
                "text-foreground"
              )}>
                {simulation.deltaWeeks > 0 ? "+" : ""}{simulation.deltaWeeks} sem.
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Fin prevue: Semaine {simulation.endWeek} ({getWeekLabel(simulation.endWeek)})
            </p>
          </CardContent>
        </Card>

        <Card className={cn(
          "border-2 transition-colors",
          simulation.deltaBudget > 0 ? "border-red-500/50 bg-red-500/5" :
          simulation.deltaBudget < 0 ? "border-emerald-500/50 bg-emerald-500/5" :
          "border-border"
        )}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Delta Budget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {simulation.deltaBudget > 0 ? (
                <TrendingUp className="h-6 w-6 text-red-500" />
              ) : simulation.deltaBudget < 0 ? (
                <TrendingDown className="h-6 w-6 text-emerald-500" />
              ) : (
                <Minus className="h-6 w-6 text-muted-foreground" />
              )}
              <span className={cn(
                "text-3xl font-bold",
                simulation.deltaBudget > 0 ? "text-red-500" :
                simulation.deltaBudget < 0 ? "text-emerald-500" :
                "text-foreground"
              )}>
                {simulation.deltaBudget > 0 ? "+" : ""}{simulation.deltaBudget}%
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Impact estime: {simulation.deltaBudget > 0 ? "+" : ""}{(simulation.deltaBudget * 12000).toLocaleString()} EUR
            </p>
          </CardContent>
        </Card>

        <Card className={cn(
          "border-2 transition-colors",
          simulation.deltaCarbon > 0 ? "border-red-500/50 bg-red-500/5" :
          simulation.deltaCarbon < 0 ? "border-emerald-500/50 bg-emerald-500/5" :
          "border-border"
        )}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Delta Carbone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {simulation.deltaCarbon > 0 ? (
                <TrendingUp className="h-6 w-6 text-red-500" />
              ) : simulation.deltaCarbon < 0 ? (
                <TrendingDown className="h-6 w-6 text-emerald-500" />
              ) : (
                <Minus className="h-6 w-6 text-muted-foreground" />
              )}
              <span className={cn(
                "text-3xl font-bold",
                simulation.deltaCarbon > 0 ? "text-red-500" :
                simulation.deltaCarbon < 0 ? "text-emerald-500" :
                "text-foreground"
              )}>
                {simulation.deltaCarbon > 0 ? "+" : ""}{simulation.deltaCarbon}%
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Impact estime: {simulation.deltaCarbon > 0 ? "+" : ""}{(simulation.deltaCarbon * 4.5).toFixed(1)} tCO2e
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Variables Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Variables de Simulation
            </CardTitle>
            <CardDescription>Ajustez les parametres pour tester differents scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resource Increase Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  Augmentation Ressources
                </Label>
                <Badge variant="outline">+{variables.resourceIncrease}%</Badge>
              </div>
              <Slider
                value={[variables.resourceIncrease]}
                onValueChange={([val]) => setVariables({ ...variables, resourceIncrease: val })}
                max={50}
                step={5}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Plus de ressources = delais reduits mais couts augmentes
              </p>
            </div>

            {/* Weather Delay Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-cyan-500" />
                  Report Meteo
                </Label>
                <Badge variant="outline">{variables.weatherDelay} jours</Badge>
              </div>
              <Slider
                value={[variables.weatherDelay]}
                onValueChange={([val]) => setVariables({ ...variables, weatherDelay: val })}
                max={15}
                step={1}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Affecte les travaux exterieurs (structure, enveloppe)
              </p>
            </div>

            {/* Budget Cut Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  Reduction Budget
                </Label>
                <Badge variant="outline">-{variables.budgetCut}%</Badge>
              </div>
              <Slider
                value={[variables.budgetCut]}
                onValueChange={([val]) => setVariables({ ...variables, budgetCut: val })}
                max={30}
                step={5}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Moins de budget = delais augmentes
              </p>
            </div>

            <div className="border-t pt-4 space-y-4">
              <Label className="text-sm font-medium">Scenarios de Crise</Label>
              
              {/* Steel Shortage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Penurie Acier</span>
                </div>
                <Switch
                  checked={variables.steelShortage}
                  onCheckedChange={(checked) => setVariables({ ...variables, steelShortage: checked })}
                />
              </div>

              {/* Concrete Delay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Retard Beton</span>
                </div>
                <Switch
                  checked={variables.concreteDelay}
                  onCheckedChange={(checked) => setVariables({ ...variables, concreteDelay: checked })}
                />
              </div>

              {/* Electrician Strike */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Greve Electriciens</span>
                </div>
                <Switch
                  checked={variables.electricianStrike}
                  onCheckedChange={(checked) => setVariables({ ...variables, electricianStrike: checked })}
                />
              </div>
            </div>

            {/* Saved Scenarios */}
            <div className="border-t pt-4">
              <Label className="text-sm font-medium mb-3 block">Scenarios Sauvegardes</Label>
              <div className="space-y-2">
                {savedScenarios.map((scenario, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between p-2 rounded-lg border hover:bg-accent transition-colors text-left"
                  >
                    <span className="text-sm">{scenario.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gantt Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comparaison Planning</CardTitle>
            <CardDescription>Planning de base vs Simulation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comparison" className="space-y-4">
              <TabsList>
                <TabsTrigger value="comparison">Cote a Cote</TabsTrigger>
                <TabsTrigger value="overlay">Superposition</TabsTrigger>
                <TabsTrigger value="table">Tableau</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Base Planning */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                      <span className="text-sm font-medium">Planning de Base</span>
                      <Badge variant="outline">40 sem.</Badge>
                    </div>
                    <div className="space-y-1.5 rounded-lg border p-3 bg-muted/30">
                      {baseTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2 text-xs">
                          <span className="w-28 truncate">{task.name}</span>
                          <div className="flex-1 relative h-5 bg-background rounded">
                            <div
                              className={cn("absolute h-full rounded opacity-70", phaseColors[task.phase])}
                              style={{
                                left: `${(task.start / 45) * 100}%`,
                                width: `${(task.duration / 45) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="w-12 text-right text-muted-foreground">{task.duration}s</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Planning */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-sm font-medium">Simulation</span>
                      <Badge variant={simulation.deltaWeeks > 0 ? "destructive" : simulation.deltaWeeks < 0 ? "default" : "outline"}>
                        {simulation.endWeek} sem.
                      </Badge>
                    </div>
                    <div className="space-y-1.5 rounded-lg border p-3 bg-primary/5 border-primary/30">
                      {simulation.tasks.map((task, i) => {
                        const baseTask = baseTasks[i]
                        const durationDiff = task.duration - baseTask.duration
                        return (
                          <div key={task.id} className="flex items-center gap-2 text-xs">
                            <span className="w-28 truncate">{task.name}</span>
                            <div className="flex-1 relative h-5 bg-background rounded">
                              <div
                                className={cn("absolute h-full rounded", phaseColors[task.phase])}
                                style={{
                                  left: `${(task.start / 50) * 100}%`,
                                  width: `${(task.duration / 50) * 100}%`,
                                }}
                              />
                            </div>
                            <span className={cn(
                              "w-12 text-right font-medium",
                              durationDiff > 0 ? "text-red-500" :
                              durationDiff < 0 ? "text-emerald-500" :
                              "text-muted-foreground"
                            )}>
                              {task.duration}s
                              {durationDiff !== 0 && (
                                <span className="text-[10px]">
                                  {durationDiff > 0 ? ` +${durationDiff}` : ` ${durationDiff}`}
                                </span>
                              )}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 pt-2 border-t">
                  {Object.entries(phaseColors).map(([phase, color]) => (
                    <div key={phase} className="flex items-center gap-1.5">
                      <div className={cn("h-3 w-3 rounded", color)} />
                      <span className="text-xs text-muted-foreground">{phase}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overlay">
                <div className="rounded-lg border p-4">
                  <div className="space-y-2">
                    {baseTasks.map((baseTask, i) => {
                      const simTask = simulation.tasks[i]
                      return (
                        <div key={baseTask.id} className="flex items-center gap-2 text-xs">
                          <span className="w-32 truncate font-medium">{baseTask.name}</span>
                          <div className="flex-1 relative h-8 bg-muted/50 rounded">
                            {/* Base task */}
                            <div
                              className="absolute h-3 top-1 rounded bg-muted-foreground/40"
                              style={{
                                left: `${(baseTask.start / 50) * 100}%`,
                                width: `${(baseTask.duration / 50) * 100}%`,
                              }}
                            />
                            {/* Simulated task */}
                            <div
                              className={cn(
                                "absolute h-3 bottom-1 rounded",
                                simTask.duration > baseTask.duration ? "bg-red-500" :
                                simTask.duration < baseTask.duration ? "bg-emerald-500" :
                                "bg-primary"
                              )}
                              style={{
                                left: `${(simTask.start / 50) * 100}%`,
                                width: `${(simTask.duration / 50) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-8 rounded bg-muted-foreground/40" />
                      <span className="text-xs text-muted-foreground">Planning Base</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-8 rounded bg-primary" />
                      <span className="text-xs text-muted-foreground">Simulation</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tache</TableHead>
                      <TableHead>Phase</TableHead>
                      <TableHead className="text-center">Duree Base</TableHead>
                      <TableHead className="text-center">Duree Sim.</TableHead>
                      <TableHead className="text-center">Delta</TableHead>
                      <TableHead className="text-center">Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {baseTasks.map((baseTask, i) => {
                      const simTask = simulation.tasks[i]
                      const delta = simTask.duration - baseTask.duration
                      return (
                        <TableRow key={baseTask.id}>
                          <TableCell className="font-medium">{baseTask.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">{baseTask.phase}</Badge>
                          </TableCell>
                          <TableCell className="text-center">{baseTask.duration} sem.</TableCell>
                          <TableCell className="text-center">{simTask.duration} sem.</TableCell>
                          <TableCell className="text-center">
                            <span className={cn(
                              "font-medium",
                              delta > 0 ? "text-red-500" :
                              delta < 0 ? "text-emerald-500" :
                              "text-muted-foreground"
                            )}>
                              {delta > 0 ? `+${delta}` : delta === 0 ? "-" : delta}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            {delta > 0 ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mx-auto" />
                            ) : delta < 0 ? (
                              <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
                            ) : (
                              <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-primary/50 shadow-lg">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant IA Simulation</CardTitle>
                  <CardDescription className="text-xs">Analyse predictive</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-lg text-sm",
                    msg.role === "assistant" ? "bg-primary/10 border border-primary/20" : "bg-muted"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <CheckCircle className="mr-2 h-3 w-3" />
                  Activer Arcelor-B
                </Button>
                <Button size="sm" variant="outline">
                  Plus d&apos;options
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
