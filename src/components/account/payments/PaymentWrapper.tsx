import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import colors from '@/constants/colors';

// import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";
import FlutterwaveLogo from "@/assets/images/FlutterwaveLogo.png";
import PayPalLogo from "@/assets/images/PayPalLogo.png";

interface _Props {
    openModal: boolean,
    closeModal: () => void;

    children: React.ReactNode,
    title?: string,
    poweredBy?: "Flutterwave" | "PayPal" | ""
}


const PaymentModalWrapper: React.FC<_Props> = ({
    openModal, closeModal, children, title, poweredBy
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
                    <Box  id="payout-modal-title">
                        <Box sx={{textAlign: "right"}}>
                            <IconButton onClick={() => closeModal() }>
                                <CloseIcon sx={{color: colors.primary, fontSize: "20px"}} />
                            </IconButton>
                        </Box>

                        {
                            title ? 
                            <Typography variant="h6" component="h2"
                                sx={{
                                    fontWeight: "900",
                                    fontSize: {xs: "20px", md: "35px"},
                                    lineHeight: {xs: "20px", md: "24px"},
                                    letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                    textAlign: "center",
                                    // mt: 2
                                }}
                            > { title } </Typography>
                            : <></>
                        }
                    </Box>

                    <Box> { children } </Box>


                    {
                        poweredBy ? 
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                mt: 5
                            }}
                        >
                            <Typography variant='body2'
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "8px", 
                                    letterSpacing: "-0.41px",
                                    color: colors.dark
                                }}
                            >Powered by </Typography>

                            <Box
                                sx={{
                                    width: '97.71px',
                                    height: "22.6px",
                                }}
                            >
                                <img 
                                    src={ poweredBy == 'Flutterwave' ? FlutterwaveLogo : PayPalLogo} 
                                    alt={ poweredBy == 'Flutterwave' ? "Flutterwave Logo" : "PayPal Logo" }
                                    style={{
                                        width: '100%',
                                        objectFit: "contain"
                                    }}
                                />
                            </Box>
                        </Box>
                        : <></>
                    }
                    
                </Box>
            </Box>
        </Modal>
    )
}

export default PaymentModalWrapper;