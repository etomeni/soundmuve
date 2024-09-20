import { useEffect, useState } from 'react';
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

// type status = "Live" | "Pending" | "Incomplete" | "Complete" | "Failed";


function AllMusic_RL() {
    const navigate = useNavigate();
    const [albumType, setAlbumType] = useState<"Single" | "Album">("Single");
    
    const { 
        apiResponse, // setApiResponse, 
        releases, // setReleases,
        getAlbumRelease, getSingleRelease
    } = useGetReleases();

    useEffect(() => {
        getSingleRelease();
    }, []);

      
    return (
        <AccountWrapper>
            <Box>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{ color: colors.primary, mb: 2 }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Box></Box>
                </Stack>

                <Typography variant='h2'
                    sx={{
                        fontWeight: "900",
                        // fontSize: {xs: "39.96px", md: "60px"},
                        fontSize: {xs: "35px", md: "60px"},
                        lineHeight: {xs: "24px", md: "24px"},
                        letterSpacing: {xs: "-0.89px", md: "-1.34px"},
                        my: {xs: "50px", md: "100px"},
                    }}
                > Your Releases </Typography>

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
                    <Box onClick={() => { setAlbumType('Single'); getSingleRelease(); } }
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


                <Grid container spacing="20px">
                    {
                        releases ? 
                            releases.length ?
                                releases.map((song, index) => (
                                    // songView(song, index)
                                    // viewSong(song, index)

                                    <ViewSongItemComponent 
                                        albumType={albumType}
                                        index={index}
                                        song={song}
                                    />
                                ))
                            : <EmptyListComponent notFoundText={apiResponse.message} />
                        : <LoadingDataComponent />
                    }
                </Grid>
            </Box>
        </AccountWrapper>
    )
}

export default AllMusic_RL;
