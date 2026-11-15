import { forwardRef } from 'react'

interface ChopsticksCursorProps {
  holding: boolean
  visible: boolean
}

/** A pair of matching lacquered chopsticks: broad ends up, fine tips down. */
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
      <svg className="yk-chopsticks-cursor__art" viewBox="0 0 100 124" role="presentation">
        <defs>
          <linearGradient id="yk-chopstick-lacquer" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#b52e28" />
            <stop offset="0.48" stopColor="#7f191d" />
            <stop offset="1" stopColor="#4f1016" />
          </linearGradient>
        </defs>
        <path
          className="yk-chopsticks-cursor__left"
          d="M26 8 40 5Q43 5 44 9l10 106-5 4-5-4L24 12Q23 8 26 8Z"
          fill="url(#yk-chopstick-lacquer)"
          stroke="#2c241c"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          className="yk-chopsticks-cursor__right"
          d="M58 5h15q3 0 2 4L56 111l-5 5-5-5L57 9q0-4 1-4Z"
          fill="url(#yk-chopstick-lacquer)"
          stroke="#2c241c"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M27 10h14M59 8h14" stroke="#df6e55" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <path d="M49 112 51 116 54 112" fill="none" stroke="#2c241c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
})
