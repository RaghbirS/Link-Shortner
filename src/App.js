// import axios from "./HTTP";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
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
import { Button, ChakraProvider, Progress } from "@chakra-ui/react";
import Reports from "./Components/Reports/Reports";
function App() {
  const { isAdminLogin, setisAdminLogin, token, axios, loading, adminUserDetails, setPaginativeData, setLoading, socket, data, setData, userDetails, setFilteredData, toast, newDataAdded, filteredData, setShortLimit, setclickDetails, setGoogleSheetDeployLink, apiLink } = useContext(Context);
  const [count, setCount] = useState(1);
  const navigate = useNavigate()
  useEffect(() => {
    if (!userDetails._id) return;
    if (!token) return;
    try {
      (async () => {
        let { data: res } = await axios.get(apiLink + "shorten/users/" + userDetails._id);
        setisAdminLogin(res.isAdmin)
        if (res.createLimit != undefined) {
          let prevCreateLimitDate = new Date(res.createLimitDate);
          prevCreateLimitDate.setDate(prevCreateLimitDate.getDate() + 1);

          const today = new Date();
          if (today > prevCreateLimitDate) {
            let response = await axios.post(apiLink + "shorten/licenceCheck", {
              email: userDetails.email
            });
            response = response.data;
            setShortLimit(response.limit)
            let temp = await axios.patch(apiLink + "shorten/users/" + userDetails._id, {
              createLimit: response.limit,
              createLimitDate: new Date()
            })
          }
          else setShortLimit(res.createLimit)
        }
        else {
          let response = await axios.post(apiLink + "shorten/licenceCheck", {
            email: userDetails.email
          });
          response = response.data;
          setShortLimit(response.limit)
          let temp = await axios.patch(apiLink + "shorten/users/" + userDetails._id, {
            createLimit: response.limit,
            createLimitDate: new Date()
          })
          console.log(temp)
        }

      })()

      axios.get(`${apiLink}shorten/AllData?userID=${userDetails._id}`).then(res => {

        let sortedTempData = res.data.reverse().sort((a, b) => Number(b.favourite) - Number(a.favourite))
        setData(sortedTempData)
        setPaginativeData(sortedTempData)
        setLoading(false)
      })
      // axios.get(`${apiLink}shorten/clicks?userID=${userDetails._id}`).then(({ data }) => {

      //   setclickDetails(data)
      // })
      axios.get(`${apiLink}shorten/clicksWithCount?userID=${userDetails._id}`).then(({ data }) => {
        setclickDetails(data)
      })
    } catch (error) {
      console.log(error)
    }

  }, [userDetails._id, token])
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
    if (!userDetails._id) return;
    if (!token) return;
    axios.get(`${apiLink}shorten/users/${userDetails._id}`).then(res => {
      setGoogleSheetDeployLink(res.data.googleSheetDeployLink || "")
    })
  }, [token])

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
      {loading && <Progress zIndex={9999} colorScheme={"orange"} height='5px' isIndeterminate />}
      <ChakraProvider>
        <NavBar />
      </ChakraProvider>
      <Routes>

        <Route path="/" element={<ChakraProvider><HomePage /></ChakraProvider>} />
        <Route path="/client/links" element={<ChakraProvider><TablePage /></ChakraProvider>} />
        <Route path="/client/map" element={<ChakraProvider>
          <div style={{ height: '50px', width: '100%', padding: "5px 20px", }}>
            <Button  onClick={()=>navigate("/client/links")} ><svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></Button>
          </div>
          <Map />
        </ChakraProvider>} />
        <Route path="/client/addNewData" element={<ChakraProvider><AddNewData /></ChakraProvider>} />
        <Route path="/client/login" element={<ChakraProvider><LoginPage /></ChakraProvider>} />
        {/* <Route path="/client/adminLogin" element={<AdminLogin />} /> */}
        {isAdminLogin && <Route path="/client/adminPage" element={<ChakraProvider><AdminTablePage /></ChakraProvider>} />}
        <Route path="/client/forgotPassword" element={<ChakraProvider><ForgotPassword /></ChakraProvider>} />
        <Route path="/client/register" element={<ChakraProvider><RegisterPage /></ChakraProvider>} />
        <Route path="/client/reports" element={<Reports />} />

      </Routes>
    </div>
  );
}

export default App;
