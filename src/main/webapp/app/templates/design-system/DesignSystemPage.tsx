"use client"

import { useState, useMemo } from "react"
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Palette,
  Layout,
  FormInput,
  MessageSquare,
  Navigation,
  Bell,
  Table2,
  Layers,
  Bot,
  Code2,
  Eye,
  Moon,
  Sun,
  Sparkles,
  Filter,
  Download,
  FileText,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Separator } from "@/shared/components/ui/separator"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"
import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Slider } from "@/shared/components/ui/slider"
import { Textarea } from "@/shared/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { toast } from "sonner"
// import { useLanguage } from "@/lib/i18n"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"
import { Toggle } from "@/shared/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"
import { Kbd } from "@/shared/components/ui/kbd"
import { Spinner } from "@/shared/components/ui/spinner"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shared/components/ui/menubar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/components/ui/context-menu"
import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { Timeline, TimelineItem, TimelineContent, TimelineHeader, TimelineDescription, TimelineTime } from "@/shared/components/ui/timeline"
import { Stepper } from "@/shared/components/ui/stepper"
import { FileUpload } from "@/shared/components/ui/file-upload"
import { StatCard } from "@/shared/components/ui/stat-card"
import { ActivityFeed } from "@/shared/components/ui/activity-feed"
import { DatePicker, DateRangePicker } from "@/shared/components/ui/date-picker"
import { MultiSelect } from "@/shared/components/ui/multi-select"
import { CriticalAlert, AlertStat } from "@/shared/components/ui/critical-alert"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, ChevronDown, ChevronsUpDown, Home, Folder, File, Calendar as CalendarIcon, Users, FileCheck, TrendingUp, Clock, AlertTriangle, Ruler } from "lucide-react"

// Component Registry
const componentRegistry = {
  shadcn: [
    {
      name: "Button",
      category: "Actions",
      description: "Bouton interactif avec plusieurs variantes et tailles.",
      variants: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      sizes: ["default", "sm", "lg", "icon"],
      importPath: "@/shared/components/ui/button",
      usageCount: 156,
    },
    {
      name: "Card",
      category: "Layout",
      description: "Conteneur flexible pour regrouper du contenu.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/card",
      usageCount: 89,
    },
    {
      name: "Dialog",
      category: "Overlays",
      description: "Fenetre modale pour les interactions importantes.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/dialog",
      usageCount: 45,
    },
    {
      name: "Input",
      category: "Forms",
      description: "Champ de saisie texte avec validation.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/input",
      usageCount: 78,
    },
    {
      name: "Select",
      category: "Forms",
      description: "Menu deroulant pour selection d'options.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/select",
      usageCount: 34,
    },
    {
      name: "Table",
      category: "Data Display",
      description: "Tableau pour afficher des donnees structurees.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/table",
      usageCount: 28,
    },
    {
      name: "Badge",
      category: "Data Display",
      description: "Etiquette pour statuts et categories.",
      variants: ["default", "secondary", "destructive", "outline"],
      sizes: [],
      importPath: "@/shared/components/ui/badge",
      usageCount: 112,
    },
    {
      name: "Tabs",
      category: "Navigation",
      description: "Navigation par onglets.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/tabs",
      usageCount: 23,
    },
    {
      name: "Alert",
      category: "Feedback",
      description: "Message d'alerte contextuel.",
      variants: ["default", "destructive"],
      sizes: [],
      importPath: "@/shared/components/ui/alert",
      usageCount: 15,
    },
    {
      name: "Progress",
      category: "Feedback",
      description: "Barre de progression.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/progress",
      usageCount: 19,
    },
    {
      name: "Switch",
      category: "Forms",
      description: "Interrupteur pour options binaires.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/switch",
      usageCount: 42,
    },
    {
      name: "Checkbox",
      category: "Forms",
      description: "Case a cocher pour selections multiples.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/checkbox",
      usageCount: 38,
    },
    {
      name: "Slider",
      category: "Forms",
      description: "Curseur pour valeurs numeriques.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/slider",
      usageCount: 8,
    },
    {
      name: "Avatar",
      category: "Data Display",
      description: "Image de profil avec fallback.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/avatar",
      usageCount: 34,
    },
    {
      name: "Tooltip",
      category: "Overlays",
      description: "Info-bulle contextuelle.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/tooltip",
      usageCount: 56,
    },
    {
      name: "DropdownMenu",
      category: "Navigation",
      description: "Menu contextuel deroulant.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/dropdown-menu",
      usageCount: 67,
    },
    {
      name: "Accordion",
      category: "Data Display",
      description: "Sections repliables.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/accordion",
      usageCount: 12,
    },
    {
      name: "Sheet",
      category: "Overlays",
      description: "Panneau lateral coulissant.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/sheet",
      usageCount: 18,
    },
    {
      name: "Textarea",
      category: "Forms",
      description: "Zone de texte multiligne.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/textarea",
      usageCount: 24,
    },
    {
      name: "Calendar",
      category: "Forms",
      description: "Selecteur de date.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/calendar",
      usageCount: 9,
    },
    {
      name: "Separator",
      category: "Layout",
      description: "Ligne de separation.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/separator",
      usageCount: 45,
    },
    {
      name: "ScrollArea",
      category: "Layout",
      description: "Zone de defilement stylisee.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/scroll-area",
      usageCount: 32,
    },
    // Nouveaux composants ajoutes
    {
      name: "AlertDialog",
      category: "Overlays",
      description: "Dialog de confirmation avec actions.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/alert-dialog",
      usageCount: 18,
    },
    {
      name: "AspectRatio",
      category: "Layout",
      description: "Conteneur avec ratio d'aspect fixe.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/aspect-ratio",
      usageCount: 12,
    },
    {
      name: "Breadcrumb",
      category: "Navigation",
      description: "Fil d'Ariane pour la navigation hierarchique.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/breadcrumb",
      usageCount: 8,
    },
    {
      name: "Carousel",
      category: "Data Display",
      description: "Carrousel pour afficher du contenu defilant.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/carousel",
      usageCount: 5,
    },
    {
      name: "Chart",
      category: "Data Display",
      description: "Composant de graphiques avec Recharts.",
      variants: ["line", "bar", "pie", "area"],
      sizes: [],
      importPath: "@/shared/components/ui/chart",
      usageCount: 24,
    },
    {
      name: "Collapsible",
      category: "Data Display",
      description: "Section repliable avec animation.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/collapsible",
      usageCount: 7,
    },
    {
      name: "Command",
      category: "Navigation",
      description: "Palette de commandes avec recherche.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/command",
      usageCount: 4,
    },
    {
      name: "ContextMenu",
      category: "Navigation",
      description: "Menu contextuel au clic droit.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/context-menu",
      usageCount: 6,
    },
    {
      name: "Drawer",
      category: "Overlays",
      description: "Tiroir coulissant depuis le bord.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/drawer",
      usageCount: 11,
    },
    {
      name: "Form",
      category: "Forms",
      description: "Composant de formulaire avec validation.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/form",
      usageCount: 35,
    },
    {
      name: "HoverCard",
      category: "Overlays",
      description: "Carte au survol pour informations supplementaires.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/hover-card",
      usageCount: 9,
    },
    {
      name: "InputOTP",
      category: "Forms",
      description: "Champ de saisie pour codes OTP.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/input-otp",
      usageCount: 3,
    },
    {
      name: "Label",
      category: "Forms",
      description: "Etiquette pour champs de formulaire.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/label",
      usageCount: 67,
    },
    {
      name: "Menubar",
      category: "Navigation",
      description: "Barre de menu horizontale.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/menubar",
      usageCount: 2,
    },
    {
      name: "NavigationMenu",
      category: "Navigation",
      description: "Menu de navigation avec sous-menus.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/navigation-menu",
      usageCount: 4,
    },
    {
      name: "Pagination",
      category: "Navigation",
      description: "Composant de pagination pour listes.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/pagination",
      usageCount: 14,
    },
    {
      name: "Popover",
      category: "Overlays",
      description: "Bulle contextuelle positionnee.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/popover",
      usageCount: 22,
    },
    {
      name: "RadioGroup",
      category: "Forms",
      description: "Groupe de boutons radio.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/radio-group",
      usageCount: 16,
    },
    {
      name: "Resizable",
      category: "Layout",
      description: "Panneaux redimensionnables.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/resizable",
      usageCount: 3,
    },
    {
      name: "Skeleton",
      category: "Feedback",
      description: "Placeholder de chargement anime.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/skeleton",
      usageCount: 28,
    },
    {
      name: "Sonner",
      category: "Feedback",
      description: "Systeme de notifications toast.",
      variants: ["default", "success", "error", "warning", "info"],
      sizes: [],
      importPath: "@/shared/components/ui/sonner",
      usageCount: 45,
    },
    {
      name: "Toggle",
      category: "Forms",
      description: "Bouton bascule on/off.",
      variants: ["default", "outline"],
      sizes: ["default", "sm", "lg"],
      importPath: "@/shared/components/ui/toggle",
      usageCount: 8,
    },
    {
      name: "ToggleGroup",
      category: "Forms",
      description: "Groupe de boutons toggle exclusifs.",
      variants: ["default", "outline"],
      sizes: ["default", "sm", "lg"],
      importPath: "@/shared/components/ui/toggle-group",
      usageCount: 5,
    },
    {
      name: "Toast",
      category: "Feedback",
      description: "Notification temporaire.",
      variants: ["default", "destructive"],
      sizes: [],
      importPath: "@/shared/components/ui/toast",
      usageCount: 12,
    },
    {
      name: "Spinner",
      category: "Feedback",
      description: "Indicateur de chargement anime.",
      variants: ["default"],
      sizes: ["sm", "md", "lg"],
      importPath: "@/shared/components/ui/spinner",
      usageCount: 19,
    },
    {
      name: "Empty",
      category: "Feedback",
      description: "Etat vide avec illustration.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/empty",
      usageCount: 7,
    },
    {
      name: "Kbd",
      category: "Data Display",
      description: "Raccourci clavier stylise.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/kbd",
      usageCount: 11,
    },
    {
      name: "ButtonGroup",
      category: "Actions",
      description: "Groupe de boutons lies.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/button-group",
      usageCount: 6,
    },
    // Nouveaux composants modernes
    {
      name: "Timeline",
      category: "Data Display",
      description: "Chronologie verticale pour afficher des evenements.",
      variants: ["default", "success", "warning", "destructive", "info"],
      sizes: [],
      importPath: "@/shared/components/ui/timeline",
      usageCount: 8,
    },
    {
      name: "Stepper",
      category: "Navigation",
      description: "Indicateur de progression par etapes.",
      variants: ["horizontal", "vertical"],
      sizes: [],
      importPath: "@/shared/components/ui/stepper",
      usageCount: 5,
    },
    {
      name: "FileUpload",
      category: "Forms",
      description: "Zone de depot de fichiers avec drag & drop.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/file-upload",
      usageCount: 12,
    },
    {
      name: "StatCard",
      category: "Data Display",
      description: "Carte statistique avec tendance et icone.",
      variants: ["default", "primary", "success", "warning", "destructive"],
      sizes: [],
      importPath: "@/shared/components/ui/stat-card",
      usageCount: 24,
    },
    {
      name: "ActivityFeed",
      category: "Data Display",
      description: "Fil d'activite avec avatars et timestamps.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/activity-feed",
      usageCount: 6,
    },
    {
      name: "DatePicker",
      category: "Forms",
      description: "Selecteur de date avec calendrier popup.",
      variants: ["single", "range"],
      sizes: [],
      importPath: "@/shared/components/ui/date-picker",
      usageCount: 15,
    },
    {
      name: "MultiSelect",
      category: "Forms",
      description: "Selection multiple avec recherche et badges.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/ui/multi-select",
      usageCount: 9,
    },
    {
      name: "CriticalAlert",
      category: "Feedback",
      description: "Alerte critique avec hierarchie visuelle et contraste optimal.",
      variants: ["critical", "warning", "info", "success"],
      sizes: [],
      importPath: "@/shared/components/ui/critical-alert",
      usageCount: 15,
    },
  ],
  copilotkit: [
    {
      name: "CopilotProvider",
      category: "Context",
      description: "Provider pour l'assistant IA avec gestion des messages.",
      variants: [],
      sizes: [],
      importPath: "@/shared/components/copilot-provider",
      usageCount: 1,
    },
    {
      name: "AIAssistant",
      category: "Chat",
      description: "Widget d'assistant IA flottant avec chat interactif.",
      variants: ["floating", "expanded"],
      sizes: [],
      importPath: "@/shared/components/ai-assistant",
      usageCount: 1,
    },
  ],
  custom: [
    {
      name: "AppSidebar",
      category: "Navigation",
      description: "Barre laterale principale de l'application.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/app-sidebar",
      usageCount: 1,
    },
    {
      name: "AppHeader",
      category: "Navigation",
      description: "En-tete de l'application avec recherche et actions.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/app-header",
      usageCount: 1,
    },
    {
      name: "CommandPalette",
      category: "Navigation",
      description: "Palette de commandes accessible par raccourci clavier.",
      variants: ["default"],
      sizes: [],
      importPath: "@/shared/components/command-palette",
      usageCount: 1,
    },
    {
      name: "ThemeProvider",
      category: "Context",
      description: "Provider pour la gestion du theme (clair/sombre).",
      variants: [],
      sizes: [],
      importPath: "@/shared/components/theme-provider",
      usageCount: 1,
    },
    {
      name: "CyperuxLogo",
      category: "Branding",
      description: "Logo de l'application Cyperux.",
      variants: ["default", "icon"],
      sizes: ["sm", "md", "lg"],
      importPath: "@/shared/components/cyperux-logo",
      usageCount: 2,
    },
  ],
}

