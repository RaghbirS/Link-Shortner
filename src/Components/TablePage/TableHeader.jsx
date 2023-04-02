import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context';

const TableHeader = ({ sort }) => {
    const { selected, setSelected } = useContext(Context);
    let arr;
    let [selectAll, setSelectAll] = useState(false)
    useEffect(() => {
        arr = document.querySelectorAll(".select");
    })
    return (
        <Box display={"flex"} minW={"100%"}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0}  cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"} w={"6%"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !selectAll;
                if (value) {
                    for (let i of arr) {
                        i.click()
                    }
                }
                else {
                    for (let i of selected) {
                        i.setCheck(false)
                        i.setIsReadOnly(true)
                    }
                    setSelected([])
                }
                console.log(selected)
                setSelectAll(value)
            }}>Checkbox</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"23%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("longURL")}>Long URL</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"10%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("alias")}>Alias</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"18%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("shortURL")}>Short URL</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"15%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("remarks")}>Remarks</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"5%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => sort("clicks")}>Clicks</Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"23%"} cursor={"pointer"} borderRadius={"none"} bg={"cyan"} h={"40px"}  border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} >Other Options</Box>
        </Box>
    )
}

export default TableHeader