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

export const getServerSideProps = async () => {
    await client.query(allDirectorsQuery).toPromise();
    return {
        props: {
            urqlState: ssrCache.extractData()
        }
    };
}

const Movies = () => {
    const addModal = useDisclosure()

    const [allDirectors] = useQuery({
        query: allDirectorsQuery,
    })

    // TableBody fn
    const [removeDirectorResult, removeDirector] = useMutation(removeDirectorMutation)
    const onRemoveItem = (id) => {
        removeDirector({ "id": id })
    }

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {allDirectors.data.directors.map(item => (
                                <TableBody key={item.id} onRemoveItem={onRemoveItem} item={item} />
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