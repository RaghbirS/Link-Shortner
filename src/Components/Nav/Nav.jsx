import { Box, Button, Input, Text, useDisclosure } from '@chakra-ui/react'
import { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import { Context } from '../../context';
import Cookies from 'js-cookie';
import s from "./nav.module.css"
import { useLocation } from 'react-router-dom'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';

const NavBar = () => {
    let validPaths = ["/"]
    const location = useLocation();
    console.log();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { isLogin, setIsLogin, setUserDetails, userDetails, isAdminLogin, setisAdminLogin } = useContext(Context);
    let contact;
    useEffect(()=>{
        contact = document.getElementById("contact");
    })
    return (
        <Box w={"100%"} minH={"100px"} backgroundColor={"rgba(22,34,57,0.95)"} p={"0 30px"} display={"flex"} alignItems={"center"}>
            <Box w={"50%"} h={"100%"} display={"flex"}>
                <NavLink to={"/"} style={{ display: "flex" }}>
                    <Text color={"#bad900"} fontSize={"50px"} fontWeight={"bold"} letterSpacing={"3px"}>CBX</Text>
                    <Text color={"white"} fontSize={"50px"} fontWeight={"bold"} letterSpacing={"3px"}>IT</Text>
                </NavLink>
            </Box>
            <Button pos={"absolute"} right={"20px"} display={["flex", "flex", "flex", "none"]} ref={btnRef} bg={"transparent"} onClick={onOpen}>
                <HamburgerIcon color={"white"} w={"30px"} h={"30px"}/>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody bg={"rgba(22,34,57,0.95)"} p={"20px"}>
                        <NavLink onClick={() => onClose()} className={s.navHoverStyle} to={"/"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>HOME</NavLink>
                        <NavLink onClick={() => onClose()} className={s.navHoverStyle} to={"//www.tnsit.in/"} target='_blank' style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>DOMAIN</NavLink>
                        <NavLink onClick={() => onClose()} className={s.navHoverStyle} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: !(validPaths.includes(location.pathname)) ? "none" : userDetails._id || isAdminLogin ? "none" : "flex" }}>CONTACT</NavLink>
                        <NavLink onClick={() => onClose()} className={s.navHoverStyle} to={"/login"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>LOGIN</NavLink>
                        <NavLink onClick={() => onClose()} className={s.navHoverStyle} to={"/register"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>REGISTER</NavLink>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box w={"50%"} h={"60px"} display={["none", "none", "none", "flex"]} justifyContent={"flex-end"}>
                <Box height={"100%"} display={"flex"} gap={"20px"} alignItems={"center"} >
                    <NavLink className={s.navHoverStyle} to={"/"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>HOME</NavLink>
                    <NavLink className={s.navHoverStyle} to={"//www.tnsit.in/"} target='_blank' style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>DOMAIN</NavLink>
                    <NavLink className={s.navHoverStyle} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: !(validPaths.includes(location.pathname)) ? "none" : userDetails._id || isAdminLogin ? "none" : "flex" }} onClick={()=>{
                        contact.scrollIntoView({
                            behavior: "smooth"
                        })
                    }}>CONTACT</NavLink>
                    <NavLink className={s.navHoverStyle} to={"/login"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>LOGIN</NavLink>
                    <NavLink className={s.navHoverStyle} to={"/register"} style={{ color: "white", fontWeight: "bold", fontSize: "20px", display: userDetails._id || isAdminLogin ? "none" : "flex" }}>REGISTER</NavLink>
                    <Button display={!userDetails._id ? "none" : "flex"} onClick={() => {
                        setUserDetails({})
                        Cookies.set('user', JSON.stringify({}));
                    }}>
                        Logout
                    </Button>
                    <Button display={!isAdminLogin ? "none" : "flex"} onClick={() => {
                        setisAdminLogin(false)
                    }}>
                        Logout
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export default NavBar