import { Box } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context';
const SortIcon = () => {
    return <svg style={{ height: "50%", position: "absolute", right: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" /></svg>
}
const TableHeader = ({ sortAsc, sortDes, sortAscDate, sortDesDate }) => {
    const { selected, setSelected, data, setData, unselect, setPaginativeData } = useContext(Context);
    var arr;
    let [selectAll, setSelectAll] = useState(false)

    let [sortLongURL, setSortLongURL] = useState(false)
    let [sortDate, setSortDate] = useState(false)
    let [sortAlias, setSortAlias] = useState(false)
    let [sortShortURL, setSortShortURL] = useState(false)
    let [sortRemarks, setSortRemarks] = useState(false)
    let [sortClicks, setSortClicks] = useState(false)
    useEffect(() => {
        arr = document.querySelectorAll(".select");
    })
    return (
        <Box display={"flex"} minW={"100%"} position={"relative"}>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} w={"6%"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !selectAll;
                if (selected.length==0) {
                    for (let i of arr) {
                        i.click()
                    }
                }
                else {
                    for (let i of unselect) {
                        i.setCheck(false)
                        i.setIsReadOnly(true)
                    }
                    setSelected([])
                }
                setSelectAll(value)
            }}>Checkbox</Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"13%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortDate;
                if (value) {
                    sortAscDate("dateCreated")
                }
                else sortDesDate("dateCreated");
                setSortDate(value)
            }}>Date Created
                <SortIcon />
            </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"18%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortLongURL;
                if (value) {
                    sortAsc("longURL")
                }
                else sortDes("longURL");
                setSortLongURL(value)
            }}>Long URL
                <SortIcon />
            </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"10%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortAlias;
                if (value) {
                    sortAsc("alias")
                }
                else sortDes("alias");
                setSortAlias(value)
            }}>Alias
                <SortIcon />    </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"20%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortShortURL;
                if (value) {
                    sortAsc("shortURL")
                }
                else sortDes("shortURL");
                setSortShortURL(value)
            }}>Short URL<SortIcon />    </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"10%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortRemarks;
                if (value) {
                    sortAsc("remarks")
                }
                else sortDes("remarks");
                setSortRemarks(value)
            }}>Remarks<SortIcon />    </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"8%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} onClick={() => {
                let value = !sortClicks;
                if (value) {
                    const temp = [...data]
                    const sortedData = [...temp].sort((a, b) => {
                        return a.clicks - b.clicks;
                    });
                    setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
                }
                else {
                    const temp = [...data]
                    const sortedData = [...temp].sort((a, b) => {
                        return b.clicks - a.clicks;
                    });
                    setPaginativeData(sortedData.sort((a, b) => Number(b.favourite) - Number(a.favourite)))
                }
                setSortClicks(value)
            }}>Clicks<SortIcon />    </Box>
            <Box position={"relative"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexShrink={0} w={"15%"} cursor={"pointer"} borderRadius={"none"} bg={"#edf2fa"} h={"40px"} border={"1px solid #dee2e6"} fontSize={"12px"} fontWeight={"900"} >Other Options</Box>
        </Box>
    )
}

export default TableHeader