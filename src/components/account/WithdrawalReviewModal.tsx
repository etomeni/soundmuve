import React, { useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { useUserStore } from '@/state/userStore';
import { useSettingStore } from '@/state/settingStore';

import { apiEndpoint } from '@/util/resources';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
    // changeMethod: () => void;
    saveBtn: () => void;
    formDetails: {amount: string}
}


const WithdrawalReviewModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const onSubmit = async () => {

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });


        saveBtn();

        return;

        try {
            const response = (await axios.post(`${apiEndpoint}/payouts/banks/NG`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setBanks(response.data);

            saveBtn();

            
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });

            // _setToastNotification({
            //     display: true,
            //     status: "error",
            //     message: errorResponse.message || "Ooops and error occurred!"
            // });
        }


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


                        <Typography variant="h6" component="h2"
                            sx={{
                                fontWeight: "900",
                                fontSize: {xs: "20px", md: "35px"},
                                lineHeight: {xs: "20px", md: "24px"},
                                letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                                textAlign: "center",
                                // mt: 2
                            }}
                        >
                            Payout Review
                        </Typography>

                    </Box>

                    <Box id="payout-modal-description" sx={{mt: 5}}>

                        <Box sx={{my: "35px"}}>
                            <Typography variant='h4' component='h4'
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    lineHeight: "12px",
                                    letterSpacing: "-1px",
                                    // color: "#797979"
                                }}
                            > Amount </Typography>

                            <Typography variant='h1' component='h1'
                                sx={{
                                    fontWeight: "900",
                                    fontSize: "35px",
                                    lineHeight: "24px",
                                    letterSpacing: "-1.34px",
                                    mt: "25px"
                                }}
                            >
                                ${formDetails.amount}
                            </Typography>
                        </Box>

                        <Stack direction={"row"} spacing={"8px"} sx={{mb: "70px"}}>
                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    lineHeight: "12px",
                                    letterSpacing: "-1px"
                                }}
                            > Fees: </Typography>


                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "11px",
                                    lineHeight: "17px",
                                    color: "#797979"
                                }}
                            >
                                Fees displayed are only an estimate. More Information on payout fees can be found on Payoneer's Fee Overview Page
                            </Typography>
                        </Stack>


                        {
                            apiResponse.display && (
                                <Stack sx={{ width: '100%', my: 2 }}>
                                    <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                                </Stack>
                            )
                        }
                        

                        <Stack direction={"row"} spacing={"20px"} alignItems={"center"} justifyContent={"space-between"}>
                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "17px",
                                    background: darkTheme ? "#fff" : "#272727",
                                    color: darkTheme ? "#000" : "#fff",
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                                onClick={() => onSubmit()}
                            >
                                <Typography 
                                    sx={{
                                        fontWeight: '700',
                                        fontSize: "12px",
                                        lineHeight: "12px",
                                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                                        textAlign: 'center',
                                    }}
                                > Confirm Request </Typography>
                            </Box>

                            <Box 
                                sx={{
                                    p: "10px 25px",
                                    borderRadius: "17px",
                                    // background: darkTheme ? "#fff" : "#272727",
                                    border: darkTheme ? "1px solid #fff" : "1px solid #000000",
                                    color: darkTheme ? "#fff" : "#000",
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
                                > Cancel Request </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default WithdrawalReviewModalComponent;