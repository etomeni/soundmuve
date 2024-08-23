import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import SideNav from './SideNav';
import AccountWrapper from '@/components/AccountWrapper';
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
// import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import { customTextFieldTheme } from '@/util/mui';
import { languages } from '@/util/languages';
import { primaryGenre, secondaryGenre, hours, minutes, minReleaseDate, apiEndpoint } from '@/util/resources';
// import albumSampleArt from "@/assets/images/albumSampleArt.png"
import ArtistProfileInfoComponent from '@/components/ArtistProfileInfo';


const formSchema = yup.object({
    albumTitle: yup.string().required().trim().label("Album Title"),
    artistName: yup.string().trim().label("Artist Name"),

    appleMusicUrl: yup.string().trim().label("Apple Music Profile Link"),
    spotifyMusicUrl: yup.string().trim().label("Spotify Music Profile Link"),

    // explicitSongLyrics: yup.string().trim(),
    language: yup.string().required().trim().label("Language"),
    primaryGenre: yup.string().required().trim().label("Primary Genre"),
    secondaryGenre: yup.string().required().trim().label("Secondary Genre"),
    releaseDate: yup.string().trim().label("Release Date"),
    
    releaseTimeHours: yup.string().trim().label("Hours"),
    releaseTimeMinutes: yup.string().trim().label("Minutes"),
    releaseTimeHourFormat: yup.string().trim().label("Time Format"),
    
    listenerTimezone: yup.boolean().label("Listener's Timezone"),
    generalTimezone: yup.boolean().label("General Timezone"),
});


