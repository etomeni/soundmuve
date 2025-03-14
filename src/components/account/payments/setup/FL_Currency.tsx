import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import colors from '@/constants/colors';
import { releaseSelectStyle2 } from '@/util/mui';
import PaymentModalWrapper from '../PaymentWrapper';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    confirmBtn: (currency: string) => void;
    changeMethod: () => void;
}

const FL_CurrencyModalComponent: React.FC<_Props> = ({
    openModal, closeModal, confirmBtn, changeMethod
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const {
        currencies,
        getSupportedCurrencies
    } = usePayoutData();

    useEffect(() => {
        getSupportedCurrencies();
    }, []);


    const handleConfirmBtn = () => {
        if (!selectedCurrency) {
            setErrorMsg("Please select your preferred local currency.");
            return
        }

        confirmBtn(selectedCurrency);
    }

    return (
        <PaymentModalWrapper title='Set up bank payout'
            closeModal={closeModal}
            openModal={openModal}
            poweredBy='Flutterwave'
        >
            <Box id="payout-modal-description" sx={{mt: 5}}>
                <Box>
                    <Typography sx={{
                        fontWeight: "400",
                        fontSize: "15.38px",
                        lineHeight: "38.44px",
                        letterSpacing: "-0.12px",
                        textAlign: "left"
                    }}> Select Currency </Typography>

                    <FormControl fullWidth>
                        <Select
                            labelId="currency"
                            id="currency-select"
                            label=""
                            defaultValue=""

                            sx={releaseSelectStyle2}

                            onChange={(e) => {
                                setSelectedCurrency(e.target.value);
                                setErrorMsg('');
                            }}
                            
                        >
                            { currencies.map((currency, index) => (
                                <MenuItem key={index} value={ currency.currency_code }
                                    title={ currency.currency_name }
                                >
                                    { currency.currency_code } 
                                    ({ currency.currency_symbol }) 
                                    - { currency.currency_name } 
                                </MenuItem>
                            )) }
                        </Select>
                    </FormControl>

                    { errorMsg && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errorMsg }</Box> }
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
                        onClick={() => handleConfirmBtn()}
                        sx={{ 
                            bgcolor: colors.primary,
                            color: colors.milk,
                            borderRadius: "17px",
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
                    > Confirm </Button>
                </Box>

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

export default FL_CurrencyModalComponent;