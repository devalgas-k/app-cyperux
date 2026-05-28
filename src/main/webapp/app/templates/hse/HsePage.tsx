"use client"

import { useState, useMemo } from "react"
import { Shield, AlertTriangle, CheckCircle, Award, HardHat, MoreHorizontal, Eye, Edit, FileText, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Progress } from "@/shared/components/ui/progress"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
// // import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { StatCardList } from "@/shared/components/custom/stat-card-list"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { DataTablePaginated, type FilterConfig, type ColumnConfig } from "@/shared/components/custom/data-table-paginated"

interface Inspection {
  id: number
  item: string
  status: "compliant" | "revision"
  verifiedDate: string
  inspector: string
  location: string
  notes: string
  alert?: string
}

const inspections: Inspection[] = [
  { id: 1, item: "Port des EPI", status: "compliant", verifiedDate: "05/05/2024", inspector: "Marc D.", location: "Tour Hekla", notes: "Tous les equipements conformes" },
  { id: 2, item: "Controle Engin Grue #02", status: "revision", verifiedDate: "03/05/2024", inspector: "Sophie L.", location: "Tour Hekla", notes: "Fuite hydraulique detectee", alert: "Fuite hydraulique" },
  { id: 3, item: "Balisage Zone de Travail", status: "compliant", verifiedDate: "05/05/2024", inspector: "Pierre M.", location: "Eco-Quartier", notes: "Signalisation correcte" },
  { id: 4, item: "Extincteurs Batiment B", status: "compliant", verifiedDate: "04/05/2024", inspector: "Julie R.", location: "Gare du Nord", notes: "Verification annuelle OK" },
  { id: 5, item: "Formation Travail en Hauteur", status: "revision", verifiedDate: "01/05/2024", inspector: "Marc D.", location: "Tour Hekla", notes: "2 operateurs a recycler", alert: "Recyclage requis" },
  { id: 6, item: "Verification Echafaudages", status: "compliant", verifiedDate: "30/04/2024", inspector: "Luc B.", location: "Eco-Quartier", notes: "Stabilite verifiee" },
  { id: 7, item: "Stockage Produits Chimiques", status: "revision", verifiedDate: "28/04/2024", inspector: "Sophie L.", location: "Gare du Nord", notes: "Etiquetage incomplet", alert: "Mise en conformite" },
  { id: 8, item: "Acces Zone Restreinte", status: "compliant", verifiedDate: "27/04/2024", inspector: "Pierre M.", location: "Tour Hekla", notes: "Badges fonctionnels" },
  { id: 9, item: "Evacuation Incendie Test", status: "compliant", verifiedDate: "25/04/2024", inspector: "Marc D.", location: "Eco-Quartier", notes: "Temps evacuation conforme" },
  { id: 10, item: "Maintenance Chariot Elevateur", status: "compliant", verifiedDate: "22/04/2024", inspector: "Julie R.", location: "Gare du Nord", notes: "Revision effectuee" },
]

const trainings = [
  { name: "Habilitation Electrique", completed: 45, total: 48 },
  { name: "Travail en Hauteur", completed: 32, total: 35 },
  { name: "Conduite Engins", completed: 18, total: 18 },
  { name: "Premiers Secours", completed: 52, total: 60 },
]

const filterConfigs: FilterConfig[] = [
  {
    key: "status",
    label: "Statut",
    type: "select",
    options: [
      { value: "compliant", label: "Conforme" },
      { value: "revision", label: "A reviser" },
    ],
  },
  {
    key: "location",
    label: "Site",
    type: "multiselect",
    options: [
      { value: "Tour Hekla", label: "Tour Hekla" },
      { value: "Eco-Quartier", label: "Eco-Quartier" },
      { value: "Gare du Nord", label: "Gare du Nord" },
    ],
  },
]

