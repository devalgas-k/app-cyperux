import React from "react"
import { cn } from "@/shared/utils"

interface StatCardListProps {
  children: React.ReactNode
  className?: string
}

export function StatCardList({ children, className }: StatCardListProps) {
  const childCount = React.Children.count(children)
  const isScrollable = childCount > 4

  return (
    <div 
      className={cn(
        "flex gap-4 pb-2 -mb-2",
        isScrollable ? "overflow-x-hidden hover:overflow-x-auto snap-x scroll-smooth" : "flex-wrap",
        className
      )}
    >
      {React.Children.map(children, child => (
        <div className={cn(
          "flex-1",
          isScrollable ? "min-w-[240px] shrink-0 snap-start" : "min-w-[200px]"
        )}>
          {child}
        </div>
      ))}
    </div>
  )
}
