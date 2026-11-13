/**
 * Showa-era fridge magnets for the homepage freezer door — decorative only.
 * Each one wobbles when tapped or hovered, like it's loosely stuck on.
 */
const INK = '#28251F'

function MilkBottle() {
  return (
    <svg viewBox="0 0 60 90" aria-hidden="true" focusable="false">
      <path d="M20 8h20v10c0 4 10 8 10 18v40c0 6-4 9-9 9H19c-5 0-9-3-9-9V36c0-10 10-14 10-18z" fill="#FFFDF6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="17" y="3" width="26" height="10" rx="3" fill="#B83227" stroke={INK} strokeWidth="3" />
      <rect x="14" y="42" width="32" height="28" rx="4" fill="#234D76" stroke={INK} strokeWidth="2.5" />
      <text x="30" y="61" textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize="13" fill="#F5E8CD">牛乳</text>
      <path d="M16 30c4-4 6-6 6-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".8" />
    </svg>
  )
}

function Daruma() {
  return (
    <svg viewBox="0 0 80 84" aria-hidden="true" focusable="false">
      <path d="M40 4C62 4 74 22 74 46c0 22-14 34-34 34S6 68 6 46C6 22 18 4 40 4z" fill="#C8261E" stroke={INK} strokeWidth="3" />
      <ellipse cx="40" cy="40" rx="20" ry="17" fill="#FFF3E0" stroke={INK} strokeWidth="2.5" />
      <circle cx="32" cy="38" r="5" fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx="32" cy="38" r="2.4" fill={INK} />
      <circle cx="48" cy="38" r="5" fill="#fff" stroke={INK} strokeWidth="2" />
      <path d="M28 30q4-4 8 0M44 30q4-4 8 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M34 49q6 4 12 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M22 64q18 10 36 0" stroke="#D6A642" strokeWidth="4" fill="none" strokeLinecap="round" />
      <text x="40" y="76" textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize="9" fill="#F5E8CD">福</text>
    </svg>
  )
}

function Fan() {
  return (
    <svg viewBox="0 0 96 64" aria-hidden="true" focusable="false">
      <path d="M48 60L6 22A60 60 0 0 1 90 22Z" fill="#F5E8CD" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <clipPath id="yk-fan-clip">
        <path d="M48 60L6 22A60 60 0 0 1 90 22Z" />
      </clipPath>
      <g clipPath="url(#yk-fan-clip)" fill="none" stroke="#234D76" strokeWidth="2.4">
        <circle cx="30" cy="34" r="12" /><circle cx="30" cy="34" r="7" />
        <circle cx="54" cy="30" r="12" /><circle cx="54" cy="30" r="7" />
        <circle cx="78" cy="34" r="12" /><circle cx="78" cy="34" r="7" />
        <circle cx="42" cy="16" r="12" /><circle cx="66" cy="16" r="12" />
      </g>
      <circle cx="18" cy="14" r="7" fill="#B83227" />
      <path d="M48 60L6 22M48 60L90 22" stroke={INK} strokeWidth="3" />
      <circle cx="48" cy="58" r="4" fill="#D6A642" stroke={INK} strokeWidth="2" />
    </svg>
  )
}

function Square() {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="50" height="50" rx="9" fill="#234D76" stroke={INK} strokeWidth="3" />
      <text x="28" y="38" textAnchor="middle" fontFamily="'Zen Antique', serif" fontSize="28" fill="#F5E8CD">夜</text>
    </svg>
  )
}

export function Magnets() {
  return (
    <div className="yk-magnets" aria-hidden="true">
      <span className="yk-magnet yk-magnet--milk"><MilkBottle /></span>
      <span className="yk-magnet yk-magnet--daruma"><Daruma /></span>
      <span className="yk-magnet yk-magnet--fan"><Fan /></span>
      <span className="yk-magnet yk-magnet--yoru"><Square /></span>
    </div>
  )
}
