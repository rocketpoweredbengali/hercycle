"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Fish, Sprout, Apple, Droplets } from "lucide-react"
import Image from "next/image"

export default function NutritionPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-3">
          <Leaf className="text-primary"/> Nutrition Guide
        </h1>
        <p className="text-muted-foreground">
          Fueling your body for the Ovulation phase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Tip */}
          <Card className="shadow-lg bg-gradient-to-br from-purple-100/50 to-pink-100/50">
            <CardHeader>
              <CardTitle>🌟 Daily Nutrition Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Focus on antioxidant-rich foods like berries and leafy greens to support egg quality and overall reproductive health during your fertile window.</p>
            </CardContent>
          </Card>
          
          {/* Recipe Suggestion */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recipe of the Day: Salmon & Avocado Bowl</CardTitle>
              <CardDescription>A delicious and hormone-balancing meal.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Salmon Bowl" 
                  data-ai-hint="salmon salad bowl"
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>150g Salmon fillet</li>
                  <li>1/2 Avocado, sliced</li>
                  <li>1 cup Quinoa, cooked</li>
                  <li>1 cup Mixed greens</li>
                  <li>1/4 cup Cherry tomatoes, halved</li>
                  <li>Lemon-tahini dressing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           {/* Why this matters */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Why This Matters Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                During the ovulatory phase, your body needs nutrients that support hormone production and egg release. Omega-3s from salmon and healthy fats from avocado are crucial for this process.
              </p>
            </CardContent>
          </Card>

          {/* Key Nutrients */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Key Nutrients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Fish className="h-6 w-6 text-primary"/>
                <div>
                  <p className="font-semibold">Omega-3s</p>
                  <p className="text-xs text-muted-foreground">Reduces inflammation</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Sprout className="h-6 w-6 text-primary"/>
                <div>
                  <p className="font-semibold">Folate</p>
                  <p className="text-xs text-muted-foreground">Supports cell growth</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Apple className="h-6 w-6 text-primary"/>
                <div>
                  <p className="font-semibold">Vitamin C</p>
                  <p className="text-xs text-muted-foreground">Boosts collagen</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-primary"/>
                <div>
                  <p className="font-semibold">Hydration</p>
                  <p className="text-xs text-muted-foreground">Stay hydrated!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
