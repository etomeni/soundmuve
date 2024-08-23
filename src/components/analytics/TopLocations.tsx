import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


interface locationIntercae {
    name: string,
    percentage: number,
}

interface _Props {
    // children: React.ReactNode,
    darkTheme: boolean,
    title: string,
    locations: locationIntercae[]
}

const TopLocationsComponent: React.FC<_Props> = ({
    darkTheme, title, locations
}) => {

    return (
        <Box
            sx={{
                border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                borderRadius: "10.8px",
                p: "15px"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "700",
                    fontSize: {xs: '', md: '11.38px'},
                    lineHeight: {xs: '', md: "12.97px"},
                    letterSpacing: {xs: '', md: '0.36px'},
                    // mb: 1
                }}
            >{ title }</Typography>


            {
                locations.map((item, index) => (
                    <Box my={2} key={index}>
                        <Typography
                            sx={{
                                fontWeight: '300',
                                fontSize: '10px',
                                lineHeight: "6.48px",
                                letterSpacing: '0.36px',
                                mb: 0.7
                            }}
                        >{ item.name }</Typography>

                        <Stack direction="row" alignItems="center" spacing={1} >
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={item.percentage}
                                    sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        [`&.${linearProgressClasses.colorPrimary}`]: {
                                            backgroundColor: darkTheme ? "#fff" : "#c4c4c4",
                                        },
                                        [`& .${linearProgressClasses.bar}`]: {
                                            borderRadius: 5,
                                            backgroundColor: "#C89FF5"
                                        },
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    fontWeight: "700",
                                    fontSize: "10px",
                                    lineHeight: "6.48px",
                                    letterSpacing: "0.36px",
                                }}
                            >{ `${item.percentage}%` }</Typography>
                        </Stack>
                    </Box>
                ))
            }

        </Box>

    )
}

export default TopLocationsComponent