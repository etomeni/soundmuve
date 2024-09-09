import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AppleSportifyCheckmark from '../AppleSportifyCheckmark';
import colors from '@/constants/colors';


interface _Props {
    // children: React.ReactNode,
    artworkImage: any,
    songTitle: string,
    artistName: string,
    distributedDSP: string[],
    displaySeeMore?: boolean
}


const AlbumSongItem: React.FC<_Props> = ({
    artistName, artworkImage, distributedDSP, songTitle, displaySeeMore = false
}) => {


    return (
        <Box
            sx={{
                // height: {xs: "82px", md: "82.92px"}, 
                borderRadius: "8.65px",
                // border: "0.07px solid #FFFFFF",
                bgcolor: colors.tertiary,
                py: {xs: "6.02px",md: "6.5px"},
                px: "7.2px",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8.65px",
                mb: 2
            }}
        >
            <Stack direction="row" alignItems="center" spacing="8.65px">
                <Box
                    sx={{
                        width: "70.67px",
                        maxHeight: "69.94px",
                        borderRadius: "5.77px",
                        overflow: "hidden"
                    }}
                >
                    <img 
                        src={artworkImage} alt="album Art"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                </Box>

                <Box>
                    <Stack direction="row" alignItems="center" spacing="5px">
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "18.03px",
                                lineHeight: "14.42px",
                                letterSpacing: "-0.09px",
                                color: colors.milk
                            }}
                        >{songTitle}</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "12px",
                                lineHeight: "12px",
                                letterSpacing: "-0.09px",
                                color: colors.milk
                            }}
                        >{artistName}</Typography>
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                            mt:  "7.2px",
                        }}
                    >
                        { distributedDSP.map((dsp, index) => (
                            <AppleSportifyCheckmark key={index} dspName={dsp} />
                        )) }
                    </Box>
                </Box>
            </Stack>

            {
                displaySeeMore && (
                    <Stack direction="row" alignItems="center" spacing="5px"
                        sx={{
                            p: "10px 18px",
                            bgcolor: "#E2CBA2", // "#943363",
                            color: colors.tertiary,
                            borderRadius: "8px",
                            mr: 2,
                            display: {xs: "none", sm: "flex"}
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "20px",
                                lineHeight: "24px",
                            }}
                        >See more details</Typography>

                        <ArrowDropDownIcon  />

                    </Stack>
                )
            }

        </Box>
    )
}

export default AlbumSongItem;