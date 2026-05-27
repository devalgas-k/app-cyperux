"use client"

import { useState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Clock, 
  Shield, 
  FileText, 
  ClipboardList, 
  Bell, 
  Settings,
  ChevronRight,
  Edit,
  Lock,
  Eye,
  LogOut,
  Activity,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  AlertTriangle,
  Briefcase,
  Award
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Separator } from "@/shared/components/ui/separator"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Progress } from "@/shared/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { toast } from "sonner"
import { Link } from "react-router-dom"

// Donnees utilisateur simulees
const userData = {
  id: "user-001",
  firstName: "Jean",
  lastName: "Petit",
  initials: "JP",
  email: "jean.petit@eiffage.com",
  phone: "+33 6 12 34 56 78",
  role: "Chef de Projet",
  department: "Direction Technique",
  team: "Equipe Chantier Nord",
  organization: "Eiffage Construction IDF",
  status: "active",
  lastLogin: "2024-01-15T09:30:00",
  createdAt: "2023-03-01",
  permissions: ["projects.manage", "documents.create", "reports.submit", "team.view"],
}

// Activite recente
const recentActivity = [
  { id: 1, type: "document", action: "Cree", item: "Rapport HSE - Janvier 2024", date: "Il y a 2h", icon: FileText },
  { id: 2, type: "task", action: "Termine", item: "Inspection securite Zone A", date: "Il y a 4h", icon: CheckCircle2 },
  { id: 3, type: "report", action: "Soumis", item: "Rapport journalier #127", date: "Hier", icon: FileCheck },
  { id: 4, type: "comment", action: "Commente", item: "Plan de construction Bat. B", date: "Hier", icon: MessageSquare },
  { id: 5, type: "alert", action: "Resolu", item: "Alerte meteo chantier", date: "Il y a 2j", icon: AlertTriangle },
  { id: 6, type: "document", action: "Modifie", item: "Planning semaine 3", date: "Il y a 3j", icon: FileText },
  { id: 7, type: "task", action: "Assigne", item: "Coordination sous-traitants", date: "Il y a 4j", icon: Briefcase },
  { id: 8, type: "report", action: "Valide", item: "Rapport qualite Q4", date: "Il y a 5j", icon: Award },
]

// Statistiques utilisateur
const userStats = [
  { label: "Documents crees", value: 47, change: "+12 ce mois" },
  { label: "Rapports soumis", value: 23, change: "+5 ce mois" },
  { label: "Taches terminees", value: 89, change: "+18 ce mois" },
  { label: "Heures connecte", value: 156, change: "ce mois" },
]

// Acces rapides
const quickLinks = [
  { label: "Mes documents", href: "/documents?owner=me", icon: FileText, count: 47 },
  { label: "Mes rapports", href: "/daily-report?owner=me", icon: FileCheck, count: 23 },
  { label: "Mes taches", href: "/projects?tasks=assigned", icon: ClipboardList, count: 12 },
  { label: "Notifications", href: "/notifications", icon: Bell, count: 3 },
  { label: "Parametres", href: "/settings", icon: Settings, count: null },
]

export default function ProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleSaveProfile = () => {
    toast.success("Profil mis a jour avec succes")
    setIsEditDialogOpen(false)
  }

  const handleChangePassword = () => {
    toast.success("Un email de reinitialisation a ete envoye")
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
          <p className="text-muted-foreground">Gerez vos informations personnelles et parametres</p>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Modifier le profil
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Modifier le profil</DialogTitle>
              <DialogDescription>Mettez a jour vos informations personnelles</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prenom</Label>
                  <Input id="firstName" defaultValue={userData.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue={userData.lastName} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telephone</Label>
                <Input id="phone" defaultValue={userData.phone} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleSaveProfile}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Card */}
        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userData.initials}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h2>
                <p className="text-muted-foreground">{userData.role}</p>
                <Badge variant="default" className="mt-2 bg-chart-2">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    Actif
                  </span>
                </Badge>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.team}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Membre depuis {new Date(userData.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Derniere connexion: {new Date(userData.lastLogin).toLocaleString("fr-FR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Acces rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.href}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{link.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.count !== null && (
                      <Badge variant="secondary" className="text-xs">{link.count}</Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activite</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="security">Securite</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Activite recente
                  </CardTitle>
                  <CardDescription>Historique de vos actions sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            <activity.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{activity.action}</span>{" "}
                              <span className="text-muted-foreground">{activity.item}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="shrink-0">
                            <Eye className="h-4 w-4" />
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
                  <CardTitle className="text-base">Statistiques personnelles</CardTitle>
                  <CardDescription>Votre contribution a la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {userStats.map((stat) => (
                      <Card key={stat.label}>
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold">{stat.value}</div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-xs text-chart-2 mt-1">{stat.change}</p>
                          <Progress value={Math.random() * 100} className="mt-3 h-1" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Securite du compte
                  </CardTitle>
                  <CardDescription>Gerez la securite de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Mot de passe</p>
                        <p className="text-sm text-muted-foreground">Derniere modification il y a 30 jours</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleChangePassword}>Changer</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Authentification a deux facteurs</p>
                        <p className="text-sm text-muted-foreground">Protegez votre compte avec 2FA</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Sessions actives</p>
                        <p className="text-sm text-muted-foreground">2 appareils connectes</p>
                      </div>
                    </div>
                    <Button variant="outline">Gerer</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <LogOut className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-destructive">Deconnexion de tous les appareils</p>
                        <p className="text-sm text-muted-foreground">Deconnecte toutes les sessions actives</p>
                      </div>
                    </div>
                    <Button variant="destructive">Deconnecter</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Preferences
                  </CardTitle>
                  <CardDescription>Personnalisez votre experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Notifications email</p>
                          <p className="text-xs text-muted-foreground">Recevoir les alertes par email</p>
                        </div>
                        <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Notifications push</p>
                          <p className="text-xs text-muted-foreground">Alertes dans le navigateur</p>
                        </div>
                        <Switch checked={notifPush} onCheckedChange={setNotifPush} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Notifications SMS</p>
                          <p className="text-xs text-muted-foreground">Alertes urgentes par SMS</p>
                        </div>
                        <Switch checked={notifSMS} onCheckedChange={setNotifSMS} />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-4">Affichage</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Mode sombre</p>
                          <p className="text-xs text-muted-foreground">Utiliser le theme sombre</p>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
