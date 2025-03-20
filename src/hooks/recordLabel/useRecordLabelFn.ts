import { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
// import { getLocalStorage,  } from "@/util/storage";
import { recordLabelArtistInterface } from "@/typeInterfaces/recordLabelArtist.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";
// import { recordLabelArtistInterface } from "@/constants/typesInterface";


export function useRecordLabelFn() {
    const navigate = useNavigate();
    // const userData = useUserStore((state) => state.userData); 

    const [totalArtists, setTotalArtists] = useState(0);
    const [totalSongs, setTotalSongs] = useState(0);
    const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>([]);

    // const [currentPageNo, setCurrentPageNo] = useState(1);
    // const [totalRecords, setTotalRecords] = useState(0);
    // const [totalPages, setTotalPages] = useState(1);

    const getTotalRelease_Artist = useCallback(async () => {
        try {
            const response = (await apiClient.get(`/record-label/total-release-n-artist`)).data;
            // console.log(response);

            if (response.status) {
                setTotalArtists(response.result.totalArtists);
                setTotalSongs(response.result.totalReleases);
            }
        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
        }
    }, []);


    const getAllRecordLabelArtist = useCallback(async (pageNo = 1, limitNo = 20,) => {
        try {
            const response = (await apiClient.get(`/record-label/get-all-artist`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setRecordLabelArtist(response.result);
    
                // setCurrentPageNo(response.result.currentPage);
                // setTotalPages(response.result.totalPages);
                // setTotalRecords(response.result.totalRecords);
            }
    

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
            setRecordLabelArtist([]);
        }
    }, []);
    
    


    const handleNavigation = useCallback((artistData: recordLabelArtistInterface) => {
        // console.log(artistData);
        
        const params = {
            // recordLabelArtist_id: artistData._id,
            _id: artistData._id,
            img: artistData.artistAvatar,
            name: artistData.artistName,
        };
        navigate({
            // pathname: "/account/record-label/artist-analytics",
            pathname: "/account/record-label/artist-songs",
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



