import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
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
import { useCreateReleaseStore } from '@/state/createReleaseStore';

import colors from '@/constants/colors';
// import { useCart } from '@/hooks/useCart';
import { apiEndpoint } from '@/util/resources';
import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';
import SuccessModalComponent from '@/components/account/SuccessModal';
import PreSaveModalComponent from '@/components/account/PreSaveModal';
// import CircularProgress from '@mui/material/CircularProgress';
import { usePreOrderHook } from '../usePreOrderHook';


function CreateAlbumReleaseOverview() {
    const navigate = useNavigate();
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);

    const _handleSetAlbumRelease = useCreateReleaseStore((state) => state._handleSetAlbumRelease);
    // const _removeAlbumReleaseSongUpload = useCreateReleaseStore((state) => state._removeAlbumReleaseSongUpload);
    const _handleClearAlbumRelease = useCreateReleaseStore((state) => state._handleClearAlbumRelease);
    // const { handleAddToCart } = useCart();

    // const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [preSaveModal, setPreSaveModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const { handleSkipPreOrder } = usePreOrderHook();

    const deleteSong = async (index: number) => {
        if (!albumRelease.songs) return;
        const song = albumRelease.songs[index];

        try {
            const response = (await axios.delete(
                `${apiEndpoint}/releases/album/${ albumRelease._id || '' }/delete-song/${ song._id || '' }`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            // console.log(response);
            
            if (response.result) {
                _handleSetAlbumRelease(response.result);
                _setToastNotification({
                    display: true,
                    status: "info",
                    message: response.message
                });
            }

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

    // const onSubmit = async (preOrderState: boolean) => {
    //     setApiResponse({
    //         display: false,
    //         status: true,
    //         message: ""
    //     });
    //     setIsFormSubmitting(true);

    //     try {
    //         const response = (await axios.patch(
    //             `${apiEndpoint}/releases/album/save-release/${ albumRelease._id || '' }`,
    //             { preSave: preOrderState },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`
    //                 },
    //             }
    //         )).data;
    //         // console.log(response);
    //         setIsFormSubmitting(false);
            
    //         if (response.result) {
    //             setOpenSuccessModal(true);

    //             // clear the release from memory and rest the state
    //             _handleClearAlbumRelease();

    //             handleAddToCart({
    //                 release_id: albumRelease._id || '',
    //                 user_email: userData.email,
    //                 user_id: userData._id || '',
    //                 artistName: albumRelease.mainArtist.spotifyProfile.name,
    //                 coverArt: albumRelease.coverArt,
    //                 price: 45,
    //                 preSaveAmount: preOrderState ? 20 : 0,
    //                 releaseType: albumRelease.releaseType,
    //                 title: albumRelease.title 
    //             });

    //             navigate("/account/cart");
    //             setOpenSuccessModal(false);
    //         }

    //     } catch (error: any) {
    //         setIsFormSubmitting(false);
    //         const err = error.response && error.response.data ? error.response.data : error;
    //         const fixedErrorMsg = "Ooops and error occurred!";
    //         console.log(err);
            
    //         setApiResponse({
    //             display: true,
    //             status: false,
    //             message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
    //         });
    //     }

    // }


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={6} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
                                <IconButton 
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        color: colors.primary, 
                                        mb: 2,
                                        display: {xs: "none", sm: "block"}
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>

                                <Typography variant='h3'
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "24.74px", sm: "30px"},
                                        lineHeight: {xs: "26.31px", sm: "50.77px"},
                                        letterSpacing: {xs: "-0.55px", sm: "-1.07px"},
                                    }}
                                > Overview </Typography>
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
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
                                        px: {xs: "10px", sm: "25px"},
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography variant='h3'
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "15px", sm: "20px"},
                                            lineHeight: {xs: "20px", sm: "40px"},
                                            letterSpacing: {xs: "-0.06px", sm: "-0.13px"}
                                        }}
                                    >Details</Typography>

                                    <Typography onClick={() => {
                                        navigate({
                                            pathname: "/account/create-album-release-details",
                                            search: `?${createSearchParams({
                                                release_id: albumRelease._id || ''
                                            })}`,
                                        });
                                    }}
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
                                        bgcolor: colors.secondary,
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
                                    > { albumRelease.title } : { albumRelease.mainArtist.spotifyProfile.name } </Typography>

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
                                            > { albumRelease.releaseDate } </Typography>
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
                                            > { albumRelease.labelName } </Typography>
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
                                            > { albumRelease.upc_ean } </Typography>
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
                                            > { albumRelease.primaryGenre } </Typography>
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
                                            > { albumRelease.secondaryGenre } </Typography>
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
                                            > { albumRelease.language } </Typography>
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
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
                                        borderBottom: {xs: "0.45px solid #FFFFFF", sm: "1px solid #FFFFFF"},
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
                                        onClick={() => {
                                            navigate({
                                                pathname: "/account/create-album-release-select-stores",
                                                search: `?${createSearchParams({
                                                    release_id: albumRelease._id || ''
                                                })}`,
                                            });
                                        }}
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
                                        bgcolor: colors.secondary,

                                        display: "flex",
                                        justifyItems: "center",
                                        alignItems: "center",
                                        textAlign: "center"
                                    }}
                                >
                                    { albumRelease.stores.toString() }
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
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
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
                                        onClick={() => {
                                            navigate({
                                                pathname: "/account/create-album-release-select-stores",
                                                search: `?${createSearchParams({
                                                    release_id: albumRelease._id || ''
                                                })}`,
                                            });
                                        }}
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
                                        { albumRelease.socialPlatforms.toString() }
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    maxWidth: {xs: "330px", sm: "892px"},
                                    border: {
                                        xs: `0.45px solid #272727`, 
                                        sm: `1px solid #272727`
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
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
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
                                        onClick={() => {
                                            navigate({
                                                pathname: "/account/create-album-release-song-upload",
                                                search: `?${createSearchParams({
                                                    release_id: albumRelease._id || ''
                                                })}`,
                                            });
                                        }}
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
                                        bgcolor: colors.secondary,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyItems: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {
                                        // albumReleaseSongUpload.map((item, i) => (
                                            albumRelease.songs.map((item, i) => (
                                            <Box key={i} width="100%">
                                                {
                                                    <SongPreviewComponent key={i}
                                                        // songAudio={item.songAudioPreview}
                                                        songAudio={item.songAudio} 
                                                        songTitle={item.songTitle}
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
                                        xs: `0.45px solid #272727`, 
                                        sm: `1px solid #272727`
                                    },
                                    borderRadius: {xs: "5.42px", sm: "12px"},
                                    overflow: "hidden",
                                    mt: "25px",
                                    mx: "auto",
                                    bgcolor: colors.secondary
                                }}
                            >
                                <Box
                                    sx={{
                                        height: {xs: "32.53px", sm: "72px"},
                                        bgcolor: colors.tertiary,
                                        color: colors.milk,
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
                                        onClick={() => {
                                            navigate({
                                                pathname: "/account/create-album-release-album-art",
                                                search: `?${createSearchParams({
                                                    release_id: albumRelease._id || ''
                                                })}`,
                                            });
                                        }}
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
                                        width: {xs: "90%", sm: "347px"}, 
                                        maxWidth: {xs: "330px", sm: "892px"}, 
                                        mx: "auto",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: colors.tertiary,
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", sm: "326px"},
                                            // width: {xs: "128.45px", sm: "347px"},
                                            // width: "100%",
                                            my: {xs: "10px", sm: "20px"},
                                            p: {xs: "5px 5px 10px 5px", sm: "5px 5px 25px 5px"},

                                            backgroundImage: `url(${ albumRelease.coverArt })`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    ></Box>
                                </Box>
                            </Box>

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Stack justifyContent="center" alignItems="center">

                                <Button variant="contained" fullWidth
                                    onClick={() => setPreSaveModal(true)}
                                    // disabled={ isFormSubmitting } 
                                    sx={{ 
                                        bgcolor: colors.primary,
                                        maxWidth: "312px",
                                        color: colors.milk,
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
                                        my: 3, py: 1.5,
                                        fontSize: {sm: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                >Save Release
                                    {/* {
                                        isFormSubmitting ? (
                                            <CircularProgress size={25} 
                                                sx={{ color: colors.primary, fontWeight: "bold", mx: 'auto' }} 
                                            />
                                        ) : <span>Save Release</span>
                                    } */}
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <PreSaveModalComponent 
                handleSubmit={(state) => {
                    // onSubmit(state);
                    setPreSaveModal(false);

                    navigate({
                        pathname: `/account/create-release-preorder/${albumRelease._id}`,
                        search: `?${createSearchParams({ 
                            releaseType: albumRelease.releaseType,
                            preOrder: state ? '1' : '0',
                        })}`,
                    });
                }}
                openModal={preSaveModal}
                closeModal={() => {
                    setPreSaveModal(false);

                    setOpenSuccessModal(true);

                    handleSkipPreOrder(albumRelease);

                    setTimeout(() => {
                        // navigate("/account/cart");
                        setOpenSuccessModal(false);

                        // clear the release from memory and rest the state
                        _handleClearAlbumRelease();
                    }, 1000);
                }}
            />
            
            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />

        </AccountWrapper>
    )
}

export default CreateAlbumReleaseOverview;