import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// import PaymentComponent from '@/components/account/PaymentComponent';
import LoadingComponent from '@/components/Loading';
import EmptyListComponent from '@/components/EmptyList';
import PaymentzComponent from '@/components/account/payments/PaymentzComponent';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

import { useUserStore } from '@/state/userStore';
import { balTransactionsInterface } from '@/constants/typesInterface';
import { apiEndpoint, formatedNumber } from '@/util/resources';
import { formatTransactionDate, getDateRange, getFormattedDateRange } from '@/util/dateTime';

  
const headerTitle = [
    "Date", "Description", "Debit", "Credit", "Balance", "Currency", "Status"
]

// const tBodyContent = [
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
//     {
//         Date: "21/5/2024",
//         Description: "sales",
//         Debit: "",
//         Credit: "$14.13",
//         Balance: "$6,228.76",
//         Currency: "USD"
//     },
// ]


function BalanceHistory() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);

    const [balTransactions, setBalTransactions] = useState<balTransactionsInterface[]>();
    const [sortByDays, setSortByDays] = useState('All');

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);

    useEffect(() => {
        getAllBalanceHistory();
    }, []);
    
    const getAllBalanceHistory = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/wallet/get-transactionby-email/${ userData.email }`, {
            // const response = (await axios.get(`${apiEndpoint}/wallet/get-transactionby-email/latham01@yopmail.com`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setBalTransactions(response.transactions);

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setBalTransactions([]);


            // setReleases([]);

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }
    
    const getBalanceBetweenDates = async (startDate: string, endDate: string) => {
        try {
            // https://soundmuve-backend-zrap.onrender.com/api/wallet/check-transactions?startDate=2024-06-01&endDate=2024-12-31&email=latham01@yopmail.com
            const response = (await axios.get(`${apiEndpoint}/wallet/check-transactions?startDate=${startDate}&endDate=${endDate}&email=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setBalTransactions(response);

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setBalTransactions([]);


            // setReleases([]);

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        // console.log(value);

        if (value != "All") {
            const dateRange = getDateRange(Number(value));
            setSortByDays(dateRange);
            const betweenDates = getFormattedDateRange(Number(value));
            getBalanceBetweenDates(betweenDates.startDate, betweenDates.endDate);
        } else {
            setSortByDays(value);
            getAllBalanceHistory();
        }
    };
    

    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{ color: darkTheme ? "#fff" : "#000", mb: 2 }}
                    >
                        <ChevronLeftIcon sx={{ display: {xs: "none", md: "block"} }} />
                    </IconButton>

                    <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='balance-history' accountType='artist' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>
                    <Paper 
                        sx={{ 
                            width: '100%',
                            border: "1px solid #D9D9D9",
                            borderRadius: "13px",
                            overflow: "hidden",
                            bgcolor: darkTheme ? "#000" : "#fff",
                            color: darkTheme ? "#fff" : "#000"
                        }}
                    >
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table" 
                                sx={{
                                    [`& .${tableCellClasses.root}`]: {
                                        borderBottom: "none"
                                    }
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={3} sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}>
                                            <FormControl fullWidth sx={{ width: "fit-content" }}>
                                                <Select
                                                    labelId="sortByDays"
                                                    id="sortByDays-select"
                                                    label=""
                                                    defaultValue="All"
                                                    onChange={handleChange}

                                                    sx={{
                                                        color: "#fff",
                                                        borderRadius: "8px",
                                                        bgcolor: "#272727",
                                                        // textAlign: "center",
                                                        border: "none",
                                                        fontWeight: "900",
                                                        fontSize: {xs: "10px", md: "20px"},
                                                        lineHeight: {xs: "12px", md: "24px"},
                                                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                                        '& .MuiSelect-select': {
                                                            p: "5px 14px"
                                                        },

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            border: "none",
                                                            // borderColor: '#fff',
                                                            p: 0
                                                        },
                                                        // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: '#fff',
                                                        // },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: '#fff',
                                                        // },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="All">
                                                        All
                                                    </MenuItem>
                                                    <MenuItem value="7">
                                                        Last 7 Days
                                                    </MenuItem>
                                                    <MenuItem value="14">
                                                        Last 14 Days
                                                    </MenuItem>
                                                    <MenuItem value="30">
                                                        Last 30 Days
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell align="right" colSpan={3} sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "10px", md: "18px"},
                                                    lineHeight: {xs: "12px", md: "24px"},
                                                    letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                                                    color: darkTheme ? "#fff" : "#000"
                                                }}
                                            >{ sortByDays == "All" ? '' : sortByDays  }</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        {headerTitle.map((title, index) => (
                                            <TableCell
                                                key={index}
                                                align={index == 0 ? "left" : index == headerTitle.length - 1 ? "right" : 'center' }
                                                // style={{ top: 57, minWidth: column.minWidth }}
                                                sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},
                                                        background: darkTheme ? "#fff" : "#272727",
                                                        color: darkTheme ? "#000" : "#fff",
                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "10.18px", md: "15px"},
                                                            lineHeight: {xs: "8.82px", md: "13px"},
                                                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                            textAlign: 'center',
                                                        }}
                                                    > { title } </Typography>
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                { 
                                    balTransactions && balTransactions.length ?
                                    <TableBody>
                                        {balTransactions
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell 
                                                        align='left'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { formatTransactionDate(row.created_at) }
                                                    </TableCell>

                                                    <TableCell 
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { row.narration }
                                                    </TableCell>

                                                    <TableCell 
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { formatedNumber(row.debit) }
                                                    </TableCell>

                                                    <TableCell 
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { formatedNumber(row.credit) }
                                                    </TableCell>

                                                    <TableCell 
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { formatedNumber(row.balance) }
                                                    </TableCell>

                                                    <TableCell 
                                                        // align='right'
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { row.currency }
                                                    </TableCell>

                                                    <TableCell 
                                                        // align='right'
                                                        align='center'
                                                        sx={{ 
                                                            color: darkTheme ? "#fff" : "#000",
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { row.status || "Pending" }
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    : <></>
                                }

                            </Table>
                        </TableContainer>
                        
                        {
                            balTransactions ? (
                                balTransactions.length ?
                                    <Stack direction={'row'} justifyContent={"right"} sx={{p: 2 }}>
                                        <Box 
                                            sx={{
                                                p: {xs: "10.18px 19.68px", md: "10px 29px"},
                                                borderRadius: {xs: "8.14px", md: "5px"},
                                                background: darkTheme ? "#fff" : "#272727",
                                                color: darkTheme ? "#000" : "#fff",
                                                cursor: "pointer",
                                                display: "inline-block",
                                                // m: 2,
                                                width: "fit-content"
                                            }}
                                            onClick={() => setWithdrawlModal(true)}
                                        >
                                            <Typography 
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: {xs: "10.18px", md: "15px"},
                                                    lineHeight: {xs: "8.82px", md: "13px"},
                                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                    textAlign: 'center',
                                                }}
                                            > Withdraw </Typography>
                                        </Box>
                                    </Stack>
                                    :
                                    <Box py={5}>
                                        <EmptyListComponent notFoundText='No transaction has been carried out yet.' />
                                    </Box>
                            ):
                            <LoadingComponent />
                        }

                    </Paper>
                </Box>
            </Box>

            {/* <PaymentComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            /> */}

            <PaymentzComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            />
            
        </AccountWrapper>
    )
}

export default BalanceHistory;