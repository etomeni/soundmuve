import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

import style from '../pricingStyles.module.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { apiEndpoint } from '../../util/resources';
import AuthHeaderComponent from '../../components/AuthHeader';
import resetPasswordImg from "./../../assets/images/resetPassword.png";
import SnackbarToast, { SnackbarToastInterface } from '../../components/ToastNotification';
import { useUserStore } from '../../state/userStore';


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address")
});

const customTheme = (outerTheme: Theme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#FFFFFF',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: '#fff', // Change to your desired text color
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray', // Change to your desired placeholder color
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });
  
function ForgotPassword() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const _updateUser = useUserStore((state) => state._updateUser);
    const userData = useUserStore((state) => state.userData);
  
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const [toastNotification, setToastNotification] = useState<SnackbarToastInterface>({
        display: false,
        status: "success",
        message: ""
    });

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sendotp-email`, formData )).data;
            // console.log(response);

            _updateUser({ ...userData, email: formData.email });
            
            setApiResponse({
                display: true,
                status: true,
                message: response.message
            });
            setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            navigate("/auth/verify-email");

        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to send email otp. please try again."
            });
        }
    }

    

    return (
        <Box sx={{bgcolor: "#000", color: "#fff", minHeight: "100vh", position: "relative", overflow: "hidden"}}>
            <AuthHeaderComponent />

            <>
                <Box sx={{display: { xs: 'none', md: 'block' }}}>
                    <div className={style.topGradient}></div>
                    <div className={style.leftGradient}></div>
                    <div className={style.leftBottomGradient}></div>
                    <div className={style.rightTopGradient}></div>
                    <div className={style.rightBottom2Gradient}></div>
                    <div className={style.btnCenteredGradient}></div>
                    <div className={style.leftBottom2Gradient}></div>
                </Box>

                <Box sx={{display: { xs: 'block', md: 'none' }}}>
                    <div className={style.mobileLeftGradient}></div>
                    <div className={style.mobileRightGradient}></div>
                    <div className={style.mobileCenteredGradient}></div>
                </Box>
            </>

            <Container sx={{position: "relative", zIndex: 1}}>
                <Box sx={{
                    py: {xs: 5, sm: 10, md: 10},
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}>
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <form noValidate 
                            onSubmit={ handleSubmit(onSubmit) } 
                            style={{
                                maxWidth: "653px",
                                width: "100%",
                                // height: 400,
                                alignSelf: "center"
                            }}
                        >
                            <Box sx={{
                                maxWidth: "214px",
                                width: {xs: `${214 * 0.3}px`, md: `${214 * 0.6}px`},
                                textAlign: "center",
                                mx: "auto"
                            }}>
                                <img 
                                    src={resetPasswordImg} 
                                    alt="reset password lock image" 
                                    style={{ width: "100%" }} 
                                />
                            </Box>

                            <Typography sx={{
                                fontWeight: "900",
                                fontSize: {xs: 35, md: 50},
                                lineHeight: {xs: "49.28px", md: "82.28px"},
                                letterSpacing: {xs: "-0.9px", md: "-1.5px"}
                            }}>
                                Reset Password
                            </Typography>

                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: {xs: "10.69px", md: 24},
                                lineHeight: {xs: "26.72px", md: "44.6px"},
                                letterSpacing: {xs: "-0.9px", md: "-0.14px"}
                            }}>
                                Please enter an email adddress to recieve verification code
                            </Typography>


                            <Box sx={{ py: 2 }}>
                                <Typography sx={{
                                    textAlign: "left", 
                                    fontSize: {xs: "13.5px", md: "17.84px"}, 
                                    fontWeight: "400",
                                    letterSpacing: {xs: "-0.69px", md: "-0.14px"},
                                    lineHeight: {xs: "30.69px", md: "44.6px" },
                                }}>
                                    Email Address
                                </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='email'
                                    type='email'
                                    label=''
                                    autoFocus
                                    inputMode='email'
                                    defaultValue=""
                                    InputLabelProps={{
                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    
                                    error={ errors.email ? true : false }
                                    { ...register('email') }
                                />
                                { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

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
                                    bgcolor: "#fff",
                                    "&.Mui-disabled": {
                                        background: "#c4c4c4",
                                        bgcolor: "#c4c4c4",
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
                                    my: 2, 
                                    py: 1.5
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                            </Button>

                        </form>
                    </ThemeProvider>
                </Box>
            </Container>


            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification({ ...toastNotification, display: false})}
            />
        </Box>
    )
}

export default ForgotPassword;
