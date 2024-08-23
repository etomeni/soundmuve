import { useState } from 'react';

import Box from '@mui/material/Box';

import AccountWrapper from '@/components/AccountWrapper';
import { useSettingStore } from '@/state/settingStore';
import RecordLabelBigSidebarComponent from '@/components/account/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/RecordLabelSmallSidebar';
import ArtistFormDetailsComponent from '@/components/ArtistFormDetails';

// import { useSettingStore } from '@/state/settingStore';
// import { useUserStore } from '@/state/userStore';



function AddArtistRecordLabel() {
    // const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    // const userData = useUserStore((state) => state.userData); 
    // const accessToken = useUserStore((state) => state.accessToken);

    const [smallSideNav, setsmallSideNav] = useState(true);


    return (
        <AccountWrapper>

            <Box sx={{ position: "relative", zIndex: 10 }}>

                <Box sx={{ display: "flex" }}>

                    <Box
                        sx={{
                            bgcolor: darkTheme ? "#1C1B1F" : '#EFEFEF',
                            borderRadius: '8.67px',
                            display: {xs: 'none', sm: 'initial'},
                            // overflow: 'auto',
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
                            // height: '100dvh',
                            overflow: 'auto',
                            scrollBehavior: 'smooth',
                            flex: 1,

                            pt: 5,
                            px: {xs: 2, md: 5, lg: 12},
                            pb: 5,
                        }}
                    >

                        <ArtistFormDetailsComponent />

                    </Box>
                </Box>

            </Box>

        </AccountWrapper>
    )
}

export default AddArtistRecordLabel;
