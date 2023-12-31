import { Box, Button, FormControl, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, Text, Th, Thead, Tr, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVendor, getData } from '../redux/action'
import VendorCard from './VendorCard'
import axios from "axios"
import { base_url } from '../utils/base_url'
let total;

const VendorList = () => {
    const data = useSelector((store) => store.data);
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
    const isLoading = useSelector((store) => store.isLoading);
    console.log(isLoading)
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

    }, [page])

    const TotalPages = () => {
        axios.get(`${base_url}/`).then((res) => {
            return total = res.data.length
        });
    }
    TotalPages();

    return (
        <>
            <VStack>
                <Heading>Vendor List</Heading>
                <HStack width="95%" margin="auto" justifyContent="flex-end">
                    <Button fontSize="18px" fontWeight="bold" colorScheme="blue" onClick={onOpen}>Add New Vendor</Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add new vendor</ModalHeader>
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
                <Table margin="auto" width="95%">
                    <Thead>
                        <Tr boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px">
                            <Th fontSize="20px" >Vendor Name</Th>
                            <Th fontSize="20px" >Bank Account Number</Th>
                            <Th fontSize="20px" >Bank Name</Th>
                            <Th fontSize="20px" >Edit</Th>
                            <Th fontSize="20px" >Delete</Th>
                        </Tr>
                    </Thead>
                    {data.length === 0 ? <Spinner emptyColor="gray.200" thickness="4px" speed="0.65s" size="xl" position="fixed" left="45%" top="45%" color="red.500" /> :
                        data?.map((ele, ind) => {

                            return <VendorCard key={ind} {...ele} page={page} />

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