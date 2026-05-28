"use client"

import { useState, useCallback } from "react"
import {
  Recycle,
  Trash2,
  Truck,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Leaf,
  MessageSquare,
  X,
  Sparkles,
  Send,
  ExternalLink,
  Upload,
  FileCheck,
  ScanLine,
  Building,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { StatCardList } from "@/shared/components/custom/stat-card-list"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Progress } from "@/shared/components/ui/progress"
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
} from "@/shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
// import { useLanguage } from "@/lib/i18n"

const wasteData = [
  {
    id: "BSD-2026-001",
    type: "Béton de démolition",
    cerCode: "17 01 01",
    weight: 45,
    unit: "t",
    transporter: "Derichebourg",
    destination: "Paprec Gennevilliers",
    status: "certified",
    valorization: 90,
    date: "2026-05-02",
    bordereau: "BSD-2026-001.pdf",
    certificate: true,
  },
  {
    id: "BSD-2026-002",
    type: "Amiante (SS4)",
    cerCode: "17 09 03*",
    weight: 2,
    unit: "t",
    transporter: "Suez",
    destination: "ISDD Villeparisis",
    status: "treated",
    valorization: 0,
    date: "2026-05-04",
    bordereau: "BSD-2026-002.pdf",
    dangerous: true,
    certificate: true,
  },
  {
    id: "BSD-2026-003",
    type: "Ferraille",
    cerCode: "17 04 05",
    weight: 12,
    unit: "t",
    transporter: "Derichebourg",
    destination: "Arcelor Recycling",
    status: "certified",
    valorization: 100,
    date: "2026-04-28",
    bordereau: "BSD-2026-003.pdf",
    certificate: true,
  },
  {
    id: "BSD-2026-004",
    type: "Bois traité",
    cerCode: "17 02 04*",
    weight: 8,
    unit: "t",
    transporter: "Veolia",
    destination: "Incinération énergie",
    status: "removed",
    valorization: 85,
    date: "2026-05-05",
    bordereau: "BSD-2026-004.pdf",
    dangerous: true,
    certificate: false,
  },
  {
    id: "BSD-2026-005",
    type: "Plâtre",
    cerCode: "17 08 02",
    weight: 5,
    unit: "t",
    transporter: "Suez",
    destination: "Placorecycling",
    status: "pending",
    valorization: 95,
    date: "2026-05-06",
    bordereau: null,
    certificate: false,
  },
  {
    id: "BSD-2026-452",
    type: "Gravats mélangés",
    cerCode: "17 09 04",
    weight: 18,
    unit: "t",
    transporter: "Recyc-BTP",
    destination: "Centre de tri Recyc-BTP",
    status: "removed",
    valorization: 72,
    date: "2026-04-30",
    bordereau: "BSD-2026-452.pdf",
    certificate: false,
    pendingCertificate: true,
  },
  {
    id: "BSD-2026-006",
    type: "Déchets mélangés",
    cerCode: "17 09 04",
    weight: 15,
    unit: "t",
    transporter: "Veolia",
    destination: "Centre de tri Veolia",
    status: "certified",
    valorization: 65,
    date: "2026-04-25",
    bordereau: "BSD-2026-006.pdf",
    certificate: true,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "certified":
      return <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><FileCheck className="h-3 w-3" />Certifié</Badge>
    case "treated":
      return <Badge className="gap-1 bg-blue-500/20 text-blue-400 border-blue-500/30"><CheckCircle className="h-3 w-3" />Traité</Badge>
    case "removed":
      return <Badge className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/30"><Truck className="h-3 w-3" />Enlevé</Badge>
    case "pending":
      return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />En attente</Badge>
    default:
      return null
  }
}

