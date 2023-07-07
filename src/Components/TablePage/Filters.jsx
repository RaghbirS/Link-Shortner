import { Box, Button, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { Context } from "../../context";
import DateRangeSlider from "./DatePaper";
import { CopyIcon } from "@chakra-ui/icons";

function isUnderDate(values, checkDate) {
    const startDate = new Date(values[0] * 1000);
    const endDate = new Date(values[1] * 1001);
    if (checkDate >= startDate && checkDate <= endDate) return true;
    return false
}

export default function Filters() {
    const { adminUserDetails, data, setFilteredData, dataLimit, shortLimit,
        page, setPage } = useContext(Context);
    const [searchLongURL, setSearchLongURL] = useState("")
    const [searchAlias, setSearchAlias] = useState("")
    const [searchShortURL, setsearchShortURL] = useState("")
    const [searchRemarks, setSearchRemarks] = useState("")
    const [sliderValues, setSliderValues] = useState([new Date('2022.01.01').getTime() / 1000, new Date().getTime() / 1000]);
    const { userDetails, paginativeData, setPaginativeData,toast } = useContext(Context);
    useEffect(() => {
        if(adminUserDetails._id) return;
        let temp = [];
        for (let i of paginativeData) {
            if (isUnderDate(sliderValues, new Date(i.dateCreated)) && i.longURL.includes(searchLongURL) && i.alias.includes(searchAlias) && i.shortURL.includes(searchShortURL) && i.remarks.includes(searchRemarks)) {
                temp.push(i)
            }
        }
        let paginatedData = [];
        for (let i = page * dataLimit - dataLimit; i <= page * dataLimit - 1; i++) {
            if (!temp[i]) break;
            paginatedData.push(temp[i])
        }
        setFilteredData(paginatedData)
    }, [searchLongURL, searchAlias, searchShortURL, searchRemarks, sliderValues, page, dataLimit, paginativeData])
    return (
        <Box h={"100%"} w={"100%"} display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box width={"100%"} minHeight={"50%"} display={"flex"} columnGap={"5px"} flexWrap={"wrap"} alignItems={"center"}>


                <Box w={"300px"} position={"relative"}>
                    <Input style={{color:"black",fontWeight:"900"}} disabled defaultValue={userDetails._id} readOnly={true} />
                    <Box position={"absolute"} w={"fit-content"} h={"100%"} top={"0"} right={0}>
                        <CopyIcon onClick={async () => {
                            await navigator.clipboard.writeText(userDetails._id);
                            toast({
                                title: `Copied to Clipboard`,
                                status: "success",
                                isClosable: true,
                                position: "top"
                            })
                        }} position={"absolute"} right={"10px"} top={"12px"} cursor={"pointer"} />
                    </Box>
                </Box>

                <Input style={{color:"black",fontWeight:"900"}} disabled={true} w={"200px"} value={`${data.length} Links out of ${shortLimit}`} onChange={() => { }} readOnly={true} />
                <Button sx={{ margin: "0 20px" }} onClick={() => {
                    setSearchLongURL("");
                    setSearchAlias("")
                    setsearchShortURL("")
                    setSearchRemarks("")
                    setSliderValues([new Date('2022.01.01').getTime() / 1000, new Date().getTime() / 1000])
                }}>Reset</Button>
                <Input value={searchLongURL} onChange={e => {
                    setPage(1)
                    setSearchLongURL(e.target.value)
                }} w={"250"} placeholder={"Search Long URL"} />
                <Input value={searchAlias} onChange={e => {
                    setPage(1)
                    setSearchAlias(e.target.value)
                }} w={"250"} placeholder={"Search Alias"} />
                <Input value={searchShortURL} onChange={e => {
                    setPage(1)
                    setsearchShortURL(e.target.value)
                }} w={"250"} placeholder={"Search Short URL"} />
                <Input value={searchRemarks} onChange={e => {
                    setPage(1)
                    setSearchRemarks(e.target.value)
                }} w={"300"} placeholder={"Search Remarks"} />
                <DateRangeSlider sliderValues={sliderValues} setSliderValues={setSliderValues} />
            </Box>
        </Box>
    )
}
