"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  Pause,
  MapPin,
  X,
  Sparkles,
  Send,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
// import { useLanguage } from "@/lib/i18n"

const weekForecast = [
  {
    day: "Lun",
    date: "05/05",
    icon: Sun,
    tempHigh: 22,
    tempLow: 14,
    wind: 15,
    rain: 0,
    conditions: "Ensoleillé",
    workable: true,
  },
  {
    day: "Mar",
    date: "06/05",
    icon: Cloud,
    tempHigh: 20,
    tempLow: 13,
    wind: 20,
    rain: 10,
    conditions: "Nuageux",
    workable: true,
  },
  {
    day: "Mer",
    date: "07/05",
    icon: CloudRain,
    tempHigh: 17,
    tempLow: 11,
    wind: 35,
    rain: 80,
    conditions: "Pluie",
    workable: false,
    alert: "Pluie forte - Report travaux extérieurs",
  },
  {
    day: "Jeu",
    date: "08/05",
    icon: Wind,
    tempHigh: 19,
    tempLow: 12,
    wind: 75,
    rain: 20,
    conditions: "Vent fort",
    workable: false,
    alert: "Vent 75km/h - Immobilisation des grues",
  },
  {
    day: "Ven",
    date: "09/05",
    icon: CloudSnow,
    tempHigh: 8,
    tempLow: -2,
    wind: 25,
    rain: 30,
    conditions: "Gel",
    workable: false,
    alert: "Gel -2°C - Report coulage béton",
  },
  {
    day: "Sam",
    date: "10/05",
    icon: Cloud,
    tempHigh: 12,
    tempLow: 5,
    wind: 20,
    rain: 15,
    conditions: "Nuageux",
    workable: true,
  },
  {
    day: "Dim",
    date: "11/05",
    icon: Sun,
    tempHigh: 18,
    tempLow: 10,
    wind: 10,
    rain: 0,
    conditions: "Ensoleillé",
    workable: true,
  },
]

const weatherAlerts = [
  {
    id: 1,
    date: "Jeudi 08/05",
    type: "Vent fort",
    severity: "high",
    description: "Rafales jusqu'à 75 km/h prévues",
    action: "Immobilisation des grues",
    status: "scheduled",
    impactedTasks: ["Levage dalle R+2", "Installation bardage"],
  },
  {
    id: 2,
    date: "Vendredi 09/05",
    type: "Gel",
    severity: "high",
    description: "Températures négatives (-2°C) attendues",
    action: "Report coulage béton",
    status: "scheduled",
    impactedTasks: ["Coulage voile V12", "Reprise bétonnage"],
  },
  {
    id: 3,
    date: "Mercredi 07/05",
    type: "Pluie forte",
    severity: "medium",
    description: "Précipitations > 15mm prévues",
    action: "Protection travaux en cours",
    status: "pending",
    impactedTasks: ["Étanchéité terrasse", "Enduits façade"],
  },
]

const impactedSchedule = [
  {
    task: "Coulage voile V12",
    originalDate: "09/05",
    newDate: "12/05",
    reason: "Gel",
    impact: "+3 jours",
  },
  {
    task: "Levage dalle R+2",
    originalDate: "08/05",
    newDate: "11/05",
    reason: "Vent",
    impact: "+3 jours",
  },
  {
    task: "Installation bardage",
    originalDate: "08/05",
    newDate: "11/05",
    reason: "Vent",
    impact: "+3 jours",
  },
]

