// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Authentication fields
    clerkUserId: v.string(),
    email: v.string(),

    // Basic user info
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),

    // Role and status
    role: v.union(v.literal("publisher"), v.literal("advertiser")),
    onboardingComplete: v.boolean(),

    // Business information
    hasCompany: v.optional(v.boolean()),
    companyName: v.optional(v.string()),
    companyWebsite: v.optional(v.string()),
    companySize: v.optional(v.string()),
    taxId: v.optional(v.string()),

    // Job information (for advertisers)
    jobTitle: v.optional(v.string()),

    // Industry information
    industries: v.optional(v.array(v.string())),
    subIndustries: v.optional(v.array(v.string())),

    // Publisher specific fields
    marketingMethods: v.optional(v.array(v.string())),
    leadTypes: v.optional(v.array(v.string())),
    dailyLeadVolume: v.optional(v.string()),
    certifications: v.optional(v.array(v.string())),

    // Advertiser specific fields
    targetGeographies: v.optional(v.array(v.string())),
    monthlyBudget: v.optional(v.string()),
    leadPreferences: v.optional(v.array(v.string())),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),
});
