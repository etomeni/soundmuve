import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/state/userStore";
import { emekaApiEndpoint } from "@/util/resources";
import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { releaseInterface } from '@/constants/typesInterface';


function getLocalSingleRelease() {
    const localResponds = getLocalStorage("singleRelease");
    if (localResponds && localResponds.length) return localResponds;
    return undefined
}

export function useGetReleases() {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    // const [singleRelease, setSingleRelease] = useState<any[]>();

    const [releases, setReleases] = useState<releaseInterface[]>(getLocalSingleRelease);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    
    useEffect(() => {
        getSingleRelease();
    }, []);


    const getSingleRelease = useCallback(() => {
        _getSingleRelease()
    }, []);
    const _getSingleRelease = async () => {
        const localResponds = getLocalStorage("allSingleReleases");
        if (localResponds && localResponds.length) setReleases(localResponds);

        try {
            const response = (await axios.get(`${emekaApiEndpoint}/Release/getReleaseByEmail/${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            setLocalStorage("allSingleReleases", response);
            setReleases(response);
            // setSingleRelease(response);

            if (!response.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "You don't have any single Release yet."
                });
            }

        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);

            setReleases([]);
            // setSingleRelease([]);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }


    const getAlbumRelease = useCallback(() => {
        _getAlbumRelease()
    }, []);
    const _getAlbumRelease = async () => {
        const localResponds = getLocalStorage("allAlbumReleases");
        if (localResponds && localResponds.length) setReleases(localResponds);

        try {
            // const response = (await axios.get(`${emekaApiEndpoint}/songs/GetMyAlbumsByEmail?email=latham01@yopmail.com`, {
            const response = (await axios.get(`${emekaApiEndpoint}/songs/GetMyAlbumsByEmail?email=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setLocalStorage("allAlbumReleases", response.albums);
            setReleases(response.albums);

            if (!response.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "You don't have any single Release yet."
                });
            }

        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }


    return {
        apiResponse,
        setApiResponse,

        releases,
        setReleases,

        getSingleRelease,
        getAlbumRelease,
    }
}
