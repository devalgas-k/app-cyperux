"use client"

import * as React from "react"
import { cn } from "@/shared/utils"
import { Check } from "lucide-react"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    title: string
    description?: string
  }[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2",
          orientation === "vertical" ? "flex-col" : "flex-row items-center",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex items-center gap-3",
                orientation === "vertical" && "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-primary bg-background text-primary"
                    : "border-muted bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "transition-colors",
                  orientation === "vertical"
                    ? "ml-4 h-8 w-0.5"
                    : "h-0.5 flex-1",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper }
