import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { paymentTextFieldStyle } from '@/util/mui';

import colors from '@/constants/colors';
import PaymentModalWrapper from '../../PaymentWrapper';
import { usePayoutData } from '@/hooks/payments/usePayoutInfo';
import Autocomplete from '@mui/material/Autocomplete';


export const ngPaymentFormSchema = yup.object({
    beneficiaryName: yup.string().required().trim().label("Beneficiary Name"),
    bank: yup.string().required().min(2, "Please enter a valid bank name").trim().label("Bank"),
    bankName: yup.string(),
    accountNumber: yup.string().required().length(10).trim().label("Account Number"),
});

// export type ngPaymentsInterface = typeof ngPaymentFormSchema.__outputType;
export type ngPaymentsInterface = {
    bankName: string;
    beneficiaryName: string;
    accountNumber: string;
    bank: {
        id: number,
        code: string,
        name: string,
    };
};

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    changeMethod: () => void;
    confirmBtn: (data: ngPaymentsInterface) => void;
}


const FL_NgPaymentsModalComponent: React.FC<_Props> = ({
    openModal, closeModal, changeMethod, confirmBtn
}) => {

    const {
        ngBanks, getAllSupportedNgBanks,
        // getBankAccountName,
    } = usePayoutData()


    useEffect(() => {
        if (!openModal) {
            reset()
        } else {
            getAllSupportedNgBanks();
        }
    }, [openModal]);

    const {
        handleSubmit, register, reset, setValue, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(ngPaymentFormSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: typeof ngPaymentFormSchema.__outputType) => {
        // console.log(formData);

        // getBankAccountName(formData.accountNumber, formData.bank);


        // let bankName = ''
        let bank: any;
        // Use the filter method to find the object with the matching code
        const result = ngBanks.filter(obj => obj.code == formData.bank);
        // If a match is found, return the first object
        if (result.length > 0) {
            // bankName = result[0].name;
            bank = result[0];
        }
        
        confirmBtn({
            ...formData,
            bankName: bank.name,
            bank: bank
        });
    }


    return (
        <PaymentModalWrapper title='Set up bank payout'
            closeModal={closeModal}
            openModal={openModal}
            poweredBy='Flutterwave'
        >
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
                            
                            InputProps={{
                                sx: {
                                    borderRadius: "16px",
                                },
                            }}

                            sx={paymentTextFieldStyle}
                            
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

                                <Autocomplete
                                    fullWidth
                                    options={ngBanks}
                                    autoHighlight
                                    getOptionLabel={(option) => option.name}

                                    onChange={(_e, value) => {
                                        // console.log(value);
                                        
                                        if (value) {
                                            // setSelectedArtist(value);

                                            setValue(
                                                "bank", value.code,
                                                {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                            );

                                            setValue(
                                                "bankName", value.name,
                                                {shouldDirty: true, shouldTouch: true, shouldValidate: true}
                                            );
                                        }
                                    }} // prints the selected value

                                    renderOption={(props, option) => {
                                        const { ...optionProps } = props;
                                        return (
                                            <Box
                                                component="li"
                                                {...optionProps}
                                                key={option.id}
                                            >{ option.name }</Box>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={paymentTextFieldStyle}
                                            error={ errors.bank ? true : false }
                                            label=""
                                        />
                                    )}
                                />

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
                                    
                                    InputProps={{
                                        sx: {
                                            borderRadius: "16px",
                                        },
                                    }}

                                    sx={paymentTextFieldStyle}
                                    
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
                                bgcolor: colors.primary,
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
                                // letterSpacing: "-0.13px",
                                // textAlign: 'center',
                                color: colors.milk,
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
                            cursor: "pointer"
                        }}
                    >Change Payment method</Typography>

                </form>
            </Box>
        </PaymentModalWrapper>
    )
}

export default FL_NgPaymentsModalComponent;