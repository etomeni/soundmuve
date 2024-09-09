import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import colors from '@/constants/colors';
import { contentWidth } from '@/util/mui';

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


function TermsOfUse() {

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
                }}> TERMS AND CONDITIONS </Typography>


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

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Acceptance of Terms</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        By accessing or using SoundMuve ("Platform"), 
                        you agree to be bound by these Terms of Use ("Terms"). 
                        If you do not agree with these Terms, you may not use the Platform.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Eligibility</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        You must be at least 18 years old to use the Platform. 
                        By using the Platform, you represent and warrant that you have 
                        the legal capacity to enter into this agreement.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Account Registration</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        You are responsible for maintaining the confidentiality of 
                        your account credentials. 
                        You agree to notify us immediately of any unauthorized 
                        use of your account.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>License to Use</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        We grant you a limited, non-exclusive, non-transferable 
                        license to access and use the Platform for its intended purposes. 
                        You may not use the Platform for any commercial purposes 
                        without our express permission.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Content Ownership</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Your Content: </span>
                    
                        You retain ownership of any content you upload to SoundMuve. 
                        By uploading content, you grant us a worldwide, 
                        royalty-free license to distribute, modify, 
                        and display your content in connection with the 
                        services we provide.
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: "bold"}}>Platform Content: </span>
                    
                        All content provided by SoundMuve, including text, 
                        graphics, and software, is owned by us or our 
                        licensors and is protected by copyright and 
                        other intellectual property laws.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>
                            Payments and Fees
                        </Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Payment Obligations: </span>

                        By signing up for our services, you agree to pay all applicable 
                        fees as set forth on our pricing page or within the specific 
                        service offering. This includes any distribution costs, 
                        royalties, and applicable taxes. 
                        Fees may be based on a per-song, per-album, or subscription basis.
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Billing: </span>

                        Payments are processed through secure third-party providers. 
                        You authorize SoundMuve to charge the payment method provided 
                        for all fees incurred, including any renewal or subscription fees, 
                        if applicable.
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Payment Methods: </span>

                        We process payments through Flutterwave, PayPal, and other 
                        designated payment methods and are bound by their terms and conditions. 
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Taxes: </span>

                        You are responsible for all applicable taxes 
                        associated with your use of the Platform, 
                        including sales, use, and any other related 
                        taxes as per the laws in your region.
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Refunds: </span>

                        All payments are final and non-refundable, 
                        except where required by law or as specified 
                        in the service agreement. 
                        If you believe you are eligible for a refund 
                        due to an error, you must contact us within 30 
                        days of the payment date.
                    </Typography>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        <span style={{fontWeight: 'bold'}}>Payment Disputes: </span>

                        Any payment disputes must be raised within 30 days 
                        from the payment date. If a payment dispute 
                        is resolved in your favor, we may, at our discretion, 
                        offer a refund or credit for future services.
                    </Typography>


                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Termination</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        We reserve the right to suspend or terminate your 
                        account at our discretion, including for breach of these 
                        Terms or misuse of the Platform. Upon termination, 
                        you will lose access to the Platform and any associated content.
                    </Typography>
                    

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Limitation of Liability</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        SoundMuve provides the Platform "as is" and makes no warranties 
                        regarding its functionality or content. 
                        We are not liable for any damages arising from your use of the 
                        Platform, to the extent permitted by law.
                    </Typography>

                    <Box sx={titleContainerStyle}>
                        <Typography variant='h3' sx={textTitleStyle}>Modifications to Terms</Typography>
                    </Box>

                    <Typography variant='body1' component="p" sx={textContentStyle} mb={1.5}>
                        We may revise these Terms from time to time. 
                        You will be notified of any material changes through email 
                        or by a notice on the Platform. 
                        Continued use of the Platform after such changes constitutes 
                        your acceptance of the new Terms.
                    </Typography>

                </Box>


                <Typography variant='body1' component="p" sx={textContentStyle} mb={5}>
                    Contact Us If you have any questions about these Terms,  
                    please contact us at <Link to="mailto:help@soundmuve.com" 
                        style={{
                            fontWeight: "600", color: "inherit", fontSize: "inherit",
                            fontFamily: "inherit"
                        }}
                    >help@soundmuve.com</Link>
                </Typography>
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default TermsOfUse;
