import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import AuthHeaderComponent from '@/components/AuthHeader';

import recordLabelImage from "@/assets/images/recordLabelSignup.jpg";
import cloudUpload from "@/assets/images/cloud_upload.png";

import { getCountries, getUserLocation } from '@/util/location';
import { restCountries } from '@/util/countries';
import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';
import { SxProps, Theme } from '@mui/material/styles';
import colors from '@/constants/colors';
import { auth2MuiTextFieldStyle } from '@/util/mui';
import apiClient, { apiErrorResponse } from '@/util/apiClient';


const formSchema = yup.object({
    recordLabelName: yup.string().required().min(2).trim().label("Record label name"),
    phoneNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),
    country: yup.string().required().min(2).trim().label("Country"),
    // logo: yup.string().required().min(2).trim().label("logo"),
});
  
const formLabelTitleStyle: SxProps<Theme> = {
    fontWeight: "400",
    fontSize: "14.63px",
    lineHeight: "36.57px",
    letterSpacing: "-0.12px"
}

function SignupRecordLabelDetails() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState(restCountries);
    const [userCountry, setUserCountry] = useState("");
    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState();
    const userData = useUserStore((state) => state.userData);
    const _signUpUser = useUserStore((state) => state._signUpUser);
             
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    

    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
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
                if (res) setUserCountry(res.country);

                if (res) setValue("country", res.country);
            })
        });

    }, []);
    
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setImage(file);

        const base64: any = await convertToBase64(file);
        // console.log(base64);
        
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

        if (!image) {
            setApiResponse({
                display: true,
                status: false,
                message: "Please upload a logo."
            });

            return;
        }

        const data2db = new FormData();
        data2db.append('email', userData.email);
        data2db.append('userType', "record label");
        // data2db.append('artistName', formData.recordLabelName);
        data2db.append('country', formData.country);
        data2db.append('phoneNumber', formData.phoneNumber);
        data2db.append('recordLabelName', formData.recordLabelName);
        data2db.append('recordLabelLogo', image);

        try {
            const response = (await apiClient.patch(
                `/auth/updateUser-details`,
                data2db,  
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )).data;
            // console.log(response);

            _signUpUser(response.result);
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            navigate("/auth/login", {replace: true});
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong. please try again.", false);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes
            });
        }

    }


    return (
        <Box sx={{bgcolor: "#0C2634", color: "#fff", minHeight: "100vh" }}>
            <AuthHeaderComponent />

            <Box 
                sx={{
                    width: '100%',
                    height: '221px',
                    backgroundImage: `url(${recordLabelImage})`, // Replace with your image URL
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    top: "-47px",
                    overflow: "hidden",
                    zIndex: 1
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #0C2634 109.84%)',
                    }}
                />
                <Typography variant='h2' component="h2" sx={{
                    fontWeight: "900",
                    fontSize: {xs: 40, md: 60},
                    lineHeight: {xs: "50px", md: "73.79px"},
                    letterSpacing: {xs: '-0.73px', md: "-1.34px"},
                    position: "absolute",
                    mx: "auto",
                    bottom: 20,
                    // left: "40%"
                }}> Record Label Details </Typography>
            </Box>

            <Container>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 2 }}>
                    <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                        style={{
                            width: "100%",
                            maxWidth: "734px",
                            // textAlign: "lef"
                        }}
                    >

                        <Box sx={{ my: 3 }}>
                            <Typography sx={{
                                ...formLabelTitleStyle,
                            }}> Record label name </Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='recordLabelName'
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
                                sx={{
                                    ...auth2MuiTextFieldStyle
                                }}
                                error={ errors.recordLabelName ? true : false }
                                { ...register('recordLabelName') }
                            />
                            { errors.recordLabelName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.recordLabelName?.message }</Box> }
                        </Box>

                        <Box sx={{ my: 3 }}>
                            <Typography sx={{
                                ...formLabelTitleStyle,
                            }}> Phone number </Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='phoneNumber'
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
                                sx={{
                                    ...auth2MuiTextFieldStyle
                                }}
                                error={ errors.phoneNumber ? true : false }
                                { ...register('phoneNumber') }
                            />

                            { errors.phoneNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.phoneNumber?.message }</Box> }
                        </Box>

                        <Box sx={{ my: 3 }}>
                            <Typography sx={{
                                ...formLabelTitleStyle,
                            }}> Country </Typography>

                            <FormControl fullWidth>
                                <Select
                                    labelId="country"
                                    id="country-select"
                                    label=""
                                    defaultValue=""
                                    // value={userCountry}

                                    sx={{
                                        color: "white",
                                        borderRadius: "16px",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: 'rgba(228, 219, 233, 0.25)',
                                            borderColor: colors.primary,
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            // borderColor: 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                                            borderColor: colors.primary,
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: "white !important",
                                        }
                                    }}
                                    
                                    error={ errors.country ? true : false }
                                    { ...register('country') }
                                >
                                    { countries.map((country: any, index) => (
                                        <MenuItem key={index} value={country.name.common} selected={userCountry == country.name.common ? true : false}>
                                            <img src={country.flags.png} 
                                                style={{
                                                    maxWidth: "20px",
                                                    marginRight: "10px"
                                                }}
                                                alt={country.flags.alt}
                                            />
                                            {country.name.common}
                                        </MenuItem>
                                    )) }
                                </Select>
                            </FormControl>

                            { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }

                        </Box>

                        <Box sx={{ my: 5, display: "flex", justifyContent: "center" }}>
                            <Box 
                                sx={{
                                    width: "340px",
                                    height: "292px",
                                    border: "2px solid #fff",
                                    borderRadius: "18px",
                                    display: "flex",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    document.getElementById("recordLabellogoUpload")?.click();
                                }}
                            >
                                { imagePreview ? (
                                    <Box>
                                        <img src={imagePreview} 
                                            alt='record label logo image preview'
                                            style={{
                                                objectFit: "contain",
                                                width: "100%",
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Box sx={{
                                        textAlign: "center",
                                        m: "auto",
                                    }}>
                                        <Typography sx={{
                                            fontWeight: "700",
                                            fontSize: "20px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px",
                                            mb: 3
                                        }}>
                                            Upload logo
                                        </Typography>
                                        <img src={cloudUpload} alt='cloud Upload icon' />
                                    </Box>
                                ) }
                            </Box>
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
                            disabled={ !isValid || isSubmitting || !imagePreview } 
                            sx={{ 
                                bgcolor: "#fff",
                                "&.Mui-disabled": {
                                    background: "#9c9c9c",
                                    color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: "#fff"
                                },
                                "&:active": {
                                    bgcolor: "#fff"
                                },
                                "&:focus": {
                                    bgcolor: "#fff"
                                },
                                color: "#000",
                                borderRadius: "12px",
                                my: 3, py: 1.5,
                                fontSize: {md: "15.38px"},
                                fontWeight: "900",
                                letterSpacing: "-0.12px",
                                textTransform: "none"
                            }}
                        >
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                        </Button>
                    </form>
                </Box>
            </Container>

            
            <input 
                type="file" 
                id='recordLabellogoUpload' 
                name="recordLabellogoUpload" 
                accept='image/*' 
                onChange={handleFileUpload}
                style={{display: "none"}}
            />
        </Box>
    )
}

export default SignupRecordLabelDetails;
