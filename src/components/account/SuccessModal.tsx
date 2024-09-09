import React from 'react';
import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import successImg from "@/assets/images/successImg.gif";
import colors from '@/constants/colors';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const SuccessModalComponent: React.FC<_Props> = ({
    openModal, closeModal
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
                    maxWidth: {xs: "92%", sm: "496px"},
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: colors.dark
                }}>
                    <Box id="payout-modal-title">
                        {/* <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Box> */}

                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "400",
                                fontSize: {xs: "20px", md: "38.58px"},
                                lineHeight: {xs: "15px", md: "18.16px"},
                                letterSpacing: "-0.1px",
                                textAlign: "center",
                                mt: 2
                            }}
                        > Release Completed </Typography>
                    </Box>


                    <Box id="payout-modal-description" sx={{my: 5}}>
                        <Stack alignItems="center" justifyContent="center">
                            <img 
                                src={successImg}
                                style={{
                                    // width: "100px",
                                    // height: "auto",
                                    objectFit: "contain"
                                }}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default SuccessModalComponent;