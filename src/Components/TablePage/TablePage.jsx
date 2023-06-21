import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Context } from "../../context";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { ChakraProvider } from "@chakra-ui/react";
import BasicUsage from "./Modal";
import { Input } from "@chakra-ui/react";
import Filters from "./Filters";
import { EditIcon } from "@chakra-ui/icons";

export default function TablePage() {
    const { data, setData, userDetails, selected, setSelected, filteredData, setFilteredData, editing, setEditing, toast
        , domainValue, setDomainValue, clickDetails,
        shortLimit, apiLink
    } = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);
    const [domain, setDomain] = useState(domainValue);
    function sortAsc(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if (a[param] > b[param]) {
                return -1;
            }
            if (a[param] < b[param]) {
                return 1;
            }
            return 0;
        });
        setFilteredData(sortedData);
    }
    function sortDes(param) {
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
    function sortAscDate(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if (new Date(a[param]) > new Date(b[param])) {
                return -1;
            }
            if (new Date(a[param]) < new Date(b[param])) {
                return 1;
            }
            return 0;
        });
        setFilteredData(sortedData);
    }
    function sortDesDate(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if (new Date(a[param]) > new Date(b[param])) {
                return 1;
            }
            if (new Date(a[param]) < new Date(b[param])) {
                return -1;
            }
            return 0;
        });
        setFilteredData(sortedData);
    }
    useEffect(() => {
        axios.get(`${apiLink}shorten/users/${userDetails._id}`).then(res => {
            setDomainValue(res.data.domain);
            setDomain(res.data.domain)
        })
    }, [apiLink,setDomainValue,userDetails._id])
    if (!userDetails._id) return <Navigate to={"/client/login"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} minH={"150px"} display={"flex"} flexDir={"column"} p={"0 30px"}>
                <ChakraProvider>

                    <Box display={"flex"} alignItems={"center"} h={"50%"} p={"30px 0"} width={"100%"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"20px"}>
                            <NavLink to={"/client/addNewData"}>
                                <Button _hover={{ background: "#6262ff" }} color={"white"} background={"#7f7fff"} cursor={"pointer"} display={"flex"} gap={"10px"} alignItems="center" fontWeight={"500"}>
                                    <svg style={{ width: "15px", fill: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                                    <Text>Add New URL</Text>
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
                                    for (let j of data) {
                                        if (j._id === i._id) {
                                            temp = j;
                                            break
                                        }
                                    }
                                    await axios.patch(`${apiLink}AllData/${i._id}`, temp)
                                    i.setCheck(false)
                                    i.setIsReadOnly(true)
                                }
                                for (let i of clickDetails) {
                                    await axios.patch(`${apiLink}shorten/clicks/${i._id}`, {
                                        shortURL: i.shortURL
                                    })
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

                                    for (let i of selected) {
                                        console.log(selected)
                                        axios.delete(`${apiLink}shorten/AllData/${i._id}`);
                                    }
                                    let filterData = [...data];
                                    for (let i of selected) {
                                        filterData = filterData.filter(e => e._id != i._id)
                                    }
                                    for (let i of selected) {
                                        let temp = clickDetails.filter(element => element.shortURL == i.shortLinkValue);
                                        for (let j of temp) {
                                            axios.delete(`${apiLink}shorten/clicks/${j._id}`);
                                        }
                                    }
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
                        </Box>
                        <Box display={"flex"} columnGap={"20px"} flexWrap={"wrap"}>
                            <Input placeholder="Custom Domain" w={"45%"} border={"2px solid gray"} readOnly={!isEditable} value={domain} onChange={(e) => setDomain(e.target.value)} />
                            <Button _hover={{ background: "lightgreen" }} color={"black"} background={"lightgreen"} display={isEditable ? "none" : "flex"} onClick={() => {
                                setIsEditable(true)
                            }}><EditIcon sx={{ mr: "10px" }} />Add Domain</Button>
                            <Button _hover={{ background: "lightgreen" }} color={"black"} background={"lightgreen"} display={!isEditable ? "none" : "flex"} onClick={() => {
                                setIsEditable(false)
                                // axios.patch(`https://shortlinkapi.onrender.com/shorten/users/${userDetails._id}`, {
                                axios.patch(`${apiLink}shorten/users/${userDetails._id}`, {
                                    domain: domain
                                })
                                setDomainValue(domain)
                            }}>Save</Button>
                        </Box>
                    </Box>
                </ChakraProvider>
                <ChakraProvider>
                    <Box minH={"50%"} w={"100%"} display={"flex"} justifyContent={"space-between"}>
                        <Filters />
                    </Box>
                </ChakraProvider>
            </Box>
            <ChakraProvider>
                <Text sx={{ ml: "20px", mb: "10px" }}>{data.length} Links out of {shortLimit}</Text>
                    <TableHeader sortAscDate={sortAscDate} sortDesDate={sortDesDate} sortAsc={sortAsc} sortDes={sortDes} />
                <Box display={"flex"} flexDir={"column"} height={"80vh"} overflow="scroll">
                    {
                        filteredData.map((i, index) => {
                            let date = new Date(i.dateCreated);
                            let str = ((date + "").split(" "))
                            let showDate = str[2] + "-" + str[1] + "-" + str[3] + ' ' + str[4]
                            return (
                                <TableRows date={showDate} toast={toast} key={index + i._id} setData={setData} userDataArr={data} data={{...i,showDate}}/>
                            )
                        })
                    }
                </Box>
            </ChakraProvider>
        </Box>
    )
}