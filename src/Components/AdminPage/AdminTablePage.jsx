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
    const { allUsersData, setAllUsersData, selected, setSelected, allUsersFilteredData, setAllUsersFilteredData, editing, setEditing, toast
        , domainValue, apiLink, isAdminLogin
    } = useContext(Context);

    useEffect(() => {
        axios.get(`${apiLink}shorten/users`).then(res => {
            setAllUsersData(res.data);
            setAllUsersFilteredData(res.data)
        })
    }, [])
    if (!isAdminLogin) return <Navigate to={"/client/login"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} h={"150px"} display={"flex"} flexDir={"column"} p={"0 30px"}>
                <ChakraProvider>
                    <Box display={"flex"} alignItems={"center"} h={"50%"} p={"30px 0"} width={"100%"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"20px"}>
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

                                    await axios.patch(`${apiLink}shorten/users/${i._id}`, temp)
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
                                        await axios.delete(`${apiLink}/users/${i._id}`);
                                        let { data: userLinks } = await axios.get(`${apiLink}shorten/AllData?userID=${i._id}`);
                                        for (let links of userLinks) {
                                            let { data: clicksTempData } = await axios.get(`${apiLink}shorten/clicks?userID=${i._id}`);
                                            for (let clicksData of clicksTempData) {
                                                axios.delete(`${apiLink}shorten/clicks/${clicksData._id}`)
                                            }
                                            axios.delete(`${apiLink}shorten/AllData/${links._id}`);
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