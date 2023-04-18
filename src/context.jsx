import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";
import Cookies from 'js-cookie';


export let Context = createContext();

export default function ContextProvider({ children }) {
    let user = Cookies.get('user');
    if(user) user = JSON.parse(user)
    else user = {}
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [selected, setSelected] = useState([]);
    const [userDetails, setUserDetails] = useState(user);
    let [salesPersonOptions, setSalesPersonOptions] = useState([]);
    let [courseOptions, setCourseOptions] = useState([]);
    let [customerNameOptions, setCustomerNameOptions] = useState([]);
    let [customerEmailOptions, setCustomerEmailOptions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [newDataAdded, setNewDataAdded] = useState(false);
    const [domainValue,setDomainValue] = useState("");
    const [clickDetails, setclickDetails] = useState([]);
    const [mapData,setMapData] = useState([]);
    const [shortLimit,setShortLimit] = useState(0);
    const [isAdminLogin,setisAdminLogin] = useState(false);
    const [allUsersData,setAllUsersData] = useState([])
    const [allUsersFilteredData,setAllUsersFilteredData] = useState([])
    const toast = useToast()
    return (
        <Context.Provider
            value={{
                data, setData,
                filteredData, setFilteredData,
                selected, setSelected,
                userDetails, setUserDetails,
                mapData,setMapData,
                salesPersonOptions, setSalesPersonOptions,
                courseOptions, setCourseOptions,
                customerNameOptions, setCustomerNameOptions,
                customerEmailOptions, setCustomerEmailOptions,
                editing, setEditing,
                newDataAdded, setNewDataAdded,
                toast,
                domainValue,setDomainValue,
                clickDetails, setclickDetails,
                shortLimit,setShortLimit,
                isAdminLogin,setisAdminLogin,
                allUsersData,setAllUsersData,
                allUsersFilteredData,setAllUsersFilteredData
            }}>
            {children}
        </Context.Provider>
    )
}