const categories = [
  { id: "all", label: "Tous", icon: Layers },
  { id: "Actions", label: "Actions", icon: ChevronRight },
  { id: "Layout", label: "Layout", icon: Layout },
  { id: "Forms", label: "Formulaires", icon: FormInput },
  { id: "Data Display", label: "Donnees", icon: Table2 },
  { id: "Overlays", label: "Overlays", icon: MessageSquare },
  { id: "Navigation", label: "Navigation", icon: Navigation },
  { id: "Feedback", label: "Feedback", icon: Bell },
  { id: "Chat", label: "IA/Chat", icon: Bot },
  { id: "Context", label: "Contexte", icon: Sparkles },
  { id: "Branding", label: "Branding", icon: Palette },
]

const codeExamples: Record<string, string> = {
  Button: `import { Button } from "@/shared/components/ui/button"

// Variantes
<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tailles
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>`,

  Card: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description de la carte</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
</Card>`,

  Dialog: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Ouvrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Contenu du dialog
  </DialogContent>
</Dialog>`,

  Input: `import { Input } from "@/shared/components/ui/input"

<Input placeholder="Saisir..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Mot de passe" />
<Input disabled placeholder="Desactive" />`,

  Badge: `import { Badge } from "@/shared/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,

  Select: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selectionner..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`,

  Table: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Colonne 1</TableHead>
      <TableHead>Colonne 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Valeur 1</TableCell>
      <TableCell>Valeur 2</TableCell>
    </TableRow>
  </TableBody>
</Table>`,

  Tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
    <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Contenu 1</TabsContent>
  <TabsContent value="tab2">Contenu 2</TabsContent>
</Tabs>`,

  Alert: `import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"

<Alert>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Message d'alerte.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Erreur</AlertTitle>
  <AlertDescription>Une erreur est survenue.</AlertDescription>
</Alert>`,

  Progress: `import { Progress } from "@/shared/components/ui/progress"

<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`,

  Switch: `import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="mode" />
  <Label htmlFor="mode">Mode avance</Label>
</div>`,

  Checkbox: `import { Checkbox } from "@/shared/components/ui/checkbox"
import { Label } from "@/shared/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">J'accepte les conditions</Label>
</div>`,

  Avatar: `import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,

  Tooltip: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Survoler</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Info-bulle</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,

  DropdownMenu: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,

  Accordion: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Contenu de la section 1</AccordionContent>
  </AccordionItem>
</Accordion>`,

  Slider: `import { Slider } from "@/shared/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,

  Textarea: `import { Textarea } from "@/shared/components/ui/textarea"

<Textarea placeholder="Votre message..." />`,

  AIAssistant: `import { AIAssistant } from "@/shared/components/ai-assistant"

// Widget flottant avec chat IA
<AIAssistant />

// L'assistant s'adapte automatiquement au contexte de la page
// et propose des actions rapides pertinentes.`,

  CopilotProvider: `import { CopilotProvider, useCopilot } from "@/shared/components/copilot-provider"

// Dans le layout
<CopilotProvider>
  {children}
</CopilotProvider>

// Dans un composant
const { messages, sendMessage, isLoading } = useCopilot()`,

  AlertDialog: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Supprimer</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Etes-vous sur?</AlertDialogTitle>
      <AlertDialogDescription>
        Cette action est irreversible.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction>Confirmer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,

  Breadcrumb: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink to="/templates/">Accueil</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Page actuelle</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,

  Skeleton: `import { Skeleton } from "@/shared/components/ui/skeleton"

// Texte
<Skeleton className="h-4 w-[250px]" />

// Avatar
<Skeleton className="h-12 w-12 rounded-full" />

// Card
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-[80%]" />
</div>`,

  Popover: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button>Ouvrir</Button>
  </PopoverTrigger>
  <PopoverContent>
    Contenu du popover
  </PopoverContent>
</Popover>`,

  HoverCard: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@mention</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    Informations supplementaires
  </HoverCardContent>
</HoverCard>`,

  Command: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command"

<Command>
  <CommandInput placeholder="Rechercher..." />
  <CommandList>
    <CommandEmpty>Aucun resultat</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendrier</CommandItem>
      <CommandItem>Parametres</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,

  Drawer: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild>
    <Button>Ouvrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Titre</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Contenu</div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Fermer</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,

  InputOTP: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,

  Pagination: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious to="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink to="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink to="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext to="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,

  RadioGroup: `import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Label } from "@/shared/components/ui/label"

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`,

  Toggle: `import { Toggle } from "@/shared/components/ui/toggle"
import { Bold } from "lucide-react"

<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>

// Avec variantes
<Toggle variant="outline">Outline</Toggle>`,

  ToggleGroup: `import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Gauche</ToggleGroupItem>
  <ToggleGroupItem value="center">Centre</ToggleGroupItem>
  <ToggleGroupItem value="right">Droite</ToggleGroupItem>
</ToggleGroup>`,

  Sonner: `import { toast } from "sonner"

// Succes
toast.success("Operation reussie")

// Erreur
toast.error("Une erreur est survenue")

// Info
toast.info("Information importante")

// Avec description
toast.success("Sauvegarde", {
  description: "Vos modifications ont ete enregistrees."
})`,

  Spinner: `import { Spinner } from "@/shared/components/ui/spinner"

// Tailles
<Spinner className="h-4 w-4" />
<Spinner className="h-6 w-6" />
<Spinner className="h-8 w-8" />`,

  Kbd: `import { Kbd } from "@/shared/components/ui/kbd"

// Raccourcis clavier
<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
<Kbd>Cmd</Kbd> + <Kbd>S</Kbd>`,

  Resizable: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    Panel gauche
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    Panel droit
  </ResizablePanel>
</ResizablePanelGroup>`,

  Collapsible: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">Voir plus</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    Contenu cache qui s'affiche au clic
  </CollapsibleContent>
</Collapsible>`,

  // Nouveaux composants modernes
  Timeline: `import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineHeader,
  TimelineDescription,
  TimelineTime,
} from "@/shared/components/ui/timeline"

<Timeline>
  <TimelineItem variant="success">
    <TimelineContent>
      <TimelineHeader>Projet cree</TimelineHeader>
      <TimelineDescription>Nouveau projet demarre</TimelineDescription>
      <TimelineTime>Il y a 2h</TimelineTime>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem variant="info">
    <TimelineContent>
      <TimelineHeader>En cours</TimelineHeader>
      <TimelineTime>Maintenant</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`,

  Stepper: `import { Stepper } from "@/shared/components/ui/stepper"

<Stepper
  steps={[
    { title: "Informations", description: "Details de base" },
    { title: "Configuration", description: "Parametres" },
    { title: "Validation", description: "Confirmer" },
  ]}
  currentStep={1}
  orientation="horizontal"
/>

// Vertical
<Stepper
  steps={steps}
  currentStep={2}
  orientation="vertical"
/>`,

  FileUpload: `import { FileUpload } from "@/shared/components/ui/file-upload"

<FileUpload
  accept="image/*,.pdf,.doc,.docx"
  multiple
  maxSize={10} // MB
  maxFiles={5}
  onFilesSelected={(files) => {
    console.log("Fichiers selectionnes:", files)
  }}
/>`,

  StatCard: `import { StatCard } from "@/shared/components/ui/stat-card"
import { FileText } from "lucide-react"

<StatCard
  title="Documents"
  value="1,234"
  description="Total des documents"
  icon={<FileText className="h-5 w-5" />}
  trend={{ value: 12, label: "vs mois dernier" }}
  variant="primary" // default | primary | success | warning | destructive
/>`,

  ActivityFeed: `import { ActivityFeed } from "@/shared/components/ui/activity-feed"

<ActivityFeed
  items={[
    {
      id: "1",
      user: { name: "Jean P.", initials: "JP", avatar: "/avatars/jean.jpg" },
      action: "a cree le projet",
      target: "Tour Eiffel",
      timestamp: "Il y a 2 heures",
      variant: "success",
    },
    {
      id: "2",
      user: { name: "Marie D.", initials: "MD" },
      action: "a modifie le document",
      target: "Plan RDC",
      timestamp: "Il y a 1 heure",
      variant: "info",
    },
  ]}
  maxItems={5}
  showLoadMore
  onLoadMore={() => console.log("Charger plus")}
/>`,

  DatePicker: `import { DatePicker, DateRangePicker } from "@/shared/components/ui/date-picker"

// Date simple
<DatePicker
  date={selectedDate}
  onDateChange={setSelectedDate}
  placeholder="Selectionner une date"
/>

// Plage de dates
<DateRangePicker
  from={startDate}
  to={endDate}
  onRangeChange={({ from, to }) => {
    setStartDate(from)
    setEndDate(to)
  }}
  placeholder="Selectionner une periode"
/>`,

  MultiSelect: `import { MultiSelect } from "@/shared/components/ui/multi-select"

const options = [
  { value: "react", label: "React", icon: <ReactIcon /> },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
]

<MultiSelect
  options={options}
  selected={selectedValues}
  onChange={setSelectedValues}
  placeholder="Selectionner des technologies..."
  searchPlaceholder="Rechercher..."
  maxDisplay={3}
/>`,

  CriticalAlert: `import { CriticalAlert, AlertStat } from "@/shared/components/ui/critical-alert"

// Alerte critique avec valeur mise en evidence
<CriticalAlert
  variant="critical" // critical | warning | info | success
  title="Ecart Geometrique"
  description="Wall_Ref_004"
  value="2cm"
  valueLabel="de deviation"
  badge="CRITIQUE"
  secondaryInfo="Tolerance: +/- 1cm | Depassement: +1cm"
/>

// Variante warning
<CriticalAlert
  variant="warning"
  title="Delai a risque"
  description="Livraison materiaux"
  value="3 jours"
  valueLabel="de retard estime"
  trend="up"
  trendValue="+2 jours"
/>

// Stat avec alerte integree
<AlertStat
  title="Incidents Securite"
  value={3}
  description="Cette semaine"
  variant="critical"
  trend={{ value: 50, label: "vs semaine derniere" }}
/>`,
}

