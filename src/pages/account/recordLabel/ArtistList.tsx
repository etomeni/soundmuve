import { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import { apiEndpoint, stringAvatar } from '@/util/resources';
import { useSettingStore } from '@/state/settingStore';
import AccountWrapper from '@/components/AccountWrapper';
import PromotionalAdsComponent from '@/components/PromotionalAds';
import RecordLabelBigSidebarComponent from '@/components/account/RecordLabelBigSidebar';
import RecordLabelSmallSidebarComponent from '@/components/account/RecordLabelSmallSidebar';
import RecordLabelSearchComponent from '@/components/account/RecordLabelSearch';
import { useUserStore } from '@/state/userStore';
import { recordLabelArtistInterface } from '@/constants/typesInterface';
import { getLocalStorage, setLocalStorage } from '@/util/storage';


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
            const response = (await axios.get(`${apiEndpoint}/recordLabel/artistsList?recordLabelemail=${ userData.email }`, {
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

                        <RecordLabelSearchComponent darkTheme={darkTheme} artists={recordLabelArtist || []} />


                        <Box my={5}>
                            <PromotionalAdsComponent />
                        </Box>

                        <Box my={5}>

                            <Grid container spacing={3}>
                                {
                                    recordLabelArtist && recordLabelArtist?.map((item, i) => (
                                        <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                                            <Stack alignItems="center">

                                                <Avatar
                                                    alt={`${item.artistName} image`}
                                                    src={item.artistAvatarUrl}
                                                    // variant="rounded"
                                                    aria-label={item.artistName}
                                                    sx={{ 
                                                        boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                                                        // bgcolor: stringToColor(project.title),
                                                        width: "110px",
                                                        height: "110px",
                                                        // mb: "0.5rem",
                                                        // p: 1
                                                    }}
                                                    children={<Typography sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold"
                                                    }}>{stringAvatar(item.artistName)}</Typography>}
                                                />
                        
                                                <Typography variant='h4' component="h4"
                                                    sx={{
                                                        fontWeight: '900',
                                                        fontSize: '23.73px',
                                                        lineHeight: '14.24px',
                                                        letterSpacing: '-0.59px',
                                                        mt: '26px'
                                                    }}
                                                >{item.artistName}</Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontWeight: "400",
                                                        fontSize: '14.24px',
                                                        lineHeight: '10.68px',
                                                        letterSpacing: '-0.59px',
                                                        color: '#666666',
                                                        mt: '13px'
                                                    }}
                                                >{item.songCount}</Typography>
                                            </Stack>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </AccountWrapper>
    )
}

export default ArtistList_RL