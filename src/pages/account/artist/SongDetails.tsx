import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AccountWrapper from '@/components/AccountWrapper';
// import { useSettingStore } from '@/state/settingStore';

// import appleMusiclogo from '@/assets/images/apple.png';
// import appleMusicLightlogo from '@/assets/images/appleLightTheme.png';
// import spotifylogo from '@/assets/images/spotify.png';
// import spotifyLghtThemelogo from '@/assets/images/spotifyLghtTheme.png';
// import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';
import { useReleaseStore } from '@/state/releaseStore';
// import TopGenderComponent from '@/components/analytics/TopGender';
// import TopLocationsComponent from '@/components/analytics/TopLocations';
// import BarChartGraphComponent from '@/components/analytics/BarChartGraph';
// import SingleSongDspOverviewComponent from '@/components/analytics/SingleSongDspOverview';
import colors from '@/constants/colors';
import { currencyDisplay, formatedNumber } from '@/util/resources';
// import { getDateRange, getFormattedDateRange } from '@/util/dateTime';
// import { useEffect } from 'react';
import { useSongAnalytics } from '@/hooks/analytics/useSongAnalytics';
import { useEffect } from 'react';
import { allMonths } from '@/util/months';
import { getCurrentMonthValue } from '@/util/dateTime';
import CopyShareLink from '@/components/release/CopyShareLink';
import sampleCoverArtWorkImage from '@/assets/images/album.png';


