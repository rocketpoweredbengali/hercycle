"use client"

import * as React from "react"
import { addDays, startOfDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Mock data for cycle phases
  const today = startOfDay(new Date())
  const periodDays = Array.from({ length: 5 }, (_, i) => addDays(today, i - 2))
  const ovulationDay = addDays(today, 7)

  const modifiers = {
    period: periodDays,
    ovulation: ovulationDay,
  }

  const modifiersClassNames = {
    period: "day-period",
    ovulation: "day-ovulation",
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Cycle Calendar
        </h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' }) : <span>Pick a month</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="shadow-lg">
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
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-accent/30 mr-2"></div>
                <span>Period</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-primary/30 mr-2"></div>
                <span>Predicted Ovulation</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Log for Selected Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {date ? date.toLocaleDateString() : "No date selected"}
              </p>
              <Button className="w-full">Log Symptoms</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