export default function DesignSystemPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSource, setSelectedSource] = useState<"all" | "shadcn" | "copilotkit" | "custom">("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [previewDarkMode, setPreviewDarkMode] = useState(false)

  const allComponents = useMemo(() => {
    const all = [
      ...componentRegistry.shadcn.map(c => ({ ...c, source: "shadcn" as const })),
      ...componentRegistry.copilotkit.map(c => ({ ...c, source: "copilotkit" as const })),
      ...componentRegistry.custom.map(c => ({ ...c, source: "custom" as const })),
    ]
    return all
  }, [])

  const filteredComponents = useMemo(() => {
    return allComponents.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           component.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || component.category === selectedCategory
      const matchesSource = selectedSource === "all" || component.source === selectedSource
      return matchesSearch && matchesCategory && matchesSource
    })
  }, [allComponents, searchQuery, selectedCategory, selectedSource])

  const stats = useMemo(() => ({
    total: allComponents.length,
    shadcn: componentRegistry.shadcn.length,
    copilotkit: componentRegistry.copilotkit.length,
    custom: componentRegistry.custom.length,
    totalUsage: allComponents.reduce((acc, c) => acc + c.usageCount, 0),
  }), [allComponents])

  const copyCode = (componentName: string) => {
    const code = codeExamples[componentName]
    if (code) {
      navigator.clipboard.writeText(code)
      setCopiedCode(componentName)
      toast.success("Code copie", {
        description: `Le code de ${componentName} a ete copie dans le presse-papier.`
      })
      setTimeout(() => setCopiedCode(null), 2000)
    }
  }

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "shadcn":
        return <Badge className="bg-primary/20 text-primary">Shadcn/UI</Badge>
      case "copilotkit":
        return <Badge className="bg-purple-500/20 text-purple-400">CopilotKit</Badge>
      case "custom":
        return <Badge className="bg-amber-500/20 text-amber-400">Custom</Badge>
      default:
        return null
    }
  }

  const renderComponentPreview = (componentName: string) => {
    switch (componentName) {
      case "Button":
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Default</Button>
            <Button size="sm" variant="destructive">Destructive</Button>
            <Button size="sm" variant="outline">Outline</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="ghost">Ghost</Button>
            <Button size="sm" variant="link">Link</Button>
          </div>
        )
      case "Badge":
        return (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        )
      case "Input":
        return (
          <div className="space-y-2 w-full max-w-xs">
            <Input placeholder="Saisir du texte..." />
            <Input placeholder="Desactive" disabled />
          </div>
        )
      case "Progress":
        return (
          <div className="space-y-2 w-full max-w-xs">
            <Progress value={33} />
            <Progress value={66} />
            <Progress value={100} />
          </div>
        )
      case "Switch":
        return (
          <div className="flex items-center gap-2">
            <Switch id="preview-switch" />
            <Label htmlFor="preview-switch">Activer</Label>
          </div>
        )
      case "Checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox id="preview-checkbox" />
            <Label htmlFor="preview-checkbox">Accepter</Label>
          </div>
        )
      case "Avatar":
        return (
          <div className="flex gap-2">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        )
      case "Slider":
        return (
          <div className="w-full max-w-xs">
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        )
      case "Select":
        return (
          <div className="w-full max-w-xs">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opt1">Option 1</SelectItem>
                <SelectItem value="opt2">Option 2</SelectItem>
                <SelectItem value="opt3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "Alert":
        return (
          <div className="space-y-2 w-full">
            <Alert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>Ceci est un message informatif.</AlertDescription>
            </Alert>
          </div>
        )
      case "Textarea":
        return (
          <div className="w-full max-w-xs">
            <Textarea placeholder="Votre message..." />
          </div>
        )
      case "Card":
        return (
          <Card className="w-full max-w-xs">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Titre de carte</CardTitle>
              <CardDescription className="text-xs">Description</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Contenu de la carte</p>
            </CardContent>
          </Card>
        )
      case "Dialog":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Ouvrir Dialog</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Titre du Dialog</DialogTitle>
                <DialogDescription>Description du dialog modal.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm">Contenu du dialog...</p>
              </div>
            </DialogContent>
          </Dialog>
        )
      case "Table":
        return (
          <div className="w-full max-w-sm border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Nom</TableHead>
                  <TableHead className="text-xs">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-xs">Projet A</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">Actif</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs">Projet B</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">En pause</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )
      case "Tabs":
        return (
          <Tabs defaultValue="tab1" className="w-full max-w-xs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1" className="text-xs">Onglet 1</TabsTrigger>
              <TabsTrigger value="tab2" className="text-xs">Onglet 2</TabsTrigger>
              <TabsTrigger value="tab3" className="text-xs">Onglet 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="text-sm p-2">Contenu 1</TabsContent>
            <TabsContent value="tab2" className="text-sm p-2">Contenu 2</TabsContent>
            <TabsContent value="tab3" className="text-sm p-2">Contenu 3</TabsContent>
          </Tabs>
        )
      case "Tooltip":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline">Survolez-moi</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Info-bulle contextuelle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "DropdownMenu":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      case "Accordion":
        return (
          <Accordion type="single" collapsible className="w-full max-w-xs">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">Section 1</AccordionTrigger>
              <AccordionContent className="text-xs">Contenu de la section 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm">Section 2</AccordionTrigger>
              <AccordionContent className="text-xs">Contenu de la section 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      case "Sheet":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Panneau lateral</Badge>
            <span className="text-xs text-muted-foreground">Voir Dialog pour exemple similaire</span>
          </div>
        )
      case "Calendar":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Calendrier</Badge>
            <span className="text-xs text-muted-foreground">Selecteur de date interactif</span>
          </div>
        )
      case "Separator":
        return (
          <div className="w-full max-w-xs space-y-2">
            <p className="text-xs text-muted-foreground">Element au-dessus</p>
            <Separator />
            <p className="text-xs text-muted-foreground">Element en-dessous</p>
          </div>
        )
      case "ScrollArea":
        return (
          <ScrollArea className="h-20 w-full max-w-xs border rounded-lg p-2">
            <div className="space-y-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-xs">Element {i + 1} de la liste</p>
              ))}
            </div>
          </ScrollArea>
        )
      case "CopilotProvider":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-purple-500/30 bg-purple-500/10">
            <Bot className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-sm font-medium">Provider IA</p>
              <p className="text-xs text-muted-foreground">Contexte global pour l&apos;assistant</p>
            </div>
          </div>
        )
      case "AIAssistant":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-purple-500/30 bg-purple-500/10">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-sm font-medium">Assistant IA</p>
              <p className="text-xs text-muted-foreground">Widget de chat flottant</p>
            </div>
          </div>
        )
      case "AppSidebar":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
            <Layout className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-medium">Sidebar</p>
              <p className="text-xs text-muted-foreground">Navigation principale</p>
            </div>
          </div>
        )
      case "AppHeader":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
            <Navigation className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-medium">Header</p>
              <p className="text-xs text-muted-foreground">En-tete avec recherche</p>
            </div>
          </div>
        )
      case "CommandPalette":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
            <Search className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-medium">Cmd+K</p>
              <p className="text-xs text-muted-foreground">Palette de commandes</p>
            </div>
          </div>
        )
      case "ThemeProvider":
        return (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-2 rounded-lg border bg-background">
              <Sun className="h-4 w-4" />
              <span className="text-xs">Clair</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg border bg-zinc-900 text-white">
              <Moon className="h-4 w-4" />
              <span className="text-xs">Sombre</span>
            </div>
          </div>
        )
      case "CyperuxLogo":
        return (
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">C</div>
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">C</div>
          </div>
        )
      // Nouveaux previews
      case "AlertDialog":
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">Supprimer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irreversible. Voulez-vous continuer?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction>Confirmer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      case "AspectRatio":
        return (
          <div className="w-32">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground">16:9</span>
            </AspectRatio>
          </div>
        )
      case "Breadcrumb":
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="#" className="text-xs flex items-center gap-1">
                  <Home className="h-3 w-3" />
                  Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to="#" className="text-xs">Projets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xs">Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )
      case "Carousel":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <ChevronDown className="h-4 w-4 -rotate-90" />
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded bg-muted" />
              <div className="w-8 h-8 rounded bg-primary/20" />
              <div className="w-8 h-8 rounded bg-muted" />
            </div>
            <ChevronDown className="h-4 w-4 rotate-90" />
          </div>
        )
      case "Chart":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <div className="flex items-end gap-1 h-12">
              <div className="w-3 h-4 bg-primary/40 rounded-t" />
              <div className="w-3 h-8 bg-primary/60 rounded-t" />
              <div className="w-3 h-6 bg-primary/80 rounded-t" />
              <div className="w-3 h-10 bg-primary rounded-t" />
              <div className="w-3 h-5 bg-primary/70 rounded-t" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">Line, Bar, Pie, Area</span>
          </div>
        )
      case "Collapsible":
        return (
          <Collapsible className="w-full max-w-xs">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full justify-between">
                <span className="text-xs">Voir plus</span>
                <ChevronsUpDown className="h-3 w-3" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="rounded border p-2 text-xs">Contenu cache</div>
            </CollapsibleContent>
          </Collapsible>
        )
      case "Command":
        return (
          <div className="w-full max-w-xs border rounded-lg overflow-hidden">
            <Command>
              <CommandInput placeholder="Rechercher..." className="h-8 text-xs" />
              <CommandList>
                <CommandEmpty className="text-xs py-2">Aucun resultat</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem className="text-xs">Calendrier</CommandItem>
                  <CommandItem className="text-xs">Parametres</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )
      case "ContextMenu":
        return (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="border border-dashed rounded-lg p-4 text-center cursor-context-menu">
                <span className="text-xs text-muted-foreground">Clic droit ici</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem className="text-xs">Copier</ContextMenuItem>
              <ContextMenuItem className="text-xs">Coller</ContextMenuItem>
              <ContextMenuItem className="text-xs">Supprimer</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )
      case "Drawer":
        return (
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="sm" variant="outline">Ouvrir Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Titre du Drawer</DrawerTitle>
                <DrawerDescription>Description du panneau</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm">Contenu du drawer...</p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">Fermer</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )
      case "Form":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <FormInput className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Formulaire</p>
              <p className="text-xs text-muted-foreground">Avec validation react-hook-form</p>
            </div>
          </div>
        )
      case "HoverCard":
        return (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button size="sm" variant="link" className="px-0">@utilisateur</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jean Dupont</p>
                  <p className="text-xs text-muted-foreground">Chef de projet</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )
      case "InputOTP":
        return (
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        )
      case "Label":
        return (
          <div className="space-y-2">
            <Label htmlFor="demo" className="text-xs">Nom du projet</Label>
            <Input id="demo" placeholder="Entrez le nom..." className="h-8 text-xs" />
          </div>
        )
      case "Menubar":
        return (
          <Menubar className="w-fit">
            <MenubarMenu>
              <MenubarTrigger className="text-xs">Fichier</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className="text-xs">Nouveau</MenubarItem>
                <MenubarItem className="text-xs">Ouvrir</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-xs">Edition</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className="text-xs">Copier</MenubarItem>
                <MenubarItem className="text-xs">Coller</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )
      case "NavigationMenu":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <Navigation className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Nav Menu</p>
              <p className="text-xs text-muted-foreground">Menu avec sous-menus</p>
            </div>
          </div>
        )
      case "Pagination":
        return (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious to="#" className="text-xs" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#" className="text-xs">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#" isActive className="text-xs">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#" className="text-xs">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext to="#" className="text-xs" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )
      case "Popover":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">Options</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-2">
                <p className="text-sm font-medium">Parametres</p>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Notifications</Label>
                  <Switch />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      case "RadioGroup":
        return (
          <RadioGroup defaultValue="option1" className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="r1" />
              <Label htmlFor="r1" className="text-xs">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="r2" />
              <Label htmlFor="r2" className="text-xs">Option 2</Label>
            </div>
          </RadioGroup>
        )
      case "Resizable":
        return (
          <div className="w-full max-w-xs h-20 border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex items-center justify-center bg-muted/30">
                  <span className="text-xs">Panel 1</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs">Panel 2</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )
      case "Skeleton":
        return (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[150px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        )
      case "Sonner":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast.success("Succes!")}>
              Succes
            </Button>
            <Button size="sm" variant="outline" onClick={() => toast.error("Erreur!")}>
              Erreur
            </Button>
          </div>
        )
      case "Toggle":
        return (
          <div className="flex gap-2">
            <Toggle aria-label="Bold" size="sm">
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Italic" size="sm">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Underline" size="sm">
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
        )
      case "ToggleGroup":
        return (
          <ToggleGroup type="single" defaultValue="left" size="sm">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        )
      case "Toast":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Toast</p>
              <p className="text-xs text-muted-foreground">Voir Sonner pour demo</p>
            </div>
          </div>
        )
      case "Spinner":
        return (
          <div className="flex items-center gap-4">
            <Spinner className="h-4 w-4" />
            <Spinner className="h-6 w-6" />
            <Spinner className="h-8 w-8" />
          </div>
        )
      case "Empty":
        return (
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-dashed">
            <File className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground">Aucun element</p>
          </div>
        )
      case "Kbd":
        return (
          <div className="flex items-center gap-2">
            <Kbd>Ctrl</Kbd>
            <span className="text-xs">+</span>
            <Kbd>K</Kbd>
          </div>
        )
      case "ButtonGroup":
        return (
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Button Group</p>
              <p className="text-xs text-muted-foreground">Boutons lies ensemble</p>
            </div>
          </div>
        )
      // Nouveaux composants modernes
      case "Timeline":
        return (
          <Timeline className="w-full max-w-xs">
            <TimelineItem variant="success">
              <TimelineContent>
                <TimelineHeader>Projet cree</TimelineHeader>
                <TimelineTime>Il y a 2h</TimelineTime>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem variant="info">
              <TimelineContent>
                <TimelineHeader>Document ajoute</TimelineHeader>
                <TimelineTime>Il y a 1h</TimelineTime>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineContent>
                <TimelineHeader>En cours...</TimelineHeader>
                <TimelineTime>Maintenant</TimelineTime>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        )
      case "Stepper":
        return (
          <Stepper
            steps={[
              { title: "Infos" },
              { title: "Details" },
              { title: "Validation" },
            ]}
            currentStep={1}
            orientation="horizontal"
          />
        )
      case "FileUpload":
        return (
          <FileUpload
            accept="image/*,.pdf"
            multiple
            maxSize={5}
            maxFiles={3}
            onFilesSelected={(files) => console.log(files)}
            className="w-full max-w-xs"
          />
        )
      case "StatCard":
        return (
          <StatCard
            title="Documents"
            value="1,234"
            trend={{ value: 12, label: "vs mois dernier" }}
            icon={<FileCheck className="h-5 w-5" />}
            variant="primary"
            className="w-full max-w-xs"
          />
        )
      case "ActivityFeed":
        return (
          <ActivityFeed
            items={[
              {
                id: "1",
                user: { name: "Jean P.", initials: "JP" },
                action: "a cree le projet",
                target: "Tour Eiffel",
                timestamp: "Il y a 2h",
                variant: "success",
              },
              {
                id: "2",
                user: { name: "Marie D.", initials: "MD" },
                action: "a modifie",
                target: "Plan RDC",
                timestamp: "Il y a 1h",
                variant: "info",
              },
            ]}
            maxItems={2}
            className="w-full max-w-xs"
          />
        )
      case "DatePicker":
        return (
          <DatePicker
            placeholder="Choisir une date"
            className="w-full max-w-xs"
          />
        )
      case "MultiSelect":
        return (
          <MultiSelect
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
            selected={["1"]}
            onChange={() => {}}
            placeholder="Selectionner..."
            className="w-full max-w-xs"
          />
        )
      case "CriticalAlert":
        return (
          <CriticalAlert
            variant="critical"
            title="Ecart Geometrique"
            description="Wall_Ref_004"
            value="2cm"
            valueLabel="de deviation"
            badge="CRITIQUE"
            secondaryInfo="Tolerance: +/- 1cm | Depassement: +1cm"
            className="w-full max-w-sm"
          />
        )
      default:
        return (
          <div className="text-center text-muted-foreground py-4">
            <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Apercu non disponible</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Design System</h1>
          <p className="text-muted-foreground">Catalogue des composants UI et IA de l&apos;application</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Export", { description: "Export du catalogue en cours..." })}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" onClick={() => toast.info("Documentation", { description: "Ouverture de la documentation Shadcn..." })}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Docs Shadcn
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Composants</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Layers className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shadcn/UI</p>
                <p className="text-2xl font-bold">{stats.shadcn}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Palette className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CopilotKit</p>
                <p className="text-2xl font-bold">{stats.copilotkit}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom</p>
                <p className="text-2xl font-bold">{stats.custom}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilisations</p>
                <p className="text-2xl font-bold">{stats.totalUsage}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-chart-2/20 flex items-center justify-center">
                <Code2 className="h-4 w-4 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un composant..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedSource} onValueChange={(v) => setSelectedSource(v as typeof selectedSource)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sources</SelectItem>
                <SelectItem value="shadcn">Shadcn/UI</SelectItem>
                <SelectItem value="copilotkit">CopilotKit</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-1.5"
              >
                <category.icon className="h-3.5 w-3.5" />
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Components Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component) => (
          <Card 
            key={`${component.source}-${component.name}`} 
            className="bg-card hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedComponent(component.name)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {component.name}
                    {getSourceBadge(component.source)}
                  </CardTitle>
                  <CardDescription className="mt-1">{component.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="font-mono text-xs">
                    {component.category}
                  </Badge>
                  <span>-</span>
                  <span>{component.usageCount} utilisations</span>
                </div>
                
                {component.variants.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {component.variants.slice(0, 4).map((variant) => (
                      <Badge key={variant} variant="secondary" className="text-xs">
                        {variant}
                      </Badge>
                    ))}
                    {component.variants.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{component.variants.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
                
                <Separator />
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <Eye className="mr-1 h-3 w-3" />
                        Apercu
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {component.name}
                          {getSourceBadge(component.source)}
                        </DialogTitle>
                        <DialogDescription>{component.description}</DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="preview" className="mt-4">
                        <TabsList>
                          <TabsTrigger value="preview">Apercu</TabsTrigger>
                          <TabsTrigger value="code">Code</TabsTrigger>
                          <TabsTrigger value="props">Props</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="preview" className="mt-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              <Switch 
                                checked={previewDarkMode} 
                                onCheckedChange={setPreviewDarkMode}
                              />
                              <Moon className="h-4 w-4" />
                            </div>
                          </div>
                          <div className={`p-6 rounded-lg border ${previewDarkMode ? "bg-zinc-900" : "bg-white"}`}>
                            {renderComponentPreview(component.name)}
                          </div>
                        </TabsContent>
                        
<TabsContent value="code" className="mt-4">
                          <div className="relative w-full overflow-hidden">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="absolute top-2 right-2 z-10 bg-zinc-800/80 hover:bg-zinc-700"
                              onClick={() => copyCode(component.name)}
                            >
                              {copiedCode === component.name ? (
                                <Check className="h-4 w-4 text-chart-2" />
                              ) : (
                                <Copy className="h-4 w-4 text-zinc-100" />
                              )}
                            </Button>
                            <div className="rounded-lg bg-zinc-900 overflow-hidden max-w-full">
                              <ScrollArea className="h-[300px]">
                                <pre className="p-4 text-zinc-100 text-sm">
                                  <code className="block whitespace-pre-wrap break-all">{codeExamples[component.name] || `// Import
import { ${component.name} } from "${component.importPath}"

// Usage
<${component.name} />
`}</code>
                                </pre>
                              </ScrollArea>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="props" className="mt-4">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Prop</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Default</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {component.variants.length > 0 && (
                                <TableRow>
                                  <TableCell className="font-mono text-sm">variant</TableCell>
                                  <TableCell className="font-mono text-sm text-muted-foreground">
                                    {component.variants.map(v => `"${v}"`).join(" | ")}
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">&quot;{component.variants[0]}&quot;</TableCell>
                                </TableRow>
                              )}
                              {component.sizes.length > 0 && (
                                <TableRow>
                                  <TableCell className="font-mono text-sm">size</TableCell>
                                  <TableCell className="font-mono text-sm text-muted-foreground">
                                    {component.sizes.map(s => `"${s}"`).join(" | ")}
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">&quot;{component.sizes[0]}&quot;</TableCell>
                                </TableRow>
                              )}
                              <TableRow>
                                <TableCell className="font-mono text-sm">className</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">string</TableCell>
                                <TableCell className="font-mono text-sm">-</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TabsContent>
                      </Tabs>
                      
                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => copyCode(component.name)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copier le code
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyCode(component.name)
                    }}
                  >
                    {copiedCode === component.name ? (
                      <>
                        <Check className="mr-1 h-3 w-3 text-chart-2" />
                        Copie
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <Card className="bg-card">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Aucun composant trouve</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos criteres de recherche ou de filtrage.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Reference Accordion */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reference Rapide
          </CardTitle>
          <CardDescription>Patterns d&apos;utilisation courants</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="forms">
              <AccordionTrigger>Formulaires</AccordionTrigger>
              <AccordionContent>
                <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
{`// Pattern formulaire standard
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div className="grid gap-2">
      <Label htmlFor="name">Nom</Label>
      <Input id="name" placeholder="Votre nom" />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
    <Button type="submit">Envoyer</Button>
  </div>
</form>`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dialogs">
              <AccordionTrigger>Dialogs & Modales</AccordionTrigger>
              <AccordionContent>
                <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
{`// Pattern dialog de confirmation
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmer l'action</DialogTitle>
      <DialogDescription>
        Cette action ne peut pas etre annulee.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Annuler
      </Button>
      <Button onClick={handleConfirm}>Confirmer</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tables">
              <AccordionTrigger>Tables de Donnees</AccordionTrigger>
              <AccordionContent>
                <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
{`// Pattern table avec actions
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nom</TableHead>
      <TableHead>Statut</TableHead>
      <TableHead className="w-[50px]"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <Badge>{item.status}</Badge>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Modifier</DropdownMenuItem>
              <DropdownMenuItem>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="toasts">
              <AccordionTrigger>Notifications Toast</AccordionTrigger>
              <AccordionContent>
                <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
{`import { toast } from "sonner"

// Succes
toast.success("Sauvegarde reussie", {
  description: "Les modifications ont ete enregistrees."
})

// Erreur
toast.error("Erreur", {
  description: "Une erreur s'est produite."
})

// Information
toast.info("Information", {
  description: "Nouvel evenement detecte."
})

// Warning
toast.warning("Attention", {
  description: "Action requise."
})`}
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
