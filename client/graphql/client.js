import { createClient, dedupExchange, cacheExchange, fetchExchange, ssrExchange } from 'urql'

const isServerSide = typeof window === 'undefined'
export const ssrCache = ssrExchange({ isClient: !isServerSide })

export const client = createClient({
    url: 'http://localhost:5000/graphql',
    exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange,
    ],
})