import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { io } from "socket.io-client";
export let Context = createContext();
let apiLink = "http://localhost:3001/";
if (document.location.href.includes("localhost")) {
  apiLink = "http://localhost:3001/";
} else {
  apiLink = "http://139.59.69.60:3001/";
}

const socket = io(apiLink);
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
    const [googleSheetDeployLink,setGoogleSheetDeployLink] = useState("")
    const toast = useToast()
    const [dataLimit, setDataLimit] = useState(10);
    const [page, setPage] = useState(1);
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
                allUsersFilteredData,setAllUsersFilteredData,
                googleSheetDeployLink,setGoogleSheetDeployLink,
                apiLink,socket,
                dataLimit, setDataLimit,
                page, setPage
            }}>
            {children}
        </Context.Provider>
    )
}