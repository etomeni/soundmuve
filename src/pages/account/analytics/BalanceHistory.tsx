import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


import AccountWrapper from '@/components/AccountWrapper';
// import { useSettingStore } from '@/state/settingStore';
// import PaymentComponent from '@/components/account/PaymentComponent';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import PaymentzComponent from '@/components/account/payments/PaymentzComponent';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

import { currencyDisplay, } from '@/util/resources';
import { formatTransactionDate, getDateRangeBydays } from '@/util/dateTime';
import colors from '@/constants/colors';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
import DateRangeBasicMenu from '@/components/DateRange';
import { useAnalyticsHook } from '@/hooks/analytics/useAnalyticsHook';
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { transactionInterface } from '@/typeInterfaces/transaction.interface';
import { useUserStore } from '@/state/userStore';

  
const headerTitle = [
    "Date", "Transaction Type", "Description", "Amount", "Currency", "Status"
]


function BalanceHistory() {
    const navigate = useNavigate();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData); 
    // const accessToken = useUserStore((state) => state.accessToken);

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);

    const [dateRange, setDateRange] = useState(getDateRangeBydays(30));

    const {
        // apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        // totalPages,
        
        // isSubmitting,

        transactions,
        getTransactionHistory,
        handleStatusDisplay,
    } = useAnalyticsHook();

    useEffect(() => {
        // console.log(dateRange);
        getTransactionHistory(currentPageNo, limitNo, dateRange.startDate, dateRange.endDate );
    }, [dateRange]);

    const handleAmountDisplay = (transactions: transactionInterface) => {
        if (transactions.transactionType == "Withdrawal") {
            return (
                <Typography variant='subtitle2'
                    sx={{
                        color: "red",
                        // color: colors.dark,
                        fontWeight: "400",
                        fontSize: {xs: "9.07px", md: "18px"},
                        lineHeight: {xs: "12.1px", md: "24px"},
                    }}
                > - {currencyDisplay(Number(transactions.amount))}</Typography>
            )
        } else if (transactions.transactionType == "Credit") {
            return (
                <Typography variant='subtitle2'
                    sx={{
                        color: "green",
                        // color: colors.dark,
                        fontWeight: "400",
                        fontSize: {xs: "9.07px", md: "18px"},
                        lineHeight: {xs: "12.1px", md: "24px"},
                    }}
                > + {currencyDisplay(Number(transactions.amount))}</Typography>
            )
        } else if (transactions.transactionType == "Debit") {
            return (
                <Typography variant='subtitle2'
                    sx={{
                        color: "red",
                        // color: colors.dark,
                        fontWeight: "400",
                        fontSize: {xs: "9.07px", md: "18px"},
                        lineHeight: {xs: "12.1px", md: "24px"},
                    }}
                > - {currencyDisplay(Number(transactions.amount))}</Typography>
            )
            
        } else {
            return (
                <Typography variant='subtitle2'
                    sx={{
                        color: colors.dark,
                        fontWeight: "400",
                        fontSize: {xs: "9.07px", md: "18px"},
                        lineHeight: {xs: "12.1px", md: "24px"},
                    }}
                >{currencyDisplay(Number(transactions.amount))}</Typography>
            )
        }

        // return currencyDisplay(Number(transactions.amount));
    }




    return (
        <AccountWrapper>
            <Box>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{ color: colors.primary, mb: 2 }}
                    >
                        <ChevronLeftIcon sx={{ display: {xs: "none", md: "block"} }} />
                    </IconButton>

                    <ArtistAnalyticsNavComponent currentPage='balance-history' accountType='artist' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>
                    <Paper 
                        sx={{ 
                            width: '100%',
                            border: `1px solid ${colors.dark}`,
                            borderRadius: "13px",
                            overflow: "hidden",
                            bgcolor: colors.secondary,
                            color: colors.dark
                        }}
                    >
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" 
                                sx={{
                                    [`& .${tableCellClasses.root}`]: {
                                        borderBottom: "none"
                                    }
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" colSpan={3} sx={{ bgcolor: colors.secondary }}>
                                            <DateRangeBasicMenu
                                                dateRangeValue={dateRange}
                                                setDateRangeValue={(value) => setDateRange(value)}
                                            />
                                        </TableCell>

                                        <TableCell align="right" colSpan={3} sx={{ bgcolor: colors.secondary }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "10px", md: "18px"},
                                                    lineHeight: {xs: "12px", md: "24px"},
                                                    letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                                                    color: colors.dark
                                                }}
                                            >
                                                <Typography variant='subtitle1' component="span"
                                                    sx={{ 
                                                        color: colors.tertiary,
                                                        fontWeight: "400",
                                                        fontSize: "14px"
                                                    }}
                                                >Available Bal. </Typography>

                                                <Typography variant='subtitle1' component="span"
                                                    sx={{ color: 'green', fontWeight: "900" }}
                                                >{ currencyDisplay(Number(userData.balance)) }</Typography>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow
                                        sx={{ 
                                            [`& .${tableCellClasses.root}`]: {
                                                borderBottom: `1px solid ${colors.dark}`,
                                            }
                                        }}
                                    >
                                        {headerTitle.map((title, index) => (
                                            <TableCell
                                                key={index}
                                                align={index == 0 ? "left" : index == headerTitle.length - 1 ? "right" : 'center' }
                                                // style={{ top: 57, minWidth: column.minWidth }}
                                                sx={{ bgcolor: colors.secondary }}
                                            >
                                                <Box 
                                                    sx={{
                                                        p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                        borderRadius: {xs: "8.14px", md: "12px"},
                                                        background: colors.milk,
                                                        color: colors.dark,
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
                                    transactions && transactions.length ?
                                    <TableBody>
                                        {transactions
                                        .map((row, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell 
                                                        align='left'
                                                        sx={{ 
                                                            color: colors.dark,
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { formatTransactionDate(row.createdAt) }
                                                    </TableCell>

                                                    <TableCell align='center'
                                                        sx={{ 
                                                            color: colors.dark,
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { row.transactionType }
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                        <Typography
                                                            sx={{ 
                                                                color: colors.dark,
                                                                fontWeight: "400",
                                                                fontSize: {xs: "9.07px", md: "18px"},
                                                                // lineHeight: {xs: "12.1px", md: "24px"},
                                                                ...numberOfLinesTypographyStyle(2)
                                                            }}
                                                        >{ row.description }</Typography>
                                                    </TableCell>


                                                    <TableCell align='center'>
                                                        { handleAmountDisplay(row) }
                                                    </TableCell>

                                                    <TableCell align='center'
                                                        sx={{ 
                                                            color: colors.dark,
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        { row.withdrawal?.currency || "USD" }
                                                    </TableCell>

                                                    <TableCell 
                                                        // align='right'
                                                        align='center'
                                                        sx={{ 
                                                            color: colors.dark,
                                                            fontWeight: "400",
                                                            fontSize: {xs: "9.07px", md: "18px"},
                                                            lineHeight: {xs: "12.1px", md: "24px"},
                                                        }}
                                                    >
                                                        {/* { row.status } */}

                                                        <Chip label={row.status} size='small'
                                                            sx={{
                                                                // color: 'white', 
                                                                bgcolor: handleStatusDisplay(row.status).bgcolor,
                                                             
                                                                '& .MuiChip-label': {
                                                                    color: handleStatusDisplay(row.status).color,
                                                                    fontSize: "14px",
                                                                },
                                                             
                                                                '& .MuiChip-icon': {
                                                                    color: handleStatusDisplay(row.status).color,
                                                                    // fontSize: 30
                                                                },
                                                            }}
                                                        />

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
                            transactions && transactions.length ?
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                    component="div"
                                    count={totalRecords} // totalRecords
                                    rowsPerPage={limitNo}
                                    page={currentPageNo -1}
                                    onPageChange={(_e, page)=> {
                                        // console.log(page);
                                        const newPage = page + 1;
                                        getTransactionHistory(newPage, limitNo, dateRange.startDate, dateRange.endDate);
                                    }}
                                    onRowsPerPageChange={(e) => {
                                        const value = e.target.value;
                                        // console.log(value);
                
                                        setLimitNo(Number(value));
                                        getTransactionHistory(1, limitNo, dateRange.startDate, dateRange.endDate);
                                    }}
                                />
                            : <></>
                        }
                        
                        {
                            transactions ? (
                                transactions.length ?
                                    <Stack direction={'row'} justifyContent={"right"} sx={{p: 2 }}>
                                        <Box 
                                            sx={{
                                                p: {xs: "10.18px 19.68px", md: "10px 29px"},
                                                borderRadius: {xs: "8.14px", md: "5px"},
                                                background: colors.milk,
                                                color: colors.dark,
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
                            <LoadingDataComponent />
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