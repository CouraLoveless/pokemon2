'use client'

import { useMemo, useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useGetCardsQuery } from '@/store/pokemonApi'
import SkeletonCard from './SkeletonCard'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'
import Image from 'next/image'

const Pokeball = ({ size = 48, spin = false }) => (
  <div style={{ animation: spin ? 'spin 1s linear infinite' : 'none', width: size, height: size }}>
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <path d="M4 24 A20 20 0 0 1 44 24 Z" fill="#cc0000"/>
      <path d="M4 24 A20 20 0 0 0 44 24 Z" fill="#f0f0f0"/>
      <rect x="4" y="21.5" width="40" height="5" fill="#222"/>
      <circle cx="24" cy="24" r="20" fill="none" stroke="#222" strokeWidth="2"/>
      <circle cx="24" cy="24" r="7" fill="#222"/>
      <circle cx="24" cy="24" r="5" fill="#ddd"/>
      <circle cx="24" cy="24" r="3" fill="#fff"/>
    </svg>
  </div>
)

function playSelectSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'square'
    osc.frequency.setValueAtTime(523, t)
    osc.frequency.setValueAtTime(659, t + 0.08)
    osc.frequency.setValueAtTime(784, t + 0.16)
    gain.gain.setValueAtTime(0.15, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
    osc.start(t)
    osc.stop(t + 0.3)
  } catch(e) {}
}

const TYPE_COLORS = {
  Fire:'#ff6b35',
  Water:'#4a9eff',
  Grass:'#5cb85c',
  Lightning:'#f0d030',
  Psychic:'#c060e0',
  Fighting:'#c07030',
  Darkness:'#705898',
  Metal:'#a8a8d8',
  Dragon:'#7038f8',
  Fairy:'#ee99ac',
  Colorless:'#a8a878',
}

