import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
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

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';

import { apiEndpoint, getQueryParams } from '@/util/resources';
import { MuiTextFieldStyle } from '@/util/mui';
import { xfPaymentFormSchema, xfPaymentsInterface } from './FL_XfPayments';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    saveBtn: () => void;
    formDetails: xfPaymentsInterface
}


const FL_XfConfirmationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(xfPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: xfPaymentsInterface) => {
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const currency = getQueryParams('currency');
        const data2db = {
            email: userData.email,
            currency: currency || '',
            account_bank: formData.bankName,
            account_number: formData.accountNumber,
            // narration: "Freelance payment",
            destination_branch_code: formData.branchCode,
            beneficiary_name: formData.beneficiaryName
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/payoutDetails/payout-details`, data2db, {
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
                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 2}}>
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
                                        }}> Beneficiary Name </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={8}>
                                    <Box>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='beneficiaryName'
                                            type='text'
                                            inputMode='text'
                                            label=''
                                            defaultValue={formDetails.beneficiaryName}
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.beneficiaryName ? true : false }
                                            { ...register('beneficiaryName') }
                                        />
                                        { errors.beneficiaryName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.beneficiaryName?.message }</Box> }

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
                                        }}> Email </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={8}>
                                    <Box>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='email'
                                            type='email'
                                            inputMode='email'
                                            label=''
                                            defaultValue={formDetails.email}
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.email ? true : false }
                                            { ...register('email') }
                                        />
                                        { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

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
                                        }}> Destination branch code </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={8}>
                                    <Box>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='branchCode'
                                            type='text'
                                            inputMode='text'
                                            label=''
                                            defaultValue={formDetails.branchCode}
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.branchCode ? true : false }
                                            { ...register('branchCode') }
                                        />
                                        { errors.branchCode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.branchCode?.message }</Box> }

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
                                            type='number'
                                            inputMode='numeric'
                                            label=''
                                            defaultValue={formDetails.accountNumber}
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                        }}> Bank </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={8}>
                                    <Box>
                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='bankName'
                                            type='text'
                                            inputMode='text'
                                            label=''
                                            defaultValue={formDetails.bankName}
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}
                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.bankName ? true : false }
                                            { ...register('bankName') }
                                        />
                                        { errors.bankName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bankName?.message }</Box> }

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
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default FL_XfConfirmationModalComponent;