import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

// import { useSettingStore } from '@/state/settingStore';
import { getCurrencySymbol } from '@/util/currencies';
import { currencyDisplay, formatedNumber } from '@/util/resources';
import colors from '@/constants/colors';
import { transactionInterface } from '@/typeInterfaces/transaction.interface';


interface _Props {
    openModal: boolean,
    withdrawlData: transactionInterface | undefined,
    closeModal: () => void;
}

const FL_RequestConfirmationModalComponent: React.FC<_Props> = ({
    openModal, closeModal, withdrawlData
}) => {
    const navigate = useNavigate();
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    if (!withdrawlData) {
        if (openModal) {
            closeModal()
        }
        return;
    };

    const handleCloseModal = () => {
        navigate('/account/analytics/balance-history');

        // const url = window.location.pathname;
        // if (url.includes("artist")) {
        //     navigate('/account/artist/balance-history');
        // } else {
        //     navigate('/account/record-label/balance-history');
        // }
        closeModal();
    }


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
                        bgcolor: colors.bg,
                        maxWidth: {xs: "92%", sm: "496px"},
                        maxHeight: "605px",
                        borderRadius: "12px",
                        p: "25px",
                        color: colors.dark
                    }}
                >
                    <Box sx={{textAlign: "right"}}>
                        <IconButton onClick={() => closeModal() }>
                            <CloseIcon 
                                sx={{color: colors.primary, fontSize: "30px"}} 
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
                        >Payout Request Confirmation </Typography>

                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "14px",
                                lineHeight: "12px",
                                letterSpacing: "-1px",
                                textAlign: 'center',
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
                        >
                            {/* {`${getCurrencySymbol(withdrawlData?.withdrawal?.currency)}${formatedNumber(Number(withdrawlData.amount))} `} */}
                            {`${currencyDisplay(Number(withdrawlData.amount))} `}

                            <Typography variant='subtitle2' component="span"
                                sx={{
                                    display: withdrawlData.withdrawal?.currency.toLowerCase() == "usd" ? "none" : "initial",
                                }}
                            >( {`${getCurrencySymbol(withdrawlData.withdrawal?.currency || '')}${formatedNumber(Number(withdrawlData.withdrawal?.exchangeRate.destination.amount))}`} )</Typography>

                        </Typography>
                        {/* > $200.00 </Typography> */}


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
                                {/* <Typography
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
                                >$1.00</Typography> */}

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        lineHeight: "12px",
                                        letterSpacing: "-1px",
                                        flex: "1 1 45%"
                                    }}
                                >Confirmation Id</Typography>
                                {/* >Confirmation Number</Typography> */}

                                <Typography
                                    sx={{
                                        fontWeight: "700",
                                        fontSize: "11px",
                                        lineHeight: "17px",
                                        // letterSpacing: "-1px"
                                        flex: "1 1 45%"
                                    }}
                                >{ withdrawlData._id }</Typography>

                                {/* <Typography
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
                                >Bank account</Typography> */}

                            </Box>
                        </Stack>

                        <Stack direction={"row"} spacing={"20px"} alignItems={"center"} justifyContent={"center"}>
                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "12px",
                                    background: colors.primary,
                                    color: colors.milk,
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => handleCloseModal()}
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

export default FL_RequestConfirmationModalComponent;