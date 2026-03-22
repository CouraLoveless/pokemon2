'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '@/store/filtersSlice'

export default function SearchBar() {
  const dispatch = useDispatch()
  const current = useSelector(s => s.filters.query)
  const [local, setLocal] = useState(current)

  useEffect(() => {
    const t = setTimeout(() => dispatch(setQuery(local)), 350)
    return () => clearTimeout(t)
  }, [local, dispatch])

  return (
    <div className="relative flex items-center gap-2">
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '6px',
        color: '#838383',
        letterSpacing: '1px',
        whiteSpace: 'nowrap'
      }}>SEARCH:</span>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="enter name..."
          value={local}
          onChange={e => setLocal(e.target.value)}
          style={{
            background: '#0a0a0a',
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-display)',
            fontSize: '8px',
            letterSpacing: '1px',
          }}
          className="w-full px-3 py-2 rounded outline-none placeholder:text-red-900 placeholder:text-xs"
        />
      </div>
      {local && (
        <button
          onClick={() => setLocal('')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '7px',
            color: 'var(--color-muted)',
            background: '#111',
            border: '1px solid #333',
            padding: '4px 6px',
            borderRadius: '3px',
          }}
        >✕</button>
      )}
    </div>
  )
}