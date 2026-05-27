"use client"

import { useState, useMemo } from "react"
import { Users, UserPlus, AlertTriangle, CheckCircle, Calendar, Check, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { DataTablePaginated, type FilterConfig, type ColumnConfig } from "@/shared/components/custom/data-table-paginated"

interface Team {
  id: number
  name: string
  headcount: number
  workload: number
  status: "optimized" | "overloaded" | "underload"
  lead: string
  project: string
  skills: string[]
}

const teams: Team[] = [
  { id: 1, name: "Equipe Gros Oeuvre", headcount: 12, workload: 85, status: "optimized", lead: "Pierre Martin", project: "Tour Hekla", skills: ["Maconnerie", "Coffrage", "Ferraillage"] },
  { id: 2, name: "Equipe Electricite", headcount: 4, workload: 110, status: "overloaded", lead: "Sophie Durand", project: "Tour Hekla", skills: ["Cablage", "Tableaux", "Domotique"] },
  { id: 3, name: "Equipe Plomberie", headcount: 6, workload: 72, status: "optimized", lead: "Marc Leblanc", project: "Eco-Quartier Fluvial", skills: ["Sanitaire", "Chauffage", "VMC"] },
  { id: 4, name: "Equipe Finitions", headcount: 8, workload: 45, status: "underload", lead: "Julie Roux", project: "Gare du Nord", skills: ["Peinture", "Revetements", "Menuiserie"] },
  { id: 5, name: "Equipe Charpente", headcount: 5, workload: 92, status: "optimized", lead: "Luc Bernard", project: "Tour Hekla", skills: ["Bois", "Metal", "Assemblage"] },
  { id: 6, name: "Equipe Toiture", headcount: 4, workload: 38, status: "underload", lead: "Anne Petit", project: "Eco-Quartier Fluvial", skills: ["Etancheite", "Couverture", "Isolation"] },
  { id: 7, name: "Equipe CVC", headcount: 7, workload: 105, status: "overloaded", lead: "Paul Moreau", project: "Gare du Nord", skills: ["Climatisation", "Ventilation", "Regulation"] },
]

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

const schedule = [
  { team: "Gros Oeuvre", days: [true, true, true, true, true, true], color: "bg-blue-500" },
  { team: "Electricite", days: [true, true, true, true, true, true], color: "bg-amber-500" },
  { team: "Plomberie", days: [true, true, false, true, true, false], color: "bg-cyan-500" },
  { team: "Finitions", days: [true, true, true, false, false, false], color: "bg-pink-500" },
]

const teamColors = [
  { name: "Gros Oeuvre", color: "bg-blue-500" },
  { name: "Electricite", color: "bg-amber-500" },
  { name: "Plomberie", color: "bg-cyan-500" },
  { name: "Finitions", color: "bg-pink-500" },
]

const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { value: "optimized", label: "Optimise" },
      { value: "overloaded", label: "Surcharge" },
      { value: "underload", label: "Sous-charge" },
    ],
  },
  {
    key: "project",
    label: "Projet",
    type: "multiselect",
    options: [
      { value: "Tour Hekla", label: "Tour Hekla" },
      { value: "Eco-Quartier Fluvial", label: "Eco-Quartier Fluvial" },
      { value: "Gare du Nord", label: "Gare du Nord" },
    ],
  },
]

