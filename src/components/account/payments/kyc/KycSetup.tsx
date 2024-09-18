import React, { useEffect, useState } from 'react';

import KycModalWrapper from './KycWrapper';
import KycPhoneNumber from './KycPhoneNumber';
import Box from '@mui/material/Box';
import KycSetupQuestionsComponent from './KycSetupQuestions';
import KycAnswersComponent from './KycAnswers';




interface _Props {
    openModal: boolean,
    closeModal: () => void;
    openSetupPaymentModal: () => void;
}

const KycSetupModalComponent: React.FC<_Props> = ({
    openModal, closeModal, openSetupPaymentModal
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const [currentView, setCurrentView] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [questions, setQuestions] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (!openModal) {
            // reset()
            setCurrentView(1);
            setPhoneNumber('');
            setQuestions([]);
            // setIsCompleted(false);
        }
    }, [openModal]);

    useEffect(() => {
        if (isCompleted) {
            closeModal();
            openSetupPaymentModal();
        }
    }, [isCompleted]);

    const handleView = () => {
        if (currentView == 1) {
            return (
                <KycPhoneNumber 
                    setPhoneNumber={setPhoneNumber} 
                    handleCurrentView={setCurrentView} 
                />
            )
        } else if (currentView == 2) {
            return (
                <KycSetupQuestionsComponent 
                    setQuestions={setQuestions} 
                    handleCurrentView={setCurrentView} 
                />
            )
        } else if (currentView == 3) {
            return (
                <KycAnswersComponent 
                    phoneNumber={phoneNumber}
                    questions={questions}
                    isCompleteState={setIsCompleted}
                />
            )
        } else {
            return <></>
        }

    }



    return (
        <KycModalWrapper 
            closeModal={closeModal}
            openModal={openModal}
            currentView={currentView}
        >
            <Box>
                { handleView() }
            </Box>
        </KycModalWrapper>
    )
}

export default KycSetupModalComponent;