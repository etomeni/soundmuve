import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { useSettingStore } from '@/state/settingStore';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const CopyrightOwnershipModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

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
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#fff",
                        maxWidth: {xs: "92%", sm: "496px"},
                        maxHeight: "605px",
                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000"
                    }}
                >
                    <Stack id="payout-modal-title" direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "18px", md: "25px"},
                                lineHeight: {xs: "16px", md: "18.16px"},
                                letterSpacing: "-0.1px", // {xs: "-0.34px", md: "-1.34px"},
                                textAlign: "center",
                                mt: 2
                            }}
                        > Copyright Ownership </Typography>

                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Box>
                    </Stack>


                    <Box id="payout-modal-description" sx={{my: 5}}>
                        <Typography variant='body2' component="p"
                            sx={{
                                fontWeight: "400",
                                fontSize: "18px",
                                lineHeight: "22px",
                                // letterSpacing: "-1px",
                                my: "45px",
                            }}
                        >
                            In order to distribute this song, you would be required to obtain the right of distribute from the song owner. 
                            <span style={{textDecorationLine: "underline", cursor: "pointer"}}> learn more </span>
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CopyrightOwnershipModalComponent;