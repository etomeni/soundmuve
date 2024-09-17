import React from 'react';
import Box from '@mui/material/Box';
import KycModalWrapper from './KycWrapper';
import Typography from '@mui/material/Typography';
import colors from '@/constants/colors';


interface _Props {
    openModal: boolean,
    closeModal: () => void;
}

const KycSetupModalComponent: React.FC<_Props> = ({
    openModal, closeModal
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);



    return (
        <KycModalWrapper 
            closeModal={closeModal}
            openModal={openModal}
            // poweredBy=''
        >
            <Box>

                <Typography variant="h6" component="h2"
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "20px", md: "35px"},
                        lineHeight: {xs: "20px", md: "24px"},
                        letterSpacing: {xs: "-0.34px", md: "-1.34px"},
                        textAlign: "center",
                        // mt: 2
                        color: colors.dark
                    }}
                > Ready to set up your payment? </Typography>

                <Typography variant='body2'
                    sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "16px", 
                        letterSpacing: "-0.341px",
                        color: colors.dark,
                        textAlign: "center"
                    }}
                >
                    Please answer the following KYC 
                    questions to help us serve you better
                </Typography>







                <Typography variant='body2'
                    sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "16px", 
                        letterSpacing: "-0.341px",
                        color: colors.dark,
                        textAlign: "center"
                    }}
                >
                    <b>Note: </b> please use a phone number you can easily remember
                </Typography>



            </Box>
        </KycModalWrapper>
    )
}

export default KycSetupModalComponent;