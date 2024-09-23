import React from 'react';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import colors from '@/constants/colors';
import TextField from '@mui/material/TextField';
import { paymentTextFieldStyle } from '@/util/mui';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { setLocalStorage } from '@/util/storage';



const formSchema: any = yup.object({
    question1: yup.string().required().trim().label("question"),
    question2: yup.string().required().trim().label("question"),
    question3: yup.string().required().trim().label("question"),
});

interface _Props {
    // openModal: boolean,
    phoneNumber: string,
    questions: string[],
    isCompleteState: (state: boolean) => void;

}

const KycAnswersComponent: React.FC<_Props> = ({
    phoneNumber, questions, isCompleteState

}) => {

    const {
        handleSubmit, register, formState: { errors, isSubmitting, isValid } 
    } = useForm({ resolver: yupResolver(formSchema), mode: 'onBlur', reValidateMode: 'onChange' });


    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        console.log(phoneNumber);
        console.log(formData);
        console.log(formData);

        setLocalStorage("isKYCsetupCompleted", true);
        isCompleteState(true);

    }

    const resolveErrorMessage = (index: number) => {
        // errors[`question${index + 1}`]?.message
        const err: any = errors[`question${index + 1}`]?.message;

        return err || '';
    }


    return (
        <Box my={2}>

            <Typography variant="h6" component="h2"
                sx={{
                    fontWeight: "900",
                    fontSize: {xs: "20px", md: "35px"},
                    lineHeight: {xs: "20px", md: "37px"},
                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                    textAlign: "center",
                    mb: 2,
                    color: colors.dark
                }}
            >  Provide answers for the following questions </Typography>


            <Box my={3}>
                <form noValidate onSubmit={ handleSubmit(onSubmit) } >
                    <Box my={5}>
                        {
                            questions.map((value, index) => (
                                <Box key={index} mb={2}>
                                    <Typography sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        lineHeight: "16px",
                                        letterSpacing: "-0.34px",
                                        textAlign: "left",
                                        mb: 1
                                    }}> { value } </Typography>

                                    <TextField 
                                        variant="outlined" 
                                        fullWidth 
                                        id={`question${index + 1}`}
                                        type='text'
                                        inputMode='text'
                                        label=''
                                        defaultValue=""

                                        sx={paymentTextFieldStyle}
                                        
                                        error={ errors[`question${index + 1}`] ? true : false }
                                        { ...register(`question${index + 1}`) }
                                    />

                                    { errors[`question${index + 1}`] && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ resolveErrorMessage(index) }</Box> }
                                </Box>
                            ))
                        }
                    </Box>

                    <Box 
                        sx={{ 
                            // my: 5,
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
                            <span style={{ display: isSubmitting ? "none" : "initial" }}>Next</span>
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
            </Box>


        </Box>
    )
}

export default KycAnswersComponent;