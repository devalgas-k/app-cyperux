"use client"

import { useState } from "react"
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Image,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Database,
  X,
  Sparkles,
  Send,
  Trash2,
  Signal,
  SignalZero,
  ClipboardList,
  HardDrive,
  CloudOff,
  Cloud,
  Zap,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
// import { useLanguage } from "@/lib/i18n"

const syncQueue = [
  { id: "1", type: "photo", name: "IMG_20260506_143025.jpg", size: "2.4 MB", status: "pending", createdAt: "14:30", project: "Tour Hekla", zone: "R+5" },
  { id: "2", type: "photo", name: "IMG_20260506_143102.jpg", size: "1.8 MB", status: "pending", createdAt: "14:31", project: "Tour Hekla", zone: "R+5" },
  { id: "3", type: "photo", name: "IMG_20260506_144512.jpg", size: "2.1 MB", status: "pending", createdAt: "14:45", project: "Tour Hekla", zone: "R+4" },
  { id: "4", type: "report", name: "Rapport_HSE_06052026.pdf", size: "450 KB", status: "pending", createdAt: "15:00", project: "Tour Hekla", zone: "-" },
  { id: "5", type: "photo", name: "IMG_20260506_150230.jpg", size: "1.9 MB", status: "pending", createdAt: "15:02", project: "Eco-Quartier", zone: "Lot B" },
  { id: "6", type: "task", name: "Tache: Verifier coffrage P22", size: "-", status: "pending", createdAt: "15:05", project: "Tour Hekla", zone: "R+3" },
  { id: "7", type: "report", name: "Situation_Travaux_S19.xlsx", size: "820 KB", status: "pending", createdAt: "15:15", project: "Eco-Quartier", zone: "-" },
  { id: "8", type: "photo", name: "IMG_20260506_151045.jpg", size: "2.2 MB", status: "pending", createdAt: "15:10", project: "Tour Hekla", zone: "R+5" },
  { id: "9", type: "photo", name: "IMG_20260506_151230.jpg", size: "1.7 MB", status: "pending", createdAt: "15:12", project: "Tour Hekla", zone: "R+5" },
  { id: "10", type: "task", name: "Tache: Reception beton C25/30", size: "-", status: "pending", createdAt: "15:18", project: "Tour Hekla", zone: "R+3" },
  { id: "11", type: "photo", name: "IMG_20260506_152015.jpg", size: "2.0 MB", status: "pending", createdAt: "15:20", project: "Eco-Quartier", zone: "Lot A" },
  { id: "12", type: "photo", name: "IMG_20260506_152130.jpg", size: "1.6 MB", status: "pending", createdAt: "15:21", project: "Eco-Quartier", zone: "Lot A" },
  { id: "13", type: "photo", name: "IMG_20260506_153045.jpg", size: "2.3 MB", status: "pending", createdAt: "15:30", project: "Tour Hekla", zone: "R+4" },
  { id: "14", type: "photo", name: "IMG_20260506_153215.jpg", size: "1.5 MB", status: "pending", createdAt: "15:32", project: "Tour Hekla", zone: "R+4" },
  { id: "15", type: "task", name: "Tache: Signaler alea fissure", size: "-", status: "pending", createdAt: "15:40", project: "Tour Hekla", zone: "R+2" },
  { id: "16", type: "report", name: "PV_Reception_Beton.pdf", size: "380 KB", status: "pending", createdAt: "15:45", project: "Tour Hekla", zone: "-" },
  { id: "17", type: "photo", name: "IMG_20260506_154530.jpg", size: "2.1 MB", status: "pending", createdAt: "15:45", project: "Eco-Quartier", zone: "Lot B" },
  { id: "18", type: "photo", name: "IMG_20260506_155012.jpg", size: "1.9 MB", status: "pending", createdAt: "15:50", project: "Tour Hekla", zone: "R+5" },
]

const cachedData = [
  { name: "Projets actifs", items: 3, size: "2.4 MB", lastSync: "Il y a 2h", critical: true, progress: 100 },
  { name: "Plans 2D (PDF)", items: 45, size: "124 MB", lastSync: "Il y a 1h", critical: true, progress: 100 },
  { name: "Modeles BIM (IFC)", items: 12, size: "890 MB", lastSync: "Il y a 4h", critical: true, progress: 100 },
  { name: "Contacts & Equipes", items: 156, size: "1.2 MB", lastSync: "Il y a 30min", critical: true, progress: 100 },
  { name: "Formulaires HSE", items: 8, size: "4.5 MB", lastSync: "Il y a 2h", critical: true, progress: 100 },
  { name: "CCTP & DTU", items: 24, size: "89 MB", lastSync: "Il y a 6h", critical: false, progress: 85 },
  { name: "Historique photos", items: 1240, size: "2.8 GB", lastSync: "Il y a 12h", critical: false, progress: 45 },
]

