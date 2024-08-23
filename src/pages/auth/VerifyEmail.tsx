import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

import VerifyEmailImg from "./../../assets/images/VerifyEmail.png";
import AuthHeaderComponent from '../../components/AuthHeader';
import style from '../pricingStyles.module.css';
import { apiEndpoint } from '../../util/resources';
import { useUserStore } from '../../state/userStore';
import { useSettingStore } from '../../state/settingStore';


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
  
function VerifyEmail() {
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const userData = useUserStore((state) => state.userData);

    const [code, setCode] = useState(new Array(4).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
      
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    

    const handleChange = (e: any, index: any) => {
        if (isNaN(e.target.value)) return false;
        setCode([ ...code.map((data, i) => (i === index ? e.target.value : data)) ])

        // set focus on the next input when the first value is set.
        const nextSibling = document.getElementById(`code${index + 1}`);
        if (e.target.value && nextSibling) {
            // console.log(e.target.nextSibling);
            document.getElementById(`code${index + 1}`)?.focus();
        }



        // const focusInput = e.target.parentNode.querySelector("input:focus");
        // console.log(focusInput);
        
        // if (focusInput) {
        //     focusInput.blur(); // remove focus from the input's
        // }

    }

    const handlePaste = (e: any) => {
        const value = e.clipboardData.getData("text");
        // console.log(value);
        
        if (isNaN(value)) return false; // check if its a number
        // converts it to an array of string and ensure the length of the string is same as that of the code
        const updatedValue = value.toString().split("").slice(0, code.length); 
        setCode(updatedValue);

        const focusInput = e.target.parentNode.querySelector("input:focus");
        if (focusInput) {
            focusInput.blur(); // remove focus from the input's
        }


        // // focus on the last input 
        // const lastInput = document.getElementById(`code${code.length - 1}`);
        // if (lastInput) {
        //     lastInput.focus();
        // } 
    }

    const handleDelete = (e: any, _index: any) => {
        if ((e.which === 8 || e.keyCode === 8) && e.target.value === "") {
            const updatedValue = code.join('').split('').concat(Array(code.length).fill('')).slice(0, code.length);
            setCode(updatedValue);

            const lastInput = document.getElementById(`code${code.join('').length - 1}`);
            if (lastInput) {
                lastInput.focus();
            } 
            return;
        }

        // const newValue = e.key;
        // const oldValue = e.target.value;
        
        // if (isNaN(e.target.value)) return false;
        // if (code[index] == oldValue) {
        //     setCode([ ...code.map((data, i) => (i === index ? newValue : data)) ])
        // }
    }

        
    const onSubmit = async () => {
        setIsSubmitting(true);
           
        setApiResponse({
            display: false,
            status: true,
            message: ''
        });

        const data2db = {
            email: userData.email,
            otp: code.join('')
        };
        
        try {
            const response = (await axios.post(`${apiEndpoint}/auth/verifyotp-email`, data2db )).data;
            // console.log(response);
            
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

            navigate("/auth/create-new-password", {replace: true});
            setIsSubmitting(false);
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;
            console.log(err);
            

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to send email otp. please try again."
            });
            setIsSubmitting(false);
        }
    }
           
    const handleResendOtp = async () => {
        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sendotp-email`, { email: userData.email } )).data;
            // console.log(response);
  
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

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
                        <Box  
                            sx={{
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
                                mx: "auto",
                            }}>
                                <img 
                                    src={VerifyEmailImg} 
                                    alt="verify email lock image" 
                                    style={{ width: "100%", objectFit: "contain" }} 
                                />
                            </Box>

                            <Typography sx={{
                                fontWeight: "900",
                                fontSize: {xs: "35px", md: "50px"},
                                lineHeight: {xs: "49.28px", md: "82.28px"},
                                letterSpacing: {xs: "-0.9px", md: "-1.5px"}
                            }}>
                                Verify your email
                            </Typography>

                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: {xs: "10.69px", md: "24px"},
                                lineHeight: {xs: "26.72px", md: "44.6px"},
                                letterSpacing: {xs: "-0.9px", md: "-0.14px"}
                            }}>
                                Please enter the 4 digit code sent to <br />
                                <span style={{fontWeight: "700"}}>
                                    { userData.email }
                                </span>
                            </Typography>


                            <Box sx={{ py: 2, }}>
                                <Box sx={{ 
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "15px",
                                    mx: "auto",
                                    // bgcolor: "green",
                                    textAlign: "center"
                                }}>
                                    { code.map((data, i) => (

                                        <TextField 
                                            key={i}
                                            variant="outlined" 
                                            // fullWidth 
                                            // id={`code${i}`}
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            // defaultValue=""
                                            
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                    textAlign: "center",
                                                    // bgcolor: "yellow",
                                                    width: {xs: "70px", sm: "80px", md: "121px"},
                                                    height: {xs: "70px", sm: "70px", md: "100px" }
                                                },
                                            }}

                                            inputProps={{ 
                                                maxLength: 1, 
                                                id: `code${i}`,
                                                className: "otpCode",
                                                style: { textAlign: "center" }
                                            }}

                                            error={ apiResponse.display && apiResponse.status == false ? true : false }

                                            value={data}
                                            onChange={(e) => handleChange(e, i)}
                                            onPaste={(e) => handlePaste(e)}
                                            onKeyUp={(e) => handleDelete(e, i)}
                                        />
                                    )) }

                                </Box>
                            </Box>

                            <Typography 
                                onClick={() => handleResendOtp()}
                                sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "24px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px"},
                                    letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                    mb: 2,
                                    cursor: "pointer"
                                }}
                            >
                                Resend Code
                            </Typography>


                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Button variant="contained" 
                                fullWidth type="button" 
                                disabled={ code.join('').length !== 4 || isSubmitting } 
                                onClick={() => onSubmit()}
                                sx={{ 
                                    bgcolor: "#fff",
                                    "&.Mui-disabled": {
                                        background: "#c4c4c4",
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
                                    py: 1.5,
                                    textTransform: "unset"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                            </Button>

                        </Box>
                    </ThemeProvider>
                </Box>
            </Container>
        </Box>
    )
}

export default VerifyEmail;
