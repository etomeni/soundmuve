import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { useSettingStore } from '@/state/settingStore';

import { restCountries } from '@/util/countries';
import { getCountries } from '@/util/location';
import { MuiSelectFieldStyle, MuiTextFieldStyle } from '@/util/mui';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";


export const usPaymentFormSchema = yup.object({
    beneficiaryName: yup.string().required().trim().label("Beneficiary Name"),
    email: yup.string().required().trim().label("Email"),

    address: yup.string().required().min(2).trim().label("Address"),
    
    bankName: yup.string().required().trim().label("Bank Name"),
    country: yup.string().required().trim().label("Country"),

    accountNumber: yup.string().required().trim().label("Account Number"),
    routingNumber: yup.string().required().trim().label("Routing Number"),
    swiftCode: yup.string().required().trim().label("Swift Code"),
});

export type usPaymentsInterface = typeof usPaymentFormSchema.__outputType;

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: usPaymentsInterface) => void;
}


const FL_USpaymentsModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    // const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [countries, setCountries] = useState(restCountries);

    useEffect(() => {
        getCountries().then((countryRes) => {
            setCountries(countryRes);
        });
    }, []);

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(usPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: usPaymentsInterface) => {
        // console.log(formData);

        confirmBtn(formData);
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
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px",
                                            textAlign: "left"
                                        }}> Beneficiary name </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='beneficiaryName'
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
                                            }}
                                            
                                            error={ errors.beneficiaryName ? true : false }
                                            { ...register('beneficiaryName') }
                                        />

                                        { errors.beneficiaryName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.beneficiaryName?.message }</Box> }
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> Email </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='email'
                                            type='email'
                                            inputMode='email'
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
                                            }}
                                            
                                            error={ errors.email ? true : false }
                                            { ...register('email') }
                                        />
                                        { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }

                                    </Box>
                                </Grid>
                            </Grid>

                            <Box>
                                <Typography sx={{
                                    fontWeight: "400",
                                    fontSize: "15.38px",
                                    lineHeight: "38.44px",
                                    letterSpacing: "-0.12px",
                                    textAlign: "left"
                                }}> Address </Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='address'
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
                                    }}
                                    
                                    error={ errors.address ? true : false }
                                    { ...register('address') }
                                />
                                { errors.address && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.address?.message }</Box> }

                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px",
                                            textAlign: "left"
                                        }}> Bank Name </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='bankName'
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
                                                }
                                            }}

                                            sx={{
                                                ...MuiTextFieldStyle(darkTheme),
                                            }}
                                            
                                            error={ errors.bankName ? true : false }
                                            { ...register('bankName') }
                                        />

                                        { errors.bankName && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bankName?.message }</Box> }
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px",
                                            textAlign: "left"
                                        }}> Country </Typography>

                                        <FormControl fullWidth>
                                            <Select
                                                labelId="country"
                                                id="country-select"
                                                label=""
                                                defaultValue=""
                                                // value={userCountry}

                                                sx={{ ...MuiSelectFieldStyle(darkTheme) }}
                                                
                                                error={ errors.country ? true : false }
                                                { ...register('country') }
                                            >
                                                { countries.map((country: any, index) => (
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



                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> Account Number </Typography>

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
                                                ...MuiTextFieldStyle(darkTheme),
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
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> Routing Number </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='routingNumber'
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

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.routingNumber ? true : false }
                                            { ...register('routingNumber') }
                                        />

                                        { errors.routingNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.routingNumber?.message }</Box> }
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> Swift Code </Typography>

                                        <TextField 
                                            variant="outlined" 
                                            fullWidth 
                                            id='swiftCode'
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
                                            }}
                                            
                                            error={ errors.swiftCode ? true : false }
                                            { ...register('swiftCode') }
                                        />
                                        { errors.swiftCode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.swiftCode?.message }</Box> }

                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}></Grid>
                            </Grid>

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
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default FL_USpaymentsModalComponent;