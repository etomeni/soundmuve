import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

// import album1 from "@/assets/images/album/album1.jpeg";
// import album2 from "@/assets/images/album/album2.jpg";
// import album3 from "@/assets/images/album/album3.jpeg";
// import album4 from "@/assets/images/album/album4.jpg";
import album5 from "@/assets/images/album/album5.jpg";

import albumCard3 from "@/assets/images/album/albumCard3.jpg";
import albumCard4 from "@/assets/images/album/albumCard4.jpg";
import albumCard5 from "@/assets/images/album/albumCard5.jpg";
import albumCard6 from "@/assets/images/album/albumCard6.jpg";

import { apiEndpoint, stringAvatar } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';
import AccountWrapper from '@/components/AccountWrapper';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import RecordLabelBigSidebarComponent from '@/components/account/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/RecordLabelSmallSidebar';
import RecordLabelSearchComponent from '@/components/account/RecordLabelSearch';
import axios from 'axios';

// import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
import { recordLabelArtistInterface } from '@/constants/typesInterface';
import { getLocalStorage, setLocalStorage } from '@/util/storage';


// const albumPreview = [
//     {
//         image: album1,
//         title: 'David',
//         subtitle: '5 Songs'
//     },
//     {
//         image: album2,
//         title: 'John',
//         subtitle: '5 Songs'
//     },
//     {
//         image: album3,
//         title: 'Mavi',
//         subtitle: '5 Songs'
//     },
//     {
//         image: album4,
//         title: 'Portable',
//         subtitle: '5 Songs'
//     },
//     {
//         image: album5,
//         title: 'Limo',
//         subtitle: '5 Songs'
//     },
// ];

