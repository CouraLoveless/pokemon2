'use client'
//BINDER PAGE

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { removeCard } from '@/store/collectionSlice'
import CardDetailModal from './CardDetailModal'

export default function CollectionPage() {
  const collection = useSelector(s => s.collection)
  const dispatch = useDispatch()
  const [selectedCard, setSelectedCard] = useState(null)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!collection.length) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4" style={{ color: 'var(--color-muted)' }}>
      <p className="text-lg" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>Your Binder is empty</p>
      <p className="text-sm">Browse cards and click ☆ to add them here.</p>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>My Binder</h1>
        <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{collection.length} cards</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {collection.map(card => (
          <div key={card.id} onClick={() => setSelectedCard(card)}
            className="card-anim group relative cursor-pointer rounded-xl overflow-hidden hover:-translate-y-1 transition-transform"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="relative aspect-[2.5/3.5]">
              <Image src={card.image} alt={card.name} fill className="object-cover" />
            </div>
            <button onClick={e => { e.stopPropagation(); dispatch(removeCard(card.id)) }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.7)', color: '#fff' }}>✕</button>
            <div className="p-2">
              <p className="text-xs font-medium truncate">{card.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>{card.set}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
      <CardDetailModal
        cardId={selectedCard.id}
        prefetchedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    )}
    </div>
  )
}