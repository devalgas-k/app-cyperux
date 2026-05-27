"use client"

import { useState, useEffect } from "react"
import {
  Brain,
  Cpu,
  Database,
  MessageSquare,
  Cloud,
  Server,
  Zap,
  Search,
  FileText,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Send,
  Sparkles,
  TrendingUp,
  HardDrive,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Progress } from "@/shared/components/ui/progress"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

// Model data
const models = [
  {
    id: "ollama-llama3",
    name: "Ollama (Llama3-8B)",
    type: "Local",
    status: "ONLINE",
    latency: 45,
    requests: 1247,
    tokens: "2.4M",
    icon: Server,
  },
  {
    id: "claude-3.5",
    name: "Anthropic Claude 3.5",
    type: "Cloud",
    status: "STANDBY",
    latency: 120,
    requests: 103,
    tokens: "156K",
    icon: Cloud,
  },
]

// RAG sources
const ragSources = [
  { name: "Plans Architecturaux", count: 450, type: "PDF" },
  { name: "CCTP (Cahier des Charges)", count: 380, type: "PDF" },
  { name: "DTU (Documents Techniques)", count: 320, type: "PDF" },
  { name: "Normes RE2020", count: 180, type: "PDF" },
  { name: "Procès-verbaux", count: 120, type: "DOC" },
]

// Recent queries
const recentQueries = [
  {
    id: 1,
    query: "Quel est le temps de séchage requis pour le béton C25/30 en hiver ?",
    source: "CCTP Lot 03 - Page 42",
    model: "Local",
    latency: 42,
    timestamp: "Il y a 2 min",
  },
  {
    id: 2,
    query: "Quelles sont les exigences de ventilation pour les locaux techniques ?",
    source: "DTU 68.3 - Section 4.2",
    model: "Local",
    latency: 38,
    timestamp: "Il y a 15 min",
  },
  {
    id: 3,
    query: "Comment calculer l'inertie thermique selon RE2020 ?",
    source: "Guide RE2020 - Chapitre 7",
    model: "Cloud",
    latency: 145,
    timestamp: "Il y a 1h",
  },
  {
    id: 4,
    query: "Dimensions minimales des gaines techniques ?",
    source: "Plans Archi - A-102",
    model: "Local",
    latency: 35,
    timestamp: "Il y a 2h",
  },
]

// Fallback logs
const fallbackLogs = [
  {
    time: "14:32:18",
    reason: "Raisonnement complexe multi-étapes",
    query: "Analyse comparative RE2020...",
    model: "Claude 3.5",
    duration: "2.4s",
  },
  {
    time: "11:15:42",
    reason: "Contexte dépassant 8K tokens",
    query: "Synthèse complète du CCTP...",
    model: "Claude 3.5",
    duration: "3.1s",
  },
  {
    time: "09:28:55",
    reason: "Génération de document structuré",
    query: "Créer un rapport HSE...",
    model: "Claude 3.5",
    duration: "4.2s",
  },
]

