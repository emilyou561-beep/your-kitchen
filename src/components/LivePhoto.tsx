import { useEffect, useId, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { prefersReducedMotion } from '../lib/tactile'

/** Where the soup sits in the photo, as fractions of width/height. */
export interface SoupArea {
  cx: number
  cy: number
  rx: number
  ry: number
}

/** Default: bowl centred in frame — fits both overhead and three-quarter shots reasonably. */
export const DEFAULT_SOUP: SoupArea = { cx: 0.5, cy: 0.5, rx: 0.29, ry: 0.36 }

/**
 * A photo that feels alive:
 *  - the soup surface gently ripples (SVG turbulence + displacement, masked to the soup only)
 *  - a soft sheen drifts across the broth
 *  - steam rises from the bowl
 *  - the whole photo tilts toward the pointer
 * `mode="hover"` only animates while hovered/focused (cards); `"always"` runs continuously (detail page).
 * Everything is off under prefers-reduced-motion — the plain photo shows.
 */
export function LivePhoto({
  src,
  soup = DEFAULT_SOUP,
  aspect,
  mode = 'always',
  onError,
}: {
  src: string
  soup?: SoupArea
  /** height / width of the frame, e.g. 0.6 for 5:3. */
  aspect: number
  mode?: 'always' | 'hover'
  onError?: () => void
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const wrap = useRef<HTMLDivElement>(null)
  const turb = useRef<SVGFETurbulenceElement>(null)
  const disp = useRef<SVGFEDisplacementMapElement>(null)
  const [reduced] = useState(prefersReducedMotion)
  const [active, setActive] = useState(mode === 'always')

  // Ripple loop: drift the turbulence field so the broth moves, only while active & visible.
  useEffect(() => {
    if (reduced || !active) return
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    if (wrap.current) io.observe(wrap.current)
    const t0 = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = (now - t0) / 1000
      const fx = 0.0045 + Math.sin(t * 0.7) * 0.001
      const fy = 0.012 + Math.cos(t * 0.9) * 0.0025
      turb.current?.setAttribute('baseFrequency', `${fx.toFixed(4)} ${fy.toFixed(4)}`)
      // a slow "slosh": the ripple strength swells and settles
      const s = 5 + Math.sin(t * 1.3) * 2 + Math.sin(t * 0.37) * 1.5
      disp.current?.setAttribute('scale', s.toFixed(2))
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [active, reduced])

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType === 'touch' || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    wrap.current.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`)
    wrap.current.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`)
    wrap.current.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
  }
  const reset = () => {
    wrap.current?.style.setProperty('--rx', '0deg')
    wrap.current?.style.setProperty('--ry', '0deg')
    if (mode === 'hover') setActive(false)
  }

  const W = 1000
  const H = 1000 * aspect
  const cx = soup.cx * W
  const cy = soup.cy * H
  const rx = soup.rx * W
  const ry = soup.ry * H

  return (
    <div
      ref={wrap}
      className="yk-live"
      data-active={active && !reduced}
      onPointerMove={tilt}
      onPointerEnter={() => mode === 'hover' && setActive(true)}
      onPointerLeave={reset}
      onFocus={() => mode === 'hover' && setActive(true)}
      onBlur={reset}
    >
      <div className="yk-live__tilt">
        <img className="yk-live__img" src={src} alt="" loading="lazy" onError={onError} />
        {!reduced && (
          <svg className="yk-live__fx" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <filter id={`rip-${uid}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.0045 0.012" numOctaves={2} seed={3} result="n" />
                <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale={5} xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <radialGradient id={`feather-${uid}`}>
                <stop offset="0.72" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </radialGradient>
              <mask id={`soup-${uid}`} maskContentUnits="userSpaceOnUse">
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#feather-${uid})`} />
              </mask>
              <linearGradient id={`sheen-${uid}`} x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#FFF3D6" stopOpacity="0.32" />
                <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {active && (
              <g mask={`url(#soup-${uid})`}>
                <image href={src} x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" filter={`url(#rip-${uid})`} />
                <rect className="yk-live__sheen" x={cx - rx * 2} y={cy - ry} width={rx * 2} height={ry * 2} fill={`url(#sheen-${uid})`} />
              </g>
            )}
          </svg>
        )}
        {!reduced && (
          <div className="yk-live__steam" style={{ left: `${soup.cx * 100}%`, top: `${(soup.cy - soup.ry) * 100}%` }} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <div className="yk-live__glare" aria-hidden="true" />
      </div>
    </div>
  )
}
