import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

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
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { createReleaseStore } from '@/state/createReleaseStore';

import { languages } from '@/util/languages';
import { apiEndpoint, hours, minReleaseDate, minutes, primaryGenre, secondaryGenre } from '@/util/resources';
import { customTextFieldTheme } from '@/util/mui';

import AccountWrapper from '@/components/AccountWrapper';
import SearchArtistModalComponent from '@/components/account/SearchArtistModal';
// import AppleSportifyCheckmark from '@/components/AppleSportifyCheckmark';
// import albumSampleArt from "@/assets/images/albumSampleArt.png"
import { restCountries } from '@/util/countries';
import LongSelectList from '@/components/LongSelectList';
import ArtistProfileInfoComponent from '@/components/ArtistProfileInfo';
import ExplicitLyricsReadMoreInfoComponent from '@/components/ExplicitLyricsReadMoreInfo';


const formSchema = yup.object({
    songTitle: yup.string().required().trim().label("Song Title"),
    artistName: yup.string().trim().label("Artist Name"),
    appleMusicUrl: yup.string().trim().label("Apple Music Profile Link"),
    spotifyMusicUrl: yup.string().trim().label("Spotify Music Profile Link"),

    explicitSongLyrics: yup.string().trim(),
    language: yup.string().required().trim().label("Language"),
    primaryGenre: yup.string().required().trim().label("Primary Genre"),
    secondaryGenre: yup.string().required().trim().label("Secondary Genre"),
    releaseDate: yup.string().trim().label("Release Date"),
    
    releaseTimeHours: yup.string().trim().label("Hours"),
    releaseTimeMinutes: yup.string().trim().label("Minutes"),
    releaseTimeHourFormat: yup.string().trim().label("Time Format"),
    
    listenerTimezone: yup.boolean().label("Listener's Timezone"),
    generalTimezone: yup.boolean().label("General Timezone"),

    labelName: yup.string().trim().label("Label Name"),
    recordingLocation: yup.string().trim().label("Recording Location"),
    soldWorldwide: yup.string().trim(),
    UPC_EANcode: yup.string().trim().label("UPC/EAN Code"),
});

const contriesss = restCountries.map(item => item.name.common);
contriesss.unshift("All");

