import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

// import { useSettingStore } from '@/state/settingStore';

import { paymentTextFieldStyle, submitBtnStyle } from '@/util/mui';

import { useUserStore } from '@/state/userStore';
import { apiEndpoint } from '@/util/resources';
import colors from '@/constants/colors';
import ModalWrapper from '@/components/account/ModalWrapper';
import SuccessModalComponent from './SuccessModal';


const formSchema = yup.object({
    youtubeLink: yup.string().required().trim().label("Youtube Link"),
    instagramFacebookLink: yup.string().required().trim().label("Instagram/Facebook link"),
    xLink: yup.string().required().trim().label("X link"),
});

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    // confirmBtn: (data: any) => void;
}


const DiscountApplicationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, // confirmBtn
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    // const outerTheme = useTheme();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const [successModalState, setSuccessModalState] = useState(false)

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });



    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);

        try {
            const response = (await axios.post(`${apiEndpoint}/xxxx/xxxxxx`,
                formData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )).data;
            console.log(response);
            // setBanks(response.data);

            setSuccessModalState(true);

            // confirmBtn(response)
            
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            console.error(errorResponse);
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
                closeModal={() => setSuccessModalState(false)}
                openModal={successModalState}
            />
        </>
    )
}

export default DiscountApplicationModalComponent;