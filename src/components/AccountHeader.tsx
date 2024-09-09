import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
// import LanguageIcon from '@mui/icons-material/Language';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import SoundMuve from "@/assets/branded/logo.png";
import icon from "@/assets/branded/icon.png";
// import { useSettingStore } from '@/state/settingStore';
import NewReleaseModalComponent from './account/NewReleaseModal';
import { useUserStore } from '@/state/userStore';
import { stringAvatar, stringToColor } from '@/util/resources';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageTranslate from './LanguageTranslate';
import { contentWidth } from '@/util/mui';
import colors from '@/constants/colors';


interface _Props {
    // children: React.ReactNode,
    headerSpacing?: boolean,
}
// const drawerWidth = 240;

export default function AccountHeaderComponent({headerSpacing = false} : _Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    // const _setTheme = useSettingStore((state) => state._setTheme);
    const userData = useUserStore((state) => state.userData);
    const _logOutUser = useUserStore((state) => state._logOutUser);
    // const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const [openAccountProfile, setOpenAccountProfile] = useState(false);

    const [openReleaseModal, setOpenReleaseModal] = useState(false);
    const closeReleaseModal = () => { setOpenReleaseModal(false) }


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const RLmenuItems = [
        {
            title: "Home",
            link: "/account/record-label",
            icon: HomeIcon,
            active: pathname.startsWith('/account/record-label'),
        },
        {
            title: "Sales report",
            link: "/account",
            icon: ReceiptLongIcon,
            active: pathname.startsWith('/account/Sales report'),
        },
        {
            title: "Balance history",
            link: "/contact",
            icon: AccountBalanceWalletIcon,
            active: pathname.startsWith('/contact'),
        },
        {
            title: "Reach",
            link: "/faq",
            icon: AssessmentOutlinedIcon,
            active: pathname.startsWith('/faq'),
        },
        {
            title: "Contact",
            link: "/contact",
            icon: '',
            active: pathname.startsWith('/contact'),
        },
        {
            title: "FAQ",
            link: "/faq",
            icon: '',
            active: pathname.startsWith('/faq'),
        }
    ];

    const menuItems = [
        // {
        //     title: "Home",
        //     link: "/",
        //     active: pathname == '/' ? true : false,
        // },
        {
            title: "Dashboard",
            link: "/account",
            active: pathname.startsWith('/account'),
        },
        {
            title: "Contact",
            link: "/contact",
            active: pathname.startsWith('/contact'),
        },
        {
            title: "FAQ",
            link: "/faq",
            active: pathname.startsWith('/faq'),
        }
    ];

    const mobileDrawerContent = (
        <Box 
            // onClick={handleDrawerToggle} 
            sx={{ 
                p: 2, 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 

                m: 2,
                color: "#fff", 
                // height: "95%", width: "95%", 
                justifyContent: "center",
                // alignItems: "center",
                bgcolor: colors.milk,
                borderRadius: "21px"
            }}
        >
            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <img src={icon} alt="SoundMuve Logo" style={{width: "100%", maxWidth: "24px", cursor: 'pointer' }} />
                    </Box>
                    
                    <Box sx={{width: "100%", textAlign: "right"}}>
                        <CloseIcon onClick={handleDrawerToggle} sx={{ color: colors.primary }} />
                    </Box>
                </Stack>

                {/* <Divider color='#c1c1c1' /> */}

                <Box height="30px"></Box>

                <List onClick={handleDrawerToggle}>
                    {
                        userData.teamType == "Artist" ? (
                            menuItems.map((item) => (
                                <Link key={item.title} to={item.link} style={{ color: "inherit" }}>
                                    <ListItem disablePadding 
                                        sx={{
                                            bgcolor: item.active ? "#141414" : '',
                                            borderRadius: "21px",
                                            color: item.active ? colors.milk : colors.dark
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))
                        ) : (
                            RLmenuItems.map((item) => (
                                <Link key={item.title} to={item.link} style={{ color: "inherit" }}>
                                    <ListItem disablePadding 
                                        sx={{
                                            bgcolor: item.active ? "#141414" : '',
                                            borderRadius: "21px",
                                            color: item.active ? colors.milk : colors.dark
                                        }}
                                    >
                                        <ListItemButton>
                                            { item.icon && 
                                                <ListItemIcon
                                                    sx={{
                                                        "&.MuiListItemIcon-root": {
                                                            minWidth: '30px',
                                                            pr: "5px",
                                                        }
                                                    }}
                                                >
                                                    <item.icon sx={{ color: "#666666" }}  />
                                                </ListItemIcon>
                                            }

                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))
                        )
                    }

                    <ListItem disablePadding sx={{color: colors.dark}}>
                        <ListItemButton>
                            <ListItemText 
                                primary={<LanguageTranslate />}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            
            <Box sx={{mt: "auto"}}>
                <Box onClick={() => { setOpenReleaseModal(true); handleDrawerToggle(); }}
                    sx={{
                        padding: "15px",
                        // border: `0.3px solid ${colors.primary}`,
                        borderRadius: "12px",
                        bgcolor: colors.dark,
                        mb: 3
                    }}
                >
                    <Typography variant='body1'
                        sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "600",
                            fontSize: "13px",
                            lineHeight: "13.06px",
                            // letterSpacing: "-0.08px",
                            textAlign: "center",
                            color: colors.milk,
                        }}
                    >Add new release</Typography>
                </Box>

                <Box onClick={() => { _logOutUser(); handleDrawerToggle(); }}
                    sx={{
                        padding: "15px",
                        border: `0.3px solid ${colors.primary}`,
                        borderRadius: "12px",
                        mb: 3,
                    }}
                >
                    <Typography variant='body1'
                        sx={{
                            fontFamily: "Nohemi",
                            fontWeight: "600",
                            fontSize: "13px",
                            lineHeight: "13.06px",
                            // letterSpacing: "-0.08px",
                            textAlign: "center",
                            color: colors.primary,
                        }}
                    >Logout</Typography>
                </Box>
            </Box>
        </Box>
    );

    const accountProfile = (
        <Box
            sx={{
                width: "147px",
                height: "116px",
                p: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack direction="row" alignItems="center" spacing="10px">
                <Avatar
                    alt={`${userData.firstName} ${userData.lastName}`}
                    // src={userData.profile_image || ""}
                    sx={{ 
                        boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                        bgcolor: stringToColor(`${userData.firstName.trim()} ${userData.lastName.trim()}`),
                    }}
                    children={<Typography sx={{
                        fontSize: "15px",
                        fontWeight: "bold"
                    }}>{stringAvatar(`${userData.firstName.trim()} ${userData.lastName.trim()}`)}</Typography>}
                />

                <Box width={"90px"}>
                    <Typography noWrap variant="h1" component="h2"
                        sx={{
                            fontWeight: "700",
                            fontSize: "14px",
                            lineHeight: "12px",
                            letterSpacing: "-0.13px",
                            color: "#FBFBFB",
                            overflow: "hidden",
                        }}
                    >{ userData.firstName.trim() }</Typography>

                    <Typography noWrap
                        sx={{
                            fontWeight: "500",
                            fontSize: "12px",
                            lineHeight: "8px",
                            letterSpacing: "-0.13px",
                            color: "#797979",
                            mt: 0.5
                        }}
                    >Artist</Typography>
                </Box>
            </Stack>

            <Stack direction="row" alignItems='center' spacing="10px"
                onClick={() => _logOutUser() }
                sx={{
                    width: "fit-content",
                    bgcolor: "#FBFBFB",
                    padding: "5px 7px",
                    color: "#000",
                    borderRadius: "5px",
                    mt: "auto", mx: "auto",
                    cursor: "pointer"
                }}
            >
                <SettingsPowerIcon sx={{ fontSize: "15px" }} />

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "5px",
                        letterSpacing: "-0.08px"
                    }}
                >Log out</Typography>
            </Stack>

        </Box>
    )


    return (
        <>
            <CssBaseline />
            <AppBar component="nav" position="sticky"
                sx={{ 
                    top: 0,
                    mx: "auto", 
                    backgroundColor: "#000", 
                    borderRadius: 23.5, 
                    ...contentWidth
                 }} 
            >
                <Toolbar sx={{ px: {xs: 2, md: 5, lg: 12} }}>
                    <Box sx={{flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/") }>
                        <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130, objectFit: "contain"}} />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                            {menuItems.map((item) => (
                                <Link key={item.title} to={ item.link } style={{ 
                                    borderBottom: item.active ? "1px solid #fff" : "none",
                                    color: item.active ? "#fff" : "#c1c1c1",
                                }}>
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{flexGrow: 1, display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
                        <Stack spacing={2} direction="row" alignItems="center" >

                            {/* <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <IconButton 
                                    onClick={() => _setTheme(!darkTheme)}
                                    sx={{color: "#fff"}}
                                >
                                    { darkTheme ? 
                                        <img 
                                            src={light_off} alt='light off icon'
                                            style={{maxWidth: "24px"}}
                                        />
                                        :
                                        <LightbulbOutlinedIcon />
                                    }
                                </IconButton>
                            </Box> */}

                            <Box
                                onClick={() => setOpenReleaseModal(true)}
                                sx={{
                                    color: "#000000",
                                    background: "#fff",
                                    padding: "10px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "bolder",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: "12.92px",
                                    lineHeight: "12px",
                                    letterSpacing: "-0.26px",
                                    textAlign: 'center',
                                    color: "#000",
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    Add new release
                                </Typography>

                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: "9.69px",
                                    lineHeight: "9px",
                                    letterSpacing: "-0.19px",
                                    textAlign: 'center',
                                    color: "#000",
                                    display: { xs: 'block', sm: 'none' }
                                }}>
                                    Add new Song
                                </Typography>
                            </Box>

                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
                                    <LanguageTranslate />
                                </Box>
                            </Box>

                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
                                <ClickAwayListener onClickAway={() => setOpenAccountProfile(false)}>
                                    <div>
                                        <Tooltip title={accountProfile} arrow color='primary' placement="bottom-start" 

                                            disableFocusListener
                                            disableHoverListener
                                            disableTouchListener
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={() => setOpenAccountProfile(false)}
                                            open={openAccountProfile}

                                            slotProps={{
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: "#272727",
                                                    },
                                                },
                                            }}
                                        >
                                            <IconButton sx={{color: "#fff"}} onClick={() => setOpenAccountProfile(true) }>
                                                <AccountCircleOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>

                            </Box>
                        </Stack>


                        <Box sx={{ ml: 2, display: { sm: 'none' } }}>
                            <IconButton
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                                sx={{color: "#fff"}}
                                // sx={{ ml: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Box>
                
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    anchor='right'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: "100%", 
                            background: "transparent" 
                        },
                        zIndex: 9999
                    }}
                >
                    {mobileDrawerContent}
                </Drawer>
            </nav>

            <NewReleaseModalComponent 
                openReleaseModal={openReleaseModal}
                closeReleaseModal={closeReleaseModal}
            />

            { headerSpacing ? <Toolbar /> : <></> }
        </>
    );
}
