
"use client"

import { aiHealthChat } from "@/ai/flows/ai-health-chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { MessageCircle, Send, User, Edit, RefreshCw, Plus, Settings } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Icons } from "@/components/icons"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: "Introduction",
      messages: [
        {
          id: '1-1',
          text: "Hello! I'm Maitri, your personal health assistant. How can I help you today?",
          sender: "ai",
        },
      ],
    },
  ])
  const [activeConversationId, setActiveConversationId] = useState<string>('1')
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [activeConversation?.messages])

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
    }
    
    let updatedConversations = [...conversations]
    let convoId = activeConversationId
    
    // If it's a new conversation, create it
    if (activeConversation?.messages.length === 1 && activeConversation.messages[0].sender === 'ai') {
       const newTitle = messageText.substring(0, 25) + (messageText.length > 25 ? '...' : '');
       updatedConversations = updatedConversations.map(c => 
          c.id === convoId ? { ...c, title: newTitle, messages: [...c.messages, userMessage] } : c
       )
    } else {
       const convoIndex = updatedConversations.findIndex(c => c.id === convoId)
       if (convoIndex !== -1) {
            updatedConversations[convoIndex].messages.push(userMessage)
       }
    }
    
    setConversations(updatedConversations)
    setInput("")
    setIsLoading(true)

    try {
      const result = await aiHealthChat({ query: messageText })
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "ai",
      }
       setConversations(prev => prev.map(c => 
          c.id === convoId ? { ...c, messages: [...c.messages, aiMessage] } : c
       ))
    } catch (error) {
      console.error("AI chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a little trouble connecting right now. Please try again later.",
        sender: "ai",
      }
      setConversations(prev => prev.map(c => 
          c.id === convoId ? { ...c, messages: [...c.messages, errorMessage] } : c
       ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const handleNewChat = () => {
    const newId = (Date.now()).toString()
    const newConversation: Conversation = {
      id: newId,
      title: "New Chat",
      messages: [
        {
          id: `${newId}-1`,
          text: "Hello! I'm Maitri, your personal health assistant. How can I help you today?",
          sender: "ai",
        },
      ],
    }
    setConversations([newConversation, ...conversations])
    setActiveConversationId(newId)
  }
  
  const handleEdit = (message: Message) => {
    setEditingMessageId(message.id);
    setEditText(message.text);
  };
  
  const handleSaveEdit = () => {
    if (!editingMessageId) return;

    const convoIndex = conversations.findIndex(c => c.id === activeConversationId);
    if (convoIndex === -1) return;

    // Remove user message and subsequent AI response
    const currentConvo = conversations[convoIndex];
    const messageIndex = currentConvo.messages.findIndex(m => m.id === editingMessageId);
    const messagesToKeep = currentConvo.messages.slice(0, messageIndex);

    setConversations(prev => prev.map(c => 
        c.id === activeConversationId ? { ...c, messages: messagesToKeep } : c
    ));

    handleSendMessage(editText);
    setEditingMessageId(null);
    setEditText("");
  };

  const handleRegenerate = async () => {
     const lastAiMessageIndex = activeConversation?.messages.findLastIndex(m => m.sender === 'ai');
     if (!activeConversation || lastAiMessageIndex === -1) return;
     
     const historyUpToLastUserMessage = activeConversation.messages.slice(0, lastAiMessageIndex);
     const lastUserMessage = historyUpToLastUserMessage.findLast(m => m.sender === 'user');

     if (!lastUserMessage) return;

     setConversations(prev => prev.map(c => 
        c.id === activeConversationId ? { ...c, messages: historyUpToLastUserMessage } : c
     ));

     setIsLoading(true);

     try {
       const result = await aiHealthChat({ query: lastUserMessage.text });
       const aiMessage: Message = {
         id: (Date.now() + 1).toString(),
         text: result.response,
         sender: "ai",
       };
       setConversations(prev => prev.map(c => 
          c.id === activeConversationId ? { ...c, messages: [...historyUpToLastUserMessage, aiMessage] } : c
       ));
     } catch (error) {
       console.error("AI chat error:", error);
       const errorMessage: Message = {
         id: (Date.now() + 1).toString(),
         text: "I'm having a little trouble connecting right now. Please try again later.",
         sender: "ai",
       };
       setConversations(prev => prev.map(c => 
          c.id === activeConversationId ? { ...c, messages: [...historyUpToLastUserMessage, errorMessage] } : c
       ));
     } finally {
       setIsLoading(false);
     }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r bg-muted/30 flex flex-col">
        <div className="p-2">
            <Button onClick={handleNewChat} className="w-full justify-start gap-2">
                <Plus className="h-5 w-5"/> New Chat
            </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
                {conversations.map(convo => (
                    <Button
                        key={convo.id}
                        variant={activeConversationId === convo.id ? "secondary" : "ghost"}
                        className="w-full justify-start truncate"
                        onClick={() => setActiveConversationId(convo.id)}
                    >
                        {convo.title}
                    </Button>
                ))}
            </div>
        </ScrollArea>
        <div className="p-2 border-t">
             <div className="p-2 rounded-lg hover:bg-muted flex items-center gap-3 cursor-pointer">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                   <AvatarFallback>J</AvatarFallback>
                 </Avatar>
                 <div className="flex-1">
                   <p className="font-semibold text-sm">Jane Doe</p>
                 </div>
                 <Button variant="ghost" size="icon">
                   <Settings className="h-5 w-5"/>
                 </Button>
               </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        <header className="p-4 border-b flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold font-headline flex items-center gap-2">
                <MessageCircle className="text-primary" />
                Chat with Maitri AI
                </h1>
                <p className="text-sm text-muted-foreground">
                Your personal AI health companion.
                </p>
            </div>
            {activeConversation && activeConversation.messages.some(m => m.sender === 'ai') && (
                 <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isLoading}>
                    <RefreshCw className="mr-2 h-4 w-4"/>
                    Regenerate
                </Button>
            )}
        </header>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {activeConversation?.messages.map((message, index) => (
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
                
                <div className="flex flex-col gap-1 w-full max-w-md">
                    <div
                        className={cn(
                        "rounded-lg p-3 text-sm",
                        message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                    >
                         {editingMessageId === message.id ? (
                            <div className="space-y-2">
                                <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="text-sm bg-background/80" />
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setEditingMessageId(null)}>Cancel</Button>
                                    <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                                </div>
                            </div>
                         ) : (
                             message.sender === 'ai' ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.text}
                                    </ReactMarkdown>
                                </div>
                                ) : (
                                message.text
                                )
                         )}
                    </div>
                     {message.sender === 'user' && !editingMessageId && index === activeConversation.messages.length - (isLoading ? 2 : 1) && (
                         <Button variant="ghost" size="sm" className="h-auto p-1 self-end" onClick={() => handleEdit(message)}>
                            <Edit className="h-3.5 w-3.5"/>
                         </Button>
                     )}
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
                   <p className="text-muted-foreground italic text-sm">Maitri is typing</p>
                   <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                   <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                   <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <footer className="p-4 border-t">
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your symptoms, cycle, or general health..."
              disabled={isLoading || editingMessageId !== null}
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading || !input.trim() || editingMessageId !== null}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>
    </div>
  )
}
