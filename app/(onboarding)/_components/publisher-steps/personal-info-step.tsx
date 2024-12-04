// app/(onboarding)/_components/publisher-steps/personal-info-step.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PublisherStepProps } from "@/types/publisher";

export function PersonalInfoStep({ data, updateFields }: PublisherStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            required
            value={data.firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
            className="rounded-lg"
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            required
            value={data.lastName}
            onChange={(e) => updateFields({ lastName: e.target.value })}
            className="rounded-lg"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={data.phoneNumber}
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
          className="rounded-lg"
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </div>
  );
}