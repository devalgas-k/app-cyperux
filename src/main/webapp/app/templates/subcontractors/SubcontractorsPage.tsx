"use client"

import { useState } from "react"
import {
  Building2,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Mail,
  Phone,
  ExternalLink,
  Shield,
  Calendar,
  Users,
  Euro,
  MessageSquare,
  X,
  Sparkles,
  Send,
  Ban,
  Upload,
  Download,
  Eye,
  ShieldAlert,
  ShieldCheck,
  FileWarning,
  FileClock,
  FileCheck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
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
  DialogFooter,
} from "@/shared/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { cn } from "@/shared/utils"

interface Document {
  name: string
  fullName: string
  status: "valid" | "expiring" | "expired" | "pending"
  expiry: string | null
  lastUpdate: string | null
  file?: string
}

interface Subcontractor {
  id: string
  name: string
  siret: string
  trade: string
  contact: string
  email: string
  phone: string
  score: number
  status: "compliant" | "warning" | "non_compliant" | "blocked"
  workers: number
  foreignWorkers: number
  contractValue: number
  documents: Document[]
  alerts?: string[]
  blocked?: boolean
}

const subcontractors: Subcontractor[] = [
  {
    id: "ST-001",
    name: "Sarl Plomberie",
    siret: "123 456 789 00012",
    trade: "Plomberie - CVC",
    contact: "Jean Martin",
    email: "contact@plomberie-sarl.fr",
    phone: "01 23 45 67 89",
    score: 85,
    status: "warning",
    workers: 12,
    foreignWorkers: 2,
    contractValue: 185000,
    documents: [
      { name: "Kbis", fullName: "Extrait Kbis", status: "valid", expiry: "2027-01-15", lastUpdate: "2026-01-15" },
      { name: "URSSAF", fullName: "Attestation URSSAF", status: "expiring", expiry: "2026-05-09", lastUpdate: "2026-02-09" },
      { name: "Vigilance", fullName: "Attestation de Vigilance", status: "valid", expiry: "2026-08-15", lastUpdate: "2026-02-15" },
      { name: "RC Pro", fullName: "Responsabilité Civile Pro", status: "valid", expiry: "2026-12-31", lastUpdate: "2025-12-31" },
      { name: "Décennale", fullName: "Assurance Décennale", status: "valid", expiry: "2027-03-20", lastUpdate: "2026-03-20" },
      { name: "Salariés Étrangers", fullName: "Liste Salariés Étrangers", status: "valid", expiry: null, lastUpdate: "2026-04-01" },
    ],
    alerts: ["Attestation URSSAF expire dans 3 jours"],
  },
  {
    id: "ST-002",
    name: "Déco-Pro",
    siret: "987 654 321 00034",
    trade: "Peinture - Finitions",
    contact: "Marie Dupont",
    email: "info@deco-pro.fr",
    phone: "01 98 76 54 32",
    score: 40,
    status: "non_compliant",
    workers: 8,
    foreignWorkers: 3,
    contractValue: 95000,
    documents: [
      { name: "Kbis", fullName: "Extrait Kbis", status: "valid", expiry: "2026-11-20", lastUpdate: "2025-11-20" },
      { name: "URSSAF", fullName: "Attestation URSSAF", status: "valid", expiry: "2026-07-15", lastUpdate: "2026-01-15" },
      { name: "Vigilance", fullName: "Attestation de Vigilance", status: "expired", expiry: "2026-05-01", lastUpdate: "2025-11-01" },
      { name: "RC Pro", fullName: "Responsabilité Civile Pro", status: "valid", expiry: "2026-09-30", lastUpdate: "2025-09-30" },
      { name: "Décennale", fullName: "Assurance Décennale", status: "pending", expiry: null, lastUpdate: null },
      { name: "Salariés Étrangers", fullName: "Liste Salariés Étrangers", status: "expired", expiry: null, lastUpdate: "2025-06-15" },
    ],
    alerts: ["Attestation Vigilance périmée", "Assurance Décennale manquante", "Liste salariés étrangers non mise à jour"],
  },
  {
    id: "ST-003",
    name: "Elec-Plus",
    siret: "456 789 123 00056",
    trade: "Électricité",
    contact: "Pierre Durand",
    email: "contact@elec-plus.fr",
    phone: "01 45 67 89 12",
    score: 90,
    status: "compliant",
    workers: 15,
    foreignWorkers: 0,
    contractValue: 220000,
    documents: [
      { name: "Kbis", fullName: "Extrait Kbis", status: "valid", expiry: "2026-10-01", lastUpdate: "2025-10-01" },
      { name: "URSSAF", fullName: "Attestation URSSAF", status: "valid", expiry: "2026-09-15", lastUpdate: "2026-03-15" },
      { name: "Vigilance", fullName: "Attestation de Vigilance", status: "valid", expiry: "2026-07-20", lastUpdate: "2026-01-20" },
      { name: "RC Pro", fullName: "Responsabilité Civile Pro", status: "valid", expiry: "2027-05-15", lastUpdate: "2026-05-15" },
      { name: "Décennale", fullName: "Assurance Décennale", status: "valid", expiry: "2027-02-28", lastUpdate: "2026-02-28" },
      { name: "Salariés Étrangers", fullName: "Liste Salariés Étrangers", status: "valid", expiry: null, lastUpdate: "2026-04-15" },
    ],
  },
  {
    id: "ST-004",
    name: "Gros Œuvre Express",
    siret: "789 123 456 00078",
    trade: "Maçonnerie - Structure",
    contact: "Luc Bernard",
    email: "direction@goe.fr",
    phone: "01 78 91 23 45",
    score: 100,
    status: "compliant",
    workers: 25,
    foreignWorkers: 5,
    contractValue: 450000,
    documents: [
      { name: "Kbis", fullName: "Extrait Kbis", status: "valid", expiry: "2027-04-10", lastUpdate: "2026-04-10" },
      { name: "URSSAF", fullName: "Attestation URSSAF", status: "valid", expiry: "2026-09-30", lastUpdate: "2026-03-30" },
      { name: "Vigilance", fullName: "Attestation de Vigilance", status: "valid", expiry: "2026-11-15", lastUpdate: "2026-05-15" },
      { name: "RC Pro", fullName: "Responsabilité Civile Pro", status: "valid", expiry: "2027-01-31", lastUpdate: "2026-01-31" },
      { name: "Décennale", fullName: "Assurance Décennale", status: "valid", expiry: "2027-06-15", lastUpdate: "2026-06-15" },
      { name: "Salariés Étrangers", fullName: "Liste Salariés Étrangers", status: "valid", expiry: null, lastUpdate: "2026-05-01" },
    ],
  },
  {
    id: "ST-005",
    name: "BTP Intérim",
    siret: "321 654 987 00090",
    trade: "Intérim - Main d'œuvre",
    contact: "Sophie Lefebvre",
    email: "contact@btp-interim.fr",
    phone: "01 32 16 54 98",
    score: 0,
    status: "blocked",
    workers: 0,
    foreignWorkers: 0,
    contractValue: 80000,
    blocked: true,
    documents: [
      { name: "Kbis", fullName: "Extrait Kbis", status: "expired", expiry: "2026-01-20", lastUpdate: "2025-01-20" },
      { name: "URSSAF", fullName: "Attestation URSSAF", status: "expired", expiry: "2025-12-31", lastUpdate: "2025-06-30" },
      { name: "Vigilance", fullName: "Attestation de Vigilance", status: "expired", expiry: "2025-11-15", lastUpdate: "2025-05-15" },
      { name: "RC Pro", fullName: "Responsabilité Civile Pro", status: "expired", expiry: "2026-01-31", lastUpdate: "2025-01-31" },
      { name: "Décennale", fullName: "Assurance Décennale", status: "pending", expiry: null, lastUpdate: null },
      { name: "Salariés Étrangers", fullName: "Liste Salariés Étrangers", status: "pending", expiry: null, lastUpdate: null },
    ],
    alerts: ["ACCÈS CHANTIER BLOQUÉ - Non-conformité majeure"],
  },
]

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-400"
  if (score >= 70) return "text-amber-400"
  return "text-red-400"
}

