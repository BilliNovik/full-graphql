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
import { allDirectorsQuery } from '../../graphql/query'
import { removeDirectorMutation } from '../../graphql/mutation'
import TableBody from '../../components/TableBody'
import AddModal from '../../components/AddModal'
import MenuLinks from '../../components/MenuLinks'
import Pagination from '../../components/Pagination'

export const getServerSideProps = async () => {
    await client.query(allDirectorsQuery).toPromise();
    return {
        props: {
            urqlState: ssrCache.extractData()
        }
    };
}

const Directors = () => {
    const addModal = useDisclosure()

    const [allDirectors] = useQuery({
        query: allDirectorsQuery,
    })

    const [removeDirectorResult, removeDirector] = useMutation(removeDirectorMutation)
    const onRemoveItem = (id) => {
        removeDirector({ "id": id })
    }

    //pagination
    const [currentPage, setCurrentPage] = React.useState(1)
    const elementsPerPage = 6

    const lastElemIndex = currentPage * elementsPerPage // 6
    const firstElemIndex = lastElemIndex - elementsPerPage // 0
    const currentElems = allDirectors.data.directors.slice(firstElemIndex, lastElemIndex)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentElems.map(item => (
                                <TableBody key={item.id} item={item} onRemoveItem={onRemoveItem} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination elementsPerPage={elementsPerPage} totalElements={allDirectors.data.directors.length} paginate={paginate}
                    currentPage={currentPage} />
            </Container>
            <AddModal addModal={addModal} type='d' />
        </>
    )
}

export default Directors