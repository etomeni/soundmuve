import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
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
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import SoundMuve from "@/assets/images/SoundMuve.png";
import SoundMuv from "@/assets/images/SoundMuv.png";
import light_off from "@/assets/images/light_off.png";
import { useSettingStore } from '../state/settingStore';
import NewReleaseModalComponent from './account/NewReleaseModal';
import { useUserStore } from '@/state/userStore';
import { stringAvatar, stringToColor } from '@/util/resources';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageTranslate from './LanguageTranslate';

const drawerWidth = 240;

export default function AccountHeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const _setTheme = useSettingStore((state) => state._setTheme);
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

    const drawer = (
        <Box 
            // onClick={handleDrawerToggle} 
            sx={{ 
                p: 2, 
                bgcolor: darkTheme ? "initial" : "#FBFBFB", 
                color: darkTheme ? "#fff" : "#272727", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
            }}
        >
            <Box>
                <Box sx={{width: "100%", textAlign: "right" }}>
                    <CloseIcon onClick={handleDrawerToggle} />
                </Box>

                <Typography variant="h6" sx={{ my: 2 }}>
                    <img src={ darkTheme ? SoundMuve : SoundMuv } alt="SoundMuve Logo" style={{width: 130, cursor: 'pointer' }} />
                </Typography>

                <Divider color='#c1c1c1' />

                <List onClick={handleDrawerToggle}>
                    {
                        userData.teamType == "Artist" ? (
                            menuItems.map((item) => (
                                <Link key={item.title} to={item.link} style={{ color: "inherit" }}>
                                    <ListItem disablePadding sx={{bgcolor: item.active ? darkTheme ? "#141414" : "#D9D9D9" : ''}}>
                                        <ListItemButton>
                                            <ListItemText primary={item.title} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))
                        ) : (
                            RLmenuItems.map((item) => (
                                <Link key={item.title} to={item.link} style={{ color: "inherit" }}>
                                    <ListItem disablePadding sx={{bgcolor: item.active ? darkTheme ? "#141414" : "#D9D9D9" : ''}}>
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

                    {/* <ListItem disablePadding onClick={() => _logOutUser() }>
                        <ListItemButton>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </Box>

            <Box sx={{mt: "auto"}}>

                <Box mb="50px">
                    <Stack direction="row" alignItems="center" spacing="10px" mb="20px">
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

                        <Box width={"160px"}>
                            <Typography noWrap variant="h1" component="h2"
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "16px",
                                    lineHeight: "16px",
                                    letterSpacing: "-0.13px",
                                    color: darkTheme ? "#FBFBFB" : "#272727",
                                    overflow: "hidden",
                                }}
                            >{ userData.firstName.trim() }</Typography>

                            <Typography noWrap
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    lineHeight: "12px",
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
                            bgcolor: darkTheme ? "#FBFBFB" : "#272727",
                            padding: "5px 7px",
                            color: darkTheme ? "#000" : "#fff",
                            borderRadius: "5px",
                            // mx: "auto",
                            cursor: "pointer"
                        }}
                    >
                        <SettingsPowerIcon sx={{ fontSize: "20px" }} />

                        <Typography
                            sx={{
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "5px",
                                letterSpacing: "-0.08px"
                            }}
                        >Log out</Typography>
                    </Stack>
                </Box>

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 10}}>
                    <Box onClick={handleDrawerToggle} 
                        sx={{
                            display: "flex", 
                            flexDirection: "row", 
                            gap: 0, 
                            color: darkTheme ? "#FFF" : "#000",
                            border: `1px solid ${ darkTheme ? '#fff' : '#000' }`,
                            p: 1, 
                            width: "90px",
                            borderRadius: 3,
                        }}
                    >
                        <LanguageTranslate />
                    </Box>

                    <IconButton 
                        onClick={() => _setTheme(!darkTheme)}
                        sx={{ color: darkTheme ? "#fff" : "#000" }}
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
                            color: darkTheme ? "#FBFBFB" : "#272727",
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
        <Box 
            sx={{ 
                display: 'flex', 
                background: darkTheme ? "#000" : "#343434",
            }}
        >
            <CssBaseline />
            <AppBar 
                component="nav" 
                position="fixed"
                sx={{ backgroundColor: darkTheme ? "#000" : "#343434" }} 
            >
                <Toolbar sx={{ px: {xs: 2, md: 5, lg: 12} }}>
                    <Box sx={{flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/") }>
                        <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130}} />
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
                            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
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
                            </Box>
                            

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
                                                        backgroundColor: darkTheme ? "#272727" : "#D9D9D9",
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: "#000" },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

            <NewReleaseModalComponent 
                openReleaseModal={openReleaseModal}
                closeReleaseModal={closeReleaseModal}
            />

            <Toolbar />
        </Box>
    );
}
