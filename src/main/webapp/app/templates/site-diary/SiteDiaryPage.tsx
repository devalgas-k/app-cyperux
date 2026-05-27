"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { 
  Camera, 
  Plus, 
  Mic, 
  MicOff,
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Calendar,
  Wrench,
  Shield,
  CloudRain,
  Truck,
  Upload,
  X,
  Check,
  Sparkles,
  Send,
  MessageSquare,
  ChevronRight,
  Image as ImageIcon,
  Play,
  Square,
  Tag,
  ZoomIn
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Progress } from "@/shared/components/ui/progress"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Label } from "@/shared/components/ui/label"
import { cn } from "@/shared/utils"

// Photo data
const sitePhotos = [
  {
    id: 1,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "08:42",
    zone: "R+2 - Zone A",
    author: "Marc D.",
    authorInitials: "MD",
    tags: ["Coffrage", "Structure"],
    hasIssue: false,
  },
  {
    id: 2,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "09:15",
    zone: "Sous-sol - Parking",
    author: "Sophie L.",
    authorInitials: "SL",
    tags: ["Étanchéité"],
    hasIssue: true,
    issueType: "Technique",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "10:30",
    zone: "R+1 - Zone B",
    author: "Thomas B.",
    authorInitials: "TB",
    tags: ["Électricité", "Réseaux"],
    hasIssue: false,
  },
  {
    id: 4,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "11:05",
    zone: "Façade Nord",
    author: "Emma R.",
    authorInitials: "ER",
    tags: ["ITE", "Isolation"],
    hasIssue: true,
    issueType: "Sécurité",
  },
  {
    id: 5,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "14:20",
    zone: "R+3 - Zone C",
    author: "Marc D.",
    authorInitials: "MD",
    tags: ["Plomberie"],
    hasIssue: false,
  },
  {
    id: 6,
    url: "/placeholder.svg?height=200&width=300",
    date: "06/05/2026",
    time: "15:45",
    zone: "Toiture",
    author: "Sophie L.",
    authorInitials: "SL",
    tags: ["Étanchéité", "Membrane"],
    hasIssue: true,
    issueType: "Météo",
  },
]

// Timeline events
const timelineEvents = [
  {
    id: 1,
    time: "07:30",
    type: "start",
    title: "Ouverture du chantier",
    description: "Pointage équipes - 45 personnes présentes",
    icon: Clock,
  },
  {
    id: 2,
    time: "08:15",
    type: "delivery",
    title: "Livraison béton C30/37",
    description: "Toupie #42 - 8m³ reçus, bon de livraison validé",
    icon: Truck,
  },
  {
    id: 3,
    time: "09:15",
    type: "issue",
    title: "Aléa technique signalé",
    description: "Infiltration détectée en sous-sol parking",
    icon: AlertTriangle,
    severity: "medium",
  },
  {
    id: 4,
    time: "10:00",
    type: "inspection",
    title: "Visite bureau de contrôle",
    description: "Vérification armatures R+2 - Conforme",
    icon: Shield,
  },
  {
    id: 5,
    time: "11:30",
    type: "issue",
    title: "Alerte sécurité",
    description: "EPI manquant détecté zone façade",
    icon: AlertTriangle,
    severity: "high",
  },
  {
    id: 6,
    time: "12:00",
    type: "pause",
    title: "Pause déjeuner",
    description: "Reprise à 13h00",
    icon: Clock,
  },
  {
    id: 7,
    time: "14:00",
    type: "work",
    title: "Coulage dalle R+3",
    description: "Phase 1/3 terminée - 120m² coulés",
    icon: Wrench,
  },
  {
    id: 8,
    time: "15:45",
    type: "weather",
    title: "Alerte météo",
    description: "Averses prévues à 17h - Bâchage en cours",
    icon: CloudRain,
    severity: "medium",
  },
]

// Issue types
const issueTypes = [
  { value: "technique", label: "Technique", icon: Wrench, color: "text-blue-500" },
  { value: "securite", label: "Sécurité", icon: Shield, color: "text-red-500" },
  { value: "meteo", label: "Météo", icon: CloudRain, color: "text-amber-500" },
  { value: "logistique", label: "Logistique", icon: Truck, color: "text-purple-500" },
]

