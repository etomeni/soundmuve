import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface _Props {
    headerTitle: any[],
    tBodyContent: any[],
    darkTheme: boolean,
    displayDownloadReport?: boolean,
}

const SalesReportStoresAnalyticsTableComponent: React.FC<_Props> = ({
    headerTitle, tBodyContent, darkTheme, displayDownloadReport = false
}) => {

    return (
        <Box>
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
                                borderBottom: "none",
                            }
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                {headerTitle.map((title, index) => (
                                    <TableCell
                                        key={index}
                                        align={"center"} 
                                        // style={{ top: 57, minWidth: column.minWidth }}
                                        sx={{ bgcolor: darkTheme ? "#000" : "#fff" }}
                                    >
                                        <Box 
                                            sx={{
                                                p: "10px",
                                                borderRadius: "8px",
                                                border: darkTheme ? "1px solid #797979" : "1px solid #202020",
                                                color: darkTheme ? "#666666" : "#202020",
                                                // cursor: "pointer",
                                                display: "inline-block"
                                            }}
                                        >
                                            <Typography 
                                                noWrap
                                                sx={{
                                                    fontWeight: '400',
                                                    fontSize: {xs: "9.07px", md: "18px"},
                                                    lineHeight: {xs: "12.1px", md: "24px"},
                                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                    textAlign: 'center',
                                                }}
                                            > { title } </Typography>
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tBodyContent
                            .map((row, index) => {
                                return (
                                    <TableRow 
                                        key={index}
                                        // hover 
                                        // role="checkbox" 
                                        tabIndex={-1} 
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: "#664a874d",
                                            },
                                        }}
                                    >
                                        {Object.entries(row).map(([_key, value]: any, indez) => {
                                            return (
                                                <TableCell 
                                                    key={indez} 
                                                    align={"center"} 
                                                    // align={indez == 0 ? "left" : indez == Object.entries(row).length - 1 ? "right" : 'center' }
                                                    sx={{ 
                                                        color: darkTheme ? indez == Object.entries(row).length - 1 ? "#C8F452" : "#fff" : "#000",
                                                        fontWeight: "400",
                                                        fontSize: {xs: "9.07px", md: "18px"},
                                                        lineHeight: {xs: "12.1px", md: "24px"},
                                                    }}
                                                >
                                                    {
                                                        indez == 0 ? <Box sx={{ 
                                                            maxWidth: {xs: "30px", md: "45px"}, 
                                                            mx: "auto",
                                                            bgcolor: darkTheme ? "initial" : "#000",
                                                            p: 0.3
                                                        }}>
                                                            <img
                                                                src={value} alt='dsp logo'
                                                                style={{
                                                                    width: "100%",
                                                                    maxHeight: "25px",
                                                                    objectFit: "contain"
                                                                }}
                                                            />
                                                        </Box>
                                                        :
                                                        value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>


                {
                    displayDownloadReport && 
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
                        >
                            <Typography 
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "10.18px", md: "15px"},
                                    lineHeight: {xs: "8.82px", md: "13px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            > Download Report </Typography>
                        </Box>
                    </Stack>
                }

            </Paper>

        </Box>
    )
}

export default SalesReportStoresAnalyticsTableComponent;