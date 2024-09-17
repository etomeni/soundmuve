import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import colors from '@/constants/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    goBackState?: boolean,
    backBtnFunction?: () => void;

    children: React.ReactNode,
}


const KycModalWrapper: React.FC<_Props> = ({
    openModal, closeModal, children, goBackState = false, backBtnFunction
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
                    <Box id="payout-modal-title">
                        <Stack direction="row" justifyContent="space-between" 
                            alignItems="center" spacing="20px"
                            // sx={{
                            //     borderRadius: "25px"
                            // }}
                        >
                            <Box></Box>
                            <Box></Box>
                            <Box></Box>
                        </Stack>

                        <Box sx={{textAlign: "right"}}>
                            {
                                goBackState && backBtnFunction ? (
                                    <IconButton onClick={() => backBtnFunction() }>
                                        <ArrowBackIcon sx={{color: colors.primary, fontSize: "20px"}} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => closeModal() }>
                                        <CloseIcon sx={{color: colors.primary, fontSize: "20px"}} />
                                    </IconButton>
                                )
                            }
                        </Box>

                    </Box>

                    <Box id="payout-modal-description"> { children } </Box>

                </Box>
            </Box>
        </Modal>
    )
}

export default KycModalWrapper;