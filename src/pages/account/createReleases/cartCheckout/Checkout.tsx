import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AccountWrapper from '@/components/AccountWrapper';
import colors from '@/constants/colors';
import { releaseTextFieldStyle, submitBtnStyle } from '@/util/mui';

// import albumSampleArt from '@/assets/images/albumSampleArt.png';
import CartItemComponent from '@/components/account/payments/carts/CartItem';
import { apiEndpoint } from '@/util/resources';
import { useUserStore } from '@/state/userStore';
import DiscountApplicationModalComponent from '@/components/account/payments/carts/DiscountApplication';
import CircularProgress from '@mui/material/CircularProgress';
import { useCart } from '@/hooks/useCart';


const formSchema = yup.object({
    promoCode: yup.string().required().trim().label("Promo Code"),
});

function CartCheckoutPage() {
    const accessToken = useUserStore((state) => state.accessToken);
    const [openDiscountFormModal, setOpenDiscountFormModal] = useState(false);
    const { cartItems, totalAmount, handleRemoveCartItem } = useCart();

    const { 
        handleSubmit, register, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onBlur'
    });
            
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        console.log(formData);
        return;

        try {
            const response = (await axios.post(
                `${apiEndpoint}/xxxxxx`,
                formData,  
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`
                    },
                }
            )).data;
            console.log(response);


            // navigate("/account/create-album-release-select-stores");
        } catch (error: any) {
            const err = error.response.data || error;
            console.log(err);

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
                            fontSize: {xs: "30px", md: "60px"},
                            lineHeight: {xs: '32px', md: "63.8px"},
                            letterSpacing: {xs: "-0.67px", md: "-1.34px"},
                            color: colors.dark,
                        }}
                    >Your cart</Typography>


                    <form noValidate onSubmit={ handleSubmit(onSubmit) }>
                        <Box>
                            <Typography variant='body2'
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    lineHeight: {xs: "20px", md: "40px"},
                                    letterSpacing: {xs: "-0.06px", md: "-0.13px"}
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
                                    error={ errors.promoCode ? true : false }
                                    { ...register('promoCode') }
                                />

                                <Button variant="contained" 
                                    fullWidth type="submit" 
                                    disabled={ !isValid || isSubmitting } 
                                    sx={{
                                        ...submitBtnStyle,
                                        maxWidth: {xs: "83px", md: "110px"}
                                    }}
                                >
                                    <Typography variant='body1'
                                        sx={{
                                            fontWeight: {xs: "700", md: "900"},
                                            fontSize: {xs: "14px", md: "16px"},
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
                                { errors.promoCode && <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.promoCode?.message }</Box> }
                            </Box>
                        </Box>
                    </form>
                </Stack>

                <Box my="55px">
                    <CartItemComponent 
                        cartItems={cartItems}
                        removeItemFn={handleRemoveCartItem}
                        totalPrice={totalAmount}
                    />
                </Box>


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
                            fontWeight: "400",
                            fontSize: {xs: "", md: "16px"},
                            lineHeight: {xs: '', md: "40px"},
                            letterSpacing: {xs: "", md: "-0.13px"},
                            color: colors.secondary,
                            cursor: "pointer"
                        }}
                    >Get a discount for your release</Typography>

                    <Button variant="contained" 
                        fullWidth type="submit" 
                        // disabled={ !isValid || isSubmitting } 
                        disabled={!cartItems.length}
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
            />

        </AccountWrapper>
    )
}

export default CartCheckoutPage