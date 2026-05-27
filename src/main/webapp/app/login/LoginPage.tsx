import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react"
import axios from 'axios'

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent } from "@/shared/components/ui/card"
import { CyperuxLogo } from "@/shared/components/cyperux-logo"
import { Toaster } from "@/shared/components/ui/sonner"
import { setLocalStorage } from '@/common/services/storage'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [isOidcLoading, setIsOidcLoading] = useState(false)
  const [error, setError] = useState("")

  // Simulation d'une détection de token ou de session active
  useEffect(() => {
    const checkSession = async () => {
      // 1. Vérification du token local (connexion par formulaire)
      const token = localStorage.getItem('token')
      if (token) {
        navigate('/templates/dashboard')
        return
      }

      // 2. Vérification de la session active (connexion par Keycloak SSO)
      try {
        const response = await axios.get('/api/authenticated-user-account')
        if (response.status === 200) {
          // L'utilisateur est connecté via une session cookie
          navigate('/templates/dashboard')
        }
      } catch (err) {
        // Pas de session active (401), l'utilisateur reste sur la page de connexion
      }
    }

    checkSession()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsFormLoading(true)

    try {
      const response = await axios.post('/api/authenticate', {
        username,
        password,
        rememberMe: true,
      })
      
      const token = response.data.id_token;
      if (token) {
        setLocalStorage('token', token);
        setLocalStorage('username', username);
        
        toast.success("Connexion réussie", {
          description: "Bienvenue sur Cyperux !"
        })
        navigate("/templates")
      } else {
        throw new Error("Pas de token retourné");
      }
    } catch (err: any) {
      console.error("Login error details:", err.response?.data || err.message);
      setError("Nom d'utilisateur ou mot de passe incorrect")
      toast.error("Échec de connexion", {
        description: `Erreur: ${err.response?.status === 404 ? "L'API n'est pas trouvée (404)" : "Nom d'utilisateur ou mot de passe incorrect."}`
      })
    } finally {
      setIsFormLoading(false)
    }
  }

  const handleOidcLogin = () => {
    setIsOidcLoading(true)
    // Redirection vers l'endpoint Spring Security OAuth2/OIDC
    window.location.href = '/oauth2/authorization/oidc'
  }

  const fillDemoCredentials = () => {
    setUsername("admin")
    setPassword("admin")
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <CyperuxLogo width={180} height={54} />
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-900">Connexion</h2>
                <p className="text-sm text-gray-500 mt-1">Accédez à votre espace de pilotage</p>
              </div>

              <div className="space-y-6">
                {/* OIDC Login Button */}
                <Button
                  type="button"
                  onClick={handleOidcLogin}
                  variant="outline"
                  className="w-full h-11 bg-white border-gray-200 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                  disabled={isOidcLoading || isFormLoading}
                >
                  {isOidcLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-[#593196]" />
                  )}
                  {isOidcLoading ? "Redirection..." : "Se connecter avec Keycloak (SSO)"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Ou avec vos identifiants</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Username Field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                      Nom d'utilisateur
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Votre identifiant"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-11 bg-gray-50 border-gray-200 focus:border-[#593196] focus:ring-[#593196]"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Mot de passe
                      </Label>
                      <button
                        type="button"
                        className="text-xs text-[#593196] hover:text-[#593196]/80 font-medium"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 bg-gray-50 border-gray-200 pr-10 focus:border-[#593196] focus:ring-[#593196]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#593196] hover:bg-[#593196]/90 text-white font-medium"
                    disabled={isFormLoading || isOidcLoading}
                  >
                    {isFormLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connexion en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Se connecter
                      </span>
                    )}
                  </Button>
                </form>
              </div>

              {/* Demo Access Helper */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full text-center group"
                >
                  <p className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                    Accès démo : <span className="font-medium text-gray-500">admin</span> / <span className="font-medium text-gray-500">admin</span>
                  </p>
                  <p className="text-[10px] text-[#593196] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Cliquez pour remplir automatiquement
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <CyperuxLogo width={100} height={30} className="mx-auto opacity-50" />
            <p className="mt-2 text-xs text-gray-400">
              &copy; 2026 - Plateforme de pilotage BTP intelligente
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Hero Image (Desktop only) */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#593196]/90 via-[#593196]/70 to-[#0891b2]/80 z-10" />
        
        {/* Background Image */}
        <img
          src="/images/construction-hero.jpg"
          alt="Chantier moderne avec jumeau numérique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Pilotez vos chantiers avec intelligence
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Cyperux unifie la gestion de vos projets BTP : planning, ressources, documents et logistique dans une plateforme unique propulsée par l'IA.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2">
              {["Planning IA", "Jumeau Numérique", "Suivi Temps Réel", "Gestion ZFE"].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3 chantiers actifs</span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}