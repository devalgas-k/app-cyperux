"use client"

import { useState } from "react"
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  Leaf,
  BarChart3,
  ArrowRight,
  X,
  Sparkles,
  Send,
  MessageSquare,
  TrendingUp,
  Warehouse,
  FileCheck,
  UserCheck,
  Building2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"
import { cn } from "@/shared/utils"

// Materials catalog with FDES data
const materialsCatalog = [
  {
    id: "MAT-001",
    name: "Béton C25/30",
    supplier: "Lafarge",
    unitPrice: 95,
    unit: "m³",
    carbonWeight: 280,
    fdes: "FDES-2024-0156",
    deliveryTime: 3,
    stock: 120,
    minStock: 50,
    category: "Gros Oeuvre"
  },
  {
    id: "MAT-002",
    name: "Acier HA Fe500",
    supplier: "ArcelorMittal",
    unitPrice: 1200,
    unit: "t",
    carbonWeight: 1850,
    fdes: "FDES-2024-0089",
    deliveryTime: 7,
    stock: 8,
    minStock: 15,
    category: "Structure"
  },
  {
    id: "MAT-003",
    name: "Cuivre Câblage",
    supplier: "Nexans",
    unitPrice: 9500,
    unit: "t",
    carbonWeight: 3200,
    fdes: "FDES-2024-0234",
    deliveryTime: 5,
    stock: 2.5,
    minStock: 3,
    category: "Électricité"
  },
  {
    id: "MAT-004",
    name: "Isolant Laine de Roche",
    supplier: "Rockwool",
    unitPrice: 35,
    unit: "m²",
    carbonWeight: 12,
    fdes: "FDES-2024-0178",
    deliveryTime: 4,
    stock: 850,
    minStock: 200,
    category: "Isolation"
  },
  {
    id: "MAT-005",
    name: "Menuiseries Alu",
    supplier: "Technal",
    unitPrice: 1800,
    unit: "unité",
    carbonWeight: 450,
    fdes: "FDES-2024-0312",
    deliveryTime: 21,
    stock: 12,
    minStock: 8,
    category: "Menuiseries"
  },
  {
    id: "MAT-006",
    name: "Plaque de Plâtre BA13",
    supplier: "Placo",
    unitPrice: 8,
    unit: "m²",
    carbonWeight: 4.5,
    fdes: "FDES-2024-0045",
    deliveryTime: 2,
    stock: 2400,
    minStock: 500,
    category: "Finitions"
  },
]

// Order workflow stages
const orderWorkflow = [
  { id: 1, name: "Demande", icon: FileCheck, status: "completed" },
  { id: 2, name: "Validation Chef de Projet", icon: UserCheck, status: "completed" },
  { id: 3, name: "Validation Achat", icon: Building2, status: "current" },
  { id: 4, name: "Commande Fournisseur", icon: ShoppingCart, status: "pending" },
  { id: 5, name: "Livraison", icon: Truck, status: "pending" },
]

// Pending orders for validation
const pendingOrders = [
  {
    id: "CMD-2024-0189",
    materials: "Acier HA Fe500 - 25t",
    requester: "Jean Dupont",
    project: "Tour Hekla",
    amount: 30000,
    currentStep: 3,
    urgency: "high",
    requestDate: "06/05/2024"
  },
  {
    id: "CMD-2024-0188",
    materials: "Béton C25/30 - 80m³",
    requester: "Marie Martin",
    project: "Eco-Quartier",
    amount: 7600,
    currentStep: 2,
    urgency: "medium",
    requestDate: "05/05/2024"
  },
  {
    id: "CMD-2024-0187",
    materials: "Cuivre Câblage - 1.5t",
    requester: "Pierre Durand",
    project: "Gare du Nord",
    amount: 14250,
    currentStep: 3,
    urgency: "low",
    requestDate: "04/05/2024"
  },
]

// Stock alerts
const stockAlerts = [
  { material: "Acier HA Fe500", current: 8, min: 15, status: "critical" },
  { material: "Cuivre Câblage", current: 2.5, min: 3, status: "warning" },
]

