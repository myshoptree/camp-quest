import { z } from 'zod'
import { SUPPORTED_LOCALES, type Locale } from '../../../i18n'

/**
 * Content tree primitives.
 *
 * All translatable strings are expressed inline as `IntlString`:
 *   { es: "Hola", en: "Hello" }
 *
 * Adding a new article/guide = add one JSON. Translating it = add a locale
 * key inside that same JSON. No UI code touched.
 *
 * Pipeline:
 *   CONTENT (JSON) → parseContent (zod) → ContentTree (MODEL)
 *     → <ContentRenderer locale /> → UI primitives (plain strings)
 */

// --- Intl primitive ----------------------------------------------------

const intlStringShape = Object.fromEntries(
  SUPPORTED_LOCALES.map((l) => [l, z.string().min(1)]),
) as Record<Locale, z.ZodString>

export const intlStringSchema = z.object(intlStringShape).strict()
export type IntlString = z.infer<typeof intlStringSchema>

const intlStringOptional = z
  .object(
    Object.fromEntries(
      SUPPORTED_LOCALES.map((l) => [l, z.string()]),
    ) as Record<Locale, z.ZodString>,
  )
  .partial()
export type IntlStringOptional = z.infer<typeof intlStringOptional>

/** Pick the active locale's string, fall back to any defined locale. */
export function pickIntl(
  value: IntlString | IntlStringOptional | undefined,
  locale: Locale,
): string {
  if (!value) return ''
  const direct = (value as Record<string, string | undefined>)[locale]
  if (direct) return direct
  for (const l of SUPPORTED_LOCALES) {
    const fallback = (value as Record<string, string | undefined>)[l]
    if (fallback) return fallback
  }
  return ''
}

// --- Content nodes -----------------------------------------------------

export const headingNodeSchema = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  text: intlStringSchema,
})

export const paragraphNodeSchema = z.object({
  type: z.literal('paragraph'),
  text: intlStringSchema,
})

export const imageNodeSchema = z.object({
  type: z.literal('image'),
  src: z.url(),
  alt: intlStringSchema,
  caption: intlStringSchema.optional(),
})

export const listNodeSchema = z.object({
  type: z.literal('list'),
  variant: z.enum(['bulleted', 'numbered', 'checklist']).default('bulleted'),
  items: z.array(intlStringSchema).min(1),
})

export const calloutNodeSchema = z.object({
  type: z.literal('callout'),
  tone: z.enum(['info', 'warning', 'tip']).default('info'),
  title: intlStringSchema.optional(),
  text: intlStringSchema,
})

export const buttonNodeSchema = z.object({
  type: z.literal('button'),
  label: intlStringSchema,
  href: z.string(),
  variant: z.enum(['primary', 'ghost']).default('primary'),
})

export const dividerNodeSchema = z.object({ type: z.literal('divider') })

export interface SectionNode {
  type: 'section'
  title?: IntlString
  children: Array<ContentNode>
}

export type ContentNode =
  | z.infer<typeof headingNodeSchema>
  | z.infer<typeof paragraphNodeSchema>
  | z.infer<typeof imageNodeSchema>
  | z.infer<typeof listNodeSchema>
  | z.infer<typeof calloutNodeSchema>
  | z.infer<typeof buttonNodeSchema>
  | z.infer<typeof dividerNodeSchema>
  | SectionNode

// Section is recursive — children may include more sections. We model this
// as `unknown` at the Zod type level and re-parse children lazily, which
// keeps the discriminatedUnion static-type-friendly.
export const sectionNodeSchema = z.object({
  type: z.literal('section'),
  title: intlStringSchema.optional(),
  children: z.array(z.lazy((): z.ZodType<ContentNode> => contentNodeSchema)),
})

export const contentNodeSchema: z.ZodType<ContentNode> = z.discriminatedUnion(
  'type',
  [
    headingNodeSchema,
    paragraphNodeSchema,
    imageNodeSchema,
    listNodeSchema,
    calloutNodeSchema,
    buttonNodeSchema,
    dividerNodeSchema,
    sectionNodeSchema,
  ],
) as z.ZodType<ContentNode>

export const contentTreeSchema = z.array(contentNodeSchema)
export type ContentTree = Array<ContentNode>

export function parseContent(raw: unknown): ContentTree {
  return contentTreeSchema.parse(raw)
}
