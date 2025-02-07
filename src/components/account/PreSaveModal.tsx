import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import colors from '@/constants/colors';


interface _Props {
    // data2submit: FormData,
    openModal: boolean,
    closeModal: () => void;
    handleSubmit: (state: boolean) => void;
}

const PreSaveModalComponent: React.FC<_Props> = ({
    openModal, closeModal, handleSubmit
}) => {


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
                    outline: "none"
                }}
            >
                <Box sx={{
                    bgcolor: colors.bg,
                    maxWidth: {xs: "92%", sm: "496px", md: "570px"},
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: colors.dark
                }}>
                    <Box id="payout-modal-title">
                        <Stack direction="row" spacing="10px"
                            alignItems="center" justifyContent="space-between"
                        >
                            <Typography
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "24px",
                                    // lineHeight: "18px",
                                    // letterSpacing: "-0.0983451px",
                                    color: colors.dark
                                }}  
                            >Would you like to pre-save this release</Typography>

                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: colors.primary, fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Stack>
                    </Box>


                    <Box id="payout-modal-description" sx={{mt: 2}}>
                        <Box
                            sx={{
                                bgcolor: colors.secondary,
                                p: 2, borderRadius: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "300",
                                    fontSize: "18px",
                                    // lineHeight: "24px",
                                    color: colors.dark
                                }}
                            >
                                Pre-saving your release gives your audience the 
                                opportunity to add your release to their play 
                                list before it goes live. <b>
                                    Note Pre-save attracts an extra cost of 
                                    $20 to the initial release cost
                                </b>
                            </Typography>

                        </Box>

                        <Stack direction="row" spacing="20px" mt={4}
                            alignItems="center" justifyContent="center"
                        >
                            <Box onClick={() => handleSubmit(false)}
                                sx={{
                                    boxSizing: "border-box",
                                    padding: "10px 40px",
                                    border: "1px solid #000000",
                                    borderRadius: "12px",
                                    cursor: "pointer"
                                }}      
                            >
                                <Typography
                                    sx={{
                                        // width: "19px",
                                        // height: "13px",
                                        fontWeight: "900",
                                        fontSize: "15px",
                                        // lineHeight: "13px",
                                        // letterSpacing: "-0.13px",
                                        color: colors.dark,
                                    }}      
                                >No</Typography>
                            </Box>


                            <Box onClick={() => handleSubmit(true)}
                                sx={{
                                    boxSizing: "border-box",
                                    padding: "10px 40px",
                                    // border: "1px solid #000000",
                                    borderRadius: "12px",
                                    bgcolor: colors.primary,
                                    cursor: "pointer"
                                }}  
                            >
                                <Typography
                                    sx={{
                                        // width: "19px",
                                        // height: "13px",
                                        fontWeight: "900",
                                        fontSize: "15px",
                                        // lineHeight: "13px",
                                        // letterSpacing: "-0.13px",
                                        color: colors.milk,
                                    }}      
                                >Yes</Typography>
                            </Box>

                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PreSaveModalComponent;