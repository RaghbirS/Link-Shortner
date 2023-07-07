import { Box, Button, Modal, ModalContent, ModalOverlay, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../context";
import AdminTableHeader from "./TableHeader";
import TableRows from "./TableRows";
import { ChakraProvider } from "@chakra-ui/react";
import BasicUsage from "./Modal";
import { Input } from "@chakra-ui/react";
import Filters from "./Filters";
import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import SkeletonLoading from "./SkeletonLoading";
import AddNewData from "../AddNewData/AddNewData";

export default function AdminTablePage() {
    const { loading, data, setData, userDetails, selected, setSelected, filteredData, setFilteredData, editing, setEditing, toast
        , domainValue, setDomainValue, clickDetails,
        shortLimit, apiLink, dataLimit, setDataLimit,
        page, setPage, adminUserDetails, setPaginativeData, setLoading
    } = useContext(Context);
    const [isEditable, setIsEditable] = useState(false);
    const [domain, setDomain] = useState(domainValue);

    function sortAsc(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if ((a[param]|| "") > (b[param] || "")) {
                return -1;
            }
            if ((a[param] || "") < (b[param] || "")) {
                return 1;
            }
            return 0;
        });

        setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
    }
    function sortDes(param) {
        const temp = [...data]
        const sortedData = [...temp].sort((a, b) => {
            if ((a[param] || "") > (b[param] || "")) {
                return 1;
            }
            if ((a[param] || "") < (b[param] || "")) {
                return -1;
            }
            return 0;
        });
        setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
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

        setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
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

        setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        axios.get(`${apiLink}shorten/users`).then(res => {
            console.log(res.data)
            setData(res.data)
            setPaginativeData(res.data)
            setLoading(false)
        })
    }, [apiLink, setDomainValue, adminUserDetails._id])
    if (!adminUserDetails._id) return <Navigate to={"/client/adminLogin"} />
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Box w={"100%"} minH={"150px"} display={"flex"} flexDir={"column"} p={"0 30px"}>
                <ChakraProvider>

                    <Box display={"flex"} alignItems={"center"} h={"50%"} p={"30px 0"} width={"100%"} justifyContent={"space-between"}>
                        <Box display={"flex"} gap={"20px"}>
                            {/* <B to={"/client/addNewData"}> */}
                            {/* <Button onClick={() => setIsModalOpen(true)} _hover={{ background: "#6262ff" }} color={"white"} background={"#7f7fff"} cursor={"pointer"} display={"flex"} gap={"10px"} alignItems="center" fontWeight={"500"}>
                                <svg style={{ width: "15px", fill: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                                <Text>Add New URL</Text>
                            </Button> */}
                            {/* </B> */}
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
                                        if (j._id == i._id) {
                                            temp = j;
                                            break
                                        }
                                    }

                                    axios.patch(`${apiLink}shorten/users/${i._id}`, temp)
                                    i.setCheck(false)
                                    i.setIsReadOnly(true)
                                }
                                setPaginativeData(structuredClone(data))
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
                                    let filterData = [...data]
                                    for (let i of selected) {
                                        filterData = filterData.filter(element => element._id != i._id)
                                        axios.delete(`${apiLink}shorten/users/${i._id}`);
                                        axios.get(`${apiLink}shorten/AllData?userID=${i._id}`).then(({ data: userLinks }) => {
                                            for (let links of userLinks) {
                                                axios.get(`${apiLink}shorten/clicks?userID=${i._id}`).then(({ data: clicksTempData }) => {
                                                    for (let clicksData of clicksTempData) {
                                                        axios.delete(`${apiLink}shorten/clicks/${clicksData._id}`)
                                                    }
                                                    axios.delete(`${apiLink}shorten/AllData/${links._id}`);
                                                })
                                            }
                                        })

                                    }
                                    setData(filterData)
                                    setPaginativeData(filterData)
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
                {/* <Text sx={{ ml: "20px", mb: "10px", textAlign: "center", fontWeight: "bold" }}></Text> */}
                <ChakraProvider>
                    <Box minH={"50%"} w={"100%"} display={"flex"} justifyContent={"space-between"}>
                        <Filters />
                    </Box>
                </ChakraProvider>
            </Box>
            <ChakraProvider>
                <Box display={"flex"} justifyContent={"space-between"} gap={"20px"} p={"10px 20px"}>
                    <Box>
                        {`${(page * dataLimit) - dataLimit + 1} - ${(page * dataLimit) - dataLimit + filteredData.length}`}                        of
                        {" " + data.length}
                    </Box>
                    <Box display={"flex"} gap={"15px"}>
                        <Select placeholder='Select Limit' value={dataLimit} onChange={({ target }) => {
                            setDataLimit(+target.value)
                        }}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                        </Select>
                        <Button onClick={() => {
                            if (page > 1) {
                                setPage(page => page - 1)
                            }
                        }}><ChevronLeftIcon /></Button>
                        <Button disabled={true} onClick={() => {
                            if (page < (data.length / dataLimit)) {
                                setPage(page => page + 1)
                            }
                        }}><ChevronRightIcon /></Button>
                    </Box>
                </Box>
                <AdminTableHeader sortAsc={sortAsc} sortDes={sortDes} />
                {loading &&
                    <Box display={"flex"} flexDir={"column"} gap={"1px"}>

                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                    </Box>
                }
                <Box display={"flex"} flexDir={"column"}>
                    {
                        filteredData.map((i, index) => {
                            let date = new Date(i.dateCreated);
                            let str = ((date + "").split(" "))
                            let showDate = str[2] + "-" + str[1] + "-" + str[3] + ' ' + str[4]
                            return (
                                <TableRows date={showDate} toast={toast} key={index + i._id} setData={setData} userDataArr={data} data={{ ...i, showDate }} />
                            )
                        })
                    }
                </Box>
            </ChakraProvider>
        </Box>
    )
}