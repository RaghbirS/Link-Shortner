import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Box fontWeight={"700"} fontSize={["14px","16px","18px","20px"]} display={"flex"} justifyContent={"center"} alignItems={"center"} minH={"100px"} color={"white"} bg={"url(https://cbxit.in/assets/images/contact-bg.jpg)"}>
            <Text fontWeight={"800"}>COPYRIGHT © 2023.</Text> MADE BY CEOITBOX TEAM
        </Box>
    )
}

export default Footer