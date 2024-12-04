// app/(onboarding)/_components/publisher-steps/industry-selection-step.tsx

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IndustrySelector } from "@/components/shared/industry-selector";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";

export function IndustrySelectionStep() {
  const form = useFormContext<PublisherOnboardingSchema>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="industries"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
            <IndustrySelector
              selectedIndustries={field.value}
              onIndustryChange={(industries) => field.onChange(industries)}
              selectedSubIndustries={form.getValues("subIndustries")}
              onSubIndustryChange={(subIndustries) => 
                form.setValue("subIndustries", subIndustries, {
                  shouldValidate: true,
                  shouldDirty: true
                })
              }
            />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subIndustries"
        render={({ field }) => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add help text */}
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Select the industries and sub-industries that best match your lead generation capabilities. This helps us match you with relevant offers.
        </p>
      </div>
    </div>
  );
}