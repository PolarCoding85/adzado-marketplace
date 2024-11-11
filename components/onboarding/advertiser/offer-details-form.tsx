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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const offerSchema = z.object({
  offerName: z.string().min(2, "Offer name must be at least 2 characters"),
  vertical: z.string().min(1, "Please select a vertical"),
  leadType: z.string().min(1, "Please select a lead type"),
  payoutAmount: z.string().min(1, "Please enter payout amount"),
  targetCountries: z
    .array(z.string())
    .min(1, "Please select at least one country"),
  dailyCap: z.string().min(1, "Please enter daily cap"),
  description: z.string().min(10, "Please provide an offer description"),
  requirements: z.string().min(10, "Please provide offer requirements"),
})

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
]

export function OfferDetailsForm({
  onNext,
  onBack,
}: {
  onNext: (data: z.infer<typeof offerSchema>) => void
  onBack: () => void
}) {
  const form = useForm<z.infer<typeof offerSchema>>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offerName: "",
      vertical: "",
      leadType: "",
      payoutAmount: "",
      targetCountries: [],
      dailyCap: "",
      description: "",
      requirements: "",
    },
  })

  function onSubmit(values: z.infer<typeof offerSchema>) {
    onNext(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Offer Details</h2>
          <p className='text-sm text-muted-foreground'>
            Tell us about the offer you&apos;d like to list on our marketplace.
          </p>
        </div>

        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='offerName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your offer name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='vertical'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vertical</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select vertical' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='insurance'>Insurance</SelectItem>
                      <SelectItem value='solar'>Solar</SelectItem>
                      <SelectItem value='mortgage'>Mortgage</SelectItem>
                      <SelectItem value='education'>Education</SelectItem>
                      <SelectItem value='home-services'>
                        Home Services
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='leadType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lead Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select lead type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='exclusive'>Exclusive</SelectItem>
                      <SelectItem value='shared'>Shared</SelectItem>
                      <SelectItem value='live-transfer'>
                        Live Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='payoutAmount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payout Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='$' {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter amount per lead/transfer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='dailyCap'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Cap</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormDescription>Maximum leads per day</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='targetCountries'
            render={() => (
              <FormItem>
                <FormLabel>Target Countries</FormLabel>
                <div className='grid gap-4 md:grid-cols-2'>
                  {countries.map((country) => (
                    <FormField
                      key={country.value}
                      control={form.control}
                      name='targetCountries'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={country.value}
                            className='flex flex-row items-start space-x-3 space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(country.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        country.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== country.value
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {country.label}
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Describe your offer, target audience, and unique selling points...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='requirements'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements & Restrictions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='List any specific requirements, restrictions, or compliance guidelines...'
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
            Continue
          </Button>
        </div>
      </form>
    </Form>
  )
}
