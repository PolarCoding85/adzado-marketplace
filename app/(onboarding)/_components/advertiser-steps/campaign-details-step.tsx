// app/(onboarding)/_components/advertiser-steps/campaign-details-step.tsx

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { StepProps, GeographyLevel, Location } from "@/types/advertiser";

const sampleLocations: Location[] = [
  // Countries
  { id: "us", type: "country", value: "US", label: "United States" },
  { id: "ca", type: "country", value: "CA", label: "Canada" },
  // States
  {
    id: "us-ca",
    type: "state",
    value: "CA",
    label: "California",
    parentId: "us",
  },
  {
    id: "us-ny",
    type: "state",
    value: "NY",
    label: "New York",
    parentId: "us",
  },
  // Cities
  {
    id: "us-ca-sf",
    type: "city",
    value: "San Francisco",
    label: "San Francisco, CA",
    parentId: "us-ca",
  },
  {
    id: "us-ca-la",
    type: "city",
    value: "Los Angeles",
    label: "Los Angeles, CA",
    parentId: "us-ca",
  },
  // Postal Codes
  {
    id: "us-ca-94105",
    type: "postal",
    value: "94105",
    label: "94105 - San Francisco",
    parentId: "us-ca-sf",
  },
];

export function CampaignDetailsStep({ data, updateFields }: StepProps) {
  const [geoLevel, setGeoLevel] = useState<GeographyLevel>("global");
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

  const handleLocationSelect = (location: Location) => {
    if (!selectedLocations.find((l) => l.id === location.id)) {
      const newLocations = [...selectedLocations, location];
      setSelectedLocations(newLocations);
      updateFields({ targetGeographies: newLocations.map(l => l.value) });
    }
    setLocationSearchOpen(false);
  };

  const handleLocationRemove = (locationId: string) => {
    const newLocations = selectedLocations.filter((l) => l.id !== locationId);
    setSelectedLocations(newLocations);
    updateFields({ targetGeographies: newLocations.map(l => l.value) });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Geographic Targeting</Label>
        <Select
          value={geoLevel}
          onValueChange={(value) => {
            setGeoLevel(value as GeographyLevel);
            setSelectedLocations([]);
            updateFields({ targetGeographies: [] });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select targeting level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global">Global (All Locations)</SelectItem>
            <SelectItem value="country">Country Level</SelectItem>
            <SelectItem value="state">State/Province Level</SelectItem>
            <SelectItem value="city">City Level</SelectItem>
            <SelectItem value="postal">Postal Code Level</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {geoLevel !== "global" && (
        <div className="space-y-2">
          <Label>Add Locations</Label>
          <Popover open={locationSearchOpen} onOpenChange={setLocationSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start text-left font-normal"
              >
                <span className="text-muted-foreground">
                  {selectedLocations.length > 0
                    ? `${selectedLocations.length} locations selected`
                    : "Search locations..."}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[400px]" align="start">
              <Command shouldFilter={true}>
                <CommandInput placeholder={`Search ${geoLevel}s...`} />
                <CommandList>
                  <CommandEmpty>No locations found</CommandEmpty>
                  <CommandGroup>
                    {sampleLocations
                      .filter((loc) => loc.type === geoLevel)
                      .map((location) => (
                        <CommandItem
                          key={location.id}
                          onSelect={() => handleLocationSelect(location)}
                        >
                          {location.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedLocations.length > 0 && (
            <div className="mt-4">
              <Label>Selected Locations</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedLocations.map((location) => (
                  <Badge
                    key={location.id}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {location.label}
                    <button
                      type="button"
                      className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={() => handleLocationRemove(location.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {geoLevel === "postal" && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex items-start space-x-2">
                <div className="text-sm">
                  <p className="font-medium">Bulk Upload</p>
                  <p className="text-muted-foreground">
                    Have multiple postal codes? Upload a CSV file with your postal
                    codes.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upload CSV
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {geoLevel !== "global" && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {geoLevel === "country" &&
              "Select specific countries you want to target"}
            {geoLevel === "state" &&
              "Select states/provinces within countries"}
            {geoLevel === "city" && "Target specific cities within states"}
            {geoLevel === "postal" && "Target specific postal/ZIP codes"}
          </p>
        </div>
      )}
    </div>
  );
}