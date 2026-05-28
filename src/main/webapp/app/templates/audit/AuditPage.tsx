"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
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
} from "@/shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Shield,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  DollarSign,
  Users,
  Settings,
  Database,
  Download,
  RefreshCw,
  Copy,
  MessageSquare,
  X,
  Sparkles,
  Send,
  ShieldAlert,
  Link2,
  GitCompare,
  ExternalLink,
} from "lucide-react"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { StatCardList } from "@/shared/components/custom/stat-card-list"
import { InteractiveStatCard } from "@/shared/components/custom/interactive-stat-card"
// import { useLanguage } from "@/lib/i18n"

// Types
interface AuditLogEntry {
  id: string
  timestamp: Date
  user: {
    name: string
    email: string
    avatar?: string
    initials: string
    role: string
  }
  action: string
  actionType: "create" | "update" | "delete" | "access" | "export" | "validate" | "login" | "security"
  resource: string
  resourceId: string
  ipAddress: string
  userAgent: string
  hash: string
  previousHash: string
  oldValue?: Record<string, unknown>
  newValue?: Record<string, unknown>
  severity: "info" | "warning" | "critical"
  verified: boolean
}

// Mock data
const auditLogs: AuditLogEntry[] = [
  {
    id: "log-001",
    timestamp: new Date("2026-05-06T14:32:45.127Z"),
    user: {
      name: "Marie Dupont",
      email: "m.dupont@eiffage.com",
      initials: "MD",
      role: "Directeur Projet"
    },
    action: "Modification Budget Phase 2",
    actionType: "update",
    resource: "Budget",
    resourceId: "budget-phase-2",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome/125.0 (Windows 11)",
    hash: "a3f2b8c1d9e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1",
    previousHash: "f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9",
    oldValue: { montant: 2450000, devise: "EUR" },
    newValue: { montant: 2650000, devise: "EUR" },
    severity: "warning",
    verified: true
  },
  {
    id: "log-002",
    timestamp: new Date("2026-05-06T14:28:12.892Z"),
    user: {
      name: "Admin Système",
      email: "admin@cyperux.io",
      initials: "AS",
      role: "Administrateur"
    },
    action: "Connexion depuis IP inhabituelle",
    actionType: "security",
    resource: "Authentification",
    resourceId: "auth-session-742",
    ipAddress: "185.234.72.91",
    userAgent: "Firefox/126.0 (Linux)",
    hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    previousHash: "a3f2b8c1d9e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1",
    severity: "critical",
    verified: true
  },
  {
    id: "log-003",
    timestamp: new Date("2026-05-06T14:15:33.456Z"),
    user: {
      name: "Pierre Martin",
      email: "p.martin@eiffage.com",
      initials: "PM",
      role: "Ingénieur Structure"
    },
    action: "Validation Plan Structure R+1",
    actionType: "validate",
    resource: "Document",
    resourceId: "doc-plan-str-r1-v3",
    ipAddress: "192.168.1.78",
    userAgent: "Chrome/125.0 (macOS)",
    hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    previousHash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    oldValue: { statut: "En revue", indice: "B" },
    newValue: { statut: "BPE", indice: "C", validateur: "Pierre Martin" },
    severity: "info",
    verified: true
  },
  {
    id: "log-004",
    timestamp: new Date("2026-05-06T13:45:22.789Z"),
    user: {
      name: "Sophie Bernard",
      email: "s.bernard@eiffage.com",
      initials: "SB",
      role: "Responsable Achats"
    },
    action: "Export données financières",
    actionType: "export",
    resource: "Finance",
    resourceId: "export-fin-q2-2026",
    ipAddress: "192.168.1.92",
    userAgent: "Edge/125.0 (Windows 11)",
    hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    previousHash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    severity: "warning",
    verified: true
  },
  {
    id: "log-005",
    timestamp: new Date("2026-05-06T12:30:11.234Z"),
    user: {
      name: "Jean Lefebvre",
      email: "j.lefebvre@eiffage.com",
      initials: "JL",
      role: "Chef de Chantier"
    },
    action: "Création Fiche Incident HSE",
    actionType: "create",
    resource: "HSE",
    resourceId: "incident-hse-127",
    ipAddress: "192.168.2.15",
    userAgent: "Safari/17.5 (iPad)",
    hash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    previousHash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    severity: "info",
    verified: true
  },
  {
    id: "log-006",
    timestamp: new Date("2026-05-06T11:15:45.678Z"),
    user: {
      name: "Marie Dupont",
      email: "m.dupont@eiffage.com",
      initials: "MD",
      role: "Directeur Projet"
    },
    action: "Suppression Devis obsolète",
    actionType: "delete",
    resource: "Document",
    resourceId: "devis-2025-old-143",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome/125.0 (Windows 11)",
    hash: "f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    previousHash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    oldValue: { nom: "Devis_Acier_2025_v1.pdf", taille: "2.4MB" },
    severity: "warning",
    verified: true
  },
  {
    id: "log-007",
    timestamp: new Date("2026-05-06T10:00:00.123Z"),
    user: {
      name: "Admin Système",
      email: "admin@cyperux.io",
      initials: "AS",
      role: "Administrateur"
    },
    action: "Modification droits utilisateur",
    actionType: "update",
    resource: "Utilisateur",
    resourceId: "user-456",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/125.0 (Linux)",
    hash: "a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    previousHash: "f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    oldValue: { role: "Viewer", permissions: ["read"] },
    newValue: { role: "Editor", permissions: ["read", "write", "delete"] },
    severity: "critical",
    verified: true
  },
  {
    id: "log-008",
    timestamp: new Date("2026-05-06T09:30:22.456Z"),
    user: {
      name: "Luc Moreau",
      email: "l.moreau@eiffage.com",
      initials: "LM",
      role: "Ingénieur BIM"
    },
    action: "Accès Maquette IFC",
    actionType: "access",
    resource: "BIM",
    resourceId: "ifc-tour-hekla-v12",
    ipAddress: "192.168.1.67",
    userAgent: "Chrome/125.0 (Windows 11)",
    hash: "b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    previousHash: "a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    severity: "info",
    verified: true
  },
]

