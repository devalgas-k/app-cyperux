"use client"

import * as React from "react"
import { Bell, Search, Globe, Command, Sun, Moon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { SidebarTrigger } from "@/shared/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { CommandPalette } from "@/shared/components/command-palette"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import { useTranslation } from "react-i18next"

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const setLanguage = (lang: string) => i18n.changeLanguage(lang)
  
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Global keyboard shortcut for CMD+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <button
            onClick={() => setCommandOpen(true)}
            className="relative hidden items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent md:flex"
          >
            <Search className="h-4 w-4" />
            <span>Rechercher...</span>
            <div className="ml-8 flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {mounted && theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Changer le theme</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Changer de langue</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage("fr")}
                className={language === "fr" ? "bg-accent" : ""}
              >
                <span className="mr-2">FR</span>
                Francais
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-accent" : ""}
              >
                <span className="mr-2">EN</span>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="relative h-8 w-8" asChild>
            <Link to="/templates/notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          <Link 
            to="/templates/profile"
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 transition-all cursor-pointer"
          >
            <span className="text-xs font-medium">JP</span>
          </Link>
        </div>
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}
