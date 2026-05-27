"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Recycle,
  Package,
  Truck,
  Heart,
  ShoppingBag,
  Camera,
  FileText,
  MapPin,
  Calendar,
  Euro,
  Leaf,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  X,
  MessageSquare,
  Sparkles,
  Send,
  RotateCcw,
  Building2,
  Tag,
  Box,
  Scale,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Textarea } from "@/shared/components/ui/textarea"
import { Progress } from "@/shared/components/ui/progress"
// import { useLanguage } from "@/lib/i18n"

// Surplus materials inventory
const surplusMaterials = [
  {
    id: "SUR-001",
    name: "Carrelage grès cérame 60x60",
    category: "Revêtement sol",
    quantity: "40 m²",
    condition: "Neuf",
    project: "Tour Hekla",
    location: "Zone stockage B2",
    unitValue: 45,
    totalValue: 1800,
    carbonSaved: 120,
    photo: "/placeholder-tiles.jpg",
    available: true,
    dateAdded: "2024-01-15",
  },
  {
    id: "SUR-002",
    name: "Profilés aluminium 40x40",
    category: "Menuiserie",
    quantity: "250 ml",
    condition: "Bon état",
    project: "Eco-Quartier",
    location: "Dépôt central",
    unitValue: 12,
    totalValue: 3000,
    carbonSaved: 450,
    photo: "/placeholder-aluminum.jpg",
    available: true,
    dateAdded: "2024-01-10",
  },
  {
    id: "SUR-003",
    name: "Panneaux isolants laine de roche",
    category: "Isolation",
    quantity: "120 m²",
    condition: "Neuf - emballage ouvert",
    project: "Gare du Nord",
    location: "Zone stockage A1",
    unitValue: 28,
    totalValue: 3360,
    carbonSaved: 280,
    photo: "/placeholder-insulation.jpg",
    available: true,
    dateAdded: "2024-01-12",
  },
  {
    id: "SUR-004",
    name: "Luminaires LED encastrés",
    category: "Électricité",
    quantity: "85 unités",
    condition: "Neuf",
    project: "Tour Hekla",
    location: "Magasin électrique",
    unitValue: 65,
    totalValue: 5525,
    carbonSaved: 340,
    photo: "/placeholder-led.jpg",
    available: false,
    reservedFor: "Projet B",
    dateAdded: "2024-01-08",
  },
  {
    id: "SUR-005",
    name: "Portes coupe-feu EI60",
    category: "Menuiserie",
    quantity: "12 unités",
    condition: "Neuf",
    project: "Eco-Quartier",
    location: "Zone stockage C3",
    unitValue: 450,
    totalValue: 5400,
    carbonSaved: 890,
    photo: "/placeholder-doors.jpg",
    available: true,
    dateAdded: "2024-01-14",
  },
]

// Pallet/packaging tracking
const consignedItems = [
  {
    id: "PAL-001",
    type: "Palette EUR",
    quantity: 45,
    supplier: "Point P",
    depositDate: "2024-01-05",
    returnDeadline: "2024-02-05",
    status: "En cours",
    depositValue: 15,
    totalDeposit: 675,
  },
  {
    id: "PAL-002",
    type: "Big Bag",
    quantity: 30,
    supplier: "Lafarge",
    depositDate: "2024-01-10",
    returnDeadline: "2024-01-25",
    status: "À retourner",
    depositValue: 8,
    totalDeposit: 240,
  },
  {
    id: "PAL-003",
    type: "Conteneur IBC",
    quantity: 8,
    supplier: "Sika France",
    depositDate: "2024-01-08",
    returnDeadline: "2024-02-08",
    status: "En cours",
    depositValue: 50,
    totalDeposit: 400,
  },
  {
    id: "PAL-004",
    type: "Palette bois",
    quantity: 120,
    supplier: "Würth",
    depositDate: "2023-12-20",
    returnDeadline: "2024-01-20",
    status: "En retard",
    depositValue: 10,
    totalDeposit: 1200,
  },
  {
    id: "PAL-005",
    type: "Fût métallique",
    quantity: 15,
    supplier: "Weber",
    depositDate: "2024-01-12",
    returnDeadline: "2024-02-12",
    status: "En cours",
    depositValue: 25,
    totalDeposit: 375,
  },
]

// Marketplace listings
const marketplaceListings = [
  {
    id: "MKT-001",
    material: "Carrelage grès cérame",
    seller: "Tour Hekla",
    buyer: "Résidence Les Jardins",
    quantity: "25 m²",
    price: 900,
    status: "En négociation",
    carbonSaved: 75,
  },
  {
    id: "MKT-002",
    material: "Profilés aluminium",
    seller: "Eco-Quartier",
    buyer: "Association Habitat Solidaire",
    quantity: "100 ml",
    price: 0,
    status: "Don confirmé",
    carbonSaved: 180,
    isDonation: true,
  },
  {
    id: "MKT-003",
    material: "Luminaires LED",
    seller: "Gare du Nord",
    buyer: null,
    quantity: "40 unités",
    price: 2200,
    status: "En vente",
    carbonSaved: 160,
  },
]

