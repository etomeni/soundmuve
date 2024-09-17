import React from 'react';

import Box from '@mui/material/Box';

import PaymentModalWrapper from '../PaymentWrapper';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const KycSetupQuestionsModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {


    return (
        <PaymentModalWrapper title=''
            closeModal={closeModal}
            openModal={openModal}
            // poweredBy=''
        >
            <Box id="payout-modal-description">

            </Box>
        </PaymentModalWrapper>
    )
}

export default KycSetupQuestionsModalComponent;