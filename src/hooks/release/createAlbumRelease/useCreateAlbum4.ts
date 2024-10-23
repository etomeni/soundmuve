import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { artistInterface, songArtists_CreativesInterface } from '@/typeInterfaces/release.interface';
import { apiEndpoint, pauseExecution } from '@/util/resources';
import { albumRelease4FormSchema } from '../releaseFormSchema';


export function useCreateAlbum4() {
    const navigate = useNavigate();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);
    const _handleSetAlbumRelease4 = useCreateReleaseStore((state) => state._handleSetAlbumRelease4);
    const _removeAlbumReleaseSongUpload = useCreateReleaseStore((state) => state._removeAlbumReleaseSongUpload);

    const accessToken = useUserStore((state) => state.accessToken);

    const [openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal] = useState(false);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<songArtists_CreativesInterface[]>([]);
    const [songAudio, setSongAudio] = useState<any>();
    const [songAudioPreview, setSongAudioPreview] = useState<any>();
    const [selectRoleValue, setSelectRoleValue] = useState('Choose Roles');
    const [selectLyricsLanguageValue, setSelectLyricsLanguageValue] = useState('English');
    const [selectTiktokMinValue, setSelectTiktokMinValue] = useState('00');
    const [selectTiktokSecValue, setSelectTiktokSecValue] = useState('00');

    const [songEditId, setSongEditId] = useState('');
    const [songUploadProgress, setSongUploadProgress] = useState(0);
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);

    const { 
        handleSubmit, register, getValues, setError, setValue, resetField, setFocus, reset, 
        formState: { errors, isSubmitting, isValid } 
    } = useForm({ 
        resolver: yupResolver(albumRelease4FormSchema),
        mode: 'onBlur', reValidateMode: 'onChange', 
        defaultValues: { 
            lyricsLanguage: "English",
            tikTokClipStartTime_Minutes: "00",
            tikTokClipStartTime_Seconds: "00",
        } 
    });
            
    const handleEdit = (i: number) => {
        // const songData = albumReleaseSongUpload[i];

        if (!albumRelease.albumSongs) return;
        const songData = albumRelease.albumSongs[i];

        setValue("songTitle", songData.songTitle, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("ISRC_Number", songData.isrcNumber, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("songLyrics", songData.lyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

        setSongAudio('');
        setSongAudioPreview(songData.songAudio);

        setSongWriters(songData.songWriters);
        setSongArtists_Creatives(songData.songArtists_Creatives);

        setExplicitLyrics(songData.explicitLyrics);
        setValue("explicitSongLyrics", songData.explicitLyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true})

        setSelectLyricsLanguageValue(songData.lyricsLanguage);
        setValue("lyricsLanguage", songData.lyricsLanguage, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

        setCopyrightOwnership(songData.copyrightOwnership.coverVersion);
        setValue("copyrightOwnership", songData.copyrightOwnership.coverVersion);
        setCopyrightOwnershipPermission(songData.copyrightOwnership.permissions || '');
        setValue("copyrightOwnershipPermission", songData.copyrightOwnership.permissions || '');

        setValue("tikTokClipStartTime_Minutes", songData.tikTokClipStartTime?.minutes || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("tikTokClipStartTime_Seconds", songData.tikTokClipStartTime?.seconds || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setSelectTiktokMinValue(songData.tikTokClipStartTime?.minutes || '');
        setSelectTiktokSecValue(songData.tikTokClipStartTime?.seconds || '');

        setSongEditId(songData._id || "");

        _removeAlbumReleaseSongUpload(i);
    }

    const handleAudioFileUpload = async (e: any) => {
        setSongAudio(undefined);
        setSongAudioPreview(undefined);
        await pauseExecution(200);

        const file = e.target.files[0]; 
        setSongAudio(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setSongAudioPreview(fileReader.result);
        }
        
        e.target.value = "";
    }


    const handleNextBTN = useCallback(() => {
        if (albumRelease.albumSongs?.length) {
            navigate("/account/create-album-release-album-art");

        } else {
            _setToastNotification({
                display: true,
                status: "warning",
                message: "Please add a songs to proceed."
            });
        }
    }, []);

    const onSubmit = async (formData: typeof albumRelease4FormSchema.__outputType) => {  
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        if (formData.songWriter) {
            const newWritter = [ ...songWriters, formData.songWriter ];
            setSongWriters(newWritter);

            setTimeout(() => {
                resetField("songWriter");
            }, 500);
        } else {
            if (!songWriters.length) {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: "Please add a song writer."
                })
    
                setError(
                    "songWriter", 
                    { message: "Please add a song writer." },
                    { shouldFocus: true }
                )
                return;
            }
        }

        if (formData.artistCreativeName) {
            if (formData.songArtistsCreativeRole && formData.songArtistsCreativeRole != 'Choose Roles') {
                const newData = {
                    name: formData.artistCreativeName,
                    role: formData.songArtistsCreativeRole,
                };
    
                const newCreatives = [ ...songArtists_Creatives, newData ];
                setSongArtists_Creatives(newCreatives);
    
                setTimeout(() => {
                    resetField("artistCreativeName");
                    resetField("songArtistsCreativeRole");
                    setSelectRoleValue("Choose Roles");
                }, 500);
            } else {
                _setToastNotification({
                    display: true,
                    status: "error",
                    message: `Please choose ${formData.artistCreativeName} role for this song.`,
                })
    
                setError(
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
    
                setError(
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

            setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
            return;
        }

        if (!copyrightOwnership) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Copyright Ownership::: Select if this song is a cover version of another song?"
            })

            setError("copyrightOwnership", {message: "Select if this song is a cover version of another song?"})
            return;
        }

        if (copyrightOwnership == "Yes" && copyrightOwnershipPermission != "Yes") {
            _setToastNotification({
                display: true,
                status: "error",
                // message: "Copyright Ownership Permission::: Select if this song is a cover version of another song?"
                message: "Copyright Ownership Permission is required."
            });
            setOpenCopyrightOwnershipModal(true);

            setError(
                "copyrightOwnershipPermission", 
                { message: "Copyright Ownership Permission is required." },
                { shouldFocus: true }
            );

            return;
        }

        if (!songAudio && !songEditId) {
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

        await pauseExecution(500);
        // Pause for 500 milliseconds so that setSongWriters && setSongArtists_Creatives will complete.

        const newSongData = {
            songAudio: '',
            songTitle: formData.songTitle,
            songWriters: songWriters,
            songArtists_Creatives: songArtists_Creatives,
            copyrightOwnership: {
                coverVersion: copyrightOwnership,
                permissions: copyrightOwnershipPermission
            },
            explicitLyrics: explicitLyrics,
            isrcNumber: formData.ISRC_Number || '',
            lyricsLanguage: formData.lyricsLanguage || '',
            lyrics: formData.songLyrics || '',
        
            tikTokClipStartTime: {  // optional
                minutes: formData.tikTokClipStartTime_Minutes || '',
                seconds: formData.tikTokClipStartTime_Seconds || '',
            },
        };


        const data2db = new FormData();
        data2db.append('release_id', albumRelease._id || '' );
        if (songAudio) data2db.append('songAudio', songAudio);
        if (songEditId) data2db.append('song_id', songEditId);
        if (songEditId) data2db.append('songAudio_url', songAudioPreview);
        
        data2db.append('songTitle', newSongData.songTitle );
        data2db.append('songWriters', JSON.stringify(newSongData.songWriters));
        data2db.append('songArtists_Creatives', JSON.stringify(newSongData.songArtists_Creatives));
        data2db.append('copyrightOwnership', JSON.stringify(newSongData.copyrightOwnership));
        data2db.append('explicitLyrics', newSongData.explicitLyrics);
        data2db.append('isrcNumber', newSongData.isrcNumber);
        data2db.append('lyricsLanguage', newSongData.lyricsLanguage);
        data2db.append('lyrics', newSongData.lyrics);
        data2db.append('tikTokClipStartTime', JSON.stringify(newSongData.tikTokClipStartTime));


        try {
            const response = (await axios[ songEditId ? "patch" : "put"](
                `${apiEndpoint}/releases/album/create-update-4`,
                data2db,
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
            
            console.log(response);

            if (response.result) {
                await pauseExecution(500);

                _handleSetAlbumRelease4(response.result);

                _setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });
                // navigate("/auth/login", {replace: true});
                setSongEditId('');
    
                setFocus("songTitle", {shouldSelect: true});
                reset();
                setSongAudio(undefined);
                setSongAudioPreview(undefined);
                setCopyrightOwnership('');
                setCopyrightOwnershipPermission('');
                setSongWriters([]);
                setSongArtists_Creatives([]);
                setSelectRoleValue("Choose Roles");
                setValue("explicitSongLyrics", "");
                setExplicitLyrics("");
                setValue("songArtistsCreativeRole", "Choose Roles");
                setValue("tikTokClipStartTime_Minutes", "00");
                setValue("tikTokClipStartTime_Seconds", "00");
                setSelectTiktokMinValue("00");
                setSelectTiktokSecValue("00");

                return;
            }


            setApiResponse({
                display: true,
                status: false,
                message: response.message || ""
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

    }


    const handleSetArtistName = (details: artistInterface, dspName: "Spotify" | "Apple") => {
        // console.log(details);
        if (dspName == "Spotify") {
            // setSelectedSpotifyArtist(details)
            setValue(
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
        const creativeName = getValues("artistCreativeName");
        const creativeRole = selectRoleValue; // getValues("songArtistsCreativeRole");
        if (!creativeName) return;
            
        if (!creativeRole || creativeRole == 'Choose Roles') {
            _setToastNotification({
                display: true,
                status: "warning",
                message: `Please select ${ creativeName } Role in creating this song.`
            })

            setError("songArtistsCreativeRole", {message: `Please select ${ creativeName } Role in creating this song.`});
            return;
        }

        // const newCreatives = [ ...songArtists_Creatives, { creativeName, creativeRole } ];
        const newCreatives:songArtists_CreativesInterface[] = [ 
            ...songArtists_Creatives, 
            { name: creativeName, role: creativeRole, artist: details } 
        ];
        setSongArtists_Creatives(newCreatives);
        resetField("artistCreativeName");
        resetField("songArtistsCreativeRole");
        setSelectRoleValue('Choose Roles');
        document.getElementById("songArtistsCreativeRole")?.focus();
    }



    return {
        navigate,
        apiResponse, setApiResponse,
        
        register, getValues, setError, setValue, resetField, setFocus, reset, 
        errors, isValid, isSubmitting,

        selectLyricsLanguageValue, setSelectLyricsLanguageValue,
        openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal,
        explicitLyrics, setExplicitLyrics,
        copyrightOwnership, setCopyrightOwnership,
        copyrightOwnershipPermission, setCopyrightOwnershipPermission,
        songWriters, setSongWriters,
        songArtists_Creatives, setSongArtists_Creatives,
        songAudioPreview, setSongAudioPreview,
        selectRoleValue, setSelectRoleValue,
        selectTiktokMinValue, setSelectTiktokMinValue,
        songEditId, setSongEditId,
        songUploadProgress,
        openSearchArtistModal, setOpenSearchArtistModal,

        selectTiktokSecValue, setSelectTiktokSecValue,

        songAudio, setSongAudio,

        handleEdit,

        handleAudioFileUpload,
        handleNextBTN,
        handleSetArtistName,
        handleAddMoreCreatives,
        

        submitForm: handleSubmit(onSubmit)
    }
}
