
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react"
import axios from "axios"
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { Context } from "../../context"


export default function ForgotPassword() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [OTP, setOTP] = useState("")
    const [verificationOtp, setVerificationOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const [otpTimeout, setOtpTimeout] = useState(0);
    const [userData, setUserData] = useState({});
    const [submitted,setSubmitted] = useState(false)
    const {toast, apiLink} = useContext(Context)
    const isValidEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userName);
    };
    async function handleSubmit() {
        if (!password) return alert("Invalid Password")
        await axios.patch(`${apiLink}shorten/users/${userData._id}`,{
            password
        })
        setSubmitted(true);
        setInterval(()=>{setSubmitted(false)},300)
        toast({
            title: `Password Changed`,
            status: "success",
            isClosable: true,
            position: "top",
          })
    }
    if(submitted) return <Navigate to={"/client/login"}/>
    return (
        <Box minHeight={"80vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flexDirection={"column"} gap={"30px"} p={"30px"} width={["90%", "80%", "60%", "30%"]} minHeight={"100px"} boxShadow={"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}>
            <Text textAlign={"center"} fontSize={"30px"}>Forgot Password</Text>
                <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"10px"}>
                    <FormControl id="email" sx={{ width: "75%" }}>
                        <Input
                            placeholder="Email"
                            sx={{ padding: "0 15px" }}
                            autoFocus
                            onChange={(e) => setUserName(e.target.value)}
                            type="email"
                        />
                    </FormControl>
                    <Button disabled={Boolean(otpTimeout) || isOtpVerified} sx={{ height: "40px", width: "30%" }} onClick={async () => {
                            if (!isValidEmail()) return toast({
                                title: `Invalid Email`,
                                status: "error",
                                isClosable: true,
                                position: "top",
                              });
                            if(isOtpVerified) return;
                            let user = await axios.get(`${apiLink}shorten/users?email=${userName}`);
                            user = user.data[0];
                            if (!user) return toast({
                                title: `User does not exist`,
                                status: "error",
                                isClosable: true,
                                position: "top",
                              })
                            setUserData(user)
                            setOtpTimeout(prev => prev + 1)
                            let intervalId = setInterval(() => {
                                setOtpTimeout(prev => {
                                    if (prev === 60) {
                                        clearInterval(intervalId);
                                        return 0;
                                    }
                                    return prev + 1;
                                });
                            }, 1000)
                            axios.post(`${apiLink}shorten/sendOtp`, { email: userName }).then(res => setVerificationOtp(res.data + ""));

                        }}>{otpTimeout || "Send OTP"}</Button>
                </Box>
                <Box display={"flex"} gap={"5px"}>
                    <FormControl id="Password" sx={{ width: "75%" }}>
                        <Input
                            placeholder="OTP"
                            sx={{ padding: "0 15px" }}
                            autoFocus
                            
                            onChange={(e) => setOTP(e.target.value)}
                            type="text"
                        />
                    </FormControl>
                    <Button disabled={isOtpVerified} sx={{ height: "40px", width: "20%" }}
                         onClick={() => {
                            if(isOtpVerified) return;
                            if (verificationOtp !== OTP || OTP === "") alert("OTP does not match.");
                            else {
                                toast({
                                    title: `OTP Verified`,
                                    status: "success",
                                    isClosable: true,
                                    position: "top",
                                  })
                                setIsOtpVerified(true);
                            }
                        }}>Verify</Button>
                </Box>

                <FormControl sx={{ display: isOtpVerified ? "flex" : "none" }} id="Password" >
                    <Input
                        sx={{ padding: "0 15px" }}
                        autoFocus
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                    />
                </FormControl>
                <Button onClick={handleSubmit} sx={{ display: isOtpVerified ? "flex" : "none", bgcolor: "lightgreen", color: "black", "&:hover": { bgcolor: "lightgreen" } }}>Submit</Button>
            </Box>
        </Box >
    )
}