import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import { ThemeProvider, useTheme } from '@mui/material/styles';

import { useSettingStore } from '@/state/settingStore';
import Alert from '@mui/material/Alert';
import { customTextFieldTheme } from '@/util/mui';



const formSchema = yup.object({
    bank: yup.string().required().min(2, "Please enter a valid bank name").trim().label("Bank"),
    accountNumber: yup.string().required().min(10).max(10).trim().label("Account Number"),
    accountName: yup.string().required().min(2).trim().label("Account Name"),

    verificationEmail: yup.string().required()
    .email("Please enter a valid email address.")
    .matches(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    , "Please enter a valid email address.")
    .trim().label("Verification Email Address"),

    verificationNumber: yup.string().required().min(7, "Incorrect phone number").max(15, "Incorrect phone number").trim().label("Phone Number"),

    // useEmail_n_PhoneNo: yup.boolean().required().label("Terms and conditions")
});


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const PayoutBankModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {
    const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const outerTheme = useTheme();

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

                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "20px", md: "35px"},
                                lineHeight: {xs: "20px", md: "24px"},
                                letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                textAlign: "center",
                                mt: 2
                            }}
                        >
                            Set up payout to bank
                        </Typography>
                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 5}}>
                        <ThemeProvider theme={customTextFieldTheme(outerTheme, darkTheme)}>
                            <form noValidate onSubmit={ handleSubmit(onSubmit) } >

                                <Stack direction={"row"} spacing={2}  sx={{ py: 1 }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}>
                                            Select Bank
                                        </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='bank'
                                            type='text'
                                            label=''
                                            inputMode='text'
                                            defaultValue=""
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}
                                            
                                            error={ errors.bank ? true : false }
                                            { ...register('bank') }
                                        />
                                        { errors.bank && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bank?.message }</Box> }

                                    </Box>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}>
                                            Account Number
                                        </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='accountNumber'
                                            type='number'
                                            label=''
                                            inputMode='numeric'
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
                                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                    display: "none",
                                                },
                                                "& input[type=number]": {
                                                    MozAppearance: "textfield",
                                                },
                                            }}
                                            
                                            error={ errors.accountNumber ? true : false }
                                            { ...register('accountNumber') }
                                        />
                                        { errors.accountNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountNumber?.message }</Box> }

                                    </Box>
                                </Stack>

                                <Box sx={{ py: 1 }}>
                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='accountName'
                                        type='text'
                                        label=''
                                        inputMode='text'
                                        defaultValue=""
                                        disabled
                                        placeholder='Account Name(automatically generated)'
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                            // readOnly: true,
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
                                                    "-webkit-text-fill-color": "gray",
                                                    WebkitTextFillColor: "gray",
                                                },
                                            },
                                        }}
                                        
                                        error={ errors.accountName ? true : false }
                                        { ...register('accountName') }
                                    />
                                    { errors.accountName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountName?.message }</Box> }

                                </Box>

                                <Box sx={{ py: 1 }}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px",
                                        textAlign: "left"
                                    }}>
                                        Verification Email
                                    </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='verificationEmail'
                                        type='email'
                                        label=''
                                        inputMode='email'
                                        defaultValue=""
                                        placeholder='Used to inform you when transactions are being made on your account'
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.verificationEmail ? true : false }
                                        { ...register('verificationEmail') }
                                    />
                                    { errors.verificationEmail && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.verificationEmail?.message }</Box> }

                                </Box>

                                <Box sx={{ py: 1 }}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "15.38px",
                                        lineHeight: "38.44px",
                                        letterSpacing: "-0.12px",
                                        textAlign: "left"
                                    }}>
                                        Verification Number
                                    </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id='verificationNumber'
                                        type='tel'
                                        label=''
                                        inputMode='tel'
                                        defaultValue=""
                                        placeholder='Used to inform you when transactions are being made on your account'
                                        InputLabelProps={{
                                            style: { color: '#c1c1c1', fontWeight: "400" },
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: "16px",
                                            },
                                        }}
                                        
                                        error={ errors.verificationNumber ? true : false }
                                        { ...register('verificationNumber') }
                                    />
                                    { errors.verificationNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.verificationNumber?.message }</Box> }

                                </Box>

                                <FormGroup>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={useEmail_n_PhoneNo}
                                                sx={{
                                                    color: darkTheme ? "#fff" : "#000",
                                                    '&.Mui-checked': {
                                                        color: darkTheme ? "#fff" : "#000",
                                                    },
                                                }}
                                                onChange={(_e) => {
                                                    // console.log(_e.target.checked);
                                                    setUseEmail_n_PhoneNo(_e.target.checked)
                                                }}
                                            />
                                        } 
                                        label={<Typography sx={{
                                            fontSize: {xs: 14, md: "15.38px"},
                                            fontWeight: "400",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}>
                                            Use Email and phone number used during sign up instead
                                        </Typography>}
                                    />
                                </FormGroup>



                                {
                                    apiResponse.display && (
                                        <Stack sx={{ width: '100%', my: 2 }}>
                                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                        </Stack>
                                    )
                                }

                                        
                                <Box 
                                    sx={{ 
                                        mt: 3,
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

                            </form>

                        </ThemeProvider>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PayoutBankModalComponent;