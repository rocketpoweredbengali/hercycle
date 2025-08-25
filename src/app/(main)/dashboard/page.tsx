"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Activity,
  CalendarCheck2,
  Smile,
  Thermometer,
  Zap,
  Leaf,
  Heart,
  Brain,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const kpis = [
  {
    title: "Current Cycle Day",
    value: "14",
    subtitle: "Ovulation Phase",
    icon: CalendarCheck2,
  },
  {
    title: "Predicted Next Period",
    value: "In 15 days",
    subtitle: "June 28th",
    icon: Activity,
  },
  {
    title: "Today's Mood",
    value: "Energetic",
    subtitle: "Logged",
    icon: Smile,
  },
  {
    title: "Recent Temperature",
    value: "98.6°F",
    subtitle: "Normal",
    icon: Thermometer,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Good morning, Jane!
        </h1>
        <p className="text-muted-foreground">
          Here's a look at your cycle today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Cycle Phases</CardTitle>
            <CardDescription>
              A visual guide to your current and upcoming phases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-xs text-center">
                <div className="w-1/4">
                    <div className="h-2 bg-accent rounded-l-full"></div>
                    <p className="mt-1 font-semibold">Menstruation</p>
                    <p className="text-muted-foreground">Day 1-5</p>
                </div>
                <div className="w-1/4">
                    <div className="h-2 bg-primary/30"></div>
                     <p className="mt-1 font-semibold">Follicular</p>
                     <p className="text-muted-foreground">Day 1-13</p>
                </div>
                 <div className="w-1/4 relative">
                    <div className="h-2 bg-primary"></div>
                    <p className="mt-1 font-semibold">Ovulation</p>
                    <p className="text-muted-foreground">Day 14</p>
                </div>
                <div className="w-1/4">
                    <div className="h-2 bg-primary/60 rounded-r-full"></div>
                    <p className="mt-1 font-semibold">Luteal</p>
                    <p className="text-muted-foreground">Day 15-28</p>
                </div>
            </div>
             <div className="relative mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="w-1/4 bg-accent"></div>
                    <div className="w-1/4 bg-primary/30"></div>
                    <div className="w-1/4 bg-primary"></div>
                    <div className="w-1/4 bg-primary/60"></div>
                </div>
                {/* Indicator for current day */}
                <div className="absolute top-[-4px] h-4 w-1 bg-foreground rounded-full" style={{ left: '50%' }}></div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Daily Log</CardTitle>
            <CardDescription>
              Log your symptoms, mood, and notes for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-center text-muted-foreground py-8">
                Log your symptoms to see more personalized insights.
             </p>
          </CardContent>
        </Card>
        
        {/* Quick View Cards */}
        <Link href="/nutrition" className="group">
          <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Nutrition</span>
                <Leaf className="text-primary"/>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Today's Focus: Antioxidant-rich foods</p>
            </CardContent>
            <CardContent>
              <div className="text-sm text-primary group-hover:underline flex items-center">
                View Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/wellness" className="group">
          <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Wellness</span>
                 <Heart className="text-primary"/>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Today's Workout: Dance cardio</p>
            </CardContent>
             <CardContent>
              <div className="text-sm text-primary group-hover:underline flex items-center">
                View Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
