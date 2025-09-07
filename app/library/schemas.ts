import * as z from "zod"

const nibbleLiteralSchema = z.literal("nibble")
const byteLiteralSchema = z.literal("byte")

const staticLiteralSchema = z.literal("static")
const dynamicLiteralSchema = z.literal("dynamic")

const basePostFrontMatterSchema = z.object({
	createdDate: z.string(),
	editedDate: z.string().optional(),
	postType: z.union([nibbleLiteralSchema, byteLiteralSchema]),
	contentType: z.union([staticLiteralSchema, dynamicLiteralSchema]),
})

const nibbleFrontMatterSchema = basePostFrontMatterSchema.extend({
	postType: nibbleLiteralSchema,
})

const byteFrontMatterSchema = basePostFrontMatterSchema.extend({
	postType: byteLiteralSchema,
	title: z.string(),
	description: z.string(),
})

export const postFrontMatterSchema = z.discriminatedUnion("postType", [
	nibbleFrontMatterSchema,
	byteFrontMatterSchema,
])

export const postSummarySchema = z.discriminatedUnion("postType", [
	nibbleFrontMatterSchema.extend({
		slug: z.string(),
		body: z.any(),
	}),
	byteFrontMatterSchema.extend({
		slug: z.string(),
	}),
])

export type PostSummaryType = z.infer<typeof postSummarySchema>
