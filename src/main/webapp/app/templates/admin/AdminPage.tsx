"use client"

import { Link } from "react-router-dom"
import { Settings, Users, Building2, Shield, Database, Bell, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Switch } from "@/shared/components/ui/switch"
import { Badge } from "@/shared/components/ui/badge"
// import { useLanguage } from "@/lib/i18n"

const adminSections = [
  {
    title: "Gestion des Utilisateurs",
    description: "Gérer les comptes et les permissions",
    icon: Users,
    stats: "156 utilisateurs",
    actions: ["Ajouter", "Importer", "Exporter"],
  },
  {
    title: "Configuration Tenant",
    description: "Paramètres de l'organisation",
    icon: Building2,
    stats: "Eiffage Construction IDF",
    actions: ["Modifier", "Synchroniser"],
  },
  {
    title: "Sécurité",
    description: "Authentification et autorisations",
    icon: Shield,
    stats: "2FA activé",
    actions: ["Configurer", "Audit"],
  },
  {
    title: "Base de Données",
    description: "Sauvegarde et maintenance",
    icon: Database,
    stats: "Dernière sauvegarde: 2h",
    actions: ["Sauvegarder", "Restaurer"],
  },
]

const notifications = [
  { id: 1, label: "Alertes HSE critiques", enabled: true },
  { id: 2, label: "Retards de planning", enabled: true },
  { id: 3, label: "Véhicules bloqués ZFE", enabled: true },
  { id: 4, label: "Documents en attente", enabled: false },
  { id: 5, label: "Surcharge équipes", enabled: true },
]

export default function AdminPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t("admin")}</h1>
          <p className="text-muted-foreground">Configuration et administration du systeme</p>
        </div>
        <Button asChild>
          <Link to="/templates/admin/settings" className="gap-2">
            Gestion Utilisateurs & RBAC
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Admin Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {adminSections.map((section) => (
          <Card key={section.title} className="bg-card hover:bg-secondary/30 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">{section.stats}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {section.actions.map((action) => (
                  <Button key={action} variant="outline" size="sm">
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configurer les alertes système</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <span className="text-sm font-medium">{notification.label}</span>
                <Switch defaultChecked={notification.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Informations Système
            </CardTitle>
            <CardDescription>État et version du système</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { label: "Version", value: "2.4.1" },
                { label: "Tenant ID", value: "tenant-ef-001" },
                { label: "Environnement", value: "Production" },
                { label: "Région", value: "Europe (Paris)" },
                { label: "Uptime", value: "99.98%" },
                { label: "Dernière mise à jour", value: "01/05/2024" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
                <span className="text-sm text-chart-2">Tous les services opérationnels</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
