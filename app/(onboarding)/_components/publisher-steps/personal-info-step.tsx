// app/(onboarding)/_components/publisher-steps/personal-info-step.tsx

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";

export function PersonalInfoStep() {
  const form = useFormContext<PublisherOnboardingSchema>();
  const { formState: { errors } } = form;

  // Debug log to see form state
  console.log("Form Errors:", errors);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className="rounded-lg"
                  placeholder="John"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className="rounded-lg"
                  placeholder="Doe"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="tel"
                className="rounded-lg"
                placeholder="+1 (555) 000-0000"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}