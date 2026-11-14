/**
 * Parametric ramen illustrations — Showa print style, drawn at a believable scale.
 * Bowl rim is an ellipse centred (100, 60); everything in the soup is clipped to it,
 * so noodles and oil sit *in* the bowl. Toppings are sized relative to a ~13 cm bowl:
 * a half egg ≈ ⅙ of the bowl width, chashu slices ≈ ¼.
 */
import { useId } from 'react'
import type { ReactNode } from 'react'
import type { RamenArtSpec, Topping } from '../data/recipeTypes'

const INK = '#28251F'
const PAPER = '#F5E8CD'
const RED = '#B83227'

const CX = 100
const CY = 60
const RX = 64
const RY = 18

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt * 255)))
  const r = c((n >> 16) & 255)
  const g = c((n >> 8) & 255)
  const b = c(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/* ───────── toppings (realistic proportions) ───────── */

function Chashu({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <ellipse cx={x + 1} cy={y + 2} rx={17} ry={9.5} fill="#000" opacity={0.18} />
      <ellipse cx={x} cy={y} rx={17} ry={9.5} fill="#8E4A24" stroke={INK} strokeWidth={1.3} />
      <ellipse cx={x} cy={y - 0.5} rx={14.5} ry={7.6} fill="#E2A27A" />
      <path d={`M${x - 11} ${y - 1} c4 -4 8 3 12 -1 s7 -3 9 1`} stroke="#F7E2CC" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <path d={`M${x - 8} ${y + 3} c3 -2 6 1 9 0`} stroke="#F7E2CC" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <ellipse cx={x - 5} cy={y - 4} rx={4} ry={1.4} fill="#fff" opacity={0.35} />
    </g>
  )
}

function Egg({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x + 1} cy={y + 2} rx={12} ry={8} fill="#000" opacity={0.18} />
      <ellipse cx={x} cy={y} rx={12} ry={8} fill="#F3E3C2" stroke={INK} strokeWidth={1.3} />
      <ellipse cx={x} cy={y - 0.3} rx={10.6} ry={6.8} fill="#FFF8EA" />
      <ellipse cx={x + 0.5} cy={y} rx={6.6} ry={4.6} fill="#E9851C" />
      <ellipse cx={x + 0.5} cy={y} rx={4.6} ry={3.2} fill="#F7A23A" />
      <ellipse cx={x - 0.6} cy={y - 1} rx={2} ry={1.1} fill="#FFD27A" />
    </g>
  )
}

const RawEgg = ({ x, y }: { x: number; y: number }) => (
  <g>
    <ellipse cx={x} cy={y} rx={8} ry={5.4} fill="#F59A1A" stroke={INK} strokeWidth={1.2} />
    <ellipse cx={x - 2} cy={y - 1.6} rx={2.6} ry={1.4} fill="#FFD27A" />
  </g>
)

function Naruto({ x, y }: { x: number; y: number }) {
  const r = 9.5
  let edge = ''
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2
    const k = i % 2 ? 1 : 0.9
    edge += `${i ? 'L' : 'M'}${(x + Math.cos(a) * r * k).toFixed(1)} ${(y + Math.sin(a) * r * 0.62 * k).toFixed(1)}`
  }
  return (
    <g>
      <path d={edge + 'Z'} fill="#FFFDF6" stroke={INK} strokeWidth={1.2} />
      <path d={`M${x} ${y} c2 -1 4 1 3 2.5 c-1 2 -5 2 -6 -0.5 c-1.5 -3 2 -5.5 6 -4.5`} stroke="#E0476A" strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </g>
  )
}

function Menma({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[-8, -3, 2, 7].map((d, i) => (
        <g key={i} transform={`rotate(${-28 + i * 14} ${x + d} ${y})`}>
          <rect x={x + d - 2.4} y={y - 8} width={4.8} height={16} rx={1.2} fill="#C59A58" stroke={INK} strokeWidth={0.9} />
          <path d={`M${x + d - 0.8} ${y - 6} v12`} stroke="#E6C88E" strokeWidth={0.9} />
        </g>
      ))}
    </g>
  )
}

