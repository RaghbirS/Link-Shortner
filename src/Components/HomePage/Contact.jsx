import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import s from "./HomePage.module.css"
import { Context } from '../../context';
import axios from 'axios';

const Contact = () => {
    let [senderDetails, setSenderDetails] = useState({ name: '', email: '', message: '' });
    const { toast } = useContext(Context);
    function isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(senderDetails.email);
    }
    let handleSend = () => {
        if (!senderDetails.name) return toast({
            title: `Please enter a valid name!`,
            status: "error",
            isClosable: true,
            position: "top",
        })
        if (!isValidEmail()) return toast({
            title: `Please enter a valid email!`,
            status: "error",
            isClosable: true,
            position: "top",
        })
        if (!senderDetails.message) return toast({
            title: `Please enter a valid message!`,
            status: "error",
            isClosable: true,
            position: "top",
        })
        axios.post("http://localhost:3001/shorten/send/email", senderDetails);
        axios.post("http://localhost:3001/shorten/messages", senderDetails);
        // axios.post("https://shortlinkapi.onrender.com/shorten/send/email", senderDetails);
        // axios.post("https://shortlinkapi.onrender.com/shorten/messages", senderDetails);
        setSenderDetails({ name: '', email: '', message: '' })
    }
    return (
        <Box id='contact' minH={"140vh"} bg={"url(https://cbxit.in/assets/images/contact-bg.jpg)"} bgSize={'cover'}>
            <Box minH={"30vh"} display={"flex"} flexDir={"column"} alignItems={"center"}>
                <Box h={"160px"} w={"2px"} bg={"rgba(250,250,250,0.1)"}></Box>
                <Box width={["90%", "320px", "320px", "320px"]} h={"100px"} border={"3px solid rgba(250,250,250,0.1)"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"30px"} color={"white"} >Let’s Keep In Touch</Text>
                </Box>
            </Box>
            <Box mt={"100px"} minH={"80vh"} display={"flex"} flexDir={["column", "column", "row", "row"]} alignItems={"center"} justifyContent={"space-evenly"} gap={["30px", "30px", "20px", "20px"]} p={"20px"}>
                <Box minW={["90vw", "90vw", "45vw", "45vw"]} bg={"rgba(255,255,255,.1)"} p={"20px"} display={"flex"} flexDir={"column"} gap={"30px"}>
                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"} gap={"20px"}>
                        <input value={senderDetails.name} onChange={(e) => setSenderDetails({ ...senderDetails, name: e.target.value })} type='text' className={s.contactInputs} placeholder='Your Name' style={{ width: "40%" }} />
                        <input value={senderDetails.email} onChange={(e) => setSenderDetails({ ...senderDetails, email: e.target.value })} type='email' className={s.contactInputs} placeholder='Your Email' style={{ width: "40%" }} />
                    </Box>
                    <textarea value={senderDetails.message} onChange={(e) => setSenderDetails({ ...senderDetails, message: e.target.value })} className={s.contactInputs} placeholder='Your Message' style={{ minHeight: "300px" }} />
                    <Button minH={"70px"} bg={"orange"} color={"white"} _hover={{ bg: "orange" }} fontSize={"20px"} onClick={handleSend}>
                        SEND MESSAGE NOW</Button>
                </Box>
                <Box minW={["90vw", "90vw", "45vw", "45vw"]} bg={"rgba(255,255,255,.3)"}>
                    <iframe className={s.iframe} style={{ width: "100%" }} height="620px" src="https://maps.google.com/maps?q=CEOITBOX&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                </Box>
            </Box>
        </Box>
    )
}

export default Contact