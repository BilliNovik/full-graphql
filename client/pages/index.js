import { Container } from '@chakra-ui/react'
import Movies from './movies'

export default function Home() {
  return (
    <Container maxW='1200px'>
      <Movies />
    </Container>
  )
}