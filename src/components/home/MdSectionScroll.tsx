// import React from 'react';
import { Link } from 'react-router-dom';
import { contentWidth } from '@/util/mui'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


import colors from '@/constants/colors'
import section1Scroll from "@/assets/branded/images/home/section1Scroll.png";
import section1ScrollBranding from "@/assets/branded/images/home/section1ScrollBranding.png";

import section2Scroll from "@/assets/branded/images/home/section2Scroll.png";
import section2ScrollBranding from "@/assets/branded/images/home/section2ScrollBranding.png";

import section3Scroll from "@/assets/branded/images/home/section3Scroll.png";
import section3ScrollBranding from "@/assets/branded/images/home/section3ScrollBranding.png";

import section4Scroll from "@/assets/branded/images/home/section4Scroll.png";

// import soundmuveText from "@/assets/branded/images/home/soundmuveText.png";
import cssStyle from '@/components/home/homeStyle.module.css';
import { SxProps, Theme } from '@mui/material/styles';




const contentContainer: SxProps<Theme> = {
    // width: 1138px;
    height: { md: "429px", lg: "529px" },
    mx: 'auto',
    borderRadius: "50px",
    // background: "#6C6050",
    border: "4px solid #F2D59E",
    // mb: 2,
    mb: "20%", // "102px",
}

const imgContainer: SxProps<Theme> = {
    width: { md: "361px", lg: "461px"} ,
    height: { md: "361px", lg: "461px"},
    borderRadius: "34.74px",
    backgroundSize: 'contain',
    backgroundRepeat: "no-repeat",
    // backgroundPosition: 'center',
    position: "relative",
    overflow: "hidden",
}

const brandOverlayImgContainer: SxProps<Theme> = {
    mixBlendMode: "soft-light",
    position: "absolute",
}

const rightTextContainer: SxProps<Theme> = {
    maxWidth: "500px",
    pr: {md: "30px", lg: "72px"},
    // pr: "72px",
    color: colors.milk,

}

const leftTextContainer: SxProps<Theme> = {
    maxWidth: "500px",
    pl: {md: "20px", lg: "51px"},

    // pl: "51px",
    color: colors.milk,
}

const titleText: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontWeight: "900",
    fontSize: {md: "26px", lg: "36px"},
    lineHeight: {md: "26.09px", lg: "36.16px"},
    textAlign: "left"
}

const detailsText: SxProps<Theme> = {
    fontFamily: "Geist",
    fontWeight: "300",
    fontSize: "16px",
    lineHeight: "19.84px",
    textAlign: "justify",
    mt: { md: "20px", lg: "25px" },
    mb: {md: "55px", lg: "65px"}
}

const btnContainer: SxProps<Theme> = {
    p: "10px 65px",
    borderRadius: "5.87px",
    // bgcolor: colors.dark,
    border: "0.5px solid #232323",
    boxShadow: "0px 4px 4px 0px #00000040",
    width: "fit-content",
    mx: "auto",
}

const btnText: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "16.07px",
    textAlign: "center",
    color: colors.milk
}

