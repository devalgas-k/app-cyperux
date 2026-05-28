"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import { ArrowLeft, BookOpen, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function TrainingDetailsPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  
  const decodedName = decodeURIComponent(name || "Formation")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/templates/hse')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Détails: {decodedName}</h1>
          <p className="text-muted-foreground">Suivi et gestion de la formation</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 / 50</div>
            <p className="text-xs text-muted-foreground mt-1">Personnes formées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prochaine session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Nov.</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-amber-500" />
              8 places restantes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des participants</CardTitle>
          <CardDescription>État d'avancement par collaborateur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Alice Martin", status: "Terminé", date: "01/10/2025" },
              { name: "Bob Dupont", status: "Terminé", date: "05/10/2025" },
              { name: "Charlie Durand", status: "En attente", date: "-" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-medium">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Validation: {p.date}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${p.status === "Terminé" ? "text-emerald-500" : "text-amber-500"}`}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}