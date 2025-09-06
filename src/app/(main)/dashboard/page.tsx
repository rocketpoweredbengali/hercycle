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
  PlusCircle,
  Pill,
  Droplet,
  Annoyed,
  Frown,
  Meh,
  SmileIcon,
  HeartPulse,
  Moon,
  Flower2,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { Progress } from "@/components/ui/progress"

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

const symptoms = [
    { id: 'cramps', label: 'Cramps', icon: HeartPulse },
    { id: 'bloating', label: 'Bloating', icon: Droplet },
    { id: 'headache', label: 'Headache', icon: Brain },
    { id: 'acne', label: 'Acne', icon: Pill },
];

const moods = [
    { id: 'happy', label: 'Happy', icon: SmileIcon },
    { id: 'neutral', label: 'Neutral', icon: Meh },
    { id: 'sad', label: 'Sad', icon: Frown },
    { id: 'annoyed', label: 'Annoyed', icon: Annoyed },
];

const cycleDay = 14;
const cycleLength = 28;

const phases = [
    { name: 'Menstruation', start: 1, end: 5, icon: Droplet, color: "bg-accent", tip: "Focus on rest and iron-rich foods." },
    { name: 'Follicular', start: 1, end: 13, icon: Leaf, color: "bg-primary/30", tip: "Your body is prepping for ovulation. Light cardio and strength training are great now." },
    { name: 'Ovulation', start: 14, end: 14, icon: Flower2, color: "bg-primary", tip: "Energy is at its peak! It's the best time for high-impact workouts." },
    { name: 'Luteal', start: 15, end: 28, icon: Moon, color: "bg-primary/60", tip: "Listen to your body; you might prefer gentle exercises like yoga or walking." },
];

const getCurrentPhase = (day: number) => {
    // Ovulation is a single day, handle it first as a priority
    const ovulationPhase = phases.find(p => p.name === 'Ovulation');
    if (day === ovulationPhase?.start) return ovulationPhase;

    // Menstruation is a sub-phase of Follicular, but we show its specific tip
    const menstruationPhase = phases.find(p => p.name === 'Menstruation');
    if (day >= menstruationPhase?.start! && day <= menstruationPhase?.end!) return menstruationPhase;

    // Find the current phase based on the day
    const phase = phases.find(p => day >= p.start && day <= p.end);
    
    // Fallback to the first phase (Follicular, as Menstruation is handled) if no other phase matches
    return phase || phases[1];
};

export default function DashboardPage() {
  const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>([]);
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  
  const currentPhase = getCurrentPhase(cycleDay)!; // Non-null assertion as getCurrentPhase now always returns a phase
  const cycleProgress = (cycleDay / cycleLength) * 100;
  const nextMilestone = () => {
    if (cycleDay < 14) return `Ovulation in ${14 - cycleDay} days`;
    if (cycleDay === 14) return "Luteal phase starts tomorrow";
    if (cycleDay < 28) return `Next period in ${28 - cycleDay} days`;
    return "New cycle starts tomorrow";
  }

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
             <CardTitle>Your Cycle View</CardTitle>
             <CardDescription>
               You are on <span className="font-bold text-primary">Day {cycleDay}</span> of your cycle.
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="relative pt-2">
                <Progress value={cycleProgress} className="h-2"/>
                <div className="absolute top-0 h-4 w-1 bg-foreground rounded-full" style={{ left: `calc(${cycleProgress}% - 2px)` }}></div>
             </div>
             <div className="flex justify-between text-xs text-muted-foreground">
               {phases.map(phase => (
                    <div key={phase.name} className={`flex flex-col items-center text-center ${cycleDay >= phase.start && cycleDay <= phase.end ? 'font-bold text-primary' : ''}`}>
                       <phase.icon className="h-5 w-5 mb-1"/>
                       <span>{phase.name}</span>
                    </div>
               ))}
             </div>
             <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm font-medium">{currentPhase.tip}</p>
             </div>
             <p className="text-sm text-center text-muted-foreground font-medium">
                Next Milestone: <span className="text-foreground">{nextMilestone()}</span>
             </p>
           </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Daily Log</CardTitle>
            <CardDescription>
              Log your symptoms, mood, and notes for today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <h4 className="font-medium mb-2 text-sm">Symptoms</h4>
                <ToggleGroup type="multiple" value={selectedSymptoms} onValueChange={setSelectedSymptoms} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {symptoms.map(symptom => (
                        <ToggleGroupItem key={symptom.id} value={symptom.id} className="h-16 flex-col text-xs gap-1">
                            <symptom.icon className="h-5 w-5"/>
                            <span>{symptom.label}</span>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
             <div>
                <h4 className="font-medium mb-2 text-sm">Mood</h4>
                <ToggleGroup type="single" value={selectedMood || ''} onValueChange={(value) => setSelectedMood(value)} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                     {moods.map(mood => (
                        <ToggleGroupItem key={mood.id} value={mood.id} className="h-16 flex-col text-xs gap-1">
                            <mood.icon className="h-5 w-5"/>
                            <span>{mood.label}</span>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
            <div>
                <h4 className="font-medium mb-2 text-sm">Notes</h4>
                <Textarea placeholder="Any additional notes..."/>
            </div>
            <Button className="w-full font-bold">
                <PlusCircle className="mr-2 h-5 w-5"/> Log Today's Data
            </Button>
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
