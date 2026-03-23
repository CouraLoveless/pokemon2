'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '@/store/filtersSlice'

export default function Pagination({ totalCount }) {
  const dispatch = useDispatch()
  const { page, pageSize } = useSelector(s => s.filters)
  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 1) return null

  const btn = (disabled, label, onClick) => (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '7px',
        color: disabled ? '#334' : '#aac8ff',
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '1px',
        opacity: disabled ? 0.4 : 1,
      }}
    >{label}</button>
  )

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {btn(page <= 1, '◀ PREV', () => dispatch(setPage(page - 1)))}
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '6px', color: 'rgba(255,255,255,0.4)' }}>
        {page}/{totalPages}
      </span>
      {btn(page >= totalPages, 'NEXT ▶', () => dispatch(setPage(page + 1)))}
    </div>
  )
}