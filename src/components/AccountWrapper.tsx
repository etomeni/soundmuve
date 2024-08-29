import React from 'react';
import Box from '@mui/material/Box';

import AccountHeaderComponent from './AccountHeader';
import FooterComponent from './Footer';

import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';

interface _Props {
    children: React.ReactNode,
}

const AccountWrapper: React.FC<_Props> = ({ children }) => {

    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <AccountHeaderComponent />

            <Box sx={{
                ...contentWidth,
            }}>
                { children }
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default AccountWrapper;