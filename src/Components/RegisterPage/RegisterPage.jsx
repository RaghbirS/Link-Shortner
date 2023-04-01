import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function handleSubmit(){
    let obj = {
      firstName,
      lastName,
      email,
      password,
    }
    axios.post("http://localhost:3001/users",obj);
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  }
  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input _focus={{border:firstName.length==0?"2px solid red":"2px solid #e2e8f0"}} border={firstName.length==0?"2px solid red":"2px solid #e2e8f0"} value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input _focus={{border:lastName.length==0?"2px solid red":"2px solid #e2e8f0"}} border={lastName.length==0?"2px solid red":"2px solid #e2e8f0"} value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input _focus={{border:!isValidEmail()?"2px solid red":"2px solid #e2e8f0"}} border={!isValidEmail()?"2px solid red":"2px solid #e2e8f0"} value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input _focus={{border:password.length<8?"2px solid red":"2px solid #e2e8f0"}} border={password.length<8?"2px solid red":"2px solid #e2e8f0"} value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    bg={"transparent"}
                    _hover={{bg:"transparent"}}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <NavLink to={"/login"}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                >
                Sign up
              </Button></NavLink>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <NavLink to={"/login"} color={'blue.400'}>Login</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}