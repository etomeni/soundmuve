import SideNav from './SideNav';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useCreateReleaseStore } from '@/state/createReleaseStore';

import AccountWrapper from '@/components/AccountWrapper';
import SongPreviewComponent from '@/components/account/SongPreview';

import { releaseSelectStyle, releaseTextFieldStyle, releaseTextFieldStyle2 } from '@/util/mui';
import { languages } from '@/util/languages';
import { minutes, seconds, songArtistsCreativesRoles } from '@/util/resources';
import CopyrightOwnershipModalComponent from '@/components/account/CopyrightOwnershipModal';
import CircularProgressWithLabel from '@/components/CircularProgressWithLabel';
import ExplicitLyricsReadMoreInfoComponent from '@/components/ExplicitLyricsReadMoreInfo';
import colors from '@/constants/colors';
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
// import { artistInterface, songArtists_CreativesInterface } from '@/typeInterfaces/release.interface';
import { useCreateAlbum4 } from '@/hooks/release/createAlbumRelease/useCreateAlbum4';
import CircularProgress from '@mui/material/CircularProgress';


let dspToSearch: "Apple" | "Spotify";

function CreateAlbumReleaseSongUpload() {
    // const albumReleaseDetails = useCreateReleaseStore((state) => state.albumReleaseDetails);
    const albumRelease = useCreateReleaseStore((state) => state.albumRelease);

    const {
        navigate,
        apiResponse, // setApiResponse,
        
        register, getValues, // setError, 
        setValue, resetField, // setFocus, reset, 
        errors, isValid, isSubmitting,

        selectLyricsLanguageValue, setSelectLyricsLanguageValue,
        openCopyrightOwnershipModal, setOpenCopyrightOwnershipModal,
        explicitLyrics, setExplicitLyrics,
        copyrightOwnership, setCopyrightOwnership,
        copyrightOwnershipPermission, setCopyrightOwnershipPermission,
        songWriters, setSongWriters,
        songArtists_Creatives, setSongArtists_Creatives,
        songAudioPreview, setSongAudioPreview,
        selectRoleValue, setSelectRoleValue,
        selectTiktokMinValue, setSelectTiktokMinValue,
        // songEditId, setSongEditId,
        songUploadProgress, // setSongUploadProgress,
        openSearchArtistModal, setOpenSearchArtistModal,

        selectTiktokSecValue, setSelectTiktokSecValue,
        
        // songAudio, 
        setSongAudio,

        handleEdit,
        handleAudioFileUpload,
        handleNextBTN,
        handleSetArtistName,
        handleAddMoreCreatives,

        submitForm
    } = useCreateAlbum4();


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={4} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />
                        </Box>


                        <Box sx={{my: 3}}>
                            <form noValidate onSubmit={ submitForm } 
                                style={{ width: "100%", maxWidth: "916px" }}
                            >

                                { albumRelease.albumSongs && albumRelease.albumSongs.length ? (
                                        <Box
                                            sx={{
                                                maxWidth: {xs: "330px", md: "892px"},
                                                border: {
                                                    xs: `0.45px solid ${ colors.dark }`,
                                                    md: `1px solid ${ colors.dark }`
                                                },
                                                bgcolor: colors.secondary,
                                                borderRadius: {xs: "5.42px", md: "12px"},
                                                overflow: "hidden",
                                                mb: {xs: 2, sm: 3}
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    height: {xs: "32.53px", md: "72px"},
                                                    bgcolor: colors.tertiary,
                                                    color: colors.milk,
                                                    borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                                    px: {xs: "10px", md: "25px"},
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: "20px",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "15px", md: "15px"},
                                                        lineHeight: {xs: "20px", md: "31px"},
                                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                                    }}
                                                >Song</Typography>

                                                <Box></Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: {xs: "10px", md: "25px"},
                                                    // bgcolor: darkTheme ? "#000" : "#797979",

                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyItems: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                {
                                                    albumRelease.albumSongs.map((item, i) => (
                                                        <SongPreviewComponent key={i}
                                                            songTitle={`${item.songTitle} - ${albumRelease.mainArtist.spotifyProfile.name}`}
                                                            subTitle={item.isrcNumber}
                                                            songAudio={item.songAudio}
                                                            editSong={() => { 
                                                                // console.log("hello");
                                                                handleEdit(i);
                                                            }}
                                                        />
                                                    ))
                                                }
                                            
                                            </Box>
                                        </Box>  
                                    ) : <></>
                                }

                                <Box
                                    sx={{
                                        maxWidth: {xs: "330px", md: "892px"},
                                        border: {
                                            xs: `0.45px solid ${ colors.dark }`,
                                            md: `1px solid ${ colors.dark }`
                                        },
                                        borderRadius: {xs: "5.42px", md: "12px"},
                                        overflow: "hidden",
                                        bgcolor: colors.secondary
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: {xs: "32.53px", md: "72px"},
                                            bgcolor: colors.tertiary,
                                            color: colors.milk,
                                            borderBottom: {xs: "0.45px solid #FFFFFF", md: "1px solid #FFFFFF"},
                                            px: {xs: "10px", md: "25px"},
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "20px",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "15px", md: "15px"},
                                                lineHeight: {xs: "20px", md: "31px"},
                                                letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                            }}
                                        >Song</Typography>

                                        <Box></Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            p: {xs: "10px", md: "25px"},
                                            // bgcolor: darkTheme ? "#000" : "#797979",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyItems: "center",
                                            alignItems: "center"
                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                fontWeight: "400",
                                                fontSize: {xs: "12px", md: "16px"},
                                                lineHeight: {xs: "20px", md: "31px"},
                                                letterSpacing: "-0.13px"
                                            }}
                                        >
                                            Before you upload your song, please make sure that files are in an accepted format.
                                            Stereo wav files in 24 bit (sample size) with 192 kHz (sample rate) are recommended, 
                                            but 16 bit (sample size) with 44.1 kHz (sample rate) files are also accepted.
                                        </Typography>


                                        <Stack direction="row" justifyContent="space-between" alignItems="center"
                                            sx={{
                                                p: {xs: "", md: "10px 25px"},
                                                borderRadius: '16px',
                                                width: "459px",
                                                bgcolor: colors.primary,
                                                color: colors.milk,
                                                my: 3,
                                                cursor: "pointer"
                                            }}

                                            onClick={() => {
                                                document.getElementById("songAudioUpload")?.click();
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: "18px",
                                                    lineHeight: "18px",
                                                    letterSpacing: "-1.05px"
                                                }}
                                            >Upload Music</Typography>

                                            <CloudUploadOutlinedIcon sx={{pr: "14px", fontSize: "40px"}} />
                                        </Stack>

                                        {
                                            songAudioPreview && (
                                                <SongPreviewComponent 
                                                    songAudio={songAudioPreview} 
                                                    songTitle="Audio"
                                                    deleteSong={() => {
                                                        setSongAudio(undefined);
                                                        setSongAudioPreview(undefined);
                                                    }} 
                                                />
                                            )
                                        }

                                        <Box sx={{my: "35px", width: "100%"}}>
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "12px", md: "16px"},
                                                    lineHeight: {xs: "20px", md: "31px"},
                                                    letterSpacing: "-0.13px",
                                                    mb: 1
                                                }}
                                            > Song Title </Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='songTitle'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                sx={releaseTextFieldStyle}
                                                error={ errors.songTitle ? true : false }
                                                { ...register('songTitle') }
                                            />
                                            { errors.songTitle && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songTitle?.message }</Box> }
                                            
                                        </Box>
                                                

                                        <Stack spacing={{xs: "20px", md: "35px"}} sx={{width: "100%"}}>
                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px",
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px",
                                                        mb: 1
                                                    }}
                                                >Song Writer</Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >
                                                    At least one songwriter is required for this song. 
                                                    A songwriter is the person or persons who wrote the lyrics and/or music. 
                                                    Each songwriter should be credited. One songwriter per line. 
                                                    LEGAL NAMES are required in order to be paid the applicable royalties for publishing.
                                                </Typography>


                                                <Box 
                                                    sx={{
                                                        mt: {xs: 2, m: 3},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        flexWrap: "wrap"
                                                    }}
                                                >
                                                    {
                                                        songWriters.map((writerName, i) => (
                                                            <Stack key={i} direction="row" alignItems="center" spacing="5px"
                                                                sx={{
                                                                    p: "10px",
                                                                    bgcolor: colors.bg,
                                                                    width: "fit-content",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <CancelIcon 
                                                                    sx={{ 
                                                                        color: colors.tertiary,
                                                                        ":hover": { color: colors.primary },
                                                                        fontSize: {xs: "15px", md: "18px"}
                                                                    }} 
                                                                    onClick={() => {
                                                                        const newWritter = songWriters.filter((_, index) => index != i );
                                                                        setSongWriters(newWritter);
                                                                        document.getElementById("songWriter")?.focus();
                                                                    }}
                                                                />

                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "400",
                                                                        fontSize: {xs: "13px", md: "15px"},
                                                                        color: colors.dark
                                                                    }}
                                                                > { writerName } </Typography>
                                                            </Stack>
                                                        ))
                                                    }

                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songWriter'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g Joseph Solomon'
                                                        sx={releaseTextFieldStyle2}

                                                        error={ errors.songWriter ? true : false }
                                                        { ...register('songWriter') }
                                                        onKeyUp={(e: any) => {
                                                            if ((e.which === 13 || e.keyCode === 13) && e.target.value) {
                                                                const newWritter = [ ...songWriters, e.target.value ];
                                                                setSongWriters(newWritter);
                                                                resetField("songWriter");
                                                                document.getElementById("songWriter")?.focus();
                                                            }
                                                        }}
                                                    />

                                                    { errors.songWriter && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songWriter?.message }</Box> }
                                                </Box>

                                                <Box 
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        const writerName = getValues("songWriter");
                                                        if (writerName) {
                                                            const newWritter = [ ...songWriters, writerName ];
                                                            setSongWriters(newWritter);
                                                            resetField("songWriter");
                                                            document.getElementById("songWriter")?.focus();
                                                        }
                                                    }}
                                                >
                                                    <AddIcon />

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "15px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    > Add more song writers </Typography>
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px",
                                                        mb: 1
                                                    }}
                                                >Song Artists & Creatives</Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >
                                                    List all artists that appear on this song. You may select multiple roles for each artist. 
                                                    You can select from our list of roles, such as Main Artist, Featured, Producer etc. 
                                                </Typography>

                                                <Box 
                                                    sx={{
                                                        mt: {xs: 2, m: 3},
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "10px",
                                                        flexWrap: "wrap"
                                                    }}
                                                >
                                                    {
                                                        songArtists_Creatives.map(( creative, i) => (
                                                            <Stack key={i} direction="row" alignItems="center" spacing="10px"
                                                                sx={{
                                                                    p: "10px",
                                                                    bgcolor: colors.milk,
                                                                    width: "fit-content",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <CancelIcon 
                                                                    sx={{ 
                                                                        color: colors.tertiary,
                                                                        ":hover": { color: colors.primary },
                                                                        fontSize: {xs: "15px", md: "18px"}
                                                                    }} 
                                                                    onClick={() => {
                                                                        const newCreative = songArtists_Creatives.filter((_, index) => index != i );
                                                                        setSongArtists_Creatives(newCreative);
                                                                        document.getElementById("artistCreativeName")?.focus();
                                                                    }}
                                                                />

                                                                <Box>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "700",
                                                                            fontSize: {xs: "13px", md: "15px"},
                                                                            color: colors.tertiary
                                                                        }}
                                                                    > { creative.role } </Typography>

                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "400",
                                                                            fontSize: {xs: "13px", md: "15px"},
                                                                            color: colors.dark
                                                                        }}
                                                                    > { creative.name } </Typography>
                                                                </Box>
                                                            </Stack>
                                                        ))
                                                    }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: 0.5
                                                        }}
                                                    >Role</Typography>

                                                    <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                        <Select
                                                            labelId="songArtistsCreativeRole-label"
                                                            id="songArtistsCreativeRole"
                                                            label=""
                                                            // defaultValue="Choose Roles"
                                                            placeholder='Choose Roles'
                                                            value={selectRoleValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.songArtistsCreativeRole ? true : false }
                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectRoleValue(value);

                                                                setValue(
                                                                    "songArtistsCreativeRole", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );

                                                                if (value == "Main artist" || value == "Featured") {
                                                                    dspToSearch = "Spotify";
                                                                    setOpenSearchArtistModal(true);
                                                                }
                                                            }}
                                                            // { ...register('songArtistsCreativeRole') }
                                                        >
                                                            <MenuItem value="Choose Roles" disabled>
                                                                Choose Roles
                                                            </MenuItem>

                                                            { songArtistsCreativesRoles.map((roleItem: any, index) => (
                                                                <MenuItem key={index} value={roleItem}>
                                                                    {roleItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    { errors.songArtistsCreativeRole && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songArtistsCreativeRole?.message }</Box> }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: 0.5
                                                        }}
                                                    >Artist / Creative Name</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='artistCreativeName'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g Joseph Solomon'
                                                        sx={releaseTextFieldStyle2}

                                                        error={ errors.artistCreativeName ? true : false }
                                                        { ...register('artistCreativeName') }
                                                    />

                                                    { errors.artistCreativeName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistCreativeName?.message }</Box> }
                                                </Box>

                                                <Box 
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => handleAddMoreCreatives()}
                                                >
                                                    <AddIcon />

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >Add more Creatives</Typography>
                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Box>
                                                    <Stack direction="row" alignItems="center" spacing="8px">
                                                        <Typography variant='body2' component="div"
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: {xs: "16.96px", md: "25px"},
                                                                lineHeight: {xs: "27.14px", md: "40px"},
                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                // mt: "21px"
                                                            }}
                                                        >
                                                            Does this song have explicit lyrics? 
                                                        </Typography>

                                                        <ExplicitLyricsReadMoreInfoComponent />
                                                    </Stack>

                                                    {/* <Typography
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        Does this song have explicit lyrics? &#32;
                                                        <span
                                                            style={{
                                                                color: "#C8F452",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Read More
                                                        </span>
                                                    </Typography> */}

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            gap: explicitLyrics == "Yes" ? "5px" : "15px",
                                                            mb: "20px",
                                                        }}
                                                    >

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: getValues("explicitSongLyrics") == "Yes" ? colors.primary : colors.secondary,
                                                                    color: getValues("explicitSongLyrics") == "Yes" ? colors.milk : colors.dark,
                                                                    // border: `1px solid ${ getValues("explicitSongLyrics") == "Yes" ? colors.primary : colors.dark }`,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("explicitSongLyrics", "Yes");
                                                                    setExplicitLyrics("Yes");
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > Yes </Typography>
                                                            </Box>

                                                            { explicitLyrics == "Yes" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: getValues("explicitSongLyrics") == "No" ? colors.primary : colors.secondary,
                                                                    color: getValues("explicitSongLyrics") == "No" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => {
                                                                    setValue("explicitSongLyrics", "No");
                                                                    setExplicitLyrics("No");
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > No </Typography>
                                                            </Box>

                                                            { explicitLyrics == "No" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>
                                                    </Box>
                                                </Box>


                                                <Box>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >Copyright Ownership</Typography>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: "400",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px"
                                                        }}
                                                    >
                                                        Is this a cover version of another song?
                                                    </Typography>

                                                    <Stack direction={'row'} spacing={ copyrightOwnership == "Yes" ? "0px" : "15px"} sx={{my: "15px"}}>
                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: copyrightOwnership == "Yes" ? colors.primary : colors.secondary,
                                                                    color: copyrightOwnership == "Yes" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => { 
                                                                    setCopyrightOwnership("Yes"); 
                                                                    setValue("copyrightOwnership", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                }}
                                                            >
                                                        

                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > Yes </Typography>
                                                            </Box>

                                                            { copyrightOwnership == "Yes" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8,
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>

                                                        <Box>
                                                            <Box 
                                                                sx={{
                                                                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                                    background: copyrightOwnership == "No" ? colors.primary : colors.secondary,
                                                                    color: copyrightOwnership == "No" ? colors.milk : colors.dark,
                                                                    cursor: "pointer",
                                                                    display: "inline-block"
                                                                }}
                                                                onClick={() => { 
                                                                    setCopyrightOwnership("No"); 
                                                                    setValue("copyrightOwnership", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                }}
                                                            >
                                                                <Typography 
                                                                    sx={{
                                                                        fontWeight: '900',
                                                                        fontSize: {xs: "10.18px", md: "15px"},
                                                                        lineHeight: {xs: "8.82px", md: "13px"},
                                                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                        textAlign: 'center',
                                                                    }}
                                                                > No </Typography>
                                                            </Box>

                                                            { copyrightOwnership == "No" ? 
                                                                <CheckCircleIcon 
                                                                    sx={{ 
                                                                        color: "#fff",
                                                                        position: "relative", 
                                                                        left: -15,
                                                                        top: -8
                                                                    }} 
                                                                /> : <></>
                                                            }
                                                        </Box>
                                                    </Stack>

                                                    { errors.copyrightOwnership && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnership?.message }</Box> }
                                                </Box>

                                                {
                                                    copyrightOwnership == "Yes" && (
                                                        <Box>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "400",
                                                                    fontSize: {xs: "13px", md: "16px"},
                                                                    lineHeight: {xs: "25px", md: "32px"},
                                                                    letterSpacing: "-0.13px"
                                                                }}
                                                            >
                                                                In order to distribute a cover song, you may be required to obtain certain rights or permissions. 
                                                                Please confirm:
                                                            </Typography>

                                                            <Stack direction={'row'} spacing={ copyrightOwnershipPermission == "Yes" ? "0px" : "15px"} sx={{mt: "15px"}}>

                                                                <Box>
                                                                    <Box 
                                                                        sx={{
                                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                            borderRadius: {xs: "8.14px", md: "12px"},
                                                                            background: copyrightOwnershipPermission == "Yes" ? colors.primary : colors.secondary,
                                                                            color: copyrightOwnershipPermission == "Yes" ? colors.milk : colors.dark,
                                                                            cursor: "pointer",
                                                                            display: "inline-block"
                                                                        }}
                                                                        onClick={() => { 
                                                                            setCopyrightOwnershipPermission("Yes"); 
                                                                            setValue("copyrightOwnershipPermission", "Yes", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                        }}
                                                                    >
                                                                        <Typography 
                                                                            sx={{
                                                                                fontWeight: '900',
                                                                                fontSize: {xs: "10.18px", md: "15px"},
                                                                                lineHeight: {xs: "8.82px", md: "13px"},
                                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                                textAlign: 'center',
                                                                            }}
                                                                        > Yes </Typography>
                                                                    </Box>

                                                                    { copyrightOwnershipPermission == "Yes" ? 
                                                                        <CheckCircleIcon 
                                                                            sx={{ 
                                                                                color: "#fff",
                                                                                position: "relative", 
                                                                                left: -15,
                                                                                top: -8
                                                                            }} 
                                                                        /> : <></>
                                                                    }
                                                                </Box>

                                                                <Box>
                                                                    <Box 
                                                                        sx={{
                                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                                            borderRadius: {xs: "8.14px", md: "12px"},
                                                                            background: copyrightOwnershipPermission == "No" ? colors.primary : colors.secondary,
                                                                            color: copyrightOwnershipPermission == "No" ? colors.milk : colors.dark,
                                                                            cursor: "pointer",
                                                                            display: "inline-block"
                                                                        }}
                                                                        onClick={() => {
                                                                            setCopyrightOwnershipPermission("No");
                                                                            setValue("copyrightOwnershipPermission", "No", {shouldValidate: true, shouldDirty: true, shouldTouch: true}) 
                                                                        }}
                                                                    >
                                                                        <Typography 
                                                                            sx={{
                                                                                fontWeight: '900',
                                                                                fontSize: {xs: "10.18px", md: "15px"},
                                                                                lineHeight: {xs: "8.82px", md: "13px"},
                                                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                                                textAlign: 'center',
                                                                            }}
                                                                        > No </Typography>
                                                                    </Box>

                                                                    { copyrightOwnershipPermission == "No" ? 
                                                                        <CheckCircleIcon 
                                                                            sx={{ 
                                                                                color: "#fff",
                                                                                position: "relative", 
                                                                                left: -15,
                                                                                top: -8
                                                                            }} 
                                                                        /> : <></>
                                                                    }
                                                                </Box>
                                                            </Stack>

                                                            { errors.copyrightOwnershipPermission && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.copyrightOwnershipPermission?.message }</Box> }
                                                        </Box>
                                                    ) 
                                                }

                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >Additional Information</Typography>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >ISRC Number</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songWriter'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        placeholder='E.g TCAII2406427'
                                                        InputProps={{
                                                            sx: {
                                                                borderRadius: "16px",
                                                                color: '#fff', // Change to your desired text color
                                                                maxWidth: {xs: "337px", md: "100%"},
                                                            },
                                                        }}
                                                        sx={releaseTextFieldStyle2}
                                                        error={ errors.ISRC_Number ? true : false }
                                                        { ...register('ISRC_Number') }
                                                    />
                                                </Box>

                                                <Box sx={{my: "30px"}}>
                                                    <Typography component={"h3"} variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >Language of Lyrics</Typography>

                                                    <FormControl fullWidth sx={{ maxWidth: "391px" }}>
                                                        <Select
                                                            labelId="lyricsLanguage"
                                                            id="lyricsLanguage-select"
                                                            label=""
                                                            // defaultValue="English"
                                                            placeholder='English'
                                                            value={selectLyricsLanguageValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.lyricsLanguage ? true : false }
                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectLyricsLanguageValue(value);

                                                                setValue(
                                                                    "lyricsLanguage", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}
                                                            // { ...register('lyricsLanguage') }
                                                        >
                                                            <MenuItem value="English" disabled selected>
                                                                English
                                                            </MenuItem>

                                                            { languages.map((langItem: any, index) => (
                                                                <MenuItem key={index} value={langItem.englishName}>
                                                                    {langItem.englishName}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    { errors.lyricsLanguage && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lyricsLanguage?.message }</Box> }
                                                </Box>

                                                <Box sx={{my: "20px"}}>
                                                    <Typography variant='h3'
                                                        sx={{
                                                            fontWeight: "900",
                                                            fontSize: {xs: "13px", md: "16px"},
                                                            lineHeight: {xs: "25px", md: "32px"},
                                                            letterSpacing: "-0.13px",
                                                            mb: '10px'
                                                        }}
                                                    >Lyrics(Optional)</Typography>

                                                    <TextField 
                                                        variant="outlined" 
                                                        fullWidth 
                                                        id='songLyrics'
                                                        type='text'
                                                        label=''
                                                        inputMode='text'
                                                        defaultValue=""
                                                        multiline
                                                        rows={6}
                                                        InputProps={{
                                                            sx: {
                                                                borderRadius: "16px",
                                                                color: '#fff', // Change to your desired text color
                                                                maxWidth: {xs: "337px", md: "100%"},
                                                            },
                                                        }}
                                                        sx={releaseTextFieldStyle2}
                                                        error={ errors.songLyrics ? true : false }
                                                        { ...register('songLyrics') }
                                                    />

                                                </Box>
                                            </Box>

                                            <Box
                                                sx={{
                                                    bgcolor: colors.tertiary,
                                                    color: "#fff",
                                                    p: {xs: "10px", md: "25px"},
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography component={"h3"} variant='h3'
                                                    sx={{
                                                        fontWeight: "900",
                                                        fontSize: {xs: "13px", md: "16px"},
                                                        lineHeight: {xs: "25px", md: "32px"},
                                                        letterSpacing: "-0.13px"
                                                    }}
                                                >TikTok Clip Start Time (Optional)</Typography>

                                                <Stack direction={"row"} spacing={"20px"} sx={{my: {xs: "10px", md: "20px"} }}>
                                                    <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"},}}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "12px",
                                                                lineHeight: "32px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: "center"
                                                            }}
                                                        > Minutes </Typography>

                                                        <Select
                                                            labelId="tikTokClipStartTime_Minutes"
                                                            id="tikTokClipStartTime_Minutes-select"
                                                            label=""
                                                            // defaultValue="00"
                                                            placeholder='00'
                                                            value={selectTiktokMinValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.tikTokClipStartTime_Minutes ? true : false }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectTiktokMinValue(value);

                                                                setValue(
                                                                    "tikTokClipStartTime_Minutes", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}

                                                            // { ...register('tikTokClipStartTime_Minutes') }
                                                        >
                                                            { minutes.map((minItem: any, index) => (
                                                                <MenuItem key={index} value={minItem}>
                                                                    {minItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{maxWidth: {xs: "fit-content", md: "110px"} }}>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: "400",
                                                                fontSize: "12px",
                                                                lineHeight: "32px",
                                                                letterSpacing: "-0.13px",
                                                                textAlign: "center"
                                                            }}
                                                        > Seconds </Typography>
                                                        
                                                        <Select
                                                            labelId="tikTokClipStartTime_Seconds"
                                                            id="tikTokClipStartTime_Seconds-select"
                                                            label=""
                                                            // defaultValue="00"
                                                            placeholder='00'
                                                            value={selectTiktokSecValue}

                                                            sx={releaseSelectStyle}
                                                            
                                                            error={ errors.tikTokClipStartTime_Seconds ? true : false }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectTiktokSecValue(value);

                                                                setValue(
                                                                    "tikTokClipStartTime_Seconds", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}

                                                            // { ...register('tikTokClipStartTime_Seconds') }
                                                        >
                                                            { seconds.map((secondsItem: any, index) => (
                                                                <MenuItem key={index} value={secondsItem}>
                                                                    {secondsItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Box>

                                        </Stack>


                                        <Button variant="text" 
                                            type="submit" 
                                            disabled={ !isValid || isSubmitting } 
                                            sx={{ my: 3, p: 0 }}
                                        >
                                            <Stack direction="row" justifyContent="space-between" alignItems="center"
                                                sx={{
                                                    p: {xs: "", md: "10px 25px"},
                                                    borderRadius: '16px',
                                                    width: "200px",
                                                    bgcolor: colors.primary,
                                                    color: colors.milk,
                                                }}
                                            >
                                                {
                                                    isSubmitting ? (
                                                        <Box mx="auto">
                                                            {
                                                                songUploadProgress <= 2 ? (
                                                                    <CircularProgress size={30} sx={{ color: colors.milk }} />
                                                                ) : (
                                                                    <CircularProgressWithLabel 
                                                                        value={songUploadProgress} size={30} 
                                                                        sx={{ color: colors.milk, fontWeight: "bold", mx: 'auto' }} 
                                                                    />
                                                                )
                                                            }
                                                        </Box>
                                                    ) : (
                                                        <>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: "900",
                                                                    fontSize: "18px",
                                                                    lineHeight: "18px",
                                                                    letterSpacing: "-1.05px"
                                                                }}
                                                            >Add Song</Typography>
                                                            <AddIcon sx={{pr: "14px", fontSize: "40px"}} />
                                                        </>
                                                    )
                                                }
                                            </Stack>

                                        </Button>
                                    </Box>
                                </Box>

                                {
                                    apiResponse.display && (
                                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                        </Stack>
                                    )
                                }

                                <Box mt="100px">
                                    <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                        <Button variant="contained" 
                                            fullWidth type='button'
                                            onClick={() => navigate("/account/create-album-release-select-stores")}
                                            sx={{ 
                                                bgcolor: "#9c9c9c",
                                                maxWidth: "312px",
                                                color: "#fff",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:active": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                "&:focus": {
                                                    bgcolor: "#4C4C4C57",
                                                },
                                                borderRadius: "12px",
                                                my: 3, py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        > Previous step </Button>

                                        <Button variant="contained" 
                                            fullWidth // type="submit" 
                                            // disabled={ (!albumReleaseSongUpload.length && !isValid) || isSubmitting } 
                                            disabled={ !albumRelease.albumSongs?.length } 
                                            sx={{ 
                                                bgcolor: colors.primary,
                                                color: colors.milk,
                                                maxWidth: "312px",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
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
                                                borderRadius: "12px",
                                                // my: 3, 
                                                py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                            onClick={() => handleNextBTN() }
                                        > Next </Button>
                                    </Stack>
                                </Box>

                            </form>
                        </Box>
                    </Box>
                </Box>

            </Box>

                   
            <input 
                type="file" 
                id='songAudioUpload' 
                name="songAudioUpload" 
                accept='audio/*' 
                onChange={handleAudioFileUpload}
                style={{display: "none"}}
            />

            <CopyrightOwnershipModalComponent
                openModal={openCopyrightOwnershipModal}
                closeModal={() => setOpenCopyrightOwnershipModal(false)}
            />

            <SearchArtistModalComponent 
                openSearchArtistModal={openSearchArtistModal}
                closeSearchArtistModal={() => {
                    setOpenSearchArtistModal(false);
                    resetField("songArtistsCreativeRole");
                    setSelectRoleValue('Choose Roles');
                }}
                onSaveSelection={handleSetArtistName}
                dspName={ dspToSearch }
            />
        </AccountWrapper>
    )
}

export default CreateAlbumReleaseSongUpload;