import { ChakraProvider } from '@chakra-ui/react'
import { client, ssrCache } from '../graphql/client'
import { Provider } from 'urql'

function MyApp({ Component, pageProps }) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <ChakraProvider>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp