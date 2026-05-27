"use client"

import { useState } from "react"
import { toast } from "sonner"
import { 
  FileText, 
  Euro, 
  PenTool,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Check,
  Users,
  HardDrive,
  Crown,
  Sparkles,
  MessageSquare,
  X,
  Send,
  Camera,
  Calculator
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Progress } from "@/shared/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
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
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"

// Situation de travaux data
const situationData = [
  {
    id: "WBS-001",
    poste: "Terrassement",
    montantMarche: 145000,
    avancementPrecedent: 100,
    avancementMois: 0,
    cumul: 145000,
    resteAPayer: 0,
  },
  {
    id: "WBS-002",
    poste: "Fondations",
    montantMarche: 280000,
    avancementPrecedent: 85,
    avancementMois: 15,
    cumul: 280000,
    resteAPayer: 0,
  },
  {
    id: "WBS-003",
    poste: "Gros Œuvre",
    montantMarche: 520000,
    avancementPrecedent: 45,
    avancementMois: 12,
    cumul: 296400,
    resteAPayer: 223600,
  },
  {
    id: "WBS-004",
    poste: "Charpente / Couverture",
    montantMarche: 180000,
    avancementPrecedent: 10,
    avancementMois: 15,
    cumul: 45000,
    resteAPayer: 135000,
  },
  {
    id: "WBS-005",
    poste: "Plomberie",
    montantMarche: 95000,
    avancementPrecedent: 60,
    avancementMois: 25,
    cumul: 80750,
    resteAPayer: 14250,
  },
  {
    id: "WBS-006",
    poste: "Électricité",
    montantMarche: 110000,
    avancementPrecedent: 40,
    avancementMois: 18,
    cumul: 63800,
    resteAPayer: 46200,
  },
  {
    id: "WBS-007",
    poste: "CVC",
    montantMarche: 150000,
    avancementPrecedent: 20,
    avancementMois: 10,
    cumul: 45000,
    resteAPayer: 105000,
  },
  {
    id: "WBS-008",
    poste: "Menuiseries",
    montantMarche: 85000,
    avancementPrecedent: 0,
    avancementMois: 5,
    cumul: 4250,
    resteAPayer: 80750,
  },
]

// Pie chart data
const depensesParLot = [
  { name: "Terrassement", value: 145000, color: "#593196" },
  { name: "Fondations", value: 280000, color: "#7c4dbd" },
  { name: "Gros Œuvre", value: 296400, color: "#9d71d6" },
  { name: "Charpente", value: 45000, color: "#10b981" },
  { name: "Plomberie", value: 80750, color: "#3b82f6" },
  { name: "Électricité", value: 63800, color: "#f59e0b" },
  { name: "CVC", value: 45000, color: "#ef4444" },
  { name: "Menuiseries", value: 4250, color: "#6b7280" },
]

