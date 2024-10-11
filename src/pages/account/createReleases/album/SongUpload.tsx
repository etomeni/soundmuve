import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';

import { releaseSelectStyle, releaseTextFieldStyle, releaseTextFieldStyle2 } from '@/util/mui';
import { languages } from '@/util/languages';
import { minutes, seconds, songArtistsCreativesRoles, pauseExecution } from '@/util/resources';
import CopyrightOwnershipModalComponent from '@/components/account/CopyrightOwnershipModal';
import { apiEndpoint } from '@/util/resources';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import ExplicitLyricsReadMoreInfoComponent from '@/components/ExplicitLyricsReadMoreInfo';
import colors from '@/constants/colors';
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
import { searchedArtistSearchInterface } from '@/constants/typesInterface';


const formSchema = yup.object({
    songTitle: yup.string().required().trim().label("Song Title"),

    songWriter: yup.string().trim().label("Song Writer"),
    artistCreativeName: yup.string().trim().label("Artist/Creative Name"),
    songArtistsCreativeRole: yup.string().trim().label("Artist/Creative Role"),

    explicitSongLyrics: yup.string().trim(),
    
    copyrightOwnership: yup.string().trim().label("Copyright Ownership"),
    copyrightOwnershipPermission: yup.string().trim().label("Copyright Ownership Permission"),
    
    ISRC_Number: yup.string().trim().label("ISRC Number"),

    songLyrics: yup.string().trim(),
    lyricsLanguage: yup.string().trim().label("Lyrics Language"),
    tikTokClipStartTime_Minutes: yup.string().trim().label("TikTok Clip Start Time"),
    tikTokClipStartTime_Seconds: yup.string().trim().label("TikTok Clip Start Time"),
});

interface creativeType {
    creativeName: string,
    creativeRole: string,
    creativeId?: string,
}

let dspToSearch: "Apple" | "Spotify";

