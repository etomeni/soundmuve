import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { locationAnalyticsInterface, salesReportAlbumAnalyticsInterface, salesReportMainDashInterface, salesReportMonthAnalyticsInterface, salesReportSingleAnalyticsInterface } from "@/constants/analyticsTypesInterface";
import { getDateRange, getFormattedDateRange } from "@/util/dateTime";


export function useGeneralAnalytics() {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const [salesReportSingleAnalytics, setSalesReportSingleAnalytics] = useState<salesReportSingleAnalyticsInterface[]>();
    const [salesReportAlbumAnalytics, setSalesReportAlbumAnalytics] = useState<salesReportAlbumAnalyticsInterface[]>();
    const [locationsAnalytics, setLocationsAnalytics] = useState<locationAnalyticsInterface[]>();
    const [reportMonthlyAnalytics, setReportMonthlyAnalytics] = useState<salesReportMonthAnalyticsInterface[]>();

    const [reportMainDashData, setReportMainDashData] = useState<salesReportMainDashInterface>({
        album_sold: 0,
        sales_period: getDateRange(30),
        single_sold: 0,
        streams: {
            apple: 0,
            spotify: 0,
            total_combined: 0
        },
        total_revenue: 0
    });

 


    // SALES REPORT


    // const getAnalyticsData = async () => {
    //     if (reportType == "this block of code is to be deleted ") {
    //         console.log(reportAnalytics);
    //         console.log(reportMainDashData);
    //     };

    //     try {
    //         const response = (await axios.get(`${apiEndpoint}/analytics/analytics/data`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //             params: {
    //                 // email: "latham01@yopmail.com",
    //                 email: userData.email,
    //             }
    //         })).data;
    //         console.log(response);

    //         setReportAnalytics(response);
    //         setLocalStorage("reportAnalytics", response);

    //         if (response.length) {
    //             setReportMainDashData(response[0]);
    //         }
            
    //         if (!response.length) {
    //             _setToastNotification({
    //                 display: true,
    //                 status: "error",
    //                 message: response.message || "Ooops and error occurred!"
    //             });
    //         }
    
    //     } catch (error: any) {
    //         const errorResponse = error.response.data || error;
    //         console.error(errorResponse);
    
    //         _setToastNotification({
    //             display: true,
    //             status: "error",
    //             message: errorResponse.message || "Ooops and error occurred!"
    //         });
    //     }
    // }

    const getNewDataRangeData = (newValue: string) => {
        // console.log(newValue);
        const dateRange = getDateRange(Number(newValue));
        setReportMainDashData({ ...reportMainDashData, sales_period: dateRange });
        console.log(dateRange);
        const betweenDates = getFormattedDateRange(Number(newValue));
        console.log(betweenDates);
        
        // getBalanceBetweenDates(betweenDates.startDate, betweenDates.endDate);
        
    }


    // Sales Monthly Report
    const handleGetSalesReportMonthlyAnalytics = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analyticsManager/monthlyReport/${userData.email}`, {
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
    }
    const getSalesReportMonthlyAnalytics = useCallback(() => {
        handleGetSalesReportMonthlyAnalytics()
    }, []);


    // Report (Single or Album)
    const handleGetSalesReportSingle_or_AlbumAnalytics = async (reportType: "album" | "single") => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analyticsManager/generate-report`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    type: reportType,
                    email: userData.email
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
    }
    const getSalesReportSingle_or_AlbumAnalytics = useCallback((type: "album" | "single") => {
        handleGetSalesReportSingle_or_AlbumAnalytics(type)
    }, []);

    // Get All Locations By Email
    const handleGetLocationsAnalytics = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analyticsManager/locations/email/${userData.email}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setLocationsAnalytics(response);
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            setLocationsAnalytics([]);
        }
    }
    const getLocationsAnalytics = useCallback(() => {
        handleGetLocationsAnalytics()
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

        getNewDataRangeData

    }
}