export default function CardGrid({ onCardClick }) {
  const { query, type, set, rarity, page, pageSize } = useSelector(s => s.filters)
  const collection = useSelector(s => s.collection)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeCard, setActiveCard] = useState(null)
  const hoverTimer = useRef(null)

  const q = useMemo(() => {
    const parts = []
    if (query)  parts.push(`name:${query}*`)
    if (type)   parts.push(`types:${type}`)
    if (set)    parts.push(`set.id:${set}`)
    if (rarity) parts.push(`rarity:"${rarity}"`)
    return parts.join(' ')
  }, [query, type, set, rarity])

  const { data, isLoading, isError, isFetching, refetch } = useGetCardsQuery(
    { page, pageSize, q },
    { refetchOnMountOrArgChange: true }
  )
  const cards = data?.data ?? []
  const total = data?.totalCount ?? 0

  const handleMouseEnter = useCallback((card) => {
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHoveredCard(card), 80)
  }, [])

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimer.current)
  }, [])

  const handleRowClick = useCallback((card) => {
    playSelectSound()
    setActiveCard(card)
    onCardClick(card)
  }, [onCardClick])

  const displayCard = hoveredCard ?? activeCard

  const rarityColor = (r) => {
    if (!r) return { bg: '#1a3d7a', color: '#aac8ff' }
    if (r.includes('Secret')) return { bg: '#4a0080', color: '#e0a0ff' }
    if (r.includes('Ultra'))  return { bg: '#804000', color: '#ffd070' }
    if (r.includes('Holo'))   return { bg: '#806000', color: '#ffd700' }
    if (r === 'Rare')         return { bg: '#1a5030', color: '#80e0a0' }
    if (r === 'Uncommon')     return { bg: '#1a3060', color: '#80a8e0' }
    return { bg: '#222', color: '#888' }
  }

  return (
    <div style={{
      background: 'var(--color-blue)',
      borderRadius: '12px',
      border: '3px solid var(--color-blue-dark)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-blue-dark)',
        padding: '10px 16px',
        borderBottom: '3px solid var(--color-blue-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#fff', letterSpacing: '1px' }}>
          CARD INDEX
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
          {total > 0 ? `${total.toLocaleString()} CARDS` : ''}
        </span>
      </div>

      {/* Body — left image panel + right list */}
      <div style={{ display: 'flex', height: 'calc(100vh - 180px)' }}>

        {/* Left — card image display */}
        <div style={{
          width: '500px',
          flexShrink: 0,
          background: 'repeating-linear-gradient(180deg, #d0e4ff 0px, #d0e4ff 10px, #c8daf8 10px, #c8daf8 20px)',
          borderRight: '3px solid var(--color-blue-dark)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          gap: '12px',
        }}>
          <div style={{
            border: '3px solid #ffd700',
            borderRadius: '8px',
            width: '300px',
            height: '420px',
            position: 'relative',
            overflow: 'hidden',
            background: 'repeating-linear-gradient(180deg, #d0e4ff 0px, #d0e4ff 10px, #c8daf8 10px, #c8daf8 20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {displayCard ? (
              <Image
                key={displayCard.id}
                src={displayCard.images?.small}
                alt={displayCard.name}
                fill
                sizes="160px"
                className="object-cover slide-in"
              />
            ) : (
              <Pokeball size={56} />
            )}
          </div>
          {displayCard ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', color: '#1a3d7a', letterSpacing: '0.5px' }}>
                {displayCard.name?.toUpperCase()}
              </p>
              {displayCard.types?.[0] && (
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: TYPE_COLORS[displayCard.types[0]] ?? '#888', marginTop: '4px' }}>
                  {displayCard.types[0].toUpperCase()}
                </p>
              )}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '6px', color: '#8899bb', textAlign: 'center', lineHeight: '1.8' }}>
              HOVER A CARD TO PREVIEW
            </p>
          )}
        </div>

        {/* Right — list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-list-bg)', overflow: 'hidden' }}>
          {/* Search & filters */}
          <div style={{ background: 'var(--color-blue-deep)', padding: '6px 10px', borderBottom: '1px solid var(--color-blue-dark)' }}>
            <SearchBar />
          </div>
          <div style={{ background: 'var(--color-blue-deep)', padding: '5px 10px', borderBottom: '2px solid var(--color-blue-dark)', display: 'flex', gap: '6px' }}>
            <FilterPanel />
          </div>

          {/* List header */}
          <div style={{ background: 'var(--color-blue-dark)', padding: '5px 10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: '#aac8ff' }}>CARD LIST</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: '#aac8ff' }}>PAGE {page}</span>
          </div>

          {/* List content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '4px', opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            {isError ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '8px', color: '#ff4444' }}>CONNECTION ERROR</p>
                <button onClick={refetch} style={{ fontFamily: 'var(--font-display)', fontSize: '7px', color: '#fff', background: '#cc0000', border: '2px solid #880000', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                  [ RETRY ]
                </button>
              </div>
            ) : isLoading ? (
              Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            ) : !cards.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '8px' }}>
                <Pokeball size={40} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '8px', color: '#1a3d7a' }}>NO DATA FOUND</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '6px', color: '#6688aa' }}>TRY DIFFERENT FILTERS</p>
              </div>
            ) : cards.map((card) => {
              const inCollection = collection.some(c => c.id === card.id)
              const isActive = activeCard?.id === card.id
              const isHovered = hoveredCard?.id === card.id
              const rc = rarityColor(card.rarity)
              return (
                <div
                  key={card.id}
                  onMouseEnter={() => handleMouseEnter(card)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleRowClick(card)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px 10px 16px',
                    cursor: 'pointer',
                    borderRadius: '20px 6px 6px 20px',
                    border: `1px solid ${isActive ? '#cc6600' : isHovered ? '#e8a000' : 'var(--color-row-border)'}`,
                    background: isActive ? '#e8920a' : isHovered ? '#ffd070' : 'var(--color-row-bg)',
                    transition: 'all 0.12s ease',
                  }}
                >
                  {isActive && <span style={{ fontSize: '8px', color: '#fff', marginRight: '2px' }}>▶</span>}
                  <span style={{ fontSize: '20px', color: inCollection ? '#ffed88' : '#88aacc', flexShrink: 0 }}>
                    {inCollection ? '★' : '☆'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: isActive ? '#fff' : isHovered ? '#7a3d00' : '#1a3d7a', display: 'block' }}>
                      {card.name?.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '7px', color: isActive ? 'rgba(255,255,255,0.7)' : isHovered ? '#aa6600' : '#6688aa', display: 'block', marginTop: '2px' }}>
                      {card.set?.name?.toUpperCase()}
                    </span>
                  </div>
                  {card.rarity && (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '8px', padding: '2px 5px', borderRadius: '3px', flexShrink: 0, background: rc.bg, color: rc.color }}>
                      {card.rarity.toUpperCase().slice(0, 8)}
                    </span>
                  )}
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '8px', color: isActive ? 'rgba(255, 255, 255, 0.86)' : '#677da8', flexShrink: 0 }}>
                    {card.number}/{card.set?.printedTotal}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'var(--color-blue-dark)',
        padding: '8px 16px',
        borderTop: '3px solid var(--color-blue-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Pagination totalCount={total} />
      </div>
    </div>
  )
}