import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { restCountries } from '@/util/countries';
import MenuItem from '@mui/material/MenuItem';

interface _Props {
    countries: typeof restCountries,
    selectCountryCode: string,
    setSelectCountryCode: (value: string) => void,
    darkTheme: boolean,
}

const CountryDialSelectComponent: React.FC<_Props> = ({
    countries, selectCountryCode, setSelectCountryCode, darkTheme
}) => {

    return (
        <Box>
            <Select
                labelId="countryCode"
                id="countryCode-select"
                label=""
                // defaultValue=""
                value={selectCountryCode}

                sx={{
                    color: darkTheme ? "white" : '#272727',
                    // borderRadius: "13.79px",
                    boxShadow: 'none !important',
                    border: 0,

                    "& .MuiSelect-select": { padding: "0px" },

                    '.MuiOutlinedInput-notchedOutline': {
                        // borderColor: darkTheme ? 'gray' : 'gray',
                        border: "none !important",
                        // bgcolor: 'green'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        // borderColor: darkTheme ? '#fff' : '#272727', // '#434e5e',
                        border: "none",
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        // borderColor: darkTheme ? '#fff' : '#272727', // 'var(--TextField-brandBorderHoverColor)',
                        border: "none",
                    },
                    "& fieldset": {
                        border: "none",
                    },
                    '.MuiSvgIcon-root ': {
                        fill: `${darkTheme ? '#ccc' : 'black'} !important`,
                    }
                }}
                
                // error={ errors.countryCode ? true : false }
                // { ...register('countryCode') }

                onChange={(event) => {
                    const value: any = event.target.value;
                    setSelectCountryCode(value);
                }}
            >
                { countries.map((country: any, index) => (
                    <MenuItem key={index} value={country.idd.root + country.idd.suffixes[0]}>
                        <img src={country.flags.png} alt={country.flags.alt}
                            style={{
                                maxWidth: "18px",
                                marginRight: "5px"
                            }}
                        />
                        <Typography variant='body2'
                            sx={{
                                fontSize: '13px',
                                fontWeight: '400',
                                display: "inline"
                            }}
                        >
                            {country.idd.root + country.idd.suffixes[0]}
                        </Typography>
                    </MenuItem>
                )) }
            </Select>
        </Box>
    )
}

export default CountryDialSelectComponent;