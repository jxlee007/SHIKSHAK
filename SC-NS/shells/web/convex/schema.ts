import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Clerk user ID
    externalId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(), // store Date.now()
  })
    .index("by_externalId", ["externalId"])
    .index("by_email", ["email"]),

  chat_sessions: defineTable({
    userId: v.id("users"),
    title: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  messages: defineTable({
    sessionId: v.id("chat_sessions"),
    sender: v.string(), // "user" or "assistant"
    content: v.string(),
    createdAt: v.number(),
  }).index("by_sessionId", ["sessionId"]),
});
