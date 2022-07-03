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
} from '@chakra-ui/react'
import { useQuery } from 'urql'

import { allMoviesQuery } from '../graphql/query'
import TableBody from '../components/TableBody'
import AddModal from '../components/AddModal'

const Movies = ({ allMovies }) => {
    const addModal = useDisclosure()

    const [allMovies] = useQuery({
        query: allMoviesQuery,
    })

    return (
        <>
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
            <AddModal addModal={addModal} />
        </>
    )
}

export default Movies