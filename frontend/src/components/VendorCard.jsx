import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteVendor } from '../redux/action'
import { DataLoadinFailure, DataLoadinPending, DataLoadinSuccess } from '../redux/actionType'
import { base_url } from '../utils/base_url'

const VendorCard = ({ name, account_number, bank_name, _id, page }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const dispatch = useDispatch();
    const handleDelete = (_id) => {
        onClose()
        dispatch(deleteVendor(_id)).then(() => {
            dispatch({ type: DataLoadinPending });

            return axios.get(`${base_url}?page=${page}&limit=5`).then((res) => {
                dispatch({ type: DataLoadinSuccess, payload: res.data })
            }).catch(() => {
                dispatch({ type: DataLoadinFailure });
            })


        })
    };


    return (
        <>
            <Tbody>
                <Tr fontSize="18px" fontWeight="bold" boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset">
                    <Td textAlign="center">{name}</Td>
                    <Td textAlign="center">{account_number}</Td>
                    <Td textAlign="center">{bank_name}</Td>
                    <Td textAlign="center"><Link to={`/edit-vendor/${_id}`}><Button colorScheme="green">Edit</Button></Link></Td>
                    <Td textAlign="center"><Button fontSize="18px" fontWeight="bold" colorScheme="red" onClick={onOpen}>Delete</Button></Td>
                </Tr>
            </Tbody>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(_id)} colorScheme='red' ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default VendorCard