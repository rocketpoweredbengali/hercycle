"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Droplet, Target, Leaf, Heart, Home, Baby, Shield, Ban, Smile } from "lucide-react"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { Progress } from "@/components/ui/progress"
import { Icons } from "@/components/icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const onboardingSchema = z.object({
  goals: z.array(z.string()).min(1, "Please select at least one goal."),
  lastPeriodDate: z.date({
    required_error: "Please select the first day of your last period.",
  }),
  pregnancyGoal: z.string().min(1, "Please select an option."),
  birthControl: z.object({
    use: z.enum(["yes", "no"]),
    type: z.string().optional(),
  }),
  birthYear: z.coerce.number()
    .min(1920, "Please enter a valid year.")
    .max(new Date().getFullYear(), "Please enter a valid year."),
  isPregnantOrBreastfeeding: z.string().min(1, "Please select an option."),
})

type OnboardingData = z.infer<typeof onboardingSchema>

const goals = [
  { id: "period-tracking", label: "Period Tracking", icon: Droplet },
  { id: "fertility-planning", label: "Fertility Planning", icon: Baby },
  { id: "symptom-monitoring", label: "Symptom Monitoring", icon: Target },
  { id: "general-wellness", label: "General Wellness", icon: Leaf },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  
  const totalSteps = 6

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      goals: [],
      pregnancyGoal: "",
      birthControl: { use: "no" },
      birthYear: "" as any, // Fix: Initialize with an empty string
      isPregnantOrBreastfeeding: "",
    },
  })
  
  const birthControlType = form.watch("birthControl.use")

  React.useEffect(() => {
    if (!api) return
    
    const updateSlideInfo = () => {
      const currentSnap = api.selectedScrollSnap()
      setCurrent(currentSnap)
      setProgress(((currentSnap + 1) / totalSteps) * 100)
    }

    updateSlideInfo()
    api.on("select", updateSlideInfo)
    return () => { api.off("select", updateSlideInfo) }
  }, [api, totalSteps])

  const nextSlide = async (field?: keyof OnboardingData | `birthControl.use` | `birthControl.type` | `birthControl`) => {
    if (field) {
      const isValid = await form.trigger(field as any)
      if (!isValid) return
    }
    api?.scrollNext()
  }
  
  const prevSlide = () => api?.scrollPrev()

  function onSubmit(data: OnboardingData) {
    console.log("Onboarding data submitted:", data)
    // Here you would save the data to Firebase
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-background p-4">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-10 space-y-6">
        <div className="text-center">
            <Icons.logo className="h-12 w-12 mx-auto text-primary mb-2" />
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Welcome to HerCycle</h1>
            <p className="text-muted-foreground">Let's personalize your journey.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <Progress value={progress} className="w-full h-2" />
            <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{current + 1} / {totalSteps}</span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
              <CarouselContent>
                {/* Step 1: Goals */}
                <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center">
                    <FormLabel className="text-xl font-headline mb-6 block">What are your primary health goals?</FormLabel>
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <ToggleGroup
                          type="multiple"
                          variant="outline"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-4"
                        >
                          {goals.map(goal => (
                            <ToggleGroupItem key={goal.id} value={goal.id} className="h-20 flex-col gap-2 p-4 text-base">
                              <goal.icon className="h-6 w-6"/>
                              <span>{goal.label}</span>
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      )}
                    />
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>
                
                {/* Step 2: Last Period Date */}
                <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center items-center">
                    <FormLabel className="text-xl font-headline mb-6 block">When was the first day of your last period?</FormLabel>
                    <FormField
                      control={form.control}
                      name="lastPeriodDate"
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] h-14 text-lg justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < addDays(new Date(), -120)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>

                {/* Step 3: Pregnancy Goals */}
                 <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center">
                    <FormLabel className="text-xl font-headline mb-6 block">Are you trying to conceive, prevent, or neither?</FormLabel>
                    <FormField
                      control={form.control}
                      name="pregnancyGoal"
                      render={({ field }) => (
                        <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <ToggleGroupItem value="conceive" className="h-20 flex-col gap-2 p-4 text-base">
                             <Baby className="h-6 w-6"/><span>Trying to conceive</span>
                           </ToggleGroupItem>
                           <ToggleGroupItem value="prevent" className="h-20 flex-col gap-2 p-4 text-base">
                              <Shield className="h-6 w-6"/><span>Preventing pregnancy</span>
                           </ToggleGroupItem>
                            <ToggleGroupItem value="neither" className="h-20 flex-col gap-2 p-4 text-base">
                              <Smile className="h-6 w-6"/><span>Neither</span>
                            </ToggleGroupItem>
                        </ToggleGroup>
                      )}
                    />
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>
                
                {/* Step 4: Birth Control */}
                <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center">
                    <FormLabel className="text-xl font-headline mb-6 block">Do you use hormonal birth control?</FormLabel>
                      <FormField
                          control={form.control}
                          name="birthControl.use"
                          render={({ field }) => (
                            <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-2 gap-4">
                              <ToggleGroupItem value="yes" className="h-20 text-base">Yes</ToggleGroupItem>
                              <ToggleGroupItem value="no" className="h-20 text-base">No</ToggleGroupItem>
                            </ToggleGroup>
                          )}
                        />
                    {birthControlType === 'yes' && (
                        <div className="mt-6 w-full max-w-sm mx-auto">
                            <FormField
                            control={form.control}
                            name="birthControl.type"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12 text-lg">
                                    <SelectValue placeholder="Select type..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="pill">Pill</SelectItem>
                                    <SelectItem value="iud">Hormonal IUD</SelectItem>
                                    <SelectItem value="implant">Implant</SelectItem>
                                    <SelectItem value="patch">Patch</SelectItem>
                                    <SelectItem value="injection">Injection</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                            />
                        </div>
                    )}
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>
                
                {/* Step 5: Birth Year */}
                <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center items-center">
                    <FormLabel className="text-xl font-headline mb-6 block">What’s your birth year?</FormLabel>
                     <FormField
                        control={form.control}
                        name="birthYear"
                        render={({ field }) => (
                          <div className="relative w-full max-w-xs mx-auto">
                            <Input 
                                type="number" 
                                {...field} 
                                placeholder="e.g., 1995"
                                className="h-14 text-lg text-center" 
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || '')}
                            />
                          </div>
                        )}
                      />
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>
                
                {/* Step 6: Pregnancy/Breastfeeding */}
                <CarouselItem>
                  <div className="text-center py-6 min-h-[300px] flex flex-col justify-center">
                    <FormLabel className="text-xl font-headline mb-6 block">Are you currently pregnant or breastfeeding?</FormLabel>
                     <FormField
                      control={form.control}
                      name="isPregnantOrBreastfeeding"
                      render={({ field }) => (
                        <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <ToggleGroupItem value="pregnant" className="h-20 flex-col gap-2 p-4 text-base">
                             <Baby className="h-6 w-6"/><span>Pregnant</span>
                           </ToggleGroupItem>
                           <ToggleGroupItem value="breastfeeding" className="h-20 flex-col gap-2 p-4 text-base">
                              <Droplet className="h-6 w-6"/><span>Breastfeeding</span>
                           </ToggleGroupItem>
                           <ToggleGroupItem value="neither" className="h-20 flex-col gap-2 p-4 text-base">
                              <Ban className="h-6 w-6"/><span>Neither</span>
                           </ToggleGroupItem>
                        </ToggleGroup>
                      )}
                    />
                    <FormMessage className="mt-4" />
                  </div>
                </CarouselItem>

              </CarouselContent>
            </Carousel>
             <div className="flex items-center justify-between w-full pt-6">
                <Button type="button" variant="ghost" onClick={prevSlide} disabled={current === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    Back
                </Button>
                {current < totalSteps - 1 ? (
                    <Button type="button" onClick={() => {
                        const fields: (keyof OnboardingData | `birthControl.use`)[] = [
                            'goals', 
                            'lastPeriodDate',
                            'pregnancyGoal',
                            'birthControl.use',
                            'birthYear',
                            'isPregnantOrBreastfeeding'
                        ];
                        nextSlide(fields[current]);
                    }}>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4"/>
                    </Button>
                ) : (
                    <Button type="submit">
                        Finish Setup
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
