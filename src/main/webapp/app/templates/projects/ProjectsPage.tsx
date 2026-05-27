"use client"

import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Plus, MoreHorizontal, Eye, Edit, Trash2, CalendarDays, FolderKanban, CheckCircle, AlertTriangle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { DataTablePaginated, type FilterConfig, type ColumnConfig } from "@/shared/components/custom/data-table-paginated"

interface Project {
  id: number
  name: string
  status: "En cours" | "Planification" | "Retard" | "Termine"
  budget: string
  budgetValue: number
  carbon: string
  carbonValue: number
  progress: number
  team: string
  startDate: string
  endDate: string
}

const projects: Project[] = [
  { id: 1, name: "Tour Hekla - La Defense", status: "En cours", budget: "15.2M€", budgetValue: 15200000, carbon: "420 kg/m²", carbonValue: 420, progress: 65, team: "Equipe A", startDate: "01/01/2024", endDate: "31/12/2025" },
  { id: 2, name: "Eco-Quartier Fluvial - L'Ile-Saint-Denis", status: "Planification", budget: "8.5M€", budgetValue: 8500000, carbon: "310 kg/m²", carbonValue: 310, progress: 25, team: "Equipe B", startDate: "15/03/2024", endDate: "30/06/2026" },
  { id: 3, name: "Renovation Gare du Nord", status: "Retard", budget: "22.1M€", budgetValue: 22100000, carbon: "510 kg/m²", carbonValue: 510, progress: 42, team: "Equipe C", startDate: "01/09/2023", endDate: "31/03/2025" },
  { id: 4, name: "Centre Commercial Les Halles", status: "En cours", budget: "18.7M€", budgetValue: 18700000, carbon: "380 kg/m²", carbonValue: 380, progress: 78, team: "Equipe D", startDate: "01/06/2023", endDate: "31/12/2024" },
  { id: 5, name: "Residence Etudiante Paris 13", status: "Termine", budget: "6.3M€", budgetValue: 6300000, carbon: "290 kg/m²", carbonValue: 290, progress: 100, team: "Equipe A", startDate: "01/01/2023", endDate: "30/09/2024" },
  { id: 6, name: "Hopital Universitaire Saclay", status: "Planification", budget: "45.2M€", budgetValue: 45200000, carbon: "450 kg/m²", carbonValue: 450, progress: 15, team: "Equipe E", startDate: "01/09/2024", endDate: "31/12/2027" },
  { id: 7, name: "Parc d'Activites Roissy", status: "En cours", budget: "12.8M€", budgetValue: 12800000, carbon: "340 kg/m²", carbonValue: 340, progress: 55, team: "Equipe B", startDate: "15/04/2024", endDate: "30/06/2025" },
  { id: 8, name: "Groupe Scolaire Vincennes", status: "Retard", budget: "9.4M€", budgetValue: 9400000, carbon: "320 kg/m²", carbonValue: 320, progress: 38, team: "Equipe C", startDate: "01/03/2024", endDate: "31/08/2025" },
]

const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { value: "En cours", label: "En cours" },
      { value: "Planification", label: "Planification" },
      { value: "Retard", label: "En retard" },
      { value: "Termine", label: "Termine" },
    ],
  },
  {
    key: "team",
    label: "Equipe",
    type: "multiselect",
    options: [
      { value: "Equipe A", label: "Equipe A" },
      { value: "Equipe B", label: "Equipe B" },
      { value: "Equipe C", label: "Equipe C" },
      { value: "Equipe D", label: "Equipe D" },
      { value: "Equipe E", label: "Equipe E" },
    ],
  },
]

