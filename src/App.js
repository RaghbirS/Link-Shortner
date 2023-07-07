import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import AddNewData from "./Components/AddNewData/AddNewData";
import LoginPage from "./Components/LoginPage/LoginPage";
import NavBar from "./Components/Nav/Nav";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import TablePage from "./Components/TablePage/TablePage";
import { Context } from "./context";

import Map from "./Components/TablePage/GoogleMap";
import ForgotPassword from "./Components/forgotPassword/forgotPassword";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import HomePage from "./Components/HomePage/HomePage";
import AdminTablePage from "./Components/AdminPage/TablePage";
function App() {
  const {adminUserDetails, setPaginativeData,setLoading ,socket, data, setData, userDetails, setFilteredData, toast, newDataAdded, filteredData, setShortLimit, setclickDetails, setGoogleSheetDeployLink, apiLink } = useContext(Context);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!userDetails._id) return;

    (async () => {
      let response = await axios.get(apiLink+"shorten/licenceCheck", {
        email: userDetails.email
      });
      response = response.data;
      setShortLimit(response.limit)
    })()

    axios.get(`${apiLink}shorten/AllData?userID=${userDetails._id}`).then(res => {
      let sortedTempData = res.data.reverse().sort((a, b) => Number(b.favourite) - Number(a.favourite))
      setData(sortedTempData)
      setPaginativeData(sortedTempData)
      setLoading(false)
    })
    axios.get(`${apiLink}shorten/clicks?userID=${userDetails._id}`).then(({ data }) => {
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
    if (count == 1) {
      return setCount(prev => prev + 1)
    }
    if (adminUserDetails._id) {
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
  }, [adminUserDetails._id]);
  useEffect(() => {
    axios.get(`${apiLink}shorten/users/${userDetails._id}`).then(res => {
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
        <Route path="/client/adminPage" element={<AdminTablePage />} />
        <Route path="/client/forgotPassword" element={<ForgotPassword />} />
        <Route path="/client/register" element={<RegisterPage />} />

      </Routes>
    </div>
  );
}

export default App;
