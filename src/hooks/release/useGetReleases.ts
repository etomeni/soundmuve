import { useCallback, useState } from "react";
// import { useUserStore } from "@/state/userStore";
import { releaseInterface } from "@/typeInterfaces/release.interface";
// import { useSettingStore } from "@/state/settingStore";
import apiClient, { apiErrorResponse } from "@/util/apiClient";

export function useGetReleases() {
    // const accessToken = useUserStore((state) => state.accessToken);

    const [limitNo, setLimitNo] = useState(25);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [releaseDetails, setReleaseDetails] = useState<releaseInterface>();
    const [releases, setReleases] = useState<releaseInterface[]>();
    const [singleReleases, setSingleReleases] = useState<releaseInterface[]>();
    const [albumReleases, setAlbumReleases] = useState<releaseInterface[]>();

    const [rlArtistSongsData, setRlArtistSongsData] = useState({
        revenue: '0',
        single: '0',
        album: "0"
    });

    // const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    const getReleases = useCallback(async (pageNo: number, limitNo: number, releaseType: 'single' | 'album') => {
        // const localResponds = getLocalStorage("allSingleReleases");
        // if (localResponds && localResponds.length) setReleases(localResponds);

        setIsSubmitting(true);

        if (pageNo == 1 || !releases) {
            if (releaseType == "album" && albumReleases?.length) setReleases(albumReleases);
            if (releaseType == "single" && singleReleases?.length) setReleases(singleReleases);
        }

    
        try {
            const response = (await apiClient.get(`/releases`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                    releaseType
                }
            })).data;
            // console.log(response);

            if (response.status) {
                if (pageNo == 1 || !releases) {
                    setReleases(response.result.relases);
    
                    if (releaseType == "single") setSingleReleases(response.result.relases);
                    if (releaseType == "album") setAlbumReleases(response.result.relases);

                    return;
                }


                const oldReleases = releases ? releases : [];
                setReleases([ ...oldReleases, ...response.result.relases ]);

                const oldSingleReleases = singleReleases ? singleReleases : [];
                const oldAlbumReleases = albumReleases ? albumReleases : [];
                if (releaseType == "single") setSingleReleases([ ...oldSingleReleases, ...response.result.relases ]);
                if (releaseType == "album") setAlbumReleases([ ...oldAlbumReleases, ...response.result.relases ]);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }

    
            if (!response.result.relases.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "You don't have any single Release yet."
                });
            }
    
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const getRL_ArtistReleases = useCallback(async (artist_id: string, pageNo: number, limitNo: number) => {
        // const localResponds = getLocalStorage("allSingleReleases");
        // if (localResponds && localResponds.length) setReleases(localResponds);

        // setIsSubmitting(true);

        try {
            const response = (await apiClient.get(`/releases/rl-artist`, {
                params: {
                    page: pageNo,
                    limit: limitNo,
                    artist_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleases(response.result.relases);

                setCurrentPageNo(response.result.currentPage);
                setTotalPages(response.result.totalPages);
                setTotalRecords(response.result.totalRecords);
            }

    
            if (!response.result.relases.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "You don't have any single Release yet."
                });
            }
    
            setIsSubmitting(false);
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });

            setIsSubmitting(false);
        }
    }, []);

    const getRL_ArtistReleaseData = useCallback(async (artist_id: string) => {
        try {
            const response = (await apiClient.get(`/releases/rl-artist-data`, {
                params: {
                    artist_id
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setRlArtistSongsData(response.result);
            }

        } catch (error: any) {
            apiErrorResponse(error, "Oooops, something went wrong", false);
        }
    }, []);


    const getReleaseById = useCallback(async (release_id: string) => {
        try {
            const response = (await apiClient.get(`/releases/${release_id}`, {
                params: {
                    release_id: release_id,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleaseDetails(response.result);
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

    const deleteReleaseById = useCallback(async (release_id: string, successFn = (_res: any) => {}) => {
        try {
            const response = (await apiClient.delete(`/releases/${release_id}`, {
                params: {
                    release_id: release_id,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                successFn(response.result)
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
        apiResponse, setApiResponse,

        limitNo, setLimitNo,
        currentPageNo, totalRecords,
        totalPages,

        isSubmitting,

        releaseDetails,
        singleReleases, albumReleases,
        releases, getReleases,
        getRL_ArtistReleases,
        getReleaseById,

        rlArtistSongsData,
        getRL_ArtistReleaseData,

        deleteReleaseById,
    }
}
