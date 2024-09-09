import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import SnackbarToast, { SnackbarToastInterface } from '../components/ToastNotification';
import { apiEndpoint } from '../util/resources';
import colors from '@/constants/colors';
import { contactMuiTextFieldStyle, contentWidth } from '@/util/mui';
import contactBgImage from "@/assets/branded/images/contact/background.png";
import illustrationMailImage from "@/assets/branded/images/contact/illustrationMail.png";
import useMediaQuery from '@mui/material/useMediaQuery';

// import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';


const formSchema = yup.object({
    name: yup.string().required().min(2).trim().label("Name"),

    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    // .matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, "Please enter a valid email address.")
    .trim().label("Email Address"),

    message: yup.string().required().min(5, "Please enter a meaningful message.").trim().label("Message"),
});

  

function Contact() {
    const theme = useTheme();
    // const isMediumScreen = useMediaQuery('(min-width: 960px)');
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
         
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
        handleSubmit, register, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onChange', reValidateMode: 'onChange' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ''
        });
        const data2db = {
            subject: " ",
            name: formData.name,
            email: formData.email,
            msg: formData.message
        };

        try {
            const response = (await axios.post(`${apiEndpoint}/newsLetter/contact-us`, data2db )).data;
            // console.log(response);
            
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

            reset();
            
        } catch (error: any) {
            const err = error.response.data;
            // console.log(err);

            setApiResponse({
                display: true,
                status: false,
                message: err.message || "Oooops, failed to send message. please try again."
            });

            setToastNotification({
                display: true,
                status: "error",
                message: err.message || "Oooops, failed to send message. please try again."
            });
        }
    }

    const formContent = (
        <Box
            sx={{
                width: "100%",
                maxWidth: "259px",
                mx: "auto"
            }}
        >
            <Typography variant="h1" component="h1"
                sx={{
                    fontFamily: "Nohemi",
                    fontWeight: "600",
                    fontSize: {xs: "35px", md: "40px"},
                    lineHeight: {xs: "35.16px", md: "40.18px"},
                    // my: {xs: 1, md: 2.5},
                    color: {xs: colors.milk, md: "#6C6050"},
                }}
            > Let us talk </Typography>

            <Typography variant='body1'
                sx={{
                    fontFamily: "Geist",
                    fontWeight: "300",
                    fontSize: {xs: "13px", md: "13px"},
                    lineHeight: {xs: "16.12px", md: "16.12px"},
                    color: "#6C6050"
                }}
            >
                Do you have any questions or complaints you would like to talk to us about?
            </Typography>

            <Box sx={{ mt: "30px" }}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) }>

                    <Box>
                        <Typography variant="h4" component="h4"
                            sx={{
                                fontFamily: "Geist",
                                fontWeight: "600",
                                fontSize: {xs: "13px", md: "13px"},
                                lineHeight: {xs: "16.12px", md: "16.12px"},
                                // my: {xs: 1, md: 2.5},
                                color: "#686868",
                                mb: "12px"
                            }}
                        > Your name </Typography>

                        <TextField variant="outlined" fullWidth 
                            id="name" 
                            label="" 
                            inputMode="text" 
                            type="text"
                            defaultValue=""
                            error={ errors.name ? true : false }
                            { ...register('name') }
                            InputLabelProps={{
                                // style: { color: '#c1c1c1', fontWeight: "400" },
                            }}
                            sx={{
                                ...contactMuiTextFieldStyle,
                            }}
                        />

                        <Box sx={{fontSize: 13, color: "red"}}>{ errors.name?.message}</Box>
                    </Box>

                    <Box my={"24px"}>
                        <Typography variant="h4" component="h4"
                            sx={{
                                fontFamily: "Geist",
                                fontWeight: "600",
                                fontSize: {xs: "13px", md: "13px"},
                                lineHeight: {xs: "16.12px", md: "16.12px"},
                                // my: {xs: 1, md: 2.5},
                                color: "#686868",
                                mb: "12px"
                            }}
                        > Your email </Typography>

                        <TextField variant="outlined" fullWidth 
                            id="email" label="" 
                            inputMode="email" type="email"
                            error={ errors.email ? true : false }
                            { ...register('email')}
                            InputLabelProps={{
                                // style: { color: '#c1c1c1' },
                            }}
                            sx={{
                                ...contactMuiTextFieldStyle,
                            }}
                        />

                        <Box sx={{fontSize: 13, color: "red"}}>{ errors.email?.message}</Box>
                    </Box>

                    <Box>
                        <Typography variant="h4" component="h4"
                            sx={{
                                fontFamily: "Geist",
                                fontWeight: "600",
                                fontSize: {xs: "13px", md: "13px"},
                                lineHeight: {xs: "16.12px", md: "16.12px"},
                                // my: {xs: 1, md: 2.5},
                                color: "#686868",
                                // mb: "12px"
                            }}
                        > Your message </Typography>
                        
                        <TextField variant="outlined" fullWidth 
                            id="message" label="" 
                            multiline rows={5}
                            inputMode="text" type="text"
                            placeholder=""
                            error={ errors.message ? true : false }
                            { ...register('message')}
                            InputLabelProps={{
                                // style: { color: '#c1c1c1' },
                            }}
                            sx={{
                                ...contactMuiTextFieldStyle,
                            }}
                        />
                        
                        <Box sx={{fontSize: 13, color: "red"}}>{ errors.message?.message}</Box>
                    </Box>

                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }

                    <Box mt={{xs: "45px", md: "unset"}}>
                        <Button variant="outlined" 
                            fullWidth type="submit" 
                            disabled={ !isValid || isSubmitting } 
                            sx={{ 
                                bgcolor: {xs: colors.primary, md: colors.dark},
                                color: colors.milk,
                                padding: {xs: "9.05px 36.19px", md: "10px 40px" },

                                borderRadius: "12px",
                                my: 2,
                                textTransform: "unset"
                            }}
                        >
                            <Typography variant='body1' component="span" 
                                sx={{ 
                                    display: isSubmitting ? "none" : "initial",
                                    color: colors.milk,
                                    fontFamily: "Nohemi",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    lineHeight: "13.06px",
                                    textAlign: "Center",
                                }}
                            >Send Message</Typography>
                            
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.milk, fontWeight: "bold" }} />
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );

    
    return (
        <Box bgcolor={colors.dark} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>

                {
                    mdMatches ?  
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "926.38px",
                                height: "100%",
                                maxHeight: "603.39px",
                                backgroundImage: `url(${contactBgImage})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                                // backgroundPosition: 'center',
                            }}
                        >
                            <Box 
                                sx={{ 
                                    pl: {md: "21%", lg: "15%"},
                                    // pr: {md: "21%", lg: "15%"},
                                    py: "40px",
                                }}
                            >

                                <Grid container>
                                    <Grid item xs={12} md={8}>
                                        { formContent }
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box 
                                            sx={{ 
                                                display: {xs: "none", md: "block"},
                                                // bgcolor: "green",
                                                width: "100%",
                                                height: "100%",
                                                position: "relative"
                                            }}
                                        >
                                            <Stack height="100%" width="100%">
                                                <Box 
                                                    sx={{
                                                        position: "absolute",
                                                        top: "105px"
                                                    }}
                                                >
                                                    <img src={illustrationMailImage}
                                                        alt='illustration mail image for contact us page'
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "364.5px",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                </Box>

                                                <Box sx={{mt: "auto", mb: "50px", width: "100%" }}>
                                                    <Box sx={{ display: "flex", gap: "15px" }}>
                                                        {/* <FacebookIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} /> */}

                                                        <a href="https://x.com/soundmuve/" target='_blank' >
                                                            <TwitterIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>

                                                        {/* <LinkedInIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} /> */}

                                                        <a href="https://www.instagram.com/soundmuve/" target='_blank' >
                                                            <InstagramIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
                            
                            </Box>
                        </Box>
                    : formContent
                }

            </Box>

            <FooterComponent />

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification({ ...toastNotification, display: false})}
            />
        </Box>
    )
}

export default Contact;