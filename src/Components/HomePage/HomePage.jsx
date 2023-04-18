import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import s from "./HomePage.module.css"
import Contact from './Contact'
import Footer from './Footer'
const HomePage = () => {
    return (
        <>
        <Box bg={"rgba(22,34,57,0.85)"} minH={"calc(100vh - 100px)"} flexDir={"column"} display={"flex"} alignItems={"center"}>
            <Box minH={"calc(70vh - 100px)"} display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                <Text fontSize={["20px","24px","28px","30px"]} color={"white"}>CBXIT FOR SHORT URL</Text>
                <Box display={"flex"}>
                    <Text color={"#bad900"} fontWeight={"900"} fontSize={["60px","70px","80px","90px"]}>CEO</Text>
                    <Text color={"white"} fontWeight={"900"} fontSize={["60px","70px","80px","90px"]}>IT</Text>
                    <Text color={"#bad900"} fontWeight={"900"} fontSize={["60px","70px","80px","90px"]}>BOX</Text>
                </Box>
            </Box>
            <Box minH={"30vh"} w={"100%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"flex-end"} flexDir={["column","column","column","row"]}>
                <Box className={s.openBoxes} w={["100%","100%","100%","45%"]} h={"150px"} bg={"#0c1228"}>
                    <Text h={"150px"} display={"flex"} alignItems={"center"} fontSize={"30px"} color={"white"}>FREE</Text>
                    <Text color={"white"}>Would you like to test our product before you decide to purchase? Create a free account which will enable you to create active 500 short links at any time along with detailed analysis of the links clicked. Give it a try now.</Text>
                </Box>
                <Box className={s.openBoxes} w={["100%","100%","100%","45%"]} h={"150px"}bg={"#0c1228"}>
                <Text h={"150px"} display={"flex"} alignItems={"center"} fontSize={"30px"} color={"white"}>SUBSCRIPTION</Text>
                    <Text color={"white"}>As a subscribed member you will have the benefit of creating active 5000 short URLs with detailed link click analysis. The data can also be updated live inside a Google Sheet. You also will be able to customise the short URLs with your custom domain.</Text>
                </Box>
            </Box>
        </Box>
        <Contact/>
        <Footer/>
        </>
    )
}

export default HomePage