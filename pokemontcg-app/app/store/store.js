import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from './pokemonApi'
import filtersReducer from './filtersSlice'
import collectionReducer, { saveCollectionMiddleware } from './collectionSlice'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    filters: filtersReducer,
    collection: collectionReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(pokemonApi.middleware, saveCollectionMiddleware),
})