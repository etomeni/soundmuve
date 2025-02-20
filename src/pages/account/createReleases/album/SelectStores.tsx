import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';

import { useSettingStore } from '@/state/settingStore';

import AccountWrapper from '@/components/AccountWrapper';
import { musicStores, socialPlatformStores } from '@/util/resources';
import MultipleSelectCheckmarks from '@/components/MultipleSelectCheckmarks';
import colors from '@/constants/colors';
import { useCreateAlbum3 } from '@/hooks/release/createAlbumRelease/useCreateAlbum3';
import { createSearchParams } from 'react-router-dom';


function CreateAlbumReleaseSelectStores() {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    const {
        navigate,
        apiResponse, // setApiResponse,

        albumRelease,
        // register, setValue,
        errors, isValid, isSubmitting,
        
        selectStores, // setSelectStores,
        selectSocialStores, // setSelectSocialStores,

        handleStoreSelect,
        handleSocialStoreSelect,

        submitForm
    } = useCreateAlbum3();



    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={3} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />
                        </Box>


                        <Box sx={{my: 3}}>
                            <form noValidate onSubmit={ submitForm } 
                                style={{ width: "100%", maxWidth: "916px" }}
                            >
                                            
                                <Box
                                    sx={{
                                        maxWidth: {xs: "330px", md: "892px"},
                                        border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                        borderRadius: {xs: "5.42px", md: "12px"},
                                        overflow: "hidden",
                                        width: "100%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: "32.53px", md: "72px"},
                                            bgcolor: colors.tertiary,
                                            color: colors.milk,
                                            borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                            px: {xs: "10px", md: "25px"},
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
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "20px", md: "40px"},
                                                letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                            }}
                                        >Select Stores</Typography>
                                        
                                        <Box></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
                                            bgcolor: colors.secondary,

                                            display: "flex",
                                            justifyItems: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                            <MultipleSelectCheckmarks 
                                                options={musicStores}
                                                darkTheme={darkTheme}
                                                handleSelected={handleStoreSelect}
                                                selectedValue={selectStores}
                                                error={ errors.store ? true : false }
                                            />

                                            { errors.store && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.store?.message }</Box> }
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        maxWidth: {xs: "330px", md: "892px"},
                                        border: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                        borderRadius: {xs: "5.42px", md: "12px"},
                                        overflow: "hidden",
                                        mt: "25px"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: "32.53px", md: "72px"},
                                            bgcolor: colors.tertiary,
                                            color: colors.milk,
                                            borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                            px: {xs: "10px", md: "25px"},
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: {xs: "10px", md: "20px"},
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "14px", md: "20px"},
                                                lineHeight: {xs: "20px", md: "40px"},
                                                letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                            }}
                                        >Social Platforms - Automatically Selected</Typography>

                                        <Box></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
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
                                                fontSize: {xs: "15px", md: "20px"},
                                                lineHeight: {xs: "25px", md: "40px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >
                                            You keep 80% of social platform revenue. Please review monetization eligibility requirements for. &#32;
                                            <span style={{textDecoration: "underline"}}>YouTube Content ID </span> &#32; and &#32;
                                            <span style={{textDecoration: "underline"}}>Facebook/Instagram/Reels.</span> &#32;
                                            Delivering ineligible content can result in account suspension. 
                                            <b> Click 'Edit' to remove a social platform. </b>
                                        </Typography>

                                        <FormControl fullWidth sx={{ mx: "auto", my: {xs: "20px", md: "50px"}, maxWidth: {xs: "200px", md: "391px"} }}>
                                            <MultipleSelectCheckmarks 
                                                options={socialPlatformStores}
                                                darkTheme={darkTheme}
                                                handleSelected={handleSocialStoreSelect}
                                                selectedValue={selectSocialStores}
                                                error={ errors.socialPlatform ? true : false }
                                            />

                                            { errors.socialPlatform && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.socialPlatform?.message }</Box> }
                                        </FormControl>
                                    </Box>
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
                                                    pathname: "/account/create-album-release-advance-features",
                                                    search: `?${createSearchParams({
                                                        release_id: albumRelease._id || ''
                                                    })}`,
                                                });
                                            }}
                                            sx={{ 
                                                bgcolor: "#9c9c9c",
                                                color: "#fff",
                                                maxWidth: "312px",
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

export default CreateAlbumReleaseSelectStores;