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
    icon: "bg-primary/20 text-primary",
    active: "ring-2 ring-primary ring-offset-2 ring-offset-background",
  },
  success: {
    icon: "bg-chart-2/20 text-chart-2",
    active: "ring-2 ring-chart-2 ring-offset-2 ring-offset-background",
  },
  warning: {
    icon: "bg-chart-3/20 text-chart-3",
    active: "ring-2 ring-chart-3 ring-offset-2 ring-offset-background",
  },
  danger: {
    icon: "bg-destructive/20 text-destructive",
    active: "ring-2 ring-destructive ring-offset-2 ring-offset-background",
  },
  info: {
    icon: "bg-chart-4/20 text-chart-4",
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
        onClick && "cursor-pointer hover:bg-secondary/50 hover:scale-[1.02] active:scale-[0.98]",
        isActive && styles.active
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", styles.icon)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-chart-2" : "text-destructive"
                  )}
                >
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{label}</p>
            {description && (
              <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5">{description}</p>
            )}
          </div>
          {onClick && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
