import { type ReactNode, isValidElement } from "react"
import * as z from "zod"

const nibbleLiteralSchema = z.literal("nibble")
const byteLiteralSchema = z.literal("byte")

const staticLiteralSchema = z.literal("static")
const dynamicLiteralSchema = z.literal("dynamic")

const basePostFrontMatterSchema = z.object({
	slug: z.string(),
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
		body: z.any(),
	}),
	byteFrontMatterSchema,
])

export type PostSummaryType = z.infer<typeof postSummarySchema>
