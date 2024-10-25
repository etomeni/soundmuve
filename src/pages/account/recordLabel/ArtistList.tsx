import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import { useSettingStore } from '@/state/settingStore';
import AccountWrapper from '@/components/AccountWrapper';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import RecordLabelBigSidebarComponent from '@/components/account/recordLabel/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/recordLabel/RecordLabelSmallSidebar';
import RecordLabelSearchComponent from '@/components/account/recordLabel/RecordLabelSearch';
import ArtistListItemView from '@/components/account/recordLabel/ArtistListItemView';
import { useRecordLabelFn } from '@/hooks/recordLabel/useRecordLabelFn';


const ArtistList_RL = () => {
    // const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    // const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>();

    const [smallSideNav, setsmallSideNav] = useState(true);

    const {
        // getTotalNumberOfArtist,
        getAllRecordLabelArtist,
        // getRecordLabelTotalSongs,

        // totalArtists,
        // totalSongs,
        recordLabelArtist,
    } = useRecordLabelFn();

    useEffect(() => {
        getAllRecordLabelArtist()
    }, []);
 


    return (
        <AccountWrapper>
            <Box sx={{ display: "flex" }}>

                <Box
                    sx={{
                        bgcolor: '#E0D9CE',
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

                    <RecordLabelSearchComponent darkTheme={darkTheme} artists={recordLabelArtist || []} />


                    <Box my={5}>
                        <PromotionalAdsComponent />
                    </Box>

                    <Box my={5}>
                        {
                            recordLabelArtist ? 
                                <ArtistListItemView recordLabelArtist={recordLabelArtist} />
                            : <></>
                        }
                    </Box>

                </Box>
            </Box>
        </AccountWrapper>
    )
}

export default ArtistList_RL