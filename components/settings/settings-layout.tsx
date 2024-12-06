// components/settings/settings-layout.tsx

'use client'

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    value: "personal",
    href: "/settings/personal",
    label: "Personal Information",
    icon: User,
  },
  {
    value: "notifications",
    href: "/settings/notifications",
    label: "Notifications",
    icon: Bell,
  },
];

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const currentTab = pathname.split('/').pop() || 'personal';
  
  const handleTabChange = (value: string) => {
    router.push(`/settings/${value}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Tabs for MD and up */}
        <div className="hidden md:block">
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile Select */}
        <div className="md:hidden">
          <Select value={currentTab} onValueChange={handleTabChange}>
            <SelectTrigger>
              <SelectValue>
                {tabs.find((tab) => tab.value === currentTab)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <SelectItem key={tab.value} value={tab.value}>
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}