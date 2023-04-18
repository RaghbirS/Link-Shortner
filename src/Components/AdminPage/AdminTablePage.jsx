import { Box, Button, Text, filter, useEditable } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Context } from "../../context";
import TableHeader from "./AdminTableHeader";
import TableRows from "./AdminTableRows";
import { ChakraProvider } from "@chakra-ui/react";
import BasicUsage from "./Modal";
import { Input } from "@chakra-ui/react";
import Filters from "./AdminFilters";
import { EditIcon } from "@chakra-ui/icons";

export default function TablePage() {
    const { allUsersData, setAllUsersData, isLogin, userDetails, selected, setSelected, allUsersFilteredData, setAllUsersFilteredData, editing, setEditing, toast
        , domainValue, setDomainValue, clickDetails,
        shortLimit, setShortLimit, isAdminLogin
    } = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);
    const [domain, setDomain] = useState(domainValue);

    useEffect(() => {
        axios.get(`http://localhost:3001/shorten/users`).then(res => {
            setAllUsersData(res.data);
            setAllUsersFilteredData(res.data)
        })
    }, [])
    if (!isAdminLogin) return <Navigate to={"/login"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} h={"150px"} display={"flex"} flexDir={"column"} p={"0 30px"}>
                <ChakraProvider>

                    <Box display={"flex"} alignItems={"center"} h={"50%"} p={"30px 0"} width={"100%"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"20px"}>
                            {/* <NavLink to={"/addNewData"}>
                                <Button _hover={{ background: "#6262ff" }} color={"white"} background={"#7f7fff"} cursor={"pointer"} display={"flex"} gap={"10px"} alignItems="center" fontWeight={"500"}>
                                    <svg style={{ width: "15px", fill: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                                    <Text>Add New URL</Text>
                                </Button>
                            </NavLink> */}
                            <Button disabled={selected.length === 0} _hover={{ background: "#00af00" }} color={"white"} background={"green"} display={editing ? "none" : "flex"} onClick={() => {
                                if (selected.length === 0) {
                                    return toast({
                                        title: `Please Select Data to Edit`,
                                        status: "error",
                                        isClosable: true,
                                        position: "top"
                                    })
                                }
                                setEditing(true)
                                for (let i of selected) {
                                    i.setIsReadOnly(false)
                                }
                            }}> <EditIcon sx={{ mr: "10px" }} /> Edit</Button>
                            <Button _hover={{ background: "green" }} color={"white"} background={"lightgreen"} display={editing ? "flex" : "none"} onClick={async () => {
                                setEditing(false)
                                if (selected.length === 0) {
                                    return toast({
                                        title: `Please Select Data to Edit`,
                                        status: "error",
                                        isClosable: true,
                                        position: "top"
                                    })
                                }
                                for (let i of selected) {
                                    let temp = {};
                                    for (let j of allUsersData) {
                                        if (j._id == i._id) {
                                            temp = j;
                                            break
                                        }
                                    }
                                    console.log(temp)
                                    await axios.patch(`http://localhost:3001/shorten/users/${i._id}`, temp)
                                    i.setCheck(false)
                                    i.setIsReadOnly(true)
                                }
                                setSelected([])
                                toast({
                                    title: `Data Edited Successfully`,
                                    status: "success",
                                    isClosable: true,
                                    position: "top"
                                })
                            }}>Save</Button>

                            <BasicUsage funcClose={async () => {
                                for (let i of selected) {
                                    i.setCheck(false)
                                    i.setIsReadOnly(true)
                                }
                                setSelected([])
                            }}
                                selected={selected} openModelFunc={() => {
                                    if (selected.length === 0) {

                                        toast({
                                            title: `Please Select Data to Delete`,
                                            status: "error",
                                            isClosable: true,
                                            position: "top"
                                        })
                                        return false
                                    }
                                    if (editing === true) {
                                        toast({
                                            title: `Cannot Delete while Editing`,
                                            status: "error",
                                            isClosable: true,
                                            position: "top"
                                        })
                                        return false
                                    }
                                    return true
                                }} onClick={async () => {
                                    let filterData = [...allUsersData]
                                    for (let i of selected) {
                                        filterData = filterData.filter(element => element._id != i._id)
                                        await axios.delete(`http://localhost:3001/shorten/users/${i._id}`);
                                        let { data: userLinks } = await axios.get(`http://localhost:3001/shorten/AllData?userID=${i._id}`);
                                        for (let links of userLinks) {
                                            let { data: clicksTempData } = await axios.get(`http://localhost:3001/shorten/clicks?userID=${i._id}`);
                                            for (let clicksData of clicksTempData) {
                                                
                                                await axios.delete(`http://localhost:3001/shorten/clicks/${clicksData._id}`)
                                            }
                                            await axios.delete(`http://localhost:3001/shorten/AllData/${links._id}`);
                                        }
                                    }
                                    setAllUsersFilteredData(filterData)
                                    setAllUsersData(filterData)
                                    setSelected([])
                                    toast({
                                        title: `Data Deleted Successfully`,
                                        status: "success",
                                        isClosable: true,
                                        position: "top"
                                    })
                                }}>
                            </BasicUsage>
                        </Box>

                    </Box>
                </ChakraProvider>
                <ChakraProvider>
                    <Box h={"50%"} w={"100%"} display={"flex"} justifyContent={"space-between"}>
                        <Filters />
                    </Box>
                </ChakraProvider>
            </Box>
            <ChakraProvider>
                <Text sx={{ ml: "20px", mb: "10px" }}>{allUsersData.length} Users </Text>
                <Box display={"flex"} flexDir={"column"} height={"80vh"} overflow="scroll">
                    <TableHeader />
                    {
                        allUsersFilteredData.map((i, index) => (
                            <TableRows toast={toast} key={index + i._id} setData={setAllUsersData} userDataArr={allUsersData} data={i} index={index} />
                        ))
                    }
                </Box>
            </ChakraProvider>
        </Box>
    )
}