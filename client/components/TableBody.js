import React from 'react'
import {
    Tr,
    Td,
    Button,
    Portal,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useMutation } from 'urql'

import { removeMovieMutation } from '../graphql/mutation'
import EditModal from './EditModal'

const TableBody = (item) => {
    const [modalData, setModalData] = React.useState({})
    const editModal = useDisclosure()

    const [removeMovieResult, removeMovie] = useMutation(removeMovieMutation)

    const onRemoveMovie = (id) => {
        removeMovie({ "id": id })
    }

    const handleOpenModal = (data) => {
        setModalData(data)
        editModal.onOpen()
    }

    return (
        <>
            <Tr>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.genre}</Td>
                <Td isNumeric>{item.director?.name}</Td>
                <Td>
                    <Popover isLazy={true}>
                        <PopoverTrigger>
                            <IconButton
                                style={{ 'margin': '0 5px 0' }}
                                colorScheme='blue'
                                aria-label='Delete'
                                icon={<DeleteIcon />}
                            />
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent maxW='270px'>
                                <PopoverArrow />
                                <PopoverHeader>Delete</PopoverHeader>
                                <PopoverCloseButton style={{ 'marginTop': '5px' }} />
                                <PopoverBody>
                                    <Button onClick={() => onRemoveMovie(item.id)} colorScheme='blue'>Delete</Button>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                    <IconButton
                        onClick={() => handleOpenModal({ ...item })}
                        style={{ 'margin': '0 5px 0' }}
                        colorScheme='blue'
                        aria-label='Edit'
                        icon={<EditIcon />}
                    />
                </Td>
            </Tr>
            <EditModal editModal={editModal} modalData={modalData} />
        </>
    )
}

export default TableBody