import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

import colors from '@/constants/colors';
import ReportTabsComponent from '@/components/analytics/ReportTabs';
import ReportMainDashComponent from '@/components/analytics/ReportMainDash';
// import { getDateRange } from '@/util/dateTime';
import SRAT_SinglesComponent from '@/components/analytics/salesReportTables/SRAT_Singles';
import SRAT_AlbumsComponent from '@/components/analytics/salesReportTables/SRAT_Albums';
import SRAT_LocationComponent from '@/components/analytics/salesReportTables/SRAT_Location';
import SRAT_MonthsComponent from '@/components/analytics/salesReportTables/SRAT_Months';
import { useGeneralAnalytics } from '@/hooks/analytics/useGeneralAnalytics';


function SalesReport() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [reportType, setReportType] = useState<'Months' | 'Location' | 'Albums' | 'Singles'>('Singles');


    const { 
        salesReportSingleAnalytics, salesReportAlbumAnalytics,
        getSalesReportSingle_or_AlbumAnalytics,

        getLocationsAnalytics, locationsAnalytics,
        
        reportMonthlyAnalytics, getSalesReportMonthlyAnalytics,
        
        reportMainDashData,

        getNewDataRangeData

    } = useGeneralAnalytics();

    useEffect(() => {
        // getSalesReportMainData();
        // getAnalyticsData();
    }, []);

    useEffect(() => {
        if (reportType == "Location") {
            getLocationsAnalytics();
        } else if (reportType == "Albums") {
            getSalesReportSingle_or_AlbumAnalytics("album");
        } else if (reportType == "Singles") {
            getSalesReportSingle_or_AlbumAnalytics("single");
        } else if (reportType == "Months") {
            getSalesReportMonthlyAnalytics();
        } else {
            getSalesReportSingle_or_AlbumAnalytics("single");
        }
    }, [reportType]);



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
                        dateRange={reportMainDashData.sales_period}
                        setDateRange={getNewDataRangeData}
                        // not too sure about the intended data for play, 
                        // since backend didn't account for it, then its same as Streams
                        plays={ reportMainDashData.streams.total_combined }
                        albums={reportMainDashData.album_sold}
                        // sold={reportMainDashData.single_sold}
                        singles={reportMainDashData.single_sold}
                        streams={reportMainDashData.streams.total_combined}
                        totalEarnedBalance={reportMainDashData.total_revenue}
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

export default SalesReport;