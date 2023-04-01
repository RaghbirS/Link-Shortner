import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";


export let Context = createContext();

export default function ContextProvider({ children }) {
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [selected, setSelected] = useState([]);
    let [isLogin, setIsLogin] = useState(localStorage.getItem("linkShortnerLoginStatus") || false);
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("linkShortnerUserData")) || {});
    let [salesPersonOptions, setSalesPersonOptions] = useState([]);
    let [courseOptions, setCourseOptions] = useState([]);
    let [customerNameOptions, setCustomerNameOptions] = useState([]);
    let [customerEmailOptions, setCustomerEmailOptions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newDataAdded, setNewDataAdded] = useState(false);
    const [domainValue,setDomainValue] = useState("");
    const toast = useToast()
    return (
        <Context.Provider
            value={{
                data, setData,
                filteredData, setFilteredData,
                selected, setSelected,
                userDetails, setUserDetails,
                isLogin, setIsLogin,
                salesPersonOptions, setSalesPersonOptions,
                courseOptions, setCourseOptions,
                customerNameOptions, setCustomerNameOptions,
                customerEmailOptions, setCustomerEmailOptions,
                editing, setEditing,
                newDataAdded, setNewDataAdded,
                toast,
                domainValue,setDomainValue
            }}>
            {children}
        </Context.Provider>
    )
}