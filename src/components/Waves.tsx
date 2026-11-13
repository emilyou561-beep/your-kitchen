import { useId } from 'react'

/** Seigaiha (blue-sea wave) band. Purely decorative. */
export function Waves({ className = 'yk-waves' }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <pattern id={`sgh-${id}`} width="64" height="32" patternUnits="userSpaceOnUse">
          <rect width="64" height="32" fill="#1A3A5A" />
          <g fill="#1A3A5A" stroke="#F5E8CD" strokeWidth="2" strokeOpacity="0.45">
            <circle cx="0" cy="32" r="30" />
            <circle cx="0" cy="32" r="21" />
            <circle cx="0" cy="32" r="12" />
            <circle cx="64" cy="32" r="30" />
            <circle cx="64" cy="32" r="21" />
            <circle cx="64" cy="32" r="12" />
            <circle cx="32" cy="16" r="30" />
            <circle cx="32" cy="16" r="21" />
            <circle cx="32" cy="16" r="12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#sgh-${id})`} />
      <rect width="100%" height="3" fill="#28251F" />
    </svg>
  )
}