export default function BillingPage() {
  const [situations, setSituations] = useState(situationData)
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)
  const [showSignatureDialog, setShowSignatureDialog] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "L'avancement déclaré sur le lot 'Plomberie' (85%) est supérieur à la réalité constatée via les photos de chantier (60%). Voulez-vous ajuster la situation ?",
      hasAlert: true,
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [adjustmentApplied, setAdjustmentApplied] = useState(false)

  const handleAvancementChange = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0
    setSituations(prev => prev.map(s => {
      if (s.id === id) {
        const newCumul = s.montantMarche * ((s.avancementPrecedent + numValue) / 100)
        return {
          ...s,
          avancementMois: numValue,
          cumul: newCumul,
          resteAPayer: s.montantMarche - newCumul,
        }
      }
      return s
    }))
  }

  const handleSign = () => {
    setIsSigning(true)
    setTimeout(() => {
      setIsSigning(false)
      setIsSigned(true)
    }, 2000)
  }

  const handleAdjustPlomberie = () => {
    setSituations(prev => prev.map(s => {
      if (s.id === "WBS-005") {
        const newAvancement = 0 // Reset to 0 for this month since previous was already 60%
        const newCumul = s.montantMarche * 0.60 // 60% as per photo evidence
        return {
          ...s,
          avancementMois: newAvancement,
          cumul: newCumul,
          resteAPayer: s.montantMarche - newCumul,
        }
      }
      return s
    }))
    setAdjustmentApplied(true)
    setAiMessages(prev => [...prev, {
      role: "assistant",
      content: "L'ajustement a été appliqué. Le lot Plomberie est maintenant à 60% d'avancement conformément aux constatations terrain. La différence de 23 750 € a été reportée sur la prochaine situation.",
      hasAlert: false,
    }])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    setAiMessages(prev => [...prev, { role: "user", content: inputMessage, hasAlert: false }])
    setInputMessage("")
    
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: "assistant",
        content: "J'ai analysé votre demande. Le cumul des travaux réalisés s'élève à 960 200 € soit 57% du montant total du marché. La situation du mois est conforme aux prévisions EVM.",
        hasAlert: false,
      }])
    }, 1000)
  }

  // Calculate totals
  const totalMarche = situations.reduce((acc, s) => acc + s.montantMarche, 0)
  const totalCumul = situations.reduce((acc, s) => acc + s.cumul, 0)
  const totalReste = situations.reduce((acc, s) => acc + s.resteAPayer, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Situations de Travaux & Facturation</h1>
          <p className="text-muted-foreground">Projet Tour Hekla - Situation n°8 - Mai 2026</p>
        </div>
        <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#593196] hover:bg-[#593196]/90">
              <PenTool className="h-4 w-4" />
              Éditer Certificat de Paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Certificat de Paiement n°8</DialogTitle>
              <DialogDescription>
                Situation de travaux au 31 Mai 2026
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Maître d{"'"}ouvrage:</span>
                    <p className="font-medium">SCI Tour Hekla Paris</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Entreprise:</span>
                    <p className="font-medium">Eiffage Construction IDF</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Marché n°:</span>
                    <p className="font-medium">MRC-2024-HEKLA-001</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium">31/05/2026</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h4 className="mb-3 font-medium">Récapitulatif</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Montant total du marché HT</span>
                    <span className="font-mono">{totalMarche.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumul travaux réalisés HT</span>
                    <span className="font-mono">{totalCumul.toLocaleString('fr-FR')} €</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Montant à facturer ce mois HT</span>
                    <span className="font-mono font-medium text-primary">
                      {situations.reduce((acc, s) => acc + (s.montantMarche * s.avancementMois / 100), 0).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span className="font-mono">
                      {(situations.reduce((acc, s) => acc + (s.montantMarche * s.avancementMois / 100), 0) * 0.2).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-lg">
                    <span className="font-semibold">Total TTC</span>
                    <span className="font-mono font-semibold text-primary">
                      {(situations.reduce((acc, s) => acc + (s.montantMarche * s.avancementMois / 100), 0) * 1.2).toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-3 font-medium">Signature Électronique</h4>
                {!isSigned ? (
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">
                        Signez ce document avec votre certificat eIDAS qualifié
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Certification eIDAS
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Horodatage qualifié
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSign} 
                      disabled={isSigning}
                      className="gap-2"
                    >
                      {isSigning ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Signature en cours...
                        </>
                      ) : (
                        <>
                          <PenTool className="h-4 w-4" />
                          Signer le document
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-500/10 p-3 text-emerald-500">
                    <Check className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Document signé électroniquement</p>
                      <p className="text-xs opacity-80">
                        Signé par Jean-Marc DUPONT le 06/05/2026 à 14:32:18 UTC
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCertificateDialog(false)}>
                Fermer
              </Button>
              <Button disabled={!isSigned} className="gap-2">
                <FileText className="h-4 w-4" />
                Télécharger PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Montant Marché</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMarche.toLocaleString('fr-FR')} €</div>
            <p className="text-xs text-muted-foreground">HT - Tous lots confondus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cumul Réalisé</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCumul.toLocaleString('fr-FR')} €</div>
            <div className="flex items-center gap-2">
              <Progress value={(totalCumul / totalMarche) * 100} className="h-2" />
              <span className="text-xs text-muted-foreground">
                {((totalCumul / totalMarche) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reste à Payer</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReste.toLocaleString('fr-FR')} €</div>
            <p className="text-xs text-muted-foreground">
              {((totalReste / totalMarche) * 100).toFixed(1)}% du marché
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ce Mois</CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {situations.reduce((acc, s) => acc + (s.montantMarche * s.avancementMois / 100), 0).toLocaleString('fr-FR')} €
            </div>
            <p className="text-xs text-muted-foreground">À facturer HT</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Situation Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tableau de Situation (EVM)
            </CardTitle>
            <CardDescription>
              Saisissez l{"'"}avancement du mois pour chaque poste WBS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Poste</TableHead>
                    <TableHead>Désignation</TableHead>
                    <TableHead className="text-right">Marché HT</TableHead>
                    <TableHead className="text-right">% Préc.</TableHead>
                    <TableHead className="text-right w-[100px]">% Mois</TableHead>
                    <TableHead className="text-right">Cumul HT</TableHead>
                    <TableHead className="text-right">Reste HT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {situations.map((s) => (
                    <TableRow key={s.id} className={s.id === "WBS-005" && !adjustmentApplied ? "bg-amber-500/5" : ""}>
                      <TableCell className="font-mono text-xs">{s.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {s.poste}
                          {s.id === "WBS-005" && !adjustmentApplied && (
                            <Badge variant="outline" className="text-amber-500 border-amber-500/50">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Écart
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {s.montantMarche.toLocaleString('fr-FR')} €
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={s.avancementPrecedent === 100 ? "default" : "secondary"}>
                          {s.avancementPrecedent}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min="0"
                          max={100 - s.avancementPrecedent}
                          value={s.avancementMois}
                          onChange={(e) => handleAvancementChange(s.id, e.target.value)}
                          className="h-8 w-20 text-right font-mono"
                          disabled={s.avancementPrecedent === 100}
                        />
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {s.cumul.toLocaleString('fr-FR')} €
                      </TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">
                        {s.resteAPayer.toLocaleString('fr-FR')} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-semibold">TOTAL</TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {totalMarche.toLocaleString('fr-FR')} €
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {totalCumul.toLocaleString('fr-FR')} €
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {totalReste.toLocaleString('fr-FR')} €
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Repartition par Lot</CardTitle>
            <CardDescription>Depenses cumulees HT</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="h-[300px] min-w-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={depensesParLot}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {depensesParLot.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString('fr-FR')} EUR`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {depensesParLot.slice(0, 6).map((lot) => (
                <div key={lot.name} className="flex items-center gap-2 min-w-0">
                  <div 
                    className="h-2 w-2 shrink-0 rounded-full" 
                    style={{ backgroundColor: lot.color }}
                  />
                  <span className="truncate text-muted-foreground">{lot.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SaaS Subscription Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                Abonnement SaaS Cyperux
              </CardTitle>
              <CardDescription>Gestion de votre licence et quotas</CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-[#593196] to-purple-500 text-white">
              Plan Pro
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Current Plan */}
            <div className="rounded-lg border bg-gradient-to-br from-[#593196]/10 to-transparent p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#593196]">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Plan Pro</p>
                  <p className="text-xs text-muted-foreground">Facturé annuellement</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prix mensuel</span>
                  <span className="font-medium">299 €/mois</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prochaine facture</span>
                  <span className="font-medium">01/07/2026</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Gérer l{"'"}abonnement
              </Button>
            </div>

            {/* Users Quota */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Utilisateurs</span>
                </div>
                <Badge variant="outline">18 / 25</Badge>
              </div>
              <Progress value={72} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                7 licences disponibles
              </p>
              <div className="mt-3 flex gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-primary/20">JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-emerald-500/20">ML</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-blue-500/20">PT</AvatarFallback>
                </Avatar>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px]">
                  +15
                </div>
              </div>
            </div>

            {/* Storage Quota */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Stockage</span>
                </div>
                <Badge variant="outline">847 Go / 1 To</Badge>
              </div>
              <Progress value={84.7} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                153 Go disponibles
              </p>
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Maquettes BIM</span>
                  <span>512 Go</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Documents</span>
                  <span>285 Go</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Scans LiDAR</span>
                  <span>50 Go</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96 rounded-xl border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#593196] to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Assistant Facturation</p>
                <p className="text-xs text-muted-foreground">Analyse des situations</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowAIChat(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {aiMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#593196]/20">
                    <Sparkles className="h-4 w-4 text-[#593196]" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : msg.hasAlert
                      ? "bg-amber-500/10 border border-amber-500/30"
                      : "bg-muted"
                  }`}
                >
                  {msg.hasAlert && (
                    <div className="flex items-center gap-2 mb-2 text-amber-500">
                      <Camera className="h-4 w-4" />
                      <span className="font-medium text-xs">Analyse Photo IA</span>
                    </div>
                  )}
                  <p>{msg.content}</p>
                  {msg.hasAlert && !adjustmentApplied && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={handleAdjustPlomberie} className="text-xs">
                        Ajuster à 60%
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        Ignorer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-3">
            <div className="flex gap-2">
              <Input
                placeholder="Posez une question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle AI Chat Button */}
      {!showAIChat && (
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-[#593196] to-purple-600 shadow-lg"
          onClick={() => setShowAIChat(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