function Scallion({ x, y, n = 16, spread = 13, seed = 3 }: { x: number; y: number; n?: number; spread?: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const sx = x - spread + r() * spread * 2
        const sy = y - spread * 0.35 + r() * spread * 0.7
        const light = i % 3 === 0
        return (
          <g key={i}>
            <ellipse cx={sx} cy={sy} rx={2.6} ry={1.9} fill={light ? '#CFE7A6' : '#6BAA3C'} stroke="#2F5A20" strokeWidth={0.7} />
            <ellipse cx={sx} cy={sy} rx={1} ry={0.7} fill={light ? '#F4FBE6' : '#B9DC8A'} />
          </g>
        )
      })}
    </g>
  )
}

function Corn({ x, y }: { x: number; y: number }) {
  const r = rng(7)
  return (
    <g>
      {Array.from({ length: 26 }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r())
        return <rect key={i} x={x + Math.cos(a) * 12 * d - 1.8} y={y + Math.sin(a) * 6 * d - 1.5} width={3.6} height={3.2} rx={1} fill="#F4C830" stroke="#B88A10" strokeWidth={0.5} />
      })}
    </g>
  )
}

const Butter = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 8} ${y - 2} l8 -4 l8 4 l-8 4z`} fill="#FFF3B0" stroke={INK} strokeWidth={1.1} />
    <path d={`M${x - 8} ${y - 2} v4 l8 4 v-4z`} fill="#F2D86A" stroke={INK} strokeWidth={1.1} />
    <path d={`M${x} ${y + 2} v4 l8 -4 v-4z`} fill="#E6C850" stroke={INK} strokeWidth={1.1} />
    <path d={`M${x - 8} ${y + 2} q8 6 16 0`} fill="#FFE98A" opacity={0.6} />
  </g>
)

function Sprouts({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  const r = rng(big ? 41 : 11)
  const w = big ? 34 : 15
  const h = big ? 26 : 7
  return (
    <g>
      {big ? (
        <path d={`M${x - w} ${y + 6} Q${x - 6} ${y - h * 1.7} ${x + w} ${y + 6} Z`} fill="#E4EDC4" stroke={INK} strokeWidth={1.4} />
      ) : (
        <ellipse cx={x} cy={y} rx={w} ry={h} fill="#EEF2D6" stroke={INK} strokeWidth={1} />
      )}
      {Array.from({ length: big ? 40 : 16 }).map((_, i) => {
        const sx = x - w * 0.85 + r() * w * 1.7
        const sy = y + 3 - r() * (big ? h * 1.2 : h)
        return <path key={i} d={`M${sx} ${sy} q${3 - r() * 6} -3 ${7 - r() * 14} -1`} stroke="#FBFBEA" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      })}
      {big && (
        <>
          <path d={`M${x - 14} ${y - 10} q8 -6 16 -2`} stroke="#8FC266" strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d={`M${x + 2} ${y - 14} q8 -3 14 2`} stroke="#A8D27A" strokeWidth={4} fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

const Spinach = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 14} ${y + 1} q4 -9 13 -7 q9 -3 14 5 q-5 7 -14 6 q-8 2 -13 -4z`} fill="#2F6A2A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 8} ${y} q7 -4 14 -1 M${x - 4} ${y + 3} q6 -2 11 0`} stroke="#6FAF3E" strokeWidth={1.2} fill="none" />
  </g>
)

const BokChoy = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 16} ${y + 3} q12 -16 32 -5 q-12 8 -32 5z`} fill="#4E9A34" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 16} ${y + 3} q15 -3 28 -4`} stroke="#E6F2C8" strokeWidth={3.4} fill="none" strokeLinecap="round" />
    <path d={`M${x - 6} ${y - 4} q6 -3 12 -2`} stroke="#8CC664" strokeWidth={1.2} fill="none" />
  </g>
)

