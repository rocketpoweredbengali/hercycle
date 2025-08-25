"use client"

import {
  Bell,
  Calendar,
  Home,
  LineChart,
  MessageCircle,
  Leaf,
  Heart,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = {
  "Tracking": [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/insights", icon: LineChart, label: "Insights" },
  ],
  "Wellness": [
    { href: "/nutrition", icon: Leaf, label: "Nutrition" },
    { href: "/wellness", icon: Heart, label: "Wellness" },
    { href: "/chat", icon: MessageCircle, label: "Maitri AI" },
  ],
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <Icons.logo className="h-10 w-10 text-primary" />
            <div className="text-center group-data-[collapsible=icon]:hidden">
              <span className="text-xl font-bold font-headline tracking-tighter">
                HerCycle
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {Object.entries(navItems).map(([group, items]) => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel className="group-data-[collapsible=icon]:-mt-4">{group}</SidebarGroupLabel>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={item.label}
                        className="transition-transform duration-200 hover:scale-105"
                      >
                        <span>
                          <item.icon />
                          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
                <SidebarSeparator className="my-2 group-data-[collapsible=icon]:hidden"/>
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="p-2 w-full group-data-[collapsible=icon]:p-0">
               <div className="p-2 rounded-lg bg-background/50 flex items-center gap-3">
                 <Avatar className="h-10 w-10">
                   <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                   <AvatarFallback>J</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 group-data-[collapsible=icon]:hidden">
                   <p className="font-semibold text-sm">Jane Doe</p>
                   <p className="text-xs text-muted-foreground">Premium User</p>
                 </div>
                 <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden">
                   <Settings className="h-5 w-5"/>
                 </Button>
               </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex-1">{/* Maybe a search bar or breadcrumbs here */}</div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
