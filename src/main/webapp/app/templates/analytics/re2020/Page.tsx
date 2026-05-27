"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
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
  Leaf,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  TreePine,
  FileText,
  Download,
  Award,
  ArrowRight,
  Sparkles,
  X,
  Send,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts"

// Color palette
const palette = {
  primary: "#593196",
  emerald: "#10b981",
  red: "#ef4444",
  amber: "#f59e0b",
  gray: "#6b7280",
}

// CO2 Evolution data by construction phase
const emissionsData = [
  { month: "Jan 2026", fondations: 85, grosOeuvre: 0, secondOeuvre: 0, total: 85 },
  { month: "Fév 2026", fondations: 120, grosOeuvre: 0, secondOeuvre: 0, total: 120 },
  { month: "Mar 2026", fondations: 95, grosOeuvre: 45, secondOeuvre: 0, total: 140 },
  { month: "Avr 2026", fondations: 40, grosOeuvre: 110, secondOeuvre: 0, total: 150 },
  { month: "Mai 2026", fondations: 0, grosOeuvre: 145, secondOeuvre: 15, total: 160 },
  { month: "Juin 2026", fondations: 0, grosOeuvre: 130, secondOeuvre: 35, total: 165 },
  { month: "Juil 2026", fondations: 0, grosOeuvre: 95, secondOeuvre: 55, total: 150 },
  { month: "Août 2026", fondations: 0, grosOeuvre: 60, secondOeuvre: 70, total: 130 },
]

// Polluting materials data
const materialsData = [
  {
    id: 1,
    name: "Béton armé C25/30",
    category: "Structure",
    quantity: "2,450 m³",
    co2Total: 245,
    co2Unit: 100,
    percentage: 48,
    trend: "up",
    trendValue: 8,
    alternative: "Béton bas carbone CEM III",
    savingPotential: 35,
  },
  {
    id: 2,
    name: "Acier de construction S235",
    category: "Structure",
    quantity: "180 t",
    co2Total: 162,
    co2Unit: 900,
    percentage: 32,
    trend: "up",
    trendValue: 12,
    alternative: "Acier recyclé (70% recyclé)",
    savingPotential: 45,
  },
  {
    id: 3,
    name: "Aluminium (menuiseries)",
    category: "Façades",
    quantity: "12 t",
    co2Total: 48,
    co2Unit: 4000,
    percentage: 10,
    trend: "stable",
    trendValue: 0,
    alternative: "Menuiseries bois certifié PEFC",
    savingPotential: 80,
  },
  {
    id: 4,
    name: "Isolation laine de verre",
    category: "Isolation",
    quantity: "850 m²",
    co2Total: 34,
    co2Unit: 40,
    percentage: 7,
    trend: "down",
    trendValue: 5,
    alternative: "Fibre de bois biosourcée",
    savingPotential: 60,
  },
  {
    id: 5,
    name: "PVC (canalisations)",
    category: "Réseaux",
    quantity: "2.5 t",
    co2Total: 15,
    co2Unit: 6000,
    percentage: 3,
    trend: "stable",
    trendValue: 0,
    alternative: "PP recyclé ou fonte",
    savingPotential: 40,
  },
]

// KPI metrics
const metrics = {
  carbonIndex: 450,
  carbonTarget: 640,
  quotaRemaining: 190,
  quotaTotal: 640,
  treesEquivalent: 2847,
  treesGrowth: 12,
}

