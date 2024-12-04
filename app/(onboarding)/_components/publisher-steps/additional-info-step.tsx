// app/(onboarding)/_components/publisher-steps/additional-info-step.tsx

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATIONS } from "@/constants/publisher";
import { PublisherStepProps } from "@/types/publisher";

export function AdditionalInfoStep({ data, updateFields }: PublisherStepProps) {
  const toggleCertification = (value: string) => {
    if (data.certifications.includes(value)) {
      updateFields({
        certifications: data.certifications.filter((c) => c !== value),
      });
    } else {
      updateFields({
        certifications: [...data.certifications, value],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Certifications</Label>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <Badge
                key={cert.value}
                variant={
                  data.certifications.includes(cert.value)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer transition-colors"
                onClick={() => toggleCertification(cert.value)}
              >
                {cert.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Additional Information</Label>
          <textarea
            className="w-full rounded-lg border bg-background p-2 h-24 focus:ring-1 focus:ring-primary"
            placeholder="Tell us anything else about your business that might be relevant..."
            value={data.additionalInfo || ""}
            onChange={(e) => updateFields({ additionalInfo: e.target.value })}
          />
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Adding certifications and additional information helps advertisers better understand your capabilities and increases your chances of offer approval.
          </p>
        </div>
      </div>
    </div>
  );
}