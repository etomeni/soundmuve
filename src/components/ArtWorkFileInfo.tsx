import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSettingStore } from '@/state/settingStore';


interface myProps {
    iconColor?: string;
};

const ArtWorkFileInfoComponent: React.FC<myProps> = ({iconColor}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [openDescriptionTooltip, setOpenDescriptionTooltip] = React.useState(false);

    return (
        <Box>
            <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)}>
                <div>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        placement='bottom-end'
                        arrow
                        onClose={() => setOpenDescriptionTooltip(false)}
                        open={openDescriptionTooltip}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener

                        title={<Box
                            sx={{
                                // minWidth: 250,
                                // maxWidth: 700,
                                maxHeight: 450,
                                overflow: "scroll"
                            }}
                        >
                            <Typography variant='h3' component="h3"
                                sx={{
                                    fontWeight: '900',
                                    fontSize: "25px"
                                }}
                            > Requirements Checklist </Typography>

                            <Typography variant='body1' fontSize="14px">
                                Your cover art must meet all of these requirements or your release will be rejected and will not go live in store.
                            </Typography>


                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    JPG, PNG or GIF image file smaller than 10MB.
                                                </Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    File must be in RGB mode, even if your image is black and white.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    At least 1600 x 1600 pixels in size.
                                                </Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    iTunes recommends files be 3000 x 3000 pixels.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    A maximum of 3000 x 3000 pixels in size.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    A perfect square.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    No blurriness, pixelation, or white space.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    Title and artist must match the release exactly.
                                                </Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    Any featuring artists you put on the artwork must be credited in the release information.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                >
                                                    No extra information or labels.
                                                </Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    No social media links, contact information, store names or logos, 
                                                    pricing information, release dates, "New" stickers, etc.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#C8F452" }} />
                                        </ListItemIcon>

                                        <ListItemText 
                                            primary={<Box>
                                                <Typography variant='h4' component='h4'
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: '700',
                                                        lineHeight: 1.5,
                                                        color: 'white'
                                                    }}
                                                > Ownership. </Typography>

                                                <Typography variant='body2'
                                                    sx={{
                                                        fontSize: '12px',
                                                        fontStyle: 'italic'
                                                    }}
                                                >
                                                    You own this artwork and everything in it. 
                                                    Stores will reject your artwork if it contains images you found online 
                                                    that you don't have the explicit right to use.
                                                </Typography>
                                            </Box>} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </List>

                        </Box>}
                    >
                        <IconButton onClick={() => setOpenDescriptionTooltip(!openDescriptionTooltip)} aria-label="More Information">
                            <InfoOutlinedIcon 
                                sx={{
                                    color: iconColor ? iconColor : darkTheme ? "#fbfbfb" : "black"
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </div>
            </ClickAwayListener>

        </Box>
    );
}

export default ArtWorkFileInfoComponent;

