import Box from '@mui/material/Box';

import HeaderComponent from '@/components/Header';
import FooterComponent from '@/components/Footer';
import FaqComponent from '@/components/FaqComponent';

import colors from '@/constants/colors';


function Faq() {

    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <FaqComponent />

            <FooterComponent />
        </Box>
    )
}

export default Faq;
