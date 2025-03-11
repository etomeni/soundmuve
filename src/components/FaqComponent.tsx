import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { contentWidth } from '@/util/mui';
import colors from '@/constants/colors';

import faqVideoThumbnail from "@/assets/branded/images/faqVideoThumbnail.png";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<AddIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: "transparent",
        // theme.palette.mode === 'dark'
        // ? 'rgba(255, 255, 255, .05)'
        // : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    border: "none",
    // background: "green"
    // borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


function FaqComponent() {
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const questions = [
        {
            title: "What is SoundMuve?",
            details: "SoundMuve is a platform that helps artists, sound designers and podcasters to distribute their work to major streaming services. We provide tools and support to amplify your sound and reach a global audience."
        },
        {
            title: "How does SoundMuve work?",
            details: "Sign up on the SoundMuve website, upload your music, select your preferred streaming platforms, promote your tracks and track your performance with our real-time analytics."
        },
        {
            title: "Is SoundMuve suitable for independent artists?",
            details: "Yes. We provide essential tools for music distribution, marketing and audience engagement, making it easier for independent creators to gain visibility and achieve their goals."
        },
        {
            title: "What streaming sites does SoundMuve distribute to?",
            details: "We partner with over 150 digital stores and streaming services, including Spotify, Apple Music, YouTube, Boomplay, TikTok and many more, to ensure your sound reaches a global audience."
        },
        {
            title: "What is SoundMuve’s pricing plan?",
            details: "SoundMuve offers three plans: Basic, Business and Premium. Choose the plan that fits your goals and start amplifying your sound today."
        },
        {
            title: "How much of my royalties does SoundMuve keep?",
            details: "None. We offer transparent transactions, ensuring you receive 100% of your earnings."
        },
        {
            title: "What kind of support does SoundMuve offer its users?",
            details: "We offer 24/7 support in multiple local languages. Our services include dedicated coaching, personalized onboarding and a responsive chatbot to provide quick answers and solutions."
        },
    ];


    return (
        <Box sx={{
            ...contentWidth,
            mt: { xs: "35px", md: "75px"}
        }}>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": questions.map((item) => {
                        return {
                            "@type": "Question",
                            "name": item.title,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.details
                            }
                        }
                    })
                }) }}
            />

            <Typography sx={{
                fontFamily: "Nohemi",
                fontWeight: "900",
                fontSize: {xs: "35px", md: "40px"},
                lineHeight: {xs: "", md: "40.18px"},
                textAlign: "center",
                mt: {xs: "18px", md: "25px"},
                // color: colors.dark,
                color: "#6C6050"
            }}> Frequently asked questions </Typography>

            <Box sx={{p: {xs: 0, md: 5}}}>
                { questions.map((question, index) => (
                    <Box key={index}>
                        <Accordion 
                            expanded={expanded === `panel${index}`} 
                            onChange={handleChange(`panel${index}`)} 
                            sx={{
                                bgcolor: "transparent", mb: 2, border: "none", color: "#fff"
                            }}
                        >
                            <AccordionSummary 
                                aria-controls={`panel${index}d-content`} 
                                id={`panel${index}d-header`}
                                expandIcon={
                                    expanded == `panel${index}` ? 
                                    <RemoveIcon sx={{ transform: 'rotate(90deg)', color: "#644986" }} /> 
                                    : <AddIcon sx={{color: "#644986"}} />
                                }
                            >
                                <Typography sx={{
                                    fontFamily: "Geist",
                                    fontSize: "33px",
                                    fontWeight: "700",
                                    lineHeight: "29.3px",
                                    letterSpacing: "-0.273px",
                                    textAlign: "left",
                                    color: colors.dark
                                }}>{question.title}</Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{pl: 6}}>
                                <Typography sx={{
                                    fontFamily: "Geist",
                                    fontSize: "16px",
                                    fontWeight: "300",
                                    lineHeight: "29.3px",
                                    letterSpacing: "-0.273px",
                                    textAlign: "left",
                                    color: colors.dark
                                }}>{question.details}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))}

            </Box>


            <Box my="100px" 
                sx={{
                    width: "100%",
                    backgroundColor: "#0B0B0B70",
                }}
            >
                <video controls poster={faqVideoThumbnail}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                >
                    <source src="https://gsssecurity.ng/wp-content/uploads/2023/02/GSS-SECURITY-AD-VIDEO.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
        </Box>
    )
}

export default FaqComponent;