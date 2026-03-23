'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setType, setSet, setRarity, resetFilters } from '@/store/filtersSlice'
import { useGetSetsQuery } from '@/store/pokemonApi'

const TYPES = [
  'Colorless',
  'Darkness',
  'Dragon',
  'Fairy',
  'Fighting',
  'Fire',
  'Grass',
  'Lightning',
  'Metal',
  'Psychic',
  'Water']
const RARITIES = [
  'Common',
  'Uncommon',
  'Rare',
  'Rare Holo',
  'Rare Ultra',
  'Rare Secret',
  'Amazing Rare',
  'LEGEND']

export default function FilterPanel() {
  const dispatch = useDispatch()
  const { type, set, rarity } = useSelector(s => s.filters)
  const { data: setsData, isLoading, isError } = useGetSetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
  const sets = [...(setsData?.data ?? [])].reverse()
  const hasFilters = type || set || rarity

  const selStyle = (active) => ({
    background: active ? '#0a1a3a' : '#0a1a3a',
    border: `1px solid ${active ? '#4aaeff' : 'var(--color-blue)'}`,
    borderRadius: '3px',
    padding: '5px 8px',
    color: active ? '#4aaeff' : '#aac8ff',
    fontFamily: 'var(--font-display)',
    fontSize: '8px',
    outline: 'none',
    cursor: 'pointer',
    letterSpacing: '1px',
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
      <select value={type} onChange={e => dispatch(setType(e.target.value))} style={selStyle(!!type)}>
        <option value="">TYPE</option>
        {TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
      </select>
      <select value={set} onChange={e => dispatch(setSet(e.target.value))} style={selStyle(!!set)}>
        <option value="">{isLoading ? 'LOADING...' : isError ? 'ERROR' : 'SET'}</option>
        {!isLoading && !isError && sets.map(s => <option key={s.id} value={s.id}>{s.name.toUpperCase()}</option>)}
      </select>
      <select value={rarity} onChange={e => dispatch(setRarity(e.target.value))} style={selStyle(!!rarity)}>
        <option value="">RARITY</option>
        {RARITIES.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
      </select>
      {hasFilters && (
        <button onClick={() => dispatch(resetFilters())} style={{
          background: 'none', border: '1px solid #333', borderRadius: '3px',
          padding: '3px 6px', color: '#555', fontFamily: 'var(--font-display)',
          fontSize: '6px', cursor: 'pointer', letterSpacing: '1px',
        }}>CLEAR ✕</button>
      )}
    </div>
  )
}