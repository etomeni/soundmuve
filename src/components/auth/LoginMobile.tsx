import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';


import { apiEndpoint } from '../../util/resources';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useUserStore } from '../../state/userStore';
import { useSettingStore } from '../../state/settingStore';
import FooterComponent from '@/components/Footer';
import HeaderComponent from '@/components/Header';
import colors from '@/constants/colors';
import { authMuiTextFieldStyle, contentWidth } from '@/util/mui';
import { getDecryptedLocalStorage, setEncryptedLocalStorage } from '@/util/storage';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
  
function LoginMobileComponent() {
    const navigate = useNavigate();

    const _loginUser = useUserStore((state) => state._loginUser);
    const _signUpUser = useUserStore((state) => state._signUpUser);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);
    
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        const result = getDecryptedLocalStorage('uad');
        if (result) {
            setValue("email", result.email || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
            setValue("password", result.password || '', {shouldDirty: true, shouldTouch: true, shouldValidate: true});
        }
    }, []);
    
    const { 
        handleSubmit, register, setValue, formState: { errors, isValid, isSubmitting } 
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

                if (rememberMe) {
                    // uad - user auth data;
                    setEncryptedLocalStorage('uad', formData);
                }

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
            const err = error.response ? error.response.data : error || '';
            console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, login failed. please try again."
            });
        }
        
    }


    return (

        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                // px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>

                <Container>
                    <Box sx={{
                        // py: {xs: 5, sm: 10, md: 10},
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                            style={{
                                maxWidth: "653px",
                                width: "100%",
                                // height: 400,
                                alignSelf: "center"
                            }}
                        >

                            <Typography variant='h1' component="h1"
                                sx={{
                                    fontFamily: "Nohemi",
                                    fontWeight: "900",
                                    fontSize: {xs: "35px", md: 60},
                                    lineHeight: {xs: "24px", md: "82.28px"},
                                    letterSpacing: {xs: "1%", md: "-1.5px"},
                                    textAlign: "center",
                                    color: colors.dark,
                                    my: 3
                                }}
                            > Login </Typography>

                            <Box sx={{ py: 2 }}>
                                <Typography variant='body1'
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: {xs: "13.5px", md: "17.84px"}, 
                                        letterSpacing: {xs: "-0.69px", md: "-0.14px"},
                                        lineHeight: {xs: "30.69px", md: "44.6px" },
                                        textAlign: "left", 
                                    }}
                                > Email </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='email'
                                    type='email'
                                    label=''
                                    // autoFocus
                                    inputMode='email'
                                    defaultValue=""
                                    InputLabelProps={{
                                        // style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    
                                    error={ errors.email ? true : false }
                                    { ...register('email') }
                                />
                                { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                            </Box>

                            <Box sx={{ py: 2 }}>
                                <Typography variant='body1' 
                                    sx={{
                                        textAlign: "left", 
                                        fontSize: {xs: "13.5px", md: "17.84px"}, 
                                        fontWeight: "400",
                                        letterSpacing: {xs: "-0.69px", md: "-0.14px"},
                                        lineHeight: {xs: "30.69px", md: "44.6px" },
                                    }}
                                > Password </Typography>

                                <TextField 
                                    id='password'
                                    type={showPassword ? "text" : 'password' }
                                    label=''
                                    inputMode='text'
                                    variant="outlined" 
                                    fullWidth 
                                    defaultValue=""
                                    InputLabelProps={{
                                        // style: { color: '#c1c1c1', fontWeight: "400" },
                                    }}
                                    InputProps={{
                                        endAdornment: 
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{color: "gray"}}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>,
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    
                                    error={ errors.password ? true : false }
                                    { ...register('password') }
                                />
                                { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                            </Box>


                            <Stack direction="row" justifyContent="space-between" 
                                alignItems="center" mb="30px"
                            >
                                <FormGroup>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={rememberMe}
                                                sx={{
                                                    color: "#D9D9D9",
                                                    '&.Mui-checked': {
                                                        color: colors.primary,
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    // console.log(e.target.checked);
                                                    setRememberMe(e.target.checked);
                                                }}
                                            
                                            />
                                        } 
                                        label={<Typography variant='body2' sx={{
                                            fontFamily: "Geist",
                                            fontWeight: "300",
                                            fontSize: {xs: "15px", md: "16px"},
                                            lineHeight: "12px",
                                            letterSpacing: "-0.2px",
                                            color: "#A4A4A4"
                                        }}>Remember me</Typography>}
                                    />
                                </FormGroup>

                                <Typography variant='body1' component="p"
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "300",
                                        fontSize: {xs: "10.69px", md: "16px"},
                                        lineHeight: {xs: "26.72px", md: "12px" },
                                        letterSpacing: {xs: "-0.09px", md: "-0.2px"}
                                    }}
                                >
                                    <Link to="/auth/forgot-password" style={{
                                        fontFamily: "Geist",
                                        fontWeight: "300",
                                        fontSize: "16px", 
                                        lineHeight: "12px",
                                        textAlign: "right",
                                        color: colors.primary,
                                        float: 'right',
                                    }}>
                                        Forgot Password?
                                    </Link>
                                </Typography>
                            </Stack>


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
                                    bgcolor: colors.primary,
                                    color: colors.milk,
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
                                    borderRadius: "12px",
                                    my: 2, 
                                    py: 1.5
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Login</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                            </Button>

                            <Box sx={{my: 2}}>
                                <Typography variant='body1' component="p" 
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "300",
                                        fontSize: {xs: "10.69px", md: "16px"},
                                        lineHeight: {xs: "26.72px", md: "12px" },
                                        letterSpacing: {xs: "-0.09px", md: "-0.2px"}
                                    }}
                                >
                                    Don't have an account?
                                    <Link to='/auth/signup' style={{
                                        fontWeight: "bold",
                                        color: colors.primary,
                                    }}> sign up </Link>
                                </Typography>
                            </Box>
                        </form>
                    </Box>
                </Container>

            </Box>

            <FooterComponent />
            
        </Box>
    )
}

export default LoginMobileComponent;