const getActionIcon = (type: AuditLogEntry["actionType"]) => {
  switch (type) {
    case "create": return <FileText className="h-4 w-4 text-emerald-500" />
    case "update": return <RefreshCw className="h-4 w-4 text-blue-500" />
    case "delete": return <XCircle className="h-4 w-4 text-red-500" />
    case "access": return <Eye className="h-4 w-4 text-slate-400" />
    case "export": return <Download className="h-4 w-4 text-amber-500" />
    case "validate": return <CheckCircle className="h-4 w-4 text-emerald-500" />
    case "login": return <Unlock className="h-4 w-4 text-blue-500" />
    case "security": return <ShieldAlert className="h-4 w-4 text-red-500" />
    default: return <Clock className="h-4 w-4 text-slate-400" />
  }
}

const getSeverityBadge = (severity: AuditLogEntry["severity"]) => {
  switch (severity) {
    case "critical":
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Critique</Badge>
    case "warning":
      return <Badge variant="outline" className="border-amber-500/50 text-amber-500 gap-1"><AlertTriangle className="h-3 w-3" />Attention</Badge>
    case "info":
    default:
      return <Badge variant="secondary" className="gap-1"><CheckCircle className="h-3 w-3" />Info</Badge>
  }
}

const getResourceIcon = (resource: string) => {
  switch (resource) {
    case "Budget":
    case "Finance": return <DollarSign className="h-4 w-4" />
    case "Document": return <FileText className="h-4 w-4" />
    case "Utilisateur": return <Users className="h-4 w-4" />
    case "BIM": return <Database className="h-4 w-4" />
    case "HSE": return <Shield className="h-4 w-4" />
    case "Authentification": return <Lock className="h-4 w-4" />
    default: return <Settings className="h-4 w-4" />
  }
}

