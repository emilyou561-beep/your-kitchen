/**
 * Hand-drawn dish illustrations — flat Showa-print style: ink outlines, paper
 * ceramics, navy ground. Every recipe gets its own food in its own vessel.
 * All drawing happens in a 200×120 box so dishes can be reused in other scenes.
 */
import type { ReactNode } from 'react'
import { artFor } from '../data/recipeTypes'
import type { Recipe, RouteId } from '../data/recipeTypes'
import { RamenDrawing } from './RamenArt'

const INK = '#28251F'
const PAPER = '#F5E8CD'
const NAVY = '#234D76'
const SW = 2.2

/* ───────── tiny deterministic random + shape helpers ───────── */

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Smooth irregular blob path — potatoes, karaage, beef, miso… */
function blobPath(cx: number, cy: number, rx: number, ry: number, seed: number, jitter = 0.22, n = 9): string {
  const r = rng(seed)
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.3
    const k = 1 - jitter + r() * jitter * 2
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k])
  }
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
  const m0 = mid(pts[n - 1], pts[0])
  let d = `M${m0[0].toFixed(1)} ${m0[1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p = pts[i]
    const m = mid(p, pts[(i + 1) % n])
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`
  }
  return d + 'Z'
}

function Blob({ cx, cy, rx, ry, seed, fill, jitter, stroke = INK, sw = 1.6 }: {
  cx: number; cy: number; rx: number; ry: number; seed: number; fill: string; jitter?: number; stroke?: string; sw?: number
}) {
  return <path d={blobPath(cx, cy, rx, ry, seed, jitter)} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
}

/** Scatter of small marks inside an ellipse (rice grains, sesame, aonori…). */
function Scatter({ cx, cy, rx, ry, n, seed, render }: {
  cx: number; cy: number; rx: number; ry: number; n: number; seed: number
  render: (x: number, y: number, rot: number, i: number) => ReactNode
}) {
  const r = rng(seed)
  const out: ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(r())
    out.push(render(cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, r() * 180, i))
  }
  return <g>{out}</g>
}

/* ───────── food primitives ───────── */

/** Rice dome filling a bowl whose rim centre line is y=66 and half-width ~58. */
function Rice({ cx = 100, cy = 60, rx = 50, ry = 13, seed = 1, n = 46 }) {
  const base = 66
  const dome = `M${cx - rx - 4} ${base} C${cx - rx + 4} ${cy - ry}, ${cx + rx - 4} ${cy - ry}, ${cx + rx + 4} ${base} A${rx + 4} 11 0 0 1 ${cx - rx - 4} ${base}Z`
  return (
    <g>
      <path d={dome} fill="#FFFDF6" stroke={INK} strokeWidth={1.6} />
      <Scatter cx={cx} cy={cy + 2} rx={rx * 0.8} ry={ry * 0.7} n={n} seed={seed + 7}
        render={(x, y, rot, i) => <ellipse key={i} cx={x} cy={y} rx={2.3} ry={1.2} transform={`rotate(${rot} ${x} ${y})`} fill="#fff" stroke="#D8CFB8" strokeWidth={0.6} />} />
    </g>
  )
}

const Scallions = ({ cx, cy, rx, ry, n = 9, seed = 3 }: { cx: number; cy: number; rx: number; ry: number; n?: number; seed?: number }) => (
  <Scatter cx={cx} cy={cy} rx={rx} ry={ry} n={n} seed={seed}
    render={(x, y, _r, i) => <ellipse key={i} cx={x} cy={y} rx={2.6} ry={1.8} fill="#7DB34A" stroke="#2F5A20" strokeWidth={0.9} />} />
)

const Sesame = ({ cx, cy, rx, ry, n = 14, seed = 5, color = '#F4E6C2' }: { cx: number; cy: number; rx: number; ry: number; n?: number; seed?: number; color?: string }) => (
  <Scatter cx={cx} cy={cy} rx={rx} ry={ry} n={n} seed={seed}
    render={(x, y, rot, i) => <ellipse key={i} cx={x} cy={y} rx={1.4} ry={0.8} transform={`rotate(${rot} ${x} ${y})`} fill={color} stroke="#8A6A3A" strokeWidth={0.4} />} />
)

const Aonori = ({ cx, cy, rx, ry, n = 22, seed = 9 }: { cx: number; cy: number; rx: number; ry: number; n?: number; seed?: number }) => (
  <Scatter cx={cx} cy={cy} rx={rx} ry={ry} n={n} seed={seed}
    render={(x, y, _r, i) => <circle key={i} cx={x} cy={y} r={0.9} fill="#3F7A2A" />} />
)

const Bonito = ({ cx, cy, rx, ry, n = 7, seed = 11 }: { cx: number; cy: number; rx: number; ry: number; n?: number; seed?: number }) => (
  <Scatter cx={cx} cy={cy} rx={rx} ry={ry} n={n} seed={seed}
    render={(x, y, rot, i) => <path key={i} d={`M${x - 4} ${y} q4 -4 8 0 q-4 3 -8 0z`} transform={`rotate(${rot} ${x} ${y})`} fill="#E8B88A" stroke="#9A6A3A" strokeWidth={0.6} />} />
)

