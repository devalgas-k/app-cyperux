"use client"

import * as React from "react"
import { cn } from "@/shared/utils"

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative space-y-4 pl-6", className)}
        {...props}
      >
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
        {children}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "destructive" | "info"
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, icon, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-background border-border",
      success: "bg-emerald-500 border-emerald-500 text-white",
      warning: "bg-amber-500 border-amber-500 text-white",
      destructive: "bg-destructive border-destructive text-destructive-foreground",
      info: "bg-blue-500 border-blue-500 text-white",
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          className={cn(
            "absolute -left-6 top-1 h-4 w-4 rounded-full border-2 flex items-center justify-center",
            variantStyles[variant]
          )}
        >
          {icon && <span className="scale-75">{icon}</span>}
        </div>
        {children}
      </div>
    )
  }
)
TimelineItem.displayName = "TimelineItem"

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("pb-4", className)} {...props}>
        {children}
      </div>
    )
  }
)
TimelineContent.displayName = "TimelineContent"

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 text-sm font-medium", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineHeader.displayName = "TimelineHeader"

interface TimelineDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    >
      {children}
    </p>
  )
})
TimelineDescription.displayName = "TimelineDescription"

interface TimelineTimeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const TimelineTime = React.forwardRef<HTMLSpanElement, TimelineTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
TimelineTime.displayName = "TimelineTime"

export {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineHeader,
  TimelineDescription,
  TimelineTime,
}
