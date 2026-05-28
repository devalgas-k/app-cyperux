"use client"

import { useState } from "react"
import { toast } from "sonner"
import { 
  Plus, 
  Calendar, 
  ChevronRight,
  ChevronDown,
  GripVertical,
  Sparkles,
  Link2,
  AlertTriangle,
  WifiOff,
  X,
  Send,
  Play,
  CheckCircle,
  Circle,
  Clock,
  Users,
  Leaf,
  MessageSquare
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Calendar as CalendarComponent } from "@/shared/components/ui/calendar"
import { StatCardList } from "@/shared/components/custom/stat-card-list"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { Switch } from "@/shared/components/ui/switch"
import { cn } from "@/shared/utils"
// import { useLanguage } from "@/lib/i18n"
import { format, addDays, differenceInDays } from "date-fns"
import { fr } from "date-fns/locale"

interface Task {
  id: string
  name: string
  phase: string
  startDate: Date
  endDate: Date
  status: "done" | "in-progress" | "todo"
  isCriticalPath: boolean
  resources: string[]
  carbonBudget: number
  dependencies: string[]
  es: Date
  ef: Date
  float: number
}

const initialTasks: Task[] = [
  {
    id: "task-1",
    name: "Fondations Speciales",
    phase: "fondations",
    startDate: new Date(2026, 4, 1),
    endDate: new Date(2026, 5, 15),
    status: "done",
    isCriticalPath: false,
    resources: ["Equipe Terrassement", "Grue #01"],
    carbonBudget: 85,
    dependencies: [],
    es: new Date(2026, 4, 1),
    ef: new Date(2026, 5, 15),
    float: 5
  },
  {
    id: "task-2",
    name: "Gros Oeuvre R+1",
    phase: "gros-oeuvre",
    startDate: new Date(2026, 5, 16),
    endDate: new Date(2026, 6, 30),
    status: "in-progress",
    isCriticalPath: true,
    resources: ["Equipe Maconnerie", "Equipe Coffrage", "Grue #01", "Grue #02"],
    carbonBudget: 120,
    dependencies: ["task-1"],
    es: new Date(2026, 5, 16),
    ef: new Date(2026, 6, 30),
    float: 0
  },
  {
    id: "task-3",
    name: "Second Oeuvre",
    phase: "second-oeuvre",
    startDate: new Date(2026, 7, 1),
    endDate: new Date(2026, 8, 15),
    status: "todo",
    isCriticalPath: true,
    resources: ["Equipe Electricite", "Equipe Plomberie", "Equipe Menuiserie"],
    carbonBudget: 45,
    dependencies: ["task-2"],
    es: new Date(2026, 7, 1),
    ef: new Date(2026, 8, 15),
    float: 0
  },
  {
    id: "task-4",
    name: "Reseaux Electriques",
    phase: "second-oeuvre",
    startDate: new Date(2026, 7, 5),
    endDate: new Date(2026, 7, 25),
    status: "todo",
    isCriticalPath: false,
    resources: ["Equipe Electricite"],
    carbonBudget: 15,
    dependencies: ["task-2"],
    es: new Date(2026, 7, 5),
    ef: new Date(2026, 7, 25),
    float: 10
  },
  {
    id: "task-5",
    name: "Finitions & Peinture",
    phase: "finitions",
    startDate: new Date(2026, 8, 16),
    endDate: new Date(2026, 9, 10),
    status: "todo",
    isCriticalPath: true,
    resources: ["Equipe Peinture", "Equipe Finitions"],
    carbonBudget: 20,
    dependencies: ["task-3", "task-4"],
    es: new Date(2026, 8, 16),
    ef: new Date(2026, 9, 10),
    float: 0
  }
]

const phases = [
  { value: "fondations", label: "Fondations" },
  { value: "gros-oeuvre", label: "Gros Oeuvre" },
  { value: "second-oeuvre", label: "Second Oeuvre" },
  { value: "finitions", label: "Finitions" },
  { value: "livraison", label: "Livraison" }
]

const availableResources = [
  "Equipe Terrassement",
  "Equipe Maconnerie",
  "Equipe Coffrage",
  "Equipe Electricite",
  "Equipe Plomberie",
  "Equipe Menuiserie",
  "Equipe Peinture",
  "Equipe Finitions",
  "Grue #01",
  "Grue #02",
  "Pelleteuse #04"
]

