import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import style from "./footer.module.css";

import logo from "@/assets/branded/logo.png";
import mobileBrandImage from "@/assets/branded/images/footer/mobileBrandImage.png";
import desktopBrandImage from "@/assets/branded/images/footer/desktopBrandImage.png";
import SnackbarToast, { SnackbarToastInterface } from './ToastNotification';
import { apiEndpoint } from '../util/resources';

import { contentWidth } from '@/util/mui';
import colors from '@/constants/colors';


const currentYear = new Date().getFullYear();

export default function FooterComponent() {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [toastNotification, setToastNotification] = useState<SnackbarToastInterface>({
        display: false,
        status: "success",
        message: ""
    });

    const handleBack2Top = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

            
    const onSubmit = async () => {
        if (!email.match(/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*|\"([^\\]\\\"]|\\.)*\")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/)) {
            
            setToastNotification({
                display: true,
                status: "error",
                message: "Please enter a valid email address."
            });
            return;
        }

        try {
            const response = (await axios.post(`${apiEndpoint}/newsLetter/subscribe-newsletter`, { email })).data;
            
            if (response && response.savedUser) {
                setToastNotification({
                    display: true,
                    status: "success",
                    message: response.message
                });

                return;
            }

            setToastNotification({
                display: true,
                status: "error",
                message: response.message || "Oooops, registration failed. please try again."
            });

            setEmail("");
        } catch (error: any) {
            // console.log(error);
            const err = error.response.data;

            setToastNotification({
                display: true,
                status: "error",
                message: err.message || "Oooops, news letter subscription failed. please try again."
            });
        }

    }

    const mobileView = (
        <Box>
            <div style={{
                display: "flex", whiteSpace: "nowrap",
                flexDirection: "row", alignItems: "center"
            }}>
                <input 
                    type="email" 
                    placeholder='Email Address' 
                    className={style.xsInput}
                    autoComplete="email" 
                    value={email}
                    required
                    onChange={e => setEmail(e.currentTarget.value)}
                />

                <Box onClick={() => onSubmit()} 
                    sx={{
                        // border: `0.57px solid ${colors.primary}`,
                        borderRadius: "0px 5.33px 5.33px 0px",
                        bgcolor: colors.primary,
                        // px: 1,
                        width: "54.67px",
                        height: "34.66px",
                        alignSelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
                >
                    <Typography sx={{
                        fontWeight: "700",
                        fontSize: "9.67px",
                        lineHeight: "17.67px",
                        textAlign: "center",
                        color: "#fff",
                    }}> Join </Typography>
                </Box>

            </div>
        </Box>
    );

    const desktopView = (
        <Box>
            <div style={{
                display: "flex", whiteSpace: "nowrap",
                flexDirection: "row", alignItems: "center"
            }}>
                <input 
                    type="email" 
                    placeholder='Email Address' 
                    className={style.desktopInput}
                    autoComplete="email" 
                    value={email}
                    required
                    onChange={e => setEmail(e.currentTarget.value)}
                />

                <Box onClick={() => onSubmit()} 
                    sx={{
                        border: `0.57px solid ${colors.primary}`,
                        borderRadius: "0px 5.33px 5.33px 0px",
                        bgcolor: colors.primary,
                        
                        // px: 1,
                        width: "54.67px",
                        height: "34.66px",
                        alignSelf: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}
                >
                    <Typography sx={{
                        fontWeight: "700",
                        fontSize: "9.67px",
                        lineHeight: "17.67px",
                        textAlign: "center",
                        color: "#fff",
                    }}>
                        Join
                    </Typography>
                </Box>

            </div>
        </Box>
    );


    return (
        <Box bgcolor="#21262C" 
            sx={{ 
                ...contentWidth,
                mx: "auto",
                borderRadius: "24px 24px 0 0",
            }}
        >
            <Box sx={{ pt: 4, display: {xs: "none", md: "block"} }}> 
                <Box onClick={() => handleBack2Top()}
                    sx={{
                        padding: "8.5px 15.89px",
                        borderRadius: "25px",
                        border: "0.5px solid #464B4D",
                        width: "fit-content",
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        mx: "auto",
                        cursor: "pointer"
                    }}  
                >
                    <ExpandLessIcon sx={{ color: "#DFE8E4", fontSize: "14px", fontWeight: "400", }} />

                    <Typography variant='button'
                        sx={{
                            fontFamily: "Geist",
                            fontWeight: "400",
                            fontSize: "12px",
                            lineHeight: "11.9px",
                            textAlign: "center",
                            color: "#DFE8E4",
                        }}  
                    >Back to top</Typography>
                </Box>
            </Box>

            <Box sx={{
                display: {xs: "none", md: "block"},
                px: {xs: 2, md: 5, lg: 12}, 
                pt: {xs: 5, md: 7},
                pb: 0
            }}>
                <Grid container spacing={2}>
                    <Grid item 
                        xs={6} sm={3} md={2} // lg={3}
                        sx={{ display: "flex", justifyContent: "left" }}
                    >
                        <div>
                            <Link to="/">
                                <img 
                                    src={logo}
                                    alt="SoundMuve logo" 
                                    style={{width: 130, display: "block"}}
                                />
                            </Link>

                            <Box sx={{display: "flex", gap: 1, mt: 2}}>
                                <FacebookIcon className={style.icons} />
                                <TwitterIcon className={style.icons} />
                                <LinkedInIcon className={style.icons} />
                                <InstagramIcon className={style.icons} />
                            </Box>
                        </div>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Typography variant='body1' component="p" className={style.text}>
                                &copy; { currentYear } SoundMuve.
                            </Typography>
                            <Typography variant='body1' component="p" className={style.text}>
                                All rights reserved.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/pricing" className={`${style.link} ${style.mdLink}`} title='Pricing'>
                                Pricing
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/terms-of-use" className={`${style.link} ${style.mdLink}`} title='Terms of Use'>
                                Terms of Use
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={6} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Box my={0}>
                            <Link to="/privacy-policy" className={`${style.link} ${style.mdLink}`} title='Privacy Policy'>
                                Privacy Policy
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item
                        xs={12} sm={3} md={2}
                        sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
                    >
                        <Box>
                            <Typography variant='h4' component="h4" 
                                sx={{
                                    fontFamily: "Geist",
                                    fontSize: "12.6px",
                                    fontWeight: "700",
                                    lineHeight: "19.33px",
                                    letterSpacing: "-0.13329392671585083px",
                                    textAlign: "left",
                                    color: "#fff"
                                }}
                            > Our Newsletter </Typography>

                            <Box my={2}>
                                <Typography variant='body1' component="p" className={style.text}>
                                    Subscribe to our newsletter to get
                                    our news delivered to you.
                                </Typography>
                            </Box>

                            { desktopView }

                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ position: "relative"}}>
                    <img src={desktopBrandImage}
                        style={{
                            width: "auto",
                            // height: "100%",
                            // objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{
                display: {xs: "block", md: "none"},
                pt: {xs: 5, md: 7},
                pb: 0,
            }}>
                <Box sx={{ px: {xs: 2, md: 5, lg: 12} }}>
                    <Box>
                        <Link to="/">
                            <img 
                                src={logo}
                                alt="SoundMuve logo" 
                                style={{maxWidth: "53px", display: "block"}} 
                            />
                        </Link>
                    </Box>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={6} sm={6} md={4}>
                            <Box>
                                <ul className={style.footerList}>
                                    <li className={style.xsText}>
                                        <Link to="/pricing" className={`${style.link} ${style.xsLink}`} title='Pricing'>
                                            Pricing
                                        </Link>
                                    </li>
                                    
                                    <li className={style.xsText}>
                                        <Link to="/terms-of-use" className={`${style.link} ${style.xsLink}`} title='Terms of Use'>
                                            Terms of Use
                                        </Link>
                                    </li>

                                    <li className={style.xsText}>
                                        <Link to="/privacy-policy" className={`${style.link} ${style.xsLink}`} title='Privacy Policy'>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={6} md={4}>
                            <div>
                                <Typography variant='h3' component="h3" 
                                    sx={{
                                        fontFamily: "Geist",
                                        fontWeight: "700",
                                        fontSize: "11px",
                                        lineHeight: "19.33px",
                                        letterSpacing: "-0.13px",
                                        color: colors.milk
                                    }}
                                > Our Newsletter  </Typography>

                                <Box my={1}>
                                    <Typography variant='body1' component="p" 
                                        sx={{
                                            fontFamily: "Geist",
                                            fontSize: "11px",
                                            fontWeight: "300",
                                            lineHeight: "19.26px",
                                            textAlign: "left",
                                            color: "#CACACA", // colors.milk
                                        }}
                                    >
                                        Subscribe to our newsletter to get
                                        our news delivered to you.
                                    </Typography>
                                </Box>

                                { mobileView }

                            </div>
                        </Grid>
                    </Grid>

                    <Stack direction="row" justifyContent="left" alignItems="center" spacing={2} my={2}>

                        <Box sx={{display: "flex", gap: 1}}>
                            <FacebookIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                            <TwitterIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                            <LinkedInIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                            <InstagramIcon className={style.icons} sx={{maxWidth: "5.69px", fontSize: 10}} />
                        </Box>

                        <Typography className={style.text} sx={{
                            fontFamily: "Geist",
                            fontSize: "10.89px",
                            fontWeight: "600",
                            lineHeight: "19.26px",
                            textAlign: "left",
                            color: "#CACACA"
                        }}>
                            &copy; { currentYear } SoundMuve All rights reserved.
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ position: "relative", bottom: 0 }}>
                    <img src={mobileBrandImage}
                        style={{
                            width: "auto",
                            // height: "100%",
                            objectFit: "contain",
                            position: "relative",
                            bottom: -7
                        }}
                    />
                </Box>
            </Box>


            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification({ ...toastNotification, display: false})}
            />
        </Box>
    )
}