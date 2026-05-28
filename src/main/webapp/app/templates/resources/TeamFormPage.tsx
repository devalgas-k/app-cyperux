"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import {
  ChevronRight,
  Users,
  Check,
  UserPlus,
  Activity,
  Briefcase,
  Target
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Slider } from "@/shared/components/ui/slider"
import { Badge } from "@/shared/components/ui/badge"

export default function TeamFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  // Form state
  const [teamName, setTeamName] = useState("")
  const [teamLead, setTeamLead] = useState("")
  const [teamProject, setTeamProject] = useState("")
  const [teamStatus, setTeamStatus] = useState("optimized")
  const [teamHeadcount, setTeamHeadcount] = useState("5")
  const [teamWorkload, setTeamWorkload] = useState([80])
  const [skillInput, setSkillInput] = useState("")
  const [teamSkills, setTeamSkills] = useState<string[]>(["Gros œuvre"])

  // Preload data for Edit Mode
  useEffect(() => {
    if (isEditMode) {
      setTeamName("Equipe Gros Œuvre A")
      setTeamLead("Jean Dupont")
      setTeamProject("Tour Hekla")
      setTeamStatus("optimized")
      setTeamHeadcount("12")
      setTeamWorkload([85])
      setTeamSkills(["Gros œuvre", "Béton armé", "Grutage"])
    }
  }, [isEditMode, id])

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!teamSkills.includes(skillInput.trim())) {
        setTeamSkills([...teamSkills, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setTeamSkills(teamSkills.filter(skill => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(isEditMode ? "Équipe mise à jour avec succès" : "Équipe créée avec succès", {
      description: isEditMode ? "Les modifications ont été sauvegardées." : `L'équipe "${teamName}" a été ajoutée.`,
    })
    navigate("/templates/resources")
  }

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/templates/resources" className="text-muted-foreground hover:text-foreground">
                  Ressources
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {isEditMode ? "Édition" : "Nouvelle Équipe"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{isEditMode ? "Modifier l'équipe" : "Créer une nouvelle équipe"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Modifiez les informations et la composition de l'équipe." : "Configurez la composition, les compétences et l'affectation."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/templates/resources")}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} type="button" className="gap-2 bg-[#593196] text-white hover:bg-[#593196]/90">
              {isEditMode ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {isEditMode ? "Enregistrer" : "Créer l'équipe"}
            </Button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Colonne 1: Infos Générales */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Informations Générales
                </CardTitle>
                <CardDescription>
                  Identité et affectation de l'équipe
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Nom de l'équipe</Label>
                  <Input 
                    id="teamName" 
                    placeholder="Ex: Equipe Charpente" 
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamLead">Chef d'équipe</Label>
                  <Select value={teamLead} onValueChange={setTeamLead}>
                    <SelectTrigger id="teamLead">
                      <SelectValue placeholder="Sélectionnez un chef d'équipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jean Dupont">Jean Dupont</SelectItem>
                      <SelectItem value="Marie Dubois">Marie Dubois</SelectItem>
                      <SelectItem value="Marc Laurent">Marc Laurent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamProject">Projet assigné</Label>
                  <Select value={teamProject} onValueChange={setTeamProject}>
                    <SelectTrigger id="teamProject">
                      <SelectValue placeholder="Sélectionnez un projet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tour Hekla">Tour Hekla</SelectItem>
                      <SelectItem value="Eco-Quartier Fluvial">Eco-Quartier Fluvial</SelectItem>
                      <SelectItem value="Campus Universitaire">Campus Universitaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne 2: Métriques & Compétences */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Paramètres Opérationnels
                </CardTitle>
                <CardDescription>
                  Statut, effectif et charge de travail
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamHeadcount">Effectif</Label>
                    <Input 
                      id="teamHeadcount" 
                      type="number"
                      min="1"
                      value={teamHeadcount}
                      onChange={(e) => setTeamHeadcount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamStatus">Statut d'optimisation</Label>
                    <Select value={teamStatus} onValueChange={setTeamStatus}>
                      <SelectTrigger id="teamStatus">
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optimized">Optimisé</SelectItem>
                        <SelectItem value="underload">Sous-charge</SelectItem>
                        <SelectItem value="overloaded">Surchargé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label>Charge de travail prévue</Label>
                    <span className="text-sm font-medium">{teamWorkload[0]}%</span>
                  </div>
                  <Slider
                    value={teamWorkload}
                    onValueChange={setTeamWorkload}
                    max={150}
                    step={5}
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground">Une charge supérieure à 100% indique une situation de surchauffe ou des heures supplémentaires prévues.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Compétences (Tags)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    placeholder="Saisissez une compétence et appuyez sur Entrée..." 
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {teamSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive focus:outline-none"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {teamSkills.length === 0 && (
                    <span className="text-sm text-muted-foreground">Aucune compétence renseignée.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Action Buttons Bottom */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/templates/resources")}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            className="bg-[#593196] text-white hover:bg-[#593196]/90"
            disabled={!teamName || !teamLead || !teamProject}
          >
            {isEditMode ? "Enregistrer les modifications" : "Créer l'équipe"}
          </Button>
        </div>
      </form>
    </div>
  )
}