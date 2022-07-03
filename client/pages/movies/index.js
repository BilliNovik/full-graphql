import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer,
    Button,
    useDisclosure,
    Container
} from '@chakra-ui/react'
import { useQuery } from 'urql'

import { client, ssrCache } from '../../graphql/client'
import { allMoviesQuery } from '../../graphql/query'
import TableBody from '../../components/TableBody'
import AddModal from '../../components/AddModal'

export const getServerSideProps = async () => {
    await client.query(allMoviesQuery).toPromise();
    return {
        props: {
            urqlState: ssrCache.extractData()
        }
    };
}

const Movies = () => {
    const addModal = useDisclosure()

    const [allMovies] = useQuery({
        query: allMoviesQuery,
    });

    return (
        <>
            <Container maxW='1200px'>
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>
                            <Button colorScheme='blue'
                                onClick={addModal.onOpen}>Add new</Button>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>name</Th>
                                <Th>genre</Th>
                                <Th isNumeric>director</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!allMovies.fetching && allMovies.data.movies.map(item => (
                                <TableBody key={item.id} {...item} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
            <AddModal addModal={addModal} />
        </>
    )
}

export default Movies