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
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { getUserIP } from '@/util/location';
import HeaderComponent from '../Header';
import colors from '@/constants/colors';
import { authMuiTextFieldStyle, contentWidth } from '@/util/mui';
import FooterComponent from '../Footer';


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


function SignupMobileComponent() {
    const [tnc, setTnc] = useState(true);
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
        <Box bgcolor={colors.bg}>
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                // px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>
                <Box>
                    <Container>
                        <form noValidate onSubmit={ handleSubmit(onSubmit) }>
                            <Box sx={{ 
                                width: "100%",
                                maxWidth: {xs: "470px", md: "100%"},
                                textAlign: "center",
                                mx: "auto"
                            }}>

                                <Typography variant='h1' component="h1" sx={{
                                    fontFamily: "Nohemi",
                                    fontWeight: "900",
                                    fontSize: {xs: "35px", md: "43px"},
                                    lineHeight: {xs: "35px", md: "71px"},
                                    letterSpacing: {xs: "1%", md: "-1.29px"},
                                    my: 3
                                }}> Start your music journey </Typography>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 2,
                                    flexWrap: "nowrap",
                                    textAlign: "left",
                                    py: 1
                                }}>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant='body1' sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> First Name </Typography>

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
                                            sx={{
                                                ...authMuiTextFieldStyle
                                            }}
                                            error={ errors.firstName ? true : false }
                                            { ...register('firstName') }
                                        />
                                        { errors.firstName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.firstName?.message }</Box> }

                                    </Box>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant='body1' sx={{
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
                                            sx={{
                                                ...authMuiTextFieldStyle
                                            }}
                                            
                                            error={ errors.lastName ? true : false }
                                            { ...register('lastName') }
                                        />
                                        { errors.lastName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.lastName?.message }</Box> }

                                    </Box>
                                </Box>


                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body1' sx={{
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
                                        sx={{
                                            ...authMuiTextFieldStyle
                                        }}
                                        
                                        error={ errors.email ? true : false }
                                        { ...register('email') }
                                    />
                                    { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                                </Box>

                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body1' sx={{
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

                                <Box sx={{ py: 1 }}>
                                    <Typography variant='body1' sx={{
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
                                                        color: colors.primary,
                                                    },
                                                }}
                                                onChange={(_e) => {
                                                    // console.log(_e.target.checked);
                                                    setTnc(_e.target.checked)
                                                }}
                                            />
                                        } 
                                        label={<Typography variant='body1' sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "13.33px", md: "15.38px"},
                                            lineHeight: "20.33px",
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
                                        bgcolor: colors.primary,
                                        color: colors.milk,
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
                                        my: 2, py: 1,
                                        fontSize: {md: "15.38px"},
                                        fontWeight: "900",
                                        letterSpacing: "-0.12px",
                                        textTransform: "none"
                                    }}
                                >
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Sign up</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                </Button>


                                <Box py={5}>
                                    <Typography variant='body1' sx={{
                                        fontSize: {xs: 14, md: "15.38px"},
                                        fontWeight: "400",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}>
                                        Already have an account? 
                                        <Link to='/auth/login' style={{
                                            fontWeight: "bold",
                                            color: colors.primary,
                                            cursor: "pointer"
                                        }}> Login </Link>
                                    </Typography>
                                </Box>

                            </Box>
                        </form>
                    </Container>
                </Box>
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default SignupMobileComponent;
