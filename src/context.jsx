import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { io } from "socket.io-client";
import { uid } from "uid";
import HTTP from "./HTTP";
export let Context = createContext();
let apiLink = "https://cbxit.in/";
if (document.location.href.includes("localhost")) {
  apiLink = "http://localhost:3001/";
} else {
  apiLink = "https://cbxit.in/";
}

const socket = io(apiLink);
export default function ContextProvider({ children }) {
  
  let user = Cookies.get('user');
  if (user) user = JSON.parse(user)
  else user = {}
  let [data, setData] = useState([]);
  let toke = Cookies.get('token')
  if (toke) toke = JSON.parse(toke)
  else toke = ""
  let [token, setToken] = useState(toke);
  let [filteredData, setFilteredData] = useState([]);
  let [selected, setSelected] = useState([]);
  const [userDetails, setUserDetails] = useState(user);
  let [salesPersonOptions, setSalesPersonOptions] = useState([]);
  let [courseOptions, setCourseOptions] = useState([]);
  let [customerNameOptions, setCustomerNameOptions] = useState([]);
  let [customerEmailOptions, setCustomerEmailOptions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newDataAdded, setNewDataAdded] = useState(false);
  const [domainValue, setDomainValue] = useState("");
  const [clickDetails, setclickDetails] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [shortLimit, setShortLimit] = useState(0);
  const [isAdminLogin, setisAdminLogin] = useState(false);
  const [allUsersData, setAllUsersData] = useState([])
  const [allUsersFilteredData, setAllUsersFilteredData] = useState([])
  const [googleSheetDeployLink, setGoogleSheetDeployLink] = useState("")
  const toast = useToast()
  const [dataLimit, setDataLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paginativeData, setPaginativeData] = useState([])
  const [unselect, setUnselect] = useState([]);

  const [allLinkRows, setAllLinkRows] = useState([])

  let admin = Cookies.get('admin');
  if (admin) admin = JSON.parse(admin)
  else admin = {}
  const [adminUserDetails, setAdminUserDetails] = useState(admin);
  const [rangeSliderReset, setRangeSliderReset] = useState(uid());
  let axios = HTTP(token) 
  return (
    <Context.Provider
      value={{
        data, setData,
        filteredData, setFilteredData,
        selected, setSelected,
        userDetails, setUserDetails,
        mapData, setMapData,
        salesPersonOptions, setSalesPersonOptions,
        courseOptions, setCourseOptions,
        customerNameOptions, setCustomerNameOptions,
        customerEmailOptions, setCustomerEmailOptions,
        editing, setEditing,
        newDataAdded, setNewDataAdded,
        toast,
        domainValue, setDomainValue,
        clickDetails, setclickDetails,
        shortLimit, setShortLimit,
        isAdminLogin, setisAdminLogin,
        allUsersData, setAllUsersData,
        allUsersFilteredData, setAllUsersFilteredData,
        googleSheetDeployLink, setGoogleSheetDeployLink,
        apiLink, socket,
        dataLimit, setDataLimit,
        page, setPage,
        loading, setLoading,
        paginativeData, setPaginativeData,
        unselect, setUnselect,
        adminUserDetails, setAdminUserDetails,
        rangeSliderReset, setRangeSliderReset,
        token, setToken,
        axios,
        allLinkRows, setAllLinkRows
      }}>
      {children}
    </Context.Provider>
  )
}