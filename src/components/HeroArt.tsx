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
      <rect width={400} height={232} fill="#234D76" />
      <circle cx={200} cy={250} r={210} fill="none" stroke="#D6A642" strokeOpacity={0.22} strokeWidth={34} strokeDasharray="6 16" />
      <rect y={164} width={400} height={68} fill="#8C5A30" />
      <g stroke="#6B3F1F" strokeWidth={1.4} opacity={0.6} fill="none">
        <path d="M0 182 C120 178 260 186 400 180" />
        <path d="M0 206 C140 202 240 212 400 206" />
      </g>
      <rect y={162} width={400} height={4} fill="#28251F" />

      {/* noren */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={i * 80 + 2} y={-2} width={76} height={34} fill={i % 2 ? '#F5E8CD' : '#B83227'} stroke="#28251F" strokeWidth={2} />
        ))}
        <text x={200} y={22} textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize={16} fill="#28251F" aria-hidden="true">
          らあめん
        </text>
      </g>

      {/* steam */}
      <g className="yk-steam" fill="none" stroke="#F5E8CD" strokeOpacity={0.7} strokeWidth={4} strokeLinecap="round">
        <path d="M168 66c0-10 10-10 10-20" />
        <path d="M196 60c0-10 10-10 10-20" />
        <path d="M224 66c0-10 10-10 10-20" />
      </g>

      {/* the bowl */}
      <g transform="translate(70 34) scale(1.3)">
        <RamenDrawing spec={spec} />
      </g>

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
