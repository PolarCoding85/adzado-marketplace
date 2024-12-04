// app/(onboarding)/_components/advertiser-steps/industry-selection-step.tsx

import { StepProps } from "@/types/advertiser";
import { IndustrySelector } from "@/components/shared/industry-selector";

export function IndustrySelectionStep({ data, updateFields }: StepProps) {
  return (
    <div className="space-y-6">
      <IndustrySelector
        selectedIndustries={data.targetIndustries}
        onIndustryChange={(industries) =>
          updateFields({ targetIndustries: industries })
        }
        selectedSubIndustries={data.targetSubIndustries}
        onSubIndustryChange={(subIndustries) =>
          updateFields({ targetSubIndustries: subIndustries })
        }
      />
    </div>
  );
}