export default function AuditTrailPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null)
  const [showDiff, setShowDiff] = useState(false)
  const [chainIntact, setChainIntact] = useState(true)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState<Array<{ role: "ai" | "user"; content: string }>>([
    {
      role: "ai",
      content: "J'ai détecté une anomalie de connexion sur le compte 'Admin' depuis une IP inhabituelle (185.234.72.91 - Localisation: Europe de l'Est). Voulez-vous verrouiller temporairement les exportations financières ?"
    }
  ])
  const [aiInput, setAiInput] = useState("")
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  // Filter logs
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || log.actionType === actionFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    return matchesSearch && matchesAction && matchesSeverity
  })

  const formatTimestamp = (date: Date) => {
    return date.toISOString().replace("T", " ").replace("Z", "")
  }

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, { role: "user", content: aiInput }])
    setAiInput("")
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: "ai",
        content: "J'ai activé le verrouillage temporaire des exportations financières pour le compte Admin. Une notification a été envoyée au RSSI. Le compte reste actif pour la consultation uniquement. Durée du verrouillage : 24h ou jusqu'à validation manuelle."
      }])
    }, 1500)
  }

  // Verify chain integrity animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate chain verification
      setChainIntact(true)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Trust Badge */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit Trail & Sécurité Forensic</h1>
          <p className="text-muted-foreground">Traçabilité complète et vérifiable de toutes les actions critiques</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Chain Integrity Badge */}
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-full border-2
            ${chainIntact 
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500" 
              : "border-red-500/50 bg-red-500/10 text-red-500"
            }
            transition-all duration-500
          `}
          style={{
            boxShadow: chainIntact ? "0 0 20px rgba(16, 185, 129, 0.3)" : "0 0 20px rgba(239, 68, 68, 0.3)",
            animation: "pulse 2s ease-in-out infinite"
          }}
          >
            {chainIntact ? (
              <>
                <ShieldCheck className="h-5 w-5" />
                <span className="font-semibold text-sm">Chaîne de confiance intacte</span>
                <Link2 className="h-4 w-4" />
              </>
            ) : (
              <>
                <ShieldAlert className="h-5 w-5" />
                <span className="font-semibold text-sm">Intégrité compromise</span>
              </>
            )}
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Forensic
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatCardList>
        <InteractiveStatCard
          label="Actions (24h)"
          value={auditLogs.length}
          icon={Clock}
          variant="default"
        />
        <InteractiveStatCard
          label="Alertes Attention"
          value={auditLogs.filter(l => l.severity === "warning").length}
          icon={AlertTriangle}
          variant="warning"
        />
        <InteractiveStatCard
          label="Événements Critiques"
          value={auditLogs.filter(l => l.severity === "critical").length}
          icon={ShieldAlert}
          variant="danger"
        />
        <InteractiveStatCard
          label="Hash Vérifiés"
          value="100%"
          icon={ShieldCheck}
          variant="success"
        />
      </StatCardList>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par action, utilisateur, ressource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type d'action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les actions</SelectItem>
                <SelectItem value="create">Création</SelectItem>
                <SelectItem value="update">Modification</SelectItem>
                <SelectItem value="delete">Suppression</SelectItem>
                <SelectItem value="access">Accès</SelectItem>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="validate">Validation</SelectItem>
                <SelectItem value="security">Sécurité</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Attention</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Journal d&apos;Audit Chronologique
          </CardTitle>
          <CardDescription>
            {filteredLogs.length} entrées affichées - Dernière mise à jour: {new Date().toLocaleTimeString("fr-FR")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Horodatage (UTC)</TableHead>
                  <TableHead className="w-[180px]">Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="w-[100px]">Ressource</TableHead>
                  <TableHead className="w-[100px]">Sévérité</TableHead>
                  <TableHead className="w-[200px]">Hash SHA-256</TableHead>
                  <TableHead className="w-[80px]">Diff</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    className={`
                      ${log.severity === "critical" ? "bg-red-500/5 hover:bg-red-500/10" : ""}
                      ${log.severity === "warning" ? "bg-amber-500/5 hover:bg-amber-500/10" : ""}
                      cursor-pointer transition-colors
                    `}
                    onClick={() => setSelectedLog(log)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={log.user.avatar} />
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {log.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{log.user.name}</span>
                          <span className="text-xs text-muted-foreground">{log.user.role}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.actionType)}
                        <span className="text-sm">{log.action}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        {getResourceIcon(log.resource)}
                        <span className="text-xs">{log.resource}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(log.severity)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <code className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {log.hash.substring(0, 16)}...
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyHash(log.hash)
                          }}
                        >
                          {copiedHash === log.hash ? (
                            <CheckCircle className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(log.oldValue || log.newValue) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedLog(log)
                            setShowDiff(true)
                          }}
                        >
                          <GitCompare className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Visual Diff Dialog */}
      <Dialog open={showDiff} onOpenChange={setShowDiff}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              Comparaison Visual Diff
            </DialogTitle>
            <DialogDescription>
              {selectedLog && `${selectedLog.action} - ${formatTimestamp(selectedLog.timestamp)}`}
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="grid grid-cols-2 gap-4">
              {/* Old Value */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                  <XCircle className="h-4 w-4" />
                  Ancienne valeur
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  {selectedLog.oldValue ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {Object.entries(selectedLog.oldValue).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="text-red-400 bg-red-500/20 px-1 rounded">
                            {JSON.stringify(value)}
                          </span>
                        </div>
                      ))}
                    </pre>
                  ) : (
                    <span className="text-muted-foreground italic">Aucune valeur précédente</span>
                  )}
                </div>
              </div>
              {/* New Value */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-500">
                  <CheckCircle className="h-4 w-4" />
                  Nouvelle valeur
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                  {selectedLog.newValue ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {Object.entries(selectedLog.newValue).map(([key, value]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="text-emerald-400 bg-emerald-500/20 px-1 rounded">
                            {JSON.stringify(value)}
                          </span>
                        </div>
                      ))}
                    </pre>
                  ) : (
                    <span className="text-muted-foreground italic">Élément supprimé</span>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedLog && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link2 className="h-3 w-3" />
                <span>Hash de transaction:</span>
                <code className="font-mono bg-background px-2 py-0.5 rounded">
                  {selectedLog.hash}
                </code>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CopilotKit AI Chat - Floating */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-2 border-primary/30 shadow-2xl shadow-primary/10">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary animate-pulse">
                    <ShieldAlert className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Alerte Sécurité IA</CardTitle>
                    <CardDescription className="text-xs">Analyse forensic active</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "ai" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                      <ShieldAlert className="h-3 w-3 text-red-500" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-red-500/10 border border-red-500/30"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setAiMessages(prev => [...prev, 
                      { role: "user", content: "Verrouiller les exportations" }
                    ])
                    setTimeout(() => {
                      setAiMessages(prev => [...prev, {
                        role: "ai",
                        content: "Verrouillage activé. Exportations financières bloquées pour le compte Admin pendant 24h. Notification envoyée au RSSI."
                      }])
                    }, 1000)
                  }}
                >
                  <Lock className="mr-2 h-3 w-3" />
                  Verrouiller
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setAiMessages(prev => [...prev, 
                      { role: "user", content: "Ignorer l'alerte" }
                    ])
                    setTimeout(() => {
                      setAiMessages(prev => [...prev, {
                        role: "ai",
                        content: "Alerte classée. J'ai noté cette exception et je continuerai la surveillance. N'hésitez pas à réactiver le verrouillage si nécessaire."
                      }])
                    }, 1000)
                  }}
                >
                  Ignorer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Floating AI Button when chat is closed */}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg shadow-red-500/20 z-50"
          variant="destructive"
          onClick={() => setShowAIChat(true)}
        >
          <ShieldAlert className="h-6 w-6" />
        </Button>
      )}

      {/* Trust Chain Visualizer */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
