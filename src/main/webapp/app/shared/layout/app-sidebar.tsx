"use client"

import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  Truck,
  FileText,
  DollarSign,
  Settings,
  Shield,
  Users,
  ShoppingCart,
  Server,
  Leaf,
  Box,
  Brain,
  Sparkles,
  BarChart3,
  View,
  History,
  Receipt,
  Bell,
  Camera,
  CloudSun,
  Recycle,
  Building2,
  ClipboardCheck,
  BookOpen,
  HelpCircle,
  Cog,
  Radio,
  Scan,
  FileBarChart,
  Activity,
  Store,
  Mail,
  Code,
  WifiOff,
  Plug,
  SlidersHorizontal,
  FlaskConical,
  ArrowLeftRight,
  ClipboardPen,
  Palette,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
// import { useLanguage } from "@/lib/i18n"
import { CyperuxLogo } from "@/shared/components/cyperux-logo"

const mainNavItems = [
  { key: "dashboard", href: "/templates/dashboard", icon: LayoutDashboard },
  { key: "projects", href: "/templates/projects", icon: FolderKanban },
  { key: "planning", href: "/templates/planning", icon: CalendarDays },
  { key: "siteDiary", href: "/templates/site-diary", icon: BookOpen },
  { key: "dailyReport", href: "/templates/daily-report", icon: ClipboardPen },
  { key: "logistics", href: "/templates/logistics", icon: Truck },
  { key: "documents", href: "/templates/documents", icon: FileText },
  { key: "digitalTwin", href: "/templates/digital-twin", icon: Box },
  { key: "bimViewer", href: "/templates/bim-viewer", icon: View },
]

const operationsNavItems = [
  { key: "hse", href: "/templates/hse", icon: Shield },
  { key: "resources", href: "/templates/resources", icon: Users },
  { key: "equipment", href: "/templates/equipment", icon: Cog },
  { key: "iotTracking", href: "/templates/iot-tracking", icon: Radio },
  { key: "realityCapture", href: "/templates/reality-capture", icon: Scan },
  { key: "purchasing", href: "/templates/purchasing", icon: ShoppingCart },
  { key: "finance", href: "/templates/finance", icon: DollarSign },
  { key: "billing", href: "/templates/billing", icon: Receipt },
  { key: "green", href: "/templates/green", icon: Leaf },
  { key: "analyticsRE2020", href: "/templates/analytics/re2020", icon: BarChart3 },
  { key: "csrd", href: "/templates/csrd", icon: FileBarChart },
  { key: "siteIssues", href: "/templates/site-issues", icon: Camera },
  { key: "weather", href: "/templates/weather", icon: CloudSun },
  { key: "waste", href: "/templates/waste", icon: Recycle },
  { key: "reuse", href: "/templates/reuse", icon: ArrowLeftRight },
  { key: "subcontractors", href: "/templates/subcontractors", icon: Building2 },
  { key: "punchList", href: "/templates/punch-list", icon: ClipboardCheck },
]

const systemNavItems = [
  { key: "notifications", href: "/templates/notifications", icon: Bell },
  { key: "optimization", href: "/templates/optimization", icon: Sparkles },
  { key: "simulator", href: "/templates/simulator", icon: FlaskConical },
  { key: "audit", href: "/templates/audit", icon: History },
  { key: "monitoring", href: "/templates/monitoring", icon: Activity },
  { key: "integrations", href: "/templates/integrations", icon: Plug },
  { key: "marketplace", href: "/templates/marketplace", icon: Store },
  { key: "communications", href: "/templates/communications", icon: Mail },
  { key: "developer", href: "/templates/developer", icon: Code },
  { key: "offline", href: "/templates/offline", icon: WifiOff },
  { key: "provisioning", href: "/templates/provisioning", icon: Server },
  { key: "aiConsole", href: "/templates/ai-console", icon: Brain },
  { key: "designSystem", href: "/templates/design-system", icon: Palette },
  { key: "support", href: "/templates/support", icon: HelpCircle },
  { key: "systemConfig", href: "/templates/settings", icon: SlidersHorizontal },
  { key: "admin", href: "/templates/admin", icon: Settings },
]

import { useTranslation } from "react-i18next"

export function AppSidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <Link to="/templates/dashboard" className="flex items-center">
          <CyperuxLogo width={140} height={42} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="transition-colors hover:bg-sidebar-accent"
                      tooltip={t(`nav.${item.key}`)}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{t(`nav.${item.key}`)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Opérations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="transition-colors hover:bg-sidebar-accent"
                    tooltip={t(`nav.${item.key}`)}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{t(`nav.${item.key}`)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Système</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="transition-colors hover:bg-sidebar-accent"
                    tooltip={t(`nav.${item.key}`)}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{t(`nav.${item.key}`)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Link 
          to="/organization"
          className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="text-xs font-medium">EF</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Eiffage Construction IDF</span>
            <span className="text-xs text-muted-foreground">tenant-ef-001</span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
