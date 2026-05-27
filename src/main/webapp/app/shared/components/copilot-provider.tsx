"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface CopilotContextType {
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const CopilotContext = createContext<CopilotContextType | null>(null)

export function useCopilot() {
  const context = useContext(CopilotContext)
  if (!context) {
    throw new Error("useCopilot must be used within a CopilotProvider")
  }
  return context
}

interface CopilotProviderProps {
  children: ReactNode
}

export function CopilotProvider({ children }: CopilotProviderProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant IA Cyperux. Comment puis-je vous aider avec votre projet BTP ?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/copilotkit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const assistantContent = data.choices?.[0]?.message?.content || "Je n'ai pas pu traiter votre demande."

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Bonjour ! Je suis l'assistant IA Cyperux. Comment puis-je vous aider avec votre projet BTP ?",
        timestamp: new Date(),
      },
    ])
  }, [])

  return (
    <CopilotContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
      {children}
    </CopilotContext.Provider>
  )
}