function AlbumDetails() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    // const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const albumReleaseDetails = createReleaseStore((state) => state.albumReleaseDetails);
    const _setAlbumReleaseDetails = createReleaseStore((state) => state._setAlbumReleaseDetails);
    const _setCompleteAlbumData = createReleaseStore((state) => state._setCompleteAlbumData);
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [selectLanguageValue, setSelectLanguageValue] = useState('Select Language');
    const [selectSecondaryGenreValue, setSelectSecondaryGenreValue] = useState('Select Secondary Genre');
    const [selectPrimaryGenreValue, setSelectPrimaryGenreValue] = useState('Select Primary Genre');
    
    const [selectReleaseDateValue, setSelectReleaseDateValue] = useState<any>('');

    const [selectReleaseTimeHoursValue, setSelectReleaseTimeHoursValue] = useState('12');
    const [selectReleaseTimeMinutesValue, setSelectReleaseTimeMinutesValue] = useState('00');
    const [selectReleaseTimeFormatValue, setSelectReleaseTimeFormatValue] = useState('AM');

    const [selectListenerTimezoneValue, setSelectListenerTimezoneValue] = useState(false);
    const [selectGeneralTimezoneValue, setSelectGeneralTimezoneValue] = useState(false);
    
    const [openSearchArtistModal, setOpenSearchArtistModal] = useState(false);
    const [selectArtistName, setSelectArtistName] = useState<any>();


    const { 
        handleSubmit, register, setValue, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur',
        defaultValues: { 
            // explicitSongLyrics: explicitLyrics,
            releaseTimeHours: "12",
            releaseTimeMinutes: "00",
            releaseTimeHourFormat: "AM",
            // language: "English",
            listenerTimezone: true,
            generalTimezone: true,
        } 
    });

    useEffect(() => {

        if (albumReleaseDetails.album_title) {
    
            setValue("albumTitle", albumReleaseDetails.album_title, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("artistName", albumReleaseDetails.artist_name, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

            setValue("appleMusicUrl", albumReleaseDetails.appleMusicUrl, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("spotifyMusicUrl", albumReleaseDetails.spotifyMusicUrl, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

            // TODO::: work on displaying the artist name and details
            setSelectArtistName(albumReleaseDetails.selectedArtistName);
    
            // setValue("explicitSongLyrics", albumReleaseDetails.explicitLyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            // setExplicitLyrics(albumReleaseDetails.explicitLyrics);
            
            setValue("language", albumReleaseDetails.language, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectLanguageValue(albumReleaseDetails.language);
    
            setValue("primaryGenre", albumReleaseDetails.primary_genre, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectPrimaryGenreValue(albumReleaseDetails.primary_genre);
    
            setValue("secondaryGenre", albumReleaseDetails.secondary_genre, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectSecondaryGenreValue(albumReleaseDetails.secondary_genre);
    
            // TODO::: release date
            setValue("releaseDate", albumReleaseDetails.releaseDate, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseDateValue(albumReleaseDetails.releaseDate);
    
            setValue("releaseTimeHours", albumReleaseDetails.releaseTimeHours, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeHoursValue(albumReleaseDetails.releaseTimeHours);
    
            setValue("releaseTimeMinutes", albumReleaseDetails.releaseTimeMinutes, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeMinutesValue(albumReleaseDetails.releaseTimeMinutes);
    
            setValue("releaseTimeHourFormat", albumReleaseDetails.releaseTimeFormat, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeFormatValue(albumReleaseDetails.releaseTimeFormat);
    
            setValue("listenerTimezone", albumReleaseDetails.listenerTimeZone, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectListenerTimezoneValue(albumReleaseDetails.listenerTimeZone);
    
            setValue("generalTimezone", albumReleaseDetails.generalTimeZone, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectGeneralTimezoneValue(albumReleaseDetails.generalTimeZone);
            
        }

    }, []);
    

    const handleSetArtistName = (details: any) => {
        // console.log(details);
        setSelectArtistName(details);

        let name = details.spotify ? details.spotify.name : details.apple ? details.apple.name : details.unknown.name;

        setValue(
            "artistName", 
            name,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
        );
        setOpenSearchArtistModal(false)
    }

            
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        if (!formData.artistName) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please add an artist."
            })

            setError("artistName", {message: "Please add an artist."})
            return;
        }

        // if (!explicitLyrics) {
        //     _setToastNotification({
        //         display: true,
        //         status: "error",
        //         message: "Please choose if this song has explicit lyrics."
        //     })

        //     setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
        //     return;
        // }

        if (formData.language == "Select Language") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a language."
            })

            setError("language", {message: "Please select a language."}, {shouldFocus: true});
            return;
        }

        if (formData.primaryGenre == "Select Primary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select primary genre."
            })

            setError("primaryGenre", {message: "Please select primary genre."}, {shouldFocus: true});
            return;
        }

        if (formData.secondaryGenre == "Select Secondary Genre") {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select secondary genre."
            })

            setError("secondaryGenre", {message: "Please select secondary genre."}, {shouldFocus: true});
            return;
        }

        if (!formData.releaseDate) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select a release date."
            })

            setError("releaseDate", { message: "Please select a release date." }, {shouldFocus: true});

            // document.getElementById("releaseDate")?.focus();
            return;
        }

        const formDetails = {
            email: userData.email,
            release_type: "Album",
        
            album_title: formData.albumTitle,
            artist_name: formData.artistName,

            appleMusicUrl: formData.appleMusicUrl || '',
            spotifyMusicUrl: formData.spotifyMusicUrl || '',

            selectedArtistName: selectArtistName,
        
            // explicitLyrics: explicitLyrics,
        
            language: formData.language,
            primary_genre: formData.primaryGenre,
            secondary_genre: formData.secondaryGenre,
        
            releaseDate: formData.releaseDate,
            release_time: `${ formData.releaseTimeHours || '12' } : ${ formData.releaseTimeMinutes } ${ formData.releaseTimeHourFormat }`,

            releaseTimeHours: formData.releaseTimeHours || '12',
            releaseTimeMinutes: formData.releaseTimeMinutes || '00',
            releaseTimeFormat: formData.releaseTimeHourFormat || 'AM',

            listenerTimeZone: formData.listenerTimezone ? true : false,
            generalTimeZone: formData.generalTimezone ? true : false,
        };
        _setAlbumReleaseDetails({ ...formDetails, _id: ''});

        // console.log(data2db);

        const data2db = {
            email: formDetails.email,
            album_title: formDetails.album_title,
            artist_name: formDetails.artist_name,

            appleMusicUrl: formDetails.appleMusicUrl,
            spotifyMusicUrl: formDetails.spotifyMusicUrl,

            language: formDetails.language,
            primary_genre: formDetails.primary_genre,
            secondary_genre: formDetails.secondary_genre,
            release_date: formDetails.releaseDate,
            release_time: formDetails.release_time,
            listenerTimeZone: formDetails.listenerTimeZone,
            otherTimeZone: formDetails.generalTimeZone,
        }

        try {
            const response = albumReleaseDetails._id ? (await axios.put(
                // `${apiEndpoint}/Album/create-album`,
                `${apiEndpoint}/songs/albums/${ albumReleaseDetails._id }`,
                data2db,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data : (await axios.post(
                // `${apiEndpoint}/Album/create-album`,
                `${apiEndpoint}/songs/albums`,
                data2db,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;

            const result = albumReleaseDetails._id ? response.album : response;
            // console.log(response);
            _setAlbumReleaseDetails({ ...formDetails, _id: result._id });

            _setCompleteAlbumData(result);
            // _setCompleteAlbumData(result.savedAlbum);
            
            navigate("/account/create-album-release-advance-features");

        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

        // navigate("/account/artist/create-album-release-advance-features");
    }


    return (
        <AccountWrapper>
            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: {xs: 'initial', sm: 'flex'}, height: "100%" }}>
                    <SideNav activePageNumber={1} />

                    <Box component="main" sx={{ flexGrow: 1, px: 3,  }}>
                        <Box sx={{ display: {xs: 'none', sm: "initial"} }}>
                            <Toolbar />

                            <Stack direction="row" spacing="20px" alignItems="center">
                                <IconButton 
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        color: darkTheme ? "#fff" : "#000", 
                                        mb: 2,
                                        display: {xs: "none", md: "block"}
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>

                                <Typography 
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "24.74px", md: "30px"},
                                        lineHeight: {xs: "26.31px", md: "50.77px"},
                                        letterSpacing: {xs: "-0.55px", md: "-1.07px"},
                                    }}
                                >
                                    Album details
                                </Typography>
                            </Stack>
                        </Box>


                        <Box sx={{my: 3}}>
                            <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                                <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                    style={{ width: "100%", maxWidth: "916px" }}
                                >
                                    
                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}
                                            sx={{ alignSelf: "center"}}
                                        >
                                            <Typography sx={{
                                                fontWeight: {xs: "700", md: "900"},
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}>
                                                Album Title
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
                                            sx={{ alignSelf: "center" }}
                                        >
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='albumTitle'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue=""
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                        maxWidth: {xs: "337px", md: "100%"}
                                                    },
                                                }}
                                                error={ errors.albumTitle ? true : false }
                                                { ...register('albumTitle') }
                                            />
                                            { errors.albumTitle && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.albumTitle?.message }</Box> }
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: {xs: "900", md: "900"},
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}>
                                                Main Artist Name
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Box>
                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='artistName'
                                                    type='text'
                                                    label=''
                                                    inputMode='text'
                                                    defaultValue=""
                                                    InputLabelProps={{
                                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                                    }}
                                                    InputProps={{
                                                        sx: {
                                                            borderRadius: "16px",
                                                            maxWidth: {xs: "337px", md: "100%"}
                                                        },
                                                    }}
                                                    error={ errors.artistName ? true : false }
                                                    { ...register('artistName') }
                                                />
                                                
                                                { errors.artistName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistName?.message }</Box> }
                                            </Box> 


                                            {/* <Box>
                                                <Box 
                                                    sx={{
                                                        p: {xs: "11.25px 21.75px 11.25px 21.75px", md: "15px 29px 15px 29px"},
                                                        borderRadius: {xs: "9px", md: "12px"},
                                                        background: darkTheme ? "#fff" : "#272727",
                                                        color: "#000000",
                                                        cursor: "pointer",
                                                        display: "inline-block"
                                                    }}
                                                    onClick={() => setOpenSearchArtistModal(true) }
                                                >
                                                    <Typography 
                                                        sx={{
                                                            fontWeight: '900',
                                                            fontSize: {xs: "11.25px", md: "15px"},
                                                            lineHeight: {xs: "9.75px", md: "13px"},
                                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                            textAlign: 'center',
                                                            color: darkTheme ? "#000" : "#fff",
                                                        }}
                                                    > Add&nbsp;Artist </Typography>
                                                </Box>
                                                { errors.artistName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistName?.message }</Box> }

                                                {
                                                    selectArtistName ? (
                                                        <Box
                                                            sx={{
                                                                height: {xs: "82px", md: "82.92px"}, 
                                                                borderRadius: "8.65px",
                                                                // border: "0.07px solid #FFFFFF",

                                                                bgcolor: "#6449868F",
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
                                                                    src={albumSampleArt} alt="album Art"
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
                                                                    > 
                                                                        { getValues("artistName") }
                                                                    </Typography>
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
                                                                    { selectArtistName.apple ? <AppleSportifyCheckmark dspName="Apple" bgColor='#D9D9D9' /> : <></> }
                                                                    { selectArtistName.spotify ? <AppleSportifyCheckmark dspName="Spotify" bgColor='#D9D9D9' /> : <></> }
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    ) : <></>
                                                }
                                            </Box> */}
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Stack direction="row">
                                                <Box>
                                                    <Typography sx={{
                                                        fontWeight: {xs: "700", md: "900"},
                                                        fontSize: {xs: "13.12px", md: "25px"},
                                                        lineHeight: {xs: "21px", md: "40px"},
                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                                    }}> Artist Profile </Typography>

                                                    <Typography sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "13.88px", md: "18px"},
                                                        lineHeight: {xs: "9.25px", md: "12px"},
                                                        letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                                        // mt: "9px"
                                                    }}> Optional </Typography>
                                                </Box>

                                                <ArtistProfileInfoComponent  />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Box>
                                                <Grid container spacing="20px">

                                                    <Grid item xs={12} md={6}>
                                                        <TextField 
                                                            variant="outlined" 
                                                            fullWidth 
                                                            id='spotifyMusicUrl'
                                                            type='url'
                                                            inputMode='url'
                                                            label=''
                                                            placeholder='Add your soptify profile link'
                                                            defaultValue=""
                                                            InputLabelProps={{
                                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                                            }}
                                                            InputProps={{
                                                                sx: {
                                                                    borderRadius: "16px",
                                                                    maxWidth: {xs: "337px", md: "100%"}
                                                                },
                                                            }}
                                                            error={ errors.spotifyMusicUrl ? true : false }
                                                            { ...register('spotifyMusicUrl') }
                                                        />
                                                        
                                                        { errors.spotifyMusicUrl && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.spotifyMusicUrl?.message }</Box> }

                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <TextField 
                                                            variant="outlined" 
                                                            fullWidth 
                                                            id='appleMusicUrl'
                                                            inputMode='url'
                                                            type='url'
                                                            label=''
                                                            placeholder='Add your apple music profile link'
                                                            defaultValue=""
                                                            InputLabelProps={{
                                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                                            }}
                                                            InputProps={{
                                                                sx: {
                                                                    borderRadius: "16px",
                                                                    maxWidth: {xs: "337px", md: "100%"}
                                                                },
                                                            }}
                                                            error={ errors.appleMusicUrl ? true : false }
                                                            { ...register('appleMusicUrl') }
                                                        />
                                                        
                                                        { errors.appleMusicUrl && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.appleMusicUrl?.message }</Box> }

                                                    </Grid>

                                                </Grid>

                                                
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}>
                                                Language
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
                                            sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                        >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <Select
                                                        labelId="language"
                                                        id="language-select"
                                                        label=""
                                                        placeholder='Select Language'
                                                        value={selectLanguageValue}

                                                        sx={{
                                                            color: darkTheme ? "#000" : "#fff",
                                                            borderRadius: "16px",
                                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                                            '.MuiOutlinedInput-notchedOutline': {
                                                                borderColor: darkTheme ? '#fff' : "#000",
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '.MuiSvgIcon-root ': {
                                                                fill: darkTheme ? "#797979" : "#fff",
                                                            }
                                                        }}
                                                        
                                                        error={ errors.language ? true : false }
                                                        // { ...register('language') }
                                                        onChange={(event) => {
                                                            const value: any = event.target.value;
                                                            setSelectLanguageValue(value);

                                                            setValue(
                                                                "language", 
                                                                value, 
                                                                {
                                                                    shouldDirty: true,
                                                                    shouldTouch: true,
                                                                    shouldValidate: true
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <MenuItem value="Select Language" disabled>
                                                            Select Language
                                                        </MenuItem>
                                                        { languages.map((langItem: any, index) => (
                                                            <MenuItem key={index} value={langItem.englishName}>
                                                                {langItem.englishName}
                                                            </MenuItem>
                                                        )) }
                                                    </Select>
                                                </FormControl>

                                                { errors.language && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.language?.message }</Box> }
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}>
                                                Primary Genre
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
                                            sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                        >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <Select
                                                        labelId="primaryGenre"
                                                        id="primaryGenre-select"
                                                        label=""
                                                        placeholder='Select Primary Genre'
                                                        value={selectPrimaryGenreValue}

                                                        sx={{
                                                            color: darkTheme ? "#000" : "#fff",
                                                            borderRadius: "16px",
                                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                                            '.MuiOutlinedInput-notchedOutline': {
                                                                borderColor: darkTheme ? '#fff' : "#000",
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '.MuiSvgIcon-root ': {
                                                                // fill: "#797979 !important",
                                                                fill: darkTheme ? "#797979" : "#fff",
                                                            }
                                                        }}
                                                        
                                                        error={ errors.primaryGenre ? true : false }
                                                        // { ...register('primaryGenre') }
                                                        onChange={(event) => {
                                                            const value: any = event.target.value;
                                                            setSelectPrimaryGenreValue(value);

                                                            setValue(
                                                                "primaryGenre", 
                                                                value, 
                                                                {
                                                                    shouldDirty: true,
                                                                    shouldTouch: true,
                                                                    shouldValidate: true
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <MenuItem value="Select Primary Genre" disabled>
                                                            Select Primary Genre
                                                        </MenuItem>
                                                        { primaryGenre.map((item: any, index) => (
                                                            <MenuItem key={index} value={item}>
                                                                {item}
                                                            </MenuItem>
                                                        )) }
                                                    </Select>
                                                </FormControl>

                                                { errors.primaryGenre && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.primaryGenre?.message }</Box> }
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}>
                                                Secondary Genre
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
                                            sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                        >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <Select
                                                        labelId="secondaryGenre"
                                                        id="secondaryGenre-select"
                                                        label=""
                                                        // defaultValue="Select Secondary Genre"
                                                        placeholder='Select Secondary Genre'
                                                        value={selectSecondaryGenreValue}

                                                        sx={{
                                                            color: darkTheme ? "#000" : "#fff",
                                                            borderRadius: "16px",
                                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                                            '.MuiOutlinedInput-notchedOutline': {
                                                                borderColor: darkTheme ? '#fff' : "#000",
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                            },
                                                            '.MuiSvgIcon-root ': {
                                                                // fill: "#797979 !important",
                                                                fill: darkTheme ? "#797979" : "#fff",
                                                            }
                                                        }}
                                                        
                                                        error={ errors.secondaryGenre ? true : false }
                                                        // { ...register('secondaryGenre') }

                                                        onChange={(event) => {
                                                            const value: any = event.target.value;
                                                            setSelectSecondaryGenreValue(value);

                                                            setValue(
                                                                "secondaryGenre", 
                                                                value, 
                                                                {
                                                                    shouldDirty: true,
                                                                    shouldTouch: true,
                                                                    shouldValidate: true
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <MenuItem value="Select Secondary Genre" disabled>
                                                            Select Secondary Genre
                                                        </MenuItem>
                                                        { secondaryGenre.map((item: any, index) => (
                                                            <MenuItem key={index} value={item}>
                                                                {item}
                                                            </MenuItem>
                                                        )) }
                                                    </Select>
                                                </FormControl>

                                                { errors.secondaryGenre && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.secondaryGenre?.message }</Box> }
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "13.12px", md: "20px"},
                                                lineHeight: {xs: "21px", md: "32px"},
                                                letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                            }}> Release Date</Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}
                                            sx={{maxWidth: {xs: "320px", md: "284px"}}}
                                        >
                                            <Box id='releaseDate'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer 
                                                        components={['DatePicker', 'DatePicker']}
                                                    >
                                                        <DatePicker 
                                                            label="" 
                                                            name='releaseDate'
                                                            // defaultValue={dayjs('2022-04-17')} 
                                                            value={ selectReleaseDateValue ? dayjs(selectReleaseDateValue) : null }
                                                            minDate={dayjs(minReleaseDate())}
                                                            sx={{
                                                                width: "100%",
                                                                // bgcolor: "yellow",
                                                                color: "yellow !important",
                                                                ".MuiSvgIcon-root": {
                                                                    // color: "green",
                                                                    color: darkTheme ? "#797979 !important" : "#fff !important",
                                                                },   

                                                                "& .MuiInputBase-input": {
                                                                    color: darkTheme ? "#000" : "#fff",
                                                                },

                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    InputProps: {
                                                                        sx: {
                                                                            borderRadius: "16px",
                                                                            bgcolor: darkTheme ? "#fff" : "#272727",
                                                                            color: "green !important",

                                                                        }
                                                                    },
                                                                },
                                                                day: {
                                                                    sx: {
                                                                        // "&.MuiPickersDay-root.Mui-selected": {
                                                                        //     backgroundColor: "#644986",
                                                                        // },

                                                                        // "& .MuiPickersYear-yearButton.Mui-selected": {
                                                                        //     backgroundColor: "#644986",
                                                                        // }
                                                                    },
                                                                },
                                                            }}
                                                            format='DD/MM/YYYY'
                                                            onChange={(newValue) => {
                                                                // const value = dayjs(newValue).format('DD/MM/YYYY');
                                                                const value = dayjs(newValue).format('YYYY/MM/DD');
                                                                setValue("releaseDate", value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                setSelectReleaseDateValue(value);
                                                            }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>

                                                { errors.releaseDate && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.releaseDate?.message }</Box> }
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4} sx={{ display: {xs: "none", md: "initial"}}}></Grid>

                                        <Grid item xs={12} md={8} sx={{maxWidth: {xs: "337px", md: "100%"}}}>
                                            <Box
                                                sx={{
                                                    bgcolor: darkTheme ? "#CACACA40" : "#D4D4D4",
                                                    color: darkTheme ? "#fff" : "#000",
                                                    p: "25px 20px",
                                                    borderRadius: "12px"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: {xs: "10.52px", md: "15px"},
                                                        lineHeight: {xs: "12.92px", md: "24px"},
                                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                                    }}
                                                >
                                                    TIP: Set your release date 4 weeks from today to give stores time to review your release
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing="20px" sx={{my: "31px"}}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{
                                                fontWeight: "900",
                                                fontSize: {xs: "11px", md: "20px"},
                                                lineHeight: {xs: "17.6px", md: "32px"},
                                                letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                            }}> Release Time (Spotify Only) </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={8}>
                                            <Box>
                                                    
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        // justifyContent: "space-between",
                                                        alignItems: "center",
                                                        gap: "20px"
                                                    }}
                                                >
                                                    <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                        <Select
                                                            labelId="releaseTimeHours"
                                                            id="releaseTimeHours-select"
                                                            label=""
                                                            value={selectReleaseTimeHoursValue}
                                                            placeholder='12'

                                                            sx={{
                                                                color: darkTheme ? "#fff" : "#000",
                                                                borderRadius: "16px",
                                                                '.MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '.MuiSvgIcon-root ': {
                                                                    display: "none",
                                                                }
                                                            }}
                                                            
                                                            error={ errors.releaseTimeHours ? true : false }
                                                            // { ...register('releaseTimeHours') }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectReleaseTimeHoursValue(value);

                                                                setValue(
                                                                    "releaseTimeHours", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            { hours.map((hourItem: any, index) => (
                                                                <MenuItem key={index} value={hourItem}>
                                                                    {hourItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                        <Select
                                                            labelId="releaseTimeMinutes"
                                                            id="releaseTimeMinutes-select"
                                                            label=""
                                                            placeholder='00'
                                                            value={selectReleaseTimeMinutesValue}

                                                            sx={{
                                                                color: darkTheme ? "#fff" : "#000",
                                                                borderRadius: "16px",
                                                                '.MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '.MuiSvgIcon-root ': {
                                                                    display: "none",
                                                                }
                                                            }}
                                                            
                                                            error={ errors.releaseTimeMinutes ? true : false }
                                                            // { ...register('releaseTimeMinutes') }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectReleaseTimeMinutesValue(value);

                                                                setValue(
                                                                    "releaseTimeMinutes", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            { minutes.map((minItem: any, index) => (
                                                                <MenuItem key={index} value={minItem}>
                                                                    {minItem}
                                                                </MenuItem>
                                                            )) }
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{maxWidth: {sx: "119.43px", md: "145px"},}}>
                                                        <Select
                                                            labelId="releaseTimeHourFormat"
                                                            id="releaseTimeHourFormat-select"
                                                            label=""
                                                            placeholder='AM'
                                                            value={selectReleaseTimeFormatValue}

                                                            sx={{
                                                                color: darkTheme ? "#fff" : "#000",
                                                                borderRadius: "16px",
                                                                // bgcolor: darkTheme ? "#fff" : "#272727",
                                                                '.MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    // borderColor: 'rgba(228, 219, 233, 0.25)',
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                },
                                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: darkTheme ? '#fff' : "#000",
                                                                    // borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                                                },
                                                                '.MuiSvgIcon-root ': {
                                                                    display: "none",
                                                                }
                                                            }}
                                                            
                                                            error={ errors.releaseTimeHourFormat ? true : false }
                                                            // { ...register('releaseTimeHourFormat') }

                                                            onChange={(event) => {
                                                                const value: any = event.target.value;
                                                                setSelectReleaseTimeFormatValue(value);

                                                                setValue(
                                                                    "releaseTimeHourFormat", 
                                                                    value, 
                                                                    {
                                                                        shouldDirty: true,
                                                                        shouldTouch: true,
                                                                        shouldValidate: true
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            <MenuItem value="AM">
                                                                AM
                                                            </MenuItem>

                                                            <MenuItem value="PM">
                                                                PM
                                                            </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        fontWeight: "300",
                                                        fontSize: {xs: "11.37px", md: "18px"},
                                                        lineHeight: {xs: "25.27px", md: "40px"},
                                                        letterSpacing: {xs: "-0.08px", md: "-0.13px"},
                                                        my: {xs: "16px", md: "25px"}
                                                    }}
                                                >
                                                    Set the time you'd like your release to go live on Spotify.
                                                </Typography>

                                                <FormGroup>
                                                    <FormControlLabel 
                                                        control={<Checkbox 
                                                            // defaultChecked 
                                                            checked={selectListenerTimezoneValue}
                                                            sx={{
                                                                color: darkTheme ? "#fff" : "#797979",
                                                                '&.Mui-checked': {
                                                                    color: darkTheme ? "#fff" : "#797979",
                                                                },
                                                                marginTop: -1,
                                                            }}
                                                        />} 
                                                        // label="Label" 
                                                        label={<Box 
                                                            sx={{
                                                                lineHeight: {xs: "25.27px", md: "40px"}, 
                                                                letterSpacing: {xs: "-0.08px", md: "-0.13px"}, 
                                                                fontSize: {xs: "11.37px", md: "18px"},
                                                            }}>
                                                            <Typography sx={{ fontWeight: "700" }}>
                                                                12:00 AM in the listener's timezone
                                                            </Typography>

                                                            <Typography sx={{ fontWeight: "300" }}>
                                                                Example: 12:00 AM in NYC, 12:00 AM in London
                                                            </Typography>
                                                        </Box>}
                                                        sx={{ mb: 2, alignItems: 'flex-start' }}
                                                        // value={selectListenerTimezoneValue}
                                                        onChange={(event) => {
                                                            const eValue: any = event.target;
                                                            // console.log(eValue.checked);

                                                            if (eValue.checked == true) {
                                                                setValue("listenerTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                setSelectListenerTimezoneValue(eValue.checked);

                                                                setValue("generalTimezone", false, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                                setSelectGeneralTimezoneValue(false);
                                                            }
                                                        }}
                                                    />

                                                    <FormControlLabel 
                                                        control={<Checkbox 
                                                            // defaultChecked 
                                                            checked={selectGeneralTimezoneValue}
                                                            sx={{
                                                                color: darkTheme ? "#fff" : "#797979",
                                                                '&.Mui-checked': {
                                                                    color: darkTheme ? "#fff" : "#797979",
                                                                },
                                                                marginTop: -1,
                                                            }}
                                                        />} 
                                                        // label="Label" 
                                                        label={<Box sx={{lineHeight: "40px", letterSpacing: "-0.13px", fontSize: "18px",}}>
                                                            <Typography sx={{ fontWeight: "700" }}>
                                                                12:00 AM EST / NYC and at the same time across all countries/territories regardless of timezone
                                                            </Typography>

                                                            <Typography sx={{ fontWeight: "300" }}>
                                                                Example: 12:00 AM in NYC, 12:00 AM in London
                                                            </Typography>
                                                        </Box>}
                                                        sx={{ alignItems: 'flex-start' }}
                                                        // value={selectGeneralTimezoneValue}
                                                        onChange={(event) => {
                                                            const eValue: any = event.target;
                                                            // console.log(eValue.checked);
                                                            if (eValue.checked) {
                                                                setValue("generalTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                                setSelectGeneralTimezoneValue(eValue.checked);

                                                                setValue("listenerTimezone", false, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                                setSelectListenerTimezoneValue(false);
                                                            }
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Box>
                                        </Grid>
                                    </Grid>


                                    {
                                        apiResponse.display && (
                                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                            </Stack>
                                        )
                                    }

                                    <Stack direction="row" justifyContent="space-between" spacing="20px" alignItems="center">
                                        <Button variant="contained" 
                                            fullWidth
                                            sx={{ 
                                                bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                maxWidth: "312px",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                },
                                                "&:active": {
                                                    bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                },
                                                "&:focus": {
                                                    bgcolor: darkTheme ? "#4C4C4C57" : "#9c9c9c",
                                                },
                                                color: "#fff",
                                                borderRadius: "12px",
                                                my: 3, py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        > Previous step </Button>

                                        <Button variant="contained" 
                                            fullWidth type="submit" 
                                            disabled={ !isValid || isSubmitting } 
                                            sx={{ 
                                                bgcolor: "#644986",
                                                maxWidth: "312px",
                                                "&.Mui-disabled": {
                                                    background: "#9c9c9c",
                                                    color: "#797979"
                                                },
                                                "&:hover": {
                                                    bgcolor: "#644986",
                                                },
                                                "&:active": {
                                                    bgcolor: "#644986",
                                                },
                                                "&:focus": {
                                                    bgcolor: "#644986",
                                                },
                                                color: "#fff",
                                                borderRadius: "12px",
                                                my: 3, py: 1.5,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        >
                                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
                                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                        </Button>
                                    </Stack>

                                </form>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>


                <SearchArtistModalComponent 
                    openSearchArtistModal={openSearchArtistModal}
                    closeSearchArtistModal={() => setOpenSearchArtistModal(false) }
                    onSaveSelection={handleSetArtistName}
                />
            </Box>
        </AccountWrapper>
    )
}

export default AlbumDetails;