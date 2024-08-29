// import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import section2Img1 from "@/assets/branded/images/about/section2Img1.png";
import section2Img2 from "@/assets/branded/images/about/section2Img2.png";
import section2Img3 from "@/assets/branded/images/about/section2Img3.png";
import section2Img4 from "@/assets/branded/images/about/section2Img4.png";
import { SxProps, Theme } from '@mui/material/styles';


const imgCardStyle: SxProps<Theme> = {
    width: "216px",
    minWidth: "216px",
    height: "205px",
    minHeight: "205px",
    borderRadius: "24px",
    overflow: "hidden",
    background: "linear-gradient(180deg, #0C2634 42.05%, rgba(12, 38, 52, 0) 100%)",
}


const SectionTwo = () => {
    return (
        <Box
            sx={{
                // ...contentWidth,
                position: "relative",
                mt: 2,
                // left: {xs: "-130px", md: 0},
                overflow: "hidden"
            }}
        >
            <Stack direction="row" justifyContent="space-around" alignItems="center" gap="15px">
                <Box sx={imgCardStyle}>
                    <img src={section2Img1} alt='section 2 image' style={{ objectFit: "contain" }} />
                </Box>

                <Box sx={imgCardStyle}>
                    <img src={section2Img2} alt='section 2 image' style={{ objectFit: "contain" }} />
                </Box>

                <Box sx={imgCardStyle}>
                    <img src={section2Img3} alt='section 2 image' style={{ objectFit: "contain" }} />
                </Box>

                <Box sx={imgCardStyle}>
                    <img src={section2Img4} alt='section 2 image' style={{ objectFit: "contain" }} />
                </Box>
            </Stack>

            <Box
                sx={{
                    background: "linear-gradient(182.08deg, #FFFFE6 17.09%, rgba(255, 255, 230, 0) 116.92%)",
                    height: "261px",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                }}
            ></Box>

        </Box>
    )
}

export default SectionTwo