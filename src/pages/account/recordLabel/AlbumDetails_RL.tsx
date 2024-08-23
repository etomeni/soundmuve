import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import AlbumSongItem from '@/components/account/AlbumSongItem';
import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';

import albumSampleArtImg from '@/assets/images/albumSampleArt.png';
import albumSampleArt from "@/assets/images/albumSampleArt.png";
import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';


const albumSongs = [
    {
        artworkImage: albumSampleArt,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        distributedDSP: ["Apple", "Spotify"]
    },
    {
        artworkImage: albumSampleArt,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        distributedDSP: ["Apple", "Spotify"]
    },
    {
        artworkImage: albumSampleArt,
        songTitle: "Good God",
        artistName: "Joseph solomon",
        distributedDSP: ["Apple", "Spotify"]
    }
]

  
function AlbumDetails_RL() {
    const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);


    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 7, md: 10}  }}>

                <Box sx={{ mt: 7 }}>
                    <Box
                        sx={{
                            backgroundColor: darkTheme ? "none" : "#272727",
                            borderRadius: {xs: "13.43px", md: "22px"},
                            display: {xs: "none", sm: "flex"},
                            flexDirection: "column",
                            p: {xs: "15px", md: "25px"},
                            color: "#fff",

                        }}
                    >
                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: "#fff", mb: 2 }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
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
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Stack mt={5} direction="row" spacing="50px">
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "21.78px", md: "60px"},
                                    lineHeight: {xs: "8.71px", md: "24px"},
                                }}
                            > Good God </Typography>

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
                                        src={ albumSampleArtImg } alt='album image'
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
                                        >Good God</Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "700",
                                                fontSize: "17px",
                                                lineHeight: "24px",
                                                color: "#CACACA"
                                            }}
                                        >Joseph solomon</Typography>
                                    </Box>

                                    <Box sx={{ flex: "1 1 30%" }}>
                                        <Stack direction="row" spacing="10px" alignItems="center">
                                            <AppleSportifyCheckmark dspName="Apple" />
                                            <AppleSportifyCheckmark dspName="Spotify" />
                                        </Stack>
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
                                            color: "#CACACA"
                                        }}
                                    >More Grace Music </Typography>
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
                                            color: "#CACACA"
                                        }}
                                    >Dance  </Typography>
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
                                            color: "#CACACA"
                                        }}
                                    >123456789</Typography>
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
                                >$60,000.00</Typography>
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
                                >80,000,000</Typography>
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
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>
                    </Box>


                    <Box sx={{ display: {xs: "initial", sm: "none"} }}>

                        <Stack direction={"row"} spacing={"20px"} justifyContent={"space-between"} alignItems={"center"}>
                            <IconButton 
                                onClick={() => navigate(-1)}
                                sx={{ color: darkTheme ? "#fff" : "#000" }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>

                            <Box>
                                <FormControl fullWidth sx={{ width: "fit-content" }}>
                                    <Select
                                        labelId="sortByDays"
                                        id="sortByDays-select"
                                        label=""
                                        defaultValue="Last 30 Days"
                                        placeholder='Last 30 Days'

                                        sx={{
                                            color: "#fff",
                                            borderRadius: "8px",
                                            bgcolor: darkTheme ? "#272727" : "#414141",
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
                                    >
                                        <MenuItem value="Last 30 Days">
                                            Last 7 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 14 Days
                                        </MenuItem>
                                        <MenuItem value="Last 30 Days">
                                            Last 30 Days
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: "33.76px",
                                lineHeight: "16.21px",
                                mt: 3
                            }}
                        > Good God </Typography>

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
                                src={ albumSampleArtImg } alt='album image'
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
                                >$60,000.00</Typography>
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
                                >80,000,000</Typography>
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
                                >120hrs</Typography>
                                <Typography
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: '10px', md: '17px'},
                                        color: "#797979"
                                    }}
                                >Stream time</Typography>
                            </Box>
                        </Stack>

                        <Box
                            sx={{
                                p: darkTheme ? 0 : '15px',
                                bgcolor: darkTheme ? 'none' : "#272727",
                                borderRadius: "12px",
                                color: "#fff",
                                mt: "10px"
                            }}
                        >

                            <Stack direction="row" spacing="10px">
                                <Box sx={{ flex: "1 1 45%" }}>
                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "15.43px",
                                            lineHeight: "15.43px",
                                        }}
                                    >Good God</Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: "10.93px",
                                            lineHeight: "7.71px",
                                            color: "#CACACA"
                                        }}
                                    >Joseph solomon </Typography>
                                </Box>

                                <Box sx={{ flex: "1 1 45%" }} >
                                    <Stack direction="row" spacing="10px">
                                        <AppleSportifyCheckmark dspName="Apple" />
                                        <AppleSportifyCheckmark dspName="Spotify" />
                                    </Stack>
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
                                        color: "#CACACA"
                                    }}
                                >More Grace Music </Typography>
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
                                        color: "#CACACA"
                                    }}
                                >Dance  </Typography>
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
                                        color: "#CACACA"
                                    }}
                                >123456789</Typography>
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

                        {albumSongs.map((item, index) => (
                            <Box key={index} onClick={() => navigate("/account/record-label/song-details")}>
                                <AlbumSongItem 
                                    artistName={item.artistName}
                                    artworkImage={item.artworkImage}
                                    songTitle={item.songTitle}
                                    distributedDSP={item.distributedDSP} 
                                    displaySeeMore={true}
                                />
                            </Box>
                        ))}
                    </Box>



                </Box>
            </Box>

        </AccountWrapper>
    )
}

export default AlbumDetails_RL;