export default function ProjectsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const total = projects.length
    const enCours = projects.filter((p) => p.status === "En cours").length
    const planification = projects.filter((p) => p.status === "Planification").length
    const retard = projects.filter((p) => p.status === "Retard").length
    const termine = projects.filter((p) => p.status === "Termine").length
    const totalBudget = projects.reduce((sum, p) => sum + p.budgetValue, 0)
    const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total)
    return { total, enCours, planification, retard, termine, totalBudget, avgProgress }
  }, [])

  // Filter projects based on active stat filter
  const filteredByStatProjects = useMemo(() => {
    if (!activeStatFilter) return projects
    if (activeStatFilter === "all") return projects
    return projects.filter((p) => p.status === activeStatFilter)
  }, [activeStatFilter])

  const handleStatClick = (filter: string | null) => {
    if (activeStatFilter === filter) {
      setActiveStatFilter(null)
      toast.info("Filtre retire", { description: "Affichage de tous les projets" })
    } else {
      setActiveStatFilter(filter)
      const filterLabels: Record<string, string> = {
        all: "tous les projets",
        "En cours": "projets en cours",
        Planification: "projets en planification",
        Retard: "projets en retard",
        Termine: "projets termines",
      }
      toast.info("Filtre applique", { description: `Affichage des ${filterLabels[filter || "all"]}` })
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "En cours": return "default"
      case "Planification": return "secondary"
      case "Retard": return "destructive"
      case "Termine": return "outline"
      default: return "outline"
    }
  }

  const getCarbonColor = (value: number) => {
    if (value <= 350) return "text-chart-2"
    if (value <= 450) return "text-chart-3"
    return "text-destructive"
  }

  const formatBudget = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K€`
    return `${value}€`
  }

  const columns: ColumnConfig<Project>[] = [
    {
      key: "name",
      label: t("projectName"),
      sortable: true,
      render: (project) => (
        <div>
          <p className="font-medium">{project.name}</p>
          <p className="text-xs text-muted-foreground">{project.startDate} - {project.endDate}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: t("status"),
      sortable: true,
      render: (project) => (
        <Badge 
          variant={getStatusVariant(project.status)}
          className="cursor-pointer hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation()
            handleStatClick(project.status)
          }}
        >
          {project.status}
        </Badge>
      ),
    },
    {
      key: "budgetValue",
      label: t("budget"),
      sortable: true,
      render: (project) => <span className="font-medium">{project.budget}</span>,
    },
    {
      key: "carbonValue",
      label: t("carbon"),
      sortable: true,
      render: (project) => (
        <span className={getCarbonColor(project.carbonValue)}>{project.carbon}</span>
      ),
    },
    {
      key: "progress",
      label: "Progression",
      sortable: true,
      render: (project) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full ${project.status === "Retard" ? "bg-destructive" : "bg-primary"}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground w-10">{project.progress}%</span>
        </div>
      ),
    },
    {
      key: "team",
      label: t("team"),
      sortable: true,
      className: "text-muted-foreground",
      render: (project) => (
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-secondary"
          onClick={(e) => {
            e.stopPropagation()
            toast.info("Filtre equipe", { description: `Affichage des projets de ${project.team}` })
          }}
        >
          {project.team}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (project) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Details", { description: `Ouverture du projet ${project.name}` })}>
                <Eye className="mr-2 h-4 w-4" />
                Voir details
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/projects/${project.id}/tasks`}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Planification et Taches
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Edition", { description: `Modification du projet ${project.name}` })}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => toast.error("Suppression", { description: `Projet ${project.name} supprime` })}
              >
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
          <h1 className="text-2xl font-semibold tracking-tight">{t("projectsList")}</h1>
          <p className="text-muted-foreground">Gerez et suivez vos projets de construction</p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/templates/projects/new">
            <Plus className="h-4 w-4" />
            Nouveau Projet
          </Link>
        </Button>
      </div>

      {/* Interactive Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <InteractiveStatCard
          label="Total Projets"
          value={stats.total}
          icon={FolderKanban}
          variant="default"
          onClick={() => handleStatClick("all")}
          isActive={activeStatFilter === "all"}
          description={formatBudget(stats.totalBudget)}
        />
        <InteractiveStatCard
          label="En Cours"
          value={stats.enCours}
          icon={TrendingUp}
          variant="success"
          onClick={() => handleStatClick("En cours")}
          isActive={activeStatFilter === "En cours"}
          description="Projets actifs"
        />
        <InteractiveStatCard
          label="Planification"
          value={stats.planification}
          icon={Clock}
          variant="info"
          onClick={() => handleStatClick("Planification")}
          isActive={activeStatFilter === "Planification"}
          description="A demarrer"
        />
        <InteractiveStatCard
          label="En Retard"
          value={stats.retard}
          icon={AlertTriangle}
          variant="danger"
          onClick={() => handleStatClick("Retard")}
          isActive={activeStatFilter === "Retard"}
          description="Attention requise"
        />
        <InteractiveStatCard
          label="Termines"
          value={stats.termine}
          icon={CheckCircle}
          variant="success"
          onClick={() => handleStatClick("Termine")}
          isActive={activeStatFilter === "Termine"}
          description="Livres"
        />
      </div>

      {/* Projects Table with Pagination */}
      <Card className="bg-card">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Tous les Projets</CardTitle>
              <CardDescription>{filteredByStatProjects.length} projet{filteredByStatProjects.length !== 1 ? "s" : ""} {activeStatFilter ? `(${activeStatFilter})` : ""}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTablePaginated
            data={filteredByStatProjects}
            columns={columns}
            filters={filterConfigs}
            searchKeys={["name", "team"] as (keyof Project)[]}
            pageSize={5}
            onRowClick={(project) => toast.info("Projet selectionne", { description: `Ouverture de ${project.name}` })}
            showResultCount
          />
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-base">Progression Globale</CardTitle>
            <CardDescription>Moyenne de tous les projets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${stats.avgProgress}%` }} />
                </div>
              </div>
              <span className="text-2xl font-bold">{stats.avgProgress}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-base">Budget Total</CardTitle>
            <CardDescription>Somme de tous les projets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatBudget(stats.totalBudget)}</div>
            <p className="text-sm text-muted-foreground mt-1">{stats.total} projets actifs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
