import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSettingStore } from '@/state/settingStore';


interface myProps {
    iconColor?: string;
};

const ArtistProfileInfoComponent: React.FC<myProps> = ({iconColor}) => {
    const darkTheme = useSettingStore((state) => state.darkTheme);
    const [openDescriptionTooltip, setOpenDescriptionTooltip] = React.useState(false);

    return (
        // <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)}>
        //     <div>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    // placement='bottom-end'
                    arrow
                    // onClose={() => setOpenDescriptionTooltip(false)}
                    // open={openDescriptionTooltip}
                    // disableFocusListener
                    // disableHoverListener
                    // disableTouchListener

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
                                fontSize: "25px",
                                textAlign: 'center',
                                mb: 2
                            }}
                        > Note! </Typography>

                        <Typography variant='body1' fontSize="16px" mb={1}>
                            If this is your first time releasing music to Spotify and Apple Music,
                            you can leave this field empty,
                            we'll create a new profile for you when we deliver this release.
                        </Typography>

                        <Typography variant='body1' fontSize="16px" mb={1}>
                            Optionally, go create a sportify and apple music artist account and add the profile link here.
                        </Typography>

                        <Typography variant='body1' fontSize="16px" fontWeight="900" mb={2}>
                            Please note that creating a new profile when you have an existing one can cause issues with your release.
                        </Typography>

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
        //     </div>
        // </ClickAwayListener>
    );
}

export default ArtistProfileInfoComponent;

