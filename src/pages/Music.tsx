import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import Iheartradio from "@/assets/branded/images/dsp/Iheartradio.png";
import Itunes from "@/assets/branded/images/dsp/Itunes.png";
import Spotify from "@/assets/branded/images/dsp/spotify.png";
import soundCloud from "@/assets/branded/images/dsp/soundCloud.png";
import amazonMusic from "@/assets/branded/images/dsp/amazonMusic.png";
import appleMusic from "@/assets/branded/images/dsp/appleMusic.png";
import audioMack from "@/assets/branded/images/dsp/audioMack.png";
import napster from "@/assets/branded/images/dsp/napster.png";
import tidal from "@/assets/branded/images/dsp/tidal.png";
import youtube from "@/assets/branded/images/dsp/youtube.png";
import youtubeMusic from "@/assets/branded/images/dsp/youtubeMusic.png";
import deezer from "@/assets/branded/images/dsp/deezer.png";
import tiktok from "@/assets/branded/images/dsp/tiktok.png";
import soundMuve from "@/assets/branded/soundMuve.png";

import colors from '@/constants/colors';
import { apiEndpoint } from '@/util/resources';
import { releaseInterface } from '@/typeInterfaces/release.interface';
import LoadingDataComponent from '@/components/LoadingData2';

declare global {
    interface Window {
        drift?: any;
        driftt?: any;
    }
}

const musicDsps = [
    {
        id: 1,
        name: "Spotify",
        imageLogo: Spotify,
        bgColor: "#C8F452",
        textColor: "#000",
        btnText: "Play",
    },
    {
        id: 2,
        name: "Apple music",
        imageLogo: appleMusic,
        bgColor: "linear-gradient(90deg, #FF6884 0%, #E00029 100%)",
        textColor: "#fff",
        btnText: "Play",
    },
    {
        id: 3,
        name: "Amazon music",
        imageLogo: amazonMusic,
        bgColor: "#FFB01F",
        textColor: "#000",
        btnText: "Play",
    },
    {
        id: 4,
        name: "Youtube",
        imageLogo: youtube,
        bgColor: "#CD201F",
        textColor: "#fff",
        btnText: "Play",
    },
    {
        id: 5,
        name: "iTunes Store",
        imageLogo: Itunes,
        bgColor: "linear-gradient(90deg, #F53FC6 -0.15%, #D135FA 100.15%)",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 6,
        name: "TIDAL",
        imageLogo: tidal,
        bgColor: "#000000",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 7,
        name: "Youtube Music",
        imageLogo: youtubeMusic,
        bgColor: "#CD201F",
        textColor: "#fff",
        btnText: "Play",
    },
    {
        id: 8,
        name: "Audio mack",
        imageLogo: audioMack,
        bgColor: "linear-gradient(90deg, #F3A408 0%, #FD8309 100%)",
        textColor: "#fff",
        btnText: "Play",
    },
    {
        id: 9,
        name: "Napster",
        imageLogo: napster,
        bgColor: "#000000",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 10,
        name: "iHeartRADIO",
        imageLogo: Iheartradio,
        bgColor: "#F21515",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 11,
        name: "Soundcloud",
        imageLogo: soundCloud,
        bgColor: "linear-gradient(185.75deg, #FF9C28 46.56%, #E80000 132.64%)",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 12,
        name: "Tiktok",
        imageLogo: tiktok,
        bgColor: "linear-gradient(185.75deg, #EE1D52 46.56%, #69C9D0 132.64%)",
        textColor: "#fff",
        btnText: "Download",
    },
    {
        id: 13,
        name: "DEEZER",
        imageLogo: deezer,
        bgColor: "#B646FF",
        textColor: "#fff",
        btnText: "Download",
    },
];