function Crumbles({ x, y, color, n = 18, seed = 5, size = 2.8, spread = 13 }: { x: number; y: number; color: string; n?: number; seed?: number; size?: number; spread?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r())
        return <circle key={i} cx={x + Math.cos(a) * spread * d} cy={y + Math.sin(a) * spread * 0.5 * d} r={size * (0.6 + r() * 0.6)} fill={color} stroke={INK} strokeWidth={0.6} />
      })}
    </g>
  )
}

function Strips({ x, y, color, n = 6, len = 14, w = 2.8, seed = 9 }: { x: number; y: number; color: string; n?: number; len?: number; w?: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const sx = x - 9 + r() * 18
        const sy = y - 3 + r() * 6
        const rot = -40 + r() * 80
        return <rect key={i} x={sx - len / 2} y={sy - w / 2} width={len} height={w} rx={w / 2} fill={color} stroke={INK} strokeWidth={0.6} transform={`rotate(${rot} ${sx} ${sy})`} />
      })}
    </g>
  )
}

const Nori = ({ x }: { x: number }) => (
  <g>
    <path d={`M${x} 18 l26 4 l-3 36 l-26 -4z`} fill="#1B2618" stroke={INK} strokeWidth={1.4} />
    <path d={`M${x + 5} 26 l16 2.5 M${x + 4} 34 l16 2.5 M${x + 3} 42 l16 2.5`} stroke="#34432C" strokeWidth={1} />
    <path d={`M${x + 2} 22 l3 30`} stroke="#3E4E36" strokeWidth={1.4} opacity={0.7} />
  </g>
)

const Leek = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <ellipse key={i} cx={x - 12 + i * 5} cy={y - (i % 2) * 2.5} rx={4} ry={2.8} fill="#EEF6DC" stroke="#4E7A35" strokeWidth={1.3} />
    ))}
  </g>
)

function Seafood({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 13} ${y} a8 7 0 1 1 10 5`} stroke="#E9774A" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d={`M${x - 13} ${y} a8 7 0 1 1 10 5`} stroke="#FFD0B8" strokeWidth={1.4} fill="none" strokeDasharray="2 2" />
      <ellipse cx={x + 9} cy={y - 1} rx={6.5} ry={4.4} fill="none" stroke="#FFF6E6" strokeWidth={3.2} />
      <ellipse cx={x + 9} cy={y - 1} rx={6.5} ry={4.4} fill="none" stroke={INK} strokeWidth={0.7} />
    </g>
  )
}

const Ribs = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[-9, 9].map((d, i) => (
      <g key={i}>
        <rect x={x + d - 9} y={y - 7} width={18} height={12} rx={4} fill="#7E3A1C" stroke={INK} strokeWidth={1.3} />
        <rect x={x + d - 2.5} y={y - 10} width={5} height={5} rx={2} fill="#F2E7C9" stroke={INK} strokeWidth={0.9} />
        <path d={`M${x + d - 6} ${y - 3} h11`} stroke="#C27A48" strokeWidth={1.6} />
      </g>
    ))}
  </g>
)

const Tomato = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 10} ${y + 2} a10 7 0 0 1 20 0z`} fill="#D9342A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 5} ${y + 1} q5 -5 10 0`} stroke="#F5A08A" strokeWidth={1.6} fill="none" />
  </g>
)

