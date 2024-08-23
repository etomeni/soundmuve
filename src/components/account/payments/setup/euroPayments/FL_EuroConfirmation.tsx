import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';

import { apiEndpoint, getQueryParams } from '@/util/resources';
import { MuiSelectFieldStyle, MuiTextFieldStyle } from '@/util/mui';
import { euroPaymentFormSchema, euroPaymentsInterface } from './FL_Europayments';
import { restCountries } from '@/util/countries';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    saveBtn: () => void;
    formDetails: euroPaymentsInterface
}


const FL_EuroConfirmationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(euroPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: euroPaymentsInterface) => {
        // console.log(formData);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const currency = getQueryParams('currency');
        const data2db = {
            email: userData.email,
            currency: currency || '',
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

        try {
            const response = (await axios.post(`${apiEndpoint}/payoutDetails/payout-details`, data2db, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setBanks(response.data);

            saveBtn();
            
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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

                                                sx={{ ...MuiSelectFieldStyle(darkTheme) }}
                                                
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}

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

                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}
                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "16px",
                                                },
                                                readOnly: true,
                                            }}
                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
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
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#8638E5", fontWeight: "bold" }} />
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
                                Every detail provides would be used to process your pay out 
                            </Typography>

                        </form>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default FL_EuroConfirmationModalComponent;