/**
 * Parametric ramen illustrations in the same Showa-print style as DishArt.
 * One bowl drawing is built from a spec: vessel, soup colour, noodle type, toppings.
 */
import type { ReactNode } from 'react'
import type { RamenArtSpec, Topping } from '../data/recipeTypes'

const INK = '#28251F'
const PAPER = '#F5E8CD'
const RED = '#B83227'

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Soup surface ellipse. */
const CX = 100
const CY = 60
const RX = 62
const RY = 13

/* Topping slots on the soup, back to front. */
const SLOTS: [number, number][] = [
  [126, 54], [76, 54], [100, 51], [144, 60], [58, 60], [112, 63], [86, 64], [100, 58],
]

/* ───────── toppings ───────── */

function Chashu({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={13} ry={7} fill="#B8744A" stroke={INK} strokeWidth={1.4} />
      <ellipse cx={x} cy={y} rx={10} ry={5} fill="#E3A57A" />
      <path d={`M${x - 6} ${y} q3 -3 6 0 q3 3 6 0`} stroke="#F6DCC4" strokeWidth={1.6} fill="none" />
      <ellipse cx={x} cy={y} rx={13} ry={7} fill="none" stroke="#7A3E1A" strokeWidth={2.2} opacity={0.7} />
    </g>
  )
}

function Egg({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={9} ry={6} fill="#FFFBF1" stroke={INK} strokeWidth={1.3} />
      <ellipse cx={x} cy={y + 0.5} rx={5.2} ry={3.6} fill="#F08A1E" />
      <ellipse cx={x - 1} cy={y - 0.5} rx={2.4} ry={1.4} fill="#F7B44A" />
    </g>
  )
}

const RawEgg = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r={5.5} fill="#F59A1A" stroke={INK} strokeWidth={1.2} />
    <ellipse cx={x - 1.5} cy={y - 1.6} rx={2} ry={1.2} fill="#FFD27A" />
  </g>
)

function Naruto({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 8} ${y} q2 -6 8 -6 q6 0 8 6 q-2 6 -8 6 q-6 0 -8 -6z`} fill="#FFFDF6" stroke={INK} strokeWidth={1.2} />
      <path d={`M${x} ${y} q2 -2 3 0 q0 3 -3 3 q-4 0 -4 -3 q0 -4 5 -4`} stroke="#E0476A" strokeWidth={1.4} fill="none" />
    </g>
  )
}

function Menma({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[-6, -2, 2, 6].map((d, i) => (
        <rect key={i} x={x + d - 1.6} y={y - 6 + (i % 2) * 2} width={3.4} height={11} rx={1} transform={`rotate(${-20 + i * 12} ${x + d} ${y})`} fill="#C9A060" stroke={INK} strokeWidth={0.8} />
      ))}
    </g>
  )
}

function Scallion({ x, y, n = 9, seed = 3 }: { x: number; y: number; n?: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <ellipse key={i} cx={x - 9 + r() * 18} cy={y - 3 + r() * 6} rx={2.4} ry={1.7} fill="#7DB34A" stroke="#2F5A20" strokeWidth={0.8} />
      ))}
    </g>
  )
}

function Corn({ x, y }: { x: number; y: number }) {
  const r = rng(7)
  return (
    <g>
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={x - 9 + r() * 16} y={y - 4 + r() * 7} width={3} height={2.6} rx={0.8} fill="#F4C830" stroke="#B88A10" strokeWidth={0.5} />
      ))}
    </g>
  )
}

const Butter = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 6} ${y - 1} l6 -3 l6 3 l-6 3z`} fill="#FFF0A0" stroke={INK} strokeWidth={1.1} />
    <path d={`M${x - 6} ${y - 1} v3 l6 3 v-3z`} fill="#F2D86A" stroke={INK} strokeWidth={1.1} />
    <path d={`M${x} ${y + 2} v3 l6 -3 v-3z`} fill="#E6C850" stroke={INK} strokeWidth={1.1} />
  </g>
)

