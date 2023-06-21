import { Box, Button, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { Context } from "../../context";
import DateRangeSlider from "./DatePaper";

function isUnderDate(values, checkDate) {
    const startDate = new Date(values[0] * 1000);
    const endDate = new Date(values[1] * 1000);
    if (checkDate >= startDate && checkDate <= endDate) return true;
    return false
}

export default function Filters() {
    const { data, setFilteredData } = useContext(Context);
    const [searchLongURL, setSearchLongURL] = useState("")
    const [searchAlias, setSearchAlias] = useState("")
    const [searchShortURL, setsearchShortURL] = useState("")
    const [searchRemarks, setSearchRemarks] = useState("")
    const [sliderValues, setSliderValues] = useState([new Date('2022.01.01').getTime() / 1000, new Date().getTime() / 1000]);
    const { userDetails } = useContext(Context);
    useEffect(() => {
        let temp = [];
        for (let i of data) {
            isUnderDate(sliderValues, new Date(i.dateCreated))
            if (isUnderDate(sliderValues, new Date(i.dateCreated)) && i.longURL.includes(searchLongURL) && i.alias.includes(searchAlias) && i.shortURL.includes(searchShortURL) && i.remarks.includes(searchRemarks)) {
                temp.push(i)
            }
        }
        setFilteredData(temp)
    }, [searchLongURL, searchAlias, searchShortURL, searchRemarks, sliderValues, setFilteredData])
    return (
        <Box h={"100%"} w={"100%"} display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box width={"100%"} minHeight={"50%"} display={"flex"} columnGap={"5px"} flexWrap={"wrap"} alignItems={"center"}>
                <Input placeholder="Unique ID" onChange={() => { }} w={"300px"} value={userDetails._id} />
                <Input value={searchLongURL} onChange={e => setSearchLongURL(e.target.value)} w={"250"} placeholder={"Search Long URL"} />
                <Input value={searchAlias} onChange={e => setSearchAlias(e.target.value)} w={"250"} placeholder={"Search Alias"} />
                <Input value={searchShortURL} onChange={e => setsearchShortURL(e.target.value)} w={"250"} placeholder={"Search Short URL"} />
                <Input value={searchRemarks} onChange={e => setSearchRemarks(e.target.value)} w={"300"} placeholder={"Search Remarks"} />
                <DateRangeSlider sliderValues={sliderValues} setSliderValues={setSliderValues} />
                <Button onClick={() => {
                    setSearchLongURL("");
                    setSearchAlias("")
                    setsearchShortURL("")
                    setSearchRemarks("")
                    setSliderValues([new Date('2022.01.01').getTime() / 1000, new Date().getTime() / 1000])
                }}>Reset</Button>
            </Box>
        </Box>
    )
}
