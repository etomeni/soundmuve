import React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface _Props {
    dspName: string,
    bgColor?: string,
    iconColor?: string,
    iconBgColor?: string,
    textColor?: string,
}

const AppleSportifyCheckmark: React.FC<_Props> = ({
    dspName, bgColor = "#C89FF5", textColor = "#581D3A", iconColor = "#000", iconBgColor = '#fff'
}) => {

    return (
        <Box
            sx={{
                width: "fit-content",
                // height: "25.24px",
                borderRadius: "8.65px",
                bgcolor: bgColor,
                py: "5.1px",
                px: "8.65px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "700",
                    fontSize: "10.82px",
                    lineHeight: "14.42px",
                    letterSpacing: "-0.09px",
                    color: textColor
                }}
            >{ dspName }</Typography>


            <Box
                sx={{
                    bgcolor: iconBgColor,
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CheckIcon 
                    sx={{ 
                        color: iconColor,
                        fontSize: "12.82px",
                        lineHeight: "14.42px",
                        letterSpacing: "-0.09px",
                    }} 
                />
            </Box>

            {/* <CheckCircleIcon 
                sx={{ 
                    color: iconColor,
                    fontSize: "14px",
                    lineHeight: "14.42px",
                    letterSpacing: "-0.09px",
                }} 
            /> */}
        </Box>

    )
}

export default AppleSportifyCheckmark;