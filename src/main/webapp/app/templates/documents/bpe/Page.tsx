"use client"

import { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  ChevronRight,
  History,
  Shield,
  Sparkles,
  FileCheck,
  ArrowLeft,
  GitCompare,
  Send,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Label } from "@/shared/components/ui/label"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Calendar } from "@/shared/components/ui/calendar"
import { Separator } from "@/shared/components/ui/separator"
import { cn } from "@/shared/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Document {
  id: number
  name: string
  index: string
  issuer: string
  status: "bpe" | "review" | "obsolete"
  type: string
  size: string
  date: string
  project: string
  eidas: boolean
  history: { version: string; date: string; author: string; changes: string }[]
}

const documents: Document[] = [
  {
    id: 1,
    name: "Plan_Structure_R+1.pdf",
    index: "C",
    issuer: "BET Structure",
    status: "bpe",
    type: "pdf",
    size: "4.2 MB",
    date: "05/05/2026",
    project: "Tour Hekla",
    eidas: true,
    history: [
      { version: "V3 (C)", date: "05/05/2026", author: "M. Dupont", changes: "Modification ferraillage niveau R+1" },
      { version: "V2 (B)", date: "28/04/2026", author: "M. Dupont", changes: "Ajout détails poutres" },
      { version: "V1 (A)", date: "15/04/2026", author: "M. Martin", changes: "Version initiale" },
    ],
  },
  {
    id: 2,
    name: "Plan_Coffrage_N2.dwg",
    index: "B",
    issuer: "BET Structure",
    status: "review",
    type: "dwg",
    size: "8.5 MB",
    date: "04/05/2026",
    project: "Tour Hekla",
    eidas: false,
    history: [
      { version: "V2 (B)", date: "04/05/2026", author: "M. Bernard", changes: "Corrections suite remarques BC" },
      { version: "V1 (A)", date: "20/04/2026", author: "M. Bernard", changes: "Version initiale" },
    ],
  },
  {
    id: 3,
    name: "CCTP_Lot_03_Gros_Oeuvre.pdf",
    index: "A",
    issuer: "MOE",
    status: "bpe",
    type: "pdf",
    size: "2.1 MB",
    date: "01/05/2026",
    project: "Tour Hekla",
    eidas: true,
    history: [
      { version: "V1 (A)", date: "01/05/2026", author: "Architecte", changes: "Version initiale approuvée" },
    ],
  },
  {
    id: 4,
    name: "Note_Calcul_Fondations.pdf",
    index: "D",
    issuer: "BET Structure",
    status: "bpe",
    type: "pdf",
    size: "3.8 MB",
    date: "30/04/2026",
    project: "Eco-Quartier Fluvial",
    eidas: true,
    history: [
      { version: "V4 (D)", date: "30/04/2026", author: "M. Leroy", changes: "Validation finale BC" },
      { version: "V3 (C)", date: "25/04/2026", author: "M. Leroy", changes: "Intégration remarques" },
      { version: "V2 (B)", date: "18/04/2026", author: "M. Leroy", changes: "Corrections" },
      { version: "V1 (A)", date: "10/04/2026", author: "M. Leroy", changes: "Version initiale" },
    ],
  },
  {
    id: 5,
    name: "Plan_Electricite_RDC.dwg",
    index: "B",
    issuer: "BET Electricité",
    status: "obsolete",
    type: "dwg",
    size: "12.5 MB",
    date: "15/04/2026",
    project: "Gare du Nord",
    eidas: false,
    history: [
      { version: "V2 (B)", date: "15/04/2026", author: "M. Petit", changes: "Remplacé par nouvelle version" },
      { version: "V1 (A)", date: "01/04/2026", author: "M. Petit", changes: "Version initiale" },
    ],
  },
  {
    id: 6,
    name: "PV_Reunion_Chantier_22.pdf",
    index: "A",
    issuer: "MOE",
    status: "bpe",
    type: "pdf",
    size: "0.8 MB",
    date: "03/05/2026",
    project: "Tour Hekla",
    eidas: true,
    history: [
      { version: "V1 (A)", date: "03/05/2026", author: "Conducteur OPC", changes: "CR réunion hebdomadaire" },
    ],
  },
]

