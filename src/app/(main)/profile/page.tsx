"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Droplet, Edit, HeartPulse, Brain, Pill, SmileIcon, CalendarDays, Target } from "lucide-react"

// Mock data for logged symptoms
const loggedData = [
  {
    date: "2024-06-15",
    symptoms: ["Cramps", "Headache"],
    mood: "Annoyed",
    notes: "Felt really tired today, cramps were moderate.",
  },
  {
    date: "2024-06-14",
    symptoms: ["Cramps"],
    mood: "Sad",
    notes: "Started my period today.",
  },
  {
    date: "2024-06-01",
    symptoms: [],
    mood: "Happy",
    notes: "Felt energetic and positive.",
  },
]

const symptomIcons: { [key: string]: React.ElementType } = {
  "Cramps": HeartPulse,
  "Headache": Brain,
  "Bloating": Droplet,
  "Acne": Pill,
}

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://placehold.co/100x100.png" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold font-headline">Jane Doe</h1>
          <p className="text-muted-foreground">jane.doe@example.com</p>
          <Badge className="mt-2">Premium User</Badge>
        </div>
        <Button variant="outline" className="md:ml-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>My Health Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Droplet className="h-5 w-5 text-primary" />
              <span className="text-sm">Period Tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm">Symptom Monitoring</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Symptom Log History</CardTitle>
            <CardDescription>
              A record of your logged symptoms and moods.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loggedData.map((log) => {
                const date = new Date(log.date);
                date.setUTCHours(0, 0, 0, 0);
                return (
                  <div key={log.date} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2 w-full sm:w-1/4">
                       <CalendarDays className="h-5 w-5 text-muted-foreground"/>
                       <span className="font-semibold text-sm whitespace-nowrap">
                        {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}
                       </span>
                    </div>
                    <div className="flex-1">
                      {log.symptoms.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Symptoms</h4>
                          <div className="flex flex-wrap gap-2">
                            {log.symptoms.map((symptom) => {
                              const Icon = symptomIcons[symptom] || Target;
                              return (
                                <Badge key={symptom} variant="secondary" className="flex items-center gap-1.5">
                                  <Icon className="h-3.5 w-3.5"/>
                                  {symptom}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      )}
                      {log.mood && (
                         <div className="mb-2">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Mood</h4>
                            <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                               <SmileIcon className="h-3.5 w-3.5"/>
                               {log.mood}
                            </Badge>
                         </div>
                      )}
                       {log.notes && (
                         <div>
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Notes</h4>
                            <p className="text-sm text-foreground/80">{log.notes}</p>
                         </div>
                      )}
                    </div>
                  </div>
                )}
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
