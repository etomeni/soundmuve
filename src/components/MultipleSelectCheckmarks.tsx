import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
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
    darkTheme: boolean,
    error?: boolean,
};

const MultipleSelectCheckmarks: React.FC<MyProps> = ({
    options, selectedValue, handleSelected, darkTheme, error = false
}) => {

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
            labelId=""
            id="demo-multiple-checkbox"
            label=""

            sx={{
                color: darkTheme ? "#000" : "#000",
                borderRadius: {xs: "7.19px", md: "16px"},
                bgcolor: darkTheme ? "#fff" : "#fff",
                
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: darkTheme ? '#fff' : "#fff",
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkTheme ? '#fff' : "#fff",
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkTheme ? '#fff' : "#fff",
                },
                '.MuiSvgIcon-root ': {
                    // fill: "#797979 !important",
                    fill: darkTheme ? "#797979" : "#797979",
                }
            }}

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
            {options.map((name) => (
                <MenuItem key={name} value={name} 
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
                    <Checkbox checked={selectedValue.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
        </Select>
    );
}

export default MultipleSelectCheckmarks;
