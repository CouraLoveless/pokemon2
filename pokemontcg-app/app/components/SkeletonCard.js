//LOADING DISPLAY

export default function SkeletonCard() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded overflow-hidden"
      style={{
        background: '#0a0a0a',
        border: '2px solid #222',
        aspectRatio: '2.5/3.5',
      }}
    >
      <div style={{ animation: 'spin 1s linear infinite', width: '36px', height: '36px' }}>
        <svg viewBox="0 0 48 48" width="36" height="36">
          <path d="M4 24 A20 20 0 0 1 44 24 Z" fill="#cc0000"/>
          <path d="M4 24 A20 20 0 0 0 44 24 Z" fill="#f0f0f0"/>
          <rect x="4" y="22" width="40" height="4" fill="#111"/>
          <circle cx="24" cy="24" r="20" fill="none" stroke="#111" strokeWidth="2"/>
          <circle cx="24" cy="24" r="6" fill="#111"/>
          <circle cx="24" cy="24" r="4" fill="#333"/>
          <circle cx="24" cy="24" r="2.5" fill="#555"/>
        </svg>
      </div>
    </div>
  )
}