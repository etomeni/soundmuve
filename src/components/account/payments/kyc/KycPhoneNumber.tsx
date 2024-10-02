import React, { useState } from 'react'

import axios from 'axios';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import colors from '@/constants/colors';
import { paymentTextFieldStyle } from '@/util/mui';
import CircularProgress from '@mui/material/CircularProgress';
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';


const formSchema = yup.object({
    phoneNumber: yup.string().required().trim().label("Phone Number"),
});


interface _Props {
    // openModal: boolean,
    // closeModal: () => void;
    setPhoneNumber: (number: string) => void;
    handleCurrentView: (number: number) => void;
}

const KycPhoneNumber: React.FC<_Props> = ({
    setPhoneNumber, handleCurrentView
}) => {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);
        setPhoneNumber(formData.phoneNumber);

        const data2db = {
            email: userData.email,
            phoneNumber: formData.phoneNumber
        };
           
        try {
            const response = (await axios.post(`${apiEndpoint}/kyc/kyc/submit-phone`, data2db, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            handleCurrentView(2);
            // confirmBtn(formData);

        } catch (error: any) {
            const errorResponse = error.response.data || error;
            // console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });
        }
    }


    return (
        <Box my={2}>

            <Typography variant="h6" component="h2"
                sx={{
                    fontWeight: "900",
                    fontSize: {xs: "20px", md: "35px"},
                    lineHeight: {xs: "20px", md: "24px"},
                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                    textAlign: "center",
                    mb: 2,
                    color: colors.dark
                }}
            > Ready to set up your payment? </Typography>

            <Typography variant='body2'
                sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "16px", 
                    letterSpacing: "-0.341px",
                    color: colors.dark,
                    textAlign: "center",
                    mb: 2
                }}
            >
                Please answer the following KYC 
                questions to help us serve you better
            </Typography>

            <Box my={3}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) } >
                    <Box>
                        <Typography sx={{
                            fontWeight: "700",
                            fontSize: "14px",
                            lineHeight: "16px",
                            letterSpacing: "-0.34px",
                            textAlign: "left",
                            mb: 1
                        }}> Phone Number </Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id='phoneNumber'
                            type='tel'
                            inputMode='tel'
                            label=''
                            defaultValue=""
                            
                            InputProps={{
                                sx: {
                                    borderRadius: "16px",
                                },
                            }}

                            sx={paymentTextFieldStyle}
                            
                            error={ errors.phoneNumber ? true : false }
                            { ...register('phoneNumber') }
                        />

                        { errors.phoneNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.phoneNumber?.message }</Box> }
                    </Box>

                    <Typography variant='body2'
                        sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "16px", 
                            letterSpacing: "-0.341px",
                            color: colors.dark,
                            textAlign: "center",
                            my: 5,
                        }}
                    >
                        <b>Note: </b> please use a phone number you can easily remember
                    </Typography>


                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', my: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }

                    <Box 
                        sx={{ 
                            // my: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button variant="contained" 
                            fullWidth type="submit" 
                            disabled={ !isValid || isSubmitting } 
                            sx={{ 
                                bgcolor: colors.primary,
                                borderRadius: "17px",
                                // p: "10px 26px 10px 26px",
                                p: "16px 25px",
                                width: "fit-content",
                                height: "auto",
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

                                fontWeight: '700',
                                fontSize: "12px",
                                lineHeight: "12px",
                                // letterSpacing: "-0.13px",
                                // textAlign: 'center',
                                color: colors.milk,
                                textTransform: "none"
                            }}
                        >
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
                            <CircularProgress size={25} 
                                sx={{ 
                                    display: isSubmitting ? "initial" : "none", 
                                    color: colors.primary,
                                    fontWeight: "bold" 
                                }} 
                            />
                        </Button>
                    </Box>
                </form>
            </Box>


        </Box>
    )
}

export default KycPhoneNumber