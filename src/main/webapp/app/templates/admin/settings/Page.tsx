"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { 
  Users, 
  Shield, 
  Key, 
  Lock, 
  Mail, 
  MoreHorizontal, 
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  UserCog,
  HardHat,
  Briefcase,
  Building,
  X,
  Sparkles,
  Send,
  Edit,
  Trash2,
  UserPlus,
  ChevronLeft,
  Clock,
  Globe,
  Palette,
  Upload,
  Check,
  Settings,
  Eye,
  FileEdit,
  DollarSign,
  Download,
  UserX
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Switch } from "@/shared/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Separator } from "@/shared/components/ui/separator"

// Extended user list with more detailed information
const users = [
  { id: 1, name: "Jean Dupont", email: "j.dupont@eiffage.fr", role: "Admin", status: "Actif", lastAccess: "Il y a 5 min", twoFactor: true, avatar: "JD" },
  { id: 2, name: "Marie Martin", email: "m.martin@eiffage.fr", role: "Chef de Projet", status: "Actif", lastAccess: "Il y a 1h", twoFactor: true, avatar: "MM" },
  { id: 3, name: "Pierre Durand", email: "p.durand@eiffage.fr", role: "Chef de Projet", status: "Actif", lastAccess: "Il y a 2h", twoFactor: true, avatar: "PD" },
  { id: 4, name: "Sophie Bernard", email: "s.bernard@eiffage.fr", role: "Conducteur", status: "Actif", lastAccess: "Aujourd'hui", twoFactor: true, avatar: "SB" },
  { id: 5, name: "Luc Petit", email: "l.petit@eiffage.fr", role: "Conducteur", status: "Actif", lastAccess: "Hier", twoFactor: true, avatar: "LP" },
  { id: 6, name: "Claire Moreau", email: "c.moreau@eiffage.fr", role: "Chef de Projet", status: "Invité", lastAccess: "Il y a 2 jours", twoFactor: false, avatar: "CM" },
  { id: 7, name: "Thomas Robert", email: "t.robert@eiffage.fr", role: "Sous-traitant", status: "Actif", lastAccess: "Il y a 3 jours", twoFactor: true, avatar: "TR" },
  { id: 8, name: "Julie Leroy", email: "j.leroy@eiffage.fr", role: "Admin", status: "Actif", lastAccess: "Il y a 30 min", twoFactor: true, avatar: "JL" },
  { id: 9, name: "Marc Simon", email: "m.simon@eiffage.fr", role: "Conducteur", status: "Actif", lastAccess: "Aujourd'hui", twoFactor: true, avatar: "MS" },
  { id: 10, name: "Anne Laurent", email: "a.laurent@eiffage.fr", role: "Chef de Projet", status: "Actif", lastAccess: "Il y a 3h", twoFactor: true, avatar: "AL" },
  { id: 11, name: "François Garcia", email: "f.garcia@externe.fr", role: "Sous-traitant", status: "Invité", lastAccess: "Il y a 95 jours", twoFactor: false, avatar: "FG", inactive: true },
  { id: 12, name: "Nathalie Roux", email: "n.roux@eiffage.fr", role: "Conducteur", status: "Actif", lastAccess: "Hier", twoFactor: true, avatar: "NR" },
  { id: 13, name: "David Fournier", email: "d.fournier@externe.fr", role: "Sous-traitant", status: "Invité", lastAccess: "Il y a 120 jours", twoFactor: false, avatar: "DF", inactive: true },
  { id: 14, name: "Isabelle Morel", email: "i.morel@eiffage.fr", role: "Admin", status: "Actif", lastAccess: "Il y a 2h", twoFactor: true, avatar: "IM" },
  { id: 15, name: "Paul Girard", email: "p.girard@externe.fr", role: "Sous-traitant", status: "Invité", lastAccess: "Il y a 98 jours", twoFactor: false, avatar: "PG", inactive: true },
]

// RBAC Permissions Matrix
const roles = [
  { 
    id: "admin", 
    name: "Admin", 
    description: "Accès complet au système",
    color: "violet",
    permissions: { read: true, edit: true, delete: true, finance: true, admin: true }
  },
  { 
    id: "pm", 
    name: "Chef de Projet", 
    description: "Gestion des projets et équipes",
    color: "blue",
    permissions: { read: true, edit: true, delete: false, finance: true, admin: false }
  },
  { 
    id: "conductor", 
    name: "Conducteur", 
    description: "Suivi terrain et saisie",
    color: "emerald",
    permissions: { read: true, edit: true, delete: false, finance: false, admin: false }
  },
  { 
    id: "subcontractor", 
    name: "Sous-traitant", 
    description: "Accès limité aux projets assignés",
    color: "amber",
    permissions: { read: true, edit: false, delete: false, finance: false, admin: false }
  },
]

const permissionLabels = [
  { key: "read", label: "Lecture seule", icon: Eye },
  { key: "edit", label: "Édition", icon: FileEdit },
  { key: "delete", label: "Suppression", icon: Trash2 },
  { key: "finance", label: "Validation financière", icon: DollarSign },
  { key: "admin", label: "Administration", icon: Settings },
]

