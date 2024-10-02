import { useLocation, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import { useUserStore } from '@/state/userStore';
// import PaymentComponent from './PaymentComponent';
import PaymentzComponent from '../payments/PaymentzComponent';
import colors from '@/constants/colors';



interface _Props {
    // openModal: boolean,
    setSideNav: (state: boolean) => void;
}

const RecordLabelBigSidebarComponent: React.FC<_Props> = ({setSideNav}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const _logOutUser = useUserStore((state) => state._logOutUser);

    const [openPayoutModal, setOpenPayoutModal] = useState(false);
    const [withdrawlModal, setWithdrawlModal] = useState(false);

    return (
        <Box onMouseEnter={() => setSideNav(false)} onMouseLeave={() => setSideNav(true)}
            sx={{
                maxWidth: "200px",
                width: '100%',
                height: "100%"
            }}
        >
            <Box
                sx={{
                    // height: '100dvh',
                    // overflow: 'auto',
                    pt: {xs: 5, md: 10},
                }}
            >
                <List>
                    <ListItem disablePadding sx={{ 
                        color: pathname.endsWith('/account/record-label') || 
                        pathname.endsWith('/account/record-label/') ? colors.primary : colors.dark,
                    }}>
                        <ListItemButton onClick={() => navigate('/account/record-label')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <HomeIcon sx={{ 
                                    color: pathname.endsWith('/account/record-label') || 
                                    pathname.endsWith('/account/record-label/') ? colors.primary : colors.dark,
                                }} />
                            </ListItemIcon>

                            <ListItemText primary="Home" />

                            <IconButton  onClick={() => setSideNav(true)}>
                                <CloseIcon sx={{ fontSize: '16px', color: colors.dark }} />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ my: '40px' }}>
                        <ListItemButton disabled
                            sx={{
                                "&.Mui-disabled": {
                                    opacity: 1
                                }
                            }}  
                        >
                            <ListItemText 
                                primary=""
                                // primary="Analytics"
                                sx={{ 
                                    color: colors.secondary, 
                                    "& .MuiListItemText-primary": {
                                        fontWeight: '900', 
                                        fontSize: '15px' ,
                                    }
                                }} 
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding 
                        sx={{ 
                            mb: '40px',
                            color: pathname.includes('/account/record-label/sales-report') ? colors.primary : colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/sales-report')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <ReceiptLongIcon sx={{ 
                                    color: pathname.includes('/account/record-label/sales-report') ? colors.primary : colors.dark,
                                }} />
                            </ListItemIcon>

                            <ListItemText primary="Sales report" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding
                        sx={{ 
                            mb: '40px',
                            color: pathname.includes('/account/record-label/balance-history') ? colors.primary : colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/balance-history')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <AccountBalanceWalletIcon sx={{ 
                                    color: pathname.includes('/account/record-label/balance-history') ? colors.primary : colors.dark,
                                }} />
                            </ListItemIcon>

                            <ListItemText primary="Balance history"/>
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding
                        sx={{ 
                            mb: '40px',
                            color: "#666666"
                        }}
                    >
                        <ListItemButton onClick={() => navigate('/account/record-label/analytics-reach')}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <AssessmentOutlinedIcon sx={{ color: "#666666" }}  />
                            </ListItemIcon>

                            <ListItemText primary="Reach" />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding
                        sx={{ 
                            mb: '40px',
                            color: colors.dark,
                        }}
                    >
                        <ListItemButton onClick={() => setWithdrawlModal(true)}>
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: '0px',
                                        pr: "5px"
                                    }
                                }}
                            >
                                <AccountBalanceOutlinedIcon sx={{ color: colors.dark }}  />
                            </ListItemIcon>

                            <ListItemText primary="Withdraw" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Box my="auto">
                    <Box p="8px 16px" mb="23px">
                        <Stack direction="row" alignItems="center" spacing="15px"
                            onClick={() => navigate('/account/record-label/add-artist')}
                            sx={{
                                color: "#627C1D",
                                fontWeight: '400',
                                fontSize: '13px',
                                border: `1px solid ${ "#627C1D" }`,
                                borderRadius: '6.09px',
                                padding: 1,
                                width: "130px",
                                cursor: 'pointer'
                            }}
                        >
                            <PersonIcon />
                            <Typography>Add Artist</Typography>
                        </Stack>
                    </Box>

                    <Box p="8px 16px">
                        <Stack direction="row" alignItems="center" spacing="15px"
                            onClick={() => _logOutUser()}
                            sx={{
                                color: colors.dark,
                                fontWeight: '400',
                                fontSize: '13px',
                                // border: '1px solid #666666',
                                borderRadius: '6.09px',
                                padding: 1,
                                width: "130px",
                                bgcolor: '#34343459',
                                cursor: 'pointer'
                            }}
                        >
                            <SettingsPowerIcon />
                            <Typography>Log out</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>


            <PaymentzComponent 
                withdrawlModal={withdrawlModal} setWithdrawlModal={setWithdrawlModal} 
                openPayoutModal={openPayoutModal} setOpenPayoutModal={setOpenPayoutModal}
            />

        </Box>
    )
}

export default RecordLabelBigSidebarComponent;