const Yuzu = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x - 6} ${y} q6 -5 12 0`} stroke="#F4C830" strokeWidth={3.6} fill="none" strokeLinecap="round" />
)

/* ───────── surface layers (clipped to the soup) ───────── */

function Dots({ color, n, seed, r: rad = 1.6, stroke }: { color: string; n: number; seed: number; r?: number; stroke?: string }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 0.95
        return <circle key={i} cx={CX + Math.cos(a) * RX * d} cy={CY + Math.sin(a) * RY * d} r={rad * (0.6 + r() * 0.8)} fill={color} stroke={stroke} strokeWidth={stroke ? 0.5 : 0} />
      })}
    </g>
  )
}

function OilLayer() {
  const r = rng(77)
  return (
    <g>
      {Array.from({ length: 22 }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 0.95
        const x = CX + Math.cos(a) * RX * d
        const y = CY + Math.sin(a) * RY * d
        const rad = 1.4 + r() * 2.8
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={rad} ry={rad * 0.66} fill="#F2C14E" opacity={0.8} />
            <ellipse cx={x - rad * 0.3} cy={y - rad * 0.22} rx={rad * 0.35} ry={rad * 0.2} fill="#FFF6D0" />
          </g>
        )
      })}
    </g>
  )
}

/** A dense mass of noodles, bunched in the centre and sinking into the soup. */
function NoodleMass({ type, seed = 21 }: { type: RamenArtSpec['noodle']; seed?: number }) {
  const r = rng(seed)
  const w = type === 'thin' ? 1.7 : type === 'thick' ? 3.8 : type === 'flat' ? 4.4 : 2.7
  const n = type === 'thin' ? 44 : type === 'thick' ? 20 : 30
  const base = type === 'thin' ? '#F4E4B6' : type === 'flat' ? '#EED19A' : '#EFD08E'
  const wavy = type === 'wavy' || type === 'flat'
  const strands: string[] = []
  for (let i = 0; i < n; i++) {
    const y0 = CY - 6 + r() * 16
    const x0 = 52 + r() * 20
    const len = 50 + r() * 40
    const amp = wavy ? 2 + r() * 1.8 : 0.6
    const period = wavy ? 7 + r() * 3 : 30
    const tilt = -0.18 + r() * 0.36
    let d = `M${x0.toFixed(1)} ${y0.toFixed(1)}`
    for (let t = period / 2; t <= len; t += period / 2) {
      const xx = x0 + t
      const yy = y0 + tilt * t + (((t / (period / 2)) | 0) % 2 ? amp : -amp)
      d += ` Q${(xx - period / 4).toFixed(1)} ${(yy + (((t / (period / 2)) | 0) % 2 ? amp : -amp) * 0.6).toFixed(1)} ${xx.toFixed(1)} ${yy.toFixed(1)}`
    }
    strands.push(d)
  }
  return (
    <g strokeLinecap="round" fill="none">
      <ellipse cx={CX - 4} cy={CY + 2} rx={42} ry={11} fill={shade(base, -0.1)} opacity={0.75} />
      {strands.map((d, i) => <path key={`o${i}`} d={d} stroke={INK} strokeOpacity={0.5} strokeWidth={w + 1.1} />)}
      {strands.map((d, i) => <path key={`f${i}`} d={d} stroke={i % 4 === 0 ? shade(base, -0.06) : base} strokeWidth={w} />)}
      {strands.filter((_, i) => i % 3 === 0).map((d, i) => <path key={`h${i}`} d={d} stroke="#FFFBEA" strokeOpacity={0.7} strokeWidth={Math.max(0.6, w * 0.3)} transform="translate(0 -0.6)" />)}
    </g>
  )
}

/* ───────── placement ───────── */

/** Slots on the surface, ordered back → front so overlaps look right. */
const SLOTS: [number, number][] = [
  [128, 50], [74, 50], [102, 47], [146, 60], [54, 61], [118, 67], [84, 68], [100, 58],
]

const SURFACE: Topping[] = ['oil', 'chili-oil', 'back-fat', 'pepper', 'sesame', 'onion', 'mayu', 'starch-sauce', 'nori', 'mountain', 'chilled-strips']

function drawTopping(t: Topping, x: number, y: number, i: number): ReactNode {
  switch (t) {
    case 'chashu': return <Chashu key={i} x={x} y={y} rot={-8 + (i % 3) * 8} />
    case 'egg': return <Egg key={i} x={x} y={y} />
    case 'raw-egg': return <RawEgg key={i} x={x} y={y} />
    case 'naruto': return <Naruto key={i} x={x} y={y} />
    case 'menma': return <Menma key={i} x={x} y={y} />
    case 'scallion': return <Scallion key={i} x={x} y={y} seed={i + 3} />
    case 'leek': return <Leek key={i} x={x} y={y} />
    case 'corn': return <Corn key={i} x={x} y={y} />
    case 'butter': return <Butter key={i} x={x} y={y - 4} />
    case 'sprouts': return <Sprouts key={i} x={x} y={y} />
    case 'spinach': return <Spinach key={i} x={x} y={y} />
    case 'bok-choy': return <BokChoy key={i} x={x} y={y} />
    case 'garlic-chips': return <Crumbles key={i} x={x} y={y} color="#F2D9A0" n={10} seed={i + 21} size={2.8} spread={10} />
    case 'ground-pork': return <Crumbles key={i} x={x} y={y} color="#8A4B25" n={26} seed={i + 31} size={2.4} spread={14} />
    case 'pork-bits': return <Crumbles key={i} x={x} y={y} color="#9A5A2E" n={12} seed={i + 41} size={3.4} spread={12} />
    case 'kikurage': return <Strips key={i} x={x} y={y} color="#3A2A1C" n={6} seed={i + 51} />
    case 'takana': return <Crumbles key={i} x={x} y={y} color="#4A5A2A" n={14} seed={i + 61} size={2.2} spread={10} />
    case 'beni-shoga': return <Strips key={i} x={x} y={y} color="#E0476A" n={8} len={10} w={2} seed={i + 71} />
    case 'nira': return <Strips key={i} x={x} y={y} color="#3F8A2E" n={8} len={18} w={2.6} seed={i + 81} />
    case 'cabbage': return <path key={i} d={`M${x - 15} ${y} q8 -11 16 -7 q10 -2 14 6 q-8 7 -15 5 q-9 2 -15 -4z`} fill="#D8EAB2" stroke={INK} strokeWidth={1.2} />
    case 'seafood': return <Seafood key={i} x={x} y={y} />
    case 'ribs': return <Ribs key={i} x={x} y={y} />
    case 'tomato': return <Tomato key={i} x={x} y={y} />
    case 'cheese': return <Strips key={i} x={x} y={y} color="#FFF0A8" n={10} len={8} w={1.8} seed={i + 91} />
    case 'yuzu': return <Yuzu key={i} x={x} y={y} />
    default: return null
  }
}

function Toppings({ spec }: { spec: RamenArtSpec }) {
  const top = spec.top
  const slotted = top.filter((t) => !SURFACE.includes(t))
  const placed = slotted.map((t, i) => ({ t, i, at: SLOTS[i % SLOTS.length] })).sort((a, b) => a.at[1] - b.at[1])
  return (
    <g>
      {top.includes('nori') && <Nori x={138} />}
      {top.includes('mountain') && <Sprouts x={CX} y={CY} big />}
      {placed.map(({ t, i, at }) => drawTopping(t, at[0], at[1], i))}
    </g>
  )
}

/** Ramen bowl: white porcelain with a red raimon meander band. */
function Bowl({ children, over, surface, clipId, gradId }: { children: ReactNode; over?: ReactNode; surface: string; clipId: string; gradId: string }) {
  const meander: string[] = []
  for (let i = 0; i < 11; i++) {
    const x = 40 + i * 11
    const y = 80 + Math.sin(((i + 0.5) / 11) * Math.PI) * 8
    meander.push(`M${x} ${y + 3} v-5 h7 v4 h-4 v-2`)
  }
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <ellipse cx={CX} cy={CY + 1} rx={RX} ry={RY} />
        </clipPath>
        <radialGradient id={gradId} cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor={shade(surface, 0.1)} />
          <stop offset="0.7" stopColor={surface} />
          <stop offset="1" stopColor={shade(surface, -0.16)} />
        </radialGradient>
      </defs>
      {/* rim */}
      <ellipse cx={CX} cy={62} rx={70} ry={21} fill="#FBF6EA" stroke={INK} strokeWidth={2.2} />
      <ellipse cx={CX} cy={CY + 1} rx={RX} ry={RY} fill={`url(#${gradId})`} />
      <g clipPath={`url(#${clipId})`}>
        {/* inner wall shadow at the back */}
        <ellipse cx={CX} cy={CY - 14} rx={RX + 6} ry={RY} fill="#000" opacity={0.12} />
        {children}
        <ellipse cx={CX - 18} cy={CY - 7} rx={22} ry={3.2} fill="#fff" opacity={0.18} />
      </g>
      {over}
      {/* body */}
      <path d="M30 62A70 21 0 0 0 170 62A70 46 0 0 1 30 62Z" fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <path d="M36 70 Q100 104 164 70" stroke="#E8DCC2" strokeWidth={4} fill="none" opacity={0.7} />
      <path d="M38 76 Q100 108 162 76" fill="none" stroke={RED} strokeWidth={7} />
      <g stroke={PAPER} strokeWidth={1.3} fill="none" strokeLinecap="square">
        {meander.map((d, i) => <path key={i} d={d} />)}
      </g>
      <path d="M44 66 Q60 92 92 102" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M84 108 h32" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
    </g>
  )
}