export default function WeatherPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [showAI, setShowAI] = useState(true)
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: "J'ai analysé les prévisions météo pour les 7 prochains jours. 3 alertes critiques détectées qui impactent votre planning. Souhaitez-vous que je réorganise automatiquement les tâches concernées ?",
    },
  ])
  const [aiInput, setAiInput] = useState("")

  const handleAISend = () => {
    if (!aiInput.trim()) return
    setAiMessages([
      ...aiMessages,
      { role: "user", content: aiInput },
      {
        role: "assistant",
        content: "J'ai recalculé le planning en tenant compte des contraintes météo. Les tâches critiques ont été décalées avec un impact global de +3 jours sur le chemin critique. Voulez-vous voir le nouveau planning Gantt ?",
      },
    ])
    setAiInput("")
  }

  const today = weekForecast[0]
  const TodayIcon = today.icon

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Météo & Anticipation</h1>
            <p className="text-muted-foreground">
              Prévisions et impact sur le planning chantier
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            La Défense, France
          </div>
        </div>

        {/* Critical Alerts */}
        {weatherAlerts.filter(a => a.severity === "high").map((alert) => (
          <Alert key={alert.id} variant="destructive" className="border-red-500/50 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
              {alert.date} - {alert.type}
              <Badge variant="destructive" className="ml-2">Action requise</Badge>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p>{alert.description}</p>
              <p className="mt-1 font-medium">Action planifiée : {alert.action}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="destructive" className="h-7 text-xs">
                  Confirmer l&apos;action
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  Voir tâches impactées
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ))}

        {/* Today's Weather */}
        <Card className="border-[#593196]/30 bg-gradient-to-br from-[#593196]/10 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-amber-500/20">
                  <TodayIcon className="h-14 w-14 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aujourd&apos;hui, Lundi 05/05</p>
                  <p className="text-4xl font-bold">{today.tempHigh}°C</p>
                  <p className="text-lg text-muted-foreground">{today.conditions}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <Thermometer className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-sm text-muted-foreground">Min / Max</p>
                  <p className="font-medium">{today.tempLow}° / {today.tempHigh}°</p>
                </div>
                <div className="text-center">
                  <Wind className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-sm text-muted-foreground">Vent</p>
                  <p className="font-medium">{today.wind} km/h</p>
                </div>
                <div className="text-center">
                  <Droplets className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-sm text-muted-foreground">Pluie</p>
                  <p className="font-medium">{today.rain}%</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <CheckCircle className="mr-1 h-3 w-3" />
                Journée favorable
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Prévisions 7 jours
            </CardTitle>
            <CardDescription>Impact sur les opérations de chantier</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="grid min-w-[600px] grid-cols-7 gap-3">
              {weekForecast.map((day, i) => {
                const DayIcon = day.icon
                return (
                  <div
                    key={i}
                    className={`rounded-lg border p-3 text-center transition-colors ${
                      day.workable
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : "border-red-500/30 bg-red-500/5"
                    } ${i === 0 ? "ring-2 ring-[#593196]" : ""}`}
                  >
                    <p className="text-sm font-medium">{day.day}</p>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                    <DayIcon className={`mx-auto my-2 h-7 w-7 ${
                      day.workable ? "text-muted-foreground" : "text-red-400"
                    }`} />
                    <p className="text-lg font-bold">{day.tempHigh}°</p>
                    <p className="text-xs text-muted-foreground">{day.tempLow}°</p>
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Wind className="h-3 w-3 shrink-0" />
                      <span>{day.wind}</span>
                    </div>
                    {day.workable ? (
                      <Badge variant="outline" className="mt-2 w-full border-emerald-500/50 text-emerald-400 text-[10px] px-1">
                        <CheckCircle className="mr-1 h-3 w-3 shrink-0" />
                        <span>OK</span>
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="mt-2 w-full text-[10px] px-1">
                        <Pause className="mr-1 h-3 w-3 shrink-0" />
                        <span>Arret</span>
                      </Badge>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Impact Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weather Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Alertes Météo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weatherAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border p-4 ${
                      alert.severity === "high"
                        ? "border-red-500/30 bg-red-500/5"
                        : "border-amber-500/30 bg-amber-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{alert.date}</span>
                          <Badge variant={alert.severity === "high" ? "destructive" : "outline"}>
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      {alert.status === "scheduled" ? (
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-400" />
                      )}
                    </div>
                    <div className="mt-3 rounded bg-background/50 p-2">
                      <p className="text-xs font-medium text-muted-foreground">ACTION</p>
                      <p className="text-sm">{alert.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                Planning Impacté
              </CardTitle>
              <CardDescription>Tâches reprogrammées automatiquement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tâche</TableHead>
                    <TableHead>Prévu</TableHead>
                    <TableHead>Nouveau</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impactedSchedule.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.task}</TableCell>
                      <TableCell>
                        <span className="text-muted-foreground line-through">{item.originalDate}</span>
                      </TableCell>
                      <TableCell className="text-amber-400">{item.newDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500/50 text-red-400">
                          {item.impact}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" size="sm" className="order-2 sm:order-1 text-xs sm:text-sm whitespace-nowrap">
                  Annuler les modifications
                </Button>
                <Button 
                  size="sm" 
                  className="order-1 bg-[#593196] hover:bg-[#593196]/90 sm:order-2 text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => {
                    toast.success("Planning valide", {
                      description: "Le nouveau planning a ete enregistre avec succes."
                    })
                  }}
                >
                  Valider le nouveau planning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Panel */}
      {showAI && (
        <Card className="w-80 shrink-0 flex flex-col border-[#593196]/30 bg-[#593196]/5">
          <CardHeader className="border-b border-[#593196]/20 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Assistant Météo</CardTitle>
                  <CardDescription className="text-xs">Anticipation intelligente</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAI(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#593196]">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <div className="border-t border-[#593196]/20 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Question météo..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAISend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleAISend} className="bg-[#593196] hover:bg-[#593196]/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Optimiser planning
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Alerter équipes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {!showAI && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#593196] shadow-lg hover:bg-[#593196]/90"
          onClick={() => setShowAI(true)}
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
