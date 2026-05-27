"use client"

import { useState } from "react"
import { toast } from "sonner"
import { 
  Leaf,
  TrendingDown,
  Target,
  FileText,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Droplets,
  Recycle,
  Factory,
  Users,
  Shield,
  X,
  Sparkles,
  Send,
  MessageSquare,
  ArrowDown,
  ArrowUp,
  GraduationCap,
  Heart,
  Scale,
  FileCode,
  Printer
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Input } from "@/shared/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts"

// Net Zero trajectory data
const netZeroData = [
  { year: "2020", actual: 2800, target: 2800, gap: 0 },
  { year: "2021", actual: 2650, target: 2520, gap: 130 },
  { year: "2022", actual: 2450, target: 2268, gap: 182 },
  { year: "2023", actual: 2280, target: 2041, gap: 239 },
  { year: "2024", actual: 2100, target: 1837, gap: 263 },
  { year: "2025", actual: 1950, target: 1653, gap: 297 },
  { year: "2026", actual: 1820, target: 1488, gap: 332 },
  { year: "2027", actual: null, target: 1339, gap: null },
  { year: "2028", actual: null, target: 1205, gap: null },
  { year: "2029", actual: null, target: 1085, gap: null },
  { year: "2030", actual: null, target: 976, gap: null },
]

// Monthly emissions data
const emissionsMonthly = [
  { month: "Jan", scope1: 85, scope2: 52, scope3: 220 },
  { month: "Fev", scope1: 92, scope2: 48, scope3: 195 },
  { month: "Mar", scope1: 78, scope2: 55, scope3: 240 },
  { month: "Avr", scope1: 88, scope2: 50, scope3: 210 },
  { month: "Mai", scope1: 75, scope2: 45, scope3: 185 },
  { month: "Juin", scope1: 82, scope2: 47, scope3: 195 },
]

// ESRS Environmental metrics
const esrsMetrics = {
  E1: {
    name: "Changement Climatique",
    score: 72,
    status: "on_track",
    metrics: [
      { name: "Emissions Scope 1", value: "450 tCO2e", trend: -12, description: "Direct" },
      { name: "Emissions Scope 2", value: "280 tCO2e", trend: -8, description: "Electricite" },
      { name: "Emissions Scope 3", value: "1,200 tCO2e", trend: -5, description: "Chaine valeur" },
    ]
  },
  E2: {
    name: "Pollution",
    score: 85,
    status: "on_track",
    metrics: [
      { name: "Emissions NOx", value: "2.4 t", trend: -15 },
      { name: "Particules fines", value: "0.8 t", trend: -20 },
      { name: "COV", value: "1.2 t", trend: -10 },
    ]
  },
  E3: {
    name: "Eau & Ressources Marines",
    score: 68,
    status: "warning",
    metrics: [
      { name: "Consommation eau", value: "12,500 m3", trend: -3 },
      { name: "Eau recyclee", value: "45%", trend: +8 },
      { name: "Rejets traites", value: "98%", trend: +2 },
    ]
  },
  E4: {
    name: "Biodiversite",
    score: 78,
    status: "on_track",
    metrics: [
      { name: "Surface vegetalisee", value: "2,400 m2", trend: +25 },
      { name: "Especes protegees", value: "0 impact", trend: 0 },
      { name: "Corridors ecologiques", value: "3 crees", trend: +50 },
    ]
  },
  E5: {
    name: "Economie Circulaire",
    score: 82,
    status: "on_track",
    metrics: [
      { name: "Taux valorisation", value: "78%", trend: +12 },
      { name: "Materiaux recycles", value: "35%", trend: +8 },
      { name: "Dechets dangereux", value: "2.1 t", trend: -18 },
    ]
  },
}

// Social indicators
const socialMetrics = [
  { 
    id: "tf",
    name: "Taux de Frequence Accidents",
    value: 3.2,
    unit: "",
    target: 5.0,
    trend: -28,
    status: "good",
    description: "Accidents avec arret / million heures"
  },
  { 
    id: "equality",
    name: "Index Egalite H/F",
    value: 87,
    unit: "/100",
    target: 85,
    trend: +5,
    status: "good",
    description: "Obligation legale: 75 minimum"
  },
  { 
    id: "training",
    name: "Heures de Formation",
    value: 24.5,
    unit: "h/salarie",
    target: 20,
    trend: +12,
    status: "good",
    description: "Moyenne annuelle par collaborateur"
  },
  { 
    id: "turnover",
    name: "Taux de Rotation",
    value: 8.2,
    unit: "%",
    target: 10,
    trend: -15,
    status: "good",
    description: "Turnover volontaire"
  },
]

