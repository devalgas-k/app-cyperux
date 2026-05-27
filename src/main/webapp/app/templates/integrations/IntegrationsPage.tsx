"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Settings,
  Check,
  X,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileSpreadsheet,
  FileCode,
  Box,
  ArrowRight,
  Sparkles,
  Send,
  MessageSquare,
  Columns,
  FileUp,
  XCircle,
  ChevronRight,
  ExternalLink,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
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
  DialogFooter,
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
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Switch } from "@/shared/components/ui/switch"
// import { useLanguage } from "@/lib/i18n"

// Enterprise connectors data
const connectors = [
  {
    id: "sap",
    name: "SAP S/4HANA",
    description: "ERP Finance & Contrôle de Gestion",
    status: "connected",
    lastSync: "Il y a 5 min",
    dataPoints: "12,450",
    logo: "SAP",
    color: "#0070F2",
  },
  {
    id: "msproject",
    name: "Microsoft Project",
    description: "Planification & Ordonnancement",
    status: "connected",
    lastSync: "Il y a 15 min",
    dataPoints: "3,200",
    logo: "MS",
    color: "#217346",
  },
  {
    id: "primavera",
    name: "Primavera P6",
    description: "Planning Construction Avancé",
    status: "disconnected",
    lastSync: "Jamais",
    dataPoints: "0",
    logo: "P6",
    color: "#C74634",
  },
  {
    id: "oracle",
    name: "Oracle Aconex",
    description: "Gestion Documentaire BTP",
    status: "available",
    lastSync: "-",
    dataPoints: "-",
    logo: "OC",
    color: "#F80000",
  },
  {
    id: "procore",
    name: "Procore",
    description: "Construction Management",
    status: "connected",
    lastSync: "Il y a 30 min",
    dataPoints: "8,750",
    logo: "PC",
    color: "#F47920",
  },
  {
    id: "autodesk",
    name: "Autodesk BIM 360",
    description: "Coordination BIM & Maquettes",
    status: "connected",
    lastSync: "Il y a 1h",
    dataPoints: "45,200",
    logo: "AD",
    color: "#0696D7",
  },
]

// Sync history data
const syncHistory = [
  {
    id: 1,
    connector: "SAP S/4HANA",
    type: "Budget",
    status: "success",
    records: 156,
    date: "2026-05-06 14:32:15",
    duration: "12s",
  },
  {
    id: 2,
    connector: "Microsoft Project",
    type: "Tâches",
    status: "success",
    records: 89,
    date: "2026-05-06 14:15:00",
    duration: "8s",
  },
  {
    id: 3,
    connector: "SAP S/4HANA",
    type: "Coûts réels",
    status: "warning",
    records: 45,
    message: "12% d'écart détecté",
    date: "2026-05-06 13:45:22",
    duration: "15s",
  },
  {
    id: 4,
    connector: "Procore",
    type: "RFIs",
    status: "success",
    records: 23,
    date: "2026-05-06 12:00:00",
    duration: "5s",
  },
  {
    id: 5,
    connector: "Primavera P6",
    type: "Planning",
    status: "error",
    records: 0,
    message: "Connexion refusée",
    date: "2026-05-06 10:30:00",
    duration: "2s",
  },
  {
    id: 6,
    connector: "Autodesk BIM 360",
    type: "Modèles IFC",
    status: "success",
    records: 12,
    date: "2026-05-06 09:00:00",
    duration: "45s",
  },
]

// Column mapping for import
const columnMappings = [
  { source: "Code_WBS", target: "wbs_code", matched: true },
  { source: "Description_Tache", target: "task_name", matched: true },
  { source: "Date_Debut", target: "start_date", matched: true },
  { source: "Date_Fin", target: "end_date", matched: true },
  { source: "Budget_Prevu", target: "planned_budget", matched: true },
  { source: "Cout_Reel", target: "actual_cost", matched: true },
  { source: "Responsable", target: "assignee", matched: false },
  { source: "Zone_Chantier", target: null, matched: false },
]