function DashboardRecordLabel() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);

    const [smallSideNav, setsmallSideNav] = useState(true);

    const [totalArtists, setTotalArtists] = useState('');
    const [totalSongs, setTotalSongs] = useState('');
    const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>();


    useEffect(() => {
        const artistsList = getLocalStorage("artistsList");
        if (artistsList) {
            setRecordLabelArtist(artistsList);
        }

        getTotalNumberOfArtist();
        getAllRecordLabelArtist();
        getRecordLabelTotalSongs();
    }, []);

    
    const getTotalNumberOfArtist = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/artistsList/count?recordLabelemail=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setTotalArtists(response.count);

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
        }
    }
    
    const getAllRecordLabelArtist = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/artistsList?recordLabelemail=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setRecordLabelArtist(response.artists);
            setLocalStorage("artistsList", response.artists);
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setRecordLabelArtist([]);
        }
    }
    
    const getRecordLabelTotalSongs = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/recordLabel/songs/count?email=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setTotalSongs(response.count);
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
        }
    }


    return (
        <AccountWrapper>

            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: "flex" }}>

                    <Box
                        sx={{
                            bgcolor: darkTheme ? "#1C1B1F" : '#EFEFEF',
                            borderRadius: '8.67px',
                            display: {xs: 'none', sm: 'initial'},
                            // overflow: 'auto',
                            transition: '0.5s',
                            transitionTimingFunction: 'ease-in-out',
                        }}
                    >
                        {
                            smallSideNav ? 
                            <RecordLabelSmallSidebarComponent setSideNav={setsmallSideNav} />
                            :
                            <RecordLabelBigSidebarComponent setSideNav={setsmallSideNav} />
                        }
                    </Box>

                    <Box flexGrow={1}
                        sx={{
                            // height: '100dvh',
                            overflow: 'auto',
                            scrollBehavior: 'smooth',
                            flex: 1
                        }}
                    >
                        <Box
                            sx={{
                                // mt: {xs: 5, md: 10},
                                // pt: {xs: 5, md: 10},
                                pt: 5,
                                px: {xs: 2, md: 5, lg: 12},
                                pb: 5,
                            }}
                        >
                            <RecordLabelSearchComponent darkTheme={darkTheme} artists={recordLabelArtist || []} />

                            <Stack alignItems="center" justifyContent="center" 
                                sx={{
                                    position: "relative",
                                    minHeight: {xs: "250px", md: "420px"},
                                    color: "#fff",
                                    my: "100px",
                                }}
                            >

                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={{xs: "16px", md: "32px"}}
                                    sx={{
                                        width: "100%",
                                        position: "absolute",
                                        px: "0px"
                                    }}
                                >
                                    <Box 
                                        sx={{
                                            height: {xs: "143.35px", sm: '204.35px', md: "242.49px"},
                                            // width: {xs: "157.61px", md: "432.55px"},
                                            // width: {xs: "clamp(130px, 157.61px, 170px)", md: "clamp(350px, 80%,432.55px)"},

                                            borderRadius: {xs: "6.28px", md: "15.73px"},
                                            bgcolor: "#743339",
                                            border: "0.52px solid #DA606B",
                                            backgroundImage: `url(${albumCard5})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box sx={{width: 10000, height: 10000, }}></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            height: {xs: "143.35px", sm: '204.35px', md: "242.49px"},
                                            // width: {xs: "clamp(130px, 157.61px, 170px)", md: "clamp(350px, 80%,432.55px)"},

                                            borderRadius: {xs: "6.28px", md: "15.73px"},
                                            bgcolor: "#743339",
                                            border: "0.52px solid #DA606B",
                                            backgroundImage: `url(${albumCard6})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box sx={{width: 10000, height: 10000, }}></Box>
                                    </Box>
                                </Stack>

                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} // spacing={{xs: "-310px", md: "-340px"}}
                                    sx={{
                                        width: "100%",
                                        position: "absolute",
                                        px: {xs: '20px', sm: "25px", md: '30px'},
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: '191.77px', sm: '273.38px', md: "324.41px"},
                                            // width: {xs: "215.23px", md: "576.93px"},

                                            borderRadius: {xs: '8.4px', md: "21.04px"},
                                            bgcolor: "#69597A",
                                            border: "1.75px solid #C0A3E0",
                                            backgroundImage: `url(${albumCard3})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box sx={{width: 10000, height: 10000, }}></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            height: {xs: '191.77px', sm: '273.38px', md: "324.41px"},
                                            // width: {xs: "215.23px", md: "576.93px"},
                                            // height: {xs: '191.77px', md: "clamp(273.38px, 324.41px, 350px)"},

                                            borderRadius: {xs: '8.4px', md: "21.04px"},
                                            bgcolor: "#69597A",
                                            border: "1.75px solid #C0A3E0",
                                            backgroundImage: `url(${albumCard4})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box sx={{width: 10000, height: 10000, }}></Box>
                                    </Box>
                                </Stack>

                                <Box 
                                    sx={{
                                        px: {xs: '40px', sm: "50px", md: "60px"},
                                        position: "absolute",
                                        width: '100%',
                                    }}
                                >
                                    <Box 
                                        sx={{
                                            height: {xs: '241.31px', sm: '344px', md: "408.21px"},
                                            // height: {xs: 'clamp(200px, 241.31px, 250px)', md: "clamp(344px, 408.21px, 410px)"},

                                            borderRadius: {xs: "10.64px", md: "26.66px"},
                                            position: "relative",
                                            bgcolor: "#6E7B4E",
                                            border: "2.22px solid #CAE18E",

                                            backgroundImage: `url(${album5})`, // Replace with your image URL
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                // background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #000000 109.84%)',
                                                background: "linear-gradient(6.13deg, #000000 -10.84%, rgba(0, 0, 0, 0) 92.27%)"

                                            }}
                                        />

                                        <Box p={{xs: "25px", md: "40px 60px"}} position="absolute"
                                            sx={{
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                // justifyContent: 'center',
                                                // alignItems: 'center',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        >
                                            <Typography variant='h1' component="h1" noWrap
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "28.41px", md: "71.2px"},
                                                    lineHeight: {xs: "30.21px", md: "75.71px"},
                                                    letterSpacing: {xs: "-0.64px", md: "-1.59px"},
                                                    textAlign: 'center',
                                                    mt: {xs: "25px", md: '50px'}
                                                }}
                                            > Welcome { userData.recordLabelName } </Typography>

                                            <Stack direction="row" spacing="20px" justifyContent="space-between" mt="auto">
                                                <Box>
                                                    <Typography variant='h4' component="h4" 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "7.1px", md: '17.8px'},
                                                            lineHeight: {xs: "5.68px", md: '14.24px'},
                                                            letterSpacing: {xs: "-0.24px", md: '-0.59px'}
                                                        }}
                                                    >Artists</Typography>
                                                    
                                                    <Typography variant='h3' component="h3" 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "23.68px", md: '59.33px'},
                                                            lineHeight: {xs: '14.21px', md: '35.6px'},
                                                            letterSpacing: {xs: '-0.64px', md: '-1.59px'},
                                                            mt: {xs: "13px", md: '21px'}
                                                        }}
                                                    >{ totalArtists }</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant='h4' component="h4" 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "7.1px", md: '17.8px'},
                                                            lineHeight: {xs: "5.68px", md: '14.24px'},
                                                            letterSpacing: {xs: "-0.24px", md: '-0.59px'}
                                                        }}
                                                    >Total Songs</Typography>

                                                    <Typography variant='h3' component="h3" 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "23.68px", md: '59.33px'},
                                                            lineHeight: {xs: '14.21px', md: '35.6px'},
                                                            letterSpacing: {xs: '-0.64px', md: '-1.59px'},
                                                            mt: {xs: "13px", md: '21px'}
                                                        }}
                                                    >{ totalSongs }</Typography>
                                                </Box>
                                            </Stack>

                                        </Box>
                                    </Box>
                                </Box>

                            </Stack>

                            {
                                recordLabelArtist && recordLabelArtist.length ? (
                                    <Box>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between" my="50px">
                                            <Typography variant='h3' component="h3"
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: '23.73px',
                                                    lineHeight: '14.24px',
                                                    letterSpacing: '-0.59px',
                                                    // my: '50px'
                                                }}
                                            >Artist</Typography>

                                            <Typography variant='h3' component="h3"
                                                onClick={() => navigate("/account/record-label/artist")}
                                                sx={{
                                                    fontWeight: '900',
                                                    fontSize: '23.73px',
                                                    lineHeight: '14.24px',
                                                    letterSpacing: '-0.59px',
                                                    // my: '50px',
                                                    cursor: 'pointer'
                                                }}
                                            >See all</Typography>
                                        </Stack>

                                        <Grid container spacing={3}>
                                            {
                                                recordLabelArtist?.slice(0, 6).map((item, i) => (
                                                    <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                                                        <Stack alignItems="center">
                                                            <Avatar
                                                                alt={`${item.artistName} image`}
                                                                src={item.artistAvatarUrl}
                                                                // variant="rounded"
                                                                aria-label={item.artistName}
                                                                sx={{ 
                                                                    boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                                                    // bgcolor: stringToColor(project.title),
                                                                    width: "110px",
                                                                    height: "110px",
                                                                    // mb: "0.5rem",
                                                                    // p: 1
                                                                }}
                                                                children={<Typography sx={{
                                                                    fontSize: "15px",
                                                                    fontWeight: "bold"
                                                                }}>{stringAvatar(item.artistName)}</Typography>}
                                                            />
                                    
                                                            <Typography variant='h4' component="h4"
                                                                sx={{
                                                                    fontWeight: '900',
                                                                    fontSize: '23.73px',
                                                                    lineHeight: '14.24px',
                                                                    letterSpacing: '-0.59px',
                                                                    mt: '26px'
                                                                }}
                                                            >{item.artistName}</Typography>

                                                            <Typography variant='body2'
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: '14.24px',
                                                                    lineHeight: '10.68px',
                                                                    letterSpacing: '-0.59px',
                                                                    color: '#666666',
                                                                    mt: '13px'
                                                                }}
                                                            >{ item.songCount }</Typography>
                                                        </Stack>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </Box>
                                ) : <></>
                            }


                            <Box my={5}>
                                <PromotionalAdsComponent />
                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Box>

        </AccountWrapper>
    )
}

export default DashboardRecordLabel;
