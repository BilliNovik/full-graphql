import { ChakraProvider } from '@chakra-ui/react'
import { createClient, Provider } from 'urql'

const client = createClient({
  url: 'http://localhost:5000/graphql',
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
