import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useSettingStore } from '@/state/settingStore';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";



interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const PayoutFlutterwaveModalComponent: React.FC<_Props> = ({
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
                    outline: "none",

                    bgcolor: darkTheme ? "#000" : "#c4c4c4",
                }}
            >
                <Box sx={{
                    bgcolor: darkTheme ? "#272727" : "#fff",
                    width: "100%",
                    maxWidth: {xs: "92%", sm: "496px"},

                    height: "100%",
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: darkTheme ? "#fff" : "#000",

                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon 
                                sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                            />
                        </IconButton>
                    </Box>

                    <Box id="payout-modal-title">
                        <Box>
                            <img
                                src={FlutterwaveLogo2} alt='Flutterwave Logo Image'
                                style={{
                                    objectFit: "contain",
                                    width: "100%"
                                }}
                            />
                        </Box>

                        <Typography variant='body2' component="p"
                            sx={{
                                fontWeight: "400",
                                fontSize: "18px",
                                lineHeight: "24px",
                                letterSpacing: "-1.34px",
                                my: "30px",
                            }}
                        >Connect Flutterwave </Typography>
                    </Box>



                    <Box id="payout-modal-description" sx={{mt: "auto"}}>




                        <Box 
                            onClick={() => closeModal() }
                            sx={{
                                borderRadius: "17px",
                                bgcolor: darkTheme ? "#fff" : "#272727",
                                p: "10px 26px 10px 26px",
                                my: "60px",
                                width: "fit-content",
                                mx: "auto",
                                cursor: "pointer"
                            }}
                        >
                            <Typography sx={{
                                fontWeight: '700',
                                fontSize: "12px",
                                lineHeight: "12px",
                                // letterSpacing: "-0.13px",
                                // textAlign: 'center',
                                color: darkTheme ? "#000" : "#fff",
                            }}> Confirm </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PayoutFlutterwaveModalComponent;