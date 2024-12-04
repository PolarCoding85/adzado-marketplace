// convex/http.ts

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";

const http = httpRouter();

// Handle Clerk webhook events
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request);

    if (!event) {
      return new Response("Error occurred", { status: 400 });
    }

    switch (event.type) {
      case "user.created": {
        // Get the role from first OAuth provider or from the selectedRole in publicMetadata
        const role = event.data.public_metadata?.selectedRole as
          | "publisher"
          | "advertiser"
          | undefined;

        // Add debugging
        console.log(
          "Creating user with role:",
          role,
          "from metadata:",
          event.data.public_metadata
        );

        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: event.data,
          role: role ?? "publisher", // Only default to publisher if role is undefined
        });
        break;
      }
      case "user.updated":
        await ctx.runMutation(internal.users.upsertFromClerk, {
          data: event.data,
        });
        break;
      case "user.deleted": {
        const clerkUserId = event.data.id!;
        await ctx.runMutation(internal.users.deleteFromClerk, {
          clerkUserId,
        });
        break;
      }
      default:
        console.log("Ignored Clerk webhook event", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

// Validate a Clerk webhook request
async function validateRequest(req: Request): Promise<WebhookEvent | null> {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook event", error);
    return null;
  }
}

export default http;
