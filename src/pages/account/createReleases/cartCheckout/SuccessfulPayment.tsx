import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import { submitBtnStyle } from '@/util/mui';

// import albumSampleArt from '@/assets/images/albumSampleArt.png';
import { useCart } from '@/hooks/useCart';
import Stack from '@mui/material/Stack';
import successImg from "@/assets/images/successImg.gif";
import { useNavigate } from 'react-router-dom';


function SuccessfulPayment() {
    const navigate = useNavigate();
    const { handleSuccessfulPayment } = useCart();

    useEffect(() => {
        handleSuccessfulPayment()
    }, [])
    
    
    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box my="100px">
                <Typography variant='body1'
                    sx={{
                        fontWeight: "800",
                        fontSize: {xs: "25px", md: "50px"},
                        lineHeight: {xs: '30px', md: "53.8px"},
                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                        color: colors.dark,
                        textAlign: "center"
                    }}
                >Congratulations your release has been submitted</Typography>

                <Box my={5}>
                    <Stack alignItems="center" justifyContent="center" textAlign="center">
                        <img 
                            src={successImg}
                            style={{
                                // width: "100px",
                                // height: "auto",
                                objectFit: "contain"
                            }}
                        />
                    </Stack>
                </Box>


                <Stack alignItems="center" justifyContent="center" textAlign="center">
                    <Button variant="contained" 
                        fullWidth type="button" 
                        onClick={() => { navigate("/account"); }}
                        sx={{
                            ...submitBtnStyle,
                            maxWidth: "320px",

                            fontSize: "16px",
                            fontWeight: "900",
                            lineHeight: "13px",
                            letterSpacing: "-0.13px"
                        }}
                    >Go Home</Button>
                    {/* >View Releases</Button> */}
                </Stack>

            </Box>
        </AccountWrapper>
    )
}

export default SuccessfulPayment