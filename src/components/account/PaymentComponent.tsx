import React, { useState } from 'react';


import PayoutModalComponent from '@/components/account/PayoutModal';
import PayoutFlutterwaveModalComponent from '@/components/account/PayoutFlutterwaveModal';

import FlutterwaveSetPayoutModalComponent from '@/components/account/PayoutSetFlutterwaveModal';
import PayoutSetFlutterwaveConfirmationModalComponent from '@/components/account/PayoutSetFlutterwaveConfirmationModal';
import PayoutSetFlutterwaveSuccessModalComponent from '@/components/account/PayoutSetFlutterwaveSuccessModal';
import WithdrawModalComponent from '@/components/account/WithdrawModal';
import WithdrawalReviewModalComponent from '@/components/account/WithdrawalReviewModal';
import WithdrawSuccessModalComponent from '@/components/account/WithdrawSuccessModal';


interface _Props {
    openPayoutModal: boolean,
    setOpenPayoutModal: (state: boolean) => void;
    
    withdrawlModal: boolean,
    setWithdrawlModal: (state: boolean) => void;
}


const PaymentComponent: React.FC<_Props> = ({
    openPayoutModal = false, setOpenPayoutModal,
    withdrawlModal = false, setWithdrawlModal
}) => {

    // const [openPayoutModal, setOpenPayoutModal] = useState(setPayout);
    const [openSetFlutterwaveModal, setOpenSetFlutterwaveModal] = useState(false);
    const [openSetFlutterwaveConfirmModal, setOpenSetFlutterwaveConfirmModal] = useState(false);
    const [flutterwavePaymentDetails, setFlutterwavePaymentDetails] = useState({
        bank: "",
        accountNumber: "",
        accountName: "",
        currency: "",
        verificationNumber: "",
        countryCode: ""
    })

    const [openPayoutFlutterwaveModal, setOpenPayoutFlutterwaveModal] = useState(false);
    const closePayoutFlutterwaveModal = () => { setOpenPayoutFlutterwaveModal(false) };
    const [successModal, setSuccessModal] = useState(false);
    // const [withdrawlModal, setWithdrawlModal] = useState(setWithdrawal);
    const [withdrawalReview, setWithdrawalReview] = useState(false);
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);
    const [withdrawlDetails, setWithdrawlDetails] = useState({
        // currency: "",
        amount: "",
    })

    const confirmSetWithdrawlBtn = (data: typeof withdrawlDetails) => {
        setWithdrawlDetails(data);
        setWithdrawalReview(true);
    }

    const confirmSetFlutterwavePayoutBtn = (data: typeof flutterwavePaymentDetails) => {
        console.log(data);
        
        setFlutterwavePaymentDetails(data);
        setOpenSetFlutterwaveConfirmModal(true);
    }


    return (
        <>

            <PayoutModalComponent 
                openModal={openPayoutModal}
                closeModal={() => setOpenPayoutModal(false)}
                
                openBankPayoutModal={() => setOpenSetFlutterwaveModal(true)}
                openFlutterwavePayoutModal={() => setOpenSetFlutterwaveModal(true)}
            />

            <FlutterwaveSetPayoutModalComponent 
                openModal={openSetFlutterwaveModal}
                closeModal={() => setOpenSetFlutterwaveModal(false)}
                changeMethod={() => {
                    setOpenSetFlutterwaveModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmSetFlutterwavePayoutBtn}
            />

            <PayoutSetFlutterwaveConfirmationModalComponent 
                openModal={openSetFlutterwaveConfirmModal}
                closeModal={() => setOpenSetFlutterwaveConfirmModal(false)}
                // changeMethod={() => {
                //     setOpenSetFlutterwaveModal(false);
                //     setOpenPayoutModal(true);
                // }}
                formDetails={flutterwavePaymentDetails}
                saveBtn={() => {
                    setOpenSetFlutterwaveConfirmModal(false);
                    setOpenSetFlutterwaveModal(false);
                    setSuccessModal(true);
                }}
            />

            <PayoutFlutterwaveModalComponent 
                openModal={openPayoutFlutterwaveModal}
                closeModal={closePayoutFlutterwaveModal}
            />

            <PayoutSetFlutterwaveSuccessModalComponent 
                openModal={successModal}
                closeModal={() => setSuccessModal(false)}
            />

            <WithdrawModalComponent 
                openModal={withdrawlModal}
                closeModal={() => setWithdrawlModal(false)}
                changeMethod={() => {
                    setWithdrawlModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmSetWithdrawlBtn}
            />


            <WithdrawalReviewModalComponent 
                openModal={withdrawalReview}
                closeModal={() => setWithdrawalReview(false) }
                formDetails={withdrawlDetails}
                saveBtn={() => {
                    setWithdrawlModal(false);
                    setWithdrawalReview(false);
                    setWithdrawSuccess(true);
                }}

            />

            <WithdrawSuccessModalComponent
                openModal={withdrawSuccess}
                closeModal={() => setWithdrawSuccess(false)}
            />


        </>
    )
}

export default PaymentComponent;