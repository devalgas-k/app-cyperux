"use client"

import { useState } from "react"
import {
  Check,
  Download,
  ExternalLink,
  Search,
  Filter,
  Zap,
  Database,
  FileSpreadsheet,
  Cloud,
  Building,
  Cog,
  Star,
  MessageSquare,
  X,
  Sparkles,
  Send,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
// import { useLanguage } from "@/lib/i18n"

const connectors = [
  {
    id: "sap",
    name: "SAP S/4HANA",
    description: "Integration ERP complete - Finance, Achats, Stocks",
    icon: Database,
    status: "connected",
    category: "erp",
    rating: 4.8,
    installs: "2.4k",
    lastSync: "Il y a 2 min",
    features: ["Synchronisation temps reel", "Mapping automatique", "Historique complet"],
  },
  {
    id: "oracle",
    name: "Oracle Primavera",
    description: "Gestion de projets et planning avance",
    icon: Building,
    status: "available",
    category: "planning",
    rating: 4.6,
    installs: "1.8k",
    features: ["Import/Export P6", "Sync planning", "Ressources"],
  },
  {
    id: "excel",
    name: "Import Excel/CSV",
    description: "Importation de donnees tabulaires",
    icon: FileSpreadsheet,
    status: "ready",
    category: "data",
    rating: 4.9,
    installs: "5.2k",
    features: ["Detection automatique", "Mapping colonnes", "Validation donnees"],
  },
  {
    id: "msproject",
    name: "Microsoft Project",
    description: "Synchronisation des plannings MS Project",
    icon: Cog,
    status: "available",
    category: "planning",
    rating: 4.5,
    installs: "3.1k",
    features: ["Import MPP", "Export XML", "Sync bidirectionnelle"],
  },
  {
    id: "autodesk",
    name: "Autodesk BIM 360",
    description: "Integration modeles BIM et documents",
    icon: Cloud,
    status: "connected",
    category: "bim",
    rating: 4.7,
    installs: "2.1k",
    lastSync: "Il y a 15 min",
    features: ["Sync modeles IFC", "Documents", "Issues BIM"],
  },
  {
    id: "procore",
    name: "Procore",
    description: "Gestion de construction cloud",
    icon: Building,
    status: "available",
    category: "construction",
    rating: 4.4,
    installs: "1.5k",
    features: ["RFI/Submittals", "Documents", "Punch lists"],
  },
  {
    id: "sage",
    name: "Sage X3",
    description: "Comptabilite et gestion financiere",
    icon: Database,
    status: "available",
    category: "erp",
    rating: 4.3,
    installs: "980",
    features: ["Factures", "Situations", "Analytique"],
  },
  {
    id: "sharepoint",
    name: "Microsoft SharePoint",
    description: "Gestion documentaire Microsoft 365",
    icon: Cloud,
    status: "ready",
    category: "documents",
    rating: 4.6,
    installs: "4.3k",
    features: ["Sync bidirectionnelle", "Permissions", "Versionning"],
  },
]

const categories = [
  { value: "all", label: "Toutes les categories" },
  { value: "erp", label: "ERP & Finance" },
  { value: "planning", label: "Planning" },
  { value: "bim", label: "BIM & Maquette" },
  { value: "documents", label: "Documents" },
  { value: "construction", label: "Construction" },
  { value: "data", label: "Import/Export" },
]

export default function MarketplacePage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedConnector, setSelectedConnector] = useState<typeof connectors[0] | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")

  const filteredConnectors = connectors.filter((connector) => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connector.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || connector.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Connecte</Badge>
      case "ready":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Pret</Badge>
      case "available":
        return <Badge variant="outline">Disponible</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const connectedCount = connectors.filter(c => c.status === "connected").length
  const availableCount = connectors.filter(c => c.status === "available").length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Marketplace & Connecteurs</h1>
          <p className="text-muted-foreground">Integrez vos outils metier avec Cyperux</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <Check className="h-3 w-3 text-emerald-400" />
            {connectedCount} connectes
          </Badge>
          <Badge variant="outline" className="gap-1">
            {availableCount} disponibles
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connecteurs Actifs</p>
                <p className="text-2xl font-bold">{connectedCount}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Syncs Aujourd&apos;hui</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <RefreshCw className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Donnees Transferees</p>
                <p className="text-2xl font-bold">2.4 GB</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                <Database className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Succes</p>
                <p className="text-2xl font-bold">99.8%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un connecteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Connectors Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredConnectors.map((connector) => (
          <Card 
            key={connector.id} 
            className={`cursor-pointer transition-all hover:border-primary/50 ${
              connector.status === "connected" ? "border-emerald-500/30" : ""
            }`}
            onClick={() => setSelectedConnector(connector)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <connector.icon className="h-5 w-5" />
                </div>
                {getStatusBadge(connector.status)}
              </div>
              <CardTitle className="text-base">{connector.name}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">
                {connector.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {connector.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {connector.installs}
                </div>
              </div>
              {connector.lastSync && (
                <p className="mt-2 text-xs text-emerald-400">
                  Derniere sync: {connector.lastSync}
                </p>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                size="sm" 
                className="w-full gap-2"
                variant={connector.status === "connected" ? "outline" : "default"}
              >
                {connector.status === "connected" ? (
                  <>
                    <Cog className="h-3 w-3" />
                    Configurer
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3" />
                    Installer
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Connector Detail Dialog */}
      <Dialog open={!!selectedConnector} onOpenChange={() => setSelectedConnector(null)}>
        <DialogContent className="max-w-2xl">
          {selectedConnector && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <selectedConnector.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <DialogTitle className="flex items-center gap-2">
                      {selectedConnector.name}
                      {getStatusBadge(selectedConnector.status)}
                    </DialogTitle>
                    <DialogDescription>{selectedConnector.description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <Tabs defaultValue="overview" className="mt-4">
                <TabsList>
                  <TabsTrigger value="overview">Apercu</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Fonctionnalites</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedConnector.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-emerald-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Statistiques</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Note</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {selectedConnector.rating}/5
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Installations</span>
                          <span>{selectedConnector.installs}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Categorie</span>
                          <span className="capitalize">{selectedConnector.category}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="config">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Configuration disponible apres installation du connecteur.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="logs">
                  <Card>
                    <CardContent className="pt-6 font-mono text-xs">
                      <div className="space-y-1 text-muted-foreground">
                        <p>[2026-05-06 14:32:15] INFO: Sync started</p>
                        <p>[2026-05-06 14:32:16] INFO: 245 records fetched</p>
                        <p>[2026-05-06 14:32:18] INFO: Sync completed successfully</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedConnector(null)}>
                  Fermer
                </Button>
                {selectedConnector.status === "connected" ? (
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ouvrir le dashboard
                  </Button>
                ) : (
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Installer maintenant
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-80">
          <Card className="border-primary/30 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm">Assistant Integration</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 text-sm">
                <p className="font-medium text-primary">Suggestion d&apos;integration</p>
                <p className="mt-1 text-muted-foreground">
                  J&apos;ai detecte que vous utilisez Oracle Primavera pour le planning. 
                  L&apos;integration avec Cyperux permettrait une synchronisation automatique 
                  des taches et ressources. Voulez-vous configurer la connexion ?
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="gap-1">
                    <ArrowRight className="h-3 w-3" />
                    Configurer Oracle
                  </Button>
                  <Button size="sm" variant="outline">
                    Plus tard
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Poser une question..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="text-sm"
                />
                <Button size="icon" className="shrink-0">
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