const getScoreProgressColor = (score: number) => {
  if (score >= 90) return "bg-emerald-500"
  if (score >= 70) return "bg-amber-500"
  return "bg-red-500"
}

const getDocStatusBadge = (status: string) => {
  switch (status) {
    case "valid":
      return (
        <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          <FileCheck className="h-3 w-3" />
          À jour
        </Badge>
      )
    case "expiring":
      return (
        <Badge className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/30">
          <FileClock className="h-3 w-3" />
          Expire bientôt
        </Badge>
      )
    case "expired":
      return (
        <Badge variant="destructive" className="gap-1">
          <FileWarning className="h-3 w-3" />
          Périmé
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="outline" className="gap-1 text-muted-foreground">
          <FileText className="h-3 w-3" />
          Manquant
        </Badge>
      )
    default:
      return null
  }
}

const getDocStatusDot = (status: string) => {
  switch (status) {
    case "valid":
      return "bg-emerald-400"
    case "expiring":
      return "bg-amber-400"
    case "expired":
      return "bg-red-400"
    case "pending":
      return "bg-gray-400"
    default:
      return "bg-gray-400"
  }
}

export default function SubcontractorsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedSub, setSelectedSub] = useState<Subcontractor | null>(null)
  const [showAI, setShowAI] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [subToBlock, setSubToBlock] = useState<Subcontractor | null>(null)
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "L'attestation URSSAF de 'Sarl Plomberie' expire dans 3 jours. J'ai préparé l'email de demande de mise à jour. Envoyer ?",
      actions: [
        { label: "Envoyer l'email", action: "send_email" },
        { label: "Voir l'email", action: "preview_email" },
      ],
    },
  ])
  const [aiInput, setAiInput] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSubName, setNewSubName] = useState("")
  const [newSubSiret, setNewSubSiret] = useState("")
  const [newSubTrade, setNewSubTrade] = useState("")
  const [newSubContact, setNewSubContact] = useState("")
  const [newSubEmail, setNewSubEmail] = useState("")
  const [newSubPhone, setNewSubPhone] = useState("")

  const handleAddSubcontractor = () => {
    if (newSubName && newSubSiret && newSubTrade) {
      toast.success(`Sous-traitant "${newSubName}" ajouté avec succès`)
      setShowAddDialog(false)
      setNewSubName("")
      setNewSubSiret("")
      setNewSubTrade("")
      setNewSubContact("")
      setNewSubEmail("")
      setNewSubPhone("")
    }
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages([
      ...aiMessages,
      { role: "user", content: aiInput },
      {
        role: "assistant",
        content: "J'ai envoyé la relance à Sarl Plomberie. L'email demande la mise à jour de l'attestation URSSAF sous 48h. Un rappel automatique sera envoyé si pas de réponse.",
      },
    ])
    setAiInput("")
  }

  const handleAIAction = (action: string) => {
    if (action === "send_email") {
      toast.success("Email de relance envoyé à Sarl Plomberie")
      setAiMessages([
        ...aiMessages,
        {
          role: "assistant",
          content: "Email envoyé avec succès ! Sarl Plomberie a été notifiée de mettre à jour son attestation URSSAF avant expiration. Un rappel automatique est programmé dans 48h.",
        },
      ])
    } else if (action === "preview_email") {
      setAiMessages([
        ...aiMessages,
        {
          role: "assistant",
          content: `**Objet :** Mise à jour requise - Attestation URSSAF\n\n**Destinataire :** contact@plomberie-sarl.fr\n\nBonjour,\n\nVotre attestation URSSAF pour le chantier Tour Hekla expire le 09/05/2026 (dans 3 jours).\n\nMerci de nous transmettre le document mis à jour dans les plus brefs délais afin d'assurer la continuité de votre intervention.\n\nCordialement,\nÉquipe Cyperux`,
        },
      ])
    }
  }

  const handleBlockAccess = (sub: Subcontractor) => {
    setSubToBlock(sub)
    setShowBlockDialog(true)
  }

  const confirmBlockAccess = () => {
    if (subToBlock) {
      toast.error(`Accès chantier bloqué pour ${subToBlock.name}`)
      setShowBlockDialog(false)
      setSubToBlock(null)
    }
  }

  const compliantCount = subcontractors.filter(s => s.status === "compliant").length
  const warningCount = subcontractors.filter(s => s.status === "warning").length
  const nonCompliantCount = subcontractors.filter(s => s.status === "non_compliant" || s.status === "blocked").length
  const totalWorkers = subcontractors.reduce((sum, s) => sum + s.workers, 0)
  const totalContract = subcontractors.reduce((sum, s) => sum + s.contractValue, 0)

  const filteredSubs = subcontractors.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.trade.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || s.status === statusFilter || 
      (statusFilter === "non_compliant" && (s.status === "non_compliant" || s.status === "blocked"))
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gestion des Sous-traitants & Vigilance</h1>
            <p className="text-muted-foreground">
              Conformité documentaire et gestion du risque juridique
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Vérifier tous
            </Button>
            <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4" />
              Ajouter sous-traitant
            </Button>
          </div>
        </div>

        {/* Alert for critical issues */}
        {nonCompliantCount > 0 && (
          <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Risque juridique détecté</AlertTitle>
            <AlertDescription>
              {nonCompliantCount} entreprise{nonCompliantCount > 1 ? "s" : ""} présente{nonCompliantCount > 1 ? "nt" : ""} des non-conformités documentaires majeures. Action immédiate requise.
            </AlertDescription>
          </Alert>
        )}

        {/* KPI Cards - Interactive */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card 
            className={cn(
              "border-emerald-500/20 bg-emerald-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "compliant" && "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => {
              setStatusFilter(statusFilter === "compliant" ? null : "compliant")
              toast.success(statusFilter === "compliant" ? "Filtre retire" : `Filtre: ${compliantCount} entreprises conformes`)
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conformes</p>
                  <p className="text-3xl font-bold text-emerald-400">{compliantCount}</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={cn(
              "border-amber-500/20 bg-amber-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "warning" && "ring-2 ring-amber-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => {
              setStatusFilter(statusFilter === "warning" ? null : "warning")
              toast.success(statusFilter === "warning" ? "Filtre retire" : `Filtre: ${warningCount} entreprises a surveiller`)
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">A surveiller</p>
                  <p className="text-3xl font-bold text-amber-400">{warningCount}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className={cn(
              "border-red-500/20 bg-red-500/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
              statusFilter === "non_compliant" && "ring-2 ring-red-500 ring-offset-2 ring-offset-background"
            )}
            onClick={() => {
              setStatusFilter(statusFilter === "non_compliant" ? null : "non_compliant")
              toast.error(statusFilter === "non_compliant" ? "Filtre retire" : `Filtre: ${nonCompliantCount} entreprises non conformes - Action requise!`)
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Non conformes</p>
                  <p className="text-3xl font-bold text-red-400">{nonCompliantCount}</p>
                </div>
                <ShieldAlert className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
            onClick={() => toast.info(`${totalWorkers} personnes travaillent sur le chantier (dont ${subcontractors.reduce((sum, s) => sum + s.foreignWorkers, 0)} travailleurs detaches)`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Personnel</p>
                  <p className="text-3xl font-bold">{totalWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-[#593196]/20 bg-[#593196]/5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
            onClick={() => toast.info(`Valeur totale des contrats: ${(totalContract / 1000000).toFixed(2)}M€`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Contrats</p>
                  <p className="text-2xl font-bold text-[#593196]">{(totalContract / 1000000).toFixed(1)}M€</p>
                </div>
                <Euro className="h-8 w-8 text-[#593196]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Filter Badge */}
        {statusFilter && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Filter className="h-3 w-3" />
              Filtre: {statusFilter === "compliant" ? "Conformes" : statusFilter === "warning" ? "A surveiller" : "Non conformes"}
              <button onClick={() => setStatusFilter(null)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
            <span className="text-sm text-muted-foreground">
              {filteredSubs.length} entreprise(s) affichee(s)
            </span>
          </div>
        )}

        {/* Subcontractors Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Entreprises Partenaires
                </CardTitle>
                <CardDescription>Score de conformite et suivi documentaire ({filteredSubs.length} resultat{filteredSubs.length > 1 ? "s" : ""})</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    className="w-64 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Corps de métier</TableHead>
                  <TableHead>Score Conformité</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Effectif</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubs.map((sub) => (
                  <TableRow
                    key={sub.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      sub.status === "non_compliant" ? "bg-red-500/5" : 
                      sub.status === "blocked" ? "bg-red-500/10" : ""
                    }`}
                    onClick={() => setSelectedSub(sub)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={`text-xs ${sub.blocked ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"}`}>
                            {sub.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{sub.name}</p>
                            {sub.blocked && (
                              <Badge variant="destructive" className="text-xs">BLOQUÉ</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{sub.contact}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{sub.trade}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 w-32">
                        <Progress 
                          value={sub.score} 
                          className={`h-2 flex-1 [&>div]:${getScoreProgressColor(sub.score)}`}
                        />
                        <span className={`text-sm font-medium ${getScoreColor(sub.score)}`}>
                          {sub.score}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {sub.documents.map((doc, i) => (
                          <div
                            key={i}
                            className={`h-2.5 w-2.5 rounded-full ${getDocStatusDot(doc.status)}`}
                            title={`${doc.fullName}: ${doc.status}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {sub.workers}
                        {sub.foreignWorkers > 0 && (
                          <span className="text-xs text-muted-foreground">
                            ({sub.foreignWorkers} étr.)
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{(sub.contractValue / 1000).toFixed(0)}k€</TableCell>
                    <TableCell className="text-right">
                      {(sub.status === "non_compliant" || sub.status === "warning") && !sub.blocked && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBlockAccess(sub)
                          }}
                        >
                          <Ban className="h-3 w-3" />
                          Bloquer accès
                        </Button>
                      )}
                      {sub.blocked && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            toast.success(`Accès rétabli pour ${sub.name}`)
                          }}
                        >
                          <ShieldCheck className="h-3 w-3" />
                          Rétablir
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Sheet - Document Wall */}
        {selectedSub && (
          <Sheet open={!!selectedSub} onOpenChange={() => setSelectedSub(null)}>
            <SheetContent className="w-[600px] sm:max-w-[600px] overflow-auto">
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`${selectedSub.blocked ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"}`}>
                      {selectedSub.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <SheetTitle>{selectedSub.name}</SheetTitle>
                      {selectedSub.blocked && (
                        <Badge variant="destructive">BLOQUÉ</Badge>
                      )}
                    </div>
                    <SheetDescription>{selectedSub.trade} • SIRET: {selectedSub.siret}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Score de Conformité */}
                <Card className={`border-2 ${
                  selectedSub.score >= 90 ? "border-emerald-500/30 bg-emerald-500/5" :
                  selectedSub.score >= 70 ? "border-amber-500/30 bg-amber-500/5" :
                  "border-red-500/30 bg-red-500/5"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Score de Conformité</p>
                        <p className={`text-4xl font-bold ${getScoreColor(selectedSub.score)}`}>
                          {selectedSub.score}%
                        </p>
                      </div>
                      <div className="text-right">
                        <Progress 
                          value={selectedSub.score} 
                          className={`h-3 w-32 [&>div]:${getScoreProgressColor(selectedSub.score)}`}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          {selectedSub.documents.filter(d => d.status === "valid").length}/{selectedSub.documents.length} documents à jour
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts */}
                {selectedSub.alerts && selectedSub.alerts.length > 0 && (
                  <Alert variant="destructive" className="border-red-500/30 bg-red-500/5">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Alertes actives</AlertTitle>
                    <AlertDescription>
                      <ul className="mt-2 space-y-1">
                        {selectedSub.alerts.map((alert, i) => (
                          <li key={i} className="text-sm">• {alert}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Contact</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {selectedSub.contact}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {selectedSub.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {selectedSub.phone}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Effectifs</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {selectedSub.workers} employés sur site
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {selectedSub.foreignWorkers} salariés étrangers
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4" />
                        {(selectedSub.contractValue / 1000).toFixed(0)}k€ de contrat
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Wall */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Mur des Documents Légaux</p>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Upload className="h-3 w-3" />
                      Importer
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    {selectedSub.documents.map((doc, i) => (
                      <Card 
                        key={i} 
                        className={`border ${
                          doc.status === "valid" ? "border-emerald-500/20" :
                          doc.status === "expiring" ? "border-amber-500/20" :
                          doc.status === "expired" ? "border-red-500/20" :
                          "border-muted"
                        }`}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                doc.status === "valid" ? "bg-emerald-500/10" :
                                doc.status === "expiring" ? "bg-amber-500/10" :
                                doc.status === "expired" ? "bg-red-500/10" :
                                "bg-muted"
                              }`}>
                                <FileText className={`h-5 w-5 ${
                                  doc.status === "valid" ? "text-emerald-400" :
                                  doc.status === "expiring" ? "text-amber-400" :
                                  doc.status === "expired" ? "text-red-400" :
                                  "text-muted-foreground"
                                }`} />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{doc.fullName}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  {doc.expiry ? (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      Expire: {doc.expiry}
                                    </span>
                                  ) : doc.lastUpdate ? (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      MAJ: {doc.lastUpdate}
                                    </span>
                                  ) : (
                                    <span>Non renseigné</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getDocStatusBadge(doc.status)}
                              <div className="flex gap-1">
                                {doc.status !== "pending" && (
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Mail className="h-4 w-4" />
                    Relancer
                  </Button>
                  {!selectedSub.blocked && (selectedSub.status === "non_compliant" || selectedSub.status === "warning") && (
                    <Button 
                      variant="destructive" 
                      className="flex-1 gap-2"
                      onClick={() => handleBlockAccess(selectedSub)}
                    >
                      <Ban className="h-4 w-4" />
                      Bloquer accès chantier
                    </Button>
                  )}
                  {selectedSub.blocked && (
                    <Button 
                      className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-600/90"
                      onClick={() => {
                        toast.success(`Accès rétabli pour ${selectedSub.name}`)
                        setSelectedSub(null)
                      }}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Rétablir l'accès
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Block Access Dialog */}
        <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <ShieldAlert className="h-5 w-5" />
                Bloquer l'accès chantier
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir bloquer l'accès au chantier pour <strong>{subToBlock?.name}</strong> ?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Action irréversible à court terme</AlertTitle>
                <AlertDescription>
                  Cette action va :
                  <ul className="mt-2 list-disc pl-4 space-y-1 text-sm">
                    <li>Désactiver les badges d'accès des employés</li>
                    <li>Suspendre les paiements en cours</li>
                    <li>Notifier le conducteur de travaux</li>
                    <li>Enregistrer l'événement dans l'audit trail</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={confirmBlockAccess} className="gap-2">
                <Ban className="h-4 w-4" />
                Confirmer le blocage
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* AI Assistant Panel */}
      {showAI && (
        <Card className="w-80 shrink-0 flex flex-col border-[#593196]/30 bg-[#593196]/5">
          <CardHeader className="border-b border-[#593196]/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Vigilance</CardTitle>
                  <CardDescription className="text-xs">Conformité & Alertes</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAI(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-3 text-sm ${
                    msg.role === "assistant"
                      ? "bg-[#593196]/10 border border-[#593196]/20"
                      : "bg-muted ml-4"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 text-[#593196]" />
                      <span className="text-xs font-medium text-[#593196]">IA Cyperux</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === "assistant" && (msg as any).actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(msg as any).actions.map((action: any, j: number) => (
                        <Button
                          key={j}
                          size="sm"
                          variant={j === 0 ? "default" : "outline"}
                          className={j === 0 ? "gap-1 bg-[#593196] hover:bg-[#593196]/90" : "gap-1"}
                          onClick={() => handleAIAction(action.action)}
                        >
                          {j === 0 && <Send className="h-3 w-3" />}
                          {j === 1 && <Eye className="h-3 w-3" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t border-[#593196]/20 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Poser une question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleAISend} className="bg-[#593196] hover:bg-[#593196]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating AI button when panel is hidden */}
      {!showAI && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] hover:bg-[#593196]/90 shadow-lg"
          onClick={() => setShowAI(true)}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}

      {/* Add Subcontractor Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter un Sous-traitant</DialogTitle>
            <DialogDescription>
              Renseignez les informations de l&apos;entreprise partenaire
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="subName">Raison sociale *</Label>
                <Input 
                  id="subName"
                  placeholder="Ex: Menuiseries Dupont"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subSiret">SIRET *</Label>
                <Input 
                  id="subSiret"
                  placeholder="XXX XXX XXX XXXXX"
                  value={newSubSiret}
                  onChange={(e) => setNewSubSiret(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subTrade">Corps de métier *</Label>
                <Input 
                  id="subTrade"
                  placeholder="Ex: Menuiserie"
                  value={newSubTrade}
                  onChange={(e) => setNewSubTrade(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subContact">Interlocuteur</Label>
                <Input 
                  id="subContact"
                  placeholder="Nom du contact"
                  value={newSubContact}
                  onChange={(e) => setNewSubContact(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subPhone">Téléphone</Label>
                <Input 
                  id="subPhone"
                  placeholder="01 XX XX XX XX"
                  value={newSubPhone}
                  onChange={(e) => setNewSubPhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="subEmail">Email</Label>
                <Input 
                  id="subEmail"
                  placeholder="contact@entreprise.fr"
                  type="email"
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
              <p className="text-xs text-amber-400">
                Les documents de conformité (Kbis, URSSAF, RC Pro, Décennale...) seront demandés automatiquement par email après création.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleAddSubcontractor}
              disabled={!newSubName || !newSubSiret || !newSubTrade}
              className="bg-[#593196] hover:bg-[#593196]/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter le sous-traitant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
