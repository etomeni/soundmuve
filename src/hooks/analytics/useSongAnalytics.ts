import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { emekaApiEndpoint } from "@/util/resources";
import { 
    appleSpotifyRecordInterface, graphApiRespondInterface, 
    spotifyAndAppleOverviewInterface, // totalStreamsAndRevenueRecordInterface 
} from "@/constants/analyticsTypesInterface";
import { getMonthDateRange } from "@/util/dateTime";
// import { useReleaseStore } from "@/state/releaseStore";


const dataset = [
    {
      percentageValue: 0,
      month: 'Jan',
    },
    {
      percentageValue: 0,
      month: 'Feb',
    },
    {
      percentageValue: 0,
      month: 'Mar',
    },
    {
      percentageValue: 0,
      month: 'Apr',
    },
    {
      percentageValue: 0,
      month: 'May',
    },
    {
      percentageValue: 0,
      month: 'Jun',
    },
    {
      percentageValue: 0,
      month: 'July',
    },
    {
      percentageValue: 0,
      month: 'Aug',
    },
    {
      percentageValue: 0,
      month: 'Sept',
    },
    {
      percentageValue: 0,
      month: 'Oct',
    },
    {
      percentageValue: 0,
      month: 'Nov',
    },
    {
      percentageValue: 0,
      month: 'Dec',
    },
];

export function useSongAnalytics() {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    // const songDetails = useReleaseStore((state) => state.songDetails);
    // const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const [spotifyAndAppleOverview, setSpotifyAndAppleOverview] = useState<spotifyAndAppleOverviewInterface>({
        apple: {
            revenue: 0,
            streams: 0,
            streamTime: 0,
        },
        spotify: {
            revenue: 0,
            streams: 0,
            streamTime: 0,
        }
    })

    const [songDashAnalytics, setSongDashAnalytics] = useState({
        total_revenue: 0,
        streams: 0,
        stream_time: 0,
    });
    const [appleMusicDataset, setAppleMusicDataset] = useState<typeof dataset>(dataset);
    const [spotifyDataset, setSpotifyDataset] = useState<typeof dataset>(dataset);

    const [graphApiData, setGraphApiData] = useState<graphApiRespondInterface[]>([]);

    const [appleSpotifyRecord, setAppleSpotifyRecord] = 
    useState<appleSpotifyRecordInterface>({
        stream: {
            apple: 0,
            spotify: 0
        },
        revenue: {
            apple: 0,
            spotify: 0
        },
        _id: '',
        email: '',
        album_name: '',
        album_sold: 0,
        created_at: '',
    });

    // const [totalStreamsAndRevenueRecord, setTotalStreamsAndRevenueRecord] = 
    // useState<totalStreamsAndRevenueRecordInterface>(getLocalTotalStreamsAndRevenueRecord);

    const getAppleSpotifyRecord = useCallback(async (songId: string) => {
        // _getAppleSpotifyRecord(songId)
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/analyticsManager/album-analytics/${songId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);
    
            if (response.data._id) {
                // setAppleSpotifyRecord(response.data);
            }
    
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
            // setPaymentDetails([]);
        }
    }, []);
    
    
    const getGraphData = useCallback(async (songId: string, songTitle: string, songType: 'album' | 'single') => {
        try {
            const d = new Date();
            const year = d.getFullYear();
    
            const response: graphApiRespondInterface[] = (await axios.get(`${emekaApiEndpoint}/analyticsManager/analytics/revenue-monthly`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    type: songType, // 'album', // 'single'
                    year: year,
                    Id: songId,
                    song_title: songTitle,
                    email: userData.email
                }
            })).data;
            // console.log(response);
            
    
            if (response.length) {
                setGraphApiData(response);
    
                let sportify: typeof dataset = []; 
                let apple: typeof dataset = []; 
    
                response.forEach((item) => {
                    const appleData = {
                        percentageValue: Number(item.totalAppleRevenue),
                        month: item.month,
                    };
                    apple.push(appleData);
    
                    const sportifyData = {
                        percentageValue: Number(item.totalAppleRevenue),
                        month: item.month,
                    };
                    sportify.push(sportifyData);
                })
    
                // setSpotifyDataset(sportify);
                // setAppleMusicDataset(apple);
            }
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
        }
    }, []);


    const getSportifiyAppleOverview = useCallback(async (songId: string, songType: 'album' | 'single') => {
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/analyticsManager/analytics/revenue-yearly`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    type: songType, // 'album', // 'single'
                    Id: songId,
                    email: userData.email
                }
            })).data;
            // console.log(response);
    
            if (response.analytics) {
                // setSpotifyAndAppleOverview(response.analytics)
            }
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
        }
    }, []);


    const handleDataRangeData = useCallback((newValue: string) => {
        // console.log(newValue);
        // const dateRange = getDateRange(Number(newValue));
        // setTempData({ ...tempData, dateRange });
        // console.log(dateRange);
        // const betweenDates = getFormattedDateRange(Number(newValue));
        // console.log(betweenDates);

        const betweenDates = getMonthDateRange(Number(newValue));
        console.log(betweenDates);
        
        // getBalanceBetweenDates(betweenDates.startDate, betweenDates.endDate);
    }, []);

    

    return {
        appleSpotifyRecord, setAppleSpotifyRecord,
        getAppleSpotifyRecord,

        graphApiData,
        spotifyDataset, setSpotifyDataset,
        appleMusicDataset, setAppleMusicDataset,
        getGraphData,

        songDashAnalytics, setSongDashAnalytics,

        spotifyAndAppleOverview, setSpotifyAndAppleOverview,
        getSportifiyAppleOverview,

        // totalStreamsAndRevenueRecord,
        // getTotalStreamsAndRevenueRecord,

        handleDataRangeData
    }
}
