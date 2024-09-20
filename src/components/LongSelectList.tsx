import React, { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { releaseSelectStyle2 } from '@/util/mui';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import colors from '@/constants/colors';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const ITEM_HEIGHT = 65; //48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface MyProps {
    options: string[],
    handleSelected: (selected: string[]) => void,
    selectedValue: string[],
    darkTheme?: boolean,
    error?: boolean,
};

const LongSelectList: React.FC<MyProps> = ({
    options, selectedValue, handleSelected, error = false
}) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [displayedOptions, setDisplayedOptions] = useState<any[]>(options);

    const handleSearchInputValue = (searchedWord: string) => {
        setSearchInputValue(searchedWord);
        if (!searchedWord ) {
            setDisplayedOptions(options);
            return
        };

        const results = options.filter(obj => obj.toLowerCase().includes(searchedWord.toLowerCase()));
        
        if (results.length) {
            setDisplayedOptions(results);
        } else {
            setDisplayedOptions(options);
        }
    }
    
    const handleChange = (_event: SelectChangeEvent<typeof selectedValue>) => {
        // const {
        //     target: { value },
        // } = event;

        // handleSelected(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );
    };

    const listContnet = (props: ListChildComponentProps) => {
        const { index, style } = props;
        const name = displayedOptions[index];

        return (
            <MenuItem style={style} key={index} value={name}
                onClick={() => {
                    if (name == "All") {
                        if (selectedValue.includes("All")) {
                            // const newValue = selectedValue.filter(item => item != "All");
                            handleSelected([]);
                        } else {
                            handleSelected(options);
                        }

                    } else {
                        // console.log(selectedValue);
                        let newValue: string[] = selectedValue;
                        
                        if (selectedValue.includes("All")) newValue = selectedValue.filter(item => item != "All");
                        if (newValue.includes(name)) {
                            newValue = newValue.filter(item => item != name)
                        } else {
                            newValue = [ name, ...newValue ];
                            // newValue.push(name);
                        };

                        handleSelected(newValue);
                    }
                }}

            >
                <Checkbox checked={selectedValue.includes(displayedOptions[index])} 
                    sx={{
                        color: "#D9D9D9",
                        '&.Mui-checked': {
                            color: colors.primary,
                        },
                    }}
                />
                <ListItemText primary={displayedOptions[index]} />
            </MenuItem>
        );
    }

    return (
        <Select
            // labelId="soldCountriesSelect"
            // id="demo-multiple-checkbox"
            // label=""

            sx={releaseSelectStyle2}

            multiple
            value={selectedValue}
            onChange={handleChange}
            error={ error }
            // input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
                if (selected.includes("All")) return "All";
                return selected.join(', ');
            }}
            MenuProps={MenuProps}
        >
            <Box px={3} mb={1}>
                <TextField 
                    variant="outlined" 
                    fullWidth 
                    id='search'
                    type='text'
                    inputMode='search'
                    placeholder='Search'
                    label=''
                    value={searchInputValue}
                    onChange={(e) => {
                        handleSearchInputValue(e.target.value)
                    }}
                    
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "gray"}} />
                            </InputAdornment>
                        ),
                        endAdornment: searchInputValue && (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleSearchInputValue("")}
                            ><ClearIcon sx={{ color: "gray", fontSize: '16px'}} /></IconButton>
                        ),
                        sx: {
                            borderRadius: "16px",
                            color: 'gray'
                        },
                    }}
                    sx={{
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: colors.dark
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray',
                        },

                        '& .MuiOutlinedInput-root': {
                            bgcolor: '#E0D9CE',
                            borderRadius: '17.8px',
                            height: '42px',

                            '& fieldset': {
                                // borderColor: darkTheme ? "#c4c4c4" : "#272727", // '#E0E3E7',
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                // borderColor: darkTheme ? "#fff" : "#272727", // '#B2BAC2',
                                border: 'none'
                            },
                            '&.Mui-focused fieldset': {
                                // borderColor: darkTheme ? '#fff' : '#272727', // '#6F7E8C',
                                // borderWidth: "2px",
                                border: 'none'
                            },
                        },
                        zIndex: 9

                    }}
                />
            </Box>

            <FixedSizeList
                height={ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}
                width={"auto"}
                itemSize={46}
                itemCount={displayedOptions.length} // To be checked again and return the value to options.length
                overscanCount={5}
            >
                {listContnet}
            </FixedSizeList>
        </Select>
    );
}

export default LongSelectList;