export default function AdminSettingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [selectedRole, setSelectedRole] = useState("admin")
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "J'ai remarqué 3 comptes inactifs depuis plus de 90 jours (François Garcia, David Fournier, Paul Girard). Souhaitez-vous les désactiver pour optimiser vos licences SaaS ?" }
  ])
  const [aiInput, setAiInput] = useState("")
  const [tenantLogo, setTenantLogo] = useState<string | null>(null)
  const [brandColor, setBrandColor] = useState("#593196")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const inactiveUsers = users.filter(u => u.inactive)

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30"><UserCog className="h-3 w-3 mr-1" />Admin</Badge>
      case "Chef de Projet":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Briefcase className="h-3 w-3 mr-1" />Chef de Projet</Badge>
      case "Conducteur":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"><HardHat className="h-3 w-3 mr-1" />Conducteur</Badge>
      case "Sous-traitant":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30"><Building className="h-3 w-3 mr-1" />Sous-traitant</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string, inactive?: boolean) => {
    if (inactive) {
      return <Badge variant="destructive" className="gap-1"><Clock className="h-3 w-3" />Inactif 90j+</Badge>
    }
    switch (status) {
      case "Actif":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Actif</Badge>
      case "Invité":
        return <Badge variant="secondary">Invité</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "Parfait ! J'ai désactivé les 3 comptes inactifs et libéré leurs licences. Un email de notification a été envoyé aux utilisateurs concernés. Vous économisez 45€/mois sur votre abonnement." }
    ])
    setAiInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Breadcrumb */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/templates/admin" className="hover:text-foreground transition-colors">Administration</Link>
            <span>/</span>
            <span className="text-foreground">Gestion des Utilisateurs</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Administration & Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">Centre de controle de securite et gestion des acces (US-001/002)</p>
        </div>
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvel utilisateur</DialogTitle>
              <DialogDescription>Creer un nouveau compte utilisateur</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nom complet</Label>
                <Input placeholder="Jean Dupont" />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="j.dupont@eiffage.fr" />
              </div>
              <div className="grid gap-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner un role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="pm">Chef de Projet</SelectItem>
                    <SelectItem value="conductor">Conducteur</SelectItem>
                    <SelectItem value="subcontractor">Sous-traitant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Forcer 2FA a la connexion</Label>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>Annuler</Button>
              <Button onClick={() => setShowAddUser(false)}>Creer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="rbac" className="gap-2">
            <Shield className="h-4 w-4" />
            Roles RBAC
          </TabsTrigger>
          <TabsTrigger value="tenant" className="gap-2">
            <Building className="h-4 w-4" />
            Tenant
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Utilisateurs</p>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Actifs</p>
                    <p className="text-3xl font-bold text-emerald-400">{users.filter(u => u.status === "Actif").length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Invites</p>
                    <p className="text-3xl font-bold text-amber-400">{users.filter(u => u.status === "Invité").length}</p>
                  </div>
                  <Mail className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Inactifs 90j+</p>
                    <p className="text-3xl font-bold text-destructive">{inactiveUsers.length}</p>
                  </div>
                  <UserX className="h-8 w-8 text-destructive" />
                </div>
                <p className="text-xs text-destructive mt-2">Licences a optimiser</p>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Liste des Utilisateurs</CardTitle>
                  <CardDescription>{filteredUsers.length} utilisateur(s) affiches</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Rechercher..." 
                      className="pl-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Chef de Projet">Chef de Projet</SelectItem>
                      <SelectItem value="Conducteur">Conducteur</SelectItem>
                      <SelectItem value="Sous-traitant">Sous-traitant</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernier acces</TableHead>
                    <TableHead>2FA</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className={user.inactive ? "bg-destructive/5" : ""}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`text-xs ${user.inactive ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}`}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status, user.inactive)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.lastAccess}</TableCell>
                      <TableCell>
                        {user.twoFactor ? (
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Modifier</DropdownMenuItem>
                            <DropdownMenuItem><Mail className="h-4 w-4 mr-2" />Envoyer email</DropdownMenuItem>
                            <DropdownMenuItem><Key className="h-4 w-4 mr-2" />Reset mot de passe</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-amber-500"><Lock className="h-4 w-4 mr-2" />Verrouiller</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Desactiver</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RBAC Tab */}
        <TabsContent value="rbac" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Roles List */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>Selectionner un role pour voir ses permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                      selectedRole === role.id 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${role.color}-500/20`}>
                      <Shield className={`h-5 w-5 text-${role.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                    {selectedRole === role.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Creer un role
                </Button>
              </CardContent>
            </Card>

            {/* Permissions Matrix */}
            <Card className="border-border/50 bg-card/50 lg:col-span-2">
              <CardHeader>
                <CardTitle>Matrice des Permissions (RBAC)</CardTitle>
                <CardDescription>
                  Configuration des droits pour le role : {roles.find(r => r.id === selectedRole)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissionLabels.map((permission) => {
                    const currentRole = roles.find(r => r.id === selectedRole)
                    const isEnabled = currentRole?.permissions[permission.key as keyof typeof currentRole.permissions]
                    return (
                      <div 
                        key={permission.key} 
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isEnabled ? "bg-emerald-500/20" : "bg-muted"}`}>
                            <permission.icon className={`h-5 w-5 ${isEnabled ? "text-emerald-400" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <p className="font-medium">{permission.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {permission.key === "read" && "Consulter les donnees sans modification"}
                              {permission.key === "edit" && "Modifier et creer des enregistrements"}
                              {permission.key === "delete" && "Supprimer definitivement des donnees"}
                              {permission.key === "finance" && "Valider les budgets et paiements"}
                              {permission.key === "admin" && "Gerer les utilisateurs et parametres"}
                            </p>
                          </div>
                        </div>
                        <Checkbox 
                          checked={isEnabled} 
                          className="h-5 w-5"
                        />
                      </div>
                    )
                  })}
                </div>
                <Separator className="my-6" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reinitialiser</Button>
                  <Button>Enregistrer les modifications</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tenant Settings Tab */}
        <TabsContent value="tenant" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Branding */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Personnalisation de la Marque
                </CardTitle>
                <CardDescription>Logo et couleurs de votre organisation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Logo Entreprise</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                      {tenantLogo ? (
                        <img src={tenantLogo} alt="Logo" className="h-16 w-16 object-contain" />
                      ) : (
                        <Building className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Telecharger
                      </Button>
                      <p className="text-xs text-muted-foreground">PNG, SVG ou JPG (max 2MB)</p>
                    </div>
                  </div>
                </div>

                {/* Brand Color */}
                <div className="space-y-2">
                  <Label>Couleur Principale</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-lg border border-border cursor-pointer"
                      style={{ backgroundColor: brandColor }}
                    />
                    <Input 
                      value={brandColor} 
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-32 font-mono"
                    />
                    <div className="flex gap-1">
                      {["#593196", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setBrandColor(color)}
                          className={`h-6 w-6 rounded border ${brandColor === color ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label>Apercu</Label>
                  <div className="rounded-lg border border-border p-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-8 w-8 rounded flex items-center justify-center"
                        style={{ backgroundColor: brandColor }}
                      >
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">Eiffage Construction IDF</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Parametres du Tenant
                </CardTitle>
                <CardDescription>Configuration regionale et preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Nom de l&apos;Organisation</Label>
                  <Input defaultValue="Eiffage Construction IDF" />
                </div>

                <div className="space-y-2">
                  <Label>Fuseau Horaire</Label>
                  <Select defaultValue="europe-paris">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="america-ny">America/New_York (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Devise</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                      <SelectItem value="usd">Dollar US (USD)</SelectItem>
                      <SelectItem value="gbp">Livre Sterling (GBP)</SelectItem>
                      <SelectItem value="chf">Franc Suisse (CHF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Format de Date</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY (31/12/2024)</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (12/31/2024)</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2024-12-31)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Langue par Defaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Francais</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="es">Espanol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />
                
                <div className="flex justify-end">
                  <Button>Enregistrer les parametres</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Policies Card */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Politiques de Securite
              </CardTitle>
              <CardDescription>Configuration des regles de securite globales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="font-medium">2FA Obligatoire</p>
                      <p className="text-xs text-muted-foreground">Pour tous les utilisateurs</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="font-medium">Mot de passe fort</p>
                      <p className="text-xs text-muted-foreground">Min. 12 caracteres</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400">Haute</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-xs text-muted-foreground">Deconnexion auto</p>
                    </div>
                  </div>
                  <Badge variant="secondary">30 min</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-xs text-muted-foreground">Restriction geographique</p>
                    </div>
                  </div>
                  <Badge variant="secondary">12 IPs</Badge>
                </div>
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
                  <CardTitle className="text-sm">Assistant Administration</CardTitle>
                  <CardDescription className="text-xs">Optimisation des licences</CardDescription>
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
            <div className="p-4 pt-0">
              <div className="flex gap-2 mb-2">
                <Button size="sm" variant="outline" className="text-xs" onClick={() => {
                  setAiMessages(prev => [...prev, 
                    { role: "user", content: "Oui, desactiver les comptes inactifs" },
                    { role: "assistant", content: "Parfait ! J'ai desactive les 3 comptes inactifs et libere leurs licences. Un email de notification a ete envoye aux utilisateurs concernes. Vous economisez 45eur/mois sur votre abonnement." }
                  ])
                }}>
                  Desactiver les comptes
                </Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => {
                  setAiMessages(prev => [...prev, 
                    { role: "user", content: "Non, envoyer un rappel" },
                    { role: "assistant", content: "J'ai envoye un email de rappel aux 3 utilisateurs inactifs leur demandant de se reconnecter sous 7 jours. Passe ce delai, leurs comptes seront automatiquement desactives." }
                  ])
                }}>
                  Envoyer un rappel
                </Button>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Repondre..." 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendAI()}
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSendAI}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
          onClick={() => setShowAIChat(true)}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
