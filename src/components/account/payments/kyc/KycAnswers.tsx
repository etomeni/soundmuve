import React, { useState } from 'react';

import axios from 'axios';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import colors from '@/constants/colors';
import { paymentTextFieldStyle } from '@/util/mui';
import { setLocalStorage } from '@/util/storage';
import { useUserStore } from '@/state/userStore';
import { apiEndpoint } from '@/util/resources';


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
    const userData = useUserStore((state) => state.userData);
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
        console.log(phoneNumber);
        // console.log(questions);
        // console.log(formData);

        // const answers = Object.values(formData);
        // console.log(answers);


        const keys = Object.keys(formData);
        const values = [];

        for (let i = 0; i < keys.length; i++) {
            values.unshift(formData[keys[i]]);
        }

        const data2db = {
            email: userData.email,
            // phoneNumber,
            answers: values
        };

        console.log(data2db);
        

        try {
            const response = (await axios.post(`${apiEndpoint}/kyc/kyc/submit-answers`, data2db, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);

            setLocalStorage("isKYCsetupCompleted", true);
            isCompleteState(true);
        } catch (error: any) {
            const errorResponse = error.response.data || error;
            // console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });
        }

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


                    {
                        apiResponse.display && (
                            <Stack sx={{ width: '100%', my: 2 }}>
                                <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                            </Stack>
                        )
                    }

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