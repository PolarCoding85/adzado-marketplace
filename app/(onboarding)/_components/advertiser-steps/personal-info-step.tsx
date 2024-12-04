// app/(onboarding)/_components/advertiser-steps/personal-info-step.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { COMMON_JOB_TITLES } from "@/constants/advertiser";
import { StepProps } from "@/types/advertiser";

export function PersonalInfoStep({ data, updateFields }: StepProps) {
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
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-start text-left font-normal"
            >
              {data.jobTitle || "Select job title..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search job title..." />
              <CommandList>
                <CommandEmpty>No job title found.</CommandEmpty>
                <CommandGroup>
                  {COMMON_JOB_TITLES.map((title) => (
                    <CommandItem
                      key={title.value}
                      onSelect={() => updateFields({ jobTitle: title.label })}
                    >
                      {title.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}