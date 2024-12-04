// app/(onboarding)/_components/publisher-steps/lead-generation-step.tsx

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
import { PublisherStepProps } from "@/types/publisher";

export function LeadGenerationStep({ data, updateFields }: PublisherStepProps) {
  const toggleLeadType = (value: string) => {
    if (data.leadTypes.includes(value)) {
      updateFields({
        leadTypes: data.leadTypes.filter((t) => t !== value),
      });
    } else {
      updateFields({
        leadTypes: [...data.leadTypes, value],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Lead Types Generated</Label>
          <div className="flex flex-wrap gap-2">
            {LEAD_TYPES.map((type) => (
              <Badge
                key={type.value}
                variant={
                  data.leadTypes.includes(type.value)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer transition-colors"
                onClick={() => toggleLeadType(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Daily Lead Volume</Label>
          <Select
            value={data.dailyLeadVolume}
            onValueChange={(value) => updateFields({ dailyLeadVolume: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your average daily volume" />
            </SelectTrigger>
            <SelectContent>
              {DAILY_LEAD_VOLUMES.map((volume) => (
                <SelectItem key={volume.value} value={volume.value}>
                  {volume.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Your lead generation capabilities help us match you with advertisers looking for your specific lead types and volumes.
          </p>
        </div>
      </div>
    </div>
  );
}