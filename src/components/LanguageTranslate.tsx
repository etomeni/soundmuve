// import React from 'react'
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { paymentTextFieldStyle } from '@/util/mui';
import { googleTranslateLanguages } from '@/util/googleTranslateLanguages';
import colors from '@/constants/colors';
import { useSettingStore } from '@/state/settingStore';
// import { useTranslation } from 'react-google-multi-lang';


function LanguageTranslate() {
    // const { setLanguage } = useTranslation();
    const language = useSettingStore((state) => state.language);
    const _setTranslationLanguage = useSettingStore((state) => state._setTranslationLanguage);
    const [openTooltip, setOpenTooltip] = useState(false);
    

    return (
        <Box>
            {/* <Stack direction="row"
                // sx={{ color: darkTheme ? "#FFF" : "#000", }}
            >
                <LanguageIcon />
                    <Typography sx={{ fontFamily: "Geist" }}>Eng</Typography>
                <ArrowDropDownIcon />
            </Stack> */}

            <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
                <div>
                    <Tooltip 
                        arrow color='primary' 
                        placement="bottom-start" 

                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={() => setOpenTooltip(false)}
                        open={openTooltip}

                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: colors.bg,
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                    '& .MuiTooltip-arrow': {
                                        color: '#c4c4c4',
                                    },
                                },
                            },
                        }}

                        title={
                            <Box>
                                <Autocomplete
                                    // fullWidth
                                    options={googleTranslateLanguages}
                                    size='small'
                                    autoHighlight
                                    getOptionLabel={(option) => option.displayName}
                                    sx={{ minWidth: 300 }}

                                    onChange={(_e, value) => {
                                        // console.log(value);
                                        
                                        if (value) {
                                            _setTranslationLanguage(value)
                                            setOpenTooltip(false);
                                            // setLanguage(value.languageCode);
                                        }
                                    }} // prints the selected value

                                    renderOption={(props, option) => {
                                        const { ...optionProps } = props;
                                        return (
                                            <Box
                                                component="li"
                                                {...optionProps}
                                                key={option.languageCode}
                                            >{ option.displayName } ({ option.languageCode })</Box>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size='small'
                                            sx={{ ...paymentTextFieldStyle, width: 285 }}
                                        />
                                    )}
                                />
                            </Box>
                        }
                    >
                        <Stack direction="row"
                            sx={{ cursor: "pointer" }}
                            onClick={() => setOpenTooltip(true)}
                        >
                            <LanguageIcon />
                            <Typography sx={{ fontFamily: "Geist", textTransform: "capitalize" }}>
                                {language.languageCode}
                            </Typography>
                            <ArrowDropDownIcon />
                        </Stack>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Box>
    )
}

export default LanguageTranslate
