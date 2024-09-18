import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import colors from '@/constants/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    goBackState?: boolean,
    backBtnFunction?: () => void;

    currentView: number;

    children: React.ReactNode,
}


const tapStyle: SxProps<Theme> = {
    height: "10px",
    width: "100%",
    borderRadius: "10px",
    bgcolor: colors.secondary,
}

const KycModalWrapper: React.FC<_Props> = ({
    openModal, closeModal, children, goBackState = false, backBtnFunction,
    currentView
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
                            <Box sx={{
                                ...tapStyle,
                                bgcolor: currentView > 0 ? colors.primary : "#F6F6CA",
                            }}> </Box>

                            <Box sx={{
                                ...tapStyle,
                                bgcolor: currentView >= 2 ? colors.primary : "#F6F6CA",
                            }}></Box>

                            <Box sx={{
                                ...tapStyle,
                                bgcolor: currentView >= 3 ? colors.primary : "#F6F6CA",
                            }}></Box>
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