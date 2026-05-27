"use client"

import * as React from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/shared/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Selectionner une date",
      disabled = false,
      className,
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: fr }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

interface DateRangePickerProps {
  from?: Date
  to?: Date
  onRangeChange?: (range: { from?: Date; to?: Date }) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      from,
      to,
      onRangeChange,
      placeholder = "Selectionner une periode",
      disabled = false,
      className,
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !from && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {format(from, "dd MMM", { locale: fr })} -{" "}
                  {format(to, "dd MMM yyyy", { locale: fr })}
                </>
              ) : (
                format(from, "PPP", { locale: fr })
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            onSelect={(range) =>
              onRangeChange?.({ from: range?.from, to: range?.to })
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }
