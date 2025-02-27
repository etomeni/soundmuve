import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import { releaseTextFieldStyle, submitBtnStyle } from '@/util/mui';

import stripeLogo from '@/assets/branded/images/stripeLogo.png';
import flutterwaveLogo from '@/assets/branded/images/flutterwaveLogo.svg';
import CartItemComponent from '@/components/account/payments/carts/CartItem';
import DiscountApplicationModalComponent from '@/components/account/payments/carts/DiscountApplication';
import CircularProgress from '@mui/material/CircularProgress';
import { useCart } from '@/hooks/useCart';
import Alert from '@mui/material/Alert';
import StripePayment from './StripePayment';
import { useCartItemStore } from '@/state/cartStore';
import Avatar from '@mui/material/Avatar';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { getCartTotalAmount } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import { FlutterwaveConfig } from 'flutterwave-react-v3/dist/types';
import { createSearchParams, useNavigate } from 'react-router-dom';


const formSchema = yup.object({
    promoCode: yup.string().required().trim().label("Promo Code"),
});

function CartCheckoutPage() {
    const navigate = useNavigate();
    const [openDiscountFormModal, setOpenDiscountFormModal] = useState(false);
    const [openStripeModal, setOpenStripeModal] = useState(false);
    const couponDiscount = useCartItemStore((state) => state.couponDiscount);
    const [paymentMethod, setPaymentMethod] = useState<"" | "Flutterwave" | "Stripe">("Stripe");
    const userData = useUserStore((state) => state.userData); 

    const {
        cartItems, totalAmount, handleRemoveCartItem,
        handleApplyPromo, // applyPromoResponse
        apiResponse,
        // handleFlutterwaveSuccessfulPayment,
    } = useCart();

    const gatPayAmount = couponDiscount._id && couponDiscount.payableAmount ? couponDiscount.payableAmount : getCartTotalAmount(cartItems);

    const config: FlutterwaveConfig = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY,
        tx_ref: `${Date.now()}`,
        amount: gatPayAmount,
        currency: 'USD',
        payment_options: 'card,account,mobilemoney,ussd,barter,bank transfer,wechat',
        customer: {
            email: userData.email,
            phone_number: userData.phoneNumber,
            name: userData.firstName + " " + userData.lastName,
        },
        customizations: {
            title: 'SoundMuve - Distribute Your Music to All Major Platforms',
            description: 'Payment for the release and distribution your Music',
            logo: 'https://soundmuve.com/icon.png',
        },
        meta: {
            cartItems
        }
    };
    
    const handleFlutterPayment = useFlutterwave(config);


    const {
        handleSubmit, register, setError, formState: { errors, isValid, isSubmitting }
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        // console.log(formData);

        const response = await handleApplyPromo(formData.promoCode, cartItems);

        if (!response.status) {
            setError(
                "promoCode",
                { message: response.result.message || "error submitting code." },
                { shouldFocus: true }
            );
        }
    }

    const handleCheckout = () => {
        const skipStripPayment = () => {
            // Define your parameters as an object
            const params: any = {
                amount: couponDiscount.payableAmount,
                payment_intent: `Discount id - ${couponDiscount._id}`,
                payment_intent_client_secret: `Coupon code - ${couponDiscount.code}`,
                redirect_status: "success"
            };

            // Convert the parameters object to a query string
            const queryString = new URLSearchParams(params).toString();

            // Get the base URL of the current page
            const baseURL = `${window.location.origin}/account/checkout/success`;
            // const baseURL = `${window.location.origin}${window.location.pathname}`;

            // Combine the base URL with the query string
            const fullURL = `${baseURL}?${queryString}`;

            // Navigate to the new URL on the same page
            window.location.href = fullURL;
        }

        const checkPaymentMethod = () => {
            if (paymentMethod == "Stripe") {
                setOpenStripeModal(true);
                return;
            } else if (paymentMethod == "Flutterwave") {
                handleFlutterPayment({
                    callback: (response) => {
                        console.log(response);
                        // handleFlutterwaveSuccessfulPayment(response);
                        closePaymentModal() // this will close the modal programmatically

                        navigate({
                            pathname: `/account/checkout/success`,
                            search: `?${createSearchParams({
                                amount: `${response.amount}`,
                                payment_intent: response.transaction_id.toString(),
                                payment_intent_client_secret: response.tx_ref,
                                redirect_status: response.status,
                                flw_ref: response.flw_ref,
                            })}`,
                        });

                    },
                    onClose: () => {},
                });
            }
        }

        if (couponDiscount._id) {
            if (couponDiscount.payableAmount && couponDiscount.payableAmount > 0) {
                checkPaymentMethod()
            } else {
                skipStripPayment();
            }
        } else {
            checkPaymentMethod()
        }
    }


    return (
        <AccountWrapper bottomSpacing={0} topSpacing={false}>
            <Box my="100px">
                <Stack direction="row" spacing="10px"
                    justifyContent="space-between"
                >
                    <Typography variant='body1'
                        sx={{
                            fontWeight: "900",
                            fontSize: { xs: "30px", md: "60px" },
                            lineHeight: { xs: '32px', md: "63.8px" },
                            letterSpacing: { xs: "-0.67px", md: "-1.34px" },
                            color: colors.dark,
                        }}
                    >Your cart</Typography>

                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <Typography variant='body2'
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    lineHeight: { xs: "20px", md: "40px" },
                                    letterSpacing: { xs: "-0.06px", md: "-0.13px" }
                                }}
                            >Promo Code</Typography>

                            <Stack direction="row" alignItems="center" spacing="10px">
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id='promoCode'
                                    type='text'
                                    inputMode='text'
                                    defaultValue=""
                                    sx={{
                                        ...releaseTextFieldStyle,
                                        '& .MuiOutlinedInput-root': {
                                            // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
                                            borderRadius: '13.79px',
                                            height: '45px',

                                            '& fieldset': {
                                                // border: `1px solid ${colors.primary}`,
                                            },
                                            '&:hover fieldset': {
                                                border: `2px solid ${colors.primary}`,
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: `1px solid ${colors.primary}`,
                                            },
                                        },

                                        maxWidth: "240px",
                                    }}
                                    error={errors.promoCode ? true : false}
                                    {...register('promoCode')}
                                />

                                <Button variant="contained"
                                    fullWidth type="submit"
                                    disabled={!isValid || isSubmitting || !cartItems.length}
                                    sx={{
                                        ...submitBtnStyle,
                                        maxWidth: { xs: "83px", md: "110px" }
                                    }}
                                >
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: { xs: "700", md: "900" },
                                            fontSize: { xs: "14px", md: "16px" },
                                            lineHeight: "13px",
                                            letterSpacing: "-0.13px",
                                            // display: isSubmitting ? "none" : "initial", 
                                        }}
                                    >Apply</Typography>

                                    <CircularProgress size={20}
                                        sx={{
                                            display: isSubmitting ? "initial" : "none",
                                            color: "#fff", // colors.primary,
                                            fontWeight: "bold"
                                        }}
                                    />
                                </Button>
                            </Stack>

                            <Box>
                                {errors.promoCode && <Box sx={{ fontSize: 13, color: "red", textAlign: "left" }}>{errors.promoCode?.message}</Box>}
                            </Box>
                        </Box>
                    </form>
                </Stack>

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
                    {/* <Typography variant='body1'
                        onClick={() => setOpenDiscountFormModal(true)}
                        sx={{
                            fontWeight: "400",
                            fontSize: {xs: "", md: "16px"},
                            lineHeight: {xs: '', md: "40px"},
                            letterSpacing: {xs: "", md: "-0.13px"},
                            color: colors.secondary,
                            cursor: "pointer",
                            display: cartItems.length ? "initial" : "none"
                        }}
                    >Get a discount for your release</Typography> */}


                    <FormControl sx={{mb: 2}}>
                        <FormLabel id="paymentMethod-radio-button-label">Choose a payment method</FormLabel>
                        <RadioGroup
                            aria-labelledby="paymentMethod-radio-button-label"
                            // defaultValue="Stripe"
                            name="radio-buttons-group"
                            value={paymentMethod}
                            onChange={(_e, value) => {
                                // const valuee = (_e.target as HTMLInputElement).value;
                                setPaymentMethod(value as any);
                            }}                        
                        >
                            <FormControlLabel
                                value="Flutterwave"
                                disabled
                                control={<Radio />}
                                label={<Stack direction="row" spacing="10px" alignItems="center">
                                    <Avatar 
                                        alt="Flutterwave" 
                                        src={flutterwaveLogo}
                                    />

                                    <Typography
                                        sx={{
                                            color: "#2A3362",
                                            // fontFamily: "Nohemi",
                                            fontFamily: "Geist",
                                            fontSize: "20px"
                                        }}
                                    >Flutterwave <small style={{ fontSize: "12px" }}>coming soon...</small> </Typography>
                                </Stack>}
                            />

                            <FormControlLabel
                                value="Stripe"
                                control={<Radio />}
                                label={<Stack direction="row" spacing="10px" alignItems="center">
                                    <Avatar 
                                        alt="Stripe" 
                                        src={stripeLogo}
                                    />

                                    <Typography
                                        sx={{
                                            color: "#2A3362",
                                            // fontFamily: "Nohemi",
                                            fontFamily: "Geist",
                                            fontSize: "20px"
                                        }}
                                    >Stripe</Typography>
                                </Stack>}
                            />
                        </RadioGroup>
                    </FormControl>


                    <Button variant="contained"
                        fullWidth type="button"
                        onClick={() => {
                            handleCheckout();
                        }}
                        disabled={!cartItems.length || !paymentMethod}
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

                        <CircularProgress size={25}
                            sx={{
                                display: isSubmitting ? "initial" : "none",
                                color: "#fff", // colors.primary,
                                fontWeight: "bold"
                            }}
                        />
                    </Button>
                </Box>

            </Box>

            <DiscountApplicationModalComponent
                closeModal={() => setOpenDiscountFormModal(false)}
                openModal={openDiscountFormModal}
                cartItems={cartItems}
            />

            {
                openStripeModal && 
                <StripePayment
                    closeModal={() => setOpenStripeModal(false)}
                    openModal={openStripeModal}
                    cartItems={cartItems}
                    discount={couponDiscount}
                />
            }
        </AccountWrapper>
    )
}

export default CartCheckoutPage