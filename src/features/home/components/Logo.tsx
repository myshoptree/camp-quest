export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 26 L13 10 L18 18 L22 13 L28 26 Z" />
      </svg>
      <span
        className="text-2xl leading-none"
        style={{ fontFamily: 'var(--font-brand)' }}
      >
        CampQuest
      </span>
    </div>
  )
}
