import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import colors from '@/constants/colors';
import SRAT_DownloadReportBtn from './SRAT_DownloadBtn';
import { SxProps, Theme } from '@mui/material/styles';
import SRAT_TableHead from './SRAT_TableHead';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import { salesReportMonthAnalyticsInterface } from '@/constants/analyticsTypesInterface';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';


interface _Props {
    tBodyContent: salesReportMonthAnalyticsInterface[] | undefined,
    displayDownloadReport?: boolean,
};

const headerTitle = [ "Sales Period", "Album sold", "Singles sold", "Streams", "Total" ];

const tableValueStyle: SxProps<Theme> = {
    fontWeight: "400",
    fontSize: {xs: "9.07px", md: "18px"},
    lineHeight: {xs: "12.1px", md: "24px"},
}


const SRAT_MonthsComponent: React.FC<_Props> = ({
    tBodyContent, displayDownloadReport = false
}) => {

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
                        <SRAT_TableHead headerTitle={headerTitle} />

                        {
                            tBodyContent && tBodyContent.length ? (
                                <TableBody>
                                    {tBodyContent
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                
                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: colors.dark,
                                                    }}
                                                > { row.month } </TableCell>

                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: colors.dark,
                                                    }}
                                                > { formatedNumber(Number(row.album_sold)) } </TableCell>

                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: colors.dark,
                                                    }}
                                                > { formatedNumber(Number(row.single_sold)) } </TableCell>

                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: colors.dark,
                                                    }}
                                                > { formatedNumber(Number(row.streams.total_combined)) } </TableCell>
                                                
                                                <TableCell align={"center"} 
                                                    sx={{ 
                                                        ...tableValueStyle,
                                                        color: "#627C1D",
                                                    }}
                                                > { currencyDisplay(Number(row.total_revenue)) } </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            ) : <></>
                        }
                    </Table>
                </TableContainer>

                {
                    tBodyContent ? (
                        tBodyContent.length ? <></> : 
                        <Box py={5} mx="auto">
                            <EmptyListComponent notFoundText='No data found.' />
                        </Box>
                    ) : <LoadingDataComponent containerHeight='45vh' />
                }

                {
                    displayDownloadReport && <SRAT_DownloadReportBtn />
                }

            </Paper>

        </Box>
    )
}

export default SRAT_MonthsComponent;