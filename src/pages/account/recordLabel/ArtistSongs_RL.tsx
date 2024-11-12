import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
import EmptyListComponent from '@/components/EmptyList';
import LoadingDataComponent from '@/components/LoadingData';
import colors from '@/constants/colors';
import ViewSongItemComponent from '@/components/account/ViewSongItem';
import { useGetReleases } from '@/hooks/release/useGetReleases';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


function ArtistSongs_RL() {
    const navigate = useNavigate();
    // const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");

    const artist_id = getQueryParams("_id");
    const profileImg = getQueryParams("img");
    const artistName = getQueryParams("name");

    const { 
        // apiResponse, // setApiResponse,

        currentPageNo, // totalRecords,
        totalPages, isSubmitting,

        // singleReleases, albumReleases,
        releases, // getReleases,
        getRL_ArtistReleases,

        rlArtistSongsData,
        getRL_ArtistReleaseData,
    } = useGetReleases(1, 20, "single");


    const handleLoadMore = () => {
        getRL_ArtistReleases(artist_id, currentPageNo + 1, 20 );
    }

    useEffect(() => {
        if (!artist_id || !profileImg || !artistName) {
            navigate("/account");
        }

        getRL_ArtistReleases(artist_id, 1, 20);
        getRL_ArtistReleaseData(artist_id);
    }, []);


      
    return (
        <AccountWrapper>
            <Box>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                    <Stack direction={"row"} alignItems="center" spacing="10px">
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: colors.primary }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <Typography
                            sx={{
                                color: "#1C1B1F",
                                textAlign: "center",
                                fontSize: {xs: "16px", md: "24px"},
                                fontWeight: "900",
                                lineHeight: "24px"
                            }}
                        >{ artistName }</Typography>
                    </Stack>

                    <Box></Box>
                </Stack>

                <Box
                    sx={{
                        height: {xs: "250px", md: "350px"},
                        // maxHeight: "495px",
                        // minHeight: "200px",
                        borderRadius: "8px",
                        backgroundColor: colors.secondary,
                        background: `url(${ profileImg }) lightgray 50% / cover no-repeat`,
                        // background: `url(${recordLabelArtist[0].artistAvatar})`,
                        // backgroundSize: "cover",
                        // backgroundRepeat: "no-repeat",
                        // boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)"
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px"
                        
                    }}
                >

                    {/* <Box
                        sx={{
                            borderRadius: "17px",
                            background: "#FFF",
                            padding: {xs: "10px 15px", md: "15px 20px"},
                            marginTop: "auto",
                            width: "fit-content"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#272727",
                                textAlign: "center",
                                fontSize: {xs: "15px", md: "24px"},
                                fontWeight: "900",
                                lineHeight: "24px"
                            }}
                        >Add new music</Typography>
                    </Box> */}

                </Box>

                <Stack direction="row" alignItems="center" 
                    justifyContent="space-around" flexWrap="wrap"
                    sx={{
                        borderRadius: {xs: "15px", md: "37px"},
                        bgcolor: colors.dark,
                        color: "#fff",
                        py: "40px",
                        mt: "20px"
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {xs: "18px", md: "24px"},
                                fontWeight: "900",
                                lineHeight: "24px"
                            }}
                        >{currencyDisplay(Number(rlArtistSongsData.revenue))}</Typography>

                        <Typography
                            sx={{
                                color: "#797979",
                                fontSize: {xs: "13px", md: "17px"},
                                fontWeight: "400",
                                lineHeight: "24px"
                            }}
                        >Total Revenue</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: {xs: "18px", md: "24px"},
                                fontWeight: "900",
                                lineHeight: "24px"
                            }}
                        >{formatedNumber(Number(rlArtistSongsData.single))}</Typography>

                        <Typography
                            sx={{
                                color: "#797979",
                                fontSize: {xs: "13px", md: "17px"},
                                fontWeight: "400",
                                lineHeight: "24px"
                            }}
                        >Singles</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: {xs: "18px", md: "24px"},
                                fontWeight: "900",
                                lineHeight: "24px"
                            }}
                        >{formatedNumber(Number(rlArtistSongsData.album))}</Typography>

                        <Typography
                            sx={{
                                color: "#797979",
                                fontSize: {xs: "13px", md: "17px"},
                                fontWeight: "400",
                                lineHeight: "24px"
                            }}
                        >Albums</Typography>
                    </Box>
                </Stack>

                <Box mt={10}>
                    <Grid container spacing="20px">
                        {
                            releases ? 
                                releases.length ?
                                    releases.map((song, index) => (
                                        <Grid item xs={6} md={4} key={index}>
                                            <ViewSongItemComponent 
                                                // releaseType={albumType}
                                                releaseType={song.releaseType == "album" ? "Album" : "Single"}
                                                index={index}
                                                releaseDetails={song}
                                            />
                                        </Grid>
                                    ))
                                : <EmptyListComponent notFoundText="No Song found for this artist" />
                            : <LoadingDataComponent />
                        }
                    </Grid>
                </Box>


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

export default ArtistSongs_RL;