function CreateSingleRelease() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [explicitLyrics, setExplicitLyrics] = useState(""); // No
    const [soldWorldwide, setSoldWorldwide] = useState(""); // Yes
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const singleRelease1 = createReleaseStore((state) => state.singleRelease1);
    const _setSingleRelease1 = createReleaseStore((state) => state._setSingleRelease1);
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
    const [selectSoldCountries, setSelectSoldCountries] = useState<string[]>(contriesss);


    useEffect(() => {
        if (singleRelease1.song_title) {
            setValue("songTitle", singleRelease1.song_title, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("artistName", singleRelease1.artist_name, {shouldDirty: true, shouldTouch: true, shouldValidate: true});

            setValue("appleMusicUrl", singleRelease1.appleMusicUrl, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("spotifyMusicUrl", singleRelease1.spotifyMusicUrl, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            // TODO::: work on displaying the artist name and details
            setSelectArtistName(singleRelease1.selectedArtistName);
    
            setValue("explicitSongLyrics", singleRelease1.explicitLyrics, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setExplicitLyrics(singleRelease1.explicitLyrics);
            
            setValue("language", singleRelease1.language, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectLanguageValue(singleRelease1.language);
    
            setValue("primaryGenre", singleRelease1.primary_genre, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectPrimaryGenreValue(singleRelease1.primary_genre);
    
            setValue("secondaryGenre", singleRelease1.secondary_genre, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectSecondaryGenreValue(singleRelease1.secondary_genre);
    
            // TODO::: release date
            setValue("releaseDate", singleRelease1.releaseDate, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseDateValue(singleRelease1.releaseDate);
    
            setValue("releaseTimeHours", singleRelease1.releaseTimeHours, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeHoursValue(singleRelease1.releaseTimeHours);
    
            setValue("releaseTimeMinutes", singleRelease1.releaseTimeMinutes, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeMinutesValue(singleRelease1.releaseTimeMinutes);
    
            setValue("releaseTimeHourFormat", singleRelease1.releaseTimeFormat, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectReleaseTimeFormatValue(singleRelease1.releaseTimeFormat);
    
            setValue("listenerTimezone", singleRelease1.listenerTimeZone, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectListenerTimezoneValue(singleRelease1.listenerTimeZone);
    
            setValue("generalTimezone", singleRelease1.generalTimeZone, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSelectGeneralTimezoneValue(singleRelease1.generalTimeZone);
            
            
            setValue("labelName", singleRelease1.label_name, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("recordingLocation", singleRelease1.recording_location, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            
            setValue("soldWorldwide", singleRelease1.soldWorldwide, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setSoldWorldwide(singleRelease1.soldWorldwide);
            
            setValue("UPC_EANcode", singleRelease1.upc_ean, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        }

    }, [singleRelease1]);
    

    const { 
        handleSubmit, register, setValue, getValues, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur',
        defaultValues: { 
            soldWorldwide: soldWorldwide,
            explicitSongLyrics: explicitLyrics,
            // releaseTimeHours: "00",
            releaseTimeMinutes: "00",
            releaseTimeHourFormat: "AM",
            // language: "English",
            listenerTimezone: true,
            generalTimezone: true,
        } 
    });

    const handleSetArtistName = (details: any) => {
        // console.log(details);
        setSelectArtistName(details);

        let name = details.spotify ? details.spotify.name : details.apple ? details.apple.name : details.unknown.name;

        setValue(
            "artistName", 
            name,
            {shouldDirty: true, shouldTouch: true, shouldValidate: true} 
        );
    }

    const handleSoldCountriesSelect = (selected: string[]) => {
        setSelectSoldCountries(selected);
        setValue("soldWorldwide", selected.toString(), {shouldDirty: true, shouldTouch: true, shouldValidate: true});
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
                message: "Please Enter the artist name" // "Please add an artist."
            })

            setError("artistName", {message: "Please Enter the artist name."}, {shouldFocus: true})
            return;
        }

        if (!explicitLyrics) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please choose if this song has explicit lyrics."
            })

            setError("explicitSongLyrics", {message: "Please choose if this song has explicit lyrics."})
            return;
        }

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

        if (!soldWorldwide) {
            _setToastNotification({
                display: true,
                status: "error",
                message: "Please select if this release can be sold worldwide?"
            });

            setError("soldWorldwide", {message: "Please select if this release can be sold worldwide?"})
            return;
        }

        const data2db = {
            email: userData.email,
            release_type: "Single",
        
            song_title: formData.songTitle, // missing
            artist_name: formData.artistName,
            appleMusicUrl: formData.appleMusicUrl || '',
            spotifyMusicUrl: formData.spotifyMusicUrl || '',

            selectedArtistName: selectArtistName,
        
            explicitLyrics: explicitLyrics, // missing
        
            language: formData.language,
            primary_genre: formData.primaryGenre,
            secondary_genre: formData.secondaryGenre,
        
            releaseDate: formData.releaseDate, // missing
            release_time: `${ formData.releaseTimeHours } : ${ formData.releaseTimeMinutes } ${ formData.releaseTimeHourFormat }`,

            releaseTimeHours: formData.releaseTimeHours || '12',
            releaseTimeMinutes: formData.releaseTimeMinutes || '00',
            releaseTimeFormat: formData.releaseTimeHourFormat || 'AM',

            listenerTimeZone: formData.listenerTimezone || true,
            generalTimeZone: formData.generalTimezone || true,
        
            label_name: formData.labelName || '',
            recording_location: formData.recordingLocation || '',
            soldWorldwide: formData.soldWorldwide || soldWorldwide,
            upc_ean: formData.UPC_EANcode || '',
        };
        // console.log(data2db);
        _setSingleRelease1({ ...data2db, _id: '' });

        try {
            const response = singleRelease1._id ? (await axios.put(
                `${apiEndpoint}/Release/checkAndUpdateRelease`,
                data2db,  
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data : (await axios.post(
                `${apiEndpoint}/Release/create-release`,
                data2db,  
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            // console.log(response);

            _setSingleRelease1({ ...data2db, _id: response.new_release._id });

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message
            // });

            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            navigate("/account/create-single-release-continue");
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to update details. please try again."
            });
        }

    }


    return (
        <AccountWrapper>
            <Box sx={{px: {xs: 2, md: 5, lg: 12}, pb: 5, position: "relative", zIndex: 10, mt: {xs: 5, md: 10}  }}>
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
                        fontSize: {xs: "24.74px", md: "60px"},
                        lineHeight: {xs: "26.31px", md: "63.8px"},
                        letterSpacing: {xs: "-0.55px", md: "-1.34px"},
                    }}
                >
                    Create a Single
                </Typography>

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
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Single Title
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}
                                    sx={{ alignSelf: "center" }}
                                >
                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='songTitle'
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
                                        error={ errors.songTitle ? true : false }
                                        { ...register('songTitle') }
                                    />
                                    { errors.songTitle && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.songTitle?.message }</Box> }
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: {xs: "900", md: "900"},
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}> Main Artist Name </Typography>
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
                                <Grid item xs={12} md={4}> </Grid>

                                <Grid item xs={12} md={8}>
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
                                            {/* &#32; */}

                                            {/* <span
                                                style={{
                                                    color: "#C8F452",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Read More
                                            </span> */}
                                        </Typography>

                                        <ExplicitLyricsReadMoreInfoComponent />
                                    </Stack>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: explicitLyrics == "Yes" ? "5px" : "15px",
                                            // mb: "21px",
                                            mt: "5px"
                                        }}
                                    >

                                        <Box>
                                            <Box 
                                                sx={{
                                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                    borderRadius: {xs: "8.14px", md: "12px"},
                                                    background: getValues("explicitSongLyrics") == "Yes" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                    color: getValues("explicitSongLyrics") == "Yes" ? "#fff" : darkTheme ? "#000" : "#fff",
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
                                                        color: darkTheme ? "#fff" : "#c4c4c4",
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
                                                    background: getValues("explicitSongLyrics") == "No" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                    color: getValues("explicitSongLyrics") == "No" ? "#fff" : darkTheme ? "#000" : "#fff",
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
                                                        color: darkTheme ? "#fff" : "#c4c4c4",
                                                        position: "relative", 
                                                        left: -15,
                                                        top: -8,
                                                    }} 
                                                /> : <></>
                                            }
                                        </Box>

                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing="20px" sx={{my: "31px"}}>
                                <Grid item xs={12} md={4}>
                                    <Typography sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
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
                                                // defaultValue="Select Language"
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
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
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
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
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
                                        fontSize: {xs: "13.12px", md: "25px"},
                                        lineHeight: {xs: "21px", md: "40px"},
                                        letterSpacing: {xs: "-0.07px", md: "-0.13px"}
                                    }}>
                                        Release Date
                                    </Typography>
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
                                                    // defaultValue={dayjs('2022-04-17')} 
                                                    value={ selectReleaseDateValue ? dayjs(selectReleaseDateValue) : null }
                                                    minDate={dayjs(minReleaseDate())}
                                                    name='releaseDate'
                                                    
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
                                            bgcolor: darkTheme ? "#CACACA40" : "#272727",
                                            color: "#fff",
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
                                        fontSize: {xs: "11px", md: "25px"},
                                        lineHeight: {xs: "17.6px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                    }}>
                                        Release Time (Spotify Only)
                                    </Typography>
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
                                                    placeholder='12'
                                                    value={selectReleaseTimeHoursValue}

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
                                                onChange={(event) => {
                                                    const eValue: any = event.target;

                                                    setValue("listenerTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                    setSelectListenerTimezoneValue(eValue.checked);

                                                    setValue("generalTimezone", !eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    setSelectGeneralTimezoneValue(!eValue.checked);

                                                    // if (eValue.checked == true) {
                                                    //     setValue("listenerTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                    //     setSelectListenerTimezoneValue(eValue.checked);

                                                    //     setValue("generalTimezone", !eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    //     setSelectGeneralTimezoneValue(!eValue.checked);
                                                    // }
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
                                                onChange={(event) => {
                                                    const eValue: any = event.target;
                                                    // console.log(eValue.checked);
                                                    setValue("generalTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    setSelectGeneralTimezoneValue(eValue.checked);
                                                    
                                                    setValue("listenerTimezone", !eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    setSelectListenerTimezoneValue(!eValue.checked);

                                                    // if (eValue.checked == true) {
                                                    //     setValue("generalTimezone", eValue.checked, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    //     setSelectGeneralTimezoneValue(eValue.checked);
                                                        
                                                    //     setValue("listenerTimezone", false, {shouldDirty: true, shouldTouch: true, shouldValidate: true} );
                                                    //     setSelectListenerTimezoneValue(false);
                                                    // }
                                                }}
                                            />
                                        </FormGroup>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{
                                border: "0.1px solid #FFFFFF",
                                position: "absolute",
                                width: "100%",
                                left: 0,
                            }}></Box>
                            <Box sx={{my: 10}}></Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16.69px", md: "35px"},
                                        lineHeight: {xs: "19.07px", md: "40px"},
                                        letterSpacing: {xs: "-0.06px", md: "-0.13px"},
                                    }}
                                > Advanced Distribution Features </Typography>


                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item
                                        xs={12} md={4}
                                        sx={{ alignSelf: "center"}}
                                    >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            Label Name
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item
                                        xs={12} md={8}
                                        sx={{ alignSelf: "center" }}
                                    >
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='labelName'
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
                                            
                                            error={ errors.labelName ? true : false }
                                            { ...register('labelName') }
                                        />
                                        { errors.labelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.labelName?.message }</Box> }
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item
                                        xs={12} md={4}
                                        sx={{ alignSelf: "center"}}
                                    >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            Recording Location
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item
                                        xs={12} md={8}
                                        sx={{ alignSelf: "center" }}
                                    >
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='recordingLocation'
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
                                            
                                            error={ errors.recordingLocation ? true : false }
                                            { ...register('recordingLocation') }
                                        />
                                        { errors.recordingLocation && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordingLocation?.message }</Box> }
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item xs={12} md={4} sx={{display: {xs: "none", md: "initial"}}}></Grid>

                                    <Grid item xs={12} md={8}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                // justifyContent: "center",
                                                alignItems: {xs: "center", sm: "initial"}
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "900",
                                                    fontSize: {xs: "12.4px", md: "26px"},
                                                    lineHeight: {xs: "19.07px", md: "40px"},
                                                    letterSpacing: {xs: "-0.06px", md: "-0.13px"}
                                                }}
                                            >
                                                Can this release be sold worldwide?
                                            </Typography>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: soldWorldwide == "Yes" ? "5px" : "15px",
                                                    mt: "21px",
                                                }}
                                            >
                                                <Box>
                                                    <Box 
                                                        onClick={() => {
                                                            setValue("soldWorldwide", "Yes", {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                            setSoldWorldwide("Yes");
                                                        }}
                                                        sx={{
                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                            borderRadius: {xs: "8.14px", md: "12px"},

                                                            background: getValues("soldWorldwide") == "Yes" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                            color: getValues("soldWorldwide") == "Yes" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                            cursor: "pointer",
                                                            display: "inline-block"
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

                                                    { soldWorldwide == "Yes" ? 
                                                        <CheckCircleIcon 
                                                            sx={{ 
                                                                color: darkTheme ? "#fff" : "#c4c4c4",
                                                                position: "relative", 
                                                                left: -15,
                                                                top: -8,
                                                            }} 
                                                        /> : <></>
                                                    }
                                                </Box>

                                                <Box>
                                                    <Box 
                                                        onClick={() => {
                                                            setValue("soldWorldwide", "No", {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                                            setSoldWorldwide("No");
                                                        }}
                                                        sx={{
                                                            p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                                            borderRadius: {xs: "8.14px", md: "12px"},

                                                            background: soldWorldwide == "No" ? "#644986" : darkTheme ? "#fff" : "#272727",
                                                            color: soldWorldwide == "No" ? "#fff" : darkTheme ? "#000" : "#fff",

                                                            cursor: "pointer",
                                                            display: "inline-block"
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

                                                    { soldWorldwide == "No" ? 
                                                        <CheckCircleIcon 
                                                            sx={{ 
                                                                color: darkTheme ? "#fff" : "#c4c4c4",
                                                                position: "relative", 
                                                                left: -15,
                                                                top: -8,
                                                            }} 
                                                        /> : <></>
                                                    }
                                                </Box>
                                            </Box>


                                            { soldWorldwide == "No" ? 
                                                <FormControl fullWidth sx={{mt: 2}}>

                                                    <Typography id="soldCountriesSelect" sx={{color: "grey"}}>
                                                        Where would you like your music to be sold
                                                    </Typography>

                                                    <LongSelectList 
                                                        options={contriesss}
                                                        darkTheme={darkTheme}
                                                        handleSelected={handleSoldCountriesSelect}
                                                        selectedValue={selectSoldCountries}
                                                        error={ errors.soldWorldwide ? true : false }
                                                    />
                                                </FormControl>
                                                : <></>
                                            }

                                            { errors.soldWorldwide && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.soldWorldwide?.message }</Box> }
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing="20px" sx={{my: "31px"}}>
                                    <Grid item xs={12} md={4} >
                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "19.28px", md: "25px"},
                                            lineHeight: {xs: "15.42px", md: "20px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"}
                                        }}>
                                            UPC/EAN Code
                                        </Typography>

                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.88px", md: "18px"},
                                            lineHeight: {xs: "9.25px", md: "12px"},
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                            mt: "9px"
                                        }}>
                                            Optional
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={8}>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='UPC_EANcode'
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
                                            
                                            error={ errors.UPC_EANcode ? true : false }
                                            { ...register('UPC_EANcode') }
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: "300",
                                                fontSize: {xs: "11.44px", md: "16px"},
                                                lineHeight: {xs: "11.58px", md: "16px"},
                                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                                color: "#fff",
                                                my: 1
                                            }}
                                        >
                                            If you have one, please enter it above. Otherwise, we will generate one for you
                                        </Typography>
                                        { errors.UPC_EANcode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.UPC_EANcode?.message }</Box> }
                                    </Grid>
                                </Grid>
                            </Box>


                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Button variant="contained" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmitting } 
                                    sx={{ 
                                        bgcolor: darkTheme ? "#fff" : "#000",
                                        maxWidth: "312px",
                                        "&.Mui-disabled": {
                                            background: "#9c9c9c",
                                            color: "#797979"
                                        },
                                        "&:hover": {
                                            bgcolor: darkTheme ? "#fff" : "#000",
                                        },
                                        "&:active": {
                                            bgcolor: darkTheme ? "#fff" : "#000",
                                        },
                                        "&:focus": {
                                            bgcolor: darkTheme ? "#fff" : "#000",
                                        },
                                        color: darkTheme ? "#000" : "#fff",
                                        borderRadius: "12px",
                                        my: 3, py: 1.5,
                                        fontSize: {md: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                >
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                </Button>
                            </Box>

                        </form>
                    </ThemeProvider>
                </Box>
            </Box>


            <SearchArtistModalComponent 
                openSearchArtistModal={openSearchArtistModal}
                closeSearchArtistModal={() => setOpenSearchArtistModal(false) }
                onSaveSelection={handleSetArtistName}
            />

        </AccountWrapper>
    )
}

export default CreateSingleRelease;