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
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { getUserIP } from '@/util/location';
import colors from '@/constants/colors';
import bgImage from "@/assets/branded/images/auth/background.png";
import soundMuve from "@/assets/branded/soundMuve.png";
import { authMuiTextFieldStyle } from '@/util/mui';
import WestIcon from '@mui/icons-material/West';


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

  


function SignupDesktopComponent() {
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
        <Box bgcolor={colors.bg} minHeight="100vh">

            <Grid container >
                <Grid item xs={12} md={6} >
                    <Box height="100%" 
                        sx={{
                            display: "grid",
                            placeItems: "center",

                            width: "100%",
                            minHeight: "100vh",

                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: "no-repeat",
                            // backgroundPosition: 'center',
                        }}
                    >
                        <Link to="/">
                            <img src={soundMuve} alt='soundMuve logo'
                                style={{
                                    width: "100%",
                                    maxWidth: "303.07px",
                                    height: "100%",
                                    maxHeight: "73.57px",
                                    objectFit: "contain",
                                    margin: "auto"
                                }}
                            />
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} >
                    <Box height="100%">
                        <Box width="100%" height="100vh"
                            // sx={{ 
                            //     position: "relative", overflowX: "visible", overflowY: "scroll",
                            // }}
                        >
                            <Container>

                                <Box 
                                    sx={{
                                        py: 4,
                                        px: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",

                                        boxShadow: "0px 1px 4px 0px #00000040",
                                        borderRadius: "70px 0 0 70px",

                                        bgcolor: "#FFFFFF",
                                        position: "absolute",
                                        right: 0,
                                        top: "60px",
                                        // overflow: "hidden",
                                        width: "100%",

                                        maxWidth: "56%",
                                        // maxWidth: "120%",
                                    }}
                                >
                                    <form noValidate onSubmit={ handleSubmit(onSubmit) } 
                                        style={{ maxWidth: "549px", width: "100%", alignSelf: "center" }}
                                    >
                                        <Box sx={{ 
                                            width: "100%",
                                            maxWidth: {xs: "470px", md: "100%"},
                                            textAlign: "center"
                                        }}>
                                            <WestIcon onClick={() => navigate(-1)} 
                                                sx={{ textAlign: "left", display: "block", cursor: "pointer" }} 
                                            />

                                            <Typography variant='h2' component="h2" sx={{
                                                fontFamily: "Nohemi",
                                                fontWeight: "900",
                                                fontSize: {xs: 35, md: "40px"},
                                                lineHeight: {xs: "49.28px", md: "18px"},
                                                letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                                                mb: "16px",
                                                mt: "25px",
                                                color: "#000000",
                                                textAlign: "left"
                                            }}> Create an account </Typography>

                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 2,
                                                flexWrap: "nowrap",
                                                textAlign: "left",
                                                mt: "35px"
                                            }}>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <TextField 
                                                        variant="standard" 
                                                        fullWidth 
                                                        id='firstName'
                                                        type='text'
                                                        label=''
                                                        placeholder='First Name'
                                                        inputMode='text'
                                                        defaultValue=""
                                                        InputLabelProps={{
                                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                                        }}
                                                        sx={{
                                                            ...authMuiTextFieldStyle
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
                                                    <TextField 
                                                        variant="standard" 
                                                        fullWidth 
                                                        id='lastName'
                                                        type='text'
                                                        label=''
                                                        placeholder='Last Name'
                                                        inputMode='text'
                                                        defaultValue=""
                                                        InputLabelProps={{
                                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                                        }}
                                                        sx={{
                                                            ...authMuiTextFieldStyle
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

                                            <Box sx={{ mt: "35px" }}>
                                                <TextField variant="standard" 
                                                    fullWidth 
                                                    id='email'
                                                    type='email'
                                                    label=''
                                                    placeholder='Email Address'
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

                                            <Box sx={{ mt: "35px" }}>
                                                <TextField variant="standard"
                                                    id='password'
                                                    type={showPassword ? "text" : 'password' }
                                                    label=''
                                                    inputMode='text'
                                                    placeholder='Password'
                                                    
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
                                                    
                                                    error={ errors.password ? true : false }
                                                    { ...register('password') }
                                                />
                                                { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }

                                            </Box>

                                            <Box sx={{ mt: "35px" }}>
                                                <TextField variant="standard"
                                                    id='confirmPassword'
                                                    type={showPassword ? "text" : 'password' }
                                                    label=''
                                                    inputMode='text'
                                                    placeholder='Confirm Password'
                                                    
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
                                                    
                                                    error={ errors.confirmPassword ? true : false }
                                                    { ...register('confirmPassword') }
                                                />
                                                { errors.confirmPassword && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.confirmPassword?.message }</Box> }

                                            </Box>

                                            <FormGroup sx={{ mt: "20px" }}>
                                                <FormControlLabel 
                                                    control={
                                                        <Checkbox 
                                                            checked={tnc}
                                                            sx={{
                                                                color: '#7B7979',
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
                                                    label={<Typography sx={{
                                                        fontFamily: "Geist",
                                                        fontWeight: "300",
                                                        fontSize: {xs: 14, md: "16px"},
                                                        lineHeight: "12px",
                                                        letterSpacing: "-0.2px"
                                                    }}>I agree with SoundMuve terms and conditions</Typography>}
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
                                                    bgcolor: "#000",
                                                    color: "#fff",
                                                    maxWidth: "121px",
                                                    mx: "auto",
                                                    "&.Mui-disabled": {
                                                        background: "#9c9c9c",
                                                        color: "#797979"
                                                    },
                                                    "&:hover": {
                                                        bgcolor: "#000"
                                                    },
                                                    "&:active": {
                                                        bgcolor: "#000"
                                                    },
                                                    "&:focus": {
                                                        bgcolor: "#000"
                                                    },
                                                    borderRadius: "12px",
                                                    my: 2, 
                                                    py: 1,
                                                    fontSize: {md: "15.38px"},
                                                    fontWeight: "900",
                                                    letterSpacing: "-0.12px",
                                                    textTransform: "none"
                                                }}
                                            >
                                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Sign up</span>
                                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                            </Button>


                                            <Box sx={{position: "relative"}}>
                                                <Typography sx={{
                                                    fontFamily: "Geist",
                                                    fontWeight: "300",
                                                    fontSize: {xs: 14, md: "16px"},
                                                    lineHeight: "12px",
                                                    letterSpacing: "-0.2px",
                                                    color: "#7B7979"
                                                }}>
                                                    Already have an account? 
                                                    <Link to='/auth/login' style={{
                                                        // fontWeight: "bold",
                                                        color: colors.primary,
                                                    }}> Login </Link>
                                                </Typography>
                                            </Box>

                                        </Box>
                                    </form>
                                </Box>
                            </Container>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SignupDesktopComponent;
