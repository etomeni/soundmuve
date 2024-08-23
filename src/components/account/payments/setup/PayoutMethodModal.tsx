import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';

// import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { useSettingStore } from '@/state/settingStore';

import FlutterwaveLogo from "@/assets/images/FlutterwaveLogo.png";
import PayPalLogo from "@/assets/images/PayPalLogo.png";
// import PayoneerLogo from "@/assets/images/PayoneerLogo.png";



interface _Props {
    openModal: boolean,
    closeModal: () => void;

    openBankPayoutModal: () => void;
    openFlutterwavePayoutModal: () => void;
}

const PayoutMethodModalComponent: React.FC<_Props> = ({
    openModal, closeModal, openFlutterwavePayoutModal
}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    const handleOpenFlutterwaveModal = () => {
        closeModal();
        openFlutterwavePayoutModal();
    }

    // const handleOpenBankModal = () => {
    //     closeModal();
    //     openBankPayoutModal();
    // }

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
                    bgcolor: darkTheme ? "#272727" : "#fff",
                    maxWidth: {xs: "92%", sm: "496px"},
                    width: "100%",
                    maxHeight: "605px",
                    borderRadius: "12px",
                    p: "25px",
                    color: darkTheme ? "#fff" : "#000"
                }}>
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon 
                                sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                            />
                        </IconButton>
                    </Box>

                    <Typography id="payout-modal-title" variant="h6" component="h2"
                        sx={{
                            fontWeight: "900",
                            fontSize: {xs: "20px", md: "35px"},
                            lineHeight: {xs: "20px", md: "24px"},
                            letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                            textAlign: "center",
                            mt: 2
                        }}
                    >
                        Set up payout
                    </Typography>


                    <Box id="payout-modal-description" sx={{my: 5}}>
                        <Typography variant='body2' component="p"
                            sx={{
                                fontWeight: "400",
                                fontSize: "14px",
                                lineHeight: "12px",
                                letterSpacing: "-1px",
                                my: "45px",
                            }}
                        >Choose payment method</Typography>


                        <Stack direction={"row"} flexWrap={'wrap'} gap={"20px"} justifyContent={{xs: "center", md: "center"}}>

                            <Box
                                sx={{
                                    width: "111.12px",
                                    height: "34.97px",
                                    padding: "4px 10px 4px 10px",
                                    border: "1px solid #666666",
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    ":hover": {
                                        boxShadow: "1px 3px 18px 0px #C89FF5"
                                    },
                                    overflow: "hidden"
                                }}
                            >
                                <img 
                                    src={PayPalLogo} alt='PayPal Logo'
                                    style={{
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>

                            {/* <Box
                                sx={{
                                    width: "111.12px",
                                    height: "34.97px",
                                    padding: "4px 10px 4px 10px",
                                    border: "1px solid #666666",
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    ":hover": {
                                        boxShadow: "1px 3px 18px 0px #C89FF5"
                                    },
                                    overflow: "hidden"
                                }}
                            >
                                <img 
                                    src={PayoneerLogo} alt='Payoneer Logo'
                                    style={{
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box> */}
                            
                            {/* <Box
                                sx={{
                                    width: "111.12px",
                                    height: "34.97px",
                                    padding: "4px 10px 4px 10px",
                                    border: "1px solid #666666",
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    ":hover": {
                                        boxShadow: "1px 3px 18px 0px #C89FF5"
                                    },
                                    overflow: "hidden"
                                }}
                                onClick={() => handleOpenBankModal()}
                            >
                                <Stack spacing={"14px"} direction={'row'} alignItems={"center"}>

                                    <Typography
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: "20.26px",
                                            lineHeight: "17.36px",
                                            letterSpacing: "-1.45px",
                                            color: "#000"
                                        }}
                                    >Bank</Typography>

                                    <AccountBalanceOutlinedIcon
                                        sx={{ color: "#000" }}
                                    />
                                </Stack>
                            </Box> */}
                            
                            <Box
                                sx={{
                                    width: "111.12px",
                                    height: "34.97px",
                                    padding: "4px 10px 4px 10px",
                                    border: "1px solid #666666",
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    ":hover": {
                                        boxShadow: "1px 3px 18px 0px #C89FF5"
                                    },
                                    overflow: "hidden"
                                }}
                                onClick={() => handleOpenFlutterwaveModal()}
                            >
                                <img 
                                    src={FlutterwaveLogo} alt='Flutterwave Logo'
                                    style={{
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>
                        </Stack>


                        <Box sx={{
                            borderRadius: "17px",
                            bgcolor: darkTheme ? "#fff" : "#272727",
                            p: "10px 26px 10px 26px",
                            my: "60px",
                            width: "fit-content",
                            mx: "auto"
                        }}>
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

export default PayoutMethodModalComponent;