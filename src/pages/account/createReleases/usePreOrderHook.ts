import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { useUserStore } from "@/state/userStore";
import { getQueryParams, apiEndpoint } from "@/util/resources";
import { releaseInterface, songInterface } from "@/typeInterfaces/release.interface";
import { useSettingStore } from "@/state/settingStore";
import { useCreateReleaseStore } from "@/state/createReleaseStore";
import { useCart } from "@/hooks/useCart";
// import { useCartItemStore } from "@/state/cartStore";


export function usePreOrderHook() {
    const navigate = useNavigate();
    // const singleRelease = useCreateReleaseStore((state) => state.singleRelease);
    // const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    // const _handleSetSingleRelease2 = useCreateReleaseStore((state) => state._handleSetSingleRelease2);

    const _handleClearSingleRelease = useCreateReleaseStore((state) => state._handleClearSingleRelease);
    const _handleClearAlbumRelease = useCreateReleaseStore((state) => state._handleClearAlbumRelease);

    const releaseType: string = getQueryParams('releaseType');
    // const {release_id} = useParams();
    
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const { handleAddToCart } = useCart();

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [preOrderChannel, setPreOrderChannel] = useState<string>();
    const [preOrderDate, setPreOrderDate] = useState<string>();
    const [preOrderTrackPreview, setPreOrderTrackPreview] = useState<songInterface>();
    const [preOrderPrice, setPreOrderPrice] = useState<string>();
    const [trackPrice, setTrackPrice] = useState<string>();

    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    
    const [preSaveModal, setPreSaveModal] = useState(false);
    // const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<artistInterface>();
    const [releaseData, setReleaseData] = useState<releaseInterface>();


    const getReleaseById = useCallback(async (release_id: string) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/releases/${release_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    release_id: release_id,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleaseData(response.result);
            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const updateReleaseStatusById = useCallback(async (
        release_id: string, release_status: 'Incomplete' | 'Unpaid' | 'Processing' | 'Pre-Saved' | 'Live' | 'Failed'
    ) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/releases/update-status/${release_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    status: release_status,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleaseData(response.result);
            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            _setToastNotification({
                display: true,
                status: "info",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const updateReleaseDateById = useCallback(async (
        release_id: string, release_date: string,
        successFn = () => {}
    ) => {
        try {
            const response = (await axios.get(`${apiEndpoint}/releases/update-releaseDate/${release_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    releaseDate: release_date,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                setReleaseData(response.result);

                successFn();
            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            _setToastNotification({
                display: true,
                status: "info",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);

    const handleSkipPreOrder = (releaseDetails: releaseInterface) => {
        setOpenSuccessModal(true);

        handleAddToCart({
            release_id: releaseDetails._id || '',
            user_email: userData.email,
            user_id: releaseDetails._id || '',
            artistName: releaseDetails.mainArtist.spotifyProfile.name,
            coverArt: releaseDetails.coverArt,
            price: releaseDetails.releaseType == "single" ? 25 : 45,
            preSaveAmount: 0,
            releaseType: releaseDetails.releaseType,
            title: releaseDetails.title 
        });

        updateReleaseStatusById(`${releaseDetails._id}`, "Unpaid");

        setTimeout(() => {
            navigate("/account/cart");
            setOpenSuccessModal(false);

            // clear the release from memory and rest the state
            _handleClearSingleRelease();
        }, 1000);
    }


    const submitPreOrderRelease = useCallback(async (
        release_id: string,
        preOrder: {
            status: boolean,
            preOrderChannel: string,
            preOrderStartDate: string,
            preOrderTrackPreview: {
                song_id: string;
                songTitle: string;
            },
            trackPrice: number,
            preOrderPrice: number,
        },
        successFn = () => {}
    ) => {
        setIsFormSubmitting(true);

        try {
            const response = (await axios.post(`${apiEndpoint}/releases/update-preOrder/${release_id}`, 
                {...preOrder},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);
            setIsFormSubmitting(false);

            if (response.status) {
                successFn();
                
                const result: releaseInterface = response.result;
                setReleaseData(result);

                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });

                setOpenSuccessModal(true);

                handleAddToCart({
                    release_id: result._id || '',
                    user_email: userData.email,
                    user_id: userData._id || '',
                    artistName: result.mainArtist.spotifyProfile.name,
                    coverArt: result.coverArt,
                    price: result.releaseType == "single" ? 25 : 45,
                    preSaveAmount: 20,
                    releaseType: result.releaseType,
                    title: result.title 
                });


                setTimeout(() => {
                    navigate("/account/cart");
                    setOpenSuccessModal(false);

                    // clear the release from memory and rest the state
                    if (releaseType == "single") {
                        _handleClearSingleRelease();
                    } else {
                        _handleClearAlbumRelease();
                    }
                }, 1000);

            }

        } catch (error: any) {
            const err = error.response && error.response.data ? error.response.data : error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);
            // setReleases([]);
            setIsFormSubmitting(false);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });

            _setToastNotification({
                display: true,
                status: "info",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }, []);


    return {
        apiResponse, setApiResponse,
        navigate,

        preSaveModal, setPreSaveModal,
        isFormSubmitting, setIsFormSubmitting,

        preOrderChannel, setPreOrderChannel,
        preOrderDate, setPreOrderDate,
        preOrderTrackPreview, setPreOrderTrackPreview,
        preOrderPrice, setPreOrderPrice,
        trackPrice, setTrackPrice,

        releaseData,
        getReleaseById,
        handleSkipPreOrder,
        updateReleaseDateById,
        submitPreOrderRelease,
        openSuccessModal, setOpenSuccessModal,
    }
}
