import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/tactile'

/**
 * Red hanko stamp that slams onto a card the first time it scrolls into view.
 * Purely decorative: the status badge carries the meaning for assistive tech.
 */
export function Stamp({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [down, setDown] = useState(prefersReducedMotion)

  useEffect(() => {
    if (down || !ref.current) return
    const el = ref.current
    if (typeof IntersectionObserver === 'undefined') {
      setDown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [down])

  return (
    <div ref={ref} className="yk-stamp" data-down={down} style={{ animationDelay: `${delay}ms` }} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="yk-ink-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.75" result="holes" />
            <feComposite in="SourceGraphic" in2="holes" operator="in" />
          </filter>
        </defs>
        <g filter="url(#yk-ink-rough)" fill="none" stroke="#C8261E">
          <circle cx="50" cy="50" r="44" strokeWidth="6" />
          <circle cx="50" cy="50" r="36" strokeWidth="2" />
          <text x="50" y="47" textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize="30" fill="#C8261E" stroke="none">
            可
          </text>
          <text x="50" y="70" textAnchor="middle" fontFamily="'Zen Maru Gothic', sans-serif" fontWeight="900" fontSize="13" letterSpacing="1.5" fill="#C8261E" stroke="none">
            READY
          </text>
        </g>
      </svg>
    </div>
  )
}
