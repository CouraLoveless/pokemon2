'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const Pokeball = ({ size = 28 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size}>
    <path d="M4 24 A20 20 0 0 1 44 24 Z" fill="#cc0000"/>
    <path d="M4 24 A20 20 0 0 0 44 24 Z" fill="#f0f0f0"/>
    <rect x="4" y="21.5" width="40" height="5" fill="#222"/>
    <circle cx="24" cy="24" r="20" fill="none" stroke="#222" strokeWidth="2"/>
    <circle cx="24" cy="24" r="7" fill="#222"/>
    <circle cx="24" cy="24" r="5" fill="#ddd"/>
    <circle cx="24" cy="24" r="3" fill="#fff"/>
  </svg>
)

export default function Navbar() {
  const pathname = usePathname()
  const collectionCount = useSelector(s => s.collection.length)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const navLink = (to, label) => (
    <Link href={to} style={{
      fontFamily: 'var(--font-display)',
      fontSize: '8px',
      letterSpacing: '1px',
      padding: '6px 12px',
      borderRadius: '4px',
      color: pathname === to ? '#fff' : 'rgba(255,255,255,0.5)',
      background: pathname === to ? 'rgba(0,0,0,0.3)' : 'transparent',
      textDecoration: 'none',
    }}>{label}</Link>
  )

  return (
    <nav style={{
      background: 'var(--color-blue-dark)',
      borderBottom: '3px solid var(--color-blue-deep)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ display: 'flex', width:'100%', justifyContent:'center', alignItems: 'center', gap: '8px' }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#85daf2', padding: '8px 14px', border: '3px solid #2f488e', borderRadius: '999px', width: 'fit-content'}}>
          <Pokeball size={28} />
          <Link href="/" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            color: '#fff',
            letterSpacing: '3px',
            textDecoration: 'none',
          }}>PokéTCG Dex</Link>
          <Pokeball size={28} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLink('/', 'BROWSE')}
        <div style={{ position: 'relative' }}>
          {navLink('/binder', 'BINDER')}
          {mounted && collectionCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#e8a000',
              borderBottom: '3px solid var(--color-blue-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '6px',
              color: '#fff',
            }}>{collectionCount > 99 ? '99' : collectionCount}</div>
          )}
        </div>
      </div>
    </nav>
  )
}