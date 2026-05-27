"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Code,
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ExternalLink,
  Terminal,
  Book,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Play,
  ChevronRight,
  ChevronDown,
  X,
  Sparkles,
  Send,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
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
  DialogTrigger,
  DialogFooter,
} from "@/shared/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
// import { useLanguage } from "@/lib/i18n"

const apiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "cpx_prod_sk_7f8d9e0a1b2c3d4e5f6g7h8i9j0k",
    environment: "production",
    created: "2026-01-15",
    lastUsed: "Il y a 2 min",
    status: "active",
    requests: 12450,
  },
  {
    id: "2",
    name: "Development API Key",
    key: "cpx_dev_sk_1a2b3c4d5e6f7g8h9i0j1k2l3m4n",
    environment: "development",
    created: "2026-02-20",
    lastUsed: "Il y a 1 heure",
    status: "active",
    requests: 3280,
  },
]

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/projects",
    description: "Liste tous les projets du tenant",
    category: "Projects",
  },
  {
    method: "POST",
    path: "/api/v1/projects",
    description: "Cree un nouveau projet",
    category: "Projects",
  },
  {
    method: "GET",
    path: "/api/v1/projects/{id}",
    description: "Recupere les details d'un projet",
    category: "Projects",
  },
  {
    method: "GET",
    path: "/api/v1/tasks",
    description: "Liste toutes les taches",
    category: "Tasks",
  },
  {
    method: "POST",
    path: "/api/v1/tasks",
    description: "Cree une nouvelle tache",
    category: "Tasks",
  },
  {
    method: "GET",
    path: "/api/v1/documents",
    description: "Liste tous les documents",
    category: "Documents",
  },
  {
    method: "POST",
    path: "/api/v1/documents/upload",
    description: "Upload un nouveau document",
    category: "Documents",
  },
  {
    method: "GET",
    path: "/api/v1/resources",
    description: "Liste les ressources",
    category: "Resources",
  },
  {
    method: "GET",
    path: "/api/v1/analytics/carbon",
    description: "Metriques carbone",
    category: "Analytics",
  },
]

const webhooks = [
  { event: "project.created", description: "Nouveau projet cree" },
  { event: "task.completed", description: "Tache terminee" },
  { event: "document.uploaded", description: "Document uploade" },
  { event: "alert.triggered", description: "Alerte declenchee" },
]

export default function DeveloperPortalPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Projects"])
  const [selectedEndpoint, setSelectedEndpoint] = useState<typeof endpoints[0] | null>(null)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return <Badge className={colors[method] || ""}>{method}</Badge>
  }

  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) acc[endpoint.category] = []
    acc[endpoint.category].push(endpoint)
    return acc
  }, {} as Record<string, typeof endpoints>)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portail Developpeur</h1>
          <p className="text-muted-foreground">Documentation API et gestion des cles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Book className="h-4 w-4" />
            Documentation
          </Button>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Swagger UI
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Requetes Aujourd&apos;hui</p>
                <p className="text-2xl font-bold">15,730</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Latence Moyenne</p>
                <p className="text-2xl font-bold">24ms</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Succes</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cles Actives</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                <Key className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="api-keys">
        <TabsList>
          <TabsTrigger value="api-keys">Cles API</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Gerez vos cles d&apos;API pour acceder aux services Cyperux
            </p>
            <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nouvelle cle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Creer une nouvelle cle API</DialogTitle>
                  <DialogDescription>
                    Generez une nouvelle cle pour acceder aux API Cyperux
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Nom de la cle</Label>
                    <Input placeholder="Ex: Integration SAP" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Environnement</Label>
                    <Select defaultValue="development">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewKeyDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => {
                    setShowNewKeyDialog(false)
                    toast.success("Cle API generee", {
                      description: "Votre nouvelle cle API a ete creee avec succes."
                    })
                  }}>Generer la cle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Cle</TableHead>
                  <TableHead>Environnement</TableHead>
                  <TableHead>Derniere utilisation</TableHead>
                  <TableHead className="text-right">Requetes</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-1 font-mono text-xs">
                          {showKeys[apiKey.id]
                            ? apiKey.key
                            : apiKey.key.slice(0, 12) + "..." + apiKey.key.slice(-4)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {showKeys[apiKey.id] ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(apiKey.key)
                            toast.success("Cle copiee", {
                              description: "La cle API a ete copiee dans le presse-papiers."
                            })
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          apiKey.environment === "production"
                            ? "border-emerald-500/30 text-emerald-400"
                            : "border-blue-500/30 text-blue-400"
                        }
                      >
                        {apiKey.environment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {apiKey.lastUsed}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {apiKey.requests.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Documentation interactive des endpoints REST</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(groupedEndpoints).map(([category, items]) => (
                <Collapsible
                  key={category}
                  open={expandedCategories.includes(category)}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-3 hover:bg-muted/50">
                    <span className="font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{items.length} endpoints</Badge>
                      {expandedCategories.includes(category) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2 pl-4">
                    {items.map((endpoint, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedEndpoint(endpoint)}
                      >
                        <div className="flex items-center gap-3">
                          {getMethodBadge(endpoint.method)}
                          <code className="font-mono text-sm">{endpoint.path}</code>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {endpoint.description}
                        </span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Webhooks</CardTitle>
              <CardDescription>Recevez des notifications en temps reel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>URL de callback</Label>
                  <Input placeholder="https://votre-serveur.com/webhook" />
                </div>
                <div className="grid gap-2">
                  <Label>Evenements</Label>
                  <div className="space-y-2">
                    {webhooks.map((webhook) => (
                      <div key={webhook.event} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <code className="font-mono text-sm">{webhook.event}</code>
                          <p className="text-xs text-muted-foreground">{webhook.description}</p>
                        </div>
                        <Badge variant="outline">Actif</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playground" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Requete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select defaultValue="GET">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input defaultValue="/api/v1/projects" className="font-mono" />
                </div>
                <div className="grid gap-2">
                  <Label>Headers</Label>
                  <Textarea
                    className="font-mono text-xs"
                    defaultValue={`Authorization: Bearer cpx_prod_sk_...
Content-Type: application/json`}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Body</Label>
                  <Textarea
                    className="font-mono text-xs min-h-[100px]"
                    placeholder="{}"
                  />
                </div>
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Executer
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reponse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-muted p-4 font-mono text-xs">
                  <pre className="text-emerald-400">
{`{
  "status": 200,
  "data": {
    "projects": [
      {
        "id": "proj_001",
        "name": "Tour Hekla",
        "status": "in_progress"
      }
    ]
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-80">
          <Card className="border-primary/30 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm">Assistant API</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-primary/10 p-3 text-sm">
                <p className="font-medium text-primary">Aide API</p>
                <p className="mt-1 text-muted-foreground">
                  Je vois que vous explorez l&apos;endpoint /projects. 
                  Voulez-vous que je genere un exemple de code Python 
                  pour creer un nouveau projet via l&apos;API ?
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="gap-1">
                    <Code className="h-3 w-3" />
                    Generer Python
                  </Button>
                  <Button size="sm" variant="outline">
                    JavaScript
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Poser une question..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="text-sm"
                />
                <Button size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
