// app/(onboarding)/_components/advertiser-steps/lead-preferences-step.tsx

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_PREFERENCES, MONTHLY_BUDGET_RANGES } from "@/constants/advertiser";
import { StepProps } from "@/types/advertiser";

export function LeadPreferencesStep({ data, updateFields }: StepProps) {
  const toggleLeadPreference = (value: string) => {
    if (data.leadPreferences.includes(value)) {
      updateFields({
        leadPreferences: data.leadPreferences.filter((t) => t !== value),
      });
    } else {
      updateFields({
        leadPreferences: [...data.leadPreferences, value],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Preferred Lead Types</Label>
          <div className="flex flex-wrap gap-2">
            {LEAD_PREFERENCES.map((type) => (
              <Badge
                key={type.value}
                variant={data.leadPreferences.includes(type.value) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleLeadPreference(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Monthly Budget Range</Label>
          <Select
            value={data.monthlyBudget}
            onValueChange={(value) => updateFields({ monthlyBudget: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your monthly budget" />
            </SelectTrigger>
            <SelectContent>
              {MONTHLY_BUDGET_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Campaign Goals</Label>
          <textarea
            className="w-full rounded-lg border bg-background p-2 h-24 focus:ring-1 focus:ring-primary"
            placeholder="Tell us about your campaign goals and any specific requirements..."
            value={data.campaignGoals || ""}
            onChange={(e) => updateFields({ campaignGoals: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}