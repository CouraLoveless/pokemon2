import { createSlice } from '@reduxjs/toolkit'

const load = () => {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('tcg_collection') || '[]') }
  catch { return [] }
}

const collectionSlice = createSlice({
  name: 'collection',
  initialState: load(),
  reducers: {
    addCard:    (state, { payload }) => { if (!state.find(c => c.id === payload.id)) state.push(payload) },
    removeCard: (state, { payload }) => state.filter(c => c.id !== payload),
  },
})

export const { addCard, removeCard } = collectionSlice.actions

export const saveCollectionMiddleware = store => next => action => {
  const result = next(action)
  if (typeof window !== 'undefined' && action.type?.startsWith('collection/')) {
    localStorage.setItem('tcg_collection', JSON.stringify(store.getState().collection))
  }
  return result
}

export default collectionSlice.reducer