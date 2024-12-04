// app/(onboarding)/_components/advertiser-steps/company-info-step.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "@/types/advertiser";
import { COMPANY_SIZES } from "@/constants/advertiser";
import { motion } from "framer-motion";

export function CompanyInfoStep({ data, updateFields }: StepProps) {
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
            <Label htmlFor="companyWebsite">Company Website</Label>
            <Input
              id="companyWebsite"
              type="url"
              value={data.companyWebsite}
              onChange={(e) => updateFields({ companyWebsite: e.target.value })}
              className="rounded-lg"
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select
              value={data.companySize}
              onValueChange={(value) => updateFields({ companySize: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}
    </div>
  );
}