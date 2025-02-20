import { useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
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
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';
import SuccessModalComponent from '@/components/account/SuccessModal';
import ArtWorkFileInfoComponent from '@/components/ArtWorkFileInfo';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import CopyrightOwnershipModalComponent from '@/components/account/CopyrightOwnershipModal';
import YesNoOptionsComponent from '@/components/release/YesNoOptions';
import PreSaveModalComponent from '@/components/account/PreSaveModal';
import MultipleSelectCheckmarks from '@/components/MultipleSelectCheckmarks';
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
import ExplicitLyricsReadMoreInfoComponent from '@/components/ExplicitLyricsReadMoreInfo';

import { 
    artWorkAllowedTypes, getQueryParams, minutes, musicStores, seconds, 
    socialPlatformStores, songArtistsCreativesRoles 
} from '@/util/resources';
import { languages } from '@/util/languages';

import cloudUploadIconImg from "@/assets/images/cloudUploadIcon.png";
import colors from '@/constants/colors';
import { releaseSelectStyle3, releaseTextFieldStyle } from '@/util/mui';
// import { useCreateSingleRelease } from '@/hooks/release/useCreateSingleRelease';
import { useCreateSingleRelease2 } from '@/hooks/release/createSingleRelease/useCreateSingle2';
// import { useCart } from '@/hooks/useCart';
// import { useUserStore } from '@/state/userStore';
import { useCreateReleaseStore } from '@/state/createReleaseStore';
import { usePreOrderHook } from '../usePreOrderHook';


let dspToSearch: "Apple" | "Spotify";

function CreateSingleRelease2() {
    const [isrcMoreInfoTooltip, setIsrcMoreInfoTooltip] = useState(false);
    // const singleRelease = useCreateReleaseStore((state) => state.singleRelease);
    const _handleClearSingleRelease = useCreateReleaseStore((state) => state._handleClearSingleRelease);
    // const { handleAddToCart } = useCart();
    // const userData = useUserStore((state) => state.userData);

    const { handleSkipPreOrder } = usePreOrderHook();
    
    const {
        singleRelease, 
        apiResponse, // setApiResponse,
        navigate,


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

        onSubmitCreateSingleRelease2,

        handleSetArtistName2,
        handleAddMoreCreatives,

        getReleaseById,
        restoreValues,

        openSearchArtistModal, setOpenSearchArtistModal,

        // submittedFormData, handleSubmitData,
        preSaveModal, setPreSaveModal,
        isFormSubmitting
    } = useCreateSingleRelease2();

    const { setValue, register, resetField, getValues, formState } = singleRelease2Form;
    const { errors, isSubmitting, isValid } = formState;

    const release_id: string = singleRelease._id || getQueryParams('release_id');
    
    useEffect(() => {
        restoreValues()
    }, [singleRelease]);

    useEffect(() => {
        getReleaseById(release_id);
    }, [release_id]);


    return (
        <AccountWrapper>
            <Box>
                <Box>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: colors.dark, 
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
                    > Create a Single </Typography>
                </Box>

                <form noValidate onSubmit={ onSubmitCreateSingleRelease2 } >   
                    <Stack sx={{mt: "35px", color: colors.dark }} spacing={"35px"} alignItems={"center"}>
                        <Box
                            sx={{
                                maxWidth: {xs: "330px", sm: "80%", md: "892px"},
                                // border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: colors.tertiary,
                                    color: colors.milk,
                                    // borderBottom: {xs: `0.45px solid ${colors.dark}`, md: `1px solid ${colors.dark}`},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant='body1'
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}
                                >Details</Typography>

                                <Typography variant='body1'
                                    onClick={() => {
                                        navigate({
                                            pathname: "/account/create-single-release",
                                            search: `?${createSearchParams({release_id: singleRelease._id || '' })}`,
                                        });

                                        // navigate("/account/create-single-release")
                                    }}
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
                                    bgcolor: colors.secondary,
                                    mt: {xs: "15px", sm: 0, md: "0px"}
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: '900',
                                        fontSize: {xs: "15px", md: "33px"},
                                        lineHeight: {xs: "10.84px", md: "24px"},
                                        letterSpacing: {xs: "-0.61px", md: "-1.34px"},
                                    }}
                                > { singleRelease.title } : { singleRelease.mainArtist.spotifyProfile.name } </Typography>

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
                                        > { singleRelease.releaseDate } </Typography>
                                    </Stack>
                                    
                                    {
                                        singleRelease.labelName ?
                                            <Stack direction="row" spacing={"auto"} 
                                                justifyContent="space-between" alignItems="center"
                                            >
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
                                                > { singleRelease.labelName } </Typography>
                                            </Stack>
                                        : <></>
                                    }

                                    {
                                        singleRelease.upc_ean ? 
                                            <Stack direction="row" spacing={"auto"} 
                                                justifyContent="space-between" alignItems="center"
                                            >
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
                                                > { singleRelease.upc_ean } </Typography>
                                            </Stack>
                                        : <></>
                                    }
                                    

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
                                        > { singleRelease.primaryGenre } </Typography>
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
                                        > { singleRelease.secondaryGenre } </Typography>
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
                                        > { singleRelease.language } </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                maxWidth: {xs: "330px", sm: "80%",  md: "892px"},
                                // border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden",
                                width: "100%"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: colors.tertiary,
                                    color: colors.milk,
                                    // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant='body1'
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
                                    bgcolor: colors.secondary,

                                    display: "flex",
                                    flexDirection: 'column',
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >

                                <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                    <MultipleSelectCheckmarks 
                                        options={musicStores}
                                        // darkTheme={darkTheme}
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
                                maxWidth: {xs: "330px", sm: "80%", md: "892px"},
                                // border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: colors.tertiary,
                                    color: colors.milk,
                                    // borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: {xs: "10px", md: "20px"},
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant='body1'
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
                                    bgcolor: colors.secondary,
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
                                        // darkTheme={darkTheme}
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
                                maxWidth: {xs: "330px", sm: "80%", md: "892px"},
                                // border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                borderRadius: {xs: "5.42px", md: "12px"},
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    height: {xs: "32.53px", md: "72px"},
                                    bgcolor: colors.tertiary,
                                    color: colors.milk,
                                    borderBottom: {xs: `0.45px solid ${colors.dark}`, md: `1px solid ${colors.dark}`},
                                    px: {xs: "10px", md: "25px"},
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant='body1'
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "20px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                    }}
                                >Song</Typography>

                                <Box></Box>
                            </Box>

                            <Box
                                sx={{
                                    p: {xs: "10px", md: "25px"},
                                    bgcolor: colors.tertiary,

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant='body1'
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "15px", md: "20px"},
                                        lineHeight: {xs: "25px", md: "40px"},
                                        letterSpacing: "-0.13px",
                                        color: colors.milk,
                                    }}
                                >
                                    Before you upload your song, please make sure that files are in an accepted format.
                                    Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, 
                                    but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.
                                </Typography>

                                <Stack direction="row" justifyContent="space-between" alignItems="center"
                                    sx={{
                                        p: {xs: "5px 15px", md: "10px 25px"},
                                        borderRadius: '16px',
                                        width: {xs: "80%", sm: "90%", md: "100%" },
                                        maxWidth: "459px",
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
                                            bgcolor: colors.secondary,
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
                                                                color: colors.primary
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
                                        
                                                sx={releaseTextFieldStyle}
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
                                            bgcolor: colors.secondary,
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
                                                                const newCreative = songArtists_Creatives.filter((_, index) => index != i );
                                                                setSongArtists_Creatives(newCreative);
                                                                document.getElementById("artistCreativeName")?.focus();
                                                            }}
                                                        />

                                                        <Box>
                                                            <Typography variant='body1'
                                                                sx={{
                                                                    fontWeight: "700",
                                                                    fontSize: {xs: "13px", md: "15px"},
                                                                    color: colors.primary
                                                                }}
                                                            > { creative.role } </Typography>

                                                            <Typography variant='body2'
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", md: "15px"},
                                                                    color: colors.tertiary
                                                                }}
                                                            > { creative.name } </Typography>
                                                        </Box>
                                                    </Stack>
                                                ))
                                            }
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
                                                    value={selectCreativeRoleValue}

                                                    sx={releaseSelectStyle3}
                                                    
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

                                                        if (value == "Main artist" || value == "Featured") {
                                                            dspToSearch = "Spotify";
                                                            setOpenSearchArtistModal(true);
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="Choose Roles" disabled>
                                                        Choose Roles
                                                    </MenuItem>

                                                    { songArtistsCreativesRoles.map((roleItem, index) => (
                                                        <MenuItem key={index} value={roleItem}>
                                                            {roleItem}
                                                        </MenuItem>
                                                    )) }
                                                </Select>
                                            </FormControl>

                                            { errors.songArtistsCreativeRole && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songArtistsCreativeRole?.message }</Box> }
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
                                         
                                                sx={releaseTextFieldStyle}
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
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Add more Creatives </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: colors.secondary,
                                            p: {xs: "10px", md: "25px"},
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <Box mb={4}>
                                            <Stack direction="row" alignItems="center" spacing="8px">
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "15px", md: "20px"},
                                                        lineHeight: {xs: "25px", md: "40px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >Does this song have explicit lyrics? </Typography>

                                                <ExplicitLyricsReadMoreInfoComponent />
                                            </Stack>

                                            <YesNoOptionsComponent 
                                                currentValue={explicitLyrics}
                                                // option='Yes'
                                                onSelect={(e) => {
                                                    setValue("explicitSongLyrics", e, 
                                                        {shouldValidate: true, shouldDirty: true, shouldTouch: true}
                                                    ) 
                                                    setExplicitLyrics(e); 
                                                }}

                                                CheckMarkIconColor={colors.tertiary}

                                                bgColorActive={colors.primary}
                                                bgColorInactive={colors.bg}

                                                textColorActive={colors.milk}
                                                textColorInactive={colors.dark}
                                                
                                                borderColorActive={colors.primary}
                                                borderColorInactive={colors.bg}
                                            />
                                        </Box>
                                        
                                        <Box>
                                            <Typography component={"h3"} variant='h3'
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Copyright Ownership</Typography>

                                            <Typography variant='body1'
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "15px", md: "20px"},
                                                    lineHeight: {xs: "25px", md: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > Is this a cover version of another song? </Typography>

                                            <YesNoOptionsComponent 
                                                currentValue={copyrightOwnership}
                                                onSelect={(e) => {
                                                    setCopyrightOwnership(e); 
                                                    setValue("copyrightOwnership", e, {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                }}

                                                CheckMarkIconColor={colors.tertiary}

                                                bgColorActive={colors.primary}
                                                bgColorInactive={colors.bg}

                                                textColorActive={colors.milk}
                                                textColorInactive={colors.dark}
                                                
                                                borderColorActive={colors.primary}
                                                borderColorInactive={colors.bg}
                                            />

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


                                                    <YesNoOptionsComponent 
                                                        currentValue={copyrightOwnershipPermission}
                                                        onSelect={(e) => {
                                                            setCopyrightOwnershipPermission(e); 
                                                            setValue("copyrightOwnershipPermission", e, {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                        }}

                                                        CheckMarkIconColor={colors.tertiary}

                                                        bgColorActive={colors.primary}
                                                        bgColorInactive={colors.bg}

                                                        textColorActive={colors.milk}
                                                        textColorInactive={colors.dark}
                                                        
                                                        borderColorActive={colors.primary}
                                                        borderColorInactive={colors.bg}
                                                    />

                                                    { errors.copyrightOwnershipPermission && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnershipPermission?.message }</Box> }
                                                </Box>
                                            ) 
                                        }

                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: colors.secondary,
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
                                            <Stack direction="row" alignItems="center" spacing="5px">
                                                <Typography variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "15px", md: "20px"},
                                                        lineHeight: {xs: "25px", md: "40px"},
                                                        letterSpacing: "-0.13px",
                                                        mb: '10px'
                                                    }}
                                                >ISRC Number</Typography>

                                                <Typography component="small"
                                                    sx={{
                                                        fontSize: "11px",
                                                        fontWeight: '400'
                                                    }}
                                                > (Optional)</Typography>

                                                <Box>
                                                    <Tooltip
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        // placement='bottom-end'
                                                        arrow
                                                        // onClose={() => setIsrcMoreInfoTooltip(false)}
                                                        // open={isrcMoreInfoTooltip}
                                                        // disableFocusListener
                                                        // disableHoverListener
                                                        // disableTouchListener

                                                        title={<Box
                                                            sx={{
                                                                // minWidth: 250,
                                                                // maxWidth: 700,
                                                                maxHeight: 450,
                                                                overflow: "scroll"
                                                            }}
                                                        >
                                                            <Typography variant='h3' component="h3"
                                                                sx={{
                                                                    fontWeight: '900',
                                                                    fontSize: "25px",
                                                                    textAlign: 'center',
                                                                    mb: 2
                                                                }}
                                                            > Note! </Typography>

                                                            <Typography variant='body1' fontSize="16px" mb={1}>
                                                                If this is your first time releasing music 
                                                                or don't have an International Standard Recording Code (ISRC),
                                                                you can leave this field empty,
                                                                we'll generate one for you.
                                                            </Typography>
                                                        </Box>}
                                                    >
                                                        <IconButton size='small' onClick={() => setIsrcMoreInfoTooltip(!isrcMoreInfoTooltip)} aria-label="More Information">
                                                            <InfoOutlinedIcon sx={{ color: colors.primary, fontSize: "20px" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Stack>

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
                                                sx={releaseTextFieldStyle}
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

                                                    sx={releaseSelectStyle3}
                                                    
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
                                            <Typography variant='h3'
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
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        color: '#fff', // Change to your desired text color
                                                        maxWidth: {xs: "337px", md: "100%"},
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
                                                error={ errors.songLyrics ? true : false }
                                                { ...register('songLyrics') }
                                            />

                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            bgcolor: colors.secondary,
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

                                                    sx={releaseSelectStyle3}
                                                    
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

                                                    sx={releaseSelectStyle3}
                                                    
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
                                                    letterSpacing: "-0.13px",
                                                    color: colors.milk
                                                }}
                                            >Upload Song Cover</Typography>

                                            <ArtWorkFileInfoComponent iconColor={colors.milk} />
                                        </Stack>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "end",
                                                alignItems: "center",
                                                bgcolor: colors.secondary,
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
                                                    background: colors.milk,
                                                    color: colors.dark,
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
                            disabled={ !isValid || isSubmitting || isFormSubmitting} 
                            sx={{ 
                                bgcolor: colors.primary,
                                maxWidth: "312px",
                                "&.Mui-disabled": {
                                    background: colors.secondary,
                                    color: "#797979",
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
                                color: colors.milk,
                                borderRadius: "12px",
                                my: 3, py: 1.5,
                                fontSize: {md: "15.38px"},
                                fontWeight: "900",
                                letterSpacing: "-0.12px",
                                textTransform: "none"
                            }}
                        >
                            {
                                isSubmitting || isFormSubmitting ? (
                                    <CircularProgressWithLabel 
                                        value={songUploadProgress} size={30} 
                                        sx={{ color: colors.primary, fontWeight: "bold", mx: 'auto' }} 
                                    />
                                ) : <span>Save Release</span>
                            }
                        </Button>
                    </Stack>
                </form>
            </Box>

                   
            <input 
                type="file" 
                id='songAudioUpload' 
                name="songAudioUpload" 
                // accept='audio/*'
                accept='.mp3, .wav' 
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


            <PreSaveModalComponent 
                handleSubmit={(state) => {
                    // const data2submit = submittedFormData;
                    // data2submit.append('preSave', `${state}`);
                    // handleSubmitData(data2submit, state);
                    setPreSaveModal(false);

                    navigate({
                        pathname: `/account/create-release-preorder/${singleRelease._id}`,
                        search: `?${createSearchParams({ 
                            releaseType: singleRelease.releaseType,
                            preOrder: state ? '1' : '0',
                        })}`,
                    });
                }}
                openModal={preSaveModal}
                closeModal={() => {
                    setPreSaveModal(false);

                    setOpenSuccessModal(true);

                    handleSkipPreOrder(singleRelease);

                    setTimeout(() => {
                        // navigate("/account/cart");
                        setOpenSuccessModal(false);

                        // clear the release from memory and rest the state
                        _handleClearSingleRelease();
                    }, 1000);

                }}
            />

            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />

            <CopyrightOwnershipModalComponent
                openModal={openCopyrightOwnershipModal}
                closeModal={() => setOpenCopyrightOwnershipModal(false)}
            />

            <SearchArtistModalComponent 
                openSearchArtistModal={openSearchArtistModal}
                closeSearchArtistModal={(continueState, inputValue) => {
                    if (continueState) {
                        setOpenSearchArtistModal(false);

                        setValue(
                            "artistCreativeName", inputValue ? inputValue : '',
                            { shouldDirty: true, shouldTouch: true, shouldValidate: true } 
                        );
                        
                    } else {
                        setOpenSearchArtistModal(false);
                        resetField("songArtistsCreativeRole");
                        setSelectCreativeRoleValue('Choose Roles');
                    }
                }}
                onSaveSelection={handleSetArtistName2}
                dspName={ dspToSearch }
                // searchType='Creatives - Main Artist'
                searchType={ selectCreativeRoleValue.includes("artist") ? "Creatives - Main Artist" : "Creatives - Featured" }
            />
        </AccountWrapper>
    )
}

export default CreateSingleRelease2