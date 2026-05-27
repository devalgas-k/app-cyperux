"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, AlertCircle, Info, CheckCircle, XCircle, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/shared/utils"

const criticalAlertVariants = cva(
  "relative rounded-lg border-2 p-4 transition-all",
  {
    variants: {
      variant: {
        critical: "border-red-500/60 bg-red-950/50 animate-pulse-slow shadow-lg shadow-red-500/10",
        warning: "border-amber-500/60 bg-amber-950/50 shadow-lg shadow-amber-500/10",
        info: "border-blue-500/60 bg-blue-950/50",
        success: "border-emerald-500/60 bg-emerald-950/50",
      },
    },
    defaultVariants: {
      variant: "critical",
    },
  }
)

const iconMap = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle,
}

const colorMap = {
  critical: {
    icon: "text-red-300",
    iconBg: "bg-red-500/30",
    title: "text-red-200",
    description: "text-red-200/80",
    value: "text-red-300",
    badge: "bg-red-500 text-white",
    secondary: "text-red-300/70",
  },
  warning: {
    icon: "text-amber-300",
    iconBg: "bg-amber-500/30",
    title: "text-amber-200",
    description: "text-amber-200/80",
    value: "text-amber-300",
    badge: "bg-amber-500 text-white",
    secondary: "text-amber-300/70",
  },
  info: {
    icon: "text-blue-300",
    iconBg: "bg-blue-500/30",
    title: "text-blue-200",
    description: "text-blue-200/80",
    value: "text-blue-300",
    badge: "bg-blue-500 text-white",
    secondary: "text-blue-300/70",
  },
  success: {
    icon: "text-emerald-300",
    iconBg: "bg-emerald-500/30",
    title: "text-emerald-200",
    description: "text-emerald-200/80",
    value: "text-emerald-300",
    badge: "bg-emerald-500 text-white",
    secondary: "text-emerald-300/70",
  },
}

export interface CriticalAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof criticalAlertVariants> {
  title: string
  description?: string
  value?: string | number
  valueLabel?: string
  badge?: string
  secondaryInfo?: string
  icon?: React.ReactNode
  trend?: "up" | "down"
  trendValue?: string
}

export function CriticalAlert({
  className,
  variant = "critical",
  title,
  description,
  value,
  valueLabel,
  badge,
  secondaryInfo,
  icon,
  trend,
  trendValue,
  ...props
}: CriticalAlertProps) {
  const colors = colorMap[variant || "critical"]
  const Icon = icon ? null : iconMap[variant || "critical"]
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <div className={cn(criticalAlertVariants({ variant }), className)} {...props}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", colors.iconBg)}>
          {icon || (Icon && <Icon className={cn("h-5 w-5", colors.icon)} />)}
        </div>
        <div className="flex-1">
          <p className={cn("text-sm font-semibold", colors.title)}>{title}</p>
          {description && (
            <p className={cn("text-xs", colors.description)}>{description}</p>
          )}
        </div>
        {badge && (
          <span className={cn("px-2 py-0.5 rounded text-xs font-bold", colors.badge)}>
            {badge}
          </span>
        )}
      </div>

      {/* Value */}
      {value && (
        <div className="flex items-baseline gap-2 mb-1">
          <span className={cn("text-2xl font-bold", colors.value)}>{value}</span>
          {valueLabel && (
            <span className={cn("text-sm", colors.description)}>{valueLabel}</span>
          )}
          {trend && trendValue && (
            <span className={cn("text-sm flex items-center gap-1 ml-auto", 
              trend === "up" ? "text-red-400" : "text-emerald-400"
            )}>
              <TrendIcon className="h-3 w-3" />
              {trendValue}
            </span>
          )}
        </div>
      )}

      {/* Secondary Info */}
      {secondaryInfo && (
        <p className={cn("text-xs mt-2", colors.secondary)}>{secondaryInfo}</p>
      )}
    </div>
  )
}

// Stat avec alerte integree
export interface AlertStatProps {
  title: string
  value: string | number
  description?: string
  variant?: "critical" | "warning" | "info" | "success"
  trend?: { value: number; label: string }
  icon?: React.ReactNode
  className?: string
}

export function AlertStat({
  title,
  value,
  description,
  variant = "info",
  trend,
  icon,
  className,
}: AlertStatProps) {
  const colors = colorMap[variant]
  const Icon = iconMap[variant]

  return (
    <div className={cn(
      "rounded-lg border p-4",
      variant === "critical" && "border-red-500/40 bg-red-950/30",
      variant === "warning" && "border-amber-500/40 bg-amber-950/30",
      variant === "info" && "border-blue-500/40 bg-blue-950/30",
      variant === "success" && "border-emerald-500/40 bg-emerald-950/30",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-xs font-medium", colors.secondary)}>{title}</span>
        {icon || <Icon className={cn("h-4 w-4", colors.icon)} />}
      </div>
      <p className={cn("text-2xl font-bold", colors.value)}>{value}</p>
      {description && (
        <p className={cn("text-xs mt-1", colors.description)}>{description}</p>
      )}
      {trend && (
        <div className={cn(
          "flex items-center gap-1 mt-2 text-xs",
          trend.value >= 0 ? "text-red-400" : "text-emerald-400"
        )}>
          {trend.value >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}</span>
        </div>
      )}
    </div>
  )
}
