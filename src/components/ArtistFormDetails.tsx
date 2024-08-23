import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getCountries, getUserLocation } from '@/util/location';
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { restCountries } from '@/util/countries';
import { useSettingStore } from '@/state/settingStore';
import { MuiTextFieldStyle } from '@/util/mui';
import cloudUploadIconImg from "@/assets/images/cloudUploadIcon.png";
import CircularProgressWithLabel from './CircularProgressWithLabel';


const formSchema = yup.object({
    artistName: yup.string().required().min(2).trim().label("First Name"),

    email: yup.string().email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    phoneNumber: yup.string()
    // .min(7, "Incorrect phone number").max(15, "Incorrect phone number")
    .trim().label("Phone Number"),
    country: yup.string().required().trim().label("Country"),
    gender: yup.string().required().trim().label("Gender"),
});

  
function ArtistFormDetailsComponent() {
    // const navigate = useNavigate();
    const [countries, setCountries] = useState(restCountries);
    const [userCountry, setUserCountry] = useState("");
    const userData = useUserStore((state) => state.userData);
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const [image, setImage] = useState<any>();
    const [imagePreview, setImagePreview] = useState<any>();

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    // const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    const [songUploadProgress, setSongUploadProgress] = useState(0);
    
    
    const { 
        handleSubmit, register, setValue, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    useEffect(() => {
        const sortedCountries = countries.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        setCountries(sortedCountries);

        getCountries().then((countryRes) => {
            setCountries(countryRes);
    
            getUserLocation().then((res) => {
                setValue("country", res.country);

                setTimeout(() => {
                    
                    setUserCountry(res.country);
                }, 500);
            })
        });
    }, []);


    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setImage(file);

        const base64: any = await convertToBase64(file);
        setImagePreview(base64);
    
        e.target.value = "";
    }

    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (!file) {
                // setToastNotification({
                //     display: true,
                //     message: "Please select an image!",
                //     status: "info"
                // })
            } else {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }
    
        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
        
        const data2db = {
            email: formData.email,
            recordLabelemail: userData.email,
            artistName: formData.artistName,
            country: formData.country,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
        };


        if (!image) {
            setApiResponse({
                display: true,
                status: false,
                message: "Artist profile picture is required."
            });

            return;
        }


        const data_2db = new FormData();
        data_2db.append('email', data2db.email || '');
        data_2db.append('recordLabelemail', data2db.recordLabelemail);
        data_2db.append('artistName', data2db.artistName);
        data_2db.append('country', data2db.country);
        data_2db.append('phoneNumber', data2db.phoneNumber || '');
        data_2db.append('gender', data2db.gender);
        data_2db.append('artistAvatar', image);

        try {
            const response = (await axios.post(`${apiEndpoint}/recordLabel/artists`, data_2db,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const loaded = progressEvent.loaded;
                        const total = progressEvent.total || 0;
                        const percentage = Math.floor((loaded * 100) / total );

                        if (percentage < 100) {
                            setSongUploadProgress(percentage);
                        }
                    },
                }
             )).data;
            // console.log(response);
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            // _setToastNotification({
            //     display: true,
            //     status: "success",
            //     message: response.message
            // });

            reset();

        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to add new artists. please try again."
            });
        }
    }


    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                style={{
                    width: "100%",
                    maxWidth: "734px",
                }}
            >
                <Typography sx={{
                    fontWeight: "900",
                    fontSize: {xs: 45, md: 60},
                    lineHeight: {xs: "53px", md: "73.79px"},
                    letterSpacing: "-1.34px",
                    textAlign: 'center'
                }}>Add Artist</Typography>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}>
                        Artist Name
                    </Typography>

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
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.artistName ? true : false }
                        { ...register('artistName') }
                    />
                    { errors.artistName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.artistName?.message }</Box> }
                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}> Email </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='email'
                        type='email'
                        inputMode='email'
                        label=''
                        defaultValue=""
                        InputLabelProps={{
                            style: { color: '#c1c1c1', fontWeight: "400" },
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "16px",
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.email ? true : false }
                        { ...register('email') }
                    />
                    { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }
                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px"
                    }}>
                        Phone number
                    </Typography>

                    <TextField 
                        variant="outlined" 
                        fullWidth 
                        id='phoneNumber'
                        type='tel'
                        inputMode='tel'
                        label=''
                        defaultValue=""
                        InputLabelProps={{
                            style: { color: '#c1c1c1', fontWeight: "400" },
                        }}
                        InputProps={{
                            sx: {
                                borderRadius: "16px",
                            },
                        }}
                        sx={MuiTextFieldStyle(darkTheme)}
                        
                        error={ errors.phoneNumber ? true : false }
                        { ...register('phoneNumber') }
                    />
                    { errors.phoneNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.phoneNumber?.message }</Box> }

                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}>Country</Typography>

                    <FormControl fullWidth>
                        <Select
                            labelId="country"
                            id="country-select"
                            label=""
                            defaultValue=""
                            // value={userCountry}

                            sx={{
                                color: darkTheme ? "white" : '#272727',
                                borderRadius: "13.79px",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? 'gray' : 'gray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                }
                            }}
                            
                            error={ errors.country ? true : false }
                            { ...register('country') }
                        >
                            { countries.map((country: any, index) => (
                                <MenuItem key={index} value={country.name.common} selected={userCountry == country.name.common ? true : false}>
                                    <img src={country.flags.png} alt={country.flags.alt}
                                        style={{
                                            maxWidth: "20px",
                                            marginRight: "10px"
                                        }}
                                    />
                                    {country.name.common}
                                </MenuItem>
                            )) }
                        </Select>
                    </FormControl>

                    { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }

                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}>
                        Gender
                    </Typography>

                    <FormControl fullWidth>
                        <Select
                            labelId="gender"
                            id="gender-select"
                            label=""
                            defaultValue=""

                            sx={{
                                color: darkTheme ? "white" : '#272727',
                                borderRadius: "13.79px",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? 'gray' : 'gray',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                }
                            }}
                            
                            error={ errors.gender ? true : false }
                            { ...register('gender') }

                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>
                    </FormControl>

                    { errors.gender && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.gender?.message }</Box> }

                </Box>


                <Box
                    sx={{
                        p: {xs: "10px", md: "25px"},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography component={"h3"} variant='h3'
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "13px", md: "16px"},
                            lineHeight: {xs: "25px", md: "32px"},
                            letterSpacing: "-0.13px",
                        }}
                    > Profile Picture </Typography>


                    { imagePreview ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "end",
                                alignItems: "center",
                                bgcolor: darkTheme ? "#272727" : "#666666",
                                borderRadius: "12px",
                                height: {xs: "146.55px", md: "326px"},
                                width: {xs: "128.45px", md: "347px"},
                                my: {xs: "10px", md: "20px"},
                                p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"},

                                backgroundImage: `url(${imagePreview})`, // Replace with your image URL
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                            }}
                        >
                            <Box></Box>

                            <Box 
                                sx={{
                                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                                    borderRadius: {xs: "8.14px", md: "12px"},
                                    // background: "#FFFFFF80",
                                    background: "#c4c4c480",

                                    color: "#000",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    mt: {xs: "7px", md: "15px"},
                                    position: "",
                                    // bottom: 0
                                }}
                                onClick={() => {
                                    document.getElementById("uploadSongCoverImage")?.click();
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
                                > Edit </Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "end",
                                alignItems: "center",
                                bgcolor: darkTheme ? "#272727" : "#666666",
                                borderRadius: "12px",
                                height: {xs: "146.55px", md: "326px"},
                                width: {xs: "128.45px", md: "347px"},
                                my: {xs: "10px", md: "20px"},
                                p: {xs: "5px 5px 10px 5px", md: "5px 5px 25px 5px"}
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: {xs: "71.29px", md: "160px"},
                                    maxHeight: {xs: "71.93px", md: "160px"},
                                    p: {xs: "10px", md: "25px"}
                                }}
                            >
                                <img 
                                    src={cloudUploadIconImg} alt='cloud upload icon image'
                                    style={{
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>

                            <Box 
                                sx={{
                                    p: {xs: "10.18px 19.68px 10.18px 19.68px", md: "15px 29px 15px 29px"},
                                    borderRadius: {xs: "8.14px", md: "12px"},
                                    background: "#fff",
                                    color: "#000",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    mt: {xs: "7px", md: "15px"}
                                }}
                                onClick={() => {
                                    document.getElementById("uploadSongCoverImage")?.click();
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
                                > Upload </Typography>
                            </Box>
                        </Box>
                    )}

                </Box>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }

                <Button variant="contained" 
                    fullWidth type="submit" 
                    disabled={ !isValid || isSubmitting } 
                    sx={{ 
                        bgcolor: darkTheme ? "#fff" : '#272727',
                        "&.Mui-disabled": {
                            background: "#9c9c9c",
                            color: "#797979"
                        },
                        "&:hover": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
                        },
                        "&:active": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
                        },
                        "&:focus": {
                            bgcolor: darkTheme ? "#fff" : '#272727',
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
                    {
                        isSubmitting && 
                        <CircularProgressWithLabel 
                            value={songUploadProgress} size={30} 
                            sx={{ color: "#8638E5", fontWeight: "bold", mx: 'auto' }} 
                        />
                    }
                    {/* <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} /> */}
                </Button>


                <input 
                    type="file" 
                    id='uploadSongCoverImage' 
                    name="uploadSongCoverImage" 
                    accept='image/*' 
                    onChange={handleFileUpload}
                    style={{display: "none"}}
                />
            </form>
        </Box>
    )
}

export default ArtistFormDetailsComponent;
