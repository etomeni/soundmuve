import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';
// import SalesReportReleaseComponent from '@/components/account/SalesReportRelease';
import SalesReportAnalyticsTableComponent from '@/components/account/SalesReportAnalyticsTable';



import appleMusic from "@/assets/images/partners/appleMusic_.png";
import boomplay from "@/assets/images/partners/boomplay_.png";
import deezer from "@/assets/images/partners/deezer_.png";
import joox from "@/assets/images/partners/joox_.png";
import kkbox from "@/assets/images/partners/kkbox_.png";
import napster from "@/assets/images/partners/napster_.png";
import pandora from "@/assets/images/partners/pandora_.png";
import spotify from "@/assets/images/partners/spotify_.png";
import tiktok from "@/assets/images/partners/tiktok_.png";
import youtube from "@/assets/images/partners/youtube_.png";
import SalesReportStoresAnalyticsTableComponent from '@/components/account/SalesReportStoresAnalyticsTable';

  
const releaseHeaderTitle = [
    "Title", "Types", "Release sold", "Songs sold", "Streams", "Total"
];

const releaseBodyContent = [
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        Title: "Sensami",
        Types: "Single",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
];
  
const songsHeaderTitle = [
    "Song Name", "Release Name", "Songs sold", "Streams", "Total"
];

const songsBodyContent = [
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: "Sensami",
        releaseName: "Sensami",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
];
  
const storesHeaderTitle = [
    "Store", "Release Sold", "Songs sold", "Streams", "Total"
];

