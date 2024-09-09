import React, { useState } from 'react';
import Box from '@mui/material/Box';
import RecordLabelSmallSidebarComponent from './RecordLabelSmallSidebar';
import RecordLabelBigSidebarComponent from './RecordLabelBigSidebar';

interface _Props {
    children: React.ReactNode,
    // bottomSpacing?: number,
    // topSpacing?: boolean
}

export default function RecordLabelWrapper({ children } : _Props ) {
    const [smallSideNav, setsmallSideNav] = useState(true);

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                sx={{
                    bgcolor: '#E0D9CE',
                    borderRadius: '8.67px',
                    display: {xs: 'none', sm: 'initial'},
                    transition: '0.5s',
                    transitionTimingFunction: 'ease-in-out',
                }}
            >
                {
                    smallSideNav ? 
                    <RecordLabelSmallSidebarComponent setSideNav={setsmallSideNav} />
                    :
                    <RecordLabelBigSidebarComponent setSideNav={setsmallSideNav} />
                }
            </Box>

            <Box flexGrow={1}
                sx={{
                    overflow: 'auto',
                    // scrollBehavior: 'smooth',
                    flex: 1,
                }}
            > { children } </Box>
        </Box>
    );
}
