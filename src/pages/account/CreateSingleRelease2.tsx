import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';
import SuccessModalComponent from '@/components/account/SuccessModal';
import ArtWorkFileInfoComponent from '@/components/ArtWorkFileInfo';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import CopyrightOwnershipModalComponent from '@/components/account/CopyrightOwnershipModal';

import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import { 
    apiEndpoint, artWorkAllowedTypes, convertToBase64, minutes, musicStores, seconds, 
    socialPlatformStores, songArtistsCreativesRoles, validateImageArtWork 
} from '@/util/resources';
import { languages } from '@/util/languages';

import cloudUploadIconImg from "@/assets/images/cloudUploadIcon.png";
import MultipleSelectCheckmarks from '@/components/MultipleSelectCheckmarks';


const formSchema = yup.object({
    artistCreativeName: yup.string().trim().label("Artist/Creative Name"),
    songArtistsCreativeRole: yup.string().trim().label("Artist/Creative Role"),
    ISRC_Number: yup.string().trim().label("ISRC Number"),
    songWriter: yup.string().trim().label("Song Writer"),
    store: yup.string().trim().label("Store"),
    socialPlatform: yup.string().trim().label("Social Platform"),

    copyrightOwnership: yup.string().trim().label("Copyright Ownership"),
    copyrightOwnershipPermission: yup.string().trim().label("Copyright Ownership Permission"),

    songLyrics: yup.string().trim(),
    lyricsLanguage: yup.string().trim().label("Lyrics Language"),
    tikTokClipStartTime_Minutes: yup.string().trim().label("TikTok Clip Start Time"),
    tikTokClipStartTime_Seconds: yup.string().trim().label("TikTok Clip Start Time"),
});


interface creativeType {
    creativeName: string,
    creativeRole: string,
}


