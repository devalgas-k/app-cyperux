"use client"

import { useState } from "react"
import { 
  Settings, 
  Bell, 
  Shield, 
  Ruler, 
  GitBranch, 
  Save,
  RotateCcw,
  Globe,
  Clock,
  Building2,
  Mail,
  MessageSquare,
  Smartphone,
  Lock,
  Key,
  Timer,
  Users,
  DollarSign,
  Leaf,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  Trash2,
  GripVertical,
  X,
  Sparkles,
  Send
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Switch } from "@/shared/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Slider } from "@/shared/components/ui/slider"
import { Textarea } from "@/shared/components/ui/textarea"
import { Progress } from "@/shared/components/ui/progress"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
// import { useLanguage } from "@/lib/i18n"
import { toast } from "sonner"

// General settings
const timezones = [
  { value: "Europe/Paris", label: "Paris (UTC+1)" },
  { value: "Europe/London", label: "Londres (UTC+0)" },
  { value: "Europe/Berlin", label: "Berlin (UTC+1)" },
  { value: "America/New_York", label: "New York (UTC-5)" },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)" },
]

const languages = [
  { value: "fr", label: "Francais" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Espanol" },
]

// Workflow steps
const defaultBPEWorkflow = [
  { id: 1, name: "Soumission", role: "Emetteur", duration: "0j" },
  { id: 2, name: "Revue Technique", role: "BET", duration: "3j" },
  { id: 3, name: "Validation MOE", role: "MOE", duration: "5j" },
  { id: 4, name: "Controle Bureau", role: "Bureau de Controle", duration: "7j" },
  { id: 5, name: "Approbation BPE", role: "MOA", duration: "2j" },
]

export default function SystemConfigPage() {
  // const { t } = useLanguage()
  const t = (key: string) => key;
  const [activeTab, setActiveTab] = useState("general")
  const [hasChanges, setHasChanges] = useState(false)
  const [showAIChat, setShowAIChat] = useState(true)
  const [aiMessage, setAIMessage] = useState("")
  
  // General settings state
  const [timezone, setTimezone] = useState("Europe/Paris")
  const [language, setLanguageValue] = useState("fr")
  const [companyName, setCompanyName] = useState("Eiffage Construction IDF")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  
  // Notification settings
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [whatsappNotifs, setWhatsappNotifs] = useState(false)
  const [digestFrequency, setDigestFrequency] = useState("daily")
  
  // Security settings
  const [securityMode, setSecurityMode] = useState("standard")
  const [require2FA, setRequire2FA] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState(480)
  const [passwordExpiry, setPasswordExpiry] = useState(90)
  const [ipWhitelist, setIpWhitelist] = useState(false)
  
  // Units settings
  const [measureSystem, setMeasureSystem] = useState("metric")
  const [currency, setCurrency] = useState("EUR")
  const [carbonUnit, setCarbonUnit] = useState("kgCO2e")
  
  // Workflow settings
  const [bpeWorkflow, setBpeWorkflow] = useState(defaultBPEWorkflow)
  const [budgetAlertThreshold, setBudgetAlertThreshold] = useState([10])
  const [carbonAlertThreshold, setCarbonAlertThreshold] = useState([15])
  
  const handleSave = () => {
    toast.success("Configuration sauvegardee avec succes")
    setHasChanges(false)
  }
  
  const handleReset = () => {
    toast.info("Configuration reinitalisee aux valeurs par defaut")
    setHasChanges(false)
  }
  
  const handleActivateEliteMode = () => {
    setSecurityMode("elite")
    setRequire2FA(true)
    setSessionTimeout(60)
    setPasswordExpiry(30)
    setActiveTab("security")
    setShowAIChat(false)
    toast.success("Mode Elite active pour le projet Tour Hekla")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configuration Globale</h1>
          <p className="text-muted-foreground">Parametres transverses du systeme Cyperux</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reinitialiser
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-[#593196] hover:bg-[#593196]/90">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Main Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Securite</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="gap-2">
            <Ruler className="h-4 w-4" />
            <span className="hidden sm:inline">Unites</span>
          </TabsTrigger>
          <TabsTrigger value="workflows" className="gap-2">
            <GitBranch className="h-4 w-4" />
            <span className="hidden sm:inline">Workflows</span>
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#593196]" />
                  Informations Entreprise
                </CardTitle>
                <CardDescription>Parametres generaux de votre organisation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de l&apos;entreprise</Label>
                  <Input 
                    value={companyName} 
                    onChange={(e) => { setCompanyName(e.target.value); setHasChanges(true) }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                      <span className="text-xl font-bold text-[#593196]">EF</span>
                    </div>
                    <Button variant="outline" size="sm">Modifier le logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Couleur de marque</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-[#593196]" />
                    <Input value="#593196" className="w-24 font-mono text-sm" readOnly />
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#593196]" />
                  Localisation
                </CardTitle>
                <CardDescription>Parametres regionaux et formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Langue par defaut</Label>
                  <Select value={language} onValueChange={(v) => { setLanguageValue(v); setHasChanges(true) }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuseau horaire</Label>
                  <Select value={timezone} onValueChange={(v) => { setTimezone(v); setHasChanges(true) }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Format de date</Label>
                  <Select value={dateFormat} onValueChange={(v) => { setDateFormat(v); setHasChanges(true) }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (06/05/2026)</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (05/06/2026)</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2026-05-06)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#593196]" />
                  Canaux de Notification
                </CardTitle>
                <CardDescription>Activez les canaux de communication souhaites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">Notifications par email</p>
                    </div>
                  </div>
                  <Switch checked={emailNotifs} onCheckedChange={(v) => { setEmailNotifs(v); setHasChanges(true) }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">SMS</p>
                      <p className="text-sm text-muted-foreground">Alertes critiques par SMS</p>
                    </div>
                  </div>
                  <Switch checked={smsNotifs} onCheckedChange={(v) => { setSmsNotifs(v); setHasChanges(true) }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push Mobile</p>
                      <p className="text-sm text-muted-foreground">Notifications application</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifs} onCheckedChange={(v) => { setPushNotifs(v); setHasChanges(true) }} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Messages WhatsApp Business</p>
                    </div>
                  </div>
                  <Switch checked={whatsappNotifs} onCheckedChange={(v) => { setWhatsappNotifs(v); setHasChanges(true) }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#593196]" />
                  Frequence des Resumes
                </CardTitle>
                <CardDescription>Quand recevoir les resumes d&apos;activite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { value: "realtime", label: "Temps reel", desc: "Notification immediate" },
                    { value: "daily", label: "Resume quotidien", desc: "Chaque jour a 18h" },
                    { value: "weekly", label: "Resume hebdomadaire", desc: "Chaque lundi matin" },
                  ].map((option) => (
                    <div 
                      key={option.value}
                      className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                        digestFrequency === option.value ? "border-[#593196] bg-[#593196]/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => { setDigestFrequency(option.value); setHasChanges(true) }}
                    >
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                      {digestFrequency === option.value && (
                        <CheckCircle className="h-5 w-5 text-[#593196]" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#593196]" />
                  Mode de Securite
                </CardTitle>
                <CardDescription>Choisissez le niveau de securite global</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    value: "standard", 
                    label: "Standard", 
                    desc: "2FA optionnel, sessions de 8h",
                    badge: "Actuel"
                  },
                  { 
                    value: "enhanced", 
                    label: "Renforce", 
                    desc: "2FA recommande, sessions de 4h",
                    badge: null
                  },
                  { 
                    value: "elite", 
                    label: "Elite", 
                    desc: "2FA obligatoire, sessions de 1h, IP whitelist",
                    badge: "Recommande"
                  },
                ].map((mode) => (
                  <div 
                    key={mode.value}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                      securityMode === mode.value ? "border-[#593196] bg-[#593196]/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => { setSecurityMode(mode.value); setHasChanges(true) }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        mode.value === "elite" ? "bg-amber-500/20 text-amber-500" :
                        mode.value === "enhanced" ? "bg-blue-500/20 text-blue-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{mode.label}</p>
                          {mode.badge && (
                            <Badge variant={mode.badge === "Actuel" ? "secondary" : "default"} className={mode.badge === "Recommande" ? "bg-amber-500" : ""}>
                              {mode.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{mode.desc}</p>
                      </div>
                    </div>
                    {securityMode === mode.value && (
                      <CheckCircle className="h-5 w-5 text-[#593196]" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#593196]" />
                  Parametres Avances
                </CardTitle>
                <CardDescription>Configuration detaillee de la securite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">2FA Obligatoire</p>
                      <p className="text-sm text-muted-foreground">Pour tous les utilisateurs</p>
                    </div>
                  </div>
                  <Switch checked={require2FA} onCheckedChange={(v) => { setRequire2FA(v); setHasChanges(true) }} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Expiration de session</Label>
                    <span className="text-sm font-medium">{sessionTimeout} min</span>
                  </div>
                  <Slider 
                    value={[sessionTimeout]} 
                    onValueChange={(v) => { setSessionTimeout(v[0]); setHasChanges(true) }}
                    min={30}
                    max={720}
                    step={30}
                  />
                  <p className="text-xs text-muted-foreground">Duree avant deconnexion automatique</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Expiration mot de passe</Label>
                    <span className="text-sm font-medium">{passwordExpiry} jours</span>
                  </div>
                  <Slider 
                    value={[passwordExpiry]} 
                    onValueChange={(v) => { setPasswordExpiry(v[0]); setHasChanges(true) }}
                    min={30}
                    max={365}
                    step={30}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">IP Whitelist</p>
                      <p className="text-sm text-muted-foreground">Restreindre les IPs autorisees</p>
                    </div>
                  </div>
                  <Switch checked={ipWhitelist} onCheckedChange={(v) => { setIpWhitelist(v); setHasChanges(true) }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-[#593196]" />
                  Systeme de Mesure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { value: "metric", label: "Metrique", examples: "m, m2, m3, kg, t" },
                  { value: "imperial", label: "Imperial", examples: "ft, ft2, ft3, lb, ton" },
                ].map((system) => (
                  <div 
                    key={system.value}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                      measureSystem === system.value ? "border-[#593196] bg-[#593196]/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => { setMeasureSystem(system.value); setHasChanges(true) }}
                  >
                    <div>
                      <p className="font-medium">{system.label}</p>
                      <p className="text-sm text-muted-foreground font-mono">{system.examples}</p>
                    </div>
                    {measureSystem === system.value && (
                      <CheckCircle className="h-5 w-5 text-[#593196]" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#593196]" />
                  Devise par Defaut
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { value: "EUR", label: "Euro", symbol: "€" },
                  { value: "USD", label: "Dollar US", symbol: "$" },
                  { value: "GBP", label: "Livre Sterling", symbol: "£" },
                  { value: "CHF", label: "Franc Suisse", symbol: "CHF" },
                ].map((curr) => (
                  <div 
                    key={curr.value}
                    className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                      currency === curr.value ? "border-[#593196] bg-[#593196]/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => { setCurrency(curr.value); setHasChanges(true) }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#593196]">{curr.symbol}</span>
                      <span className="font-medium">{curr.label}</span>
                    </div>
                    {currency === curr.value && (
                      <CheckCircle className="h-5 w-5 text-[#593196]" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-[#593196]" />
                  Unite Carbone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { value: "kgCO2e", label: "Kilogramme CO2 eq.", abbr: "kgCO2e" },
                  { value: "tCO2e", label: "Tonne CO2 eq.", abbr: "tCO2e" },
                  { value: "kgCO2e/m2", label: "Par metre carre", abbr: "kgCO2e/m2" },
                ].map((unit) => (
                  <div 
                    key={unit.value}
                    className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                      carbonUnit === unit.value ? "border-[#593196] bg-[#593196]/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => { setCarbonUnit(unit.value); setHasChanges(true) }}
                  >
                    <div>
                      <p className="font-medium">{unit.label}</p>
                      <p className="text-sm text-muted-foreground font-mono">{unit.abbr}</p>
                    </div>
                    {carbonUnit === unit.value && (
                      <CheckCircle className="h-5 w-5 text-[#593196]" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-[#593196]" />
                  Workflow Validation BPE
                </CardTitle>
                <CardDescription>Definissez les etapes de validation des documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {bpeWorkflow.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#593196] text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{step.name}</p>
                        <p className="text-xs text-muted-foreground">{step.role} - Delai: {step.duration}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" onClick={() => setHasChanges(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une etape
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#593196]" />
                  Seuils d&apos;Alerte
                </CardTitle>
                <CardDescription>Declenchez des alertes automatiques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label>Ecart Budgetaire</Label>
                        <span className="text-sm font-medium text-amber-500">{budgetAlertThreshold[0]}%</span>
                      </div>
                      <Slider 
                        value={budgetAlertThreshold} 
                        onValueChange={(v) => { setBudgetAlertThreshold(v); setHasChanges(true) }}
                        min={5}
                        max={30}
                        step={5}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Alerte si le cout reel depasse le budget de {budgetAlertThreshold[0]}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label>Ecart Carbone RE2020</Label>
                        <span className="text-sm font-medium text-emerald-500">{carbonAlertThreshold[0]}%</span>
                      </div>
                      <Slider 
                        value={carbonAlertThreshold} 
                        onValueChange={(v) => { setCarbonAlertThreshold(v); setHasChanges(true) }}
                        min={5}
                        max={30}
                        step={5}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Alerte si l&apos;empreinte carbone depasse l&apos;objectif de {carbonAlertThreshold[0]}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-500">Configuration Active</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Les alertes seront envoyees aux chefs de projet et directeurs financiers 
                        lorsque les seuils sont depasses.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* CopilotKit AI Chat */}
      {showAIChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <Card className="border-[#593196]/30 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-r from-[#593196]/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#593196]">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">Assistant Securite IA</CardTitle>
                    <CardDescription className="text-xs">Recommandation proactive</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#593196]/5 p-3 border border-[#593196]/20">
                <p className="text-sm">
                  Vos parametres de securite sont actuellement en mode <strong>Standard</strong>. 
                  Souhaitez-vous activer le mode <strong>Elite</strong> (2FA obligatoire, sessions courtes) 
                  pour le projet <span className="text-[#593196] font-medium">Tour Hekla</span> ?
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-[#593196] hover:bg-[#593196]/90"
                  onClick={handleActivateEliteMode}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Activer Mode Elite
                </Button>
                <Button variant="outline" onClick={() => setShowAIChat(false)}>
                  Plus tard
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Input 
                  placeholder="Poser une question..."
                  value={aiMessage}
                  onChange={(e) => setAIMessage(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" variant="ghost">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
