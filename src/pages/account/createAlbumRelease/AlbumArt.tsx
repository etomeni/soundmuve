import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import SideNav from './SideNav';
import AccountWrapper from '@/components/AccountWrapper';
import cloudUploadIconImg from "@/assets/images/cloudUploadIcon.png";
import { apiEndpoint, artWorkAllowedTypes, convertToBase64, validateImageArtWork } from '@/util/resources';
import CircularProgress from '@mui/material/CircularProgress';
import ArtWorkFileInfoComponent from '@/components/ArtWorkFileInfo';


function CreateAlbumReleaseAlbumArt() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    // const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const albumReleaseAlbumArt = createReleaseStore((state) => state.albumReleaseAlbumArt);
    const _setAlbumReleaseAlbumArt = createReleaseStore((state) => state._setAlbumReleaseAlbumArt);
    const completeAlbumData = createReleaseStore((state) => state.completeAlbumData);
    const _setCompleteAlbumData = createReleaseStore((state) => state._setCompleteAlbumData);

    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const [image, setImage] = useState<Blob | null>();
    const [imagePreview, setImagePreview] = useState();
    const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

    useEffect(() => {
        if (albumReleaseAlbumArt.image) {
            setImage(albumReleaseAlbumArt.image);
            setImagePreview(albumReleaseAlbumArt.imagePreview);
        }
    }, [albumReleaseAlbumArt]);
    

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setApiResponse({
            display: false,
            status: false,
            message: ""
        });

        // const file = e.target.files[0]; 
        const file = e.target.files?.[0];
        if (!file) return;
        
        const validatgeResult = await validateImageArtWork(file);
        setApiResponse(validatgeResult);
        if (!validatgeResult.status) return;
    
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

    const onSubmit = async () => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (!image) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please upload song cover."
            });

            _setToastNotification({
                display: true,
                status: "error",
                message: "Please upload song cover."
            })

            return;
        }

        const data2db = new FormData();
        // data2db.append('email', userData.email);
        // data2db.append('release_type', "Album");
        data2db.append('song_cover_url', image);

        _setAlbumReleaseAlbumArt({image, imagePreview});

        try {
            setIsBtnSubmitting(true);
            const response = (await axios.put(
                `${apiEndpoint}/songs/albums/${ completeAlbumData._id }/page5`,
                data2db,  
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);

            const savedImage = response.song_cover_url;

            // _setCompleteAlbumData(response.updatedAlbum);
            _setCompleteAlbumData(response);
            _setAlbumReleaseAlbumArt({image: savedImage, imagePreview: savedImage});
            setIsBtnSubmitting(false);

            navigate("/account/create-album-release-overview");
        } catch (error: any) {
            console.log(error);
            
            setIsBtnSubmitting(false);
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

        // navigate("/account/create-album-release-overview");
    }


    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={5} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />
                        </Box>

                        <Box sx={{my: 3}}>

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
                                            fontSize: {xs: "13px", md: "16px"},
                                            lineHeight: {xs: "25px", md: "32px"},
                                            letterSpacing: "-0.13px",
                                        }}
                                    > Album art </Typography>

                                    <ArtWorkFileInfoComponent />
                                </Stack>



                                { imagePreview ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: darkTheme ? "#272727" : "#666666",
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", md: "326px"},
                                            width: {xs: "128.45px", md: "347px"},
                                            my: {xs: "10px", md: "20px"},
                                            p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"},

                                            backgroundImage: `url(${imagePreview})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                        }}
                                    >
                                        <Box></Box>

                                        <Box 
                                            sx={{
                                                p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                borderRadius: {xs: "8.14px", md: "12px"},
                                                // background: "#FFFFFF80",
                                                background: "#c4c4c480",

                                                color: "#000",
                                                cursor: "pointer",
                                                display: "inline-block",
                                                mt: {xs: "7px", md: "15px"},
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
                                                    fontSize: {xs: "10.18px", md: "15px"},
                                                    lineHeight: {xs: "8.82px", md: "13px"},
                                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                    textAlign: 'center',
                                                }}
                                            > Edit </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "end",
                                            alignItems: "center",
                                            bgcolor: darkTheme ? "#272727" : "#666666",
                                            borderRadius: "12px",
                                            height: {xs: "146.55px", md: "326px"},
                                            width: {xs: "128.45px", md: "347px"},
                                            my: {xs: "10px", md: "20px"},
                                            p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"}
                                        }}
                                    >
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
                                            > Upload </Typography>
                                        </Box>
                                    </Box>
                                )}

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
                                    onClick={() => onSubmit()}
                                    disabled={ isBtnSubmitting } 
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
                                        fontSize: {md: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                >
                                    {
                                        isBtnSubmitting ? 
                                        <CircularProgress size={25} sx={{ color: "#8638E5", fontWeight: "bold", mx: 'auto' }} />
                                        : <span>Save Release</span>
                                    }
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>

            </Box>


            <input 
                type="file" 
                id='uploadSongCoverImage' 
                name="uploadSongCoverImage" 
                // accept='image/*' 
                accept={artWorkAllowedTypes.toString()}
                onChange={handleFileUpload}
                style={{display: "none"}}
            />

        </AccountWrapper>
    )
}

export default CreateAlbumReleaseAlbumArt;