const issuers = ["Tous", "BET Structure", "BET Electricité", "MOE", "Architecte", "Bureau de Contrôle"]
const indices = ["Tous", "A", "B", "C", "D"]
const statuses = ["Tous", "BPE", "En revue", "Obsolète"]

export default function DocumentsBPEPage() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterIssuer, setFilterIssuer] = useState("Tous")
  const [filterIndex, setFilterIndex] = useState("Tous")
  const [filterStatus, setFilterStatus] = useState("Tous")
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)
  const [showFilters, setShowFilters] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiActionLoading, setAiActionLoading] = useState(false)

  const handleDocClick = (doc: Document) => {
    setSelectedDoc(doc)
    setSheetOpen(true)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload()
    }
  }, [])

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploading(false)
            setUploadProgress(0)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleAIAction = (action: string) => {
    setAiActionLoading(true)
    setTimeout(() => {
      setAiActionLoading(false)
      setShowAIChat(false)
    }, 2000)
  }

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIssuer = filterIssuer === "Tous" || doc.issuer === filterIssuer
    const matchesIndex = filterIndex === "Tous" || doc.index === filterIndex
    const matchesStatus =
      filterStatus === "Tous" ||
      (filterStatus === "BPE" && doc.status === "bpe") ||
      (filterStatus === "En revue" && doc.status === "review") ||
      (filterStatus === "Obsolète" && doc.status === "obsolete")
    return matchesSearch && matchesIssuer && matchesIndex && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "bpe":
        return (
          <Badge className="bg-[#28A745]/20 text-[#28A745] hover:bg-[#28A745]/30 border-[#28A745]/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            BPE
          </Badge>
        )
      case "review":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30">
            <Clock className="mr-1 h-3 w-3" />
            En revue
          </Badge>
        )
      case "obsolete":
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            <XCircle className="mr-1 h-3 w-3" />
            Obsolète
          </Badge>
        )
      default:
        return null
    }
  }

  const getFileIcon = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: "bg-destructive/20 text-destructive",
      docx: "bg-blue-500/20 text-blue-400",
      dwg: "bg-emerald-500/20 text-emerald-400",
    }
    return colors[type] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/templates/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Gestion Documentaire & Workflow BPE</h1>
            <p className="text-muted-foreground">Explorateur technique avec validation eIDAS</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-border"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(showFilters && "bg-primary/20 border-primary")}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtres avancés
              </Button>
            </div>

            {showFilters && (
              <div className="grid gap-4 sm:grid-cols-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Émetteur</Label>
                  <Select value={filterIssuer} onValueChange={setFilterIssuer}>
                    <SelectTrigger className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {issuers.map((issuer) => (
                        <SelectItem key={issuer} value={issuer}>
                          {issuer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Indice</Label>
                  <Select value={filterIndex} onValueChange={setFilterIndex}>
                    <SelectTrigger className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {indices.map((index) => (
                        <SelectItem key={index} value={index}>
                          {index}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Statut BPE</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-border"
                      >
                        {filterDate ? format(filterDate, "dd/MM/yyyy", { locale: fr }) : "Sélectionner..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filterDate}
                        onSelect={setFilterDate}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          dragActive ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && simulateUpload()}
      >
        <CardContent className="p-6">
          {uploading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Upload className="h-6 w-6 text-primary animate-pulse" />
                <span className="font-medium">Upload en cours...</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">{uploadProgress}% - Document_Technique.pdf</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Glissez-déposez vos fichiers ici</p>
              <p className="text-sm text-muted-foreground">ou cliquez pour sélectionner (PDF, DWG, DOCX)</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documents du Projet</CardTitle>
              <CardDescription>{filteredDocs.length} document(s) trouvé(s)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Nom du fichier</TableHead>
                  <TableHead className="text-muted-foreground">Indice</TableHead>
                  <TableHead className="text-muted-foreground">Émetteur</TableHead>
                  <TableHead className="text-muted-foreground">Statut</TableHead>
                  <TableHead className="text-muted-foreground">Signature</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="border-border hover:bg-secondary/50 cursor-pointer"
                    onClick={() => handleDocClick(doc)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            getFileIcon(doc.type)
                          )}
                        >
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {doc.index}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.issuer}</TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      {doc.eidas ? (
                        <Badge className="bg-[#593196]/20 text-[#a78bfa] border-[#593196]/30 hover:bg-[#593196]/30">
                          <Shield className="mr-1 h-3 w-3" />
                          Certifié eIDAS
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Preview Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedDoc && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {selectedDoc.name}
                </SheetTitle>
                <SheetDescription>
                  Indice {selectedDoc.index} - {selectedDoc.issuer}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Document Preview */}
                <div className="relative aspect-[3/4] rounded-lg border border-border bg-secondary/50 overflow-hidden">
                  {/* Simulated document preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">Aperçu du document</p>
                    </div>
                  </div>

                  {/* BPE Stamp Overlay */}
                  {selectedDoc.status === "bpe" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rotate-[-15deg] border-4 border-[#28A745] rounded-lg px-6 py-3 bg-[#28A745]/10">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#28A745] tracking-wider">BON POUR</p>
                          <p className="text-2xl font-bold text-[#28A745] tracking-wider">EXÉCUTION</p>
                          <Separator className="my-2 bg-[#28A745]/50" />
                          <p className="text-xs text-[#28A745]">{selectedDoc.date}</p>
                          {selectedDoc.eidas && (
                            <div className="mt-2 flex items-center justify-center gap-1">
                              <Shield className="h-3 w-3 text-[#28A745]" />
                              <span className="text-xs text-[#28A745]">eIDAS</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Document Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Projet</p>
                    <p className="font-medium">{selectedDoc.project}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Taille</p>
                    <p className="font-medium">{selectedDoc.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium uppercase">{selectedDoc.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Statut</p>
                    <div className="mt-1">{getStatusBadge(selectedDoc.status)}</div>
                  </div>
                </div>

                <Separator />

                {/* Version History */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold mb-4">
                    <History className="h-4 w-4 text-primary" />
                    Historique des indices
                  </h4>
                  <div className="space-y-3">
                    {selectedDoc.history.map((version, idx) => (
                      <div
                        key={version.version}
                        className={cn(
                          "relative pl-6 pb-3",
                          idx !== selectedDoc.history.length - 1 && "border-l-2 border-border"
                        )}
                      >
                        <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary" />
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">
                              {version.version}
                              {idx === 0 && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  Actuel
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">{version.changes}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {version.author} - {version.date}
                            </p>
                          </div>
                          {idx > 0 && (
                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                              <GitCompare className="h-3 w-3" />
                              Visual Diff
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Télécharger
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Eye className="h-4 w-4" />
                    Ouvrir
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <Card className="bg-card border-[#593196]/50 shadow-lg shadow-[#593196]/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]/20">
                    <Sparkles className="h-4 w-4 text-[#a78bfa]" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Assistant IA</CardTitle>
                    <CardDescription className="text-xs">Analyse documentaire</CardDescription>
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
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#593196]/20">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    {"J'ai détecté que le "}
                    <span className="font-semibold text-primary">Plan de Coffrage Indice B</span>
                    {" n'a pas été visé par le bureau de contrôle."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ce document est en attente de validation depuis 5 jours.
                  </p>
                </div>
              </div>

              <Separator />

              <p className="text-sm font-medium">
                Souhaitez-vous que je relance le validateur ?
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-[#593196] hover:bg-[#593196]/80"
                  onClick={() => handleAIAction("relance")}
                  disabled={aiActionLoading}
                >
                  {aiActionLoading ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3" />
                      Relancer
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowAIChat(false)}
                >
                  Plus tard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
