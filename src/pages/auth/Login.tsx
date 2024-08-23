import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

import AuthHeaderComponent from '../../components/AuthHeader';
import style from '../pricingStyles.module.css';
import axios from 'axios';
import { apiEndpoint } from '../../util/resources';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useUserStore } from '../../state/userStore';
import { useSettingStore } from '../../state/settingStore';


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address"),

    password: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Password"),
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
  
function Login() {
    const navigate = useNavigate();
    const outerTheme = useTheme();
    const _loginUser = useUserStore((state) => state._loginUser);
    const _signUpUser = useUserStore((state) => state._signUpUser);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onBlur' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sign-in`, formData )).data;
            // console.log(response);

            // const checkSignupCompletionRes = (await axios.get(
            //     `${apiEndpoint}/auth/checkProfileInformation/${response.user.email}`, 
            //     {
            //         headers: {
            //             Authorization: `Bearer ${response.token}`
            //         }
            //     }
            // )).data;
            // console.log(checkSignupCompletionRes);


            if (response && (response.user || response.token)) {
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


                if (!response.user.teamType) {
                    _signUpUser(response.user);
                    
                    navigate("/auth/signup-type");
                    return;
                }

                _loginUser(response.user, response.token, response.refreshToken);

                navigate("/account/", {replace: true});
                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message || "Oooops, login failed. please try again."
            });
        } catch (error: any) {
            const err = error.response.data;
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, login failed. please try again."
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
                        <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                            style={{
                                maxWidth: "653px",
                                width: "100%",
                                // height: 400,
                                alignSelf: "center"
                            }}
                        >

                            <Typography sx={{
                                fontWeight: "900",
                                fontSize: {xs: 35, md: 60},
                                lineHeight: {xs: "49.28px", md: "82.28px"},
                                letterSpacing: {xs: "-0.9px", md: "-1.5px"}
                            }}>
                                Login
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

                            <Box sx={{ py: 2 }}>
                                <Typography sx={{
                                    textAlign: "left", 
                                    fontSize: {xs: "13.5px", md: "17.84px"}, 
                                    fontWeight: "400",
                                    letterSpacing: {xs: "-0.69px", md: "-0.14px"},
                                    lineHeight: {xs: "30.69px", md: "44.6px" },
                                }}>
                                    Password
                                </Typography>

                                <TextField 
                                    id='password'
                                    type={showPassword ? "text" : 'password' }
                                    label=''
                                    inputMode='text'
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue=""
                                    InputLabelProps={{
                                        style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{color: "#fff"}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>,
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    
                                    error={ errors.password ? true : false }
                                    { ...register('password') }
                                />
                                { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                            </Box>

                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: {xs: "10.69px", md: "17.84px"},
                                lineHeight: {xs: "26.72px", md: "44.6px" },
                                letterSpacing: {xs: "-0.09px", md: "-0.14px"}
                            }}>
                                <Link to="/auth/forgot-password" style={{
                                    textAlign: "right",
                                    color: "#8638E5",
                                    float: 'right',
                                }}>
                                    Forgot Password?
                                </Link>
                            </Typography>


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
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Login</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                            </Button>

                            <Box sx={{my: 2}}>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: {xs: "10.69px", md: "17.84px"},
                                    lineHeight: {xs: "26.72px", md: "44.6px" },
                                    letterSpacing: {xs: "-0.09px", md: "-0.14px"}
                                }}>
                                    Don't have an account?
                                    <Link to='/auth/signup' style={{
                                        fontWeight: "bold",
                                        color: "#8638E5",
                                    }}> sign up </Link>
                                </Typography>
                            </Box>
                        </form>
                    </ThemeProvider>
                </Box>
            </Container>
        </Box>
    )
}

export default Login;
