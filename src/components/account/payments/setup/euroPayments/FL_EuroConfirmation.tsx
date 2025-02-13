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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getQueryParams } from '@/util/resources';
import { paymentTextFieldStyle, releaseSelectStyle2 } from '@/util/mui';
import { euroPaymentFormSchema, euroPaymentsInterface } from './FL_Europayments';
import { restCountries } from '@/util/countries';
import colors from '@/constants/colors';
import PaymentModalWrapper from '../../PaymentWrapper';
import { getCurrencyByCode } from '@/util/currencies';
import { savePayoutDetailsInterface } from '@/typeInterfaces/payout.interface';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    saveBtn: () => void;
    formDetails: euroPaymentsInterface
}

const FL_EuroConfirmationModalComponent: React.FC<_Props> = ({
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
    } = useForm({ resolver: yupResolver(euroPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: euroPaymentsInterface) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const currency = getQueryParams('currency');
        const currencyData = getCurrencyByCode(currency);

        const data2db:savePayoutDetailsInterface = {
            currency: currencyData ? currencyData : {
                currency_code: currency,
                currency_name: "",
                currency_symbol: ""
            },
            paymentMethod: 'Bank',
            beneficiary_email: formData.email,
            account_number: formData.accountNumber,
            routing_number: formData.routingNumber,
            swift_code: formData.swiftCode,
            bank_name: formData.bankName,
            beneficiary_name: formData.beneficiaryName,
            beneficiary_country: formData.country,
            postal_code: formData.postalCode,
            street_number: formData.streetNumber,
            street_name: formData.streetName,
            city: formData.city
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
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.email ? true : false }
                                    { ...register('email') }
                                />
                                { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: "15.38px",
                                    lineHeight: "38.44px",
                                    letterSpacing: "-0.12px",
                                    textAlign: "left"
                                }}> Street number </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='streetNumber'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.streetNumber}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.streetNumber ? true : false }
                                    { ...register('streetNumber') }
                                />

                                { errors.streetNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.streetNumber?.message }</Box> }
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: "15.38px",
                                    lineHeight: "38.44px",
                                    letterSpacing: "-0.12px"
                                }}> Street name </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='streetName'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.streetName}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.streetName ? true : false }
                                    { ...register('streetName') }
                                />
                                { errors.streetName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.streetName?.message }</Box> }

                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: "15.38px",
                                    lineHeight: "38.44px",
                                    letterSpacing: "-0.12px"
                                }}> City </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='city'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.city}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.city ? true : false }
                                    { ...register('city') }
                                />
                                { errors.city && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.city?.message }</Box> }

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
                                }}> Country </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8}>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="country"
                                        id="country-select"
                                        label=""
                                        defaultValue={formDetails.country}
                                        readOnly={true}

                                        sx={releaseSelectStyle2}
                                        
                                        error={ errors.country ? true : false }
                                        { ...register('country') }
                                    >
                                        { restCountries.map((country, index) => (
                                            <MenuItem key={index} value={country.name.common}>
                                                <img src={country.flags.png} alt={country.flags.alt}
                                                    style={{
                                                        maxWidth: "20px",
                                                        marginRight: "10px"
                                                    }}
                                                />
                                                {country.name.common}
                                            </MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>

                                { errors.country && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.country?.message }</Box> }
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
                                }}> Routing Number </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8}>
                            <Box>
                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='routingNumber'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.routingNumber}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}

                                    error={ errors.routingNumber ? true : false }
                                    { ...register('routingNumber') }
                                />
                                { errors.routingNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.routingNumber?.message }</Box> }

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
                                }}> Bank Name </Typography>
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

                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.bankName ? true : false }
                                    { ...register('bankName') }
                                />

                                { errors.bankName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bankName?.message }</Box> }
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

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={4}>
                            <Box>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: "15.38px",
                                    lineHeight: "38.44px",
                                    letterSpacing: "-0.12px",
                                    textAlign: "left"
                                }}> Swift Code </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8}>
                            <Box>
                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='swiftCode'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.swiftCode}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.swiftCode ? true : false }
                                    { ...register('swiftCode') }
                                />
                                { errors.swiftCode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.swiftCode?.message }</Box> }

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
                                }}> Postal code </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={8}>
                            <Box>
                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='postalCode'
                                    type='text'
                                    inputMode='text'
                                    label=''
                                    defaultValue={formDetails.postalCode}
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                        readOnly: true,
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
                                    error={ errors.postalCode ? true : false }
                                    { ...register('postalCode') }
                                />
                                { errors.postalCode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.postalCode?.message }</Box> }

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

export default FL_EuroConfirmationModalComponent;