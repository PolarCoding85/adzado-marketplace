// app/(onboarding)/_components/publisher-steps/company-info-step.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PublisherStepProps } from "@/types/publisher";
import { motion } from "framer-motion";

export function CompanyInfoStep({ data, updateFields }: PublisherStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasCompany"
          checked={data.hasCompany}
          onCheckedChange={(checked) =>
            updateFields({ hasCompany: checked as boolean })
          }
        />
        <Label
          htmlFor="hasCompany"
          className="text-sm text-muted-foreground"
        >
          I have a registered business
        </Label>
      </div>

      {data.hasCompany && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e) => updateFields({ companyName: e.target.value })}
              className="rounded-lg"
              placeholder="Acme Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / EIN</Label>
            <Input
              id="taxId"
              value={data.taxId}
              onChange={(e) => updateFields({ taxId: e.target.value })}
              className="rounded-lg"
              placeholder="XX-XXXXXXX"
            />
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => updateFields({ website: e.target.value })}
          className="rounded-lg"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}