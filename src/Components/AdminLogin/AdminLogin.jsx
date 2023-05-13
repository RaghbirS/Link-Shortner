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
import { Navigate } from 'react-router-dom';
import { Context } from '../../context';
export default function AdminLogin() {
  const { userDetails, setUserDetails, toast, setDomainValue, shortLimit, setShortLimit, isAdminLogin, setisAdminLogin } = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function login() {
    // let { data } = await axios.get("https://shortlinkapi.onrender.com/shorten/users")
    let { data } = await axios.get("http://139.59.69.60:3001/shorten/users")
    for (let i of data) {
      if (i.email === email && i.password === password) {
        if (i.isAdmin) {
          setisAdminLogin(true)
          return
        }
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
  if (userDetails._id) return <Navigate to={"/"} />
  if (isAdminLogin) return <Navigate to={"/client/adminPage"} />

  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Admin Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel >Email address</FormLabel>
              <Input border={"2px solid #e2e8f0"} onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input border={"2px solid #e2e8f0"} onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
                onClick={login}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
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