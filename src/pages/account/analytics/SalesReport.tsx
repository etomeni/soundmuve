import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
// import { useSettingStore } from '@/state/settingStore';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

import colors from '@/constants/colors';
import ReportTabsComponent from '@/components/analytics/ReportTabs';
import ReportMainDashComponent from '@/components/analytics/ReportMainDash';
// import { getDateRange } from '@/util/dateTime';
import SRAT_SinglesComponent from '@/components/analytics/salesReportTables/SRAT_Singles';
import SRAT_AlbumsComponent from '@/components/analytics/salesReportTables/SRAT_Albums';
import SRAT_LocationComponent from '@/components/analytics/salesReportTables/SRAT_Location';
import SRAT_MonthsComponent from '@/components/analytics/salesReportTables/SRAT_Months';
import { getDateRangeBydays } from '@/util/dateTime';
import { useAnalyticsStore } from '@/state/analyticsStore';
import { useAnalyticsHook } from '@/hooks/analytics/useAnalyticsHook';


function SalesReport() {
    const navigate = useNavigate();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const [reportType, setReportType] = useState<'Months' | 'Location' | 'Albums' | 'Singles'>('Singles');

    const [dateRange, setDateRange] = useState(getDateRangeBydays(365));

    const salesReportTotalEarnings = useAnalyticsStore((state) => state.salesReportTotalEarnings);
    const salesReportMonths = useAnalyticsStore((state) => state.salesReportMonths);
    const salesReportLocations = useAnalyticsStore((state) => state.salesReportLocations);
    const salesReportAlbum = useAnalyticsStore((state) => state.salesReportAlbum);
    const salesReportSingles = useAnalyticsStore((state) => state.salesReportSingles);
   
    const { 
        getSalesReportAnalytics,
    } = useAnalyticsHook();

    useEffect(() => {
        getSalesReportAnalytics(dateRange.startDate, dateRange.endDate);
    }, [dateRange]);

    // useEffect(() => {
    //     if (reportType == "Location") {
    //         getLocationsAnalytics();
    //     } else if (reportType == "Albums") {
    //         getSalesReportSingle_or_AlbumAnalytics("album");
    //     } else if (reportType == "Singles") {
    //         getSalesReportSingle_or_AlbumAnalytics("single");
    //     } else if (reportType == "Months") {
    //         getSalesReportMonthlyAnalytics();
    //     } else {
    //         getSalesReportSingle_or_AlbumAnalytics("single");
    //     }
    // }, [reportType]);


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

                    <ArtistAnalyticsNavComponent currentPage='sales-report' accountType='artist' />

                    <Box></Box>
                </Stack>

                <Box sx={{ mt: 7 }}>
                    <ReportMainDashComponent 
                        // dateRange={reportMainDashData.sales_period}
                        setDateRangeValue={(value) => setDateRange(value)}
                        dateRangeValue={dateRange }
                        // not too sure about the intended data for play, 
                        // since backend didn't account for it, then its same as Streams
                        streamPlays={ salesReportTotalEarnings.streamPlay }
                        // albums={reportMainDashData.totalAlbums}
                        albums={ salesReportTotalEarnings.totalSingles }
                        albumSold={ salesReportTotalEarnings.albumSold }
                        // sold={reportMainDashData.single_sold}
                        // singles={reportMainDashData.totalSingles}
                        singles={ salesReportTotalEarnings.totalSingles }
                        singlesSold={ salesReportTotalEarnings.noSold }
                        // streams={reportMainDashData.totalStreams}
                        streamRevenue={ salesReportTotalEarnings.streamRevenue }
                        // totalEarnedBalance={reportMainDashData.totalRevenue}
                        totalEarnedBalance={salesReportTotalEarnings.revenue}
                    />

                    <ReportTabsComponent reportType={reportType} setReportType={setReportType} />
                    

                    {
                        reportType == "Singles" &&
                        <SRAT_SinglesComponent 
                            tBodyContent={salesReportSingles}
                            // displayDownloadReport={ 
                            //     salesReportSingles && salesReportSingles.length ? true : false 
                            // }
                        />
                    }

                    {
                        reportType == "Albums" &&
                        <SRAT_AlbumsComponent 
                            tBodyContent={salesReportAlbum} 
                            // displayDownloadReport={
                            //     salesReportAlbum && salesReportAlbum.length ? true : false 
                            // }
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
                            tBodyContent={salesReportLocations} 
                        />
                    }

                    {
                        reportType == "Months" &&
                        <SRAT_MonthsComponent 
                            tBodyContent={salesReportMonths}
                        />
                    }

                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default SalesReport;