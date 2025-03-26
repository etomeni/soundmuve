import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import HeaderComponent from '@/components/Header';
import FooterComponent from '@/components/Footer';
import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';
import contactBgImage from "@/assets/branded/images/contact/background.png";
import illustrationMailImage from "@/assets/branded/images/contact/illustrationMail.png";
import useMediaQuery from '@mui/material/useMediaQuery';

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContactUsComponent from '@/components/ContactUsComponent';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
  

function Contact() {
    const theme = useTheme();
    // const isMediumScreen = useMediaQuery('(min-width: 960px)');
    // const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));
    // const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'));

    
    return (
        <Box bgcolor={colors.dark} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                my: { xs: "35px", md: "75px"},
                px: {xs: 5, md: 10},
                // mb: {xs: 5, md: 10},
            }}>

                {
                    mdMatches ?  
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: "926.38px",
                                height: "100%",
                                maxHeight: "603.39px",
                                backgroundImage: `url(${contactBgImage})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                                // backgroundPosition: 'center',
                            }}
                        >
                            <Box 
                                sx={{ 
                                    pl: {md: "21%", lg: "15%"},
                                    // pr: {md: "21%", lg: "15%"},
                                    py: "40px",
                                }}
                            >

                                <Grid container>
                                    <Grid item xs={12} md={8}>
                                        <ContactUsComponent />
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Box 
                                            sx={{ 
                                                display: {xs: "none", md: "block"},
                                                // bgcolor: "green",
                                                width: "100%",
                                                height: "100%",
                                                position: "relative"
                                            }}
                                        >
                                            <Stack height="100%" width="100%">
                                                <Box 
                                                    sx={{
                                                        position: "absolute",
                                                        top: "105px"
                                                    }}
                                                >
                                                    <img src={illustrationMailImage}
                                                        alt='illustration mail image for contact us page'
                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "364.5px",
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                </Box>

                                                <Box sx={{mt: "auto", mb: "50px", width: "100%" }}>
                                                    <Box sx={{ display: "flex", gap: "15px" }}>
                                                        <a href="https://facebook.com/soundmuve" target='_blank'>
                                                            <FacebookIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>

                                                        <a href="https://x.com/soundmuve/" target='_blank' >
                                                            <XIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>

                                                        <a href="https://www.linkedin.com/company/86408243/" target='_blank'>
                                                            <LinkedInIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>                                                        

                                                        <a href="https://www.instagram.com/soundmuve/" target='_blank' >
                                                            <InstagramIcon sx={{maxWidth: "20px", fontSize: 20, color: "#6C6050"}} />
                                                        </a>
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
                            
                            </Box>
                        </Box>
                    : <ContactUsComponent />
                }

            </Box>

            <FooterComponent />
        </Box>
    )
}

export default Contact;