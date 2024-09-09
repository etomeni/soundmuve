import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import WestIcon from '@mui/icons-material/West';

import { apiEndpoint } from '@/util/resources';
import resetPasswordImg from "@/assets/branded/images/auth/newPassword.png";
import SnackbarToast, { SnackbarToastInterface } from '@/components/ToastNotification';
import { useUserStore } from '@/state/userStore';
import colors from '@/constants/colors';
import { authMuiTextFieldStyle } from '@/util/mui';


const formSchema = yup.object({
    email: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Email Address")
});

  
function ForgotPasswordDesktopComponent() {
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
        <Box bgcolor="#FFFFFF" minHeight="100vh">

            <Container>
                <Box sx={{
                    py: {xs: 5, sm: 10, md: 10},
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

                        <WestIcon onClick={() => navigate(-1)} 
                            sx={{ textAlign: "left", alignSelf: "start", display: "block", cursor: "pointer" }} 
                        />
                        
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

                        <Typography variant='h2' component="h2" sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "900",
                            fontSize: {xs: "35px", md: "40px"},
                            lineHeight: {xs: "49.28px", md: "18px"},
                            letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                            mb: 3,
                            mt: "30px"
                        }}> Reset Password </Typography>

                        <Typography variant='body1' sx={{
                            fontFamily: "Geist",
                            fontWeight: "300",
                            fontSize: {xs: "16px", md: "24px"},
                            lineHeight: {xs: "26.5px", md: "34.6px"},
                            letterSpacing: {xs: "-0.09px", md: "-0.14px"},
                            textAlign: "center",
                            maxWidth: {xs: "284px", md: "466px"},
                            mx: "auto",
                            color: "#7B7979"
                        }}>
                            Please enter an email adddress to recieve verification code
                        </Typography>


                        <Box sx={{ py: 2 }}>
                            <Typography variant='body1' sx={{
                                fontWeight: "400",
                                fontSize: "17.84px",
                                lineHeight: "44.6px",
                                letterSpacing: "-0.14px",
                                textAlign: "left"
                            }}> Email Address </Typography>

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
                                sx={{
                                    ...authMuiTextFieldStyle
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
                                bgcolor: "#0B0B0B",
                                color: "#fff",
                                maxWidth: "335px",
                                "&.Mui-disabled": {
                                    background: "#c4c4c4",
                                    bgcolor: "#c4c4c4",
                                    color: "#797979"
                                },
                                "&:hover": {
                                    bgcolor: "#0B0B0B"
                                },
                                "&:active": {
                                    bgcolor: "#0B0B0B"
                                },
                                "&:focus": {
                                    bgcolor: "#0B0B0B"
                                },
                                borderRadius: "12px",
                                my: 2, 
                                py: 1.5
                            }}
                        >
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Send</span>
                            <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                        </Button>

                    </form>
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

export default ForgotPasswordDesktopComponent;
