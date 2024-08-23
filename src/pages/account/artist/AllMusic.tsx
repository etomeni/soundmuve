import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import albumImage from '@/assets/images/album.png';

import AccountWrapper from '@/components/AccountWrapper';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import ReleaseStatusComponent from '@/components/ReleaseStatus';

import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';

import { apiEndpoint } from '@/util/resources';
import { getLocalStorage, setLocalStorage } from '@/util/storage';
import { useReleaseStore } from '@/state/releaseStore';

// type status = "Live" | "Pending" | "Incomplete" | "Complete" | "Failed";

const albumSongs = [
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Live"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Complete"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Incomplete"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Pending"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Live"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Complete"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Failed"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Pending"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Complete"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Complete"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Failed"
    },
    {
        song_cover: albumImage,
        song_title: "Good God",
        artist_name: "Joseph solomon",
        status: "Failed"
    },
];


function AllMusic() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const [singleRelease, setSingleRelease] = useState<any[]>();
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });


    useEffect(() => {
        const localResponds = getLocalStorage("singleRelease");
        if (localResponds && localResponds.length) setSingleRelease(localResponds);
        
        getSingleRelease();
    }, []);


    const getSingleRelease = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/Release/getReleaseByEmail/${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setLocalStorage("singleRelease", response);
            setSingleRelease(response);

            if (!response.length) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: "You don't have any single Release yet."
                });
            }

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setSingleRelease([]);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: errorResponse.message || "Ooops and error occurred!"
            });
        }
    }
    

    const songView = (song: any, index: number) => (
        <Grid item xs={6} md={4} key={index}>
            <Box sx={{ width: "95%" }}
                onClick={() => {
                    navigate(`/account/artist/${albumType == "Album" ? "album-details" : "song-details"}`);

                    _setSongDetails({
                        artist_name: song.artist_name,
                        cover_photo: song.song_cover,
                        email: song.email,
                        label_name: song.label_name,
                        primary_genre: song.primary_genre,
                        secondary_genre: song.secondary_genre,
                        song_title: song.song_title,
                        stream_time: '',
                        streams: "",
                        total_revenue: "",
                        upc_ean: song.upc_ean
                    });
                }}
            >
                <Box
                    sx={{
                        height: {xs: "152.99px", md: "268px"},
                        borderRadius: {xs: "6.85px", md: "12px"},
                        bgcolor: "#343434",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box 
                        sx={{
                            width: {xs: "124.48px", md: "218.06px"},
                            height: {xs: "124.48px", md: "218.06px"}
                        }}
                    >
                        <img
                            src={song.song_cover} alt={`${song.song_title} song cover`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>
                </Box>

                <Typography
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "10.85px", md: "19px"},
                        lineHeight: {xs: "13.7px", md: "24px"},
                        letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                        // color: "#fff",
                        my: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
                    }}
                > { song.song_title } </Typography>


                <Typography
                    sx={{
                        display: albumType == "Album" ? "block" : "none",
                        fontWeight: "400",
                        fontSize: {xs: "8.02px", md: "15px"},
                        lineHeight: {xs: "12.83px", md: "24px"},
                        // letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                        color: "#979797",
                        mb: {md: 1}
                    }}
                > Album </Typography>

                <ReleaseStatusComponent status={song.status} />

            </Box>
        </Grid>
    );

      
    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>

                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Box></Box>
                </Stack>


                <Typography 
                    sx={{
                        fontWeight: "900",
                        // fontSize: {xs: "39.96px", md: "60px"},
                        fontSize: {xs: "35px", md: "60px"},
                        lineHeight: {xs: "24px", md: "24px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                        my: {xs: "50px", md: "100px"},
                    }}
                > Your Releases </Typography>


                <Box 
                    sx={{ 
                        width: "100%",
                        maxWidth: {xs: "401.95px", md: "518px"},
                        height: {xs: "39px", md: "50.26px"},
                        borderRadius: {xs: "7.55px", md: "9.73px"},
                        bgcolor: "#D9D9D9",

                        border: {xs: "0.63px solid #000000", md: "0.81px solid #000000"},
                        my: {xs: 2, md: 4},
                        mx: "auto",
                        px: "2px",

                        display: "flex",
                        alignItems: "center",
                    }} 
                >
                    <Box onClick={() => setAlbumType('Single') }
                        sx={ albumType === "Single" ? {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            bgcolor: "#000000",
                            border: {xs: "0.63px solid #FFFFFF", md: "0.81px solid #FFFFFF" },
                            borderRadius: {xs: "7.55px", md: "9.73px"},
                            color: "#CACACA",

                            display: "flex",
                            alignItems: "center",
                        } : {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            color: "#666666",

                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "22.02px", md: "28.37px"},
                                lineHeight: {xs: "15.1px", md: "19.46px"},
                                letterSpacing: {xs: "-0.84px", md: "-1.09px"},
                                mx: 'auto'
                            }}
                        > Single </Typography>
                    </Box>

                    <Box onClick={() => setAlbumType('Album') }
                        sx={ albumType === "Single" ? {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            color: "#666666",

                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        } : {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            bgcolor: "#000000",
                            border: {xs: "0.63px solid #FFFFFF", md: "0.81px solid #FFFFFF" },
                            borderRadius: {xs: "7.55px", md: "9.73px"},
                            color: "#CACACA",

                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "22.02px", md: "28.37px"},
                                lineHeight: {xs: "15.1px", md: "19.46px"},
                                letterSpacing: {xs: "-0.84px", md: "-1.09px"},
                                m: 'auto'
                            }}
                        > Album </Typography>
                    </Box>
                </Box>

                <Grid container spacing="20px">
                    {
                        albumType === "Single" ? (
                            singleRelease ? 
                                singleRelease.length ?
                                    singleRelease.map((song, index) => (
                                        songView(song, index)
                                    ))
                                : <EmptyListComponent notFoundText={apiResponse.message} />
                            : <LoadingDataComponent />
                        ) : (
                            albumSongs ? 
                                albumSongs.length ?
                                    albumSongs.map((song, index) => (
                                        songView(song, index)
                                    ))
                                : <EmptyListComponent notFoundText={apiResponse.message} />
                            : <LoadingDataComponent />
                        )
                    }
                </Grid>

            </Box>


        </AccountWrapper>
    )
}

export default AllMusic;
