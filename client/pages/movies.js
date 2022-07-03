import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Portal,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useQuery, useMutation } from 'urql'

const allMoviesQuery = `
    {
      movies {
        genre
        id
        name
        director {
          name
          id
        }
      }
    }
`
const allDirectorsQuery = `
    {
        directors {
        name
        id
        }
    }
`
const removeMovieMutation = `
    mutation ( $id:String ) {
        deleteMovie( id: $id ) {
            id
        }
    }
`
const addMovieMutation = `
    mutation ( $name: String, $genre: String, $directorId: String ) {
        addMovie(
            name: $name,
            genre: $genre,
            directorId: $directorId
        ) {
            name
            id
            genre
        }
    }
`
const changeMovieMutation = `
    mutation ($name: String, $genre: String, $directorId: String, $id: String,) {
        editMovie(
            genre: $genre, 
            name: $name, 
            directorId: $directorId,
            id: $id
        ) {
            genre
            id
            name
        }
    }
`
const Movies = () => {
    const [modalData, setModalData] = React.useState({})

    const editModal = useDisclosure()
    const addModal = useDisclosure()

    const [removeMovieResult, removeMovie] = useMutation(removeMovieMutation)
    const [addMovieResult, addMovie] = useMutation(addMovieMutation)
    const [changeMovieResult, changeMovie] = useMutation(changeMovieMutation)

    const [allMovies] = useQuery({
        query: allMoviesQuery,
    })
    const [allDirectors] = useQuery({
        query: allDirectorsQuery,
    })

    const addMovieNameRef = React.useRef(null)
    const addMovieGenreRef = React.useRef(null)
    const addMovieDirectorRef = React.useRef(null)

    const onRemoveMovie = (id) => {
        removeMovie({ "id": id })
    }

    const onAddMovie = () => {
        const variables = {
            "name": addMovieNameRef.current.value,
            "directorId": addMovieDirectorRef.current.value,
            "genre": addMovieGenreRef.current.value
        }

        if (!(variables.name === '' || variables.genre === '')) {
            addMovie(variables)
            addModal.onClose()
        }
    }

    const onChangeMovie = () => {
        const variables = {
            "id": modalData.id,
            "name": addMovieNameRef.current.value,
            "directorId": addMovieDirectorRef.current.value,
            "genre": addMovieGenreRef.current.value
        }

        if (!(variables.name === '' || variables.genre === '')) {
            changeMovie(variables)
            editModal.onClose()
        }
    }

    const handleOpenModal = (data) => {
        setModalData(data)
        editModal.onOpen()
    }

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
                            <Tr key={item.id}>
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
                                                aria-label='Search database'
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
                                        aria-label='Search database'
                                        icon={<EditIcon />}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal blockScrollOnMount={false} isOpen={editModal.isOpen} onClose={editModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change movie</ModalHeader>
                    <ModalCloseButton style={{ 'marginTop': '5px' }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={addMovieNameRef} defaultValue={modalData.name} placeholder='Name' />
                        </FormControl>
                        <FormControl mt={4} >
                            <FormLabel>Genre</FormLabel>
                            <Input ref={addMovieGenreRef} defaultValue={modalData.genre} placeholder='Genre' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Director</FormLabel>
                            <Select variant='filled' ref={addMovieDirectorRef} >
                                <option value={modalData.director?.id}>{modalData.director?.name}</option>
                                {!allDirectors.fetching && allDirectors.data.directors.map(item => {
                                    if (item.name !== modalData.director?.name) {
                                        return <option value={item.id} key={item.id}>{item.name}</option>
                                    }
                                })}
                            </Select>
                        </FormControl>
                        <Button colorScheme='blue' mt={4} onClick={onChangeMovie}>Change</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal blockScrollOnMount={false} isOpen={addModal.isOpen} onClose={addModal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new movie</ModalHeader>
                    <ModalCloseButton style={{ 'marginTop': '5px' }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={addMovieNameRef} placeholder='Name' />
                        </FormControl>
                        <FormControl mt={4} >
                            <FormLabel>Genre</FormLabel>
                            <Input ref={addMovieGenreRef} placeholder='Genre' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Director</FormLabel>
                            <Select variant='filled' ref={addMovieDirectorRef}>
                                {!allDirectors.fetching && allDirectors.data.directors.map(item => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <Button colorScheme='blue' mt={4} onClick={onAddMovie}>Add</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Movies