import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'

import { PieChart } from '@mui/x-charts/PieChart';
import CircleIcon from '@mui/icons-material/Circle';


interface _Props {
    // children: React.ReactNode,
    darkTheme: boolean,
    menPercentage: number,
    womenPercentage: number,
}

const TopGenderComponent: React.FC<_Props> = ({
    darkTheme, menPercentage, womenPercentage
}) => {

    return (
        <Box
            sx={{
                border: darkTheme ? "1.08px solid #fff" : "1.08px solid #000",
                borderRadius: "10.8px",
                p: "15px",
                height: "100%"
            }}
        >
            <Typography
                sx={{
                    fontWeight: "700",
                    fontSize: {xs: '', md: '11.38px'},
                    lineHeight: {xs: '', md: "12.97px"},
                    letterSpacing: {xs: '', md: '0.36px'}
                }}
            >Top Gender</Typography>

            <Stack direction="row" justifyContent="space-evenly" alignItems="center">
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "10.8px",
                            lineHeight: "6.48px",
                            letterSpacing: "0.36px"
                        }}
                    >{`${womenPercentage}%`}</Typography>

                    <Typography
                        sx={{
                            fontWeight: "300",
                            fontSize: "7.02px",
                            lineHeight: "6.48px",
                            letterSpacing: "0.36px",
                            mt:1
                        }}
                    >
                        Women 
                        <CircleIcon 
                            sx={{
                                fontSize: "7.02px",
                                ml: "5px"
                            }}
                        />
                    </Typography>
                </Box>

                <PieChart
                    series={[
                        {
                            data: [
                                { value: menPercentage },
                                { value: womenPercentage }, 
                            ],
                            innerRadius: 40,
                            outerRadius: 50,

                            // paddingAngle: 0,
                            // cornerRadius: 0,
                            startAngle: 0,
                            endAngle: 360,
                            // cx: 30,
                            // cy: 100,
                        }
                    ]}
                    sx={{
                        " .MuiPieArc-root": {
                            stroke: "none"
                        },
                        display: "flex",
                        justifyContent: "center",
                    }}
                    height={125}
                    width={1}
                    // margin={{right: 5}}
                    colors={ darkTheme ? ['#C89FF5', 'white'] : ['#C89FF5', '#343434'] }
                />

                <Box>
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "10.8px",
                            lineHeight: "6.48px",
                            letterSpacing: "0.36px"
                        }}
                    >{`${menPercentage}%`}</Typography>

                    <Typography
                        sx={{
                            fontWeight: "300",
                            fontSize: "7.02px",
                            lineHeight: "6.48px",
                            letterSpacing: "0.36px",
                            mt:1
                        }}
                    >
                        Men 
                        <CircleIcon 
                            sx={{
                                fontSize: "7.02px",
                                color: "#C89FF5",
                                ml: "5px"
                            }}
                        />
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default TopGenderComponent