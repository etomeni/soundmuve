import { createTheme, SxProps, Theme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export const customTextFieldTheme = (outerTheme: Theme, darkTheme: boolean = true) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': darkTheme ? '#FFFFFF' : '#000',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                        '& .MuiInputBase-input': { // Target input text
                            color: darkTheme ? '#fff' : "#000", // Change to your desired text color
                        },
                        '& .MuiInputBase-placeholder': { // Target placeholder text
                            color: 'gray', // Change to your desired placeholder color
                        },

                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });



export const MuiTextFieldStyle = (darkTheme: boolean = true) =>{

    return (
        {
            '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
            },
            '& .MuiInputBase-input': { // Target input text
                color: darkTheme ? '#fff' : "#000",
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: 1.5
            },
            '& .MuiInputBase-placeholder': { // Target placeholder text
                color: 'gray',
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: 1.5
            },
            '& .MuiOutlinedInput-root': {
                // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
                borderRadius: '13.79px',
                // height: '42px',
        
                '& fieldset': {
                    border: '1px solid #b9c1cd'
                },
                '&:hover fieldset': {
                    border: '1px solid #434e5e'
                },
                '&.Mui-focused fieldset': {
                    border: '1px solid #434e5e'
                },
            },



            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                display: "none",
            },
            
            "& input[type=number]": {
                MozAppearance: "textfield",
            },
        }
    )
}

export const MuiSelectFieldStyle = (darkTheme: boolean = true) =>{

    return (
        {
            color: darkTheme ?  "#fff" : "#000",
            borderRadius: "16px",
            // bgcolor: darkTheme ? "#fff" : "#272727",

            '.MuiOutlinedInput-notchedOutline': {
                borderColor: darkTheme ? '#fff' : "#b9c1cd",
                borderWidth: 1
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#434e5e', // 'var(--TextField-brandBorderHoverColor)', // 'rgba(228, 219, 233, 0.25)',
                borderWidth: 1
            },
            '.MuiSvgIcon-root ': {
                fill: darkTheme ? "#fff" : "#797979",
            }
        }
    )
}


export const contentWidth: SxProps<Theme> = {
    width: {xs: "calc(100% - 40px)", sm: "calc(100% - 100px)", md: "calc(100% - 140px)" },
    mx: "auto",
}
