import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import { submitBtnStyle } from '@/util/mui';

// import albumSampleArt from '@/assets/images/albumSampleArt.png';
import CartItemComponent from '@/components/account/payments/carts/CartItem';
import DiscountApplicationModalComponent from '@/components/account/payments/carts/DiscountApplication';
import { useCart } from '@/hooks/useCart';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useCartItemStore } from '@/state/cartStore';


function CartPage() {
    const navigate = useNavigate();
    const [openDiscountFormModal, setOpenDiscountFormModal] = useState(false);
    const couponDiscount = useCartItemStore((state) => state.couponDiscount);

    const { 
        cartItems, totalAmount, handleRemoveCartItem,
        apiResponse, // handleCheckoutBtn,
    } = useCart();

    // console.log(cartItems);


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box my="100px">
                <Typography variant='body1'
                    sx={{
                        fontWeight: "900",
                        fontSize: {xs: "30px", md: "60px"},
                        lineHeight: {xs: '32px', md: "63.8px"},
                        letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                        color: colors.dark,
                    }}
                >Your cart</Typography>

                <Box my="55px">
                    <CartItemComponent 
                        cartItems={cartItems}
                        removeItemFn={handleRemoveCartItem}
                        totalPrice={totalAmount}
                        discount={couponDiscount}
                    />
                </Box>


                {
                    apiResponse.display && (
                        <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                            <Alert severity={apiResponse.status ? "success" : "error"}>{apiResponse.message}</Alert>
                        </Stack>
                    )
                }
                
                <Box 
                    sx={{ 
                        my: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Typography variant='body1'
                        onClick={() => setOpenDiscountFormModal(true)}
                        sx={{
                            fontWeight: "500",
                            fontSize: {xs: "16px", md: "20px"},
                            lineHeight: {xs: '30px', md: "40px"},
                            letterSpacing: {xs: "-0.13px", md: "-0.13px"},
                            color: colors.secondary,
                            cursor: "pointer",
                            display: cartItems.length ? "initial" : "none"
                        }}
                    >Get a discount for your release</Typography>

                    <Button variant="contained" 
                        fullWidth type="button" 
                        // disabled={ !isValid || isSubmitting } 
                        disabled={!cartItems.length}
                        onClick={() => { 
                            navigate("/account/checkout");
                            // handleCheckoutBtn(cartItems);
                        }}
                        sx={{
                            ...submitBtnStyle,
                            maxWidth: "320px"
                        }}
                    >
                        <Typography variant='body1'
                            sx={{
                                fontSize: "16px",
                                fontWeight: "900",
                                lineHeight: "13px",
                                letterSpacing: "-0.13px"
                            }}
                        >Check out</Typography>
                    </Button>
                </Box>

            </Box>

            <DiscountApplicationModalComponent 
                cartItems={cartItems}
                closeModal={() => setOpenDiscountFormModal(false)}
                openModal={openDiscountFormModal}
            />
        </AccountWrapper>
    )
}

export default CartPage