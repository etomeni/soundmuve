import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';

// import { useSettingStore } from '@/state/settingStore';
// import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

import colors from '@/constants/colors';
import ReportTabsComponent from '@/components/analytics/ReportTabs';
import ReportMainDashComponent from '@/components/analytics/ReportMainDash';
// import { getDateRange, getFormattedDateRange } from '@/util/dateTime';
import SRAT_MonthsComponent from '@/components/analytics/salesReportTables/SRAT_Months';
import SRAT_LocationComponent from '@/components/analytics/salesReportTables/SRAT_Location';
import SRAT_AlbumsComponent from '@/components/analytics/salesReportTables/SRAT_Albums';
import SRAT_SinglesComponent from '@/components/analytics/salesReportTables/SRAT_Singles';
import { useRLartistAnalytics } from '@/hooks/analytics/useRLartistAnalytics';


function ArtistAnalytics_RL() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const artistName: string = queryParams.get('artistName') || '';
    
    const [reportType, setReportType] = useState('Singles');

    const { 
        salesReportSingleAnalytics, salesReportAlbumAnalytics,
        getSalesReportSingle_or_AlbumAnalytics,

        getLocationsAnalytics, locationsAnalytics,
        
        reportMonthlyAnalytics, getSalesReportMonthlyAnalytics,
        

        reportMainDashData,
        getNewDataRangeData

    } = useRLartistAnalytics();

    useEffect(() => {
        // getSalesReportMainData();
        // getAnalyticsData();
        handleDateChange("30");
    }, []);


    useEffect(() => {
        if (reportType == "Location") {
            getLocationsAnalytics(artistName);
        } else if (reportType == "Albums") {
            getSalesReportSingle_or_AlbumAnalytics("album", artistName);
        } else if (reportType == "Singles") {
            getSalesReportSingle_or_AlbumAnalytics("single", artistName);
        } else if (reportType == "Months") {
            getSalesReportMonthlyAnalytics(artistName)
        } else {
            getSalesReportSingle_or_AlbumAnalytics("single", artistName);
        }
    }, [reportType]);

    const handleDateChange = (newValue: string) => {
        getNewDataRangeData(newValue, artistName);
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
                            display: {xs: "none", md: "block"}
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    {/* <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='sales-report' accountType='record-label' /> */}

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>

                    <ReportMainDashComponent 
                        // dateRange={reportMainDashData.sales_period}
                        // setDateRange={getNewDataRangeData}
                        setDateRange={handleDateChange}
                        // not too sure about the intended data for play, 
                        // since backend didn't account for it, then its same as Streams
                        plays={ reportMainDashData.totalStreams }
                        albums={reportMainDashData.totalAlbums}
                        // sold={reportMainDashData.single_sold}
                        singles={reportMainDashData.totalSingles}
                        streams={reportMainDashData.totalStreams}
                        totalEarnedBalance={reportMainDashData.totalRevenue}
                    />

                    <ReportTabsComponent reportType={reportType} setReportType={setReportType} />


                    {
                        reportType == "Singles" &&
                        <SRAT_SinglesComponent 
                            tBodyContent={salesReportSingleAnalytics}
                            displayDownloadReport={
                                salesReportSingleAnalytics && salesReportSingleAnalytics.length ? true : false 
                            }
                        />
                    }

                    {
                        reportType == "Albums" &&
                        <SRAT_AlbumsComponent 
                            tBodyContent={salesReportAlbumAnalytics} 
                            displayDownloadReport={
                                salesReportAlbumAnalytics && salesReportAlbumAnalytics.length ? true : false 
                            }
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
                            tBodyContent={locationsAnalytics} 
                        />
                    }

                    {
                        reportType == "Months" &&
                        <SRAT_MonthsComponent 
                            tBodyContent={reportMonthlyAnalytics}
                        />
                    }

                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default ArtistAnalytics_RL;