export default function HsePage() {
  // // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null)
  const [showInspectionDialog, setShowInspectionDialog] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Inspection | null>(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null)

  // Calculate stats
  const stats = useMemo(() => {
    const compliant = inspections.filter((i) => i.status === "compliant").length
    const revision = inspections.filter((i) => i.status === "revision").length
    const alerts = inspections.filter((i) => i.alert).length
    const trainingsRate = Math.round(
      trainings.reduce((sum, t) => sum + (t.completed / t.total) * 100, 0) / trainings.length
    )
    return { compliant, revision, alerts, trainingsRate }
  }, [])

  // Filter inspections based on active stat filter
  const filteredByStatInspections = useMemo(() => {
    if (!activeStatFilter) return inspections
    if (activeStatFilter === "all") return inspections
    if (activeStatFilter === "alerts") return inspections.filter((i) => i.alert)
    return inspections.filter((i) => i.status === activeStatFilter)
  }, [activeStatFilter])

  const handleStatClick = (filter: string | null) => {
    if (activeStatFilter === filter) {
      setActiveStatFilter(null)
      toast.info("Filtre retire", { description: "Affichage de tous les controles" })
    } else {
      setActiveStatFilter(filter)
      const filterLabels: Record<string, string> = {
        all: "tous les controles",
        compliant: "controles conformes",
        revision: "controles a reviser",
        alerts: "alertes actives",
      }
      toast.info("Filtre applique", { description: `Affichage des ${filterLabels[filter || "all"]}` })
    }
  }

  const handleInspectionAction = (action: string, inspection: Inspection) => {
    switch (action) {
      case "view":
        setSelectedInspection(inspection)
        setShowInspectionDialog(true)
        break
      case "edit":
        toast.info("Edition", { description: `Modification de ${inspection.item}` })
        break
      case "report":
        toast.success("Rapport genere", { description: `Rapport PDF pour ${inspection.item}` })
        break
      case "notify":
        toast.success("Notification envoyee", { description: `Equipe notifiee pour ${inspection.item}` })
        break
    }
  }

  const handleAlertClick = (inspection: Inspection) => {
    setSelectedAlert(inspection)
    setShowAlertDialog(true)
  }

  const handleResolveAlert = (inspection: Inspection) => {
    toast.success("Alerte resolue", { description: `${inspection.item} marque comme traite` })
    setShowAlertDialog(false)
  }

  const columns: ColumnConfig<Inspection>[] = [
    {
      key: "item",
      label: "Element",
      sortable: true,
      render: (inspection) => (
        <div>
          <p className="font-medium">{inspection.item}</p>
          <p className="text-xs text-muted-foreground">{inspection.inspector}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: t("status"),
      sortable: true,
      render: (inspection) =>
        inspection.status === "compliant" ? (
          <Badge
            className="bg-chart-2/20 text-chart-2 hover:bg-chart-2/30 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleStatClick("compliant")
            }}
          >
            <CheckCircle className="mr-1 h-3 w-3" />
            {t("compliant")}
          </Badge>
        ) : (
          <Badge
            variant="destructive"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleStatClick("revision")
            }}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {t("toRevise")}
          </Badge>
        ),
    },
    {
      key: "verifiedDate",
      label: t("verifiedOn"),
      sortable: true,
      className: "text-muted-foreground",
    },
    {
      key: "location",
      label: "Site",
      sortable: true,
      render: (inspection) => (
        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
          {inspection.location}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-[50px]",
      render: (inspection) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleInspectionAction("view", inspection)}>
                <Eye className="mr-2 h-4 w-4" />
                Voir details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleInspectionAction("edit", inspection)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleInspectionAction("report", inspection)}>
                <FileText className="mr-2 h-4 w-4" />
                Generer rapport
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleInspectionAction("notify", inspection)}>
                <Send className="mr-2 h-4 w-4" />
                Notifier equipe
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("hse")}</h1>
        <p className="text-muted-foreground">Hygiene, Securite et Environnement - Suivi Terrain</p>
      </div>

      {/* Interactive Stats */}
      <StatCardList>
        <InteractiveStatCard
          label={t("daysWithoutAccident")}
          value="142"
          icon={Award}
          variant="success"
        />
        <InteractiveStatCard
          label={t("trainingsUpToDate")}
          value={`${stats.trainingsRate}%`}
          icon={HardHat}
          variant="default"
          description="Taux global formations"
        />
        <InteractiveStatCard
          label="Controles Conformes"
          value={stats.compliant}
          icon={CheckCircle}
          variant="success"
          onClick={() => handleStatClick("compliant")}
          isActive={activeStatFilter === "compliant"}
        />
        <InteractiveStatCard
          label="Points a Reviser"
          value={stats.revision}
          icon={AlertTriangle}
          variant="danger"
          onClick={() => handleStatClick("revision")}
          isActive={activeStatFilter === "revision"}
        />
        <InteractiveStatCard
          label="Alertes Actives"
          value={stats.alerts}
          icon={AlertTriangle}
          variant="warning"
          onClick={() => handleStatClick("alerts")}
          isActive={activeStatFilter === "alerts"}
          description="Requiert attention"
        />
      </StatCardList>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inspections Table with Pagination */}
        <Card className="bg-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Controles Recents</CardTitle>
            <CardDescription>Dernieres inspections terrain</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTablePaginated
              data={filteredByStatInspections}
              columns={columns}
              filters={filterConfigs}
              searchKeys={["item", "inspector", "location"] as (keyof Inspection)[]}
              pageSize={5}
              onRowClick={(row) => handleInspectionAction("view", row as unknown as Inspection)}
              showResultCount
            />
          </CardContent>
        </Card>

        {/* Trainings Progress */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Formations</CardTitle>
            <CardDescription>Taux de conformite par type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {trainings.map((training) => {
              const percentage = Math.round((training.completed / training.total) * 100)
              return (
                <div
                  key={training.name}
                  className="space-y-2 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
                  onClick={() =>
                    toast.info("Formation", { description: `Voir details de ${training.name}` })
                  }
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{training.name}</span>
                    <span className="text-muted-foreground">
                      {training.completed}/{training.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={percentage} className="h-2" />
                    <span
                      className={`text-sm font-medium ${
                        percentage === 100
                          ? "text-chart-2"
                          : percentage >= 90
                            ? "text-chart-3"
                            : "text-destructive"
                      }`}
                    >
                      {percentage}%
                    </span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {stats.alerts > 0 && (
        <Card className="bg-card border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Alertes Actives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {inspections
                .filter((i) => i.alert)
                .map((inspection) => (
                  <div
                    key={inspection.id}
                    className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 cursor-pointer transition-colors hover:bg-destructive/10"
                    onClick={() => handleAlertClick(inspection)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{inspection.item}</p>
                      <p className="text-sm text-destructive">
                        {t("alert")}: {inspection.alert}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {inspection.location} - {inspection.verifiedDate}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleResolveAlert(inspection)
                      }}
                    >
                      Resoudre
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inspection Detail Dialog */}
      <Dialog open={showInspectionDialog} onOpenChange={setShowInspectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {selectedInspection?.item}
            </DialogTitle>
            <DialogDescription>Details du controle HSE</DialogDescription>
          </DialogHeader>

          {selectedInspection && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Inspecteur</p>
                  <p className="font-medium">{selectedInspection.inspector}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedInspection.verifiedDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Site</p>
                  <p className="font-medium">{selectedInspection.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Statut</p>
                  {selectedInspection.status === "compliant" ? (
                    <Badge className="bg-chart-2/20 text-chart-2">Conforme</Badge>
                  ) : (
                    <Badge variant="destructive">A reviser</Badge>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <p className="text-sm font-medium mb-1">Notes</p>
                <p className="text-sm text-muted-foreground">{selectedInspection.notes}</p>
              </div>

              {selectedInspection.alert && (
                <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <p className="text-sm font-medium text-destructive">Alerte Active</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedInspection.alert}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInspectionDialog(false)}>
              Fermer
            </Button>
            <Button
              onClick={() => {
                handleInspectionAction("report", selectedInspection!)
                setShowInspectionDialog(false)
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Generer Rapport
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Resolution Dialog */}
      <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Resolution d&apos;Alerte
            </DialogTitle>
            <DialogDescription>Confirmer la resolution de cette alerte HSE</DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="font-medium">{selectedAlert.item}</p>
                <p className="text-sm text-destructive mt-1">{selectedAlert.alert}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedAlert.location} - {selectedAlert.verifiedDate}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Confirmez-vous que cette alerte a ete traitee et peut etre marquee comme resolue?
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlertDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => handleResolveAlert(selectedAlert!)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmer Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
