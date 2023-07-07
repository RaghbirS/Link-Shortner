import { Box, Skeleton } from '@chakra-ui/react';
import React from 'react'

const SkeletonLoading = () => {
    return (
        <Box display={"flex"} minW={"100%"} background={"none"} justifyContent={"space-between"}>
            <Box flexShrink={0} overflow={"hidden"} borderRadius={"none"} h={"40px"} type={"checkbox"} w={"6%"} border={"1px solid #dee2e6"} textAlign={"center"} >
                <Skeleton height='100%' w={"100%"} />
            </Box>
            <Skeleton w={"12.9%"} h={"40px"} ></Skeleton>
            <Skeleton w={"17.9%"} h={"40px"}></Skeleton>
            <Skeleton w={"9.9%"} h={"40px"} ></Skeleton>
            <Box w={"19.9%"} position={"relative"}>
                <Skeleton height='40px' w={"100%"} />
            </Box>
            <Skeleton h={"40px"} w={"9.9%"} />

            <Box w={"7.9%"} h={"40px"} >
                <Skeleton height='100%' w={"100%"} /></Box>
            <Box w={"14.9%"} h={"40px"} >
                <Skeleton height='100%' w={"100%"} />
            </Box>
            {/* <Stack>
                
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack> */}
        </Box>
    )
}

export default SkeletonLoading