import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { contentWidth } from '@/util/mui';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import colors from '@/constants/colors';
import { SxProps, Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';



const textContentStyle: SxProps<Theme> = {
    // pb: 4,
    fontFamily: "Geist",
    fontWeight: "300",
    fontSize: { xs: "13px", md: "20px" },
    lineHeight: {xs: "28px", md: "40px" },
    letterSpacing: {xs: "-0.13px", md: "-0.129px" },
    textAlign: "justified"
}

const textTitleStyle: SxProps<Theme> = {
    fontFamily: "Geist",
    fontWeight: "800",
    fontSize: {xs: "16px", md: "30px"},
    lineHeight: {xs: "24px", md: "35px"},
    letterSpacing: "-0.13px"
}

const titleContainerStyle: SxProps<Theme> = {
    my: 3,
    px: 2,
    borderLeft: `5px solid ${colors.primary}`,
    borderRadius: "5px"
}


function PrivacyPolicy() {


    return (
        <Box bgcolor={colors.bg} >
            <Box height={{xs: 60, sm: 50, md: 40}}></Box>
            <HeaderComponent />

            <Box sx={{
                ...contentWidth,
                mt: { xs: "35px", md: "75px"}
            }}>
                <Typography sx={{
                    fontFamily: "Nohemi",
                    fontWeight: "bold",
                    fontSize: {xs: "35px", md: "60px"},
                    lineHeight: {xs: "", md: "82.28px"},
                    letterSpacing: {xs: "1px", md: "-1.5px"},
                    textAlign: "center",
                    mt: {xs: "18px", md: "25px"},
                    color: colors.dark
                }}> PRIVACY POLICY </Typography>

                <Box my={{xs: '50px', md: "72px"}}>
                    <Typography variant='h2'
                        sx={{
                            fontFamily: "Geist",
                            fontWeight: "800",
                            fontSize: {xs: "13px", md: "20px"},
                            lineHeight: {xs: "40px", md: "40px"},
                            letterSpacing: "-0.13px",

                            p: {xs: "5px", md: '15px'},
                            bgcolor: colors.primary,
                            color: colors.milk,
                            borderRadius: "8px",
                            width: "fit-content"
                        }}
                    > Effective Date: September 4th, 2024. </Typography>
                </Box>

                <Box sx={{
                    my: 4, 
                    textAlign: "justify",
                    fontSize: 20
                }}>

                    <Typography variant='body1' component="p" sx={textContentStyle} >
                        Introduction SoundMuve is committed to protecting your privacy. 
                        This Privacy Policy outlines the types of information we collect, 
                        how we use it, and the measures we take to protect your data. 
                        By using our platform, you agree to the terms of this Privacy Policy.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Information We Collect</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Personal Information: </span>

                        <span>
                            We collect personal information such as your name, 
                            email address, billing information, 
                            and any other information you provide when you 
                            register for an account or use our services.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Usage Data: </span>

                        <span>
                            We collect information about your interactions with our platform, 
                            including IP address, browser type, pages visited, and other activity data.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Cookies and Tracking Technologies: </span>

                        <span>
                            We use cookies to enhance your experience on our platform. 
                            These cookies help us understand how you use our services and 
                            enable certain functionalities.
                        </span>
                    </Typography>


                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>
                            How We Use Your Information
                        </Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Service Provision: </span>

                        <span>
                            We use your personal information to provide and manage your account, 
                            distribute your content, and process payments.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Communication: </span>

                        <span>
                            We may use your information to send you updates, newsletters, and marketing materials. 
                            You can opt out of these communications at any time.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Analytics: </span>

                        <span>
                            We analyze usage data to improve our platform, monitor performance, and develop new features.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Legal Compliance: </span>

                        <span>
                            We may disclose your information to comply with legal 
                            obligations or protect our rights and the safety of others.
                        </span>
                    </Typography>


                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Note</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Sharing Your Information: </span>

                        <span>
                            We do not sell your personal information. 
                            However, we may share your data with trusted third parties, 
                            such as payment processors and legal authorities, 
                            to facilitate the services we offer.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Data Security: </span>

                        <span>
                            We implement robust security measures to protect your data, 
                            including encryption, secure servers, and regular security audits. 
                            However, no method of transmission over the internet is 100% secure.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Your Rights: </span>

                        <span>
                            You have the right to access, modify, or delete your personal information. 
                            You may also withdraw your consent to data processing at any time. Contact us at 
                            [contactsoundmuve@gmail.com] to exercise these rights.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Changes to This Privacy: </span>

                        <span>
                            We may update this Privacy Policy from time to time. 
                            We will notify you of any significant changes by email 
                            or by posting a notice on our platform.
                        </span>
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        Contact Us If you have any questions about this Privacy Policy, 
                        please contact us at <Link to="mailto:help@soundmuve.com" 
                            style={{
                                fontWeight: "600", color: "inherit", fontSize: "inherit",
                                fontFamily: "inherit"
                            }}
                        >help@soundmuve.com</Link>
                        
                    </Typography>

                </Box>
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default PrivacyPolicy;
