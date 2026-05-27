"use client"

import * as React from "react"
import { cn } from "@/shared/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target?: string
  timestamp: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "destructive" | "info"
}

interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[]
  maxItems?: number
  showLoadMore?: boolean
  onLoadMore?: () => void
}

const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      className,
      items,
      maxItems = 10,
      showLoadMore = false,
      onLoadMore,
      ...props
    },
    ref
  ) => {
    const displayItems = items.slice(0, maxItems)

    const variantDotStyles = {
      default: "bg-muted-foreground",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      destructive: "bg-destructive",
      info: "bg-blue-500",
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {displayItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              {item.user.avatar && <AvatarImage src={item.user.avatar} />}
              <AvatarFallback className="text-xs">
                {item.user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.user.name}</span>
                {item.variant && (
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      variantDotStyles[item.variant]
                    )}
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {item.action}
                {item.target && (
                  <span className="font-medium text-foreground">
                    {" "}
                    {item.target}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
            {item.icon && (
              <div className="text-muted-foreground">{item.icon}</div>
            )}
          </div>
        ))}
        {showLoadMore && items.length > maxItems && (
          <button
            onClick={onLoadMore}
            className="w-full text-center text-sm text-primary hover:underline"
          >
            Voir plus d&apos;activites
          </button>
        )}
      </div>
    )
  }
)
ActivityFeed.displayName = "ActivityFeed"

export { ActivityFeed }
export type { ActivityItem }
