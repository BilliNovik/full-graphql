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

import { allDirectorsQuery } from '../graphql/query'
import { changeMovieMutation, changeDirectorMutation } from '../graphql/mutation'

const EditModal = ({ editModal, modalData }) => {

    const [changeMovieResult, changeMovie] = useMutation(changeMovieMutation)
    const [changeDirectorResult, changeDirector] = useMutation(changeDirectorMutation)

    const [allDirectors] = useQuery({
        query: allDirectorsQuery,
    })

    const addMovieNameRef = React.useRef(null)
    const addMovieGenreRef = React.useRef(null)
    const addMovieDirectorRef = React.useRef(null)

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

    const onChangeDirector = () => {
        const variables = {
            "id": modalData.id,
            "name": addMovieNameRef.current.value,
        }

        if (!(variables.name === '')) {
            changeDirector(variables)
            editModal.onClose()
        }
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={editModal.isOpen} onClose={editModal.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change movie</ModalHeader>
                <ModalCloseButton style={{ 'marginTop': '5px' }} />
                <ModalBody pb={6}>
                    {modalData.name && <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input ref={addMovieNameRef} defaultValue={modalData.name} placeholder='Name' />
                    </FormControl>}
                    {modalData.genre && <FormControl mt={4} >
                        <FormLabel>Genre</FormLabel>
                        <Input ref={addMovieGenreRef} defaultValue={modalData.genre} placeholder='Genre' />
                    </FormControl>}
                    {modalData.director && <FormControl mt={4}>
                        <FormLabel>Director</FormLabel>
                        <Select variant='filled' ref={addMovieDirectorRef} >
                            <option value={modalData.director?.id}>{modalData.director?.name}</option>
                            {!allDirectors.fetching && allDirectors.data.directors.map(item => {
                                if (item.name !== modalData.director?.name) {
                                    return <option value={item.id} key={item.id}>{item.name}</option>
                                }
                            })}
                        </Select>
                    </FormControl>}
                    {modalData.genre ? <Button colorScheme='blue' mt={4} onClick={onChangeMovie}>Change</Button> :
                        <Button colorScheme='blue' mt={4} onClick={onChangeDirector}>Change</Button>}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default EditModal