// app/(onboarding)/_components/publisher-steps/additional-info-step.tsx

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CERTIFICATIONS } from "@/constants/publisher";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";

export function AdditionalInfoStep() {
  const form = useFormContext<PublisherOnboardingSchema>();

  const toggleCertification = (value: string) => {
    const currentCertifications = form.getValues("certifications") || [];
    let newCertifications: string[];

    if (currentCertifications.includes(value)) {
      newCertifications = currentCertifications.filter((cert) => cert !== value);
    } else {
      newCertifications = [...currentCertifications, value];
    }

    form.setValue("certifications", newCertifications, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications</FormLabel>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <Badge
                    key={cert.value}
                    variant={(field.value || []).includes(cert.value) ? "default" : "outline"}
                    className="cursor-pointer transition-colors hover:bg-primary/90"
                    onClick={() => toggleCertification(cert.value)}
                  >
                    {cert.label}
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  className="resize-none h-24"
                  placeholder="Tell us anything else about your business that might be relevant..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Adding certifications and additional information helps advertisers better understand your capabilities and increases your chances of offer approval.
          </p>
        </div>
      </div>
    </div>
  );
}