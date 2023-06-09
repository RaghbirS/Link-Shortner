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
import { Navigate } from 'react-router-dom';
import { uid } from 'uid';
import { Context } from '../../context';

export default function AddNewData({ onSub }) {
  const [longURL, setLongURL] = useState("")
  const [alias, setAlias] = useState("")
  const [remarks, setRemarks] = useState("")
  const { data, setData, newDataAdded, userDetails, setNewDataAdded, setFilteredData, domainValue, toast,
    shortLimit, apiLink } = useContext(Context);
    const [shortLink, setShortLink] = useState(apiLink)

  async function handleSubmit() {

    let obj = {
      _id: uid(24),
      longURL: longURL,
      alias: alias,
      shortURL: shortLink,
      remarks: remarks,
      clicks: 0,
      domain: domainValue || "",
      userID: userDetails._id,
      favourite: false,
      dateCreated: new Date()
    }
    if (alias.length === 0) {
      let temp = uid().slice(0, 5);
      obj.alias = temp;
      obj.shortURL = obj.shortURL + temp;
    }
    onSub(obj)
  }
  useEffect(()=>{
    setShortLink(`${("https://"+domainValue+"/") || apiLink}${alias}`)
  },[alias])
  if (newDataAdded) return <Navigate to={"/client/links"} />
  return (
    <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>New URL</Heading>
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
              <Input value={alias} onChange={(e) => {
                setAlias(e.target.value)
              }} type="text" />
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
