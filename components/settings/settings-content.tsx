// components/settings/settings-content.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Bell } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { TIMEZONES } from "@/constants/timezones";

// Phone number validation regex
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export function Settings() {
  const { user: clerkUser } = useUser();
  
  // Get user data
  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id || "",
  });

  // Get notification settings
  const notifications = useQuery(api.notifications.getUserNotifications, {
    userId: user?._id as Id<"users">,
  });

  // Mutations
  const updateProfile = useMutation(api.users.updateProfile);
  const updateNotifications = useMutation(api.notifications.upsertNotifications);

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    timezone: "UTC",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    security: true,
    updates: true,
    offers: true,
    reports: true,
  });

  // Update form data when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        timezone: user.timezone || "UTC",
      });
      console.log("Setting timezone to:", user.timezone); // Debug log
    }
  }, [user]);

  // Update notification settings when loaded
  useEffect(() => {
    if (notifications) {
      setNotificationSettings(notifications);
    }
  }, [notifications]);

  // Handle input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Handle notification changes
  const handleNotificationChange = async (field: keyof typeof notificationSettings) => {
    if (!user?._id) return;

    const newSettings = {
      ...notificationSettings,
      [field]: !notificationSettings[field]
    };

    try {
      const promise = updateNotifications({
        userId: user._id,
        ...newSettings
      });

      toast.promise(promise, {
        loading: 'Updating notifications...',
        success: () => {
          setNotificationSettings(newSettings);
          return 'Notification preferences updated';
        },
        error: 'Failed to update notification settings',
      });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number if provided
    if (formData.phoneNumber && !PHONE_REGEX.test(formData.phoneNumber)) {
      toast.error('Invalid phone number format');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        timezone: formData.timezone,
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <form onSubmit={handleSubmit}>
            <Card className="p-6 max-w-4xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your personal details
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange("firstName")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange("lastName")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={handleInputChange("phoneNumber")}
                    />
                    <p className="text-sm text-muted-foreground">
                      Format: +[country code][number] (e.g., +12125551234)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      key={formData.timezone} // Force re-render when timezone changes
                      defaultValue={formData.timezone}
                      value={formData.timezone}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, timezone: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {TIMEZONES.find(tz => tz.value === formData.timezone)?.label || "Select timezone"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((timezone) => (
                          <SelectItem key={timezone.value} value={timezone.value}>
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="min-w-[100px]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-xs mr-2"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6 max-w-4xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Choose what updates you want to receive
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about security updates and unusual activity
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.security}
                    onCheckedChange={() => handleNotificationChange("security")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      News about product and feature updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.updates}
                    onCheckedChange={() => handleNotificationChange("updates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Offer Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new offers and opportunities
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.offers}
                    onCheckedChange={() => handleNotificationChange("offers")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reports & Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly reports and performance analytics
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reports}
                    onCheckedChange={() => handleNotificationChange("reports")}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}