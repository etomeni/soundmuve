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
import { useSettingStore } from '@/state/settingStore';

import albumSampleArtImg from '@/assets/images/albumSampleArt.png';
import appleMusiclogo from '@/assets/images/apple.png';
import appleMusicLightlogo from '@/assets/images/appleLightTheme.png';
import spotifylogo from '@/assets/images/spotify.png';
import spotifyLghtThemelogo from '@/assets/images/spotifyLghtTheme.png';
import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';
import { useReleaseStore } from '@/state/releaseStore';
import BarChartGraphComponent from '@/components/analytics/BarChartGraph';
import SingleSongDspOverviewComponent from '@/components/analytics/SingleSongDspOverview';



const dataset = [
    {
      percentageValue: 21,
      month: 'Jan',
    },
    {
      percentageValue: 28,
      month: 'Feb',
    },
    {
      percentageValue: 41,
      month: 'Mar',
    },
    {
      percentageValue: 73,
      month: 'Apr',
    },
    {
      percentageValue: 99,
      month: 'May',
    },
    {
      percentageValue: 144,
      month: 'Jun',
    },
    {
      percentageValue: 319,
      month: 'July',
    },
    {
      percentageValue: 249,
      month: 'Aug',
    },
    {
      percentageValue: 131,
      month: 'Sept',
    },
    {
      percentageValue: 55,
      month: 'Oct',
    },
    {
      percentageValue: 48,
      month: 'Nov',
    },
    {
      percentageValue: 25,
      month: 'Dec',
    },
];
  
  

function SongDetails_RL() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    
    const songDetails = useReleaseStore((state) => state.songDetails);



    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>


                <Box sx={{ mt: 7 }}>
                    <Box
                        sx={{
                            backgroundColor: darkTheme ? "none" : "#272727",
                            borderRadius: {xs: "13.43px", md: "22px"},
                            display: {xs: "none", sm: "flex"},
                            flexDirection: "column",
                            p: {xs: "15px", md: "25px"},
                            color: "#fff",

                        }}
                    >
                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: "#fff", mb: 2 }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
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
                                            '.MuiSvgIcon-root ': {
                                                fill: "#797979",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
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
                        > { songDetails.song_title } </Typography>

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
                                    src={ songDetails.cover_photo } alt={`${ songDetails.song_title } cover photo`}
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
                                > { songDetails.song_title } </Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        color: "#CACACA"
                                    }}
                                > { songDetails.artist_name } </Typography>

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
                                            color: "#CACACA"
                                        }}
                                    >{ songDetails.label_name } </Typography>
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
                                            color: "#CACACA"
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
                                            color: "#CACACA"
                                        }}
                                    > { songDetails.upc_ean } </Typography>
                                </Stack>
                            </Box>
                        </Stack>


                        <Stack mt="50px" width={"60%"} direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: '12px', md: '24px'},
                                        lineHeight: {xs: '8.71px', md: '24px'}
                                    }}
                                >$60,000.00</Typography>
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
                                >80,000,000</Typography>
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
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>
                    </Box>


                    <Box sx={{ display: {xs: "initial", sm: "none"} }}>

                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: darkTheme ? "#fff" : "#000" }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
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
                                            '.MuiSvgIcon-root ': {
                                                fill: "#797979",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
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
                        > Sensami </Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16.88px",
                                lineHeight: "4.05px",
                                color: "#797979",
                                mt: 2
                            }}
                        > Album </Typography>

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
                                src={ albumSampleArtImg } alt='album image'
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
                                >$60,000.00</Typography>
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
                                >80,000,000</Typography>
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
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                p: darkTheme ? 0 : '15px',
                                bgcolor: darkTheme ? 'none' : "#272727",
                                borderRadius: "12px",
                                color: "#fff",
                                mt: "10px"
                            }}
                        >

                            <Stack direction="row" spacing="10px">
                                <Box sx={{ flex: "1 1 45%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "15.43px",
                                            lineHeight: "15.43px",
                                        }}
                                    >Sensami</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "10.93px",
                                            lineHeight: "7.71px",
                                            color: "#CACACA"
                                        }}
                                    >Joseph solomon </Typography>
                                </Box>

                                <Box sx={{ flex: "1 1 45%" }} >
                                    <Stack direction="row" spacing="10px">
                                        <AppleSportifyCheckmark dspName="Apple" />
                                        <AppleSportifyCheckmark dspName="Spotify" />
                                    </Stack>
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
                                        color: "#CACACA"
                                    }}
                                >More Grace Music </Typography>
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
                                        color: "#CACACA"
                                    }}
                                >Dance  </Typography>
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
                                        color: "#CACACA"
                                    }}
                                >123456789</Typography>
                            </Stack>

                        </Box>

                    </Box>



                    <Box mt={10}>
                        <Box sx={{ height: {xs: "35px", md: "40px"} }} >
                            <img
                                src={ darkTheme ? appleMusiclogo : appleMusicLightlogo } alt='album image'
                                style={{
                                    // width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                      
                      
                        <SingleSongDspOverviewComponent 
                            streamTime='120hrs'
                            streams={80000000}
                            totalRevenue={60000.00}
                        />


                        <Box my={5}>
                            <BarChartGraphComponent 
                                darkTheme={darkTheme}
                                dataset={dataset}
                            />
                        </Box>

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

                    <Box mt={20}>
                        <Box sx={{ height: "35px" }}>
                            <img
                                src={ darkTheme ? spotifylogo : spotifyLghtThemelogo } alt='album image'
                                style={{
                                    // width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                        
                        
                        <SingleSongDspOverviewComponent 
                            streamTime='120hrs'
                            streams={80000000}
                            totalRevenue={60000.00}
                        />


                        <Box my={5}>
                            <BarChartGraphComponent 
                                darkTheme={darkTheme}
                                dataset={dataset}
                            />
                        </Box>

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
            </Box>

        </AccountWrapper>
    )
}

export default SongDetails_RL;