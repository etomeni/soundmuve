import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';

import { apiEndpoint } from '@/util/resources';
import { customTextFieldTheme, MuiTextFieldStyle } from '@/util/mui';
import { flutterwavePaymentDetailsInterface } from '@/constants/typesInterface';

const formSchema = yup.object({
    bank: yup.string().required().min(2, "Please enter a valid bank name").trim().label("Bank"),
    accountNumber: yup.string().required().min(10).max(10).trim().label("Account Number"),
    accountName: yup.string().trim().label("Account Name"),

    currency: yup.string().required().min(2).trim().label("Currency"),

    countryCode: yup.string().min(2).trim().label("country dial code"),

    // verificationNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),
    verificationNumber: yup.string().required().trim().label("Phone Number"),
});


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    // changeMethod: () => void;
    saveBtn: () => void;
    formDetails: flutterwavePaymentDetailsInterface
}


const PayoutSetFlutterwaveConfirmationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
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
        console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        saveBtn();

        return;

        try {
            const response = (await axios.post(`${apiEndpoint}/payouts/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setBanks(response.data);

            saveBtn();

            
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }


    }




    return (
        <Modal
            open={openModal}
            onClose={() => closeModal() }
            aria-labelledby="payout-modal-title"
            aria-describedby="payout-modal-description"
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    outline: "none",
                }}
            >
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000",
                        overflow: "scroll"
                    }}
                >
                    <Box  id="payout-modal-title">
                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Box>

                        <Box sx={{textAlign: 'center'}}>
                            <img
                                src={FlutterwaveLogo2} alt='Flutterwave Logo Image'
                                style={{
                                    objectFit: "contain",
                                    width: "60%"
                                }}
                            />
                        </Box>

                        <Typography variant='body2'
                            sx={{
                                fontWeight: '800',
                                fontSize: '12px',
                                textAlign: 'center'
                            }}
                        >Confirm payout details</Typography>
                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 5}}>

                        <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Bank </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='bank'
                                                type='text'
                                                label=''
                                                inputMode='text'
                                                defaultValue={formDetails.bank}
                                                // value={formDetails.bank}
                                                // disabled
                                                // placeholder='Account Name(automatically generated)'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    readOnly: true,
                                                }}


                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        "& .MuiInputBase-input.Mui-disabled::placeholder": {
                                                            color: "gray",
                                                            opacity: 0.8,
                                                            // "-webkit-text-fill-color": "gray",
                                                            // WebkitTextFillColor: "gray",
                                                        },
                                                    },
                                                }}
                                                
                                                error={ errors.bank ? true : false }
                                                { ...register('bank') }
                                            />
                                            { errors.bank && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bank?.message }</Box> }

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Account Number </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='accountNumber'
                                                type='text'
                                                inputMode='numeric'
                                                label=''
                                                defaultValue={formDetails.accountNumber}
                                                // disabled
                                                // placeholder='Account Name(automatically generated)'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    readOnly: true,
                                                }}

                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        "& .MuiInputBase-input.Mui-disabled::placeholder": {
                                                            color: "gray",
                                                            opacity: 0.8,
                                                            // "-webkit-text-fill-color": "gray",
                                                            // WebkitTextFillColor: "gray",
                                                        },
                                                    },
                                                }}
                                                
                                                error={ errors.accountNumber ? true : false }
                                                { ...register('accountNumber') }
                                            />
                                            { errors.accountNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountNumber?.message }</Box> }

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Account Name </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='accountNumber'
                                                type='text'
                                                inputMode='text'
                                                label=''
                                                defaultValue={formDetails.accountName}
                                                // disabled
                                                // placeholder='Account Name(automatically generated)'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    readOnly: true,
                                                }}

                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        "& .MuiInputBase-input.Mui-disabled::placeholder": {
                                                            color: "gray",
                                                            opacity: 0.8,
                                                            // "-webkit-text-fill-color": "gray",
                                                            // WebkitTextFillColor: "gray",
                                                        },
                                                    },
                                                }}
                                                
                                                error={ errors.accountName ? true : false }
                                                { ...register('accountName') }
                                            />
                                            { errors.accountName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountName?.message }</Box> }

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Currency </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='currency'
                                                type='text'
                                                inputMode='text'
                                                label=''
                                                defaultValue={formDetails.currency}
                                                // disabled
                                                // placeholder='Account Name(automatically generated)'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    readOnly: true,
                                                }}

                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        '& fieldset.MuiOutlinedInput-notchedOutline': {
                                                            borderColor: darkTheme ? '#fff' : "#000",
                                                        },
                                                        // '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        // "&.Mui-focused fieldset": {
                                                        //     borderColor: darkTheme ? '#fff' : '#000',
                                                        // },
                                                        "& .MuiInputBase-input.Mui-disabled::placeholder": {
                                                            color: "gray",
                                                            opacity: 0.8,
                                                            // "-webkit-text-fill-color": "gray",
                                                            // WebkitTextFillColor: "gray",
                                                        },
                                                    },
                                                }}
                                                
                                                error={ errors.currency ? true : false }
                                                { ...register('currency') }
                                            />
                                            { errors.currency && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.currency?.message }</Box> }

                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: "400",
                                                fontSize: "15.38px",
                                                lineHeight: "38.44px",
                                                letterSpacing: "-0.12px",
                                                textAlign: "left"
                                            }}> Verification Number </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Box>
                                            <TextField 
                                                variant="outlined" 
                                                fullWidth 
                                                id='verificationNumber'
                                                type='tel'
                                                label=''
                                                inputMode='tel'
                                                defaultValue={`${formDetails.countryCode} ${formDetails.verificationNumber}`}
                                                // placeholder='Used to inform you when transactions are being made on your account'
                                                InputLabelProps={{
                                                    style: { color: '#c1c1c1', fontWeight: "400" },
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "16px",
                                                    },
                                                    readOnly: true,
                                                }}

                                                sx={{
                                                    ...MuiTextFieldStyle(darkTheme),
                                                    '& .MuiOutlinedInput-root': {
                                                        pl: 0.5,
                                                        pr: 0,
                                                        overflow: 'hidden'
                                                    }
                                                }}
                                                
                                                error={ errors.verificationNumber ? true : false }
                                                { ...register('verificationNumber') }
                                            />

                                            { errors.verificationNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.verificationNumber?.message }</Box> }
                                        </Box>
                                    </Grid>
                                </Grid>


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
                                            bgcolor: darkTheme ? "#fff" : "#272727",
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
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:active": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },
                                            "&:focus": {
                                                bgcolor: darkTheme ? "#fff" : "#272727",
                                            },

                                            fontWeight: '700',
                                            fontSize: "12px",
                                            lineHeight: "12px",
                                            // letterSpacing: "-0.13px",
                                            // textAlign: 'center',
                                            color: darkTheme ? "#000" : "#fff",
                                            textTransform: "none"
                                        }}
                                    >
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                                        <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
                                    </Button>
                                </Box>

                                <Typography variant='body2'
                                    // onClick={() => changeMethod()}
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        // lineHeight: '8px',
                                        letterSpacing: '-0.31px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <span style={{ fontWeight: 'bold' }}>Note: </span>
                                    Every detail provides would be used to process your pay out 
                                </Typography>

                            </form>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PayoutSetFlutterwaveConfirmationModalComponent;