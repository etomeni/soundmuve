import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import colors from '@/constants/colors';
import ClickAwayListener from '@mui/material/ClickAwayListener';


interface myProps {
    // iconColor?: string;
};

const PaypalInfoTooltip: React.FC<myProps> = () => {
    const [openDescriptionTooltip, setOpenDescriptionTooltip] = React.useState(true);

    return (
        <ClickAwayListener onClickAway={() => setOpenDescriptionTooltip(false)}>
            <div>
                <Tooltip
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={() => setOpenDescriptionTooltip(false)}
                    open={openDescriptionTooltip}

                    slotProps={{
                        tooltip: {
                            sx: {
                                backgroundColor: colors.primary,
                            },
                        },
                    }}
                    arrow

                    // color='primary' 
                    placement="bottom-end" 

                    title={<Box
                        sx={{
                            // minWidth: 250,
                            maxWidth: "120px",
                            maxHeight: 450,
                            overflow: "scroll",
                            // p: "15px",
                            color: colors.dark,
                        }}
                    >
                        <Typography variant='body1'
                            sx={{
                                fontSize: "12px",
                                lineHeight: "14px",
                                letterSpacing: "-0.31px",
                                // wordWrap: "break-word"
                            }}
                        >
                            Please ensure that you use 
                            your <b> correct paypal email </b> to 
                            avoid issues of loss of funds
                        </Typography>
                    </Box>}
                >
                    <IconButton onClick={() => setOpenDescriptionTooltip(!openDescriptionTooltip)} aria-label="More Information">
                        <InfoOutlinedIcon  sx={{ color: colors.primary }} />
                    </IconButton>
                </Tooltip>
            </div>
        </ClickAwayListener>
    );
}

export default PaypalInfoTooltip;

