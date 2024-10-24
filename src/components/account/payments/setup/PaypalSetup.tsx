import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import colors from '@/constants/colors';
import PaymentModalWrapper from '../PaymentWrapper';
import TextField from '@mui/material/TextField';
import { paymentTextFieldStyle, // releaseSelectStyle2 
} from '@/util/mui';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import PaypalInfoTooltip from './PaypalInfoTooltip';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import { useUserStore } from '@/state/userStore';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';
import { savePayoutDetailsInterface } from '@/typeInterfaces/payout.interface';



const formSchema = yup.object({
    email: yup.string().required().trim().label("Email"),
    beneficiary_name: yup.string().required().trim().label("Beneficiary Name"),
    // currency: yup.string().trim().label("Currency"),
});

export type formInterface = typeof formSchema.__outputType;

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    confirmBtn: (data: formInterface) => void;
    changeMethod: () => void;
}

const PaypalSetupModalComponent: React.FC<_Props> = ({
    openModal, closeModal, confirmBtn, changeMethod
}) => {
    // const [selectedCurrency, setSelectedCurrency] = useState('');
    // const [errorMsg, setErrorMsg] = useState('');
    const userData = useUserStore((state) => state.userData);


    const {
        apiResponse, setApiResponse,
        saveBankPayoutDetails,

        // currencies,
        // getSupportedCurrencies
    } = usePayoutData();

    useEffect(() => {
        if (!openModal) {
            reset()
        }
    }, [openModal]);

    
    const {
        handleSubmit, register, reset, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });




    const onSubmit = async (formData: formInterface) => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        // if (!selectedCurrency || !formData.currency) {
        //     setApiResponse({
        //         display: true,
        //         status: false,
        //         message: "Please select a currency"
        //     });

        //     return;
        // }

        // confirmBtn(formData);

        const data2db: savePayoutDetailsInterface = {
            currency: {
                currency_code: "USD",
                currency_symbol: "$",
                currency_name: "United States Dollar"
            },
            paymentMethod: 'PayPal',
            beneficiary_email: formData.email,
            beneficiary_name: formData.beneficiary_name || userData.firstName + ' ' + userData.lastName,
            // currency: formData.currency || selectedCurrency,
        };

        const result = await saveBankPayoutDetails(data2db);
        if (result) confirmBtn(formData); // saveBtn();
    }


    return (
        <PaymentModalWrapper title='Set up PayPal'
            closeModal={closeModal}
            openModal={openModal}
            poweredBy='PayPal'
        >
            <Box id="payout-modal-description" sx={{mt: 5}}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> Paypal Email </Typography>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id='email'
                            type='email'
                            inputMode='email'
                            label=''
                            defaultValue=""
                            
                            // InputProps={{
                            //     sx: {
                            //         borderRadius: "16px",
                            //     },
                            // }}

                                   
                            InputProps={{
                                endAdornment: <PaypalInfoTooltip />,
                                sx: {
                                    borderRadius: "16px",
                                },
                            }}


                            sx={paymentTextFieldStyle}
                            
                            error={ errors.email ? true : false }
                            { ...register('email') }
                        />

                        {/* <PaypalInfoTooltip /> */}
                    </Stack>

                    { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                    <Box my={3}>

                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "15.38px",
                            lineHeight: "38.44px",
                            letterSpacing: "-0.12px",
                            textAlign: "left"
                        }}> Beneficiary Name </Typography>

                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            id='beneficiary_name'
                            type='text'
                            inputMode='text'
                            label=''
                            defaultValue=""

                            sx={paymentTextFieldStyle}
                            
                            error={ errors.beneficiary_name ? true : false }
                            { ...register('beneficiary_name') }
                        />

                        { errors.beneficiary_name && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.beneficiary_name?.message }</Box> }
                    </Box>

                    {/* <Box>
                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "15.38px",
                            lineHeight: "38.44px",
                            letterSpacing: "-0.12px"
                        }}> Currency </Typography>

                        <FormControl fullWidth>
                            <Select
                                labelId="currency"
                                id="currency-select"
                                label=""
                                value={selectedCurrency}
                                // defaultValue={selectedCurrency}

                                sx={releaseSelectStyle2}
                                error={ errorMsg.length ? true : false }
                                onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                                    setValue("currency", e.target.value, {shouldDirty: true, shouldTouch: true, shouldValidate: true});
                                    setErrorMsg('');
                                }}
                            >
                                { currencies.map((currency, index) => (
                                    <MenuItem key={index} value={ currency.currency_symbol }
                                        title={ currency.currency_name }
                                    >
                                        { currency.currency_symbol }
                                    </MenuItem>
                                )) }
                            </Select>
                        </FormControl>

                        { errorMsg && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errorMsg }</Box> }
                    </Box> */}


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
                                color: colors.milk,

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
                    
                </form>


                <Typography variant='body2'
                    onClick={() => changeMethod()}
                    sx={{
                        fontWeight: '400',
                        fontSize: '14px',
                        // lineHeight: '8px',
                        letterSpacing: '-0.31px',
                        textAlign: 'center',
                        cursor: "pointer"
                    }}
                >Change Payment method</Typography>

            </Box>
        </PaymentModalWrapper>
    )
}

export default PaypalSetupModalComponent;