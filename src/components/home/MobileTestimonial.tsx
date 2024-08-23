import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import testimonyAvatar from "@/assets/branded/images/home/testimonyAvatar.png";
// import testimonyAvatar1 from "@/assets/branded/images/home/testimonyAvatar1.png";
// import testimonyAvatar2 from "@/assets/branded/images/home/testimonyAvatar2.png";
import testimonyAvatar3 from "@/assets/branded/images/home/testimonyAvatar3.png";
import testimonyAvatar4 from "@/assets/branded/images/home/testimonyAvatar4.png";
import testimonyAvatar5 from "@/assets/branded/images/home/testimonyAvatar5.png";
// import testimonyAvatar6 from "@/assets/branded/images/home/testimonyAvatar6.png";



const componentsPropz = {
    tooltip: {
        sx: {
            bgcolor: '#FFF7D1',
            '& .MuiTooltip-arrow': {
                color: '#FFF7D1',
            },
            width: "135px"
        },
    },
}

const testimonyText = (testimony: string) => (
    <Box>
        <Typography variant='body2' component="p"
            sx={{
                fontFamily: "Geist",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "19.84px",
                textAlign: "left",
                color: "#686868"
            }}  
        > { testimony } </Typography>
    </Box>
);

export const MobileTestimonial = () => {
    const theme = useTheme();
    const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    //   const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    //   const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    //   const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    const text = "@franklin:I totally love how they make my music make money for me";


    return (
        <>
            { 
                xsMatches ? 
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: "350px",
                            overflow: "hidden",
                            my: 2,
                            display: { xs: "block", md: "none" }
                        }}
                    >

                        <Box
                            sx={{
                                position: "absolute",
                                left: "2%",
                                top: "2%",
                            }}  
                        >
                            <Tooltip arrow open placement="top-start"
                                componentsProps={componentsPropz}
                                title={ testimonyText(text) }
                            >
                                <img src={testimonyAvatar3} alt="user testimony avatar" />
                            </Tooltip>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                right: "5%",
                                top: "15%",
                            }}  
                        >
                            <Tooltip arrow open placement="top-end"
                                componentsProps={componentsPropz}
                                title={ testimonyText(text) }
                            >
                                <img src={testimonyAvatar5} alt="user testimony avatar" />
                            </Tooltip>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                left: "15%",
                                top: "15%",
                            }}  
                        >
                            <Tooltip arrow open placement="right"
                                componentsProps={componentsPropz}
                                title={ testimonyText(text) }
                            >
                                <img src={testimonyAvatar4} alt="user testimony avatar" />
                            </Tooltip>
                        </Box>

                        {/* <Box
                        sx={{
                            position: "absolute",
                            right: "10%",
                            top: "50%",
                        }}  
                        >
                        <Tooltip arrow
                            componentsProps={{
                            tooltip: {
                                sx: {
                                bgcolor: '#FFF7D1',
                                '& .MuiTooltip-arrow': {
                                    color: '#FFF7D1',
                                },
                                },
                            },
                            }}
                            title={
                            <Box color="#686868">
                                <Typography>
                                @franklin:I totally love how they make my music make money for me
                                </Typography>
                            </Box>
                            }
                        >
                            <img 
                            alt="soundmuve logo as text"
                            src="/images/home/testimonyAvatar6.png"
                            />
                        </Tooltip>
                        </Box>

                        <Box
                        sx={{
                            position: "absolute",
                            left: "10%",
                            top: "50%",
                        }}  
                        >
                        <Tooltip arrow
                            componentsProps={{
                            tooltip: {
                                sx: {
                                bgcolor: '#FFF7D1',
                                '& .MuiTooltip-arrow': {
                                    color: '#FFF7D1',
                                },
                                },
                            },
                            }}
                            title={
                            <Box color="#686868">
                                <Typography>
                                @franklin:I totally love how they make my music make money for me
                                </Typography>
                            </Box>
                            }
                        >
                            <img 
                            alt="soundmuve logo as text"
                            src={testimonyAvatar3}
                            />
                        </Tooltip>
                        </Box> */}

                        <Box
                            sx={{
                                position: "absolute",
                                left: "10%",
                                top: "75%",
                            }}  
                        >
                            <Tooltip arrow open placement="right"
                                componentsProps={componentsPropz}
                                title={ testimonyText(text) }
                            >
                                <img src={testimonyAvatar} alt="user testimony avatar" />
                            </Tooltip>
                        </Box>

                    </Box>
                : <></>
            }
        </>
    )
}
