import { Box, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { Context } from "../../context";
// import DateRangeSlider from "./DatePaper";

function isUnderDate(values, checkDate) {
    const startDate = new Date(values[0] * 1000);
    const endDate = new Date(values[1] * 1000);
    if (checkDate >= startDate && checkDate <= endDate) return true;
    return false
}

export default function Filters() {
    const { allUsersData,
        setAllUsersFilteredData } = useContext(Context);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [domain, setDomain] = useState("")
    
    
    
    
    useEffect(() => {
        let temp = [];
        for (let i of allUsersData) {
            if (i.firstName.includes(firstName) && i.lastName.includes(lastName) && i.email.includes(email) && i.domain.includes(domain)) {
                temp.push(i)
            }
        }
        setAllUsersFilteredData(temp)
    }, [firstName, lastName, email, domain])
    return (
        <Box h={"100%"} w={"100%"} display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box width={"100%"} height={"50%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
                {/* <DateRangeSlider sliderValues={sliderValues} setSliderValues={setSliderValues} /> */}
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} w={"250"} placeholder={"First Name"} />
                <Input value={lastName} onChange={e => setLastName(e.target.value)} w={"250"} placeholder={"Last Name"} />
                <Input value={email} onChange={e => setEmail(e.target.value)} w={"250"} placeholder={"Email"} />
                <Input value={domain} onChange={e => setDomain(e.target.value)} w={"300"} placeholder={"Domain"} />
            </Box>
        </Box>
    )
}
