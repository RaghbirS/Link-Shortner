import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import AddNewData from "./Components/AddNewData/AddNewData";
import LoginPage from "./Components/LoginPage/LoginPage";
import NavBar from "./Components/Nav/Nav";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import TablePage from "./Components/TablePage/TablePage";
import { Context } from "./context";
import { io } from "socket.io-client";
import Map from "./Components/TablePage/GoogleMap";
import ForgotPassword from "./Components/forgotPassword/forgotPassword";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminPage from "./Components/AdminPage/AdminTablePage";
import HomePage from "./Components/HomePage/HomePage";
function App() {
  const { data, setData, isLogin, userDetails, setFilteredData, toast, newDataAdded, filteredData,
    clickDetails, setShortLimit, setclickDetails, isAdminLogin, setisAdminLogin,
    googleSheetDeployLink, setGoogleSheetDeployLink } = useContext(Context);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!userDetails._id) return;

    (async () => {
      // let response = await axios.get("https://shortlinkapi.onrender.com/shorten/licenceCheck", {
      let response = await axios.get("http://139.59.69.60:3001/shorten/licenceCheck", {
        email: userDetails.email
      });
      response = response.data;
      setShortLimit(response.limit)
    })()
    // axios.get(`https://shortlinkapi.onrender.com/shorten/AllData?userID=${userDetails._id}`).then(res => {
    axios.get(`http://139.59.69.60:3001/shorten/AllData?userID=${userDetails._id}`).then(res => {
      let sortedTempData = res.data.sort((a, b) => Number(b.favourite) - Number(a.favourite))
      setData(sortedTempData)
      setFilteredData(sortedTempData)
    })
    // axios.get(`https://shortlinkapi.onrender.com/shorten/clicks?userID=${userDetails._id}`).then(({ data }) => {
    axios.get(`http://139.59.69.60:3001/shorten/clicks?userID=${userDetails._id}`).then(({ data }) => {
      setclickDetails(data)
    })
  }, [userDetails._id])
  useEffect(() => {
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    if (userDetails._id) {
      setTimeout(() => {
        toast({
          title: `Login Successful`,
          status: "success",
          isClosable: true,
          position: "top",
        })
      }, 200);
    }
    else {
      toast({
        title: `Logout Successful`,
        status: "success",
        isClosable: true,
        position: "top",
      })
    }
  }, [userDetails._id]);
  useEffect(() => {
    axios.get(`http://139.59.69.60:3001/shorten/users/${userDetails._id}`).then(res => {
      console.log(res.data.googleSheetDeployLink)
      setGoogleSheetDeployLink(res.data.googleSheetDeployLink || "")
    })
  }, [])

  useEffect(() => {
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    if (newDataAdded) {
      setTimeout(() => {
        toast({
          title: `New Entry Added Successful`,
          status: "success",
          isClosable: true,
          position: "top",
        })
      }, 200);
    }
  }, [newDataAdded]);

  useEffect(() => {
    if (!userDetails._id) return;
    const socket = io('http://139.59.69.60:3001/');
    // const socket = io('https://shortlinkapi.onrender.com');
    console.log("render")
    socket.on("newClick", res => {
      let tempData = [...data];
      let tempFilteredData = [...filteredData];
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].shortURL == res.result.shortURL) {
          tempData[i].clicks = res.obj.clicks;
          setData(tempData);
          break
        }
      }
      for (let i = 0; i < tempFilteredData.length; i++) {
        if (tempFilteredData[i].shortURL == res.result.shortURL) {
          tempFilteredData[i].clicks = res.obj.clicks;
          setFilteredData(tempData);
          break
        }
      }
      setclickDetails(prev => [...prev, res.result])
    })
    return () => socket.disconnect()
  }, [userDetails._id])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client/links" element={<TablePage />} />
        <Route path="/client/map" element={<Map />} />
        <Route path="/client/addNewData" element={<AddNewData />} />
        <Route path="/client/login" element={<LoginPage />} />
        <Route path="/client/adminLogin" element={<AdminLogin />} />
        <Route path="/client/adminPage" element={<AdminPage />} />
        <Route path="/client/forgotPassword" element={<ForgotPassword />} />
        <Route path="/client/register" element={<RegisterPage />} />

      </Routes>
    </div>
  );
}

export default App;
