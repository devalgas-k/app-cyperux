"use client"

import { type LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { cn } from "@/shared/utils"

interface InteractiveStatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  onClick?: () => void
  isActive?: boolean
  variant?: "default" | "success" | "warning" | "danger" | "info"
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

const variantStyles = {
  default: {
    iconColor: "text-muted-foreground",
    valueColor: "",
    hoverBorder: "hover:border-primary/50",
    active: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  },
  success: {
    iconColor: "text-emerald-500",
    valueColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
    active: "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background",
  },
  warning: {
    iconColor: "text-amber-500",
    valueColor: "text-amber-500",
    hoverBorder: "hover:border-amber-500/50",
    active: "ring-2 ring-amber-500 ring-offset-2 ring-offset-background",
  },
  danger: {
    iconColor: "text-destructive",
    valueColor: "text-destructive",
    hoverBorder: "hover:border-destructive/50",
    active: "ring-2 ring-destructive ring-offset-2 ring-offset-background",
  },
  info: {
    iconColor: "text-blue-500",
    valueColor: "text-blue-500",
    hoverBorder: "hover:border-blue-500/50",
    active: "ring-2 ring-blue-500 ring-offset-2 ring-offset-background",
  },
}

export function InteractiveStatCard({
  label,
  value,
  icon: Icon,
  onClick,
  isActive = false,
  variant = "default",
  description,
  trend,
}: InteractiveStatCardProps) {
  const styles = variantStyles[variant]

  return (
    <Card
      className={cn(
        "h-full border-border/50 bg-card/50 transition-all duration-200 flex flex-col justify-between",
        onClick && `cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:bg-card ${styles.hoverBorder}`,
        isActive && styles.active
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium tracking-tight truncate pr-4">{label}</CardTitle>
        <Icon className={cn("h-4 w-4 shrink-0", styles.iconColor)} />
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className={cn("text-2xl font-bold truncate", styles.valueColor)}>{value}</div>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium shrink-0",
                trend.isPositive ? "text-emerald-500" : "text-destructive"
              )}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground/80 mt-1 truncate">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
