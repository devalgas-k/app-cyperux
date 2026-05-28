"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import {
  ChevronRight,
  FileUp,
  Check,
  FileText,
  Tags,
  Info
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
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Badge } from "@/shared/components/ui/badge"

export default function DocumentFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  // Form state
  const [docName, setDocName] = useState("")
  const [docCategory, setDocCategory] = useState("")
  const [docStatus, setDocStatus] = useState("")
  const [docProject, setDocProject] = useState("")
  const [docVersion, setDocVersion] = useState("1.0")
  const [docAuthor, setDocAuthor] = useState("Moi")
  const [docDescription, setDocDescription] = useState("")
  
  // Tags state
  const [tagInput, setTagInput] = useState("")
  const [docTags, setDocTags] = useState<string[]>([])

  // Preload data for Edit Mode
  useEffect(() => {
    if (isEditMode) {
      setDocName("Plan_Architectural_v2.pdf")
      setDocCategory("plans")
      setDocStatus("review")
      setDocProject("Tour Hekla")
      setDocVersion("2.0")
      setDocAuthor("Cabinet d'Architecture ABC")
      setDocDescription("Plans détaillés pour la phase d'exécution du gros œuvre. Inclut les modifications demandées le mois dernier.")
      setDocTags(["Architecture", "Gros Œuvre", "Validé pour exécution"])
    }
  }, [isEditMode, id])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!docTags.includes(tagInput.trim())) {
        setDocTags([...docTags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setDocTags(docTags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(isEditMode ? "Document mis à jour avec succès" : "Document importé avec succès", {
      description: isEditMode ? "Les modifications ont été sauvegardées." : `Le document "${docName}" a été ajouté au GED.`,
    })
    navigate("/templates/documents")
  }

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/templates/documents" className="text-muted-foreground hover:text-foreground">
                  Documents
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {isEditMode ? "Édition" : "Import Document"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{isEditMode ? "Modifier le document" : "Importer un document"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Mettez à jour les métadonnées, les tags et le statut." : "Téléversez un fichier, liez-le à un projet et ajoutez ses métadonnées."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/templates/documents")}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} type="button" className="gap-2 bg-[#593196] text-white hover:bg-[#593196]/90">
              {isEditMode ? <Check className="h-4 w-4" /> : <FileUp className="h-4 w-4" />}
              {isEditMode ? "Enregistrer les modifications" : "Importer le document"}
            </Button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Colonne 1: Fichier & Métadonnées principales */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Informations Principales
                </CardTitle>
                <CardDescription>
                  Identification et classification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditMode && (
                  <div className="space-y-2 pb-4">
                    <Label>Fichier source</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer bg-background">
                      <FileUp className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Cliquez ou glissez-déposez un fichier</span>
                      <span className="text-xs">PDF, DWG, RVT, DOCX (Max 50MB)</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="docName">Nom du fichier</Label>
                  <Input 
                    id="docName" 
                    placeholder="Ex: Plan_Architectural_v2.pdf" 
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="docCategory">Catégorie</Label>
                    <Select value={docCategory} onValueChange={setDocCategory}>
                      <SelectTrigger id="docCategory">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plans">Plans & Maquettes</SelectItem>
                        <SelectItem value="contracts">Contrats</SelectItem>
                        <SelectItem value="reports">Rapports</SelectItem>
                        <SelectItem value="notes">Notes de calcul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="docProject">Projet lié</Label>
                    <Select value={docProject} onValueChange={setDocProject}>
                      <SelectTrigger id="docProject">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tour Hekla">Tour Hekla</SelectItem>
                        <SelectItem value="Eco-Quartier Fluvial">Eco-Quartier Fluvial</SelectItem>
                        <SelectItem value="Global">Global / Modèle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne 2: Versioning & Tags */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Détails & Cycle de vie
                </CardTitle>
                <CardDescription>
                  Suivi de version et description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="docVersion">Version</Label>
                    <Input 
                      id="docVersion" 
                      placeholder="Ex: 1.0" 
                      value={docVersion}
                      onChange={(e) => setDocVersion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="docStatus">Statut</Label>
                    <Select value={docStatus} onValueChange={setDocStatus}>
                      <SelectTrigger id="docStatus">
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="valid">Validé</SelectItem>
                        <SelectItem value="review">En attente de validation</SelectItem>
                        <SelectItem value="sealed">Scellé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="docAuthor">Auteur / Émetteur</Label>
                  <Input 
                    id="docAuthor" 
                    placeholder="Nom ou Entité" 
                    value={docAuthor}
                    onChange={(e) => setDocAuthor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="docDescription">Description courte</Label>
                  <Textarea 
                    id="docDescription" 
                    placeholder="Contenu, modifications apportées..." 
                    className="resize-none"
                    rows={3}
                    value={docDescription}
                    onChange={(e) => setDocDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="h-5 w-5 text-primary" />
                  Étiquettes (Tags)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    placeholder="Saisissez un tag et appuyez sur Entrée..." 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {docTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive focus:outline-none"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {docTags.length === 0 && (
                    <span className="text-sm text-muted-foreground">Aucun tag renseigné.</span>
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
            onClick={() => navigate("/templates/documents")}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            className="bg-[#593196] text-white hover:bg-[#593196]/90"
            disabled={!docName || !docCategory || !docStatus}
          >
            {isEditMode ? "Enregistrer les modifications" : "Importer le document"}
          </Button>
        </div>
      </form>
    </div>
  )
}