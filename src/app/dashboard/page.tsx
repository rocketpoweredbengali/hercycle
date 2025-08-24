'use client'

import {
  Activity,
  Droplets,
  HeartPulse,
  LayoutDashboard,
  MessageCircle,
  Moon,
  Pill,
  Smile,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const symptomData = [
  { name: 'Mood', value: 8 },
  { name: 'Energy', value: 6 },
  { name: 'Pain', value: 3 },
  { name: 'Flow', value: 5 },
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Hello, Jane!
          </h1>
          <p className="text-muted-foreground">
            Here's a look at your cycle today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Phase
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Follicular Phase</div>
            <p className="text-xs text-muted-foreground">Day 7 of 28</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Ovulation
            </CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">in 7 days</div>
            <p className="text-xs text-muted-foreground">Around June 15th</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predicted Period</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">in 21 days</div>
            <p className="text-xs text-muted-foreground">Around June 29th</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logged Symptoms</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5 Today</div>
            <p className="text-xs text-muted-foreground">
              Feeling good overall
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Symptom Overview</CardTitle>
            <CardDescription>
              A quick look at your logged symptoms over the last cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={symptomData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="col-span-4 lg:col-span-3 grid grid-cols-1 grid-rows-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Day</CardTitle>
              <CardDescription>
                Quickly add symptoms, mood, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Smile className="mr-2 h-4 w-4" /> Mood
              </Button>
              <Button variant="outline" size="sm">
                <HeartPulse className="mr-2 h-4 w-4" /> Symptoms
              </Button>
              <Button variant="outline" size="sm">
                <Droplets className="mr-2 h-4 w-4" /> Flow
              </Button>
              <Button variant="outline" size="sm">
                <Thermometer className="mr-2 h-4 w-4" /> Temp
              </Button>
              <Button variant="outline" size="sm">
                <Pill className="mr-2 h-4 w-4" /> Medication
              </Button>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
             <Image
                src="https://images.unsplash.com/photo-1541533267715-9a493508933b?q=80&w=2070"
                alt="AI Chat background"
                fill
                className="object-cover"
                data-ai-hint="wellness woman"
              />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-black/20" />
            <CardHeader className="relative text-white">
              <CardTitle className="text-2xl font-headline">Ask Maitri AI</CardTitle>
              <CardDescription className="text-gray-200">
                Have questions about your cycle or health? Get instant,
                personalized answers.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button asChild className="bg-white/90 text-black hover:bg-white">
                <Link href="/chat">
                  Start a Conversation{' '}
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
