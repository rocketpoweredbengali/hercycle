"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { summarizeCycleData } from "@/ai/flows/summarize-cycle-data"
import { Wand2 } from "lucide-react"

const cycleLengthData = [
  { name: "Jan", days: 28 },
  { name: "Feb", days: 29 },
  { name: "Mar", days: 27 },
  { name: "Apr", days: 28 },
  { name: "May", days: 30 },
  { name: "Jun", days: 28 },
]

const symptomFrequencyData = [
  { name: "Cramps", count: 12 },
  { name: "Headache", count: 8 },
  { name: "Fatigue", count: 15 },
  { name: "Bloating", count: 10 },
  { name: "Mood Swings", count: 7 },
]

export default function InsightsPage() {
  const [summary, setSummary] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGenerateSummary = async () => {
    setIsLoading(true)
    setSummary("")
    try {
      const cycleData = {
        cycleLength: cycleLengthData,
        symptoms: symptomFrequencyData,
      }
      const result = await summarizeCycleData({
        cycleData: JSON.stringify(cycleData),
      })
      setSummary(result.summary)
    } catch (error) {
      console.error("Failed to generate summary:", error)
      setSummary("Sorry, I couldn't generate a summary right now.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Your Health Insights
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>AI-Powered Summary</CardTitle>
                <CardDescription>
                  Maitri's analysis of your recent cycle data.
                </CardDescription>
              </div>
              <Button onClick={handleGenerateSummary} disabled={isLoading}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isLoading ? "Analyzing..." : "Generate Summary"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
              </div>
            )}
            {summary && (
              <div className="prose prose-sm max-w-none text-foreground">
                <p>{summary}</p>
              </div>
            )}
            {!summary && !isLoading && (
              <p className="text-sm text-muted-foreground">
                Click "Generate Summary" to get personalized insights from your
                data.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cycle Length Variation</CardTitle>
            <CardDescription>
              Your cycle length over the past 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cycleLengthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Symptom Frequency</CardTitle>
            <CardDescription>
              Most common symptoms logged this cycle.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={symptomFrequencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="count" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
