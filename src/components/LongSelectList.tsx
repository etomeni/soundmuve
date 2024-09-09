import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { releaseSelectStyle2 } from '@/util/mui';


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
    darkTheme?: boolean,
    error?: boolean,
};

const LongSelectList: React.FC<MyProps> = ({
    options, selectedValue, handleSelected, error = false
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

    const listContnet = (props: ListChildComponentProps) => {
        const { index, style } = props;
        const name = options[index];

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
                <Checkbox checked={selectedValue.includes(options[index])} />
                <ListItemText primary={options[index]} />
            </MenuItem>
        );
    }

    return (
        <Select
            // labelId="soldCountriesSelect"
            id="demo-multiple-checkbox"
            label=""

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
            <FixedSizeList
                height={ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP}
                width={"auto"}
                itemSize={46}
                itemCount={options.length}
                overscanCount={5}
            >
                {listContnet}
            </FixedSizeList>
        </Select>
    );
}

export default LongSelectList;
