"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const trafficSchema = z.object({
  trafficSources: z
    .array(z.string())
    .min(1, "Please select at least one traffic source"),
  monthlyVisitors: z.string().min(1, "Please enter monthly visitors"),
  verticals: z.array(z.string()).min(1, "Please select at least one vertical"),
  additionalInfo: z.string().optional(),
})

const trafficSources = [
  { id: "search", label: "Search (Google, Bing)" },
  { id: "social", label: "Social Media" },
  { id: "display", label: "Display Advertising" },
  { id: "native", label: "Native Advertising" },
  { id: "email", label: "Email Marketing" },
]

const verticals = [
  { id: "insurance", label: "Insurance" },
  { id: "solar", label: "Solar" },
  { id: "mortgage", label: "Mortgage" },
  { id: "education", label: "Education" },
  { id: "home-services", label: "Home Services" },
]

export function TrafficSourcesForm({
  onNext,
  onBack,
}: {
  onNext: (data: z.infer<typeof trafficSchema>) => void
  onBack: () => void
}) {
  const form = useForm<z.infer<typeof trafficSchema>>({
    resolver: zodResolver(trafficSchema),
    defaultValues: {
      trafficSources: [],
      monthlyVisitors: "",
      verticals: [],
      additionalInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof trafficSchema>) {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Traffic Sources</h2>
          <p className='text-sm text-muted-foreground'>
            Tell us about your traffic sources and target verticals.
          </p>
        </div>

        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='trafficSources'
            render={() => (
              <FormItem>
                <FormLabel>Traffic Sources</FormLabel>
                <div className='grid gap-4 md:grid-cols-2'>
                  {trafficSources.map((source) => (
                    <FormField
                      key={source.id}
                      control={form.control}
                      name='trafficSources'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={source.id}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(source.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        source.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== source.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {source.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='monthlyVisitors'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Visitors/Leads</FormLabel>
                <FormControl>
                  <Input placeholder='e.g., 10000' {...field} />
                </FormControl>
                <FormDescription>
                  Approximate monthly traffic or lead volume
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='verticals'
            render={() => (
              <FormItem>
                <FormLabel>Target Verticals</FormLabel>
                <div className='grid gap-4 md:grid-cols-2'>
                  {verticals.map((vertical) => (
                    <FormField
                      key={vertical.id}
                      control={form.control}
                      name='verticals'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={vertical.id}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(vertical.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        vertical.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== vertical.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {vertical.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='additionalInfo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Any additional details about your traffic sources or experience...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-between'>
          <Button
            type='button'
            variant='outline'
            size='lg'
            className='rounded-full'
            onClick={onBack}
          >
            Back
          </Button>
          <Button type='submit' size='lg' className='rounded-full'>
            Complete Registration
          </Button>
        </div>
      </form>
    </Form>
  )
}
