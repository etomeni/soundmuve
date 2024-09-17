import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';
// import SalesReportReleaseComponent from '@/components/account/SalesReportRelease';
// import SalesReportAnalyticsTableComponent from '@/components/account/SalesReportAnalyticsTable';



// import appleMusic from "@/assets/images/partners/appleMusic_.png";
// import boomplay from "@/assets/images/partners/boomplay_.png";
// import deezer from "@/assets/images/partners/deezer_.png";
// import joox from "@/assets/images/partners/joox_.png";
// import kkbox from "@/assets/images/partners/kkbox_.png";
// import napster from "@/assets/images/partners/napster_.png";
// import pandora from "@/assets/images/partners/pandora_.png";
// import spotify from "@/assets/images/partners/spotify_.png";
// import tiktok from "@/assets/images/partners/tiktok_.png";
// import youtube from "@/assets/images/partners/youtube_.png";
// import SalesReportStoresAnalyticsTableComponent from '@/components/account/SalesReportStoresAnalyticsTable';
import colors from '@/constants/colors';
import ReportTabsComponent from '@/components/analytics/ReportTabs';
import ReportMainDashComponent from '@/components/analytics/ReportMainDash';
import axios from 'axios';
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { getLocalStorage, setLocalStorage } from '@/util/storage';
import { getDateRange, getFormattedDateRange } from '@/util/dateTime';
import SRAT_SinglesComponent from '@/components/analytics/salesReportTables/SRAT_Singles';
import SRAT_AlbumsComponent from '@/components/analytics/salesReportTables/SRAT_Albums';
import SRAT_LocationComponent from '@/components/analytics/salesReportTables/SRAT_Location';
import SRAT_MonthsComponent from '@/components/analytics/salesReportTables/SRAT_Months';



const singlesBodyContent = [
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        title: "Sensami",
        songsSold: "72",
        streams: "40000000",
        total: "40700",
    },
];

const albumBodyContent = [
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        albumName: "Sensami",
        albumSold: "72",
        streams: "40000000",
        total: "40700",
    },
];
 
  
// const storesHeaderTitle = [
//     "Store", "Release Sold", "Songs sold", "Streams", "Total"
// ];

// const storesBodyContent = [
//     {
//         songName: kkbox,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: pandora,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: joox,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: spotify,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: napster,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: appleMusic,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: tiktok,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: boomplay,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: youtube,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
//     {
//         songName: deezer,
//         releaseSold: "0",
//         songsSold: "72",
//         Streams: "40,000,000",
//         Total: "$40,000",
//     },
// ];


const locationBodyContent = [
    {
        location: "United Kingdom",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "United State",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "France",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Canada",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Germany",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Australia",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Nigeria",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "South Africa",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Sweden",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        location: "Netherlands",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
];
  

const monthsBodyContent = [
    {
        salesPeriod: "Nov 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Oct 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Sep 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Aug 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Jul 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "jun 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "May 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Apr 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Mar 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
    {
        salesPeriod: "Feb 2023",
        albumSold: "0",
        singlesSold: "72",
        streams: "40000000",
        total: "40700",
    },
];


interface temptAnalyticsInterface {
    _id: string,
    email: string,
    artist_id: string
    song_name: string
    release_date: string
    type: string
    artist_name: string
    revenue: string | number
    streams: string | number
    stream_time: string | number
    created_at: string
};


function SalesReport() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);
    const [reportType, setReportType] = useState('Singles');
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [reportAnalytics, setReportAnalytics] = useState<temptAnalyticsInterface[]>();
    const [reportMainDashData, setReportMainDashData] = useState<temptAnalyticsInterface>();
    const [tempData, setTempData] = useState({
        dateRange: getDateRange(30), // "April 22 - May 21",
        totalEarnedBalance: 0,
        releases: 0,
        sold: 0,
        songs: 0,
        streams: 0,
        plays: 0,
    });

    useEffect(() => {
        const localReportAnalytics = getLocalStorage("reportAnalytics");
        if (localReportAnalytics && localReportAnalytics.length) {
            setReportAnalytics(localReportAnalytics);
            setReportMainDashData(localReportAnalytics[0]);
        }

        getAnalyticsData();
    }, []);

    
    const getAnalyticsData = async () => {
        if (reportType == "this block of code is to be deleted ") {
            console.log(reportAnalytics);
            console.log(reportMainDashData);
        };

        try {
            const response = (await axios.get(`${apiEndpoint}/analytics/analytics/data`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    // email: "latham01@yopmail.com",
                    email: userData.email,
                }
            })).data;
            console.log(response);

            setReportAnalytics(response);
            setLocalStorage("reportAnalytics", response);

            if (response.length) {
                setReportMainDashData(response[0]);
            }
            
            if (!response.length) {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: response.message || "Ooops and error occurred!"
                });
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
    
            _setToastNotification({
                display: true,
                status: "error",
                message: errorResponse.message || "Ooops and error occurred!"
            });
        }
    }

    const getNewDataRangeData = (newValue: string) => {
        // console.log(newValue);
        const dateRange = getDateRange(Number(newValue));
        setTempData({ ...tempData, dateRange });
        console.log(dateRange);
        const betweenDates = getFormattedDateRange(Number(newValue));
        console.log(betweenDates);
        
        // getBalanceBetweenDates(betweenDates.startDate, betweenDates.endDate);
        
    }


    return (
        <AccountWrapper>
            <Box>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: colors.primary, 
                            mb: 2,
                            display: {xs: "none", md: "block"},
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='sales-report' accountType='artist' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>
                    <ReportMainDashComponent 
                        dateRange={tempData.dateRange}
                        setDateRange={getNewDataRangeData}
                        plays={ tempData.plays}
                        releases={tempData.releases}
                        sold={tempData.sold}
                        songs={tempData.songs}
                        streams={tempData.streams}
                        totalEarnedBalance={tempData.totalEarnedBalance}
                    />

                    <ReportTabsComponent reportType={reportType} setReportType={setReportType} />
                    

                    {
                        reportType == "Singles" &&
                        <SRAT_SinglesComponent 
                            tBodyContent={singlesBodyContent}
                            displayDownloadReport={true}
                        />
                    }

                    {
                        reportType == "Albums" &&
                        <SRAT_AlbumsComponent 
                            tBodyContent={albumBodyContent} 
                            displayDownloadReport={true}
                        />
                    }

                    {/* {
                        reportType == "Stores" &&
                        <SalesReportStoresAnalyticsTableComponent 
                            headerTitle={storesHeaderTitle} 
                            tBodyContent={storesBodyContent} 
                            darkTheme={darkTheme}
                        />
                    } */}

                    {
                        reportType == "Location" &&
                        <SRAT_LocationComponent 
                            tBodyContent={locationBodyContent} 
                        />
                    }

                    {
                        reportType == "Months" &&
                        <SRAT_MonthsComponent 
                            tBodyContent={monthsBodyContent}
                        />
                    }

                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default SalesReport;