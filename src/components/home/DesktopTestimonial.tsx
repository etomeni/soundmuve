import Box from '@mui/material/Box';
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import testimonyAvatar from "@/assets/branded/images/home/testimonyAvatar.png";
// import testimonyAvatar1 from "@/assets/branded/images/home/testimonyAvatar1.png";
// import testimonyAvatar2 from "@/assets/branded/images/home/testimonyAvatar2.png";
import testimonyAvatar3 from "@/assets/branded/images/home/testimonyAvatar3.png";
import testimonyAvatar4 from "@/assets/branded/images/home/testimonyAvatar4.png";
import testimonyAvatar5 from "@/assets/branded/images/home/testimonyAvatar5.png";
import testimonyAvatar6 from "@/assets/branded/images/home/testimonyAvatar6.png";


const componentsPropz = {
    tooltip: {
        sx: {
            bgcolor: '#FFF7D1',
            '& .MuiTooltip-arrow': {
                color: '#FFF7D1',
            },
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

export const DesktopTestimonial = () => {
    // const theme = useTheme();
    // const xsMatches = useMediaQuery(theme.breakpoints.down('md'));
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    // const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    const text = "@franklin:I totally love how they make my music make money for me";


    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "350px",
                my: 2,
                display: { xs: "none", md: "block" }
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    left: "25%",
                    top: "2%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar3} alt="user testimony avatar" />
                </Tooltip>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    right: "20%",
                    top: "2%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar5} alt="user testimony avatar" />
                </Tooltip>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    right: "40%",
                    top: "30%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar4} alt="user testimony avatar" />
                </Tooltip>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    right: "10%",
                    top: "50%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar6} alt="user testimony avatar" />
                </Tooltip>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    left: "10%",
                    top: "50%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar3} alt="user testimony avatar" />
                </Tooltip>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    left: "35%",
                    top: "75%",
                }}  
            >
                <Tooltip arrow componentsProps={componentsPropz}
                    title={ testimonyText(text) }
                >
                    <img src={testimonyAvatar} alt="user testimony avatar" />
                </Tooltip>
            </Box>
        </Box>
    )
}
