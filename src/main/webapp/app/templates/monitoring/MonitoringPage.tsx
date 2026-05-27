"use client"

import { useState, useEffect } from "react"
import { 
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  Database,
  Cloud,
  RefreshCw,
  X,
  Sparkles,
  Send,
  MessageSquare,
  Search,
  Filter,
  Terminal,
  Link2,
  MemoryStick,
  AlertCircle,
  Info,
  Bug
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const latencyData = [
  { time: "00:00", api: 22, db: 8, cdn: 12 },
  { time: "04:00", api: 24, db: 9, cdn: 11 },
  { time: "08:00", api: 28, db: 12, cdn: 14 },
  { time: "12:00", api: 32, db: 15, cdn: 16 },
  { time: "14:00", api: 85, db: 18, cdn: 22 },
  { time: "16:00", api: 26, db: 11, cdn: 13 },
  { time: "20:00", api: 24, db: 10, cdn: 12 },
  { time: "Now", api: 24, db: 9, cdn: 11 },
]

const cpuRamData = [
  { time: "00:00", cpu: 35, ram: 62 },
  { time: "04:00", cpu: 32, ram: 58 },
  { time: "08:00", cpu: 48, ram: 68 },
  { time: "12:00", cpu: 55, ram: 72 },
  { time: "14:00", cpu: 78, ram: 85 },
  { time: "16:00", cpu: 52, ram: 70 },
  { time: "20:00", cpu: 42, ram: 65 },
  { time: "Now", cpu: 45, ram: 67 },
]

const errorRateData = [
  { time: "00:00", errors: 0.008 },
  { time: "04:00", errors: 0.005 },
  { time: "08:00", errors: 0.012 },
  { time: "12:00", errors: 0.015 },
  { time: "14:00", errors: 0.045 },
  { time: "16:00", errors: 0.011 },
  { time: "20:00", errors: 0.009 },
  { time: "Now", errors: 0.01 },
]

const integrations = [
  { 
    name: "SAP S/4HANA", 
    status: "connected", 
    lastSync: "Il y a 2 min", 
    syncCount: 1248,
    version: "2023.2",
    endpoint: "sap.cyperux.io"
  },
  { 
    name: "Microsoft Project", 
    status: "connected", 
    lastSync: "Il y a 5 min", 
    syncCount: 892,
    version: "Online",
    endpoint: "project.microsoft.com"
  },
  { 
    name: "Oracle Primavera", 
    status: "connected", 
    lastSync: "Il y a 8 min", 
    syncCount: 456,
    version: "P6 21.12",
    endpoint: "primavera.cyperux.io"
  },
  { 
    name: "Autodesk BIM 360", 
    status: "degraded", 
    lastSync: "Il y a 45 min", 
    syncCount: 234,
    version: "2024",
    endpoint: "bim360.autodesk.com"
  },
  { 
    name: "Procore", 
    status: "connected", 
    lastSync: "Il y a 3 min", 
    syncCount: 678,
    version: "API v1.1",
    endpoint: "api.procore.com"
  },
  { 
    name: "Sage X3", 
    status: "disconnected", 
    lastSync: "Il y a 2h", 
    syncCount: 0,
    version: "V12",
    endpoint: "sage.cyperux.io"
  },
]

const logs = [
  { time: "14:32:15.234", level: "info", service: "api-gateway", message: "Pic de trafic detecte sur /api/documents - 2400 req/s" },
  { time: "14:32:15.456", level: "warn", service: "api-gateway", message: "Auto-scaling triggered: instances 3 -> 6" },
  { time: "14:32:16.789", level: "info", service: "load-balancer", message: "New instances registered: api-gw-4, api-gw-5, api-gw-6" },
  { time: "14:32:18.123", level: "info", service: "api-gateway", message: "Traffic normalized - latency back to 24ms" },
  { time: "14:30:45.567", level: "error", service: "sage-connector", message: "Connection timeout to sage.cyperux.io:443" },
  { time: "14:30:46.234", level: "warn", service: "sage-connector", message: "Retry attempt 1/3 failed" },
  { time: "14:30:48.890", level: "error", service: "sage-connector", message: "Max retries exceeded - marking integration as disconnected" },
  { time: "14:28:12.456", level: "info", service: "sap-sync", message: "Batch sync completed: 156 work orders synchronized" },
  { time: "14:25:33.789", level: "debug", service: "bim360-api", message: "Rate limit approaching: 850/1000 requests" },
  { time: "14:22:11.234", level: "info", service: "auth-service", message: "JWT token refresh for 45 active sessions" },
  { time: "14:18:45.567", level: "warn", service: "primavera-sync", message: "Schema mismatch detected - applying migration" },
  { time: "14:15:22.890", level: "info", service: "procore-webhook", message: "Received 12 change events from project Tour-Hekla" },
]

const globalNodes = [
  { city: "Paris", region: "eu-west-3", provider: "AWS", status: "active", load: 45, connections: 1240, instances: 6 },
  { city: "Frankfurt", region: "eu-central-1", provider: "AWS", status: "active", load: 38, connections: 890, instances: 4 },
  { city: "London", region: "europe-west2", provider: "GCP", status: "active", load: 32, connections: 720, instances: 3 },
  { city: "Amsterdam", region: "westeurope", provider: "Azure", status: "active", load: 28, connections: 560, instances: 2 },
  { city: "Dublin", region: "eu-west-1", provider: "AWS", status: "standby", load: 5, connections: 45, instances: 1 },
]

const services = [
  { name: "API Gateway", status: "operational", uptime: 99.98, latency: 24, region: "eu-west-3" },
  { name: "Auth Service", status: "operational", uptime: 99.99, latency: 18, region: "eu-west-3" },
  { name: "GED Service", status: "operational", uptime: 99.97, latency: 22, region: "eu-west-3" },
  { name: "BIM Engine", status: "operational", uptime: 99.95, latency: 45, region: "eu-central-1" },
  { name: "AI/ML Pipeline", status: "operational", uptime: 99.92, latency: 120, region: "eu-west-3" },
  { name: "Notification Hub", status: "operational", uptime: 99.99, latency: 8, region: "Global" },
  { name: "Database Primary", status: "operational", uptime: 99.97, latency: 9, region: "eu-west-3" },
  { name: "Redis Cache", status: "operational", uptime: 99.99, latency: 2, region: "eu-west-3" },
]

export default function MonitoringPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [logFilter, setLogFilter] = useState("all")
  const [logSearch, setLogSearch] = useState("")
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "Pic de trafic detecte sur l'API GED. J'ai automatiquement augmente les instances de calcul de 3 a 6. Tout est stable. Latence API normalisee a 24ms." }
  ])
  const [aiInput, setAiInput] = useState("")

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "J'ai analyse les metriques. Le pic de charge etait lie a une synchronisation massive de documents depuis Procore (12 projets). J'ai ajuste les quotas de rate limiting pour eviter les futurs pics. Voulez-vous voir le rapport detaille ?" }
    ])
    setAiInput("")
  }

  const filteredLogs = logs.filter(log => {
    const matchesFilter = logFilter === "all" || log.level === logFilter
    const matchesSearch = log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
                          log.service.toLowerCase().includes(logSearch.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const avgLatency = 24
  const errorRate = 0.01
  const cpuUsage = 45
  const ramUsage = 67

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Observabilite & Monitoring Systeme</h1>
          <p className="text-muted-foreground">Style Grafana/Datadog - Metriques temps reel</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
            Tous systemes operationnels
          </Badge>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Latence API</p>
                <p className="text-3xl font-bold text-emerald-400">{avgLatency}ms</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-emerald-400 mt-2">P99: 45ms | P95: 32ms</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux Erreur</p>
                <p className="text-3xl font-bold text-emerald-400">{errorRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Activity className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">12 erreurs / 120k req</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Moyen</p>
                <p className="text-3xl font-bold">{cpuUsage}%</p>
              </div>
              <Cpu className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={cpuUsage} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RAM Moyenne</p>
                <p className="text-3xl font-bold">{ramUsage}%</p>
              </div>
              <MemoryStick className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={ramUsage} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="logs">Logs Temps Reel</TabsTrigger>
          <TabsTrigger value="regions">Regions Multi-Cloud</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Latency Chart */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Latence par Service (24h)
                </CardTitle>
                <CardDescription>API, Database, CDN</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={latencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" unit="ms" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="api" stroke="#593196" fill="#59319620" strokeWidth={2} name="API" />
                      <Area type="monotone" dataKey="db" stroke="#10b981" fill="#10b98120" strokeWidth={2} name="Database" />
                      <Area type="monotone" dataKey="cdn" stroke="#f59e0b" fill="#f59e0b20" strokeWidth={2} name="CDN" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#593196]" />
                    <span>API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span>Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>CDN</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPU/RAM Chart */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Consommation CPU/RAM (24h)
                </CardTitle>
                <CardDescription>Ressources serveur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cpuRamData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" unit="%" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} name="CPU" dot={false} />
                      <Line type="monotone" dataKey="ram" stroke="#3b82f6" strokeWidth={2} name="RAM" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>CPU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span>RAM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Rate Chart */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Taux Erreur (24h)
                </CardTitle>
                <CardDescription>Pourcentage de requetes en erreur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={errorRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" unit="%" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                        labelStyle={{ color: "#fff" }}
                        formatter={(value: number) => [`${value}%`, "Taux erreur"]}
                      />
                      <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="#ef444420" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Services Status */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  Etat des Services
                </CardTitle>
                <CardDescription>8 microservices monitores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 grid-cols-2">
                  {services.map((service) => (
                    <div 
                      key={service.name} 
                      className="p-3 rounded-lg border bg-muted/30 border-border/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-xs">{service.name}</span>
                        <CheckCircle className="h-3 w-3 text-emerald-400" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{service.latency}ms</span>
                        <span>{service.uptime}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" />
                Status des Integrations
              </CardTitle>
              <CardDescription>Connecteurs ERP, Project Management & BIM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integration) => (
                  <div 
                    key={integration.name}
                    className={`p-4 rounded-lg border ${
                      integration.status === "connected" 
                        ? "bg-muted/30 border-border/50"
                        : integration.status === "degraded"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{integration.name}</span>
                      </div>
                      {integration.status === "connected" ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          Connecte
                        </Badge>
                      ) : integration.status === "degraded" ? (
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          Degrade
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Deconnecte
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Version</span>
                        <span>{integration.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Endpoint</span>
                        <span className="text-xs font-mono truncate max-w-32">{integration.endpoint}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Derniere sync</span>
                        <span>{integration.lastSync}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Operations/jour</span>
                        <span className="font-medium">{integration.syncCount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Tester
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Configurer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Logs en Temps Reel
                  </CardTitle>
                  <CardDescription>Filtrable par niveau et service</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher..." 
                      className="pl-9 w-48"
                      value={logSearch}
                      onChange={(e) => setLogSearch(e.target.value)}
                    />
                  </div>
                  <Select value={logFilter} onValueChange={setLogFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="error">Erreur</SelectItem>
                      <SelectItem value="warn">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 rounded-lg border border-border/50 bg-black/50 p-4 font-mono text-xs">
                {filteredLogs.map((log, i) => (
                  <div key={i} className="flex gap-3 py-1 hover:bg-white/5 px-2 rounded">
                    <span className="text-muted-foreground shrink-0">{log.time}</span>
                    <span className={`shrink-0 w-12 ${
                      log.level === "error" ? "text-red-400" :
                      log.level === "warn" ? "text-amber-400" :
                      log.level === "info" ? "text-blue-400" :
                      "text-gray-400"
                    }`}>
                      [{log.level.toUpperCase()}]
                    </span>
                    <span className="text-primary shrink-0">[{log.service}]</span>
                    <span className="text-foreground">{log.message}</span>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <span>Error: 2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>Warn: 3</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                    <span>Info: 6</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400" />
                    <span>Debug: 1</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Exporter Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regions Tab */}
        <TabsContent value="regions" className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Deploiement Multi-Cloud
              </CardTitle>
              <CardDescription>Infrastructure repartie AWS, GCP, Azure</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visual Map */}
              <div className="relative h-64 rounded-lg border border-border/50 bg-muted/20 mb-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    {/* Europe outline simplified */}
                    <path 
                      d="M350 120 L380 100 L420 110 L460 90 L500 100 L520 130 L540 120 L560 140 L550 180 L520 200 L480 190 L440 210 L400 200 L360 220 L320 200 L340 160 Z"
                      fill="none"
                      stroke="#593196"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                
                {/* Node Markers */}
                <div className="absolute" style={{ left: "42%", top: "45%" }}>
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-emerald-500 animate-ping absolute" />
                    <div className="h-4 w-4 rounded-full bg-emerald-500 relative z-10" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">Paris (AWS)</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: "50%", top: "35%" }}>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">Frankfurt (AWS)</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: "38%", top: "32%" }}>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">London (GCP)</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: "46%", top: "30%" }}>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-cyan-500" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">Amsterdam (Azure)</span>
                  </div>
                </div>
                <div className="absolute" style={{ left: "35%", top: "38%" }}>
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">Dublin (AWS)</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#FF9900]" />
                    <span>AWS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#4285F4]" />
                    <span>GCP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-[#00BCF2]" />
                    <span>Azure</span>
                  </div>
                </div>
              </div>

              {/* Nodes Table */}
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {globalNodes.map((node) => (
                  <div 
                    key={node.city} 
                    className="p-4 rounded-lg border bg-muted/30 border-border/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          node.status === "active" ? "bg-emerald-400" : "bg-amber-400"
                        }`} />
                        <span className="font-medium">{node.city}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          node.provider === "AWS" ? "border-orange-500/50 text-orange-400" :
                          node.provider === "GCP" ? "border-blue-500/50 text-blue-400" :
                          "border-cyan-500/50 text-cyan-400"
                        }`}
                      >
                        {node.provider}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region</span>
                        <span className="font-mono text-xs">{node.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Instances</span>
                        <span>{node.instances}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connexions</span>
                        <span>{node.connections.toLocaleString()}</span>
                      </div>
                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>Charge CPU</span>
                          <span>{node.load}%</span>
                        </div>
                        <Progress value={node.load} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Assistant */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-primary/30 bg-card shadow-2xl shadow-primary/10">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant DevOps IA</CardTitle>
                  <CardDescription className="text-xs">Auto-scaling & Monitoring</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 text-sm max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 pt-0 flex gap-2">
              <Input 
                placeholder="Question sur l'infra..." 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAI()}
                className="text-sm"
              />
              <Button size="icon" onClick={handleSendAI}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={() => setShowAIChat(true)}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