const storesBodyContent = [
    {
        songName: kkbox,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: pandora,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: joox,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: spotify,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: napster,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: appleMusic,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: tiktok,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: boomplay,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: youtube,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        songName: deezer,
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
];
  
const locationHeaderTitle = [
    "Location", "Release Sold", "Songs sold", "Streams", "Total"
];

const locationBodyContent = [
    {
        location: "United Kingdom",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "United State",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "France",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Canada",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Germany",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Australia",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Nigeria",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "South Africa",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Sweden",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        location: "Netherlands",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
];
  
const monthsHeaderTitle = [
    "Sales Period", "Release Sold", "Songs sold", "Streams", "Total"
];

const monthsBodyContent = [
    {
        salesPeriod: "Nov 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Oct 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Sep 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Aug 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Jul 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "jun 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "May 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Apr 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Mar 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
    {
        salesPeriod: "Feb 2023",
        releaseSold: "0",
        songsSold: "72",
        Streams: "40,000,000",
        Total: "$40,000",
    },
];


function SalesReport_RL() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);

    const [reportType, setReportType] = useState('Release');
  


    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                        }}
                    >
                        <ChevronLeftIcon sx={{ display: {xs: "none", md: "block"} }} />
                    </IconButton>

                    <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='sales-report' accountType='record-label' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>

                    <Box
                        sx={{
                            border: "1px solid #D9D9D9",
                            borderRadius: "13px",
                            bgcolor: darkTheme ? "#000" : "#272727",
                            p: {xs: "15px", md: "25px"},
                            mb: {xs: "50px", md: "70px"}
                        }}
                    >
                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"}>
                            <FormControl fullWidth sx={{ width: "fit-content" }}>
                                <Select
                                    labelId="sortByDays"
                                    id="sortByDays-select"
                                    label=""
                                    defaultValue="Last 30 Days"
                                    placeholder='Last 30 Days'

                                    sx={{
                                        color: "#fff",
                                        borderRadius: "8px",
                                        bgcolor: darkTheme ? "#272727" : "#414141",
                                        // textAlign: "center",
                                        fontWeight: "900",
                                        border: "none",
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
                                    <MenuItem value="Last 30 Days">
                                        Last 7 Days
                                    </MenuItem>
                                    <MenuItem value="Last 30 Days">
                                        Last 14 Days
                                    </MenuItem>
                                    <MenuItem value="Last 30 Days">
                                        Last 30 Days
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "10px", md: "18px"},
                                    lineHeight: {xs: "12px", md: "24px"},
                                    letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                                    color: "#fff",
                                }}
                            >April 22 - May 21</Typography>
                        </Stack>

                        <Box 
                            sx={{ 
                                display: {xs: "flex", md: "none"}, 
                                my: "30px", 
                                justifyContent: "right", 
                                alignItems: "baseline",
                                gap: "5px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "800",
                                    fontSize: "18px",
                                    lineHeight: "24px",
                                    color: "#C8F452",
                                }}
                            >$6,228.76</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "8px",
                                    lineHeight: "8px",
                                    color: darkTheme ? "#4C4C4C" : "#FBFBFB",
                                }}
                            >Balance</Typography>
                        </Box>

                        <Stack direction={"row"} spacing={"20px"} mt={{xs: 0, md: "60px"}} justifyContent={"space-between"} alignItems={"center"}>
                            <Stack direction={"row"} spacing={{xs: "15px", md: "20px"}} justifyContent={{xs: "space-between", md: "initial"}} >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mb: 1
                                        }}
                                    >Releases</Typography>

                                    <Box 
                                        sx={{
                                            p: {xs: "10px 15px", md: "10px 27px"},
                                            borderRadius: {xs: "5.27px", md: "7px"},
                                            bgcolor: "#FFFFFF" ,
                                            color: "#000",
                                            cursor: "pointer",
                                            display: "inline-block"
                                        }}
                                    >
                                        <Typography 
                                            sx={{
                                                fontWeight: '900',
                                                fontSize: {xs: "13.54px", md: "18px"},
                                                lineHeight: {xs: "10px", md: "24px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                textAlign: 'center',
                                            }}
                                        > $13,715.98 </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: {xs: "700", md: "400"},
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mt: 1
                                        }}
                                    >84 Sold</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mb: 1
                                        }}
                                    >Songs</Typography>

                                    <Box 
                                        sx={{
                                            p: {xs: "10px 15px", md: "10px 27px"},
                                            borderRadius: {xs: "5.27px", md: "7px"},
                                            bgcolor: "#FFFFFF" ,
                                            color: "#000",
                                            cursor: "pointer",
                                            display: "inline-block"
                                        }}
                                    >
                                        <Typography 
                                            sx={{
                                                fontWeight: '900',
                                                fontSize: {xs: "13.54px", md: "18px"},
                                                lineHeight: {xs: "10px", md: "24px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                textAlign: 'center',
                                            }}
                                        > $54.84 </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: {xs: "700", md: "400"},
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mt: 1
                                        }}
                                    >84 Sold</Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mb: 1
                                        }}
                                    >Streams</Typography>

                                    <Box 
                                        sx={{
                                            p: {xs: "10px 15px", md: "10px 27px"},
                                            borderRadius: {xs: "5.27px", md: "7px"},
                                            bgcolor: "#FFFFFF" ,
                                            color: "#000",
                                            cursor: "pointer",
                                            display: "inline-block"
                                        }}
                                    >
                                        <Typography 
                                            sx={{
                                                fontWeight: '900',
                                                fontSize: {xs: "13.54px", md: "18px"},
                                                lineHeight: {xs: "10px", md: "24px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                textAlign: 'center',
                                            }}
                                        > $13,66.13 </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontWeight: {xs: "700", md: "400"},
                                            fontSize: {xs: "13.54px", md: "18px"},
                                            lineHeight: {xs: "18.06px", md: "24px"},
                                            color: darkTheme ? "#666666" : "#FBFBFB",
                                            mt: 1
                                        }}
                                    >4,000,000 Plays</Typography>
                                </Box>
                            </Stack>

                            <Box sx={{ display: {xs: "none", md: "initial"} }}>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "13.54px", md: "18px"},
                                        lineHeight: {xs: "18.06px", md: "24px"},
                                        color: darkTheme ? "#666666" : "#FBFBFB",
                                        mb: 1
                                    }}
                                >Total Earned</Typography>

                                <Box 
                                    sx={{
                                        p: {xs: "10px 15px", md: "10px 37px"},
                                        borderRadius: "7px",
                                        bgcolor: "#33500B",
                                        color: "#C8F452",
                                        cursor: "pointer",
                                        display: "inline-block"
                                    }}
                                >
                                    <Typography 
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: {xs: "10.18px", md: "18px"},
                                            lineHeight: {xs: "8.82px", md: "24px"},
                                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                            textAlign: 'center',
                                        }}
                                    > $13,715.98 </Typography>
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "13.54px", md: "18px"},
                                        lineHeight: {xs: "18.06px", md: "24px"},
                                        color: darkTheme ? "#666666" : "#FBFBFB",
                                        mt: 1
                                    }}
                                >April 22 - May 21</Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{mb: "40px"}}>
                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={"15px"}>

                            <Box 
                                sx={{
                                    p: "10px",
                                    border: reportType == 'Release' ? "1px solid #FBFBFB" : 'none',
                                    borderRadius: "11px",
                                    bgcolor: reportType == 'Release' ? "#4C4C4C" : "#313131" ,
                                    color: "#CACACA",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => setReportType('Release') }
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "18px"},
                                        lineHeight: {xs: "8.82px", md: "24px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Release </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px",
                                    border: reportType == 'Songs' ? "1px solid #FBFBFB" : 'none',
                                    borderRadius: "11px",
                                    bgcolor: reportType == 'Songs' ? "#4C4C4C" : "#313131" ,
                                    color: "#CACACA",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => setReportType('Songs') }
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "18px"},
                                        lineHeight: {xs: "8.82px", md: "24px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Songs </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px",
                                    border: reportType == 'Stores' ? "1px solid #FBFBFB" : 'none',
                                    borderRadius: "11px",
                                    bgcolor: reportType == 'Stores' ? "#4C4C4C" : "#313131",
                                    color: "#CACACA",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => setReportType('Stores') }
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "18px"},
                                        lineHeight: {xs: "8.82px", md: "24px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Stores </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px",
                                    border: reportType == 'Location' ? "1px solid #FBFBFB" : 'none',
                                    borderRadius: "11px",
                                    bgcolor: reportType == 'Location' ? "#4C4C4C" : "#313131",
                                    color: "#CACACA",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => setReportType('Location') }
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "18px"},
                                        lineHeight: {xs: "8.82px", md: "24px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Location </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px",
                                    border: reportType == 'Months' ? "1px solid #FBFBFB" : 'none',
                                    borderRadius: "11px",
                                    bgcolor: reportType == 'Months' ? "#4C4C4C" : "#313131",
                                    color: "#CACACA",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => setReportType('Months') }
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "10.18px", md: "18px"},
                                        lineHeight: {xs: "8.82px", md: "24px"},
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Months </Typography>
                            </Box>
                        
                        </Stack>
                    </Box>


                    {
                        reportType == "Release" &&
                        <SalesReportAnalyticsTableComponent 
                            headerTitle={releaseHeaderTitle} 
                            tBodyContent={releaseBodyContent} 
                            darkTheme={darkTheme}     
                            displayDownloadReport={true}                   
                        />
                    }

                    {
                        reportType == "Songs" &&
                        <SalesReportAnalyticsTableComponent 
                            headerTitle={songsHeaderTitle} 
                            tBodyContent={songsBodyContent} 
                            darkTheme={darkTheme}                        
                        />
                    }

                    {
                        reportType == "Stores" &&
                        <SalesReportStoresAnalyticsTableComponent 
                            headerTitle={storesHeaderTitle} 
                            tBodyContent={storesBodyContent} 
                            darkTheme={darkTheme}
                        />
                    }

                    {
                        reportType == "Location" &&
                        <SalesReportAnalyticsTableComponent 
                            headerTitle={locationHeaderTitle} 
                            tBodyContent={locationBodyContent} 
                            darkTheme={darkTheme}                        
                        />
                    }

                    {
                        reportType == "Months" &&
                        <SalesReportAnalyticsTableComponent 
                            headerTitle={monthsHeaderTitle}
                            tBodyContent={monthsBodyContent}
                            darkTheme={darkTheme}
                        />
                    }



                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default SalesReport_RL;