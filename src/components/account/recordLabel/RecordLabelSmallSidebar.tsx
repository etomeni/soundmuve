import { useLocation, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import IconButton from '@mui/material/IconButton';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

// import { useSettingStore } from '@/state/settingStore';
import { useUserStore } from '@/state/userStore';
// import PaymentComponent from './PaymentComponent';
import PaymentzComponent from '../payments/PaymentzComponent';
import colors from '@/constants/colors';


interface _Props {
    // openModal: boolean,
    setSideNav: (state: boolean) => void;
}

const RecordLabelSmallSidebarComponent: React.FC<_Props> = ({setSideNav}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const _logOutUser = useUserStore((state) => state._logOutUser);

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);

    return (
        <Box onMouseEnter={() => setSideNav(false)} onMouseLeave={() => setSideNav(true)}
            sx={{
                // position: 'relative'
                height: '100%',
                // maxHeight: "100vh",
                position: 'sticky',
                top: 100
            }}
        >
            <Box
                sx={{
                    pt: {xs: 5, md: 10},
                }}
            >
                <List>
                    <ListItem disablePadding 
                        sx={{ 
                            color: pathname.endsWith('/account/record-label') || 
                            pathname.endsWith('/account/record-label/') ? colors.primary : colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label')}>
                            <IconButton>
                                <HomeIcon sx={{ 
                                    color: pathname.endsWith('/account/record-label') || 
                                    pathname.endsWith('/account/record-label/') ? colors.primary : colors.dark,
                                }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ my: '15px' }}>
                        <ListItemButton disabled
                            sx={{ "&.Mui-disabled": { opacity: 1 } }}  
                        >
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding 
                        sx={{ 
                            mb: '35px',
                            color: pathname.includes('/account/record-label/sales-report') ? colors.primary : colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/sales-report')}>
                            <IconButton>
                                <ReceiptLongIcon sx={{
                                    color: pathname.includes('/account/record-label/sales-report') ? colors.primary : colors.dark,
                                }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding
                        sx={{ 
                            mb: '35px', 
                            color: pathname.includes('/account/record-label/balance-history') ? colors.primary : colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/balance-history')}>
                            <IconButton>
                                <AccountBalanceWalletIcon sx={{ 
                                    color: pathname.includes('/account/record-label/balance-history') ? colors.primary : colors.dark,
                                }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding
                        sx={{ 
                            mb: '35px',
                            color: "#666666"
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/analytics-reach')}>
                            <IconButton>
                                <AssessmentOutlinedIcon sx={{ color: "#666666" }}  />
                            </IconButton>
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding
                        sx={{ 
                            mb: '35px',
                            color: colors.dark
                        }}
                    >
                        <ListItemButton onClick={() => setWithdrawlModal(true)}>
                            <IconButton>
                                <AccountBalanceOutlinedIcon sx={{ color: colors.dark }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding sx={{ mb: '15px' }}>
                        <ListItemButton disabled
                            sx={{ "&.Mui-disabled": { opacity: 1 } }}  
                        >
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding onClick={() => navigate('/account/record-label/add-artist')}
                        sx={{ 
                            mb: '35px',
                            color: colors.dark,
                        }}
                    >
                        <ListItemButton>
                            <IconButton>
                                <PersonIcon sx={{ color: '#627C1D', }}  />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => _logOutUser()}
                        sx={{ 
                            mb: '435x',
                            color: colors.dark,
                        }}
                    >
                        <ListItemButton>
                            <IconButton>
                                <SettingsPowerIcon sx={{ color: colors.dark }}  />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            
            <PaymentzComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            />

        </Box>
    )
}

export default RecordLabelSmallSidebarComponent;