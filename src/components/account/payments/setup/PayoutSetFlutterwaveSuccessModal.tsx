import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";

import { useSettingStore } from '@/state/settingStore';
import successImg from "@/assets/images/successImg.gif";


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const PayoutFL_SuccessModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
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
                }}
            >
                <Box 
                    sx={{
                        bgcolor: darkTheme ? "#272727" : "#fff",
                        width: "100%",
                        maxWidth: {xs: "92%", sm: "496px"},
                        // maxHeight: "605px",
                        maxHeight: "95%",
                        borderRadius: "12px",
                        p: "25px",
                        color: darkTheme ? "#fff" : "#000",
                        overflow: "scroll"
                    }}
                >
                    <Box  id="payout-modal-title">
                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon 
                                    sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                                />
                            </IconButton>
                        </Box>

                        <Box sx={{textAlign: 'center'}}>
                            <img
                                src={FlutterwaveLogo2} alt='Flutterwave Logo Image'
                                style={{
                                    objectFit: "contain",
                                    width: "60%"
                                }}
                            />
                        </Box>

                        <Typography variant='body2'
                            sx={{
                                fontWeight: '800',
                                fontSize: '12px',
                                textAlign: 'center'
                            }}
                        >Confirm payout details</Typography>
                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 5}}>
                        <Stack alignItems="center" justifyContent="center" textAlign="center">
                            <img 
                                src={successImg}
                                style={{
                                    // width: "100px",
                                    // height: "auto",
                                    objectFit: "contain"
                                }}
                            />
                        </Stack>

                        <Typography variant='body2'
                            sx={{
                                fontWeight: '400',
                                fontSize: '14px',
                                // lineHeight: '8px',
                                letterSpacing: '-0.31px',
                                textAlign: 'center',
                                mt: 3
                            }}
                        >
                            <span style={{ fontWeight: 'bold' }}>Note: </span>
                            Every detail provides would be used to process your pay out 
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default PayoutFL_SuccessModalComponent;