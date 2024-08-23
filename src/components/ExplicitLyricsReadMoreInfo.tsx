import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface myProps {
    iconColor?: string;
};

const ExplicitLyricsReadMoreInfoComponent: React.FC<myProps> = ({iconColor = "#C8F452"}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const [openDescriptionTooltip, setOpenDescriptionTooltip] = React.useState(false);

    return (
        <Box>
            <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)} >
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
                                overflow: "scroll",
                            }}
                        >
                            <Typography variant='h3' component="h3"
                                sx={{
                                    fontWeight: '900',
                                    fontSize: "25px"
                                }}
                            > Explicit and Clean Track Qualifications </Typography>

                            <Typography variant='h4' component="h4" fontSize="20px" fontWeight="700" my={2}>
                                Explicit Tracks
                            </Typography>

                            <Typography variant='body1' fontSize="14px" mb={1}>
                                An explicit track is one that has curse words or language or art that is generally deemed sexual, 
                                violent, or offensive in nature. If you mark one track as explicit on your album, 
                                the entire album will also be marked as explicit. If your release is not marked correctly, 
                                it may be denied by our Content Review team.
                            </Typography>

                            <Typography variant='body1' fontSize="14px" mb={1}>
                                If the content of your release is determined to be explicit by iTunes (this includes artwork) 
                                and is not marked as explicit, your release may be hidden from sale in the store.
                            </Typography>

                            <Typography variant='body1' fontSize="14px" mb={1}>
                                Explicit content is not sold in Burkina Faso, India, Nepal, and Uzbekistan iTunes territories.
                            </Typography>

                            <Typography variant='h4' component="h4" fontSize="20px" fontWeight="700" my={2}>
                                Clean Tracks
                            </Typography>

                            <Typography variant='body1' fontSize="14px" mb={1}>
                                A clean track is one that does not contain curse words or language or art that is sexual, 
                                violent, or offensive in nature. Tracks should ONLY be marked as clean if an explicit 
                                version of it exists.
                            </Typography>

                            <Typography variant='body1' fontSize="14px" mb={1}>
                                Clean versions of explicit tracks must be flagged as clean to prevent customers 
                                from accidentally purchasing the explicit version.
                            </Typography>
                        </Box>}
                    > 
                        <Typography onClick={() => setOpenDescriptionTooltip(!openDescriptionTooltip)} aria-label="More Information"
                            sx={{
                                color: iconColor,
                                cursor: "pointer",

                                fontWeight: "400",
                                fontSize: {xs: "16.96px", md: "25px"},
                                lineHeight: {xs: "27.14px", md: "40px"},
                                letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                            }}
                        >
                            Read More 
                        </Typography>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Box>
    );
}

export default ExplicitLyricsReadMoreInfoComponent;

