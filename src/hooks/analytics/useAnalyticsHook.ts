import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { useSettingStore } from "@/state/settingStore";
import { transactionInterface } from "@/typeInterfaces/transaction.interface";
import colors from "@/constants/colors";
// import { analyticsInterface, locationAnalyticsInterface, totalEarningsAnalyticsInterface } from "@/typeInterfaces/analytics.interface";
import { useAnalyticsStore } from "@/state/analyticsStore";
import { totalEarningsAnalyticsInterface } from "@/typeInterfaces/analytics.interface";
// import { releaseInterface, songInterface } from "@/typeInterfaces/release.interface";
import { useReleaseStore } from "@/state/releaseStore";


export function useAnalyticsHook() {
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    const [transactions, setTransactions] = useState<transactionInterface[]>();

    // const [salesReportSingleAnalytics, setSalesReportSingleAnalytics] = useState<albumAndSinglesAnalyticsInterface[]>();
    // const [salesReportAlbumAnalytics, setSalesReportAlbumAnalytics] = useState<albumAndSinglesAnalyticsInterface[]>();
    // const [salesReportLocationsAnalytics, setSalesReportLocationsAnalytics] = useState<locationAnalyticsInterface[]>();
    // const [salesReportMonthlyAnalytics, setsalesReportMonthlyAnalytics] = useState<analyticsInterface[]>();
    // const [salesReportMainDashData, setsalesReportMainDashData] = useState<totalEarningsAnalyticsInterface>();

    const _setSalesReportTotalEarnings = useAnalyticsStore((state) => state._setSalesReportTotalEarnings);
    const _setSalesReportMonths = useAnalyticsStore((state) => state._setSalesReportMonths);
    const _setSalesReportLocations = useAnalyticsStore((state) => state._setSalesReportLocations);
    const _setSalesReportAlbum = useAnalyticsStore((state) => state._setSalesReportAlbum);
    const _setSalesReportSingles = useAnalyticsStore((state) => state._setSalesReportSingles);

    const [songTotalEarningsAnalytics, setSongTotalEarningsAnalytics] = useState<totalEarningsAnalyticsInterface>();
    const [albumTotalEarningsAnalytics, setAlbumTotalEarningsAnalytics] = useState<totalEarningsAnalyticsInterface>();
    // const [songReleaseData, setSongReleaseData] = useState<releaseInterface>();
    // const [songData, setSongData] = useState<songInterface>();

    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);
    

    const getTransactionHistory = useCallback(async (pageNo: number, limitNo: number, startDate: string, endDate: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/transactions/get-transactions`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo, limit: limitNo,
                    startDate, endDate,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setTransactions(response.result.data);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            setTransactions([]);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);


    const getSalesReportAnalytics = useCallback(async (startDate: string, endDate: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analytics/get-salesreport-analytics`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // setsalesReportMainDashData(response.result.totalsEarnings);
                _setSalesReportTotalEarnings(response.result.totalsEarnings);
                // months
                // setsalesReportMonthlyAnalytics(response.result.salesReportMonths);
                _setSalesReportMonths(response.result.salesReportMonths);
                // location
                // setSalesReportLocationsAnalytics(response.result.salesReportLocation);
                _setSalesReportLocations(response.result.salesReportLocation);
                // albums
                // setSalesReportAlbumAnalytics(response.result.salesReportAlbums);
                _setSalesReportAlbum(response.result.salesReportAlbums);
                // singles
                // setSalesReportSingleAnalytics(response.result.salesReportSingles);
                _setSalesReportSingles(response.result.salesReportSingles);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getSongAnalytics = useCallback(async (startDate: string, endDate: string, songId: string, release_id: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analytics/get-song-analytics`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                    songId, release_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // songTotalEarningsAnalytics
                setSongTotalEarningsAnalytics(response.result.totalsEarnings);
                // songReleaseData
                // setSongReleaseData(response.result.release);
                _setReleaseDetails(response.result.release);
                // songData
                // setSongData(response.result.song);
                _setSongDetails(response.result.song);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const getAlbumAnalytics = useCallback(async (startDate: string, endDate: string, release_id: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analytics/get-album-analytics`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    // page: pageNo, limit: limitNo,
                    startDate, endDate,
                    release_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                // songTotalEarningsAnalytics
                setAlbumTotalEarningsAnalytics(response.result.totalsEarnings);
                // songReleaseData
                // setSongReleaseData(response.result.release);
                _setReleaseDetails(response.result.release);
            }

            // _setToastNotification({
            //     display: true,
            //     status: "info",
            //     message: response.message
            // });

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);


    

    const handleStatusDisplay = (status: "Pending" | "Processing" | "Success" | "Complete" | "Failed") => {

        if (status.toLowerCase() == 'complete') {
            return {
                bgcolor: "#B4D28A",
                color: "#33500B"
            };
        } else if (status.toLowerCase() == 'failed') {
            return {
                bgcolor: "#701920",
                color: "#D2A5A9"
            };
        } else if (status.toLowerCase() == 'success') {
            return {
                bgcolor: "#435925",
                color: '#B6D787'
            };
        } else if (status.toLowerCase() == 'pending') {
            return {
                bgcolor: "#825600",
                color: "#D3AA5A"
            };
        } else if (status.toLowerCase() == 'processing') {
            return {
                bgcolor: colors.primary,
                color: colors.milk
            };
        } else {
            return {
                bgcolor: "",
                color: ''
            };
        }
    }

    
 
    return {
        apiResponse, setApiResponse,
        limitNo, setLimitNo,

        currentPageNo, totalRecords,
        totalPages,
        
        // isSubmitting,

        transactions,
        getTransactionHistory,

        getSalesReportAnalytics,

        songTotalEarningsAnalytics,
        // songReleaseData,
        // songData,
        getSongAnalytics,

        albumTotalEarningsAnalytics,
        getAlbumAnalytics,

        handleStatusDisplay,
    }
}
