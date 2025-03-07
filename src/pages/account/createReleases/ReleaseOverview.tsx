import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
// import { useCreateReleaseStore } from '@/state/createReleaseStore';

import colors from '@/constants/colors';
// import { useCart } from '@/hooks/useCart';
import { apiEndpoint, getQueryParams } from '@/util/resources';
import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';
import SuccessModalComponent from '@/components/account/SuccessModal';
import PreSaveModalComponent from '@/components/account/PreSaveModal';
// import CircularProgress from '@mui/material/CircularProgress';
import { usePreOrderHook } from './usePreOrderHook';
import { useGetReleases } from '@/hooks/release/useGetReleases';
import LoadingDataComponent from '@/components/LoadingData';
import { releaseInterface } from '@/typeInterfaces/release.interface';


function ReleaseOverview() {
    const navigate = useNavigate();
    const { release_id } = useParams();
    const _id = getQueryParams("release_id");
    
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const { handleSkipPreOrder } = usePreOrderHook();

    // const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [preSaveModal, setPreSaveModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const { 
        getReleaseById,
        releaseDetails,
    } = useGetReleases();

    useEffect(() => {
        getReleaseById(release_id || _id);
    }, [release_id]);
    

    const deleteSong = async (index: number) => {
        if (!releaseDetails) return;
        if (!releaseDetails.songs) return;

        const song = releaseDetails.songs[index];

        try {
            const response = (await axios.delete(
                `${apiEndpoint}/releases/album/${ releaseDetails._id || '' }/delete-song/${ song._id || '' }`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            // console.log(response);
            
            if (response.result) {
                // _handleSetAlbumRelease(response.result);
                getReleaseById(releaseDetails._id || release_id || _id);

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

    const handleNavigation = (
        releaseData: releaseInterface,
        albumPath: "create-album-release-details" | "create-album-release-advance-features" | 
            "create-album-release-select-stores" | "create-album-release-song-upload" | 
            "create-album-release-album-art" | "create-album-release-overview",
        singlePath: "create-single-release" | "create-single-release-continue"
    ) => {
        if (releaseData.releaseType == "album") {
            navigate({
                // pathname: "/account/create-album-release-album-art",
                pathname: `/account/${albumPath}`,
                search: `?${createSearchParams({
                    release_id: releaseData._id || ''
                })}`,
            });
        } else {
            navigate({
                pathname: `/account/${singlePath}`,
                search: `?${createSearchParams({
                    release_id: releaseData._id || ''
                })}`,
            });
        }
    }


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box component="main" my={5}>
                <Box sx={{ display: {xs: 'none', sm: "initial"} }}>

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

                {
                    releaseDetails ? 
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

                                    {
                                        releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                        <Typography onClick={() => {
                                            handleNavigation(releaseDetails, "create-album-release-details", "create-single-release");
                                        }}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", sm: "20px"},
                                                lineHeight: {xs: "20px", sm: "40px"},
                                                letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                                cursor: 'pointer'
                                            }}
                                        >Edit</Typography>
                                    }

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
                                    > { releaseDetails.title } : { releaseDetails.mainArtist.spotifyProfile.name } </Typography>

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
                                            > { releaseDetails.releaseDate } </Typography>
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
                                            > { releaseDetails.labelName } </Typography>
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
                                            > { releaseDetails.upc_ean } </Typography>
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
                                            > { releaseDetails.primaryGenre } </Typography>
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
                                            > { releaseDetails.secondaryGenre } </Typography>
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
                                            > { releaseDetails.language } </Typography>
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
                                    
                                    {
                                        releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                        <Typography 
                                            onClick={() => {
                                                handleNavigation(releaseDetails, "create-album-release-select-stores", "create-single-release-continue");
                                            }}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", sm: "20px"},
                                                lineHeight: {xs: "20px", sm: "40px"},
                                                letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                                cursor: "pointer"
                                            }}
                                        >Edit</Typography>
                                    }
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
                                    { releaseDetails.stores.toString() }
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

                                    {
                                        releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                        <Typography
                                            onClick={() => {
                                                handleNavigation(releaseDetails, "create-album-release-select-stores", "create-single-release-continue");
                                            }}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", sm: "20px"},
                                                lineHeight: {xs: "20px", sm: "40px"},
                                                letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                                cursor: "pointer"
                                            }}
                                        >Edit</Typography>
                                    }

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
                                        { releaseDetails.socialPlatforms.toString() }
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

                                    {
                                        releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                        <Typography
                                            onClick={() => {
                                                handleNavigation(releaseDetails, "create-album-release-song-upload", "create-single-release-continue");
                                            }}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", sm: "20px"},
                                                lineHeight: {xs: "20px", sm: "40px"},
                                                letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                                cursor: "pointer"
                                            }}
                                        > Edit </Typography>
                                    }
                                        
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
                                            releaseDetails.songs.map((item, i) => (
                                            <Box key={i} width="100%">
                                                {
                                                    <SongPreviewComponent key={i}
                                                        // songAudio={item.songAudioPreview}
                                                        songAudio={item.songAudio} 
                                                        songTitle={item.songTitle}
                                                        subTitle={item.isrcNumber}
                                                        deleteSong={
                                                            releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" ? 
                                                                () => deleteSong(i)
                                                            : undefined
                                                        }
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

                                    {
                                        releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                        <Typography
                                            onClick={() => {
                                                handleNavigation(releaseDetails, "create-album-release-album-art", "create-single-release-continue");
                                            }}
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "15px", sm: "20px"},
                                                lineHeight: {xs: "20px", sm: "40px"},
                                                letterSpacing: {xs: "-0.06px", sm: "-0.13px"},
                                                cursor: "pointer"
                                            }}
                                        > Edit </Typography>
                                    }
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

                                            backgroundImage: `url(${ releaseDetails.coverArt })`, // Replace with your image URL
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

                            {
                                releaseDetails.status == "Incomplete" || releaseDetails.status == "Unpaid" &&
                                <Stack justifyContent="center" alignItems="center">
                                    <Button variant="contained" fullWidth
                                        onClick={() => {
                                            if (releaseDetails.status == "Unpaid") {
                                                
                                            }
                                            setPreSaveModal(true)
                                        }}
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
                                    >Save Release</Button>
                                </Stack>
                            }
                        </Box>
                    : <LoadingDataComponent />
                }
            </Box>

            {
                releaseDetails ?
                    <PreSaveModalComponent 
                        handleSubmit={(state) => {
                            // onSubmit(state);
                            setPreSaveModal(false);
        
                            navigate({
                                pathname: `/account/create-release-preorder/${releaseDetails._id}`,
                                search: `?${createSearchParams({ 
                                    releaseType: releaseDetails.releaseType,
                                    preOrder: state ? '1' : '0',
                                })}`,
                            });
                        }}
                        openModal={preSaveModal}
                        closeModal={() => {
                            setPreSaveModal(false);
        
                            setOpenSuccessModal(true);
        
                            handleSkipPreOrder(releaseDetails);
        
                            setTimeout(() => {
                                // navigate("/account/cart");
                                setOpenSuccessModal(false);
        
                                // clear the release from memory and rest the state
                                // _handleClearAlbumRelease();
                            }, 1000);
                        }}
                    />
                : <></>
            }

            
            <SuccessModalComponent 
                openModal={openSuccessModal}
                closeModal={() => setOpenSuccessModal(false)}
            />

        </AccountWrapper>
    )
}

export default ReleaseOverview;