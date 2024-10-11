import { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { recordLabelArtistInterface } from "@/constants/typesInterface";


function getLocalArtistsListData() {
    const artistsList = getLocalStorage("artistsList");
    if (artistsList) return artistsList;
}

export function useRecordLabelFn() {
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);

    const [totalArtists, setTotalArtists] = useState('');
    const [totalSongs, setTotalSongs] = useState('');
    const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>(getLocalArtistsListData);


    const _getTotalNumberOfArtist = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/artistsList/count?recordLabelemail=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setTotalArtists(response.count);

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
        }
    };
    const getTotalNumberOfArtist = useCallback(() => {
        _getTotalNumberOfArtist()
    }, []);

    const _getAllRecordLabelArtist = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/artistsList?recordLabelemail=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setRecordLabelArtist(response.artists);
            setLocalStorage("artistsList", response.artists);
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setRecordLabelArtist([]);
        }
    }
    const getAllRecordLabelArtist = useCallback(() => {
        _getAllRecordLabelArtist()
    }, []);
    
    const _getRecordLabelTotalSongs = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/songs/count?email=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setTotalSongs(response.count);
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
        }
    }
    const getRecordLabelTotalSongs = useCallback(() => {
        _getRecordLabelTotalSongs()
    }, []);


    const handleNavigation = useCallback((artistData: recordLabelArtistInterface) => {
        // console.log(artistData);
        
        const params = {
            artistName: artistData.artistName,
        };
        navigate({
            pathname: "/account/record-label/artist-analytics",
            search: `?${createSearchParams(params)}`,
        });
        // navigate(options, { replace: true });
    }, []);


    return {
        getTotalNumberOfArtist,
        getAllRecordLabelArtist,
        getRecordLabelTotalSongs,

        totalArtists,
        totalSongs,
        recordLabelArtist,

        handleNavigation,
    }
}



