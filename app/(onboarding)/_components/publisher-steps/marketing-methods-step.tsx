// app/(onboarding)/_components/publisher-steps/marketing-methods-step.tsx

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { MARKETING_METHODS } from "@/constants/publisher";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";

export function MarketingMethodsStep() {
  const form = useFormContext<PublisherOnboardingSchema>();

  const toggleMarketingMethod = (value: string) => {
    const currentMethods = form.getValues("marketingMethods");
    let newMethods: string[];

    if (currentMethods.includes(value)) {
      newMethods = currentMethods.filter((method) => method !== value);
    } else {
      newMethods = [...currentMethods, value];
    }

    form.setValue("marketingMethods", newMethods, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="marketingMethods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marketing Methods</FormLabel>
              <div className="flex flex-wrap gap-2">
                {MARKETING_METHODS.map((method) => (
                  <Badge
                    key={method.value}
                    variant={field.value.includes(method.value) ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-primary/90"
                    onClick={() => toggleMarketingMethod(method.value)}
                  >
                    {method.label}
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Select all the marketing methods you currently use to generate leads. This helps us match you with the most relevant offers.
          </p>
        </div>
      </div>
    </div>
  );
}