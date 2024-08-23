import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PayoutMethodModalComponent from './setup/PayoutMethodModal';
import FL_RequestConfirmationModalComponent from './withdrawal/FL_RequestConfirmationModal';
import FL_ReviewModalComponent from './withdrawal/FL_ReviewModal';
import FL_WithdrawModalComponent from './withdrawal/FL_WithdrawModal';
import FL_CurrencyModalComponent from './setup/FL_Currency';
import FL_USpaymentsModalComponent, { usPaymentsInterface } from './setup/usPayments/FL_USpayments';
import FL_US_ConfirmationModalComponent from './setup/usPayments/FL_US_Confirmation';
import FL_NgPaymentsModalComponent, { ngPaymentsInterface } from './setup/ngPayments/FL_NgPayments';
import FL_NgConfirmationModalComponent from './setup/ngPayments/FL_NgConfirmation';
import FL_AfroPaymentsModalComponent, { afroPaymentsInterface } from './setup/afroPayments/FL_AfroPayments';
import FL_AfroConfirmationModalComponent from './setup/afroPayments/FL_AfroConfirmation';
import FL_EuroPaymentsModalComponent, { euroPaymentsInterface } from './setup/euroPayments/FL_Europayments';
import FL_EuroConfirmationModalComponent from './setup/euroPayments/FL_EuroConfirmation';
import PayoutFL_SuccessModalComponent from './setup/PayoutSetFlutterwaveSuccessModal';


interface _Props {
    openPayoutModal: boolean,
    setOpenPayoutModal: (state: boolean) => void;
    
    withdrawlModal: boolean,
    setWithdrawlModal: (state: boolean) => void;
}