function SoupLayers({ spec }: { spec: RamenArtSpec }) {
  const top = spec.top
  return (
    <g>
      {top.includes('starch-sauce') && <ellipse cx={CX} cy={CY} rx={RX - 4} ry={RY - 3} fill="#A8723A" opacity={0.9} />}
      {top.includes('oil') && <OilLayer />}
      {top.includes('chili-oil') && <Dots color="#D9341E" n={22} seed={17} r={2.4} />}
      {top.includes('mayu') && <path d="M58 64 q16 -9 32 -2 q14 6 30 -1 q10 -4 18 1" stroke="#1A1410" strokeWidth={3.6} fill="none" strokeLinecap="round" opacity={0.85} />}
      {top.includes('back-fat') && <Dots color="#FFFBF1" n={44} seed={29} r={1.5} />}
    </g>
  )
}

function TopDust({ spec }: { spec: RamenArtSpec }) {
  const top = spec.top
  return (
    <g>
      {top.includes('onion') && <Dots color="#FFFDF6" n={30} seed={23} r={1.8} stroke="#B9B2A0" />}
      {top.includes('sesame') && <Dots color="#F4E6C2" n={18} seed={31} r={1.1} stroke="#8A6A3A" />}
      {top.includes('pepper') && <Dots color="#1A1410" n={34} seed={37} r={0.9} />}
    </g>
  )
}

