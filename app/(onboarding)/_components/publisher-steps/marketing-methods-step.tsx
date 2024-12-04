// app/(onboarding)/_components/publisher-steps/marketing-methods-step.tsx

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MARKETING_METHODS } from "@/constants/publisher";
import { PublisherStepProps } from "@/types/publisher";

export function MarketingMethodsStep({ data, updateFields }: PublisherStepProps) {
  const toggleMarketingMethod = (value: string) => {
    if (data.marketingMethods.includes(value)) {
      updateFields({
        marketingMethods: data.marketingMethods.filter((m) => m !== value),
      });
    } else {
      updateFields({
        marketingMethods: [...data.marketingMethods, value],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Marketing Methods</Label>
          <div className="flex flex-wrap gap-2">
            {MARKETING_METHODS.map((method) => (
              <Badge
                key={method.value}
                variant={
                  data.marketingMethods.includes(method.value)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer transition-colors"
                onClick={() => toggleMarketingMethod(method.value)}
              >
                {method.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Select all the marketing methods you currently use to generate leads. This helps us match you with the most relevant offers.
          </p>
        </div>
      </div>
    </div>
  );
}