import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

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

import { MuiSelectFieldStyle, MuiTextFieldStyle } from '@/util/mui';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import { allNgBanks } from '@/util/banks';
import { useUserStore } from '@/state/userStore';
import { apiEndpoint } from '@/util/resources';


export const ngPaymentFormSchema = yup.object({
    beneficiaryName: yup.string().required().trim().label("Beneficiary Name"),
    bank: yup.string().required().min(2, "Please enter a valid bank name").trim().label("Bank"),
    accountNumber: yup.string().required().length(10).trim().label("Account Number"),
});

export type ngPaymentsInterface = typeof ngPaymentFormSchema.__outputType;

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: ngPaymentsInterface) => void;
}


const FL_NgPaymentsModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    // const outerTheme = useTheme();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);

    const [banks, setBanks] = useState(allNgBanks);


    useEffect(() => {
        getBanks();
    }, []);


    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(ngPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const getBanks = async () => {
        try {
            const response = (await axios.get(`${apiEndpoint}/payouts/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);
            // setBanks(response.data);

            const sortedBanks = response.data.sort((a: any, b: any) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setBanks(sortedBanks);
            
        } catch (error: any) {
            // const errorResponse = error.response.data;
            console.error(error.response.data);
        }
    }

    const onSubmit = async (formData: ngPaymentsInterface) => {
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

                            <Grid container spacing={2} mt={1}>

                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: "400",
                                            fontSize: "15.38px",
                                            lineHeight: "38.44px",
                                            letterSpacing: "-0.12px"
                                        }}> Bank </Typography>

                                        <FormControl fullWidth>
                                            <Select
                                                // labelId="bank"
                                                id="bank-select"
                                                label=""
                                                defaultValue=''

                                                sx={{ ...MuiSelectFieldStyle(darkTheme) }}
                                                
                                                error={ errors.bank ? true : false }
                                                { ...register('bank') }
                                            >
                                                { banks.map((bank, index) => (
                                                    <MenuItem key={index} value={bank.name}>
                                                        {bank.name}
                                                    </MenuItem>
                                                )) }
                                            </Select>
                                        </FormControl>

                                        { errors.bank && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.bank?.message }</Box> }
                                    </Box>
                                </Grid>


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

                                            sx={{ ...MuiTextFieldStyle(darkTheme) }}
                                            
                                            error={ errors.accountNumber ? true : false }
                                            { ...register('accountNumber') }
                                        />
                                        { errors.accountNumber && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.accountNumber?.message }</Box> }
                                    </Box>
                                </Grid>

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

export default FL_NgPaymentsModalComponent;