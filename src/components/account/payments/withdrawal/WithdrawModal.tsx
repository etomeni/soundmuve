import React, { useEffect, useState } from 'react';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

// import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import { 
    releaseSelectStyle2, paymentTextFieldStyle
} from '@/util/mui';
// import { getSupportedCurrency } from '@/util/currencies';
import { currencyDisplay, isNumeric } from '@/util/resources';
import colors from '@/constants/colors';
import PaymentModalWrapper from '../PaymentWrapper';
import LoadingDataComponent from '@/components/LoadingData';
import { getCurrencySymbol } from '@/util/currencies';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';
import { allNgBanks } from '@/util/banks';
import { withdrawInterface } from '@/typeInterfaces/transaction.interface';


const formSchema = yup.object({
    amount: yup.string().required().trim().label("Account Number"),
    narration: yup.string().required().label("Narration"),
});

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: withdrawInterface) => void;
}

const WithdrawModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {
    const [errorMsg, setErrorMsg] = useState('');

    const defaultExchangeRate = {
        destination: {
            amount: 0,
            currency: ''
        },
        rate: 0,
        source: {
            amount: 0,
            currency: ''
        }
    };

    const { 
        apiResponse, setApiResponse,

        paymentDetails, selectedPaymentDetails, 
        setSelectedPaymentDetails, getPayoutInfo,

        exchangeData, getExchangeRate, setExchangeData,
    } = usePayoutData();


    useEffect(() => {
        if (!openModal) {
            reset();

            if (exchangeData) {
                setExchangeData({
                    ...exchangeData,
                    source: {
                        amount: 0,
                        currency: exchangeData?.source.currency
                    }
                });
            }
        } else {
            getPayoutInfo();
        }
    }, [openModal]);

    const {
        handleSubmit, register, getValues, setValue, reset, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const displayExchange = (enteredAmount: string = '') => {
        if (selectedPaymentDetails) {
            const payoutData = paymentDetails?.filter(data => data._id == selectedPaymentDetails);

            const amount = enteredAmount ? enteredAmount : getValues().amount || '0';
            
            if (exchangeData) {
                const calculatedAmount = Number(enteredAmount || 0) * exchangeData?.rate;
                
                setExchangeData({
                    ...exchangeData,
                    source: {
                        amount: calculatedAmount,
                        currency: exchangeData?.source.currency
                    }
                });
            }

            getExchangeRate( amount, payoutData ? payoutData[0].currency.currency_code : '' );
        }
    }

    const displayCurrencySymbol = () => {
        if (selectedPaymentDetails) {
            const payoutData = paymentDetails?.filter(data => data._id == selectedPaymentDetails);

            return getCurrencySymbol(payoutData ? payoutData[0].currency.currency_code : '');
        }

        return '';
    }

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        if (!selectedPaymentDetails) {
            setErrorMsg("Please select your preffered currency.");
            return;
        }
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        // const payoutData = paymentDetails?.filter(data => data._id == selectedPaymentDetails);
        const payoutData = paymentDetails?.find(data => data._id == selectedPaymentDetails);

        confirmBtn({
            ...formData, 
            currency: payoutData ? payoutData.currency.currency_code : '',
            paymentDetails: payoutData,
            exchangeRate: exchangeData || defaultExchangeRate
        });
    }


    const resolveAccountName = (bankName: string) => {
        if (isNumeric(bankName)) {
            // Use the filter method to find the object with the matching code
            const result = allNgBanks.filter(obj => obj.code == bankName);
            // If a match is found, return the first object
            if (result.length > 0) return result[0].name;
            return bankName
        }

        return bankName || ''
    }

    const noPaymentDetails = (
        <Box>
            <Typography variant='h4'
                sx={{
                    fontWeight: "900",
                    fontSize: {xs: "20px", md: "35px"},
                    lineHeight: {xs: "20px", md: "24px"},
                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                    textAlign: "center",
                    // mt: 2
                }}
            > No Payment Details </Typography>

            <Typography variant='body1'
                sx={{
                    textAlign: 'center',
                    my: 2
                }}
            > Please setup your payment details to countinue. </Typography>

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
                    fullWidth type="button" 
                    onClick={() => changeMethod()}
                    sx={{ 
                        bgcolor: colors.primary,
                        borderRadius: "17px",
                        color: colors.milk,
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
                        textTransform: "none"
                    }}
                > Setup Payment method </Button>
            </Box>
        </Box>
    );


    return (
        <PaymentModalWrapper title=''
            closeModal={closeModal}
            openModal={openModal}
            // poweredBy=''
        >
            <Box id="payout-modal-description" sx={{mt: 5}}>
                {
                    paymentDetails ? (
                        paymentDetails.length ? (
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                                <Box>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}> Payment Details </Typography>

                                    <FormControl fullWidth>
                                        <Select
                                            id="currency-select"
                                            label=""
                                            value={selectedPaymentDetails}
                                            // defaultValue={selectedCurrency}

                                            sx={releaseSelectStyle2}
                                            error={ errorMsg.length ? true : false }
                                            onChange={(e) => {
                                                setSelectedPaymentDetails(e.target.value);
                                                setErrorMsg('');
                                                displayExchange();
                                            }}
                                        >
                                            { paymentDetails.map((payoutData, index) => (
                                                <MenuItem key={index} value={ payoutData._id }
                                                    title={ payoutData.account_number }
                                                >
                                                    <Box>
                                                        <Typography variant='body1'>
                                                            { payoutData.paymentMethod }
                                                            &nbsp;
                                                            { payoutData.currency.currency_code } 
                                                            ({ payoutData.currency.currency_symbol })
                                                             -&nbsp;
                                                            { payoutData.account_number || payoutData.beneficiary_email || ' ' } 
                                                            { payoutData.beneficiary_name ? ` (${ payoutData.beneficiary_name })` : '' }
                                                        </Typography>

                                                        <Typography variant='body1'>
                                                            { resolveAccountName(payoutData.bank_name || "") } 
                                                        </Typography>
                                                    </Box>
                                                </MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>

                                    { errorMsg && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errorMsg }</Box> }
                                </Box>

                                <Box>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}> Amount </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='amount'
                                        type='number'
                                        inputMode='numeric'
                                        label=''
                                        defaultValue=""
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                { displayCurrencySymbol() }
                                            </InputAdornment>,
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}

                                        sx={paymentTextFieldStyle}
                                        
                                        error={ errors.amount ? true : false }
                                        // { ...register('amount') }

                                        onChange={(e) => {
                                            console.log();
                                            const value = e.target.value;
                                            setValue("amount", value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                            displayExchange(value);
                                        }}
                                    />
                                    { 
                                        exchangeData ? (
                                            <Typography variant='body2'
                                            > { currencyDisplay(Number(exchangeData.source.amount)) } </Typography>
                                        ) : <></>
                                    }

                                    { errors.amount && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.amount?.message }</Box> }
                                </Box>

                                <Box mt={2}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px"
                                    }}> Narration </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='narration'
                                        type='text'
                                        inputMode='text'
                                        label=''
                                        defaultValue=""
                                        
                                        sx={paymentTextFieldStyle}
                                        
                                        error={ errors.narration ? true : false }
                                        { ...register('narration') }
                                    />
                                    { errors.narration && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.narration?.message }</Box> }
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
                                            bgcolor: colors.primary,
                                            borderRadius: "17px",
                                            color: colors.milk,
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
                                            textTransform: "none"
                                        }}
                                    >
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Confirm</span>
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
                                    onClick={() => changeMethod()}
                                    sx={{
                                        fontWeight: '400',
                                        fontSize: '14px',
                                        // lineHeight: '8px',
                                        letterSpacing: '-0.31px',
                                        textAlign: 'center',
                                        cursor: "pointer",
                                        bgcolor: "#FDFDCC",
                                        p: "5px 10px",
                                        width: "fit-content",
                                        mx: "auto"
                                    }}
                                >Add other payment method</Typography>

                            </form>
                        ) : noPaymentDetails
                    ) : (
                        <Box>
                            <LoadingDataComponent />
                        </Box>
                    )
                }
            </Box>
        </PaymentModalWrapper>
    )
}

export default WithdrawModalComponent;