import { Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { CopyIcon, EmailIcon } from "@chakra-ui/icons";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ChakraProvider,
} from '@chakra-ui/react';
import axios from "axios";
import { NavLink } from "react-router-dom";
function CustomIconQR({ onClick }) {
    return <svg onClick={onClick} style={{ height: "75%", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zM64 96v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336zm64 16v64h64V352H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64H320v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16v64c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V304zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" /></svg>
}
function CustomIconEmail({ onClick }) {
    return <svg onClick={onClick} style={{ height: "75%", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
}
function CustomIconWhatsApp({ onClick }) {
    return <svg onClick={onClick} style={{ height: "75%", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
}
function CustomIconStar({ onClick, bg }) {
    return <svg onClick={onClick} style={{ height: "75%", cursor: "pointer", fill: bg }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function TableRows({ data, userDataArr, toast
}) {
    const { selected, setSelected, editing, setAllUsersData,
        setAllUsersFilteredData, apiLink
    } = useContext(Context);
    const [check, setCheck] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const { firstName, lastName, email, password, domain, _id, isAdmin } = data;
    const [firstNameValue, setFirstNameValue] = useState(firstName)
    const [lastNameValue, setLastNameValue] = useState(lastName)
    const [emailValue, setEmailValue] = useState(email)
    const [passwordValue, setPasswordValue] = useState(password)
    const [domainValue] = useState(domain)
    const [count, setCount] = useState(1);
    // const [openQR, setOpenQR] = useState(false);
    const [isAdminValue, setIsAdminValue] = useState(isAdmin);
    const [totalCredits, setTotalCredits] = useState(0);
    const [usedCredits, setUsedCredits] = useState(0);
    useEffect(() => {
        if (count == 1) {
            return setCount(prev => prev + 1)
        }
        let editedObject = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
            domain: domainValue,
            isAdmin: isAdminValue,
            _id

        }
        let temp = [...userDataArr];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]._id === _id) {
                temp[i] = editedObject;
                console.log(temp[i])
                break
            }
        }
        setAllUsersData(temp);
        setAllUsersFilteredData(temp);
    }, [firstNameValue, lastNameValue, emailValue, passwordValue, domainValue, isAdminValue])

    useEffect(() => {
        axios.get(`${apiLink}shorten/licenceCheck/`, {
            email
        }).then(res => setTotalCredits(res.data.limit))
        axios.get(`${apiLink}shorten/AllData/`, {
            email
        }).then(res => setUsedCredits((res.data.filter(i => i.userID == _id).length)))
    }, [])
    return (
        <Box display={"flex"} minW={"100%"} background={"none"}>
            <Box flexShrink={0} overflow={"hidden"} borderRadius={"none"} h={"40px"} type={"checkbox"} w={"6%"} border={"1px solid #dee2e6"} textAlign={"center"} >
                <Button display={"flex"} justifyContent={"center"} className="select" h={"40px"} w={"100%"} onClick={e => {
                    if (editing) {
                        return toast({
                            title: `Cannot Select or Unselect while Editing`,
                            status: "error",
                            isClosable: true,
                            position: "top"
                        })
                    }
                    let value = !check;
                    if (value) {
                        setSelected(prev => [...prev, { _id, isReadOnly, setIsReadOnly, check, setCheck }])
                    }
                    else {
                        setSelected(selected.filter((i) => i._id !== _id))
                    }
                    setCheck(value)
                }
                }>
                    <input onChange={(e) => console.log()} type={"checkbox"} checked={check} />

                </Button>
            </Box>
            <Input color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"12%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={true} onChange={(e) => setFirstNameValue(e.target.value)} borderRadius={"none"} h={"40px"} value={firstNameValue} border={"2px solid #dee2e6"}></Input>
            <Input color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"12%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setLastNameValue(e.target.value)} borderRadius={"none"} h={"40px"} value={lastNameValue} border={"2px solid #dee2e6"}></Input>
            <Input color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"20%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => {
                setEmailValue(e.target.value)
            }} borderRadius={"none"} h={"40px"} value={emailValue} border={"2px solid #dee2e6"}></Input>
            <Input color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"10%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={true} onChange={(e) => setPasswordValue(e.target.value)} borderRadius={"none"} h={"40px"} value={passwordValue} border={"2px solid #dee2e6"}>{ }</Input>

            <Input color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"10%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setPasswordValue(e.target.value)} borderRadius={"none"} h={"40px"} value={domainValue} border={"2px solid #dee2e6"}></Input>
            <Button disabled={!isReadOnly} color={!isReadOnly ? "white" : "black"} background={!isReadOnly ? "#888888" : "none"} flexShrink={0} w={"8%"} cursor={"pointer"} borderRadius={"none"} h={"40px"} border={"2px solid #dee2e6"} display={"flex"} justifyContent={"center"} alignItems={"center"} onClick={(e) => {
                if(isReadOnly) return;
                setIsAdminValue(!isAdminValue)}}><input value={isAdminValue}  type="checkbox" checked={isAdminValue} /></Button>
            <Box flexShrink={0} w={"11%"} cursor={"default"} onChange={(e) => (e.target.value)} borderRadius={"none"} h={"40px"} border={"2px solid #dee2e6"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
                {totalCredits}

            </Box>
            <Box flexShrink={0} w={"11%"} cursor={"default"} onChange={(e) => (e.target.value)} borderRadius={"none"} h={"40px"} border={"2px solid #dee2e6"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"20px"}>
                {totalCredits - usedCredits}
            </Box>
        </Box>
    )
}

