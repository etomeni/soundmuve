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
import colors from '@/constants/colors';

interface _Props {
    // headerTitle: any[],
    tBodyContent: any[],
    // darkTheme?: boolean,
    displayDownloadReport?: boolean,
    currentTab: "Album" | "Singles" | "Location" | "Months"
}


let headerTitle: string[] = [];

const SalesReportAnalyticsTableComponent: React.FC<_Props> = ({
    tBodyContent, currentTab, displayDownloadReport = false
}) => {


    if (currentTab == "Album") {
        headerTitle = [ "Album name", "Album sold", "Streams", "Total" ];
    } else if (currentTab == "Singles") {
        headerTitle = [ "Title", "Songs sold", "Streams", "Total" ];
    } else if (currentTab == "Location") {
        headerTitle = [ "Location", "Album Sold", "Songs sold", "Streams", "Total" ];
    }else if (currentTab == "Months") {
        headerTitle = [ "Sales Period", "Album sold", "Songs sold", "Streams", "Total" ];
    } else {
        headerTitle = [];
    }


    return (
        <Box>
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
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" 
                        sx={{
                            [`& .${tableCellClasses.root}`]: {
                                borderBottom: "none",
                            }
                        }}
                    >
                        <TableHead >
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
                                        align={"center"} 
                                        // style={{ top: 57, minWidth: column.minWidth }}
                                        sx={{ bgcolor: colors.secondary }}
                                    >
                                        <Box 
                                            sx={{
                                                p: "10px",
                                                borderRadius: "8px",
                                                border: "1px solid #797979",
                                                color: "#666666",
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {Object.entries(row).map(([_key, value]: any, indez) => {
                                            return (
                                                <TableCell 
                                                    key={indez} 
                                                    align={"center"} 
                                                    // align={indez == 0 ? "left" : indez == Object.entries(row).length - 1 ? "right" : 'center' }
                                                    sx={{ 
                                                        color: indez == Object.entries(row).length - 1 ? "#627C1D" : colors.dark,
                                                        fontWeight: "400",
                                                        fontSize: {xs: "9.07px", md: "18px"},
                                                        lineHeight: {xs: "12.1px", md: "24px"},
                                                    }}
                                                >
                                                    { value }
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
                                background: colors.milk,
                                color: colors.dark,
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

export default SalesReportAnalyticsTableComponent;