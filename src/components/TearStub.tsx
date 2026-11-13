import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { buzz, prefersReducedMotion } from '../lib/tactile'

const THRESHOLD = 60

/**
 * Perforated stub at the foot of the receipt. Pull it down (or press it) to tear it off —
 * that "finishes the trip": bought items go into My Kitchen.
 */
export function TearStub({ count, onTear }: { count: number; onTear: () => void }) {
  const [dy, setDy] = useState(0)
  const [state, setState] = useState<'idle' | 'drag' | 'torn'>('idle')
  const start = useRef<{ y: number } | null>(null)
  const dragged = useRef(false)

  const tear = () => {
    if (state === 'torn') return
    buzz(18)
    if (prefersReducedMotion()) {
      onTear()
      return
    }
    setState('torn')
  }

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    start.current = { y: e.clientY }
    dragged.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
    setState('drag')
  }
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!start.current) return
    const d = Math.max(0, e.clientY - start.current.y)
    if (d > 4) dragged.current = true
    setDy(d)
    if (d > THRESHOLD) {
      start.current = null
      tear()
    }
  }
  const onUp = () => {
    start.current = null
    // functional update: a tear that fired mid-drag must not be undone by the release
    setState((st) => (st === 'drag' ? 'idle' : st))
    setDy(0)
  }

  const pull = Math.min(dy, THRESHOLD)
  const style =
    state === 'drag'
      ? { transform: `translateY(${pull * 0.7}px) rotate(${pull * 0.06}deg)`, transition: 'none' }
      : undefined

  return (
    <button
      type="button"
      className="yk-stub"
      data-state={state}
      style={style}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onClick={() => {
        // A drag that was released early must not count as a click.
        if (dragged.current) {
          dragged.current = false
          return
        }
        tear()
      }}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && state === 'torn') {
          onTear()
          setState('idle')
          setDy(0)
        }
      }}
    >
      <span className="yk-stub__perf" aria-hidden="true">
        ✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </span>
      <span className="yk-stub__main">
        <strong>
          {count} bought
        </strong>
        <span>Pull down to tear off &amp; put away</span>
      </span>
      <span className="yk-stub__grip" aria-hidden="true">
        ↓
      </span>
    </button>
  )
}