const PickledGinger = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 7} ${y} q3 -6 7 -2 q4 -5 7 1 q-3 5 -7 3 q-4 3 -7 -2z`} fill="#E0476A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 3} ${y - 1} l3 -2 M${x + 2} ${y} l3 -2`} stroke="#F7A9BC" strokeWidth={1} />
  </g>
)

function Tofu({ x, y, s = 9, fill = '#FFFDF4' }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g>
      <path d={`M${x} ${y} l${s} -${s * 0.35} l${s} ${s * 0.35} l-${s} ${s * 0.35}z`} fill={fill} stroke={INK} strokeWidth={1.2} />
      <path d={`M${x} ${y} v${s * 0.7} l${s} ${s * 0.35} v-${s * 0.7}z`} fill="#E9E1CB" stroke={INK} strokeWidth={1.2} />
      <path d={`M${x + s} ${y + s * 0.35} v${s * 0.7} l${s} -${s * 0.35} v-${s * 0.7}z`} fill="#D9CFB5" stroke={INK} strokeWidth={1.2} />
    </g>
  )
}

const Wakame = ({ x, y, seed }: { x: number; y: number; seed: number }) => (
  <path d={blobPath(x, y, 6, 3.2, seed, 0.35, 7)} fill="#2F4A24" stroke={INK} strokeWidth={1} />
)

const Carrot = ({ x, y, r = 5 }: { x: number; y: number; r?: number }) => (
  <g>
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.6} fill="#E8792E" stroke={INK} strokeWidth={1.2} />
    <ellipse cx={x} cy={y} rx={r * 0.45} ry={r * 0.27} fill="#F3A35E" />
  </g>
)

const SnapPea = ({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) => (
  <g transform={`rotate(${rot} ${x} ${y})`}>
    <path d={`M${x - 9} ${y} q9 -6 18 0 q-9 5 -18 0z`} fill="#6FAF3E" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 6} ${y - 0.5} q6 -3 12 0`} stroke="#B7DD84" strokeWidth={1} fill="none" />
  </g>
)

function Cabbage({ x, y, w = 34, seed = 2 }: { x: number; y: number; w?: number; seed?: number }) {
  const r = rng(seed)
  const lines: ReactNode[] = []
  for (let i = 0; i < 9; i++) {
    const yy = y - 6 + r() * 12
    const xx = x - w / 2 + r() * 6
    lines.push(<path key={i} d={`M${xx} ${yy} q${w / 2} ${-3 + r() * 6} ${w - 6} ${-2 + r() * 4}`} stroke={i % 3 ? '#C9E59A' : '#9CCB63'} strokeWidth={1.6} fill="none" strokeLinecap="round" />)
  }
  return (
    <g>
      <path d={blobPath(x, y, w / 2, 8, seed, 0.2)} fill="#E4F2C4" stroke={INK} strokeWidth={1.2} />
      {lines}
    </g>
  )
}

const LemonWedge = ({ x, y }: { x: number; y: number }) => (
  <g>
    <path d={`M${x - 8} ${y} a8 6 0 0 1 16 0z`} fill="#F5D23A" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 5} ${y - 0.5} a5 3.5 0 0 1 10 0`} fill="#FBEA8C" />
  </g>
)

