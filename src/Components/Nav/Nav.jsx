import { Box, Button, Text } from '@chakra-ui/react'
import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { Context } from '../../context';

const NavBar = () => {
    const { isLogin, setIsLogin, setUserDetails } = useContext(Context);
    return (
        <Box w={"100%"} minH={"60px"} backgroundColor={"#AA77FF"} p={"10px 20px"} display={"flex"}>
            <Box w={"50%"} h={"100%"} display={"flex"}>
                <NavLink to={"/"} >
                    <Text color={"white"} fontSize={"35px"} fontWeight={"bold"} letterSpacing={"3px"}>CEOITBOX Link Shortner</Text>
                </NavLink>
            </Box>
            <Box w={"50%"} h={"60px"} display={"flex"} justifyContent={"flex-end"}>
                <Box height={"100%"} display={"flex"} gap={"20px"} alignItems={"center"}>
                    <NavLink to={"/login"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: isLogin ? "none" : "flex" }}>Login</NavLink>
                    <NavLink to={"/register"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: isLogin ? "none" : "flex" }}>Register</NavLink>
                    <Button display={!isLogin ? "none" : "flex"} onClick={() => {
                        setIsLogin(false)
                        setUserDetails({})
                        localStorage.setItem("linkShortnerUserData", JSON.stringify({}));
                        localStorage.setItem("linkShortnerLoginStatus", false);

                    }}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default NavBar