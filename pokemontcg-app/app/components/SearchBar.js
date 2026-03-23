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
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '7px', color: '#aac8ff', letterSpacing: '1px', whiteSpace: 'nowrap' }}>SEARCH:</span>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          type="text"
          placeholder="enter name..."
          value={local}
          onChange={e => setLocal(e.target.value)}
          style={{
            width: '100%',
            background: '#0a1a3a',
            border: '1px solid var(--color-blue)',
            borderRadius: '3px',
            padding: '4px 28px 4px 8px',
            color: '#4aaeff',
            fontFamily: 'var(--font-display)',
            fontSize: '9px',
            outline: 'none',
            letterSpacing: '1px',
          }}
        />
        {local && (
          <button onClick={() => setLocal('')} style={{
            position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#4aaeff', cursor: 'pointer', fontSize: '10px', padding: 0,
          }}>✕</button>
        )}
      </div>
    </div>
  )
}