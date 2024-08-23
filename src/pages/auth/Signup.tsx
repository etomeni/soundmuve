import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import style from '../pricingStyles.module.css';

import signupImg from "./../../assets/images/signup.jpeg";
import AuthHeaderComponent from '../../components/AuthHeader';
import { apiEndpoint } from '../../util/resources';
import { useUserStore } from '../../state/userStore';
import { getUserIP } from '../../util/location';


const formSchema = yup.object({
    firstName: yup.string().required().min(2).trim().label("First Name"),
    lastName: yup.string().required().min(2).trim().label("Last Name"),

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

    confirmPassword: yup.string().required()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
      'Password must include uppercase, lowercase, digit, and special character'
    ).trim().label("Confirm Password"),

    // tnc: yup.boolean().required().label("Terms and conditions")
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
  


function Signup() {
    const [tnc, setTnc] = useState(true);
    const outerTheme = useTheme();
    const navigate = useNavigate();
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const _signUpUser = useUserStore((state) => state._signUpUser);
    const [userIP, setUserIP] = useState("");
  
    useEffect(() => {
        getUserIP().then((res: string) => {
            if (res) {
                setUserIP(res);
            }
        });
    }, []);
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const { 
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        if (formData.password !== formData.confirmPassword) {
            setError("password", {message: "Passwords do not match"});
            setError("confirmPassword", {message: "Passwords do not match"});
            return;
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/auth/sign-up`, { ...formData, ip: userIP })).data;
            // console.log(response);
            
            if (response && response.savedUser) {
                setApiResponse({
                    display: true,
                    status: true,
                    message: response.message
                });

                _signUpUser(response.savedUser);

                navigate("/auth/signup-type");
                return;
            }

            setApiResponse({
                display: true,
                status: false,
                message: response.message || "Oooops, registration failed. please try again."
            });
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, registration failed. please try again."
            });
        }

    }

    return (
        <Box sx={{bgcolor: "#000", color: "#fff", minHeight: "100vh",  position: "relative", overflow: "hidden"}}>
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
            
            <Box sx={{ position: "relative", zIndex: 1 }}>
                <Grid container >
                    <Grid item
                        xs={12} md={6}
                        sx={{ 
                            // alignSelf: "center",
                            // textAlign: {xs: "center", md: "left"},
                            display: {xs: "none", md: "block"},
                        }}
                    >
                        <img 
                            src={signupImg}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                            alt='signup page image'
                        />
                    </Grid>

                    <Grid item
                        xs={12} md={6}
                        sx={{ 
                            // alignSelf: "center",
                            textAlign: {xs: "center", md: "left"},
                            // py: {xs: 7, md: 2}
                        }}
                    >
                        <Container>
                            <ThemeProvider theme={customTheme(outerTheme)}>
                                <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                >
                                    <Box sx={{ 
                                        width: "100%",
                                        maxWidth: {xs: "470px", md: "100%"},
                                        textAlign: "center"
                                    }}>

                                        <Typography sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "30px", md: "43px"},
                                            letterSpacing: {xs: "-1.12px", md: "-1.29px"},
                                            lineHeight: {xs: "61.49px", md: "71px"}
                                        }}>
                                            Start your music journey
                                        </Typography>

                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 2,
                                            flexWrap: "nowrap",
                                            textAlign: "left",
                                            py: 1
                                        }}>

                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography sx={{
                                                    fontWeight: "400",
                                                    fontSize: "15.38px",
                                                    lineHeight: "38.44px",
                                                    letterSpacing: "-0.12px"
                                                }}>
                                                    First Name
                                                </Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='firstName'
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
                                                    
                                                    error={ errors.firstName ? true : false }
                                                    { ...register('firstName') }
                                                />
                                                { errors.firstName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.firstName?.message }</Box> }

                                            </Box>

                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography sx={{
                                                    fontWeight: "400",
                                                    fontSize: "15.38px",
                                                    lineHeight: "38.44px",
                                                    letterSpacing: "-0.12px"
                                                }}>
                                                    Last Name
                                                </Typography>

                                                <TextField 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    id='lastName'
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
                                                    
                                                    error={ errors.lastName ? true : false }
                                                    { ...register('lastName') }
                                                />
                                                { errors.lastName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lastName?.message }</Box> }

                                            </Box>
                                        </Box>


                                        <Box sx={{ py: 1 }}>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}>
                                                Email Address
                                            </Typography>

                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='email'
                                                type='email'
                                                label=''
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

                                        <Box sx={{ py: 1 }}>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
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

                                        <Box sx={{ py: 1 }}>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}>
                                                Confirm Password
                                            </Typography>

                                            <TextField 
                                                id='confirmPassword'
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
                                                
                                                error={ errors.confirmPassword ? true : false }
                                                { ...register('confirmPassword') }
                                            />
                                            { errors.confirmPassword && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.confirmPassword?.message }</Box> }

                                        </Box>

                                        <FormGroup>
                                            <FormControlLabel 
                                                control={
                                                    <Checkbox 
                                                        checked={tnc}
                                                        sx={{
                                                            color: tnc ? "#fff" : "red",
                                                            '&.Mui-checked': {
                                                                color: "#8638E5",
                                                            },
                                                        }}
                                                        onChange={(_e) => {
                                                            // console.log(_e.target.checked);
                                                            setTnc(_e.target.checked)
                                                        }}
                                                    />
                                                } 
                                                label={<Typography sx={{
                                                    fontSize: {xs: 14, md: "15.38px"},
                                                    fontWeight: "400",
                                                    lineHeight: "38.44px",
                                                    letterSpacing: "-0.12px"
                                                }}>I agree with SoundMuv terms and conditions</Typography>}
                                            />
                                        </FormGroup>

                                        {
                                            apiResponse.display && (
                                                <Stack sx={{ width: '100%', my: 2 }}>
                                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                                </Stack>
                                            )
                                        }
                                        

                                        <Button variant="contained" 
                                            fullWidth type="submit" 
                                            disabled={ !isValid || isSubmitting || !tnc } 
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
                                                my: 2, py: 1,
                                                fontSize: {md: "15.38px"},
                                                fontWeight: "900",
                                                letterSpacing: "-0.12px",
                                                textTransform: "none"
                                            }}
                                        >
                                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Sign up</span>
                                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                        </Button>


                                        <Box sx={{position: "relative"}}>
                                            <Typography sx={{
                                                fontSize: {xs: 14, md: "15.38px"},
                                                fontWeight: "400",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px"
                                            }}>
                                                Already have an account? 
                                                <Link to='/auth/login' onClick={() => navigate("/auth/login") } style={{
                                                    fontWeight: "bold",
                                                    color: "#8638E5",
                                                    cursor: "pointer"
                                                }}> Login </Link>
                                            </Typography>
                                        </Box>

                                    </Box>
                                </form>
                            </ThemeProvider>
                        </Container>
                    </Grid>


                    
                </Grid>
            </Box>
        </Box>
    )
}

export default Signup;
