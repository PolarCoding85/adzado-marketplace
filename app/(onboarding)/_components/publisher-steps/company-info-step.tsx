// app/(onboarding)/_components/publisher-steps/company-info-step.tsx

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { PublisherOnboardingSchema } from "@/schemas/publisher-validation";
import { FormattedTaxIdInput } from "@/components/shared/formatted-ein-input";

export function CompanyInfoStep() {
  const form = useFormContext<PublisherOnboardingSchema>();
  const hasCompany = form.watch("hasCompany");
  const { formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hasCompany"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm text-muted-foreground">
                I have a registered business
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      {hasCompany && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="rounded-lg"
                    placeholder="Acme Inc."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID / EIN</FormLabel>
                <FormControl>
                  <FormattedTaxIdInput
                    {...field}
                    value={field.value || ""}
                    className="rounded-lg"
                    placeholder="XX-XXXXXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      )}

      <FormField
        control={form.control}
        name="companyWebsite"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Website (Optional)</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                type="url"
                className="rounded-lg"
                placeholder="https://example.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}