export default function OfflineModePage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [isOffline, setIsOffline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [autoSync, setAutoSync] = useState(true)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const photoCount = syncQueue.filter((item) => item.type === "photo").length
  const reportCount = syncQueue.filter((item) => item.type === "report").length
  const taskCount = syncQueue.filter((item) => item.type === "task").length
  const totalSize = syncQueue.reduce((sum, item) => {
    if (item.size === "-") return sum
    const size = parseFloat(item.size)
    return sum + (item.size.includes("MB") ? size : size / 1024)
  }, 0)

  const filteredQueue = selectedFilter === "all" 
    ? syncQueue 
    : syncQueue.filter(item => item.type === selectedFilter)

  const handleSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          setIsOffline(false)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <img className="h-4 w-4 text-blue-400" />
      case "report":
        return <FileText className="h-4 w-4 text-purple-400" />
      case "task":
        return <ClipboardList className="h-4 w-4 text-amber-400" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const criticalDataProgress = cachedData.filter(d => d.critical).reduce((sum, d) => sum + d.progress, 0) / cachedData.filter(d => d.critical).length

  return (
    <div className="flex flex-col gap-6">
      {/* Massive Connection Status Indicator */}
      <div className="relative overflow-hidden rounded-2xl border-2 p-8"
        style={{
          borderColor: isOffline ? "rgba(245, 158, 11, 0.5)" : "rgba(16, 185, 129, 0.5)",
          background: isOffline 
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)"
        }}
      >
        {/* Animated background pulse */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: isOffline
              ? "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.3) 0%, transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite"
          }}
        />
        
        <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-6">
            {/* Large Icon */}
            <div className={`flex h-24 w-24 items-center justify-center rounded-full ${
              isOffline ? "bg-amber-500/20" : "bg-emerald-500/20"
            }`}>
              {isOffline ? (
                <WifiOff className="h-12 w-12 text-amber-400" />
              ) : (
                <Wifi className="h-12 w-12 text-emerald-400" />
              )}
            </div>
            
            {/* Status Text */}
            <div>
              <h2 className={`text-3xl font-bold ${isOffline ? "text-amber-400" : "text-emerald-400"}`}>
                {isOffline ? "MODE HORS-LIGNE" : "CONNECTE"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isOffline 
                  ? "Vos donnees sont sauvegardees localement"
                  : "Synchronisation en temps reel active"
                }
              </p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {isOffline ? (
                    <SignalZero className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Signal className="h-4 w-4 text-emerald-400" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isOffline ? "Aucun reseau" : "Wi-Fi Chantier"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {isOffline ? (
                    <CloudOff className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Cloud className="h-4 w-4 text-emerald-400" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isOffline ? "Cloud inaccessible" : "Cloud sync OK"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Force Sync Button */}
          <div className="flex flex-col items-center gap-2">
            <Button
              size="lg"
              onClick={handleSync}
              disabled={isSyncing}
              className={`h-16 gap-3 px-8 text-lg font-semibold ${
                isOffline 
                  ? "bg-amber-500 hover:bg-amber-600 text-black" 
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  Synchronisation...
                </>
              ) : (
                <>
                  <Zap className="h-6 w-6" />
                  Forcer la Synchronisation
                </>
              )}
            </Button>
            <span className="text-xs text-muted-foreground">
              {isOffline ? "Disponible des le retour reseau" : "Derniere sync: il y a 2 min"}
            </span>
          </div>
        </div>

        {/* Sync Progress Bar */}
        {isSyncing && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Synchronisation en cours...</span>
              <span className="font-mono">{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Upload: {Math.round(syncProgress / 100 * syncQueue.length)}/{syncQueue.length} elements
            </p>
          </div>
        )}
      </div>

      {/* Offline Alert */}
      {isOffline && (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertTitle className="text-amber-400">Travail hors-ligne actif</AlertTitle>
          <AlertDescription className="text-amber-400/80">
            Toutes vos modifications sont sauvegardees localement. 
            {syncQueue.length} elements ({totalSize.toFixed(1)} MB) seront synchronises automatiquement 
            des que la connexion sera retablie.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">File d&apos;attente</p>
                <p className="text-3xl font-bold">{syncQueue.length}</p>
                <p className="text-xs text-muted-foreground">elements</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Photos</p>
                <p className="text-3xl font-bold text-blue-400">{photoCount}</p>
                <p className="text-xs text-muted-foreground">en attente</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <img className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rapports</p>
                <p className="text-3xl font-bold text-purple-400">{reportCount}</p>
                <p className="text-xs text-muted-foreground">en attente</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taches</p>
                <p className="text-3xl font-bold text-amber-400">{taskCount}</p>
                <p className="text-xs text-muted-foreground">en attente</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <ClipboardList className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taille totale</p>
                <p className="text-3xl font-bold">{totalSize.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">MB a sync</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Upload className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sync Queue (Outbox) */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    File de Synchronisation (Outbox)
                  </CardTitle>
                  <CardDescription>{syncQueue.length} elements crees localement en attente d&apos;envoi</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Vider
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filter Tabs */}
              <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="mb-4">
                <TabsList>
                  <TabsTrigger value="all" className="gap-1">
                    Tout ({syncQueue.length})
                  </TabsTrigger>
                  <TabsTrigger value="photo" className="gap-1">
                    <img className="h-3 w-3" />
                    Photos ({photoCount})
                  </TabsTrigger>
                  <TabsTrigger value="report" className="gap-1">
                    <FileText className="h-3 w-3" />
                    Rapports ({reportCount})
                  </TabsTrigger>
                  <TabsTrigger value="task" className="gap-1">
                    <ClipboardList className="h-3 w-3" />
                    Taches ({taskCount})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="max-h-[400px] overflow-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Type</TableHead>
                      <TableHead>Element</TableHead>
                      <TableHead>Projet</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Taille</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQueue.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{getTypeIcon(item.type)}</TableCell>
                        <TableCell className="font-mono text-xs max-w-[200px] truncate">{item.name}</TableCell>
                        <TableCell className="text-sm">{item.project}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.zone}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.size}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.createdAt}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-400 border-amber-500/30">
                            <Clock className="h-3 w-3" />
                            En attente
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Local Storage Gauge */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary" />
                Stockage Local
              </CardTitle>
              <CardDescription>Donnees critiques pre-chargees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Storage Gauge */}
              <div className="relative pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Espace utilise</span>
                  <span className="text-sm font-mono">1.12 GB / 2 GB</span>
                </div>
                <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                    style={{ width: "56%" }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0 GB</span>
                  <span>56% utilise</span>
                  <span>2 GB</span>
                </div>
              </div>

              {/* Critical Data Progress */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-400">Donnees critiques</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    100% pret
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              {/* Cached Data List */}
              <div className="space-y-2 max-h-[250px] overflow-auto">
                {cachedData.map((data, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border p-2">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-6 w-6 items-center justify-center rounded ${
                        data.critical ? "bg-emerald-500/20" : "bg-muted"
                      }`}>
                        <Database className={`h-3 w-3 ${data.critical ? "text-emerald-400" : ""}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{data.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {data.items} el. - {data.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {data.progress === 100 ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{data.progress}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Parametres Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sync automatique</Label>
                  <p className="text-xs text-muted-foreground">Des retour reseau</p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Wi-Fi uniquement</Label>
                  <p className="text-xs text-muted-foreground">Economie data</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compression photos</Label>
                  <p className="text-xs text-muted-foreground">Reduire taille</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Derniere sync</span>
                  <span className="font-mono">06/05 12:30</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Version cache</span>
                  <span className="font-mono">v2.4.1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat - Specific US-405 Message */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <Card className="border-primary/30 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 relative">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-sm">Assistant Sync</CardTitle>
                    <p className="text-xs text-muted-foreground">Mode hors-ligne</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <div className="flex items-start gap-2">
                  <WifiOff className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-400">Sauvegarde locale active</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Vous etes hors-ligne. J&apos;ai sauvegarde vos <span className="font-semibold text-foreground">12 dernieres photos</span> ainsi que 
                      <span className="font-semibold text-foreground"> 3 rapports</span> et <span className="font-semibold text-foreground">3 taches</span>. 
                      Elles seront synchronisees des que vous retrouverez du reseau.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="outline" className="gap-1">
                        <img className="h-3 w-3 text-blue-400" />
                        12 photos
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <FileText className="h-3 w-3 text-purple-400" />
                        3 rapports
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <ClipboardList className="h-3 w-3 text-amber-400" />
                        3 taches
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Conseil:</span> Les donnees critiques 
                  (plans, contacts, formulaires) sont deja pre-chargees et disponibles hors-ligne.
                </p>
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

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