export default function ResourcesPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamLead, setNewTeamLead] = useState("")
  const [newTeamProject, setNewTeamProject] = useState("")
  const [selectedScheduleRow, setSelectedScheduleRow] = useState<string | null>(null)
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const totalCollaborators = teams.reduce((sum, t) => sum + t.headcount, 0)
    const optimized = teams.filter((t) => t.status === "optimized").length
    const overloaded = teams.filter((t) => t.status === "overloaded").length
    const underload = teams.filter((t) => t.status === "underload").length
    const avgOccupation = Math.round(teams.reduce((sum, t) => sum + t.workload, 0) / teams.length)
    return { totalCollaborators, optimized, overloaded, underload, avgOccupation }
  }, [])

  // Filter teams based on active stat filter
  const filteredByStatTeams = useMemo(() => {
    if (!activeStatFilter) return teams
    if (activeStatFilter === "all") return teams
    return teams.filter((t) => t.status === activeStatFilter)
  }, [activeStatFilter])

  const handleStatClick = (filter: string | null) => {
    if (activeStatFilter === filter) {
      setActiveStatFilter(null)
      toast.info("Filtre retire", { description: "Affichage de toutes les equipes" })
    } else {
      setActiveStatFilter(filter)
      const filterLabels: Record<string, string> = {
        all: "toutes les equipes",
        optimized: "equipes optimisees",
        overloaded: "equipes en surcharge",
        underload: "equipes en sous-charge",
      }
      toast.info("Filtre applique", { description: `Affichage des ${filterLabels[filter || "all"]}` })
    }
  }

  const handleCreateTeam = () => {
    if (newTeamName && newTeamLead && newTeamProject) {
      toast.success(`Equipe "${newTeamName}" creee avec succes`)
      setShowNewTeamDialog(false)
      setNewTeamName("")
      setNewTeamLead("")
      setNewTeamProject("")
    }
  }

  const getWorkloadColor = (workload: number) => {
    if (workload > 100) return "text-destructive"
    if (workload >= 80) return "text-chart-2"
    if (workload >= 60) return "text-chart-3"
    return "text-muted-foreground"
  }

  const columns: ColumnConfig<Team>[] = [
    {
      key: "name",
      label: t("team"),
      sortable: true,
      render: (team) => (
        <div>
          <p className="font-medium">{team.name}</p>
          <p className="text-xs text-muted-foreground">{team.lead} - {team.project}</p>
        </div>
      ),
    },
    {
      key: "headcount",
      label: t("headcount"),
      sortable: true,
      render: (team) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{team.headcount}</span>
        </div>
      ),
    },
    {
      key: "workload",
      label: t("workload"),
      sortable: true,
      render: (team) => (
        <div className="flex items-center gap-3 w-32">
          <Progress
            value={Math.min(team.workload, 100)}
            className={`h-2 ${team.workload > 100 ? "[&>div]:bg-destructive" : ""}`}
          />
          <span className={`text-sm font-medium ${getWorkloadColor(team.workload)}`}>
            {team.workload}%
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: t("status"),
      sortable: true,
      render: (team) => {
        const statusConfig = {
          optimized: { label: t("optimized"), className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30" },
          overloaded: { label: t("overloaded"), className: "bg-destructive text-destructive-foreground" },
          underload: { label: "Sous-charge", className: "bg-secondary text-secondary-foreground" },
        }
        const config = statusConfig[team.status]
        return (
          <Badge 
            className={`${config.className} cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation()
              handleStatClick(team.status)
            }}
          >
            {config.label}
          </Badge>
        )
      },
    },
    {
      key: "skills",
      label: "Competences",
      render: (team) => (
        <div className="flex flex-wrap gap-1 max-w-48">
          {team.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {team.skills.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{team.skills.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("resources")}</h1>
          <p className="text-muted-foreground">{t("teamPlanning")}</p>
        </div>
        <Button className="gap-2" onClick={() => setShowNewTeamDialog(true)}>
          <UserPlus className="h-4 w-4" />
          Nouvelle Equipe
        </Button>
      </div>

      {/* Interactive Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <InteractiveStatCard
          label="Collaborateurs"
          value={stats.totalCollaborators}
          icon={Users}
          variant="default"
          onClick={() => handleStatClick("all")}
          isActive={activeStatFilter === "all"}
          description={`${teams.length} equipes`}
        />
        <InteractiveStatCard
          label="Equipes Optimisees"
          value={stats.optimized}
          icon={CheckCircle}
          variant="success"
          onClick={() => handleStatClick("optimized")}
          isActive={activeStatFilter === "optimized"}
          description="Charge equilibree"
        />
        <InteractiveStatCard
          label="En Surcharge"
          value={stats.overloaded}
          icon={AlertTriangle}
          variant="danger"
          onClick={() => handleStatClick("overloaded")}
          isActive={activeStatFilter === "overloaded"}
          description="Attention requise"
        />
        <InteractiveStatCard
          label="En Sous-charge"
          value={stats.underload}
          icon={TrendingDown}
          variant="warning"
          onClick={() => handleStatClick("underload")}
          isActive={activeStatFilter === "underload"}
          description="Disponibles"
        />
        <InteractiveStatCard
          label="Taux Occupation"
          value={`${stats.avgOccupation}%`}
          icon={Calendar}
          variant="info"
          description="Moyenne globale"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Teams Table */}
        <Card className="bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Equipes</CardTitle>
            <CardDescription>Repartition et charge de travail</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTablePaginated
              data={filteredByStatTeams}
              columns={columns}
              filters={filterConfigs}
              searchKeys={["name", "lead", "project"] as (keyof Team)[]}
              pageSize={5}
              onRowClick={(team) => toast.info("Equipe selectionnee", { description: `Details de ${team.name}` })}
              showResultCount
            />
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Planning Semaine</CardTitle>
            <CardDescription>Presence des equipes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Header */}
              <div className="grid grid-cols-7 gap-2 text-center">
                <div></div>
                {weekDays.map((day) => (
                  <div key={day} className="text-xs font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              {/* Schedule Grid */}
              {schedule.map((row) => (
                <div
                  key={row.team}
                  className={`grid grid-cols-7 gap-2 items-center cursor-pointer rounded-lg p-1 -mx-1 transition-colors ${
                    selectedScheduleRow === row.team ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setSelectedScheduleRow(selectedScheduleRow === row.team ? null : row.team)
                    toast.info("Planning", { description: `Voir le planning de ${row.team}` })
                  }}
                >
                  <div className="text-xs font-medium truncate">{row.team}</div>
                  {row.days.map((active, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded transition-colors ${
                        active ? row.color : "bg-secondary"
                      } ${active ? "opacity-80 hover:opacity-100" : ""}`}
                    />
                  ))}
                </div>
              ))}

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Legende</p>
                <div className="flex flex-wrap gap-3">
                  {teamColors.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className={`h-3 w-3 rounded ${item.color}`} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.filter((t) => t.status === "overloaded" || t.status === "underload").map((team) => (
          <Card
            key={team.id}
            className={`bg-card cursor-pointer transition-all hover:scale-[1.02] ${
              team.status === "overloaded" ? "border-destructive/50" : "border-chart-3/50"
            }`}
            onClick={() => toast.info("Equipe", { description: `Gerer ${team.name}` })}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">{team.lead}</p>
                </div>
                <Badge
                  className={
                    team.status === "overloaded"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-chart-3/20 text-chart-3"
                  }
                >
                  {team.status === "overloaded" ? t("overloaded") : "Sous-charge"}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold">{team.headcount}</p>
                  <p className="text-xs text-muted-foreground">{t("headcount")}</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${getWorkloadColor(team.workload)}`}>
                    {team.workload}%
                  </p>
                  <p className="text-xs text-muted-foreground">{t("workload")}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {team.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Team Dialog */}
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creer une Nouvelle Equipe</DialogTitle>
            <DialogDescription>Configurez les informations de base de l&apos;equipe</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Nom de l&apos;equipe</Label>
              <Input
                id="teamName"
                placeholder="Ex: Equipe Charpente"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamLead">Chef d&apos;equipe</Label>
              <Input
                id="teamLead"
                placeholder="Ex: Jean Dupont"
                value={newTeamLead}
                onChange={(e) => setNewTeamLead(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Projet affecte</Label>
              <Select value={newTeamProject} onValueChange={setNewTeamProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner un projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hekla">Tour Hekla</SelectItem>
                  <SelectItem value="eco">Eco-Quartier Fluvial</SelectItem>
                  <SelectItem value="gare">Gare du Nord</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateTeam} disabled={!newTeamName || !newTeamLead || !newTeamProject}>
              <Check className="mr-2 h-4 w-4" />
              Creer l&apos;equipe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
