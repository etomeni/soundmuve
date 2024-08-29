import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AuthHeaderComponent from '@/components/AuthHeader';

import recordLabelSignup from "@/assets/images/recordLabelSignup.jpg"
import artistSignup from "@/assets/images/artistSignup.jpg"
import colors from '@/constants/colors';


  
function Signup2() {
    const navigate = useNavigate();
    

    return (
        <Box sx={{bgcolor: "#0C2634", color: "#fff", minHeight: "100vh" }}>
            <AuthHeaderComponent />

            <Container sx={{pt: 7, pb: 10 }}>
                <Box sx={{
                    textAlign: "center",
                    my: 5
                }}>
                    <Typography variant='h2' component="h2" sx={{
                        fontFamily: "Nohemi",
                        fontWeight: "900",
                        fontSize: {xs: 35, md: "40px"},
                        lineHeight: {xs: "49.28px", md: "18px"},
                        letterSpacing: {xs: "-0.9px", md: "-0.2px"},
                        color: colors.milk,
                    }}> Get access to SoundMuve </Typography>

                    <Typography variant='body2' sx={{
                        fontFamily: "Geist",
                        fontWeight: "300",
                        fontSize: "16px",
                        lineHeight: "12px",
                        letterSpacing: "-0.2px",
                        mt: {xs: "20px", md: "54px"}
                    }}> Tell us who you are </Typography>
                </Box>
                
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <Box onClick={() => navigate("/auth/signup-artistDetails")}
                        sx={{
                            width: '362.89px',
                            height: '296.99px',
                            backgroundImage: `url(${artistSignup})`, // Replace with your image URL
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            borderRadius: "13.69px",
                            border: "1px solid #fff",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #000000 109.84%)',
                            }}
                        />
                        <Typography sx={{
                            fontWeight: "700",
                            fontSize: "34px",
                            lineHeight: "40px",
                            letterSpacing: "-0.13px",
                            position: "absolute",
                            bottom: 80,
                            left: 130
                        }}>
                            Artist
                        </Typography>
                    </Box>

                    <Box onClick={() => navigate("/auth/signup-recordLabelDetails")}
                        sx={{
                            width: '362.89px',
                            height: '296.99px',
                            backgroundImage: `url(${recordLabelSignup})`, // Replace with your image URL
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            borderRadius: "13.69px",
                            border: "1px solid #fff",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(180.1deg, rgba(0, 0, 0, 0) 0.08%, #000000 109.84%)',
                            }}
                        />
                        
                        <Typography sx={{
                            fontWeight: "700",
                            fontSize: "34px",
                            lineHeight: "40px",
                            letterSpacing: "-0.13px",
                            position: "absolute",
                            bottom: 80,
                            left: 80
                        }}>
                            Record Label
                        </Typography>
                    </Box>
                </Box>
                
            </Container>
        </Box>
    )
}

export default Signup2;