export default function PlanningPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["fondations", "gros-oeuvre", "second-oeuvre", "finitions"])
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [showAISidebar, setShowAISidebar] = useState(true)
  const [linkingTask, setLinkingTask] = useState<string | null>(null)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  
  const [newTask, setNewTask] = useState({
    name: "",
    phase: "",
    startDate: new Date(),
    duration: 14,
    resources: [] as string[],
    carbonBudget: 0
  })
  const [isPredictingDuration, setIsPredictingDuration] = useState(false)
  
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "J'ai analyse le planning du projet Tour Hekla. Je detecte une opportunite d'optimisation sur l'enchainement des taches.", timestamp: new Date() },
    { role: "assistant", content: "Voulez-vous que j'optimise l'enchainement de ces taches pour reduire la duree totale de 15% ?", timestamp: new Date() }
  ])
  const [aiInput, setAiInput] = useState("")

  const timelineStart = new Date(2026, 4, 1)
  const timelineEnd = new Date(2026, 9, 31)
  const totalDays = differenceInDays(timelineEnd, timelineStart)

  const getTaskPosition = (task: Task) => {
    const startOffset = differenceInDays(task.startDate, timelineStart)
    const duration = differenceInDays(task.endDate, task.startDate)
    const left = (startOffset / totalDays) * 100
    const width = (duration / totalDays) * 100
    return { left: `${left}%`, width: `${Math.max(width, 2)}%` }
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "done": return "bg-[#28A745]"
      case "in-progress": return "bg-[#17A2B8]"
      case "todo": return "bg-muted-foreground/40"
    }
  }

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "done": return <Badge className="bg-[#28A745] text-white">Termine</Badge>
      case "in-progress": return <Badge className="bg-[#17A2B8] text-white">En cours</Badge>
      case "todo": return <Badge variant="secondary">A faire</Badge>
    }
  }

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => prev.includes(phase) ? prev.filter(p => p !== phase) : [...prev, phase])
  }

  const handleAddTask = () => {
    const endDate = addDays(newTask.startDate, newTask.duration)
    const task: Task = {
      id: `task-${Date.now()}`,
      name: newTask.name,
      phase: newTask.phase,
      startDate: newTask.startDate,
      endDate: endDate,
      status: "todo",
      isCriticalPath: false,
      resources: newTask.resources,
      carbonBudget: newTask.carbonBudget,
      dependencies: [],
      es: newTask.startDate,
      ef: endDate,
      float: 5
    }
    setTasks([...tasks, task])
    setIsAddTaskOpen(false)
    setNewTask({ name: "", phase: "", startDate: new Date(), duration: 14, resources: [], carbonBudget: 0 })
  }

  const handlePredictDuration = async () => {
    setIsPredictingDuration(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const predictedDuration = Math.floor(Math.random() * 20) + 10
    setNewTask(prev => ({ ...prev, duration: predictedDuration }))
    setIsPredictingDuration(false)
  }

  const handleCreateDependency = (fromTaskId: string, toTaskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === toTaskId ? { ...task, dependencies: [...task.dependencies, fromTaskId] } : task
    ))
    setLinkingTask(null)
  }

  const handleApplyOptimization = () => {
    setTasks(prev => prev.map((task, index) => {
      if (index === 0) return task
      const compressionFactor = 0.85
      const originalDuration = differenceInDays(task.endDate, task.startDate)
      const newDuration = Math.floor(originalDuration * compressionFactor)
      return { ...task, endDate: addDays(task.startDate, newDuration) }
    }))
    setAiMessages(prev => [...prev, { role: "assistant", content: "Optimisation appliquee ! La duree totale du projet a ete reduite de 15%. Les taches ont ete reordonnancees pour maximiser le parallelisme.", timestamp: new Date() }])
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, { role: "user", content: aiInput, timestamp: new Date() }])
    setAiInput("")
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: "assistant", content: "J'ai bien recu votre demande. Je l'analyse et vous propose une solution adaptee au contexte du projet Tour Hekla.", timestamp: new Date() }])
    }, 1000)
  }

  const groupedTasks = phases.map(phase => ({ ...phase, tasks: tasks.filter(t => t.phase === phase.value) })).filter(g => g.tasks.length > 0)

  const months: Date[] = []
  let currentMonth = new Date(timelineStart)
  while (currentMonth <= timelineEnd) {
    months.push(new Date(currentMonth))
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">Planning Gantt - Tour Hekla</h1>
              {isOfflineMode && (
                <Badge variant="outline" className="gap-1 border-amber-500 text-amber-500">
                  <WifiOff className="h-3 w-3" />
                  Saisie Manuelle
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">Ordonnancement et suivi des taches du projet</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Switch checked={isOfflineMode} onCheckedChange={setIsOfflineMode} id="offline-mode" />
              <Label htmlFor="offline-mode" className="text-sm text-muted-foreground">Mode Hors-ligne</Label>
            </div>
            <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                  <Plus className="h-4 w-4" />
                  Ajouter Tache
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nouvelle Tache</DialogTitle>
                  <DialogDescription>Creez une nouvelle tache pour le planning du projet</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-name">Nom de la tache *</Label>
                    <Input id="task-name" value={newTask.name} onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))} placeholder="Ex: Coulage dalle RDC" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Phase associee *</Label>
                      <Select value={newTask.phase} onValueChange={(value) => setNewTask(prev => ({ ...prev, phase: value }))}>
                        <SelectTrigger><SelectValue placeholder="Selectionner une phase" /></SelectTrigger>
                        <SelectContent>
                          {phases.map(phase => (<SelectItem key={phase.value} value={phase.value}>{phase.label}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Date de debut *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-start text-left font-normal">
                            <Calendar className="mr-2 h-4 w-4" />
                            {format(newTask.startDate, "dd MMM yyyy", { locale: fr })}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={newTask.startDate} onSelect={(date) => date && setNewTask(prev => ({ ...prev, startDate: date }))} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duree (jours) *</Label>
                      <div className="flex gap-2">
                        <Input id="duration" type="number" min={1} value={newTask.duration} onChange={(e) => setNewTask(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))} className="flex-1" />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" onClick={handlePredictDuration} disabled={isPredictingDuration || isOfflineMode} className="shrink-0">
                                <Sparkles className={cn("h-4 w-4 text-[#593196]", isPredictingDuration && "animate-pulse")} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{isOfflineMode ? "IA non disponible en mode hors-ligne" : "Predire duree via IA"}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-xs text-muted-foreground">Date de fin calculee: {format(addDays(newTask.startDate, newTask.duration), "dd MMM yyyy", { locale: fr })}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="carbon">Budget Carbone (tCO2e)</Label>
                      <Input id="carbon" type="number" min={0} value={newTask.carbonBudget} onChange={(e) => setNewTask(prev => ({ ...prev, carbonBudget: parseInt(e.target.value) || 0 }))} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Ressources assignees</Label>
                    <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[80px]">
                      {availableResources.map(resource => (
                        <Badge key={resource} variant={newTask.resources.includes(resource) ? "default" : "outline"} className={cn("cursor-pointer transition-colors", newTask.resources.includes(resource) && "bg-[#593196]")} onClick={() => { setNewTask(prev => ({ ...prev, resources: prev.resources.includes(resource) ? prev.resources.filter(r => r !== resource) : [...prev.resources, resource] })) }}>
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Annuler</Button>
                  <Button onClick={handleAddTask} disabled={!newTask.name || !newTask.phase} className="bg-[#593196] hover:bg-[#593196]/90">Creer la tache</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <StatCardList>
          <InteractiveStatCard
            label="Tâches Totales"
            value={tasks.length}
            icon={Calendar}
            variant="purple"
            onClick={() => {
              setExpandedPhases(["fondations", "gros-oeuvre", "second-oeuvre", "finitions"])
              toast.success(`${tasks.length} tâches affichées`)
            }}
          />
          <InteractiveStatCard
            label="En Retard"
            value="0"
            icon={AlertTriangle}
            variant="danger"
            onClick={() => toast.info("Aucune tâche en retard actuellement")}
          />
          <InteractiveStatCard
            label="Chemin Critique"
            value={tasks.filter(t => t.isCriticalPath).length}
            icon={Clock}
            variant="warning"
            onClick={() => {
              const criticalTasks = tasks.filter(t => t.isCriticalPath).map(t => t.name)
              toast.info(`Chemin critique: ${criticalTasks.join(", ")}`)
            }}
          />
          <InteractiveStatCard
            label="Budget Carbone"
            value={`${tasks.reduce((acc, t) => acc + t.carbonBudget, 0)} tCO2e`}
            icon={Leaf}
            variant="success"
            onClick={() => {
              const totalCarbon = tasks.reduce((acc, t) => acc + t.carbonBudget, 0)
              toast.info(`Budget carbone total: ${totalCarbon} tCO2e - Objectif RE2020 respecté`)
            }}
          />
        </StatCardList>

        <Card className="flex-1 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Vue Gantt</CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#28A745]" /><span>Termine</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#17A2B8]" /><span>En cours</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-muted-foreground/40" /><span>A faire</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#FC3939] animate-pulse" /><span>Chemin critique</span></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-auto h-[calc(100%-60px)]">
            <div className="min-w-[1200px]">
              <div className="flex border-b sticky top-0 bg-background z-10">
                <div className="w-80 shrink-0 p-3 border-r font-medium text-sm">Tache</div>
                <div className="flex-1 flex">
                  {months.map((month, index) => (<div key={index} className="flex-1 p-2 text-center text-xs font-medium border-r last:border-r-0">{format(month, "MMM yyyy", { locale: fr })}</div>))}
                </div>
              </div>
              <div>
                {groupedTasks.map(group => (
                  <div key={group.value}>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 border-b cursor-pointer hover:bg-muted/70" onClick={() => togglePhase(group.value)}>
                      {expandedPhases.includes(group.value) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      <span className="font-medium">{group.label}</span>
                      <Badge variant="secondary" className="ml-2">{group.tasks.length}</Badge>
                    </div>
                    {expandedPhases.includes(group.value) && group.tasks.map(task => (
                      <ContextMenu key={task.id}>
                        <ContextMenuTrigger>
                          <div className={cn("flex border-b hover:bg-muted/30 transition-colors", linkingTask === task.id && "bg-[#593196]/10")}>
                            <div className="w-80 shrink-0 p-3 border-r flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  {task.status === "done" && <CheckCircle className="h-4 w-4 text-[#28A745]" />}
                                  {task.status === "in-progress" && <Play className="h-4 w-4 text-[#17A2B8]" />}
                                  {task.status === "todo" && <Circle className="h-4 w-4 text-muted-foreground" />}
                                  <span className="font-medium truncate">{task.name}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                  <span>{format(task.startDate, "dd/MM")} - {format(task.endDate, "dd/MM")}</span>
                                  {task.dependencies.length > 0 && (<Badge variant="outline" className="text-[10px] h-4"><Link2 className="h-2 w-2 mr-1" />{task.dependencies.length}</Badge>)}
                                </div>
                              </div>
                              {getStatusBadge(task.status)}
                            </div>
                            <div className="flex-1 relative py-3">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className={cn("absolute h-8 rounded cursor-move transition-all", getStatusColor(task.status), task.isCriticalPath && "ring-2 ring-[#FC3939] shadow-[0_0_10px_rgba(252,57,57,0.5)]", draggedTask === task.id && "opacity-50")} style={getTaskPosition(task)} draggable onDragStart={() => setDraggedTask(task.id)} onDragEnd={() => setDraggedTask(null)}>
                                      <div className="h-full flex items-center justify-center text-xs text-white font-medium px-2 truncate">{differenceInDays(task.endDate, task.startDate)}j</div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <div className="space-y-1">
                                      <p className="font-semibold">{task.name}</p>
                                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                        <div><span className="text-muted-foreground">ES:</span> {format(task.es, "dd/MM/yyyy")}</div>
                                        <div><span className="text-muted-foreground">EF:</span> {format(task.ef, "dd/MM/yyyy")}</div>
                                        <div className="col-span-2"><span className="text-muted-foreground">Marge (Float):</span> {task.float} jours</div>
                                      </div>
                                      {task.isCriticalPath && (<Badge className="bg-[#FC3939] text-white text-[10px]">Chemin Critique</Badge>)}
                                      <div className="flex items-center gap-1 pt-1"><Users className="h-3 w-3" /><span className="text-xs">{task.resources.length} ressources</span></div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem>Modifier la tache</ContextMenuItem>
                          <ContextMenuItem onClick={() => setLinkingTask(task.id)}><Link2 className="h-4 w-4 mr-2" />Creer une dependance</ContextMenuItem>
                          {linkingTask && linkingTask !== task.id && (<ContextMenuItem onClick={() => handleCreateDependency(linkingTask, task.id)}><Link2 className="h-4 w-4 mr-2 text-[#593196]" />Lier depuis {tasks.find(t => t.id === linkingTask)?.name}</ContextMenuItem>)}
                          <ContextMenuItem className="text-[#FC3939]">Supprimer</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAISidebar && (
        <Card className="w-80 shrink-0 flex flex-col">
          <CardHeader className="pb-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#593196] flex items-center justify-center"><Sparkles className="h-4 w-4 text-white" /></div>
                <div><CardTitle className="text-sm">Assistant IA</CardTitle><CardDescription className="text-xs">Optimisation Planning</CardDescription></div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAISidebar(false)}><X className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {aiMessages.map((message, index) => (<div key={index} className={cn("p-3 rounded-lg text-sm", message.role === "assistant" ? "bg-[#593196]/10 border border-[#593196]/20" : "bg-muted ml-4")}>{message.content}</div>))}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-emerald-500" /><span className="font-medium text-sm">Action Suggeree</span></div>
              <p className="text-xs text-muted-foreground mb-3">Reduire la duree totale de 15% en optimisant le parallelisme des taches</p>
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleApplyOptimization}>Appliquer l&apos;optimisation</Button>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input placeholder="Poser une question..." value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAISend()} className="flex-1" />
              <Button size="icon" onClick={handleAISend} className="bg-[#593196] hover:bg-[#593196]/90"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      )}
      
      {!showAISidebar && (<Button className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-[#593196] hover:bg-[#593196]/90" onClick={() => setShowAISidebar(true)}><MessageSquare className="h-5 w-5" /></Button>)}
    </div>
  )
}
