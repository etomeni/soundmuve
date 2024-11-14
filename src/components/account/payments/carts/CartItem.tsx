import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import colors from '@/constants/colors';
import { numberOfLinesTypographyStyle } from '@/util/mui';
import { currencyDisplay } from '@/util/resources';
import { cartItemInterface, couponInterface } from '@/typeInterfaces/cartInterface';


interface _Props {
    // children: React.ReactNode,
    cartItems: cartItemInterface[],
    discount: couponInterface,
    totalPrice: number,
    removeItemFn: (item: cartItemInterface) => void,
}

const CartItemComponent: React.FC<_Props> = ({
    cartItems, discount, totalPrice, removeItemFn
}) => {

    return (
        <Box>
            {/* desktop view */}
            <Box sx={{ display: {xs: "none", md: "block"} }}>
                <Grid container spacing="20px">
                    <Grid item xs={4} md={4}>
                        <Box>
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "16px", md: "20px"},
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: "-0.13px",
                                    color: colors.secondary,
                                }}
                            >Product details</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Box textAlign="center">
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "16px", md: "20px"},
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: "-0.13px",
                                    color: colors.secondary,
                                }}
                            >Price</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Box textAlign="center">
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "16px", md: "20px"},
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: "-0.13px",
                                    color: colors.secondary,
                                }}
                            >Total</Typography>
                        </Box>
                    </Grid>
                </Grid>


                {
                    cartItems.map((item, index) => (
                        <Grid key={index} container spacing="20px" mb="20px">
                            <Grid item xs={4} md={4}>
                                <Box>
                                    <Stack direction="row" spacing="20px">
                                        <Box
                                            sx={{
                                                width: "152px",
                                                height: "150px",
                                                borderRadius: "12px",
                                                bgcolor: colors.secondary,
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img src={item.coverArt} alt='song art work image'
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography variant='h4'
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "20px",
                                                    lineHeight: "40px",
                                                    letterSpacing: "-0.13px",
                                                    color: colors.dark
                                                }}
                                            >{ item.title }</Typography>

                                            <Typography variant='subtitle2'
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "16px",
                                                    lineHeight: "40px",
                                                    letterSpacing: "-0.13px",
                                                    color: colors.secondary
                                                }}
                                            >{ item.releaseType }</Typography>

                                            <Typography variant='subtitle2'
                                                onClick={() => removeItemFn(item) }
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "16px",
                                                    lineHeight: "40px",
                                                    letterSpacing: "-0.13px",
                                                    color: colors.secondary,
                                                    cursor: "pointer",
                                                    mt: "30px"
                                                }}
                                            >Remove</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>

                            <Grid item xs={4} md={4}>
                                <Box textAlign="center">
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "20px",
                                            lineHeight: "40px",
                                            letterSpacing: "-0.13px",
                                            color: colors.dark,
                                        }}
                                    >{ currencyDisplay(item.price) }</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={4} md={4}>
                                <Box textAlign="center" sx={{ display: index > 0 ? "none" : "initial" }}>
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "20px",
                                            lineHeight: "40px",
                                            letterSpacing: "-0.13px",
                                            color: colors.dark,
                                        }}
                                    >{ currencyDisplay(totalPrice) }</Typography>

                                    {
                                        discount._id ? (
                                            <>
                                                <Typography variant='body1'
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "20px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        color: colors.dark,
                                                    }}
                                                > - { currencyDisplay(discount.discountedAmount || 0) }</Typography>
            
                                                <Divider />
                                                
                                                <Typography variant='body1'
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "24px",
                                                        lineHeight: "40px",
                                                        letterSpacing: "-0.13px",
                                                        color: colors.dark,
                                                    }}
                                                >{ currencyDisplay(discount.payableAmount || 0) }</Typography>
                                                
                                                <Typography variant='subtitle2' component="small"
                                                    sx={{
                                                        fontWeight: "300",
                                                        fontSize: "12px",
                                                        // lineHeight: "40px",
                                                        // letterSpacing: "-0.13px",
                                                        color: colors.dark,
                                                        textAlign: "right",
                                                        float: "right"
                                                    }}
                                                >{ discount.discount || 0 }% discount applied</Typography>
                                            </>
                                        ) : <></>
                                    }

                                </Box>
                            </Grid>
                        </Grid>
                    ))
                }

            </Box>

            {/* mobile view */}
            <Box sx={{ display: {xs: "block", md: "none"} }}>
                <Grid container spacing="20px">
                    <Grid item xs={7} sm={8}>
                        <Box>
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "16px", md: "20px"},
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: "-0.06px",
                                    color: colors.secondary,
                                }}
                            >Product details</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={5} sm={4}>
                        <Box textAlign="center">
                            <Typography variant='body1'
                                sx={{
                                    fontWeight: "600",
                                    fontSize: {xs: "16px", md: "20px"},
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: "-0.06px",
                                    color: colors.secondary,
                                }}
                            >Total</Typography>
                        </Box>
                    </Grid>
                </Grid>

                {
                    cartItems.map((item, index) => (
                        <Grid key={index} container spacing="10px" mb="5px">
                            <Grid item xs={7} sm={8}>
                                <Box>
                                    <Stack direction="row" spacing="10px" mt="10px">
                                        <Box
                                            sx={{
                                                width: "80px",
                                                height: "120px",
                                                borderRadius: "6px",
                                                bgcolor: colors.secondary,
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img src={item.coverArt} alt='song art work image'
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography variant='h4'
                                                sx={{
                                                    ...numberOfLinesTypographyStyle(2),
                                                    fontWeight: "700",
                                                    fontSize: "16px",
                                                    lineHeight: "20px",
                                                    letterSpacing: "-0.06px",
                                                    color: colors.dark,
                                                }}
                                            >{ item.title }</Typography>

                                            <Typography variant='subtitle2'
                                                sx={{
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    lineHeight: "20px",
                                                    letterSpacing: "-0.06px",
                                                    color: colors.dark,
                                                    mt: "14px"
                                                }}
                                            >{ item.releaseType }</Typography>

                                            <Typography variant='subtitle2'
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    lineHeight: "20px",
                                                    letterSpacing: "-0.06px",
                                                    color: colors.secondary
                                                }}
                                            >{ currencyDisplay(item.price) }</Typography>

                                            <Typography variant='subtitle2'
                                                onClick={() => removeItemFn(item)}
                                                sx={{
                                                    fontWeight: "500",
                                                    fontSize: "14px",
                                                    lineHeight: "20px",
                                                    letterSpacing: "-0.06px",
                                                    color: colors.dark,
                                                    cursor: "pointer",
                                                    mt: "17px"
                                                }}
                                            >Remove</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Grid>

                            <Grid item xs={5} sm={4}>
                                <Box textAlign="center"
                                    sx={{ display: index > 0 ? "none" : "initial" }}
                                >
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            lineHeight: "20px",
                                            letterSpacing: "-0.06px",
                                            color: colors.dark,
                                            mt: "10px",
                                        }}
                                    >{ currencyDisplay(totalPrice) }</Typography>

                                    {
                                        discount._id ? (
                                            <>
                                                <Typography variant='body1'
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "16px",
                                                        lineHeight: "20px",
                                                        letterSpacing: "-0.06px",
                                                        color: colors.dark,
                                                    }}
                                                > - { currencyDisplay(discount.discountedAmount || 0) }</Typography>
            
                                                <Divider sx={{my: 0.5}} />
                                                
                                                <Typography variant='body1'
                                                    sx={{
                                                        fontWeight: "700",
                                                        fontSize: "20px",
                                                        lineHeight: "20px",
                                                        letterSpacing: "-0.06px",
                                                        color: colors.dark,
                                                    }}
                                                >{ currencyDisplay(discount.payableAmount || 0) }</Typography>
                                                
                                                <Typography variant='subtitle2' component="small"
                                                    sx={{
                                                        fontWeight: "300",
                                                        fontSize: "12px",
                                                        // lineHeight: "40px",
                                                        // letterSpacing: "-0.13px",
                                                        color: colors.dark,
                                                        textAlign: "right",
                                                        float: "right"
                                                    }}
                                                >{ discount.discount || 0 }% discount applied</Typography>
                                            </>
                                        ) : <></>
                                    }

                                </Box>
                            </Grid>
                        </Grid>
                    ))
                }
                
            </Box>

        </Box>
    )
}

export default CartItemComponent;