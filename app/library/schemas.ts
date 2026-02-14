import * as z from "zod"

const staticLiteralSchema = z.literal("static")
const dynamicLiteralSchema = z.literal("dynamic")

export const postFrontMatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  contentType: z.union([staticLiteralSchema, dynamicLiteralSchema]),
  createdDate: z.string().or(z.date()),
  editedDate: z.string().or(z.date()).optional(),
})

export const postSummarySchema = postFrontMatterSchema.extend({
  slug: z.string(),
})

export type PostSummaryType = z.infer<typeof postSummarySchema>
