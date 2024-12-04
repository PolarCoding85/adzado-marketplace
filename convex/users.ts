// convex/users.ts

import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";

// Get all users
export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Get the 5 most recent users
export const getRecentUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").take(5);
  },
});

// Get the current user if they are authenticated, otherwise null
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkId))
      .unique();
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    clerkUserId: v.string(),
    role: v.union(v.literal("publisher"), v.literal("advertiser")),
  },
  handler: async (ctx, { clerkUserId, role }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { role });
    return user._id;
  },
});

// Update onboarding status
export const updateOnboardingStatus = mutation({
  args: {
    clerkUserId: v.string(),
    onboardingComplete: v.boolean(),
  },
  handler: async (ctx, { clerkUserId, onboardingComplete }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { onboardingComplete });
    return user._id;
  },
});

// Upsert a user from Clerk
export const upsertFromClerk = internalMutation({
  args: {
    data: v.any() as Validator<UserJSON>,
    role: v.optional(v.union(v.literal("publisher"), v.literal("advertiser"))),
  },
  async handler(ctx, { data, role }) {
    const now = Date.now();

    // Add debugging
    console.log("Upserting user with role:", role);

    const userAttributes = {
      email: data.email_addresses[0].email_address,
      clerkUserId: data.id,
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
      imageUrl: data.image_url ?? undefined,
      onboardingComplete: false,
      // Only default to publisher if role is explicitly undefined
      role: role ?? undefined,

      // Phone number and company info start as undefined
      phoneNumber: undefined,
      hasCompany: undefined,
      companyName: undefined,
      companyWebsite: undefined,
      companySize: undefined,
      taxId: undefined,

      // Job and industry info start as undefined
      jobTitle: undefined,
      industries: undefined,
      subIndustries: undefined,

      // Publisher specific fields start as undefined
      marketingMethods: undefined,
      leadTypes: undefined,
      dailyLeadVolume: undefined,
      certifications: undefined,

      // Advertiser specific fields start as undefined
      targetGeographies: undefined,
      monthlyBudget: undefined,
      leadPreferences: undefined,

      // Required metadata fields
      createdAt: now,
      updatedAt: now,
    };

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", data.id))
      .unique();

    if (existingUser === null) {
      // Create new user
      const userId = await ctx.db.insert("users", userAttributes);
      return userId;
    } else {
      // Update existing user but preserve existing values
      const { createdAt, ...updateAttributes } = userAttributes;
      await ctx.db.patch(existingUser._id, updateAttributes);
      return existingUser._id;
    }
  },
});

// Save advertiser onboarding
export const saveAdvertiserOnboarding = mutation({
  args: {
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    hasCompany: v.optional(v.boolean()),
    companyName: v.optional(v.string()),
    companyWebsite: v.optional(v.string()),
    companySize: v.optional(v.string()),
    industries: v.optional(v.array(v.string())),
    subIndustries: v.optional(v.array(v.string())),
    leadPreferences: v.optional(v.array(v.string())),
    targetGeographies: v.optional(v.array(v.string())),
    monthlyBudget: v.optional(v.string()),
    onboardingComplete: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId, ...updateData } = args;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Update the user record with all the onboarding data
    const userId = await ctx.db.patch(existingUser._id, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Save publisher onboarding
export const savePublisherOnboarding = mutation({
  args: {
    clerkUserId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phoneNumber: v.optional(v.string()),
    hasCompany: v.optional(v.boolean()),
    companyName: v.optional(v.string()),
    taxId: v.optional(v.string()),
    website: v.optional(v.string()),
    industries: v.optional(v.array(v.string())),
    subIndustries: v.optional(v.array(v.string())),
    marketingMethods: v.optional(v.array(v.string())),
    leadTypes: v.optional(v.array(v.string())),
    dailyLeadVolume: v.optional(v.string()),
    certifications: v.optional(v.array(v.string())),
    additionalInfo: v.optional(v.string()),
    onboardingComplete: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { clerkUserId, ...updateData } = args;

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Update the user record with all the onboarding data
    const userId = await ctx.db.patch(existingUser._id, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Delete a user from Clerk
export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByClerkUserId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `User can't be deleted as there is no user with Clerk user Id: ${clerkUserId}`
      );
    }
  },
});

// Get the current user if they are authenticated, otherwise throw an error
export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

// Get the current user if they are authenticated, otherwise null
export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByClerkUserId(ctx, identity.subject);
}

// Get a user by their Clerk user ID
async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}
