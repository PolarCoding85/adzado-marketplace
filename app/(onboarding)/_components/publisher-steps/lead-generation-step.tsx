// app/(onboarding)/_components/publisher-steps/lead-generation-step.tsx

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_TYPES, DAILY_LEAD_VOLUMES } from "@/constants/publisher";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";

export function LeadGenerationStep() {
  const form = useFormContext<PublisherOnboardingSchema>();

  const toggleLeadType = (value: string) => {
    const currentLeadTypes = form.getValues("leadTypes");
    let newLeadTypes: string[];

    if (currentLeadTypes.includes(value)) {
      newLeadTypes = currentLeadTypes.filter((type) => type !== value);
    } else {
      newLeadTypes = [...currentLeadTypes, value];
    }

    form.setValue("leadTypes", newLeadTypes, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="leadTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Types Generated</FormLabel>
              <div className="flex flex-wrap gap-2">
                {LEAD_TYPES.map((type) => (
                  <Badge
                    key={type.value}
                    variant={field.value.includes(type.value) ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-primary/90"
                    onClick={() => toggleLeadType(type.value)}
                  >
                    {type.label}
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailyLeadVolume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Lead Volume</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your average daily volume" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DAILY_LEAD_VOLUMES.map((volume) => (
                    <SelectItem key={volume.value} value={volume.value}>
                      {volume.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Your lead generation capabilities help us match you with advertisers looking for your specific lead types and volumes.
          </p>
        </div>
      </div>
    </div>
  );
}