import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import LoadingDataComponent from '@/components/LoadingData';
import { useCartItemStore } from '@/state/cartStore';
import { submitBtnStyle } from '@/util/mui';
import { currencyDisplay } from '@/util/resources';

function CheckoutFormPage({ amount }: { amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const paymentIntent = useCartItemStore((state) => state.paymentIntent);

    const [apiResponse, setApiResponse] = useState({
        display: false,
        status: true,
        message: ""
    });

    const [isLoading, setIsLoading] = useState(false);
  
    const handleClickedPay = async () => {
        setIsLoading(true);

        setApiResponse({
            display: false,
            status: true,
            message: ""
        });

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.

            console.log("Stripe.js hasn't yet loaded.");
            console.log("Make sure to disable form submission until Stripe.js has loaded.");

            setApiResponse({
                display: true,
                status: false,
                message: "Stripe.js hasn't yet loaded.",
            });
            setIsLoading(true);
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setApiResponse({
                display: true,
                status: false,
                message: submitError.message || '',
            });
            setIsLoading(false);
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements, 
            clientSecret: paymentIntent.clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/account/checkout/success?amount=${ amount }`,
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error);

            setApiResponse({
                display: true,
                status: false,
                message: result.error.message || '',
            });
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

        setIsLoading(false);
    }

    // show a loading page this parameters are not available
    if (!paymentIntent.clientSecret || !stripe || !elements) {
        return (
            <Box>
                <LoadingDataComponent />
            </Box>
        )
    }


    return (
        <Box>
            { paymentIntent.clientSecret && <PaymentElement /> }

            {
                apiResponse.display && (
                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                        <Alert severity={apiResponse.status ? "success" : "error"}>
                            {apiResponse.message}
                        </Alert>
                    </Stack>
                )
            }

            <Button variant="contained" 
                fullWidth type="button"
                onClick={() => {
                    handleClickedPay();
                }} 
                disabled={!stripe || isLoading}
                sx={{
                    ...submitBtnStyle,
                    // maxWidth: "320px"
                    mt: 3
                }}
            >
                {
                    isLoading ? 
                        <CircularProgress size={25} 
                            sx={{ 
                                // display: isSubmitting ? "initial" : "none", 
                                color: "#fff", // colors.primary,
                                fontWeight: "bold" 
                            }} 
                        />
                    : 
                    <Typography variant='body1'
                        sx={{
                            fontSize: "16px",
                            fontWeight: "900",
                            lineHeight: "13px",
                            letterSpacing: "-0.13px"
                        }}
                    >{ `Pay ${currencyDisplay(Number(amount))}` }</Typography>
                }
            </Button>
        </Box>
    )
}

export default CheckoutFormPage