const NoriStrip = ({ x, y, w = 14, h = 5, rot = 0 }: { x: number; y: number; w?: number; h?: number; rot?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={0.8} fill="#1F2A1C" stroke={INK} strokeWidth={0.8} transform={`rotate(${rot} ${x} ${y})`} />
)

/** Tangle of noodles piled in an ellipse. */
function NoodlePile({ cx, cy, rx, ry, n, colors, width, seed }: {
  cx: number; cy: number; rx: number; ry: number; n: number; colors: string[]; width: number; seed: number
}) {
  const r = rng(seed)
  const strands: { d: string; c: string }[] = []
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2
    const k = Math.sqrt(r()) * 0.8
    let x = cx + Math.cos(a) * rx * k
    let y = cy + Math.sin(a) * ry * k
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`
    let dir = r() * Math.PI * 2
    for (let j = 0; j < 3; j++) {
      dir += -1 + r() * 2
      const len = 8 + r() * 8
      const nx = Math.min(cx + rx, Math.max(cx - rx, x + Math.cos(dir) * len))
      const ny = Math.min(cy + ry, Math.max(cy - ry, y + Math.sin(dir) * len * 0.45))
      const qx = (x + nx) / 2 + (r() - 0.5) * 8
      const qy = (y + ny) / 2 + (r() - 0.5) * 5
      d += ` Q${qx.toFixed(1)} ${qy.toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}`
      x = nx
      y = ny
    }
    strands.push({ d, c: colors[i % colors.length] })
  }
  return (
    <g strokeLinecap="round" fill="none">
      <path d={blobPath(cx, cy, rx + width, ry + width * 0.6, seed + 99, 0.1, 12)} fill={colors[0]} stroke={INK} strokeWidth={1.6} />
      {strands.map((s, i) => <path key={`o${i}`} d={s.d} stroke={INK} strokeOpacity={0.55} strokeWidth={width + 1.4} />)}
      {strands.map((s, i) => <path key={i} d={s.d} stroke={s.c} strokeWidth={width} />)}
    </g>
  )
}

/* ───────── vessels ───────── */

/** Deep rice bowl (donburi / chawan). Food sits on the rim ellipse; the front hides overflow. */
function Donburi({ surface = '#FFFDF6', children, decor = 'wave' }: { surface?: string; children?: ReactNode; decor?: 'wave' | 'dots' }) {
  return (
    <g>
      <ellipse cx={100} cy={66} rx={58} ry={12} fill={surface} stroke={INK} strokeWidth={SW} />
      {children}
      <path d="M42 66A58 12 0 0 0 158 66A58 40 0 0 1 42 66Z" fill={PAPER} stroke={INK} strokeWidth={SW} />
      {decor === 'wave' ? (
        <path d="M58 82c10 6 20 6 30 0s20-6 30 0 20 6 30 0" fill="none" stroke={NAVY} strokeWidth={2.5} />
      ) : (
        <g fill={NAVY}>
          <circle cx={66} cy={80} r={2.5} /><circle cx={84} cy={86} r={2.5} /><circle cx={100} cy={88} r={2.5} /><circle cx={116} cy={86} r={2.5} /><circle cx={134} cy={80} r={2.5} />
        </g>
      )}
    </g>
  )
}

/** Red lacquer soup bowl (owan). */
function Owan({ soup = '#C99A55', children }: { soup?: string; children?: ReactNode }) {
  return (
    <g>
      <ellipse cx={100} cy={64} rx={56} ry={12} fill="#1E1A16" stroke={INK} strokeWidth={SW} />
      <ellipse cx={100} cy={65} rx={51} ry={9.5} fill={soup} />
      <path d="M58 62c12 -3 26 -3 40 0" stroke="#fff" strokeOpacity={0.35} strokeWidth={2} fill="none" strokeLinecap="round" />
      {children}
      <path d="M44 64A56 12 0 0 0 156 64A56 42 0 0 1 44 64Z" fill="#9A2C21" stroke={INK} strokeWidth={SW} />
      <path d="M48 72A52 11 0 0 0 152 72" stroke="#D6A642" strokeWidth={1.6} fill="none" />
      <path d="M62 78q8 10 20 14" stroke="#C7493B" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
    </g>
  )
}

/** Flat oval plate with a navy ring. */
function Plate({ children, cy = 80, rx = 80, ry = 22 }: { children?: ReactNode; cy?: number; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx={100} cy={cy + 4} rx={rx} ry={ry} fill="#CDBF9F" stroke={INK} strokeWidth={SW} />
      <ellipse cx={100} cy={cy} rx={rx} ry={ry} fill={PAPER} stroke={INK} strokeWidth={SW} />
      <ellipse cx={100} cy={cy} rx={rx - 16} ry={ry - 6} fill="none" stroke={NAVY} strokeWidth={1.4} strokeDasharray="5 4" />
      <g transform="translate(0 7)">{children}</g>
    </g>
  )
}

/** Small side dish — used for kinpira, ohitashi, natto toppings. */
function Kobachi({ fill, children }: { fill: string; children?: ReactNode }) {
  return (
    <g>
      <ellipse cx={100} cy={68} rx={44} ry={11} fill={fill} stroke={INK} strokeWidth={SW} />
      {children}
      <path d="M56 68A44 11 0 0 0 144 68A44 30 0 0 1 56 68Z" fill="#3E6A8E" stroke={INK} strokeWidth={SW} />
      <path d="M62 76c8 5 16 5 24 0s16-5 24 0 16 5 24 0" stroke={PAPER} strokeWidth={2} fill="none" />
    </g>
  )
}

/** Bamboo zaru tray. */
function Zaru({ children }: { children?: ReactNode }) {
  const slats: ReactNode[] = []
  for (let i = 0; i < 12; i++) slats.push(<path key={i} d={`M${26 + i * 13} 74 l${-4 + i * 0.6} 22`} stroke="#9C7840" strokeWidth={1} />)
  return (
    <g>
      <path d="M30 72h140l16 26H14z" fill="#D9B470" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {slats}
      <path d="M14 98h172v6H14z" fill="#B48C4A" stroke={INK} strokeWidth={SW} />
      {children}
    </g>
  )
}

/* ───────── dishes ───────── */

function Potatoes() {
  return (
    <g>
      <Blob cx={78} cy={56} rx={13} ry={9} seed={21} fill="#E9C46A" />
      <Blob cx={118} cy={54} rx={14} ry={9.5} seed={22} fill="#EBC86F" />
      <Blob cx={98} cy={48} rx={12} ry={8} seed={23} fill="#F0D27F" />
      <path d="M72 52q4 -3 8 -2M112 50q5 -3 9 -1M93 44q4 -2 8 0" stroke="#FFF2C2" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </g>
  )
}

const BeefSlice = ({ x, y, seed }: { x: number; y: number; seed: number }) => (
  <g>
    <path d={blobPath(x, y, 10, 4.5, seed, 0.35, 8)} fill="#7A4423" stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 6} ${y - 1} q6 -2 11 0`} stroke="#B07548" strokeWidth={1.2} fill="none" />
  </g>
)

