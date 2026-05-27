"use client"

import { useEffect, useState } from "react"
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, Target, BarChart3, Filter, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { cn } from "@/shared/utils"
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

const evmData = [
  { month: "Jan", pv: 1.5, ev: 1.4, ac: 1.3 },
  { month: "Fév", pv: 3.5, ev: 3.2, ac: 3.0 },
  { month: "Mar", pv: 5.5, ev: 5.0, ac: 4.6 },
  { month: "Avr", pv: 8.0, ev: 7.2, ac: 6.8 },
  { month: "Mai", pv: 10.5, ev: 9.5, ac: 8.8 },
  { month: "Jun", pv: 12.0, ev: 10.8, ac: 10.0 },
  { month: "Jul", pv: 13.5, ev: 12.0, ac: 11.2 },
  { month: "Août", pv: 15.0, ev: null, ac: null },
  { month: "Sep", pv: 15.2, ev: null, ac: null },
]

const budgetBreakdown = [
  { category: "Gros Œuvre", budget: 6.2, spent: 5.8, progress: 94 },
  { category: "Second Œuvre", budget: 4.5, spent: 2.1, progress: 47 },
  { category: "Électricité", budget: 2.3, spent: 1.8, progress: 78 },
  { category: "Plomberie", budget: 1.5, spent: 1.0, progress: 67 },
  { category: "Finitions", budget: 0.7, spent: 0.5, progress: 71 },
]

