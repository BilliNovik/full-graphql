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
                            {allDirectors.data.directors.map(item => (
                                <TableBody key={item.id} item={item} onRemoveItem={onRemoveItem} />
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>
            <AddModal addModal={addModal} type='d' />
        </>
    )
}

export default Directors