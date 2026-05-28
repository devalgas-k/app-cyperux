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
        "flex gap-4 pb-4 pt-4 px-1 -mt-4 -mx-1",
        isScrollable 
          ? "overflow-x-auto snap-x scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30" 
          : "flex-wrap",
        className
      )}
    >
      {React.Children.map(children, child => (
        <div className={cn(
          "flex-1 flex flex-col",
          isScrollable ? "min-w-[240px] shrink-0 snap-start" : "min-w-[200px]"
        )}>
          {child}
        </div>
      ))}
    </div>
  )
}
