import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { apiEndpoint } from '../util/resources';
import colors from '@/constants/colors';
import { contactMuiTextFieldStyle } from '@/util/mui';
import { useSettingStore } from '@/state/settingStore';


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


interface myProps {
    btnColor?: string;
    placeholderDisplay?: boolean;
    isModalView?: boolean;
};

const ContactUsComponent: React.FC<myProps> = ({
    placeholderDisplay = false, btnColor, isModalView = false

}) => {
    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    const _setToastNotification = useSettingStore((state) => state._setToastNotification);

    const { 
        handleSubmit, register, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onChange', reValidateMode: 'onChange' });

        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse({
            display: false,
            status: true,
            message: ''
        });

        try {
            const response = (await axios.post(`${apiEndpoint}/contact/contact-us`, formData )).data;
            // console.log(response);

            // setApiResponse({
            //     display: true,
            //     status: true,
            //     message: response.message
            // });
            _setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            reset();
            
        } catch (error: any) {
            const err = error.response.data || error;
            // console.log(err);
            const fixedErrorMsg = "Oooops, failed to send message. please try again.";

            // setApiResponse({
            //     display: true,
            //     status: false,
            //     message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            // });

            _setToastNotification({
                display: true,
                status: "error",
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }
    }

    return (
        <Box>
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
                        color: isModalView ? "#6C6050" : {xs: colors.milk, md: "#6C6050"},
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

                                    '& .MuiInputBase-input': { // Target input text
                                        color: colors.dark,
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        lineHeight: 1.5,
                                        bgcolor: isModalView ? "#F1F1D6" : {xs: "#2E2E2E", md: "#F1F1D6"},
                                        borderRadius: '12px',
                                        // padding: "15px",
                                    },
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
                                    '& .MuiInputBase-input': { // Target input text
                                        color: colors.dark,
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        lineHeight: 1.5,
                                        bgcolor: isModalView ? "#F1F1D6" : {xs: "#2E2E2E", md: "#F1F1D6"},
                                        borderRadius: '12px',
                                        // padding: "15px",
                                    },
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
                                placeholder={ placeholderDisplay ? "Type your message here..." : '' } 
                                error={ errors.message ? true : false }
                                { ...register('message')}
                                InputLabelProps={{
                                    // style: { color: '#c1c1c1' },
                                }}
                                sx={{
                                    ...contactMuiTextFieldStyle,

                                    '& .MuiInputBase-input': { // Target input text
                                        color: colors.dark,
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                        lineHeight: 1.5,
                                        bgcolor: isModalView ? "#F1F1D6" : {xs: "#2E2E2E", md: "#F1F1D6"},
                                        borderRadius: '12px',
                                        // padding: "15px",
                                    },
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
                                    bgcolor: btnColor ? btnColor : {xs: colors.primary, md: colors.dark},
                                    color: colors.milk,
                                    // border: 'none',

                                    "&.Mui-disabled": {
                                        // background: colors.secondary,
                                        // color: "#797979"
                                    },
                                    "&:hover": {
                                        bgcolor: colors.primary,
                                        borderColor: colors.primary,
                                    },
                                    "&:active": {
                                        bgcolor: colors.primary,
                                        borderColor: colors.primary,
                                    },
                                    "&:focus": {
                                        bgcolor: colors.primary,
                                        borderColor: colors.primary,
                                    },

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
        </Box>
    )
}

export default ContactUsComponent