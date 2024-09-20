
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import { Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { Context } from '../../context';
const columns = [
    { field: 'shortURL', headerName: 'Short URL', flex: 1, headerClassName: "muiGridHeader" },
    { field: 'email', headerName: 'Email', flex: 1, headerClassName: "muiGridHeader" },
    { field: 'clicks', headerName: 'Clicks', flex: 1, headerClassName: "muiGridHeader" },
    { field: 'dateCreated', headerName: 'Date Created', flex: 1, headerClassName: "muiGridHeader" },
    { field: 'lastUsed', headerName: 'Last Used', flex: 1, headerClassName: "muiGridHeader" },
];

const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ bgcolor: "rgb(0, 100, 0)" }}>
            <GridToolbarDensitySelector sx={{ bgcolor: "white", color: "green", "&:hover": { bgcolor: "white", color: "green" } }} />
            <GridToolbarColumnsButton sx={{ bgcolor: "white", color: "green", "&:hover": { bgcolor: "white", color: "green" } }} />
            <GridToolbarFilterButton sx={{ bgcolor: "white", color: "green", "&:hover": { bgcolor: "white", color: "green" } }} />
        </GridToolbarContainer>
    );
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: "20px",
    p: 4,
};

function Reports() {
    const [selectionModel, setSelectionModel] = useState([]);
    const [sort, setSort] = useState("DES-CLICKS");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [filterDate, setfilterDate] = useState(0);
    const [search, setSearch] = useState("");
    const { allLinkRows, setAllLinkRows, axios, apiLink, toast } = useContext(Context)
    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const handleSelectionModelChange = (newSelectionModel) => {
        console.log(newSelectionModel)
        setSelectionModel(newSelectionModel);
    };

    const handlePageChange = (params) => {
        setCurrentPage(params.page + 1); // Adjust for 0-indexed pages
        setPageSize(params.pageSize);
    };

    const dataRows = useMemo(() => {
        return rows.map(item => {
            return {
                _id: item._id,
                shortURL: item.shortURL,
                email: item.email,
                dateCreated: new Date(item.dateCreated).toDateString(),
                clicks: item.clicks,
                lastUsed: item.lastUsed ? new Date(item.lastUsed).toDateString() : "Not Found",

            }
        })
    }, [rows])


    useEffect(() => {
        const offset = (currentPage - 1) * pageSize;
        axios.get(`${apiLink}shorten/AllData/pagination?offset=${offset}&limit=${pageSize}&filter=${filterDate}&sort=${sort}&search=${search}`).then(res => {
            console.log(res)
            setRows(res.data.data);
            setAllLinkRows(res.data.data);
            setTotalRows(res.data.totalRows);
        });
    }, [currentPage, pageSize, filterDate, sort, search]);


    const handleDelete = () => {
        let tempSelected = [...selectionModel]
        let temp = rows.filter(item => tempSelected.includes(item._id)).map(item => ({ _id: item._id, userID: item.userID, shortURL: item.shortURL }));


        axios.post(`${apiLink}shorten/AllData/bulkDelete`, {
            ids: temp
        })

        setDeleteModalOpen(false)
        setRows(rows.filter(item => !selectionModel.includes(item._id)));
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} p={"20px"}>
            <Typography fontWeight={"700"} fontSize={"25px"}>Short URL Usage Report</Typography>
            <Box display={"flex"} alignItems={"center"} width={"100%"} gap={"10px"}>
                <FormControl size="small" sx={{ minWidth: "90px", bgcolor: "white", color: "green", "&:hover": { bgcolor: "white", color: "green" } }}>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Age"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value={"DES-CLICKS"}>Clicks (Descending)</MenuItem>
                        <MenuItem value={"ASC-CLICKS"}>Clicks (Ascending)</MenuItem>
                        <MenuItem value={"DES-LAST"}>Last Used (Newer)</MenuItem>
                        <MenuItem value={"ASC-LAST"}>Last Used (Older)</MenuItem>
                        <MenuItem value={"DES-CREATED"}>Created (Newer)</MenuItem>
                        <MenuItem value={"ASC-CREATED"}>Created (Older)</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: "150px", bgcolor: "white", color: "green", "&:hover": { bgcolor: "white", color: "green" } }}>
                    <InputLabel id="demo-simple-select-label">Last Used Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterDate}
                        label="Last Used Filter"
                        onChange={(e) => setfilterDate(e.target.value)}
                    >
                        <MenuItem value={0}>Today</MenuItem>
                        <MenuItem value={1}>Before 1 Day</MenuItem>
                        <MenuItem value={7}>Before 1 Week</MenuItem>
                        <MenuItem value={14}>Before 2 Weeks</MenuItem>
                        <MenuItem value={30}>Before 1 Month</MenuItem>
                        <MenuItem value={90}>Before 3 Months</MenuItem>
                        <MenuItem value={30 * 4}>Before 4 Months</MenuItem>
                        <MenuItem value={30 * 6}>Before 6 Months</MenuItem>
                        <MenuItem value={"NOT"}>Not Used</MenuItem>
                    </Select>
                </FormControl>
                <TextField value={search} onChange={(e) => setSearch(e.target.value)} size={"small"} label="Search" />
                <Button variant='contained' sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }} onClick={() => {
                    console.log(selectionModel)
                    if (selectionModel.length == 0) return toast({
                        title: `Please Select Data to Delete !`,
                        status: "error",
                        isClosable: true,
                        position: "top"
                    })
                    setDeleteModalOpen(true)
                }}>Delete</Button>
            </Box>
            <Modal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                closeAfterTransition
            >
                <Box sx={style}>
                    <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
                        <div>
                            <Typography fontSize={"20px"}>Confirm Deletion</Typography>
                            <p style={{ color: "gray", fontSize: "13px" }}>
                                Are you sure you want to delete these links? Users who created the links will be notified by email.
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button variant='contained' onClick={() => setDeleteModalOpen(false)} color="primary">
                                Cancel
                            </Button>
                            <Button sx={{ bgcolor: "red", "&:hover": { bgcolor: "red" } }} variant='contained' onClick={handleDelete} color="primary" autoFocus>
                                Delete
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
            <DataGrid
                sx={{ width: "100%", maxHeight: "100vh" }}
                rows={dataRows}
                columns={columns}
                paginationMode="server"
                rowsPerPageOptions={[10, 25, 50, 100]}
                checkboxSelection
                getRowId={(row) => row._id}
                disableSelectionOnClick
                rowCount={totalRows}
                page={currentPage - 1}
                onPaginationModelChange={handlePageChange}
                selectionModel={selectionModel}
                onRowSelectionModelChange={handleSelectionModelChange}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </Box>
    )
}

export default Reports;
