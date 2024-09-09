import React from 'react';
import Box from '@mui/material/Box';

import AccountHeaderComponent from './AccountHeader';
import FooterComponent from './Footer';

import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';

interface _Props {
    children: React.ReactNode,
    bottomSpacing?: number,
    topSpacing?: boolean
}

const AccountWrapper: React.FC<_Props> = ({ children, topSpacing = true, bottomSpacing = 7,  }) => {

    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <AccountHeaderComponent headerSpacing={topSpacing} />

            <Box sx={{
                ...contentWidth,
                mb: bottomSpacing
            }}>
                { children }
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default AccountWrapper;