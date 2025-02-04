import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { authMuiTextFieldStyle } from '@/util/mui';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useProfileEmailUpdateHook } from '@/hooks/profile/useProfileEmailUpdateHook';
import { getSessionStorage } from '@/util/storage';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    newEmailModalCtrl: (state: boolean) => void;
}

function getStorage() {
    const result = getSessionStorage("emailUpdate");
    if (result) {
        return {
            jwtToken: result.jwtToken,
            newEmail: result.newEmail,
        }
    } else {
        return {
            jwtToken: '',
            newEmail: '',
        }
    }
}

const VerifyNewEmailModal: React.FC<_Props> = ({
    openModal, closeModal, newEmailModalCtrl
}) => {
    const [jwtToken, setJwtToken] = useState('');
    const [newEmail, setNewEmail] = useState('');

    // Define the props to pass to the custom hook
    const props = {
        modalViews: {
            verifyEmailModal: (_state: boolean) => closeModal(),
            updateEmailModal: (state: boolean) => newEmailModalCtrl(state),
        },
    };

    const { 
        apiResponse, setApiResponse,
        isSubmittingOtpCode,
        verifyNewEmailCode, setIsSubmittingOtpCode,

        code, setCode,
        handleResendOtp,
        handleChange,
        handlePaste,
        handleDelete,
    } = useProfileEmailUpdateHook(props);

    useEffect(() => {
        setCode(new Array(4).fill(""));
        setIsSubmittingOtpCode(false);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const result = getStorage();
        setJwtToken(result.jwtToken);
        setNewEmail(result.newEmail);
    }, [openModal]);
    

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
                        bgcolor: colors.bg,
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        p: "25px",
                        color: colors.dark,
                        overflow: "scroll"
                    }}
                >
                    <Box  id="payout-modal-title">
                        <Stack direction="row" spacing="20px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography variant="h6" component="h2"
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "20px", md: "35px"},
                                    lineHeight: {xs: "20px", md: "24px"},
                                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                    textAlign: "center",
                                    // mt: 2
                                }}
                            > Verify New Email Address </Typography>

                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon sx={{color: colors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>                        
                    </Box>


                    <Box id="payout-modal-description" mt={4}>
                        <Box>
                            <Typography variant='body1' sx={{
                                fontFamily: "Geist",
                                fontWeight: "300",
                                fontSize: "18px",
                                // lineHeight: {xs: "26.5px", md: "34.6px"},
                                // letterSpacing: {xs: "-0.09px", md: "-0.14px"},
                                textAlign: "center",
                                // maxWidth: {xs: "284px", md: "466px"},
                                mx: "auto",
                                color: "#7B7979"
                            }}>
                                Please enter the 4 digit code sent to <br />
                                <span style={{fontWeight: "700", color: colors.tertiary}}>
                                    { newEmail }
                                </span>
                            </Typography>

                            <Box sx={{ py: 2, }}>
                                <Box 
                                    sx={{ 
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "15px",
                                        mx: "auto",
                                        // bgcolor: "green",
                                        textAlign: "center"
                                    }}
                                >
                                    { code.map((data, i) => (

                                        <TextField 
                                            key={i}
                                            variant="outlined" 
                                            // fullWidth 
                                            // id={`code${i}`}
                                            type='text'
                                            inputMode='text'
                                            // defaultValue=""
                                            
                                            InputLabelProps={{
                                                style: { color: '#c1c1c1', fontWeight: "400" },
                                            }}
                                            sx={{
                                                ...authMuiTextFieldStyle
                                            }}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "8px",
                                                    textAlign: "center",
                                                    // bgcolor: "yellow",
                                                    width: "70px",
                                                    height: "50px"
                                                },
                                            }}

                                            inputProps={{ 
                                                maxLength: 1, 
                                                id: `code${i}`,
                                                className: "otpCode",
                                                style: { textAlign: "center" }
                                            }}

                                            error={ apiResponse.display && apiResponse.status == false ? true : false }

                                            value={data}
                                            onChange={(e) => handleChange(e, i)}
                                            onPaste={(e) => handlePaste(e)}
                                            onKeyUp={(e) => handleDelete(e, i)}
                                        />
                                    )) }

                                </Box>
                            </Box>

                            <Typography variant='body1'onClick={() => handleResendOtp(newEmail)}
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    // lineHeight: {xs: "26.72px", md: "44.6px"},
                                    // letterSpacing: {xs: "-0.9px", md: "-0.14px"},
                                    mb: 2,
                                    color: colors.primary,
                                    width: "fit-content",
                                    cursor: "pointer"
                                }}
                            > Resend Code </Typography>

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Stack alignItems="center" mt={3}>
                                <Button variant="outlined" 
                                    fullWidth type="button" 
                                    onClick={() => verifyNewEmailCode(code.join(''), newEmail, jwtToken)}
                                    disabled={ code.join('').length !== 4 || isSubmittingOtpCode } 
                                    sx={{ 
                                        bgcolor: colors.primary,
                                        color: colors.milk,
                                        border: 'none',
                                        width: "30%",

                                        "&.Mui-disabled": {
                                            background: colors.secondary,
                                            color: "#797979",
                                            border: 'none',
                                        },
                                        "&:hover": {
                                            bgcolor: colors.primary,
                                            // borderColor: colors.primary,
                                            border: 'none',
                                        },
                                        "&:active": {
                                            bgcolor: colors.primary,
                                            // borderColor: colors.primary,
                                            border: 'none',
                                        },
                                        "&:focus": {
                                            bgcolor: colors.primary,
                                            // borderColor: colors.primary,
                                            border: 'none',
                                        },

                                        padding: {xs: "9.05px 36.19px", md: "10px 40px" },

                                        borderRadius: "12px",
                                        textTransform: "unset"
                                    }}
                                >
                                    <span style={{ display: isSubmittingOtpCode ? "none" : "initial" }}>Submit</span>
                                    <CircularProgress size={25} sx={{ display: isSubmittingOtpCode ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default VerifyNewEmailModal;