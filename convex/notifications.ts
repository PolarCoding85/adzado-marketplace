// convex/notifications.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user notifications
export const getUserNotifications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    // Return default values if no notifications found
    if (!notifications) {
      return {
        security: true,
        updates: true,
        offers: true,
        reports: true,
      };
    }

    return notifications;
  },
});

// Update or create user notifications
export const upsertNotifications = mutation({
  args: {
    userId: v.id("users"),
    security: v.boolean(),
    updates: v.boolean(),
    offers: v.boolean(),
    reports: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { userId, ...notificationSettings } = args;
    const existing = await ctx.db
      .query("notifications")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    const now = Date.now();

    if (existing) {
      // Update existing notifications
      return await ctx.db.patch(existing._id, {
        ...notificationSettings,
        updatedAt: now,
      });
    } else {
      // Create new notifications
      return await ctx.db.insert("notifications", {
        userId,
        ...notificationSettings,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});