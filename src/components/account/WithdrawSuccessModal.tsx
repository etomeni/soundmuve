import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import { useSettingStore } from '@/state/settingStore';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const WithdrawSuccessModalComponent: React.FC<_Props> = ({
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
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon 
                                sx={{color: darkTheme ? "#fff" : "#000", fontSize: "30px"}} 
                            />
                        </IconButton>
                    </Box>

                    <Box id="payout-modal-title">
                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "20px", md: "35px"},
                                lineHeight: {xs: "20px", md: "24px"},
                                letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                textAlign: "center",
                                mt: 2
                            }}
                        >
                            Payout Request Confirmation
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "14px",
                                lineHeight: "12px",
                                letterSpacing: "-1px",
                                mt: "27px"
                            }}
                        >Payment request was sucessful</Typography>
                    </Box>


                    <Box id="payout-modal-description">
                        <Typography
                            sx={{
                                fontWeight: "900",
                                fontSize: "35px",
                                lineHeight: "24px",
                                letterSpacing: "-1.34px",
                                textAlign: "center",
                                mt: "50px"
                            }}
                        > $200.00 </Typography>


                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{my: "70px"}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    // justifyContent: "center",
                                    gap: "8px",
                                    flexWrap: "wrap"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        lineHeight: "12px",
                                        letterSpacing: "-1px",
                                        flex: "1 1 45%"
                                    }}
                                >Fees</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "11px",
                                        lineHeight: "17px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >$1.00</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        lineHeight: "12px",
                                        letterSpacing: "-1px",
                                        flex: "1 1 45%"
                                    }}
                                >Confirmation Number</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "11px",
                                        lineHeight: "17px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >1234567</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        lineHeight: "12px",
                                        letterSpacing: "-1px",
                                        flex: "1 1 45%"
                                    }}
                                >Payout Type</Typography>

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "11px",
                                        lineHeight: "17px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >Bank account</Typography>
                            </Box>
                        </Stack>

                        <Stack direction={"row"} spacing={"20px"} alignItems={"center"} justifyContent={"center"}>
                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "12px",
                                    background: darkTheme ? "#fff" : "#272727",
                                    color: darkTheme ? "#000" : "#fff",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => closeModal()}
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: "12px",
                                        lineHeight: "12px",
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Back to Dashboard </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default WithdrawSuccessModalComponent;