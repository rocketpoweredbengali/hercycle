"use client"

import { aiHealthChat } from "@/ai/flows/ai-health-chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { MessageCircle, Send, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Icons } from "@/components/icons"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Maitri, your personal health assistant. How can I help you today?",
      sender: "ai",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const result = await aiHealthChat({ query: input })
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: result.response,
        sender: "ai",
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI chat error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm having a little trouble connecting right now. Please try again later.",
        sender: "ai",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold font-headline flex items-center gap-2">
          <MessageCircle className="text-primary" />
          Chat with Maitri AI
        </h1>
        <p className="text-sm text-muted-foreground">
          Your personal AI health companion.
        </p>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.sender === "user" && "justify-end"
              )}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Icons.logo className="h-5 w-5"/>
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-md rounded-lg p-3 text-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Icons.logo className="h-5 w-5"/>
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your symptoms, cycle, or general health..."
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}
