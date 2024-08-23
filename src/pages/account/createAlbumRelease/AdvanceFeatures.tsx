// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';
// import { apiEndpoint } from '@/util/resources';

import AccountWrapper from '@/components/AccountWrapper';
import { customTextFieldTheme } from '@/util/mui';
import { apiEndpoint } from '@/util/resources';
import FormControl from '@mui/material/FormControl';
import LongSelectList from '@/components/LongSelectList';
import { restCountries } from '@/util/countries';


const formSchema = yup.object({
    labelName: yup.string().trim().label("Label Name"),
    recordingLocation: yup.string().trim().label("Recording Location"),
    soldWorldwide: yup.string().trim(),
    UPC_EANcode: yup.string().trim().label("UPC/EAN Code"),
});

const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

function CreateAlbumReleaseAdvanceFeatures() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [soldWorldwide, setSoldWorldwide] = useState(""); // Yes
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const albumReleaseAdvanceFeatures = createReleaseStore((state) => state.albumReleaseAdvanceFeatures);
    const _setAlbumReleaseAdvanceFeatures = createReleaseStore((state) => state._setAlbumReleaseAdvanceFeatures);
    const completeAlbumData = createReleaseStore((state) => state.completeAlbumData);
    const _setCompleteAlbumData = createReleaseStore((state) => state._setCompleteAlbumData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [selectSoldCountries, setSelectSoldCountries] = useState<string[]>(contriesss);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    useEffect(() => {
        setValue("labelName", albumReleaseAdvanceFeatures.label_name, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setValue("recordingLocation", albumReleaseAdvanceFeatures.recording_location, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

        setValue("soldWorldwide", albumReleaseAdvanceFeatures.soldWorldwide || soldWorldwide, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        setSoldWorldwide(albumReleaseAdvanceFeatures.soldWorldwide || soldWorldwide);

        setValue("UPC_EANcode", albumReleaseAdvanceFeatures.upc_ean, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }, [albumReleaseAdvanceFeatures]);
    

    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    });


    const handleSoldCountriesSelect = (selected: string[]) => {
        setSelectSoldCountries(selected);
        setValue("soldWorldwide", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
    }
            
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        if (!soldWorldwide) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select if this release can be sold worldwide?"
            });

            setError("soldWorldwide", {message: "Please select if this release can be sold worldwide?"})
            return;
        }


        const formDetails = {
            email: userData.email,
            release_type: "Album",

            label_name: formData.labelName || '',
            recording_location: formData.recordingLocation || '',
            soldWorldwide: formData.soldWorldwide || soldWorldwide,
            upc_ean: formData.UPC_EANcode || '',
        };

        // console.log(data2db);
        _setAlbumReleaseAdvanceFeatures(formDetails);

        const data2db = {
            label_name: formDetails.label_name,
            recording_location: formDetails.recording_location,
            upc_ean: formDetails.upc_ean,
            soldWorldwide: formDetails.soldWorldwide || selectSoldCountries || soldWorldwide
        }

        try {
            const response = (await axios.put(
                // `${apiEndpoint}/Album/update-album/${ completeAlbumData._id }/page2`,
                `${apiEndpoint}/songs/albums/${ completeAlbumData._id }/page2`,
                data2db,  
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);

            // _setCompleteAlbumData(response.updatedAlbum);
            _setCompleteAlbumData(response);

            navigate("/account/create-album-release-select-stores");
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

        
        // navigate("/account/artist/create-album-release-select-stores");
    }



    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={2} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
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
                                        fontSize: {xs: "24.74px", md: "30px"},
                                        lineHeight: {xs: "26.31px", md: "50.77px"},
                                        letterSpacing: {xs: "-0.55px", md: "-1.07px"},
                                    }}
                                >
                                    Advanced Distribution Features
                                </Typography>
                            </Stack>
                        </Box>


                        <Box sx={{my: 3}}>
                            <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                                <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                    style={{ width: "100%", maxWidth: "916px" }}
                                >
                                    <Box>
                                        <Grid container spacing="20px" sx={{my: "31px"}}>
                                            <Grid item
                                                xs={12} md={4}
                                                sx={{ alignSelf: "center"}}
                                            >
                                                <Typography sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "19.28px", md: "20px"},
                                                    lineHeight: {xs: "15.42px", md: "20px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                                }}>
                                                    Label Name
                                                </Typography>

                                                <Typography sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13.88px", md: "14px"},
                                                    lineHeight: {xs: "9.25px", md: "12px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                    mt: "9px"
                                                }}>
                                                    Optional
                                                </Typography>
                                            </Grid>

                                            <Grid item
                                                xs={12} md={8}
                                                sx={{ alignSelf: "center" }}
                                            >
                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='labelName'
                                                    type='text'
                                                    label=''
                                                    inputMode='text'
                                                    defaultValue=""
                                                    InputLabelProps={{
                                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                                    }}
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: "16px",
                                                            maxWidth: {xs: "337px", md: "100%"}
                                                        },
                                                    }}
                                                    
                                                    error={ errors.labelName ? true : false }
                                                    { ...register('labelName') }
                                                />
                                                { errors.labelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.labelName?.message }</Box> }
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing="20px" sx={{my: "31px"}}>
                                            <Grid item
                                                xs={12} md={4}
                                                sx={{ alignSelf: "center"}}
                                            >
                                                <Typography sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "19.28px", md: "20px"},
                                                    lineHeight: {xs: "15.42px", md: "20px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                                }}>
                                                    Recording Location
                                                </Typography>

                                                <Typography sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13.88px", md: "14px"},
                                                    lineHeight: {xs: "9.25px", md: "12px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                    mt: "9px"
                                                }}>
                                                    Optional
                                                </Typography>
                                            </Grid>

                                            <Grid item
                                                xs={12} md={8}
                                                sx={{ alignSelf: "center" }}
                                            >
                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='recordingLocation'
                                                    type='text'
                                                    label=''
                                                    inputMode='text'
                                                    defaultValue=""
                                                    InputLabelProps={{
                                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                                    }}
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: "16px",
                                                            maxWidth: {xs: "337px", md: "100%"}
                                                        },
                                                    }}
                                                    
                                                    error={ errors.recordingLocation ? true : false }
                                                    { ...register('recordingLocation') }
                                                />
                                                { errors.recordingLocation && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordingLocation?.message }</Box> }
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing="20px" sx={{my: "31px"}}>
                                            <Grid item xs={12} md={4} sx={{display: {xs: "none", md: "initial"}}}></Grid>

                                            <Grid item xs={12} md={8}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        // justifyContent: "center",
                                                        alignItems: {xs: "center", sm: "initial"}
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "12.4px", md: "20px"},
                                                            lineHeight: {xs: "19.07px", md: "40px"},
                                                            letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                                        }}
                                                    >
                                                        Can this release be sold worldwide?
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            gap: soldWorldwide == "Yes" ? "1px" : "15px",
                                                            mt: "21px",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},

                                                                    background: soldWorldwide == "Yes" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                                    color: soldWorldwide == "Yes" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("soldWorldwide", "Yes", {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                    setSoldWorldwide("Yes");
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

                                                            { soldWorldwide == "Yes" ? 
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

                                                                    background: soldWorldwide == "No" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                                    color: soldWorldwide == "No" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("soldWorldwide", "No", {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                    setSoldWorldwide("No");
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

                                                            { soldWorldwide == "No" ? 
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
                                                    </Box>

                                                    { soldWorldwide == "No" ? 
                                                        <FormControl fullWidth sx={{mt: 2}}>

                                                            <Typography id="soldCountriesSelect" sx={{color: "grey"}}>
                                                                Where would you like your music to be sold
                                                            </Typography>

                                                            <LongSelectList 
                                                                options={contriesss}
                                                                darkTheme={darkTheme}
                                                                handleSelected={handleSoldCountriesSelect}
                                                                selectedValue={selectSoldCountries}
                                                                error={ errors.soldWorldwide ? true : false }
                                                            />
                                                        </FormControl>
                                                        : <></>
                                                    }

                                                    { errors.soldWorldwide && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.soldWorldwide?.message }</Box> }
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing="20px" sx={{my: "31px"}}>
                                            <Grid item xs={12} md={4} >
                                                <Typography sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "19.28px", md: "20px"},
                                                    lineHeight: {xs: "15.42px", md: "20px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                                }}>
                                                    UPC/EAN Code
                                                </Typography>

                                                <Typography sx={{
                                                    fontWeight: "400",
                                                    fontSize: {xs: "13.88px", md: "14px"},
                                                    lineHeight: {xs: "9.25px", md: "12px"},
                                                    letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                    mt: "9px"
                                                }}>
                                                    Optional
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} md={8}>
                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='UPC_EANcode'
                                                    type='text'
                                                    label=''
                                                    inputMode='text'
                                                    defaultValue=""
                                                    InputLabelProps={{
                                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                                    }}
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: "16px",
                                                            maxWidth: {xs: "337px", md: "100%"}
                                                        },
                                                    }}
                                                    
                                                    error={ errors.UPC_EANcode ? true : false }
                                                    { ...register('UPC_EANcode') }
                                                />
                                                <Typography
                                                    sx={{
                                                        fontWeight: "300",
                                                        fontSize: {xs: "11.44px", md: "16px"},
                                                        lineHeight: {xs: "11.58px", md: "16px"},
                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                        color: "#fff",
                                                        my: 1
                                                    }}
                                                >
                                                    If you have one, please enter it above. Otherwise, we will generate one for you
                                                </Typography>
                                                { errors.UPC_EANcode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.UPC_EANcode?.message }</Box> }
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    {
                                        apiResponse.display && (
                                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                            </Stack>
                                        )
                                    }

                                    <Box mt="100px">
                                        <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                            <Button variant="contained" 
                                                fullWidth type='button'
                                                onClick={() => navigate("/account/create-album-release-details")}
                                                sx={{ 
                                                    bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    maxWidth: "312px",
                                                    "&.Mui-disabled": {
                                                        background: "#9c9c9c",
                                                        color: "#797979"
                                                    },
                                                    "&:hover": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    "&:active": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    "&:focus": {
                                                        bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                    },
                                                    color: "#fff",
                                                    borderRadius: "12px",
                                                    my: 3, py: 1.5,
                                                    fontSize: {md: "15.38px"},
                                                    fontWeight: "900",
                                                    letterSpacing: "-0.12px",
                                                    textTransform: "none"
                                                }}
                                            > Previous step </Button>

                                            <Button variant="contained" 
                                                fullWidth type="submit" 
                                                disabled={ !isValid || isSubmitting } 
                                                sx={{ 
                                                    bgcolor: "#644986",
                                                    maxWidth: "312px",
                                                    "&.Mui-disabled": {
                                                        background: "#9c9c9c",
                                                        color: "#797979"
                                                    },
                                                    "&:hover": {
                                                        bgcolor: "#644986",
                                                    },
                                                    "&:active": {
                                                        bgcolor: "#644986",
                                                    },
                                                    "&:focus": {
                                                        bgcolor: "#644986",
                                                    },
                                                    color: "#fff",
                                                    borderRadius: "12px",
                                                    my: 3, py: 1.5,
                                                    fontSize: {md: "15.38px"},
                                                    fontWeight: "900",
                                                    letterSpacing: "-0.12px",
                                                    textTransform: "none"
                                                }}
                                            >
                                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
                                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                            </Button>
                                        </Stack>
                                    </Box>

                                </form>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </AccountWrapper>
    )
}

export default CreateAlbumReleaseAdvanceFeatures;