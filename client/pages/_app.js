import { ChakraProvider } from '@chakra-ui/react'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: 'http://localhost:5000/graphql',
  requestPolicy: 'cache-first',
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
