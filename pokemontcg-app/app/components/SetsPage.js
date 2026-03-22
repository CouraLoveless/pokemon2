'use client'
//SETS PAGE

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useGetSetsQuery } from '@/store/pokemonApi'
import { setSet } from '@/store/filtersSlice'

export default function SetsPage() {
  const { data, isLoading } = useGetSetsQuery()
  const sets = [...(data?.data ?? [])].reverse()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSetClick = (setId) => {
    dispatch(setSet(setId))
    router.push('/')
  }

  if (isLoading) return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => <div key={i} className="shimmer h-28 rounded-xl" />)}
    </div>
  )

  return (
    <div className="p-6">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '0.08em', color: 'var(--color-accent)' }} className="mb-6">
        All Sets
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sets.map(s => (
          <button key={s.id} onClick={() => handleSetClick(s.id)}
            className="flex flex-col items-center gap-3 p-4 rounded-xl text-center transition-all hover:-translate-y-1"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {s.images?.logo && (
              <div className="relative h-10 w-full">
                <Image src={s.images.logo} alt={s.name} fill className="object-contain" />
              </div>
            )}
            <div>
              <p className="text-xs font-medium leading-snug">{s.name}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{s.releaseDate} · {s.total} cards</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}