import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { releaseSelectStyle3 } from '@/util/mui';
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
    showSearch?: boolean,
};

const MultipleSelectCheckmarks: React.FC<MyProps> = ({
    options, selectedValue, handleSelected, error = false, showSearch = false
}) => {
    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [displayedOptions, setDisplayedOptions] = React.useState<any[]>(options);

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


    return (
        <Select
            sx={releaseSelectStyle3}

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
            {
                showSearch ? (
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
                                '& input': {
                                    height: '12px',
                                    border: 'none',
                                    boxShadow: "none",
                                    outline: "none",
                                },
                                '& label.Mui-focused': {
                                    color: 'var(--TextField-brandBorderFocusedColor)',
                                },
                                '& .MuiInputBase-input': { // Target input text
                                    color: colors.dark,
                                },
                                '& .MuiInputBase-placeholder': { // Target placeholder text
                                    color: 'gray',
                                },

                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#E0D9CE',
                                    borderRadius: '17.8px',
                                    height: '42px',
                                    border: 'none',
                                    boxShadow: "none",
                                    outline: "none",
                                    overflow: "hidden",

                                    '& fieldset': {
                                        border: 'none',
                                        boxShadow: "none",
                                        outline: "none",    
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                        boxShadow: "none",
                                        outline: "none",    
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                        boxShadow: "none",
                                        outline: "none",    
                                    },
                                },
                                zIndex: 9

                            }}
                        />
                    </Box>
                ) : <Box></Box>
            }

            <Box>
                {displayedOptions.map((name) => (
                    <MenuItem key={name} value={name}
                        // onKeyDown={e => e.stopPropagation()}

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
                                    // newValue.unshift(name);
                                };

                                handleSelected(newValue);
                            }
                        }}
                    >
                        <Checkbox checked={selectedValue.indexOf(name) > -1} 
                            sx={{
                                color: "#D9D9D9",
                                '&.Mui-checked': {
                                    color: colors.primary,
                                },
                            }}
                        />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Box>
        </Select>
    );
}

export default MultipleSelectCheckmarks;
