import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { numberOfLinesTypographyStyle, releaseTextFieldStyle } from '@/util/mui';
import AppleSportifyCheckmark from '../AppleSportifyCheckmark';
import albumSampleArt from "@/assets/images/album.png";

import colors from '@/constants/colors';
import { artistInterface } from '@/typeInterfaces/release.interface';
import { useSearchArtists } from '@/hooks/release/useSearchArtists';


interface _Props {
    openSearchArtistModal: boolean,
    dspName: "Spotify" | "Apple",
    searchType?: "Main Artist" | "Creatives - Main Artist" | "Creatives - Featured",
    closeSearchArtistModal: (continueWithoutProfile?: boolean, searchedValue?: string) => void;
    onSaveSelection: (data: artistInterface, dspName: "Spotify" | "Apple") => void;
}

const SearchArtistModalComponent: React.FC<_Props> = ({
    openSearchArtistModal, dspName, searchType = "Main Artist",
    closeSearchArtistModal, onSaveSelection
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    // const [searchResult, setSearchResult] = useState<typeof artistData>([]);
    const [artistNameInput, setArtistNameInput] = useState('');

    const { spotifyArtistResults, searchSpotifyArtist } = useSearchArtists();

    const [selectedArtist, setSelectedArtist] = useState<artistInterface>();

    // const [selectedSpotifyArtist, setSelectedSpotifyArtist] = useState<searchedArtistSearchInterface>();
    // const [selectedAppleMusicArtist, setSelectedAppleMusicArtist] = useState<any>();

    useEffect(() => {
        if (openSearchArtistModal) {
            setSelectedArtist(undefined);
            // setArtistNameInput('');
        }
    }, [openSearchArtistModal]);


    const handleSearchInput = (e: any) => {
        const value = e.target.value;
        setArtistNameInput(value);
        if (!value ) return;

        searchSpotifyArtist(value.toLowerCase());


        // const results = artistData.filter(obj => obj.name.toLowerCase().includes(value.toLowerCase()));
        // if (results.length) {
        //     setSearchResult(results);
        // } else {
        //     setSearchResult([]);
        // }
    }

    const handleOnSelect = (value: any) => {
        setSelectedArtist(value);


        // if (dsp == "Spotify") {
        //     setSelectedSpotifyArtist(value);

        //     if (selectedAppleMusicArtist && selectedAppleMusicArtist.name != value.name) {
        //         setSelectedAppleMusicArtist(undefined);
        //     }
        // }

        // if (dsp == "Apple") {
        //     setSelectedAppleMusicArtist(value);

        //     if (selectedSpotifyArtist && selectedSpotifyArtist.name != value.name) {
        //         setSelectedSpotifyArtist(undefined);
        //     }
        // }
    }

    const handleContinue = () => {
        // if (!artistNameInput && !selectedAppleMusicArtist && !selectedSpotifyArtist ) {
        //     return;
        // }

        if (!selectedArtist) {
            closeSearchArtistModal();
            return;
        }
        
        onSaveSelection(selectedArtist, dspName);
        closeSearchArtistModal();
    }

    const createArtistProfileUrl = dspName == "Spotify" ? "https://artists.spotify.com" : "https://artists.apple.com"

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
                        bgcolor: colors.bg,
                        width: {xs: "92%", sm: "85%", md: "846px"},
                        minHeight: "404px",
                        maxHeight: '95%',
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
                                    color: colors.dark,
                                }}
                            >Artist name?</Typography>

                            <Box>
                                <IconButton onClick={() => closeSearchArtistModal() }>
                                    <CloseIcon 
                                        sx={{color: colors.primary, fontSize: "16px"}} 
                                    />
                                </IconButton>
                            </Box>
                        </Stack>

                        <Box mt="20px">
                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='artistName'
                                name='artistName'
                                type='search'
                                label=''
                                autoFocus={true}
                                inputMode='search'
                                placeholder='Eg. Joseph solomon'
                                sx={releaseTextFieldStyle}

                                value={artistNameInput}
                                onChange={(e) => handleSearchInput(e)}
                            />
                        </Box>
                        
                        {
                            selectedArtist ? (
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
                                                src={ selectedArtist?.profilePicture || albumSampleArt } 
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
                                                >{ selectedArtist.name }</Typography>

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
                                                <AppleSportifyCheckmark dspName="Spotify" />

                                                {/* { selectedAppleMusicArtist && selectedAppleMusicArtist.name ? <AppleSportifyCheckmark dspName="Apple" /> : <></> } */}
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ) : <></>
                        }
                        
                        {/* {
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
                        } */}
                    </Box>
                    

                    <Box id="release-modal-description" mt="10px" sx={{ overflow: "scroll" }}>
                        <Box>
                            <Box>
                                {/* <Box sx={{ height: "35px" }}>
                                    <img
                                        src={ spotifyLghtThemelogo } alt='album image'
                                        style={{
                                            // width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </Box> */}

                                {
                                    spotifyArtistResults.map((artist, i) => (
                                        <Box key={i} onClick={() => handleOnSelect(artist) }
                                            sx={{
                                                height: {xs: "82px", md: "82.92px"}, 
                                                borderRadius: "8.65px",
                                                // border: "0.07px solid #FFFFFF",

                                                // bgcolor: "#6449868F",
                                                bgcolor: selectedArtist && selectedArtist.id == artist.id ? colors.secondary : colors.tertiary,
                                                color: selectedArtist && selectedArtist.id == artist.id ? colors.dark : "#fff",
                                                py: {xs: "6.02px",md: "6.5px"},
                                                px: "7.2px",
                                                // maxWidth: {xs: "337px", md: "100%"},

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
                                                    src={ artist.profilePicture || albumSampleArt } alt="album Art"
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
                                                        mb: "10px"
                                                    }}
                                                > { artist.name || '' } </Typography>

                                                <Typography
                                                    sx={{
                                                        ...numberOfLinesTypographyStyle(1),
                                                        fontWeight: "400",
                                                        fontSize: "9.82px",
                                                        lineHeight: "13.09px",
                                                        letterSpacing: "-0.09px"
                                                    }}
                                                >Latest Album: { artist.latestAlbum ? artist.latestAlbum.name : '' } </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            mt: spotifyArtistResults.length ? "15px" : "60px",
                        }}
                    >
                        <Typography variant='body1'
                            sx={{
                                color: colors.dark,
                                textAlign: "center",
                                mb: 2
                            }}
                        >
                            Don't have 
                            a {dspName == "Spotify" ? dspName : dspName + " Music" } artist
                            account? <span style={{ 
                                display: searchType == "Main Artist" ? "none" : "initial" 
                            }}>
                            <Typography 
                                variant='body1' component="span"
                                onClick={() => closeSearchArtistModal(true, artistNameInput)}
                                sx={{
                                    cursor: "pointer",
                                    color: colors.primary,
                                }}
                            > continue </Typography>
                            or </span>
                            <Link to={createArtistProfileUrl} target='_top'
                                style={{
                                    cursor: "pointer",
                                    color: colors.primary,
                                    textDecoration: "none",
                                    fontWeight: "inherit"
                                }}
                            > create one here.</Link>

                            {/* or <Typography 
                                variant='body1' component="span"
                                onClick={() => {
                                    const url = dspName == "Spotify" ? "https://artists.spotify.com" : "https://artists.apple.com"
                                    handleExternalUrl(url)
                                }}
                                sx={{
                                    cursor: "pointer",
                                    color: colors.primary,
                                }}
                            > create one here.</Typography> */}
                        </Typography>


                        <Box sx={{ mx: "auto", width: '265px' }}>
                            <Button variant="contained" 
                                fullWidth type="button" 
                                onClick={() => handleContinue()}
                                disabled={ !selectedArtist } 
                                sx={{ 
                                    bgcolor: colors.primary,
                                    maxWidth: "263px",
                                    "&.Mui-disabled": {
                                        background: colors.secondary,
                                        // color: "#797979"
                                    },
                                    "&:hover": {
                                        bgcolor: colors.primary,
                                    },
                                    "&:active": {
                                        bgcolor: colors.primary,
                                    },
                                    "&:focus": {
                                        bgcolor: colors.primary,
                                    },
                                    color: colors.milk,
                                    borderRadius: "12px",
                                    // my: 3, 
                                    p: "15px 25px",
                                    textAlign: "center",
                                    textTransform: "none"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: "15px",
                                        lineHeight: "13px",
                                        letterSpacing: "-0.13px"
                                    }}
                                >Continue</Typography>
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Modal>
    )
}

export default SearchArtistModalComponent;