export default function ReuseMarketplacePage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState<typeof surplusMaterials[0] | null>(null)
  const [showListingDialog, setShowListingDialog] = useState(false)
  const [listingType, setListingType] = useState<"sell" | "donate">("sell")
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAiMessage] = useState("")

  const totalSurplusValue = surplusMaterials.reduce((acc, m) => acc + m.totalValue, 0)
  const totalCarbonSaved = surplusMaterials.reduce((acc, m) => acc + m.carbonSaved, 0)
  const totalConsignedDeposit = consignedItems.reduce((acc, i) => acc + i.totalDeposit, 0)
  const itemsToReturn = consignedItems.filter(i => i.status === "À retourner" || i.status === "En retard").length

  const filteredMaterials = surplusMaterials.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.project.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Logistique Inversee & Reemploi</h1>
          <p className="text-muted-foreground">Economie circulaire et marketplace de materiaux</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Retours consignes
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4" />
            Declarer un surplus
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Recycle className="h-4 w-4 text-emerald-500" />
              Valeur Surplus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{totalSurplusValue.toLocaleString()} EUR</div>
            <p className="text-xs text-muted-foreground">{surplusMaterials.length} materiaux disponibles</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-500" />
              CO2 Evite
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{totalCarbonSaved} kg</div>
            <p className="text-xs text-muted-foreground">Par reemploi des materiaux</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-500" />
              Consignes en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{totalConsignedDeposit} EUR</div>
            <p className="text-xs text-muted-foreground">{consignedItems.length} lots a recuperer</p>
          </CardContent>
        </Card>

        <Card className={itemsToReturn > 0 ? "border-red-500/30 bg-red-500/5" : "border-border"}>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Retours urgents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${itemsToReturn > 0 ? "text-red-500" : ""}`}>{itemsToReturn}</div>
            <p className="text-xs text-muted-foreground">A retourner sous 48h</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory" className="gap-2">
            <Box className="h-4 w-4" />
            Inventaire Surplus
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="consigned" className="gap-2">
            <Package className="h-4 w-4" />
            Retours Consignes
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Search and filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, categorie, projet..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes categories</SelectItem>
                <SelectItem value="revetement">Revetement sol</SelectItem>
                <SelectItem value="menuiserie">Menuiserie</SelectItem>
                <SelectItem value="isolation">Isolation</SelectItem>
                <SelectItem value="electricite">Electricite</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous projets</SelectItem>
                <SelectItem value="hekla">Tour Hekla</SelectItem>
                <SelectItem value="eco">Eco-Quartier</SelectItem>
                <SelectItem value="gare">Gare du Nord</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Materials Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMaterials.map((material) => (
              <Card 
                key={material.id} 
                className={`cursor-pointer transition-all hover:border-primary/50 ${!material.available ? "opacity-60" : ""}`}
                onClick={() => setSelectedMaterial(material)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{material.name}</CardTitle>
                      <CardDescription>{material.category}</CardDescription>
                    </div>
                    {material.available ? (
                      <Badge className="bg-emerald-500/20 text-emerald-500">Disponible</Badge>
                    ) : (
                      <Badge variant="secondary">Reserve</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Placeholder photo */}
                  <div className="relative h-32 rounded-lg bg-muted flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="text-xs">
                        <Leaf className="mr-1 h-3 w-3 text-emerald-500" />
                        -{material.carbonSaved} kg CO2
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantite:</span>
                      <span className="ml-1 font-medium">{material.quantity}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Etat:</span>
                      <span className="ml-1 font-medium">{material.condition}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Projet:</span>
                      <span className="ml-1 font-medium">{material.project}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Valeur:</span>
                      <span className="ml-1 font-medium">{material.totalValue} EUR</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {material.location}
                  </div>

                  {material.available && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 gap-1 bg-primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          setListingType("sell")
                          setSelectedMaterial(material)
                          setShowListingDialog(true)
                        }}
                      >
                        <ShoppingBag className="h-3 w-3" />
                        Vendre
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 gap-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          setListingType("donate")
                          setSelectedMaterial(material)
                          setShowListingDialog(true)
                        }}
                      >
                        <Heart className="h-3 w-3" />
                        Donner
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5" />
                Transactions en cours
              </CardTitle>
              <CardDescription>Ventes et dons inter-projets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Materiau</TableHead>
                    <TableHead>Vendeur</TableHead>
                    <TableHead>Acheteur/Beneficiaire</TableHead>
                    <TableHead>Quantite</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>CO2 Evite</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketplaceListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.material}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {listing.seller}
                        </div>
                      </TableCell>
                      <TableCell>
                        {listing.buyer ? (
                          <div className="flex items-center gap-2">
                            {listing.isDonation ? (
                              <Heart className="h-4 w-4 text-pink-500" />
                            ) : (
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                            )}
                            {listing.buyer}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">En attente</span>
                        )}
                      </TableCell>
                      <TableCell>{listing.quantity}</TableCell>
                      <TableCell>
                        {listing.isDonation ? (
                          <Badge className="bg-pink-500/20 text-pink-500">Don</Badge>
                        ) : (
                          <span>{listing.price} EUR</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-emerald-500">
                          <Leaf className="mr-1 h-3 w-3" />
                          {listing.carbonSaved} kg
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            listing.status === "Don confirmé" ? "bg-pink-500/20 text-pink-500" :
                            listing.status === "En vente" ? "bg-blue-500/20 text-blue-500" :
                            "bg-amber-500/20 text-amber-500"
                          }
                        >
                          {listing.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Partner associations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Associations Partenaires
              </CardTitle>
              <CardDescription>Pour les dons de materiaux</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/20">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium">Habitat Solidaire</p>
                    <p className="text-sm text-muted-foreground">Renovation logements sociaux</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                    <Recycle className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">Emmaüs Batiment</p>
                    <p className="text-sm text-muted-foreground">Reemploi materiaux construction</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Compagnons Batisseurs</p>
                    <p className="text-sm text-muted-foreground">Auto-rehabilitation accompagnee</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consigned Returns Tab */}
        <TabsContent value="consigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Suivi des Consignes
              </CardTitle>
              <CardDescription>Palettes, emballages et conteneurs a retourner</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantite</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Date depot</TableHead>
                    <TableHead>Echeance retour</TableHead>
                    <TableHead>Consigne</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consignedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.depositDate}</TableCell>
                      <TableCell>{item.returnDeadline}</TableCell>
                      <TableCell>{item.totalDeposit} EUR</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "En retard" ? "bg-red-500/20 text-red-500" :
                            item.status === "À retourner" ? "bg-amber-500/20 text-amber-500" :
                            "bg-blue-500/20 text-blue-500"
                          }
                        >
                          {item.status === "En retard" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {item.status === "À retourner" && <Clock className="mr-1 h-3 w-3" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Truck className="h-3 w-3" />
                          Planifier
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Return summary */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-red-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  Retours en retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-500">1 200 EUR</p>
                <p className="text-sm text-muted-foreground">120 palettes bois - Wurth</p>
                <Button className="mt-4 w-full gap-2" variant="destructive">
                  <Truck className="h-4 w-4" />
                  Planifier retour urgent
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  Consignes recuperees ce mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-500">2 450 EUR</p>
                <p className="text-sm text-muted-foreground">Sur un potentiel de 2 890 EUR</p>
                <Progress value={85} className="mt-4 h-2" />
                <p className="mt-2 text-xs text-muted-foreground">85% de taux de recuperation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Listing Dialog */}
      <Dialog open={showListingDialog} onOpenChange={setShowListingDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {listingType === "sell" ? (
                <>
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Mettre en vente
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5 text-pink-500" />
                  Faire un don
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedMaterial?.name} - {selectedMaterial?.quantity}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {listingType === "sell" ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prix de vente</label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="0"
                      defaultValue={selectedMaterial?.totalValue}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">EUR</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valeur estimee: {selectedMaterial?.totalValue} EUR
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibilite</label>
                  <Select defaultValue="internal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Marketplace interne (groupe)</SelectItem>
                      <SelectItem value="partners">Partenaires externes</SelectItem>
                      <SelectItem value="public">Marketplace publique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Association beneficiaire</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une association" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="habitat">Habitat Solidaire</SelectItem>
                    <SelectItem value="emmaus">Emmaus Batiment</SelectItem>
                    <SelectItem value="compagnons">Compagnons Batisseurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Description complementaire</label>
              <Textarea placeholder="Informations supplementaires..." />
            </div>

            <div className="rounded-lg bg-emerald-500/10 p-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Impact environnemental</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Ce reemploi evitera {selectedMaterial?.carbonSaved} kg de CO2
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowListingDialog(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => {
                setShowListingDialog(false)
                toast.success(listingType === "sell" ? "Annonce publiee" : "Don confirme", {
                  description: listingType === "sell" 
                    ? "Votre annonce est maintenant visible sur la marketplace."
                    : "Votre don a ete enregistre avec succes."
                })
              }}
              className={listingType === "donate" ? "bg-pink-500 hover:bg-pink-600" : ""}
            >
              {listingType === "sell" ? "Publier l'annonce" : "Confirmer le don"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <Card className="border-primary/30 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">Assistant Reemploi</CardTitle>
                  <CardDescription className="text-xs">Economie circulaire</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-emerald-500/10 p-3 text-sm">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <div>
                    <p className="font-medium text-emerald-600">Opportunite de transfert detectee</p>
                    <p className="mt-1 text-muted-foreground">
                      Vous avez <strong>40m2 de carrelage</strong> en surplus sur le <strong>projet A</strong>. 
                      Le <strong>projet B</strong> en a besoin la semaine prochaine.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Voulez-vous que je cree le transfert logistique ?
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1 gap-1 bg-emerald-600 hover:bg-emerald-700">
                    <ArrowRight className="h-3 w-3" />
                    Creer le transfert
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Plus de details
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Poser une question..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="icon">
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
