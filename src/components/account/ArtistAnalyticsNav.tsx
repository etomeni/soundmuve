import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import colors from '@/constants/colors';


interface _Props {
    currentPage: string,
    accountType: string,
    // darkTheme?: boolean,
}


const ArtistAnalyticsNavComponent: React.FC<_Props> = ({
    currentPage,
}) => {
    const navigate = useNavigate();


    return (
        <Box>
            <Stack direction={"row"} spacing={{xs: "15px", md: "30px"}}>
                <Box 
                    sx={{
                        p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                        borderRadius: {xs: "8.14px", md: "12px"},
                        border: `1px solid ${colors.primary}`,
                        background: currentPage == "balance-history" ? colors.primary : colors.bg,
                        color: currentPage == "balance-history" ? colors.milk : colors.primary,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    // onClick={() => navigate(`/account/${accountType}/balance-history`) }
                    onClick={() => navigate(`/account/analytics/balance-history`) }
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
                        border: `1px solid ${colors.primary}`,
                        background: currentPage == "sales-report" ? colors.primary : colors.bg,
                        color: currentPage == "sales-report" ? colors.milk : colors.primary,
                        cursor: "pointer",
                        display: "inline-block"
                    }}
                    onClick={() => navigate(`/account/analytics/sales-report`) }
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
                        // background: colors.bg,
                        // color: darkTheme ? "#000" : "#313131",
                        border: `1px solid ${colors.primary}`,
                        background: currentPage == "analytics-reach" ? colors.primary : colors.bg,
                        color: currentPage == "analytics-reach" ? colors.milk : colors.primary,
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