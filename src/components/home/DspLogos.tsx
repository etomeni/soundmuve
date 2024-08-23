import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// /Users/etom/Public/TechGuard/soundmuve-v2/public/
// ./images/home/dspBgLogo.png
import spotify from "@/assets/branded/images/home/spotify.png";
import appleMusic from "@/assets/branded/images/home/appleMusic.png";
import tiktok from "@/assets/branded/images/home/tiktok.png";
import amazonMusic from "@/assets/branded/images/home/amazonMusic.png";
import tidal from "@/assets/branded/images/home/tidal.png";
import deezer from "@/assets/branded/images/home/deezer.png";
import instagram from "@/assets/branded/images/home/instagram.png";
import beatport from "@/assets/branded/images/home/beatport.png";
import youtubMusic from "@/assets/branded/images/home/youtubMusic.png";
import pandora from "@/assets/branded/images/home/pandora.png";
import vevo from "@/assets/branded/images/home/vevo.png";
import napster from "@/assets/branded/images/home/napster.png";

import dspBgLogo from "@/assets/branded/images/home/dspBgLogo.png";


const platforms = [
    { name: 'Spotify', logo: spotify },
    { name: 'Apple Music', logo: appleMusic },
    { name: 'TikTok', logo: tiktok },
    { name: 'Amazon Music', logo: amazonMusic },
    { name: 'Tidal', logo: tidal },
    { name: 'Instagram', logo: instagram },
    { name: 'Deezer', logo: deezer },
    { name: 'Beatport', logo: beatport },
    { name: 'YouTube Music', logo: youtubMusic },
    { name: 'Pandora', logo: pandora },
    { name: 'Vevo', logo: vevo },
    { name: 'Napster', logo: napster },
];

export const DspLogos = () => {
    return (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
            <Grid container spacing={{xs: 0.5, md: 1.5}} justifyContent="center" alignItems="center">
                {platforms.map((platform, index) => (
                    <Grid item xs={4} sm={4} md={3} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: {xs: "59.62px", md: "92.54px"},
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#6C6050',
                                borderRadius: {xs: "11.18px", md: 4},
                                boxShadow: "0.58px 0.58px 1.74px 0px #00000024",
                            }}
                        >
                            <img src={platform.logo}
                                alt={`${platform.name} logo`}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Box
                sx={{
                    mixBlendMode: "soft-light",
                    position: "absolute",
                    // top: {xs: "0%", sm: "10%", md:"20px"},
                    top: "0%",
                    padding: "10px",
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                }}
            >
                <img src={dspBgLogo} alt='soundMuve logo' 
                    style={{
                        width: '100%',
                        height: "100%",
                        objectFit: 'contain',
                    }}
                />
            </Box>
        </Box>
    )
}
