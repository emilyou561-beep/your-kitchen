import { forwardRef } from 'react'

interface ChopsticksCursorProps {
  holding: boolean
  visible: boolean
}

/** A quiet, nostalgic pair of lacquered chopsticks that replaces the OS cursor. */
export const ChopsticksCursor = forwardRef<HTMLDivElement, ChopsticksCursorProps>(function ChopsticksCursor(
  { holding, visible },
  ref,
) {
  return (
    <div
      ref={ref}
      className="yk-chopsticks-cursor"
      data-holding={holding}
      data-visible={visible}
      aria-hidden="true"
    >
      <svg className="yk-chopsticks-cursor__art" viewBox="0 0 82 96" role="presentation">
        <defs>
          <linearGradient id="yk-chopstick-red" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8c1e1b" />
            <stop offset="0.5" stopColor="#d44732" />
            <stop offset="1" stopColor="#731418" />
          </linearGradient>
          <linearGradient id="yk-chopstick-wood" x1="0" x2="1">
            <stop offset="0" stopColor="#b46e2d" />
            <stop offset="0.5" stopColor="#f0bd61" />
            <stop offset="1" stopColor="#8a4d21" />
          </linearGradient>
        </defs>
        <path d="M19 8 55 82" fill="none" stroke="#2c241c" strokeWidth="8" strokeLinecap="round" />
        <path d="M19 8 55 82" fill="none" stroke="url(#yk-chopstick-red)" strokeWidth="5" strokeLinecap="round" />
        <path d="M37 7 65 79" fill="none" stroke="#2c241c" strokeWidth="8" strokeLinecap="round" />
        <path d="M37 7 65 79" fill="none" stroke="url(#yk-chopstick-wood)" strokeWidth="5" strokeLinecap="round" />
        <path d="M14 5h10M32 4h10" stroke="#f3d27d" strokeWidth="3" strokeLinecap="round" />
        <circle cx="58" cy="84" r="4" fill="#f3d27d" stroke="#2c241c" strokeWidth="2" />
      </svg>
    </div>
  )
})
