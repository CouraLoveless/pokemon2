'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const collectionCount = useSelector(s => s.collection.length)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLink = (to, label, badge) => (
    <Link
      href={to}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '8px',
        letterSpacing: '1px',
        padding: '6px 10px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: pathname === to ? '#fff' : 'rgba(255,255,255,0.5)',
        background: pathname === to ? 'rgba(0,0,0,0.3)' : 'transparent',
        textDecoration: 'none',
      }}
    >
      {label}
      {mounted && badge > 0 && (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '7px',
          padding: '2px 5px',
          borderRadius: '3px',
          background: '#ffd700',
          color: '#000',
        }}>{badge}</span>
      )}
    </Link>
  )

  return (
    <nav style={{
      background: '#cc0000',
      borderBottom: '3px solid #880000',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4af', border: '2px solid #fff', flexShrink: 0 }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e44', flexShrink: 0 }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fa0', flexShrink: 0 }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4c4', flexShrink: 0 }} />
      </div>

      <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#fff', letterSpacing: '3px', textDecoration: 'none', textShadow: '2px 2px 0 #880000' }}>
        Pokemon TCG Dex
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLink('/', 'BROWSE')}
        {navLink('/binder', 'BINDER', collectionCount)}
      </div>
    </nav>
  )
}