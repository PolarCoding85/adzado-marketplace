// components/shared/industry-selector.tsx

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INDUSTRIES, SUB_INDUSTRIES } from "@/constants/advertiser";
import { IndustryType, SubIndustryItem } from "@/types/advertiser";

interface IndustrySelectProps {
  selectedIndustries: string[];
  onIndustryChange: (industries: string[]) => void;
  selectedSubIndustries: string[];
  onSubIndustryChange: (subIndustries: string[]) => void;
  error?: boolean;
}

export function IndustrySelector({
  selectedIndustries,
  onIndustryChange,
  selectedSubIndustries,
  onSubIndustryChange,
  error
}: IndustrySelectProps) {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [subIndustriesOpen, setSubIndustriesOpen] = useState(false);

  // When an industry is removed, also remove its sub-industries
  const handleIndustryRemove = (industryValue: string) => {
    const newIndustries = selectedIndustries.filter(i => i !== industryValue);
    onIndustryChange(newIndustries);

    // Remove sub-industries that belong to the removed industry
    const industrySubIndustries = SUB_INDUSTRIES[industryValue as IndustryType] || [];
    const subIndustriesToRemove = industrySubIndustries.map(si => si.value);
    const newSubIndustries = selectedSubIndustries.filter(
      si => !subIndustriesToRemove.includes(si)
    );
    onSubIndustryChange(newSubIndustries);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Industries You Serve</Label>
        <Popover open={industriesOpen} onOpenChange={setIndustriesOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={`w-full justify-start text-left font-normal ${
                error ? "border-destructive" : ""
              }`}
            >
              <span className="text-muted-foreground">
                {selectedIndustries.length > 0
                  ? `${selectedIndustries.length} selected`
                  : "Search industries..."}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[400px]" align="start">
            <Command shouldFilter={true}>
              <CommandInput placeholder="Search industries..." />
              <CommandList>
                <CommandEmpty>No industry found.</CommandEmpty>
                <CommandGroup>
                  {INDUSTRIES.map((industry) => (
                    <CommandItem
                      key={industry.value}
                      onSelect={() => {
                        if (!selectedIndustries.includes(industry.value)) {
                          onIndustryChange([...selectedIndustries, industry.value]);
                        }
                        setIndustriesOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        {industry.label}
                        {selectedIndustries.includes(industry.value) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedIndustries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedIndustries.map((industryValue) => {
              const industry = INDUSTRIES.find((i) => i.value === industryValue);
              return (
                <Badge
                  key={industryValue}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {industry?.label}
                  <button
                    type="button"
                    className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => handleIndustryRemove(industryValue)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {selectedIndustries.length > 0 && (
        <div className="space-y-2">
          <Label>Sub-Industries</Label>
          <Popover open={subIndustriesOpen} onOpenChange={setSubIndustriesOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start text-left font-normal"
              >
                <span className="text-muted-foreground">
                  {selectedSubIndustries.length > 0
                    ? `${selectedSubIndustries.length} selected`
                    : "Search sub-industries..."}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[400px]" align="start">
              <Command shouldFilter={true}>
                <CommandInput placeholder="Search sub-industries..." />
                <CommandList>
                  <CommandEmpty>No sub-industry found.</CommandEmpty>
                  {selectedIndustries.map((industry: string) => (
                    <CommandGroup
                      key={industry}
                      heading={
                        INDUSTRIES.find((i) => i.value === industry)?.label || ""
                      }
                    >
                      {(SUB_INDUSTRIES[industry as IndustryType] || []).map(
                        (subIndustry: SubIndustryItem) => (
                          <CommandItem
                            key={subIndustry.value}
                            onSelect={() => {
                              if (!selectedSubIndustries.includes(subIndustry.value)) {
                                onSubIndustryChange([
                                  ...selectedSubIndustries,
                                  subIndustry.value,
                                ]);
                              }
                              setSubIndustriesOpen(false);
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              {subIndustry.label}
                              {selectedSubIndustries.includes(subIndustry.value) && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedSubIndustries.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubIndustries.map((subIndustryValue) => {
                const subIndustry = Object.values(SUB_INDUSTRIES)
                  .flat()
                  .find((i) => i.value === subIndustryValue);
                return (
                  <Badge
                    key={subIndustryValue}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {subIndustry?.label}
                    <button
                      type="button"
                      className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={() => {
                        onSubIndustryChange(
                          selectedSubIndustries.filter(
                            (i) => i !== subIndustryValue
                          )
                        );
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}