function CreateSingleRelease2() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const singleRelease1 = createReleaseStore((state) => state.singleRelease1);
    const singleRelease2 = createReleaseStore((state) => state.singleRelease2);
    const _setSingleRelease2 = createReleaseStore((state) => state._setSingleRelease2);
    const _clearSingleRelease = createReleaseStore((state) => state._clearSingleRelease);
    const _restoreAllRelease = createReleaseStore((state) => state._restoreAllRelease);
    const [openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal] = useState(false);

    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const [copyrightOwnership, setCopyrightOwnership] = useState('');
    const [copyrightOwnershipPermission, setCopyrightOwnershipPermission] = useState('');
    const [songWriters, setSongWriters] = useState<string[]>([]);
    const [songArtists_Creatives, setSongArtists_Creatives] = useState<creativeType[]>([]);
    const [image, setImage] = useState<Blob | null>(null);
    const [imagePreview, setImagePreview] = useState();
    const [songAudio, setSongAudio] = useState<Blob | null>(null);
    const [songAudioPreview, setSongAudioPreview] = useState<any>();
    const [selectStores, setSelectStores] = useState<string[]>(musicStores);
    const [selectSocialStores, setSelectSocialStores] = useState<string[]>(socialPlatformStores);
    
    const [selectCreativeRoleValue, setSelectCreativeRoleValue] = useState('Choose Roles');
    const [songUploadProgress, setSongUploadProgress] = useState(0);


    useEffect(() => {
        if (!singleRelease1.song_title) {
            _restoreAllRelease();
        }
    }, [singleRelease1]);

    useEffect(() => {
        if (singleRelease2.mp3_file) {
            setCopyrightOwnership(singleRelease2.copyright_ownership);
            setValue("copyrightOwnership", singleRelease2.copyright_ownership, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            
            setCopyrightOwnershipPermission(singleRelease2.copyright_ownership_permissions);
            setValue("copyrightOwnershipPermission", singleRelease2.copyright_ownership_permissions, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    
            setSongWriters(singleRelease2.song_writer);
            setSongArtists_Creatives(singleRelease2.songArtistsCreativeRole);
            setImage(singleRelease2.cover_photo);
            // setImagePreview(singleRelease2.imagePreview);
            setSongAudio(singleRelease2.mp3_file);
            // setSongAudioPreview(singleRelease2.songAudioPreview);
    
            setSelectStores(singleRelease2.store.split(','));
            setSelectSocialStores(singleRelease2.social_platform.split(','));
    
            setValue("ISRC_Number", singleRelease2.isrc_number, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("lyricsLanguage", singleRelease2.language_lyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("songLyrics", singleRelease2.lyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        }
    }, [singleRelease2]);

    const { 
        handleSubmit, register, getValues, setError, setValue, resetField, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
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
            setApiResponse(base64);
        }
    
        e.target.value = "";
    }

    const handleStoreSelect = (selected: string[]) => {
        setSelectStores(selected);
        setValue("store", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }

    const handleSocialStoreSelect = (selected: string[]) => {
        setSelectSocialStores(selected);
        setValue("socialPlatform", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
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

            setError(
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

            setError(
                "socialPlatform", 
                { message: "Select social platforms to distribute your music to." },
                { shouldFocus: true }
            );
            return;
        }

        if (formData.songWriter) {
            const newWritter = [ ...songWriters, formData.songWriter ];
            setSongWriters(newWritter);
            resetField("songWriter");
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
                    setSelectCreativeRoleValue("Choose Roles");
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


        if (!copyrightOwnership) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Copyright Ownership::: Select if this song is a cover version of another song?"
            });

            setError(
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

        const release2data = {
            email: userData.email,
            release_type: 'Single',
            store: formData.store || '',
            social_platform: formData.socialPlatform || '',

            mp3_file: songAudio,
            song_writer: songWriters,
        
            songArtistsCreativeRole: songArtists_Creatives,
        
            copyright_ownership: copyrightOwnership,
            copyright_ownership_permissions: copyrightOwnershipPermission,
        
            isrc_number: formData.ISRC_Number || '',
            language_lyrics: formData.lyricsLanguage || '',
            lyrics: formData.songLyrics || '',
            tikTokClipStartTime: `${ formData.tikTokClipStartTime_Minutes }:${ formData.tikTokClipStartTime_Seconds }`,
            cover_photo: image,

            imagePreview: imagePreview,
            songAudioPreview: songAudioPreview,
        }

        _setSingleRelease2(release2data);

        const data2db = new FormData();
        data2db.append('email', userData.email);
        data2db.append('release_type', "Single");
        data2db.append('store', formData.store || 'All');
        data2db.append('social_platform', formData.socialPlatform || 'All');
        data2db.append('song', singleRelease1.song_title);
        data2db.append('mp3_file', songAudio);
        data2db.append('song_writer', songWriters.toString());
        data2db.append('songArtistsCreativeRole', songArtists_Creatives.toString());
        data2db.append('copyright_ownership', copyrightOwnership);
        data2db.append('copyright_ownership_permissions', copyrightOwnershipPermission);
        data2db.append('isrc_number', formData.ISRC_Number || '');
        data2db.append('language_lyrics', formData.lyricsLanguage || '');
        data2db.append('lyrics', formData.songLyrics || '');
        data2db.append('tikTokClipStartTime', `${ formData.tikTokClipStartTime_Minutes }:${ formData.tikTokClipStartTime_Seconds }`);
        data2db.append('cover_photo', image || '');

        // console.log(data2db);

        try {
            const response = (await axios.patch(
                `${apiEndpoint}/Release/update-release`,
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

            setTimeout(() => {
                navigate("/account");
                setOpenSuccessModal(false);
                _clearSingleRelease();
            }, 1000);
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

    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10} }}>
                <Box>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                            display: {xs: "none", md: "block"}
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography 
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "24.74px", md: "60px"},
                            lineHeight: {xs: "26.31px", md: "63.8px"},
                            letterSpacing: {xs: "-0.55px", md: "-1.34px"},
                        }}
                    >
                        Create a Single
                    </Typography>
                </Box>

                <form noValidate onSubmit={ handleSubmit(onSubmit) } >   
                    <Stack sx={{mt: "35px", color: darkTheme ? "inherit" : "#fff"}} spacing={"35px"} alignItems={"center"}>
                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
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
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Details</Typography>

                                <Typography onClick={() => navigate("/account/create-single-release")}
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                        cursor: "pointer"
                                    }}
                                >Edit</Typography>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",
                                    mt: {xs: "15px", md: "0px"}
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "15px", md: "33px"},
                                        lineHeight: {xs: "10.84px", md: "24px"},
                                        letterSpacing: {xs: "-0.61px", md: "-1.34px"},
                                    }}
                                > { singleRelease1.song_title } : { singleRelease1.artist_name } </Typography>

                                <Box sx={{ mt: {xs: "15px", md: "30px"} }}>
                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Release date</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.releaseDate } </Typography>
                                    </Stack>
                                    
                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Label</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.label_name } </Typography>
                                    </Stack>

                                    {/* <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >ISRC</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >  </Typography>
                                    </Stack> */}

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >UPC</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.upc_ean } </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Primary Genre</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.primary_genre } </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Secondary Genre</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.secondary_genre } </Typography>
                                    </Stack>

                                    <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Language</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13px", md: "15px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        > { singleRelease1.language } </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
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
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Select Stores</Typography>
                                
                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    flexDirection: 'column',
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >

                                <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                    <MultipleSelectCheckmarks 
                                        options={musicStores}
                                        darkTheme={darkTheme}
                                        handleSelected={handleStoreSelect}
                                        selectedValue={selectStores}
                                        error={ errors.store ? true : false }
                                    />

                                    { errors.store && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.store?.message }</Box> }
                                </FormControl>

                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: {xs: "10px", md: "20px"},
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "14px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Social Platforms - Automatically Selected</Typography>

                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "25px", md: "40px"},
                                        letterSpacing: "-0.13px"
                                    }}
                                >
                                    You keep 80% of social platform revenue. Please review monetization eligibility requirements for. &#32;
                                    <span style={{textDecoration: "underline"}}>YouTube Content ID </span> &#32; and &#32;
                                    <span style={{textDecoration: "underline"}}>Facebook/Instagram/Reels.</span> &#32;
                                    Delivering ineligible content can result in account suspension. 
                                    <b> Click 'Edit' to remove a social platform. </b>
                                </Typography>

                                <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                    <MultipleSelectCheckmarks 
                                        options={socialPlatformStores}
                                        darkTheme={darkTheme}
                                        handleSelected={handleSocialStoreSelect}
                                        selectedValue={selectSocialStores}
                                        error={ errors.socialPlatform ? true : false }
                                    />

                                    { errors.socialPlatform && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.socialPlatform?.message }</Box> }
                                </FormControl>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", md: "892px"},
                                border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: "#272727",
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
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Song</Typography>

                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: darkTheme ? "#000" : "#797979",

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "25px", md: "40px"},
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
                                        bgcolor: "#fff",
                                        color: "#000",
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
                                            fontSize: "23px",
                                            lineHeight: "24px",
                                            letterSpacing: "-1.34px"
                                        }}
                                    >Upload Music</Typography>

                                    <CloudUploadOutlinedIcon sx={{pr: "14px", fontSize: "40px"}} />
                                </Stack>

                                {
                                    songAudioPreview && (
                                        <SongPreviewComponent
                                            songTitle='Audio'
                                            songAudio={songAudioPreview}
                                            deleteSong={() => {
                                                setSongAudio(null);
                                                setSongAudioPreview(undefined);
                                            }}
                                        />
                                    )
                                }

                                <Stack spacing={{xs: "20px", md: "35px"}} sx={{width: "100%"}}>
                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px",
                                                mb: 1
                                            }}
                                        >Song Writer</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
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
                                                            bgcolor: "#644986",
                                                            width: "fit-content",
                                                            borderRadius: "10px"
                                                        }}
                                                    >
                                                        <CancelIcon 
                                                            sx={{ 
                                                                color: "#fff",
                                                                ":hover": { color: "#de2341" },
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
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: darkTheme ? '#fff' : '#fff', // Change to your desired text color
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
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
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Add more song writers </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px",
                                                mb: 1
                                            }}
                                        >Song Artists & Creatives</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
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
                                                            bgcolor: "#644986",
                                                            width: "fit-content",
                                                            borderRadius: "10px"
                                                        }}
                                                    >
                                                        <CancelIcon 
                                                            sx={{ 
                                                                color: "#fff",
                                                                ":hover": { color: "#de2341" },
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
                                                                }}
                                                            > { creative.creativeRole } </Typography>

                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", md: "15px"},
                                                                }}
                                                            > { creative.creativeName } </Typography>
                                                        </Box>
                                                    </Stack>
                                                ))
                                            }
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
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
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: darkTheme ? '#fff' : '#fff', // Change to your desired text color
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
                                                error={ errors.artistCreativeName ? true : false }
                                                { ...register('artistCreativeName') }
                                            />

                                            { errors.artistCreativeName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistCreativeName?.message }</Box> }
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
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
                                                    value={selectCreativeRoleValue}

                                                    sx={{
                                                        color: darkTheme ? "#000" : "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: darkTheme ? "#fff" : "#fff",
                                                        
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#fff",
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            // fill: "#797979 !important",
                                                            fill: darkTheme ? "#797979" : "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.songArtistsCreativeRole ? true : false }
                                                    // { ...register('songArtistsCreativeRole') }

                                                    onChange={(event) => {
                                                        const value: any = event.target.value;
                                                        setSelectCreativeRoleValue(value);

                                                        setValue(
                                                            "songArtistsCreativeRole", 
                                                            value, 
                                                            {
                                                                shouldDirty: true,
                                                                shouldTouch: true,
                                                                shouldValidate: true
                                                            }
                                                        );
                                                    }}
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
                                                const creativeName = getValues("artistCreativeName");
                                                const creativeRole = selectCreativeRoleValue; // getValues("songArtistsCreativeRole");
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

                                                const newCreatives = [ ...songArtists_Creatives, { creativeName, creativeRole } ];
                                                setSongArtists_Creatives(newCreatives);
                                                resetField("artistCreativeName");
                                                resetField("songArtistsCreativeRole");
                                                setSelectCreativeRoleValue('Choose Roles');
                                                document.getElementById("artistCreativeName")?.focus();
                                            }}
                                        >
                                            <AddIcon />

                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Add more Creatives </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Box>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Copyright Ownership</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Is this a cover version of another song? </Typography>

                                            <Stack direction={'row'} spacing={ copyrightOwnership == "Yes" ? "5px" : "15px" } sx={{my: "15px"}}>
                                                <Box>
                                                    <Box 
                                                        sx={{
                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                            borderRadius: {xs: "8.14px", md: "12px"},
                                                            background: copyrightOwnership == "Yes" ? "#644986" : "#fff",
                                                            color: copyrightOwnership == "Yes" ? "#fff" : "#000",
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
                                                                color: darkTheme ? "#fff" : "#c4c4c4",
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
                                                            background: copyrightOwnership == "No" ? "#644986" : "#fff",
                                                            color: copyrightOwnership == "No" ? "#fff" : "#000",
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
                                                                color: darkTheme ? "#fff" : "#c4c4c4",
                                                                position: "relative", 
                                                                left: -15,
                                                                top: -8,
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
                                                            fontSize: {xs: "15px", md: "20px"},
                                                            lineHeight: {xs: "25px", md: "40px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        In order to distribute a cover song, you may be required to obtain certain rights or permissions. 
                                                        Please confirm:
                                                    </Typography>

                                                    <Stack direction={'row'} spacing={ copyrightOwnershipPermission == "Yes" ? "5px" : "15px"} sx={{mt: "15px"}}>
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: copyrightOwnershipPermission == "Yes" ? "#644986" : "#fff" ,
                                                                    color: copyrightOwnershipPermission == "Yes" ? "#fff" : "#000",
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
                                                                        color: darkTheme ? "#fff" : "#c4c4c4",
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
                                                                    background: copyrightOwnershipPermission == "No" ? "#644986" : "#fff",
                                                                    color: copyrightOwnershipPermission == "No" ? "#fff" : "#000",
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
                                                                        color: darkTheme ? "#fff" : "#c4c4c4",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
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
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >Additional Information</Typography>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
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
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: '#fff', // Change to your desired text color
                                                        maxWidth: {xs: "337px", md: "100%"},
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },

                                            
                                                }}
                                                error={ errors.ISRC_Number ? true : false }
                                                { ...register('ISRC_Number') }
                                            />
                                        </Box>

                                        <Box sx={{my: "30px"}}>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: '10px'
                                                }}
                                            >Language of Lyrics</Typography>

                                            <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                <Select
                                                    labelId="lyricsLanguage"
                                                    id="lyricsLanguage-select"
                                                    label=""
                                                    defaultValue="English"
                                                    placeholder='English'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        
                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            // fill: "#797979 !important",
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.lyricsLanguage ? true : false }
                                                    { ...register('lyricsLanguage') }
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
                                        </Box>

                                        <Box sx={{my: "20px"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
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
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: '#fff', // Change to your desired text color
                                                        maxWidth: {xs: "337px", md: "100%"},
                                                    },
                                                }}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "& ::placeholder": {
                                                        //     color: "gray"
                                                        // },
                                                    },
                                                }}
                                                error={ errors.songLyrics ? true : false }
                                                { ...register('songLyrics') }
                                            />

                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: "#272727",
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Typography component={"h3"} variant='h3'
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >TikTok Clip Start Time (Optional)</Typography>

                                        <Stack direction={"row"} spacing={"20px"} sx={{my: {xs: "10px", md: "20px"} }}>
                                            <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"},}}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        textAlign: "center"
                                                    }}
                                                > Minutes </Typography>

                                                <Select
                                                    labelId="tikTokClipStartTime_Minutes"
                                                    id="tikTokClipStartTime_Minutes-select"
                                                    label=""
                                                    defaultValue="00"
                                                    placeholder='00'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        // textAlign: "center",

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.tikTokClipStartTime_Minutes ? true : false }
                                                    { ...register('tikTokClipStartTime_Minutes') }
                                                >
                                                    { minutes.map((minItem: any, index) => (
                                                        <MenuItem key={index} value={minItem} selected={minItem == "00" ? true : false}>
                                                            {minItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"} }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        textAlign: "center"
                                                    }}
                                                > Seconds </Typography>
                                                
                                                <Select
                                                    labelId="tikTokClipStartTime_Seconds"
                                                    id="tikTokClipStartTime_Seconds-select"
                                                    label=""
                                                    defaultValue="00"
                                                    placeholder='00'

                                                    sx={{
                                                        color: "#000",
                                                        borderRadius: "16px",
                                                        bgcolor: "#fff",
                                                        // textAlign: "center",

                                                        '.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#fff',
                                                        },
                                                        '.MuiSvgIcon-root ': {
                                                            fill: "#797979",
                                                        }
                                                    }}
                                                    
                                                    error={ errors.tikTokClipStartTime_Seconds ? true : false }
                                                    { ...register('tikTokClipStartTime_Seconds') }
                                                >
                                                    { seconds.map((secondsItem: any, index) => (
                                                        <MenuItem key={index} value={secondsItem} selected={secondsItem == "00" ? true : false}>
                                                            {secondsItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Upload Song Cover</Typography>

                                            <ArtWorkFileInfoComponent iconColor="#fff" />
                                        </Stack>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                bgcolor: "#272727",
                                                borderRadius: "12px",
                                                height: {xs: "146.55px", md: "326px"},
                                                width: {xs: "128.45px", md: "347px"},
                                                my: {xs: "10px", md: "20px"},
                                                p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"}
                                            }}
                                        >
                                            { imagePreview ? (
                                                <Box sx={{ overflow: "hidden", borderRadius: "12px" }}>
                                                    <img 
                                                        src={imagePreview} alt='uploaded image'
                                                        style={{
                                                            width: "100%",
                                                            // height: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        maxWidth: {xs: "71.29px", md: "160px"},
                                                        maxHeight: {xs: "71.93px", md: "160px"},
                                                        p: {xs: "10px", md: "25px"}
                                                    }}
                                                >
                                                    <img 
                                                        src={cloudUploadIconImg} alt='cloud upload icon image'
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "contain",
                                                        }}
                                                    />
                                                </Box>
                                            )}

                                            <Box 
                                                sx={{
                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                    background: "#fff",
                                                    color: "#000",
                                                    cursor: "pointer",
                                                    display: "inline-block",
                                                    mt: {xs: "7px", md: "15px"}
                                                }}
                                                onClick={() => {
                                                    document.getElementById("uploadSongCoverImage")?.click();
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
                                                > { imagePreview ? "Choose an Image" : "Upload" } </Typography>
                                            </Box>
                                        </Box>

                                        {/* { errors.songWriter && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songWriter?.message }</Box> } */}
                                    </Box>
                                </Stack>
                            </Box>

                        </Box>
                    </Stack>

                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }

                    <Stack justifyContent={"center"} alignItems={"center"} sx={{mt: "20px"}}>
                        <Button variant="contained" 
                            fullWidth type="submit" 
                            disabled={ !isValid || isSubmitting } 
                            sx={{ 
                                bgcolor: darkTheme ? "#fff" : "#000",
                                maxWidth: "312px",
                                "&.Mui-disabled": {
                                    background: "#9c9c9c",
                                    color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                "&:active": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                "&:focus": {
                                    bgcolor: darkTheme ? "#fff" : "#000",
                                },
                                color: darkTheme ? "#000" : "#fff",
                                borderRadius: "12px",
                                my: 3, py: 1.5,
                                fontSize: {md: "15.38px"},
                                fontWeight: "900",
                                letterSpacing: "-0.12px",
                                textTransform: "none"
                            }}
                        >

                            {
                                isSubmitting ? (
                                    <CircularProgressWithLabel 
                                        value={songUploadProgress} size={30} 
                                        sx={{ color: "#8638E5", fontWeight: "bold", mx: 'auto' }} 
                                    />
                                ) : <span>Save Release</span>
                            }

                            {/* <span style={{ display: isSubmitting ? "none" : "initial" }}>Save Release</span>
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} /> */}
                        </Button>
                    </Stack>
                </form>

            </Box>

                   
            <input 
                type="file" 
                id='songAudioUpload' 
                name="songAudioUpload" 
                accept='audio/*' 
                onChange={handleAudioFileUpload}
                style={{display: "none"}}
            />
                   
            <input 
                type="file" 
                id='uploadSongCoverImage' 
                name="uploadSongCoverImage" 
                // accept='image/*' 
                accept={artWorkAllowedTypes.toString()}
                onChange={handleImageFileUpload}
                style={{display: "none"}}
            />

            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />

            <CopyrightOwnershipModalComponent
                openModal={openCopyrightOwnershipModal}
                closeModal={() => setOpenCopyrightOwnershipModal(false)}
            />
        </AccountWrapper>
    )
}

export default CreateSingleRelease2