export default function CSRDPage() {
  const [showAIChat, setShowAIChat] = useState(true)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [exportSections, setExportSections] = useState({
    environmental: true,
    social: true,
    governance: true,
    annexes: false,
  })
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "J'ai prepare les commentaires explicatifs pour la section 'Economie Circulaire' bases sur vos bons de valorisation de dechets. Le taux de 78% depasse l'objectif AGEC de 70%. Voulez-vous que j'integre ces donnees au rapport CSRD ?" }
  ])
  const [aiInput, setAiInput] = useState("")

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "J'ai analyse votre demande. Les commentaires pour la section Economie Circulaire mentionnent: 'Le projet Tour Hekla a valorise 78% de ses dechets de chantier, dont 85% du beton de demolition et 92% des metaux. Cette performance contribue a l'objectif groupe de 80% d'ici 2027.'" }
    ])
    setAiInput("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">En bonne voie</Badge>
      case "warning":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Attention</Badge>
      case "critical":
        return <Badge variant="destructive">Critique</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const overallScore = Math.round(Object.values(esrsMetrics).reduce((acc, m) => acc + m.score, 0) / 5)
  const currentGap = netZeroData.find(d => d.year === "2026")?.gap || 0

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reporting CSRD & ESG</h1>
          <p className="text-muted-foreground">Conformite ESRS - Directive europeenne durabilite</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Periode: 2026
          </Button>
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Exporter Rapport CSRD
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Exporter le Rapport CSRD</DialogTitle>
                <DialogDescription>
                  Generez votre rapport de conformite au format souhaite
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Format d&apos;export</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <div className="flex items-center gap-2">
                          <Printer className="h-4 w-4" />
                          PDF - Document imprimable
                        </div>
                      </SelectItem>
                      <SelectItem value="xbrl">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-4 w-4" />
                          XBRL - Format reglementaire EU
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Excel - Donnees brutes
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Sections a inclure</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="env" 
                        checked={exportSections.environmental}
                        onCheckedChange={(checked) => 
                          setExportSections(prev => ({ ...prev, environmental: !!checked }))
                        }
                      />
                      <label htmlFor="env" className="text-sm">ESRS E1-E5 (Environnement)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="social" 
                        checked={exportSections.social}
                        onCheckedChange={(checked) => 
                          setExportSections(prev => ({ ...prev, social: !!checked }))
                        }
                      />
                      <label htmlFor="social" className="text-sm">ESRS S1-S4 (Social)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="gov" 
                        checked={exportSections.governance}
                        onCheckedChange={(checked) => 
                          setExportSections(prev => ({ ...prev, governance: !!checked }))
                        }
                      />
                      <label htmlFor="gov" className="text-sm">ESRS G1 (Gouvernance)</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="annexes" 
                        checked={exportSections.annexes}
                        onCheckedChange={(checked) => 
                          setExportSections(prev => ({ ...prev, annexes: !!checked }))
                        }
                      />
                      <label htmlFor="annexes" className="text-sm">Annexes et preuves</label>
                    </div>
                  </div>
                </div>
                {exportFormat === "xbrl" && (
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3">
                    <p className="text-sm text-blue-400">
                      Le format XBRL est conforme aux exigences de l&apos;EFRAG pour le depot reglementaire aupres de l&apos;AMF.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowExportDialog(false)}>
                  Annuler
                </Button>
                <Button className="flex-1 gap-2" onClick={() => setShowExportDialog(false)}>
                  <Download className="h-4 w-4" />
                  Generer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Environmental Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consommation Eau</p>
                <p className="text-2xl font-bold">12,500 m3</p>
                <div className="flex items-center gap-1 mt-1 text-emerald-400 text-sm">
                  <ArrowDown className="h-3 w-3" />
                  <span>-3% vs N-1</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <Droplets className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Materiaux Recycles</p>
                <p className="text-2xl font-bold">35%</p>
                <div className="flex items-center gap-1 mt-1 text-blue-400 text-sm">
                  <ArrowUp className="h-3 w-3" />
                  <span>+8% vs N-1</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <Recycle className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emissions Totales</p>
                <p className="text-2xl font-bold">1,930 tCO2e</p>
                <p className="text-xs text-muted-foreground mt-1">
                  S1: 450 | S2: 280 | S3: 1,200
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                <Factory className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score ESG Global</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-primary">{overallScore}</p>
                  <span className="text-muted-foreground">/100</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-emerald-400 text-sm">
                  <ArrowUp className="h-3 w-3" />
                  <span>+8 pts vs 2025</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Zero Gap Chart */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-emerald-400" />
                Trajectoire Net Zero 2030
              </CardTitle>
              <CardDescription>Ecart par rapport a l&apos;objectif Science-Based Target</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Ecart actuel</p>
              <p className="text-2xl font-bold text-amber-400">+{currentGap} tCO2e</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netZeroData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <ReferenceLine y={976} stroke="#10b981" strokeDasharray="5 5" label={{ value: "Objectif 2030", fill: "#10b981", fontSize: 12 }} />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  fill="#10b98120"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Trajectoire Net Zero"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#f59e0b" 
                  fill="#f59e0b20"
                  strokeWidth={3}
                  name="Emissions Reelles"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scope 1/2/3 Breakdown */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Repartition Emissions Scope 1 / 2 / 3
          </CardTitle>
          <CardDescription>Evolution mensuelle par perimetre d&apos;emission</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionsMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="scope1" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef444440"
                  name="Scope 1 (Direct)"
                />
                <Area 
                  type="monotone" 
                  dataKey="scope2" 
                  stackId="1"
                  stroke="#f59e0b" 
                  fill="#f59e0b40"
                  name="Scope 2 (Energie)"
                />
                <Area 
                  type="monotone" 
                  dataKey="scope3" 
                  stackId="1"
                  stroke="#6366f1" 
                  fill="#6366f140"
                  name="Scope 3 (Chaine valeur)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Social Section */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Indicateurs Sociaux (ESRS S1-S4)
          </CardTitle>
          <CardDescription>Performance sociale et conditions de travail</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {socialMetrics.map((metric) => (
              <Card key={metric.id} className="border-border/50 bg-background/50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                      {metric.id === "tf" && <Shield className="h-5 w-5 text-blue-400" />}
                      {metric.id === "equality" && <Scale className="h-5 w-5 text-blue-400" />}
                      {metric.id === "training" && <GraduationCap className="h-5 w-5 text-blue-400" />}
                      {metric.id === "turnover" && <Heart className="h-5 w-5 text-blue-400" />}
                    </div>
                    <Badge className={
                      metric.status === "good" 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    }>
                      {metric.trend > 0 ? "+" : ""}{metric.trend}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Objectif: {metric.target}{metric.unit}</span>
                      <span className="text-emerald-400">Atteint</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-1.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ESRS Environmental Tabs */}
      <Tabs defaultValue="E1" className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="E1" className="gap-1"><Factory className="h-4 w-4" />E1</TabsTrigger>
          <TabsTrigger value="E2" className="gap-1"><AlertTriangle className="h-4 w-4" />E2</TabsTrigger>
          <TabsTrigger value="E3" className="gap-1"><Droplets className="h-4 w-4" />E3</TabsTrigger>
          <TabsTrigger value="E4" className="gap-1"><Leaf className="h-4 w-4" />E4</TabsTrigger>
          <TabsTrigger value="E5" className="gap-1"><Recycle className="h-4 w-4" />E5</TabsTrigger>
        </TabsList>

        {Object.entries(esrsMetrics).map(([key, metric]) => (
          <TabsContent key={key} value={key}>
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>ESRS {key} - {metric.name}</CardTitle>
                    <CardDescription>Indicateurs de performance environnementale</CardDescription>
                  </div>
                  {getStatusBadge(metric.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Card className="border-border/50">
                    <CardContent className="pt-6 text-center">
                      <p className="text-4xl font-bold" style={{ color: metric.score >= 75 ? "#10b981" : metric.score >= 50 ? "#f59e0b" : "#ef4444" }}>
                        {metric.score}
                      </p>
                      <p className="text-sm text-muted-foreground">Score /100</p>
                      <Progress value={metric.score} className="mt-2" />
                    </CardContent>
                  </Card>

                  {metric.metrics.map((m, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground">{m.name}</p>
                        <p className="text-2xl font-bold mt-1">{m.value}</p>
                        <div className={`flex items-center gap-1 mt-2 text-sm ${
                          m.trend < 0 ? "text-emerald-400" : m.trend > 0 ? "text-amber-400" : "text-muted-foreground"
                        }`}>
                          {m.trend < 0 ? <ArrowDown className="h-3 w-3" /> : m.trend > 0 ? <ArrowUp className="h-3 w-3" /> : null}
                          <span>{m.trend > 0 ? "+" : ""}{m.trend}% vs N-1</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Rapport Annuel CSRD</p>
              <p className="text-sm text-muted-foreground">PDF ou XBRL certifie</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
              <Target className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-medium">Definir Objectifs 2027</p>
              <p className="text-sm text-muted-foreground">Trajectoire Science-Based</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Audit Bureau Veritas</p>
              <p className="text-sm text-muted-foreground">Planifier verification</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-primary/30 bg-card shadow-2xl shadow-primary/10">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant CSRD</CardTitle>
                  <CardDescription className="text-xs">Conformite ESG</CardDescription>
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
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
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
                placeholder="Question sur le CSRD..." 
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
