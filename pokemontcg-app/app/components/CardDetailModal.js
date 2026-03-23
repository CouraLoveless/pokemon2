'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCardByIdQuery } from '@/store/pokemonApi'
import { addCard, removeCard } from '@/store/collectionSlice'

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
  Colorless:'#a8a878' 
}

const ENERGY_ICONS = {
  Fire: '/energy/fire.png',
  Water: '/energy/water.png',
  Grass: '/energy/grass.png',
  Lightning: '/energy/lightning.png',
  Ice: '/energy/ice.png',
  Psychic: '/energy/psychic.png',
  Fighting: '/energy/fighting.png',
  Darkness: '/energy/dark.png',
  Metal: '/energy/metal.png',
  Dragon: '/energy/dragon.png',
  Fairy: '/energy/fairy.png',
  Bird: '/energy/bird.png',
  Bug: '/energy/bug.png',
  Ghost: '/energy/ghost.png',
  Ground: '/energy/ground.png',
  Flying: '/energy/flying.png',
  Poison: '/energy/poison.png',
  Rock: '/energy/rock.png',
  Metal: '/energy/steel.png',
  Colorless: '/energy/colorless.png',
}

const px = { fontFamily: 'var(--font-display)' }

export default function CardDetailModal({ cardId, prefetchedCard, onClose }) {
  const dispatch = useDispatch()
  const inCollection = useSelector(s => s.collection.some(c => c.id === cardId))
  const { data, isLoading } = useGetCardByIdQuery(cardId)

  const card = data?.data ?? (prefetchedCard ? {
    id: prefetchedCard.id,
    name: prefetchedCard.name,
    images: {
      small: prefetchedCard.images?.small ?? prefetchedCard.image,
      large: prefetchedCard.images?.large ?? prefetchedCard.images?.small ?? prefetchedCard.image,
    },
    types: prefetchedCard.types,
    set: { name: prefetchedCard.set?.name ?? prefetchedCard.set, printedTotal: prefetchedCard.set?.printedTotal ?? prefetchedCard.setTotal },
    hp: prefetchedCard.hp,
    rarity: prefetchedCard.rarity,
    artist: prefetchedCard.artist,
    attacks: prefetchedCard.attacks,
    weaknesses: prefetchedCard.weaknesses,
    resistances: prefetchedCard.resistances,
    number: prefetchedCard.number,
  } : null)

  useEffect(() => {
    const esc = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  const handleCollect = () => {
    if (!card) return
    inCollection
      ? dispatch(removeCard(card.id))
      : dispatch(addCard({
          id: card.id,
          name: card.name,
          image: card.images?.small,
          types: card.types,
          set: card.set?.name,
          setTotal: card.set?.printedTotal,
          hp: card.hp, rarity: card.rarity,
          artist: card.artist,
          attacks: card.attacks,
          weaknesses: card.weaknesses,
          resistances: card.resistances,
          number: card.number,
        }))
  }

  const price = card?.tcgplayer?.prices?.holofoil?.market
    ?? card?.tcgplayer?.prices?.normal?.market
    ?? card?.cardmarket?.prices?.averageSellPrice

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ background: 'rgba(0,0,0,0.92)' }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d0000',
          border: '3px solid var(--color-blue-dark)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflow: 'hidden',
        }}>
        
        <div style={{ background: 'var(--color-blue-dark)', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...px, fontSize: '9px', color: '#fff', letterSpacing: '1px' }}>CARD DATA</span>
          <button onClick={onClose} style={{ ...px, fontSize: '9px', color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        {isLoading || !card ? (
            <div className="flex items-center justify-center py-20">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ animation: 'spin 1s linear infinite', width: '48px', height: '48px' }}>
                  <svg viewBox="0 0 48 48" width="48" height="48">
                    <path d="M4 24 A20 20 0 0 1 44 24 Z" fill="#cc0000"/>
                    <path d="M4 24 A20 20 0 0 0 44 24 Z" fill="#f0f0f0"/>
                    <rect x="4" y="22" width="40" height="4" fill="#111"/>
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#111" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="6" fill="#111"/>
                    <circle cx="24" cy="24" r="4" fill="#333"/>
                    <circle cx="24" cy="24" r="2.5" fill="#555"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '7px', color: 'var(--color-accent)', letterSpacing: '1px' }}>
                  LOADING...
                </p>
              </div>
            </div>
          ) : (
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '14px' }}>
              {/* Card image */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ position: 'relative', width: '140px', height: '196px', border: '2px solid #333', borderRadius: '6px', overflow: 'hidden' }}>
                  <Image src={card.images?.large ?? card.images?.small} alt={card.name} fill sizes="140px" className="object-cover" />
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <p style={{ ...px, fontSize: '14px', color: 'var(--color-accent)', letterSpacing: '1px' }}>{card.name?.toUpperCase()}</p>
                  <p style={{ ...px, fontSize: '8px', color: 'var(--color-muted)', marginTop: '4px' }}>{card.set?.name?.toUpperCase()} · {card.number}/{card.set?.printedTotal}</p>
                </div>

                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {card.types?.map(t => (
                    <span key={t} style={{ ...px, fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: '#1a0000', color: TYPE_COLORS[t] ?? '#888', border: `1px solid ${TYPE_COLORS[t] ?? '#888'}` }}>{t.toUpperCase()}</span>
                  ))}
                  {card.hp && <span style={{ ...px, fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: '#001a00', color: '#5cb85c', border: '1px solid #5cb85c' }}>HP {card.hp}</span>}
                  {card.rarity && <span style={{ ...px, fontSize: '8px', padding: '2px 6px', borderRadius: '3px', background: '#1a1a00', color: '#ffd700', border: '1px solid #ffd700' }}>{card.rarity.toUpperCase()}</span>}
                </div>

                {price && (
                  <div style={{ background: '#0a0a0a', border: '1px solid #222', borderRadius: '4px', padding: '6px 8px' }}>
                    <p style={{ ...px, fontSize: '7px', color: 'var(--color-muted)', marginBottom: '3px' }}>MARKET PRICE</p>
                    <p style={{ ...px, fontSize: '14px', color: '#ffd700' }}>${price.toFixed(2)}</p>
                  </div>
                )}

                {card.artist && <p style={{ ...px, fontSize: '7px', color: 'var(--color-muted)' }}>ART: {card.artist?.toUpperCase()}</p>}
                
                  {(card.weaknesses?.length > 0 || card.resistances?.length > 0) && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {card.weaknesses?.map(w => (
                        <div key={w.type}>
                          <span style={{ ...px, fontSize: '9px', color: 'var(--color-muted)' }}>WEAKNESS: </span>
                          <span style={{ ...px, fontSize: '9px', color: TYPE_COLORS[w.type] ?? '#888' }}>{w.type.toUpperCase()} {w.value}</span>
                        </div>
                      ))}
                      {card.resistances?.map(r => (
                        <div key={r.type}>
                          <span style={{ ...px, fontSize: '9px', color: 'var(--color-muted)' }}>RESIST: </span>
                          <span style={{ ...px, fontSize: '9px', color: TYPE_COLORS[r.type] ?? '#888' }}>{r.type.toUpperCase()} {r.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {card.attacks?.length > 0 && (
              <div>
                <p style={{ ...px, fontSize: '8px', color: '#888', letterSpacing: '2px', marginBottom: '8px' }}>— ATTACKS —</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {card.attacks.map((atk, i) => (
                    <div key={i} style={{ background: 'var(--color-attack-bg)', border: '2px solid #222', borderRadius: '4px', padding: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: atk.text ? '6px' : '0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ ...px, fontSize: '10px', color: 'var(--color-text)' }}>{atk.name?.toUpperCase()}</span>
                          <div style={{ display: 'flex', gap: '3px' }}>
                            {atk.cost?.map((energy, j) => (
                              <img key={j} src={ENERGY_ICONS[energy]} alt={energy} width={16} height={16} style={{ borderRadius: '50%' }} />
                            ))}
                          </div>
                        </div>
                        {atk.damage && <span style={{ ...px, fontSize: '11px', color: 'var(--color-accent' }}>{atk.damage}</span>}
                      </div>
                      {atk.text && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)', lineHeight: '1.5' }}>{atk.text}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleCollect}
              style={{
                ...px,
                fontSize: '10px',
                letterSpacing: '1px',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                ...(inCollection
                  ? { background: 'transparent', border: '2px solid #333', color: '#555' }
                  : { background: 'var(--color-blue-dark)', border: '2px solid var(--color-blue-deep)', color: '#fff' }
                )
              }}
            >
              {inCollection ? 'IN BINDER' : '[ ADD TO BINDER ]'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}