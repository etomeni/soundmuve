import { useState } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useSettingStore } from '@/state/settingStore';

import AccountWrapper from '@/components/AccountWrapper';
import { releaseTextFieldStyle } from '@/util/mui';
import FormControl from '@mui/material/FormControl';
import LongSelectList from '@/components/LongSelectList';
import { restCountries } from '@/util/countries';
import colors from '@/constants/colors';
import { useCreateAlbum2 } from '@/hooks/release/createAlbumRelease/useCreateAlbum2';
import { createSearchParams } from 'react-router-dom';


const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

function CreateAlbumReleaseAdvanceFeatures() {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [upcEanMoreInfoTooltip, setUpcEanMoreInfoTooltip] = useState(false);

    const {
        navigate,
        apiResponse, // setApiResponse,
        albumRelease,

        register, setValue,
        errors, isValid, isSubmitting,
        
        soldWorldwide, setSoldWorldwide,
        selectSoldCountries, // setSelectSoldCountries,
        handleSoldCountriesSelect,

        submitForm
    } = useCreateAlbum2();


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box>
                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={2} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
                                <IconButton 
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        color: colors.primary, 
                                        // mb: 2,
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
                            <form noValidate onSubmit={ submitForm } 
                                style={{ width: "100%", maxWidth: "916px" }}
                            >
                                <Box>
                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item
                                            xs={12} md={4}
                                            sx={{ alignSelf: "center"}}
                                        >
                                            <Typography variant='h3' sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "19.28px", md: "20px"},
                                                lineHeight: {xs: "15.42px", md: "20px"},
                                                letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                            }}> Label Name </Typography>

                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13.88px", md: "14px"},
                                                lineHeight: {xs: "9.25px", md: "12px"},
                                                letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                mt: "9px"
                                            }}> Optional </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8} sx={{ alignSelf: "center" }} >
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='labelName'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
                                                error={ errors.labelName ? true : false }
                                                { ...register('labelName') }
                                            />
                                            { errors.labelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.labelName?.message }</Box> }
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4} sx={{ alignSelf: "center"}} >
                                            <Typography variant='h3' sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "19.28px", md: "20px"},
                                                lineHeight: {xs: "15.42px", md: "20px"},
                                                letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                            }}> Recording Location </Typography>

                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "13.88px", md: "14px"},
                                                lineHeight: {xs: "9.25px", md: "12px"},
                                                letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                mt: "9px"
                                            }}> Optional </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
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
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
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

                                                                border: `1px solid ${soldWorldwide == "Yes" ? colors.primary : colors.dark}`,
                                                                background: soldWorldwide == "Yes" ? colors.primary : colors.milk,
                                                                color: soldWorldwide == "Yes" ? colors.milk : colors.dark,

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
                                                                    color: colors.tertiary,
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


                                                                border: `1px solid ${soldWorldwide == "No" ? colors.primary : colors.dark}`,
                                                                background: soldWorldwide == "No" ? colors.primary : colors.milk,
                                                                color: soldWorldwide == "No" ? colors.milk : colors.dark,

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
                                                                    color: colors.tertiary,
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
                                            <Stack direction="row" alignItems="center" spacing="5px">
                                                <Box>
                                                    <Typography variant='h3' sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "19.28px", md: "20px"},
                                                        lineHeight: {xs: "15.42px", md: "20px"},
                                                        letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                                    }}> UPC/EAN Code </Typography>

                                                    <Typography sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13.88px", md: "14px"},
                                                        lineHeight: {xs: "9.25px", md: "12px"},
                                                        letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                        mt: "9px"
                                                    }}> Optional </Typography>
                                                </Box>

                                                <Box>
                                                    <Tooltip
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        // placement='bottom-end'
                                                        arrow
                                                        // onClose={() => setUpcEanMoreInfoTooltip(false)}
                                                        // open={upcEanMoreInfoTooltip}
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
                                                                or don't have a Universal Product Code (UPC) / European Article Number (EAN) code,
                                                                you can leave this field empty,
                                                                we'll generate one for you.
                                                            </Typography>
                                                        </Box>}
                                                    >
                                                        <IconButton onClick={() => setUpcEanMoreInfoTooltip(!upcEanMoreInfoTooltip)} aria-label="More Information">
                                                            <InfoOutlinedIcon sx={{ color: colors.primary }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </Stack>
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
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
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
                                            onClick={() => {
                                                navigate({
                                                    pathname: "/account/create-album-release-details",
                                                    search: `?${createSearchParams({
                                                        release_id: albumRelease._id || ''
                                                    })}`,
                                                });
                                            }}
                                            sx={{ 
                                                maxWidth: "312px",
                                                bgcolor: "#9c9c9c",
                                                color: "#fff",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:active": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:focus": {
                                                    bgcolor: "#4C4C4C57",
                                                },
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
                                                bgcolor: colors.primary,
                                                color: colors.milk,
                                                maxWidth: "312px",
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
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        >
                                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
                                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                        </Button>
                                    </Stack>
                                </Box>

                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AccountWrapper>
    )
}

export default CreateAlbumReleaseAdvanceFeatures;