"use client"

import { useState } from "react"
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
  ShieldAlert,
  UserCog,
  HardHat,
  Briefcase,
  X,
  Sparkles,
  Send,
  MessageSquare,
  Edit,
  Trash2,
  UserPlus
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
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
import { Textarea } from "@/shared/components/ui/textarea"

const users = [
  { id: 1, name: "Jean Dupont", email: "j.dupont@eiffage.fr", role: "Admin", department: "Direction", status: "active", lastLogin: "Il y a 5 min", twoFactor: true, avatar: "JD" },
  { id: 2, name: "Marie Martin", email: "m.martin@eiffage.fr", role: "Project Manager", department: "Projets", status: "active", lastLogin: "Il y a 1h", twoFactor: true, avatar: "MM" },
  { id: 3, name: "Pierre Durand", email: "p.durand@eiffage.fr", role: "Project Manager", department: "Projets", status: "active", lastLogin: "Il y a 2h", twoFactor: true, avatar: "PD" },
  { id: 4, name: "Sophie Bernard", email: "s.bernard@eiffage.fr", role: "Worker", department: "Chantier Hekla", status: "active", lastLogin: "Aujourd'hui", twoFactor: false, avatar: "SB" },
  { id: 5, name: "Luc Petit", email: "l.petit@eiffage.fr", role: "Worker", department: "Chantier Eco-Quartier", status: "active", lastLogin: "Aujourd'hui", twoFactor: true, avatar: "LP" },
  { id: 6, name: "Claire Moreau", email: "c.moreau@eiffage.fr", role: "Project Manager", department: "Projets", status: "active", lastLogin: "Hier", twoFactor: true, avatar: "CM" },
  { id: 7, name: "Thomas Robert", email: "t.robert@eiffage.fr", role: "Worker", department: "Chantier Gare du Nord", status: "inactive", lastLogin: "Il y a 5 jours", twoFactor: false, avatar: "TR" },
  { id: 8, name: "Julie Leroy", email: "j.leroy@eiffage.fr", role: "Admin", department: "IT", status: "active", lastLogin: "Il y a 30 min", twoFactor: true, avatar: "JL" },
  { id: 9, name: "Marc Simon", email: "m.simon@eiffage.fr", role: "Worker", department: "Chantier Hekla", status: "active", lastLogin: "Aujourd'hui", twoFactor: true, avatar: "MS" },
  { id: 10, name: "Anne Laurent", email: "a.laurent@eiffage.fr", role: "Project Manager", department: "Projets", status: "active", lastLogin: "Il y a 3h", twoFactor: true, avatar: "AL" },
  { id: 11, name: "François Garcia", email: "f.garcia@eiffage.fr", role: "Worker", department: "Chantier Eco-Quartier", status: "active", lastLogin: "Aujourd'hui", twoFactor: false, avatar: "FG" },
  { id: 12, name: "Nathalie Roux", email: "n.roux@eiffage.fr", role: "Worker", department: "Chantier Gare du Nord", status: "active", lastLogin: "Hier", twoFactor: true, avatar: "NR" },
  { id: 13, name: "David Fournier", email: "d.fournier@eiffage.fr", role: "Worker", department: "Chantier Hekla", status: "active", lastLogin: "Aujourd'hui", twoFactor: true, avatar: "DF" },
  { id: 14, name: "Isabelle Morel", email: "i.morel@eiffage.fr", role: "Admin", department: "RH", status: "active", lastLogin: "Il y a 2h", twoFactor: true, avatar: "IM" },
  { id: 15, name: "Paul Girard", email: "p.girard@eiffage.fr", role: "Worker", department: "Chantier Eco-Quartier", status: "locked", lastLogin: "Il y a 7 jours", twoFactor: false, avatar: "PG" },
]

const securityPolicies = [
  { name: "Authentification 2FA", status: "enforced", coverage: "100%", icon: ShieldCheck },
  { name: "Politique Mot de Passe", status: "high", strength: "Haute", icon: Key },
  { name: "Session Timeout", status: "active", value: "30 min", icon: Lock },
  { name: "IP Whitelist", status: "active", value: "12 IPs", icon: Shield },
]

export default function IAMUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "J'ai détecté que 3 utilisateurs n'ont pas encore activé l'authentification 2FA. Souhaitez-vous leur envoyer un rappel automatique ?" }
  ])
  const [aiInput, setAiInput] = useState("")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roleStats = {
    admin: users.filter(u => u.role === "Admin").length,
    pm: users.filter(u => u.role === "Project Manager").length,
    worker: users.filter(u => u.role === "Worker").length,
  }

  const twoFactorEnabled = users.filter(u => u.twoFactor).length
  const twoFactorPercentage = Math.round((twoFactorEnabled / users.length) * 100)

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30"><UserCog className="h-3 w-3 mr-1" />Admin</Badge>
      case "Project Manager":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><Briefcase className="h-3 w-3 mr-1" />PM</Badge>
      case "Worker":
        return <Badge variant="secondary"><HardHat className="h-3 w-3 mr-1" />Ouvrier</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Actif</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>
      case "locked":
        return <Badge variant="destructive">Verrouillé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendAI = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, 
      { role: "user", content: aiInput },
      { role: "assistant", content: "Très bien, j'ai envoyé un rappel par email aux 3 utilisateurs concernés (Sophie Bernard, Thomas Robert, François Garcia) avec les instructions pour activer la 2FA. Ils ont 48h pour se mettre en conformité." }
    ])
    setAiInput("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin & Utilisateurs (IAM)</h1>
          <p className="text-muted-foreground">Gestion des accès et politiques de sécurité</p>
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
              <DialogDescription>Créer un nouveau compte utilisateur</DialogDescription>
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
                <Label>Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="pm">Project Manager</SelectItem>
                    <SelectItem value="worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Département</Label>
                <Input placeholder="Direction, Projets, Chantier..." />
              </div>
              <div className="flex items-center justify-between">
                <Label>Forcer 2FA à la connexion</Label>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>Annuler</Button>
              <Button onClick={() => setShowAddUser(false)}>Créer l&apos;utilisateur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Security Policies */}
      <div className="grid gap-4 md:grid-cols-4">
        {securityPolicies.map((policy) => (
          <Card key={policy.name} className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                  <policy.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">{policy.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {policy.coverage || policy.strength || policy.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-3xl font-bold text-violet-400">{roleStats.admin}</p>
              </div>
              <UserCog className="h-8 w-8 text-violet-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Project Managers</p>
                <p className="text-3xl font-bold text-blue-400">{roleStats.pm}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">2FA Activé</p>
                <p className="text-3xl font-bold text-emerald-400">{twoFactorPercentage}%</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-emerald-400" />
            </div>
            <Progress value={twoFactorPercentage} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>{filteredUsers.length} utilisateur(s)</CardDescription>
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
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Project Manager">Project Manager</SelectItem>
                  <SelectItem value="Worker">Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-muted-foreground">{user.department}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.twoFactor ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.lastLogin}</TableCell>
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
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                  <CardTitle className="text-sm">Assistant IAM</CardTitle>
                  <CardDescription className="text-xs">Gestion des accès</CardDescription>
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
            <div className="p-4 pt-0 flex gap-2">
              <Input 
                placeholder="Répondre..." 
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
