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

  
  export default function LoginPage() {
    const {isLogin,setIsLogin,setUserDetails,toast,setDomainValue} = useContext(Context);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    async function login(){
      let data = await axios.get("http://localhost:3001/users");
      data = data.data;
      console.log(data)
      for(let i of data){
        if(i.email===email && i.password===password){
          let userDatails = {
            email,
            _id:i._id
          }
          setDomainValue(i.domain)
          console.log(i.domain)
          setUserDetails(userDatails)
          setIsLogin(true);
          localStorage.setItem("linkShortnerUserData",JSON.stringify(userDatails));
          localStorage.setItem("linkShortnerLoginStatus",true);
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
    if(isLogin) return <Navigate to={"/"}/>
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
                <Input _focus={{border:!isValidEmail()?"2px solid red":"2px solid #e2e8f0"}} border={!isValidEmail()?"2px solid red":"2px solid #e2e8f0"} onChange={(e)=>setEmail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input _focus={{border:password.length<8?"2px solid red":"2px solid #e2e8f0"}} border={password.length<8?"2px solid red":"2px solid #e2e8f0"} onChange={(e)=>setPassword(e.target.value)} type="password" />
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