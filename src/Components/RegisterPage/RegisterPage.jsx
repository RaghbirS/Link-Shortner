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
import { useContext, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, Navigate } from 'react-router-dom';

import axios from 'axios';
import { Context } from '../../context';

export default function RegisterPage() {
  const { toast, apiLink } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimeout, setOtpTimeout] = useState(0);
  const [verificationOtp, setVerificationOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [submited, setSubmited] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  function handleSubmit() {
    if((!isOtpVerified) || (!isValidEmail()) || (password.length < 8) || (!firstName || !lastName) ) {
      setShowError(true)
    }
    if (!isOtpVerified) return toast({
      title: `OTP is not verified`,
      status: "error",
      isClosable: true,
      position: "top",
    })
    if (!isValidEmail()) return toast({
      title: `Invalid Email`,
      status: "error",
      isClosable: true,
      position: "top",
    })
    if (password.length < 8) return toast({
      title: `The length of the password should be greater than 7`,
      status: "error",
      isClosable: true,
      position: "top",
    })
    if (!firstName || !lastName) return toast({
      title: `First name and Last name is required`,
      status: "error",
      isClosable: true,
      position: "top",
    })
    
    let obj = {
      firstName,
      lastName,
      email,
      password,
      domain:""
    }
    axios.post(`${apiLink}shorten/users`, obj);
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setSubmited(true);
    setTimeout(()=>setSubmited(false),1000)
  }
  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function sendText() {
    if (otpTimeout == 0 || isOtpVerified) return "Send OTP"
    else return (otpTimeout - 60) * -1
  }
  if (submited) return <Navigate to={"/client/login"} />
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
            <Box display={"flex"} gap={"20px"} alignItems={"flex-end"}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input _focus={{ border: !isValidEmail() && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={!isValidEmail() && showError ? "2px solid red" : "2px solid #e2e8f0"} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
              </FormControl>
              <Button bg={'blue.100'} disabled={!isValidEmail() || otpTimeout > 0 || isOtpVerified}
                onClick={async () => {

                  if (otpTimeout > 0 || !isValidEmail() || isOtpVerified) return toast({
                    title: `Please enter a Valid Email..`,
                    status: "warning",
                    isClosable: true,
                    position: "top",
                  })
                  let { data } = await axios.get(`${apiLink}shorten/users?email=${email}`);
                  if (data.length == 1) {
                    return toast({
                      title: `User already exist`,
                      status: "error",
                      isClosable: true,
                      position: "top",
                    })
                  }
                  setOtpTimeout(prev => prev + 1)
                  let intervalId = setInterval(() => {
                    setOtpTimeout(prev => {
                      if (prev == 60) {
                        clearInterval(intervalId);
                        return 0;
                      }
                      return prev + 1;
                    });
                  }, 1000)

              
                  axios.post(`${apiLink}shorten/sendOtp`, { email }).then(res => setVerificationOtp(res.data + ""));
                  setIsOtpSent(true)
                  toast({
                    title: `OTP sent`,
                    status: "success",
                    isClosable: true,
                    position: "top",
                  })
                }}>{sendText()}</Button>
            </Box>
            <Box display={"flex"} gap={"20px"} alignItems={"flex-end"}>
              <FormControl id="otp" isRequired>
                <FormLabel>OTP</FormLabel>
                <Input onChange={(e) => setInputOtp(e.target.value)} type="number" />
              </FormControl>
              <Button disabled={isOtpVerified} onClick={() => {
                console.log(verificationOtp, inputOtp)
                if(!isOtpSent) return toast({
                  title: `Please send the OTP first.`,
                  status: "warning",
                  isClosable: true,
                  position: "top",
                })
                if (verificationOtp == inputOtp) {
                  setIsOtpVerified(true)
                  toast({
                    title: `OTP Verified Successfully`,
                    status: "success",
                    isClosable: true,
                    position: "top",
                  })
                  return
                }
                if (verificationOtp != inputOtp) return toast({
                  title: `OTP does not match`,
                  status: "error",
                  isClosable: true,
                  position: "top",
                })
              }} bg={isOtpVerified ? "gray" : 'blue.100'}>Verify</Button>
            </Box>
            {isOtpVerified && <><HStack>
              <Box display={isOtpVerified ? "block" : "none"}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input _focus={{ border: firstName.length == 0 && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={firstName.length == 0 && showError ? "2px solid red" : "2px solid #e2e8f0"} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                </FormControl>
              </Box>
              <Box display={isOtpVerified ? "block" : "none"}>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input _focus={{ border: lastName.length == 0 && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={lastName.length == 0 && showError ? "2px solid red" : "2px solid #e2e8f0"} value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                </FormControl>
              </Box>
            </HStack>

            <FormControl display={isOtpVerified ? "block" : "none"} id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input _focus={{ border: password.length < 8 && showError ? "2px solid red" : "2px solid #e2e8f0" }} border={password.length < 8 && showError ? "2px solid red" : "2px solid #e2e8f0"} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    bg={"transparent"}
                    _hover={{ bg: "transparent" }}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl></>}
            <Stack spacing={10} pt={2}>

              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: isOtpVerified ? 'blue.500' : "gray",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <NavLink to={"/client/login"} color={'blue.400'}>Login</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}