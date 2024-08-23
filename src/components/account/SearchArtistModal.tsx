import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { customTextFieldTheme } from '@/util/mui';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { useSettingStore } from '@/state/settingStore';

import appleMusiclogo from '@/assets/images/apple.png';
import appleMusicLightlogo from '@/assets/images/appleLightTheme.png';
import spotifylogo from '@/assets/images/spotify.png';
import spotifyLghtThemelogo from '@/assets/images/spotifyLghtTheme.png';
import albumSampleArt from "@/assets/images/albumSampleArt.png"
import AppleSportifyCheckmark from '../AppleSportifyCheckmark';


interface _Props {
    openSearchArtistModal: boolean,
    closeSearchArtistModal: () => void;
    onSaveSelection: (data: any) => void;
}

const artistData = [
    {
        id: 1,
        name: "Joseph Solomon",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
    {
        id: 2,
        name: "2Baba",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
    {
        id: 3,
        name: "Waconzy",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
    {
        id: 4,
        name: "Ebenezer Obey",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
    {
        id: 5,
        name: "Wizkid",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
    {
        id: 6,
        name: "Davido",
        latestAlbum: "Find me",
        image: albumSampleArt
    },
]

const SearchArtistModalComponent: React.FC<_Props> = ({
    openSearchArtistModal, closeSearchArtistModal, onSaveSelection
}) => {
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [artistNameInput, setArtistNameInput] = useState('');

    const [searchResult, setSearchResult] = useState<typeof artistData>([]);

    const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<any>();
    const [selectedAppleMusicArtist, setSelectedAppleMusicArtist] = useState<any>();


    const handleSearchInput = (e: any) => {
        const value = e.target.value;
        setArtistNameInput(value);

        if (!value ) return;

        const results = artistData.filter(obj => obj.name.toLowerCase().includes(value.toLowerCase()));
        
        if (results.length) {
            setSearchResult(results);
        } else {
            setSearchResult([]);
        }
    }

    const handleOnSelect = (dsp: "Apple" | "Spotify", value: any) => {
        if (dsp == "Spotify") {
            setSelectedSpotifyArtist(value);

            if (selectedAppleMusicArtist && selectedAppleMusicArtist.name != value.name) {
                setSelectedAppleMusicArtist(undefined);
            }
        }

        if (dsp == "Apple") {
            setSelectedAppleMusicArtist(value);

            if (selectedSpotifyArtist && selectedSpotifyArtist.name != value.name) {
                setSelectedSpotifyArtist(undefined);
            }
        }
    }

    const handleContinue = () => {
        if (!artistNameInput && !selectedAppleMusicArtist && !selectedSpotifyArtist ) {
            return;
        }

        const newData = {
            id: 0,
            name: artistNameInput,
            latestAlbum: '',
            image: ''
        }
        
        onSaveSelection({
            spotify: selectedSpotifyArtist,
            apple: selectedAppleMusicArtist,
            unknown: newData
        });
        closeSearchArtistModal();
    }

    return (
        <Modal
            open={openSearchArtistModal}
            onClose={() => closeSearchArtistModal() }
            aria-labelledby="release-modal-title"
            aria-describedby="release-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none"
                }}
            >
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#FBFBFB",
                        width: {xs: "92%", sm: "85%", md: "846px"},
                        minHeight: "404px",
                        maxHeight: '90%',
                        // overflow: "scroll",
                        borderRadius: "12px",
                        p: "25px",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box id="payout-modal-title">
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "25px",
                                    lineHeight: "12px",
                                    letterSpacing: "-0.13px",
                                    color: darkTheme ? "#fff" : "#000",
                                }}
                            >Main Artist name?</Typography>

                            <Box>
                                <IconButton onClick={() => closeSearchArtistModal() }>
                                    <CloseIcon 
                                        sx={{color: darkTheme ? "#fff" : "#000", fontSize: "16px"}} 
                                    />
                                </IconButton>
                            </Box>
                        </Stack>

                        <Box mt="20px">
                            <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='artistName'
                                    name='artistName'
                                    type='search'
                                    label=''
                                    inputMode='search'
                                    placeholder='Eg. Joseph solomon'
                                    InputLabelProps={{
                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                            maxWidth: {xs: "337px", md: "100%"},
                                        },
                                    }}

                                    value={artistNameInput}
                                    onChange={(e) => handleSearchInput(e)}
                                />
                            </ThemeProvider>
                        </Box>

                        
                        {
                            selectedSpotifyArtist || selectedAppleMusicArtist ? (
                                <Box
                                    sx={{
                                        // height: {xs: "82px", md: "82.92px"}, 
                                        borderRadius: "8.65px",
                                        // border: "0.07px solid #FFFFFF",
                                        bgcolor: "#581D3A",
                                        py: {xs: "6.02px",md: "6.5px"},
                                        px: "7.2px",
                                        mt: "10px"
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
                                                src={ selectedSpotifyArtist ? selectedSpotifyArtist.image : selectedAppleMusicArtist.image } 
                                                alt="album Art"
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
                                                        color: "#fff"
                                                    }}
                                                >{ selectedSpotifyArtist ? selectedSpotifyArtist.name : selectedAppleMusicArtist.name }</Typography>

                                                {/* <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: "12px",
                                                        lineHeight: "12px",
                                                        letterSpacing: "-0.09px",
                                                        color: "#AC3A72"
                                                    }}
                                                >{ selectedSpotifyArtist.name || selectedAppleMusicArtist.name }</Typography> */}
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
                                                { selectedAppleMusicArtist && selectedAppleMusicArtist.name ? <AppleSportifyCheckmark dspName="Apple" /> : <></> }
                                                { selectedSpotifyArtist && selectedSpotifyArtist.name ? <AppleSportifyCheckmark dspName="Spotify" /> : <></> }
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ) : <></>
                        }
                                        

                    </Box>
                    

                    <Box id="release-modal-description" mt="10px" sx={{ overflow: "scroll" }}>

                        {
                            searchResult.length ? (
                                <Box>
                                    <Box>
                                        <Box sx={{ height: "35px" }}>
                                            <img
                                                src={ darkTheme ? spotifylogo : spotifyLghtThemelogo } alt='album image'
                                                style={{
                                                    // width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>

                                        {
                                            searchResult.map((artist, i) => (
                                                <Box key={i} onClick={() => handleOnSelect("Spotify", artist) }
                                                    sx={{
                                                        height: {xs: "82px", md: "82.92px"}, 
                                                        borderRadius: "8.65px",
                                                        // border: "0.07px solid #FFFFFF",

                                                        // bgcolor: "#6449868F",
                                                        bgcolor: selectedSpotifyArtist && selectedSpotifyArtist.id == artist.id ? "#6449868F" : "#2C2B2B",
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
                                                            src={ artist.image } alt="album Art"
                                                            style={{ width: "100%", objectFit: "contain" }}
                                                        />
                                                    </Box>

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: "16.36px",
                                                                lineHeight: "13.09px",
                                                                letterSpacing: "-0.09px",
                                                                color: "#fff",
                                                                mb: "10px"
                                                            }}
                                                        > { artist.name } </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "9.82px",
                                                                lineHeight: "13.09px",
                                                                letterSpacing: "-0.09px"
                                                            }}
                                                        >Latest Album: { artist.latestAlbum } </Typography>
                                                    </Box>
                                                </Box>
                                            ))
                                        }
                                    </Box>

                                    <Box>

                                        <Box sx={{ height: "35px" }}>
                                            <img
                                                src={ darkTheme ? appleMusiclogo : appleMusicLightlogo } alt='album image'
                                                style={{
                                                    // width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>

                                        {
                                            searchResult.map((artist, i) => (
                                                <Box key={i} onClick={() => handleOnSelect("Apple", artist) }
                                                    sx={{
                                                        height: {xs: "82px", md: "82.92px"}, 
                                                        borderRadius: "8.65px",
                                                        // border: "0.07px solid #FFFFFF",

                                                        // bgcolor: "#6449868F",
                                                        bgcolor: selectedAppleMusicArtist && selectedAppleMusicArtist.id == artist.id ? "#6449868F" : "#2C2B2B",
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
                                                            src={ artist.image } alt="album Art"
                                                            style={{ width: "100%", objectFit: "contain" }}
                                                        />
                                                    </Box>

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "700",
                                                                fontSize: "16.36px",
                                                                lineHeight: "13.09px",
                                                                letterSpacing: "-0.09px",
                                                                color: "#fff",
                                                                mb: "10px"
                                                            }}
                                                        > { artist.name } </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "9.82px",
                                                                lineHeight: "13.09px",
                                                                letterSpacing: "-0.09px"
                                                            }}
                                                        >Latest Album: { artist.latestAlbum } </Typography>
                                                    </Box>
                                                </Box>
                                            ))
                                        }

                                    </Box>
                                </Box>
                            ) : <></>
                        }

                    </Box>

                    <Box
                        sx={{
                            p: "15px 25px",
                            borderRadius: "12px",
                            bgcolor: darkTheme ? "#fff" : "#272727",
                            color: darkTheme ? "#000" : "#fff",
                            width: "263px",
                            textAlign: "center",
                            mt: searchResult.length ? "15px" : "60px",
                            mx: "auto",
                            cursor: "pointer"
                        }}
                        onClick={() => handleContinue()}
                    >
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: "15px",
                                lineHeight: "13px",
                                letterSpacing: "-0.13px"
                            }}
                        >Continue</Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default SearchArtistModalComponent;