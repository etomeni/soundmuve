import { createSearchParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AlbumSongItem from '@/components/account/AlbumSongItem';
import AccountWrapper from '@/components/AccountWrapper';
// import { useSettingStore } from '@/state/settingStore';
import sampleCoverArtWorkImage from '@/assets/images/album.png';

// import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';
import colors from '@/constants/colors';
import { useReleaseStore } from '@/state/releaseStore';
import { useEffect, useState } from 'react';
// import { allMonths } from '@/util/months';
import { getDateRangeBydays } from '@/util/dateTime';
import CopyShareLink from '@/components/release/CopyShareLink';
import { useAnalyticsHook } from '@/hooks/analytics/useAnalyticsHook';
import { currencyDisplay, formatedNumber, getQueryParams } from '@/util/resources';
import DateRangeMonthsYearBasicMenu from '@/components/DateRange_MonthsYear';

  
function AlbumDetails() {
    const navigate = useNavigate();
    const _setSongDetails = useReleaseStore((state) => state._setSongDetails);

    const releaseDetails = useReleaseStore((state) => state.releaseDetails);
    const songDetails = useReleaseStore((state) => state.songDetails);
    const [dateRange, setDateRange] = useState(getDateRangeBydays(365));

    // const songId = getQueryParams("songId") || songDetails._id || '';
    const releaseId = getQueryParams("releaseId") || releaseDetails._id || '';

    const { 
        albumTotalEarningsAnalytics,
        getAlbumAnalytics,
    } = useAnalyticsHook();

    useEffect(() => {
        // console.log(dateRange);
        
        if (!releaseId) {
            navigate("/account");
        } else {
            getAlbumAnalytics(
                dateRange.startDate, dateRange.endDate,
                releaseId,
            );
        }
    }, [dateRange]);
    

    return (
        <AccountWrapper>
            <Box>
                {/* desktop view */}
                <Box
                    sx={{
                        backgroundColor: colors.secondary,
                        borderRadius: {xs: "13.43px", md: "22px"},
                        display: {xs: "none", sm: "flex"},
                        flexDirection: "column",
                        p: {xs: "15px", md: "25px"},
                        color: colors.dark,
                    }}
                >
                    <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: colors.primary, mb: 2 }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <DateRangeMonthsYearBasicMenu 
                            dateRangeValue={dateRange}
                            setDateRangeValue={setDateRange}
                            // setDateRangeValue={(value) => setDateRangeValue(value)}
                        />
                    </Stack>

                    <Stack mt={5} direction="row" spacing="50px">
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "21.78px", md: "60px"},
                                lineHeight: {xs: "8.71px", md: "24px"},
                            }}
                        >{ releaseDetails.title }</Typography>

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "21.78px", md: "50px"},
                                lineHeight: {xs: "8.71px", md: "12px"},
                                color: "#797979"
                            }}
                        > Album </Typography>
                    </Stack>

                    <Stack direction="row" mt={5} spacing="20px" alignItems="center" justifyContent="space-between">
                        <Box width="100%">
                            <Box
                                sx={{
                                    maxHeight: "227px",
                                    maxWidth: "263px",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}
                            >
                                <img
                                    src={ releaseDetails.coverArt || sampleCoverArtWorkImage } alt='album image'
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box width="100%">
                            <Stack direction="row" spacing="10px" alignItems="center">
                                <Box sx={{ flex: "1 1 70%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "24px",
                                            lineHeight: "24px"
                                        }}
                                    >{ songDetails.songTitle }</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "17px",
                                            lineHeight: "24px",
                                        }}
                                    >{ releaseDetails.mainArtist.spotifyProfile.name }</Typography>
                                </Box>

                                <Box sx={{ flex: "1 1 30%" }}>
                                    <Box>
                                        <CopyShareLink linkUrl={releaseDetails.musicLinks?.url || '' } />
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="30px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 70%"
                                    }}
                                >Label Name</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 30%",
                                    }}
                                >{ releaseDetails.labelName }</Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="20px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 70%"
                                    }}
                                >Primary Genre</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 30%",
                                    }}
                                >{ releaseDetails.primaryGenre }</Typography>
                            </Stack>

                            <Stack direction="row" spacing="10px" mt="20px">
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "24px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 70%"
                                    }}
                                >UPC</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "17px",
                                        lineHeight: "24px",
                                        // letterSpacing: "-1px",
                                        flex: "1 1 30%",
                                    }}
                                >{ releaseDetails.upc_ean }</Typography>
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack mt="50px" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: '12px', md: '24px'},
                                    lineHeight: {xs: '8.71px', md: '24px'}
                                }}
                            >{ currencyDisplay(Number(albumTotalEarningsAnalytics?.revenue || 0)) }</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Total Revenue</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: '12px', md: '24px'},
                                    lineHeight: {xs: '8.71px', md: '24px'}
                                }}
                            >{ formatedNumber(Number(albumTotalEarningsAnalytics?.streamPlay || 0)) } </Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Streams</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: '12px', md: '24px'},
                                    lineHeight: {xs: '8.71px', md: '24px'}
                                }}
                            >{formatedNumber(Number(albumTotalEarningsAnalytics?.albumSold || 0))}</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Sold</Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* mobile view */}
                <Box sx={{ display: {xs: "initial", sm: "none"} }}>

                    <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: colors.primary }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <DateRangeMonthsYearBasicMenu 
                            dateRangeValue={dateRange}
                            setDateRangeValue={setDateRange}
                            // setDateRangeValue={(value) => setDateRangeValue(value)}
                        />
                    </Stack>

                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: "33.76px",
                            lineHeight: "16.21px",
                            mt: 3
                        }}
                    >{ releaseDetails.title }</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16.88px",
                            lineHeight: "4.05px",
                            color: "#797979",
                            mt: 2
                        }}
                    > Album </Typography>

                    <Box
                        sx={{
                            maxHeight: "230px",
                            width: "100%",
                            borderRadius: "8px",
                            overflow: "hidden",
                            mt: 3
                        }}
                    >
                        <img
                            src={ releaseDetails.coverArt || sampleCoverArtWorkImage } alt='album image'
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </Box>

                    <Stack mt="20px" direction={"row"} justifyContent={"space-between"} spacing={"20px"} alignItems={"center"}>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{ currencyDisplay(Number(albumTotalEarningsAnalytics?.revenue || 0)) }</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Total Revenue</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{ formatedNumber(Number(albumTotalEarningsAnalytics?.streamPlay || 0)) } </Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Streams</Typography>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "17.8px",
                                    lineHeight: "17.8px"
                                }}
                            >{formatedNumber(Number(albumTotalEarningsAnalytics?.albumSold || 0))}</Typography>
                            
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: '10px', md: '17px'},
                                    color: "#797979"
                                }}
                            >Sold</Typography>
                        </Box>
                    </Stack>

                    <Box
                        sx={{
                            p: '15px',
                            bgcolor: colors.secondary,
                            borderRadius: "12px",
                            color: colors.dark,
                            mt: "10px"
                        }}
                    >

                        <Stack direction="row" spacing="10px">
                            <Box sx={{ flex: "1 1 50%" }}>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15.43px",
                                        lineHeight: "15.43px",
                                    }}
                                >{ releaseDetails.title }</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "10.93px",
                                        lineHeight: "7.71px",
                                    }}
                                >{ releaseDetails.mainArtist.spotifyProfile.name }</Typography>
                            </Box>

                            <Box sx={{ flex: "1 1 40%", maxWidth: "50%" }} >
                                <CopyShareLink linkUrl={releaseDetails.musicLinks?.url || ''} />
                            </Box>
                        </Stack>


                        <Stack direction="row" spacing="10px" mt="20px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >Label Name</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.labelName }</Typography>
                        </Stack>

                        <Stack direction="row" spacing="10px" mt="10px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >Primary Genre</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.primaryGenre }</Typography>
                        </Stack>

                        <Stack direction="row" spacing="10px" mt="10px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "15.43px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px"
                                    flex: "1 1 45%"
                                }}
                            >UPC</Typography>

                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "10.93px",
                                    lineHeight: "15.43px",
                                    // letterSpacing: "-1px",
                                    flex: "1 1 45%",
                                }}
                            >{ releaseDetails.upc_ean }</Typography>
                        </Stack>

                    </Box>

                </Box>


                <Box mt="70px">
                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "24px",
                            lineHeight: "12px",
                            color: "#797979",
                            mb: "50px"
                        }}
                    >Songs on your album</Typography>

                    {releaseDetails.songs.map((item, index) => (
                        <Box key={index} onClick={() => {
                            _setSongDetails(item);
                            // navigate("/account/analytics/song-details");

                            const params = {
                                releaseId: releaseDetails._id || '',
                                songId: item._id || ''
                            };
                            navigate({
                                pathname: "/account/analytics/song-details",
                                search: `?${createSearchParams(params)}`,
                            });
                        }}>
                            <AlbumSongItem 
                                artistName={releaseDetails.mainArtist.spotifyProfile.name}
                                artworkImage={releaseDetails.coverArt}
                                songTitle={item.songTitle}
                                distributedDSP={["Apple", "Spotify"]} 
                                displaySeeMore={true}
                            />
                        </Box>
                    ))}
                </Box>

            </Box>
        </AccountWrapper>
    )
}

export default AlbumDetails;