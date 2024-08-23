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
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { ThemeProvider, useTheme } from '@mui/material/styles';



import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
import { apiEndpoint } from '@/util/resources';
import { customTextFieldTheme, MuiTextFieldStyle } from '@/util/mui';


const formSchema = yup.object({
    amount: yup.string().required().trim().label("Account Number"),
    // currency: yup.string().required().min(2).trim().label("Currency"),
});


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: typeof formSchema.__outputType) => void;
}

// const currencyCodes = [
//     "NGN", "USD", "EUR", "JPY", "GBP", "AUD",
//     "CHF", "CAD", "CNY", "HKD", "SGD",
// ];

const WithdrawModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
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

        confirmBtn(formData);


        return;

        try {
            const response = (await axios.post(`${apiEndpoint}/payouts/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setBanks(response.data);

            confirmBtn(formData);
            
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

                                {/* <Box>
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
                                            // value={userCountry}

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
                                            
                                            error={ errors.currency ? true : false }
                                            { ...register('currency') }
                                        >
                                            { currencyCodes.map((currencyCode: any, index) => (
                                                <MenuItem key={index} value={currencyCode}>
                                                    {currencyCode}
                                                </MenuItem>
                                            )) }
                                        </Select>
                                    </FormControl>

                                    { errors.currency && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.currency?.message }</Box> }
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

export default WithdrawModalComponent;