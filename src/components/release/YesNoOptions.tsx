import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface _Props {
    // option: "Yes" | "No",
    currentValue: string,
    onSelect: (value: "Yes" | "No") => void;

    CheckMarkIconColor: string,
    bgColorActive: string,
    bgColorInactive: string,
    textColorActive: string,
    textColorInactive: string,
    borderColorActive: string,
    borderColorInactive: string
}


const YesNoOptionsComponent: React.FC<_Props> = ({
    // option, 
    currentValue, onSelect, CheckMarkIconColor,
    bgColorActive, bgColorInactive,
    textColorActive, textColorInactive,
    borderColorActive, borderColorInactive,
}) => {

    const fixedOptionView = (option: "Yes" | "No") => (
        <Box>
            <Box 
                sx={{
                    p: {xs: "10.18px 19.68px", md: "15px 29px"},
                    borderRadius: {xs: "8.14px", md: "12px"},
                    background: currentValue == option ? bgColorActive : bgColorInactive,
                    color: currentValue == option ? textColorActive : textColorInactive,
                    border: `1px solid ${ currentValue == option ? borderColorActive : borderColorInactive }`,
                    cursor: "pointer",
                    display: "inline-block"
                }}
                onClick={() => { onSelect(option);}}
            >
                <Typography 
                    sx={{
                        fontWeight: '900',
                        fontSize: {xs: "10.18px", md: "15px"},
                        lineHeight: {xs: "8.82px", md: "13px"},
                        letterSpacing: {xs: "-0.09px", md: "-0.13px"},
                        textAlign: 'center',
                    }}
                > { option } </Typography>
            </Box>

            { currentValue == option ? 
                <CheckCircleIcon 
                    sx={{ 
                        color: CheckMarkIconColor,
                        position: "relative", 
                        left: -15,
                        top: -8,
                    }} 
                /> : <></>
            }
        </Box>
    )

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: currentValue == "Yes" ? "5px" : "15px",
                // mb: "21px",
                mt: "5px"
            }}
        >
            {fixedOptionView("Yes")}

            {fixedOptionView("No")}
        </Box>
    )
}

export default YesNoOptionsComponent;
