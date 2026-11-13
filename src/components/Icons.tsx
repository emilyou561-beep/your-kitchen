import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 22, children, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const FridgeIcon = (p: P) => (
  <Base {...p}>
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    <path d="M5 9h14M8.5 5.5v1.5M8.5 12v3" />
  </Base>
)
export const BowlIcon = (p: P) => (
  <Base {...p}>
    <path d="M3 12h18a9 9 0 0 1-18 0z" />
    <path d="M9 8c0-2 2-2 2-4M14 8c0-2 2-2 2-4" />
  </Base>
)
export const ReceiptIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 2.5h12v19l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </Base>
)
export const ArrowRight = (p: P) => (
  <Base strokeWidth={2.6} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
)
export const Plus = (p: P) => (
  <Base strokeWidth={2.6} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
)
export const Minus = (p: P) => (
  <Base strokeWidth={2.6} {...p}>
    <path d="M5 12h14" />
  </Base>
)
export const Check = (p: P) => (
  <Base strokeWidth={2.8} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
)
export const Close = (p: P) => (
  <Base strokeWidth={2.4} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
)
export const Search = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Base>
)
export const Clock = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
)
export const MenuIcon = (p: P) => (
  <Base strokeWidth={2.4} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
)
export const Trash = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" />
  </Base>
)
export const Printer = (p: P) => (
  <Base {...p}>
    <path d="M7 9V3h10v6M7 17H4v-7h16v7h-3" />
    <rect x="7" y="14" width="10" height="7" />
  </Base>
)

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <circle cx="22" cy="22" r="20" fill="#234D76" stroke="#28251F" strokeWidth="3" />
      <path d="M9 21h26a13 13 0 0 1-26 0z" fill="#F5E8CD" stroke="#28251F" strokeWidth="2.5" />
      <path d="M16 14c0-3 3-3 3-6M23 14c0-3 3-3 3-6" fill="none" stroke="#D6A642" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
