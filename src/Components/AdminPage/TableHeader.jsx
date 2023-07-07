import { Box, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context';
const SortIcon = () => {
    return <svg style={{ height: "50%", position: "absolute", right: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" /></svg>
}
const TableHeader = ({ sortAsc, sortDes }) => {
    const { selected, setSelected } = useContext(Context);
    let arr;
    let [selectAll, setSelectAll] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [domain, setDomain] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    useEffect(() => {
        arr = document.querySelectorAll(".select");
    })
    return (
        <Box display={"flex"} minW={"100%"} position={"relative"}>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} w={"6%"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
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
                setSelectAll(value)
            }}>Checkbox</Box>
            <Box onClick={() => {
                let value = !firstName;
                if (value) {
                    sortAsc("firstName")
                }
                else sortDes("firstName");
                setFirstName(value)
            }} position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"12%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>First Name <SortIcon />
            </Box>
            <Box onClick={() => {
                let value = !lastName;
                if (value) {
                    sortAsc("lastName")
                }
                else sortDes("lastName");
                setLastName(value)
            }} position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"12%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Last Name<SortIcon />
            </Box>
            <Box onClick={() => {
                let value = !email;
                if (value) {
                    sortAsc("email")
                }
                else sortDes("email");
                setEmail(value)
            }} position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"20%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Email  <SortIcon /></Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"10%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Password    </Box>
            <Box onClick={() => {
                let value = !domain;
                if (value) {
                    sortAsc("domain")
                }
                else sortDes("domain");
                setDomain(value)
            }} position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"10%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Domain  <SortIcon />  </Box>
            <Box onClick={() => {
                let value = !isAdmin;
                if (value) {
                    sortAsc("isAdmin")
                }
                else sortDes("isAdmin");
                setIsAdmin(value)
            }} position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"8%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Is Admin <SortIcon />  </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"11%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Credits Allowed   </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"11%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"}>Credits Remaining   </Box>
        </Box>
    )
}

export default TableHeader