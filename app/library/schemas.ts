import * as z from "zod"

const staticLiteralSchema = z.literal("static")
const dynamicLiteralSchema = z.literal("dynamic")

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  contentType: z.union([staticLiteralSchema, dynamicLiteralSchema]),
  createdDate: z.string().or(z.date()).transform((maybeString) => (typeof maybeString === "string" ? new Date(maybeString) : maybeString)),
  editedDate: z.string().or(z.date()).optional().transform((maybeString) => (typeof maybeString === "string" ? new Date(maybeString) : maybeString)),
})

export const postSummarySchema = postFrontmatterSchema.extend({
  slug: z.string(),
})

export type PostSummaryType = z.infer<typeof postSummarySchema>