export default function FinancePage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState("tour-hekla")

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error(t("criticalDelay") + ": +12k€", {
        duration: 8000,
        icon: <AlertTriangle className="h-5 w-5" />,
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [t])

  const handleStatClick = (filterType: string, filterLabel: string) => {
    if (activeFilter === filterType) {
      setActiveFilter(null)
      toast.info("Filtre retire")
    } else {
      setActiveFilter(filterType)
      toast.success(`Filtre applique: ${filterLabel}`)
    }
  }

  const filteredBudgetBreakdown = activeFilter 
    ? budgetBreakdown.filter(item => {
        if (activeFilter === "over-budget") return item.progress > 90
        if (activeFilter === "on-track") return item.progress <= 70
        if (activeFilter === "at-risk") return item.progress > 70 && item.progress <= 90
        return true
      })
    : budgetBreakdown

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("evmDashboard")}</h1>
          <p className="text-muted-foreground">Earned Value Management - Analyse Financière</p>
        </div>
        <Select defaultValue="tour-hekla">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sélectionner un projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tour-hekla">Tour Hekla - La Défense</SelectItem>
            <SelectItem value="eco-quartier">Eco-Quartier Fluvial</SelectItem>
            <SelectItem value="gare-nord">Rénovation Gare du Nord</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filter Badge */}
      {activeFilter && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-2">
            <Filter className="h-3 w-3" />
            Filtre: {activeFilter === "over-budget" ? "Depassement" : activeFilter === "on-track" ? "En cours" : "A risque"}
            <button onClick={() => setActiveFilter(null)} className="ml-1 hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </Badge>
          <span className="text-sm text-muted-foreground">
            {filteredBudgetBreakdown.length} poste(s) affiche(s)
          </span>
        </div>
      )}

      {/* Key EVM Metrics - Interactive */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card 
          className={cn(
            "bg-card border-chart-2/50 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
            activeFilter === "on-track" && "ring-2 ring-chart-2 ring-offset-2 ring-offset-background"
          )}
          onClick={() => handleStatClick("on-track", "Budget maitrise (CPI > 1)")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPI</p>
                <p className="text-3xl font-bold text-chart-2">1.08</p>
                <p className="text-xs text-muted-foreground mt-1">Cost Performance Index</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/20">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "bg-card border-chart-3/50 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
            activeFilter === "at-risk" && "ring-2 ring-chart-3 ring-offset-2 ring-offset-background"
          )}
          onClick={() => handleStatClick("at-risk", "Planning a risque (SPI < 1)")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SPI</p>
                <p className="text-3xl font-bold text-chart-3">0.94</p>
                <p className="text-xs text-muted-foreground mt-1">Schedule Performance Index</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/20">
                <TrendingDown className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-card border-chart-2/50 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
          onClick={() => toast.info("Cost Variance: Economie de 45k€ par rapport au budget prevu")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CV</p>
                <p className="text-3xl font-bold text-chart-2">+45k€</p>
                <p className="text-xs text-muted-foreground mt-1">{t("costVariance")}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/20">
                <DollarSign className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "bg-card border-destructive/50 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
            activeFilter === "over-budget" && "ring-2 ring-destructive ring-offset-2 ring-offset-background"
          )}
          onClick={() => handleStatClick("over-budget", "Retard planning (-120k€)")}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SV</p>
                <p className="text-3xl font-bold text-destructive">-120k€</p>
                <p className="text-xs text-muted-foreground mt-1">Schedule Variance</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* S-Curve Chart */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Courbe S - Analyse EVM</CardTitle>
          <CardDescription>
            {t("plannedValue")} vs {t("earnedValue")} vs {t("actualCost")} (en M€)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evmData}>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}M€`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}M€`]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  name={t("plannedValue")}
                  stroke="var(--color-muted-foreground)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ev"
                  name={t("earnedValue")}
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-2)", r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="ac"
                  name={t("actualCost")}
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-chart-1)", r: 4 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-8 bg-muted-foreground" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-muted-foreground), var(--color-muted-foreground) 5px, transparent 5px, transparent 10px)" }} />
              <span className="text-sm text-muted-foreground">{t("plannedValue")} (PV): 15M€</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded bg-chart-2" />
              <span className="text-sm text-muted-foreground">{t("earnedValue")} (EV): 12M€</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 rounded bg-chart-1" />
              <span className="text-sm text-muted-foreground">{t("actualCost")} (AC): 11.2M€</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Breakdown */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Répartition Budget</CardTitle>
            <CardDescription>Consommation par poste (en M€)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredBudgetBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Aucun poste ne correspond au filtre</p>
            ) : (
              filteredBudgetBreakdown.map((item) => (
                <div 
                  key={item.category} 
                  className="space-y-2 p-2 -mx-2 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => toast.info(`${item.category}: ${item.spent}M€ consommes sur ${item.budget}M€ (${item.progress}%)`)}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.progress > 90 ? "destructive" : item.progress > 70 ? "outline" : "secondary"} className="text-xs">
                        {item.progress}%
                      </Badge>
                      <span className="text-muted-foreground">
                        {item.spent}M€ / {item.budget}M€
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                        item.progress > 90 ? "bg-destructive" : item.progress > 70 ? "bg-chart-3" : "bg-chart-2"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Financial KPIs */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Indicateurs Financiers</CardTitle>
            <CardDescription>Projections et estimations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">BAC</p>
                <p className="text-2xl font-bold">15.2M€</p>
                <p className="text-xs text-muted-foreground">Budget at Completion</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">EAC</p>
                <p className="text-2xl font-bold">14.1M€</p>
                <p className="text-xs text-muted-foreground">Estimate at Completion</p>
              </div>
              <div className="rounded-lg border border-chart-2/50 bg-chart-2/5 p-4">
                <p className="text-sm text-muted-foreground">VAC</p>
                <p className="text-2xl font-bold text-chart-2">+1.1M€</p>
                <p className="text-xs text-muted-foreground">Variance at Completion</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">TCPI</p>
                <p className="text-2xl font-bold">0.96</p>
                <p className="text-xs text-muted-foreground">To-Complete Perf. Index</p>
              </div>
            </div>

            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Alerte Retard Phase 2</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Impact financier estimé: <span className="text-destructive font-medium">+12k€</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Cause: Retard livraison acier - Gros Œuvre R+1
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Tendance Mensuelle</CardTitle>
          <CardDescription>Évolution des indicateurs CPI et SPI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { month: "Jan", cpi: 1.05, spi: 1.02 },
                  { month: "Fév", cpi: 1.08, spi: 0.98 },
                  { month: "Mar", cpi: 1.10, spi: 0.96 },
                  { month: "Avr", cpi: 1.07, spi: 0.95 },
                  { month: "Mai", cpi: 1.09, spi: 0.93 },
                  { month: "Jun", cpi: 1.08, spi: 0.94 },
                  { month: "Jul", cpi: 1.08, spi: 0.94 },
                ]}
              >
                <defs>
                  <linearGradient id="colorCpi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSpi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0.8, 1.2]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cpi"
                  name="CPI"
                  stroke="var(--color-chart-2)"
                  fillOpacity={1}
                  fill="url(#colorCpi)"
                />
                <Area
                  type="monotone"
                  dataKey="spi"
                  name="SPI"
                  stroke="var(--color-chart-3)"
                  fillOpacity={1}
                  fill="url(#colorSpi)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
