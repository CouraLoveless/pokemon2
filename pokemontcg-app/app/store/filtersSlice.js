import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { query: '', type: '', set: '', rarity: '', page: 1, pageSize: 20 },
  reducers: {
    setQuery:     (state, { payload }) => { state.query  = payload; state.page = 1 },
    setType:      (state, { payload }) => { state.type   = payload; state.page = 1 },
    setSet:       (state, { payload }) => { state.set    = payload; state.page = 1 },
    setRarity:    (state, { payload }) => { state.rarity = payload; state.page = 1 },
    setPage:      (state, { payload }) => { state.page   = payload },
    resetFilters: (state) => {
      state.query = ''; state.type = ''; state.set = ''; state.rarity = ''; state.page = 1
    },
  },
})

export const { setQuery, setType, setSet, setRarity, setPage, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer