import React, { useEffect } from 'react';

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


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    verifyModalCtrl: (state: boolean) => void;
}


const NewProfileEmailModal: React.FC<_Props> = ({
    openModal, closeModal, verifyModalCtrl
}) => {
    // Define the props to pass to the custom hook
    const props = {
        modalViews: {
            verifyEmailModal: (state: boolean) => verifyModalCtrl(state),
            updateEmailModal: (_state: boolean) => closeModal(),
        },
    };
    
    const { 
        apiResponse, setApiResponse,
        reset,
        isSubmitting, isValid, onSubmit, register, errors, // formSchema,
    } = useProfileEmailUpdateHook(props);

    useEffect(() => {
        reset();
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
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
                            > Change Email Address </Typography>

                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon sx={{color: colors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Stack>                        
                    </Box>


                    <Box id="payout-modal-description" mt={4}>
                        <form noValidate onSubmit={ onSubmit }> 

                            <Box mb={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >New Email Address</Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='email'
                                    type='email'
                                    inputMode='email'
                                    defaultValue=""
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    error={ errors.email ? true : false }
                                    { ...register('email') }
                                />
                                { errors.email && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.email?.message }</Box> }
                            </Box>

                            <Box mb={2}>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        lineHeight: "16px",
                                        color: colors.primary,
                                        mb: 1,
                                    }}
                                >Current Password</Typography>

                                <TextField 
                                    variant="outlined" 
                                    fullWidth 
                                    id='password'
                                    type='password'
                                    inputMode='text'
                                    defaultValue=""
                                    placeholder='Enter your current password to confirm'
                                    sx={{
                                        ...authMuiTextFieldStyle
                                    }}
                                    error={ errors.password ? true : false }
                                    { ...register('password') }
                                />
                                { errors.password && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.password?.message }</Box> }
                            </Box>

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }

                            <Stack alignItems="center" mt={3}>
                                <Button variant="outlined" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmitting } 
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
                                    <span style={{ display: isSubmitting ? "none" : "initial" }}>Submit</span>
                                    <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: colors.primary, fontWeight: "bold" }} />
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default NewProfileEmailModal;