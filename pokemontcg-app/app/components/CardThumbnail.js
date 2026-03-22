'use client'

import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
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
  Colorless:'#a8a878',
}

export default function CardThumbnail({ card, onClick, animDelay = 0 }) {
  const dispatch = useDispatch()
  const inCollection = useSelector(s => s.collection.some(c => c.id === card.id))
  const typeColor = TYPE_COLORS[card.types?.[0]] ?? '#888'

  const handleCollect = (e) => {
    e.stopPropagation()
    inCollection
      ? dispatch(removeCard(card.id))
      : dispatch(addCard({
          id: card.id,
          name: card.name,
          image: card.images?.small,
          types: card.types,
          set: card.set?.name,
          setTotal: card.set?.printedTotal,
          hp: card.hp,
          rarity: card.rarity,
          artist: card.artist,
          attacks: card.attacks,
          weaknesses: card.weaknesses,
          resistances: card.resistances,
          number: card.number,
        }))
  }

  return (
      <div
        onClick={() => onClick(card)}
        className="card-anim group relative cursor-pointer rounded overflow-hidden transition-all duration-200 hover:-translate-y-1"
        style={{
          background: 'var(--color-card-bg)',
          border: `2px solid ${inCollection ? '#ffd700' : 'var(--color-attack-border)'}`,
          animationDelay: `${animDelay}ms`,
          marginBottom:'10px'
        }}
      >
      <div className="relative aspect-[2.5/3.5] overflow-hidden">
        <Image
          src={card.images?.small}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleCollect}
          className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{
            background: inCollection ? '#ffd700' : 'rgba(0,0,0,0.8)',
            color: inCollection ? '#000' : '#ffd700',
            border: '1px solid #ffd700',
            fontSize: '10px',
          }}
        >{inCollection ? '★' : '☆'}</button>
      </div>
      <div className="p-2" style={{ background: 'var(--color-card-info)', display: 'flex', justifyContent:'space-between'}}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '8px',
          color: 'var(--color-text)',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{card.name?.toUpperCase()}</p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '7px',
          color: typeColor,
          marginTop: '3px',
        }}>{card.types?.[0]?.toUpperCase()}</p>
      </div>
    </div>
  )
}