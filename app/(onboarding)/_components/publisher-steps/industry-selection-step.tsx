// app/(onboarding)/_components/publisher-steps/industry-selection-step.tsx

import { PublisherStepProps } from "@/types/publisher";
import { IndustrySelector } from "@/components/shared/industry-selector";

export function IndustrySelectionStep({ data, updateFields }: PublisherStepProps) {
  return (
    <div className="space-y-6">
      <IndustrySelector
        selectedIndustries={data.industries}
        onIndustryChange={(industries) =>
          updateFields({ industries })
        }
        selectedSubIndustries={data.subIndustries}
        onSubIndustryChange={(subIndustries) =>
          updateFields({ subIndustries })
        }
      />
    </div>
  );
}