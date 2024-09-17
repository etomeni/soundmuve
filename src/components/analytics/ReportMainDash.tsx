import colors from '@/constants/colors'
import { currencyDisplay, formatedNumber } from '@/util/resources'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'


interface _Props {
    // children: React.ReactNode,

    dateRange: string,
    setDateRange: (newValue: string) => void,

    totalEarnedBalance: string | number, // $13,715.98
    releases: string | number, // $13,715.98
    sold: string | number, // 84
    songs: string | number, // $54.84
    streams: string | number, // $54.84
    plays: string | number, // 4,000,000

}



const ReportMainDashComponent:React.FC<_Props> = ({
    totalEarnedBalance, releases, sold, songs, streams, plays,
    dateRange, setDateRange
}) => {

    return (
        <Box
            sx={{
                border: `1px solid ${colors.dark}`,
                bgcolor: colors.secondary,
                borderRadius: "13px",
                p: {xs: "15px", md: "25px"},
                mb: {xs: "50px", md: "70px"}
            }}
        >
            <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"}>
                <FormControl fullWidth sx={{ width: "fit-content" }}>
                    <Select
                        labelId="sortByDays"
                        id="sortByDays-select"
                        label=""
                        defaultValue="30"
                        placeholder='Last 30 Days'

                        sx={{
                            color: "#fff",
                            borderRadius: "8px",
                            bgcolor: colors.dark,
                            // textAlign: "center",
                            fontWeight: "900",
                            border: "none",
                            fontSize: {xs: "10px", md: "20px"},
                            lineHeight: {xs: "12px", md: "24px"},
                            letterSpacing: {xs: "-0.67px", md: "-1.34px"},

                            '& .MuiSelect-select': {
                                p: "5px 14px"
                            },

                            '.MuiOutlinedInput-notchedOutline': {
                                border: "none",
                                // borderColor: '#fff',
                                p: 0
                            },
                            // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            //     borderColor: '#fff',
                            // },
                            // '&:hover .MuiOutlinedInput-notchedOutline': {
                            //     borderColor: '#fff',
                            // },
                            '.MuiSvgIcon-root ': {
                                fill: "#797979",
                            }
                        }}

                        onChange={(e) => {
                            // console.log(e.target.value);
                            setDateRange(e.target.value);
                        }}
                    >
                        <MenuItem value="7">
                            Last 7 Days
                        </MenuItem>
                        <MenuItem value="14">
                            Last 14 Days
                        </MenuItem>
                        <MenuItem value="30">
                            Last 30 Days
                        </MenuItem>
                    </Select>
                </FormControl>

                <Typography
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "10px", md: "18px"},
                        lineHeight: {xs: "12px", md: "24px"},
                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                        // color: colors.dark,
                    }}
                >{ dateRange }</Typography>
            </Stack>

            {/* Mobile View Only */}
            <Box 
                sx={{ 
                    display: {xs: "flex", md: "none"}, 
                    my: "30px", 
                    justifyContent: "right", 
                    alignItems: "baseline",
                    gap: "5px"
                }}
            >
                <Typography variant='body1'
                    sx={{
                        fontWeight: "800",
                        fontSize: "18px",
                        lineHeight: "24px",
                        color: "#C8F452",
                    }}
                >{ currencyDisplay(Number(totalEarnedBalance)) }</Typography>

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "8px",
                        lineHeight: "8px",
                        color: "#4C4C4C",
                    }}
                >Balance</Typography>
            </Box>

            <Stack direction={"row"} spacing={"20px"} mt={{xs: 0, md: "60px"}} justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} spacing={{xs: "15px", md: "20px"}} justifyContent={{xs: "space-between", md: "initial"}} >
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Releases</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: colors.milk,
                                color: colors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography 
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ formatedNumber(Number(releases)) } </Typography>
                        </Box>

                        <Typography
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ formatedNumber(Number(sold)) } Sold</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Songs</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: colors.milk,
                                color: colors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ formatedNumber(Number(songs)) }</Typography>
                        </Box>

                        <Typography variant='body1'
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ sold } Sold</Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mb: 1
                            }}
                        >Streams</Typography>

                        <Box 
                            sx={{
                                p: {xs: "10px 15px", md: "10px 27px"},
                                borderRadius: {xs: "5.27px", md: "7px"},
                                bgcolor: colors.milk,
                                color: colors.dark,
                                display: "inline-block"
                            }}
                        >
                            <Typography 
                                sx={{
                                    fontWeight: '900',
                                    fontSize: {xs: "13.54px", md: "18px"},
                                    lineHeight: {xs: "10px", md: "24px"},
                                    letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                    textAlign: 'center',
                                }}
                            >{ formatedNumber(Number(streams)) }</Typography>
                        </Box>

                        <Typography variant='body1'
                            sx={{
                                fontWeight: {xs: "700", md: "400"},
                                fontSize: {xs: "13.54px", md: "18px"},
                                lineHeight: {xs: "18.06px", md: "24px"},
                                color: "#666666",
                                mt: 1
                            }}
                        >{ formatedNumber(Number(plays)) } Plays</Typography>
                    </Box>
                </Stack>

                {/* Desktop view only */}
                <Box sx={{ display: {xs: "none", md: "initial"} }}>
                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: "13.54px", md: "18px"},
                            lineHeight: {xs: "18.06px", md: "24px"},
                            color: "#666666",
                            mb: 1
                        }}
                    >Total Earned</Typography>

                    <Box 
                        sx={{
                            p: {xs: "10px 15px", md: "10px 37px"},
                            borderRadius: "7px",
                            bgcolor: "#33500B",
                            color: "#C8F452",
                            display: "inline-block"
                        }}
                    >
                        <Typography 
                            sx={{
                                fontWeight: '900',
                                fontSize: {xs: "10.18px", md: "18px"},
                                lineHeight: {xs: "8.82px", md: "24px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                textAlign: 'center',
                            }}
                        >{ currencyDisplay(Number(totalEarnedBalance)) }</Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: "13.54px", md: "18px"},
                            lineHeight: {xs: "18.06px", md: "24px"},
                            color: "#666666",
                            mt: 1
                        }}
                    >{ dateRange }</Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default ReportMainDashComponent