export default function PurchasingPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [selectedMaterial, setSelectedMaterial] = useState<typeof materialsCatalog[0] | null>(null)
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [activeTab, setActiveTab] = useState("catalog")
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Le prix du cuivre a augmenté de 15% ce mois-ci. Souhaitez-vous grouper les commandes des 3 prochains mois pour bloquer le tarif actuel ? J'ai identifié 3 projets avec des besoins en cuivre totalisant 8.5 tonnes."
    }
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    setChatMessages([...chatMessages, { role: "user", content: inputMessage }])
    setInputMessage("")
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: "Excellent choix ! J'ai préparé un bon de commande groupé pour 8.5t de cuivre au tarif actuel de 9 500€/t. Économie estimée : 12 825€ sur 3 mois. Voulez-vous que je soumette cette commande à validation ?"
      }])
    }, 1000)
  }

  const getStockStatus = (current: number, min: number) => {
    const ratio = current / min
    if (ratio < 0.7) return { color: "text-red-500", bg: "bg-red-500/20", label: "Critique" }
    if (ratio < 1) return { color: "text-amber-500", bg: "bg-amber-500/20", label: "Attention" }
    return { color: "text-emerald-500", bg: "bg-emerald-500/20", label: "OK" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gestion des Achats & Approvisionnement</h1>
          <p className="text-muted-foreground">Catalogue, commandes et suivi des stocks</p>
        </div>
        <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
              <Plus className="h-4 w-4" />
              Nouvelle Commande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une Commande</DialogTitle>
              <DialogDescription>Sélectionnez les matériaux et quantités</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Matériau</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {materialsCatalog.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantité</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Projet</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hekla">Tour Hekla</SelectItem>
                      <SelectItem value="eco">Eco-Quartier</SelectItem>
                      <SelectItem value="gare">Gare du Nord</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Urgence</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Normal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basse</SelectItem>
                      <SelectItem value="medium">Normale</SelectItem>
                      <SelectItem value="high">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Workflow Preview */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-sm font-medium mb-3">Workflow de Validation</p>
                <div className="flex items-center justify-between">
                  {orderWorkflow.slice(0, 4).map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          index === 0 ? "bg-[#593196] text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          <step.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs mt-1 text-muted-foreground">{step.name}</span>
                      </div>
                      {index < 3 && (
                        <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOrderDialogOpen(false)}>Annuler</Button>
                <Button 
                  className="bg-[#593196] hover:bg-[#593196]/90"
                  onClick={() => {
                    toast.success("Demande soumise avec succès", {
                      description: "Votre commande est en attente de validation par le chef de projet."
                    })
                    setOrderDialogOpen(false)
                  }}
                >
                  Soumettre la Demande
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stock Alerts */}
      {stockAlerts.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-500">Alertes Stock Critique</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stockAlerts.map((alert) => (
                    <Badge 
                      key={alert.material}
                      variant="outline" 
                      className={`${alert.status === "critical" ? "border-red-500 text-red-500" : "border-amber-500 text-amber-500"}`}
                    >
                      {alert.material}: {alert.current}/{alert.min} {alert.status === "critical" ? "(Critique)" : "(Attention)"}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                Commander d&apos;urgence
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats - Interactive */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card 
          className={cn(
            "bg-card cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
            activeStatFilter === "all" && "ring-2 ring-[#593196] ring-offset-2 ring-offset-background"
          )}
          onClick={() => {
            setActiveTab("orders")
            setActiveStatFilter(activeStatFilter === "all" ? null : "all")
            toast.success("Affichage des commandes du mois")
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#593196]/20 text-[#593196]">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Commandes ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className={cn(
            "bg-card cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg",
            activeStatFilter === "pending" && "ring-2 ring-amber-500 ring-offset-2 ring-offset-background"
          )}
          onClick={() => {
            setActiveTab("orders")
            setActiveStatFilter(activeStatFilter === "pending" ? null : "pending")
            toast.info("Filtrage: Commandes en attente de validation")
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">En attente validation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-card cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
          onClick={() => toast.info("Volume d'achats cumule: 156 000€ sur le mois en cours")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">156k€</p>
                <p className="text-xs text-muted-foreground">Volume Achats</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-card cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
          onClick={() => toast.success("Performance environnementale: -18% d'empreinte carbone vs standards sectoriels")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-500">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">-18%</p>
                <p className="text-xs text-muted-foreground">Empreinte vs Standard</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="catalog">Catalogue Matériaux</TabsTrigger>
          <TabsTrigger value="orders">Commandes en Cours</TabsTrigger>
          <TabsTrigger value="stocks">Suivi des Stocks</TabsTrigger>
        </TabsList>

        {/* Catalog Tab */}
        <TabsContent value="catalog" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Catalogue Matériaux</CardTitle>
                  <CardDescription>Prix, FDES et délais de livraison</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher..." className="w-48 pl-9" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="gros">Gros Oeuvre</SelectItem>
                      <SelectItem value="structure">Structure</SelectItem>
                      <SelectItem value="elec">Électricité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Matériau</TableHead>
                      <TableHead className="text-muted-foreground">Fournisseur</TableHead>
                      <TableHead className="text-muted-foreground">Prix Unitaire</TableHead>
                      <TableHead className="text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          Poids Carbone (FDES)
                        </div>
                      </TableHead>
                      <TableHead className="text-muted-foreground">Délai Moyen</TableHead>
                      <TableHead className="text-muted-foreground">Stock</TableHead>
                      <TableHead className="text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materialsCatalog.map((material) => {
                      const stockStatus = getStockStatus(material.stock, material.minStock)
                      return (
                        <TableRow key={material.id} className="border-border hover:bg-secondary/50">
                          <TableCell>
                            <div>
                              <p className="font-medium">{material.name}</p>
                              <p className="text-xs text-muted-foreground">{material.category}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{material.supplier}</TableCell>
                          <TableCell>
                            <span className="font-medium">{material.unitPrice.toLocaleString()}€</span>
                            <span className="text-muted-foreground">/{material.unit}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm">{material.carbonWeight}</span>
                              <span className="text-xs text-muted-foreground">kgCO2e/{material.unit}</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">{material.fdes}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{material.deliveryTime} jours</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={stockStatus.color}>{material.stock}</span>
                              <span className="text-muted-foreground">/ {material.minStock} min</span>
                            </div>
                            <Progress 
                              value={Math.min((material.stock / material.minStock) * 100, 100)} 
                              className="h-1.5 mt-1"
                            />
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedMaterial(material)
                                setOrderDialogOpen(true)
                              }}
                            >
                              Commander
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Tunnel de Commande - Validation Multi-Niveaux</CardTitle>
              <CardDescription>Commandes en attente de validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingOrders.map((order) => (
                <div 
                  key={order.id}
                  className="rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.id}</p>
                        <Badge 
                          variant="outline"
                          className={
                            order.urgency === "high" ? "border-red-500 text-red-500" :
                            order.urgency === "medium" ? "border-amber-500 text-amber-500" :
                            "border-muted-foreground"
                          }
                        >
                          {order.urgency === "high" ? "Urgent" : order.urgency === "medium" ? "Normal" : "Basse"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.materials}</p>
                      <p className="text-xs text-muted-foreground">
                        Par {order.requester} • {order.project} • {order.requestDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{order.amount.toLocaleString()}€</p>
                    </div>
                  </div>
                  
                  {/* Workflow Steps */}
                  <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
                    {orderWorkflow.map((step, index) => {
                      const isCompleted = index < order.currentStep - 1
                      const isCurrent = index === order.currentStep - 1
                      return (
                        <div key={step.id} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                              isCompleted ? "bg-emerald-500 text-white" :
                              isCurrent ? "bg-[#593196] text-white animate-pulse" :
                              "bg-muted text-muted-foreground"
                            }`}>
                              {isCompleted ? <CheckCircle className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                            </div>
                            <span className={`text-[10px] mt-1 ${isCurrent ? "text-[#593196] font-medium" : "text-muted-foreground"}`}>
                              {step.name}
                            </span>
                          </div>
                          {index < orderWorkflow.length - 1 && (
                            <div className={`h-0.5 w-8 mx-1 ${
                              isCompleted ? "bg-emerald-500" : "bg-muted"
                            }`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">Rejeter</Button>
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">Valider</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stocks Tab */}
        <TabsContent value="stocks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materialsCatalog.map((material) => {
              const stockStatus = getStockStatus(material.stock, material.minStock)
              const stockPercent = (material.stock / material.minStock) * 100
              return (
                <Card key={material.id} className={`bg-card ${stockPercent < 70 ? "border-red-500/30" : stockPercent < 100 ? "border-amber-500/30" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-xs text-muted-foreground">{material.supplier}</p>
                      </div>
                      <Badge className={stockStatus.bg + " " + stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Stock actuel</span>
                        <span className={`font-medium ${stockStatus.color}`}>
                          {material.stock} {material.unit}
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(stockPercent, 150)} 
                        className={`h-2 ${stockPercent < 70 ? "[&>div]:bg-red-500" : stockPercent < 100 ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Seuil critique: {material.minStock} {material.unit}</span>
                        <span>{Math.round(stockPercent)}%</span>
                      </div>
                    </div>
                    
                    {stockPercent < 100 && (
                      <Button size="sm" className="w-full mt-3" variant={stockPercent < 70 ? "destructive" : "outline"}>
                        <Truck className="h-3 w-3 mr-1" />
                        Réapprovisionner
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <Card className="border-[#593196]/30 shadow-lg shadow-[#593196]/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Assistant Achats IA</CardTitle>
                    <CardDescription className="text-xs">Optimisation & Alertes</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Alert Banner */}
              <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 p-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-amber-500 font-medium">Alerte Prix: Cuivre +15%</span>
              </div>
              
              <div className="max-h-48 overflow-y-auto space-y-2">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2 text-sm ${
                      msg.role === "assistant"
                        ? "bg-[#593196]/10 border border-[#593196]/20"
                        : "bg-secondary ml-4"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <Warehouse className="h-3 w-3 mr-1" />
                  Grouper Commandes
                </Button>
                <Button size="sm" className="flex-1 text-xs bg-[#593196] hover:bg-[#593196]/90">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Voir Analyse
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Poser une question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSendMessage} className="bg-[#593196] hover:bg-[#593196]/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating AI Button */}
      {!showAIChat && (
        <Button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] hover:bg-[#593196]/90 shadow-lg shadow-[#593196]/30 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