export default function IntegrationsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [activeTab, setActiveTab] = useState("connectors")
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<typeof connectors[0] | null>(null)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [importStep, setImportStep] = useState(1)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "J'ai détecté un décalage de 12% entre les coûts SAP et le budget Cyperux. Voulez-vous que je lance une réconciliation automatique ?",
      actions: ["Lancer la réconciliation", "Voir les détails"],
    },
  ])

  const handleConfigClick = (connector: typeof connectors[0]) => {
    setSelectedConnector(connector)
    setConfigDialogOpen(true)
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file.name)
      setImportStep(2)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Check className="mr-1 h-3 w-3" />
            Connecté
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
            <X className="mr-1 h-3 w-3" />
            Déconnecté
          </Badge>
        )
      case "available":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Disponible
          </Badge>
        )
      default:
        return null
    }
  }

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Espace d&apos;Intégration & Connecteurs</h1>
          <p className="text-muted-foreground">Connectez vos outils métier et synchronisez vos données</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync. Globale
          </Button>
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                <Upload className="h-4 w-4" />
                Import/Export
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Centre d&apos;Import/Export de Masse</DialogTitle>
                <DialogDescription>
                  Importez vos fichiers Excel, CSV ou IFC avec mappage intelligent des colonnes
                </DialogDescription>
              </DialogHeader>
              
              {importStep === 1 && (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragging ? "border-[#593196] bg-[#593196]/10" : "border-muted-foreground/30"
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                >
                  <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Glissez-déposez vos fichiers ici</p>
                  <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir</p>
                  <div className="flex justify-center gap-4">
                    <Badge variant="outline" className="gap-1">
                      <FileSpreadsheet className="h-3 w-3" />
                      Excel (.xlsx)
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <FileCode className="h-3 w-3" />
                      CSV
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Box className="h-3 w-3" />
                      IFC
                    </Badge>
                  </div>
                </div>
              )}

              {importStep === 2 && uploadedFile && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileSpreadsheet className="h-8 w-8 text-emerald-400" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile}</p>
                      <p className="text-sm text-muted-foreground">156 lignes détectées</p>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Analysé</Badge>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Columns className="h-4 w-4 text-[#593196]" />
                      <span className="font-medium">Mappage Intelligent des Colonnes</span>
                      <Badge variant="outline" className="ml-auto">
                        <Sparkles className="h-3 w-3 mr-1" />
                        IA Active
                      </Badge>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>Colonne Source</TableHead>
                            <TableHead>
                              <ArrowRight className="h-4 w-4" />
                            </TableHead>
                            <TableHead>Champ Cyperux</TableHead>
                            <TableHead className="w-20">Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {columnMappings.map((mapping, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-mono text-sm">{mapping.source}</TableCell>
                              <TableCell>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </TableCell>
                              <TableCell>
                                {mapping.target ? (
                                  <Select defaultValue={mapping.target}>
                                    <SelectTrigger className="w-48">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="wbs_code">wbs_code</SelectItem>
                                      <SelectItem value="task_name">task_name</SelectItem>
                                      <SelectItem value="start_date">start_date</SelectItem>
                                      <SelectItem value="end_date">end_date</SelectItem>
                                      <SelectItem value="planned_budget">planned_budget</SelectItem>
                                      <SelectItem value="actual_cost">actual_cost</SelectItem>
                                      <SelectItem value="assignee">assignee</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <span className="text-muted-foreground italic">Non mappé</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {mapping.matched ? (
                                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                {importStep === 2 ? (
                  <>
                    <Button variant="outline" onClick={() => { setImportStep(1); setUploadedFile(null) }}>
                      Retour
                    </Button>
                    <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
                      <Upload className="h-4 w-4" />
                      Importer 156 lignes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exporter les données
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connecteurs Actifs</p>
                <p className="text-3xl font-bold text-emerald-400">4</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Données Sync.</p>
                <p className="text-3xl font-bold">69.6K</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#593196]/20 flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-[#593196]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dernière Sync.</p>
                <p className="text-3xl font-bold">5 min</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertes</p>
                <p className="text-3xl font-bold text-amber-400">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="connectors">Connecteurs</TabsTrigger>
          <TabsTrigger value="history">Historique Sync.</TabsTrigger>
          <TabsTrigger value="mappings">Mappages</TabsTrigger>
        </TabsList>

        <TabsContent value="connectors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectors.map((connector) => (
              <Card key={connector.id} className="relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: connector.color }}
                />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: connector.color }}
                      >
                        {connector.logo}
                      </div>
                      <div>
                        <CardTitle className="text-base">{connector.name}</CardTitle>
                        <CardDescription className="text-xs">{connector.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(connector.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dernière sync.</p>
                      <p className="font-medium">{connector.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Données</p>
                      <p className="font-medium">{connector.dataPoints}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={() => handleConfigClick(connector)}
                    >
                      <Settings className="h-3 w-3" />
                      Configurer
                    </Button>
                    {connector.status === "connected" && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="gap-1"
                        onClick={() => {
                          toast.info("Synchronisation lancee", {
                            description: `Synchronisation de ${connector.name} en cours...`
                          })
                        }}
                      >
                        <RefreshCw className="h-3 w-3" />
                        Sync
                      </Button>
                    )}
                    {connector.status === "available" && (
                      <Button 
                        size="sm" 
                        className="gap-1 bg-[#593196] hover:bg-[#593196]/90"
                        onClick={() => {
                          toast.success("Integration activee", {
                            description: `${connector.name} a ete active avec succes.`
                          })
                        }}
                      >
                        <Zap className="h-3 w-3" />
                        Activer
                      </Button>
                    )}
                    {connector.status === "disconnected" && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="gap-1"
                        onClick={() => {
                          toast.info("Reconnexion en cours", {
                            description: `Tentative de reconnexion a ${connector.name}...`
                          })
                        }}
                      >
                        Reconnecter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historique des Synchronisations</CardTitle>
                  <CardDescription>Logs des dernières 24 heures</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="success">Succès</SelectItem>
                      <SelectItem value="warning">Avertissements</SelectItem>
                      <SelectItem value="error">Erreurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Statut</TableHead>
                    <TableHead>Connecteur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Enregistrements</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {syncHistory.map((sync) => (
                    <TableRow key={sync.id}>
                      <TableCell>{getSyncStatusIcon(sync.status)}</TableCell>
                      <TableCell className="font-medium">{sync.connector}</TableCell>
                      <TableCell>{sync.type}</TableCell>
                      <TableCell>{sync.records}</TableCell>
                      <TableCell>{sync.duration}</TableCell>
                      <TableCell className="font-mono text-sm">{sync.date}</TableCell>
                      <TableCell>
                        {sync.message && (
                          <Badge
                            variant={sync.status === "error" ? "destructive" : "secondary"}
                            className={sync.status === "warning" ? "bg-amber-500/20 text-amber-400" : ""}
                          >
                            {sync.message}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mappings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mappages de Données</CardTitle>
              <CardDescription>Configuration des correspondances entre systèmes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded bg-[#0070F2] flex items-center justify-center text-white text-xs font-bold">
                      SAP
                    </div>
                    <span className="font-medium">SAP S/4HANA</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    <span className="font-medium">Cyperux</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">AUFNR</span>
                      <span>project_code</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">KSTAR</span>
                      <span>cost_element</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">WKGBTR</span>
                      <span>actual_cost</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded bg-[#217346] flex items-center justify-center text-white text-xs font-bold">
                      MS
                    </div>
                    <span className="font-medium">Microsoft Project</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    <span className="font-medium">Cyperux</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">TaskUID</span>
                      <span>task_id</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">Start</span>
                      <span>start_date</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-dashed">
                      <span className="text-muted-foreground">Finish</span>
                      <span>end_date</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connector Config Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedConnector && (
                <div
                  className="h-8 w-8 rounded flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: selectedConnector.color }}
                >
                  {selectedConnector.logo}
                </div>
              )}
              Configuration {selectedConnector?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>URL du serveur</Label>
              <Input placeholder="https://sap.exemple.com/api" defaultValue="https://sap-prod.eiffage.net/odata/v4" />
            </div>
            <div className="space-y-2">
              <Label>Client ID</Label>
              <Input placeholder="client_id" defaultValue="cyperux-integration" />
            </div>
            <div className="space-y-2">
              <Label>Client Secret</Label>
              <Input type="password" placeholder="••••••••" defaultValue="secret123" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Synchronisation automatique</p>
                <p className="text-sm text-muted-foreground">Toutes les 15 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Notifications d&apos;erreur</p>
                <p className="text-sm text-muted-foreground">Par email et push</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Tester la connexion</Button>
            <Button className="bg-[#593196] hover:bg-[#593196]/90">Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-[#593196]/50 shadow-lg shadow-[#593196]/10">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#593196] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Intégrations</CardTitle>
                  <CardDescription className="text-xs">Réconciliation automatique</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiMessages.map((msg, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <span>{msg.content}</span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2 text-xs">
                      <p className="font-medium text-amber-400 mb-1">Détail de l&apos;écart :</p>
                      <p className="text-muted-foreground">Budget Cyperux : 2,450,000 EUR</p>
                      <p className="text-muted-foreground">Coûts SAP : 2,744,000 EUR</p>
                      <p className="text-amber-400 font-medium">Écart : +294,000 EUR (12%)</p>
                    </div>
                  </div>
                  {msg.actions && (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#593196] hover:bg-[#593196]/90">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        {msg.actions[0]}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {msg.actions[1]}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-2 border-t">
                <Input placeholder="Poser une question..." className="flex-1" />
                <Button size="icon" className="bg-[#593196] hover:bg-[#593196]/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
