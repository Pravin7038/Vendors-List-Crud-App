import { Button, FormControl, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { editData } from '../redux/action';

const EditVendor = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const data = useSelector((store) => store.data);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [account_number, setaccount_number] = useState("")
    const [bank_name, setbank_name] = useState("")
    const [address_line_1, setaddress_line_1] = useState("")
    const [address_line_2, setaddress_line_2] = useState("")
    const [city, setcity] = useState("");
    const [country, setcountry] = useState("");
    const [zip_code, setzipcode] = useState("");

    useEffect(() => {

        let x = []
        for (let i = 0; i < data?.length; i++) {
            if ((data[i]._id) === id) {
                x.push(data[i]);
            }
        }

        setName(x[0]?.name);
        setaccount_number(x[0]?.account_number);
        setbank_name(x[0]?.bank_name);
        setaddress_line_1(x[0]?.address_line_1);
        setaddress_line_2(x[0]?.address_line_2)
        setcity(x[0]?.city);
        setcountry(x[0]?.country);
        setzipcode(x[0]?.zip_code);

    }, [data, id])


    const handleEdit = (e) => {
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
        if (!name || !account_number || !bank_name) {
            alert("Fields with * are mandatory")
        }
        else {
            dispatch(editData(id, obj));
            alert("Vendor info edited successfully");
            navigate("/")
        }

    }
    return (
        <VStack width="40%" margin="auto" justifyContent="center" height="730px" paddingLeft="20px" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" paddingRight="20px">
            <Heading fontSize="25px">Edit Vendor Information</Heading>
            <FormControl>
                <FormLabel>Name*</FormLabel>
                <Input isRequired={true} onChange={(e) => setName(e.target.value)} value={name || ''} type="text" placeholder='Name'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Account Number*</FormLabel>
                <Input isRequired={true} onChange={(e) => setaccount_number(e.target.value)} value={account_number || ""} type="number" placeholder='Account Number'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Bank Name*</FormLabel>
                <Input isRequired={true} onChange={(e) => setbank_name(e.target.value)} value={bank_name || ""} type="text" placeholder='Bank Name'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>address-line-1</FormLabel>
                <Input onChange={(e) => setaddress_line_1(e.target.value)} value={address_line_1 || ""} type="text" placeholder='address-line-1'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>address-line-1</FormLabel>
                <Input onChange={(e) => setaddress_line_2(e.target.value)} value={address_line_2 || ""} type="text" placeholder='address-line-2'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>City</FormLabel>
                <Input onChange={(e) => setcity(e.target.value)} value={city || ""} type="text" placeholder='City'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Country</FormLabel>
                <Input onChange={(e) => setcountry(e.target.value)} value={country || ""} type="text" placeholder='Country'></Input>
            </FormControl>
            <FormControl>
                <FormLabel>ZipCode</FormLabel>
                <Input onChange={(e) => setzipcode(e.target.value)} value={zip_code || ''} type="text" placeholder='ZipCode'></Input>
            </FormControl>
            <FormControl >
                <Button width="200px" colorScheme="green" onClick={handleEdit}>Save</Button>
            </FormControl>
        </VStack>
    )
}

export default EditVendor