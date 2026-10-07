export function SocialRail() {
  return (
    <div className="flex flex-col items-center gap-4 text-white/90">
      <span className="h-24 w-px bg-white/60" />
      <a href="#" aria-label="Facebook" className="hover:opacity-80">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.7v8h3.4Z" />
        </svg>
      </a>
      <a href="#" aria-label="Twitter" className="hover:opacity-80">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M22 5.9c-.7.3-1.5.6-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.8 9c0 .3 0 .6.1.9A11.6 11.6 0 0 1 3.2 4.6a4.1 4.1 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1 .1h-.7a4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.1a11.6 11.6 0 0 0 6.3 1.9c7.6 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2Z" />
        </svg>
      </a>
      <a href="#" aria-label="Instagram" className="hover:opacity-80">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      </a>
    </div>
  )
}
