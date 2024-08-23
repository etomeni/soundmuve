import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
 
import { contentWidth } from '@/util/mui';

import { DspLogos } from '@/components/home/DspLogos';
import cssStyle from '@/components/home/homeStyle.module.css';
import { MobileTestimonial } from '@/components/home/MobileTestimonial';

// import logo from "@/assets/branded/logo.png";
import headerSectionBg from "@/assets/branded/images/home/headerSectionBg.png";
import spaceDude from "@/assets/branded/images/home/spaceDude.png";

import soundmuveText from "@/assets/branded/images/home/soundmuveText.png";
import { MdSectionScroll } from '@/components/home/MdSectionScroll';
import { XsSectionScroll } from '@/components/home/XsSectionScroll';
import { DesktopTestimonial } from '@/components/home/DesktopTestimonial';


export default function Home() {

    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box
                sx={{
                    position: 'relative',
                    // top: {xs: -120, sm: 50, md: -120},
                    top: -120,
                    background: "#0C2634",
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ pt: "250px", pb: "100px" }} >
                    <Box 
                        sx={{ 
                            textAlign: "center", 
                            width: {xs: "calc(100% - 50px)", md: "687px" }, 
                            mx: "auto",
                            p: 3,
                            // mt: "105px",
                            position: "relative",
                            zIndex: 2
                        }}
                    >
                        <Box className={cssStyle.astronaut}
                            sx={{
                                position: "absolute",
                                left: {xs: "-15px", md:"-90px"},
                                top: {xs: "-90px", md: "70px"},
                                width: {xs: "75.83px", md: "134px"},
                                height: {xs: "104.9px", md: "185.38px"}
                            }}
                        >
                            <img src={ spaceDude }
                                alt="space dude listening to music"
                            />
                        </Box>

                        <Typography variant="h1" component="h1"
                            sx={{
                                fontFamily: "Nohemi",
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "60px"},
                                lineHeight: {xs: "35.16px", md: "60.27px"},
                                textAlign: "center",
                                color: colors.milk
                            }}
                        >
                            Amplify your sound
                            Start Here, Reach Everywhere
                        </Typography>

                        <Typography variant="body1"
                            sx={{
                                mt: {xs: "10px", md: "35px"},
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: {xs: "13px", md: "16px"},
                                lineHeight: {xs: "16.12px", md: "19.84px"},
                                textAlign: "center",
                                color: colors.milk,
                                px: 3
                            }}    
                        >
                            Easily distribute your music and audio creations to major 
                            streaming platforms and connect with a global audience
                        </Typography>

                        <Link to="/auth/signup">
                            <Box
                                sx={{
                                    p: {xs: "10px 16px", md: "8.97px 70px"},
                                    borderRadius: {xs: "5.87px", md: "11.73px"},
                                    width: "fit-content",
                                    bgcolor: colors.primary,
                                    mx: "auto",
                                    my: {xs: "45px", md: "120px"}
                                }}
                            >
                                <Typography variant="button"
                                    sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "600",
                                        fontSize: {xs: "13px", md: "16.56px"},
                                        lineHeight: {xs: "13.06px", md: "16.63px"},
                                        textAlign: "center",
                                        color: colors.milk
                                    }}
                                >Sign up</Typography>
                            </Box>
                        </Link>
                    </Box>
                </Box>
                
                <Box
                    sx={{
                        width: "100vw",
                        height: "120%",
                        // height: "1605.25px",
                        // transform: "rotate(15deg)",

                        // bgcolor: "red",
                        position: "absolute",
                        top: "-90px",
                        left: "0px",
                        mixBlendMode: "multiply",
                    }}
                >
                    <img src={ headerSectionBg } 
                        alt="awesome background image"
                        style={{
                            width: '100%',
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                </Box>
            </Box>



            <Box bgcolor={colors.bg} zIndex={2}>
                <Box height="300px"></Box>

                <Box
                    sx={{
                        ...contentWidth,

                        boxSizing: "border-box",
                        background: "#FFB01F33",
                        border: {xs: "1.26px solid #FADBA2", md: "4px solid #FADBA2"},
                        borderRadius: {xs: "12px", md: "24px"},
                        py: {xs: "30px", md: 7},
                        px: {xs: "15px", md: "15%"},
                    }}
                >
                    <Typography variant="h2" component="h2"
                        sx={{
                            fontFamily: "Nohemi",
                            textAlign: "center",
                            fontWeight: "900",
                            fontSize: {xs: "30px", sm: "40px", md: "50px"},
                            lineHeight: {xs: "30.14px", sm: "40px", md: "50.23px"},
                            color: colors.dark,
                        }}
                    >
                        Get discovered on <span className={cssStyle.typeWritterSpan}>the biggest music platforms</span>
                    </Typography>

                    <Typography variant="body1" component="p"
                        sx={{
                            fontFamily: "Geist",
                            textAlign: "center",
                            fontWeight: "300",
                            fontSize: {xs: "13px", md: "16px"},
                            lineHeight: {xs: "16.12px", md: "20px"},
                            color: colors.dark,
                            px: {xs: 1, sm: 2, md: 5},
                            py: 2,
                        }}  
                    >
                        Release music on Spotify, Apple Music, Deezer, Amazon, TikTok, 
                        Instagram and more. Reach new audiences & fans in every 
                        corner of the world.
                    </Typography>

                    <DspLogos />

                    <Link to="/auth/signup">
                        <Box
                            sx={{
                                p: {xs: "10px 16px", md: "8.97px 70px"},
                                borderRadius: {xs: "5.87px", md: "11.73px"},
                                width: "fit-content",
                                bgcolor: {xs: colors.dark, md: colors.primary},
                                mx: "auto",
                                mt: 5
                            }}
                        >
                            <Typography variant="button"
                                sx={{
                                    fontFamily: "Nohemi",
                                    fontWeight: "600",
                                    fontSize: {xs: "13px", md: "16.56px"},
                                    lineHeight: {xs: "13.06px", md: "16.63px"},
                                    textAlign: "center",
                                    color: colors.milk
                                }}
                            >Sign up</Typography>
                        </Box>
                    </Link>

                </Box>

                <Box sx={{ display: {xs: "none", md: "block"} }}>
                    <MdSectionScroll />
                </Box>

                <Box sx={{ display: {xs: "block", md: "none"} }}>
                    <XsSectionScroll />
                </Box>

                <img 
                    alt="soundmuve logo as text"
                    src={soundmuveText}
                    style={{ width: "100%", objectFit: "contain" }}
                />

                <Box sx={{ mt: {xs: "120px", md: "80px"} }}>

                    <DesktopTestimonial />
                    <MobileTestimonial />
                </Box>

                <Stack alignItems="center" mb={5} mt={5}>
                    <Typography variant="h1" component="h1"
                        sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "900",
                            fontSize: {xs: "25px", md: "81px"},
                            lineHeight: {xs: "25.11px", md: "81.36px"},
                            color: colors.dark,
                            textAlign: "center"
                        }}
                    > Amplify your sound </Typography>

                    <Typography variant="h1" component="h1"
                        sx={{
                            fontFamily: "Geist",
                            fontWeight: "300",
                            fontSize: {xs: "13px", md: "16px"},
                            lineHeight: {xs: "16.12px", md: "19.84px"},
                            color: colors.dark,
                            textAlign: "center",
                            my: "13px",
                            width: {xs: "90%", md: "55%"}
                        }}
                    >
                        Easily distribute your music and audio creations to major
                        streaming platforms and connect with a global audience
                    </Typography>

                    <Box sx={{ mt: {xs: "39px"}, mb: {xs: "55px"} }}>
                        <Link to="/auth/signup" >
                            <Box 
                                sx={{
                                    display: "inline-block",
                                    mx: "auto",
                                    textAlign: "center",
                                    bgcolor: colors.dark,
                                    color: "#fff",
                                    p: {xs: "10px 16px", md: "8.97px 31.74px"},
                                    borderRadius: {xs: "5.87px", md: "11.73px"},
                                }}
                            >
                                <Typography variant="body1" component="div"
                                    sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "600",
                                        fontSize: {xs: "13px" },
                                        lineHeight: {xs: "13.06px" },
                                        textAlign: "center",
                                        color: colors.milk
                                    }}
                                > Sign&nbsp;up </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Stack>

                <FooterComponent />
            </Box>
        </Box>
    )
}
