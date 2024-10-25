import { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { recordLabelArtistInterface } from "@/typeInterfaces/recordLabelArtist.interface";
// import { recordLabelArtistInterface } from "@/constants/typesInterface";


export function useRecordLabelFn() {
    const navigate = useNavigate();
    // const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);

    const [totalArtists, setTotalArtists] = useState(0);
    const [totalSongs, setTotalSongs] = useState(0);
    const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>([]);

    // const [currentPageNo, setCurrentPageNo] = useState(1);
    // const [totalRecords, setTotalRecords] = useState(0);
    // const [totalPages, setTotalPages] = useState(1);

    const getTotalRelease_Artist = useCallback(async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/record-label/total-release-n-artist`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setTotalArtists(response.result.totalArtists);
                setTotalSongs(response.result.totalReleases);
            }
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
        }
    }, []);


    const getAllRecordLabelArtist = useCallback(async (pageNo = 1, limitNo = 20,) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/record-label/get-all-artist`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            console.log(response);

            if (response.status) {
                setRecordLabelArtist(response.result);
                // setLocalStorage("artistsList", response.artists);
    
                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);
            }
    

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setRecordLabelArtist([]);
        }
    }, []);
    
    


    const handleNavigation = useCallback((artistData: recordLabelArtistInterface) => {
        // console.log(artistData);
        
        const params = {
            recordLabelArtist_id: artistData._id,
        };
        navigate({
            pathname: "/account/record-label/artist-analytics",
            search: `?${createSearchParams(params)}`,
        });
        // navigate(options, { replace: true });
    }, []);


    return {
        // getTotalNumberOfArtist,
        getTotalRelease_Artist,
        getAllRecordLabelArtist,
        // getRecordLabelTotalSongs,

        totalArtists,
        totalSongs,
        recordLabelArtist,

        // currentPageNo, totalRecords, totalPages, // pagination variables

        handleNavigation,
    }
}



