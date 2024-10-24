import * as React from 'react';
// import { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import colors from '@/constants/colors';
import { recordLabelArtistInterface } from '@/constants/typesInterface';
import Typography from '@mui/material/Typography';
import {  releaseTextFieldStyle, submitBtnStyle } from '@/util/mui';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';


interface MyProps {
    options: recordLabelArtistInterface[],
    handleSelected: (selected: recordLabelArtistInterface) => void,
    selectedValue: recordLabelArtistInterface | undefined,
    // error?: boolean,
};

const NewReleaseRLartist: React.FC<MyProps> = ({
    options, handleSelected, selectedValue, // error = false
}) => {
    const [selectedArtist, setSelectedArtist] = React.useState(selectedValue);


    return (
        <Box>
            <Typography 
                sx={{
                    color: colors.dark,
                    fontSize: "50px",
                    fontWeight: "900",
                    lineHeight: "63.8px",
                    letterSpacing: "-1.342px"
                }}  
            >Select an artist in your label</Typography>

            <Box sx={{ mx: "auto", my: {xs: "20px", md: "50px"} }}>
                <Autocomplete
                    // id="country-select-demo"
                    // sx={{ width: 300 }}
                    // onChange={(event: any, newValue: string | null) => {
                    //     // setValue(newValue);
                    // }}
                    fullWidth
                    options={options}
                    autoHighlight
                    getOptionLabel={(option) => option.artistName}

                    onChange={(_e, value) => {
                        if (value) setSelectedArtist(value);
                    }} // prints the selected value

                    renderOption={(props: any, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                component="li"
                                {...optionProps}
                                key={option._id}
                            >
                                { option.artistName }
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={releaseTextFieldStyle}
                            label="Select artist"
                        />
                    )}
                />
            </Box>


            <Box 
                sx={{ 
                    my: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Button variant="contained" 
                    fullWidth type="button" 
                    disabled={ !selectedArtist || !selectedArtist.artistName } 
                    onClick={() => {
                        if (selectedArtist && selectedArtist.artistName) handleSelected(selectedArtist);
                    }}
                    sx={{
                        ...submitBtnStyle,
                    }}
                >Continue</Button>
            </Box>
        </Box>
    );
}

export default NewReleaseRLartist;
