"use client"

import { useState } from "react"
import { 
  Building2, 
  Users, 
  FolderKanban, 
  FileText, 
  ClipboardList, 
  Truck, 
  AlertTriangle,
  ChevronRight,
  Settings,
  Shield,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  FileCheck,
  Cog,
  BarChart3,
  Layers,
  Network,
  Crown,
  UserCog,
  Briefcase
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Separator } from "@/shared/components/ui/separator"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Progress } from "@/shared/components/ui/progress"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { cn } from "@/shared/utils"

// Donnees organisation simulees
const orgData = {
  id: "tenant-ef-001",
  name: "Eiffage Construction IDF",
  logo: "EF",
  region: "Ile-de-France",
  type: "Filiale Construction",
  status: "operational",
  address: "3 Avenue Morane Saulnier, 78140 Velizy-Villacoublay",
  phone: "+33 1 34 65 89 89",
  email: "contact@eiffage-idf.fr",
  website: "www.eiffage.com",
  createdAt: "2020-01-15",
  usersCount: 156,
  activeProjects: 12,
}

// KPIs organisation
const orgKPIs = [
  { 
    key: "projects",
    label: "Projets Actifs", 
    value: 12, 
    change: "+2", 
    trend: "up",
    icon: FolderKanban,
    href: "/projects",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  { 
    key: "documents",
    label: "Documents", 
    value: 1247, 
    change: "+89 ce mois", 
    trend: "up",
    icon: FileText,
    href: "/documents",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  { 
    key: "reports",
    label: "Rapports Journaliers", 
    value: 342, 
    change: "+28 ce mois", 
    trend: "up",
    icon: ClipboardList,
    href: "/daily-report",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  { 
    key: "subcontractors",
    label: "Sous-traitants", 
    value: 47, 
    change: "+3", 
    trend: "up",
    icon: Truck,
    href: "/subcontractors",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10"
  },
  { 
    key: "resources",
    label: "Ressources", 
    value: 234, 
    change: "89 disponibles", 
    trend: "neutral",
    icon: Users,
    href: "/resources",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  { 
    key: "incidents",
    label: "Incidents/Aleas", 
    value: 8, 
    change: "-3 vs mois dernier", 
    trend: "down",
    icon: AlertTriangle,
    href: "/site-issues",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10"
  },
]

// Structure organisationnelle
const orgStructure = [
  {
    name: "Direction Generale",
    role: "Executive",
    members: 3,
    head: { name: "Marie Dubois", initials: "MD", role: "Directrice Generale" },
    subTeams: []
  },
  {
    name: "Direction Technique",
    role: "Management",
    members: 12,
    head: { name: "Pierre Martin", initials: "PM", role: "Directeur Technique" },
    subTeams: [
      { name: "Bureau d'Etudes", members: 8 },
      { name: "Methodes", members: 4 },
    ]
  },
  {
    name: "Direction Travaux",
    role: "Operations",
    members: 85,
    head: { name: "Jean Petit", initials: "JP", role: "Directeur Travaux" },
    subTeams: [
      { name: "Equipe Chantier Nord", members: 28 },
      { name: "Equipe Chantier Sud", members: 32 },
      { name: "Equipe Chantier Est", members: 25 },
    ]
  },
  {
    name: "Direction HSE",
    role: "Support",
    members: 8,
    head: { name: "Sophie Leroy", initials: "SL", role: "Responsable HSE" },
    subTeams: []
  },
  {
    name: "Direction Administrative",
    role: "Support",
    members: 15,
    head: { name: "Luc Bernard", initials: "LB", role: "DAF" },
    subTeams: [
      { name: "Comptabilite", members: 6 },
      { name: "RH", members: 5 },
      { name: "Achats", members: 4 },
    ]
  },
]

// Timeline activite
const orgActivity = [
  { id: 1, type: "project", action: "Nouveau projet", item: "Tour Horizon - La Defense", user: "Marie Dubois", date: "Il y a 2h", icon: FolderKanban },
  { id: 2, type: "user", action: "Nouvel utilisateur", item: "Thomas Durand rejoint l'equipe", user: "RH", date: "Il y a 4h", icon: UserPlus },
  { id: 3, type: "report", action: "Rapport valide", item: "Rapport mensuel HSE", user: "Sophie Leroy", date: "Hier", icon: FileCheck },
  { id: 4, type: "incident", action: "Incident resolu", item: "Retard livraison materiaux", user: "Jean Petit", date: "Hier", icon: CheckCircle2 },
  { id: 5, type: "document", action: "Document publie", item: "Procedures securite 2024", user: "Direction HSE", date: "Il y a 2j", icon: FileText },
  { id: 6, type: "config", action: "Configuration", item: "Mise a jour des roles", user: "Admin", date: "Il y a 3j", icon: Cog },
]

// Acces rapides organisation
const orgQuickLinks = [
  { label: "Gestion des equipes", href: "/resources", icon: Users, description: "Equipes et membres" },
  { label: "Gestion documentaire", href: "/documents", icon: FileText, description: "Documents et archives" },
  { label: "Logistique", href: "/logistics", icon: Truck, description: "Livraisons et stocks" },
  { label: "Ressources", href: "/resources", icon: Briefcase, description: "Personnel et materiel" },
  { label: "Planning", href: "/planning", icon: Calendar, description: "Calendrier global" },
  { label: "Parametres", href: "/admin", icon: Settings, description: "Configuration organisation" },
]

export default function OrganizationPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const handleKPIClick = (key: string) => {
    setActiveFilter(activeFilter === key ? null : key)
    toast.info(`Filtre applique: ${key}`)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Organisation</h1>
          <p className="text-muted-foreground">Vue d&apos;ensemble de {orgData.name}</p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link to="/templates/admin">
            <Settings className="h-4 w-4" />
            Parametres
          </Link>
        </Button>
      </div>

      {/* Organization Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-primary-foreground text-2xl font-bold shrink-0">
              {orgData.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">{orgData.name}</h2>
                <Badge variant="default" className="bg-chart-2">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    Operationnel
                  </span>
                </Badge>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{orgData.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span>{orgData.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{orgData.usersCount} utilisateurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  <span>{orgData.activeProjects} projets actifs</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm shrink-0">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{orgData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{orgData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{orgData.website}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {orgKPIs.map((kpi) => (
          <Card 
            key={kpi.key}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              activeFilter === kpi.key && "ring-2 ring-primary"
            )}
            onClick={() => handleKPIClick(kpi.key)}
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg", kpi.bgColor)}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
                {kpi.trend === "up" && <TrendingUp className="h-4 w-4 text-chart-2" />}
                {kpi.trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
              </div>
              <div className="text-2xl font-bold">{kpi.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-xs text-chart-2 mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="structure" className="space-y-4">
            <TabsList>
              <TabsTrigger value="structure" className="gap-2">
                <Network className="h-4 w-4" />
                Structure
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" />
                Activite
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistiques
              </TabsTrigger>
            </TabsList>

            {/* Structure Tab */}
            <TabsContent value="structure">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Structure organisationnelle
                  </CardTitle>
                  <CardDescription>Equipes, roles et hierarchie</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orgStructure.map((dept, idx) => (
                      <div key={dept.name} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              {dept.role === "Executive" && <Crown className="h-5 w-5 text-primary" />}
                              {dept.role === "Management" && <UserCog className="h-5 w-5 text-primary" />}
                              {dept.role === "Operations" && <Briefcase className="h-5 w-5 text-primary" />}
                              {dept.role === "Support" && <Shield className="h-5 w-5 text-primary" />}
                            </div>
                            <div>
                              <h4 className="font-medium">{dept.name}</h4>
                              <p className="text-xs text-muted-foreground">{dept.members} membres</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-secondary">{dept.head.initials}</AvatarFallback>
                            </Avatar>
                            <div className="text-right">
                              <p className="text-sm font-medium">{dept.head.name}</p>
                              <p className="text-xs text-muted-foreground">{dept.head.role}</p>
                            </div>
                          </div>
                        </div>
                        {dept.subTeams.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex flex-wrap gap-2">
                              {dept.subTeams.map((team) => (
                                <Badge key={team.name} variant="secondary" className="gap-1">
                                  <Users className="h-3 w-3" />
                                  {team.name} ({team.members})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Activite recente
                  </CardTitle>
                  <CardDescription>Timeline des evenements de l&apos;organisation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {orgActivity.map((event) => (
                        <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 shrink-0">
                            <event.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{event.action}</span>{" "}
                              <span className="text-muted-foreground">- {event.item}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">Par {event.user}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance globale</CardTitle>
                  <CardDescription>Indicateurs de performance de l&apos;organisation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Taux d&apos;achevement projets</span>
                        <span className="text-sm text-chart-2">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Conformite HSE</span>
                        <span className="text-sm text-chart-2">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Utilisation ressources</span>
                        <span className="text-sm text-amber-500">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Satisfaction sous-traitants</span>
                        <span className="text-sm text-chart-2">91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-chart-2/10">
                        <div className="text-2xl font-bold text-chart-2">98.5%</div>
                        <p className="text-xs text-muted-foreground">Uptime systeme</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <div className="text-2xl font-bold text-primary">4.8/5</div>
                        <p className="text-xs text-muted-foreground">Score NPS</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Quick Access */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Acces rapides</CardTitle>
              <CardDescription>Gestion de l&apos;organisation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {orgQuickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Identifiant</span>
                <span className="font-mono text-xs">{orgData.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adresse</span>
                <span className="text-right text-xs max-w-[200px]">{orgData.address}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cree le</span>
                <span>{new Date(orgData.createdAt).toLocaleDateString("fr-FR")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
