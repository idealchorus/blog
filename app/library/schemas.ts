import * as z from "zod"

function parseInZone (value: string) {
  const plainDate = Temporal.PlainDate.from(value)
  const zonedDate = plainDate.toZonedDateTime({ timeZone: 'America/Phoenix', plainTime: '00:00' })
  
  return new Date(zonedDate.epochMilliseconds)
}

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdDate: z.string().transform(parseInZone),
  editedDate: z.string().transform(parseInZone).optional(),
})

export type PostFrontmatterType = z.infer<typeof postFrontmatterSchema>

export const postSummarySchema = postFrontmatterSchema.extend({
  slug: z.string(),
  createdDate: z.date(),
  editedDate: z.date().optional(),
})

export type PostSummaryType = z.infer<typeof postSummarySchema>
