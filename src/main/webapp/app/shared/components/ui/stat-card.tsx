"use client"

import * as React from "react"
import { cn } from "@/shared/utils"
import { Card, CardContent } from "./card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label?: string
  }
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      title,
      value,
      description,
      icon,
      trend,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "",
      primary: "border-primary/30 bg-primary/5",
      success: "border-emerald-500/30 bg-emerald-500/5",
      warning: "border-amber-500/30 bg-amber-500/5",
      destructive: "border-destructive/30 bg-destructive/5",
    }

    const iconVariantStyles = {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary/10 text-primary",
      success: "bg-emerald-500/10 text-emerald-500",
      warning: "bg-amber-500/10 text-amber-500",
      destructive: "bg-destructive/10 text-destructive",
    }

    const getTrendIcon = () => {
      if (!trend) return null
      if (trend.value > 0) return <TrendingUp className="h-3 w-3" />
      if (trend.value < 0) return <TrendingDown className="h-3 w-3" />
      return <Minus className="h-3 w-3" />
    }

    const getTrendColor = () => {
      if (!trend) return ""
      if (trend.value > 0) return "text-emerald-500"
      if (trend.value < 0) return "text-destructive"
      return "text-muted-foreground"
    }

    return (
      <Card
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
              {trend && (
                <div
                  className={cn("flex items-center gap-1 text-xs", getTrendColor())}
                >
                  {getTrendIcon()}
                  <span>
                    {trend.value > 0 ? "+" : ""}
                    {trend.value}%
                  </span>
                  {trend.label && (
                    <span className="text-muted-foreground">{trend.label}</span>
                  )}
                </div>
              )}
            </div>
            {icon && (
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  iconVariantStyles[variant]
                )}
              >
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
