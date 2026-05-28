"use client"

import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { ArrowLeft, Building2, Calendar, MapPin, Users, Leaf, DollarSign, Clock, CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Target, Activity } from "lucide-react"

// Données mockées (idéalement à récupérer via une API)
const mockProjects: Record<string, any> = {
  "1": { name: "Tour Hekla - La Defense", status: "En cours", budget: "15.2M€", carbon: "420 kg/m²", progress: 65, team: "Equipe A", startDate: "01/01/2024", endDate: "31/12/2025", location: "La Défense, Paris", type: "IGH (Immeuble de Grande Hauteur)", client: "Hines", surface: "76 000 m²" },
  "2": { name: "Eco-Quartier Fluvial", status: "Planification", budget: "8.5M€", carbon: "180 kg/m²", progress: 25, team: "Equipe B", startDate: "15/03/2024", endDate: "30/06/2026", location: "Confluence, Lyon", type: "Résidentiel & Mixte", client: "Bouygues Immobilier", surface: "45 000 m²" },
  "3": { name: "Renovation Gare du Nord", status: "Retard", budget: "22.1M€", carbon: "510 kg/m²", progress: 42, team: "Equipe C", startDate: "01/09/2023", endDate: "15/12/2024", location: "Paris 10ème", type: "Infrastructure Publique", client: "SNCF", surface: "110 000 m²" },
  "4": { name: "Campus Universitaire", status: "En cours", budget: "12.8M€", carbon: "250 kg/m²", progress: 85, team: "Equipe A", startDate: "10/02/2023", endDate: "30/08/2024", location: "Saclay", type: "Équipement Éducatif", client: "Université Paris-Saclay", surface: "32 000 m²" },
  "5": { name: "Complexe Sportif", status: "Termine", budget: "5.4M€", carbon: "310 kg/m²", progress: 100, team: "Equipe D", startDate: "05/05/2022", endDate: "12/11/2023", location: "Saint-Denis", type: "Équipement Sportif", client: "Plaine Commune", surface: "15 000 m²" },
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const project = id ? mockProjects[id] || mockProjects["1"] : mockProjects["1"]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "En cours": return "default"
      case "Planification": return "secondary"
      case "Retard": return "destructive"
      case "Termine": return "outline"
      default: return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En cours": return <Activity className="h-4 w-4 mr-1" />
      case "Planification": return <Clock className="h-4 w-4 mr-1" />
      case "Retard": return <AlertTriangle className="h-4 w-4 mr-1" />
      case "Termine": return <CheckCircle className="h-4 w-4 mr-1" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/templates/projects')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge variant={getStatusVariant(project.status)} className="flex items-center text-sm px-2 py-0.5">
                {getStatusIcon(project.status)}
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {project.location}
              <span className="mx-2">•</span>
              <Building2 className="h-4 w-4" /> {project.type}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/templates/projects/${id}/tasks`)}>
            <Calendar className="mr-2 h-4 w-4" /> Planning
          </Button>
          <Button onClick={() => navigate(`/templates/projects/${id}/edit`)}>
            Éditer le projet
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progression</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${project.status === "Retard" ? "bg-destructive" : "bg-primary"}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget alloué</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.budget}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-chart-2" />
              Dans les limites
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipe assignée</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team}</div>
            <p className="text-xs text-muted-foreground mt-1">12 collaborateurs actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bilan Carbone (Estimé)</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.carbon}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-emerald-500" />
              -5% vs Objectif
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
            <CardDescription>Détails administratifs et contractuels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted-foreground">Client</div>
              <div className="col-span-2 text-sm font-medium">{project.client}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted-foreground">Surface</div>
              <div className="col-span-2 text-sm font-medium">{project.surface}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted-foreground">Date de début</div>
              <div className="col-span-2 text-sm font-medium">{project.startDate}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 text-sm text-muted-foreground">Date de fin prévue</div>
              <div className="col-span-2 text-sm font-medium">{project.endDate}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dernières Activités</CardTitle>
            <CardDescription>Journal des événements du projet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Mise à jour du planning", user: "Jean-Pierre", time: "Il y a 2 heures" },
                { action: "Validation CCTP Lot 03", user: "Marie Dubois", time: "Hier à 14:30" },
                { action: "Nouveau rapport HSE", user: "Luc Martin", time: "Il y a 2 jours" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">Par {log.user} • {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">Voir tout l'historique</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
