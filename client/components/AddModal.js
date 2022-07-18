import React from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react'
import { useQuery, useMutation } from 'urql'

import { addMovieMutation, addDirectorMutation } from '../graphql/mutation'
import { allDirectorsQuery } from '../graphql/query'

const AddModal = ({ addModal, type }) => {
    const [addMovieResult, addMovie] = useMutation(addMovieMutation)
    const [addDirectorResult, addDirector] = useMutation(addDirectorMutation)

    const [allDirectors] = useQuery({
        query: allDirectorsQuery,
    })

    const addMovieNameRef = React.useRef(null)
    const addMovieGenreRef = React.useRef(null)
    const addMovieDirectorRef = React.useRef(null)

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

    const onAddDirector = () => {
        const variables = {
            "name": addMovieNameRef.current.value,
        }

        if (!(variables.name === '')) {
            addDirector(variables)
            addModal.onClose()
        }
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={addModal.isOpen} onClose={addModal.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new</ModalHeader>
                <ModalCloseButton style={{ 'marginTop': '5px' }} />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={addMovieNameRef} placeholder='Name' />
                    </FormControl>
                    {type === 'm' && <>
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
                    </>}
                    {
                        type === 'm' ? <Button colorScheme='blue' mt={4} onClick={onAddMovie}>Add</Button> :
                            <Button colorScheme='blue' mt={4} onClick={onAddDirector}>Add</Button>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddModal