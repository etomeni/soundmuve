import React from 'react';
import Box from '@mui/material/Box';

import AccountHeaderComponent from './AccountHeader';
import FooterComponent from './Footer';
// import bgStyles from './../bgStyles.module.css';
import bgStyles from './../util/bgStyles.module.css';

import { useSettingStore } from '../state/settingStore';

interface _Props {
    children: React.ReactNode,
}

const AccountWrapper: React.FC<_Props> = ({ children }) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    return (
        <>
            <AccountHeaderComponent />

            <Box 
                sx={{
                    bgcolor: darkTheme ? "#000" : "#fff", 
                    color: darkTheme ? "#fff" : "#000", 
                    minHeight: "80vh", 
                    // pt: 5, 
                    position: "relative", 
                    overflow: "hidden"
                }}
            >
                { darkTheme && 
                    <>
                        <Box sx={{display: { xs: 'none', md: 'block' }}}>
                            <div className={bgStyles.topGradient}></div>
                            <div className={bgStyles.leftGradient}></div>
                            <div className={bgStyles.leftBottomGradient}></div>
                            <div className={bgStyles.rightTopGradient}></div>
                            <div className={bgStyles.rightBottom2Gradient}></div>
                            <div className={bgStyles.btnCenteredGradient}></div>
                            <div className={bgStyles.leftBottom2Gradient}></div>
                        </Box>

                        <Box sx={{display: { xs: 'block', md: 'none' }}}>
                            <div className={bgStyles.mobileLeftGradient}></div>
                            <div className={bgStyles.mobileRightGradient}></div>
                            <div className={bgStyles.mobileCenteredGradient}></div>
                        </Box>
                    </>
                }

                { children }

            </Box>

            <FooterComponent />
        </>

    )
}

export default AccountWrapper;