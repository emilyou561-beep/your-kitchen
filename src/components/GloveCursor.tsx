import { forwardRef } from 'react'

interface GloveCursorProps {
  holding: boolean
  visible: boolean
}

export const GloveCursor = forwardRef<HTMLDivElement, GloveCursorProps>(function GloveCursor({ holding, visible }, ref) {
  return (
    <div
      ref={ref}
      className="yk-glove-cursor"
      data-holding={holding}
      data-visible={visible}
      aria-hidden="true"
    >
      <svg className="yk-glove-cursor__art" viewBox="0 0 80 88" role="presentation">
        <defs>
          <linearGradient id="yk-glove-shade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fff8e8" />
            <stop offset="0.62" stopColor="#f0d9b8" />
            <stop offset="1" stopColor="#d8b58f" />
          </linearGradient>
          <linearGradient id="yk-glove-cuff" x1="0" x2="1">
            <stop offset="0" stopColor="#d6a92d" />
            <stop offset="0.5" stopColor="#f1cc53" />
            <stop offset="1" stopColor="#b88620" />
          </linearGradient>
        </defs>
        <path d="M10 58c7-5 10-12 11-22l2-21c.4-4 6-4 6 0v14l2-23c.4-5 7-5 7 0v22l2-18c.4-4 7-4 7 0v21l3-13c1-4 7-3 7 1l-2 25c-1 11-5 19-14 25l-9 6-15-5Z" fill="url(#yk-glove-shade)" stroke="#29251f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M10 58c4-2 8-2 12 0l14 8 8-4c7-4 12-2 14 2l2 4-27 15-26-8Z" fill="url(#yk-glove-shade)" stroke="#29251f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M7 71 34 83l-7 4-27-12Z" fill="url(#yk-glove-cuff)" stroke="#29251f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M25 41c4 2 8 2 12 0M40 40c4 2 7 2 10 0" fill="none" stroke="#bc9674" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
})
