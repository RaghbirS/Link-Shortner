import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { CopyIcon } from "@chakra-ui/icons";


export default function TableRows({ data, userDataArr, setData, toast
}) {
    const { selected, setSelected, editing, domainValue, userDetails } = useContext(Context);
    const [check, setCheck] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const {clicks, longURL, alias, remarks, shortURL, _id } = data;
    const [longURLValue, setLongURLValue] = useState(longURL)
    const [aliasValue, setAliasValue] = useState(alias)
    const [remarksValue, setRemarksValue] = useState(remarks)
    const [shortLinkValue, setShortLinkValue] = useState(shortURL)

    useEffect(() => {
        let editedObject = {
            longURL: longURLValue,
            alias: aliasValue,
            shortURL: shortLinkValue,
            remarks: remarksValue,
            clicks: 0,
            domain: domainValue || "ceoitbox",
            userID: userDetails._id
            , _id: _id
        }
        let temp = [...userDataArr];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]._id === _id) {
                temp[i] = editedObject;
                break
            }
        }
        setData(temp)
    }, [longURLValue, aliasValue, remarksValue, shortLinkValue])

    return (
        <Box display={"flex"} minW={"100%"} background={check ? "lightgreen" : "none"}>
            <Box flexShrink={0} overflow={"hidden"} borderRadius={"none"} h={"40px"} type={"checkbox"} w={"6%"} border={"1px solid #dee2e6"} textAlign={"center"} >
                <Button display={"flex"} justifyContent={"center"} className="select" h={"40px"} w={"100%"} onClick={e => {
                    if (editing) {
                        return toast({
                            title: `Cannot Select or Unselect while Editing`,
                            status: "error",
                            isClosable: true,
                            position: "top"
                        })
                    }
                    let value = !check;
                    if (value) {
                        setSelected(prev => [...prev, { _id, isReadOnly, setIsReadOnly, check, setCheck }])
                    }
                    else {
                        setSelected(selected.filter((i) => i._id !== _id))
                    }
                    setCheck(value)
                }
                }>
                    <input onChange={(e) => console.log()} type={"checkbox"} checked={check} />

                </Button>
            </Box>
            <Input flexShrink={0} w={"23%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setLongURLValue(e.target.value)} borderRadius={"none"} h={"40px"} value={longURLValue} border={"2px solid #dee2e6"}></Input>
            <Input flexShrink={0} w={"10%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => {
                setAliasValue(e.target.value)
                if (!domainValue) {
                    setShortLinkValue(`http://localhost:3001/${e.target.value}`)
                }
                else {
                    setShortLinkValue(`http://${domainValue}.in/${e.target.value}`)
                }
            }} borderRadius={"none"} h={"40px"} value={aliasValue} border={"2px solid #dee2e6"}></Input>
            <Box w={"18%"} position={"relative"}>
                <Input position={"absolute"} flexShrink={0} w={"100%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={true} onChange={(e) => (e.target.value)} borderRadius={"none"} h={"40px"} value={shortLinkValue} border={"2px solid #dee2e6"}>{ }</Input>
                <Box position={"absolute"} w={"100%"} h={"100%"}>
                    <CopyIcon onClick={async () => {
                        await navigator.clipboard.writeText(shortLinkValue);
                        toast({
                            title: `Copied to Clipboard`,
                            status: "success",
                            isClosable: true,
                            position: "top"
                        })
                    }} position={"absolute"} right={"10px"} top={"12px"} cursor={"pointer"} />
                </Box>
            </Box>
            <Input flexShrink={0} w={"15%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={isReadOnly} onChange={(e) => setRemarksValue(e.target.value)} borderRadius={"none"} h={"40px"} value={remarksValue} border={"2px solid #dee2e6"}></Input>
            <Input flexShrink={0} w={"5%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={true} onChange={(e) => (Number(e.target.value))} type={"number"} borderRadius={"none"} h={"40px"} value={clicks} border={"2px solid #dee2e6"}>{ }</Input>
            <Input flexShrink={0} w={"23%"} _focus={{ border: "2px solid black" }} cursor={"default"} readOnly={true} onChange={(e) => (e.target.value)} borderRadius={"none"} h={"40px"} border={"2px solid #dee2e6"}>{ }</Input>
        </Box>
    )
}