function Plate({ children }: { children: ReactNode }) {
  return (
    <g>
      <ellipse cx={100} cy={88} rx={86} ry={21} fill="#CDBF9F" stroke={INK} strokeWidth={2.2} />
      <ellipse cx={100} cy={84} rx={86} ry={21} fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <ellipse cx={100} cy={84} rx={70} ry={15} fill="none" stroke="#234D76" strokeWidth={1.4} strokeDasharray="5 4" />
      {children}
    </g>
  )
}

function NoodleHeap({ cx, cy, rx, ry, color, w, seed }: { cx: number; cy: number; rx: number; ry: number; color: string; w: number; seed: number }) {
  const r = rng(seed)
  const strands: string[] = []
  for (let i = 0; i < 40; i++) {
    const x = cx - rx + r() * rx * 2
    const y = cy - ry + r() * ry * 2
    strands.push(`M${x.toFixed(1)} ${y.toFixed(1)} q${(5 - r() * 10).toFixed(1)} ${(-3 + r() * 6).toFixed(1)} ${(12 - r() * 24).toFixed(1)} ${(-2 + r() * 4).toFixed(1)} t${(10 - r() * 20).toFixed(1)} ${(-2 + r() * 4).toFixed(1)}`)
  }
  return (
    <g strokeLinecap="round" fill="none">
      <ellipse cx={cx} cy={cy} rx={rx + 4} ry={ry + 3} fill={shade(color, -0.08)} stroke={INK} strokeWidth={1.4} />
      {strands.map((d, i) => <path key={`o${i}`} d={d} stroke={INK} strokeOpacity={0.5} strokeWidth={w + 1.1} />)}
      {strands.map((d, i) => <path key={i} d={d} stroke={i % 4 ? color : shade(color, -0.06)} strokeWidth={w} />)}
      {strands.filter((_, i) => i % 3 === 0).map((d, i) => <path key={`h${i}`} d={d} stroke="#FFFBEA" strokeOpacity={0.7} strokeWidth={Math.max(0.6, w * 0.3)} />)}
    </g>
  )
}