function Music() {
    const { code } = useParams();
    const [releaseDetails, setReleaseDetails] = useState<releaseInterface>();
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    useEffect(() => {
        getMusicLinks4rmReleases();

        hideDriftWhenLoaded();
    }, []);

    const hideDriftWhenLoaded = () => {
        let attempt = 0;
        const maxRetries = 100;
        const interval = 500; // Retry every 500ms

        const checkDrift = setInterval(() => {
            if (window.drift && window.drift.ready) {
                window.drift.hide();
                clearInterval(checkDrift); // Stop retrying once Drift is hidden
            } else if (attempt >= maxRetries) {
                clearInterval(checkDrift); // Stop after max attempts
            }
            attempt++;
        }, interval);
    };


    const getMusicLinks4rmReleases = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/releases/musicLinks/${code}`)).data;
            // console.log(response);

            if (response.status) {
                setReleaseDetails(response.result);
            }

            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });

        } catch (error: any) {
            const err = error.response.data || error;
            const fixedErrorMsg = "Ooops and error occurred!";
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }


    const displaySelectedDspBtnText = (name: string, releaseDetails: releaseInterface) => {
        // if (releaseDetails.preSave && releaseDetails.status == "Pre-Saved") {
        if (releaseDetails.status == "Pre-Saved") {
            return "Pre-Saved";
        } else {
            const country = musicDsps.find((value) => value.name == name);
            return country ? country.btnText : "Play";
        }
    }

    const getSelectedDspByName = (name: string) => {
        const country = musicDsps.find((value) => value.name == name);
        return country || null;
    }

    const handleOnClickedBtn = (url: string) => {
        // const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        const newWindow = window.open(url, "_blank", "noopener");
        if (newWindow) newWindow.opener = null;
    }


    const musicDspCard = (name: string, url: string, releaseDetails: releaseInterface) => (
        <Box
            sx={{
                // activeLocationData
                background: getSelectedDspByName(name)?.bgColor || colors.tertiary,
                borderRadius: "20px",
                height: "92px",
                border: `1px solid #000000`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box width="100%">
                <Stack direction="row" spacing="15px" p={2} my="auto"
                    alignItems='center' justifyContent="space-between"
                >
                    <Stack direction="row" spacing="5px" alignItems='center'>
                        <Avatar variant="rounded"
                            alt={name}
                            src={getSelectedDspByName(name)?.imageLogo}
                        // sx={{ width: "48px", height: "48px" }}
                        />

                        <Typography variant='subtitle1'
                            sx={{
                                color: getSelectedDspByName(name)?.textColor || "#fff",
                                // color: kolors.dark,
                                fontSize: "16px",
                                fontWeight: "600",
                                // lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                            }}
                        >{name}</Typography>
                    </Stack>

                    <Box onClick={() => handleOnClickedBtn(url)}
                        sx={{
                            py: 0.5,
                            px: 1.5,
                            width: "fit-content",
                            bgcolor: colors.bg,
                            borderRadius: 1,
                            cursor: "pointer"
                        }}
                    >
                        <Typography variant='subtitle1'
                            sx={{
                                color: colors.dark,
                                // color: kolors.dark,
                                fontSize: "16px",
                                fontWeight: "600",
                                // lineHeight: "11.101px",
                                letterSpacing: "-0.463px",
                                textAlign: "center",
                            }}
                        >{displaySelectedDspBtnText(name, releaseDetails)}</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>

    );

    const sortDspLinks = (dspLinks: { name: string; url: string }[]) => {
        // Create a map of the order of names in musicDsps for efficient lookup
        const orderMap = new Map(musicDsps.map((dsp, index) => [dsp.name, index]));

        return [...dspLinks].sort((a, b) => {
            return (orderMap.get(a.name) ?? Infinity) - (orderMap.get(b.name) ?? Infinity);
        });
    };


    return (
        <Box
            sx={{
                bgcolor: colors.bg,
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center"
            }}
        >
            <Box sx={{ pt: 2 }}>
                {
                    releaseDetails ?
                        <Container>
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "MusicRecording",
                                    "name": releaseDetails?.songs[0].songTitle, // song.title,
                                    "url": `https://soundmuve.com/music/${releaseDetails?.musicLinks?.code}`,
                                    // "duration": song.duration,
                                    "inAlbum": {
                                        "@type": "MusicAlbum",
                                        "name": releaseDetails?.title // song.albumName
                                    },
                                    "byArtist": {
                                        "@type": "Person",
                                        "name": releaseDetails?.mainArtist.spotifyProfile.name, // song.artistName,
                                        // "url": `https://soundmuve.com/artist/${song.artistId}`
                                        "url": `https://soundmuve.com/music/${releaseDetails?.musicLinks?.code}`
                                    }
                                }) }}
                            />

                            <Box
                                sx={{
                                    height: "417px",
                                    width: "100%",
                                    borderRadius: "25px",
                                    bgcolor: colors.tertiary,
                                    // background: `url(${releaseDetails.coverArt})`,
                                    backgroundImage: `url(${releaseDetails.coverArt})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",

                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: { xs: "10px", md: "20px" },
                                        left: { xs: "10px", md: "20px" },
                                    }}
                                >
                                    <Chip
                                        avatar={<Avatar
                                            alt={releaseDetails.mainArtist.spotifyProfile.name}
                                            src={releaseDetails.mainArtist.spotifyProfile.profilePicture}
                                        />}
                                        label={releaseDetails.mainArtist.spotifyProfile.name}
                                        variant="outlined"
                                        sx={{ bgcolor: colors.tertiary, color: colors.milk, fontWeight: "900" }}
                                    />
                                </Box>
                            </Box>

                            <Box my={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "24px",
                                        // lineHeight: "24px",
                                        color: colors.dark,
                                        textAlign: "center",
                                        textTransform: "uppercase"
                                    }}
                                >{releaseDetails.title}</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "16px",
                                        // lineHeight: "19px",
                                        color: "#6C6050",
                                        textAlign: "center",
                                    }}
                                >Choose how you enjoy your music</Typography>
                            </Box>

                            <Box>
                                <Grid container spacing="15px">
                                    {
                                        releaseDetails && releaseDetails.musicLinks ?
                                            sortDspLinks(releaseDetails.musicLinks.dspLinks).map((items, index) => (
                                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                                    {musicDspCard(items.name, items.url, releaseDetails)}
                                                </Grid>
                                            ))
                                            : <></>
                                    }
                                </Grid>
                            </Box>
                        </Container>
                    : apiResponse.display ?
                        <Box my={3}>
                            <Navigate replace to={"/music"} />
                        </Box>
                    : <Stack direction="row" alignItems="center" justifyContent="center" height="90vh">
                        <LoadingDataComponent />
                    </Stack>
                }
            </Box>

            <Box onClick={() => handleOnClickedBtn("https://soundmuve.com")}
                sx={{
                    // padding: "15px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // gap: "15px",
                    position: "fixed",
                    right: { xs: "15px", sm: "20px", md: "30px" },
                    bottom: "7%",
                    width: { xs: "120px", sm: "130px", md: "150px" },
                    height: { xs: "30px", sm: "35px", md: "40px" },
                    background: "#0C2634",
                    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
                    borderRadius: "28.5px",
                    cursor: "pointer",
                }}
            >
                <Box sx={{ p: "15px 20px" }}>
                    <img
                        alt='soundMuve logo'
                        src={soundMuve}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            <Box marginTop="auto">
                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "19px",
                        color: colors.dark,
                        textAlign: "center",
                        my: 2
                    }}
                >Powered by <b> SoundMuve</b> </Typography>
            </Box>
        </Box>
    )
}

export default Music;
