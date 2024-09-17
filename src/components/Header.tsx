import * as React from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

import LanguageTranslate from './LanguageTranslate';
import { contentWidth } from '../util/mui';
import logo from "@/assets/branded/logo.png";
import icon from "@/assets/branded/icon.png";
import colors from '@/constants/colors';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { useUserStore } from '@/state/userStore';


// const drawerWidth = 240;

export default function HeaderComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);



    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const menuItems = [
        {
            title: "Home",
            link: "/",
            active: pathname == '/' ? true : false,
        },
        {
            title: "About",
            link: "/about",
            active: pathname.startsWith('/about'),
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
                m: 2,
                p: 2, 
                color: "#fff", 
                // height: "95%", width: "95%", 
                display: "flex", flexDirection: "column",
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
                    {menuItems.map((item) => (
                        <Link key={item.title} to={item.link}>
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
                    ))}
                </List>
            </Box>

            <Box sx={{mt: "20px"}}>
                <Box 
                    sx={{
                        display: "flex", flexDirection: "row", gap: 0, 
                        // border: `1px solid ${colors.dark}`,
                        width: "fit-content",
                        p: 1, 
                        borderRadius: 3,
                        color: colors.dark
                    }}
                >
                    <LanguageTranslate />
                </Box>
            </Box>

            <Box mt="70px">
                { 
                    isLoggedIn ? (
                        <Box>
                            <Link to="/account/">
                                <Box
                                    sx={{
                                        p: "10px 50px",
                                        borderRadius: "12px",
                                        border: `0.3px solid ${colors.primary}`,
                                        textAlign: "center",
                                        bgcolor: colors.primary,
                                        mt: "15px",
                                    }}  
                                >
                                    <Typography variant='button'
                                        sx={{
                                            fontFamily: "Nohemi",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            lineHeight: "13.06px",
                                            color: colors.milk
                                        }}
                                    >Dashboard</Typography>
                                </Box>
                            </Link>
                        </Box>
                    ) : (
                        <>
                            <Link to="/auth/login">
                                <Box
                                    sx={{
                                        p: "10px 50px",
                                        borderRadius: "12px",
                                        border: `0.3px solid ${colors.primary}`,
                                        textAlign: "center"
                                    }}  
                                >
                                    <Typography variant='button'
                                        sx={{
                                            fontFamily: "Nohemi",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            lineHeight: "13.06px",
                                            color: colors.primary
                                        }}
                                    >Login</Typography>
                                </Box>
                            </Link>

                            <Link to="/auth/signup">
                                <Box
                                    sx={{
                                        p: "10px 50px",
                                        borderRadius: "12px",
                                        border: `0.3px solid ${colors.primary}`,
                                        textAlign: "center",
                                        bgcolor: colors.primary,
                                        mt: "15px",
                                    }}  
                                >
                                    <Typography variant='button'
                                        sx={{
                                            fontFamily: "Nohemi",
                                            fontWeight: "600",
                                            fontSize: "13px",
                                            lineHeight: "13.06px",
                                            color: colors.milk
                                        }}
                                    >Create an account</Typography>
                                </Box>
                            </Link>
                        </>
                    )
                }
            </Box>
        </Box>
    );


    return (
        <>
            <CssBaseline />
            <AppBar component="nav" position="sticky"
                sx={{
                    top: 0,
                    zIndex: 9999,
                    mx: "auto", 
                    backgroundColor: "#000", 
                    borderRadius: 23.5, 
                    ...contentWidth
                    // width: {xs: "calc(100% - 20px)", md: "calc(100% - 30px)", md: "calc(100% - 40px)" },
                }}
            >
                <Toolbar>
                    <Stack direction="row" justifyContent="space-around" width="100%" alignItems="center" spacing={10}>
                        <Link to="/">
                            <img src={logo} alt="SoundMuve logo" style={{width: 130}} />
                        </Link>

                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
                                {menuItems.map((item) => (
                                    <Link key={item.title} to={ item.link } style={{ 
                                        border: item.active ? "1px solid #fff" : "none",
                                        borderRadius: "18.31px",
                                        padding: "5px 15px",
                                        color: item.active ? "#fff" : "#c1c1c1",
                                    }}>
                                        <Typography sx={{ fontFamily: "Geist" }}>
                                            {item.title}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        </Box>

                        <Box>
                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Box sx={{ alignSelf: "center" }}>
                                        <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
                                            <LanguageTranslate />
                                        </Box>
                                    </Box>




                                    { isLoggedIn ? (
                                        <IconButton 
                                            onClick={() => navigate("/account/") }
                                            sx={{color: "#fff"}}
                                        >
                                            <AccountCircleOutlined />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <Link to="/auth/signup" style={{
                                                fontFamily: "Geist",
                                                textDecoration: "none",
                                                color: "#fff",
                                                fontSize: "15px",
                                                fontWeight: "bolder"
                                            }}> Sign&nbsp;Up </Link>

                                            <Link to="/auth/login" style={{
                                                fontFamily: "Geist",
                                                textDecoration: "none",
                                                color: "#000000",
                                                fontSize: "15px",
                                                background: "#fff",
                                                padding: "5px 7px",
                                                border: "none",
                                                outline: "none",
                                                borderRadius: "7px",
                                                fontWeight: "bolder"
                                            }}> Login </Link>
                                        </>
                                    )}

                                </Stack>
                            </Box>

                            <Box sx={{ ml: 2, display: { md: 'none' } }}>
                                <IconButton
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerToggle}
                                    sx={{color: "#fff"}}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Stack>
                    
                
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
                    { mobileDrawerContent }
                </Drawer>
            </nav>

            {/* <Toolbar /> */}
        </>
    );
}




// import * as React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// // import LanguageIcon from '@mui/icons-material/Language';
// // import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import CloseIcon from '@mui/icons-material/Close';

// import SoundMuve from "./../assets/images/SoundMuve.png";
// import { useUserStore } from '../state/userStore';
// import { AccountCircleOutlined } from '@mui/icons-material';
// import LanguageTranslate from './LanguageTranslate';

// const drawerWidth = 240;

// export default function HeaderComponent() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const pathname = location.pathname;
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const isLoggedIn = useUserStore((state) => state.isLoggedIn);



//     const handleDrawerToggle = () => {
//         setMobileOpen((prevState) => !prevState);
//     };

//     const menuItems = [
//         {
//             title: "Home",
//             link: "/",
//             active: pathname == '/' ? true : false,
//         },
//         {
//             title: "About",
//             link: "/about",
//             active: pathname.startsWith('/about'),
//         },
//         {
//             title: "Contact",
//             link: "/contact",
//             active: pathname.startsWith('/contact'),
//         },
//         {
//             title: "FAQ",
//             link: "/faq",
//             active: pathname.startsWith('/faq'),
//         }
//     ];


//     const drawer = (
//         <Box 
//             // onClick={handleDrawerToggle} 
//             sx={{ p: 2, color: "#fff", height: "100%", display: "flex", flexDirection: "column" }}
//         >
//             <Box>
//                 <Box sx={{width: "100%", textAlign: "right"}}>
//                     <CloseIcon onClick={handleDrawerToggle} />
//                 </Box>

//                 <Typography variant="h6" sx={{ my: 2 }}>
//                     <img src={SoundMuve} alt="SoundMuve Logo" style={{width: 130, cursor: 'pointer' }} />
//                 </Typography>

//                 <Divider color='#c1c1c1' />

//                 <List onClick={handleDrawerToggle}>
//                     {menuItems.map((item) => (
//                         <Link key={item.title} to={item.link}>
//                             <ListItem disablePadding sx={{bgcolor: item.active ? "#141414" : ''}}>
//                                 <ListItemButton>
//                                     <ListItemText primary={item.title} />
//                                 </ListItemButton>
//                             </ListItem>
//                         </Link>
//                     ))}
//                 </List>
//             </Box>

//             <Box sx={{mt: "auto"}}>
//                 <Box sx={{
//                     display: "flex", flexDirection: "row", gap: 0, color: "#FFF", 
//                     border: "1px solid #fff",
//                     p: 1, width: "90px",
//                     borderRadius: 3,
//                 }}>
//                     <LanguageTranslate />
//                 </Box>
//             </Box>
//         </Box>
//     );


//     return (
//         <Box sx={{ display: 'flex', background: "#000"}}>
//             <CssBaseline />
//             <AppBar component="nav" sx={{backgroundColor: "#000"}} position="fixed">
//                 <Toolbar>
//                     <Box sx={{flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/") }>
//                         <img src={SoundMuve} alt="SoundMuve logo" style={{width: 130}} />
//                     </Box>

//                     <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
//                             {menuItems.map((item) => (
//                                 <Link key={item.title} to={ item.link } style={{ 
//                                     borderBottom: item.active ? "1px solid #fff" : "none",
//                                     // color: item.active ? "#644986" : "#fff",
//                                     color: item.active ? "#fff" : "#c1c1c1",
//                                 }}>
//                                     <Typography>
//                                         {item.title}
//                                     </Typography>
//                                 </Link>
//                             ))}
//                         </Box>
//                     </Box>

//                     <Box sx={{flexGrow: 1, display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
//                         <Stack spacing={2} direction="row" alignItems="center" >
//                             <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: "center" }}>
//                                 <Box sx={{display: "flex", flexDirection: "row", gap: 0, color: "#FFF"}}>
//                                     <LanguageTranslate />
//                                 </Box>
//                             </Box>

//                             { isLoggedIn ? (
//                                 <IconButton 
//                                     onClick={() => navigate("/account/") }
//                                     sx={{color: "#fff"}}
//                                 >
//                                     <AccountCircleOutlined />
//                                 </IconButton>
//                             ) : (
//                                 <>
//                                     <Link to="/auth/signup" style={{
//                                         textDecoration: "none",
//                                         color: "#fff",
//                                         fontSize: "15px",
//                                         fontWeight: "bolder"
//                                     }}>
//                                         Sign Up
//                                     </Link>

//                                     <Link to="/auth/login" style={{
//                                         textDecoration: "none",
//                                         color: "#000000",
//                                         fontSize: "15px",
//                                         background: "#fff",
//                                         padding: "5px 7px",
//                                         border: "none",
//                                         outline: "none",
//                                         borderRadius: "7px",
//                                         fontWeight: "bolder"
//                                     }}>
//                                         Login
//                                     </Link>
//                                 </>
//                             )}
//                         </Stack>

//                         <Box sx={{ ml: 2, display: { sm: 'none' } }}>
//                             <IconButton
//                                 aria-label="open drawer"
//                                 edge="end"
//                                 onClick={handleDrawerToggle}
//                                 sx={{color: "#fff"}}
//                                 // sx={{ ml: 2, display: { sm: 'none' } }}
//                             >
//                                 <MenuIcon />
//                             </IconButton>
//                         </Box>
//                     </Box>
                
//                 </Toolbar>
//             </AppBar>

//             <nav>
//                 <Drawer
//                     variant="temporary"
//                     anchor='right'
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{
//                         keepMounted: true, // Better open performance on mobile.
//                     }}
//                     sx={{
//                         display: { xs: 'block', sm: 'none' },
//                         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: "#000" },
//                     }}
//                 >
//                     {drawer}
//                 </Drawer>
//             </nav>

//             {/* <Toolbar /> */}
//         </Box>
//     );
// }
