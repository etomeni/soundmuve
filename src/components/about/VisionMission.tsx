// import React from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import { Typography } from '@mui/material';


const textContainerStyle: SxProps<Theme> = {
    border: "1px solid #272626",
    borderRadius: {xs: '8.45px', md: "14px"},
    boxShadow: "0px 0px 4px 2px #0000005E",
    p: {xs: "15px", md: "15px"}
}

const textTitleStyle: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontWeight: "900",
    fontSize: {xs: "20px", md: "30px"},
    lineHeight: {xs: "20.09px", md: "30.14px"},
    color: "#fff",
    mb: {xs: "8px", md: "15px"},
    mt: {xs: "15px", md: ""}
}

const textDescriptionStyle: SxProps<Theme> = {
    fontFamily: "Geist",
    fontWeight: "300",
    fontSize: {xs: "13px", md: "16px"},
    lineHeight: {xs: "24.14px", md: "40px"},
    letterSpacing: {xs: "-0.08px", md: "-0.13px"},
    color: "#fff",
    textAlign: "justify"
}


const VisionMission = () => {
    return (
        <Box
            sx={{
                ...contentWidth,
                bgcolor: colors.dark,
                borderRadius: "24px",
                padding: {xs: "15px", md: "50px"},
                mt: {xs: "15px", md: "40px"}
            }}
        >

            <Grid container spacing="30px">
                <Grid item xs={12} md={6} order={{xs: 2, md: 1}}>
                    <Box height="100%">
                        <Box sx={textContainerStyle}>
                            <Typography variant='h3' component="h3"
                                sx={textTitleStyle}
                            >Mission</Typography>

                            <Typography variant='body1' component="p"
                                sx={textDescriptionStyle}
                            >
                                In an industry where creatives often struggle to navigate their journey, 
                                SoundMuve is dedicated to its mission of empowering artists,
                                podcasters and sound designers. 
                                We do this by offering seamless distribution, 
                                marketing support and valuable insights, 
                                allowing these creatives to connect with a global audience and 
                                share their unique voices with the world. 
                                We allow creators to focus on their craft while we handle the
                                complexities of reaching and growing their audience. 
                                With SoundMuve, you stay true to your sound and we stay true to our mission.
                            </Typography>
                        </Box>

                        <Box sx={{ 
                            ...textContainerStyle,
                            mt: {xs: "15px", md: "70px", lg: "50px"}, 
                        }}>
                            <Typography variant='h3' component="h3"
                                sx={textTitleStyle}
                            >Vision</Typography>

                            <Typography variant='body1' component="p"
                                sx={textDescriptionStyle}
                            >
                                To be the leading platform that amplifies and connects artists to the world, 
                                transforming theglobal music landscape by showcasing diverse 
                                and unique sounds from around the globe.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} order={{xs: 1, md: 2}}>
                    <Box height="100%">
                        <Box sx={textContainerStyle}>
                            <Typography variant='h3' component="h3"
                                sx={textTitleStyle}
                            >About us</Typography>

                            <Typography variant='body1' component="p"
                                sx={textDescriptionStyle}
                            >
                                SoundMuve is your partner at every stage of your creative journey—your sound assistant. 
                                We are a music distribution platform that helps artists, 
                                sound designers and podcasters elevate their careers and 
                                enhance their global reach. 
                                We simplify the process of distributing your tracks, 
                                podcasts and sound projects to major streaming services like 
                                Spotify, Apple Music and more. 
                                Our platform offers advanced tools for easy music management, 
                                real-time performance

                                analytics, and targeted promotional features to boost your reach and engagement. 
                                SoundMuve creates limitless opportunities by committing to the artist's journey, 
                                meeting you where you are and supporting you at every step. 
                                We focus not only on established artists but also on new and independent musicians, 
                                allowing you to forge your path without the need for a record label. 
                                We believe that any artist who partners with us will amplify their 
                                sound and achieve a global reach like never before.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default VisionMission