"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Zap, Brain, Bed, Star } from "lucide-react"
import Image from "next/image"

export default function WellnessPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
          <Heart className="text-primary"/> Wellness Hub
        </h1>
        <p className="text-muted-foreground">
          Mind and body tips for your most energetic phase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Today's Activity: Dance Cardio</CardTitle>
              <CardDescription>Match your high energy levels with a fun, high-impact workout.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                 <Image 
                    src="https://placehold.co/600x338.png" 
                    alt="Woman dancing" 
                    data-ai-hint="woman dancing"
                    width={600}
                    height={338}
                    className="rounded-lg shadow-md"
                  />
              </div>
              <p className="text-sm mt-4 text-muted-foreground">
                Your testosterone and estrogen are peaking, giving you a natural energy boost. A 30-minute dance session can improve mood, stamina, and cardiovascular health.
              </p>
            </CardContent>
          </Card>
          
          {/* Quote of the day */}
          <Card className="shadow-lg bg-gradient-to-br from-purple-100/50 to-pink-100/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star className="text-primary"/>Inspirational Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic border-l-4 border-primary pl-4">
                "The best time for new beginnings is now."
              </blockquote>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           {/* Mood & Stress */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Mood & Stress Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-primary mt-1"/>
                <div>
                  <h4 className="font-semibold">Channel Your Confidence</h4>
                  <p className="text-sm text-muted-foreground">Your communication skills are at their peak. It's a great time for important conversations, brainstorming, and socializing.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Tip */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sleep Tip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Bed className="h-6 w-6 text-primary mt-1"/>
                <div>
                  <h4 className="font-semibold">Optimize Your Environment</h4>
                  <p className="text-sm text-muted-foreground">
                    While your energy is high, ensure you're still winding down properly. Keep your room cool and dark to prepare for restful sleep, which is essential for hormone regulation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
