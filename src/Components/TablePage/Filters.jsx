import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import RangeSlider from "./Range";
import MultipleSelectCheckmarks from "./DropDown";
import { Context } from "../../context";


export default function Filters() {
    const { salesPersonOptions,
        courseOptions,
        customerNameOptions,
        customerEmailOptions, data, setFilteredData } = useContext(Context);
    const [salesPersonFilterValue, setSalesPersonFilterValue] = useState([])
    const [courseFilterValue, setCourseFilterValue] = useState([])
    const [customerNameFilterValue, setCustomerNameFilterValue] = useState([])
    const [customerEmailFilterRangeValue, setCustomerEmailFilterRangeValue] = useState([])
    const [coursePriceFilterRangeValue, setCoursePriceFilterRangeValue] = useState([0, 100000]);
    const [PIDateFilterRangeValue, setPIDateFilterRangeValue] = useState([0, 1000]);
    function has(arr, str) {
        if (arr.length === 0) return true;
        return arr.includes(str)
    }
    function underRange(arr, val) {
        if (val > arr[0] && val < arr[1]) {
            return true
        }
        else {
            return false
        }
    }
    useEffect(() => {
        if (salesPersonFilterValue.length === 0 && courseFilterValue.length === 0 && customerNameFilterValue.length === 0 && customerEmailFilterRangeValue.length === 0 && coursePriceFilterRangeValue[0]==0 && coursePriceFilterRangeValue[0]==100000) return setFilteredData(data)
        let temp = [];
        for (let i of data) {
            if (has(salesPersonFilterValue, i.salesPerson) && has(courseFilterValue, i.course) && has(customerNameFilterValue, i.customerName) && has(customerEmailFilterRangeValue, i.customerEmail) && underRange(coursePriceFilterRangeValue, i.coursePrice)
            ) {
                temp.push(i)
            }
        }
        setFilteredData(temp)
    }, [salesPersonFilterValue, courseFilterValue, customerNameFilterValue, customerEmailFilterRangeValue,coursePriceFilterRangeValue, PIDateFilterRangeValue])
    return (
        <Box h={"100%"} w={"100%"} display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box width={"100%"} height={"50%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
                <MultipleSelectCheckmarks w={"250"} tag={"Sales Person"} state={[salesPersonFilterValue, setSalesPersonFilterValue]} options={salesPersonOptions} />
                <MultipleSelectCheckmarks w={"250"} tag={"Course"} state={[courseFilterValue, setCourseFilterValue]} options={courseOptions} />
                <MultipleSelectCheckmarks w={"250"} tag={"Customer Name"} state={[customerNameFilterValue, setCustomerNameFilterValue]} options={customerNameOptions} />
                <MultipleSelectCheckmarks w={"300"} tag={"Customer Email"} state={[customerEmailFilterRangeValue, setCustomerEmailFilterRangeValue]} options={customerEmailOptions} />
            </Box>
            <Box width={"100%"} height={"50%"} display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}>
                <RangeSlider tag={"Course Price"} val={coursePriceFilterRangeValue} func={setCoursePriceFilterRangeValue} />
            </Box>
        </Box>
    )
}