function Sprouts({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
  const r = rng(big ? 41 : 11)
  const w = big ? 30 : 12
  const h = big ? 22 : 6
  return (
    <g>
      {big && <path d={`M${x - w} ${y + 4} Q${x} ${y - h * 1.6} ${x + w} ${y + 4} Z`} fill="#D8E8B0" stroke={INK} strokeWidth={1.4} />}
      {Array.from({ length: big ? 30 : 10 }).map((_, i) => {
        const sx = x - w + r() * w * 2
        const sy = y + 2 - r() * h
        return <path key={i} d={`M${sx} ${sy} q${3 - r() * 6} -4 ${6 - r() * 12} -2`} stroke="#F2F2DA" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      })}
      {big && <path d={`M${x - 10} ${y - 12} q10 -8 20 0`} stroke="#9CCB63" strokeWidth={4} fill="none" strokeLinecap="round" />}
    </g>
  )
}

const Spinach = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 10} ${y} q4 -7 10 -5 q7 -2 10 4 q-4 5 -10 4 q-6 2 -10 -3z`} fill="#2F6A2A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 5} ${y - 1} q5 -3 10 0`} stroke="#6FAF3E" strokeWidth={1.2} fill="none" />
  </g>
)

const BokChoy = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 12} ${y + 2} q10 -12 24 -4 q-10 6 -24 4z`} fill="#4E9A34" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 12} ${y + 2} q12 -2 22 -3`} stroke="#E6F2C8" strokeWidth={2.6} fill="none" strokeLinecap="round" />
  </g>
)

function Crumbles({ x, y, color, n = 16, seed = 5, size = 2.6 }: { x: number; y: number; color: string; n?: number; seed?: number; size?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <circle key={i} cx={x - 11 + r() * 22} cy={y - 4 + r() * 8} r={size * (0.6 + r() * 0.6)} fill={color} stroke={INK} strokeWidth={0.6} />
      ))}
    </g>
  )
}

function SurfaceDots({ color, n, seed, r: rad = 1.6, stroke }: { color: string; n: number; seed: number; r?: number; stroke?: string }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 0.92
        return <circle key={i} cx={CX + Math.cos(a) * RX * d} cy={CY + Math.sin(a) * RY * d} r={rad * (0.6 + r() * 0.8)} fill={color} stroke={stroke} strokeWidth={stroke ? 0.5 : 0} />
      })}
    </g>
  )
}

function Strips({ x, y, color, n = 5, len = 12, w = 2.4, seed = 9 }: { x: number; y: number; color: string; n?: number; len?: number; w?: number; seed?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const sx = x - 8 + r() * 16
        const sy = y - 3 + r() * 6
        const rot = -40 + r() * 80
        return <rect key={i} x={sx - len / 2} y={sy - w / 2} width={len} height={w} rx={w / 2} fill={color} stroke={INK} strokeWidth={0.6} transform={`rotate(${rot} ${sx} ${sy})`} />
      })}
    </g>
  )
}

const Nori = ({ x }: { x: number }) => (
  <g>
    <path d={`M${x} 26 l20 3 l-2 30 l-20 -3z`} fill="#1F2A1C" stroke={INK} strokeWidth={1.4} />
    <path d={`M${x + 4} 32 l12 2 M${x + 3} 40 l12 2`} stroke="#3E4A34" strokeWidth={1} />
  </g>
)

const Leek = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx={x - 8 + i * 4} cy={y - (i % 2) * 2} rx={3.4} ry={2.4} fill="#E9F2D2" stroke="#4E7A35" strokeWidth={1.2} />
    ))}
  </g>
)

function Seafood({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 10} ${y} a6 6 0 1 1 8 4`} stroke="#F08A5D" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={`M${x - 10} ${y} a6 6 0 1 1 8 4`} stroke="#FFD0B8" strokeWidth={1.2} fill="none" strokeDasharray="2 2" />
      <ellipse cx={x + 7} cy={y - 1} rx={5} ry={3.4} fill="none" stroke="#FFF6E6" strokeWidth={2.6} />
      <ellipse cx={x + 7} cy={y - 1} rx={5} ry={3.4} fill="none" stroke={INK} strokeWidth={0.6} />
    </g>
  )
}

const Ribs = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[-7, 7].map((d, i) => (
      <g key={i}>
        <rect x={x + d - 7} y={y - 6} width={14} height={10} rx={3} fill="#8A4220" stroke={INK} strokeWidth={1.3} />
        <rect x={x + d - 2} y={y - 8} width={4} height={4} rx={1.5} fill="#F2E7C9" stroke={INK} strokeWidth={0.9} />
        <path d={`M${x + d - 4} ${y - 3} h7`} stroke="#C27A48" strokeWidth={1.4} />
      </g>
    ))}
  </g>
)

const Tomato = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 8} ${y + 2} a8 6 0 0 1 16 0z`} fill="#D9342A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 4} ${y + 1} q4 -4 8 0`} stroke="#F5A08A" strokeWidth={1.4} fill="none" />
  </g>
)

