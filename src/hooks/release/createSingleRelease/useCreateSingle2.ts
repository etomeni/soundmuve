import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { convertToBase64, getQueryParams, validateImageArtWork } from "@/util/resources";
import { artistInterface, songArtists_CreativesInterface } from "@/typeInterfaces/release.interface";
import { singleRelease2FormSchema } from "../releaseFormSchema";
import { useSettingStore } from "@/state/settingStore";
import { useCreateReleaseStore } from "@/state/createReleaseStore";
import { musicStores, socialPlatformStores } from '@/util/resources';
import apiClient, { apiErrorResponse } from "@/util/apiClient";
// import { useCart } from "@/hooks/useCart";
// import { useCartItemStore } from "@/state/cartStore";


export function useCreateSingleRelease2() {
    const navigate = useNavigate();
    const singleRelease = useCreateReleaseStore((state) => state.singleRelease);
    const _handleSetSingleRelease2 = useCreateReleaseStore((state) => state._handleSetSingleRelease2);
    // const _handleClearSingleRelease = useCreateReleaseStore((state) => state._handleClearSingleRelease);

    const release_id: string = singleRelease._id || getQueryParams('release_id');
    
    // const userData = useUserStore((state) => state.userData);
    // const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    // const { handleAddToCart } = useCart();

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    // const _clearSingleRelease = useCreateReleaseStore((state) => state._clearSingleRelease);
    // const _addToCart = cartItemStore((state) => state._addToCart);
    const [openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<songArtists_CreativesInterface[]>([]);
    const [image, setImage] = useState<Blob | null>(null);
    const [imagePreview, setImagePreview] = useState<any>();
    const [songAudio, setSongAudio] = useState<Blob | null>(null);
    const [songAudioPreview, setSongAudioPreview] = useState<any>();
    const [selectStores, setSelectStores] = useState<string[]>(musicStores);
    const [selectSocialStores, setSelectSocialStores] = useState<string[]>(socialPlatformStores);
    const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    
    const [selectCreativeRoleValue, setSelectCreativeRoleValue] = useState('Choose Roles');
    const [songUploadProgress, setSongUploadProgress] = useState(0);
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);

    const [submittedFormData, setSubmittedFormData] = useState<FormData>();
    const [preSaveModal, setPreSaveModal] = useState(false);
    // const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<artistInterface>();


    const singleRelease2Form = useForm({ 
        resolver: yupResolver(singleRelease2FormSchema),
        mode: 'onBlur', reValidateMode: 'onChange', 
        defaultValues: { 
            // store: "All",
            // socialPlatform: "All",
            lyricsLanguage: "English",
            tikTokClipStartTime_Minutes: "00",
            tikTokClipStartTime_Seconds: "00",
        } 
    });


    const getReleaseById = useCallback(async (release_id: string) => {
        try {
            const response = (await apiClient.get(`/releases/${release_id}`, {
                params: {
                    release_id: release_id,
                }
            })).data;
            // console.log(response);

            if (response.status) {
                _handleSetSingleRelease2(response.result);
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


    const restoreValues = () => {
        if (singleRelease.songs.length) {
            setSongWriters(singleRelease.songs[0].songWriters);
        }

        if (singleRelease.songs.length) {
            setSongArtists_Creatives(singleRelease.songs[0].songArtists_Creatives);
        }

        if (singleRelease.songs.length) {
            setExplicitLyrics(singleRelease.songs[0].explicitLyrics);

            singleRelease2Form.setValue(
                "explicitSongLyrics", singleRelease.songs[0].explicitLyrics,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.songs.length) {
            setCopyrightOwnership(`${singleRelease.songs[0].copyrightOwnership.coverVersion}`);

            singleRelease2Form.setValue(
                "copyrightOwnership", `${singleRelease.songs[0].copyrightOwnership.coverVersion}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }

        if (singleRelease.songs.length) {
            setCopyrightOwnershipPermission(`${singleRelease.songs[0].copyrightOwnership.permissions}`);

            singleRelease2Form.setValue(
                "copyrightOwnershipPermission", `${singleRelease.songs[0].copyrightOwnership.permissions}`,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            singleRelease2Form.setValue(
                "ISRC_Number", singleRelease.songs[0].isrcNumber,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            singleRelease2Form.setValue(
                "lyricsLanguage", singleRelease.songs[0].lyricsLanguage,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            singleRelease2Form.setValue(
                "songLyrics", singleRelease.songs[0].lyricsLanguage,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            singleRelease2Form.setValue(
                "tikTokClipStartTime_Minutes", singleRelease.songs[0].tikTokClipStartTime?.minutes,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            singleRelease2Form.setValue(
                "tikTokClipStartTime_Seconds", singleRelease.songs[0].tikTokClipStartTime?.seconds,
                { shouldDirty: true, shouldTouch: true, shouldValidate: true }
            );
        }
        
        if (singleRelease.songs.length) {
            setSongAudioPreview(singleRelease.songs[0].songAudio);
        }
        
        if (singleRelease.coverArt) {
            setImagePreview(singleRelease.coverArt);
        }
        
        if (singleRelease.stores.length) {
            setSelectStores(singleRelease.stores);
        }
        
        if (singleRelease.socialPlatforms.length) {
            setSelectSocialStores(singleRelease.socialPlatforms);
        }
    }
        
    const handleAudioFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        // const file = e.target.files[0]; 
        const file = e.target.files?.[0];
        if (!file) return;
        setSongAudio(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setSongAudioPreview(fileReader.result);
        }
        
        e.target.value = "";
    }
        
    const handleImageFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        // const file = e.target.files[0]; 
        const file = e.target.files?.[0];
        if (!file) return;
        
        const validateResult = await validateImageArtWork(file);
        setApiResponse(validateResult);
        if (!validateResult.status) return;
    
        const base64 = await convertToBase64(file);
        if (base64.status && base64.result) {
            setImage(file);
            setImagePreview(base64.result);
        } else {
            setImage(null);
            setImagePreview(undefined);
        }
    
        e.target.value = "";
    }

    const handleStoreSelect = (selected: string[]) => {
        setSelectStores(selected);
        singleRelease2Form.setValue("store", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }

    const handleSocialStoreSelect = (selected: string[]) => {
        setSelectSocialStores(selected);
        singleRelease2Form.setValue("socialPlatform", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }

    const handleSetArtistName2 = (details: artistInterface, dspName: "Spotify" | "Apple") => {
        // console.log(details);
        if (dspName == "Spotify") {
            // setSelectedSpotifyArtist(details)
            singleRelease2Form.setValue(
                "artistCreativeName", 
                details.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
            handleAddMoreCreatives(details)
        } else if (dspName == "Apple") {
            
        }

        return;
    }

    const handleAddMoreCreatives = (details?: artistInterface) => {
        const name = singleRelease2Form.getValues("artistCreativeName");
        const role = selectCreativeRoleValue; // getValues("songArtistsCreativeRole");
        if (!name) return;
            
        if (!role || role == 'Choose Roles') {
            _setToastNotification({
                display: true,
                status: "warning",
                message: `Please select ${ name } Role in creating this song.`
            })

            singleRelease2Form.setError("songArtistsCreativeRole", {message: `Please select ${ name } Role in creating this song.`});
            return;
        }

        // const newCreatives = [ ...songArtists_Creatives, { name, role } ];
        const newCreatives:songArtists_CreativesInterface[] = [ 
            ...songArtists_Creatives, 
            { name, role, artist: details } 
        ];
        setSongArtists_Creatives(newCreatives);
        singleRelease2Form.resetField("artistCreativeName");
        singleRelease2Form.resetField("songArtistsCreativeRole");
        setSelectCreativeRoleValue('Choose Roles');
        document.getElementById("songArtistsCreativeRole")?.focus();
    }

    const submitCreateSingleRelease2 = async (formData: typeof singleRelease2FormSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        if (formData.store && formData.store == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select stores to distribute your music to."
            })

            singleRelease2Form.setError(
                "store", 
                {message: "Select stores to distribute your music to."},
                { shouldFocus: true }
            );
            return;
        }

        if (formData.socialPlatform && formData.socialPlatform == "Select" ) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Select social platforms to distribute your music to."
            })

            singleRelease2Form.setError(
                "socialPlatform", 
                { message: "Select social platforms to distribute your music to." },
                { shouldFocus: true }
            );
            return;
        }

        if (formData.songWriter) {
            const newWritter = [ ...songWriters, formData.songWriter ];
            setSongWriters(newWritter);
            singleRelease2Form.resetField("songWriter");
        } else {
            if (!songWriters.length) {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: "Please add a song writer."
                })
    
                singleRelease2Form.setError(
                    "songWriter", 
                    { message: "Please add a song writer." },
                    { shouldFocus: true }
                )
                return;
            }
        }


        if (formData.artistCreativeName) {
            if (formData.songArtistsCreativeRole && formData.songArtistsCreativeRole != 'Choose Roles') {
                const newData: songArtists_CreativesInterface = {
                    name: formData.artistCreativeName,
                    role: formData.songArtistsCreativeRole,
                };
    
                const newCreatives = [ ...songArtists_Creatives, newData ];
                setSongArtists_Creatives(newCreatives);
    
                setTimeout(() => {
                    singleRelease2Form.resetField("artistCreativeName");
                    singleRelease2Form.resetField("songArtistsCreativeRole");
                    setSelectCreativeRoleValue("Choose Roles");
                }, 500);
            } else {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: `Please choose ${formData.artistCreativeName} role for this song.`,
                })
    
                singleRelease2Form.setError(
                    "songArtistsCreativeRole", 
                    { message: `Please choose ${formData.artistCreativeName} role for this song.` },
                    // "Please add artists & creatives that worked on this song."
                    { shouldFocus: true }
                )
                return;
            }
        } else {
            if (!songArtists_Creatives.length) {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: "Please add artists & creatives that worked on this song."
                })
    
                singleRelease2Form.setError(
                    "artistCreativeName", 
                    { message: "Please add artists & creatives that worked on this song." },
                    { shouldFocus: true }
                )
                return;
            }
        }

        if (!explicitLyrics) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please choose if this song has explicit lyrics."
            })

            singleRelease2Form.setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
            return;
        }

        if (!copyrightOwnership) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Copyright Ownership: Select if this song is a cover version of another song?"
            });

            singleRelease2Form.setError(
                "copyrightOwnership", 
                { message: "Select if this song is a cover version of another song?"},
                { shouldFocus: true }
            );
            return;
        }

        if (copyrightOwnership == "Yes" && copyrightOwnershipPermission != "Yes") {
            _setToastNotification({
                display: true,
                status: "error",
                // message: "Copyright Ownership Permission::: Select if this song is a cover version of another song?"
                message: "Copyright Ownership Permission is required."
            })

            setOpenCopyrightOwnershipModal(true);

            singleRelease2Form.setError(
                "copyrightOwnershipPermission", 
                { message: "Copyright Ownership Permission is required." },
                { shouldFocus: true }
            );
            return;
        }

        if (!songAudioPreview) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please upload the song."
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: "Please upload the song."
            })

            return;
        }

        // if (!image) {
        //     setApiResponse({
        //         display: true,
        //         status: false,
        //         message: "Please upload song cover."
        //     });

        //     _setToastNotification({
        //         display: true,
        //         status: "error",
        //         message: "Please upload song cover."
        //     })

        //     return;
        // }

        const songDetails = {
            // _id: '',
            songAudio: '', // songAudio,
            songTitle: singleRelease.title,
        
            songWriters: songWriters,
            songArtists_Creatives: songArtists_Creatives,
            copyrightOwnership: {
                coverVersion: copyrightOwnership, // "Yes" | "No",
                permissions: copyrightOwnershipPermission || '', // "Yes" | "No",
            },
            explicitLyrics: explicitLyrics,
        
            isrcNumber: formData.ISRC_Number || '',
        
            lyricsLanguage: formData.lyricsLanguage || '',
            lyrics: formData.songLyrics || '', // optional
        
            tikTokClipStartTime: {  // optional
                minutes: formData.tikTokClipStartTime_Minutes || '',
                seconds: formData.tikTokClipStartTime_Seconds || '',
            },
        };
        
        const singleRelease2data2submit: any = {
            release_id: release_id,
            stores: selectStores,
            socialPlatforms: selectSocialStores,
            // singleSong: songDetails,
            songs: [songDetails],
            coverArt: "" // image,`
        }

        _handleSetSingleRelease2(singleRelease2data2submit);


        const data2submit = new FormData();
        // Append stores and socialPlatforms as comma-separated strings
        data2submit.append('release_id', singleRelease2data2submit.release_id);
        data2submit.append('stores', JSON.stringify(singleRelease2data2submit.stores));
        data2submit.append('socialPlatforms', JSON.stringify(singleRelease2data2submit.socialPlatforms));

        // Append songs properties
        data2submit.append('songDetails', JSON.stringify(songDetails));
        // data2submit.append('songAudio', songAudio);
        if (songAudio) data2submit.append('songAudio', songAudio);
        // Append coverArt (assumed to be a file upload or URL)
        if (image) data2submit.append('coverArt', image);

        // console.log(data2db);
        setSubmittedFormData(data2submit);
        // setPreSaveModal(true);

        try {
            const response = (await apiClient.patch(
                `/releases/single/create-update`,
                data2submit,  
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        // Authorization: `Bearer ${accessToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            setSongUploadProgress(percentage);
                        }
                    },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                // setReleaseData(response.result);
                _handleSetSingleRelease2(response.result);

                // const result: releaseInterface = response.result;
                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });

                setPreSaveModal(true);


                // setOpenSuccessModal(true);

                // handleAddToCart({
                //     release_id: result._id || '',
                //     user_email: userData.email,
                //     user_id: userData._id || '',
                //     artistName: result.mainArtist.spotifyProfile.name,
                //     coverArt: result.coverArt,
                //     price: 25,
                //     preSaveAmount: 0,
                //     releaseType: result.releaseType,
                //     title: result.title 
                // });

                // setTimeout(() => {
                //     setPreSaveModal(true);

                //     navigate("/account/cart");
                //     setOpenSuccessModal(false);
                //     // clear the release from memory and rest the state
                //     _handleClearSingleRelease();
                // }, 1000);
                return;
            }
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, failed to save details. please try again.", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }

    }

    // const handleSubmitData = async (data2submit: FormData, preOrderState: boolean) => {
    //     setIsFormSubmitting(true);

    //     try {
    //         const response = (await apiClient.patch(
    //             `/releases/single/create-update`,
    //             data2submit,  
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                     Authorization: `Bearer ${accessToken}`
    //                 },
    //                 onUploadProgress: (progressEvent) => {
    //                     const loaded = progressEvent.loaded;
    //                     const total = progressEvent.total || 0;
    //                     const percentage = Math.floor((loaded * 100) / total );

    //                     if (percentage < 100) {
    //                         setSongUploadProgress(percentage);
    //                     }
    //                 },
    //             }
    //         )).data;
    //         // console.log(response);
    //         setIsFormSubmitting(false);

    //         if (response.status) {
    //             const result: releaseInterface = response.result;
    //             _setToastNotification({
    //                 display: true,
    //                 status: "success",
    //                 message: response.message
    //             });

    //             setOpenSuccessModal(true);

    //             handleAddToCart({
    //                 release_id: result._id || '',
    //                 user_email: userData.email,
    //                 user_id: userData._id || '',
    //                 artistName: result.mainArtist.spotifyProfile.name,
    //                 coverArt: result.coverArt,
    //                 price: 25,
    //                 preSaveAmount: preOrderState ? 20 : 0,
    //                 releaseType: result.releaseType,
    //                 title: result.title 
    //             });

    //             setTimeout(() => {
    //                 navigate(`account/create-release-preorder/${result._id}?releaseType=${result.releaseType}`);
    //                 // navigate("/account/cart");
    //                 setOpenSuccessModal(false);

    //                 // clear the release from memory and rest the state
    //                 // _handleClearSingleRelease();
    //             }, 1000);
    //             return;
    //         }
            
    //         setApiResponse({
    //             display: true,
    //             status: true,
    //             message: response.message
    //         });
    //     } catch (error: any) {
    //         setIsFormSubmitting(false);
    //         const err = error.response && error.response.data ? error.response.data : error;
    //         const fixedErrorMsg = "Oooops, failed to save details. please try again.";
    //         console.log(err);

    //         setApiResponse({
    //             display: true,
    //             status: false,
    //             message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
    //         });
    //     }
    // }


    const returnSingleRelease2 = {
        singleRelease,
        songWriters, setSongWriters, 
        songArtists_Creatives, setSongArtists_Creatives,
        songAudioPreview, setSongAudioPreview, setSongAudio,
        imagePreview, // setImagePreview,

        openSuccessModal, setOpenSuccessModal,
        openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal,

        copyrightOwnership, setCopyrightOwnership,
        copyrightOwnershipPermission, setCopyrightOwnershipPermission,
        selectStores, // setSelectStores,
        selectSocialStores, // setSelectSocialStores,
        explicitLyrics, setExplicitLyrics,
        selectCreativeRoleValue, setSelectCreativeRoleValue,

        songUploadProgress,
        singleRelease2Form,

        handleAudioFileUpload, handleImageFileUpload,
        handleStoreSelect, handleSocialStoreSelect,

        onSubmitCreateSingleRelease2: singleRelease2Form.handleSubmit(submitCreateSingleRelease2),

        handleSetArtistName2,
        handleAddMoreCreatives,
    }

    return {
        apiResponse, setApiResponse,
        navigate,

        openSearchArtistModal, setOpenSearchArtistModal,
        // releaseData,

        submittedFormData,
        preSaveModal, setPreSaveModal,
        // handleSubmitData,
        isFormSubmitting, setIsFormSubmitting,

        getReleaseById,
        restoreValues,

        ...returnSingleRelease2,
    }
}
