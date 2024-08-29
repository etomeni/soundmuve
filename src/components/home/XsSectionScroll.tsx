// import React from 'react';
import { Link } from 'react-router-dom';
import { contentWidth } from '@/util/mui'
import Box from '@mui/material/Box'
// import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles';

import colors from '@/constants/colors';
import cssStyle from '@/components/home/homeStyle.module.css';


const contentContainer: SxProps<Theme> = {
    // width: 1138px;
    // background: "#6C6050",
    mx: 'auto',
    height: "380px",
    borderRadius: "15.95px",
    border: "1.28px solid #F2D59E",
    mb: 10,
    // mb: "102px"

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

const titleText: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontWeight: "900",
    fontSize: "20px",
    lineHeight: "20.09px",
    // textAlign: "left"
}

const detailsText: SxProps<Theme> = {
    fontFamily: "Geist",
    fontWeight: "300",
    fontSize: "13px",
    lineHeight: "16.12px",
    textAlign: "justify",
    mt: "25px",
    mb: "50px",
}

const btnContainer: SxProps<Theme> = {
    p: "10px 16px",
    borderRadius: "5.87px",
    bgcolor: colors.dark,
    border: "0.5px solid #232323",
    boxShadow: "0px 4px 4px 0px #00000040",
    width: "fit-content",
    ml: "auto",
}

const btnText: SxProps<Theme> = {
    fontFamily: "Nohemi",
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "13.06px",
    textAlign: "center",
    color: colors.milk
}

export const XsSectionScroll = () => {
    return (
        <Box 
            sx={{
                ...contentWidth,
                // height: "100vh",
                // overflowY: "auto",
                scrollSnapType: "y mandatory",
                mt: "102px",
                mb: "10px",
            }}
        >

            <div className={cssStyle.stickyCard}>
                <Box 
                    sx={{ 
                        ...contentContainer,
                        background: "#6C6050",
                    }}  
                >
                    <Box sx={{ px: "25px", color: colors.milk }} >
                        <Typography variant="h2" component="h2"
                            sx={{ ...titleText }}
                        >Your Sound, Your Stage, Our Support</Typography>
                        
                        <Typography variant="body1" sx={{ ...detailsText }} >
                            We believe in the power of your sound to make a global impact. 
                            SoundMuve empowers artists at every level with a transparent and 
                            inclusive music distribution platform that expands your reach. 
                            From your local scene to a worldwide audience, 
                            we take your sound from anywhere in the world to everywhere it matters.
                        </Typography>

                        <Link to="/auth/signup" style={{ display: "contents" }}>
                            <Box sx={{ ...btnContainer }} >
                                <Typography variant="button" sx={{ ...btnText }} >See more</Typography>
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </div>            

            <div className={cssStyle.stickyCard}>
                <Box 
                    sx={{
                        ...contentContainer,
                        background: "#0C2634",
                    }}  
                >
                    <Box sx={{ px: "25px", color: colors.milk }} >
                        <Typography variant="h2" component="h2"
                            sx={{ ...titleText }}
                        >Get Your Sound Discovered</Typography>
                            
                        <Typography variant="body1"
                            sx={{ ...detailsText }}
                        >
                            We'll expand your reach and boost your visibility across top streaming 
                            platforms like Spotify, Apple Music, Boomplay and more. 
                            Captivate millions and attract new listeners with yourunique voice. 
                            Make your mark and watch your sound reach audiences everywhere
                        </Typography>

                        <Box sx={{ float: "left"}}>
                            <Link to="/auth/signup" style={{ display: "contents" }}>
                                <Box sx={{ ...btnContainer }} >
                                    <Typography variant="button"
                                        sx={{ ...btnText }}    
                                    >See more</Typography>
                                </Box>
                            </Link>
                        </Box>

                    </Box>
                </Box>
            </div>
            
            <div className={cssStyle.stickyCard}>
                <Box 
                    sx={{
                        ...contentContainer,
                        background: "#212121",
                    }}  
                >
                    <Box sx={{ px: "25px", color: colors.milk }} >
                        <Typography variant="h2" component="h2"
                            sx={{ ...titleText }}
                        >Embrace Your Creative Freedom</Typography>
                        
                        <Typography variant="body1" sx={{ ...detailsText }} >
                            You can now enjoy unmatched creative freedom, 
                            and stay true to your sound and independentspirit.
                            Discover limitless opportunities and explore your full 
                            potential with our support, guidingyou through every stage of your journey. 
                            Step into a new era of success and own your sound story
                        </Typography>

                        <Box sx={{ float: "right" }}>
                            <Link to="/auth/signup" style={{ display: "contents" }}>
                                <Box sx={{ ...btnContainer }} >
                                    <Typography variant="button" 
                                        sx={{ ...btnText }}    
                                    >See more</Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </div>

            <div className={cssStyle.stickyCard}>
                <Box 
                    sx={{
                        ...contentContainer,
                        mb: 5,
                        background: "#0C2634",
                    }}  
                >
                    <Box sx={{ px: "25px", color: colors.milk }} >
                        <Typography variant="h2" component="h2"
                            sx={{ ...titleText }}
                        > Advanced Analytics and Insights at Your Fingertips </Typography>
                        
                        <Typography variant="body1" sx={{ ...detailsText }} >
                            We'll expand your reach and boost your visibility across top streaming 
                            platforms like Spotify, Apple Music, Boomplay and more. 
                            Captivate millions and attract new listeners with yourunique voice. 
                            Make your mark and watch your sound reach audiences everywhere
                        </Typography>


                        <Box sx={{ float: "left" }}>
                            <Link to="/auth/signup" style={{ display: "contents" }}>
                                <Box sx={{ ...btnContainer }} >
                                    <Typography variant="button"
                                        sx={{ ...btnText }}    
                                    >See more</Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </div>
        </Box>        
    )
}