function ChilledStrips() {
  const rows: [string, number][] = [['#F4C842', 82], ['#7DB34A', 100], ['#F2A0A8', 118]]
  return (
    <g>
      {rows.map(([c, x], i) => (
        <g key={i}>
          {Array.from({ length: 8 }).map((_, j) => (
            <rect key={j} x={x - 8 + (j % 4) * 4} y={58 + Math.floor(j / 4) * 5} width={3.2} height={16} rx={1} transform={`rotate(-35 ${x} 66)`} fill={c} stroke={INK} strokeWidth={0.6} />
          ))}
        </g>
      ))}
      <path d="M128 72 a11 8 0 0 1 22 0z" fill="#D9342A" stroke={INK} strokeWidth={1.2} />
      <path d="M58 74 a9 6 0 0 1 18 0z" fill="#D9342A" stroke={INK} strokeWidth={1.2} />
      <Egg x={100} y={74} />
    </g>
  )
}

export function RamenDrawing({ spec }: { spec: RamenArtSpec }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const noodleW = spec.noodle === 'thin' ? 1.8 : spec.noodle === 'thick' ? 4 : 3

  if (spec.vessel === 'tsuke') {
    return (
      <g>
        <Plate>
          <NoodleHeap cx={74} cy={77} rx={36} ry={9} color="#EBCB92" w={noodleW} seed={5} />
          <Chashu x={58} y={70} />
          <Egg x={92} y={70} />
        </Plate>
        <g transform="translate(76 8) scale(0.52)">
          <ellipse cx={CX} cy={62} rx={70} ry={21} fill={PAPER} stroke={INK} strokeWidth={3} />
          <ellipse cx={CX} cy={CY + 1} rx={RX} ry={RY} fill={spec.soup ?? '#7A4A22'} />
          <Dots color="#3A2410" n={22} seed={3} r={1.8} />
          <Scallion x={100} y={58} n={12} />
          <Menma x={74} y={56} />
          <path d="M30 62A70 21 0 0 0 170 62A70 46 0 0 1 30 62Z" fill="#234D76" stroke={INK} strokeWidth={3} />
          <path d="M44 78c12 7 24 7 36 0s24-7 36 0 24 7 36 0" stroke={PAPER} strokeWidth={3} fill="none" />
        </g>
      </g>
    )
  }
  if (spec.vessel === 'chilled') {
    return (
      <Plate>
        <NoodleHeap cx={100} cy={77} rx={52} ry={10} color="#F1D8A6" w={noodleW} seed={8} />
        <g transform="translate(0 2)">
          <ChilledStrips />
        </g>
      </Plate>
    )
  }
  const dry = spec.vessel === 'dry'
  const surface = dry ? '#E7C688' : spec.soup ?? '#A8642A'
  return (
    <Bowl
      surface={surface}
      clipId={`clip-${uid}`}
      gradId={`grad-${uid}`}
      over={
        <>
          <Toppings spec={spec} />
          <TopDust spec={spec} />
        </>
      }
    >
      {!dry && <SoupLayers spec={spec} />}
      <NoodleMass type={spec.noodle} />
      {dry && <SoupLayers spec={spec} />}
    </Bowl>
  )
}
