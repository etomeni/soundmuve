import { useEffect, useState } from 'react';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

// import dashHappyGuyImage from '@/assets/images/dashHappyGuy.png';
import setPayoutImg from '@/assets/branded/images/account/setPayoutImg.png';

import AccountWrapper from '@/components/AccountWrapper';
import AlbumSongItem from '@/components/account/AlbumSongItem';
import NewReleaseModalComponent from '@/components/account/NewReleaseModal';
import PaymentzComponent from '@/components/account/payments/PaymentzComponent';

import { useUserStore } from '@/state/userStore';
// import { useSettingStore } from '@/state/settingStore';
import { useReleaseStore } from '@/state/releaseStore';

import { currencyDisplay } from '@/util/resources';
import colors from '@/constants/colors';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { homeSelectStyle } from '@/util/mui';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';
import { useGetReleases } from '@/hooks/release/useGetReleases';
import ViewSongItemComponent from '@/components/account/ViewSongItem';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import { releaseInterface } from '@/typeInterfaces/release.interface';


function DashboardArtist() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");
    const userData = useUserStore((state) => state.userData); 
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);
    const _setReleaseDetails = useReleaseStore((state) => state._setReleaseDetails);
    const { paymentDetails, getPayoutInfo } = usePayoutData();

    const { 
        limitNo,
        // apiResponse, setApiResponse,

        currentPageNo, // totalRecords,
        // totalPages,

        // singleReleases, albumReleases,
        releases, getReleases,
    } = useGetReleases();

    useEffect(() => {
        getReleases(
            currentPageNo, limitNo, 
            albumType == "Album" ? "album" : "single"
        );
        // getSingleRelease();
        getPayoutInfo();
    }, []);
    
    const [openReleaseModal, setOpenReleaseModal] = useState(false);
    const closeReleaseModal = () => { setOpenReleaseModal(false) };

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);


    const handleOnclickedSong = (release: releaseInterface, albumSongIndex: number = 0) => {
        if (release.status == "Live" || release.status == "Pre-Saved" || release.status == "Processing") {
            _setReleaseDetails(release);
    
            const song = release.songs[albumSongIndex];
    
            // if (albumType == "Single") {
            //     _setReleaseDetails(release);
            // } else 
            if (albumType == "Album" && release.songs) {
                _setSongDetails(song);
            }
            // navigate("/account/analytics/song-details");
    
    
            const params = {
                releaseId: release._id || '',
                songId: song._id || ''
            };
            navigate({
                pathname: "/account/analytics/song-details",
                search: `?${createSearchParams(params)}`,
            });
        }
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
                > Welcome { userData?.artistName } 👋 </Typography>

                {/* desktop view */}
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
                                <Typography noWrap onClick={() => navigate("/account/analytics/balance-history") }
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
                                <Link to="/account/analytics/sales-report" style={{
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

                {/* mobile view */}
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

                        <Box onClick={() => setOpenReleaseModal(true) }
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
                            <Box sx={{
                                p: "11.95px 34.66px",
                                borderRadius: "14.34px",
                                bgcolor: colors.milk,
                                color: colors.dark
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
                                    onClick={() => navigate("/account/analytics/balance-history") }
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
                                <Link to="/account/analytics/sales-report" style={{
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

                {/* Setup payout */}
                <Box
                    sx={{
                        borderRadius: "4.48px",
                        padding: {xs: "15px", md: "30px 20px"},
                        bgcolor: "#E2CBA2",
                        color: colors.dark,

                        display: paymentDetails && paymentDetails.length ? "none" : "flex",
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


                <Box my={5}>
                    <PromotionalAdsComponent />
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
                        <Box onClick={() => { setAlbumType('Single'); getReleases(1, 5, "single"); } }
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

                        <Box onClick={() => { setAlbumType('Album'); getReleases(1, 5, "album"); } }
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
                            <Link to="/account/analytics/all-music">
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
                                        getReleases(1, 5, "single");
                                        return;
                                    }

                                    if (value == "Album") {
                                        getReleases(1, 5, "album");
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
                            <Link to="/account/analytics/all-music">
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
                                // viewSong(song, index)
                                <Grid item xs={6} md={4} key={index}>
                                    <ViewSongItemComponent 
                                        releaseType={albumType}
                                        getAllReleases={() => {
                                            getReleases(
                                                currentPageNo, limitNo, 
                                                albumType == "Album" ? "album" : "single"
                                            );
                                        }}
                                        releaseDetails={song}
                                    />
                                </Grid>
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
                                onClick={() => {
                                    if (albumType == "Album" ) {
                                        navigate("/account/create-album-release-details");
                                    } else if (albumType == "Single") {
                                        navigate("/account/create-single-release");
                                    } else {
                                        setOpenReleaseModal(true);
                                    }
                                }}
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
                                > Songs from { releases[0].title } Album </Typography>

                                {
                                    releases[0].songs && releases[0].songs.length ? (
                                        <Box>
                                            {releases[0].songs.map((item, index) => (
                                                <Box key={index} onClick={() => handleOnclickedSong(releases[0], index) }>
                                                    <AlbumSongItem 
                                                        artistName={ releases[0].mainArtist.spotifyProfile.name}
                                                        artworkImage={releases[0].coverArt}
                                                        songTitle={item.songTitle}
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
                                        > Songs from { releases[1].title } Album </Typography>

                                        {
                                            releases[1].songs && releases[1].songs.length ? (
                                                <Box>
                                                    {releases[1].songs.map((item, index) => (
                                                        <Box key={index} onClick={() => handleOnclickedSong(releases[1], index) }>
                                                            <AlbumSongItem 
                                                                artistName={ releases[1].mainArtist.spotifyProfile.name}
                                                                artworkImage={releases[1].coverArt}
                                                                songTitle={item.songTitle}
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
