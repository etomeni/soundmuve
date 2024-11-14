import React, { useState } from 'react';

import axios from 'axios';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paymentTextFieldStyle, submitBtnStyle } from '@/util/mui';

import { useUserStore } from '@/state/userStore';
import { apiEndpoint } from '@/util/resources';
import colors from '@/constants/colors';
import ModalWrapper from '@/components/account/ModalWrapper';
import SuccessModalComponent from './SuccessModal';
import { cartItemInterface } from '@/typeInterfaces/cartInterface';


const formSchema = yup.object({
    youtubeLink: yup.string().required().trim().label("Youtube Link"),
    instagramFacebookLink: yup.string().required().trim().label("Instagram/Facebook link"),
    xLink: yup.string().required().trim().label("X link"),
});

interface _Props {
    cartItems: cartItemInterface[],
    openModal: boolean,
    closeModal: () => void;
    // confirmBtn: (data: any) => void;
}

const DiscountApplicationModalComponent: React.FC<_Props> = ({
    cartItems, openModal, closeModal, // confirmBtn
}) => {
    const userData = useUserStore((state) => state.userData);
    const accessToken = useUserStore((state) => state.accessToken);
    const [successModalState, setSuccessModalState] = useState(false)

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
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
        
        const data2db = {
            cartItems,
            user_name: userData.firstName + " " + userData.lastName,
            youtubeLink: formData.youtubeLink,
            instagramFacebookLink: formData.instagramFacebookLink,
            xLink: formData.xLink,
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/checkout/discount-application`,
                data2db, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            // console.log(response);
            // setBanks(response.data);

            if (response.status) {
                setSuccessModalState(true);
                return;
            }


            setApiResponse({
                display: true,
                status: false,
                message: response.message
            })
        } catch (error: any) {
            console.log(error);
            const err = error.response.data || error;
            const fixedErrorMsg = "Oooops, something went wrong";

            setApiResponse({
                display: true,
                status: false,
                message: err.errors && err.errors.length ? err.errors[0].msg : err.message || fixedErrorMsg
            });
        }

    }


    return (
        <>
            <ModalWrapper
                closeModal={closeModal}
                openModal={openModal}
            >
                <Box id="payout-modal-title">
                    <Typography variant='h2'
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "", md: "24px"},
                            lineHeight: {xs: "", md: "24px"},
                            letterSpacing: {xs: "", md: "-0.91px"},
                            textAlign: "center",
                            color: colors.dark
                        }}
                    >
                        Get up to 100% discount when 
                        releasing either your single or album
                    </Typography>

                    <Typography variant='subtitle1'
                        sx={{
                            fontWeight: "300",
                            fontSize: {xs: "", md: "16px"},
                            lineHeight: {xs: "", md: "16px"},
                            letterSpacing: {xs: "", md: "-0.13px"},
                            textAlign: "center",
                            color: colors.dark,
                            // mt: "14px"
                        }}
                    >
                        Please impute the following details to proceed
                    </Typography>
                </Box>

                <Box id="payout-modal-description" sx={{mt: 2}}>

                    <form noValidate onSubmit={ handleSubmit(onSubmit) } >
                        <Box>
                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "15.38px",
                                lineHeight: "38.44px",
                                letterSpacing: "-0.12px",
                                textAlign: "left"
                            }}> Youtube Link </Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='youtubeLink'
                                type='text'
                                inputMode='text'
                                defaultValue=""
                                sx={paymentTextFieldStyle}
                                error={ errors.youtubeLink ? true : false }
                                { ...register('youtubeLink') }
                            />

                            { errors.youtubeLink && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.youtubeLink?.message }</Box> }
                        </Box>

                        <Box>
                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "15.38px",
                                lineHeight: "38.44px",
                                letterSpacing: "-0.12px",
                                textAlign: "left"
                            }}> Instagram/Facebook link </Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='instagramFacebookLink'
                                type='text'
                                inputMode='text'
                                defaultValue=""
                                sx={paymentTextFieldStyle}
                                error={ errors.instagramFacebookLink ? true : false }
                                { ...register('instagramFacebookLink') }
                            />

                            { errors.instagramFacebookLink && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.instagramFacebookLink?.message }</Box> }
                        </Box>

                        <Box>
                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "15.38px",
                                lineHeight: "38.44px",
                                letterSpacing: "-0.12px",
                                textAlign: "left"
                            }}> X <small>(former Twitter)</small> Link </Typography>

                            <TextField 
                                variant="outlined" 
                                fullWidth 
                                id='xLink'
                                type='text'
                                inputMode='text'
                                defaultValue=""
                                sx={paymentTextFieldStyle}
                                error={ errors.xLink ? true : false }
                                { ...register('xLink') }
                            />

                            { errors.xLink && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.xLink?.message }</Box> }
                        </Box>

                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }
                        
                        <Box 
                            sx={{ 
                                my: 5,
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
                                    ...submitBtnStyle,
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Continue</span>
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
            </ModalWrapper>

            <SuccessModalComponent 
                closeModal={() => {
                    closeModal();
                    setSuccessModalState(false);
                }}
                openModal={successModalState}
            />
        </>
    )
}

export default DiscountApplicationModalComponent;