import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import colors from '@/constants/colors';
import { useGetReleases } from '@/hooks/release/useGetReleases';
import EmptyListComponent from '@/components/EmptyList';
import AccountWrapper from '@/components/AccountWrapper';
import LoadingDataComponent from '@/components/LoadingData';
import ViewSongItemComponent from '@/components/account/ViewSongItem';


function AllMusic() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");

    const { 
        limitNo,
        apiResponse, // setApiResponse,

        currentPageNo, // totalRecords,
        totalPages, isSubmitting,

        // singleReleases, albumReleases,
        releases, getReleases
    } = useGetReleases();


    useEffect(() => {
        getReleases(
            currentPageNo, limitNo, 
            albumType == "Album" ? "album" : "single"
        );
    }, []);

    const handleLoadMore = () => {
        getReleases(currentPageNo + 1, 20, albumType == "Album" ? "album" : "single" );
    }

      
    return (
        <AccountWrapper>
            <Box>

                <Stack direction={"row"} spacing={"20px"} alignItems={"center"}
                    sx={{ mb: {xs: "50px", md: "70px"} }}
                >
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: colors.primary, 
                            // mb: 2,
                            // display: {xs: "none", md: "block"},
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Typography variant='h2'
                        sx={{
                            fontWeight: "900",
                            // fontSize: {xs: "39.96px", md: "60px"},
                            fontSize: {xs: "35px", md: "60px"},
                            lineHeight: {xs: "24px", md: "24px"},
                            letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                            // my: {xs: "50px", md: "70px"},
                        }}
                    > Your Releases </Typography>

                    <Box></Box>
                </Stack>
                

                <Box 
                    sx={{ 
                        width: "100%",
                        maxWidth: {xs: "401.95px", md: "518px"},
                        height: {xs: "39px", md: "50.26px"},
                        borderRadius: {xs: "7.55px", md: "9.73px"},
                        // bgcolor: "#D9D9D9",

                        border: {xs: "0.63px solid #000000", md: "0.81px solid #000000"},
                        my: {xs: 2, md: 4},
                        mx: "auto",
                        px: "2px",

                        display: "flex",
                        alignItems: "center",
                    }} 
                >
                    <Box onClick={() => { setAlbumType('Single'); getReleases(1, 20, "single"); } }
                        sx={ albumType === "Single" ? {
                            width: "100%",
                            maxWidth: {xs: "200.03px", md: "257.78px"},
                            height: {xs: "34.6px", md: "44.59px"},
                            bgcolor: colors.dark,
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

                    <Box onClick={() => { setAlbumType('Album'); getReleases(1, 20, "album"); } }
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
                        releases ? 
                            releases.length ?
                                releases.map((song, index) => (
                                    // songView(song, index)
                                    // viewSong(song, index)

                                    <Grid item xs={6} md={4} key={index}>
                                        <ViewSongItemComponent 
                                            releaseType={albumType}
                                            index={index}
                                            releaseDetails={song}
                                        />
                                    </Grid>
                                ))
                            : <EmptyListComponent notFoundText={apiResponse.message} />
                        : <LoadingDataComponent />
                    }
                </Grid>


                {
                    currentPageNo == totalPages ? <></> :
                    <Stack mt={5} direction="row" justifyContent="center">
                        <Button variant="contained" 
                            fullWidth type="button" 
                            onClick={handleLoadMore}
                            disabled={ currentPageNo == totalPages  || isSubmitting } 
                            sx={{ 
                                maxWidth: "312px",
                                bgcolor: colors.primary,
                                color: colors.milk,
                                "&.Mui-disabled": {
                                    background: colors.secondary,
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
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>See More</span>
                            <CircularProgress size={25} 
                                sx={{ 
                                    display: isSubmitting ? "initial" : "none", 
                                    color: colors.milk, 
                                    fontWeight: "bold" 
                                }} 
                            />
                        </Button>
                    </Stack>
                }

            </Box>


        </AccountWrapper>
    )
}

export default AllMusic;
