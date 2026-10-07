import { Link } from '@tanstack/react-router'
import { pickIntl, type ContentNode, type ContentTree, type IntlString } from '../data/schemas'
import { useLocale } from '../../../i18n/useLocale'
import type { Locale } from '../../../i18n'

/**
 * Recursive renderer: resolves ContentNode.type → UI primitive, and
 * every IntlString → plain string for the active locale.
 */
export function ContentRenderer({ nodes }: { nodes: ContentTree }) {
  const { locale } = useLocale()
  return (
    <div className="flex flex-col gap-6">
      {nodes.map((node, i) => (
        <Node key={i} node={node} locale={locale} />
      ))}
    </div>
  )
}

function Node({ node, locale }: { node: ContentNode; locale: Locale }) {
  switch (node.type) {
    case 'heading':
      return <Heading level={node.level} text={pickIntl(node.text, locale)} />
    case 'paragraph':
      return <Paragraph text={pickIntl(node.text, locale)} />
    case 'image':
      return (
        <Image
          src={node.src}
          alt={pickIntl(node.alt, locale)}
          caption={node.caption ? pickIntl(node.caption, locale) : undefined}
        />
      )
    case 'list':
      return (
        <List
          variant={node.variant}
          items={node.items.map((it: IntlString) => pickIntl(it, locale))}
        />
      )
    case 'callout':
      return (
        <Callout
          tone={node.tone}
          title={node.title ? pickIntl(node.title, locale) : undefined}
          text={pickIntl(node.text, locale)}
        />
      )
    case 'button':
      return (
        <Button
          label={pickIntl(node.label, locale)}
          href={node.href}
          variant={node.variant}
        />
      )
    case 'divider':
      return <Divider />
    case 'section':
      return (
        <Section title={node.title ? pickIntl(node.title, locale) : undefined}>
          <ContentRenderer nodes={node.children} />
        </Section>
      )
  }
}

// --- UI primitives (plain-string props, no intl concern) ---------------

function Heading({ level, text }: { level: 1 | 2 | 3 | 4; text: string }) {
  const common = 'font-display font-semibold tracking-tight text-ink'
  if (level === 1) return <h1 className={`${common} text-4xl md:text-5xl`}>{text}</h1>
  if (level === 2) return <h2 className={`${common} mt-4 text-3xl md:text-4xl`}>{text}</h2>
  if (level === 3) return <h3 className={`${common} mt-2 text-2xl`}>{text}</h3>
  return <h4 className={`${common} mt-2 text-xl`}>{text}</h4>
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-line text-lg leading-relaxed text-ink/80">
      {text}
    </p>
  )
}

function Image({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-2">
      <div className="overflow-hidden rounded-3xl">
        <img src={src} alt={alt} className="aspect-[16/9] w-full object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-ink/50">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function List({
  variant,
  items,
}: {
  variant: 'bulleted' | 'numbered' | 'checklist'
  items: Array<string>
}) {
  if (variant === 'numbered') {
    return (
      <ol className="ml-6 list-decimal space-y-2 text-lg text-ink/80 marker:text-ink/40">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ol>
    )
  }
  if (variant === 'checklist') {
    return (
      <ul className="space-y-2 text-lg text-ink/80">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-1.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded border border-ink/30"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul className="ml-6 list-disc space-y-2 text-lg text-ink/80 marker:text-ink/40">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

function Callout({
  tone,
  title,
  text,
}: {
  tone: 'info' | 'warning' | 'tip'
  title?: string
  text: string
}) {
  const toneStyles =
    tone === 'warning'
      ? 'border-ember/40 bg-ember/5 text-ink'
      : tone === 'tip'
        ? 'border-ink/15 bg-neutral-50 text-ink'
        : 'border-black/10 bg-neutral-50 text-ink'
  return (
    <aside
      className={`rounded-2xl border px-5 py-4 text-base leading-relaxed ${toneStyles}`}
    >
      {title ? (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink/60">
          {title}
        </p>
      ) : null}
      <p>{text}</p>
    </aside>
  )
}

function Button({
  label,
  href,
  variant,
}: {
  label: string
  href: string
  variant: 'primary' | 'ghost'
}) {
  const styles =
    variant === 'ghost'
      ? 'border border-ink/15 text-ink hover:bg-black/5'
      : 'bg-ink text-white hover:bg-ink-soft'
  const className = `inline-flex w-fit items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${styles}`

  // Internal paths route through the client-side Link so the basepath
  // (/camp-quest in prod) is applied automatically; external URLs stay as <a>.
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    )
  }
  return (
    <a href={href} className={className} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}

function Divider() {
  return <hr className="my-4 border-t border-black/10" />
}

function Section({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-4 flex flex-col gap-6">
      {title ? (
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
