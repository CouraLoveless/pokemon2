'use client'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetCardsQuery } from '@/store/pokemonApi'
import CardThumbnail from './CardThumbnail'
import SkeletonCard from './SkeletonCard'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import FilterPanel from './FilterPanel'

export default function CardGrid({ onCardClick }) {
  const { query, type, set, rarity, page, pageSize } = useSelector(s => s.filters)

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

  return (
    <div>
      <div style={{
        background: '#cc0000',
        borderRadius: '16px 16px 8px 8px',
        border: '3px solid #880000',
        overflow: 'hidden',
      }}>
        <div style={{
          background: '#cc0000',
          padding: '10px 16px 8px',
          borderBottom: '4px solid #880000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4af', border: '2px solid #fff' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e44' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fa0' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4c4' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '6px', color: 'rgba(255,255,255,0.5)' }}>
            {total > 0 ? `${total.toLocaleString()} CARDS` : ''}
          </span>
        </div>

        <div style={{ background: '#aa0000', padding: '10px 14px' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '8px', border: '3px solid #333', overflow: 'hidden' }}>
            <div style={{
              background: '#111',
              padding: '8px 12px',
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: '#ff4444', letterSpacing: '1px' }}>
                CARD INDEX
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '8px', color: '#838383' }}>
                PAGE {page}
              </span>
            </div>

            <div style={{ background: '#0d0d0d', padding: '8px 12px', borderBottom: '1px solid #222' }}>
              <div style={{ marginBottom: '6px' }}>
                <SearchBar />
              </div>
              <FilterPanel />
            </div>

            <div style={{ padding: '10px', minHeight: '200px', opacity: isFetching ? 0.6 : 1, transition: 'opacity 0.2s' }}>
              {isError ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: '#ff4444' }}>CONNECTION ERROR</p>
                  <button
                    onClick={refetch}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: '#fff', background: '#cc0000', border: '2px solid #880000', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >[ RETRY ]</button>
                </div>
              ) : isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : !cards.length ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: '#ff4444' }}>NO DATA FOUND</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '9px', color: '#444' }}>TRY DIFFERENT FILTERS</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cards.map((card, i) => (
                    <CardThumbnail key={card.id} card={card} onClick={onCardClick} animDelay={i * 30} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{
          background: '#bb0000',
          padding: '8px 16px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Pagination totalCount={total} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: '24px', height: '2px', background: '#880000', borderRadius: '1px' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}