import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import albumImage from '@/assets/images/album.png';
import dashHappyGuyImage from '@/assets/images/dashHappyGuy.png';
import setPayoutImg from '@/assets/branded/images/account/setPayoutImg.png';

import AccountWrapper from '@/components/AccountWrapper';
import AlbumSongItem from '@/components/account/AlbumSongItem';
import NewReleaseModalComponent from '@/components/account/NewReleaseModal';
import ReleaseStatusComponent from '@/components/ReleaseStatus';
import PaymentzComponent from '@/components/account/payments/PaymentzComponent';

import { useUserStore } from '@/state/userStore';
// import { useSettingStore } from '@/state/settingStore';
import { useReleaseStore } from '@/state/releaseStore';

import { apiEndpoint, currencyDisplay } from '@/util/resources';
import { getLocalStorage, setLocalStorage } from '@/util/storage';
import colors from '@/constants/colors';
import { releaseInterface } from '@/constants/typesInterface';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { homeSelectStyle } from '@/util/mui';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';


function DashboardArtist() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);
    const [releases, setReleases] = useState<releaseInterface[]>();
    const { paymentDetails, getPayoutInfo } = usePayoutData();

    // const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    // const [apiResponse, setApiResponse] = useState({
    //     display: false,
    //     status: true,
    //     message: ""
    // });

    const [openReleaseModal, setOpenReleaseModal] = useState(false);
    const closeReleaseModal = () => { setOpenReleaseModal(false) };

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);

    const handleGetSingleRelease = () => {
        setReleases(undefined);

        const localResponds = getLocalStorage("singleRelease");
        if (localResponds && localResponds.length) setReleases(localResponds);
        
        getSingleRelease();
    }

    useEffect(() => {
        handleGetSingleRelease();
        getPayoutInfo();
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
            setReleases(response);

            // if (!response.length) {
            //     setApiResponse({
            //         display: true,
            //         status: true,
            //         message: "You don't have any single Release yet."
            //     });
            // }

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setReleases([]);

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }

    const getAlbumRelease = async () => {
        setReleases(undefined);

        // setReleases(albumSongs);

        try {
            // const response = (await axios.get(`${apiEndpoint}/songs/GetMyAlbumsByEmail?email=latham01@yopmail.com`, {
            const response = (await axios.get(`${apiEndpoint}/songs/GetMyAlbumsByEmail?email=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setLocalStorage("singleRelease", response.albums);
            setReleases(response.albums);

            // if (!response.length) {
            //     setApiResponse({
            //         display: true,
            //         status: true,
            //         message: "You don't have any single Release yet."
            //     });
            // }

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setReleases([]);

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }
    }

    const viewSong = (song: releaseInterface, index: number) => (
        <Grid item xs={6} md={4} key={index}>
            <Box 
                sx={{ 
                    width: "100%",
                    maxWidth: {xs: "196.38px", md: "345px"},
                    mx: "auto"
                }}
                onClick={() => {
                    navigate(`/account/artist/${albumType == "Album" ? "album-details" : "song-details"}`);

                    _setSongDetails({
                        artist_name: song.artist_name,
                        cover_photo: song.song_cover || song.song_cover_url || albumImage,
                        email: song.email,
                        label_name: song.label_name,
                        primary_genre: song.primary_genre,
                        secondary_genre: song.secondary_genre,
                        song_title: song.album_title || song.song_title || '',
                        stream_time: '',
                        streams: "",
                        total_revenue: "",
                        upc_ean: song.upc_ean
                    });
                }}
            >
                <Box
                    sx={{
                        // width: "100%",
                        // maxWidth: {xs: "196.38px", md: "345px"},
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
                            src={ song.song_cover || song.song_cover_url || albumImage } 
                            alt={`${song.song_title} song cover`}
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
                        m: {xs: "8px 0 0 0", md: "8px 0 8px 0"}
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
    )

    const handleOnclickedSong = (release: releaseInterface, albumSongIndex: number = 0) => {

        // albumType == "Album" 

        if (albumType == "Single") {
            
            _setSongDetails({
                email: release.email,
                song_title: release.song_title || '',
                artist_name: release.artist_name,
                cover_photo: release.song_cover || release.song_cover_url || '',
                primary_genre: release.primary_genre || '',
                secondary_genre: release.secondary_genre || '',
                label_name: release.label_name || '',
                upc_ean: release.upc_ean || '',
                total_revenue: '',
                streams: '',
                stream_time: '',
            });
            
        } else if (albumType == "Album") {
            let upc_ean = '';
            if (release.songs) {
                upc_ean = release.songs[albumSongIndex].upc_ean || release.songs[albumSongIndex].isrc_number;
            }
            
            _setSongDetails({
                email: release.email,
                song_title: release.song_title || '',
                artist_name: release.artist_name,
                cover_photo: release.song_cover_url || release.song_cover || '',
                primary_genre: release.primary_genre,
                secondary_genre: release.secondary_genre,
                label_name: release.label_name,
                upc_ean: upc_ean,
                total_revenue: '',
                streams: '',
                stream_time: '',
            });
            
        }

        navigate("/account/artist/song-details");
    }


    return (
        <AccountWrapper>
            <Box >
                <Typography variant='h1' component="h1"
                    sx={{
                        fontFamily: "Nohemi",
                        fontWeight: "900",
                        // fontSize: {xs: "39.96px", md: "60px"},
                        fontSize: {xs: "35px", md: "60px"},
                        lineHeight: {xs: "42.49px", md: "63.8px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                    }}
                > Welcome { userData.firstName } 👋 </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexWrap: "wrap",
                            rowGap: "20px",
                            columnGap: "10px",
                            my: "60px",
                        }}
                    >
                        <Box 
                            sx={{
                                width: "100%",
                                maxWidth: "329px",
                                height: "185px",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: {xs: "14.34px", md: "12px"},
                                bgcolor: colors.dark,
                                color: "#fff", 
                                p: {xs: "15px", md: "18px"},
                                alignSelf: "center"
                            }}
                        >
                            <Typography variant='body1'
                                sx={{
                                    fontFamily: "Geist",
                                    fontWeight: "800",
                                    fontSize: "25px",
                                    lineHeight: "40px",
                                    letterSpacing: "-0.13px",
                                }}
                            > Balance </Typography>

                            <Box 
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",

                                    // gap: 10,
                                    mt: "auto"
                                }}
                            >
                                <Typography noWrap onClick={() => navigate("/account/artist/balance-history") }
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "25px",
                                        lineHeight: "40px",
                                        letterSpacing: "-0.13px",
                                        cursor: 'pointer'
                                    }}
                                >{ currencyDisplay(Number(userData.balance)) }</Typography>

                                <Box onClick={() => setWithdrawlModal(true) }
                                    sx={{
                                        p: "10px 29px",
                                        borderRadius: "12px",
                                        // background: "#fff",
                                        bgcolor: colors.primary,
                                        color: "#000",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Typography variant='body1'
                                        sx={{
                                            fontFamily: "Geist",
                                            fontWeight: '800',
                                            fontSize: "15px",
                                            lineHeight: "13px",
                                            letterSpacing: "-0.13px",
                                            textAlign: 'center',
                                            // color: "#000",
                                        }}
                                    > Withdraw </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box 
                            sx={{
                                width: "100%",
                                maxWidth: "329px",
                                height: "185px",
                                display: "flex",
                                flexDirection: "column",

                                borderRadius: "12px",
                                bgcolor: colors.dark,
                                color: "#fff",

                                p: "18px",
                                alignSelf: "center"
                            }}
                        >
                            <Typography variant='h3' sx={{
                                fontFamily: "Geist",
                                fontWeight: "800",
                                fontSize: "25px",
                                lineHeight: "40px",
                                letterSpacing: "-0.13px",
                                textAlign: "center",
                            }}>Add new Release</Typography>

                            <Box 
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 10,
                                    mt: "auto",
                                    mx: "auto"
                                }}
                            >
                                <Box 
                                    onClick={() => setOpenReleaseModal(true) }
                                    sx={{
                                        p: "10px 29px",
                                        borderRadius: "12px",
                                        bgcolor: colors.milk,
                                        cursor: "pointer",
                                        color: "#000"
                                    }}
                                >
                                    <Typography variant='h3' sx={{
                                        fontFamily: "Geist",
                                        fontWeight: '800',
                                        fontSize: "15px",
                                        lineHeight: "13px",
                                        letterSpacing: "-0.13px",
                                        textAlign: 'center',
                                        // color: "#000",
                                    }}> Get Started </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box 
                            sx={{
                                width: "100%",
                                maxWidth: "329px",
                                height: "185px",

                                display: "flex",
                                flexDirection: "column",
                                borderRadius: "12px",
                                bgcolor: colors.dark,
                                color: "#fff",

                                p: "18px",
                                alignSelf: "center",
                                textAlign: 'center'
                            }}
                        >
                            <Typography variant='h3' sx={{
                                fontFamily: "Geist",
                                fontWeight: "800",
                                fontSize: "25px",
                                lineHeight: "40px",
                                letterSpacing: "-0.13px",
                            }}>Music Analytics</Typography>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 10,
                                mt: "auto",
                                mx: "auto"
                            }}>
                                <Link to="/account/artist/sales-report" style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    border: "none",
                                    outline: "none",
                                }}>
                                    <Box sx={{
                                        p: "10px 29px",
                                        borderRadius: "12px",
                                        bgcolor: colors.milk
                                    }}>
                                        <Typography variant='body1' sx={{
                                            fontWeight: '900',
                                            fontSize: "15px",
                                            lineHeight: "13px",
                                            letterSpacing: "-0.13px",
                                            textAlign: 'center',
                                            color: "#000",
                                        }}> View Analytics </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Box 
                        sx={{
                            width: "100%",
                            minWidth: "300px",
                            // maxWidth: "393.21px",
                            height: "221.11px",
                            display: "flex",
                            flexDirection: "column",

                            borderRadius: "14.34px",
                            bgcolor: colors.dark,
                            color: "#fff", 

                            p: "18px",
                            alignSelf: "center",
                            mt: "60px",
                            mb: "20px",
                            mx: "auto"
                        }}
                    >
                        <Typography sx={{
                            fontFamily: "Geist",
                            fontWeight: "800",
                            fontSize: "29.88px",
                            lineHeight: "47.81px",
                            letterSpacing: "-0.16px",
                        }}>Add new Release</Typography>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 10,
                            mt: "auto",
                            mx: "auto"
                        }}>
                            <Link to="/account/create-single" style={{
                                textDecoration: "none",
                                color: "#000000",
                                border: "none",
                                outline: "none",
                            }}>
                                <Box sx={{
                                    p: "11.95px 34.66px",
                                    borderRadius: "14.34px",
                                    bgcolor: colors.milk,
                                }}>
                                    <Typography variant='body1' sx={{
                                        fontFamily: "Geist",
                                        fontWeight: '800',
                                        fontSize: "17.93px",
                                        lineHeight: "15.54px",
                                        letterSpacing: "-0.16px",
                                        textAlign: 'center',
                                    }}> Get Started </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Box>

                    <Box 
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            // flexWrap: "wrap",
                            gap: "20px",
                            // rowGap: "20px",
                            // columnGap: "10px",
                        }}
                    >
                        <Box 
                            sx={{
                                width: "100%",
                                maxWidth: '47%',
                                height: "214px",
                                borderRadius: "6.81px",
                                bgcolor: colors.dark,
                                color: "#fff",

                                display: "flex",
                                flexDirection: "column",
                                p: "15px",
                            }}
                        >
                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "800",
                                fontSize: "14.19px",
                                lineHeight: "22.7px",
                                letterSpacing: "-0.07px",
                            }}> Balance </Typography>

                            <Box 
                                sx={{
                                    mx: "auto",
                                    maxWidth: "100%",
                                    // gap: "30px",
                                    mt: "auto"
                                }}
                            >
                                <Typography variant='h3' component="h3" noWrap
                                    onClick={() => navigate("/account/artist/balance-history") }
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "22.7px",
                                        letterSpacing: "-0.07px",
                                        cursor: "pointer",
                                        mb: "30px"
                                    }}
                                >{ currencyDisplay(Number(userData.balance)) } </Typography>

                                <Box onClick={() => setWithdrawlModal(true) } sx={{
                                    p: "8.97px 26px 8.97px 26px",
                                    borderRadius: "10.76px",
                                    bgcolor: colors.primary,
                                    cursor: 'pointer',
                                }}>
                                    <Typography variant='body1' sx={{
                                        fontFamily: "Geist",
                                        fontWeight: '800',
                                        fontSize: "13.45px",
                                        lineHeight: "11.66px",
                                        letterSpacing: "-0.12px",
                                        textAlign: 'center',
                                        color: "#000",
                                    }}> Withdraw </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box 
                            sx={{
                                width: "100%",
                                maxWidth: '47%',
                                height: "214px",
                                borderRadius: "6.81px",
                                bgcolor: colors.dark,
                                color: "#fff",

                                display: "flex",
                                flexDirection: "column",
                                p: "15px",
                            }}
                        >
                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "800",
                                fontSize: "14.19px",
                                lineHeight: "22.7px",
                                letterSpacing: "-0.07px",
                            }}>Music Analytics</Typography>

                            <Box 
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "30px",
                                    mt: "auto",
                                    mx: "auto"
                                }}
                            >
                                <Link to="/account/artist/sales-report" style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    border: "none",
                                    outline: "none",
                                }}>
                                    <Box sx={{
                                        p: "8.97px 26px",
                                        borderRadius: "10.76px",
                                        bgcolor: colors.milk,
                                    }}>
                                        <Typography variant='body1'
                                            sx={{
                                                fontFamily: "Geist",
                                                fontWeight: '800',
                                                fontSize: "13.45px",
                                                lineHeight: "11.66px",
                                                letterSpacing: "-0.12px",
                                                textAlign: 'center',
                                                color: "#000",
                                            }}
                                        > Analytics </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Setup pAyout */}
                <Box
                    sx={{
                        borderRadius: "4.48px",
                        padding: {xs: "15px", md: "30px 20px"},
                        bgcolor: "#E2CBA2",
                        color: colors.dark,

                        display: paymentDetails.length ? "none" : "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        my: "30px",

                        position: "relative",
                        overflow: "hidden"
                    }}
                >
                    <Box zIndex={2}>
                        <Typography variant='h2'
                            sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "20px", md: "35px"},
                                lineHeight: {xs: "23px", md: "38.01px"},
                                letterSpacing: {xs: "-0.5px", md: "-1.34px"},
                                maxWidth: "428.06px"
                            }}
                        > Don't Delay Getting Your Earnings </Typography>

                        <Typography variant='body2'
                            sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "9px", md: "16px"},
                                lineHeight: {xs: "14.93px", md: "40px"},
                                letterSpacing: {xs: "-0.05px", md: "-0.13px"}
                            }}
                        >
                            Set up your payout preferences now so you can always get paid on time.
                        </Typography>
                    </Box>


                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: {xs: "35px", sm: "75px", md: "101px"},
                            maxWidth: "432.01px",
                        }}
                    >
                        <img src={setPayoutImg} alt='payout design image'
                            style={{
                                width: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>

                    <Box onClick={() => setOpenPayoutModal(true) }
                        sx={{
                            p: {xs: "7.47px 21.65px 7.47px 21.65px", md: "10px 29px 10px 29px"},
                            borderRadius: {xs: "8.96px", md: "12px"},
                            background: "#fff",
                            color: "#000",
                            cursor: "pointer",
                            zIndex: 2
                        }}
                    >
                        <Typography variant='body1' noWrap
                            sx={{
                                fontFamily: "Geist",
                                fontWeight: '800',
                                fontSize: {xs: "11.2px", md: "15px"},
                                lineHeight: {xs: "9.71px", md: "13px"},
                                letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                textAlign: 'center',
                            }}
                        > Set up payout </Typography>
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: {xs: "157.13px", md: "416px"},
                        borderRadius: {xs: "4.53px", md: "12px"},

                        backgroundImage: `url(${dashHappyGuyImage})`, // Replace with your image URL
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',

                        position: 'relative',
                        overflow: "hidden",
                        my: 5,
                        p: {xs: 1, md: 5}
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            // background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0.08%, #000000 64.08%)',
                            background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #000000 109.84%)',
                        }}
                    />

                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: {xs: "110px", md: "280px"},
                            // textAlign: "center",
                            ml: "auto",
                            zIndex: 1
                        }}
                    >
                        <Typography variant='h2'
                            sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "13.22px", md: "35px"},
                                lineHeight: {xs: "12.46px", md: "33px"},
                                letterSpacing: {xs: "-0.51px", md: "-1.34px"},
                                color: "#FFFFFF",
                                mb: {xs: "35px", md: "45px"},
                            }}
                        > Ready to distribute your first release? </Typography>

                        <Box 
                            onClick={() => setOpenReleaseModal(true) }
                            sx={{
                                p: {xs: "7.55px 21.91px 7.55px 21.91px", md: "10px 29px 10px 29px"},
                                borderRadius: {xs: "9.06px", md: "12px"},
                                background: "#fff",
                                color: "#000",
                                cursor: "pointer"
                            }}
                        >
                            <Typography variant='body1'
                                sx={{
                                    fontFamily: "Geist",
                                    fontWeight: '800',
                                    fontSize: {xs: "11.33px", md: "15px"},
                                    lineHeight: {xs: "9.82px", md: "13px"},
                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                    textAlign: 'center',
                                    color: "#000",
                                }}
                            > Get Started </Typography>
                        </Box>
                    </Box>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center"
                    sx={{
                        mt: "50px",
                        display: {xs: "none", md: "flex"}
                    }}
                >
                    {/* <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "19.28px", md: "35px"},
                            lineHeight: {xs: "13.22px", md: "24px"},
                            letterSpacing: {xs: "-0.74px", md: "-1.34px"},
                            // color: "#FFFFFF",
                            my: 2
                        }}
                    > Your { albumType } </Typography> */}

                    <Box 
                        sx={{ 
                            width: "100%",
                            maxWidth: {xs: "401.95px", md: "518px"},
                            height: {xs: "39px", md: "50.26px"},
                            borderRadius: {xs: "7.55px", md: "9.73px"},
                            // bgcolor: "#D9D9D9",

                            border: {xs: "0.63px solid #000000", md: "0.81px solid #000000"},
                            my: {xs: 2, md: 4},
                            // mx: "auto",
                            px: "2px",

                            display: "flex",
                            alignItems: "center",
                        }} 
                    >
                        <Box onClick={() => { setAlbumType('Single'); handleGetSingleRelease(); } }
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

                        <Box onClick={() => { setAlbumType('Album'); getAlbumRelease(); } }
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

                    {
                        releases && releases.length ? 
                            <Link to="/account/artist/all-music">
                                <Box 
                                    sx={{
                                        p: "11px 29px",
                                        borderRadius: "12px",
                                        bgcolor: colors.dark,
                                        color: colors.milk
                                    }}
                                >
                                    <Typography variant='body1'
                                        sx={{
                                            fontFamily: "Geist",
                                            fontWeight: "800",
                                            fontSize: "15px",
                                            lineHeight: "13px",
                                            letterSpacing: "-0.13px"
                                        }}
                                    >See all your music</Typography>
                                </Box>
                            </Link>
                        : <></>
                    }

                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center"
                    sx={{
                        mt: "50px",
                        mb: "25px",
                        display: {xs: "flex", md: "none"}
                    }}
                >
                    <Box>
                        <FormControl>
                            <Select
                                labelId="language"
                                id="language-select"
                                label=""
                                // defaultValue="Select Language"
                                // placeholder='Select Language'
                                value={albumType}

                                sx={homeSelectStyle}

                                MenuProps={{
                                    sx: {
                                      "&& .Mui-selected": {
                                        color: colors.dark,
                                        background: colors.primary,
                                      },
                                    },
                                }}
                            
                                
                                onChange={(event) => {
                                    const value: any = event.target.value;
                                    setAlbumType(value);

                                    if (value == "Single") {
                                        handleGetSingleRelease();
                                        return;
                                    }

                                    if (value == "Album") {
                                        getAlbumRelease();
                                        return;
                                    }
                                }}
                            >
                                <MenuItem value="Single">
                                    Single
                                </MenuItem>
                                <MenuItem value="Album">
                                    Album
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {
                        releases && releases.length ? 
                            <Link to="/account/artist/all-music">
                                <Typography variant='body1'
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "800",
                                        fontSize: "15px",
                                        lineHeight: "13px",
                                        letterSpacing: "-0.13px",
                                        color: colors.primary
                                    }}
                                >See all your music</Typography>
                            </Link>
                        : <></>
                    }
                </Stack>

                <Grid container spacing="20px">
                    
                    {
                        releases && releases.length ?
                            releases.slice(0, 2).map((song, index) => (
                                viewSong(song, index)
                            ))
                        : <></>
                    }


                    <Grid item xs={6} md={4}>
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: {xs: "196.38px", md: "345px"},
                                mx: "auto"
                            }}
                        >
                            <Box
                                onClick={() => setOpenReleaseModal(true) }
                                sx={{
                                    height: {xs: "152.99px", md: "268px"},
                                    borderRadius: {xs: "6.85px", md: "12px"},
                                    // bgcolor: "#343434",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    border: "4px dashed #6C6050",
                                    cursor: "pointer"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: {xs: "65.65px", md: "115px"},
                                        height: {xs: "65.65px", md: "115px"},
                                        bgcolor: "#6C6050",
                                        borderRadius: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <AddIcon 
                                        sx={{
                                            color: "#fff",
                                            fontSize: {xs: "30px", md: "45px"}
                                        }}
                                    />
                                </Box>
                            </Box>

                        </Box>
                    </Grid>

                </Grid>

                { releases && releases.length && albumType == "Album" ? (
                    <Box sx={{my: 4}}>
                        <Grid container spacing="20px">
                            <Grid item xs={12} md={6}>
                                <Typography variant='h3'
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "19px"},
                                        lineHeight: {xs: "24px"},
                                        letterSpacing: {xs: "-1.34px"},
                                        color: "#666666",
                                        mb: 3
                                    }}
                                > Songs from { releases[0].album_title } Album </Typography>

                                {
                                    releases[0].songs && releases[0].songs.length ? (
                                        <Box>
                                            {releases[0].songs.map((item, index) => (
                                                <Box key={index} onClick={() => handleOnclickedSong(releases[0], index) }>
                                                    <AlbumSongItem 
                                                        artistName={ releases[0].artist_name}
                                                        artworkImage={releases[0].song_cover_url}
                                                        songTitle={item.song_title}
                                                        distributedDSP={["Apple", "Spotify"]} 
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : <></>
                                }

                            </Grid>

                            {
                                releases.length > 1 ? (
                                    <Grid item xs={12} md={6}
                                        sx={{ display: {xs: "none", md: "initial"} }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "19px"},
                                                lineHeight: {xs: "24px"},
                                                letterSpacing: {xs: "-1.34px"},
                                                color: "#666666",
                                                mb: 3
                                            }}
                                        > Songs from { releases[1].album_title } Album </Typography>

                                        {
                                            releases[1].songs && releases[1].songs.length ? (
                                                <Box>
                                                    {releases[1].songs.map((item, index) => (
                                                        <Box key={index} onClick={() => handleOnclickedSong(releases[1], index) }>
                                                            <AlbumSongItem 
                                                                artistName={ releases[1].artist_name}
                                                                artworkImage={releases[1].song_cover_url}
                                                                songTitle={item.song_title}
                                                                distributedDSP={["Apple", "Spotify"]} 
                                                            />
                                                        </Box>
                                                    ))}
                                                </Box>
                                            ) : <></>
                                        }

                                    </Grid>
                                ) : <></>
                            }

                        </Grid>
                    </Box>
                ) : <></> }

            </Box>

            <NewReleaseModalComponent 
                openReleaseModal={openReleaseModal}
                closeReleaseModal={closeReleaseModal}
            />

            {/* <PaymentComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            /> */}

            <PaymentzComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            />

        </AccountWrapper>
    )
}

export default DashboardArtist;
