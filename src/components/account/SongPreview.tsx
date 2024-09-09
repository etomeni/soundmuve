import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
// import { useSettingStore } from '@/state/settingStore';
import colors from '@/constants/colors';


interface _Props {
    songAudio: any,
    songTitle: string,
    subTitle?: string,
    deleteSong?: () => void;
    editSong?: () => void;
    // deleteSong: (index: any) => void;
    // arrayIndex?: number
}

const SongPreviewComponent: React.FC<_Props> = ({
    songAudio, songTitle, subTitle, deleteSong = ()=>{}, editSong
}) => {
    // const darkTheme = useSettingStore((state) => state.darkTheme);
    const waveDisplayRef = useRef();
    const waveSurferRef: any = useRef();
    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

    useEffect(() => {
        if(waveDisplayRef.current && songAudio) {
            waveSurferRef.current = WaveSurfer.create({
                container: waveDisplayRef.current,
                waveColor: colors.tertiary,
                progressColor: colors.milk,
                normalize: true,
                cursorColor: colors.primary,
                url: `${songAudio}`,
                height: 80,
                barWidth: 10,
                // barGap: 5
            });
        }

        return () => {
            if(waveSurferRef.current) {
                waveSurferRef.current.destroy();
            }
        }
    }, []);


    return (
        <Box
            sx={{
                // height: "185px",
                borderRadius: "11px",
                bgcolor: colors.secondary,
                border: `1px solid ${colors.dark}`,
                width: "100%",
                my: 1.5
            }}
        >
            <Stack 
                direction="row" alignItems="center" justifyContent="space-between"
                p="15px" bgcolor={colors.tertiary} borderRadius="11px" color={colors.milk}
            >
                <Box>
                    <Typography
                        sx={{
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "32px",
                            letterSpacing: "-0.13px"
                        }}
                    > { songTitle } </Typography>

                    { subTitle ? 
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "15.67px",
                                lineHeight: "32px",
                                letterSpacing: "-0.1px",
                                color: "#CACACA"
                            }}
                        > { subTitle } </Typography>
                        : <></>
                    }
                </Box>

                {
                    editSong ? (
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "15.67px",
                                lineHeight: "32px",
                                letterSpacing: "-0.1px",
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                waveSurferRef.current.stop();
                                // waveSurferRef.current.destroy();
                                editSong(); 
                            }}
                        > Edit </Typography>
                    ) : (
                        <DeleteForeverOutlinedIcon sx={{ color: colors.milk, ":hover": { color: colors.primary } }}
                            onClick={() => { 
                                waveSurferRef.current.stop();
                                waveSurferRef.current.destroy();
                                deleteSong(); 
                            }} 
                        />
                    )
                }

            </Stack>

            <Stack 
                direction="row" alignItems="center" justifyContent="space-between" 
                spacing="15px" p="15px" 
            >
                <Box height="90px" width="100%" overflow="hidden">
                    <Box ref={ waveDisplayRef }></Box>
                </Box>

                <Box px={{xs: 0, sm: 1, md: 2}}>
                    {
                        isAudioPlaying ? (
                            <StopCircleOutlinedIcon sx={{ color: colors.milk, fontSize: "40px" }}  
                                onClick={() => { waveSurferRef.current.stop(); setIsAudioPlaying(false) }}
                            />
                        ) : (
                            <PlayArrowIcon sx={{ color: colors.milk, fontSize: "40px" }}  
                                onClick={() => { waveSurferRef.current.play(); setIsAudioPlaying(true); }}
                            />
                        )
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default SongPreviewComponent;