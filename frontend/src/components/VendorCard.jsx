import { Button, Tbody, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteVendor, getData } from '../redux/action'

const VendorCard = ({ name, account_number, bank_name, _id,state,setState}) => {

    const dispatch = useDispatch();
    const data = useSelector((store)=>store.data)
    const handleDelete = (_id)=>{
        dispatch(deleteVendor(_id));

        setState(state+1)
    };

    return (
        <>
            <Tbody>
                <Tr>
                    <Td textAlign="center">{name}</Td>
                    <Td textAlign="center">{account_number}</Td>
                    <Td textAlign="center">{bank_name}</Td>
                    <Td textAlign="center"><Link to={`/edit-vendor/${_id}`}><Button colorScheme="green">Edit</Button></Link></Td>
                    <Td textAlign="center"><Button colorScheme="red" onClick={()=>handleDelete(_id)}>Delete</Button></Td>
                </Tr>
            </Tbody>
        </>
    )
}

export default VendorCard