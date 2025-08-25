"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Form,
  FormControl,
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
import { Icons } from "@/components/icons"

const onboardingSchema = z.object({
  goal: z.string().min(1, "Please select a goal."),
  lastPeriodDate: z.date({
    required_error: "Please select the first day of your last period.",
  }),
  periodLength: z.coerce.number().min(1, "Please enter a valid number.").max(15),
  cycleLength: z.coerce.number().min(15, "Please enter a valid number.").max(60),
})

type OnboardingData = z.infer<typeof onboardingSchema>

export default function OnboardingPage() {
  const router = useRouter()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      goal: "",
      periodLength: 5,
      cycleLength: 28,
    },
  })

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const nextSlide = async (field?: keyof OnboardingData) => {
    if (field) {
      const isValid = await form.trigger(field)
      if (!isValid) return
    }
    api?.scrollNext()
  }
  
  const prevSlide = () => api?.scrollPrev()

  function onSubmit(data: OnboardingData) {
    // Here you would typically save the user's data
    console.log("Onboarding data:", data)
    router.push("/dashboard")
  }

  const slides = [
    // Slide 1: Goal
    <FormItem key="goal">
      <FormLabel className="text-xl font-headline text-center block mb-4">What's your primary goal?</FormLabel>
      <FormField
        control={form.control}
        name="goal"
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[80%] mx-auto h-12 text-lg">
                <SelectValue placeholder="Select your goal..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="track-cycle">Track my cycle</SelectItem>
              <SelectItem value="get-pregnant">Get pregnant</SelectItem>
              <SelectItem value="manage-symptoms">Manage symptoms</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <FormMessage className="text-center" />
      <Button onClick={() => nextSlide('goal')} className="mt-8">Next</Button>
    </FormItem>,

    // Slide 2: Last Period Date
    <FormItem key="lastPeriodDate">
      <FormLabel className="text-xl font-headline text-center block mb-4">When did your last period start?</FormLabel>
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
                    "w-[80%] mx-auto h-12 text-lg justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < addDays(new Date(), -90)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <FormMessage className="text-center" />
      <Button onClick={() => nextSlide('lastPeriodDate')} className="mt-8">Next</Button>
    </FormItem>,

    // Slide 3: Period Length
    <FormItem key="periodLength">
      <FormLabel className="text-xl font-headline text-center block mb-4">How long does your period usually last?</FormLabel>
      <FormField
        control={form.control}
        name="periodLength"
        render={({ field }) => (
          <div className="relative w-[80%] mx-auto">
            <Input type="number" {...field} className="h-12 text-lg text-center pr-16" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">days</span>
          </div>
        )}
      />
      <FormMessage className="text-center" />
      <Button onClick={() => nextSlide('periodLength')} className="mt-8">Next</Button>
    </FormItem>,

    // Slide 4: Cycle Length
    <FormItem key="cycleLength">
      <FormLabel className="text-xl font-headline text-center block mb-4">How long is your typical cycle?</FormLabel>
      <FormField
        control={form.control}
        name="cycleLength"
        render={({ field }) => (
           <div className="relative w-[80%] mx-auto">
            <Input type="number" {...field} className="h-12 text-lg text-center pr-16" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">days</span>
          </div>
        )}
      />
      <FormMessage className="text-center" />
      <Button type="submit" className="mt-8">
        Finish Onboarding <Check className="ml-2 h-4 w-4" />
      </Button>
    </FormItem>
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-white">
      <div className="w-full max-w-lg p-8 space-y-4 text-center">
        <Icons.logo className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-3xl font-bold font-headline">Welcome to HerCycle</h1>
        <p className="text-muted-foreground">Let's personalize your experience. A few questions to get started.</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={index} className="flex flex-col items-center justify-center pt-8">
                    {slide}
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* We'll use custom buttons inside each slide */}
            </Carousel>
          </form>
        </Form>
        
        <div className="flex items-center justify-between w-full pt-4">
            <Button variant="ghost" onClick={prevSlide} disabled={current === 0}>
                <ChevronLeft className="mr-2 h-4 w-4"/>
                Back
            </Button>
             <div className="flex gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={cn("h-2 w-2 rounded-full transition-all", 
                            current === i ? "w-4 bg-primary" : "bg-muted"
                        )}
                    />
                ))}
            </div>
            {/* The "Next" button is inside the slides, this is a placeholder */}
            <Button variant="ghost" onClick={() => nextSlide()} disabled={current === slides.length - 1} className="opacity-0 pointer-events-none">
                Next
                <ChevronRight className="ml-2 h-4 w-4"/>
            </Button>
        </div>
      </div>
    </div>
  )
}
