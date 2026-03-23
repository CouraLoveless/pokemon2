'use client'

import { useState, useEffect } from 'react'
import CardGrid from './CardGrid'
import CardDetailModal from './CardDetailModal'

export default function BrowsePage() {
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    document.body.style.overflow = selectedCard ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedCard])

  return (
    <div>
      <CardGrid onCardClick={setSelectedCard} />
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