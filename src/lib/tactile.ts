/** Small helpers for tactile feedback. All of them no-op under reduced motion. */

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** A tiny buzz on devices that support it (most Android browsers; iOS Safari ignores it). */
export function buzz(ms = 10) {
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* unsupported */
  }
}

/** Replays a one-shot CSS animation class on an element. */
export function replay(el: Element | null, className: string) {
  if (!el) return
  el.classList.remove(className)
  // force reflow so the animation restarts
  void (el as HTMLElement).offsetWidth
  el.classList.add(className)
}

function isVisible(el: Element) {
  const r = el.getBoundingClientRect()
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth
}

/**
 * Throws a little ingredient chip from `from` to the first visible target along an arc,
 * then calls `onLand`. Targets are tried in order (e.g. fridge panel, then header link).
 */
export function flyTo(from: Element, targets: (Element | null)[], label: string, onLand?: (target: Element) => void) {
  const target = targets.find((t): t is Element => !!t && isVisible(t))
  if (!target) return
  if (prefersReducedMotion()) {
    onLand?.(target)
    return
  }
  const a = from.getBoundingClientRect()
  const b = target.getBoundingClientRect()
  const chip = document.createElement('div')
  chip.className = 'yk-fly'
  chip.textContent = label
  chip.setAttribute('aria-hidden', 'true')
  document.body.appendChild(chip)
  const cw = chip.offsetWidth
  const ch = chip.offsetHeight
  const x0 = a.left + a.width / 2 - cw / 2
  const y0 = a.top + a.height / 2 - ch / 2
  const x1 = b.left + b.width / 2 - cw / 2
  const y1 = b.top + b.height / 2 - ch / 2
  const lift = Math.min(160, Math.max(70, Math.abs(x1 - x0) * 0.35))
  const mx = (x0 + x1) / 2
  const my = Math.min(y0, y1) - lift
  const anim = chip.animate(
    [
      { transform: `translate(${x0}px, ${y0}px) scale(1) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${mx}px, ${my}px) scale(1.12) rotate(-14deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${x1}px, ${y1}px) scale(0.35) rotate(8deg)`, opacity: 0.9 },
    ],
    { duration: 560, easing: 'cubic-bezier(.3,.1,.3,1)' },
  )
  anim.onfinish = () => {
    chip.remove()
    onLand?.(target)
  }
}
