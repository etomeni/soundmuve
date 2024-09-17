import React from 'react';

import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Modal from '@mui/material/Modal';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// import FlutterwaveLogo2 from "@/assets/images/FlutterwaveLogo2.png";

// import { useSettingStore } from '@/state/settingStore';
import successImg from "@/assets/images/successImg.gif";
// import colors from '@/constants/colors';
import PaymentModalWrapper from '../PaymentWrapper';
import { getQueryParams } from '@/util/resources';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const PayoutSetupSuccessModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {
    // const [useEmail_n_PhoneNo, setUseEmail_n_PhoneNo] = useState(false);
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    
    const handlePaymentMethod = () => {
        const paymentMethod = getQueryParams('paymentMethod');

        if (paymentMethod) {
            const payment = paymentMethod.toLowerCase();
            
            if (payment?.includes('terwave')) {
                return 'Flutterwave'
            } else if (payment?.includes('aypal')) {
                return 'PayPal'
            } else {
                return ''
            }
            
        } else {
            return ''
        }

    }
    

    return (
        <PaymentModalWrapper title='Successful'
            closeModal={closeModal}
            openModal={openModal}
            poweredBy={handlePaymentMethod()}
        >
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
                    Congratulations, your have successfully setup your payout details.

                    {/* <span style={{ fontWeight: 'bold' }}>Note: </span>
                    Every detail provides would be used to process your pay out  */}
                </Typography>
            </Box>
        </PaymentModalWrapper>
    )
}

export default PayoutSetupSuccessModalComponent;