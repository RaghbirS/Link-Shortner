import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import s from "./HomePage.module.css"
const Contact = () => {
    return (
        <Box id='contact' minH={"140vh"} bg={"url(https://cbxit.in/assets/images/contact-bg.jpg)"} bgSize={'cover'}>
            <Box minH={"30vh"} display={"flex"} flexDir={"column"} alignItems={"center"}>
                <Box h={"160px"} w={"2px"} bg={"rgba(250,250,250,0.1)"}></Box>
                <Box width={["90%", "320px", "320px", "320px"]} h={"100px"} border={"3px solid rgba(250,250,250,0.1)"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"30px"} color={"white"} >Let’s Keep In Touch</Text>
                </Box>
            </Box>
            <Box mt={"100px"} minH={"80vh"} display={"flex"} flexDir={["column", "column", "row", "row"]} alignItems={"center"} justifyContent={"space-evenly"} gap={["30px", "30px", "20px", "20px"]} p={"40px"}>
                <Box minW={["90vw", "90vw", "45vw", "45vw"]} minH={["90vw", "90vw", "45vw", "45vw"]} bg={"rgba(255,255,255,.1)"} p={"40px"} display={"flex"} flexDir={"column"} gap={"30px"}>
                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                        <input className={s.contactInputs} placeholder='Your Name' style={{width:"40%"}}/>
                        <input className={s.contactInputs} placeholder='Your Email' style={{width:"40%"}} />
                    </Box>
                    <textarea className={s.contactInputs} placeholder='Your Email' style={{minHeight:"300px"}}/>
                    <Button minH={"70px"} bg={"orange"} color={"white"} _hover={{bg:"orange"}} fontSize={"20px"}>SEND MESSAGE NOW</Button>
                </Box>
                <Box minW={["90vw", "90vw", "45vw", "45vw"]} minH={["90vw", "90vw", "45vw", "45vw"]} bg={"rgba(255,255,255,.3)"}>
                    <iframe className={s.iframe} style={{ width: "100%" }} height="620px" src="https://maps.google.com/maps?q=CEOITBOX&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                </Box>
            </Box>
        </Box>
    )
}

export default Contact