function MetricCard({
  title,
  value,
  unit,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  accentColor,
}: {
  title: string
  value: string | number
  unit: string
  subtitle: string
  trend?: "up" | "down" | "stable"
  trendValue?: number
  icon: React.ElementType
  accentColor: string
}) {
  const getTrendIcon = () => {
    if (trend === "down") return <TrendingDown className="h-4 w-4" />
    if (trend === "up") return <TrendingUp className="h-4 w-4" />
    return null
  }

  const getTrendColor = () => {
    // For carbon, down is good (green)
    if (trend === "down") return "text-emerald-500"
    if (trend === "up") return "text-red-500"
    return "text-muted-foreground"
  }

  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundColor: accentColor }}
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Icon className="h-5 w-5" style={{ color: accentColor }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold" style={{ color: accentColor }}>
            {value}
          </span>
          <span className="text-lg text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{subtitle}</span>
          {trend && trendValue !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function EmissionsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Évolution des émissions CO2 par phase</CardTitle>
            <CardDescription>
              Répartition mensuelle par type de travaux (en tCO2e)
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ef4444" }} />
              <span className="text-xs text-muted-foreground">Fondations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-xs text-muted-foreground">Gros Oeuvre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#10b981" }} />
              <span className="text-xs text-muted-foreground">Second Oeuvre</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={emissionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFondations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorGrosOeuvre" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorSecondOeuvre" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                label={{
                  value: "tCO2e",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 12,
                }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="fondations"
                stackId="1"
                stroke="#ef4444"
                fill="url(#colorFondations)"
                name="Fondations"
              />
              <Area
                type="monotone"
                dataKey="grosOeuvre"
                stackId="1"
                stroke="#f59e0b"
                fill="url(#colorGrosOeuvre)"
                name="Gros Oeuvre"
              />
              <Area
                type="monotone"
                dataKey="secondOeuvre"
                stackId="1"
                stroke="#10b981"
                fill="url(#colorSecondOeuvre)"
                name="Second Oeuvre"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function MaterialsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Matériaux les plus polluants</CardTitle>
            <CardDescription>
              Top 5 des postes d&apos;émission avec alternatives bas-carbone
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-500">
            <AlertTriangle className="h-3 w-3" />
            2 alertes
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matériau</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Quantité</TableHead>
              <TableHead className="text-right">CO2 (tCO2e)</TableHead>
              <TableHead className="text-center">Part</TableHead>
              <TableHead>Tendance</TableHead>
              <TableHead>Alternative bas-carbone</TableHead>
              <TableHead className="text-right">Économie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materialsData.map((material) => (
              <TableRow key={material.id} className="group">
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {material.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {material.quantity}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-red-500">{material.co2Total}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={material.percentage}
                      className="w-16 [&>div]:bg-red-500"
                    />
                    <span className="w-8 text-xs text-muted-foreground">
                      {material.percentage}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {material.trend === "up" && (
                    <div className="flex items-center gap-1 text-red-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">+{material.trendValue}%</span>
                    </div>
                  )}
                  {material.trend === "down" && (
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-xs">-{material.trendValue}%</span>
                    </div>
                  )}
                  {material.trend === "stable" && (
                    <span className="text-xs text-muted-foreground">Stable</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-500">{material.alternative}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700">
                    -{material.savingPotential}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function CSRDReportDialog() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 3000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
          <FileText className="h-4 w-4" />
          Générer Rapport CSRD Certifié
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#593196]/20">
              <FileText className="h-5 w-5 text-[#593196]" />
            </div>
            Génération du Rapport CSRD
          </DialogTitle>
          <DialogDescription>
            Rapport conforme à la directive européenne CSRD avec certification Bureau Veritas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Certification Badge */}
          <div className="flex items-center justify-center gap-4 rounded-lg border bg-muted/20 p-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/10">
                <Award className="h-8 w-8 text-emerald-500" />
              </div>
              <span className="text-xs font-semibold text-emerald-500">Bureau Veritas</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Certification ISO 14064-1</p>
              <p className="text-xs text-muted-foreground">
                Vérification tierce partie indépendante
              </p>
            </div>
          </div>

          {/* Report content preview */}
          <div className="space-y-2 rounded-lg border p-4">
            <p className="text-sm font-semibold">Contenu du rapport :</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Bilan carbone complet (Scope 1, 2, 3)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Conformité RE2020 et taxonomie EU
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Analyse du cycle de vie (ACV)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Plan d&apos;action décarbonation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Attestation de certification
              </li>
            </ul>
          </div>

          {isGenerated ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <p className="font-medium text-emerald-500">Rapport généré avec succès</p>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4" />
                Télécharger le rapport PDF
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full gap-2 bg-[#593196] hover:bg-[#593196]/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Générer le rapport certifié
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Votre consommation d'acier sur la phase 2 dépasse de 12% les prévisions. Souhaitez-vous que je rédige un rapport d'alerte pour le maître d'ouvrage ?",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleAction = (action: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      if (action === "report") {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "assistant",
            content:
              "J'ai rédigé un rapport d'alerte détaillant la surconsommation d'acier (+12%) sur la Phase 2. Le document inclut une analyse des causes (modifications structurelles du lot 04) et des recommandations pour optimiser les phases suivantes. Voulez-vous le prévisualiser ?",
            timestamp: new Date(),
          },
        ])
      } else if (action === "alternatives") {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            role: "assistant",
            content:
              "Voici 3 alternatives pour réduire l'empreinte carbone de l'acier : 1) Acier recyclé ArcelorMittal XCarb (-45% CO2), 2) Poutres mixtes bois-acier (-30% acier), 3) Optimisation des sections par calcul IA (-15% matière). Je recommande l'option 1 avec un ROI de 18 mois.",
            timestamp: new Date(),
          },
        ])
      }
    }, 1500)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] p-0 shadow-lg hover:bg-[#593196]/90"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] overflow-hidden rounded-xl border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-[#593196] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Assistant IA Carbone</p>
            <p className="text-xs text-white/70">Analyse RE2020 en cours</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="max-h-[300px] overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#593196]/20">
                <Sparkles className="h-4 w-4 text-[#593196]" />
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#593196]/20">
                <Sparkles className="h-4 w-4 text-[#593196]" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-[#593196]" />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-[#593196]"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-[#593196]"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t bg-muted/30 p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Actions suggérées</p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs"
            onClick={() => handleAction("report")}
          >
            <FileText className="h-3 w-3" />
            Rédiger rapport d&apos;alerte
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs"
            onClick={() => handleAction("alternatives")}
          >
            <Leaf className="h-3 w-3" />
            Voir alternatives
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Poser une question..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#593196]"
          />
          <Button size="icon" className="bg-[#593196] hover:bg-[#593196]/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsRE2020Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#593196]/20">
            <Leaf className="h-6 w-6 text-[#593196]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics & Reporting Carbone RE2020
            </h1>
            <p className="text-muted-foreground">
              Projet Tour Hekla - Suivi environnemental et conformité réglementaire
            </p>
          </div>
        </div>
        <CSRDReportDialog />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Indice Carbone Actuel"
          value={metrics.carbonIndex}
          unit="kgCO2e/m²"
          subtitle={`Seuil RE2020: ${metrics.carbonTarget} kgCO2e/m²`}
          trend="down"
          trendValue={8}
          icon={Leaf}
          accentColor={palette.emerald}
        />
        <MetricCard
          title="Quota Restant avant Pénalité"
          value={metrics.quotaRemaining}
          unit="kgCO2e/m²"
          subtitle={`Sur un total de ${metrics.quotaTotal} kgCO2e/m²`}
          icon={AlertTriangle}
          accentColor={palette.amber}
        />
        <MetricCard
          title="Équivalent Arbres Plantés"
          value={metrics.treesEquivalent.toLocaleString("fr-FR")}
          unit="arbres"
          subtitle="Compensation carbone équivalente"
          trend="up"
          trendValue={metrics.treesGrowth}
          icon={TreePine}
          accentColor={palette.emerald}
        />
      </div>

      {/* Carbon quota progress */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progression vers le seuil RE2020</span>
              <span className="text-sm text-muted-foreground">
                {metrics.carbonIndex} / {metrics.carbonTarget} kgCO2e/m²
              </span>
            </div>
            <Progress
              value={(metrics.carbonIndex / metrics.carbonTarget) * 100}
              className="h-4 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-emerald-400"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="flex items-center gap-1 text-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                Conforme RE2020
              </span>
              <span>{metrics.carbonTarget}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border bg-emerald-500/10 px-6 py-4">
            <span className="text-3xl font-bold text-emerald-500">
              {Math.round((1 - metrics.carbonIndex / metrics.carbonTarget) * 100)}%
            </span>
            <span className="text-xs text-muted-foreground">sous le seuil</span>
          </div>
        </CardContent>
      </Card>

      {/* Emissions Chart */}
      <EmissionsChart />

      {/* Materials Table */}
      <MaterialsTable />

      {/* AI Assistant Panel */}
      <AIAssistantPanel />
    </div>
  )
}