function SongDetails() {
    const navigate = useNavigate();
    const releaseDetails = useReleaseStore((state) => state.releaseDetails);

    const { 
        // spotifyAndAppleOverview, 
        getSportifiyAppleOverview,

        songDashAnalytics, // setSongDashAnalytics,

        // spotifyDataset, appleMusicDataset, // graphApiData, 
        getGraphData,

        handleDataRangeData,
    } = useSongAnalytics();

    useEffect(() => {
        // getAnalyticsData();
        // console.log(songDetails);

        if (!releaseDetails._id) {
            navigate("/account");
            return;
        }

        getGraphData(releaseDetails._id, releaseDetails.title, "single");
        
        getSportifiyAppleOverview(releaseDetails._id, "single");
        getSportifiyAppleOverview(releaseDetails._id, "single");
    }, []);

    
    return (
        <AccountWrapper>
            <Box>
                {/* desktop view */}
                <Box
                    sx={{
                        backgroundColor: colors.secondary,
                        borderRadius: {xs: "13.43px", md: "22px"},
                        display: {xs: "none", sm: "flex"},
                        flexDirection: "column",
                        p: {xs: "15px", md: "25px"},
                        color: colors.dark,
                    }}
                >
                    <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: colors.primary, mb: 2 }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <Box>
                            <FormControl fullWidth sx={{ width: "fit-content" }}>
                                <Select
                                    labelId="sortByDays"
                                    id="sortByDays-select"
                                    label=""
                                    defaultValue={getCurrentMonthValue}
                                    // placeholder='Last 30 Days'

                                    sx={{
                                        color: "#fff",
                                        borderRadius: "8px",
                                        bgcolor: colors.dark,
                                        // textAlign: "center",
                                        fontWeight: "900",
                                        border: "none",
                                        fontSize: {xs: "10px", md: "20px"},
                                        lineHeight: {xs: "12px", md: "24px"},
                                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                        '& .MuiSelect-select': {
                                            p: "5px 14px"
                                        },

                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: "none",
                                            // borderColor: '#fff',
                                            p: 0
                                        },
                                        // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        //     borderColor: '#fff',
                                        // },
                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                        //     borderColor: '#fff',
                                        // },
                                        '.MuiSvgIcon-root ': {
                                            fill: "#797979",
                                        }
                                    }}
                                    onChange={(e) => {
                                        handleDataRangeData(`${e.target.value}`);
                                    }}
                                >
                                    {
                                        allMonths.map((month, index) => (
                                            <MenuItem key={index} value={index}>
                                                { month }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>


                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "21.78px", md: "60px"},
                            lineHeight: {xs: "8.71px", md: "24px"},
                            mt: 3
                        }}
                    > { releaseDetails.title } </Typography>

                    <Stack direction="row" mt={5} spacing="20px" alignItems="center">
                        <Box
                            sx={{
                                maxHeight: "227px",
                                maxWidth: "263px",
                                borderRadius: "8px",
                                overflow: "hidden"
                            }}
                        >
                            <img
                                src={ releaseDetails.coverArt || sampleCoverArtWorkImage } 
                                alt={`${ releaseDetails.title } cover art work`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>

                        <Box sx={{ flexGrow: 1}}>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "24px",
                                    lineHeight: "24px"
                                }}
                            > { releaseDetails.title } </Typography>

                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "17px",
                                    lineHeight: "24px",
                                }}
                            > { releaseDetails.mainArtist.spotifyProfile.name } </Typography>

                            <Stack direction="row" spacing="10px" mt="30px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 200px"
                                    }}
                                >Label Name</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 70%",
                                    }}
                                >{ releaseDetails.labelName } </Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="20px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 200px"
                                    }}
                                >Primary Genre</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 70%",
                                    }}
                                >Dance  </Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="20px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 200px"
                                    }}
                                >UPC</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 70%",
                                    }}
                                > { releaseDetails.upc_ean } </Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    
                    <Box>
                        <Stack mt="50px" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                            <Box flexGrow={1} maxWidth="60%">
                                <Stack direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: '12px', md: '24px'},
                                                lineHeight: {xs: '8.71px', md: '24px'}
                                            }}
                                        >{ currencyDisplay(Number(songDashAnalytics.total_revenue)) }</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: '10px', md: '17px'},
                                                color: "#797979"
                                            }}
                                        >Total Revenue</Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: '12px', md: '24px'},
                                                lineHeight: {xs: '8.71px', md: '24px'}
                                            }}
                                        >{ formatedNumber(Number(songDashAnalytics.streams)) } </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: '10px', md: '17px'},
                                                color: "#797979"
                                            }}
                                        >Streams</Typography>
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: '12px', md: '24px'},
                                                lineHeight: {xs: '8.71px', md: '24px'}
                                            }}
                                        >{formatedNumber(Number(songDashAnalytics.stream_time))}</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: '10px', md: '17px'},
                                                color: "#797979"
                                            }}
                                        >Songs sold</Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box maxWidth="35%">
                                <CopyShareLink linkUrl={releaseDetails.liveUrl} />
                            </Box>
                        </Stack>
                    </Box>

                </Box>

                {/* mobile view  */}
                <Box sx={{ display: {xs: "initial", sm: "none"} }}>

                    <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: colors.primary }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <Box>
                            <FormControl fullWidth sx={{ width: "fit-content" }}>
                                <Select
                                    labelId="sortByDays"
                                    id="sortByDays-select"
                                    label=""
                                    defaultValue={getCurrentMonthValue}
                                    // placeholder='Last 30 Days'

                                    onChange={(e) => {
                                        handleDataRangeData(`${e.target.value}`);
                                    }}
                                    sx={{
                                        color: "#fff",
                                        borderRadius: "8px",
                                        bgcolor: colors.dark,
                                        // textAlign: "center",
                                        fontWeight: "900",
                                        border: "none",
                                        fontSize: {xs: "10px", md: "20px"},
                                        lineHeight: {xs: "12px", md: "24px"},
                                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                                        '& .MuiSelect-select': {
                                            p: "5px 14px"
                                        },

                                        '.MuiOutlinedInput-notchedOutline': {
                                            border: "none",
                                            // borderColor: '#fff',
                                            p: 0
                                        },
                                        // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        //     borderColor: '#fff',
                                        // },
                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                        //     borderColor: '#fff',
                                        // },
                                        '.MuiSvgIcon-root ': {
                                            fill: "#797979",
                                        }
                                    }}
                                >
                                    {
                                        allMonths.map((month, index) => (
                                            <MenuItem key={index} value={index}>
                                                { month }
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: "33.76px",
                            lineHeight: "16.21px",
                            mt: 3
                        }}
                    >{ releaseDetails.title }</Typography>

                    {/* <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16.88px",
                            lineHeight: "4.05px",
                            color: "#797979",
                            mt: 2
                        }}
                    > Album </Typography> */}

                    <Box
                        sx={{
                            maxHeight: "230px",
                            width: "100%",
                            borderRadius: "8px",
                            overflow: "hidden",
                            mt: 3
                        }}
                    >
                        <img
                            src={ releaseDetails.coverArt || sampleCoverArtWorkImage } 
                            alt='album image'
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>

                    <Stack mt="20px" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{ currencyDisplay(Number(songDashAnalytics.total_revenue)) }</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Total Revenue</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{ formatedNumber(Number(songDashAnalytics.streams)) }</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Streams</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{ formatedNumber(Number(songDashAnalytics.streams)) }</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Songs sold</Typography>
                        </Box>
                    </Stack>

                    <Box
                        sx={{
                            p: '15px',
                            bgcolor: colors.secondary,
                            color: colors.dark,
                            borderRadius: "12px",
                            mt: "10px"
                        }}
                    >

                        <Stack direction="row" spacing="10px" justifyContent="space-between">
                            <Box sx={{ flex: "1 1 50%" }}>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15.43px",
                                        lineHeight: "15.43px",
                                    }}
                                >{ releaseDetails.title }</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "10.93px",
                                        lineHeight: "7.71px",
                                    }}
                                >{ releaseDetails.mainArtist.spotifyProfile.name }</Typography>
                            </Box>

                            <Box sx={{ flex: "1 1 40%", maxWidth: "50%" }} >
                                <CopyShareLink linkUrl={releaseDetails.liveUrl} />
                            </Box>
                        </Stack>


                        <Stack direction="row" spacing="10px" mt="20px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >Label Name</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.labelName }</Typography>
                        </Stack>

                        <Stack direction="row" spacing="10px" mt="10px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >Primary Genre</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.primaryGenre }</Typography>
                        </Stack>

                        <Stack direction="row" spacing="10px" mt="10px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >UPC</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.upc_ean }</Typography>
                        </Stack>

                    </Box>
                </Box>


                {/* Apple Music analytics for the song */}
                {/* <Box mt={10}> */}
                <Box>
                    {/* <Box 
                        sx={{
                            // width: {xs: "124.48px", md: "218.06px"},
                            height: {xs: "35px", md: "40px"}
                        }}
                    >
                        <img
                            src={ appleMusicLightlogo } alt='album image'
                            style={{
                                // width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>

                    <SingleSongDspOverviewComponent 
                        streamTime={Number(spotifyAndAppleOverview?.apple.streamTime)}
                        streams={Number(spotifyAndAppleOverview?.apple.streams)}
                        totalRevenue={Number(spotifyAndAppleOverview?.apple.revenue)}
                    />

                    <Box mt={5}>
                        <BarChartGraphComponent 
                            darkTheme={darkTheme}
                            dataset={appleMusicDataset}
                        />
                    </Box> */}

                    {/* <Grid container my={5} spacing="20px">
                        <Grid item xs={12} sm={6} md={4}>
                            <TopLocationsComponent 
                                title='Top Cities'
                                darkTheme={darkTheme}
                                locations={topCities}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TopLocationsComponent 
                                darkTheme={darkTheme}
                                locations={topCountries}
                                title='Top Countries'
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TopGenderComponent 
                                darkTheme={darkTheme}
                                menPercentage={27.8}
                                womenPercentage={72.2}
                            />
                        </Grid>
                    </Grid> */}
                </Box>


                {/* Spotify analytics for the song */}
                {/* <Box mt={20}> */}
                <Box>
                    {/* <Box sx={{ height: "35px" }}>
                        <img
                            src={ spotifyLghtThemelogo } alt='album image'
                            style={{
                                // width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>
                    
                    <SingleSongDspOverviewComponent 
                        streamTime={Number(spotifyAndAppleOverview?.spotify.streamTime)}
                        streams={Number(spotifyAndAppleOverview?.spotify.streams)}
                        totalRevenue={Number(spotifyAndAppleOverview?.spotify.revenue)}
                    />

                    <Box my={5}>
                        <BarChartGraphComponent 
                            darkTheme={darkTheme}
                            dataset={spotifyDataset}
                        />
                    </Box> */}

                    {/* <Grid container my={5} spacing="20px">
                        <Grid item xs={12} sm={6} md={4}>
                            <TopLocationsComponent 
                                title='Top Cities'
                                darkTheme={darkTheme}
                                locations={topCities}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TopLocationsComponent 
                                darkTheme={darkTheme}
                                locations={topCountries}
                                title='Top Countries'
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <TopGenderComponent 
                                darkTheme={darkTheme}
                                menPercentage={27.8}
                                womenPercentage={72.2}
                            />
                        </Grid>
                    </Grid> */}
                </Box>

            </Box>
        </AccountWrapper>
    )
}

export default SongDetails;