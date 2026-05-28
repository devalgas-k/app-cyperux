"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  ChevronRight,
  MapPin,
  Sparkles,
  Leaf,
  Calendar as CalendarIcon,
  Euro,
  Building2,
  FileText,
  ZoomIn,
  ZoomOut,
  Layers,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Calendar } from "@/shared/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { cn } from "@/shared/utils"

// Carbon targets based on construction type (RE2020)
const carbonTargets: Record<string, { target: number; description: string; suggestions: string[] }> = {
  residential: {
    target: 640,
    description: "Bâtiment résidentiel collectif - Seuil RE2020 2025",
    suggestions: [
      "Utiliser des isolants biosourcés (fibre de bois, ouate de cellulose)",
      "Privilégier les menuiseries bois-alu plutôt que PVC",
      "Intégrer une part de béton bas-carbone (>30% CEM III)",
    ],
  },
  commercial: {
    target: 490,
    description: "Bâtiment tertiaire - Seuil RE2020 2025",
    suggestions: [
      "Optimiser la structure avec des planchers mixtes bois-béton",
      "Favoriser les façades légères à ossature bois",
      "Mettre en place un système de réemploi pour les matériaux de second œuvre",
    ],
  },
  infrastructure: {
    target: 850,
    description: "Infrastructure / Génie civil - Estimation SNBPE",
    suggestions: [
      "Utiliser du béton fibré ultra-hautes performances (BFUP) pour réduire les quantités",
      "Intégrer des granulats recyclés (jusqu'à 30%)",
      "Optimiser les coffrages pour limiter les chutes de béton",
    ],
  },
}