const OnionSlice = ({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) => (
  <path d={`M${x - 7} ${y} q7 -7 14 0`} transform={`rotate(${rot} ${x} ${y})`} stroke="#F3E2B3" strokeWidth={3} fill="none" strokeLinecap="round" />
)

const ChickenPiece = ({ x, y, seed, fill = '#D9A066' }: { x: number; y: number; seed: number; fill?: string }) => (
  <g>
    <path d={blobPath(x, y, 8, 5.5, seed, 0.18, 7)} fill={fill} stroke={INK} strokeWidth={1.2} />
    <path d={`M${x - 4} ${y - 2} q3 -2 6 -1`} stroke="#F6D2A2" strokeWidth={1.2} fill="none" strokeLinecap="round" />
  </g>
)

/** Soft-set egg layer for donburi. */
function SoftEgg({ seed = 31 }: { seed?: number }) {
  return (
    <g>
      <path d={blobPath(100, 58, 46, 10, seed, 0.12, 12)} fill="#F6CF4A" stroke={INK} strokeWidth={1.4} />
      <path d={blobPath(84, 56, 12, 4, seed + 1, 0.3, 7)} fill="#FFF6D8" />
      <path d={blobPath(118, 59, 10, 3.5, seed + 2, 0.3, 7)} fill="#FFF6D8" />
    </g>
  )
}

const DISHES: Record<string, () => ReactNode> = {
  nikujaga: () => (
    <Donburi surface="#B9772E">
      <BeefSlice x={88} y={60} seed={41} />
      <BeefSlice x={114} y={62} seed={42} />
      <Potatoes />
      <Carrot x={64} y={62} r={6} />
      <Carrot x={134} y={60} r={6} />
      <OnionSlice x={104} y={60} rot={-10} />
      <SnapPea x={102} y={44} rot={-12} />
    </Donburi>
  ),

  oyakodon: () => (
    <Donburi surface="#FFFDF6">
      <SoftEgg />
      <ChickenPiece x={80} y={58} seed={51} />
      <ChickenPiece x={110} y={55} seed={52} />
      <ChickenPiece x={128} y={60} seed={53} />
      <OnionSlice x={95} y={60} rot={8} />
      <Scallions cx={100} cy={55} rx={30} ry={5} />
      <NoriStrip x={92} y={48} w={10} h={3} rot={-15} />
      <NoriStrip x={104} y={47} w={10} h={3} rot={10} />
    </Donburi>
  ),

  gyudon: () => (
    <Donburi surface="#FFFDF6">
      <path d={blobPath(100, 58, 46, 10, 61, 0.12, 12)} fill="#8A4B25" stroke={INK} strokeWidth={1.4} />
      <BeefSlice x={82} y={56} seed={62} />
      <BeefSlice x={104} y={54} seed={63} />
      <BeefSlice x={124} y={58} seed={64} />
      <OnionSlice x={92} y={60} rot={-8} />
      <OnionSlice x={116} y={60} rot={6} />
      <PickledGinger x={128} y={50} />
    </Donburi>
  ),

  'miso-soup': () => (
    <Owan soup="#C99A55">
      <Tofu x={74} y={60} s={8} />
      <Tofu x={108} y={58} s={8} />
      <Wakame x={96} y={66} seed={71} />
      <Wakame x={126} y={64} seed={72} />
      <Scallions cx={100} cy={63} rx={36} ry={5} n={8} />
    </Owan>
  ),

  tonjiru: () => (
    <Owan soup="#B9874A">
      <path d={blobPath(80, 63, 9, 4, 81)} fill="#F2E7C9" stroke={INK} strokeWidth={1.2} />
      <path d={blobPath(118, 62, 9, 4, 82)} fill="#F2E7C9" stroke={INK} strokeWidth={1.2} />
      <Carrot x={98} y={66} r={5} />
      <Carrot x={136} y={65} r={4} />
      <path d={blobPath(104, 60, 9, 3, 83, 0.35)} fill="#D9A07A" stroke={INK} strokeWidth={1.1} />
      <path d={blobPath(66, 66, 6, 3, 84, 0.3)} fill="#7A6A5A" stroke={INK} strokeWidth={1.1} />
      <Scallions cx={100} cy={62} rx={34} ry={4} n={7} />
    </Owan>
  ),

  tamagoyaki: () => (
    <Plate cy={80} rx={74} ry={20}>
      {[0, 1, 2].map((i) => {
        const x = 66 + i * 24
        return (
          <g key={i}>
            <rect x={x} y={58} width={22} height={18} rx={4} fill="#F4C842" stroke={INK} strokeWidth={1.6} />
            <path d={`M${x + 4} 64 q7 -3 14 0 M${x + 4} 69 q7 -3 14 0`} stroke="#FBE58F" strokeWidth={1.6} fill="none" />
            <path d={`M${x} 72 h22`} stroke="#D9A82E" strokeWidth={1.2} />
          </g>
        )
      })}
      <path d={blobPath(150, 72, 10, 5, 91)} fill="#F2EDE0" stroke={INK} strokeWidth={1.2} />
    </Plate>
  ),

  'teriyaki-chicken': () => (
    <Plate>
      <Cabbage x={142} y={72} w={34} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(-8 ${64 + i * 16} 70)`}>
          <rect x={56 + i * 16} y={60} width={15} height={18} rx={4} fill="#7E3D1A" stroke={INK} strokeWidth={1.6} />
          <rect x={58 + i * 16} y={70} width={11} height={6} rx={2} fill="#F1D9B8" />
          <path d={`M${59 + i * 16} 63 q4 -2 8 0`} stroke="#E8A36A" strokeWidth={1.4} fill="none" />
        </g>
      ))}
      <Sesame cx={82} cy={64} rx={22} ry={4} n={10} />
    </Plate>
  ),

  karaage: () => (
    <Plate>
      <Cabbage x={58} y={72} w={30} seed={4} />
      {[
        [92, 70], [112, 66], [130, 72], [104, 76], [120, 58],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={blobPath(x, y, 10, 8, 100 + i, 0.3, 10)} fill="#C77A2C" stroke={INK} strokeWidth={1.5} />
          <path d={blobPath(x - 2, y - 2, 5, 3, 120 + i, 0.4, 7)} fill="#E7A456" />
        </g>
      ))}
      <LemonWedge x={150} y={70} />
    </Plate>
  ),

  shogayaki: () => (
    <Plate>
      <Cabbage x={140} y={72} w={36} seed={6} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={blobPath(74 + i * 18, 70 - (i % 2) * 6, 13, 6, 130 + i, 0.3, 9)} fill="#B9744A" stroke={INK} strokeWidth={1.4} />
          <path d={`M${66 + i * 18} ${68 - (i % 2) * 6} q8 -3 16 0`} stroke="#F2D2B0" strokeWidth={1.6} fill="none" />
        </g>
      ))}
      <OnionSlice x={90} y={74} rot={6} />
    </Plate>
  ),

  tonkatsu: () => (
    <Plate>
      <Cabbage x={146} y={70} w={30} seed={8} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={54 + i * 15} y={58} width={14} height={22} rx={2} fill="#D8963C" stroke={INK} strokeWidth={1.4} />
          <rect x={56 + i * 15} y={62} width={10} height={14} rx={1.5} fill="#F5E2C4" />
          <path d={`M${54 + i * 15} 58 h14`} stroke="#F0BE6A" strokeWidth={2} />
        </g>
      ))}
      <path d="M58 62 q12 4 24 -2 q12 -4 24 2 q10 4 18 -1" stroke="#4A2412" strokeWidth={3} fill="none" strokeLinecap="round" />
    </Plate>
  ),

  hambagu: () => (
    <Plate>
      <path d={blobPath(92, 70, 32, 13, 141, 0.08, 12)} fill="#5E3218" stroke={INK} strokeWidth={1.8} />
      <path d={blobPath(92, 66, 26, 8, 142, 0.15, 10)} fill="#8E3A20" />
      <path d="M74 64 q10 -4 20 -1" stroke="#D97A52" strokeWidth={2} fill="none" strokeLinecap="round" />
      <Carrot x={138} y={74} r={6} />
      <path d={blobPath(144, 64, 8, 5, 143)} fill="#4E8A34" stroke={INK} strokeWidth={1.2} />
    </Plate>
  ),

  omurice: () => (
    <Plate>
      <path d="M48 74 C48 52 152 52 152 74 C152 86 48 86 48 74Z" fill="#F4C842" stroke={INK} strokeWidth={1.8} />
      <path d="M62 66 q38 -12 76 0" stroke="#FBE58F" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M66 70 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6" stroke="#C8261E" strokeWidth={3.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Plate>
  ),

  'saba-misoni': () => (
    <Plate>
      <path d={blobPath(98, 72, 44, 10, 151, 0.1, 10)} fill="#B9874A" stroke={INK} strokeWidth={1.2} opacity={0.9} />
      <path d="M62 70 C70 56 128 54 140 66 C132 78 72 80 62 70Z" fill="#8C7A64" stroke={INK} strokeWidth={1.6} />
      <path d="M70 66 q30 -8 60 -2" stroke="#C9BBA6" strokeWidth={1.6} fill="none" />
      <path d="M76 70 l6 -6 M90 70 l6 -6 M104 70 l6 -6" stroke={INK} strokeWidth={1.2} />
      <path d={blobPath(100, 64, 24, 5, 152, 0.3)} fill="#9A6A2E" opacity={0.75} />
      <path d="M118 58 l10 -4 M122 60 l9 -5" stroke="#F3D58A" strokeWidth={1.8} strokeLinecap="round" />
    </Plate>
  ),

  'shake-teishoku': () => (
    <Plate>
      <path d="M58 72 C58 60 118 56 126 66 C130 74 70 82 58 72Z" fill="#F08A5D" stroke={INK} strokeWidth={1.6} />
      <path d="M58 72 C70 82 128 76 126 66" stroke="#B8B2A4" strokeWidth={3} fill="none" />
      <path d="M68 66 q12 -4 24 -2 M76 70 q14 -4 28 -2" stroke="#FBC6A6" strokeWidth={1.6} fill="none" />
      <path d={blobPath(144, 70, 11, 7, 161, 0.25)} fill="#FFFDF4" stroke={INK} strokeWidth={1.2} />
      <circle cx={144} cy={68} r={1.6} fill="#28251F" opacity={0.5} />
    </Plate>
  ),

  'mabo-dofu': () => (
    <Kobachi fill="#B2442A">
      <path d={blobPath(100, 66, 40, 8, 171, 0.1, 10)} fill="#B8402A" />
      <Tofu x={70} y={62} s={7} fill="#FFF8EA" />
      <Tofu x={94} y={58} s={7} fill="#FFF8EA" />
      <Tofu x={114} y={64} s={7} fill="#FFF8EA" />
      <Scatter cx={100} cy={64} rx={34} ry={5} n={14} seed={172}
        render={(x, y, _r, i) => <circle key={i} cx={x} cy={y} r={1.3} fill="#5A2414" />} />
      <Scallions cx={100} cy={62} rx={30} ry={4} n={7} />
    </Kobachi>
  ),

  hiyayakko: () => (
    <Plate cy={80} rx={60} ry={18}>
      <path d="M72 66 l28 -9 l28 9 l-28 9z" fill="#FFFDF4" stroke={INK} strokeWidth={1.6} />
      <path d="M72 66 v12 l28 9 v-12z" fill="#EDE6D2" stroke={INK} strokeWidth={1.6} />
      <path d="M100 75 v12 l28 -9 v-12z" fill="#DDD3BB" stroke={INK} strokeWidth={1.6} />
      <circle cx={100} cy={62} r={4} fill="#F3D58A" stroke={INK} strokeWidth={1} />
      <Scallions cx={92} cy={66} rx={10} ry={3} n={5} />
      <Bonito cx={108} cy={65} rx={10} ry={3} n={4} />
    </Plate>
  ),

  'yaki-udon': () => (
    <Plate>
      <NoodlePile cx={100} cy={68} rx={38} ry={10} n={22} colors={['#EBCB92', '#F3DDB0', '#DDB878']} width={4.2} seed={181} />
      <Carrot x={84} y={64} r={4} />
      <Carrot x={118} y={70} r={3.5} />
      <path d={blobPath(108, 62, 6, 3, 182)} fill="#8FC266" stroke={INK} strokeWidth={1} />
      <path d={blobPath(90, 72, 5, 2.6, 183)} fill="#C9E59A" stroke={INK} strokeWidth={1} />
      <Bonito cx={100} cy={62} rx={18} ry={4} n={6} />
    </Plate>
  ),

  yakisoba: () => (
    <Plate>
      <NoodlePile cx={100} cy={68} rx={40} ry={10} n={34} colors={['#9A6230', '#B4783E', '#86522A']} width={2.4} seed={191} />
      <path d={blobPath(84, 64, 6, 3, 192)} fill="#9CCB63" stroke={INK} strokeWidth={1} />
      <path d={blobPath(114, 70, 5, 2.6, 193)} fill="#C9E59A" stroke={INK} strokeWidth={1} />
      <PickledGinger x={122} y={60} />
      <Aonori cx={100} cy={66} rx={34} ry={7} />
    </Plate>
  ),

  'zaru-soba': () => (
    <Zaru>
      <NoodlePile cx={90} cy={74} rx={40} ry={9} n={40} colors={['#8C7A62', '#A39176', '#7A6A54']} width={2} seed={221} />
      <NoriStrip x={78} y={66} w={12} h={2.5} rot={-20} />
      <NoriStrip x={92} y={64} w={12} h={2.5} rot={10} />
      <NoriStrip x={104} y={69} w={12} h={2.5} rot={-6} />
      <g>
        <ellipse cx={160} cy={76} rx={14} ry={5} fill="#3A2A1C" stroke={INK} strokeWidth={1.6} />
        <path d="M146 76 v10 a14 5 0 0 0 28 0 v-10" fill={PAPER} stroke={INK} strokeWidth={1.6} />
        <path d="M150 84 h20" stroke={NAVY} strokeWidth={2} />
      </g>
    </Zaru>
  ),

  'kare-raisu': () => (
    <Plate>
      <path d={blobPath(80, 70, 30, 12, 201, 0.1, 10)} fill="#FFFDF6" stroke={INK} strokeWidth={1.5} />
      <Scatter cx={78} cy={68} rx={24} ry={8} n={22} seed={202}
        render={(x, y, rot, i) => <ellipse key={i} cx={x} cy={y} rx={2} ry={1} transform={`rotate(${rot} ${x} ${y})`} fill="#fff" stroke="#D8CFB8" strokeWidth={0.5} />} />
      <path d="M96 60 C120 54 156 62 152 76 C148 88 106 88 98 80 C110 74 108 64 96 60Z" fill="#A0601E" stroke={INK} strokeWidth={1.6} />
      <Blob cx={118} cy={70} rx={6} ry={5} seed={203} fill="#E9C46A" sw={1.2} />
      <Blob cx={136} cy={74} rx={5} ry={4} seed={204} fill="#E9C46A" sw={1.2} />
      <Carrot x={128} y={66} r={4} />
      <PickledGinger x={62} y={62} />
    </Plate>
  ),

  okonomiyaki: () => (
    <Plate>
      <ellipse cx={100} cy={72} rx={46} ry={14} fill="#B87A3A" stroke={INK} strokeWidth={1.8} />
      <ellipse cx={100} cy={69} rx={40} ry={10} fill="#5A2E14" />
      <path d="M66 66 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6" stroke="#FFF6DE" strokeWidth={2} fill="none" strokeLinejoin="round" />
      <Bonito cx={100} cy={66} rx={26} ry={5} n={8} />
      <Aonori cx={100} cy={70} rx={34} ry={7} n={26} />
    </Plate>
  ),

  'kinpira-gobo': () => (
    <Kobachi fill="#6B4A2C">
      {Array.from({ length: 14 }).map((_, i) => {
        const r = rng(210 + i)
        const x = 66 + r() * 66
        const y = 58 + r() * 10
        const rot = -30 + r() * 60
        return <rect key={i} x={x} y={y} width={16} height={2.6} rx={1.2} transform={`rotate(${rot} ${x} ${y})`} fill={i % 3 === 0 ? '#E8792E' : '#8A5A32'} stroke={INK} strokeWidth={0.7} />
      })}
      <Sesame cx={100} cy={62} rx={30} ry={5} n={12} />
    </Kobachi>
  ),

  'kabocha-nimono': () => (
    <Kobachi fill="#B9874A">
      {[[78, 60], [100, 56], [122, 61]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 11} ${y + 6} L${x - 7} ${y - 6} L${x + 9} ${y - 7} L${x + 12} ${y + 5} Z`} fill="#F0A23A" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
          <path d={`M${x - 11} ${y + 6} L${x + 12} ${y + 5} L${x + 11} ${y + 9} L${x - 10} ${y + 10} Z`} fill="#3E6A2E" stroke={INK} strokeWidth={1.4} />
          <path d={`M${x - 4} ${y - 2} l8 0`} stroke="#F8C873" strokeWidth={1.4} />
        </g>
      ))}
    </Kobachi>
  ),

  'horenso-ohitashi': () => (
    <Kobachi fill="#C9B38A">
      <path d="M72 64 C74 52 126 50 128 62 C126 70 76 72 72 64Z" fill="#3F7A2E" stroke={INK} strokeWidth={1.6} />
      <path d="M80 60 q20 -6 40 0 M82 64 q18 -4 36 -1" stroke="#7DB34A" strokeWidth={1.6} fill="none" />
      <path d="M118 58 q6 2 8 6" stroke="#C8486A" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <Bonito cx={100} cy={55} rx={14} ry={3} n={5} />
    </Kobachi>
  ),

  'nasu-dengaku': () => (
    <Plate>
      {[70, 116].map((x, i) => (
        <g key={i}>
          <path d={`M${x - 22} 72 C${x - 22} 60 ${x + 22} 58 ${x + 26} 68 C${x + 22} 80 ${x - 18} 82 ${x - 22} 72Z`} fill="#4A2A5A" stroke={INK} strokeWidth={1.6} />
          <path d={`M${x - 16} 70 C${x - 14} 64 ${x + 16} 62 ${x + 20} 68 C${x + 14} 74 ${x - 12} 76 ${x - 16} 70Z`} fill="#8E5A2C" />
          <path d={`M${x - 8} 67 q10 -3 18 0`} stroke="#C99A55" strokeWidth={1.4} fill="none" />
          <path d={`M${x + 26} 68 l6 -3`} stroke="#3E6A2E" strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      <Sesame cx={94} cy={68} rx={40} ry={4} n={14} />
    </Plate>
  ),

  onigiri: () => (
    <Plate>
      {[78, 122].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 46 C${x + 6} 46 ${x + 22} 72 ${x + 20} 78 C${x + 16} 84 ${x - 16} 84 ${x - 20} 78 C${x - 22} 72 ${x - 6} 46 ${x} 46Z`} fill="#FFFDF6" stroke={INK} strokeWidth={1.7} />
          <path d={`M${x - 14} 70 h28 v10 c-8 4 -20 4 -28 0z`} fill="#1F2A1C" stroke={INK} strokeWidth={1.2} />
          {i === 0 ? <circle cx={x} cy={62} r={4} fill="#B8243A" stroke={INK} strokeWidth={1} /> : <path d={blobPath(x, 62, 5, 3, 231)} fill="#F08A5D" stroke={INK} strokeWidth={1} />}
        </g>
      ))}
    </Plate>
  ),

  'plain-rice': () => (
    <Donburi surface="#FFFDF6" decor="dots">
      <Rice cx={100} cy={58} rx={52} ry={13} seed={251} n={60} />
    </Donburi>
  ),

  'natto-gohan': () => (
    <Donburi surface="#FFFDF6" decor="dots">
      <Rice cx={100} cy={60} rx={50} ry={11} seed={241} />
      <path d={blobPath(100, 56, 20, 6, 242, 0.2)} fill="#8E6A2E" stroke={INK} strokeWidth={1.2} />
      <Scatter cx={100} cy={55} rx={17} ry={4.5} n={16} seed={243}
        render={(x, y, _r, i) => <ellipse key={i} cx={x} cy={y} rx={2.2} ry={1.6} fill="#B08844" stroke="#5A3E1A" strokeWidth={0.5} />} />
      <circle cx={100} cy={52} r={4.2} fill="#F2A71E" stroke={INK} strokeWidth={1.2} />
      <Scallions cx={100} cy={57} rx={26} ry={4} n={7} />
    </Donburi>
  ),
}

/** The 200×120 food drawing (no background) — reusable in larger scenes. */
export function DishDrawing({ id }: { id: string }) {
  const draw = DISHES[id]
  // Scale up slightly around the plate center so the food reads at card size.
  return <g transform="translate(100 74) scale(1.14) translate(-100 -74)">{draw ? draw() : <Donburi surface="#C99A55" />}</g>
}

/** Background used behind every dish card. */
export function DishBackdrop() {
  return (
    <g>
      <rect width={200} height={120} fill={NAVY} />
      <circle cx={100} cy={140} r={110} fill="none" stroke="#D6A642" strokeOpacity={0.25} strokeWidth={18} strokeDasharray="4 10" />
      <ellipse cx={100} cy={108} rx={84} ry={9} fill="#14304D" opacity={0.55} />
    </g>
  )
}

/** Stock pot used for Ramen Basics — liquid coloured with the recipe tint. */
function BasicPot({ tint }: { tint: string }) {
  return (
    <g>
      <ellipse cx={100} cy={52} rx={50} ry={11} fill="#5E6366" stroke={INK} strokeWidth={SW} />
      <ellipse cx={100} cy={53} rx={45} ry={9} fill={tint} />
      <ellipse cx={86} cy={51} rx={16} ry={2.6} fill="#fff" opacity={0.25} />
      <path d="M50 52A50 11 0 0 0 150 52V96A50 11 0 0 1 50 96Z" fill="#A9ADAF" stroke={INK} strokeWidth={SW} />
      <path d="M58 60V92" stroke="#E6E7E4" strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      <path d="M50 66h-12a4 4 0 0 0 0 8h12M150 66h12a4 4 0 0 1 0 8h-12" fill="#7E8386" stroke={INK} strokeWidth={SW} />
    </g>
  )
}

export function DishArt({ id, recipe, route = 'quick' }: { id: string; recipe?: Recipe; route?: RouteId }) {
  const spec = recipe ? artFor(recipe, route) : undefined
  const body = spec ? (
    <g transform="translate(100 74) scale(1.08) translate(-100 -74)">
      <RamenDrawing spec={spec} />
    </g>
  ) : recipe?.kind === 'basic' ? (
    <BasicPot tint={recipe.tint} />
  ) : (
    <DishDrawing id={id} />
  )
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <DishBackdrop />
      <g className="yk-steam" fill="none" stroke="#F5E8CD" strokeOpacity={0.75} strokeWidth={3} strokeLinecap="round">
        <path d="M86 40c0-6 6-6 6-12" />
        <path d="M106 38c0-6 6-6 6-12" />
      </g>
      {body}
    </svg>
  )
}

export const ILLUSTRATED_DISHES = Object.keys(DISHES)
