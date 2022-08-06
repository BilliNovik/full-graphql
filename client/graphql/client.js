import { createClient, dedupExchange, cacheExchange, fetchExchange, ssrExchange } from 'urql'

const isServerSide = typeof window === 'undefined'
export const ssrCache = ssrExchange({ isClient: !isServerSide })

export const client = createClient({
    url: 'https://graphql-movies-direcors.herokuapp.com/graphql',
    exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange,
    ],
})