"use client"

import * as React from "react"
import { addDays, startOfDay, isToday } from "date-fns"
import { Calendar as CalendarIcon, Droplet, Sun, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Mock data for cycle phases
  const today = startOfDay(new Date())
  const periodDays = Array.from({ length: 5 }, (_, i) => addDays(today, i - 2))
  const ovulationDay = addDays(today, 7)

  const modifiers = {
    period: periodDays,
    ovulation: ovulationDay,
    today: (date: Date) => isToday(date),
  }

  const modifiersClassNames = {
    period: "day-period",
    ovulation: "day-ovulation",
    today: "day-today",
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight font-headline relative inline-block">
          Cycle Calendar
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-primary/50 to-emerald-300/50 rounded-full"></span>
        </h1>
        <p className="text-muted-foreground mt-2">A gentle look at your cycle ahead 🌸</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-purple-200/50 to-emerald-200/50">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal shadow-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? new Date(date).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })
                    : <span>Pick a month</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Card className="shadow-lg w-full">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-4 w-full"
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
                  <Droplet className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold">Period</span>
                  <p className="text-xs text-muted-foreground">Days with flow</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Sun className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold">Ovulation</span>
                  <p className="text-xs text-muted-foreground">Predicted fertile window</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold">Today</span>
                  <p className="text-xs text-muted-foreground">Current date</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Log for Selected Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No date selected"}
              </p>
              <Button className="w-full bg-gradient-to-r from-accent to-orange-400 text-white font-bold transition-transform duration-200 hover:scale-105 hover:shadow-lg">
                Log Symptoms
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