// Severity levels
const severityLevels = [
  { value: "low", label: "Basse", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { value: "medium", label: "Moyenne", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "high", label: "Critique", color: "bg-red-500/20 text-red-400 border-red-500/30" },
]

export default function SiteDiaryPage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcribedText, setTranscribedText] = useState("")
  const [selectedIssueType, setSelectedIssueType] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState<typeof sitePhotos[0] | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "J'ai analysé la photo de la zone sous-sol. Ceci ressemble à un défaut de cure sur le béton frais. J'ai prévenu le responsable qualité et ajouté une tâche de reprise au planning.",
      actions: [
        { label: "Voir la tâche créée", action: "view_task" },
        { label: "Contacter le responsable", action: "contact" },
      ],
    },
  ])
  const [aiInput, setAiInput] = useState("")
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const sitePhotoInputRef = useRef<HTMLInputElement | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
    
    // Simulate transcription after 3 seconds
    setTimeout(() => {
      setTranscribedText("Fissure détectée sur le mur porteur zone B au niveau R+2. Largeur estimée à 2mm, longueur environ 50cm. Nécessite expertise structurelle urgente.")
    }, 3000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getEventColor = (type: string, severity?: string) => {
    if (type === "issue") {
      if (severity === "high") return "border-red-500 bg-red-500/10"
      if (severity === "medium") return "border-amber-500 bg-amber-500/10"
      return "border-blue-500 bg-blue-500/10"
    }
    if (type === "weather") return "border-amber-500 bg-amber-500/10"
    if (type === "delivery") return "border-purple-500 bg-purple-500/10"
    if (type === "inspection") return "border-green-500 bg-green-500/10"
    return "border-muted bg-muted/30"
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          setUploadedPhotos((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = () => {
            setUploadedPhotos((prev) => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    
    setAiMessages((prev) => [
      ...prev,
      { role: "user", content: aiInput },
    ])
    
    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "J'ai analysé votre demande. Basé sur l'historique des aléas similaires sur ce projet, je recommande de faire intervenir l'équipe structure dans les 24h. Voulez-vous que je planifie cette intervention ?",
          actions: [
            { label: "Planifier l'intervention", action: "schedule" },
            { label: "Voir historique", action: "history" },
          ],
        },
      ])
    }, 1500)
    
    setAiInput("")
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Carnet de Chantier</h1>
            <p className="text-muted-foreground">
              Tour Hekla - Journée du 06/05/2026
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                  <Plus className="h-4 w-4" />
                  Signaler un Aléa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Signaler un Aléa</DialogTitle>
                  <DialogDescription>
                    Saisie rapide d&apos;un événement terrain
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Issue Type */}
                  <div className="space-y-2">
                    <Label>Type d&apos;aléa</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {issueTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setSelectedIssueType(type.value)}
                          className={cn(
                            "flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all",
                            selectedIssueType === type.value
                              ? "border-[#593196] bg-[#593196]/10"
                              : "border-border hover:border-muted-foreground/50"
                          )}
                        >
                          <type.icon className={cn("h-5 w-5", type.color)} />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Voice Input */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <div className="relative">
                      <Textarea
                        placeholder="Décrivez l'aléa ou utilisez la dictée vocale..."
                        value={transcribedText}
                        onChange={(e) => setTranscribedText(e.target.value)}
                        className="min-h-[100px] pr-12"
                      />
                      <div className="absolute right-2 top-2">
                        {isRecording ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={stopRecording}
                          >
                            <Square className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 rounded-full p-0 border-[#593196] text-[#593196] hover:bg-[#593196]/10"
                            onClick={startRecording}
                          >
                            <Mic className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    {isRecording && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        <span className="text-muted-foreground">Enregistrement en cours...</span>
                        <span className="font-mono text-[#593196]">{formatTime(recordingTime)}</span>
                        <Badge variant="outline" className="ml-auto gap-1 border-[#593196]/30 text-[#593196]">
                          <Sparkles className="h-3 w-3" />
                          Dictée IA
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Severity */}
                  <div className="space-y-2">
                    <Label>Gravité</Label>
                    <div className="flex gap-2">
                      {severityLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setSelectedSeverity(level.value)}
                          className={cn(
                            "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all",
                            selectedSeverity === level.value
                              ? level.color + " border-current"
                              : "border-border hover:border-muted-foreground/50"
                          )}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label>Photo (optionnel)</Label>
                    <input
                      ref={fileInputRef}
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
                    
                    {/* Preview uploaded photos */}
                    {uploadedPhotos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {uploadedPhotos.map((photo, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div 
                      className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-6 transition-colors hover:border-[#593196]/50 cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="text-center">
                        <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Glissez une photo ou <span className="text-[#593196]">cliquez pour importer</span>
                        </p>
                        <div className="flex gap-2 mt-3 justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              fileInputRef.current?.click()
                            }}
                          >
                            <Upload className="h-3 w-3" />
                            Importer
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-1 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              cameraInputRef.current?.click()
                            }}
                          >
                            <Camera className="h-3 w-3" />
                            Capturer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Localisation</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="r0">RDC - Hall</SelectItem>
                        <SelectItem value="r1">R+1 - Zone A</SelectItem>
                        <SelectItem value="r1b">R+1 - Zone B</SelectItem>
                        <SelectItem value="r2">R+2 - Zone A</SelectItem>
                        <SelectItem value="r2b">R+2 - Zone B</SelectItem>
                        <SelectItem value="r3">R+3 - Zone C</SelectItem>
                        <SelectItem value="ss">Sous-sol - Parking</SelectItem>
                        <SelectItem value="facade">Façade Nord</SelectItem>
                        <SelectItem value="toiture">Toiture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    className="gap-2 bg-[#593196] hover:bg-[#593196]/90"
                    onClick={() => {
                      toast.success("Alea enregistre avec succes", {
                        description: "L'alea a ete ajoute au carnet de chantier."
                      })
                      setIsReportDialogOpen(false)
                      setUploadedPhotos([])
                    }}
                  >
                    <Check className="h-4 w-4" />
                    Enregistrer l&apos;aléa
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="border-muted/50 bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <Camera className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">24</p>
                  <p className="text-xs text-muted-foreground">Photos du jour</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-muted/50 bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-500/20 p-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">3</p>
                  <p className="text-xs text-muted-foreground">Aléas signalés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-muted/50 bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-green-500/20 p-2">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">12</p>
                  <p className="text-xs text-muted-foreground">Tâches terminées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-muted/50 bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-purple-500/20 p-2">
                  <User className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold">45</p>
                  <p className="text-xs text-muted-foreground">Personnes sur site</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-2">
          {/* Photo Grid */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Photos de Chantier</CardTitle>
                <div>
                  <input
                    ref={sitePhotoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-xs"
                    onClick={() => sitePhotoInputRef.current?.click()}
                  >
                    <Upload className="h-3 w-3" />
                    Importer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {sitePhotos.map((photo) => (
                  <Dialog key={photo.id}>
                    <DialogTrigger asChild>
                      <button
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/30 transition-all hover:border-[#593196]/50"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        {/* Placeholder Image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        
                        {/* Issue Badge */}
                        {photo.hasIssue && (
                          <div className="absolute right-1 top-1">
                            <Badge 
                              variant="destructive" 
                              className="h-5 px-1.5 text-[10px]"
                            >
                              <AlertTriangle className="mr-0.5 h-2.5 w-2.5" />
                              {photo.issueType}
                            </Badge>
                          </div>
                        )}

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex items-center gap-1 text-[10px] text-white/80">
                            <Clock className="h-2.5 w-2.5" />
                            {photo.time}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-white/80">
                            <MapPin className="h-2.5 w-2.5" />
                            {photo.zone}
                          </div>
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="rounded-full bg-black/50 p-2">
                            <ZoomIn className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Photo - {photo.zone}</DialogTitle>
                        <DialogDescription>
                          {photo.date} à {photo.time} par {photo.author}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Large Image */}
                        <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {photo.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* AI Analysis (if issue) */}
                        {photo.hasIssue && (
                          <div className="rounded-lg border border-[#593196]/30 bg-[#593196]/5 p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-[#593196]" />
                              <span className="text-sm font-medium text-[#593196]">Analyse IA</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Anomalie détectée : {photo.issueType === "Technique" 
                                ? "Défaut d'étanchéité potentiel identifié. Risque d'infiltration si non traité sous 48h."
                                : photo.issueType === "Sécurité"
                                ? "Zone à risque identifiée. Signalisation insuffisante détectée."
                                : "Impact météo probable sur les travaux en cours."}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Timeline du Jour</CardTitle>
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs gap-1"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <Calendar className="h-3 w-3" />
                    {selectedDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </Button>
                  {showDatePicker && (
                    <div className="absolute right-0 top-full mt-1 z-50 bg-popover border border-border rounded-lg p-2 shadow-lg">
                      <div className="flex flex-col gap-1">
                        {[0, 1, 2, 3, 4].map((daysAgo) => {
                          const date = new Date()
                          date.setDate(date.getDate() - daysAgo)
                          return (
                            <Button
                              key={daysAgo}
                              variant={selectedDate.toDateString() === date.toDateString() ? "default" : "ghost"}
                              size="sm"
                              className="text-xs justify-start"
                              onClick={() => {
                                setSelectedDate(date)
                                setShowDatePicker(false)
                              }}
                            >
                              {date.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit" })}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full px-4 pb-4">
                <div className="relative space-y-0 pl-6">
                  {/* Timeline Line */}
                  <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border" />
                  
                  {timelineEvents.map((event, index) => (
                    <div key={event.id} className="relative pb-4">
                      {/* Timeline Dot */}
                      <div className={cn(
                        "absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border-2",
                        event.type === "issue" 
                          ? event.severity === "high" 
                            ? "border-red-500 bg-red-500/20" 
                            : "border-amber-500 bg-amber-500/20"
                          : event.type === "weather"
                          ? "border-amber-500 bg-amber-500/20"
                          : "border-muted bg-background"
                      )}>
                        <event.icon className={cn(
                          "h-3 w-3",
                          event.type === "issue"
                            ? event.severity === "high"
                              ? "text-red-500"
                              : "text-amber-500"
                            : event.type === "weather"
                            ? "text-amber-500"
                            : "text-muted-foreground"
                        )} />
                      </div>

                      {/* Event Card */}
                      <div className={cn(
                        "ml-4 rounded-lg border p-3 transition-colors",
                        getEventColor(event.type, event.severity)
                      )}>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">
                            {event.time}
                          </span>
                          {event.type === "issue" && (
                            <Badge 
                              variant={event.severity === "high" ? "destructive" : "secondary"}
                              className="h-5 text-[10px]"
                            >
                              {event.severity === "high" ? "Critique" : "Moyen"}
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Sidebar */}
      {showAIChat && (
        <Card className="hidden w-80 flex-col lg:flex">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#593196]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant IA</CardTitle>
                  <CardDescription className="text-xs">Analyse en cours</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowAIChat(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-lg p-3",
                    msg.role === "assistant"
                      ? "border border-[#593196]/30 bg-[#593196]/5"
                      : "ml-4 bg-muted"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-[#593196]" />
                      <span className="text-xs font-medium text-[#593196]">Cyperux IA</span>
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  {msg.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((action, actionIdx) => (
                        <Button
                          key={actionIdx}
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-[#593196]/30 text-[#593196] hover:bg-[#593196]/10"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Poser une question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="text-sm"
              />
              <Button
                size="icon"
                className="shrink-0 bg-[#593196] hover:bg-[#593196]/90"
                onClick={handleAISend}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating AI Button (when sidebar is hidden) */}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] shadow-lg hover:bg-[#593196]/90"
          onClick={() => setShowAIChat(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
