const AVATARS = [
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=32',
  'https://i.pravatar.cc/80?img=47',
] as const

export function HappyCustomers() {
  return (
    <div className="flex items-center gap-3 text-white drop-shadow-md">
      <div className="flex -space-x-3">
        {AVATARS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="h-11 w-11 rounded-full border-2 border-white object-cover"
            style={{ zIndex: AVATARS.length - i }}
          />
        ))}
      </div>
      <p className="text-sm font-medium leading-tight">
        800+ Happy
        <br />
        Customers
      </p>
    </div>
  )
}
