"use client"

import { FolderKanban, Users, Leaf, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
// import { useLanguage } from "@/lib/i18n"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const projectData = [
  { name: "Jan", value: 2 },
  { name: "Fév", value: 3 },
  { name: "Mar", value: 4 },
  { name: "Avr", value: 3 },
  { name: "Mai", value: 5 },
  { name: "Jun", value: 4 },
]

const budgetData = [
  { name: "T1", planned: 3.5, actual: 3.2 },
  { name: "T2", planned: 7.0, actual: 6.8 },
  { name: "T3", planned: 11.0, actual: 10.5 },
  { name: "T4", planned: 15.2, actual: 14.8 },
]

const recentProjects = [
  { name: "Tour Hekla - La Défense", status: "En cours", progress: 65, budget: "15.2M€" },
  { name: "Eco-Quartier Fluvial", status: "Planification", progress: 25, budget: "8.5M€" },
  { name: "Rénovation Gare du Nord", status: "Retard", progress: 42, budget: "22.1M€" },
]

const alerts = [
  { type: "warning", message: "Véhicule Crit'Air 4 bloqué - Gare du Nord", time: "Il y a 2h" },
  { type: "critical", message: "Surcharge équipe Électricité (110%)", time: "Il y a 4h" },
  { type: "info", message: "Document CCTP_Lot_03 en attente de révision", time: "Il y a 6h" },
]

export default function DashboardPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("welcomeBack")}, Jean-Pierre</h1>
        <p className="text-muted-foreground">
          {"Voici l'aperçu de vos projets de construction"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("totalProjects")}</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-2" />
              +2 ce mois
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("activeTeams")}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-chart-2">156</span> collaborateurs
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("carbonFootprint")}</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380 kg/m²</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-chart-2" />
              -12% vs objectif
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("budget")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.8M€</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              CPI: <span className="text-chart-2">1.08</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Project Activity Chart */}
        <Card className="bg-card lg:col-span-4">
          <CardHeader>
            <CardTitle>Activité des Projets</CardTitle>
            <CardDescription>Évolution sur les 6 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-chart-1)"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-card lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-chart-3" />
              Alertes Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      alert.type === "critical"
                        ? "bg-destructive"
                        : alert.type === "warning"
                        ? "bg-chart-3"
                        : "bg-chart-1"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Projects */}
        <Card className="bg-card lg:col-span-4">
          <CardHeader>
            <CardTitle>Projets Récents</CardTitle>
            <CardDescription>Performance des projets en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{project.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          project.status === "Retard"
                            ? "destructive"
                            : project.status === "En cours"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{project.budget}</span>
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full ${
                            project.status === "Retard" ? "bg-destructive" : "bg-primary"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Chart */}
        <Card className="bg-card lg:col-span-3">
          <CardHeader>
            <CardTitle>Budget vs Réel</CardTitle>
            <CardDescription>Par trimestre (en M€)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="planned" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
