"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { 
  ClipboardList, 
  Users, 
  Mic, 
  MicOff,
  Check,
  Clock,
  Play,
  Plus,
  Minus,
  FileDown,
  Calendar,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Sparkles,
  X,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Edit,
  Eye,
  Send,
  FileSignature,
  Camera,
  Image,
  Thermometer
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Textarea } from "@/shared/components/ui/textarea"
import { Progress } from "@/shared/components/ui/progress"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { cn } from "@/shared/utils"

// Report status type
type ReportStatus = "draft" | "signed" | "sent"

// Task status type
type TaskStatus = "pending" | "started" | "in_progress" | "completed"

// Historical reports
const historicalReports = [
  { id: 1, date: "2026-05-05", weather: "sunny", temp: 22, workers: 16, status: "sent" as ReportStatus, progress: 102 },
  { id: 2, date: "2026-05-04", weather: "cloudy", temp: 18, workers: 14, status: "sent" as ReportStatus, progress: 95 },
  { id: 3, date: "2026-05-03", weather: "rainy", temp: 15, workers: 12, status: "signed" as ReportStatus, progress: 78 },
  { id: 4, date: "2026-05-02", weather: "sunny", temp: 24, workers: 16, status: "sent" as ReportStatus, progress: 110 },
  { id: 5, date: "2026-05-01", weather: "cloudy", temp: 19, workers: 15, status: "draft" as ReportStatus, progress: 88 },
]

// Today's tasks
const initialTasks = [
  { id: 1, name: "Coulage Dalle niveau R+2", lot: "Gros Oeuvre", status: "completed" as TaskStatus },
  { id: 2, name: "Pose ferraillage escalier", lot: "Gros Oeuvre", status: "in_progress" as TaskStatus },
  { id: 3, name: "Tirage cables zone A", lot: "Electricite", status: "in_progress" as TaskStatus },
  { id: 4, name: "Installation gaines CVC", lot: "Plomberie", status: "started" as TaskStatus },
  { id: 5, name: "Controle etancheite toiture", lot: "Etancheite", status: "pending" as TaskStatus },
]

// Personnel by trade
const initialPersonnel = [
  { lot: "Lot 01 - Gros Oeuvre", planned: 12, present: 12 },
  { lot: "Lot 02 - Electricite", planned: 4, present: 4 },
  { lot: "Lot 03 - Plomberie", planned: 3, present: 2 },
  { lot: "Lot 04 - Etancheite", planned: 2, present: 2 },
]

// Weather options
const weatherOptions = [
  { id: "sunny", label: "Ensoleille", icon: Sun, color: "text-amber-400" },
  { id: "cloudy", label: "Nuageux", icon: Cloud, color: "text-gray-400" },
  { id: "rainy", label: "Pluvieux", icon: CloudRain, color: "text-blue-400" },
  { id: "snowy", label: "Neigeux", icon: CloudSnow, color: "text-cyan-300" },
  { id: "windy", label: "Venteux", icon: Wind, color: "text-teal-400" },
]

