// import { Pagination, Autoplay, Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './pricingStyles.module.css';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";

import spotify from "./../assets/images/spotify.png";
import apple from "./../assets/images/apple.png";
import amazon from "./../assets/images/amazon.png";
import tiktok from "./../assets/images/tiktok.png";
import youtube from "./../assets/images/youtube.png";
import beatport from "./../assets/images/beatport.png";


const musicDSPlogos = [
    {
        src: spotify,
        alt: "spotify logo" 
    },
    {
        src: apple,
        alt: "apple music logo" 
    },
    {
        src: amazon,
        alt: "amazon music logo" 
    },
    {
        src: tiktok,
        alt: "tiktok logo" 
    },
    {
        src: youtube,
        alt: "youtube muisc logo" 
    },
    {
        src: beatport,
        alt: "beatport logo" 
    },
];

function Pricing() {
    const navigate = useNavigate();
    const isMediumScreen = useMediaQuery('(min-width: 960px)');


    return (
        <>
            <HeaderComponent />

            <Box sx={{bgcolor: "#000", color: "#fff", pt: 5, position: "relative", overflow: "hidden"}}>
                <>
                    <Box sx={{display: { xs: 'none', md: 'block' }}}>
                        <div className={style.topGradient}></div>
                        <div className={style.leftGradient}></div>
                        <div className={style.leftBottomGradient}></div>
                        <div className={style.rightTopGradient}></div>
                        <div className={style.rightBottom2Gradient}></div>
                        <div className={style.btnCenteredGradient}></div>
                        <div className={style.leftBottom2Gradient}></div>
                    </Box>

                    <Box sx={{display: { xs: 'block', md: 'none' }}}>
                        <div className={style.mobileLeftGradient}></div>
                        <div className={style.mobileRightGradient}></div>
                        <div className={style.mobileCenteredGradient}></div>
                    </Box>
                </>


                <Container sx={{position: "relative", zIndex: 10, mt: {xs: 5, md: 10} }}>
                    <Box>
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 30, md: 50},
                            textAlign: "center", lineHeight: 1.2,
                            mt: 7,
                            mb: {xs: 2, md: 7}
                        }}>
                            SoundMuve Pricing & Plans
                        </Typography>

                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: 13,
                            display: {xs: "block", md: "none"}
                        }}>
                            Distribute music to over 150 digital stores across 200 countries and territories worldwide. 
                            Get daily sales trends for Amazon, iTunes, Apple Music, and Spotify, 
                            and keep every cent of what you're owed from sales and streams.
                        </Typography>

                        <Box className={isMediumScreen ? style.dsplogoContainer : ''} sx={{ px: {xs: 0, md: 2}, my: 10 }}>
                            <Swiper
                                autoplay={true}
                                loop
                                // speed={100}
                                spaceBetween={50}
                                slidesPerView={2.4}
                                // navigation
                                // modules={[Navigation, Pagination, Scrollbar, A11y]}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 2.5,
                                        // spaceBetween: 20
                                    },
                                    450: {
                                    slidesPerView: 3.5,
                                    // spaceBetween: 20
                                    },
                                    // sm, small
                                    600: {
                                        slidesPerView: 4.5,
                                        // spaceBetween: 40
                                    },
                                    // md, medium
                                    900: {
                                        slidesPerView: 5.5,
                                        // spaceBetween: 40
                                    },
                                    // lg, large
                                    1200:{
                                        slidesPerView: 6
                                    }

                                }}
                                // modules={[Navigation, Autoplay]}
                                // className="mySwiper"
                            >
                                {musicDSPlogos.map((dspLogo, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Box sx={{p: {xs: 0, md: 5} }}>
                                                <img src={dspLogo.src} alt={dspLogo.alt} />
                                            </Box>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </Box>
                    
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 20, md: 35},
                            textAlign: "center"
                        }}>
                            Digital Music Distribution Stores
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 5
                        }}>
                            <Box sx={{
                                maxWidth: 460,
                                width: "100%",
                                borderRadius: 2,
                                border: "1px solid #fff",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 2,
                                alignItems: "center",
                                textAlign: "center",
                                p: 1,
                                flexWrap: "nowrap"
                            }}>
                                <Typography sx={{
                                    bgcolor: "#fff",
                                    color: "#000",
                                    p: 1.5,
                                    borderRadius: 2,
                                    flexGrow: 1,
                                    fontSize: {xs: 13, md: 25},
                                    fontWeight: "900"
                                }}>
                                    Unlimited plan
                                </Typography>

                                <Typography sx={{
                                    // bgcolor: "#fff",
                                    color: "#fff",
                                    p: 1.5,
                                    borderRadius: 2,
                                    flexGrow: 1,
                                    fontSize: {xs: 13, md: 25},
                                    fontWeight: "900"
                                }}>
                                    Pay per release
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{my: 10}}>
                            <Grid container spacing={2} position="unset">
                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Basic plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $10
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>

                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Unlimited releases
                                            </li>
                                            <li>
                                                Basic analytics
                                            </li>
                                            <li>
                                                Choose release date
                                            </li>
                                            <li>
                                                Customisable artist profile
                                            </li>
                                            <li>
                                                Community access
                                            </li>
                                            <li>
                                                Music promo campaign
                                            </li>
                                            <li>
                                                Music distribution on streaming platforms
                                            </li>
                                            <li>
                                                Support reply under 72hrs
                                            </li>
                                            <li>
                                                Change to Business or Premium Plan anytime
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>
                                
                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Business plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $30
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>

                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Everything in the Basic Plan
                                            </li>
                                            <li>
                                                Advanced Analytics
                                            </li>
                                            <li>
                                                Pre-save & Smartlinks
                                            </li>
                                            <li>
                                                Youtube Content ID
                                            </li>
                                            <li>
                                                Support reply under 48hrs
                                            </li>
                                            <li>
                                                Automated royalty splitting
                                            </li>
                                            <li>
                                                Enhanced Marketing tools
                                            </li>
                                            <li>
                                                Custom release strategies
                                            </li>
                                            <li>
                                                Additional Distribution Channels
                                            </li>
                                            <li>
                                                Change to Premium Plan anytime
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>

                                <Grid item
                                    xs={12} md={4}
                                    // sx={{ alignSelf: "center" }}
                                >
                                    <Box sx={{
                                        bgcolor: "#fff", color: "#000", p: 2, 
                                        borderRadius: 3
                                    }}>
                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder"
                                        }}>
                                            Enterprise plan
                                        </Typography>

                                        <Typography sx={{
                                            fontSize: {xs: 35, md: 45},
                                            fontWeight: "bold",
                                            my: 2
                                        }}>
                                            $60
                                            <span style={{
                                                fontWeight: "400",
                                                fontSize: 16
                                            }}> Per year </span>
                                        </Typography>

                                                    
                                        <Button variant="contained" 
                                            type="button" fullWidth
                                            sx={{ 
                                                bgcolor: "#000000",
                                                "&:hover": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:active": {
                                                    bgcolor: "#000000"
                                                },
                                                "&:focus": {
                                                    bgcolor: "#000000"
                                                },
                                                color: "#fff",
                                                // borderRadius: "12px",
                                                my: 2
                                            }}
                                        >
                                            Get started
                                        </Button>

                                        <Typography sx={{
                                            fontSize: 20,
                                            fontWeight: "bolder",
                                        }}>
                                            Features
                                        </Typography>
                                        
                                        <ul className={style.pricingFeatures}>
                                            <li >
                                                Everything in the Business Plan
                                            </li>
                                            <li>
                                                Premium Analytics
                                            </li>
                                            <li>
                                                Pitch for TV and Movie Sync
                                            </li>
                                            <li>
                                                Free ISRC and UPCs
                                            </li>
                                            <li>
                                                Support reply under 24hrs
                                            </li>
                                            <li>
                                                100% Revenue from Digital Stores
                                            </li>
                                            <li>
                                                High-Quality Audio mastering
                                            </li>
                                            <li>
                                                Promotional Opportunities and Playlist Submissions
                                            </li>
                                        </ul>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Container>
        
                <Box className={style.bottomContainer} sx={{textAlign: "center", py: 10}}>
                    <Container>
                        <Typography sx={{
                            fontWeight: "900",
                            fontSize: {xs: 18, md: 25},
                            textAlign: "center"
                        }}>
                            Sign up for a free trial to discover the perfect plan for your career journey.
                        </Typography>
        
                        <Button variant="contained" 
                            type="button" 
                            sx={{ 
                                bgcolor: "#644986",
                                "&:hover": {
                                    bgcolor: "#644986"
                                },
                                "&:active": {
                                    bgcolor: "#644986"
                                },
                                "&:focus": {
                                    bgcolor: "#644986"
                                },
                                color: "#fff",
                                borderRadius: "12px",
                                my: 2
                            }}
                            onClick={() => navigate("/auth/signup")}
                        >
                            Sign up
                        </Button>
                    </Container>
                </Box>
            </Box>

            <FooterComponent />
        </>
    )
}

export default Pricing;
