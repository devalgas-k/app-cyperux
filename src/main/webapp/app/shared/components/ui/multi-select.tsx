"use client"

import * as React from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/shared/utils"
import { Button } from "./button"
import { Badge } from "./badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  maxDisplay?: number
  disabled?: boolean
  className?: string
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      selected,
      onChange,
      placeholder = "Selectionner...",
      searchPlaceholder = "Rechercher...",
      emptyMessage = "Aucun resultat.",
      maxDisplay = 3,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value))
      } else {
        onChange([...selected, value])
      }
    }

    const handleRemove = (value: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(selected.filter((v) => v !== value))
    }

    const selectedOptions = options.filter((opt) => selected.includes(opt.value))
    const displayOptions = selectedOptions.slice(0, maxDisplay)
    const remainingCount = selectedOptions.length - maxDisplay

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between min-h-10",
              selected.length > 0 ? "h-auto" : "",
              className
            )}
          >
            <div className="flex flex-wrap gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {displayOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="mr-1 mb-1"
                    >
                      {option.icon && (
                        <span className="mr-1">{option.icon}</span>
                      )}
                      {option.label}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={(e) => handleRemove(option.value, e)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {remainingCount > 0 && (
                    <Badge variant="outline" className="mb-1">
                      +{remainingCount} autres
                    </Badge>
                  )}
                </>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.icon && (
                      <span className="mr-2">{option.icon}</span>
                    )}
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
export type { Option }
