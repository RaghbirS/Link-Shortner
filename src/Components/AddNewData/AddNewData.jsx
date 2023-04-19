import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { uid } from 'uid';
import { Context } from '../../context';

export default function AddNewData() {
  const [longURL, setLongURL] = useState("")
  const [alias, setAlias] = useState("")
  const [remarks, setRemarks] = useState("")
  const [shortLink, setShortLink] = useState("")
  const { data, setData, newDataAdded, userDetails, setNewDataAdded, filteredData, setFilteredData, domainValue, toast,
    shortLimit,setShortLimit } = useContext(Context);

  async function handleSubmit() {
    if(data.length>shortLimit){
      return toast({
        title: `Free Limit reached !`,
        status: "error",
        isClosable: true,
        position: "top"
      })
    }
    if (longURL.length === 0) {
      return toast({
        title: `Long URL and Alias is required`,
        status: "error",
        isClosable: true,
        position: "top"
      })
    }
    let obj = {
      _id:uid(24),
      longURL: longURL,
      alias: alias,
      shortURL: shortLink,
      remarks: remarks,
      clicks: 0,
      domain: domainValue || "ceoitbox",
      userID: userDetails._id,
      favourite:false,
      dateCreated:new Date()
    }
    if (alias.length === 0) {
      let temp = uid().slice(0,5);
      obj.alias = temp;
      obj.shortURL = obj.shortURL + temp;
    }
    let tempAllData = await axios.get(`https://shortlinkapi.onrender.com/shorten/AllData`);
    // let tempAllData = await axios.get(`http://localhost:3001/shorten/AllData`);
    tempAllData = tempAllData.data;
    for (let i of tempAllData) {
      if (i.shortURL == shortLink) {
        return toast({
          title: `The alias is already being used on the same domain`,
          status: "error",
          isClosable: true,
          position: "top"
        })
      }
    }

    axios.post(`https://shortlinkapi.onrender.com/shorten/AllData`, obj)
    // axios.post(`http://localhost:3001/shorten/AllData`, obj)
    let tempData = [...data, obj].sort((a,b)=>Number(b.favourite)-Number(a.favourite))
    setData(tempData)
    setFilteredData(tempData)
    console.log(tempData)
    setNewDataAdded(prev => !prev);
    setTimeout(() => {
      setNewDataAdded(prev => !prev);
    }, 200);
  }
  useEffect(() => {
    if (!domainValue) {
      // setShortLink(`https://shortlinkapi.onrender.com/${alias}`)
      setShortLink(`http://localhost:3001/${alias}`)
    }
    else {
      setShortLink(`http://${domainValue}.in/${alias}`)
    }
    if (longURL == "" || longURL == "http:/" || longURL == "http:" ||
      longURL == "http" || longURL == "htt" || longURL == "ht" || longURL == "h" || longURL == "h") setLongURL("http://")
  })
  if (newDataAdded) return <Navigate to={"/links"} />
  console.log()
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>New Link</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Long URL</FormLabel>
              <Input value={longURL} onChange={(e) => setLongURL(e.target.value)} type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Alias</FormLabel>
              <Input value={alias} onChange={(e) => setAlias(e.target.value)} type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Short Link</FormLabel>
              <Input readOnly={true} value={shortLink} onChange={(e) => console.log()} type="text" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
