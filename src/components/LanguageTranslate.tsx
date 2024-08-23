// import React from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { useEffect, useRef } from 'react';
// import { useSettingStore } from '@/state/settingStore';

function LanguageTranslate() {
    // const googleTranslateRef = useRef(null);
    // useEffect(() => {
    //     let intervalId: any;
    //     const checkGoogleTranslate = () => {
    //         if ((window as any).google && (window as any).google.translate) {
    //             clearInterval(intervalId);
    //             new (window as any).google.translate.TranslateElement(
    //                 { 
    //                     pageLanguage: 'de',
    //                     // layout: (window as any).google.translate.TranslateElement.inlineLayout.SIMPLE
    //                 },
    //                 googleTranslateRef.current
    //             )
    //         }
    //     }
    //     intervalId = setInterval(checkGoogleTranslate, 500);
    // }, []);
    
    

    return (

        <Stack direction="row"
            // sx={{ color: darkTheme ? "#FFF" : "#000", }}
        >
            <LanguageIcon />
            <Typography sx={{ fontFamily: "Geist" }}>Eng</Typography>
            <ArrowDropDownIcon />
        </Stack>
    )
}

export default LanguageTranslate