export const MdSectionScroll = () => {
    return (
        <Box
            sx={{
                ...contentWidth,
                // height: "100vh",
                // overflowY: "auto",
                scrollSnapType: "y mandatory",
                mt: "102px",
                mb: "30px",
            }}
        >

            <div className={cssStyle.stickyCard}>
                <Box sx={{ ...contentContainer, bgcolor: "#6C6050" }} >
                    <Stack 
                        direction="row" justifyContent="space-between" alignItems="center"
                        spacing="20px" height="100%"
                    >
                        <Box>
                            <Box
                                sx={{
                                    ...imgContainer,
                                    backgroundImage: `url(${section1Scroll})`,
                                }}
                            >
                                <Box sx={brandOverlayImgContainer}>
                                    <img src={section1ScrollBranding}
                                        alt='soundMuve logo'
                                        style={{
                                            width: "100%",
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ ...rightTextContainer }}>
                            <Typography variant="h2" component="h2"
                                sx={ titleText }
                            >Your Sound, Your Stage, Our Support</Typography>
                            
                            <Typography variant="body1" sx={ detailsText } >
                                We believe in the power of your sound to make a global impact. 
                                SoundMuve empowers artists at every level with a transparent and 
                                inclusive music distribution platform that expands your reach. 
                                From your local scene to a worldwide audience, 
                                we take your sound from anywhere in the world to everywhere it matters.
                            </Typography>

                            <Link to="/auth/signup" style={{ display: "contents" }}>
                                <Box sx={{ ...btnContainer, bgcolor: colors.dark }}>
                                    <Typography variant="button"
                                        sx={btnText}    
                                    >See more</Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Stack>
                </Box>
            </div>            

            <div className={cssStyle.stickyCard}>
                <Box sx={{ ...contentContainer, bgcolor: "#0C2634" }}>
                    <Stack 
                        direction="row" justifyContent="space-between" alignItems="center"
                        spacing="20px" height="100%"
                    >
                        <Box sx={ leftTextContainer }>
                            <Typography variant="h2" component="h2"
                                sx={titleText}
                            >Get Your Sound Discovered</Typography>
                                
                            <Typography variant="body1" sx={detailsText}>
                                We'll expand your reach and boost your visibility across top streaming 
                                platforms like Spotify, Apple Music, Boomplay and more. 
                                Captivate millions and attract new listeners with yourunique voice. 
                                Make your mark and watch your sound reach audiences everywhere
                            </Typography>

                            <Box sx={{ float: "left"}}>
                                <Link to="/auth/signup" style={{ display: "contents" }}>
                                    <Box sx={{ ...btnContainer, bgcolor: colors.dark }} >
                                        <Typography variant="button" sx={ btnText }    
                                        >See more</Typography>
                                    </Box>
                                </Link>
                            </Box>

                        </Box>

                        <Box>
                            <Box
                                sx={{
                                    ...imgContainer,
                                    backgroundImage: `url(${section2Scroll})`,
                                }}
                            >
                                <Box sx={ brandOverlayImgContainer }>
                                    <img src={section2ScrollBranding} alt='soundMuve logo' 
                                        style={{
                                            width: "100%",
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </div>
            
            <div className={cssStyle.stickyCard}>
                <Box sx={{ ...contentContainer, bgcolor: "#212121" }}>
                    <Stack 
                        direction="row" justifyContent="space-between" alignItems="center"
                        spacing="20px" height="100%"
                    >
                        <Box>
                            <Box
                                sx={{
                                    ...imgContainer,
                                    backgroundImage: `url(${section3Scroll})`,
                                }}
                            >
                                <Box sx={ brandOverlayImgContainer } >
                                    <img src={section3ScrollBranding} alt='soundMuve logo'
                                        style={{
                                            width: "100%",
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={rightTextContainer} >
                            <Typography variant="h2" component="h2"
                                sx={titleText}
                            >Embrace Your Creative Freedom</Typography>
                            
                            <Typography variant="body1" sx={detailsText}>
                                You can now enjoy unmatched creative freedom, 
                                and stay true to your sound and independentspirit.
                                Discover limitless opportunities and explore your full 
                                potential with our support, guidingyou through every stage of your journey. 
                                Step into a new era of success and own your sound story
                            </Typography>

                            <Box sx={{ float: "right" }}>
                                <Link to="/auth/signup" style={{ display: "contents" }}>
                                    <Box
                                        sx={{
                                            ...btnContainer,
                                            bgcolor: colors.primary,
                                        }}
                                    >
                                        <Typography variant="button"
                                            sx={btnText}    
                                        >See more</Typography>
                                    </Box>
                                </Link>
                            </Box>

                        </Box>
                    </Stack>
                </Box>
            </div>

            <div className={cssStyle.stickyCard}>
                <Box sx={{ ...contentContainer, bgcolor: "#0C2634", mb: 0 }}>
                    <Stack 
                        direction="row" justifyContent="space-between" alignItems="center"
                        spacing="20px" height="100%"
                    >
                        <Box sx={ leftTextContainer }>
                            <Typography variant="h2" component="h2" sx={titleText}
                            > Advanced Analytics and Insights at Your Fingertips </Typography>
                            
                            <Typography variant="body1" sx={detailsText} >
                                We'll expand your reach and boost your visibility across top streaming 
                                platforms like Spotify, Apple Music, Boomplay and more. 
                                Captivate millions and attract new listeners with yourunique voice. 
                                Make your mark and watch your sound reach audiences everywhere
                            </Typography>

                            <Box sx={{ float: "left"}}>
                                <Link to="/auth/signup" style={{ display: "contents" }}>
                                    <Box
                                        sx={{
                                            ...btnContainer,
                                            bgcolor: colors.dark,
                                        }}
                                    >
                                        <Typography variant="button"
                                            sx={btnText}    
                                        >See more</Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>

                        <Box>
                            <Box
                                sx={{
                                    ...imgContainer,
                                    backgroundImage: `url(${section4Scroll})`,
                                }}
                            >
                                <Box sx={brandOverlayImgContainer}>
                                    <img src={section2ScrollBranding} alt='soundMuve logo' 
                                        style={{
                                            width: "100%",
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                    </Stack>
                </Box>
            </div>
        </Box>        
    )
}
