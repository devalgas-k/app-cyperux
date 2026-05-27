"use client"

import { Link } from "react-router-dom"
import { Truck, AlertTriangle, CheckCircle, MapPin, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
// import { useLanguage } from "@/lib/i18n"

const fleet = [
  {
    id: 1,
    vehicle: "Camion Benne #42",
    critAir: 1,
    status: "authorized",
    destination: "Tour Hekla",
    driver: "Martin D.",
    eta: "14:30",
  },
  {
    id: 2,
    vehicle: "Toupie Béton #12",
    critAir: 4,
    status: "blocked",
    destination: "Gare du Nord",
    driver: "Pierre L.",
    eta: "-",
  },
  {
    id: 3,
    vehicle: "Camion Grue #08",
    critAir: 2,
    status: "authorized",
    destination: "Eco-Quartier Fluvial",
    driver: "Sophie M.",
    eta: "16:15",
  },
  {
    id: 4,
    vehicle: "Fourgon #23",
    critAir: 1,
    status: "authorized",
    destination: "Tour Hekla",
    driver: "Lucas R.",
    eta: "15:00",
  },
]

const zfeZones = [
  { name: "Paris Centre", level: "Crit'Air 3+", color: "bg-destructive/60" },
  { name: "Petite Couronne", level: "Crit'Air 4+", color: "bg-chart-3/60" },
  { name: "Grande Couronne", level: "Crit'Air 5", color: "bg-chart-2/60" },
]

export default function LogisticsPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;

  const getCritAirColor = (critAir: number) => {
    if (critAir <= 1) return "bg-chart-2 text-chart-2-foreground"
    if (critAir <= 2) return "bg-chart-3 text-chart-3-foreground"
    if (critAir <= 3) return "bg-chart-3 text-chart-3-foreground"
    return "bg-destructive text-destructive-foreground"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("logistics")}</h1>
          <p className="text-muted-foreground">
            Gestion de la flotte et conformité Zone à Faibles Émissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/templates/logistics/jit" className="gap-2">
              <Clock className="h-4 w-4" />
              Tour de Contrôle JIT
            </Link>
          </Button>
          <Button asChild>
            <Link to="/templates/logistics/zfe" className="gap-2">
              Dashboard ZFE Avancé
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Véhicules Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/20 text-chart-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-xs text-muted-foreground">Autorisés ZFE</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Bloqués ZFE</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20 text-chart-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Chantiers Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ZFE Map */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>{t("zfeMap")}</CardTitle>
            <CardDescription>Zones à Faibles Émissions - Restrictions actives</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simplified Paris ZFE Map */}
            <div className="relative h-[300px] overflow-hidden rounded-lg bg-secondary/50">
              {/* Map layers - concentric zones */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Grande Couronne */}
                <div className="absolute h-[280px] w-[280px] rounded-full bg-chart-2/20 border-2 border-chart-2/40" />
                {/* Petite Couronne */}
                <div className="absolute h-[200px] w-[200px] rounded-full bg-chart-3/20 border-2 border-chart-3/40" />
                {/* Paris Centre */}
                <div className="absolute h-[120px] w-[120px] rounded-full bg-destructive/20 border-2 border-destructive/40" />
                {/* Center point */}
                <div className="absolute h-4 w-4 rounded-full bg-primary" />
              </div>

              {/* Vehicle markers */}
              <div className="absolute left-[45%] top-[30%]">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-chart-2 flex items-center justify-center">
                    <Truck className="h-3 w-3 text-background" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
                    #42
                  </span>
                </div>
              </div>
              <div className="absolute left-[60%] top-[55%]">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                    <Truck className="h-3 w-3 text-background" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-destructive whitespace-nowrap">
                    #12 BLOQUÉ
                  </span>
                </div>
              </div>
              <div className="absolute left-[25%] top-[65%]">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-chart-2 flex items-center justify-center">
                    <Truck className="h-3 w-3 text-background" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
                    #08
                  </span>
                </div>
              </div>

              {/* Project markers */}
              <div className="absolute left-[40%] top-[25%]">
                <div className="h-3 w-3 rounded-sm bg-primary rotate-45" />
              </div>
              <div className="absolute left-[55%] top-[50%]">
                <div className="h-3 w-3 rounded-sm bg-chart-3 rotate-45" />
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              {zfeZones.map((zone) => (
                <div key={zone.name} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded ${zone.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {zone.name} ({zone.level})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fleet Table */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>{t("fleet")}</CardTitle>
            <CardDescription>État des véhicules en temps réel</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">{t("vehicle")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("critAir")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("status")}</TableHead>
                  <TableHead className="text-muted-foreground">{t("destination")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleet.map((vehicle) => (
                  <TableRow
                    key={vehicle.id}
                    className={`border-border ${
                      vehicle.status === "blocked" ? "bg-destructive/10" : "hover:bg-secondary/50"
                    }`}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{vehicle.vehicle}</p>
                        <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCritAirColor(vehicle.critAir)}>
                        {vehicle.critAir}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vehicle.status === "authorized" ? (
                        <Badge variant="outline" className="border-chart-2 text-chart-2">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {t("authorized")}
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="animate-pulse">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {t("blocked")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{vehicle.destination}</p>
                        <p className="text-xs text-muted-foreground">ETA: {vehicle.eta}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
