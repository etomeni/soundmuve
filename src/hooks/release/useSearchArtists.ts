import { useCallback, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { searchedArtistSearchInterface } from '@/constants/typesInterface';


export function useSearchArtists() {
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const [spotifyArtistResults, setSpotifyArtistResults] = useState<searchedArtistSearchInterface[]>([]);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const searchSpotifyArtist = useCallback((searchWord: string) => {
        handleSpotifyArtistSearch(searchWord)
    }, []);


    const handleSpotifyArtistSearch = async (searchWord: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/search/search/spotify`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    artist: searchWord
                }
            })).data;
            console.log(response);

            if (response.length) {
                setSpotifyArtistResults(response);
            } else {
                setSpotifyArtistResults([]);
            }

        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });
        }
    }


    return {
        apiResponse,
        setApiResponse,

        spotifyArtistResults,
        searchSpotifyArtist,
    }
}



