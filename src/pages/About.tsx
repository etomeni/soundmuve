import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HeaderComponent from '@/components/Header';
import FooterComponent from '@/components/Footer';

import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import Stack from '@mui/material/Stack';

import SectionTwo from '@/components/about/SectionTwo';
import SectionThree from '@/components/about/SectionThree';
import VisionMission from '@/components/about/VisionMission';
import { Link } from 'react-router-dom';


function About() {

    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                my: { xs: "35px", md: "75px"},
            }}>

                <Box sx={{
                    ...contentWidth,
                    // px: {xs: 5, md: 10},
                    // mb: {xs: 5, md: 10},
                }}>

                    <Typography variant='h1' component="h1"
                        sx={{
                            fontFamily: "Nohemi", 
                            fontWeight: "900",
                            fontSize: {xs: "35px", md: "60px"},
                            lineHeight: {xs: "35.16px", md: "60.27px"},
                            textAlign: "center",
                            color: "#0C2634",
                            maxWidth: "687px",
                            mx: "auto"
                        }}
                    >
                        SoundMuve is your partner at 
                        <Typography variant='inherit' component="span" color={{xs: colors.primary, md: "inherit" }}> every stage of your </Typography>
                        
                        <Typography variant='inherit' component="span" color={colors.primary}> creative journey</Typography>
                    </Typography>

                    <Typography variant='body1' component="p"
                        sx={{
                            fontFamily: 'Geist',
                            fontWeight: "300",
                            fontSize: {xs: "13px", md: "16px"},
                            lineHeight: {xs: "16.12px", md: "19.84px"},
                            textAlign: 'center',
                            color: "#0C2634",
                            maxWidth: {xs: "330px", md: "602px"},
                            mx: "auto",
                            mt: {xs: "15px", md: "56px"}
                        }}
                    >
                        We provide the essential tools and support for artists, 
                        sound designers, and podcasters, creating limitless opportunities for you.
                    </Typography>
                </Box>

                <Box sx={{ display: {xs: "block", md: "none"}}}>
                    <SectionTwo />
                </Box>

                <Box sx={{ ...contentWidth, display: {xs: "none", md: "block"}}}>
                    <SectionTwo />
                </Box>

                <SectionThree />

                <VisionMission />

                <Box mt={{xs: '70px', md: '115px'}}>
                    <Typography variant='h1' component="h1"
                        sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "900",
                            fontSize: {xs: "35px", md: "60px"},
                            lineHeight: {xs: "35.16px", md: "60.27px"},
                            textAlign: "center",
                            color: "#0C2634",
                            maxWidth: {xs: "321px", md: "687px"},
                            mx: "auto"
                        }}
                    > We're just getting started </Typography>

                    <Typography variant='body1' component="p"
                        sx={{
                            fontFamily: "Geist",
                            fontWeight: "300", 
                            fontSize: {xs: "13px", md: "16px"},
                            lineHeight: {xs: "16.12px", md: "19.84px"},
                            textAlign: "center",
                            maxWidth: {xs: "255px", md: "602px"},
                            mx: "auto",
                            mt: {xs: '17px', md: "42px"}
                        }}
                    >
                        There's so much we have to accomplish. Here are a few milestones we've crossed so far
                    </Typography>


                    <Box
                        sx={{
                            mt: {xs: '54px', md: "94px"},
                            mb: {xs: '89px', md: "120px"}
                        }}
                    >
                        <Stack direction="row" justifyContent="space-around" alignItems="center">
                            <Box>
                                <Typography variant='h1' component="h1"
                                    sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "900",
                                        fontSize: {xs: "40px", md: "60px"},
                                        lineHeight: {xs: '40.18px', md: "60.27px"},
                                        textAlign: "center",
                                        background: "linear-gradient(180deg, #FFB01F 0%, #FFFFE6 100%)",
                                        WebkitTextFillColor: "transparent",
                                        WebkitBackgroundClip: "text"
                                    }}
                                >2M</Typography>

                                <Typography variant='subtitle1' component="p"
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "700",
                                        fontSize: {xs: "11px", md: "16px"},
                                        lineHeight: {xs: "13.64px", md: "19.84px"},
                                        textAlign: "center",
                                        color: "#6C6050"
                                    }}
                                >Songs distributed</Typography>
                            </Box>

                            <Box>
                                <Typography variant='h1' component="h1"
                                    sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "900",
                                        fontSize: {xs: "40px", md: "60px"},
                                        lineHeight: {xs: '40.18px', md: "60.27px"},
                                        textAlign: "center",
                                        background: "linear-gradient(180deg, #FFB01F 0%, #FFFFE6 100%)",
                                        WebkitTextFillColor: "transparent",
                                        WebkitBackgroundClip: "text"
                                    }}
                                >200</Typography>

                                <Typography variant='subtitle1' component="p"
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "700",
                                        fontSize: {xs: "11px", md: "16px"},
                                        lineHeight: {xs: "13.64px", md: "19.84px"},
                                        textAlign: "center",
                                        color: "#6C6050"
                                    }}
                                >Artist</Typography>
                            </Box>

                            <Box>
                                <Typography variant='h1' component="h1"
                                    sx={{
                                        fontFamily: "Nohemi",
                                        fontWeight: "900",
                                        fontSize: {xs: "40px", md: "60px"},
                                        lineHeight: {xs: '40.18px', md: "60.27px"},
                                        textAlign: "center",
                                        background: "linear-gradient(180deg, #FFB01F 0%, #FFFFE6 100%)",
                                        WebkitTextFillColor: "transparent",
                                        WebkitBackgroundClip: "text"
                                    }}
                                >50+</Typography>

                                <Typography variant='subtitle1' component="p"
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "700",
                                        fontSize: {xs: "11px", md: "16px"},
                                        lineHeight: {xs: "13.64px", md: "19.84px"},
                                        textAlign: "center",
                                        color: "#6C6050"
                                    }}
                                >Countries</Typography>
                            </Box>

                        </Stack>
                    </Box>


                    <Link to="/auth/signup">
                        <Box
                            sx={{
                                padding: {xs: "10px 45px", md: "10px 40px"},
                                borderRadius: {xs: "5.86px", md: "11.73px"},
                                bgcolor: colors.dark,
                                width: "fit-content",
                                mx: "auto"
                            }}
                        >
                            <Typography variant='button'
                                sx={{
                                    fontFamily: "Nohemi",
                                    fontWeight: "600",
                                    fontSize: {xs: "13px", md: "16.56px"},
                                    lineHeight: {xs: "13.06px", md: "16.63px"},
                                    textAlign: "center",
                                    color: colors.milk,
                                    textTransform: "unset"
                                }}
                            >Sign up</Typography>
                        </Box>
                    </Link>
                </Box>

            </Box>

            <FooterComponent />
        </Box>
    )
}

export default About;
