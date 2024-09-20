import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { getLocalStorage, setLocalStorage } from "@/util/storage";
// import { useReleaseStore } from "@/state/releaseStore";


export type appleSpotifyRecordInterface = {
    stream: {
        apple: number,
        spotify: number
    },
    revenue: {
        apple: number,
        spotify: number
    },
    _id: string,
    email: string,
    album_name: string,
    album_sold: number,
    created_at: string,
}

export type totalStreamsAndRevenueRecordInterface = {
    _id?: any,
    totalAppleRevenue: number,
    totalSpotifyRevenue: number,
    totalAppleStreams: number,
    totalSpotifyStreams: number
}

function getLocalAppleSpotifyRecord() {
    const localAppleSpotifyRecord = getLocalStorage("appleSpotifyRecord");
    if (localAppleSpotifyRecord && localAppleSpotifyRecord._id) {
        return localAppleSpotifyRecord;
    }
}

function getLocalTotalStreamsAndRevenueRecord() {
    const localTotalStreamsAndRevenueRecord = getLocalStorage("totalStreamsAndRevenueRecord");
    if (localTotalStreamsAndRevenueRecord) {
        return localTotalStreamsAndRevenueRecord;
    }
}


export function useAnalytics() {
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    // const songDetails = useReleaseStore((state) => state.songDetails);
    // const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    // const [isLoading, setIsLoading] = useState(true);
    const [appleSpotifyRecord, setAppleSpotifyRecord] = 
    useState<appleSpotifyRecordInterface>(getLocalAppleSpotifyRecord);

    const [totalStreamsAndRevenueRecord, setTotalStreamsAndRevenueRecord] = 
    useState<totalStreamsAndRevenueRecordInterface>(getLocalTotalStreamsAndRevenueRecord);

    const getAppleSpotifyRecord = useCallback(async (songId: string) => {
        // _getAppleSpotifyRecord(songId)
        try {
            const response = (await axios.get(`${apiEndpoint}/analyticsManager/album-analytics/${songId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);
    
            if (response.data._id) {
                setLocalStorage("appleSpotifyRecord", response.data);
                setAppleSpotifyRecord(response.data);
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            // setPaymentDetails([]);
        }
    }, []);
    
    // const _getAppleSpotifyRecord = async (songId: string) => {
    // }

    const getTotalStreamsAndRevenueRecord = useCallback(async (reqType: string = "album") => {
        try {
            const response = (await axios.get(`${apiEndpoint}/analyticsManager/analytics/revenue-monthly`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    type: reqType // I'm assuming the other possible value is album or single
                }
            })).data;
            // console.log(response);
    
            if (response.totalAppleRevenue) {
                setLocalStorage("totalStreamsAndRevenueRecord", response);
                setTotalStreamsAndRevenueRecord(response);



                // _setSongDetails({
                //     ...songDetails,
                // })
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            // setPaymentDetails([]);
        }
    }, []);
    

    return {
        appleSpotifyRecord,
        getAppleSpotifyRecord,

        totalStreamsAndRevenueRecord,
        getTotalStreamsAndRevenueRecord,

    }
}