export default function DailyReportPage() {
  const [reports, setReports] = useState(historicalReports)
  const [showNewReportDialog, setShowNewReportDialog] = useState(false)
  const [editingReport, setEditingReport] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiActionTaken, setAiActionTaken] = useState(false)
  
  // Form state
  const [selectedWeather, setSelectedWeather] = useState("sunny")
  const [temperature, setTemperature] = useState("22")
  const [personnel, setPersonnel] = useState(initialPersonnel)
  const [tasks, setTasks] = useState(initialTasks)
  const [events, setEvents] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [voiceNote, setVoiceNote] = useState("")
  const [showPdfPreview, setShowPdfPreview] = useState(false)
  const [showReportDetailDialog, setShowReportDetailDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<typeof historicalReports[0] | null>(null)
  const photoInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)

  const totalSteps = 3

  const getWeatherIcon = (weather: string) => {
    const option = weatherOptions.find(w => w.id === weather)
    if (option) {
      const Icon = option.icon
      return <Icon className={cn("h-4 w-4", option.color)} />
    }
    return <Sun className="h-4 w-4 text-amber-400" />
  }

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary" className="bg-muted text-muted-foreground">Brouillon</Badge>
      case "signed":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Signe</Badge>
      case "sent":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Envoye</Badge>
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("fr-FR", { 
      weekday: "short", 
      day: "numeric", 
      month: "short"
    })
  }

  const updatePersonnelCount = (lot: string, delta: number) => {
    setPersonnel(prev => prev.map(p => {
      if (p.lot === lot) {
        return { ...p, present: Math.max(0, p.present + delta) }
      }
      return p
    }))
  }

  const updateTaskStatus = (taskId: number, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }
      }
      return task
    }))
  }

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      setTimeout(() => {
        setVoiceNote("Coulage dalle termine sans incident. Equipe motivee, pas de probleme de securite.")
        setIsRecording(false)
      }, 2000)
    } else {
      setIsRecording(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          setPhotos((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleViewReport = (report: typeof historicalReports[0]) => {
    setSelectedReport(report)
    setShowReportDetailDialog(true)
  }

  const openNewReport = () => {
    setEditingReport(null)
    setCurrentStep(1)
    setSelectedWeather("sunny")
    setTemperature("22")
    setPersonnel(initialPersonnel)
    setTasks(initialTasks)
    setEvents("")
    setPhotos([])
    setVoiceNote("")
    setShowNewReportDialog(true)
  }

  const openEditReport = (reportId: number) => {
    setEditingReport(reportId)
    setCurrentStep(1)
    setShowNewReportDialog(true)
  }

  const handleValidateAndSign = () => {
    setShowPdfPreview(true)
  }

  const handleFinalSubmit = () => {
    const newReport = {
      id: reports.length + 1,
      date: new Date().toISOString().split('T')[0],
      weather: selectedWeather,
      temp: parseInt(temperature),
      workers: personnel.reduce((acc, p) => acc + p.present, 0),
      status: "signed" as ReportStatus,
      progress: 102
    }
    setReports(prev => [newReport, ...prev])
    setShowPdfPreview(false)
    setShowNewReportDialog(false)
    toast.success("Rapport signe et envoye", {
      description: "Le rapport journalier a ete genere et envoye avec succes."
    })
  }

  const totalPresent = personnel.reduce((acc, p) => acc + p.present, 0)
  const totalPlanned = personnel.reduce((acc, p) => acc + p.planned, 0)
  const completedTasks = tasks.filter(t => t.status === "completed").length

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "pending": return "bg-muted text-muted-foreground"
      case "started": return "bg-blue-500/20 text-blue-400"
      case "in_progress": return "bg-amber-500/20 text-amber-400"
      case "completed": return "bg-emerald-500/20 text-emerald-400"
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Rapports Journaliers</h1>
          <p className="text-muted-foreground">Historique et creation des rapports de chantier</p>
        </div>
        <Badge variant="outline" className="w-fit">Tour Hekla</Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{reports.length}</div>
                <div className="text-xs text-muted-foreground">Rapports totaux</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{reports.filter(r => r.status === "sent").length}</div>
                <div className="text-xs text-muted-foreground">Envoyes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <FileSignature className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{reports.filter(r => r.status === "signed").length}</div>
                <div className="text-xs text-muted-foreground">Signes</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Edit className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="text-2xl font-bold">{reports.filter(r => r.status === "draft").length}</div>
                <div className="text-xs text-muted-foreground">Brouillons</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Historique des Rapports</CardTitle>
            <Button className="gap-2" onClick={openNewReport}>
              <Plus className="h-4 w-4" />
              Nouveau Rapport
            </Button>
          </div>
          <CardDescription>Liste des rapports journaliers avec statut</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Meteo</TableHead>
                <TableHead className="text-center">Effectifs</TableHead>
                <TableHead className="text-center">Avancement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{formatDate(report.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(report.weather)}
                      <span>{report.temp}°C</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{report.workers}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "font-semibold",
                      report.progress >= 100 ? "text-emerald-400" : "text-amber-400"
                    )}>
                      {report.progress}%
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => openEditReport(report.id)}
                        disabled={report.status === "sent"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New/Edit Report Dialog */}
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingReport ? "Modifier le Rapport" : "Nouveau Rapport Journalier"}
            </DialogTitle>
            <DialogDescription>
              {new Date().toLocaleDateString("fr-FR", { 
                weekday: "long", 
                day: "numeric", 
                month: "long", 
                year: "numeric" 
              })}
            </DialogDescription>
          </DialogHeader>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors",
                  currentStep >= step 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                <span className={cn(
                  "ml-2 text-sm hidden sm:inline",
                  currentStep >= step ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step === 1 && "Meteo / Effectifs"}
                  {step === 2 && "Avancement"}
                  {step === 3 && "Evenements / Photos"}
                </span>
                {step < 3 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Weather & Workforce */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Weather Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Conditions Meteo</Label>
                <div className="grid grid-cols-5 gap-2">
                  {weatherOptions.map((weather) => {
                    const Icon = weather.icon
                    return (
                      <button
                        key={weather.id}
                        onClick={() => setSelectedWeather(weather.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                          selectedWeather === weather.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className={cn("h-6 w-6", weather.color)} />
                        <span className="text-xs">{weather.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <Label>Temperature</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">°C</span>
                  </div>
                </div>
              </div>

              {/* Workforce */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Effectifs par Lot</Label>
                <div className="space-y-2">
                  {personnel.map((p) => (
                    <div 
                      key={p.lot} 
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                    >
                      <div>
                        <div className="font-medium text-sm">{p.lot}</div>
                        <div className="text-xs text-muted-foreground">Prevu: {p.planned}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => updatePersonnelCount(p.lot, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className={cn(
                          "w-8 text-center font-bold text-lg",
                          p.present < p.planned ? "text-amber-400" : "text-emerald-400"
                        )}>
                          {p.present}
                        </span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8"
                          onClick={() => updatePersonnelCount(p.lot, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-semibold">Total Effectifs</span>
                  <Badge className={cn(
                    "text-base px-3",
                    totalPresent >= totalPlanned ? "bg-emerald-600" : "bg-amber-600"
                  )}>
                    {totalPresent} / {totalPlanned}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Progress */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">Avancement des Taches</Label>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="border border-border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium">{task.name}</div>
                        <div className="text-xs text-muted-foreground">{task.lot}</div>
                      </div>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === "pending" && "A faire"}
                        {task.status === "started" && "Commencee"}
                        {task.status === "in_progress" && "En cours"}
                        {task.status === "completed" && "Terminee"}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={task.status === "started" ? "default" : "outline"}
                        className="flex-1 gap-1"
                        onClick={() => updateTaskStatus(task.id, "started")}
                      >
                        <Play className="h-3 w-3" />
                        Commencee
                      </Button>
                      <Button 
                        size="sm" 
                        variant={task.status === "in_progress" ? "default" : "outline"}
                        className="flex-1 gap-1"
                        onClick={() => updateTaskStatus(task.id, "in_progress")}
                      >
                        <Clock className="h-3 w-3" />
                        En cours
                      </Button>
                      <Button 
                        size="sm" 
                        variant={task.status === "completed" ? "default" : "outline"}
                        className={cn(
                          "flex-1 gap-1",
                          task.status === "completed" && "bg-emerald-600 hover:bg-emerald-700"
                        )}
                        onClick={() => updateTaskStatus(task.id, "completed")}
                      >
                        <Check className="h-3 w-3" />
                        Terminee
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 bg-muted/50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progression globale</span>
                <Badge className="bg-primary">{completedTasks}/{tasks.length} taches terminees</Badge>
              </div>
            </div>
          )}

          {/* Step 3: Events & Photos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Events */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Faits Marquants</Label>
                <Textarea
                  placeholder="Decrivez les evenements importants de la journee..."
                  value={events}
                  onChange={(e) => setEvents(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Voice Note with AI */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Note Vocale</Label>
                  <Button 
                    size="sm" 
                    variant={isRecording ? "destructive" : "outline"}
                    className="gap-2"
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4" />
                        <span className="animate-pulse">Arreter</span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" />
                        <Sparkles className="h-3 w-3 text-primary" />
                        Dictee IA
                      </>
                    )}
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Votre note vocale sera transcrite ici..."
                    value={voiceNote}
                    onChange={(e) => setVoiceNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  {isRecording && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md">
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                          <Mic className="h-8 w-8 text-red-500" />
                          <span className="absolute inset-0 animate-ping rounded-full bg-red-500/30" />
                        </div>
                        <span className="text-sm text-muted-foreground">Ecoute en cours...</span>
                      </div>
                    </div>
                  )}
                </div>
                {voiceNote && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Transcription automatique par IA
                  </p>
                )}
              </div>

              {/* Photos */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Photos</Label>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden border border-border relative group"
                    >
                      {photo.startsWith("data:") ? (
                        <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <img className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <button 
                        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mb-1">Ajouter</span>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-[10px]"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        Fichier
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-[10px]"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        Camera
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Precedent
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                className="gap-2"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleValidateAndSign}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                <FileSignature className="h-4 w-4" />
                Valider et Signer
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Apercu du Rapport</DialogTitle>
            <DialogDescription>Verifiez le rapport avant signature</DialogDescription>
          </DialogHeader>
          
          <div className="border border-border rounded-lg p-4 space-y-4 bg-white text-black">
            <div className="text-center border-b pb-3">
              <h3 className="font-bold text-lg">RAPPORT JOURNALIER</h3>
              <p className="text-sm text-gray-600">Tour Hekla - {new Date().toLocaleDateString("fr-FR")}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Meteo</p>
                <p>{weatherOptions.find(w => w.id === selectedWeather)?.label}, {temperature}°C</p>
              </div>
              <div>
                <p className="font-semibold">Effectifs</p>
                <p>{totalPresent} presents / {totalPlanned} prevus</p>
              </div>
            </div>
            
            <div className="text-sm">
              <p className="font-semibold">Avancement</p>
              <p>{completedTasks}/{tasks.length} taches terminees</p>
            </div>
            
            {voiceNote && (
              <div className="text-sm">
                <p className="font-semibold">Notes</p>
                <p className="italic">&ldquo;{voiceNote}&rdquo;</p>
              </div>
            )}
            
            <div className="border-t pt-3 text-center">
              <p className="text-xs text-gray-500">Document genere par Cyperux</p>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowPdfPreview(false)}>
              Modifier
            </Button>
            <Button className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={handleFinalSubmit}>
              <FileDown className="h-4 w-4" />
              Generer PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Detail Dialog */}
      <Dialog open={showReportDetailDialog} onOpenChange={setShowReportDetailDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Rapport Journalier</DialogTitle>
            <DialogDescription>
              {selectedReport && formatDate(selectedReport.date)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="border border-border rounded-lg p-4 space-y-4 bg-card">
              <div className="text-center border-b border-border pb-3">
                <h3 className="font-bold text-lg">RAPPORT JOURNALIER</h3>
                <p className="text-sm text-muted-foreground">Tour Hekla - {formatDate(selectedReport.date)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-muted-foreground">Meteo</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getWeatherIcon(selectedReport.weather)}
                    <span>{weatherOptions.find(w => w.id === selectedReport.weather)?.label}, {selectedReport.temp}°C</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">Effectifs</p>
                  <p className="mt-1">{selectedReport.workers} presents</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-semibold text-muted-foreground">Avancement</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "font-bold",
                    selectedReport.progress >= 100 ? "text-emerald-400" : "text-amber-400"
                  )}>
                    {selectedReport.progress}%
                  </span>
                  <span className="text-muted-foreground">de l&apos;objectif</span>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-semibold text-muted-foreground">Statut</p>
                <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
              </div>
              
              <div className="border-t border-border pt-3 text-center">
                <p className="text-xs text-muted-foreground">Document genere par Cyperux</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowReportDetailDialog(false)}>
              Fermer
            </Button>
            <Button className="flex-1 gap-2" onClick={() => {
              if (selectedReport) {
                openEditReport(selectedReport.id)
                setShowReportDetailDialog(false)
              }
            }} disabled={selectedReport?.status === "sent"}>
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAB - Floating Action Button */}
      <button
        onClick={openNewReport}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center z-40"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-24 right-6 w-80 z-50">
          <Card className="border-primary/30 shadow-lg shadow-primary/10">
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Cyperux</CardTitle>
                  <CardDescription className="text-xs">Resume de journee</CardDescription>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 -mt-1 -mr-1"
                onClick={() => setShowAIChat(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Journee productive.</strong> Gros oeuvre termine a <span className="text-emerald-400 font-semibold">102%</span> de l&apos;objectif. Aucune reserve signalee.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Voulez-vous generer le rapport PDF pour le client ?
                </p>
                {!aiActionTaken ? (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 h-8 text-xs gap-1"
                      onClick={() => setAiActionTaken(true)}
                    >
                      <FileDown className="h-3 w-3" />
                      Generer PDF
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-8 text-xs"
                      onClick={() => setShowAIChat(false)}
                    >
                      Plus tard
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs">Rapport genere et envoye</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
