import { RECIPE_BY_ID } from '../data/recipes'
import { RamenDrawing } from './RamenArt'

/** Homepage cover: a shoyu ramen at a ramen-counter, same print style as the cards. */
export function HeroArt() {
  const spec = RECIPE_BY_ID['tokyo-shoyu'].art!
  return (
    <svg
      className="yk-hero-art"
      viewBox="0 0 400 232"
      role="img"
      aria-label="Illustration of a bowl of shoyu ramen with chashu, egg, menma, naruto, nori and scallions"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="yk-hero-night" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2E628F" />
          <stop offset="0.58" stopColor="#234D76" />
          <stop offset="1" stopColor="#1A3A5A" />
        </linearGradient>
        <linearGradient id="yk-hero-wood" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#A96C3E" />
          <stop offset="1" stopColor="#71421F" />
        </linearGradient>
        <radialGradient id="yk-hero-broth" cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#F3C878" stopOpacity="0.78" />
          <stop offset="0.42" stopColor="#B96C32" stopOpacity="0.32" />
          <stop offset="1" stopColor="#4C2414" stopOpacity="0.08" />
        </radialGradient>
        <filter id="yk-hero-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="3" floodColor="#14304D" floodOpacity="0.72" />
        </filter>
      </defs>
      <rect width={400} height={232} fill="url(#yk-hero-night)" />
      <circle cx={200} cy={250} r={210} fill="none" stroke="#D6A642" strokeOpacity={0.18} strokeWidth={34} strokeDasharray="6 16" />
      <circle cx={200} cy={250} r={172} fill="none" stroke="#F5E8CD" strokeOpacity={0.08} strokeWidth={2} strokeDasharray="2 12" />
      <rect y={164} width={400} height={68} fill="url(#yk-hero-wood)" />
      <g stroke="#6B3F1F" strokeWidth={1.4} opacity={0.62} fill="none">
        <path d="M0 182 C120 178 260 186 400 180" />
        <path d="M0 206 C140 202 240 212 400 206" />
        <path d="M22 224 C96 218 174 229 256 220 S350 218 400 224" />
      </g>
      <rect y={162} width={400} height={4} fill="#28251F" opacity="0.92" />

      {/* noren */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={i * 80 + 2} y={-2} width={76} height={34} fill={i % 2 ? '#F5E8CD' : '#B83227'} stroke="#28251F" strokeWidth={2} />
            <path d={`M${i * 80 + 8} 4h64`} stroke="#FFF8E9" strokeOpacity="0.28" strokeWidth="2" />
          </g>
        ))}
        <text x={200} y={22} textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize={16} fill="#28251F" aria-hidden="true">
          らあめん
        </text>
      </g>

      {/* steam */}
      <g className="yk-steam" fill="none" stroke="#F5E8CD" strokeOpacity={0.78} strokeWidth={4} strokeLinecap="round">
        <path d="M168 66c0-10 10-10 10-20" />
        <path d="M196 60c0-10 10-10 10-20" />
        <path d="M224 66c0-10 10-10 10-20" />
      </g>

      {/* the bowl */}
      <ellipse cx="200" cy="181" rx="112" ry="14" fill="#14304D" opacity="0.45" />
      <g transform="translate(70 34) scale(1.3)" filter="url(#yk-hero-shadow)">
        <RamenDrawing spec={spec} />
      </g>
      <ellipse cx="200" cy="112" rx="82" ry="37" fill="url(#yk-hero-broth)" opacity="0.32" pointerEvents="none" />
      <path className="yk-hero-glint" d="M164 103c18-11 43-13 65-5" fill="none" stroke="#FFF5D5" strokeOpacity="0.58" strokeWidth="3" strokeLinecap="round" />
      <circle className="yk-hero-glint" cx="250" cy="126" r="3" fill="#FFF5D5" opacity="0.7" />

      {/* renge spoon */}
      <g transform="translate(318 168) rotate(-18)">
        <path d="M-26 0 q0 -14 22 -14 q14 0 18 8 l26 -4 q4 0 4 4 l-26 8 q-8 10 -22 10 q-22 0 -22 -12z" fill="#F5E8CD" stroke="#28251F" strokeWidth={2.4} />
        <path d="M-18 -2 q8 -6 18 -2" stroke="#B83227" strokeWidth={2} fill="none" />
      </g>

      {/* chopsticks */}
      <g>
        <path d="M24 214 L250 184" stroke="#28251F" strokeWidth={6} strokeLinecap="round" />
        <path d="M24 214 L250 184" stroke="#B8643A" strokeWidth={3.6} strokeLinecap="round" />
        <path d="M28 222 L252 194" stroke="#28251F" strokeWidth={6} strokeLinecap="round" />
        <path d="M28 222 L252 194" stroke="#B8643A" strokeWidth={3.6} strokeLinecap="round" />
      </g>
    </svg>
  )
}