export default function WasteRegisterPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [showAI, setShowAI] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "Le centre de tri 'Recyc-BTP' n'a pas encore renvoyé le certificat de traitement pour le lot #452 (18t de gravats). Ce lot a été enlevé il y a 6 jours. Voulez-vous que j'envoie une relance automatique ?",
      action: {
        label: "Envoyer une relance",
        type: "reminder",
      },
    },
  ])
  const [aiInput, setAiInput] = useState("")

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages([
      ...aiMessages,
      { role: "user", content: aiInput },
      {
        role: "assistant",
        content: "J'ai analysé vos flux de déchets. Le béton de démolition représente 52% du volume total. Je suggère de mettre en place une filière de réemploi sur site pour réduire les coûts de transport de 30% et améliorer votre taux de valorisation.",
      },
    ])
    setAiInput("")
  }

  const handleAction = (action: { label: string; type: string }) => {
    setAiMessages([
      ...aiMessages,
      { role: "user", content: `Action: ${action.label}` },
      {
        role: "assistant",
        content: "Relance envoyée par email à contact@recyc-btp.fr. J'ai programmé un rappel automatique dans 48h si le certificat n'est pas reçu. Vous serez notifié dès réception du document.",
      },
    ])
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      simulateUpload(files[0].name)
    }
  }, [])

  const simulateUpload = (filename: string) => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadedFile(null)
    setAiAnalysis(null)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedFile(filename)
          // Simulate AI analysis
          setTimeout(() => {
            setAiAnalysis("Certificat de traitement reconnu. Lot: BSD-2026-452, Centre: Recyc-BTP, Date: 06/05/2026, Quantité: 18t, Taux valorisation: 72%. Document conforme aux exigences AGEC.")
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 150)
  }

  const totalWeight = wasteData.reduce((sum, w) => sum + w.weight, 0)
  const valorizedWeight = wasteData.filter(w => w.status === "certified" || w.status === "treated").reduce((sum, w) => sum + w.weight * w.valorization / 100, 0)
  const valorizationRate = Math.round((valorizedWeight / totalWeight) * 100)
  const agecTarget = 70

  const filteredWaste = wasteData.filter(
    (w) =>
      w.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.cerCode.includes(searchQuery) ||
      w.transporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Registre des Déchets & Bordereaux</h1>
            <p className="text-muted-foreground">
              Conformité Loi AGEC & Traçabilité BSD (US-901)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export GEREP
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-emerald-600 hover:bg-emerald-600/90">
                  <Plus className="h-4 w-4" />
                  Nouveau BSD
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau Bordereau de Suivi des Déchets</DialogTitle>
                  <DialogDescription>
                    Créer un BSD pour assurer la traçabilité réglementaire
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de déchet</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete">Béton de démolition</SelectItem>
                          <SelectItem value="metal">Ferraille</SelectItem>
                          <SelectItem value="wood">Bois</SelectItem>
                          <SelectItem value="plaster">Plâtre</SelectItem>
                          <SelectItem value="mixed">Déchets mélangés</SelectItem>
                          <SelectItem value="asbestos">Amiante (DD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Code CER</label>
                      <Input placeholder="17 01 01" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantité (tonnes)</label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Transporteur</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="derichebourg">Derichebourg</SelectItem>
                          <SelectItem value="suez">Suez</SelectItem>
                          <SelectItem value="veolia">Veolia</SelectItem>
                          <SelectItem value="recycbtp">Recyc-BTP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exutoire (Centre de tri)</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le centre de traitement..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paprec">Paprec Gennevilliers</SelectItem>
                        <SelectItem value="veolia">Centre de tri Veolia</SelectItem>
                        <SelectItem value="recycbtp">Centre Recyc-BTP</SelectItem>
                        <SelectItem value="arcelor">Arcelor Recycling</SelectItem>
                        <SelectItem value="isdd">ISDD Villeparisis (DD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-600/90">
                    Créer le bordereau
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Valorization Counter - AGEC Target */}
        <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 ring-4 ring-emerald-500/30">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-emerald-400">{valorizationRate}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Taux de Valorisation Global</h3>
                  <p className="text-sm text-muted-foreground">Objectif Loi AGEC : {agecTarget}%</p>
                  <div className="mt-2 flex items-center gap-2">
                    {valorizationRate >= agecTarget ? (
                      <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <CheckCircle className="h-3 w-3" />
                        Conforme
                      </Badge>
                    ) : (
                      <Badge className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <AlertTriangle className="h-3 w-3" />
                        Objectif non atteint
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      +{valorizationRate - agecTarget} points au-dessus de l&apos;objectif
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-64">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progression</span>
                  <span className="text-emerald-400">{valorizationRate}%</span>
                </div>
                <div className="relative h-4 overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${valorizationRate}%` }}
                  />
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-white/50"
                    style={{ left: `${agecTarget}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>Objectif {agecTarget}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <StatCardList>
          <InteractiveStatCard
            label="Total évacué"
            value={`${totalWeight}t`}
            icon={Trash2}
            variant="default"
            description="Ce mois"
          />
          <InteractiveStatCard
            label="Déchets dangereux"
            value="10t"
            icon={AlertTriangle}
            variant="warning"
            description="2 bordereaux actifs"
          />
          <InteractiveStatCard
            label="Certificats reçus"
            value="5/7"
            icon={FileCheck}
            variant="info"
            description="2 en attente"
          />
          <InteractiveStatCard
            label="CO2 évité"
            value="12.4t"
            icon={Leaf}
            variant="purple"
            description="Par valorisation"
          />
        </StatCardList>

        {/* BSD Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Bordereaux de Suivi des Déchets (BSD)
                </CardTitle>
                <CardDescription>Traçabilité complète des évacuations et certifications</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher BSD, type, transporteur..."
                    className="w-72 pl-9"
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
                  <TableHead>BSD</TableHead>
                  <TableHead>Type de déchet</TableHead>
                  <TableHead>Code CER</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Transporteur</TableHead>
                  <TableHead>Exutoire</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Certificat</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWaste.map((waste) => (
                  <TableRow key={waste.id} className={waste.pendingCertificate ? "bg-amber-500/5" : ""}>
                    <TableCell className="font-mono text-xs">{waste.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {waste.dangerous && (
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                        )}
                        <span className="font-medium">{waste.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-2 py-1 text-xs">
                        {waste.cerCode}
                      </code>
                    </TableCell>
                    <TableCell>{waste.weight}{waste.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        {waste.transporter}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate text-sm">
                      {waste.destination}
                    </TableCell>
                    <TableCell>{getStatusBadge(waste.status)}</TableCell>
                    <TableCell>
                      {waste.certificate ? (
                        <Badge className="gap-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          <FileCheck className="h-3 w-3" />
                          Reçu
                        </Badge>
                      ) : waste.pendingCertificate ? (
                        <Badge className="gap-1 bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse">
                          <Clock className="h-3 w-3" />
                          En attente
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          N/A
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {waste.bordereau ? (
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <FileText className="h-3 w-3" />
                          PDF
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Créer BSD
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Certificate Upload Zone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Certificats de Traitement
            </CardTitle>
            <CardDescription>Lecture automatique par IA des certificats de traitement</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all ${
                isDragging 
                  ? "border-emerald-500 bg-emerald-500/10" 
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
            >
              {isUploading ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <RefreshCw className="h-10 w-10 animate-spin text-emerald-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">Téléversement en cours...</p>
                  <Progress value={uploadProgress} className="mx-auto h-2 w-64" />
                </div>
              ) : uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                      <FileCheck className="h-8 w-8 text-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{uploadedFile}</p>
                    <p className="text-sm text-muted-foreground">Fichier téléversé avec succès</p>
                  </div>
                  {aiAnalysis && (
                    <div className="mx-auto max-w-xl rounded-lg border border-[#593196]/30 bg-[#593196]/10 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <ScanLine className="h-4 w-4 text-[#593196]" />
                        <span className="text-sm font-medium text-[#593196]">Analyse IA</span>
                      </div>
                      <p className="text-sm text-left">{aiAnalysis}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="gap-1 bg-emerald-600 hover:bg-emerald-600/90">
                          <CheckCircle className="h-3 w-3" />
                          Valider et associer au BSD
                        </Button>
                        <Button size="sm" variant="outline">
                          Corriger manuellement
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">Glissez-déposez vos certificats ici</p>
                    <p className="text-sm text-muted-foreground">ou cliquez pour parcourir (PDF, JPG, PNG)</p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-[#593196]" />
                    <span>L&apos;IA extraira automatiquement les informations du certificat</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Valorization by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Répartition par Filière de Traitement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { type: "Béton / Granulats", weight: 45, rate: 90, color: "bg-slate-500" },
                { type: "Métaux", weight: 12, rate: 100, color: "bg-blue-500" },
                { type: "Bois", weight: 8, rate: 85, color: "bg-amber-600" },
                { type: "Plâtre", weight: 5, rate: 95, color: "bg-pink-500" },
                { type: "Déchets dangereux", weight: 10, rate: 0, color: "bg-red-500" },
                { type: "Mélangés", weight: 33, rate: 68, color: "bg-gray-500" },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.weight}t</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Valorisation</span>
                      <span className={item.rate >= 70 ? "text-emerald-400" : "text-amber-400"}>
                        {item.rate}%
                      </span>
                    </div>
                    <Progress value={item.rate} className="mt-1 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Panel */}
      {showAI && (
        <Card className="w-80 shrink-0 flex flex-col border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="border-b border-emerald-500/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Assistant AGEC</CardTitle>
                  <CardDescription className="text-xs">Conformité déchets</CardDescription>
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
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                      <Leaf className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "assistant" && (msg as any).action && (
                      <Button 
                        size="sm" 
                        className="w-full gap-2 bg-emerald-600 hover:bg-emerald-600/90"
                        onClick={() => handleAction((msg as any).action)}
                      >
                        <Send className="h-3 w-3" />
                        {(msg as any).action.label}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="border-t border-emerald-500/20 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Question conformité..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleAISend} className="bg-emerald-600 hover:bg-emerald-600/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setAiInput("Quel est mon taux de valorisation par filière ?")}
              >
                Taux par filière
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setAiInput("Quels BSD sont en attente de certificat ?")}
              >
                BSD en attente
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating AI Button (when panel is closed) */}
      {!showAI && (
        <Button
          onClick={() => setShowAI(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-emerald-600 shadow-lg hover:bg-emerald-600/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
