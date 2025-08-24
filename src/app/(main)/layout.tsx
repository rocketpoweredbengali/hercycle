"use client"

import {
  Bell,
  Calendar,
  Home,
  LineChart,
  LogOut,
  MessageCircle,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  SidebarGroupLabel
} from "@/components/ui/sidebar"

const navItems = {
  "Tracking": [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/insights", icon: LineChart, label: "Insights" },
  ],
  "Wellness": [
    { href: "/chat", icon: MessageCircle, label: "Maitri AI" },
  ],
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <Icons.logo className="h-10 w-10 text-primary" />
            <div className="text-center">
              <span className="text-xl font-bold font-headline tracking-tighter">
                HerCycle
              </span>
              <p className="text-xs text-muted-foreground">
                AI Women’s Health Companion
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {Object.entries(navItems).map(([group, items]) => (
              <SidebarGroup key={group}>
                <SidebarGroupLabel>{group}</SidebarGroupLabel>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                        tooltip={item.label}
                        className="transition-transform duration-200 hover:scale-105"
                      >
                        <>
                          <item.icon />
                          <span>{item.label}</span>
                        </>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-muted/50">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://placehold.co/100x100.png"
                    alt="@jane"
                    data-ai-hint="woman smiling"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="font-semibold text-sm">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">
                    jane.doe@example.com
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
