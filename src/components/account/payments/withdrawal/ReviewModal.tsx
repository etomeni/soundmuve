import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { useUserStore } from '@/state/userStore';
// import { useSettingStore } from '@/state/settingStore';

import { emekaApiEndpoint, formatedNumber } from '@/util/resources';
import { withdrawInterface } from './WithdrawModal';
import { getCurrencySymbol } from '@/util/currencies';
import colors from '@/constants/colors';
import PaymentModalWrapper from '../PaymentWrapper';


export interface successfulWithdrawalInterface {
    email: string;
    narration: string;
    credit: number;
    debit: number;
    amount: number;
    currency: string;
    status: string;
    balance: number;
    created_at: string;
    _id: string;
};

interface _Props {
    openModal: boolean,
    closeModal: () => void;
    // changeMethod: () => void;
    saveBtn: (data: successfulWithdrawalInterface) => void;
    formDetails: withdrawInterface
}


const FL_ReviewModalComponent: React.FC<_Props> = ({
    openModal, closeModal, saveBtn, formDetails
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const accessToken = useUserStore((state) => state.accessToken);
    const userData = useUserStore((state) => state.userData);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    useEffect(() => {
        setApiResponse({
            display: false,
            status: true,
            message: ""
        });
        
        return () => {
            setApiResponse({
                display: false,
                status: true,
                message: ""
            });
        }
    }, []);

    const onSubmit = async () => {

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        const data2db = {
            email: userData.email,
            narration: formDetails.narration,
            amount: formDetails.amount,
            currency: formDetails.currency,
            id: formDetails.paymentDetails?._id || ''
        };

        // const thisData: any = {};
        // saveBtn(thisData);


        setApiResponse({
            display: true,
            status: false,
            message: "Insufficient balance"
        });
        return;
        
        try {
            const response = (await axios.post(`${emekaApiEndpoint}/transactionInit/initiate`, data2db, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            console.log(response);
            // setBanks(response.data);

            saveBtn(response.transaction);

        } catch (error: any) {
            const errorResponse = error.response.data;
            // console.error(errorResponse);

            setApiResponse({
                display: true,
                status: false,
                message: errorResponse.message || "Ooops and error occurred!"
            });

        }
    }


    return (
        <PaymentModalWrapper title='Payout Review'
            closeModal={closeModal}
            openModal={openModal}
            // poweredBy=''
        >
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
                        {`${getCurrencySymbol(formDetails.currency)}${formatedNumber(Number(formDetails.amount))} `}
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
                        {/* Fees displayed are only an estimate. More Information on payout fees can be found on Payoneer's Fee Overview Page */}
                        Fees displayed are only an estimate. More Information on payout fees can will be mailed to you.
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
                            background: colors.primary,
                            color: colors.milk,
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
                            border: `1px solid ${colors.dark}`,
                            color: colors.dark,
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
        </PaymentModalWrapper>
    )
}

export default FL_ReviewModalComponent;