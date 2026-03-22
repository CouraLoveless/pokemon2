'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '@/store/filtersSlice'

export default function Pagination({ totalCount }) {
  const dispatch = useDispatch()
  const { page, pageSize } = useSelector(s => s.filters)
  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 1) return null

  const btnStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '9px',
    color: '#fff',
    background: '#880000',
    border: '2px solid #660000',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '1px',
    alignObject: 'center',
  }

  const disabledStyle = {
    ...btnStyle,
    opacity: 0.3,
    cursor: 'not-allowed',
  }

  return (
    <div className="flex items-center gap-3">
      <button
        disabled={page <= 1}
        onClick={() => dispatch(setPage(page - 1))}
        style={page <= 1 ? disabledStyle : btnStyle}
      >◀ PREV</button>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>
        {page}/{totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => dispatch(setPage(page + 1))}
        style={page >= totalPages ? disabledStyle : btnStyle}
      >NEXT ▶</button>
    </div>
  )
}