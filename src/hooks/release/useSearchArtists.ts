import { useCallback, useState } from "react";
import { artistInterface } from "@/typeInterfaces/release.interface";
import apiClient, { apiErrorResponse } from "@/util/apiClient";


export function useSearchArtists() {
    const [spotifyArtistResults, setSpotifyArtistResults] = useState<artistInterface[]>([]);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const searchSpotifyArtist = useCallback(async (searchWord: string) => {
        try {
            const response = (await apiClient.get(`/releases/search/spotify-artist`, {
                params: {
                    artistName: searchWord
                }
            })).data;
            // console.log(response);
    
            if (response.status) {
                const result = response.result.length ? response.result : []
                setSpotifyArtistResults(result);
            }
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }
    }, []);


    return {
        apiResponse,
        setApiResponse,

        spotifyArtistResults,
        searchSpotifyArtist,
    }
}
