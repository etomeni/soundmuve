import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


interface _Props {
    currentPage: string,
    accountType: string,
    darkTheme: boolean,
}


const ArtistAnalyticsNavComponent: React.FC<_Props> = ({
    currentPage, darkTheme, accountType
}) => {
    const navigate = useNavigate();


    return (
        <Box>
            <Stack direction={"row"} spacing={{xs: "15px", md: "30px"}}>
                <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        background: currentPage == "balance-history" ? "#644986" : darkTheme ? "#fff" : "#E0E0E0",
                        color: currentPage == "balance-history" ? "#fff" : darkTheme ? "#000" : "#313131",
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => navigate(`/account/${accountType}/balance-history`) }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Balance History </Typography>
                </Box>

                <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        // background: "#644986",
                        // color: "#fff",
                        background: currentPage == "sales-report" ? "#644986" : darkTheme ? "#fff" : "#E0E0E0",
                        color: currentPage == "sales-report" ? "#fff" : darkTheme ? "#000" : "#313131",
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => navigate(`/account/${accountType}/sales-report`) }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Sales Report </Typography>
                </Box>

                {/* <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        // background: darkTheme ? "#fff" : "#E0E0E0",
                        // color: darkTheme ? "#000" : "#313131",
                        background: currentPage == "analytics-reach" ? "#644986" : darkTheme ? "#fff" : "#E0E0E0",
                        color: currentPage == "analytics-reach" ? "#fff" : darkTheme ? "#000" : "#313131",
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => navigate(`/account/${accountType}/analytics-reach`) }
                >
                    <Typography 
                        sx={{
                            fontWeight: '900',
                            fontSize: {xs: "10.18px", md: "15px"},
                            lineHeight: {xs: "8.82px", md: "13px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            textAlign: 'center',
                        }}
                    > Reach </Typography>
                </Box> */}
            </Stack>
        </Box>
    )
}

export default ArtistAnalyticsNavComponent;