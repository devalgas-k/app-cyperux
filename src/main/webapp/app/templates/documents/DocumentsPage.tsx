"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { FileText, Upload, Download, Eye, Lock, Clock, MoreHorizontal, ArrowRight, Share2, History, Trash2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { DataTablePaginated, type FilterConfig, type ColumnConfig } from "@/shared/components/custom/data-table-paginated"

interface Document {
  id: number
  name: string
  index: string
  issuer: string
  status: "sealed" | "review" | "rejected" | "expired"
  type: string
  size: string
  date: string
  project: string
}

const documents: Document[] = [
  { id: 1, name: "Plan_Structure_V2.pdf", index: "B", issuer: "BET Structure", status: "sealed", type: "pdf", size: "4.2 MB", date: "05/05/2024", project: "Tour Hekla" },
  { id: 2, name: "CCTP_Lot_03.docx", index: "A", issuer: "MOE", status: "review", type: "docx", size: "1.8 MB", date: "03/05/2024", project: "Tour Hekla" },
  { id: 3, name: "Plan_Electricite_RDC.dwg", index: "C", issuer: "BET Electricite", status: "sealed", type: "dwg", size: "12.5 MB", date: "01/05/2024", project: "Tour Hekla" },
  { id: 4, name: "Note_Calcul_Fondations.pdf", index: "A", issuer: "BET Structure", status: "review", type: "pdf", size: "2.1 MB", date: "28/04/2024", project: "Eco-Quartier Fluvial" },
  { id: 5, name: "PV_Reunion_Chantier_15.pdf", index: "A", issuer: "MOE", status: "sealed", type: "pdf", size: "0.8 MB", date: "25/04/2024", project: "Gare du Nord" },
  { id: 6, name: "Plan_Facade_Nord.pdf", index: "D", issuer: "Architecte", status: "sealed", type: "pdf", size: "3.5 MB", date: "22/04/2024", project: "Tour Hekla" },
  { id: 7, name: "Rapport_Etude_Sol.pdf", index: "B", issuer: "BET Geotechnique", status: "rejected", type: "pdf", size: "5.2 MB", date: "20/04/2024", project: "Eco-Quartier Fluvial" },
  { id: 8, name: "Schema_Plomberie_R+2.dwg", index: "A", issuer: "BET Fluides", status: "review", type: "dwg", size: "8.3 MB", date: "18/04/2024", project: "Gare du Nord" },
  { id: 9, name: "Cahier_Charges_Securite.pdf", index: "C", issuer: "CSPS", status: "sealed", type: "pdf", size: "1.1 MB", date: "15/04/2024", project: "Tour Hekla" },
  { id: 10, name: "Plan_Masse_V3.pdf", index: "C", issuer: "Architecte", status: "expired", type: "pdf", size: "6.7 MB", date: "10/04/2024", project: "Eco-Quartier Fluvial" },
  { id: 11, name: "DOE_Electricite.pdf", index: "A", issuer: "Entreprise Elec", status: "review", type: "pdf", size: "15.3 MB", date: "08/04/2024", project: "Gare du Nord" },
  { id: 12, name: "Plan_Evacuation.pdf", index: "B", issuer: "CSPS", status: "sealed", type: "pdf", size: "2.4 MB", date: "05/04/2024", project: "Tour Hekla" },
]

const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { value: "sealed", label: "Scelle (BPE)" },
      { value: "review", label: "En attente" },
      { value: "rejected", label: "Rejete" },
      { value: "expired", label: "Expire" },
    ],
  },
  {
    key: "project",
    label: "Projet",
    type: "multiselect",
    options: [
      { value: "Tour Hekla", label: "Tour Hekla" },
      { value: "Eco-Quartier Fluvial", label: "Eco-Quartier Fluvial" },
      { value: "Gare du Nord", label: "Gare du Nord" },
    ],
  },
  {
    key: "type",
    label: "Type de fichier",
    type: "multiselect",
    options: [
      { value: "pdf", label: "PDF" },
      { value: "docx", label: "Word" },
      { value: "dwg", label: "AutoCAD" },
    ],
  },
]

