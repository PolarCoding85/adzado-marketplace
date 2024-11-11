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

const businessSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  businessType: z.string().min(1, "Please select a business type"),
  yearsInBusiness: z.string().min(1, "Please select years in business"),
  monthlyBudget: z.string().min(1, "Please select monthly budget"),
  description: z
    .string()
    .min(10, "Please provide a brief description of your business"),
})

export function BusinessInfoForm({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void
  onBack: () => void
}) {
  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      companyName: "",
      website: "",
      businessType: "",
      yearsInBusiness: "",
      monthlyBudget: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof businessSchema>) {
    onNext({ business: values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold'>Business Information</h2>
          <p className='text-sm text-muted-foreground'>
            Tell us about your business and experience.
          </p>
        </div>

        <div className='grid gap-6'>
          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your company name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder='https://example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='businessType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select business type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='agency'>Marketing Agency</SelectItem>
                    <SelectItem value='individual'>
                      Individual Media Buyer
                    </SelectItem>
                    <SelectItem value='publisher'>Publisher</SelectItem>
                    <SelectItem value='network'>Affiliate Network</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='yearsInBusiness'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years in Business</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select experience' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='0-1'>0-1 years</SelectItem>
                      <SelectItem value='1-3'>1-3 years</SelectItem>
                      <SelectItem value='3-5'>3-5 years</SelectItem>
                      <SelectItem value='5+'>5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='monthlyBudget'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Ad Budget</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select budget' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='0-5k'>$0 - $5,000</SelectItem>
                      <SelectItem value='5k-10k'>$5,000 - $10,000</SelectItem>
                      <SelectItem value='10k-25k'>$10,000 - $25,000</SelectItem>
                      <SelectItem value='25k+'>$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about your business and experience in media buying...'
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
