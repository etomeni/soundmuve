import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiEndpoint } from '@/util/resources';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { useSettingStore } from '@/state/settingStore';
import { currencyLists, getSupportedCurrency } from '@/util/currencies';
import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    confirmBtn: (currency: string) => void;
    changeMethod: () => void;
}

const FL_CurrencyModalComponent: React.FC<_Props> = ({
    openModal, closeModal, confirmBtn, changeMethod
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [currencies, setCurrencies] = useState(currencyLists);

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

    const getSupportedCurrencies = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/currency/currencies`, {
                // headers: {
                //     Authorization: `Bearer ${accessToken}`
                // }
            })).data;
            // console.log(response);

            const supportedCurrency = getSupportedCurrency(response);

            setCurrencies(supportedCurrency);

        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
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
                        maxHeight: "95%",

                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000",

                        display: "flex",
                        flexDirection: "column",

                        overflow: "scroll"
                    }}
                >
                    <Box id="payout-modal-title">
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


                    <Box id="payout-modal-description" sx={{mt: 5}}>

                        <Box>
                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "15.38px",
                                lineHeight: "38.44px",
                                letterSpacing: "-0.12px",
                                textAlign: "left"
                            }}> Currency </Typography>

                            <FormControl fullWidth>
                                <Select
                                    labelId="currency"
                                    id="currency-select"
                                    label=""
                                    defaultValue=""

                                    sx={{
                                        color: darkTheme ? "white" : '#272727',
                                        borderRadius: "13.79px",
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: darkTheme ? 'gray' : 'gray',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                                        },
                                        '.MuiSvgIcon-root ': {
                                            fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                                        }
                                    }}

                                    onChange={(e) => {
                                        setSelectedCurrency(e.target.value);
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
                </Box>
            </Box>
        </Modal>
    )
}

export default FL_CurrencyModalComponent;