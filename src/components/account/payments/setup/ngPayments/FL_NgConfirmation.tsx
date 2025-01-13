import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { getQueryParams } from '@/util/resources';
import { paymentTextFieldStyle } from '@/util/mui';
import { ngPaymentFormSchema, ngPaymentsInterface } from './FL_NgPayments';
import colors from '@/constants/colors';
import PaymentModalWrapper from '../../PaymentWrapper';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';
import { savePayoutDetailsInterface } from '@/typeInterfaces/payout.interface';
import { getCurrencyByCode } from '@/util/currencies';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    saveBtn: () => void;
    formDetails: ngPaymentsInterface
}


const FL_NgConfirmationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {

    const {
        apiResponse, setApiResponse,
        saveBankPayoutDetails,
    } = usePayoutData()
    
    useEffect(() => {
        if (!openModal) {
            reset()
        }
    }, [openModal]);

    const {
        handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(ngPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    // const onSubmit = async (formData: ngPaymentsInterface) => {
    const onSubmit = async (_formData: any) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const currency = getQueryParams('currency');
        const currencyData = getCurrencyByCode(currency);

        const data2db: savePayoutDetailsInterface = {
            currency: currencyData ? currencyData : {
                currency_code: currency,
                currency_name: "",
                currency_symbol: ""
            },
            paymentMethod: 'Bank',
            // beneficiary_email: formData.email,
            bank_name: formDetails.bankName,
            bank: formDetails.bank,
            account_number: formDetails.accountNumber,
            beneficiary_name: formDetails.beneficiaryName
        }

        const result = await saveBankPayoutDetails(data2db);
        if (result) saveBtn();
    }


    return (
        <PaymentModalWrapper // title='Set up bank payout'
            closeModal={closeModal}
            openModal={openModal}
            poweredBy='Flutterwave'
        >
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
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
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
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.bankName || formDetails.bank}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
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
                                    type='number'
                                    inputMode='numeric'
                                    label=''
                                    defaultValue={formDetails.accountNumber}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.accountNumber ? true : false }
                                    { ...register('accountNumber') }
                                />
                                { errors.accountNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountNumber?.message }</Box> }

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
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                            <CircularProgress size={25} 
                                sx={{ 
                                    display: isSubmitting ? "initial" : "none", 
                                    color: colors.primary,
                                    fontWeight: "bold" 
                                }} 
                            />
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
                        Every detail provided would be used to process your payout 
                    </Typography>

                </form>
            </Box>
        </PaymentModalWrapper>
    )
}

export default FL_NgConfirmationModalComponent
;