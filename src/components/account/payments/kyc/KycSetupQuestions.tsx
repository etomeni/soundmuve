import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import colors from '@/constants/colors';
import { SxProps, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';


interface _Props {
    setQuestions: (data: string[]) => void;
    handleCurrentView: (number: number) => void;

}

const questions = [
    "What is your full name as registered in your country?",
    "What is your date of birth?",
    "What is your residential address or billing address?",
    "What is your phone number associated with your SoundMuve account?",
    "Can you provide the name of your girlfriend?",
    "What is the name of your first pet?",
    "What is your mother's maiden name?",
    "What is the name of your first school?",
];


const KycSetupQuestionsComponent: React.FC<_Props> = ({
    handleCurrentView, setQuestions
}) => {
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);


    const questionContainerStyle: SxProps<Theme> = {
        borderRadius: "15px",
        border: `1px solid ${colors.dark}`,
        padding: "10px",
        width: "fit-content",
        cursor: "pointer",
        mb: 2
    }

    const questionTextStyle: SxProps<Theme> = {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "16px",
        letterSpacing: "-0.34px",
        color: colors.dark,
    }

    const handleSelectQuestion = (question: string) => {
        let newQuestions = [
            ...selectedQuestions,
        ];

        if (selectedQuestions.includes(question)) {
            // remove the question from the list
            newQuestions = newQuestions.filter(item => item != question);
        } else if (selectedQuestions.length >= 3) {
            // replace the last item with the new one
            newQuestions[newQuestions.length - 1] = question;
        } else {
            newQuestions.push(question);
        }

        setSelectedQuestions(newQuestions);
    }


    const handleSubmit = () => {
        console.log(selectedQuestions);

        if (selectedQuestions.length == 3) {
            setQuestions(selectedQuestions);
            handleCurrentView(3);
        }

        // confirmBtn(formData);
    }


    return (
        <Box my={2}>

            <Typography variant="h6" component="h2"
                sx={{
                    fontWeight: "900",
                    fontSize: {xs: "20px", md: "35px"},
                    lineHeight: {xs: "20px", md: "32px"},
                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                    textAlign: "center",
                    mb: 2,
                    color: colors.dark
                }}
            >
                Select 3 questions you can provide answers for anytime
            </Typography>

            <Box my={5}>
                { 
                    questions.map((value, index) => (
                        <Box key={index} 
                            onClick={() => handleSelectQuestion(value)}
                            sx={{
                                ...questionContainerStyle,
                                bgcolor: selectedQuestions.includes(value) ? colors.primary : colors.bg,
                            }}
                        >
                            <Typography variant='body2'
                                sx={{
                                    ...questionTextStyle,
                                    color: selectedQuestions.includes(value) ? colors.milk : colors.dark,
                                }}
                            > { value } </Typography>
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
                    fullWidth type="button" 
                    onClick={handleSubmit}
                    disabled={ selectedQuestions.length != 3 } 
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
                > Next </Button>
            </Box>

        </Box>
    )
}

export default KycSetupQuestionsComponent;