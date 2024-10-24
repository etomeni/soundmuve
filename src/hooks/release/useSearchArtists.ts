import axios from "axios";
import { useCallback, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { apiEndpoint } from "@/util/resources";
import { artistInterface } from "@/typeInterfaces/release.interface";


export function useSearchArtists() {
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const [spotifyArtistResults, setSpotifyArtistResults] = useState<artistInterface[]>([]);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const searchSpotifyArtist = useCallback(async (searchWord: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/releases/search/spotify-artist`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
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
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
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
