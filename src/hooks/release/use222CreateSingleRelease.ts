import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from "@/state/userStore";
import { convertToBase64, getQueryParams, localApiEndpoint, validateImageArtWork } from "@/util/resources";
// import { getLocalStorage, setLocalStorage } from "@/util/storage";
import { artistInterface, singleRelease1Interface, songArtists_CreativesInterface } from "@/typeInterfaces/release.interface";
import { singleRelease1FormSchema, singleRelease2FormSchema } from "./releaseFormSchema";
import { restCountries } from "@/util/countries";
import { useSettingStore } from "@/state/settingStore";
import { useCreateReleaseStore } from "@/state/createReleaseStore";
// import { cartItemStore } from "@/state/cartStore";

import { musicStores, socialPlatformStores } from '@/util/resources';


const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

export function use222CreateSingleRelease() {
    const navigate = useNavigate();
    const release_id: string = getQueryParams('release_id');
    
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const _handleSetSingleRelease1 = useCreateReleaseStore((state) => state._handleSetSingleRelease1);
    
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const singleRelease = useCreateReleaseStore((state) => state.singleRelease);
    const [soldWorldwide, setSoldWorldwide] = useState(""); // Yes
    const [selectReleaseDateValue, setSelectReleaseDateValue] = useState<any>('');
    const [spotifyReleaseTimezone, setSpotifyReleaseTimezone] = useState<"listener's timezone" | "EST/NYC timezone">("listener's timezone");
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);
    const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<artistInterface>();
    const [selectSoldCountries, setSelectSoldCountries] = useState<string[]>(contriesss);
    

    const singleRelease1Form = useForm({ 
        resolver: yupResolver(singleRelease1FormSchema),
        mode: 'onBlur',
        defaultValues: { 
            soldWorldwide: soldWorldwide,
            releaseTimeHours: "12",
            releaseTimeMinutes: "00",
            releaseTimeHourFormat: "AM",

            language: "Select Language",
            primaryGenre: "Select Primary Genre",
            secondaryGenre: "Select Secondary Genre",
        } 
    });

    const handleSetArtistName = useCallback((details: artistInterface, dspName: "Spotify" | "Apple") => {
        // console.log(details);
        if (dspName == "Spotify") {
            setSelectedSpotifyArtist(details);
            singleRelease1Form.setValue(
                "spotifyArtistProfile", 
                details.name,
                {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
            );
        } else if (dspName == "Apple") {
            
        }

    }, []);

    const handleSoldCountriesSelect = useCallback((selected: string[]) => {
        setSelectSoldCountries(selected);
        singleRelease1Form.setValue("soldWorldwide", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, []);

    
    const submitCreateSingleRelease1 = async (formData: typeof singleRelease1FormSchema.__outputType) => {
        // console.log(formData);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (!formData.spotifyArtistProfile || !selectedSpotifyArtist) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Spotify artist profile name required."
            })

            singleRelease1Form.setError(
                "spotifyArtistProfile", 
                {message: "Spotify artist profile name required."}, 
                {shouldFocus: true}
            );
            return;
        }


        if (formData.language == "Select Language") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a language."
            })

            singleRelease1Form.setError("language", {message: "Please select a language."}, {shouldFocus: true});
            return;
        }

        if (formData.primaryGenre == "Select Primary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select primary genre."
            })

            singleRelease1Form.setError("primaryGenre", {message: "Please select primary genre."}, {shouldFocus: true});
            return;
        }

        if (formData.secondaryGenre == "Select Secondary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select secondary genre."
            })

            singleRelease1Form.setError("secondaryGenre", {message: "Please select secondary genre."}, {shouldFocus: true});
            return;
        }

        if (!formData.releaseDate) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a release date."
            })

            singleRelease1Form.setError("releaseDate", { message: "Please select a release date." }, {shouldFocus: true});

            // document.getElementById("releaseDate")?.focus();
            return;
        }

        if (!soldWorldwide) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select if this release can be sold worldwide?"
            });

            singleRelease1Form.setError("soldWorldwide", {message: "Please select if this release can be sold worldwide?"})
            return;
        }
        
        const data2submit: singleRelease1Interface = {
            release_id: release_id, // optional, only add it when you've created the release and want to edit it.
            title: formData.songTitle,
        
            mainArtist: {
                spotifyProfile: selectedSpotifyArtist,
                appleMusicProfile: formData.appleMusicUrl
            },

            language: formData.language,
            primaryGenre: formData.primaryGenre,
            secondaryGenre: formData.secondaryGenre,
        
            releaseDate: formData.releaseDate,
            spotifyReleaseTime: {
                hours: formData.releaseTimeHours || '',
                minutes: formData.releaseTimeMinutes || '',
                am_pm: formData.releaseTimeHourFormat || ''  // "AM" | "PM"
            },
            spotifyReleaseTimezone: spotifyReleaseTimezone,
        
            labelName: formData.labelName || '', // optional
            recordingLocation: formData.recordingLocation || '', // optional 
        
            soldCountries: {
                worldwide: formData.soldWorldwide || soldWorldwide, // "Yes" | "No",
                countries: soldWorldwide == "Yes" ? [] : selectSoldCountries, // optional if worldwide is Yes
            },
        
            upc_ean: formData.UPC_EANcode || '' // optional
        }
        // console.log(data2submit);

        _handleSetSingleRelease1(data2submit);

        try {
            const response = (await axios.put(
                `${localApiEndpoint}/releases/single/create`,
                data2submit,  
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            // console.log(response);

            if (response.status) {
                _handleSetSingleRelease1(response.result);
                
                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });
    
                navigate("/account/create-single-release-continue");
                return
            }

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, failed to save details. please try again.";
            // console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }

    };



    const _clearSingleRelease = useCreateReleaseStore((state) => state._clearSingleRelease);
    // const _restoreAllRelease = useCreateReleaseStore((state) => state._restoreAllRelease);
    // const _addToCart = cartItemStore((state) => state._addToCart);
    const [openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal] = useState(false);

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<songArtists_CreativesInterface[]>([]);
    const [image, setImage] = useState<Blob | null>(null);
    const [imagePreview, setImagePreview] = useState();
    const [songAudio, setSongAudio] = useState<Blob | null>(null);
    const [songAudioPreview, setSongAudioPreview] = useState<any>();
    const [selectStores, setSelectStores] = useState<string[]>(musicStores);
    const [selectSocialStores, setSelectSocialStores] = useState<string[]>(socialPlatformStores);
    const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    
    const [selectCreativeRoleValue, setSelectCreativeRoleValue] = useState('Choose Roles');
    const [songUploadProgress, setSongUploadProgress] = useState(0);



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

        if (!songAudio) {
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
            songAudio: songAudio,
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
        
        const singleRelease2data2submit = {
            release_id: singleRelease._id || '',
            stores: selectStores,
            socialPlatforms: selectSocialStores,
            singleSong: songDetails,
            coverArt: image || '',
        }
        
        // _setSingleRelease2(release2data);


        const data2submit = new FormData();
        // Append stores and socialPlatforms as comma-separated strings
        data2submit.append('stores', singleRelease2data2submit.stores.join(','));
        data2submit.append('socialPlatforms', singleRelease2data2submit.socialPlatforms.join(','));

        // Append singleSong properties
        // const song = releaseData.singleSong;
        data2submit.append('singleSong[songTitle]', songDetails.songTitle);
        data2submit.append('singleSong[songAudio]', songDetails.songAudio);
        data2submit.append('singleSong[isrcNumber]', songDetails.isrcNumber);
        data2submit.append('singleSong[lyricsLanguage]', songDetails.lyricsLanguage);
        data2submit.append('singleSong[explicitLyrics]', songDetails.explicitLyrics);
        
        // Append optional lyrics
        if (songDetails.lyrics) {
            data2submit.append('singleSong[lyrics]', songDetails.lyrics);
        }

        // Append optional TikTok clip start time
        if (songDetails.tikTokClipStartTime) {
            data2submit.append('singleSong[tikTokClipStartTime][minutes]', songDetails.tikTokClipStartTime.minutes);
            data2submit.append('singleSong[tikTokClipStartTime][seconds]', songDetails.tikTokClipStartTime.seconds);
        }

        // Append song writers as a comma-separated string
        data2submit.append('singleSong[songWriters]', songDetails.songWriters.join(','));

        // Append songArtists_Creatives (array of objects)
        songDetails.songArtists_Creatives.forEach((creative, index) => {
            data2submit.append(`singleSong[songArtists_Creatives][${index}][name]`, creative.name);
            data2submit.append(`singleSong[songArtists_Creatives][${index}][role]`, creative.role);
            
            if (creative.artist) {
                data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][name]`, creative.artist.name);
                data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][id]`, creative.artist.id);
                data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][profilePicture]`, creative.artist.profilePicture);
                if (creative.artist.latestAlbum) {
                    data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][latestAlbum][name]`, creative.artist.latestAlbum.name);
                    data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][latestAlbum][releaseDate]`, creative.artist.latestAlbum.releaseDate);
                    data2submit.append(`singleSong[songArtists_Creatives][${index}][artist][latestAlbum][externalUrl]`, creative.artist.latestAlbum.externalUrl);
                }
            }
        });

        // Append copyright ownership
        data2submit.append('singleSong[copyrightOwnership][coverVersion]', songDetails.copyrightOwnership.coverVersion);
        if (songDetails.copyrightOwnership.permissions) {
            data2submit.append('singleSong[copyrightOwnership][permissions]', songDetails.copyrightOwnership.permissions);
        }

        // Append coverArt (assumed to be a file upload or URL)
        data2submit.append('coverArt', singleRelease2data2submit.coverArt);


        // console.log(data2db);

        try {
            const response = (await axios.patch(
                `${localApiEndpoint}/releases/single/create-update`,
                data2submit,  
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
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
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            setOpenSuccessModal(true);

            // _addToCart({
            //     id: singleRelease1._id,
            //     email: singleRelease1.email,
            //     artistName: singleRelease1.artist_name,
            //     artWorkImg: imagePreview,
            //     price: 25,
            //     releaseType: "Single",
            //     songTitle: singleRelease1.song_title
            // });

            setTimeout(() => {
                navigate("/account/cart");
                setOpenSuccessModal(false);
                _clearSingleRelease();
            }, 1000);
        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, failed to save details. please try again.";
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }

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



    const returnSingleRelease1 = {
        selectReleaseDateValue, setSelectReleaseDateValue,

        spotifyReleaseTimezone, setSpotifyReleaseTimezone,

        soldWorldwide, setSoldWorldwide,
        selectSoldCountries,

        selectedSpotifyArtist,


        singleRelease,
        singleRelease1Form,

        openSearchArtistModal, setOpenSearchArtistModal,

        onSubmitCreateSingleRelease1: singleRelease1Form.handleSubmit(submitCreateSingleRelease1),

        handleSetArtistName,
        handleSoldCountriesSelect,
    }

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

        ...returnSingleRelease1,
        ...returnSingleRelease2,
    }
}