const Yuzu = ({ x, y }: { x: number; y: number }) => (
  <path d={`M${x - 5} ${y} q5 -4 10 0`} stroke="#F4C830" strokeWidth={3} fill="none" strokeLinecap="round" />
)

/** Shop-style aroma oil: glossy golden rings floating on the soup. */
function OilLayer() {
  const r = rng(77)
  return (
    <g>
      {Array.from({ length: 14 }).map((_, i) => {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * 0.9
        const x = CX + Math.cos(a) * RX * d
        const y = CY + Math.sin(a) * RY * d
        const rad = 1.6 + r() * 2.6
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={rad} ry={rad * 0.7} fill="#F2C14E" opacity={0.85} />
            <ellipse cx={x - rad * 0.3} cy={y - rad * 0.25} rx={rad * 0.35} ry={rad * 0.22} fill="#FFF6D0" />
          </g>
        )
      })}
    </g>
  )
}

function StarchSauce() {
  return (
    <g>
      <ellipse cx={CX} cy={CY - 1} rx={RX - 6} ry={RY - 2} fill="#B07A3A" opacity={0.85} />
      <path d={`M${CX - 30} ${CY - 4} q20 -4 40 0`} stroke="#F2D2A0" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.8} />
    </g>
  )
}

function ChilledStrips() {
  const rows: [string, number][] = [['#F4C842', 84], ['#7DB34A', 100], ['#F2A0A8', 116]]
  return (
    <g>
      {rows.map(([c, x], i) => (
        <g key={i}>
          {Array.from({ length: 6 }).map((_, j) => (
            <rect key={j} x={x - 6 + (j % 3) * 4} y={60 + Math.floor(j / 3) * 4} width={3} height={14} rx={1} transform={`rotate(${-35} ${x} 66)`} fill={c} stroke={INK} strokeWidth={0.6} />
          ))}
        </g>
      ))}
      <path d="M128 70 a9 7 0 0 1 18 0z" fill="#D9342A" stroke={INK} strokeWidth={1.2} />
      <path d="M62 72 a7 5 0 0 1 14 0z" fill="#D9342A" stroke={INK} strokeWidth={1.2} />
    </g>
  )
}

function drawTopping(t: Topping, x: number, y: number, i: number): ReactNode {
  switch (t) {
    case 'chashu': return <Chashu key={i} x={x} y={y} />
    case 'egg': return <Egg key={i} x={x} y={y} />
    case 'raw-egg': return <RawEgg key={i} x={x} y={y} />
    case 'naruto': return <Naruto key={i} x={x} y={y} />
    case 'menma': return <Menma key={i} x={x} y={y} />
    case 'scallion': return <Scallion key={i} x={x} y={y} seed={i + 3} />
    case 'leek': return <Leek key={i} x={x} y={y} />
    case 'corn': return <Corn key={i} x={x} y={y} />
    case 'butter': return <Butter key={i} x={x} y={y - 3} />
    case 'sprouts': return <Sprouts key={i} x={x} y={y} />
    case 'mountain': return <Sprouts key={i} x={CX} y={CY} big />
    case 'spinach': return <Spinach key={i} x={x} y={y} />
    case 'bok-choy': return <BokChoy key={i} x={x} y={y} />
    case 'garlic-chips': return <Crumbles key={i} x={x} y={y} color="#F2D9A0" n={8} seed={i + 21} size={2.4} />
    case 'ground-pork': return <Crumbles key={i} x={x} y={y} color="#8A4B25" n={18} seed={i + 31} size={2.2} />
    case 'pork-bits': return <Crumbles key={i} x={x} y={y} color="#9A5A2E" n={10} seed={i + 41} size={3} />
    case 'kikurage': return <Strips key={i} x={x} y={y} color="#3A2A1C" n={5} seed={i + 51} />
    case 'takana': return <Crumbles key={i} x={x} y={y} color="#4A5A2A" n={12} seed={i + 61} size={2} />
    case 'beni-shoga': return <Strips key={i} x={x} y={y} color="#E0476A" n={6} len={8} w={1.8} seed={i + 71} />
    case 'nira': return <Strips key={i} x={x} y={y} color="#3F8A2E" n={6} len={16} w={2.2} seed={i + 81} />
    case 'cabbage': return <path key={i} d={`M${x - 12} ${y} q6 -9 13 -6 q8 -2 11 5 q-6 6 -12 4 q-7 2 -12 -3z`} fill="#D8EAB2" stroke={INK} strokeWidth={1.2} />
    case 'seafood': return <Seafood key={i} x={x} y={y} />
    case 'ribs': return <Ribs key={i} x={x} y={y} />
    case 'tomato': return <Tomato key={i} x={x} y={y} />
    case 'cheese': return <Strips key={i} x={x} y={y} color="#FFF0A8" n={8} len={7} w={1.6} seed={i + 91} />
    case 'yuzu': return <Yuzu key={i} x={x} y={y} />
    default: return null
  }
}

