import { Box, Button, Text, useEditable } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Context } from "../../context";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { ChakraProvider } from "@chakra-ui/react";
import BasicUsage from "./Modal";
import { Input } from "@chakra-ui/react";

export default function TablePage() {
    const { data, setData, isLogin, userDetails, selected, setSelected, filteredData, setFilteredData, editing, setEditing, toast
        , domainValue, setDomainValue
    } = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);
    const [domain, setDomain] = useState(domainValue);
    function sort(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if (a[param] > b[param]) {
                return 1;
            }
            if (a[param] < b[param]) {
                return -1;
            }
            return 0;
        });
        setFilteredData(sortedData);
    }
    useEffect(() => {
        axios.get(`http://localhost:3001/shorten/users/${userDetails._id}`).then(res => {
            setDomainValue(res.data.domain);
            setDomain(res.data.domain)
        })
    },[])
    if (!isLogin) return <Navigate to={"/login"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} h={"150px"} display={"flex"}>
                <ChakraProvider>
                    <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"} h={"100%"} p={"30px"} width={"30%"} gap={"10px"}>
                        <NavLink to={"/addNewData"}>
                            <Button _hover={{ background: "#6262ff" }} color={"white"} background={"#7f7fff"} cursor={"pointer"} display={"flex"} gap={"10px"} alignItems="center" fontWeight={"500"}>
                                <svg style={{ width: "30px", fill: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                                <Text>Add New Data</Text>
                            </Button>
                        </NavLink>
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
                        }}>Edit</Button>
                        <Button _hover={{ background: "green" }} color={"white"} background={"lightgreen"} display={editing ? "flex" : "none"} onClick={() => {
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
                                for (let j of data) {
                                    if (j._id == i._id) {
                                        temp = j;
                                        break
                                    }
                                }
                                axios.patch(`http://localhost:3001/shorten/AllData/${i._id}`, temp)
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

                        <BasicUsage funcClose={() => {
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
                            }} onClick={() => {

                                for (let i of selected) {
                                    axios.delete(`http://localhost:3001/shorten/AllData/${i._id}`);
                                }
                                let filterData = [...data];
                                for (let i of selected) {
                                    filterData = filterData.filter(e => e._id != i._id)
                                }
                                console.log(filterData)
                                setFilteredData(filterData)
                                setData(filterData)
                                setSelected([])
                                toast({
                                    title: `Data Deleted Successfully`,
                                    status: "success",
                                    isClosable: true,
                                    position: "top"
                                })
                            }}>

                        </BasicUsage>

                        <Box display={"flex"} columnGap={"20px"} flexWrap={"wrap"}>
                            <Box w={"100%"}>
                                Domain
                            </Box>
                            <Input w={"70%"} border={"2px solid gray"} readOnly={!isEditable} value={domain} onChange={(e) => setDomain(e.target.value)} />
                            <Button _hover={{ background: "lightgreen" }} color={"black"} background={"lightgreen"} display={isEditable ? "none" : "flex"} onClick={() => {
                                setIsEditable(true)
                            }}>Edit</Button>
                            <Button _hover={{ background: "lightgreen" }} color={"black"} background={"lightgreen"} display={!isEditable ? "none" : "flex"} onClick={() => {
                                setIsEditable(false)
                                axios.patch(`http://localhost:3001/shorten/users/${userDetails._id}`, {
                                    domain: domain
                                })
                                setDomainValue(domain)
                            }}>Save</Button>
                        </Box>
                    </Box>
                </ChakraProvider>
                <Box h={"100%"} w={"70%"}>

                </Box>
            </Box>
            <ChakraProvider>
                <Box display={"flex"} flexDir={"column"} height={"80vh"} overflow="scroll">
                    <TableHeader sort={sort} />
                    {
                        filteredData.map((i, index) => (
                            <TableRows toast={toast} key={index + i._id} setData={setData} userDataArr={data} data={i} index={index} />
                        ))
                    }
                </Box>
            </ChakraProvider>
        </Box>
    )
}