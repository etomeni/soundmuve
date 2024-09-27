import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import style from './pricingStyles.module.css';

import colors from "@/constants/colors";
import { contentWidth } from "@/util/mui";
import { useState } from "react";


function Pricing() {
    const [planCategory, setPlanCategory] = useState<"Unlimited" | "Pay per release">("Pay per release");


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
                    color: "#6C6050"
                }}> Pricing </Typography>

                {/* <Typography variant='body1' component="p"
                    sx={{
                        pb: 4,
                        fontFamily: "Geist",
                        fontWeight: "300",
                        fontSize: { xs: "13px", md: "16px" },
                        lineHeight: {xs: "17.06px", md: "22px" },
                        letterSpacing: {xs: "-0.1px", md: "-0.13px" },
                        textAlign: "center",
                        color: "#212121"
                    }}
                >
                    You can stay on a $30 plan until you need to move to another plan
                </Typography> */}


                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5
                }}>
                    <Box 
                        sx={{
                            maxWidth: 460,
                            width: "100%",
                            borderRadius: 2,
                            border: `1px solid ${colors.primary}`,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            alignItems: "center",
                            textAlign: "center",
                            p: 1,
                            flexWrap: "nowrap"
                        }}
                    >
                        {/* <Typography variant="h2"
                            onClick={() => setPlanCategory("Unlimited")}
                            sx={{
                                bgcolor: planCategory == "Unlimited" ? colors.primary : "none",
                                color: planCategory == "Unlimited" ? colors.milk : colors.primary,
                                px: 3,
                                borderRadius: 2,
                                flexGrow: 1,
                                fontWeight: "900",
                                fontSize: {xs: "16px", md: "25px"},
                                lineHeight: {xs: "38.78px", md: "50px"},
                                letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                cursor: "pointer"
                            }}
                        > Unlimited plan </Typography> */}

                        <Typography variant="h2"
                            onClick={() => setPlanCategory("Pay per release")}
                            sx={{
                                bgcolor: planCategory == "Pay per release" ? colors.primary : "none",
                                color: planCategory == "Pay per release" ? colors.milk : colors.primary,
                                px: 3,
                                borderRadius: 2,
                                flexGrow: 1,
                                fontWeight: "900",
                                fontSize: {xs: "16px", md: "25px"},
                                lineHeight: {xs: "38.78px", md: "50px"},
                                letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                cursor: "pointer"
                            }}
                        > Pay per release </Typography>
                    </Box>
                </Box>


                <Box sx={{my: 10}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sx={{order: {xs: 2, md: "unset"}}}>
                            <Box height="100%"
                                sx={{
                                    bgcolor: "#EFDEBF",
                                    color: "#000",
                                    p: 2, 
                                    borderRadius: 3
                                }}
                            >
                                <Typography variant="h1" component="h1"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                    }}
                                > Singles </Typography>

                                <Typography>
                                    <Typography variant="subtitle1" component="span"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "35px", md: "45px"},
                                            lineHeight: {xs: "78.28px", md: "100.93px" },
                                            letterSpacing: {xs: "-1.77px", md: "-2.28px"},
                                        }}
                                    > $25 </Typography>

                                    {/* <Typography variant="subtitle2" component="span"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "12.41px", md: "16px"},
                                            lineHeight: {xs: "31.02px", md: "40px" },
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                        }}
                                    > Per year </Typography> */}
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "600",
                                        fontSize: {xs: "13px", md: "14px"},
                                        lineHeight: {xs: "20px", md: "24px" },
                                        letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                        textAlign: "justify"
                                    }}
                                >
                                    Release to all 150+ Digital Stores and Social media platforms.
                                </Typography>

                                <Box
                                    sx={{
                                        // p: "1px 101px",
                                        borderRadius: {xs: "6.2px", md: "8px"},
                                        bgcolor: "#6C6050",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        my: 2
                                    }}
                                >
                                    <Typography variant="button"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "16px", md: "20px"},
                                            lineHeight: {xs: "38.78px", md: "50px"},
                                            letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                        }}
                                    >Get started</Typography>
                                </Box>

                                <Typography variant="h3" component="h3"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"}
                                    }}
                                > Features </Typography>

                                <ul className={style.pricingFeatures}>
                                    <li >
                                        Unlimited releases
                                    </li>
                                    <li>
                                        Basic analytics
                                    </li>
                                    <li>
                                        Choose release date
                                    </li>
                                    <li>
                                        Customisable artist profile
                                    </li>
                                    <li>
                                        Community access
                                    </li>
                                    <li>
                                        Music promo campaign
                                    </li>
                                    <li>
                                        Music distribution on streaming platforms
                                    </li>
                                    <li>
                                        Support reply under 72hrs
                                    </li>
                                    <li>
                                        Change to Business or Premium Plan anytime
                                    </li>
                                </ul>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={6} sx={{order: {xs: 1, md: "unset"}}}>
                            <Box height="100%"
                                sx={{
                                    bgcolor: "#53674C", 
                                    color: colors.milk,
                                    p: 2, 
                                    borderRadius: 3
                                }}
                            >
                                <Typography variant="h1" component="h1"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                    }}
                                > Album </Typography>

                                <Typography>
                                    <Typography variant="subtitle1" component="span"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "35px", md: "45px"},
                                            lineHeight: {xs: "78.28px", md: "100.93px" },
                                            letterSpacing: {xs: "-1.77px", md: "-2.28px"},
                                        }}
                                    > $45 </Typography>

                                    {/* <Typography variant="subtitle2" component="span"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "12.41px", md: "16px"},
                                            lineHeight: {xs: "31.02px", md: "40px" },
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                        }}
                                    > Per year </Typography> */}
                                </Typography>

                                <Typography variant='body2'
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "600",
                                        fontSize: {xs: "13px", md: "14px"},
                                        lineHeight: {xs: "20px", md: "24px" },
                                        letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                                        textAlign: "justify"
                                    }}
                                >
                                    Release to all 150+ Digital Stores and Social media platforms.
                                </Typography>

                                <Box
                                    sx={{
                                        // p: "1px 101px",
                                        borderRadius: {xs: "6.2px", md: "8px"},
                                        bgcolor: colors.primary,
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        my: 2
                                    }}
                                >
                                    <Typography variant="button"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "16px", md: "20px"},
                                            lineHeight: {xs: "38.78px", md: "50px"},
                                            letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                        }}
                                    >Get started</Typography>
                                </Box>

                                <Typography variant="h3" component="h3"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"}
                                    }}
                                > Features </Typography>

                                <ul className={style.pricingFeatures}>
                                    <li >
                                        Everything in the Basic Plan
                                    </li>
                                    <li>
                                        Advanced Analytics
                                    </li>
                                    <li>
                                        Pre-save & Smartlinks
                                    </li>
                                    <li>
                                        Youtube Content ID
                                    </li>
                                    <li>
                                        Support reply under 48hrs
                                    </li>
                                    <li>
                                        Automated royalty splitting
                                    </li>
                                    <li>
                                        Enhanced Marketing tools
                                    </li>
                                    <li>
                                        Custom release strategies
                                    </li>
                                    <li>
                                        Additional Distribution Channels
                                    </li>
                                    <li>
                                        Change to Premium Plan anytime
                                    </li>
                                </ul>
                            </Box>
                        </Grid>

                        {/* <Grid item xs={12} md={4} sx={{order: {xs: 3, md: "unset"}}}>
                            <Box height="100%"
                                sx={{
                                    bgcolor: "#EFDEBF",
                                    color: "#000",
                                    p: 2, 
                                    borderRadius: 3
                                }}
                            >
                                <Typography variant="h1" component="h1"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                    }}
                                > Enterprise plan </Typography>

                                <Typography>
                                    <Typography variant="subtitle1" component="span"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "35px", md: "45px"},
                                            lineHeight: {xs: "78.28px", md: "100.93px" },
                                            letterSpacing: {xs: "-1.77px", md: "-2.28px"},
                                        }}
                                    > $60 </Typography>

                                    <Typography variant="subtitle2" component="span"
                                        sx={{
                                            fontWeight: "400",
                                            fontSize: {xs: "12.41px", md: "16px"},
                                            lineHeight: {xs: "31.02px", md: "40px" },
                                            letterSpacing: {xs: "-0.1px", md: "-0.13px"},
                                        }}
                                    > Per year </Typography>
                                </Typography>

                                <Box
                                    sx={{
                                        // p: "1px 101px",
                                        borderRadius: {xs: "6.2px", md: "8px"},
                                        bgcolor: "#6C6050",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        my: 2
                                    }}
                                >
                                    <Typography variant="button"
                                        sx={{
                                            fontWeight: "900",
                                            fontSize: {xs: "16px", md: "20px"},
                                            lineHeight: {xs: "38.78px", md: "50px"},
                                            letterSpacing: {xs: "-0.88px", md: "-1.13px"},
                                        }}
                                    >Get started</Typography>
                                </Box>

                                <Typography variant="h3" component="h3"
                                    sx={{
                                        fontWeight: "900",
                                        fontSize: {xs: "16px", md: "20px"},
                                        lineHeight: {xs: "38.78px", md: "50px"},
                                        letterSpacing: {xs: "-0.88px", md: "-1.13px"}
                                    }}
                                > Features </Typography>
                                
                                <ul className={style.pricingFeatures}>
                                    <li >
                                        Everything in the Business Plan
                                    </li>
                                    <li>
                                        Premium Analytics
                                    </li>
                                    <li>
                                        Pitch for TV and Movie Sync
                                    </li>
                                    <li>
                                        Free ISRC and UPCs
                                    </li>
                                    <li>
                                        Support reply under 24hrs
                                    </li>
                                    <li>
                                        100% Revenue from Digital Stores
                                    </li>
                                    <li>
                                        High-Quality Audio mastering
                                    </li>
                                    <li>
                                        Promotional Opportunities and Playlist Submissions
                                    </li>
                                </ul>
                            </Box>
                        </Grid> */}
                    </Grid>
                </Box>
                
            </Box>

            <FooterComponent />
        </Box>
    )
}

export default Pricing;
