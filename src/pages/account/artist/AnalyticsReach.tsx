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
import ArtistAnalyticsNavComponent from '@/components/account/ArtistAnalyticsNav';

// import albumImage from '@/assets/images/album.png';
import BarChartGraphComponent from '@/components/analytics/BarChartGraph';



// const moreInsights = [
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "-40%",
//         status: false
//     },
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: false
//     },
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "-40%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "+ 200%",
//         status: true
//     },
//     {
//         title: "Good God",
//         percentage: "-40%",
//         status: false
//     },
// ];


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
  
  

function AnalyticsReach() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);


    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>
                <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                    <IconButton 
                        onClick={() => navigate(-1)}
                        sx={{
                            color: darkTheme ? "#fff" : "#000", 
                            mb: 2,
                            
                        }}
                    >
                        <ChevronLeftIcon sx={{ display: {xs: "none", md: "block"} }} />
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

                <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
                    <ArtistAnalyticsNavComponent darkTheme={darkTheme} currentPage='analytics-reach' accountType='artist' />
                </Box>


                <Box sx={{ mt: 7 }}>
                    <Box
                        sx={{
                            background: {
                                xs: darkTheme ? "linear-gradient(89.99deg, #272727 17.33%, rgba(206, 41, 55, 0.5) 99.99%)" : "linear-gradient(89.99deg, #272727 39.65%, #8F1E27 99.99%)",
                                md: darkTheme ? "rgba(121, 121, 121, 0.25)" : "linear-gradient(89.99deg, #272727 39.65%, #8F1E27 99.99%)"
                            },

                            backdropFilter: "blur(12.5px)",
                            WebkitBackdropFilter: "blur(12.5px)",
                            borderRadius: {xs: "13.43px", md: "37px"},
                            height: {xs: "117.98px", md: "325px"},

                            display: "flex",
                            flexDirection: "column",
                            p: {xs: "15px", md: "50px"},
                            color: "#fff"
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "21.78px", md: "60px"},
                                lineHeight: {xs: "8.71px", md: "24px"}
                            }}
                        > Overview </Typography>

                        <Stack mt="auto" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
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


                    {/* <Box mt={5}>
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: "30px",
                                lineHeight: "24px",
                                color: "#797979",
                                mb: 2
                            }}
                        >More insight</Typography>

                        <Grid container spacing="20px">
                            {
                                moreInsights.map((insight, index) => (
                                    <Grid key={index} item xs={6} md={4}>
                                        <Box 
                                            sx={{ 
                                                width: "95%",
                                                // maxWidth: {xs: "196.38px", md: "345px"},
                                                // mx: "auto"
                                            }}
                                            onClick={() => navigate("/account/artist/song-details")}
                                        >
                                            <Box
                                                sx={{
                                                    height: {xs: "152.99px", md: "268px"},
                                                    borderRadius: {xs: "6.85px", md: "12px"},
                                                    bgcolor: "#343434",
                                                    textAlign: "center",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Box 
                                                    sx={{
                                                        width: {xs: "124.48px", md: "218.06px"},
                                                        height: {xs: "124.48px", md: "218.06px"}
                                                    }}
                                                >
                                                    <img
                                                        src={albumImage} alt='album image'
                                                        style={{
                                                            width: "100%",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            <Stack direction={"row"} justifyContent={"space-between"} my="8px" spacing={"20px"} alignItems={"center"}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "10.85px", md: "19px"},
                                                        lineHeight: {xs: "13.7px", md: "24px"},
                                                        letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                                                    }}
                                                > { insight.title } </Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "10.85px", md: "19px"},
                                                        lineHeight: {xs: "13.7px", md: "24px"},
                                                        letterSpacing: {xs: "-0.77px", md: "-1.34px"},
                                                        color: insight.status ? darkTheme ? "#C8F452" : "#33500B" : "#CE2937"
                                                    }}
                                                > { insight.percentage } </Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box> */}
                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default AnalyticsReach;