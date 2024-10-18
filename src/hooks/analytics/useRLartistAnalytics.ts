import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { emekaApiEndpoint } from "@/util/resources";
import { 
    locationAnalyticsInterface, salesReportAlbumAnalyticsInterface, 
    salesReportMainDashInterface, salesReportMonthAnalyticsInterface, 
    salesReportSingleAnalyticsInterface 
} from "@/constants/analyticsTypesInterface";
import { getMonthDateRange } from "@/util/dateTime";


export function useRLartistAnalytics() {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const [salesReportSingleAnalytics, setSalesReportSingleAnalytics] = useState<salesReportSingleAnalyticsInterface[]>();
    const [salesReportAlbumAnalytics, setSalesReportAlbumAnalytics] = useState<salesReportAlbumAnalyticsInterface[]>();
    const [locationsAnalytics, setLocationsAnalytics] = useState<locationAnalyticsInterface[]>();
    const [reportMonthlyAnalytics, setReportMonthlyAnalytics] = useState<salesReportMonthAnalyticsInterface[]>();

    const [reportMainDashData, setReportMainDashData] = useState<salesReportMainDashInterface>({
        totalAlbums: 0,
        totalRevenue: 0,
        totalSingles: 0,
        totalStreams: 0
    });
    

    // Revised - Get Overview Statistics by Date (Record Label)
    const getSalesReportMainDashAnalytics = useCallback(async(artistName: string, startDate: string, endDate: string, ) => {
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/revisedAnalytics/label-artist-analytics`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    // email: userData.email,
                    startDate, endDate,
                    artistName,
                    recordLabelEmail: userData.email,
                }
            })).data;
            console.log(response);
    
            if (response.data) {
                setReportMainDashData({ ...reportMainDashData, ...response.data });
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
        }
    }, []);

    const getNewDataRangeData = (newValue: string, artistName: string) => {
        // console.log(newValue);
        // const dateRange = getDateRange(Number(newValue));
        // setReportMainDashData({ ...reportMainDashData, sales_period: dateRange });
        // console.log(dateRange);
        // const betweenDates = getFormattedDateRange(Number(newValue));
        // console.log(betweenDates);

        

        const betweenDates = getMonthDateRange(Number(newValue));
        console.log(betweenDates);

        // setReportMainDashData({ 
        //     ...reportMainDashData, 
        //     sales_period: `${getShortDateFormate(betweenDates.startDate)} - ${getShortDateFormate(betweenDates.endDate)}` 
        // });
        
        getSalesReportMainDashAnalytics(artistName, betweenDates.startDate, betweenDates.endDate);
    }



    // Sales Monthly Report
    const getSalesReportMonthlyAnalytics = useCallback(async (artistName: string) => {
        try {
            // https://soundmuve-backend-zrap.onrender.com/api/analyticsManager/artistmonthlyReport/James%20Hall
            const response = (await axios.get(`${emekaApiEndpoint}/analyticsManager/artistmonthlyReport/${artistName}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);
    
            setReportMonthlyAnalytics(response);
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            setReportMonthlyAnalytics([]);
        }
    }, []);

    // Report (Single or Album)
    const getSalesReportSingle_or_AlbumAnalytics = useCallback( 
        async (reportType: "album" | "single", artistName: string) => {
            try {
                const response = (await axios.get(`${emekaApiEndpoint}/analyticsManager/artist-generate-report`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        type: reportType,
                        email: userData.email,
                        artistName: artistName
                    }
                })).data;
                console.log(response);
        
                if (reportType == "album") {
                    setSalesReportAlbumAnalytics(response);
                } else if (reportType == "single") {
                    setSalesReportSingleAnalytics(response);
                }
            } catch (error: any) {
                const errorResponse = error.response.data || error;
                console.error(errorResponse);
        
                if (reportType == "album") {
                    setSalesReportAlbumAnalytics([]);
                } else if (reportType == "single") {
                    setSalesReportSingleAnalytics([]);
                }
            }
        }, []
    );

    // Get All Locations By Email
    const getLocationsAnalytics = useCallback(async (artistName: string) => {
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/analyticsManager/locations/artistLocation/${artistName}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
    
            if (response.length) {
                setLocationsAnalytics(response);
            } else {
                setLocationsAnalytics([]);
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            setLocationsAnalytics([]);
        }
    }, []);

    

    return {
        salesReportSingleAnalytics,
        salesReportAlbumAnalytics,
        getSalesReportSingle_or_AlbumAnalytics,

        locationsAnalytics,
        getLocationsAnalytics,

        reportMonthlyAnalytics,
        getSalesReportMonthlyAnalytics,

        
        reportMainDashData,
        // getSalesReportMainDashAnalytics,

        getNewDataRangeData

    }
}