export default function DocumentsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showDocDialog, setShowDocDialog] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const total = documents.length
    const review = documents.filter((d) => d.status === "review").length
    const sealed = documents.filter((d) => d.status === "sealed").length
    const rejected = documents.filter((d) => d.status === "rejected").length
    const expired = documents.filter((d) => d.status === "expired").length
    return { total, review, sealed, rejected, expired }
  }, [])

  // Filter documents based on active stat filter
  const filteredByStatDocuments = useMemo(() => {
    if (!activeStatFilter) return documents
    if (activeStatFilter === "all") return documents
    return documents.filter((d) => d.status === activeStatFilter)
  }, [activeStatFilter])

  const handleStatClick = (filter: string | null) => {
    if (activeStatFilter === filter) {
      setActiveStatFilter(null)
      toast.info("Filtre retire", { description: "Affichage de tous les documents" })
    } else {
      setActiveStatFilter(filter)
      const filterLabels: Record<string, string> = {
        all: "tous les documents",
        review: "documents en attente",
        sealed: "documents scelles",
        rejected: "documents rejetes",
        expired: "documents expires",
      }
      toast.info("Filtre applique", { description: `Affichage des ${filterLabels[filter || "all"]}` })
    }
  }

  const handleDocumentAction = (action: string, doc: Document) => {
    switch (action) {
      case "view":
        setSelectedDoc(doc)
        setShowDocDialog(true)
        break
      case "download":
        toast.success("Telechargement lance", { description: `${doc.name} (${doc.size})` })
        break
      case "share":
        toast.info("Lien copie", { description: "Le lien de partage a ete copie dans le presse-papier." })
        break
      case "history":
        toast.info("Historique", { description: `Affichage de l'historique des versions de ${doc.name}` })
        break
      case "delete":
        toast.error("Document supprime", { description: `${doc.name} a ete supprime.` })
        break
    }
  }

  const handleUpload = () => {
    setShowUploadDialog(false)
    toast.success("Document importe", { description: "Le document a ete ajoute avec succes." })
  }

  const getFileIcon = (type: string) => {
    const colors: Record<string, string> = {
      pdf: "bg-destructive/20 text-destructive",
      docx: "bg-chart-4/20 text-chart-4",
      dwg: "bg-chart-3/20 text-chart-3",
    }
    return colors[type] || "bg-muted text-muted-foreground"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sealed":
        return (
          <Badge className="bg-chart-2/20 text-chart-2 hover:bg-chart-2/30">
            <Lock className="mr-1 h-3 w-3" />
            BPE Scelle
          </Badge>
        )
      case "review":
        return (
          <Badge variant="secondary" className="bg-chart-3/20 text-chart-3">
            <Clock className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejete
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Expire
          </Badge>
        )
      default:
        return null
    }
  }

  const columns: ColumnConfig<Document>[] = [
    {
      key: "name",
      label: t("fileName"),
      sortable: true,
      render: (doc) => (
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getFileIcon(doc.type)}`}>
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{doc.name}</p>
            <p className="text-xs text-muted-foreground">{doc.size}</p>
          </div>
        </div>
      ),
    },
    {
      key: "index",
      label: t("index"),
      sortable: true,
      render: (doc) => (
        <Badge variant="outline" className="font-mono">
          {doc.index}
        </Badge>
      ),
    },
    {
      key: "issuer",
      label: t("issuer"),
      sortable: true,
      className: "text-muted-foreground",
    },
    {
      key: "status",
      label: t("status"),
      sortable: true,
      render: (doc) => getStatusBadge(doc.status),
    },
    {
      key: "project",
      label: "Projet",
      sortable: true,
      className: "text-muted-foreground",
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      className: "text-muted-foreground",
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (doc) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDocumentAction("view", doc)}>
                <Eye className="mr-2 h-4 w-4" />
                Visualiser
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDocumentAction("download", doc)}>
                <Download className="mr-2 h-4 w-4" />
                Telecharger
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDocumentAction("share", doc)}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDocumentAction("history", doc)}>
                <History className="mr-2 h-4 w-4" />
                Historique
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => handleDocumentAction("delete", doc)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("documentManagement")}</h1>
          <p className="text-muted-foreground">Gestion Electronique des Documents (GED)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/templates/documents/bpe" className="gap-2">
              Workflow BPE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="gap-2" onClick={() => setShowUploadDialog(true)}>
            <Upload className="h-4 w-4" />
            Importer
          </Button>
        </div>
      </div>

      {/* Interactive Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <InteractiveStatCard
          label="Total Documents"
          value={stats.total}
          icon={FileText}
          variant="default"
          onClick={() => handleStatClick("all")}
          isActive={activeStatFilter === "all"}
        />
        <InteractiveStatCard
          label="En Attente"
          value={stats.review}
          icon={Clock}
          variant="warning"
          onClick={() => handleStatClick("review")}
          isActive={activeStatFilter === "review"}
          description="Documents a valider"
        />
        <InteractiveStatCard
          label="Scelles (BPE)"
          value={stats.sealed}
          icon={Lock}
          variant="success"
          onClick={() => handleStatClick("sealed")}
          isActive={activeStatFilter === "sealed"}
          description="Documents valides"
        />
        <InteractiveStatCard
          label="Rejetes"
          value={stats.rejected}
          icon={XCircle}
          variant="danger"
          onClick={() => handleStatClick("rejected")}
          isActive={activeStatFilter === "rejected"}
          description="A corriger"
        />
        <InteractiveStatCard
          label="Expires"
          value={stats.expired}
          icon={AlertTriangle}
          variant="info"
          onClick={() => handleStatClick("expired")}
          isActive={activeStatFilter === "expired"}
          description="A renouveler"
        />
      </div>

      {/* Active filter indicator */}
      {activeStatFilter && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            Filtre actif: {activeStatFilter === "all" ? "Tous" : activeStatFilter === "review" ? "En attente" : activeStatFilter === "sealed" ? "Scelles" : activeStatFilter === "rejected" ? "Rejetes" : "Expires"}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={() => setActiveStatFilter(null)}>
              <XCircle className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}

      {/* Documents Table with Pagination */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Documents Recents</CardTitle>
          <CardDescription>Dernieres modifications et uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTablePaginated
            data={filteredByStatDocuments}
            columns={columns}
            filters={filterConfigs}
            searchKeys={["name", "project", "issuer"] as (keyof Document)[]}
            pageSize={5}
            onRowClick={(doc) => handleDocumentAction("view", doc)}
            showResultCount
          />
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { name: "Plans", count: 89, color: "bg-primary", filter: "plans" },
          { name: "CCTP", count: 34, color: "bg-chart-2", filter: "cctp" },
          { name: "PV Reunions", count: 67, color: "bg-chart-3", filter: "pv" },
          { name: "Notes de Calcul", count: 55, color: "bg-chart-4", filter: "notes" },
        ].map((category) => (
          <Card
            key={category.name}
            className="bg-card hover:bg-secondary/50 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => toast.info("Filtre applique", { description: `Affichage des documents de type "${category.name}"` })}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${category.color}`} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={showDocDialog} onOpenChange={setShowDocDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedDoc?.name}
            </DialogTitle>
            <DialogDescription>Details et apercu du document</DialogDescription>
          </DialogHeader>

          {selectedDoc && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Indice</p>
                  <Badge variant="outline" className="font-mono">{selectedDoc.index}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Emetteur</p>
                  <p className="font-medium">{selectedDoc.issuer}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Projet</p>
                  <p className="font-medium">{selectedDoc.project}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedDoc.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Taille</p>
                  <p className="font-medium">{selectedDoc.size}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Statut</p>
                  {getStatusBadge(selectedDoc.status)}
                </div>
              </div>

              <div className="p-4 rounded-lg border border-dashed border-border bg-muted/30 flex items-center justify-center h-32">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Apercu du document</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDocDialog(false)}>
              Fermer
            </Button>
            <Button variant="outline" onClick={() => handleDocumentAction("share", selectedDoc!)}>
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
            <Button onClick={() => { handleDocumentAction("download", selectedDoc!); setShowDocDialog(false) }}>
              <Download className="mr-2 h-4 w-4" />
              Telecharger
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer un Document</DialogTitle>
            <DialogDescription>Selectionnez un fichier a importer dans la GED</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Glissez-deposez ou cliquez pour selectionner</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, DWG jusqu&apos;a 50MB</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
