"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/icons"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const nextStep = () => setStep((s) => s + 1)
  const finishOnboarding = () => {
    // Here you would typically save the user data
    router.push("/dashboard")
  }

  const progress = (step / 3) * 100

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-headline">
                Let's get you set up
              </CardTitle>
              <CardDescription>
                A few questions to personalize your experience.
              </CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <Icons.logo className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold font-headline tracking-tighter">HerCycle</span>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          {step === 1 && <Step1 nextStep={nextStep} />}
          {step === 2 && <Step2 nextStep={nextStep} />}
          {step === 3 && <Step3 finish={finishOnboarding} />}
        </CardContent>
      </Card>
    </div>
  )
}

function Step1({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Welcome to HerCycle!</h3>
      <p className="text-muted-foreground">
        We're excited to have you on board. HerCycle is your personal companion
        to help you understand your body better. Let's start with the basics.
      </p>
      <Button onClick={nextStep} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Let's Go!
      </Button>
    </div>
  )
}

function Step2({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Your Cycle Details</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="last-period">
            When did your last period start?
          </Label>
          <Input id="last-period" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cycle-length">
            What's your average cycle length? (in days)
          </Label>
          <Input
            id="cycle-length"
            type="number"
            placeholder="e.g., 28"
          />
        </div>
         <div className="space-y-2">
          <Label htmlFor="period-length">
            How long does your period usually last? (in days)
          </Label>
          <Input
            id="period-length"
            type="number"
            placeholder="e.g., 5"
          />
        </div>
      </div>
      <Button onClick={nextStep} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Next
      </Button>
    </div>
  )
}

function Step3({ finish }: { finish: () => void }) {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <PartyPopper
          className="h-16 w-16 text-primary"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="text-2xl font-semibold font-headline">You're All Set!</h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        Your personalized dashboard is ready. Let's start exploring your
        cycle insights.
      </p>
      <Button onClick={finish} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Go to Dashboard
      </Button>
    </div>
  )
}
