"use client"

import { useState, useEffect } from "react"
import { Database, Shield, HardDrive, Radio, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
// import { useLanguage } from "@/lib/i18n"
import { CyperuxLogoIcon } from "@/shared/components/cyperux-logo"

const services = [
  { key: "database", icon: Database, label: "PostgreSQL", delay: 0 },
  { key: "authentication", icon: Shield, label: "Keycloak", delay: 1 },
  { key: "storage", icon: HardDrive, label: "S3 Bucket", delay: 2 },
  { key: "messageBus", icon: Radio, label: "Event Bus", delay: 3 },
]

const logs = [
  { message: "Initialisation schéma PostgreSQL", progress: 100, status: "complete" },
  { message: "Realm Keycloak", progress: 100, status: "active" },
  { message: "Bucket S3", progress: 100, status: "connected" },
  { message: "Event Bus configuré", progress: 100, status: "complete" },
]

export default function ProvisioningPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [activeRings, setActiveRings] = useState<number[]>([])

  useEffect(() => {
    services.forEach((_, index) => {
      setTimeout(() => {
        setActiveRings((prev) => [...prev, index])
      }, index * 800)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("tenantInitialization")}</h1>
        <p className="text-muted-foreground">Eiffage Construction IDF - tenant-ef-001</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pulse Rings Visualization */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Infrastructure Services</CardTitle>
            <CardDescription>État de provisionnement des services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex h-[300px] items-center justify-center">
              {/* Center logo */}
              <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <CyperuxLogoIcon size={40} />
              </div>

              {/* Pulse rings */}
              {services.map((service, index) => {
                const isActive = activeRings.includes(index)
                const size = 120 + index * 50
                const angle = (index * 90) * (Math.PI / 180)
                const iconX = Math.cos(angle) * (size / 2 - 20)
                const iconY = Math.sin(angle) * (size / 2 - 20)

                return (
                  <div key={service.key} className="absolute">
                    {/* Ring */}
                    <div
                      className={`absolute rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "border-primary/60 animate-pulse-ring"
                          : "border-border/30"
                      }`}
                      style={{
                        width: size,
                        height: size,
                        left: -size / 2,
                        top: -size / 2,
                      }}
                    />
                    {/* Service icon */}
                    <div
                      className={`absolute flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                      style={{
                        left: iconX - 20,
                        top: iconY - 20,
                      }}
                    >
                      <service.icon className="h-5 w-5" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Status Cards */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const isActive = activeRings.includes(index)
            return (
              <Card
                key={service.key}
                className={`bg-card transition-all duration-500 ${
                  isActive ? "border-primary/50" : ""
                }`}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{service.label}</p>
                    <p className="text-sm text-muted-foreground">{t(service.key)}</p>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-chart-2 text-chart-2-foreground" : "bg-secondary"
                    }`}
                  >
                    {isActive && <Check className="h-4 w-4 text-background" />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Logs */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Logs de Provisionnement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 font-mono text-sm">
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
              >
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span className="flex-1 text-foreground">{log.message}</span>
                <span className="text-chart-2">{log.progress}%</span>
                <span className="rounded bg-chart-2/20 px-2 py-0.5 text-xs text-chart-2">
                  {log.status === "complete"
                    ? "Terminé"
                    : log.status === "active"
                    ? t("active")
                    : t("connected")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
