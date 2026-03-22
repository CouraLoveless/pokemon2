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

const selStyle = {
  background: '#0a0a0a',
  border: '1px solid #333',
  color: '#aaa',
  fontFamily: 'var(--font-display)',
  fontSize: '8px',
  letterSpacing: '1px',
  padding: '5px 8px',
  borderRadius: '3px',
  outline: 'none',
  cursor: 'pointer',
}

const activeSelStyle = {
  ...selStyle,
  border: '1px solid var(--color-accent)',
  color: 'var(--color-accent)',
  background: '#1a0000',
}

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

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select
        value={type}
        onChange={e => dispatch(setType(e.target.value))}
        style={type ? activeSelStyle : selStyle}
      >
        <option value="">TYPE</option>
        {TYPES.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
      </select>

      <select
        value={set}
        onChange={e => dispatch(setSet(e.target.value))}
        style={set ? activeSelStyle : selStyle}
      >
        <option value="">
          {isLoading ? 'LOADING...' : isError ? 'ERROR' : 'SET'}
        </option>
        {!isLoading && !isError && sets.map(s => (
          <option key={s.id} value={s.id}>{s.name.toUpperCase()}</option>
        ))}
      </select>

      <select
        value={rarity}
        onChange={e => dispatch(setRarity(e.target.value))}
        style={rarity ? activeSelStyle : selStyle}
      >
        <option value="">RARITY</option>
        {RARITIES.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
      </select>

      {hasFilters && (
        <button
          onClick={() => dispatch(resetFilters())}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '6px',
            color: '#555',
            background: 'transparent',
            border: '1px solid #333',
            padding: '5px 8px',
            borderRadius: '3px',
            cursor: 'pointer',
            letterSpacing: '1px',
          }}
        >CLEAR ✕</button>
      )}
    </div>
  )
}