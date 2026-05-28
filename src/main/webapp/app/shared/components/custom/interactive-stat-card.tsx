"use client"

import { type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/shared/components/ui/card"
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
    icon: "bg-primary/20",
    iconColor: "text-primary",
    valueColor: "",
    hoverBorder: "hover:border-primary/50",
    active: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  },
  success: {
    icon: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    valueColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
    active: "ring-2 ring-emerald-500 ring-offset-2 ring-offset-background",
  },
  warning: {
    icon: "bg-amber-500/20",
    iconColor: "text-amber-500",
    valueColor: "text-amber-500",
    hoverBorder: "hover:border-amber-500/50",
    active: "ring-2 ring-amber-500 ring-offset-2 ring-offset-background",
  },
  danger: {
    icon: "bg-destructive/20",
    iconColor: "text-destructive",
    valueColor: "text-destructive",
    hoverBorder: "hover:border-destructive/50",
    active: "ring-2 ring-destructive ring-offset-2 ring-offset-background",
  },
  info: {
    icon: "bg-blue-500/20",
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
        "h-full border-border/50 bg-card/50 transition-all duration-200 flex flex-col",
        onClick && `cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:bg-card ${styles.hoverBorder}`,
        isActive && styles.active
      )}
      onClick={onClick}
    >
      <CardContent className="pt-6 pb-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm text-muted-foreground truncate">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className={cn("text-3xl font-bold truncate", styles.valueColor)}>{value}</p>
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
          </div>
          
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full", styles.icon)}>
            <Icon className={cn("h-6 w-6", styles.iconColor)} />
          </div>
        </div>
        
        {description && (
          <div className="mt-auto pt-2">
            <p className="text-xs text-muted-foreground/80">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