const PaymentzComponent: React.FC<_Props> = ({
    openPayoutModal = false, setOpenPayoutModal,
    withdrawlModal = false, setWithdrawlModal
}) => {
    const navigate = useNavigate();

    const [flutterwaveCurrencyModal, setFlutterwaveCurrencyModal] = useState(false);

    // const [selectedFL_Currency, setSelectedFL_Currency] = useState('');


    // USD payment setup
    const [usPaymentDetails, setUsPaymentDetails] = useState<usPaymentsInterface>({
        accountNumber: '',
        address: '',
        bankName: '',
        beneficiaryName: '',
        country: '',
        email: '',
        routingNumber: '',
        swiftCode: '',
    });
    const [usPaymentModal, setUsPaymentModal] = useState(false);
    const [usConfirmationModal, setUsConfirmationModal] = useState(false);
    
    // NGN payment setup
    const [ngPaymentDetails, setNgPaymentDetails] = useState<ngPaymentsInterface>({
        accountNumber: '',
        beneficiaryName: '',
        bank: ''
    });
    const [ngPaymentModal, setNgPaymentModal] = useState(false);
    const [ngConfirmationModal, setNgConfirmationModal] = useState(false);
    
    // Afro payment setup
    const [afroPaymentDetails, setAfroPaymentDetails] = useState<afroPaymentsInterface>({
        accountNumber: '',
        beneficiaryName: '',
        bankName: '',
        branchCode: '',
        email: '',
    });
    const [afroPaymentModal, setAfroPaymentModal] = useState(false);
    const [afroConfirmationModal, setAfroConfirmationModal] = useState(false);
    
    // Euro payment setup
    const [euroPaymentDetails, setEuroPaymentDetails] = useState<euroPaymentsInterface>({
        accountNumber: '',
        beneficiaryName: '',
        bankName: '',
        email: '',
        city: '',
        country: '',
        postalCode: '',
        routingNumber: '',
        streetName: '',
        streetNumber: '',
        swiftCode: ''
    });
    const [euroPaymentModal, setEuroPaymentModal] = useState(false);
    const [euroConfirmationModal, setEuroConfirmationModal] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    // Withdrawals
    const [withdrawalReview, setWithdrawalReview] = useState(false);
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);
    const [withdrawlDetails, setWithdrawlDetails] = useState({
        currency: "",
        narration: "",
        amount: "",
    });
    const [successfulWithdrawlDetails, setSuccessfulWithdrawlDetails] = useState({
        email: '',
        narration: '',
        credit: 0,
        debit: 0,
        amount: 0,
        currency: '',
        status: '',
        balance: 0,
        created_at: '',
        _id: '',
    })

    const confirmSetWithdrawlBtn = (data: typeof withdrawlDetails) => {
        setWithdrawlDetails(data);
        setWithdrawalReview(true);
    }

    const saveWithdrawlBtn = (data: typeof successfulWithdrawlDetails) => {
        setSuccessfulWithdrawlDetails(data);
        setWithdrawlModal(false);
        setWithdrawalReview(false);
        setWithdrawSuccess(true);

        // TODO:: navigate to balance history page.
    }


    const confirmUsPaymentsBtn = (data: usPaymentsInterface) => {
        // console.log(data);
        setUsPaymentDetails(data);
        setUsConfirmationModal(true);
    }

    const saveUsPaymentBtn = () => {
        setUsPaymentModal(false);
        setUsConfirmationModal(false);
        setSuccessModal(true);
    }


    const confirmNgPaymentsBtn = (data: ngPaymentsInterface) => {
        // console.log(data);
        setNgPaymentDetails(data);
        setNgConfirmationModal(true);
    }

    const saveNgPaymentBtn = () => {
        setNgPaymentModal(false);
        setNgConfirmationModal(false);
        setSuccessModal(true);
    }
    
    const confirmAfroPaymentsBtn = (data: afroPaymentsInterface) => {
        // console.log(data);
        setAfroPaymentDetails(data);
        setAfroConfirmationModal(true);
    }

    const saveAfroPaymentBtn = () => {
        setAfroPaymentModal(false);
        setAfroConfirmationModal(false);
        setSuccessModal(true);
    }
    
    const confirmEuroPaymentsBtn = (data: euroPaymentsInterface) => {
        // console.log(data);
        setEuroPaymentDetails(data);
        setEuroConfirmationModal(true);
    }

    const saveEuroPaymentBtn = () => {
        setEuroPaymentModal(false);
        setEuroConfirmationModal(false);
        setSuccessModal(true);
    }


    const confirmFL_CurrencyBtn = (currency: string) => {
        // console.log(currency);
        // setSelectedFL_Currency(currency);

        navigate(`?currency=${currency}`);

        switch (currency) {
            case "NGN":
                setNgPaymentModal(true);
                setFlutterwaveCurrencyModal(false);
                
                break;
            case "EUR":
                setEuroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "GBP":
                setEuroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "USD":
                setUsPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "GHS":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "UGX":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "TZS":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "XOF":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "XAF":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "GNF":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            case "RWF":
                setAfroPaymentModal(true);
                setFlutterwaveCurrencyModal(false);

                break;
            default:
                break;
        }
    }


    return (
        <>

            <PayoutMethodModalComponent 
                openModal={openPayoutModal}
                closeModal={() => setOpenPayoutModal(false)}
                
                openBankPayoutModal={() => {}}
                openFlutterwavePayoutModal={() => setFlutterwaveCurrencyModal(true)}
            />

            <FL_CurrencyModalComponent 
                openModal={flutterwaveCurrencyModal}
                closeModal={() => setFlutterwaveCurrencyModal(false)}
                changeMethod={() => {
                    setFlutterwaveCurrencyModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmFL_CurrencyBtn}
            />


            <FL_USpaymentsModalComponent 
                openModal={usPaymentModal}
                closeModal={() => setUsPaymentModal(false)}
                changeMethod={() => {
                    setUsPaymentModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmUsPaymentsBtn}
            />

            <FL_US_ConfirmationModalComponent 
                openModal={usConfirmationModal}
                closeModal={() => setUsConfirmationModal(false)}
                formDetails={usPaymentDetails}
                saveBtn={saveUsPaymentBtn}
            />


            <FL_NgPaymentsModalComponent 
                openModal={ngPaymentModal}
                closeModal={() => setNgPaymentModal(false)}
                changeMethod={() => {
                    setNgPaymentModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmNgPaymentsBtn}
            />

            <FL_NgConfirmationModalComponent 
                openModal={ngConfirmationModal}
                closeModal={() => setNgConfirmationModal(false)}
                formDetails={ngPaymentDetails}
                saveBtn={saveNgPaymentBtn}
            />

            <FL_AfroPaymentsModalComponent 
                openModal={afroPaymentModal}
                closeModal={() => setAfroPaymentModal(false)}
                changeMethod={() => {
                    setAfroPaymentModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmAfroPaymentsBtn}
            />

            <FL_AfroConfirmationModalComponent 
                openModal={afroConfirmationModal}
                closeModal={() => setAfroConfirmationModal(false)}
                formDetails={afroPaymentDetails}
                saveBtn={saveAfroPaymentBtn}
            />


            <FL_EuroPaymentsModalComponent 
                openModal={euroPaymentModal}
                closeModal={() => setEuroPaymentModal(false)}
                changeMethod={() => {
                    setEuroPaymentModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmEuroPaymentsBtn}
            />

            <FL_EuroConfirmationModalComponent 
                openModal={euroConfirmationModal}
                closeModal={() => setEuroConfirmationModal(false)}
                formDetails={euroPaymentDetails}
                saveBtn={saveEuroPaymentBtn}
            />

            <PayoutFL_SuccessModalComponent 
                openModal={successModal}
                closeModal={() => setSuccessModal(false)}
            />




            <FL_WithdrawModalComponent 
                openModal={withdrawlModal}
                closeModal={() => setWithdrawlModal(false)}
                changeMethod={() => {
                    setWithdrawlModal(false);
                    setOpenPayoutModal(true);
                }}
                confirmBtn={confirmSetWithdrawlBtn}
            />


            <FL_ReviewModalComponent 
                openModal={withdrawalReview}
                closeModal={() => setWithdrawalReview(false) }
                formDetails={withdrawlDetails}
                saveBtn={saveWithdrawlBtn}
                // saveBtn={() => {
                //     setWithdrawlModal(false);
                //     setWithdrawalReview(false);
                //     setWithdrawSuccess(true);
                // }}
            />

            <FL_RequestConfirmationModalComponent
                openModal={withdrawSuccess}
                withdrawlData={successfulWithdrawlDetails}
                closeModal={() => setWithdrawSuccess(false)}
            />


        </>
    )
}

export default PaymentzComponent;