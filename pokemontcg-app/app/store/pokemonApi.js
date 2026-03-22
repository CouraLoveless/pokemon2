import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/' }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: ({ page = 1, pageSize = 20, q = '' }) => {
        const params = new URLSearchParams({ page, pageSize })
        if (q) params.append('q', q)
        return `cards?${params.toString()}`
      },
    }),
    getCardById: builder.query({
      query: (id) => `cards/${id}`,
    }),
    getSets: builder.query({
      query: () => 'sets?orderBy=releaseDate',
    }),
  }),
})

export const { useGetCardsQuery, useGetCardByIdQuery, useGetSetsQuery } = pokemonApi