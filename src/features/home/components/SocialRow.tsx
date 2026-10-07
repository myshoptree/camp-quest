/**
 * Horizontal row of social icons, meant to live below the hero CTA.
 * Replaces the former vertical rail on the right edge, which cramped the
 * hero on mobile.
 */
export function SocialRow() {
  return (
    <ul className="mt-10 flex items-center justify-center gap-3">
      <li>
        <SocialLink label="Facebook" href="#">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.7v8h3.4Z" />
          </svg>
        </SocialLink>
      </li>
      <li>
        <SocialLink label="Twitter" href="#">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M22 5.9c-.7.3-1.5.6-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.8 9c0 .3 0 .6.1.9A11.6 11.6 0 0 1 3.2 4.6a4.1 4.1 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1 .1h-.7a4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.1a11.6 11.6 0 0 0 6.3 1.9c7.6 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2Z" />
          </svg>
        </SocialLink>
      </li>
      <li>
        <SocialLink label="Instagram" href="#">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </SocialLink>
      </li>
    </ul>
  )
}

function SocialLink({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
    >
      {children}
    </a>
  )
}
