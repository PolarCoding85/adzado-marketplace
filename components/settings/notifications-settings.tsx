// components/settings/notification-settings.tsx

"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Id } from "@/convex/_generated/dataModel";

export function NotificationSettings() {
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
  const updateNotifications = useMutation(api.notifications.upsertNotifications);

  const [notificationSettings, setNotificationSettings] = useState({
    security: true,
    updates: true,
    offers: true,
    reports: true,
  });

  // Update notification settings when loaded
  useEffect(() => {
    if (notifications) {
      setNotificationSettings(notifications);
    }
  }, [notifications]);

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6">
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
  );
}