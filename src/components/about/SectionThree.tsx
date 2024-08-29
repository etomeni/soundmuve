// import React from 'react';
import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import section3Img1 from "@/assets/branded/images/about/section3Img1.png"
import section3Img2 from "@/assets/branded/images/about/section3Img2.png"
import section3Img3 from "@/assets/branded/images/about/section3Img3.png"
import section3Img4 from "@/assets/branded/images/about/section3Img4.png"


const textTitleStyle: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontWeight: "900",
    fontSize: {xs: "35px", md: "60px"},
    lineHeight: {xs: "35.16px", md: "60.27px"},
    color: colors.dark
}

const cardTitleStyle: SxProps<Theme> = {
    maxWidth: {xs: "178.17px", md: "204px"},
    ml: "auto",
    mb: {xs: "27px", md: "54px"},
    mt: {xs: "50px", md: "unset"},
    color: "#fff",
    textAlign: "right",
    fontSize: {xs: "20px", md: "60px"},
    lineHeight: {xs: "20.09px", md: "60.27px"},
}


const textDescriptionStyle: SxProps<Theme> = {
    fontFamily: "Geist",
    fontWeight: "300",
    fontSize: {xs: "13px", md: "16px"},
    lineHeight: {xs: "24.14px", md: "30px"},
    letterSpacing: {xs: "-0.08px", md: "-0.13px"},
    color: "#fff",
    textAlign: "right",
    maxWidth: {xs: "182px", md: "263px"},
    ml: "auto"
}

const cardContainerStyle: SxProps<Theme> = {
    width: "100%",
    maxWidth: {xs: "349px", md: "400px"},
    // height: "100%",
    maxHeight: {xs: "319px", md: "490px"},
    borderRadius: {xs: "20.96px", md: "24px"},
    position: "relative",
    overflow: "hidden",
    p: {xs: "15px", md: "40px"}
}

const cardImgContainerStyle: SxProps<Theme> = {
    width: "219.38px",
    // height: "219.38px",
    position: "absolute",
    mixBlendMode: "luminosity",
}


const SectionThree = () => {
    return (
        <Box
            sx={{
                ...contentWidth,
                mt: {xs: "75px", md: "120px"}
            }}
        >

            <Grid container spacing="15px">
                <Grid item xs={12} sm={2} md={3} lg={4}>
                    <Box height="100%">
                        <Typography variant='h1' component="h1"
                            sx={{
                                ...textTitleStyle
                            }}
                        >What we do</Typography>

                    </Box>
                </Grid>

                <Grid item xs={12} sm={10} md={9} lg={8}>
                    <Box height="100%">

                        <Grid container spacing="15px">
                            <Grid item xs={12} md={6}>
                                <Box height="100%">
                                    <Box
                                        sx={{
                                            ...cardContainerStyle,
                                            bgcolor: colors.dark,
                                        }}
                                    >

                                        <Typography variant='h1' component="h1"
                                            sx={{
                                                ...textTitleStyle,
                                                ...cardTitleStyle
                                            }}
                                        >What we do</Typography>

                                        <Typography variant='body1' component="p"
                                            sx={{
                                                ...textDescriptionStyle,
                                                color: "#fff",
                                                textAlign: "right"
                                            }}
                                        >
                                            To be the leading platform that amplifies and 
                                            connects artists to the world, transforming the
                                        </Typography>

                                        <Box height={{xs: "70px", md: "70px" }}></Box>

                                        <Box
                                            sx={{
                                                width: {xs: "", md: "100px"},
                                                height: {xs: "", md: "104px"},
                                                borderRadius: "50%",
                                                bgcolor: "#D9D9D9", // "#D9D9D9",
                                                position: "absolute",
                                                // mixBlendMode: "luminosity",

                                                // background: "linear-gradient(180deg, #644986 0%, rgba(100, 73, 134, 0) 100%)",
                                                filter: "blur(379.951px)",
                                            
                                                // top: '0',
                                                bottom: {xs: 0, md: "20px"},
                                                left: {xs: 0, md: "20px"},
                                            }}
                                        ></Box>

                                        <Box
                                            sx={{
                                                ...cardImgContainerStyle,
                                                mixBlendMode: "luminosity",
                                                left: {xs: "-59px", md: "-46px"},
                                                bottom: {xs: "-59px", md: "-40px"},
                                            }}
                                        >
                                            <img src={section3Img1} alt='section three image' 
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box height="100%">

                                    <Box
                                        sx={{
                                            ...cardContainerStyle,
                                            bgcolor: colors.dark,
                                        }}
                                    >
                                        <Typography variant='h1' component="h1"
                                            sx={{
                                                ...textTitleStyle,
                                                ...cardTitleStyle,
                                            }}
                                        >What we do</Typography>

                                        <Typography variant='body1' component="p"
                                            sx={{
                                                ...textDescriptionStyle,
                                                textAlign: "right"
                                            }}
                                        >
                                            To be the leading platform that amplifies and 
                                            connects artists to the world, transforming the
                                        </Typography>

                                        <Box height={{xs: "70px", md: "70px" }}></Box>

                                        <Box
                                            sx={{
                                                ...cardImgContainerStyle,
                                                left: {xs: "-95px", md: "-46px"},
                                                bottom: {xs: "-50px", md: "-50px"},
                                            }}
                                        >
                                            <img src={section3Img2} alt='section three image' 
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>

                                    </Box>

                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box height="100%">

                                    <Box
                                        sx={{
                                            ...cardContainerStyle,
                                            bgcolor: colors.dark,
                                        }}
                                    >
                                        <Typography variant='h1' component="h1"
                                            sx={{
                                                ...textTitleStyle,
                                                ...cardTitleStyle,
                                            }}
                                        >What we do</Typography>

                                        <Typography variant='body1' component="p"
                                            sx={{
                                                ...textDescriptionStyle,
                                                textAlign: "right"
                                            }}
                                        >
                                            To be the leading platform that amplifies and 
                                            connects artists to the world, transforming the
                                        </Typography>


                                        <Box height={{xs: "70px", md: "70px" }}></Box>

                                        <Box
                                            sx={{
                                                ...cardImgContainerStyle,
                                                left: {xs: "-92px", md: "-50px"},
                                                bottom: {xs: "-70px", md: "-50px"},
                                            }}
                                        >
                                            <img src={section3Img3} alt='section three image' 
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>

                                    </Box>

                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box height="100%">

                                    <Box
                                        sx={{
                                            ...cardContainerStyle,
                                            // bgcolor: colors.dark,
                                            background: "linear-gradient(180deg, #3D8F21 0%, #FFB01F 100%)"
                                        }}
                                    >
                                        <Typography variant='h1' component="h1"
                                            sx={{
                                                ...textTitleStyle,
                                                ...cardTitleStyle,
                                            }}
                                        >What we do</Typography>

                                        <Typography variant='body1' component="p"
                                            sx={{
                                                ...textDescriptionStyle,
                                                textAlign: "right"
                                            }}
                                        >
                                            To be the leading platform that amplifies and 
                                            connects artists to the world, transforming the
                                        </Typography>

                                        <Box height={{xs: "70px", md: "70px" }}></Box>

                                        <Box
                                            sx={{
                                                ...cardImgContainerStyle,
                                                left: {xs: "-86px", md: "-46px"},
                                                bottom: {xs: "-86px", md: "-50px"},
                                            }}
                                        >
                                            <img src={section3Img4} alt='section three image' 
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </Box>

                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default SectionThree