export default function AIConsolePage() {
  const [latencyPulse, setLatencyPulse] = useState(45)
  const [vectorCount, setVectorCount] = useState(1450)
  const [queryInput, setQueryInput] = useState("")
  const [isQuerying, setIsQuerying] = useState(false)

  // Simulate latency fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyPulse(prev => {
        const delta = (Math.random() - 0.5) * 10
        return Math.max(35, Math.min(55, prev + delta))
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleQuery = () => {
    if (!queryInput.trim()) return
    setIsQuerying(true)
    setTimeout(() => {
      setIsQuerying(false)
      setQueryInput("")
    }, 1500)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Console IA</h1>
          <p className="text-muted-foreground">
            Gestion des modèles, RAG et routage hybride
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 border-primary/50 text-primary">
            <Activity className="h-3 w-3" />
            Système Actif
          </Badge>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Synchroniser
          </Button>
        </div>
      </div>

      {/* Model Status Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`relative overflow-hidden ${
              model.status === "ONLINE"
                ? "border-primary/30 bg-primary/5"
                : "border-muted"
            }`}
          >
            {model.status === "ONLINE" && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />
            )}
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      model.status === "ONLINE"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <model.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <CardDescription>{model.type}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={model.status === "ONLINE" ? "default" : "secondary"}
                  className={`${
                    model.status === "ONLINE"
                      ? "animate-pulse bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                      : ""
                  }`}
                >
                  <span
                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      model.status === "ONLINE" ? "bg-emerald-400" : "bg-muted-foreground"
                    }`}
                  />
                  {model.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Latence</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {model.status === "ONLINE" ? Math.round(latencyPulse) : model.latency}
                    <span className="text-xs text-muted-foreground">ms</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Requêtes (24h)</p>
                  <p className="text-lg font-semibold tabular-nums">{model.requests}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tokens</p>
                  <p className="text-lg font-semibold tabular-nums">{model.tokens}</p>
                </div>
              </div>
              {model.status === "ONLINE" && (
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Charge GPU</span>
                    <span className="text-primary">67%</span>
                  </div>
                  <Progress value={67} className="h-1.5" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* RAG Context Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Base de Connaissances RAG</CardTitle>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {vectorCount.toLocaleString()} vecteurs
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vector Index Stats */}
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <div className="mb-2 flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Index Vectoriel</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Dimension</p>
                  <p className="font-mono text-sm">1536</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Modèle</p>
                  <p className="font-mono text-sm">text-embedding-3</p>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Sources Indexées</p>
              {ragSources.map((source) => (
                <div
                  key={source.name}
                  className="flex items-center justify-between rounded-md border border-border/50 bg-background px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{source.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {source.type}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {source.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Last Sync */}
            <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Dernière synchro</span>
              </div>
              <span className="text-xs text-muted-foreground">Il y a 12 min</span>
            </div>
          </CardContent>
        </Card>

        {/* Query Interface & Logs */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Interface de Requête RAG</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Query Input - Hero Style */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary group-focus-within:animate-pulse" />
                    </div>
                    <Input
                      placeholder="Posez une question sur vos documents BTP..."
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                      className="pl-12 pr-4 h-14 text-base bg-background border-2 border-primary/30 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl placeholder:text-muted-foreground/70 placeholder:font-medium transition-all duration-200"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleQuery}
                  disabled={isQuerying || !queryInput.trim()}
                  size="lg"
                  className="h-14 px-6 gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/30 rounded-xl transition-all duration-200"
                >
                  {isQuerying ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="font-medium">Envoyer</span>
                </Button>
              </div>
              {/* Suggestions contextuelles */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">Essayez :</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Temps de sechage beton C25/30",
                    "Exigences ventilation RE2020",
                    "Dimensions gaines techniques"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQueryInput(suggestion)}
                      className="px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors flex items-center gap-1.5"
                    >
                      <ArrowRight className="h-3 w-3" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Query Highlight */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Dernière Requête</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {recentQueries[0].timestamp}
                </Badge>
              </div>
              <p className="mb-3 text-sm italic text-foreground/90">
                &quot;{recentQueries[0].query}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-md bg-background/50 px-2 py-1">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">{recentQueries[0].source}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="h-3 w-3 text-emerald-500" />
                  {recentQueries[0].latency}ms
                </div>
                <Badge variant="secondary" className="text-xs">
                  {recentQueries[0].model}
                </Badge>
              </div>
            </div>

            {/* Query History */}
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Historique des Requêtes
              </p>
              <ScrollArea className="h-[180px]">
                <div className="space-y-2">
                  {recentQueries.slice(1).map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between rounded-md border border-border/50 bg-muted/20 px-3 py-2"
                    >
                      <div className="flex-1 truncate pr-4">
                        <p className="truncate text-sm">{q.query}</p>
                        <p className="text-xs text-muted-foreground">{q.source}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={q.model === "Local" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {q.model}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">
                          {q.latency}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hybrid Fallback Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Routage Hybride (Dernières 24h)</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm">Local: 92%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm">Cloud Fallback: 8%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="distribution" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="logs">Journal Fallback</TabsTrigger>
            </TabsList>

            <TabsContent value="distribution" className="space-y-4">
              {/* Distribution Bar */}
              <div className="space-y-2">
                <div className="flex h-8 overflow-hidden rounded-lg">
                  <div
                    className="flex items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
                    style={{ width: "92%" }}
                  >
                    Ollama Local (92%)
                  </div>
                  <div
                    className="flex items-center justify-center bg-amber-500 text-xs font-medium text-amber-950"
                    style={{ width: "8%" }}
                  >
                    8%
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Requêtes Locales</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold tabular-nums">1,247</p>
                </div>
                <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-muted-foreground">Fallback Cloud</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold tabular-nums">103</p>
                </div>
                <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs text-muted-foreground">Latence Moy.</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold tabular-nums">
                    52<span className="text-sm text-muted-foreground">ms</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Tokens Traités</span>
                  </div>
                  <p className="mt-1 text-2xl font-bold tabular-nums">2.6M</p>
                </div>
              </div>

              {/* Fallback Reasons */}
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">
                    Raisons de Fallback les Plus Fréquentes
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Raisonnement complexe multi-étapes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contexte dépassant 8K tokens</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Génération de documents structurés</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logs">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Heure</TableHead>
                    <TableHead>Raison du Fallback</TableHead>
                    <TableHead>Requête</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead className="text-right">Durée</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fallbackLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{log.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm">
                        {log.query}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Cloud className="h-3 w-3 text-amber-500" />
                          <span className="text-sm">{log.model}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {log.duration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Architecture Diagram */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Architecture du Système IA</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-4 py-6">
            {/* User Query */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-primary/50 bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <span className="text-xs font-medium">Requête</span>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            {/* RAG Engine */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10">
                <Database className="h-8 w-8 text-emerald-500" />
              </div>
              <span className="text-xs font-medium">RAG Engine</span>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            {/* Router */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-amber-500/50 bg-amber-500/10">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <span className="text-xs font-medium">Routeur</span>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            {/* Models */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-primary bg-primary/20">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xs font-medium">Ollama Local</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20">
                  92%
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-muted bg-muted/20">
                  <Cloud className="h-8 w-8 text-muted-foreground" />
                </div>
                <span className="text-xs font-medium">Claude 3.5</span>
                <Badge variant="secondary">8%</Badge>
              </div>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            {/* Response */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-primary/50 bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <span className="text-xs font-medium">Réponse</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
