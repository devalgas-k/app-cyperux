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
    icon: "bg-primary/10",
    iconColor: "text-primary",
    hoverBorder: "hover:border-primary/50",
    active: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  },
  success: {
    icon: "bg-chart-2/10",
    iconColor: "text-chart-2",
    hoverBorder: "hover:border-chart-2/50",
    active: "ring-2 ring-chart-2 ring-offset-2 ring-offset-background",
  },
  warning: {
    icon: "bg-chart-3/10",
    iconColor: "text-chart-3",
    hoverBorder: "hover:border-chart-3/50",
    active: "ring-2 ring-chart-3 ring-offset-2 ring-offset-background",
  },
  danger: {
    icon: "bg-destructive/10",
    iconColor: "text-destructive",
    hoverBorder: "hover:border-destructive/50",
    active: "ring-2 ring-destructive ring-offset-2 ring-offset-background",
  },
  info: {
    icon: "bg-chart-4/10",
    iconColor: "text-chart-4",
    hoverBorder: "hover:border-chart-4/50",
    active: "ring-2 ring-chart-4 ring-offset-2 ring-offset-background",
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
        "bg-card transition-all duration-200",
        onClick && `cursor-pointer hover:scale-[1.02] hover:shadow-lg ${styles.hoverBorder}`,
        isActive && styles.active
      )}
      onClick={onClick}
    >
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold truncate">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium shrink-0",
                    trend.isPositive ? "text-chart-2" : "text-destructive"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground/70 truncate mt-1">{description}</p>
            )}
          </div>
          
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full ml-4", styles.icon)}>
            <Icon className={cn("h-5 w-5", styles.iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
