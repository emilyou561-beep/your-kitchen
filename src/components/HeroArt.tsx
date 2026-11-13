import { DishDrawing } from './DishArt'

/**
 * Homepage cover: a light Japanese home breakfast set (teishoku) on a wooden tray —
 * rice, miso soup, salt salmon, tamagoyaki. Built from the same dish drawings as the cards.
 */
export function HeroArt() {
  return (
    <svg
      className="yk-hero-art"
      viewBox="0 0 400 232"
      role="img"
      aria-label="Illustration of a Japanese home breakfast tray: rice, miso soup, grilled salmon and rolled omelette"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* backdrop: navy wall, sunburst, wooden counter */}
      <rect width={400} height={232} fill="#234D76" />
      <circle cx={200} cy={250} r={210} fill="none" stroke="#D6A642" strokeOpacity={0.22} strokeWidth={34} strokeDasharray="6 16" />
      <rect y={150} width={400} height={82} fill="#8C5A30" />
      <g stroke="#6B3F1F" strokeWidth={1.4} opacity={0.6}>
        <path d="M0 168 C120 164 260 172 400 166" fill="none" />
        <path d="M0 190 C140 186 240 196 400 190" fill="none" />
        <path d="M0 212 C110 208 280 216 400 210" fill="none" />
      </g>
      <rect y={148} width={400} height={4} fill="#28251F" />

      {/* noren curtain hint, top */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={i * 80 + 2} y={-2} width={76} height={34} fill={i % 2 ? '#F5E8CD' : '#B83227'} stroke="#28251F" strokeWidth={2} />
        ))}
        <text x={200} y={22} textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize={16} fill="#28251F" aria-hidden="true">
          朝ごはん
        </text>
      </g>

      {/* steam */}
      <g className="yk-steam" fill="none" stroke="#F5E8CD" strokeOpacity={0.7} strokeWidth={4} strokeLinecap="round">
        <path d="M128 92c0-8 8-8 8-16" />
        <path d="M262 90c0-8 8-8 8-16" />
        <path d="M280 88c0-8 8-8 8-16" />
      </g>

      {/* tray */}
      <path d="M44 132 L356 132 L384 214 L16 214 Z" fill="#5A2A12" stroke="#28251F" strokeWidth={3} strokeLinejoin="round" />
      <path d="M58 140 L342 140 L364 206 L36 206 Z" fill="#7A3A1A" stroke="#3E1C0A" strokeWidth={1.5} strokeLinejoin="round" />

      {/* back row: rice (left), miso soup (right) */}
      <g transform="translate(46 54) scale(0.82)">
        <DishDrawing id="plain-rice" />
      </g>
      <g transform="translate(190 52) scale(0.84)">
        <DishDrawing id="miso-soup" />
      </g>

      {/* front row: salmon (left), tamagoyaki (right) */}
      <g transform="translate(20 112) scale(0.86)">
        <DishDrawing id="shake-teishoku" />
      </g>
      <g transform="translate(208 116) scale(0.8)">
        <DishDrawing id="tamagoyaki" />
      </g>

      {/* chopsticks on a rest */}
      <g>
        <ellipse cx={334} cy={196} rx={9} ry={4} fill="#234D76" stroke="#28251F" strokeWidth={1.5} />
        <path d="M150 210 L392 182" stroke="#28251F" strokeWidth={6} strokeLinecap="round" />
        <path d="M150 210 L392 182" stroke="#B8643A" strokeWidth={3.6} strokeLinecap="round" />
        <path d="M156 216 L394 192" stroke="#28251F" strokeWidth={6} strokeLinecap="round" />
        <path d="M156 216 L394 192" stroke="#B8643A" strokeWidth={3.6} strokeLinecap="round" />
      </g>
    </svg>
  )
}
