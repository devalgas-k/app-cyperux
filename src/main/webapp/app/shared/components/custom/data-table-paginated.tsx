"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, Filter, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Label } from "@/shared/components/ui/label"
import { cn } from "@/shared/utils"

export interface FilterConfig {
  key: string
  label: string
  type: "select" | "multiselect" | "date" | "daterange"
  options?: { value: string; label: string }[]
}

export interface ColumnConfig<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTablePaginatedProps<T> {
  data: T[]
  columns: ColumnConfig<T>[]
  filters?: FilterConfig[]
  searchKeys?: (keyof T)[]
  pageSize?: number
  onRowClick?: (item: T) => void
  renderRow?: (item: T, index: number) => React.ReactNode
  emptyMessage?: string
  showResultCount?: boolean
  stickyHeader?: boolean
}

export function DataTablePaginated<T extends Record<string, unknown>>({
  data,
  columns,
  filters = [],
  searchKeys = [],
  pageSize: initialPageSize = 10,
  onRowClick,
  renderRow,
  emptyMessage = "Aucun element trouve",
  showResultCount = true,
  stickyHeader = false,
}: DataTablePaginatedProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({})
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data]

    // Apply search
    if (searchQuery && searchKeys.length > 0) {
      const query = searchQuery.toLowerCase()
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key]
          return value && String(value).toLowerCase().includes(query)
        })
      )
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && (Array.isArray(value) ? value.length > 0 : value !== "all")) {
        result = result.filter((item) => {
          const itemValue = item[key as keyof T]
          if (Array.isArray(value)) {
            return value.includes(String(itemValue))
          }
          return String(itemValue) === value
        })
      }
    })

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T]
        const bValue = b[sortConfig.key as keyof T]
        
        if (aValue === bValue) return 0
        
        const comparison = aValue < bValue ? -1 : 1
        return sortConfig.direction === "asc" ? comparison : -comparison
      })
    }

    return result
  }, [data, searchQuery, searchKeys, activeFilters, sortConfig])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = useCallback((key: string, value: string | string[]) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }, [])

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" }
        if (prev.direction === "desc") return null
      }
      return { key, direction: "asc" }
    })
  }, [])

  const resetFilters = useCallback(() => {
    setActiveFilters({})
    setSearchQuery("")
    setSortConfig(null)
    setCurrentPage(1)
  }, [])

  const activeFilterCount = Object.values(activeFilters).filter(
    (v) => v && (Array.isArray(v) ? v.length > 0 : v !== "all")
  ).length

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
    if (sortConfig.direction === "asc") return <ArrowUp className="h-3.5 w-3.5 text-primary" />
    return <ArrowDown className="h-3.5 w-3.5 text-primary" />
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1">
          {searchKeys.length > 0 && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-7 w-7"
                  onClick={() => handleSearch("")}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}

          {filters.length > 0 && (
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Filter className="h-4 w-4" />
                  Filtres
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">Filtres</h4>
                    {activeFilterCount > 0 && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetFilters}>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reinitialiser
                      </Button>
                    )}
                  </div>
                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <Label className="text-xs text-muted-foreground">{filter.label}</Label>
                      {filter.type === "select" && filter.options && (
                        <Select
                          value={(activeFilters[filter.key] as string) || "all"}
                          onValueChange={(value) => handleFilterChange(filter.key, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            {filter.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {filter.type === "multiselect" && filter.options && (
                        <div className="space-y-1.5 max-h-32 overflow-y-auto">
                          {filter.options.map((option) => {
                            const values = (activeFilters[filter.key] as string[]) || []
                            return (
                              <div key={option.value} className="flex items-center gap-2">
                                <Checkbox
                                  id={`${filter.key}-${option.value}`}
                                  checked={values.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    const newValues = checked
                                      ? [...values, option.value]
                                      : values.filter((v) => v !== option.value)
                                    handleFilterChange(filter.key, newValues)
                                  }}
                                />
                                <Label
                                  htmlFor={`${filter.key}-${option.value}`}
                                  className="text-xs font-normal cursor-pointer"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {showResultCount && (
          <p className="text-sm text-muted-foreground">
            {filteredData.length} resultat{filteredData.length !== 1 ? "s" : ""}
            {activeFilterCount > 0 && " (filtre)"}
          </p>
        )}
      </div>

      {/* Active Filters Badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) ? value.length === 0 : value === "all")) return null
            const filter = filters.find((f) => f.key === key)
            if (!filter) return null

            const displayValue = Array.isArray(value)
              ? value.map((v) => filter.options?.find((o) => o.value === v)?.label || v).join(", ")
              : filter.options?.find((o) => o.value === value)?.label || value

            return (
              <Badge key={key} variant="secondary" className="gap-1 pl-2">
                <span className="text-muted-foreground">{filter.label}:</span>
                <span className="max-w-32 truncate">{displayValue}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleFilterChange(key, Array.isArray(value) ? [] : "all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Table */}
      <div className={cn("overflow-x-auto rounded-lg border border-border", stickyHeader && "max-h-[500px] overflow-y-auto")}>
        <table className="w-full">
          <thead className={cn("bg-muted/50", stickyHeader && "sticky top-0 z-10")}>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-1.5">
                    {column.label}
                    {column.sortable && getSortIcon(String(column.key))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : renderRow ? (
              paginatedData.map((item, index) => renderRow(item, startIndex + index))
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    "bg-card transition-colors",
                    onRowClick && "cursor-pointer hover:bg-secondary/50"
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className={cn("px-4 py-3 text-sm", column.className)}>
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Afficher</span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">par page</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-xs"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>

          <span className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, filteredData.length)} sur {filteredData.length}
          </span>
        </div>
      )}
    </div>
  )
}
