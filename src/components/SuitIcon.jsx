const PATHS = {
  spade: (
    <>
      <path d="M16 3 C14.8 5.2,11.8 8.1,9.3 10.7 C6.7 13.5,5.6 15.8,5.6 18.1 C5.6 21.9,8.3 24.4,11.7 24.4 C13.6 24.4,15.1 23.6,16 22.1 C16.9 23.6,18.4 24.4,20.3 24.4 C23.7 24.4,26.4 21.9,26.4 18.1 C26.4 15.8,25.3 13.5,22.7 10.7 C20.2 8.1,17.2 5.2,16 3 Z" fill="currentColor"/>
      <path d="M16 20.8 C15 22.2,14.3 24.2,14.3 26 C14.3 27.6,13.7 28.8,12.6 29.8 L19.4 29.8 C18.3 28.8,17.7 27.6,17.7 26 C17.7 24.2,17 22.2,16 20.8 Z" fill="currentColor"/>
    </>
  ),
  heart: (
    <path d="M16 28.4 C14.9 27.5,8.6 22.7,6 18.6 C4.7 16.5,4.2 14.6,4.2 12.8 C4.2 8.7,7 5.8,10.9 5.8 C13.1 5.8,14.8 6.8,16 8.8 C17.2 6.8,18.9 5.8,21.1 5.8 C25 5.8,27.8 8.7,27.8 12.8 C27.8 14.6,27.3 16.5,26 18.6 C23.4 22.7,17.1 27.5,16 28.4 Z" fill="currentColor"/>
  ),
  club: (
    <path d="M16 8.7 C19 8.7,21.4 11,21.4 13.9 C21.4 15.2,20.9 16.5,20 17.4 C20.5 17.2,21.1 17.1,21.7 17.1 C24.9 17.1,27.3 19.4,27.3 22.5 C27.3 25.7,24.9 28,21.7 28 C19.6 28,17.8 26.9,16.8 25.2 C17.3 26.7,17.7 28.1,17.7 29.3 L14.3 29.3 C14.3 28.1,14.7 26.7,15.2 25.2 C14.2 26.9,12.4 28,10.3 28 C7.1 28,4.7 25.7,4.7 22.5 C4.7 19.4,7.1 17.1,10.3 17.1 C10.9 17.1,11.5 17.2,12 17.4 C11.1 16.5,10.6 15.2,10.6 13.9 C10.6 11,13 8.7,16 8.7 Z" fill="currentColor"/>
  ),
  diamond: (
    <path d="M16 4 L27.5 16 L16 28 L4.5 16 Z" fill="currentColor"/>
  ),
}

const SUITS = ['spade', 'heart', 'club', 'diamond']

export function TeacupIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      {/* Steam — two gentle S-curves */}
      <path
        d="M11 8 Q9.5 5.5, 11 3"
        stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
      <path
        d="M20 8 Q18.5 5.5, 20 3"
        stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
      {/* Cup body — wide trapezoid with 3-scallop wavy rim */}
      <path
        d="M4.5 10 Q8 6.5,11.5 10 Q15.5 6.5,20 10 Q23.5 6.5,27.5 10 L23.5 23 L8 23 Z"
        fill="currentColor"
      />
      {/* Handle — filled D-loop on the right */}
      <path
        d="M26 13 Q31 12,31 18 Q31 23.5,23.5 22.5 L23 21 Q28.5 21.5,28.5 18 Q28.5 14,25.5 14.5 Z"
        fill="currentColor"
      />
      {/* Saucer */}
      <ellipse cx="16" cy="26.5" rx="13" ry="2.5" fill="currentColor" />
    </svg>
  )
}

export function SuitIcon({ suit, size = 16, className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {PATHS[suit]}
    </svg>
  )
}

export function CrownIcon({ size = 32, className = '' }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M3 27 L3 14 L10 19 L16 4 L22 19 L29 14 L29 27 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function CheshireIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" fill="none">
      <ellipse cx="21" cy="24" rx="3.4" ry="4.2" fill="currentColor"/>
      <ellipse cx="43" cy="24" rx="3.4" ry="4.2" fill="currentColor"/>
      <path d="M14 37c7 8 15 12 18 12s11-4 18-12c-3 2-7 4-11 5l-2-4-3 5-3-5-2 4c-4-1-8-3-11-5Z" fill="currentColor"/>
    </svg>
  )
}

export function KeyIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" fill="none">
      <path d="M24 36a14 14 0 1 1 11-6h21v6h-5v5h-6v5h-7v-7h-6a14 14 0 0 1-8 3Z" fill="currentColor"/>
      <circle cx="24" cy="22" r="6" fill="#f8f3ea"/>
    </svg>
  )
}

export function RabbitIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" fill="none">
      <path d="M40 8c2-6 8-8 11-5 3 3 1 10-2 15-2 4-3 8-2 10 7 2 12 7 12 15 0 11-10 19-24 19S11 56 11 45c0-10 8-18 19-19-1-4 0-8 2-13 2-5 5-8 8-8Z" fill="currentColor"/>
      <path d="M46 10c1-4 0-7-2-8-2-1-4 1-5 5-1 3 0 7 2 8 2 1 4-1 5-5Z" fill="currentColor"/>
      <circle cx="25" cy="42" r="2.3" fill="#f8f3ea"/>
    </svg>
  )
}

export function PocketWatchIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" fill="none">
      <path d="M27 8h10a4 4 0 0 1 0 8h-1v4c10 2 18 11 18 23 0 13-10 23-22 23S10 56 10 43c0-12 8-21 18-23v-4h-1a4 4 0 0 1 0-8Z" fill="currentColor"/>
      <circle cx="32" cy="43" r="16" fill="#f8f3ea"/>
      <path d="M32 33v10l7 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="43" r="1.7" fill="currentColor"/>
    </svg>
  )
}

export function TeacupPackIcon({ size = 24, className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" fill="none">
      <path d="M14 25h28v10c0 9-6 15-14 15S14 44 14 35V25Z" fill="currentColor"/>
      <path d="M42 28h5c5 0 7 3 7 7s-3 8-8 8h-4" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M12 52h36" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
      <path d="M24 16c2 2 2 4 0 6M32 14c2 2 2 5 0 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
    </svg>
  )
}

// Cycles through suits by index — handy for lists
export function suitAt(index) {
  return SUITS[index % 4]
}
