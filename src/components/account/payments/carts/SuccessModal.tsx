import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import successImg from "@/assets/images/successImg.gif";
// import colors from '@/constants/colors';
import ModalWrapper from '@/components/account/ModalWrapper';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const SuccessModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {

    return (
        <ModalWrapper
            closeModal={closeModal}
            openModal={openModal}
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
                    Your request has been recieved, Your would get  an email from us within 24 hours
                </Typography>
            </Box>
        </ModalWrapper>
    )
}

export default SuccessModalComponent;