function CreateAlbumReleaseSongUpload() {
    const navigate = useNavigate();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const albumReleaseSongUpload = createReleaseStore((state) => state.albumReleaseSongUpload);
    const _setAlbumReleaseSongUpload = createReleaseStore((state) => state._setAlbumReleaseSongUpload);
    const albumReleaseDetails = createReleaseStore((state) => state.albumReleaseDetails);
    const _removeAlbumReleaseSongUpload = createReleaseStore((state) => state._removeAlbumReleaseSongUpload);
    const completeAlbumData = createReleaseStore((state) => state.completeAlbumData);

    const [openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal] = useState(false);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    // const [submitBtnType, setSubmitBtnType] = useState<'next' | "add">();
    
    const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<creativeType[]>([]);
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
        resolver: yupResolver(formSchema),
        mode: 'onBlur', reValidateMode: 'onChange', 
        defaultValues: { 
            lyricsLanguage: "English",
            tikTokClipStartTime_Minutes: "00",
            tikTokClipStartTime_Seconds: "00",
        } 
    });
            
        

    const handleEdit = (i: number) => {
        const songData = albumReleaseSongUpload[i];

        setValue("songTitle", songData.song_title, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("ISRC_Number", songData.isrc_number, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("songLyrics", songData.lyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

        setSongAudio(songData.mp3_file);
        setSongAudioPreview(songData.songAudioPreview);

        setSongWriters(songData.song_writer);
        setSongArtists_Creatives(songData.songArtistsCreativeRole);

        setExplicitLyrics(songData.explicitLyrics);
        setValue("explicitSongLyrics", songData.explicitLyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true})

        setSelectLyricsLanguageValue(songData.language_lyrics);
        setValue("lyricsLanguage", songData.language_lyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

        setCopyrightOwnership(songData.copyright_ownership);
        setValue("copyrightOwnership", songData.copyright_ownership);
        setCopyrightOwnershipPermission(songData.copyright_ownership_permissions);
        setValue("copyrightOwnershipPermission", songData.copyright_ownership_permissions);

        const tiktokTimer = songData.tikTokClipStartTime.split(':');

        setValue("tikTokClipStartTime_Minutes", tiktokTimer[0], {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("tikTokClipStartTime_Seconds", tiktokTimer[1], {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setSelectTiktokMinValue(tiktokTimer[0]);
        setSelectTiktokSecValue(tiktokTimer[1]);

        setSongEditId(songData._id);

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


    const handleNextBTN = async () => {

        if (albumReleaseSongUpload.length) {
            navigate("/account/create-album-release-album-art");
            // console.log(newSongData);
            
            // const data2db: any = new FormData();
            // // data2db.append('email', newSongData.email);
            // data2db.append('email', userData.email);

            // albumReleaseSongUpload.forEach(newSongData => {
            //     data2db.append('song_mp3', newSongData.mp3_file);
            //     data2db.append('song_title', newSongData.song_title );
            //     // data2db.append('song_writer', newSongData.song_writer );
            //     data2db.append('song_writer', `"${newSongData.song_writer.toString()}"` );
    
            //     data2db.append('song_artists', `"${newSongData.songArtistsCreativeRole.map(item => item.creativeName).toString()}"` );
            //     data2db.append('creative_role', `"${newSongData.songArtistsCreativeRole.map(item => item.creativeRole).toString()}"` );
            //     // data2db.append('song_artists', newSongData.songArtistsCreativeRole.map(item => item.creativeName).join(', ') );
            //     // data2db.append('creative_role', newSongData.songArtistsCreativeRole.map(item => item.creativeRole).join(', ') );
    
            //     // data2db.append('songArtistsCreativeRole', newSongData.songArtistsCreativeRole.toString());
            //     data2db.append('explicitLyrics', newSongData.explicitLyrics);
            //     data2db.append('copyright_ownership', newSongData.copyright_ownership);
            //     data2db.append('copyright_ownership_permissions', newSongData.copyright_ownership_permissions);
            //     data2db.append('isrc_number', newSongData.isrc_number);
            //     data2db.append('language_of_lyrics', newSongData.language_lyrics);
            //     data2db.append('lyrics', newSongData.lyrics);
            //     data2db.append('ticktokClipStartTime', newSongData.tikTokClipStartTime);
            // });

            // try {
            //     setIsNextBtnSubmitting(true);

            //     const response = (await axios.put(
            //         // `${apiEndpoint}/Album/update-album/${ completeAlbumData._id }/page4`,
            //         // `${apiEndpoint}/songs/albums/${ completeAlbumData._id }/page4`,
            //         `${apiEndpoint}/songs/albums/66977731566946bc43b539c0/page4`,
            //         data2db,  
            //         {
            //             headers: {
            //                 'Content-Type': 'multipart/form-data',
            //                 Authorization: `Bearer ${accessToken}`
            //             },
            //         }
            //     )).data;
            //     console.log(response);

            //     setIsNextBtnSubmitting(false);
            //     // _setAlbumReleaseSongUpload(newSongData);
            //     navigate("/account/create-album-release-album-art");



            //     // setApiResponse({
            //     //     display: true,
            //     //     status: true,
            //     //     message: response.message
            //     // });
            //     _setToastNotification({
            //         display: true,
            //         status: "success",
            //         message: response.message
            //     });
            //     // navigate("/auth/login", {replace: true});

            //     // setFocus("songTitle", {shouldSelect: true});
            //     // reset();
            //     // setSongAudio(undefined);
            //     // setSongAudioPreview(undefined);
            //     // setCopyrightOwnership('');
            //     // setCopyrightOwnershipPermission('');
            //     // setSongWriters([]);
            //     // setSongArtists_Creatives([]);
            //     // setSelectRoleValue("Choose Roles");
            //     // setValue("explicitSongLyrics", "");
            //     // setExplicitLyrics("");
            //     // setValue("songArtistsCreativeRole", "Choose Roles");
            //     // setValue("tikTokClipStartTime_Minutes", "00");
            //     // setValue("tikTokClipStartTime_Seconds", "00");
            //     // setSelectTiktokMinValue("00");
            //     // setSelectTiktokSecValue("00");

            // } catch (error: any) {
            //     const err = error.response.data;
            //     console.log(err);
            //     setIsNextBtnSubmitting(false);

            //     setApiResponse({
            //         display: true,
            //         status: false,
            //         message: err.message || "Oooops, failed to update details. please try again."
            //     });
            // }

        } else {
            _setToastNotification({
                display: true,
                status: "warning",
                message: "Please add a songs to proceed."
            });
        }
        
    }

    const onSubmit = async (formData: typeof formSchema.__outputType) => {  
        // console.log(formData);

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
                    creativeName: formData.artistCreativeName,
                    creativeRole: formData.songArtistsCreativeRole,
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

        await pauseExecution(500);
        // Pause for 500 milliseconds so that setSongWriters && setSongArtists_Creatives will complete.

        const newSongData = {
            email: userData.email,
            mp3_file: songAudio,
            songAudioPreview,
            song_title: formData.songTitle,
            song_writer: songWriters,
            songArtistsCreativeRole: songArtists_Creatives,

            explicitLyrics: explicitLyrics,

            copyright_ownership: copyrightOwnership,
            copyright_ownership_permissions: copyrightOwnershipPermission,
            isrc_number: formData.ISRC_Number || '',
            language_lyrics: formData.lyricsLanguage || '',
            lyrics: formData.songLyrics || '',
            tikTokClipStartTime: `${ formData.tikTokClipStartTime_Minutes }:${ formData.tikTokClipStartTime_Seconds }`,
        };

        _setAlbumReleaseSongUpload({...newSongData, _id: ''});

        const data2db = new FormData();
        data2db.append('album_id', completeAlbumData._id );
        data2db.append('email', newSongData.email);
        data2db.append('song_mp3', newSongData.mp3_file);
        data2db.append('song_title', newSongData.song_title );
        data2db.append('song_writer', newSongData.song_writer.toString());

        // data2db.append('creative_name', newSongData.songArtistsCreativeRole.map(item => item.creativeName).join(', '));
        data2db.append('creative_name', newSongData.songArtistsCreativeRole.map(item => item.creativeId || item.creativeName).join(', '));
        data2db.append('creative_role', newSongData.songArtistsCreativeRole.map(item => item.creativeRole).join(', '));

        data2db.append('explicit_lyrics', newSongData.explicitLyrics);
        data2db.append('copyright_ownership', newSongData.copyright_ownership);
        data2db.append('copyright_ownership_permissions', newSongData.copyright_ownership_permissions);
        data2db.append('isrc_number', newSongData.isrc_number);
        data2db.append('language_of_lyrics', newSongData.language_lyrics);
        data2db.append('lyrics', newSongData.lyrics);
        data2db.append('ticktokClipStartTime', newSongData.tikTokClipStartTime);


        try {
            const response = songEditId ? 
                (await axios.put(
                    `${apiEndpoint}/songs/editSong/${songEditId}`,
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
                )).data 
            : (await axios.post(
                `${apiEndpoint}/songs/page4`,
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


            await pauseExecution(500);


            _setAlbumReleaseSongUpload({...newSongData, _id: response.song._id});

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message
            // });
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

        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

    }


    const handleSetArtistName = (details: searchedArtistSearchInterface, dspName: "Spotify" | "Apple") => {
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

    const handleAddMoreCreatives = (details?: searchedArtistSearchInterface) => {
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
        const newCreatives:creativeType[] = [ 
            ...songArtists_Creatives, 
            { creativeName, creativeRole, creativeId: details?.id || '' } 
        ];
        setSongArtists_Creatives(newCreatives);
        resetField("artistCreativeName");
        resetField("songArtistsCreativeRole");
        setSelectRoleValue('Choose Roles');
        document.getElementById("songArtistsCreativeRole")?.focus();
    }


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={4} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />
                        </Box>


                        <Box sx={{my: 3}}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                style={{ width: "100%", maxWidth: "916px" }}
                            >

                                { albumReleaseSongUpload.length ? (
                                        <Box
                                            sx={{
                                                maxWidth: {xs: "330px", md: "892px"},
                                                border: {
                                                    xs: `0.45px solid ${ colors.dark }`,
                                                    md: `1px solid ${ colors.dark }`
                                                },
                                                bgcolor: colors.secondary,
                                                borderRadius: {xs: "5.42px", md: "12px"},
                                                overflow: "hidden",
                                                mb: {xs: 2, sm: 3}
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: {xs: "32.53px", md: "72px"},
                                                    bgcolor: colors.tertiary,
                                                    color: colors.milk,
                                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                    px: {xs: "10px", md: "25px"},
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: "20px",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "15px", md: "15px"},
                                                        lineHeight: {xs: "20px", md: "31px"},
                                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                                    }}
                                                >Song</Typography>

                                                <Box></Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: {xs: "10px", md: "25px"},
                                                    // bgcolor: darkTheme ? "#000" : "#797979",

                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyItems: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {
                                                    albumReleaseSongUpload.map((item, i) => (
                                                        <SongPreviewComponent key={i}
                                                            songTitle={`${item.song_title} - ${albumReleaseDetails.artist_name}`}
                                                            subTitle={item.isrc_number}
                                                            songAudio={item.songAudioPreview}
                                                            editSong={() => { 
                                                                // console.log("hello");
                                                                handleEdit(i);
                                                            }}
                                                        />
                                                    ))
                                                }
                                            
                                            </Box>
                                        </Box>  
                                    ) : <></>
                                }

                                <Box
                                    sx={{
                                        maxWidth: {xs: "330px", md: "892px"},
                                        border: {
                                            xs: `0.45px solid ${ colors.dark }`,
                                            md: `1px solid ${ colors.dark }`
                                        },
                                        borderRadius: {xs: "5.42px", md: "12px"},
                                        overflow: "hidden",
                                        bgcolor: colors.secondary
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: "32.53px", md: "72px"},
                                            bgcolor: colors.tertiary,
                                            color: colors.milk,
                                            borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                            px: {xs: "10px", md: "25px"},
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "20px",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "15px"},
                                                lineHeight: {xs: "20px", md: "31px"},
                                                letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                            }}
                                        >Song</Typography>

                                        <Box></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
                                            // bgcolor: darkTheme ? "#000" : "#797979",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyItems: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "12px", md: "16px"},
                                                lineHeight: {xs: "20px", md: "31px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >
                                            Before you upload your song, please make sure that files are in an accepted format.
                                            Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, 
                                            but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.
                                        </Typography>


                                        <Stack direction="row" justifyContent="space-between" alignItems="center"
                                            sx={{
                                                p: {xs: "", md: "10px 25px"},
                                                borderRadius: '16px',
                                                width: "459px",
                                                bgcolor: colors.primary,
                                                color: colors.milk,
                                                my: 3,
                                                cursor: "pointer"
                                            }}

                                            onClick={() => {
                                                document.getElementById("songAudioUpload")?.click();
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: "18px",
                                                    lineHeight: "18px",
                                                    letterSpacing: "-1.05px"
                                                }}
                                            >Upload Music</Typography>

                                            <CloudUploadOutlinedIcon sx={{pr: "14px", fontSize: "40px"}} />
                                        </Stack>

                                        {
                                            songAudioPreview && (
                                                <SongPreviewComponent 
                                                    songAudio={songAudioPreview} 
                                                    songTitle="Audio"
                                                    deleteSong={() => {
                                                        setSongAudio(undefined);
                                                        setSongAudioPreview(undefined);
                                                    }} 
                                                />
                                            )
                                        }

                                        <Box sx={{my: "35px", width: "100%"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "12px", md: "16px"},
                                                    lineHeight: {xs: "20px", md: "31px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: 1
                                                }}
                                            > Song Title </Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='songTitle'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
                                                error={ errors.songTitle ? true : false }
                                                { ...register('songTitle') }
                                            />
                                            { errors.songTitle && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songTitle?.message }</Box> }
                                            
                                        </Box>
                                                

                                        <Stack spacing={{xs: "20px", md: "35px"}} sx={{width: "100%"}}>
                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px",
                                                        mb: 1
                                                    }}
                                                >Song Writer</Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >
                                                    At least one songwriter is required for this song. 
                                                    A songwriter is the person or persons who wrote the lyrics and/or music. 
                                                    Each songwriter should be credited. One songwriter per line. 
                                                    LEGAL NAMES are required in order to be paid the applicable royalties for publishing.
                                                </Typography>


                                                <Box 
                                                    sx={{
                                                        mt: {xs: 2, m: 3},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        flexWrap: "wrap"
                                                    }}
                                                >
                                                    {
                                                        songWriters.map((writerName, i) => (
                                                            <Stack key={i} direction="row" alignItems="center" spacing="5px"
                                                                sx={{
                                                                    p: "10px",
                                                                    bgcolor: colors.bg,
                                                                    width: "fit-content",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <CancelIcon 
                                                                    sx={{ 
                                                                        color: colors.tertiary,
                                                                        ":hover": { color: colors.primary },
                                                                        fontSize: {xs: "15px", md: "18px"}
                                                                    }} 
                                                                    onClick={() => {
                                                                        const newWritter = songWriters.filter((_, index) => index != i );
                                                                        setSongWriters(newWritter);
                                                                        document.getElementById("songWriter")?.focus();
                                                                    }}
                                                                />

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "400",
                                                                        fontSize: {xs: "13px", md: "15px"},
                                                                        color: colors.dark
                                                                    }}
                                                                > { writerName } </Typography>
                                                            </Stack>
                                                        ))
                                                    }

                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songWriter'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g Joseph Solomon'
                                                        sx={releaseTextFieldStyle2}

                                                        error={ errors.songWriter ? true : false }
                                                        { ...register('songWriter') }
                                                        onKeyUp={(e: any) => {
                                                            if ((e.which === 13 || e.keyCode === 13) && e.target.value) {
                                                                const newWritter = [ ...songWriters, e.target.value ];
                                                                setSongWriters(newWritter);
                                                                resetField("songWriter");
                                                                document.getElementById("songWriter")?.focus();
                                                            }
                                                        }}
                                                    />

                                                    { errors.songWriter && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songWriter?.message }</Box> }
                                                </Box>

                                                <Box 
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        const writerName = getValues("songWriter");
                                                        if (writerName) {
                                                            const newWritter = [ ...songWriters, writerName ];
                                                            setSongWriters(newWritter);
                                                            resetField("songWriter");
                                                            document.getElementById("songWriter")?.focus();
                                                        }
                                                    }}
                                                >
                                                    <AddIcon />

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "15px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    > Add more song writers </Typography>
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px",
                                                        mb: 1
                                                    }}
                                                >Song Artists & Creatives</Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >
                                                    List all artists that appear on this song. You may select multiple roles for each artist. 
                                                    You can select from our list of roles, such as Main Artist, Featured, Producer etc. 
                                                </Typography>

                                                <Box 
                                                    sx={{
                                                        mt: {xs: 2, m: 3},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        flexWrap: "wrap"
                                                    }}
                                                >
                                                    {
                                                        songArtists_Creatives.map(( creative, i) => (
                                                            <Stack key={i} direction="row" alignItems="center" spacing="10px"
                                                                sx={{
                                                                    p: "10px",
                                                                    bgcolor: colors.milk,
                                                                    width: "fit-content",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <CancelIcon 
                                                                    sx={{ 
                                                                        color: colors.tertiary,
                                                                        ":hover": { color: colors.primary },
                                                                        fontSize: {xs: "15px", md: "18px"}
                                                                    }} 
                                                                    onClick={() => {
                                                                        const newCreative = songArtists_Creatives.filter((_, index) => index != i );
                                                                        setSongArtists_Creatives(newCreative);
                                                                        document.getElementById("artistCreativeName")?.focus();
                                                                    }}
                                                                />

                                                                <Box>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "700",
                                                                            fontSize: {xs: "13px", md: "15px"},
                                                                            color: colors.tertiary
                                                                        }}
                                                                    > { creative.creativeRole } </Typography>

                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "400",
                                                                            fontSize: {xs: "13px", md: "15px"},
                                                                            color: colors.dark
                                                                        }}
                                                                    > { creative.creativeName } </Typography>
                                                                </Box>
                                                            </Stack>
                                                        ))
                                                    }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: 0.5
                                                        }}
                                                    >Role</Typography>

                                                    <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                        <Select
                                                            labelId="songArtistsCreativeRole-label"
                                                            id="songArtistsCreativeRole"
                                                            label=""
                                                            // defaultValue="Choose Roles"
                                                            placeholder='Choose Roles'
                                                            value={selectRoleValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.songArtistsCreativeRole ? true : false }
                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectRoleValue(value);

                                                                setValue(
                                                                    "songArtistsCreativeRole", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );

                                                                if (value == "Main artist" || value == "Featured") {
                                                                    dspToSearch = "Spotify";
                                                                    setOpenSearchArtistModal(true);
                                                                }
                                                            }}
                                                            // { ...register('songArtistsCreativeRole') }
                                                        >
                                                            <MenuItem value="Choose Roles" disabled>
                                                                Choose Roles
                                                            </MenuItem>

                                                            { songArtistsCreativesRoles.map((roleItem: any, index) => (
                                                                <MenuItem key={index} value={roleItem}>
                                                                    {roleItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    { errors.songArtistsCreativeRole && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songArtistsCreativeRole?.message }</Box> }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: 0.5
                                                        }}
                                                    >Artist / Creative Name</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='artistCreativeName'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g Joseph Solomon'
                                                        sx={releaseTextFieldStyle2}

                                                        error={ errors.artistCreativeName ? true : false }
                                                        { ...register('artistCreativeName') }
                                                    />

                                                    { errors.artistCreativeName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistCreativeName?.message }</Box> }
                                                </Box>

                                                <Box 
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => handleAddMoreCreatives()}
                                                >
                                                    <AddIcon />

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >Add more Creatives</Typography>
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Box>
                                                    <Stack direction="row" alignItems="center" spacing="8px">
                                                        <Typography variant='body2' component="div"
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "16.96px", md: "25px"},
                                                                lineHeight: {xs: "27.14px", md: "40px"},
                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                // mt: "21px"
                                                            }}
                                                        >
                                                            Does this song have explicit lyrics? 
                                                        </Typography>

                                                        <ExplicitLyricsReadMoreInfoComponent />
                                                    </Stack>

                                                    {/* <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        Does this song have explicit lyrics? &#32;
                                                        <span
                                                            style={{
                                                                color: "#C8F452",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Read More
                                                        </span>
                                                    </Typography> */}

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            gap: explicitLyrics == "Yes" ? "5px" : "15px",
                                                            mb: "20px",
                                                        }}
                                                    >

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: getValues("explicitSongLyrics") == "Yes" ? colors.primary : colors.secondary,
                                                                    color: getValues("explicitSongLyrics") == "Yes" ? colors.milk : colors.dark,
                                                                    // border: `1px solid ${ getValues("explicitSongLyrics") == "Yes" ? colors.primary : colors.dark }`,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("explicitSongLyrics", "Yes");
                                                                    setExplicitLyrics("Yes");
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > Yes </Typography>
                                                            </Box>

                                                            { explicitLyrics == "Yes" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: getValues("explicitSongLyrics") == "No" ? colors.primary : colors.secondary,
                                                                    color: getValues("explicitSongLyrics") == "No" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("explicitSongLyrics", "No");
                                                                    setExplicitLyrics("No");
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > No </Typography>
                                                            </Box>

                                                            { explicitLyrics == "No" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>


                                                <Box>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >Copyright Ownership</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "400",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        Is this a cover version of another song?
                                                    </Typography>

                                                    <Stack direction={'row'} spacing={ copyrightOwnership == "Yes" ? "0px" : "15px"} sx={{my: "15px"}}>
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: copyrightOwnership == "Yes" ? colors.primary : colors.secondary,
                                                                    color: copyrightOwnership == "Yes" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => { 
                                                                    setCopyrightOwnership("Yes"); 
                                                                    setValue("copyrightOwnership", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                }}
                                                            >
                                                        

                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > Yes </Typography>
                                                            </Box>

                                                            { copyrightOwnership == "Yes" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: copyrightOwnership == "No" ? colors.primary : colors.secondary,
                                                                    color: copyrightOwnership == "No" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => { 
                                                                    setCopyrightOwnership("No"); 
                                                                    setValue("copyrightOwnership", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > No </Typography>
                                                            </Box>

                                                            { copyrightOwnership == "No" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>
                                                    </Stack>

                                                    { errors.copyrightOwnership && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnership?.message }</Box> }
                                                </Box>

                                                {
                                                    copyrightOwnership == "Yes" && (
                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", md: "16px"},
                                                                    lineHeight: {xs: "25px", md: "32px"},
                                                                    letterSpacing: "-0.13px"
                                                                }}
                                                            >
                                                                In order to distribute a cover song, you may be required to obtain certain rights or permissions. 
                                                                Please confirm:
                                                            </Typography>

                                                            <Stack direction={'row'} spacing={ copyrightOwnershipPermission == "Yes" ? "0px" : "15px"} sx={{mt: "15px"}}>

                                                                <Box>
                                                                    <Box 
                                                                        sx={{
                                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                            borderRadius: {xs: "8.14px", md: "12px"},
                                                                            background: copyrightOwnershipPermission == "Yes" ? colors.primary : colors.secondary,
                                                                            color: copyrightOwnershipPermission == "Yes" ? colors.milk : colors.dark,
                                                                            cursor: "pointer",
                                                                            display: "inline-block"
                                                                        }}
                                                                        onClick={() => { 
                                                                            setCopyrightOwnershipPermission("Yes"); 
                                                                            setValue("copyrightOwnershipPermission", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                        }}
                                                                    >
                                                                        <Typography 
                                                                            sx={{
                                                                                fontWeight: '900',
                                                                                fontSize: {xs: "10.18px", md: "15px"},
                                                                                lineHeight: {xs: "8.82px", md: "13px"},
                                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                                textAlign: 'center',
                                                                            }}
                                                                        > Yes </Typography>
                                                                    </Box>

                                                                    { copyrightOwnershipPermission == "Yes" ? 
                                                                        <CheckCircleIcon 
                                                                            sx={{ 
                                                                                color: "#fff",
                                                                                position: "relative", 
                                                                                left: -15,
                                                                                top: -8
                                                                            }} 
                                                                        /> : <></>
                                                                    }
                                                                </Box>

                                                                <Box>
                                                                    <Box 
                                                                        sx={{
                                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                            borderRadius: {xs: "8.14px", md: "12px"},
                                                                            background: copyrightOwnershipPermission == "No" ? colors.primary : colors.secondary,
                                                                            color: copyrightOwnershipPermission == "No" ? colors.milk : colors.dark,
                                                                            cursor: "pointer",
                                                                            display: "inline-block"
                                                                        }}
                                                                        onClick={() => {
                                                                            setCopyrightOwnershipPermission("No");
                                                                            setValue("copyrightOwnershipPermission", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                        }}
                                                                    >
                                                                        <Typography 
                                                                            sx={{
                                                                                fontWeight: '900',
                                                                                fontSize: {xs: "10.18px", md: "15px"},
                                                                                lineHeight: {xs: "8.82px", md: "13px"},
                                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                                textAlign: 'center',
                                                                            }}
                                                                        > No </Typography>
                                                                    </Box>

                                                                    { copyrightOwnershipPermission == "No" ? 
                                                                        <CheckCircleIcon 
                                                                            sx={{ 
                                                                                color: "#fff",
                                                                                position: "relative", 
                                                                                left: -15,
                                                                                top: -8
                                                                            }} 
                                                                        /> : <></>
                                                                    }
                                                                </Box>
                                                            </Stack>

                                                            { errors.copyrightOwnershipPermission && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnershipPermission?.message }</Box> }
                                                        </Box>
                                                    ) 
                                                }

                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >Additional Information</Typography>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >ISRC Number</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songWriter'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g TCAII2406427'
                                                        InputProps={{
                                                            sx: {
                                                                borderRadius: "16px",
                                                                color: '#fff', // Change to your desired text color
                                                                maxWidth: {xs: "337px", md: "100%"},
                                                            },
                                                        }}
                                                        sx={releaseTextFieldStyle2}
                                                        error={ errors.ISRC_Number ? true : false }
                                                        { ...register('ISRC_Number') }
                                                    />
                                                </Box>

                                                <Box sx={{my: "30px"}}>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >Language of Lyrics</Typography>

                                                    <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                        <Select
                                                            labelId="lyricsLanguage"
                                                            id="lyricsLanguage-select"
                                                            label=""
                                                            // defaultValue="English"
                                                            placeholder='English'
                                                            value={selectLyricsLanguageValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.lyricsLanguage ? true : false }
                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectLyricsLanguageValue(value);

                                                                setValue(
                                                                    "lyricsLanguage", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}
                                                            // { ...register('lyricsLanguage') }
                                                        >
                                                            <MenuItem value="English" disabled selected>
                                                                English
                                                            </MenuItem>

                                                            { languages.map((langItem: any, index) => (
                                                                <MenuItem key={index} value={langItem.englishName}>
                                                                    {langItem.englishName}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    { errors.lyricsLanguage && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lyricsLanguage?.message }</Box> }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >Lyrics(Optional)</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songLyrics'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        multiline
                                                        rows={6}
                                                        InputProps={{
                                                            sx: {
                                                                borderRadius: "16px",
                                                                color: '#fff', // Change to your desired text color
                                                                maxWidth: {xs: "337px", md: "100%"},
                                                            },
                                                        }}
                                                        sx={releaseTextFieldStyle2}
                                                        error={ errors.songLyrics ? true : false }
                                                        { ...register('songLyrics') }
                                                    />

                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >TikTok Clip Start Time (Optional)</Typography>

                                                <Stack direction={"row"} spacing={"20px"} sx={{my: {xs: "10px", md: "20px"} }}>
                                                    <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"},}}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "12px",
                                                                lineHeight: "32px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: "center"
                                                            }}
                                                        > Minutes </Typography>

                                                        <Select
                                                            labelId="tikTokClipStartTime_Minutes"
                                                            id="tikTokClipStartTime_Minutes-select"
                                                            label=""
                                                            // defaultValue="00"
                                                            placeholder='00'
                                                            value={selectTiktokMinValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.tikTokClipStartTime_Minutes ? true : false }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectTiktokMinValue(value);

                                                                setValue(
                                                                    "tikTokClipStartTime_Minutes", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}

                                                            // { ...register('tikTokClipStartTime_Minutes') }
                                                        >
                                                            { minutes.map((minItem: any, index) => (
                                                                <MenuItem key={index} value={minItem}>
                                                                    {minItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"} }}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "12px",
                                                                lineHeight: "32px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: "center"
                                                            }}
                                                        > Seconds </Typography>
                                                        
                                                        <Select
                                                            labelId="tikTokClipStartTime_Seconds"
                                                            id="tikTokClipStartTime_Seconds-select"
                                                            label=""
                                                            // defaultValue="00"
                                                            placeholder='00'
                                                            value={selectTiktokSecValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.tikTokClipStartTime_Seconds ? true : false }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectTiktokSecValue(value);

                                                                setValue(
                                                                    "tikTokClipStartTime_Seconds", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}

                                                            // { ...register('tikTokClipStartTime_Seconds') }
                                                        >
                                                            { seconds.map((secondsItem: any, index) => (
                                                                <MenuItem key={index} value={secondsItem}>
                                                                    {secondsItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Box>

                                        </Stack>


                                        <Button variant="text" 
                                            type="submit" 
                                            disabled={ !isValid || isSubmitting } 
                                            sx={{ my: 3, p: 0 }}
                                        >
                                            <Stack direction="row" justifyContent="space-between" alignItems="center"
                                                sx={{
                                                    p: {xs: "", md: "10px 25px"},
                                                    borderRadius: '16px',
                                                    width: "200px",
                                                    bgcolor: colors.primary,
                                                    color: colors.milk,
                                                }}
                                            >
                                                {
                                                    isSubmitting ? (
                                                        <Box mx="auto">
                                                            {/* <CircularProgress size={25} sx={{ color: "#8638E5", fontWeight: "bold", mx: 'auto' }} /> */}
                                                            <CircularProgressWithLabel 
                                                                value={songUploadProgress} size={30} 
                                                                sx={{ color: colors.primary, fontWeight: "bold", mx: 'auto' }} 
                                                            />
                                                        </Box>
                                                    ) : (
                                                        <>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "900",
                                                                    fontSize: "18px",
                                                                    lineHeight: "18px",
                                                                    letterSpacing: "-1.05px"
                                                                }}
                                                            >Add Song</Typography>
                                                            <AddIcon sx={{pr: "14px", fontSize: "40px"}} />
                                                        </>
                                                    )
                                                }
                                            </Stack>

                                        </Button>
                                    </Box>
                                </Box>

                                {
                                    apiResponse.display && (
                                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                        </Stack>
                                    )
                                }

                                <Box mt="100px">
                                    <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                        <Button variant="contained" 
                                            fullWidth type='button'
                                            onClick={() => navigate("/account/create-album-release-select-stores")}
                                            sx={{ 
                                                bgcolor: "#9c9c9c",
                                                maxWidth: "312px",
                                                color: "#fff",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:active": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:focus": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                borderRadius: "12px",
                                                my: 3, py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        > Previous step </Button>

                                        <Button variant="contained" 
                                            fullWidth // type="submit" 
                                            // disabled={ (!albumReleaseSongUpload.length && !isValid) || isSubmitting } 
                                            disabled={ !albumReleaseSongUpload.length } 
                                            sx={{ 
                                                bgcolor: colors.primary,
                                                color: colors.milk,
                                                maxWidth: "312px",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: colors.primary,
                                                },
                                                "&:active": {
                                                    bgcolor: colors.primary,
                                                },
                                                "&:focus": {
                                                    bgcolor: colors.primary,
                                                },
                                                borderRadius: "12px",
                                                // my: 3, 
                                                py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                            onClick={() => handleNextBTN() }
                                        > Next </Button>
                                    </Stack>
                                </Box>

                            </form>
                        </Box>
                    </Box>
                </Box>

            </Box>

                   
            <input 
                type="file" 
                id='songAudioUpload' 
                name="songAudioUpload" 
                accept='audio/*' 
                onChange={handleAudioFileUpload}
                style={{display: "none"}}
            />

            <CopyrightOwnershipModalComponent
                openModal={openCopyrightOwnershipModal}
                closeModal={() => setOpenCopyrightOwnershipModal(false)}
            />

            <SearchArtistModalComponent 
                openSearchArtistModal={openSearchArtistModal}
                closeSearchArtistModal={() => {
                    setOpenSearchArtistModal(false);
                    resetField("songArtistsCreativeRole");
                    setSelectRoleValue('Choose Roles');
                }}
                onSaveSelection={handleSetArtistName}
                dspName={ dspToSearch }
            />
        </AccountWrapper>
    )
}

export default CreateAlbumReleaseSongUpload;