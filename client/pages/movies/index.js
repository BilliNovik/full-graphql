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
import { useQuery, useMutation } from 'urql'

import { client, ssrCache } from '../../graphql/client'
import { allMoviesQuery } from '../../graphql/query'
import { removeMovieMutation } from '../../graphql/mutation'
import TableBody from '../../components/TableBody'
import AddModal from '../../components/AddModal'
import MenuLinks from '../../components/MenuLinks'
import Pagination from '../../components/Pagination'

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

    const [removeMovieResult, removeMovie] = useMutation(removeMovieMutation)
    const onRemoveItem = (id) => {
        removeMovie({ "id": id })
    }

    //pagination
    const [currentPage, setCurrentPage] = React.useState(1)
    const elementsPerPage = 6

    const lastElemIndex = currentPage * elementsPerPage
    const firstElemIndex = lastElemIndex - elementsPerPage
    const currentElems = allMovies.data.movies.slice(firstElemIndex, lastElemIndex)

    const paginate = (pageNumber) => {
        console.log(pageNumber)
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <Container maxW='1200px'>
                <MenuLinks />
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
                            {currentElems.map(item => (
                                <TableBody key={item.id} onRemoveItem={onRemoveItem} item={item} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination elementsPerPage={elementsPerPage} totalElements={allMovies.data.movies.length} paginate={paginate}
                    currentPage={currentPage} />
            </Container>
            <AddModal addModal={addModal} type='m' />
        </>
    )
}

export default Movies