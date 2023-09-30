import { Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Text, Th, Thead, Tr, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVendor, getData } from '../redux/action'
import VendorCard from './VendorCard'
import axios from "axios"
let total;

const VendorList = () => {
    const data = useSelector((store) => store.data);
    const [state, setState] = useState(0)
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [account_number, setaccount_number] = useState("")
    const [bank_name, setbank_name] = useState("")
    const [address_line_1, setaddress_line_1] = useState("")
    const [address_line_2, setaddress_line_2] = useState("")
    const [city, setcity] = useState("");
    const [country, setcountry] = useState("");
    const [zip_code, setzipcode] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleAdd = (e) => {
        e.preventDefault();
        let obj = {
            name,
            account_number,
            bank_name,
            address_line_1,
            address_line_2,
            city,
            country,
            zip_code
        }
        dispatch(addVendor(obj))
        setName("");
        setaccount_number("");
        setbank_name("");
        setaddress_line_1("");
        setaddress_line_2("")
        setcity("");
        setcountry("");
        setzipcode("");
    }

    useEffect(() => {

        dispatch(getData(page));

    }, [page, state])

    const TotalPages = () => {
        axios.get(`http://localhost:8080/vendors/`).then((res) => {
            return total = res.data.length
        });
    }
    TotalPages();

    return (
        <>
            <VStack>
                <Heading>Vendor List</Heading>
                <HStack width="95%" margin="auto" justifyContent="flex-end">
                    <Button colorScheme="blue" onClick={onOpen}>Add New Vendor</Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create your account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <Input onChange={(e) => setName(e.target.value)} value={name || ''} type="text" placeholder='Name'></Input>
                                    <Input isRequired={true} onChange={(e) => setaccount_number(e.target.value)} value={account_number || ""} type="number" placeholder='Account Number'></Input>
                                    <Input isRequired={true} onChange={(e) => setbank_name(e.target.value)} value={bank_name || ""} type="text" placeholder='Bank Name'></Input>
                                    <Input onChange={(e) => setaddress_line_1(e.target.value)} value={address_line_1 || ""} type="text" placeholder='address-line-1'></Input>
                                    <Input onChange={(e) => setaddress_line_2(e.target.value)} value={address_line_2 || ""} type="text" placeholder='address-line-2'></Input>
                                    <Input onChange={(e) => setcity(e.target.value)} value={city || ""} type="text" placeholder='City'></Input>
                                    <Input onChange={(e) => setcountry(e.target.value)} value={country || ""} type="text" placeholder='Country'></Input>
                                    <Input onChange={(e) => setzipcode(e.target.value)} value={zip_code || ''} type="text" placeholder='ZipCode'></Input>
                                    {/* <Input onClick={handleAdd} type="submit"></Input> */}
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={handleAdd} colorScheme='blue' mr={3}>
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
                <Table margin="auto">
                    <Thead>
                        <Tr>
                            <Th fontSize="20px" textAlign="center">Vendor Name</Th>
                            <Th fontSize="20px" textAlign="center">Bank Account Number</Th>
                            <Th fontSize="20px" textAlign="center">Bank Name</Th>
                            <Th fontSize="20px" textAlign="center">Edit</Th>
                            <Th fontSize="20px" textAlign="center">Delete</Th>
                        </Tr>
                    </Thead>
                    {data?.map((ele, ind) => {

                        return <VendorCard key={ind} {...ele} state={state} setState={setState} />

                    })}

                </Table>

            </VStack>
            <HStack bottom="10%" position="fixed" width="100%" justifyContent="center">
                <Button colorScheme="orange" isDisabled={page === 1} onClick={() => { setPage(page - 1) }}>Prev</Button>
                <Text>{page}</Text>
                <Button isDisabled={Math.ceil(total / 5) === page} colorScheme="orange" onClick={() => { setPage(page + 1) }}>Next</Button>
            </HStack>
        </>

    )
}

export default VendorList