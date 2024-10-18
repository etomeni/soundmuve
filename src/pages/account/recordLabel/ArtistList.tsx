import { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Grid from '@mui/material/Grid';

import { emekaApiEndpoint } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';
import AccountWrapper from '@/components/AccountWrapper';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import RecordLabelBigSidebarComponent from '@/components/account/recordLabel/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/recordLabel/RecordLabelSmallSidebar';
import RecordLabelSearchComponent from '@/components/account/recordLabel/RecordLabelSearch';
import { useUserStore } from '@/state/userStore';
import { recordLabelArtistInterface } from '@/constants/typesInterface';
import { getLocalStorage, setLocalStorage } from '@/util/storage';
import ArtistListItemView from '@/components/account/recordLabel/ArtistListItemView';


const ArtistList_RL = () => {
    // const navigate = useNavigate();
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const userData = useUserStore((state) => state.userData); 
    const accessToken = useUserStore((state) => state.accessToken);
    const [recordLabelArtist, setRecordLabelArtist] = useState<recordLabelArtistInterface[]>();

    const [smallSideNav, setsmallSideNav] = useState(true);

    useEffect(() => {
        const artistsList = getLocalStorage("artistsList");
        if (artistsList && artistsList.length) {
            setRecordLabelArtist(artistsList);
        }
        getAllRecordLabelArtist()
      
    }, []);
    
    const getAllRecordLabelArtist = async () => {
        try {
            const response = (await axios.get(`${emekaApiEndpoint}/recordLabel/artistsList?recordLabelemail=${ userData.email }`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            // console.log(response);

            setRecordLabelArtist(response.artists);
            setLocalStorage("artistsList", response.artists);
        } catch (error: any) {
            const errorResponse = error.response.data;
            console.error(errorResponse);
            setRecordLabelArtist([]);
        }
    }
    


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