export default function ProjectFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  // Form state
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [constructionType, setConstructionType] = useState<string>("")
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [gpsLat, setGpsLat] = useState("")
  const [gpsLng, setGpsLng] = useState("")
  
  // AI suggestion state
  const [aiSuggestion, setAiSuggestion] = useState<typeof carbonTargets.residential | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  
  // Update AI suggestion when construction type changes
  useEffect(() => {
    if (constructionType) {
      setIsAiLoading(true)
      // Simulate AI processing delay
      const timer = setTimeout(() => {
        setAiSuggestion(carbonTargets[constructionType])
        setIsAiLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setAiSuggestion(null)
    }
  }, [constructionType])

  // Preload data for Edit Mode
  useEffect(() => {
    if (isEditMode) {
      // Simulation d'une requête API pour récupérer le projet
      setProjectName("Tour Hekla - La Défense")
      setDescription("Projet de construction de tour IGH")
      setConstructionType("commercial")
      setBudget("15000000")
      setStartDate(new Date(2024, 0, 1))
      setEndDate(new Date(2025, 11, 31))
      setMarkerPosition({ lat: 48.89, lng: 2.24 })
      setGpsLat("48.89")
      setGpsLng("2.24")
    }
  }, [isEditMode, id])
  
  // Handle map click for marker placement
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    // Convert to approximate Paris coordinates
    const lat = 48.8566 + (50 - y) * 0.002
    const lng = 2.3522 + (x - 50) * 0.003
    setMarkerPosition({ lat, lng })
    setGpsLat(lat.toFixed(4))
    setGpsLng(lng.toFixed(4))
  }

  // Handle manual GPS input
  const handleGpsSubmit = () => {
    const lat = parseFloat(gpsLat)
    const lng = parseFloat(gpsLng)
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setMarkerPosition({ lat, lng })
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    toast.success(isEditMode ? "Projet mis à jour avec succès" : "Projet créé avec succès", {
      description: isEditMode ? "Les modifications ont été sauvegardées." : `Le projet "${projectName}" a été ajouté à votre liste de projets.`
    })
    navigate("/templates/projects")
  }
  
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header with Breadcrumb */}
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/templates/projects" className="text-muted-foreground hover:text-foreground">
                  Projets
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {isEditMode ? "Édition" : "Nouveau Projet"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{isEditMode ? "Modifier le projet" : "Création de Projet BTP"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Modifiez les informations de ce projet." : "Renseignez les informations du nouveau chantier"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/templates/projects")}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} type="button" className="gap-2">
              <Sparkles className="h-4 w-4" />
              {isEditMode ? "Enregistrer les modifications" : "Créer le projet"}
            </Button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Column 1: Project Information */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Informations du Projet
              </CardTitle>
              <CardDescription>
                Détails généraux du chantier
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="projectName">Nom du chantier *</Label>
                <Input
                  id="projectName"
                  placeholder="Ex: Tour Résidentielle Montparnasse"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement le projet, ses objectifs et ses particularités..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="bg-background/50 resize-none"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="constructionType">Type de construction *</Label>
                <Select value={constructionType} onValueChange={setConstructionType} required>
                  <SelectTrigger id="constructionType" className="bg-background/50">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        Résidentiel
                      </div>
                    </SelectItem>
                    <SelectItem value="commercial">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        Commercial / Tertiaire
                      </div>
                    </SelectItem>
                    <SelectItem value="infrastructure">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        Infrastructure / Génie Civil
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Budget alloué *</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="1500000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    className="bg-background/50 pl-10"
                    min={0}
                    step={1000}
                  />
                </div>
                {budget && (
                  <p className="text-xs text-muted-foreground">
                    {Number(budget).toLocaleString("fr-FR")} EUR
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Column 2: Planning & Location */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Planning & Localisation
              </CardTitle>
              <CardDescription>
                Dates prévisionnelles et emplacement du chantier
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-2">
                  <Label>Date de debut estimee *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background/50",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{startDate ? format(startDate, "PPP", { locale: fr }) : "Selectionner"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex flex-1 flex-col gap-2">
                  <Label>Date de fin estimee *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background/50",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{endDate ? format(endDate, "PPP", { locale: fr }) : "Selectionner"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        locale={fr}
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {startDate && endDate && (
                <p className="text-xs text-muted-foreground">
                  Durée estimée : {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))} mois
                </p>
              )}
              
              {/* Map Placeholder */}
              <div className="flex flex-col gap-2">
                <Label>Localisation du chantier</Label>
                <div 
                  className="relative h-[200px] cursor-crosshair overflow-hidden rounded-lg border border-border/50 bg-[#1a1a2e]"
                  onClick={handleMapClick}
                >
                  {/* Blueprint grid background */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(89, 49, 150, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(89, 49, 150, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  
                  {/* Simulated map elements */}
                  <div className="absolute inset-0">
                    {/* Seine river simulation */}
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M0,60 Q25,55 50,58 T100,52"
                        fill="none"
                        stroke="rgba(59, 130, 246, 0.4)"
                        strokeWidth="3"
                      />
                      {/* Major roads */}
                      <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1" />
                      <line x1="20" y1="0" x2="80" y2="100" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="0.5" />
                      <line x1="80" y1="0" x2="20" y2="100" stroke="rgba(156, 163, 175, 0.2)" strokeWidth="0.5" />
                    </svg>
                    
                    {/* Paris label */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground/50">
                      PARIS
                    </div>
                    
                    {/* Arrondissements indicators */}
                    <div className="absolute left-[30%] top-[40%] text-[8px] text-muted-foreground/30">1er</div>
                    <div className="absolute left-[60%] top-[35%] text-[8px] text-muted-foreground/30">3e</div>
                    <div className="absolute left-[45%] top-[65%] text-[8px] text-muted-foreground/30">5e</div>
                    <div className="absolute left-[70%] top-[55%] text-[8px] text-muted-foreground/30">12e</div>
                  </div>
                  
                  {/* Marker */}
                  {markerPosition && (
                    <div 
                      className="absolute z-10 -translate-x-1/2 -translate-y-full"
                      style={{
                        left: `${((markerPosition.lng - 2.3522) / 0.003 + 50)}%`,
                        top: `${(50 - (markerPosition.lat - 48.8566) / 0.002)}%`,
                      }}
                    >
                      <div className="relative">
                        <MapPin className="h-8 w-8 text-primary drop-shadow-lg" fill="currentColor" />
                        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 animate-ping rounded-full bg-primary/50" />
                      </div>
                    </div>
                  )}
                  
                  {/* Map controls */}
                  <div className="absolute right-2 top-2 flex flex-col gap-1">
                    <Button variant="secondary" size="icon" className="h-7 w-7" type="button">
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-7 w-7" type="button">
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-7 w-7" type="button">
                      <Layers className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* Instruction overlay */}
                  {!markerPosition && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
                      <div className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Cliquez pour placer un marqueur
                      </div>
                    </div>
                  )}
                </div>
                
                {/* GPS Manual Input */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs text-muted-foreground">Saisie manuelle des coordonnees GPS</Label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        placeholder="Latitude (ex: 48.8636)"
                        value={gpsLat}
                        onChange={(e) => setGpsLat(e.target.value)}
                        className="bg-background/50 text-sm"
                        type="number"
                        step="0.0001"
                      />
                      <span className="text-xs text-muted-foreground">N</span>
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        placeholder="Longitude (ex: 2.3726)"
                        value={gpsLng}
                        onChange={(e) => setGpsLng(e.target.value)}
                        className="bg-background/50 text-sm"
                        type="number"
                        step="0.0001"
                      />
                      <span className="text-xs text-muted-foreground">E</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      type="button"
                      onClick={handleGpsSubmit}
                      className="shrink-0"
                    >
                      Localiser
                    </Button>
                  </div>
                </div>
                
                {markerPosition && (
                  <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-muted-foreground">
                      Position selectionnee : <span className="font-mono text-foreground">{markerPosition.lat.toFixed(4)}N, {markerPosition.lng.toFixed(4)}E</span>
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      type="button"
                      onClick={() => {
                        setMarkerPosition(null)
                        setGpsLat("")
                        setGpsLng("")
                      }}
                    >
                      Reinitialiser
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Suggestion Panel */}
        <Card className="mt-6 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-primary" />
                {isAiLoading && (
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
              Suggestion IA - Cible Carbone
              <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-normal text-primary">
                CopilotKit
              </span>
            </CardTitle>
            <CardDescription>
              Recommandation automatique basée sur le type de construction sélectionné
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAiLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">Analyse en cours...</span>
              </div>
            ) : aiSuggestion ? (
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
                {/* Carbon Target */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-emerald-500/50 bg-emerald-500/10">
                    <Leaf className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-emerald-500">{aiSuggestion.target}</span>
                      <span className="text-sm text-muted-foreground">kgCO₂e/m²</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{aiSuggestion.description}</p>
                  </div>
                </div>
                
                {/* Suggestions List */}
                <div className="flex-1">
                  <p className="mb-2 text-sm font-medium">Recommandations pour atteindre cette cible :</p>
                  <ul className="flex flex-col gap-2">
                    {aiSuggestion.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                Sélectionnez un type de construction pour obtenir une cible carbone recommandée
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/templates/projects")}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-[#593196] text-white hover:bg-[#593196]/90"
              disabled={!projectName || !constructionType || !budget || !startDate || !endDate}
            >
              {isEditMode ? "Enregistrer les modifications" : "Créer le projet"}
            </Button>
          </div>
      </form>
    </div>
  )
}
