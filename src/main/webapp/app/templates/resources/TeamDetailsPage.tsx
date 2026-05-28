"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { ArrowLeft, Users, Calendar, MapPin, Target, TrendingUp, Activity, Briefcase } from "lucide-react"

export default function TeamDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/templates/resources')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">Détails de l'équipe {id}</h1>
              <Badge variant="default" className="flex items-center text-sm px-2 py-0.5">
                <Activity className="h-4 w-4 mr-1" />
                Active
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Projet: Tour Hekla
              <span className="mx-2">•</span>
              <MapPin className="h-4 w-4" /> Zone Nord
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/templates/resources/${id}/planning`)}>
            <Calendar className="mr-2 h-4 w-4" /> Voir le planning
          </Button>
          <Button onClick={() => navigate(`/templates/resources/${id}/edit`)}>
            Éditer l'équipe
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              +2 le mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Charge de travail</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: "85%" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellente</div>
            <p className="text-xs text-muted-foreground mt-1">Objectifs atteints à 95%</p>
          </CardContent>
        </Card>
      </div>

      {/* Details Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Membres de l'équipe</CardTitle>
            <CardDescription>Liste des collaborateurs assignés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: "Chef d'équipe", name: "Jean Dupont" },
              { role: "Développeur Senior", name: "Marie Martin" },
              { role: "Architecte", name: "Paul Durand" },
            ].map((member, i) => (
              <div key={i} className="grid grid-cols-3 gap-4 border-b pb-4 last:border-0">
                <div className="col-span-1 text-sm text-muted-foreground">{member.role}</div>
                <div className="col-span-2 text-sm font-medium">{member.name}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compétences Clés</CardTitle>
            <CardDescription>Expertises disponibles dans l'équipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Gros œuvre", "BIM", "Sécurité", "Coordination", "Électricité"].map((skill, i) => (
                <Badge key={i} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}