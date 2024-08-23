import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSettingStore } from '@/state/settingStore';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const drawerWidth = 240;


interface MyComponentProps {
    activePageNumber: number
};
const SideNav: React.FC<MyComponentProps> = ({activePageNumber}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);

    const xsDevice = useMediaQuery('(max-width:599px)');
    const smDevice = useMediaQuery('(min-width:600px)');
    // const mdDevice = useMediaQuery('(min-width:900px)');


    const menuItems = [
        {
            title: 'Album details',
            status: activePageNumber == 1 ? true : false,
        },
        {
            title: 'Advance features',
            status: activePageNumber == 2 ? true : false,
        },
        {
            title: 'Stores/Social',
            status: activePageNumber == 3 ? true : false,
        },
        {
            title: 'Upload song',
            status: activePageNumber == 4 ? true : false,
        },
        {
            title: 'Album art',
            status: activePageNumber == 5 ? true : false,
        },
    ]


    const [value, setValue] = React.useState(activePageNumber - 1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  


    const desktopNav = () => {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: "relative", 
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth, 
                        boxSizing: 'border-box', 
                        position: "absolute",
                        bgcolor: darkTheme ? '#101012' : '#FBFBFB',
                        borderRight: '1px solid #666666'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List sx={{ position: "fixed" }}>
                        { menuItems.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton disabled={ index + 1 > activePageNumber }>
                                    <ListItemIcon>
                                        {
                                            index + 1 < activePageNumber ? (
                                                <CheckCircleIcon sx={{ color: darkTheme ? "#C8F452" : "#33500B"}} />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        border: "1px solid #644986",
                                                        borderRadius: "100%",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Typography variant='body2'
                                                        sx={{
                                                            color: "#644986",
                                                            textAlign: "center",
                                                            fontWeight: "400",
                                                            fontSize: "16.35px",
                                                            lineHeight: "33.85px",
                                                            letterSpacing: "-0.11px",
                                                        }}
                                                    > { index + 1 } </Typography>
                                                </Box>
                                            )
                                        }
                                    </ListItemIcon>

                                    <ListItemText 
                                        primary={item.title} 
                                        sx={{ color: index + 1 < activePageNumber ? "#666666" : "#644986" }} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        )
    }


    const mobileNav = () => {
        return (
            <Box sx={{  px: 3 }}>
                <Toolbar />
                <Box sx={{ borderBottom: 1, borderColor: '#666666', mx: "auto" }}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" 
                        // variant="scrollable"
                        variant='fullWidth'
                        scrollButtons={false}
                        centered
                        sx={{
                            "& .MuiTab-root.Mui-selected": {
                                color: darkTheme ? "#fff" : "#000"
                            },

                            "& .MuiButtonBase-root.MuiTab-root": {
                                minHeight: '52px',
                                minWidth: "50px",
                                padding: 0,
                            },

                            "& .MuiTabs-indicator": {
                                backgroundColor: "#644986"
                            },
                        }}
                    >
                        { menuItems.map((item, index) => (
                            <Tab key={index}
                                label={
                                    <Typography
                                        sx={{
                                            fontWeight: '900',
                                            fontSize: '15px',
                                            lineHeight: '26.31px',
                                            letterSpacing: '-0.55px',
                                            p: 0, m: 0
                                        }}
                                    >
                                        {item.status ? item.title : ''}
                                    </Typography>
                                } 
                                icon={
                                    index + 1 < activePageNumber ? (
                                        <CheckCircleIcon sx={{ color: darkTheme ? "#C8F452" : "#33500B"}} />
                                    ) : (
                                        <Box
                                            sx={{
                                                border: "1px solid #644986",
                                                color: "#644986",
                                                borderRadius: '50%',
                                                width: "20px",
                                                height: "20px",
                                                display: "flex",
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography variant='body2'> { index + 1 } </Typography>
                                        </Box>
                                    )
                                } 
                                iconPosition="start"
                                sx={{
                                    textTransform: "none",

                                    fontWeight: '900',
                                    fontSize: '15px',
                                    lineHeight: '26.31px',
                                    letterSpacing: '-0.55px',
                                }}

                                disabled={ index + 1 > activePageNumber }
                            />
                        ))}

                        {
                            activePageNumber == 6 ? (
                                <Tab 
                                    label=""
                                    disabled
                            />
                            ) : <></>

                        }
                    </Tabs>
                </Box>

            </Box>
        )
    }

    if (xsDevice) return mobileNav();
    if (smDevice) return desktopNav();

    return (
        <>
        </>
    );
}

export default SideNav;