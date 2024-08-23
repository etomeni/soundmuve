import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { ThemeProvider, useTheme } from '@mui/material/styles';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import { useSettingStore } from '@/state/settingStore';
import { customTextFieldTheme, MuiTextFieldStyle } from '@/util/mui';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { currencyLists, getSupportedCurrency } from '@/util/currencies';
import axios from 'axios';
import { apiEndpoint } from '@/util/resources';

const formSchema = yup.object({
    amount: yup.string().required().trim().label("Account Number"),
    narration: yup.string().required().label("Narration"),
});

export type withdrawInterface = {
    currency: string;
    narration: string;
    amount: string;
}

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: withdrawInterface) => void;
}

const FL_WithdrawModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {
    const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [currencies, setCurrencies] = useState(currencyLists);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getSupportedCurrencies();
    }, []);


    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });
    
    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });


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

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        if (!selectedCurrency) {
            setErrorMsg("Please select your preffered currency.");
            return;
        }
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        confirmBtn({...formData, currency: selectedCurrency });
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

                    <Box id="payout-modal-description" sx={{mt: 5}}>

                        <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                                <Box>
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
                                            error={ errorMsg.length ? true : false }
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
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}

                                        sx={{
                                            ...MuiTextFieldStyle(darkTheme),
                                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                display: "none",
                                            },
                                            "& input[type=number]": {
                                                MozAppearance: "textfield",
                                            },
                                        }}
                                        
                                        error={ errors.amount ? true : false }
                                        { ...register('amount') }
                                    />
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
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}

                                        sx={{
                                            ...MuiTextFieldStyle(darkTheme),
                                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                display: "none",
                                            },
                                            "& input[type=number]": {
                                                MozAppearance: "textfield",
                                            },
                                        }}
                                        
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
                                        <span style={{ display: isSubmitting ? "none" : "initial" }}>Confirm</span>
                                        <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
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
                                        cursor: "pointer"
                                    }}
                                >Change Payment method</Typography>

                            </form>
                        </ThemeProvider>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default FL_WithdrawModalComponent;