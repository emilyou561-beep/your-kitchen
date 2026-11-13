/**
 * Unit conversion for kitchen quantities. Only units in the same family convert;
 * everything else (pc, pack, bunch, bowl, rice cup…) compares only with itself.
 */
const FAMILIES: Record<string, Record<string, number>> = {
  mass: { g: 1, kg: 1000 },
  volume: { ml: 1, L: 1000, tbsp: 15, tsp: 5 },
}

function familyOf(unit: string): [string, number] | null {
  for (const [name, units] of Object.entries(FAMILIES)) {
    if (unit in units) return [name, units[unit]]
  }
  return null
}

/** Convert qty from one unit to another. Returns null when not convertible. */
export function convert(qty: number, from: string, to: string): number | null {
  if (from === to) return qty
  const a = familyOf(from)
  const b = familyOf(to)
  if (!a || !b || a[0] !== b[0]) return null
  return (qty * a[1]) / b[1]
}

/** Round to a friendly kitchen number: whole numbers above 10, one decimal below. */
export function tidy(n: number): number {
  if (!Number.isFinite(n)) return 0
  if (Math.abs(n) >= 10) return Math.round(n)
  return Math.round(n * 10) / 10
}

/** Quantities that only make sense as whole things (eggs, packs) round up. */
const WHOLE_UNITS = new Set(['pc', 'pack', 'bunch'])
export function toBuy(n: number, unit: string): number {
  return WHOLE_UNITS.has(unit) ? Math.ceil(n - 1e-9) : tidy(n)
}
