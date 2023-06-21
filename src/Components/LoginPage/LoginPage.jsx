import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Context } from '../../context';
import Cookies from 'js-cookie';


export default function LoginPage() {
  const { userDetails, setUserDetails, toast, setDomainValue, apiLink } = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)
  async function login() {
    setShowError(true)
    let data = await axios.get(`${apiLink}shorten/users`);
    data = data.data;
    for (let i of data) {
      if (i.email === email) {
        if (i.password != password) return toast({
          title: `Incorrect Password`,
          status: "error",
          isClosable: true,
          position: "top",
        })
        let userDatails = {
          email,
          _id: i._id
        }
        setDomainValue(i.domain)
        setUserDetails(userDatails)
        Cookies.set('user', JSON.stringify(userDatails));
        return
      }
    }
    toast({
      title: `User does not exist`,
      status: "error",
      isClosable: true,
      position: "top",
    })
  }
  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  if (userDetails._id) return <Navigate to={"/client/links"} />
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Login to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel >Email address</FormLabel>
              <Input _focus={{ border: !isValidEmail() && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={!isValidEmail() && showError ? "2px solid red" : "2px solid #e2e8f0"} onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input _focus={{ border: password.length < 8 && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={password.length < 8 && showError ? "2px solid red" : "2px solid #e2e8f0"} onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <NavLink style={{ textDecoration: "underline" }} to={"/client/forgotPassword"}>Forgot Password</NavLink>
                <NavLink style={{ textDecoration: "underline" }} to={"/client/adminLogin"}>Admin Login</NavLink>
              </Stack>
              <Button
                onClick={login}
                bg={'#bad900'}
                color={'black'}
                _hover={{
                  bg: '#bad900',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}