/** Overlays that sit across the whole surface rather than in a slot. */
const SURFACE: Topping[] = ['oil', 'chili-oil', 'back-fat', 'pepper', 'sesame', 'onion', 'mayu', 'starch-sauce', 'nori', 'mountain', 'chilled-strips']

function Noodles({ type }: { type: RamenArtSpec['noodle'] }) {
  const w = type === 'thin' ? 1.6 : type === 'thick' ? 4 : type === 'flat' ? 4.6 : 2.6
  const wavy = type === 'wavy' || type === 'flat'
  const c = type === 'thin' ? '#F3E2B4' : '#EFD496'
  const lines: ReactNode[] = []
  for (let i = 0; i < 6; i++) {
    const x = 58 + i * 7
    const d = wavy
      ? `M${x} 66 q3 -4 6 -2 q3 2 6 -2 q3 -4 6 -2`
      : `M${x} 66 q8 -6 18 -4`
    lines.push(<path key={`o${i}`} d={d} stroke={INK} strokeWidth={w + 1.2} fill="none" strokeLinecap="round" opacity={0.55} />)
    lines.push(<path key={i} d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" />)
  }
  return <g>{lines}</g>
}

/** Ramen bowl: white with a red raimon band. */
function Bowl({ children, surface }: { children: ReactNode; surface: string }) {
  return (
    <g>
      <ellipse cx={CX} cy={62} rx={68} ry={15} fill="#F5E8CD" stroke={INK} strokeWidth={2.2} />
      <ellipse cx={CX} cy={CY + 1} rx={RX} ry={RY} fill={surface} />
      <ellipse cx={CX - 14} cy={CY - 3} rx={28} ry={4} fill="#fff" opacity={0.14} />
      {children}
      <path d="M32 62A68 15 0 0 0 168 62A68 46 0 0 1 32 62Z" fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <path d="M38 76 Q100 96 162 76" fill="none" stroke={RED} strokeWidth={5} />
      <path
        d="M44 81 h6 v-4 h-3 v2 M58 85 h6 v-4 h-3 v2 M72 88 h6 v-4 h-3 v2 M86 90 h6 v-4 h-3 v2 M100 90 h6 v-4 h-3 v2 M114 89 h6 v-4 h-3 v2 M128 87 h6 v-4 h-3 v2 M142 83 h6 v-4 h-3 v2"
        stroke={PAPER} strokeWidth={1.2} fill="none" transform="translate(0 -6)"
      />
      <path d="M86 108 h28" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />
    </g>
  )
}

function Toppings({ spec }: { spec: RamenArtSpec }) {
  const top = spec.top
  const slotted = top.filter((t) => !SURFACE.includes(t))
  return (
    <g>
      {top.includes('starch-sauce') && <StarchSauce />}
      {top.includes('mayu') && <path d="M70 62 q12 -8 26 -2 q12 5 24 -1" stroke="#1A1410" strokeWidth={3.2} fill="none" strokeLinecap="round" opacity={0.85} />}
      {top.includes('oil') && <OilLayer />}
      {top.includes('chili-oil') && <SurfaceDots color="#D9341E" n={16} seed={17} r={2.2} />}
      {top.includes('nori') && <Nori x={130} />}
      {top.includes('mountain') && drawTopping('mountain', 0, 0, 99)}
      {slotted.map((t, i) => {
        const [x, y] = SLOTS[i % SLOTS.length]
        return drawTopping(t, x, y, i)
      })}
      {top.includes('onion') && <SurfaceDots color="#FFFDF6" n={22} seed={23} r={1.6} stroke="#B9B2A0" />}
      {top.includes('back-fat') && <SurfaceDots color="#FFFBF1" n={30} seed={29} r={1.4} />}
      {top.includes('sesame') && <SurfaceDots color="#F4E6C2" n={14} seed={31} r={1} stroke="#8A6A3A" />}
      {top.includes('pepper') && <SurfaceDots color="#1A1410" n={26} seed={37} r={0.9} />}
    </g>
  )
}

function Plate({ children }: { children: ReactNode }) {
  return (
    <g>
      <ellipse cx={100} cy={88} rx={84} ry={20} fill="#CDBF9F" stroke={INK} strokeWidth={2.2} />
      <ellipse cx={100} cy={84} rx={84} ry={20} fill={PAPER} stroke={INK} strokeWidth={2.2} />
      <ellipse cx={100} cy={84} rx={68} ry={14} fill="none" stroke="#234D76" strokeWidth={1.4} strokeDasharray="5 4" />
      {children}
    </g>
  )
}

function NoodleHeap({ cx, cy, rx, ry, color, w, seed }: { cx: number; cy: number; rx: number; ry: number; color: string; w: number; seed: number }) {
  const r = rng(seed)
  const strands: string[] = []
  for (let i = 0; i < 26; i++) {
    const x = cx - rx + r() * rx * 2
    const y = cy - ry + r() * ry * 2
    strands.push(`M${x.toFixed(1)} ${y.toFixed(1)} q${(4 - r() * 8).toFixed(1)} ${(-3 + r() * 6).toFixed(1)} ${(10 - r() * 20).toFixed(1)} ${(-2 + r() * 4).toFixed(1)}`)
  }
  return (
    <g strokeLinecap="round" fill="none">
      <ellipse cx={cx} cy={cy} rx={rx + 3} ry={ry + 2} fill={color} stroke={INK} strokeWidth={1.4} />
      {strands.map((d, i) => <path key={`o${i}`} d={d} stroke={INK} strokeOpacity={0.5} strokeWidth={w + 1.2} />)}
      {strands.map((d, i) => <path key={i} d={d} stroke={color} strokeWidth={w} />)}
    </g>
  )
}

export function RamenDrawing({ spec }: { spec: RamenArtSpec }) {
  const noodleW = spec.noodle === 'thin' ? 1.8 : spec.noodle === 'thick' ? 4 : 3
  if (spec.vessel === 'tsuke') {
    return (
      <g>
        <Plate>
          <NoodleHeap cx={74} cy={76} rx={36} ry={8} color="#EBCB92" w={noodleW} seed={5} />
          <Chashu x={60} y={70} />
          <Egg x={92} y={70} />
        </Plate>
        <g transform="translate(76 10) scale(0.52)">
          <ellipse cx={CX} cy={62} rx={68} ry={15} fill={PAPER} stroke={INK} strokeWidth={3} />
          <ellipse cx={CX} cy={CY + 1} rx={RX} ry={RY} fill={spec.soup ?? '#7A4A22'} />
          <SurfaceDots color="#3A2410" n={18} seed={3} r={1.6} />
          <Scallion x={100} y={58} n={8} />
          <Menma x={78} y={58} />
          <path d="M32 62A68 15 0 0 0 168 62A68 46 0 0 1 32 62Z" fill="#234D76" stroke={INK} strokeWidth={3} />
          <path d="M44 74c12 7 24 7 36 0s24-7 36 0 24 7 36 0" stroke={PAPER} strokeWidth={3} fill="none" />
        </g>
      </g>
    )
  }
  if (spec.vessel === 'chilled') {
    return (
      <Plate>
        <NoodleHeap cx={100} cy={76} rx={50} ry={9} color="#F1D8A6" w={noodleW} seed={8} />
        <g transform="translate(0 4)"><ChilledStrips /></g>
      </Plate>
    )
  }
  const dry = spec.vessel === 'dry'
  const surface = dry ? '#EBCB92' : spec.soup ?? '#A8642A'
  return (
    <Bowl surface={surface}>
      {dry ? (
        <NoodleHeap cx={CX} cy={CY} rx={RX - 10} ry={RY - 4} color="#E7C688" w={noodleW} seed={13} />
      ) : (
        <Noodles type={spec.noodle} />
      )}
      <Toppings spec={spec} />
    </Bowl>
  )
}
