import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';
import SuccessModalComponent from '@/components/account/SuccessModal';
import { apiEndpoint } from '@/util/resources';
import { albumInterface } from '@/constants/typesInterface';


function CreateAlbumReleaseOverview() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const albumReleaseDetails = createReleaseStore((state) => state.albumReleaseDetails);
    const albumReleaseAdvanceFeatures = createReleaseStore((state) => state.albumReleaseAdvanceFeatures);
    const albumReleaseStores = createReleaseStore((state) => state.albumReleaseStores);
    const albumReleaseSongUpload = createReleaseStore((state) => state.albumReleaseSongUpload);
    const _removeAlbumReleaseSongUpload = createReleaseStore((state) => state._removeAlbumReleaseSongUpload);
    const _clearAlbumRelease = createReleaseStore((state) => state._clearAlbumRelease);
    const albumReleaseAlbumArt = createReleaseStore((state) => state.albumReleaseAlbumArt);
    const completeAlbumData = createReleaseStore((state) => state.completeAlbumData);

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const [releasedAlbum, setReleasedAlbum] = useState<albumInterface>();



    useEffect(() => {
        getAlbumRelease();
    }, [])
    

    const getAlbumRelease = async () => {
        try {
            const response = (await axios.get(
                // `${apiEndpoint}/Album/albums?email=${ userData.email }`,
                `${apiEndpoint}/songs/albums-songs-by-email/${ userData.email }?album_id=${completeAlbumData._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);

            setReleasedAlbum(response.albums[0]);


        } catch (error: any) {
            const err = error.response.data;
            console.log(err);
        }
    }

    const deleteSong = async (index: number) => {
        const song = albumReleaseSongUpload[index];

        try {
            const response = (await axios.delete(
                `${apiEndpoint}/songs/songs/${song._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);
            _removeAlbumReleaseSongUpload(index);

            _setToastNotification({
                display: true,
                status: "info",
                message: response.message
            });
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            _setToastNotification({
                display: true,
                status: "error",
                message: err.message
            });
        }
    }

    const onSubmit = async () => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        setOpenSuccessModal(true);

        _clearAlbumRelease();

        setTimeout(() => {
            setOpenSuccessModal(false);

            navigate("/account");
        }, 1000);
    }


    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={6} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
                                <IconButton 
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        color: darkTheme ? "#fff" : "#000", 
                                        mb: 2,
                                        display: {xs: "none", sm: "block"}
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>

                                <Typography 
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "24.74px", sm: "30px"},
                                        lineHeight: {xs: "26.31px", sm: "50.77px"},
                                        letterSpacing: {xs: "-0.55px", sm: "-1.07px"},
                                    }}
                                >
                                    Overview
                                </Typography>
                            </Stack>
                        </Box>


                        <Box sx={{my: 3, mx: "auto", width: "100%", maxWidth: "892px"}}>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    width: "100%",
                                    mx: "auto"
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        color: "#fff",
                                        borderBottom: darkTheme ? {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"} : "none",
                                        px: {xs: "10px", sm: "25px"},
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
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Details</Typography>

                                    <Typography onClick={() => navigate("/account/create-album-release-details")}
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: 'pointer'
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#B0AFAF",
                                        mt: {xs: "15px", sm: "0px"}
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: {xs: "15px", sm: "33px"},
                                            lineHeight: {xs: "10.84px", sm: "24px"},
                                            letterSpacing: {xs: "-0.61px", sm: "-1.34px"},
                                        }}
                                    > { releasedAlbum?.album_title || albumReleaseDetails.album_title } : { releasedAlbum?.artist_name || albumReleaseDetails.artist_name } </Typography>

                                    <Box sx={{ mt: {xs: "15px", sm: "30px"} }}>
                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Release date</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.release_date || albumReleaseDetails.releaseDate } </Typography>
                                        </Stack>
                                        
                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Label</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.label_name || albumReleaseAdvanceFeatures.label_name } </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >UPC</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.upc_ean || albumReleaseAdvanceFeatures.upc_ean } </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Primary Genre</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.primary_genre || albumReleaseDetails.primary_genre } </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Secondary Genre</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.secondary_genre || albumReleaseDetails.secondary_genre } </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={"auto"} justifyContent="space-between" alignItems="center">
                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            >Language</Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13px", sm: "15px"},
                                                    lineHeight: {xs: "25px", sm: "40px"},
                                                    letterSpacing: "-0.13px"
                                                }}
                                            > { releasedAlbum?.language ||  albumReleaseDetails.language } </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    width: "100%",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        color: "#fff",
                                        borderBottom: darkTheme ? {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"} : 'none',
                                        px: {xs: "10px", sm: "25px"},
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
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Selected Stores</Typography>
                                    
                                    <Typography 
                                        onClick={() => navigate("/account/create-album-release-select-stores")}
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#B0AFAF",

                                        display: "flex",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    { releasedAlbum?.store || albumReleaseStores.stores }
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        color: "#fff",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: {xs: "10px", sm: "20px"},
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "14px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Social Platforms - Automatically Selected</Typography>

                                    <Typography
                                        onClick={() => navigate("/account/create-album-release-select-stores")}
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    >Edit</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#B0AFAF",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "25px", sm: "40px"},
                                            letterSpacing: "-0.13px"
                                        }}
                                    >
                                        You keep 80% of social platform revenue. Please review monetization eligibility requirements for. &#32;
                                        <span style={{textDecoration: "underline"}}>YouTube Content ID </span> &#32; and &#32;
                                        <span style={{textDecoration: "underline"}}>Facebook/Instagram/Reels.</span> &#32;
                                        Delivering ineligible content can result in account suspension. 
                                        <b> Click 'Edit' to remove a social platform. </b>
                                    </Typography>

                                    <Box mt={2}>
                                        { releasedAlbum?.social_platform || albumReleaseStores.socialPlatforms }
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {
                                        xs: `0.45px solid ${ darkTheme ? "#fff" : "#272727" }`, 
                                        sm: `1px solid ${ darkTheme ? "#fff" : "#272727" }`
                                    },
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        color: "#fff",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: {xs: "10px", sm: "20px"},
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "14px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    > Song </Typography>
                                     
                                    <Typography
                                        onClick={() => navigate("/account/create-album-release-song-upload")}
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    > Edit </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        p: {xs: "10px", sm: "25px"},
                                        bgcolor: darkTheme ? "#000" : "#fff",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {
                                        // albumReleaseSongUpload.map((item, i) => (
                                            releasedAlbum?.songs.map((item, i) => (
                                            <Box key={i} width="100%">
                                                {
                                                    <SongPreviewComponent key={i}
                                                        // songAudio={item.songAudioPreview}
                                                        songAudio={item.song_mp3} 
                                                        songTitle={item.song_title}
                                                        deleteSong={() => {
                                                            deleteSong(i);
                                                        }} 
                                                    />
                                                }
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {
                                        xs: `0.45px solid ${ darkTheme ? "#fff" : "#272727" }`, 
                                        sm: `1px solid ${ darkTheme ? "#fff" : "#272727" }`
                                    },
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: "#272727",
                                        color: "#fff",
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: {xs: "10px", sm: "20px"},
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "14px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    > Album art </Typography>
                                     
                                    <Typography
                                        onClick={() => navigate("/account/create-album-release-album-art")}
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                            cursor: "pointer"
                                        }}
                                    > Edit </Typography>
                                </Box>


                                <Box sx={{ width: {xs: "90%", sm: "347px"}, maxWidth: {xs: "330px", sm: "892px"}, mx: "auto" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: "#272727",
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", sm: "326px"},
                                            // width: {xs: "128.45px", sm: "347px"},
                                            // width: "100%",
                                            my: {xs: "10px", sm: "20px"},
                                            p: {xs: "5px 5px 10px 5px", sm: "5px 5px 25px 5px"},

                                            backgroundImage: `url(${ releasedAlbum?.song_cover_url || albumReleaseAlbumArt.imagePreview})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    ></Box>
                                </Box>

                            </Box>


                            {/* <Stack direction="column" justifyContent="center" alignItems="center"
                                sx={{ p: {xs: "10px", sm: "25px"} }}
                            >
                                <Box sx={{ width: {xs: "90%", sm: "347px"}, maxWidth: {xs: "330px", sm: "892px"} }}>
                                    <Typography component={"h3"} variant='h3'
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "13px", sm: "16px"},
                                            lineHeight: {xs: "25px", sm: "32px"},
                                            letterSpacing: "-0.13px",
                                            // bgcolor: "green",
                                            alignSelf: "start"
                                        }}
                                    > Album art </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: "#272727",
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", sm: "326px"},
                                            // width: {xs: "128.45px", sm: "347px"},
                                            // width: "100%",
                                            my: {xs: "10px", sm: "20px"},
                                            p: {xs: "5px 5px 10px 5px", sm: "5px 5px 25px 5px"},

                                            backgroundImage: `url(${imagePreview})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    >
                                        <Box></Box>

                                        <Box 
                                            sx={{
                                                p: {xs: "10.18px 19.68px", sm: "15px 29px"},
                                                borderRadius: {xs: "8.14px", sm: "12px"},
                                                // background: "#FFFFFF80",
                                                background: "#c4c4c480",

                                                color: "#000",
                                                cursor: "pointer",
                                                display: "inline-block",
                                                mt: {xs: "7px", sm: "15px"},
                                                position: "",
                                                // bottom: 0
                                            }}
                                            onClick={() => {
                                                document.getElementById("uploadSongCoverImage")?.click();
                                            }}
                                        >
                                            <Typography 
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: {xs: "10.18px", sm: "15px"},
                                                    lineHeight: {xs: "8.82px", sm: "13px"},
                                                    letterSpacing: {xs: "-0.09px", sm: "-0.13px"},
                                                    textAlign: 'center',
                                                }}
                                            > Edit </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Stack> */}

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Stack justifyContent="center" alignItems="center">

                                <Button variant="contained" fullWidth
                                    onClick={() => onSubmit()}
                                    // disabled={ !isValid || isSubmitting } 
                                    sx={{ 
                                        bgcolor: darkTheme ? "#fff" : "#644986",
                                        maxWidth: "312px",
                                        "&.Mui-disabled": {
                                            background: "#9c9c9c",
                                            color: "#797979"
                                        },
                                        "&:hover": {
                                            bgcolor: darkTheme ? "#fff" : "#644986",
                                        },
                                        "&:active": {
                                            bgcolor: darkTheme ? "#fff" : "#644986",
                                        },
                                        "&:focus": {
                                            bgcolor: darkTheme ? "#fff" : "#644986",
                                        },
                                        color: darkTheme ? "#000" : "#fff",
                                        borderRadius: "12px",
                                        my: 3, py: 1.5,
                                        fontSize: {sm: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                > Save Release </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />

        </AccountWrapper>
    )
}

export default CreateAlbumReleaseOverview;