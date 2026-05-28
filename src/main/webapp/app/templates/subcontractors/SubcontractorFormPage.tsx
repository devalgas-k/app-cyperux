"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import {
  ChevronRight,
  HardHat,
  Check,
  Building2,
  FileText,
  Phone,
  Euro
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

export default function SubcontractorFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id
  
  // Form state
  const [subName, setSubName] = useState("")
  const [subSiret, setSubSiret] = useState("")
  const [subTrade, setSubTrade] = useState("")
  const [subStatus, setSubStatus] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contractValue, setContractValue] = useState("")
  const [headcount, setHeadcount] = useState("")

  // Preload data for Edit Mode
  useEffect(() => {
    if (isEditMode) {
      setSubName("Entreprise BTP SARL")
      setSubSiret("123 456 789 00012")
      setSubTrade("gros_oeuvre")
      setSubStatus("compliant")
      setContactName("Alain Martin")
      setContactEmail("contact@btp-sarl.fr")
      setContactPhone("01 23 45 67 89")
      setContractValue("150000")
      setHeadcount("15")
    }
  }, [isEditMode, id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(isEditMode ? "Sous-traitant mis à jour avec succès" : "Sous-traitant ajouté avec succès", {
      description: isEditMode ? "Les modifications ont été sauvegardées." : `L'entreprise "${subName}" a été enregistrée.`,
    })
    navigate("/templates/subcontractors")
  }

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/templates/subcontractors" className="text-muted-foreground hover:text-foreground">
                  Sous-traitants
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground font-medium">
                {isEditMode ? "Édition" : "Nouveau Sous-traitant"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{isEditMode ? "Modifier l'entreprise" : "Ajouter un sous-traitant"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Mettez à jour les informations, le contact et le contrat." : "Renseignez les informations de l'entreprise partenaire."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => navigate("/templates/subcontractors")}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} type="button" className="gap-2 bg-[#593196] text-white hover:bg-[#593196]/90">
              {isEditMode ? <Check className="h-4 w-4" /> : <HardHat className="h-4 w-4" />}
              {isEditMode ? "Enregistrer les modifications" : "Ajouter l'entreprise"}
            </Button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Colonne 1 */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Informations de l'entreprise
                </CardTitle>
                <CardDescription>
                  Détails légaux et corps d'état
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subName">Raison sociale</Label>
                  <Input 
                    id="subName" 
                    placeholder="Ex: SARL Plomberie Express" 
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subSiret">SIRET</Label>
                  <Input 
                    id="subSiret" 
                    placeholder="14 chiffres" 
                    value={subSiret}
                    onChange={(e) => setSubSiret(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subTrade">Corps d'état</Label>
                    <Select value={subTrade} onValueChange={setSubTrade}>
                      <SelectTrigger id="subTrade">
                        <SelectValue placeholder="Sélectionnez..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gros_oeuvre">Gros Œuvre</SelectItem>
                        <SelectItem value="plomberie">Plomberie / CVC</SelectItem>
                        <SelectItem value="electricite">Électricité</SelectItem>
                        <SelectItem value="menuiserie">Menuiserie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headcount">Effectif prévu</Label>
                    <Input 
                      id="headcount" 
                      type="number"
                      placeholder="Nb d'ouvriers" 
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-primary" />
                  Informations Contractuelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contractValue">Montant du contrat HT (€)</Label>
                  <Input 
                    id="contractValue" 
                    type="number"
                    placeholder="Ex: 150000" 
                    value={contractValue}
                    onChange={(e) => setContractValue(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne 2 */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Principal
                </CardTitle>
                <CardDescription>
                  Responsable chantier ou administratif
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Nom complet</Label>
                  <Input 
                    id="contactName" 
                    placeholder="Ex: Alain Martin" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Téléphone</Label>
                    <Input 
                      id="contactPhone" 
                      placeholder="Ex: 06 12..." 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input 
                      id="contactEmail" 
                      type="email"
                      placeholder="contact@..." 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Conformité (Vigilance)
                </CardTitle>
                <CardDescription>
                  État du dossier administratif
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subStatus">Statut global</Label>
                  <Select value={subStatus} onValueChange={setSubStatus}>
                    <SelectTrigger id="subStatus">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliant">Dossier conforme</SelectItem>
                      <SelectItem value="warning">À surveiller (documents expirant bientôt)</SelectItem>
                      <SelectItem value="non_compliant">Non conforme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    L'ajout des documents légaux (Kbis, URSSAF, Attestation d'assurance) se fera via la fiche détaillée une fois l'entreprise créée.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/templates/subcontractors")}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            className="bg-[#593196] text-white hover:bg-[#593196]/90"
            disabled={!subName || !subSiret || !subTrade}
          >
            {isEditMode ? "Enregistrer les modifications" : "Ajouter l'entreprise"}
          </Button>
        </div>
      </form>
    </div>
  )
}