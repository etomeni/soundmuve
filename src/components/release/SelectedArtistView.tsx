import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { Stack } from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AppleSportifyCheckmark from '../AppleSportifyCheckmark';
import colors from '@/constants/colors';
import { searchedArtistSearchInterface } from '@/constants/typesInterface';


interface _Props {
    // children: React.ReactNode,
    selectedArtist: searchedArtistSearchInterface,
    dspName: "Spotify" | "Apple"
}


const SelectedArtistView: React.FC<_Props> = ({
    selectedArtist, dspName
}) => {

    return (
        <Box
            sx={{
                height: {xs: "82px", md: "82.92px"}, 
                borderRadius: "8.65px",

                bgcolor: colors.secondary,
                py: {xs: "6.02px",md: "6.5px"},
                px: "7.2px",
                maxWidth: {xs: "337px", md: "100%"},

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8.65px",
                my: 2
            }}
        >
            <Box
                sx={{
                    width: "70.67px",
                    height: "69.94px",
                    borderRadius: "5.77px",
                    overflow: "hidden"
                }}
            >
                <img 
                    src={selectedArtist.profilePicture || ''} alt="album Art"
                    style={{ width: "100%", objectFit: "contain" }}
                />
            </Box>

            <Box>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        alignItems: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "25px",
                            lineHeight: "20px",
                            letterSpacing: "-0.13px",
                            color: "#fff"
                        }}
                    >{ selectedArtist.name || '' }</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        mt:  "7.2px",
                    }}
                >
                    {/* '#D9D9D9' */}
                    { dspName == "Apple" ? <AppleSportifyCheckmark dspName="Apple" bgColor={colors.primary} /> : <></> }
                    { dspName == "Spotify" ? <AppleSportifyCheckmark dspName="Spotify" bgColor={colors.primary} /> : <></> }
                </Box>
            </Box>
        </Box>
    )
}

export default SelectedArtistView;